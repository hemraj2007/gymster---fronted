'use client';
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // Store user profile
  const [token, setToken] = useState(null);    // Store JWT token
  const [loading, setLoading] = useState(true);

  // Load token from localStorage on initial render
  useEffect(() => {
    const savedToken = localStorage.getItem('token');

    if (savedToken && savedToken !== 'undefined' && savedToken !== 'null') {
      setToken(savedToken);
      fetchUserProfile(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Login function with role check (only 'user' allowed)
  const login = async (email, password) => {
    try {
      // Step 1: Attempt login
      const response = await axios.post('${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login', {
        email,
        password,
      });

      // Step 2: If token not found, something's wrong
      const { access_token } = response.data || {};
      if (!access_token) {
        console.warn("Access token not received");
        return false;
      }

      // Step 3: Save token and fetch profile
      localStorage.setItem('token', access_token);
      setToken(access_token);

      const profileResponse = await axios.get('${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const userProfile = profileResponse.data;

      // Step 4: Check user role
      if (userProfile.role !== 'user') {
        logout(); // Clear token & user
        console.warn("Unauthorized role:", userProfile.role);
        return false;
      }

      // Step 5: All good — login successful
      setUser(userProfile);
      return true;

    } catch (error) {
      // Graceful error handling
      if (error.response) {
        // Server responded with a status other than 2xx
        console.warn("Login failed:", error.response.data?.detail || "Invalid credentials");
      } else if (error.request) {
        // No response received
        console.error("No response from server");
      } else {
        // Other error
        console.error("Login error:", error.message);
      }

      return false;
    }
  };


  // Fetch user profile (for token persistence on reload)
  const fetchUserProfile = async (token) => {
    if (!token || token === 'undefined' || token === 'null') {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Role check on page reload
      if (response.data.role !== 'user') {
        logout();
        setLoading(false);
        return;
      }

      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      if (error.response && error.response.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout function clears everything
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
