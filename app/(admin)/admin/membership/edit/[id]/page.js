"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditMembershipPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    duration: "Monthly",
    status: "Yes",
    final_price: 0,
    discount: 0,
  });

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/membership_plans/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const safeData = {
          name: data.name ?? "",
          price: data.price ?? 0,
          duration: data.duration ?? "Monthly",
          status: data.status ?? "Yes",
          final_price: data.final_price ?? 0,
          discount: data.discount ?? 0,
        };
        setFormData(safeData);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://127.0.0.1:8000/membership_plans/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Membership updated successfully");
      router.back();
    }
  };

  return (
    <div className="edit-form-wrapper">
      <div className="edit-form-header">
        <button onClick={() => router.back()} className="btn back-btn">← Back</button>
        <h2>Edit Membership</h2>
      </div>
      <form onSubmit={handleUpdate} className="edit-form-box">
        {Object.keys(formData).map((key) => (
          <div key={key} className="edit-form-group">
            <label className="edit-form-label">{key.replace("_", " ").toUpperCase()}</label>

            {/* ✅ Custom dropdown for duration */}
            {key === "duration" ? (
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="edit-form-input"
                required
              >
                <option value="Monthly">Monthly</option>
                <option value="Half Yearly">Half Yearly</option>
                <option value="Yearly">Yearly</option>
              </select>
            ) : (
              <input
                type={typeof formData[key] === "number" ? "number" : "text"}
                value={
                  formData[key] === null || formData[key] === undefined
                    ? typeof formData[key] === "number"
                      ? 0
                      : ""
                    : formData[key]
                }
                onChange={(e) => {
                  const value =
                    typeof formData[key] === "number" ? Number(e.target.value) : e.target.value;
                  setFormData({ ...formData, [key]: value });
                }}
                className="edit-form-input"
                required
              />
            )}
          </div>
        ))}
        <button type="submit" className="btn update-btn">Update Membership</button>
      </form>
    </div>
  );
}
