'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login first.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/update_password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("token_type", data.token_type || "bearer");
          localStorage.setItem("token", data.access_token);
          console.log("New token saved:", data.access_token);
        }

        setMessage("Password updated successfully!");
        setNewPassword('');
        setConfirmPassword('');

        setTimeout(() => {
          router.push('/profile');
        }, 2000);
      } else {
        setMessage(data.detail || "Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="update-password-page">
      <h2>Update Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="password-input"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="password-input"
      />
      <button onClick={handleUpdatePassword} className="password-update-btn">
        Update Password
      </button>
      <p className={`password-message ${message.includes('success') ? 'success' : 'error'}`}>
        {message}
      </p>
    </div>
  );
};

export default UpdatePassword;
