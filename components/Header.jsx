"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    address: "",
    mobile_number: "",
    twitter_link: "#",
    fb_link: "#",
    linkedin_link: "#",
    instagram_link: "#",
    youtube_link: "#",
  });
  const dropdownRef = useRef(null);
  const router = useRouter();

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    router.push("/join");
  };

  // ✅ Fetch contact & social links
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin_profile/all`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setContactInfo({
            address: data[0].address,
            mobile_number: data[0].mobile_number,
            twitter_link: data[0].twitter_link || "#",
            fb_link: data[0].fb_link || "#",
            linkedin_link: data[0].linkedin_link || "#",
            instagram_link: data[0].instagram_link || "#",
            youtube_link: data[0].youtube_link || "#",
          });
        }
      } catch (err) {
        console.error("Failed to fetch header contact info:", err);
      }
    };
    fetchContact();
  }, []);

  return (
    <header className="bg-gray-800 text-white">
      <div className="container-fluid bg-dark px-0">
        <div className="row gx-0">
          <div className="col-lg-3 bg-dark d-none d-lg-block">
            <Link
              href="/"
              className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
            >
              <h1 className="m-0 display-4 text-primary text-uppercase">
                Gymster
              </h1>
            </Link>
          </div>

          <div className="col-lg-9">
            {/* Top Bar */}
            <div className="row gx-0 bg-secondary d-none d-lg-flex">
              <div className="col-lg-7 px-5 text-start">
                <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                  <i className="fa fa-envelope text-primary me-2" />
                  <h6 className="mb-0">info@example.com</h6>
                </div>
                <div className="h-100 d-inline-flex align-items-center py-2">
                  <i className="fa fa-phone-alt text-primary me-2" />
                  <h6 className="mb-0">
                    {contactInfo.mobile_number || "+91 XXXXX-XXXXX"}
                  </h6>
                </div>
              </div>
              <div className="col-lg-5 px-5 text-end">
                <div className="d-inline-flex align-items-center py-2">
                  <a className="btn btn-light btn-square rounded-circle me-2" href={contactInfo.fb_link} target="_blank"><i className="fab fa-facebook-f" /></a>
                  <a className="btn btn-light btn-square rounded-circle me-2" href={contactInfo.twitter_link} target="_blank"><i className="fab fa-twitter" /></a>
                  <a className="btn btn-light btn-square rounded-circle me-2" href={contactInfo.linkedin_link} target="_blank"><i className="fab fa-linkedin-in" /></a>
                  <a className="btn btn-light btn-square rounded-circle me-2" href={contactInfo.instagram_link} target="_blank"><i className="fab fa-instagram" /></a>
                  <a className="btn btn-light btn-square rounded-circle" href={contactInfo.youtube_link} target="_blank"><i className="fab fa-youtube" /></a>
                </div>
              </div>
            </div>

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0 px-lg-5">
              <Link href="/" className="navbar-brand d-block d-lg-none">
                <h1 className="m-0 display-4 text-primary text-uppercase">
                  Gymster
                </h1>
              </Link>

              <button
                type="button"
                className="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav mr-auto py-0">
                  <Link href="/" className="nav-item nav-link active">Home</Link>
                  <Link href="/about" className="nav-item nav-link">About</Link>
                  <Link href="/classes" className="nav-item nav-link">Classes</Link>
                  <Link href="/team" className="nav-item nav-link">Trainers</Link>
                  <Link href="/membership" className="nav-item nav-link">Membership</Link>
                  <Link href="/contact" className="nav-item nav-link">Contact</Link>
                </div>

                {user ? (
                  <div className="position-relative" ref={dropdownRef}>
                    <span
                      className="btn btn-primary py-md-3 px-md-5 d-none d-lg-block cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      👤 {user.first_name} {user.last_name}
                    </span>

                    {showDropdown && (
                      <ul className="dropdown-menu show position-absolute end-0 mt-2"
                        style={{
                          backgroundColor: "#1f2937",
                          borderRadius: "10px",
                          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                          padding: "10px",
                          width: "200px",
                          zIndex: 9999,
                        }}
                      >
                        <li><Link href="/profile" className="dropdown-item text-white">👤 Profile</Link></li>
                        <li><Link href="/update-password" className="dropdown-item text-white">🔒 Update Password</Link></li>
                        <li><Link href="/subscription" className="dropdown-item text-white">💳 Subscription</Link></li>
                        <li>
                          <button onClick={handleLogout} className="dropdown-item text-white w-100 text-start">🚪 Logout</button>
                        </li>
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link href="/join" className="btn btn-primary py-md-3 px-md-5 d-none d-lg-block">
                    Join Us
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
