"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Team() {
    // State to store trainers data
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
            {/* Hero Section */}
            <div className="container-fluid bg-primary p-5 bg-hero mb-5">
                <div className="row py-5">
                    <div className="col-12 text-center">
                        <h1 className="display-2 text-uppercase text-white mb-md-4">
                            Our Trainers
                        </h1>
                        <a href="/" className="btn btn-primary py-md-3 px-md-5 me-3">
                            Home
                        </a>
                        <a href="#trainers" className="btn btn-light py-md-3 px-md-5">
                            View Trainers
                        </a>
                    </div>
                </div>
            </div>

            {/* Trainers List Section */}
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
        </>
    );
}