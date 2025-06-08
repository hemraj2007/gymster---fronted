'use client';
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx"; // Excel Export
import { useRouter } from "next/navigation";

export default function SliderManager() {
  const [sliders, setSliders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/slider/all");
      const data = await res.json();
      setSliders(data);
    } catch (err) {
      console.error("Error fetching sliders:", err);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this slider?");
    if (isConfirmed) {
      try {
        const res = await fetch(`http://127.0.0.1:8000/slider/delete/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          const updatedSliders = sliders.filter((slider) => slider.id !== id);
          setSliders(updatedSliders);
        } else {
          const errorData = await res.json();
          alert("Error deleting slider: " + errorData.detail);
        }
      } catch (error) {
        console.error("Failed to delete slider:", error);
        alert("Something went wrong while deleting the slider.");
      }
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Slider List", 14, 10);

    autoTable(doc, {
      head: [["Title", "Sub Title", "Image", "Status"]],
      body: sliders.map((slider) => [
        slider.title,
        slider.sub_title,
        slider.image,
        slider.status,
      ]),
    });

    doc.save("slider_list.pdf");
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      sliders.map(({ title, sub_title, image, status }) => ({
        Title: title,
        "Sub Title": sub_title,
        Image: image,
        Status: status,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sliders");

    XLSX.writeFile(workbook, "slider_list.xlsx");
  };

  return (
    <div className="slider-container">
      <div className="slider-header">
        <div className="btn-group">
          <button className="add" onClick={() => router.push("/admin/slider/add")}>
            Add to Slider
          </button>
          <button className="download" onClick={handleDownloadPDF}>
            Download to PDF
          </button>
          <button className="download" onClick={handleDownloadExcel}>
            Download to Excel
          </button>
        </div>
      </div>

      <table className="slider-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Sub Title</th>
            <th>Image</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sliders.map((slider, index) => (
            <tr key={index}>
              <td>{slider.title}</td>
              <td>{slider.sub_title}</td>
              <td>
                <img src={slider.image} alt="slider" className="slider-image" />
              </td>
              <td>{slider.status}</td>
              <td>
                <button
                  className="btn-action btn-edit"
                  onClick={() => router.push(`/admin/slider/edit/${slider.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn-action btn-delete"
                  onClick={() => handleDelete(slider.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {sliders.length === 0 && (
            <tr>
              <td colSpan="5" className="text-gray-500 text-center py-4">
                No sliders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
