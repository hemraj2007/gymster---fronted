'use client';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import axios from 'axios';

export default function ProfilePage() {
  // Get user data from context
  const { user, token, loading, setUser } = useContext(UserContext);
  
  // State variables
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    age: '',
    gender: ''
  });
  const [message, setMessage] = useState('');

  // Populate form when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        mobile: user.mobile || '',
        age: user.age || '',
        gender: user.gender || ''
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'age') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? '' : Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/update_profile/${user.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(response.data);
      setMessage('✅ Profile updated successfully!');
      setShowForm(false);
    } catch (error) {
      console.error('Update error:', error);
      setMessage(`❌ Error: ${error.response?.data?.message || 'Failed to update profile'}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login to view your profile</div>;

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      
      {message && <div className="alert">{message}</div>}

      <div className="profile-info">
        <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          {showForm ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleUpdate} className="profile-form">
          <div className="form-group">
            <label htmlFor="first_name">First Name:</label>
            <input
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="last_name">Last Name:</label>
            <input
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              type="email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              type="tel"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              type="number"
              min="1"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}

