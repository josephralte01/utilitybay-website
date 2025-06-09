// pages/404.js
import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found – UtilityBay</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>😕 Oops! 404</h1>
        <p>The page you’re looking for doesn’t exist.</p>
        <Link href="/">
          <a style={{
            display: 'inline-block',
            marginTop: '1rem',
            background: '#222',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none'
          }}>
            ← Go to Home
          </a>
        </Link>
      </div>
    </>
  );
}
