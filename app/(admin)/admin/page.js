'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminContext } from '@/context/AdminContext';

export default function LoginPage() {
  const { login } = useAdminContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // reset error

    const user = await login(email, password);

    if (user && user.role === 'admin') {
    } else {
      setErrorMessage('Access Denied: Only admins are allowed');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <form onSubmit={handleSubmit} className="admin-login-form">
        <h2 className="login-title">Admin Login</h2>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="login-input"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>

      <style jsx>{`
        .error-message {
          background-color: #f8d7da;
          color: #721c24;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #f5c6cb;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
