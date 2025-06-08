"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Blog() {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/slider/all");
        const data = await res.json();
        setSliders(data.filter((item) => item.status === "yes"));
      } catch (error) {
        console.error("Failed to fetch sliders", error);
      }
    };

    fetchSliders();
  }, []);

  const [trainers, setTrainers] = useState([]);
  // Loading state
  const [loading, setLoading] = useState(true);
  // Error state
  const [error, setError] = useState(null);

  // Function to fetch trainers data from API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/trainers/all_trainers")
      .then((response) => {
        setTrainers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load trainers", err);
        setError("Error loading trainers data");
        setLoading(false);
      });
  }, []);

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
        const response = await axios.get("http://127.0.0.1:8000/classes/all", {
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

  const [profileData, setProfileData] = useState({
    experience_in_year: 0,
    total_trainers: 0,
    complete_project_number: 0,
    happy_clients_number: 0,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/admin_profile/all");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProfileData(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };
    fetchProfileData();
  }, []);





  // Loading state UI
  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading trainers data...</p>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="alert alert-danger text-center">
        {error} <br />
        <button
          className="btn btn-primary mt-2"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Carousel Start */}
      <div className="container-fluid p-0 mb-5">
        <div
          id="header-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {sliders.map((slider, index) => (
              <div
                key={slider.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  className="w-100"
                  src={slider.image}
                  alt={slider.title}
                  style={{ maxHeight: "700px", objectFit: "cover" }}
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: 900 }}>
                    <h5 className="text-white text-uppercase">
                      Best Gym Center
                    </h5>
                    <h1 className="display-2 text-white text-uppercase mb-md-4">
                      {slider.title}
                    </h1>
                    <p className="text-white mb-4">{slider.sub_title}</p>
                    <a href="#" className="btn btn-primary py-md-3 px-md-5 me-3">
                      Join Us
                    </a>
                    <a href="#" className="btn btn-light py-md-3 px-md-5">
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Carousel End */}
      {/* About Start */}
      <div className="container-fluid p-5">
        <div className="row gx-5">
          <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: 500 }}>
            <div className="position-relative h-100">
              <img
                className="position-absolute w-100 h-100 rounded"
                src="img/about.jpg"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="mb-4">
              <h5 className="text-primary text-uppercase">About Us</h5>
              <h1 className="display-3 text-uppercase mb-0">Welcome to Gymster</h1>
            </div>
            <h4 className="text-body mb-4">
              Diam dolor diam ipsum tempor sit. Clita erat ipsum et lorem stet no
              labore lorem sit clita duo justo magna dolore
            </h4>
            <p className="mb-4">
              Nonumy erat diam duo labore clita. Sit magna ipsum dolor sed ea duo at
              ut. Tempor sit lorem sit magna ipsum duo. Sit eos dolor ut sea rebum,
              diam sea rebum lorem kasd ut ipsum dolor est ipsum. Et stet amet justo
              amet clita erat, ipsum sed at ipsum eirmod labore lorem.
            </p>
            <div className="rounded bg-dark p-5">
              <ul className="nav nav-pills justify-content-between mb-3">
                <li className="nav-item w-50">
                  <a
                    className="nav-link text-uppercase text-center w-100 active"
                    data-bs-toggle="pill"
                    href="#pills-1"
                  >
                    About Us
                  </a>
                </li>
                <li className="nav-item w-50">
                  <a
                    className="nav-link text-uppercase text-center w-100"
                    data-bs-toggle="pill"
                    href="#pills-2"
                  >
                    Why Choose Us
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="pills-1">
                  <p className="text-secondary mb-0">
                    Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam
                    dolor diam ipsum et, tempor voluptua sit consetetur sit.
                    Aliquyam diam amet diam et eos sadipscing labore. Clita erat
                    ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus
                    clita duo justo et tempor consetetur takimata eirmod, dolores
                    takimata consetetur invidunt magna dolores aliquyam dolores
                    dolore. Amet erat amet et magna
                  </p>
                </div>
                <div className="tab-pane fade" id="pills-2">
                  <p className="text-secondary mb-0">
                    Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam
                    dolor diam ipsum et, tempor voluptua sit consetetur sit.
                    Aliquyam diam amet diam et eos sadipscing labore. Clita erat
                    ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus
                    clita duo justo et tempor consetetur takimata eirmod, dolores
                    takimata consetetur invidunt magna dolores aliquyam dolores
                    dolore. Amet erat amet et magna
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
      {/* Programe Start */}
      <div
        className="container-fluid programe position-relative px-5 mt-5"
        style={{ marginBottom: 135 }}
      >
        <div className="row g-5 gb-5">
          <div className="col-lg-4 col-md-6">
            <div className="bg-light rounded text-center p-5">
              <i className="flaticon-six-pack display-1 text-primary" />
              <h3 className="text-uppercase my-4">Body Building</h3>
              <p>
                Sed amet tempor amet sit kasd sea lorem dolor ipsum elitr dolor amet
                kasd elitr duo vero amet amet stet
              </p>
              <a className="text-uppercase" href="">
                Read More <i className="bi bi-arrow-right" />
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="bg-light rounded text-center p-5">
              <i className="flaticon-barbell display-1 text-primary" />
              <h3 className="text-uppercase my-4">Weight Lefting</h3>
              <p>
                Sed amet tempor amet sit kasd sea lorem dolor ipsum elitr dolor amet
                kasd elitr duo vero amet amet stet
              </p>
              <a className="text-uppercase" href="">
                Read More <i className="bi bi-arrow-right" />
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="bg-light rounded text-center p-5">
              <i className="flaticon-bodybuilding display-1 text-primary" />
              <h3 className="text-uppercase my-4">Muscle Building</h3>
              <p>
                Sed amet tempor amet sit kasd sea lorem dolor ipsum elitr dolor amet
                kasd elitr duo vero amet amet stet
              </p>
              <a className="text-uppercase" href="">
                Read More <i className="bi bi-arrow-right" />
              </a>
            </div>
          </div>
          <div className="col-lg-12 col-md-6 text-center">
            <h1 className="text-uppercase text-light mb-4">
              30% Discount For This Summer
            </h1>
            <a href="" className="btn btn-primary py-3 px-5">
              Become A Member
            </a>
          </div>
        </div>
      </div>
      {/* Programe Start */}
      {/* Classes home Timetable Start */}
      <div className="container-fluid p-5">

        <div className="tab-class text-center">
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
                      className={`nav-link rounded-pill text-white ${activeDay === day ? "active" : ""
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
        </div>

      </div>
      {/* Class Timetable Start */}
      {/* Facts Start */}
      <div className="container-fluid bg-dark facts p-5 my-5">
        <div className="row gx-5 gy-4 py-5">
          <div className="col-lg-3 col-md-6">
            <div className="d-flex">
              <div
                className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                style={{ width: 60, height: 60 }}
              >
                <i className="fa fa-star fs-4 text-white" />
              </div>
              <div className="ps-4">
                <h5 className="text-secondary text-uppercase">Experience</h5>
                <h1 className="display-5 text-white mb-0">
                  {profileData.experience_in_year}
                </h1>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="d-flex">
              <div
                className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                style={{ width: 60, height: 60 }}
              >
                <i className="fa fa-users fs-4 text-white" />
              </div>
              <div className="ps-4">
                <h5 className="text-secondary text-uppercase">Our Trainers</h5>
                <h1 className="display-5 text-white mb-0">
                  {profileData.total_trainers}
                </h1>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="d-flex">
              <div
                className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                style={{ width: 60, height: 60 }}
              >
                <i className="fa fa-check fs-4 text-white" />
              </div>
              <div className="ps-4">
                <h5 className="text-secondary text-uppercase">Complete Project</h5>
                <h1 className="display-5 text-white mb-0">
                  {profileData.complete_project_number}
                </h1>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="d-flex">
              <div
                className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                style={{ width: 60, height: 60 }}
              >
                <i className="fa fa-mug-hot fs-4 text-white" />
              </div>
              <div className="ps-4">
                <h5 className="text-secondary text-uppercase">Happy Clients</h5>
                <h1 className="display-5 text-white mb-0">
                  {profileData.happy_clients_number}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Facts End */}
      {/* Team Start */}
      <div className="container-fluid p-5" id="trainers">
        <div className="mb-5 text-center">
          <h5 className="text-primary text-uppercase">Our Team</h5>
          <h1 className="display-3 text-uppercase mb-0">Expert Trainers</h1>
        </div>

        {trainers.length === 0 ? (
          <div className="text-center p-5">
            <p>No trainers available currently</p>
          </div>
        ) : (
          <div className="row g-5">
            {trainers.map((trainer) => (
              <div key={trainer.id} className="col-lg-4 col-md-6">
                <div className="team-item position-relative">
                  <div className="position-relative overflow-hidden rounded">
                    <img
                      className="img-fluid w-100"
                      src={trainer.image || "/img/default-trainer.jpg"}
                      alt={trainer.name}
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                    <div className="team-overlay">
                      <div className="d-flex align-items-center justify-content-start">
                        {trainer.twitter_link && (
                          <a
                            className="btn btn-light btn-square rounded-circle mx-1"
                            href={trainer.twitter_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-twitter"></i>
                          </a>
                        )}
                        {trainer.facebook_link && (
                          <a
                            className="btn btn-light btn-square rounded-circle mx-1"
                            href={trainer.facebook_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        )}
                        {trainer.linkdin_link && (
                          <a
                            className="btn btn-light btn-square rounded-circle mx-1"
                            href={trainer.linkdin_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="position-absolute start-0 bottom-0 w-100 rounded-bottom text-center p-4"
                    style={{ background: "rgba(34, 36, 41, .9)" }}
                  >
                    <h5 className="text-uppercase text-light">{trainer.name}</h5>
                    <p className="text-uppercase text-secondary m-0">{trainer.designation}</p>
                    {trainer.mobile_number && (
                      <p className="text-white m-0">
                        <i className="fa fa-phone me-2"></i>
                        {trainer.mobile_number}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Team End */}
      {/* Testimonial Start */}
      <div className="container-fluid p-0 my-5">
        <div className="row g-0">
          <div className="col-lg-6" style={{ minHeight: 500 }}>
            <div className="position-relative h-100">
              <img
                className="position-absolute w-100 h-100"
                src="img/testimonial.jpg"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-lg-6 bg-dark p-5">
            <div className="mb-5">
              <h5 className="text-primary text-uppercase">Testimonial</h5>
              <h1 className="display-3 text-uppercase text-light mb-0">
                Our Client Say
              </h1>
            </div>
            <div className="owl-carousel testimonial-carousel">
              <div className="testimonial-item">
                <p className="fs-4 fw-normal text-light mb-4">
                  <i className="fa fa-quote-left text-primary me-3" />
                  Dolores sed duo clita tempor justo dolor et stet lorem kasd labore
                  dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore
                  et tempor diam tempor erat dolor rebum sit ipsum.
                </p>
                <div className="d-flex align-items-center">
                  <img
                    className="img-fluid rounded-circle"
                    src="img/testimonial-1.jpg"
                    alt=""
                  />
                  <div className="ps-4">
                    <h5 className="text-uppercase text-light">Client Name</h5>
                    <span className="text-uppercase text-secondary">
                      Profession
                    </span>
                  </div>
                </div>
              </div>
              <div className="testimonial-item">
                <p className="fs-4 fw-normal text-light mb-4">
                  <i className="fa fa-quote-left text-primary me-3" />
                  Dolores sed duo clita tempor justo dolor et stet lorem kasd labore
                  dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore
                  et tempor diam tempor erat dolor rebum sit ipsum.
                </p>
                <div className="d-flex align-items-center">
                  <img
                    className="img-fluid rounded-circle"
                    src="img/testimonial-2.jpg"
                    alt=""
                  />
                  <div className="ps-4">
                    <h5 className="text-uppercase text-light">Client Name</h5>
                    <span className="text-uppercase text-secondary">
                      Profession
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End */}
      {/* Blog Start */}
      <div className="container-fluid p-5">
        <div className="mb-5 text-center">
          <h5 className="text-primary text-uppercase">Our Blog</h5>
          <h1 className="display-3 text-uppercase mb-0">Latest Blog Post</h1>
        </div>
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="blog-item">
              <div className="position-relative overflow-hidden rounded-top">
                <img className="img-fluid" src="img/blog-1.jpg" alt="" />
              </div>
              <div className="bg-dark d-flex align-items-center rounded-bottom p-4">
                <div className="flex-shrink-0 text-center text-secondary border-end border-secondary pe-3 me-3">
                  <span>01</span>
                  <h6 className="text-light text-uppercase mb-0">January</h6>
                  <span>2045</span>
                </div>
                <a className="h5 text-uppercase text-light" href="">
                  Sed amet tempor amet sit kasd sea lorem
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="blog-item">
              <div className="position-relative overflow-hidden rounded-top">
                <img className="img-fluid" src="img/blog-2.jpg" alt="" />
              </div>
              <div className="bg-dark d-flex align-items-center rounded-bottom p-4">
                <div className="flex-shrink-0 text-center text-secondary border-end border-secondary pe-3 me-3">
                  <span>01</span>
                  <h6 className="text-light text-uppercase mb-0">January</h6>
                  <span>2045</span>
                </div>
                <a className="h5 text-uppercase text-light" href="">
                  Sed amet tempor amet sit kasd sea lorem
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="blog-item">
              <div className="position-relative overflow-hidden rounded-top">
                <img className="img-fluid" src="img/blog-3.jpg" alt="" />
              </div>
              <div className="bg-dark d-flex align-items-center rounded-bottom p-4">
                <div className="flex-shrink-0 text-center text-secondary border-end border-secondary pe-3 me-3">
                  <span>01</span>
                  <h6 className="text-light text-uppercase mb-0">January</h6>
                  <span>2045</span>
                </div>
                <a className="h5 text-uppercase text-light" href="">
                  Sed amet tempor amet sit kasd sea lorem
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blog End */}

    </>



  )
}