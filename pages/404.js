import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found – UtilityBay</title>
      </Head>
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h1>🚫 404</h1>
        <p>The page you’re looking for doesn’t exist.</p>
        <Link href="/">
          <a style={{ marginTop: '20px', display: 'inline-block' }}>🏠 Go to Home</a>
        </Link>
      </div>
    </>
  );
}
