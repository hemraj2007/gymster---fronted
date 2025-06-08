"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function EditProfilePage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    address: "",
    mobile_number: "",
    twitter_link: "",
    linkedin_link: "",
    facebook_link: "",
    insta_link: "",
    youtube_link: "",
    experience_in_year: 0,
    total_trainers: 0,
    complete_project_number: 0,
    happy_clients_number: 0,
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/admin_profile/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(() => toast.error("Failed to load profile details"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:8000/admin_profile/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Profile updated successfully!");
      router.push("/admin/profile");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="profile-edit-container">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="back-button"
        type="button"
      >
        ← Back
      </button>

      <h1 className="profile-edit-title">Edit Info Manager</h1>

      <form onSubmit={handleSubmit} className="profile-edit-form">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="profile-input"
        />

        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          id="mobile_number"
          name="mobile_number"
          value={formData.mobile_number}
          onChange={handleChange}
          placeholder="Mobile Number"
          required
          className="profile-input"
        />

        <label htmlFor="twitter_link">Twitter Link</label>
        <input
          id="twitter_link"
          name="twitter_link"
          value={formData.twitter_link}
          onChange={handleChange}
          placeholder="Twitter Link"
          className="profile-input"
        />

        <label htmlFor="linkedin_link">LinkedIn Link</label>
        <input
          id="linkedin_link"
          name="linkedin_link"
          value={formData.linkedin_link}
          onChange={handleChange}
          placeholder="LinkedIn Link"
          className="profile-input"
        />

        <label htmlFor="facebook_link">Facebook Link</label>
        <input
          id="facebook_link"
          name="facebook_link"
          value={formData.facebook_link}
          onChange={handleChange}
          placeholder="Facebook Link"
          className="profile-input"
        />

        <label htmlFor="insta_link">Instagram Link</label>
        <input
          id="insta_link"
          name="insta_link"
          value={formData.insta_link}
          onChange={handleChange}
          placeholder="Instagram Link"
          className="profile-input"
        />

        <label htmlFor="youtube_link">YouTube Link</label>
        <input
          id="youtube_link"
          name="youtube_link"
          value={formData.youtube_link}
          onChange={handleChange}
          placeholder="YouTube Link"
          className="profile-input"
        />

        <label htmlFor="experience_in_year">Experience (Years)</label>
        <input
          id="experience_in_year"
          type="number"
          name="experience_in_year"
          value={formData.experience_in_year}
          onChange={handleChange}
          placeholder="Experience (Years)"
          className="profile-input"
        />

        <label htmlFor="total_trainers">Total Trainers</label>
        <input
          id="total_trainers"
          type="number"
          name="total_trainers"
          value={formData.total_trainers}
          onChange={handleChange}
          placeholder="Total Trainers"
          className="profile-input"
        />

        <label htmlFor="complete_project_number">Projects Completed</label>
        <input
          id="complete_project_number"
          type="number"
          name="complete_project_number"
          value={formData.complete_project_number}
          onChange={handleChange}
          placeholder="Projects Completed"
          className="profile-input"
        />

        <label htmlFor="happy_clients_number">Happy Clients</label>
        <input
          id="happy_clients_number"
          type="number"
          name="happy_clients_number"
          value={formData.happy_clients_number}
          onChange={handleChange}
          placeholder="Happy Clients"
          className="profile-input"
        />

        <div className="submit-container">
          <button type="submit" className="profile-submit-btn">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
