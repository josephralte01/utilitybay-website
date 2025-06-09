import Link from 'next/link';

export default function ThankYou() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎉 Thank you for your order!</h1>
      <p>We’ll process it shortly. Track with your token if applicable.</p>
      <p><em>(Optional account creation coming soon)</em></p>
      <br />
      <Link href="/">← Back to Home</Link>
    </div>
  );
}
