"use client";
// import { createContext, useState, useContext, useEffect } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check for authentication tokens in cookies on component mount
//     const accessToken = getCookie("accessToken");
//     const refreshToken = getCookie("refreshToken");

//     // If tokens are present, update the authentication state
//     if (accessToken && refreshToken) {
//       setUser({ accessToken, refreshToken });
//     }
//   }, []);

//   const setAuthTokens = ({ accessToken, refreshToken }) => {
//     // Store tokens in cookies
//     setCookie("accessToken", accessToken);
//     setCookie("refreshToken", refreshToken);

//     // Update authentication state
//     setUser({ accessToken, refreshToken });
//   };

//   const clearAuthTokens = () => {
//     deleteCookie("accessToken");
//     deleteCookie("refreshToken");

//     // Clear authentication state
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider
//       value={{ user, setUser, setAuthTokens, clearAuthTokens }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useAuth = () => useContext(UserContext);

// // Helper functions for working with cookies
// const setCookie = (name, value) => {
//   document.cookie = `${name}=${value}; path=/;`;
// };

// const getCookie = (name) => {
//   const cookies = document.cookie
//     .split(";")
//     .map((cookie) => cookie.trim().split("="));
//   const cookie = cookies.find(([cookieName]) => cookieName === name);
//   return cookie ? cookie[1] : null;
// };

// const deleteCookie = (name) => {
//   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// };

import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
