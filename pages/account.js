import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getToken, logout } from '../utils/auth';
import axios from 'axios';
import Head from 'next/head';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) return router.push('/login');

    axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setUser(res.data))
    .catch(() => router.push('/login'));

    axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/user/my-orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error('Failed to fetch orders:', err));
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>My Account – UtilityBay</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">👤 My Account</h1>

          {user ? (
            <div className="mb-6">
              <p className="text-gray-700">Welcome, <strong>{user.name || user.email}</strong></p>
              <button
                onClick={handleLogout}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                🚪 Logout
              </button>
            </div>
          ) : (
            <p>Loading user info...</p>
          )}

          <h2 className="text-lg font-semibold text-gray-800 mb-2">📦 My Orders</h2>
          <ul className="space-y-2">
            {orders.length > 0 ? orders.map(order => (
              <li key={order._id} className="border border-gray-200 rounded p-3">
                <div className="font-medium">Order #{order._id}</div>
                <div>Status: {order.status}</div>
              </li>
            )) : (
              <li>No orders found.</li>
            )}
          </ul>
        </div>
      </main>
    </>
  );
}
