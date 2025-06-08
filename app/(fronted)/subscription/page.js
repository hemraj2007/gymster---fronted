'use client';
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from "@/context/UserContext";

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUserSubscriptions = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/membership/user/${user.id}`);

        if (response.status === 404) {
          // No subscriptions found
          setSubscriptions([]);
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch subscriptions');
        }

        const data = await response.json();
        setSubscriptions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
     
    fetchUserSubscriptions();
  }, [user?.id]);

  if (loading) {
    return <div>Loading subscriptions...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!user) {
    return <div>Please login to view your subscriptions</div>;
  }

  return (
    <div>
      <h1>Your Subscriptions</h1>
      {subscriptions.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>Expiry Date</th>
              <th>Subtotal</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Promo Code</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.start_date}</td>
                <td>{sub.expiry_date}</td>
                <td>₹{sub.subtotal}</td>
                <td>₹{sub.discount}</td>
                <td>₹{sub.total}</td>
                <td>{sub.promocode || 'None'}</td>
                <td style={{
                  color: sub.payment_status === 'paid' ? 'green' :
                        sub.payment_status === 'failed' ? 'red' : 'orange'
                }}>
                  {sub.payment_status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No subscriptions found</p>
      )}
    </div>
  );
};

export default SubscriptionPage;
