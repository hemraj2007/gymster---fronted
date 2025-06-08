"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddUserPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "", // Assuming backend accepts it
    mobile: "",
    age: "",
    gender: "",
    role: "user"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/auth/register", {
        ...formData
      });
      alert("User added!");
      router.push("/admin/users");
    } catch (error) {
      console.error("Add user error:", error);
      alert("Failed to add user");
    }
  };

  return (
    <form className="edit-user-form" onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Add New User</h2>

      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        onChange={handleChange}
        required
      />

      <select name="gender" onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <select name="role" onChange={handleChange} required>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" style={{ marginTop: "15px" }}>Add User</button>
    </form>
  );
};

export default AddUserPage;
