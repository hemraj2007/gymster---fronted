// ✅ File: AddMembershipPage.jsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMembershipPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    duration: "Monthly",
    status: "Yes",
    final_price: 0,
    discount: 0,
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/membership_plans/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Membership added successfully");
      router.back();
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <button onClick={() => router.back()} className="btn back-btn">← Back</button>
        <h2>Add Membership</h2>
      </div>
      <form onSubmit={handleSubmit} className="form-box">
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-control">
            <label className="form-label">{key.replace("_", " ").toUpperCase()}</label>

            {/* ✅ Duration field dropdown */}
            {key === "duration" ? (
              <select
                className="form-input"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              >
                <option value="Monthly">Monthly</option>
                <option value="Half Yearly">Half Yearly</option>
                <option value="Yearly">Yearly</option>
              </select>
            ) : (
              <input
                className="form-input"
                type={typeof formData[key] === "number" ? "number" : "text"}
                value={formData[key]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [key]: typeof formData[key] === "number" ? Number(e.target.value) : e.target.value,
                  })
                }
                required
              />
            )}
          </div>
        ))}
        <button type="submit" className="btn submit-btn">Add Membership</button>
      </form>
    </div>
  );
}
