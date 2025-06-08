'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Profile fetch karne wali function
  const fetchProfile = async (token) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();
      setUserInfo(data);
      return data; // User profile return kar raha hai
    } catch (err) {
      console.error("Profile error:", err);
      setUserInfo(null);
      localStorage.removeItem("token");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        return null; // Login fail hua
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);

      // Immediately profile fetch kar aur return kar
      const profile = await fetchProfile(data.access_token);
      return profile;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };

  // Page load pe token check karke profile fetch karo
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    fetchProfile(token);
  }, []);

  return (
    <AdminContext.Provider value={{ userInfo, setUserInfo, loading, login }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
