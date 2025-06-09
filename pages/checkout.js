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
    coupon_code: '',
  });

  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal - discount;

  const applyCoupon = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/coupons/apply`, {
        code: form.coupon_code
      });

      setDiscount(res.data.discount_amount);
      setCouponApplied(true);
      alert('✅ Coupon applied!');
    } catch (err) {
      console.error('❌ Coupon failed:', err);
      alert('Invalid coupon code.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...form,
      items: cart,
      total_amount: total,
      guest_tracking_token: `GT-${Date.now()}`
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

          <input
            type="text"
            placeholder="Coupon Code (optional)"
            value={form.coupon_code}
            onChange={(e) => setForm({ ...form, coupon_code: e.target.value })}
          />
          <button type="button" onClick={applyCoupon} disabled={couponApplied}>
            🎟️ Apply Coupon
          </button>
          <br /><br />

          <p><strong>Payment Method:</strong> Cash on Delivery</p>
          <p><strong>Subtotal:</strong> ₹{subtotal}</p>
          <p><strong>Discount:</strong> ₹{discount}</p>
          <p><strong>Total:</strong> ₹{total}</p>

          <button type="submit">✅ Place Order (₹{total})</button>
        </form>
      </div>
    </>
  );
}
