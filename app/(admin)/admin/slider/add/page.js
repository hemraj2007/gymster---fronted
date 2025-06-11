"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSlider() {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("no");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sliderData = {
      title,
      sub_title: subTitle,
      image,
      status,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/slider/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sliderData),
      });

      if (response.ok) {
        // Success, navigate back to the slider manager page
        alert("Slider added successfully!");
        router.push("/admin/slider");  // Redirect after success
      } else {
        // Handle error from backend
        const errorData = await response.json();
        setError(errorData.detail || "Failed to add slider");
      }
    } catch (err) {
      console.error("Error adding slider:", err);
      setError("Failed to add slider");
    }
  };

  return (
    <div className="slider-add-container">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => router.push("/admin/slider")}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Back to Slider List
        </button>
        <h2 className="text-xl font-bold">Add Slider</h2>
      </div>
      {error && <div className="error-message text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="slider-add-form">
        <div className="form-group">
          <label htmlFor="title" className="block mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subTitle" className="block mb-2">Sub Title</label>
          <input
            type="text"
            id="subTitle"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image" className="block mb-2">Image URL</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status" className="block mb-2">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn-submit bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Slider
        </button>
      </form>
    </div>
  );
}
