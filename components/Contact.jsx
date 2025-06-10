"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)

      });

      if (res.ok) {
        alert("You have successfully sent the message!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="container-fluid bg-primary p-5 bg-hero mb-5">
        <div className="row py-5">
          <div className="col-12 text-center">
            <h1 className="display-2 text-uppercase text-white mb-md-4">Contact</h1>
            <a href="/" className="btn btn-primary py-md-3 px-md-5 me-3">Home</a>
            <a href="#" className="btn btn-light py-md-3 px-md-5">Contact</a>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container-fluid p-5">
        <div className="mb-5 text-center">
          <h5 className="text-primary text-uppercase">Contact Us</h5>
          <h1 className="display-3 text-uppercase mb-0">Get In Touch</h1>
        </div>

        <div className="row g-5 mb-5">
          {/* Info Boxes */}
          <div className="col-lg-4">
            <div className="d-flex flex-column align-items-center bg-dark rounded text-center py-5 px-3">
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: 60, height: 60 }}>
                <i className="fa fa-map-marker-alt fs-4 text-white" />
              </div>
              <h5 className="text-uppercase text-primary">Visit Us</h5>
              <p className="text-secondary mb-0">123 Street, New York, USA</p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="d-flex flex-column align-items-center bg-dark rounded text-center py-5 px-3">
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: 60, height: 60 }}>
                <i className="fa fa-envelope fs-4 text-white" />
              </div>
              <h5 className="text-uppercase text-primary">Email Us</h5>
              <p className="text-secondary mb-0">info@example.com</p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="d-flex flex-column align-items-center bg-dark rounded text-center py-5 px-3">
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: 60, height: 60 }}>
                <i className="fa fa-phone fs-4 text-white" />
              </div>
              <h5 className="text-uppercase text-primary">Call Us</h5>
              <p className="text-secondary mb-0">+012 345 6789</p>
            </div>
          </div>
        </div>

        <div className="row g-0">
          <div className="col-lg-6">
            <div className="bg-dark p-5">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-6">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control bg-light border-0 px-4"
                      placeholder="Your Name"
                      required
                      style={{ height: 55 }}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control bg-light border-0 px-4"
                      placeholder="Your Email"
                      required
                      style={{ height: 55 }}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-control bg-light border-0 px-4"
                      placeholder="Subject"
                      required
                      style={{ height: 55 }}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-control bg-light border-0 px-4 py-3"
                      rows={4}
                      placeholder="Message"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-6">
            <iframe
              className="w-100"
              src="https://www.google.com/maps/embed?...(shortened for brevity)..."
              frameBorder={0}
              style={{ height: 457, border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex={0}
            />
          </div>
        </div>
      </div>
    </>
  );
}
