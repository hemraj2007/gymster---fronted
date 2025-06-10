"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Classes() {
  const [classesData, setClassesData] = useState([]);
  const [activeDay, setActiveDay] = useState("Monday");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classes/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClassesData(response.data);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <>
      {/* Hero Start */}
      <div className="container-fluid bg-primary p-5 bg-hero mb-5">
        <div className="row py-5">
          <div className="col-12 text-center">
            <h1 className="display-2 text-uppercase text-white mb-md-4">
              Classes
            </h1>
            <a href="/" className="btn btn-primary py-md-3 px-md-5 me-3">
              Home
            </a>
            <a href="/classes" className="btn btn-light py-md-3 px-md-5">
              Classes
            </a>
          </div>
        </div>
      </div>
      {/* Hero End */}

      {/* Class Timetable Start */}
      <div className="container-fluid p-5">
        <div className="mb-5 text-center">
          <h5 className="text-primary text-uppercase">Class Schedule</h5>
          <h1 className="display-3 text-uppercase mb-0">Working Hours</h1>
        </div>

        <div className="tab-class text-center">
          <ul className="nav nav-pills d-inline-flex justify-content-center bg-dark text-uppercase rounded-pill mb-5">
            {days.map((day, index) => (
              <li className="nav-item" key={index}>
                <button
                  className={`nav-link rounded-pill text-white ${
                    activeDay === day ? "active" : ""
                  }`}
                  onClick={() => setActiveDay(day)}
                >
                  {day}
                </button>
              </li>
            ))}
          </ul>

          <div className="row g-5">
            {classesData
              .filter((item) => item.day === activeDay)
              .map((item, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="bg-dark rounded text-center py-5 px-3">
                    <h6 className="text-uppercase text-light mb-3">
                      {item.timeing}
                    </h6>
                    <h5 className="text-uppercase text-primary">
                      {item.class_name}
                    </h5>
                    <p className="text-uppercase text-secondary mb-0">
                      Trainer #{item.trainer_id}
                    </p>
                  </div>
                </div>
              ))}

            {classesData.filter((item) => item.day === activeDay).length === 0 && (
              <p className="text-white">No classes available for {activeDay}.</p>
            )}
          </div>
        </div>
      </div>
      {/* Class Timetable End */}
    </>
  );
}
