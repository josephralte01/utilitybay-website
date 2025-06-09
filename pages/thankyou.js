import Head from 'next/head';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <>
      <Head>
        <title>Thank You – UtilityBay</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>🎉 Thank You for Your Order!</h1>
        <p>Your order has been received and is being processed.</p>
        <Link href="/">
          <a style={{ marginTop: '20px', display: 'inline-block' }}>← Go back to Home</a>
        </Link>
      </div>
    </>
  );
}
