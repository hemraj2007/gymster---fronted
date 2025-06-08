"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    mobile: '',
    age: '',
    gender: '',
    role: 'user'  // ✅ Default role fix
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/auth/register`, formData);
      setMessage('Sign up successful!');
      console.log(response.data);
      setTimeout(() => {
        router.push('/join');
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>First Name</label>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />

        <label>Last Name</label>
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>Mobile</label>
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />

        <label>Age</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />

        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {/* ✅ Role field visible but not editable */}
        <label>Role</label>
        <input type="text" value="user" readOnly disabled />

        {/* ✅ Hidden field to actually send the role to backend */}
        <input type="hidden" name="role" value="user" />

        <button type="submit">Sign Up</button>
      </form>

      {message && (
        <p className={`signup-message ${message.includes('successful') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default SignupForm;
