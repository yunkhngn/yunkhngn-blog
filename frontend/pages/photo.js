import {Template, Title} from '../components/Template'
import {Gallery} from '../components/Content'
import {desc} from '../components/lib'

const contentful = require('contentful');
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export default function PhotoPage({theme, themeUse, data}) {
  return (
    <Template 
      description={{
        ...desc.photo,
        structuredDataType: 'website'
      }}
    >
      <Title color={themeUse.primary}>{desc.photo.heading}</Title>
      <Gallery desc={desc.photo} data={data} theme={theme} themeUse={themeUse}/>
    </Template>
  )
}

function transformData(items) {
  return items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    description: item.fields.description,
    slug: item.fields.slug,
    images: item.fields.images.map((img) => ({
      url: img.fields.file.url,
      title: img.fields.title || '',
      description: img.fields.description || '',
    })),
    createdAt: item.sys.createdAt,
    updatedAt: item.sys.updatedAt,
  })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getStaticProps() {
  try {
    const response = await client.getEntries({ 
      content_type: 'picture',
      limit: 50,
      order: '-sys.createdAt'
    });
    const transformedData = transformData(response.items);
    return {
      props: { data: transformedData },
      revalidate: 1800, // Revalidate every 30 minutes
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { data: [] },
      revalidate: 300, // Retry after 5 minutes on error
    };
  }
}
