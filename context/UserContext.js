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
      const response = await axios.post('http://127.0.0.1:8000/auth/login', {
        email,
        password,
      });

      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setToken(access_token);

      // Fetch user profile immediately after login
      const profileResponse = await axios.get('http://127.0.0.1:8000/users/profile', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const userProfile = profileResponse.data;

      // Check if role is 'user', else reject login
      if (userProfile.role !== 'user') {
        logout();  // Clear token and user info if role not allowed
        return false;
      }

      setUser(userProfile);
      return true;
    } catch (error) {
      console.error('Login error:', error);
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
      const response = await axios.get('http://127.0.0.1:8000/users/profile', {
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
