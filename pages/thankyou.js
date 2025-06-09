// pages/thankyou.js
import Head from 'next/head';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>🎉 Thank You – UtilityBay</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>🎉 Thank You for Your Order!</h1>
        <p>Your order is being processed.</p>
        <p>You’ll receive a confirmation shortly.</p>

        <Link href="/">
          <button style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            ← Back to Home
          </button>
        </Link>
      </div>
    </>
  );
}
