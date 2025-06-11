"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function StaticManagerPage() {
  const [statics, setStatics] = useState([]);
  const router = useRouter();

  // Fetch static data
  const fetchStatics = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/static_manager/aal_static`);
      const data = await res.json();
      setStatics(data);
    } catch (err) {
      console.error("Error fetching static data:", err);
    }
  };

  useEffect(() => {
    fetchStatics();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/static_manager/delete_static${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Static entry deleted!");
        fetchStatics();
      } else {
        alert("Failed to delete entry");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Title", "Content"]],
      body: statics.map((item) => [item.tital, item.containt]),
    });
    doc.save("static_data.pdf");
  };

  // Download Excel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(statics);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Statics");
    XLSX.writeFile(workbook, "static_data.xlsx");
  };

  return (
    <div className="static-container">
      <div className="static-header">
        <button className="static-btn" onClick={() => router.push("/admin/Static/add")}>
          ➕ Add Static
        </button>
        <button className="static-btn" onClick={downloadPDF}>
          📄 Download PDF
        </button>
        <button className="static-btn" onClick={downloadExcel}>
          📊 Download Excel
        </button>
      </div>

      <table className="static-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {statics.map((item, index) => (
            <tr key={index}>
              <td>{item.tital}</td>
              <td>{item.containt}</td>
              <td>
                <button
                  className="action-btn edit"
                  onClick={() => router.push(`/admin/Static/edit/${item.id}`)} // ✅ Correct
                >
                  ✏️ Edit
                </button>
                <button className="action-btn delete" onClick={() => handleDelete(item.id)}>
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
