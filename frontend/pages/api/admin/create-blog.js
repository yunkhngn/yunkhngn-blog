import { createBlogEntry } from '../../../lib/contentfulManagement';

const DEFAULT_LOCALE = process.env.CONTENTFUL_DEFAULT_LOCALE || 'en-US';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { title, slug, description, body, imageAssetId } = req.body || {};

    if (!title || !body) {
      return res.status(400).json({
        message: 'Title and body are required.',
      });
    }

    const entry = await createBlogEntry({
      title,
      slug,
      description,
      body,
      imageAssetId,
    });

    return res.status(200).json({
      message: 'Entry created and published.',
      entryId: entry?.sys?.id,
      slug: entry?.fields?.slug?.[DEFAULT_LOCALE],
    });
  } catch (error) {
    console.error('Failed to create blog entry', error);
    return res.status(500).json({
      message: 'Failed to create blog entry.',
      error: error.message,
    });
  }
}

