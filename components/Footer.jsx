"use client";
import React, { useEffect, useState } from "react";

export default function Footer() {
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [links, setLinks] = useState({
    twitter: "#",
    facebook: "#",
    linkedin: "#",
    instagram: "#",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/admin_profile/all");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setAddress(data[0].address);
          setMobile(data[0].mobile_number);
          setLinks({
            twitter: data[0].twitter_link || "#",
            facebook: data[0].fb_link || "#",
            linkedin: data[0].linkedin_link || "#",
            instagram: data[0].instagram_link || "#",
          });
        }
      } catch (error) {
        console.error("Failed to fetch footer profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container-fluid bg-dark text-secondary px-5 mt-5">
        <div className="row gx-5">
          <div className="col-lg-8 col-md-6">
            <div className="row gx-5">
              <div className="col-lg-4 col-md-12 pt-5 mb-5">
                <h4 className="text-uppercase text-light mb-4">Get In Touch</h4>
                <div className="d-flex mb-2">
                  <i className="bi bi-geo-alt text-primary me-2" />
                  <p className="mb-0">{address || "Loading..."}</p>
                </div>
                <div className="d-flex mb-2">
                  <i className="bi bi-envelope-open text-primary me-2" />
                  <p className="mb-0">info@example.com</p>
                </div>
                <div className="d-flex mb-2">
                  <i className="bi bi-telephone text-primary me-2" />
                  <p className="mb-0">{mobile || "Loading..."}</p>
                </div>
                <div className="d-flex mt-4">
                  <a className="btn btn-primary btn-square rounded-circle me-2" href={links.twitter} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter" />
                  </a>
                  <a className="btn btn-primary btn-square rounded-circle me-2" href={links.facebook} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a className="btn btn-primary btn-square rounded-circle me-2" href={links.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in" />
                  </a>
                  <a className="btn btn-primary btn-square rounded-circle" href={links.instagram} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-lg-4 col-md-12 pt-0 pt-lg-5 mb-5">
                <h4 className="text-uppercase text-light mb-4">Quick Links</h4>
                <div className="d-flex flex-column justify-content-start">
                  {["Home", "About Us", "Class Schedule", "Our Trainers", "Latest Blog", "Contact Us"].map((link, idx) => (
                    <a key={idx} className="text-secondary mb-2" href="#">
                      <i className="bi bi-arrow-right text-primary me-2" />
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              {/* Popular Links */}
              <div className="col-lg-4 col-md-12 pt-0 pt-lg-5 mb-5">
                <h4 className="text-uppercase text-light mb-4">Popular Links</h4>
                <div className="d-flex flex-column justify-content-start">
                  {["Home", "About Us", "Class Schedule", "Our Trainers", "Latest Blog", "Contact Us"].map((link, idx) => (
                    <a key={idx} className="text-secondary mb-2" href="#">
                      <i className="bi bi-arrow-right text-primary me-2" />
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex flex-column align-items-center justify-content-center text-center h-100 bg-primary p-5">
              <h4 className="text-uppercase text-white mb-4">Newsletter</h4>
              <h6 className="text-uppercase text-white">Subscribe Our Newsletter</h6>
              <p className="text-light">
                Amet justo diam dolor rebum lorem sit stet sea justo kasd
              </p>
              <form action="">
                <div className="input-group">
                  <input type="text" className="form-control border-white p-3" placeholder="Your Email" />
                  <button className="btn btn-dark">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container-fluid py-4 py-lg-0 px-5" style={{ background: "#111111" }}>
        <div className="row gx-5">
          <div className="col-lg-8">
            <div className="py-lg-4 text-center">
              <p className="text-secondary mb-0">
                ©{" "}
                <a className="text-light fw-bold" href="#">
                  Your Site Name
                </a>
                . All Rights Reserved.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="py-lg-4 text-center credit">
              <p className="text-light mb-0">
                Designed by{" "}
                <a className="text-light fw-bold" href="https://htmlcodex.com">
                  HTML Codex
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
