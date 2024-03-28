"use client";
import axios from "axios";
import { baseURL } from "@/app/utils/baseUrl";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { decodeJwt } from "./utils/decodeJwt";
import jwt from "jsonwebtoken";
import { useAuth } from "@/app/utils/authProvider";

export default function Main() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const getRefreshToken = useCallback(async () => {
    try {
      alert("Getting Refreshed");
      const refreshToken = getCookie("refreshToken");
      if (refreshToken) {
        const res = await axios.post(baseURL + "/api/users/token", {
          refreshToken,
        });
        if (res.status === 200) {
          const { accessToken } = res.data;
          return accessToken;
        }
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
    // return null;
  }, []);

  // Helper functions for working with cookies
  const setCookie = (name, value) => {
    document.cookie = `${name}=${value}; path=/;`;
  };

  const getCookie = (name) => {
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.trim().split("="));
    const cookie = cookies.find(([cookieName]) => cookieName === name);
    return cookie ? cookie[1] : null;
  };

  // Function to check if the access token is expired
  const isTokenExpired = (accessToken) => {
    // Decode the access token to get its expiration time
    const decodedToken = jwt.decode(accessToken);
    const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
    const truth = Date.now() >= expirationTime;
    // Check if the current time is past the expiration time
    return truth;
  };

  const checkAuthentication = useCallback(async () => {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    // Check if both tokens are present
    if (accessToken && refreshToken) {
      if (!isTokenExpired(accessToken)) {
        const userData = jwt.decode(accessToken);
        setUser(userData);
        // console.log(userData);
      }
      // If access token is expired, refresh it
      if (isTokenExpired(accessToken)) {
        alert("Token NOT expired");
        const newAccessToken = await getRefreshToken();
        if (newAccessToken) {
          // If new access token is successfully obtained, update the authentication state
          setCookie("accessToken", newAccessToken);
          const userData = jwt.decode(newAccessToken);
          setUser(userData);
        } else {
          // If refresh fails, redirect to login page
          router.push("/blog/login");
        }
      }
    }
  }, [getRefreshToken, router, setUser]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);
}
