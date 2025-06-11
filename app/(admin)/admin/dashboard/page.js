'use client';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [counts, setCounts] = useState({
    users: 0,
    sliders: 0,
    trainers: 0,
    memberships: 0,
    contacts: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [uRes, sRes, tRes, mRes, cRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/users`),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/slider/all`),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/trainers/all_trainers`),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/membership_plans/all`),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/all`),
        ]);

        const [users, sliders, trainers, memberships, contacts] = await Promise.all([
          uRes.json(),
          sRes.json(),
          tRes.json(),
          mRes.json(),
          cRes.json(),
        ]);

        setCounts({
          users: users.length,
          sliders: sliders.length,
          trainers: trainers.length,
          memberships: memberships.length,
          contacts: contacts.length
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card users">👥 Users: {counts.users}</div>
        <div className="card sliders">🖼️ Sliders: {counts.sliders}</div>
        <div className="card trainers">🏋️ Trainers: {counts.trainers}</div>
        <div className="card memberships">💳 Memberships: {counts.memberships}</div>
        <div className="card contacts">📬 Contacts: {counts.contacts}</div>
      </div>
    </div>
  );
}
