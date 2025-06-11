"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function MembershipPage() {
  const [memberships, setMemberships] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/membership_plans/all`) // ✅ Fixed URL
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data || [];
        setMemberships(list);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setMemberships([]); // fallback
      });
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete?")) {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/membership_plans/delete/${id}`, {
        method: "DELETE",
      });
      setMemberships((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Name", "Price", "Duration", "Status", "Final Price", "Discount"]],
      body: memberships.map((m) => [
        m.name,
        m.price,
        m.duration,
        m.status,
        m.final_price,
        m.discount,
      ]),
    });
    doc.save("memberships.pdf");
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(memberships);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Memberships");
    XLSX.writeFile(workbook, "memberships.xlsx");
  };

  return (
    <div className="membership-wrapper">
      <div className="membership-toolbar">
        <button onClick={() => router.push("/admin/membership/add")} className="btn primary-btn">+ Add Membership</button>
        <div className="btn-group">
          <button onClick={downloadPDF} className="btn pdf-btn">Download PDF</button>
          <button onClick={downloadExcel} className="btn excel-btn">Download Excel</button>
        </div>
      </div>

      <div className="table-container">
        <table className="membership-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Final Price</th>
              <th>Discount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.price}</td>
                <td>{m.duration}</td>
                <td>{m.status}</td>
                <td>{m.final_price}</td>
                <td>{m.discount}</td>
                <td>
                  <button onClick={() => router.push(`/admin/membership/edit/${m.id}`)} className="btn edit-btn">Edit</button>
                  <button onClick={() => handleDelete(m.id)} className="btn delete-btn">Delete</button>
                </td>
              </tr>
            ))}
            {memberships.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>
                  No memberships found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
