"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function EditStaticPage() {
  const { id } = useParams();  // 🔥 useParams se id le rahe hain
  const router = useRouter();

  const [formData, setFormData] = useState({
    tital: "",
    containt: "",
  });

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/static_manager/get_static_by_id/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setFormData({
          tital: data.tital || "",
          containt: data.containt || "",
        });
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to fetch static data");
      }
    };

    if (id) fetchStaticData();
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
      const res = await fetch(`http://127.0.0.1:8000/static_manager/update_static/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("✅ Static content updated successfully!");
      router.push("/admin/static");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("❌ Failed to update static content");
    }
  };

  return (
    <div className="edit-static-container">
      <button
        className="edit-static-back-btn"
        onClick={() => router.back()}
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
        ← Back
      </button>

      <h2 className="edit-static-title">Edit Static Content</h2>

      <form className="edit-static-form" onSubmit={handleSubmit}>
        <div className="edit-static-group">
          <label htmlFor="tital">Title</label>
          <input
            type="text"
            id="tital"
            name="tital"
            value={formData.tital}
            onChange={handleChange}
            className="edit-static-input"
            required
            placeholder="Enter title"
          />
        </div>

        <div className="edit-static-group">
          <label htmlFor="containt">Content</label>
          <textarea
            id="containt"
            name="containt"
            value={formData.containt}
            onChange={handleChange}
            rows="5"
            className="edit-static-textarea"
            required
            placeholder="Enter content"
          ></textarea>
        </div>

        <button type="submit" className="edit-static-btn">
          ✅ Update Static
        </button>
      </form>
    </div>
  );
}
