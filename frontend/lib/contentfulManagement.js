import { createClient } from 'contentful-management';

const DEFAULT_LOCALE = process.env.CONTENTFUL_DEFAULT_LOCALE || 'en-US';
const CONTENT_TYPE_ID = 'blogPage';

const slugify = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') || `untitled-${Date.now()}`;

const createRichTextDocument = (text = '') => ({
  nodeType: 'document',
  data: {},
  content: text
    .split('\n')
    .map((paragraph) => ({
      nodeType: 'paragraph',
      data: {},
      content: [
        {
          nodeType: 'text',
          value: paragraph,
          marks: [],
          data: {},
        },
      ],
    })),
});

const getEnvironment = async () => {
  if (!process.env.CONTENTFUL_SPACE_ID) {
    throw new Error('Missing CONTENTFUL_SPACE_ID');
  }
  if (!process.env.CONTENTFUL_MANAGEMENT_TOKEN) {
    throw new Error('Missing CONTENTFUL_MANAGEMENT_TOKEN');
  }

  const client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });

  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
  const envId = process.env.CONTENTFUL_ENVIRONMENT || 'master';

  return space.getEnvironment(envId);
};

export const createBlogEntry = async ({
  title,
  slug,
  description,
  imageAssetId,
  body,
}) => {
  const environment = await getEnvironment();
  const entrySlug = slug ? slugify(slug) : slugify(title);

  const fields = {
    title: { [DEFAULT_LOCALE]: title || 'Untitled post' },
    slug: { [DEFAULT_LOCALE]: entrySlug },
    description: { [DEFAULT_LOCALE]: description || '' },
    body: { [DEFAULT_LOCALE]: createRichTextDocument(body || '') },
  };

  if (imageAssetId) {
    fields.image = {
      [DEFAULT_LOCALE]: {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: imageAssetId,
        },
      },
    };
  }

  const entry = await environment.createEntry(CONTENT_TYPE_ID, { fields });
  const published = await entry.publish();

  return published;
};

