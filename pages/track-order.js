// pages/track-order.js
import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

export default function TrackOrder() {
  const [token, setToken] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/orders/track?token=${token}`);
      setOrder(res.data);
      setError('');
    } catch (err) {
      setError('❌ Order not found. Please check your tracking token.');
      setOrder(null);
    }
  };

  return (
    <>
      <Head>
        <title>Track Your Order – UtilityBay</title>
      </Head>

      <div style={{ padding: '2rem' }}>
        <h1>🔍 Track Your Order</h1>

        <input
          type="text"
          placeholder="Enter tracking token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        <button onClick={handleTrack}>📦 Track</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {order && (
          <div style={{ marginTop: '2rem' }}>
            <h2>📦 Order Details</h2>
            <p><strong>Order ID:</strong> {order.order_id}</p>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Total Amount:</strong> ₹{order.total_amount}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <h3>🛒 Items:</h3>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>{item.name} — ₹{item.price}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
