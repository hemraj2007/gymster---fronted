"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddClass() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    trainer_id: "",
    day: "",
    class_name: "",
    timeing: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classes/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Class added successfully");
        router.push("/admin/classes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-class-container">
      <button className="btn-add-class" onClick={() => router.back()}>
        Back
      </button>
      <h2 className="add-class-title">Add Class</h2>
      <form onSubmit={handleSubmit} className="add-class-form">
        <input
          type="number"
          name="trainer_id"
          placeholder="Trainer ID"
          value={formData.trainer_id}
          onChange={handleChange}
          required
          className="add-class-input"
        /><br />

        {/* 🔽 Day Dropdown */}
        <select
          name="day"
          value={formData.day}
          onChange={handleChange}
          required
          className="add-class-input"
        >
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select><br />

        <input
          type="text"
          name="class_name"
          placeholder="Class Name"
          value={formData.class_name}
          onChange={handleChange}
          required
          className="add-class-input"
        /><br />

        {/* 🔽 Timing Dropdown */}
        <select
          name="timeing"
          value={formData.timeing}
          onChange={handleChange}
          required
          className="add-class-input"
        >
          <option value="">Select Timing</option>
          <option value="6:00 AM to 7:00 AM">6:00 AM to 7:00 AM</option>
          <option value="7:00 AM to 8:00 AM">7:00 AM to 8:00 AM</option>
          <option value="8:00 AM to 9:00 AM">8:00 AM to 9:00 AM</option>
          <option value="9:00 AM to 10:00 AM">9:00 AM to 10:00 AM</option>
          <option value="5:00 PM to 6:00 PM">5:00 PM to 6:00 PM</option>
          <option value="6:00 PM to 7:00 PM">6:00 PM to 7:00 PM</option>
        </select><br />

        <button type="submit" className="btn-add-class">
          Add Class
        </button>
      </form>
    </div>
  );
}
