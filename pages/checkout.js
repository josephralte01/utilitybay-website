import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    payment_method: 'cod',
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = `GT-${Date.now()}`;

    const orderData = {
      ...form,
      items: cart,
      total_amount: total,
      guest_tracking_token: token,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/orders`,
        orderData
      );

      localStorage.removeItem('cart');

      router.push(
        `/thankyou?order_id=${response.data.order_id}&tracking_token=${token}`
      );
    } catch (err) {
      console.error('❌ Order failed:', err);
      alert('Something went wrong while placing your order.');
    }
  };

  return (
    <>
      <Head>
        <title>Checkout – UtilityBay</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div style={{ padding: '2rem' }}>
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
    </>
  );
}
