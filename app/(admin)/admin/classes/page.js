"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export default function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classes/all`)
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this class?");
    if (!confirm) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classes/delete/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setClasses(classes.filter((cls) => cls.id !== id));
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Classes List", 10, 10);
    classes.forEach((cls, i) => {
      doc.text(
        `${i + 1}. ${cls.class_name} | ${cls.day} | ${cls.timeing}`,
        10,
        20 + i * 10
      );
    });
    doc.save("classes.pdf");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(classes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Classes");
    XLSX.writeFile(workbook, "classes.xlsx");
  };

  return (
    <div className="container">
      <div className="actions">
        <button className="btn add" onClick={() => router.push("/admin/classes/add")}>
          Add Class
        </button>
        <button className="btn pdf" onClick={exportToPDF}>
          Download PDF
        </button>
        <button className="btn excel" onClick={exportToExcel}>
          Download Excel
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Trainer ID</th>
            <th>Class Name</th>
            <th>Day</th>
            <th>Timing</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id}>
              <td>{cls.id}</td>
              <td>{cls.trainer_id}</td>
              <td>{cls.class_name}</td>
              <td>{cls.day}</td>
              <td>{cls.timeing}</td>
              <td>
                <button
                  className="btn edit"
                  onClick={() => router.push(`/admin/classes/edit/${cls.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn delete"
                  onClick={() => handleDelete(cls.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
