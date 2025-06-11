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
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal - discount;

  const applyCoupon = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/coupons/validate`, { code: couponCode });
      setDiscount(res.data.discount || 0);
      setError('');
    } catch {
      setError('Invalid coupon code');
      setDiscount(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      ...form,
      items: cart,
      total_amount: total,
      guest_tracking_token: `GT-${Date.now()}`,
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/orders`, orderData);
      localStorage.removeItem('cart');
      router.push('/thankyou');
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

      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">🧾 Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />

          <textarea
            placeholder="Shipping Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-grow p-2 border rounded"
            />
            <button type="button" onClick={applyCoupon} className="bg-blue-600 text-white px-4 py-2 rounded">
              Apply
            </button>
          </div>

          {error && <p className="text-red-600">{error}</p>}
          {discount > 0 && <p className="text-green-600">✅ Coupon Applied! ₹{discount} off</p>}

          <p className="mt-2">💵 <strong>Payment Method:</strong> Cash on Delivery</p>
          <p className="text-xl font-semibold">Total: ₹{total}</p>

          <button type="submit" className="bg-primary text-white px-6 py-3 rounded hover:bg-purple-900">
            ✅ Place Order
          </button>
        </form>
      </main>
    </>
  );
}
