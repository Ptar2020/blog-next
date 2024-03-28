"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseURL } from "@/app/utils/baseUrl";
import { useAuth } from "@/app/utils/authProvider";
import jwt from "jsonwebtoken";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      console.log(user)
      router.push("/");
    }else{console.log(user)}
  },[router, user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(baseURL + "/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        const { accessToken, refreshToken } = data;
        const userData = jwt.decode(accessToken);
        setUser(userData);
        // Store tokens in browser cookies
        document.cookie = `accessToken=${accessToken}; path=/;`;
        document.cookie = `refreshToken=${refreshToken}; path=/;`;
        router.push("/blog/users");
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Clean up function
    return () => {};
  }, []); // Run once on component mount

  return (
    <main>
      <div>Login</div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default Login;
