// website/pages/checkout.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    payment_method: 'cod',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...form,
      items: cart,
      total_amount: total,
      guest_tracking_token: `GT-${Date.now()}`, // 🔐 simple token
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/orders`, orderData);
      localStorage.removeItem('cart'); // 🧹 clear cart
      setSubmitted(true);
    } catch (err) {
      console.error('❌ Order failed:', err);
      alert('Something went wrong');
    }
  };

  if (submitted) {
    return (
      <div>
        <h1>🎉 Thank you for your order!</h1>
        <p>We’ll process it shortly. Track with your token: <strong>{form.phone}</strong></p>
        <p><em>(Optional account creation coming soon)</em></p>
        <button onClick={() => router.push('/')}>← Back to Home</button>
      </div>
    );
  }

  return (
    <div>
      <h1>🧾 Checkout</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        /><br />
        <input
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        /><br />
        <textarea
          placeholder="Shipping Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        /><br />
        <p><strong>Payment Method:</strong> Cash on Delivery</p>

        <button type="submit">✅ Place Order (₹{total})</button>
      </form>
    </div>
  );
}
