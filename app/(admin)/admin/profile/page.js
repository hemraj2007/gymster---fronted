'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileManager() {
  const [profiles, setProfiles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin_profile/all")
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch((error) => console.error("Fetch failed:", error));
  }, []);

  const handleEdit = (id) => {
    router.push(`/admin/profile/edit/${id}`);
  };

  return (
    <div className="profile-list-container">
      <h2 className="profile-list-title">Info Manager</h2>

      <div className="profile-card-wrapper">
        {profiles.map((profile) => (
          <div className="profile-card" key={profile.id}>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Mobile:</strong> {profile.mobile_number}</p>
            <p><strong>Twitter:</strong> {profile.twitter_link}</p>
            <p><strong>LinkedIn:</strong> {profile.linkedin_link}</p>
            <p><strong>Facebook:</strong> {profile.facebook_link}</p>
            <p><strong>Instagram:</strong> {profile.insta_link}</p>
            <p><strong>YouTube:</strong> {profile.youtube_link}</p>
            <p><strong>Experience (Years):</strong> {profile.experience_in_year}</p>
            <p><strong>Total Trainers:</strong> {profile.total_trainers}</p>
            <p><strong>Projects:</strong> {profile.complete_project_number}</p>
            <p><strong>Happy Clients:</strong> {profile.happy_clients_number}</p>

            <button
              className="profile-edit-btn"
              onClick={() => handleEdit(profile.id)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
