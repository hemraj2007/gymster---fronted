'use client';
import React, { useEffect, useState } from 'react';

export default function ContactAdminPage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/contact/all');
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="contact-admin-container">
      <h2>Contact Submissions</h2>

      {contacts.length === 0 ? (
        <p className="no-data">No contact messages found.</p>
      ) : (
        <table className="contact-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.subject}</td>
                <td>{contact.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
