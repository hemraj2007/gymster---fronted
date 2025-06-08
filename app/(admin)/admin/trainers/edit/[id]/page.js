"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function TrainerEditPage() {
  const { id } = useParams();  // URL path se id le raha hai
  const router = useRouter();

  const [trainerData, setTrainerData] = useState({
    name: "",
    designation: "",
    mobile_number: "",
    twitter_link: "",
    facebook_link: "",
    linkdin_link: "",
    image: "",
  });

  useEffect(() => {
    if (id) {
      fetchTrainerDetails();
    }
  }, [id]);

  const fetchTrainerDetails = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/trainers/get_trainer_by_id/${id}`);
      if (!res.ok) throw new Error("Failed to fetch trainer");
      const data = await res.json();
      setTrainerData(data);
    } catch (error) {
      console.error("Error fetching trainer details:", error);
      alert("Failed to fetch trainer details. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainerData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/trainers/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trainerData),
      });

      if (response.ok) {
        alert("Trainer updated successfully!");
        router.push("/admin/trainers");
      } else {
        alert("Failed to update trainer. Please try again.");
      }
    } catch (error) {
      console.error("Error updating trainer:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="trainer-container">
      <div className="trainer-top-bar">
        <button className="trainer-btn" onClick={() => router.push("/admin/trainers")}>
          ← Back
        </button>
      </div>

      <h2 className="trainer-heading">Edit Trainer</h2>

      <form onSubmit={handleSubmit} className="trainer-form">
        <div className="trainer-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={trainerData.name}
            onChange={handleChange}
            required
            className="trainer-input"
          />
        </div>

        <div className="trainer-form-group">
          <label htmlFor="designation">Designation</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={trainerData.designation}
            onChange={handleChange}
            required
            className="trainer-input"
          />
        </div>

        <div className="trainer-form-group">
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            type="text"
            id="mobile_number"
            name="mobile_number"
            value={trainerData.mobile_number}
            onChange={handleChange}
            required
            className="trainer-input"
          />
        </div>

        <div className="trainer-form-group">
          <label htmlFor="twitter_link">Twitter Link</label>
          <input
            type="text"
            id="twitter_link"
            name="twitter_link"
            value={trainerData.twitter_link}
            onChange={handleChange}
            className="trainer-input"
          />
        </div>

        <div className="trainer-form-group">
          <label htmlFor="facebook_link">Facebook Link</label>
          <input
            type="text"
            id="facebook_link"
            name="facebook_link"
            value={trainerData.facebook_link}
            onChange={handleChange}
            className="trainer-input"
          />
        </div>

        <div className="trainer-form-group">
          <label htmlFor="linkdin_link">LinkedIn Link</label>
          <input
            type="text"
            id="linkdin_link"
            name="linkdin_link"
            value={trainerData.linkdin_link}
            onChange={handleChange}
            className="trainer-input"
          />
        </div>

        <div className="trainer-form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={trainerData.image}
            onChange={handleChange}
            required
            className="trainer-input"
          />
        </div>

        <button type="submit" className="trainer-submit-btn">
          Update Trainer
        </button>
      </form>
    </div>
  );
}
