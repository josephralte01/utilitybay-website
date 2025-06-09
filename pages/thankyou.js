// website/pages/thankyou.js
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ThankYouPage() {
  const router = useRouter();
  const { order_id, tracking_token } = router.query;
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!order_id) {
      setRedirecting(true);
      setTimeout(() => router.push('/'), 3000);
    }
  }, [order_id]);

  if (redirecting) {
    return <p>Redirecting you to homepage...</p>;
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🎉 Thank you for your order!</h1>
      <p>Your Order ID: <strong>{order_id}</strong></p>
      <p>Use this token to track: <code>{tracking_token}</code></p>
      <p>We’ll process your order shortly.</p>
      <Link href="/">
        <a style={{
          marginTop: '20px',
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#000',
          color: '#fff',
          borderRadius: '5px',
          textDecoration: 'none'
        }}>← Back to Home</a>
      </Link>
    </div>
  );
}
