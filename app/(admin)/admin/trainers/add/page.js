"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function TrainerAdd() {
  const [trainerData, setTrainerData] = useState({
    name: "",
    designation: "",
    mobile_number: "",
    twitter_link: "",
    facebook_link: "",
    linkdin_link: "",
    image: "",
  });
  const router = useRouter();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainerData({ ...trainerData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/trainers/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trainerData),
      });

      if (response.ok) {
        alert("Trainer added successfully!");
        router.push("/admin/trainers"); // Redirect to the trainers list page
      } else {
        alert("Failed to add trainer. Please try again.");
      }
    } catch (error) {
      console.error("Error adding trainer:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="trainer-form-container">
      <div className="form-header">
        <button className="btn back-btn" onClick={() => router.push("/admin/trainers")}>
          ← Back
        </button>
      </div>

      <h2 className="form-title">Add New Trainer</h2>

      <form className="trainer-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={trainerData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="designation" className="form-label">Designation</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={trainerData.designation}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
          <input
            type="text"
            id="mobile_number"
            name="mobile_number"
            value={trainerData.mobile_number}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="twitter_link" className="form-label">Twitter Link</label>
          <input
            type="text"
            id="twitter_link"
            name="twitter_link"
            value={trainerData.twitter_link}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="facebook_link" className="form-label">Facebook Link</label>
          <input
            type="text"
            id="facebook_link"
            name="facebook_link"
            value={trainerData.facebook_link}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="linkdin_link" className="form-label">LinkedIn Link</label>
          <input
            type="text"
            id="linkdin_link"
            name="linkdin_link"
            value={trainerData.linkdin_link}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={trainerData.image}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="btn submit-btn">
          Add Trainer
        </button>
      </form>
    </div>
  );
}
