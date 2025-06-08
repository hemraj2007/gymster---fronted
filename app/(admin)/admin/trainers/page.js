"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx"; // Excel Export

export default function TrainerManager() {
  const [trainers, setTrainers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/trainers/all_trainers");
      const data = await res.json();
      setTrainers(data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this trainer?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/trainers/delete/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Trainer deleted successfully!");
          fetchTrainers();
        } else {
          alert("Failed to delete trainer. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting trainer:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Trainers List", 14, 10);

    autoTable(doc, {
      head: [["Name", "Designation", "Mobile", "Twitter", "Facebook", "LinkedIn"]],
      body: trainers.map((trainer) => [
        trainer.name,
        trainer.designation,
        trainer.mobile_number,
        trainer.twitter_link,
        trainer.facebook_link,
        trainer.linkdin_link,
      ]),
    });

    doc.save("trainers.pdf");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      trainers.map(({ name, designation, mobile_number, twitter_link, facebook_link, linkdin_link }) => ({
        Name: name,
        Designation: designation,
        Mobile: mobile_number,
        Twitter: twitter_link,
        Facebook: facebook_link,
        LinkedIn: linkdin_link,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trainers");

    XLSX.writeFile(workbook, "trainers.xlsx");
  };

  return (
    <div className="container">
      <div className="top-bar">
        <button className="btn" onClick={() => router.push("/admin/trainers/add")}>
          ➕ Add Trainer
        </button>
        <button className="btn" onClick={downloadPDF}>
          📄 Download PDF
        </button>
        <button className="btn" onClick={downloadExcel}>
          📊 Download Excel
        </button>
      </div>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Mobile</th>
            <th>Twitter</th>
            <th>Facebook</th>
            <th>LinkedIn</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer.id}>
              <td>{trainer.name}</td>
              <td>{trainer.designation}</td>
              <td>{trainer.mobile_number}</td>
              <td>{trainer.twitter_link}</td>
              <td>{trainer.facebook_link}</td>
              <td>{trainer.linkdin_link}</td>
              <td>
                <img src={trainer.image} alt="Trainer" width="50" />
              </td>
              <td>
                <button
                  className="btn edit"
                  onClick={() => router.push(`/admin/trainers/edit/${trainer.id}`)}
                >
                  ✏️ Edit
                </button>
                <button className="btn delete" onClick={() => handleDelete(trainer.id)}>
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
