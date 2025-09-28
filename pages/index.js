// Temporary simple home page for debugging
export default function Home({theme, themeUse}) {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      color: '#333'
    }}>
      <h1>🏠 Yunkhngn Blog</h1>
      <p>Đây là trang chủ đơn giản để debug</p>
      <p>Theme: {theme || 'light'}</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/test" style={{ color: '#007bff', textDecoration: 'none' }}>
          → Test page
        </a>
      </div>
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
        <h3>Debug Info:</h3>
        <pre style={{ fontSize: '12px', color: '#666' }}>
          {JSON.stringify({ theme, themeUse: themeUse ? 'loaded' : 'missing' }, null, 2)}
        </pre>
      </div>
    </div>
  );
}