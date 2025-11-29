// Minimal test page to debug loading issues
export default function Test() {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1>🧪 Debug Test Page</h1>
      <p>If you can see this, the basic Next.js app is working.</p>
      <p>Time: {new Date().toLocaleString()}</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h3>Browser Info:</h3>
        <pre>{typeof window !== 'undefined' ? JSON.stringify({
          userAgent: navigator.userAgent,
          url: window.location.href,
          cookieEnabled: navigator.cookieEnabled,
          onLine: navigator.onLine
        }, null, 2) : 'Server rendered'}</pre>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: false // Static, no revalidation
  };
}