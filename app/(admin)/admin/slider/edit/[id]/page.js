"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function EditSlider() {
  const { id } = useParams(); // 🔥 Yeh important hai
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    sub_title: "",
    image: "",
    status: "yes",
  });

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/slider/get/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setFormData({
          title: data.title || "",
          sub_title: data.sub_title || "",
          image: data.image || "",
          status: data.status || "yes",
        });
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load slider details");
      }
    };

    if (id) fetchSlider();
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
      const res = await fetch(`http://127.0.0.1:8000/slider/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("✅ Slider updated successfully!");
      router.push("/admin/slider");
    } catch (error) {
      toast.error("❌ Failed to update slider");
    }
  };

  return (
    <div className="container">
      <button
        onClick={() => router.back()}
        className="back-btn"
        style={{
          padding: "10px 20px",
          backgroundColor: "#FB5B21",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Back
      </button>

      <h2 className="heading">Edit Slider</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter title"
          />
        </div>

        <div className="form-group">
          <label>Sub Title</label>
          <input
            type="text"
            name="sub_title"
            value={formData.sub_title}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter sub title"
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter image URL"
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select-field"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Update Slider
        </button>
      </form>
    </div>
  );
}
