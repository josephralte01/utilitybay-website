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

      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">🔍 Track Your Order</h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter tracking token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-1 px-4 py-2 border rounded shadow-sm focus:ring-primary focus:border-primary"
          />
          <button
            onClick={handleTrack}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90 transition"
          >
            📦 Track
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-sm font-medium mb-4">{error}</p>
        )}

        {order && (
          <div className="bg-white border rounded-lg shadow-md p-6 space-y-3">
            <h2 className="text-xl font-semibold mb-2">📦 Order Details</h2>
            <p><strong>Order ID:</strong> {order.order_id}</p>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Total Amount:</strong> ₹{order.total_amount}</p>
            <p><strong>Status:</strong> <span className="font-medium capitalize">{order.status}</span></p>

            <h3 className="mt-4 font-semibold">🛒 Items:</h3>
            <ul className="list-disc list-inside">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} — ₹{item.price} × {item.quantity || 1}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </>
  );
}
