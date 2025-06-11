"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useRouter } from "next/navigation";

const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/user/${id}`);
      alert("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete user.");
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["ID", "First Name", "Last Name", "Email", "Mobile", "Age", "Gender", "Role"]],
      body: users.map((u) => [
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.mobile,
        u.age,
        u.gender,
        u.role
      ]),
    });
    doc.save("users.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "users.xlsx");
  };

  return (
    <div className="users-manager-container" style={{ padding: "20px" }}>

      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => router.push("/admin/users/add")}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ➕ Add User
        </button>
        <button
          onClick={exportToPDF}
          style={{
            marginLeft: "10px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Export to PDF
        </button>
        <button
          onClick={exportToExcel}
          style={{
            marginLeft: "10px",
            backgroundColor: "#17a2b8",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Export to Excel
        </button>
      </div>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.first_name}</td>
              <td>{u.last_name}</td>
              <td>{u.email}</td>
              <td>{u.mobile}</td>
              <td>{u.age}</td>
              <td>{u.gender}</td>
              <td>{u.role}</td>
              <td>
                <button
                  onClick={() => router.push(`/admin/users/edit/${u.id}`)}
                  style={{
                    backgroundColor: "#ffc107",
                    color: "#000",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  style={{
                    marginLeft: "8px",
                    background: "red",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersManager;
