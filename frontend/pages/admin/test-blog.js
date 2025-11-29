import { useState } from 'react';

const initialState = {
  title: '',
  slug: '',
  description: '',
  imageAssetId: '',
  body: '',
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  fontSize: '14px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

export default function TestBlogPublisher() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Creating entry…' });

    try {
      const response = await fetch('/api/admin/create-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || 'Unknown error');
      }

      setStatus({
        type: 'success',
        message: `Published entry ${payload.entryId} with slug "${payload.slug}"`,
      });
      setForm(initialState);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '3rem 1rem',
        maxWidth: '720px',
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <h1>Test blog publisher</h1>
      <p style={{ color: '#555', marginBottom: '1.5rem' }}>
        Tạo bài viết Contentful thông qua API nội bộ. Chỉ dùng cho môi trường test!
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <label>
          <span>Title*</span>
          <input
            name="title"
            type="text"
            required
            style={inputStyle}
            value={form.title}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Slug (optional)</span>
          <input
            name="slug"
            type="text"
            placeholder="auto-generated if empty"
            style={inputStyle}
            value={form.slug}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Description</span>
          <input
            name="description"
            type="text"
            style={inputStyle}
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Image asset ID (optional)</span>
          <input
            name="imageAssetId"
            type="text"
            placeholder="Copy từ Contentful asset"
            style={inputStyle}
            value={form.imageAssetId}
            onChange={handleChange}
          />
        </label>

        <label>
          <span>Body*</span>
          <textarea
            name="body"
            rows="10"
            required
            style={{ ...inputStyle, fontFamily: 'monospace' }}
            value={form.body}
            onChange={handleChange}
            placeholder="Hỗ trợ xuống dòng, sẽ chuyển thành RichText paragraph."
          />
        </label>

        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: '#111',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          disabled={status?.type === 'loading'}
        >
          {status?.type === 'loading' ? 'Publishing…' : 'Publish blog entry'}
        </button>
      </form>

      {status?.message && (
        <p
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            borderRadius: '6px',
            background:
              status.type === 'success'
                ? 'rgba(0,128,0,0.1)'
                : status.type === 'error'
                  ? 'rgba(255,0,0,0.08)'
                  : 'transparent',
            color: status.type === 'error' ? '#b42318' : '#0b6b0b',
          }}
        >
          {status.message}
        </p>
      )}
    </main>
  );
}

