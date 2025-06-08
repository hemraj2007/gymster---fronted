'use client';

import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import getStripe from "@/lib/getStripe";
import { toast } from "react-hot-toast";
import { UserContext } from "@/context/UserContext";

export default function MembershipPlans() {
  const router = useRouter();
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // 🧠 Fetch all plans
    const fetchData = async () => {
      try {
        const plansRes = await fetch("http://127.0.0.1:8000/membership_plans/all");
        const plansData = await plansRes.json();
        setPlans(Array.isArray(plansData) ? plansData : plansData.data || []);

        // If user is logged in, fetch their current membership
        if (user?.id) {
          const subsRes = await fetch(`http://127.0.0.1:8000/membership/user/${user.id}`);
          const subsData = await subsRes.json();
          if (subsData.length > 0) {
            setCurrentPlan(subsData[0]); // Consider the latest plan as current
          }
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
        toast.error("Something went wrong. Please try again.");
      }
    };

    fetchData();
  }, [user?.id]);

  const handleAction = async (plan) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      router.push("/join");
      return;
    }

    // If user already has this plan
    if (currentPlan?.membership_id === plan.id) {
      toast("You already have this plan.");
      return;
    }

    try {
      const stripe = await getStripe();
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          planId: plan.id,
          amount: plan.final_price,
          userId: user.id,
          isUpgrade: currentPlan ? true : false
        }),
      });

      if (!res.ok) throw new Error("Could not initiate payment");

      const { id: sessionId } = await res.json();
      toast.loading("Redirecting to payment page...");
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const isCurrentPlan = (plan) => currentPlan?.membership_id === plan.id;
  const isUpgradeOption = (plan) =>
    currentPlan &&
    plan.id !== currentPlan.membership_id &&
    plan.price > plans.find(p => p.id === currentPlan.membership_id)?.price;

  return (
    <div className="membership-container">
      <div className="text-center mb-5">
        <h2 className="text-uppercase mb-3">Start Your Fitness Journey</h2>
        {currentPlan ? (
          <div className="current-plan-banner mb-4 p-3 bg-light rounded">
            <h4>Your Current Plan: <strong>{plans.find(p => p.id === currentPlan.membership_id)?.name}</strong></h4>
            <p>
              Valid till: {new Date(currentPlan.expiry_date).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p className="lead mb-4">
            Choose the perfect plan today and achieve your fitness goals!
          </p>
        )}
      </div>

      <div className="membership-plans-grid">
        {plans.map((plan) => {
          const isCurrent = isCurrentPlan(plan);
          const isUpgrade = isUpgradeOption(plan);
          const originalPrice = plan.price;
          const finalPrice = plan.final_price;
          const hasDiscount = finalPrice !== originalPrice;

          return (
            <div
              key={plan.id}
              className={`membership-plan-card ${isCurrent ? "current-plan" : ""}`}
            >
              <div className="plan-card-content">
                <h6 className="plan-name">{plan.name}</h6>

                {isCurrent && (
                  <div className="current-plan-badge">
                    Your Current Plan
                  </div>
                )}

                <div className="price-container">
                  {hasDiscount && (
                    <span className="original-price">₹{originalPrice}</span>
                  )}
                  <h5 className="plan-price">₹{finalPrice}</h5>
                  {hasDiscount && (
                    <span className="discount-badge">
                      {plan.discount}% Off
                    </span>
                  )}
                </div>

                <div className="plan-details">
                  <p><i className="bi bi-calendar-check me-2"></i>{plan.duration} Access</p>
                  <p><i className="bi bi-check-circle me-2"></i>Unlimited Gym Access</p>
                  <p><i className="bi bi-check-circle me-2"></i>Free Fitness Assessment</p>
                  <p><i className="bi bi-check-circle me-2"></i>
                    {plan.duration === "Yearly" ? "12" :
                      plan.duration === "Half Yearly" ? "6" : "1"} Personal Training Sessions
                  </p>
                </div>

                <button
                  className={`btn ${isCurrent ? "btn-secondary" : isUpgrade ? "btn-success" : "btn-primary"}`}
                  onClick={() => handleAction(plan)}
                  disabled={isCurrent}
                >
                  {isCurrent ? "Active Plan" :
                    isUpgrade ? "Upgrade Now" : "Subscribe Now"}
                </button>

                {isUpgrade && (
                  <p className="upgrade-benefit mt-2">
                    <i className="bi bi-arrow-up-circle-fill text-success"></i> 
                    Save up to {plan.duration === "Yearly" ? "40%" : "20%"} by upgrading
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div> 

      <div className="text-center mt-5">
        <h4 className="mb-3">Still thinking?</h4>
        <p>
          "Once you start, motivation will follow. Today's decision builds a better tomorrow!"
        </p>
      </div>
    </div>
  );
}
