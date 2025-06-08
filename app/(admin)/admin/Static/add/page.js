"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddStaticPage() {
  const [formData, setFormData] = useState({
    tital: "",
    containt: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/static_manager/add_static", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Static added successfully!");
        router.push("/admin/Static");
      } else {
        alert("Failed to add static.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="static-add-container">
      <div className="static-add-header">
        <button className="static-back-btn" onClick={() => router.push("/admin/static")}>
          ← Back
        </button>
      </div>

      <h2 className="static-add-heading">Add New Static Content</h2>

      <form className="static-add-form" onSubmit={handleSubmit}>
        <div className="static-form-group">
          <label htmlFor="tital">Title</label>
          <input
            type="text"
            id="tital"
            name="tital"
            value={formData.tital}
            onChange={handleChange}
            required
            className="static-input"
          />
        </div>

        <div className="static-form-group">
          <label htmlFor="containt">Content</label>
          <textarea
            id="containt"
            name="containt"
            value={formData.containt}
            onChange={handleChange}
            required
            className="static-textarea"
            rows="5"
          ></textarea>
        </div>

        <button type="submit" className="static-submit-btn">
          ➕ Add Static
        </button>
      </form>
    </div>
  );
}
