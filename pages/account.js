import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getToken, logout } from '../utils/auth';
import axios from 'axios';

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

  return (
    <div style={{ padding: '2rem' }}>
      <h1>My Account</h1>
      {user && (
        <div>
          <p>Welcome, {user.name || user.email}</p>
          <button onClick={() => { logout(); router.push('/'); }}>Logout</button>
        </div>
      )}

      <h2>My Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>Order #{order._id} – {order.status}</li>
        ))}
      </ul>
    </div>
  );
}
