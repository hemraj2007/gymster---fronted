"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const EditUserPage = () => {
  const { id } = useParams(); // get user id from URL
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    age: "",
    gender: "",
    role: ""
  });

  // ✅ CORRECTED: GET user by ID using right URL
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/user/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
        alert("User not found!");
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ CORRECTED: PUT user using proper update endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/update_profile/${id}`, {
        ...formData,
        id: parseInt(id), // 🟢 Pass the `id` because your update API might need it in body
        updated_at: new Date().toISOString(),
      });
      alert("User updated!");
      router.push("/admin/users");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update user!");
    }
  };

  return (
    <form className="edit-user-form" onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Edit User</h2>

      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        required
        placeholder="First Name"
      />

      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        required
        placeholder="Last Name"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Email"
      />

      <input
        type="text"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        required
        placeholder="Mobile Number"
      />

      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        required
        placeholder="Age"
      />

      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <select name="role" value={formData.role} onChange={handleChange} required>
        <option value="user">User</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" style={{ marginTop: "15px" }}>Update User</button>
    </form>
  );
};

export default EditUserPage;
