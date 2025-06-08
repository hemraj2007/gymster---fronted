"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditClass() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    trainer_id: "",
    day: "",
    class_name: "",
    timeing: ""
  });

  const validDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const validTimings = [
    "6:00 AM to 7:00 AM",
    "7:00 AM to 8:00 AM",
    "8:00 AM to 9:00 AM",
    "9:00 AM to 10:00 AM",
    "5:00 PM to 6:00 PM",
    "6:00 PM to 7:00 PM"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/classes/${id}`);
        if (!res.ok) throw new Error("Failed to fetch class data");

        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:8000/classes/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Class updated successfully");
      router.push("/admin/classes");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update class");
    }
  };

  return (
    <div className="edit-class-container">
      <button className="btn-edit-class" onClick={() => router.back()}>
        Back
      </button>
      <h2 className="edit-class-title">Edit Class</h2>
      <form onSubmit={handleSubmit} className="edit-class-form">

        <label htmlFor="trainer_id">Trainer ID:</label>
        <input
          type="number"
          id="trainer_id"
          name="trainer_id"
          value={formData.trainer_id}
          onChange={handleChange}
          required
          className="edit-class-input"
        />
        <br />

        <label htmlFor="day">Day:</label>
        <select
          id="day"
          name="day"
          value={formData.day}
          onChange={handleChange}
          required
          className="edit-class-input"
        >
          <option value="">Select Day</option>
          {validDays.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <br />

        <label htmlFor="class_name">Class Name:</label>
        <input
          type="text"
          id="class_name"
          name="class_name"
          value={formData.class_name}
          onChange={handleChange}
          required
          className="edit-class-input"
        />
        <br />

        <label htmlFor="timeing">Timing:</label>
        <select
          id="timeing"
          name="timeing"
          value={formData.timeing}
          onChange={handleChange}
          required
          className="edit-class-input"
        >
          <option value="">Select Timing</option>
          {validTimings.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        <br />

        <button type="submit" className="btn-edit-class">
          Update Class
        </button>
      </form>
    </div>
  );
}
