"use client";
import React, { useEffect, useState } from "react";
import { useAdminContext } from "@/context/AdminContext";

export default function AdminProfile() {
  const { userInfo, setUserInfo } = useAdminContext();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    age: "",
    gender: "",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setFormData({ ...userInfo });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/update_profile/${userInfo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update profile");

      const updated = await res.json();
      alert("Profile updated successfully!");
      setUserInfo(updated);
      setEditMode(false);
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong!");
    }
  };

  if (!userInfo) return <p className="loading">Loading...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-heading">
        <span className="profile-icon">👤</span> Admin Profile
      </h2>

      <div className="profile-fields">
        {["first_name", "last_name", "email", "mobile", "age", "gender"].map((field) => (
          <div className="profile-field" key={field}>
            <strong>{field.replace("_", " ").toUpperCase()}:</strong>
            {editMode ? (
              <input
                type={field === "age" ? "number" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="profile-input"
              />
            ) : (
              <span>{userInfo[field]}</span>
            )}
          </div>
        ))}
      </div>

      <div className="profile-buttons">
        {editMode ? (
          <>
            <button onClick={handleUpdate} className="btn save-btn">Save</button>
            <button onClick={() => setEditMode(false)} className="btn cancel-btn">Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)} className="btn update-btn">
            Update Profile
          </button>
        )}
      </div>
    </div>
  );
}
