"use client";

import React, { useEffect, useContext, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BsBagCheckFill } from "react-icons/bs";
import { UserContext } from "@/context/UserContext";

const SuccessPay = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, token, loading: userLoading } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sessionId = searchParams.get("session_id");
  const planId = searchParams.get("plan_id");

  useEffect(() => {
    const runConfetti = () => {
      // Optional: confetti animation if needed
    };

    const createSubscription = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (userLoading) return;
        if (!user || !user.id || !token) {
          setError("User session expired. Please login again.");
          return;
        }
        if (!planId) {
          setError("Invalid plan selection. Please try again.");
          return;
        }

        // Fetch all plans
        const plansResponse = await fetch("http://127.0.0.1:8000/membership_plans/all");
        if (!plansResponse.ok) throw new Error("Failed to fetch plans");
        const allPlans = await plansResponse.json();

        // Find selected plan
        const planData = allPlans.find((plan) => plan.id == planId);
        if (!planData) throw new Error("Plan not found");

        const startDate = new Date();
        const expiryDate = new Date();

        // Set expiry based on duration
        if (planData.name.toLowerCase().includes("year")) {
          expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        } else if (planData.name.toLowerCase().includes("month")) {
          expiryDate.setMonth(expiryDate.getMonth() + 1);
        } else if (planData.name.toLowerCase().includes("half")) {
          expiryDate.setMonth(expiryDate.getMonth() + 6);
        }

        const subtotal = planData.price || planData.final_price;
        const discount = planData.price ? planData.price - planData.final_price : 0;
        const total = planData.final_price;
        const discountText = planData.discount_text || "";

        const subscriptionData = {
          user_id: user.id,
          membership_id: planId,
          start_date: startDate.toISOString().split("T")[0],
          expiry_date: expiryDate.toISOString().split("T")[0],
          subtotal: subtotal,
          discount: discount,
          total: total,
          promocode: discountText,
          payment_status: "paid",
        };

        const response = await fetch("http://127.0.0.1:8000/membership/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(subscriptionData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create subscription");
        }

        runConfetti();
      } catch (error) {
        console.error("Error:", error);
        setError(error.message || "Failed to activate membership");
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId && planId) {
      if (!userLoading) {
        createSubscription();
      }
    } else {
      router.push("/membership");
    }
  }, [sessionId, planId, router, user, token, userLoading]);

  const combinedLoading = isLoading || userLoading;

  if (combinedLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mb-4"></div>
        <p>Activating your membership...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="text-red-500 mb-4">
          <BsBagCheckFill size={60} />
        </div>
        <h1 className="text-2xl font-bold mb-2">Activation Failed</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => router.push("/membership")}
          className="btn bg-black text-white px-6 py-2 rounded-md"
        >
          Back to Membership
        </button>
      </div>
    );
  }

  return (
    <div className="success flex flex-col items-center justify-center min-h-screen text-center px-4">
      <p className="icon text-green-500 mb-4">
        <BsBagCheckFill size={80} />
      </p>
      <h1 className="text-3xl font-bold mb-2">Thank you for your order!</h1>
      <p className="text-gray-600">Check your email inbox for the receipt.</p>
      <p className="description text-gray-500 mt-2 mb-4">
        Your membership has been activated successfully.
      </p>
      <Link href="/dashboard">
        <button className="btn bg-black text-white px-6 py-2 rounded-md">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
};

export default SuccessPay;
