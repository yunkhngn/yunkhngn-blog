import {Template, Title} from '../components/Template'
import {Gallery} from '../components/Content'
import {desc} from '../components/lib'

// Lấy content từ api
const contentful = require('contentful');
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const photo = ({themeUse, data,theme}) => {
  return (
      <Template description={desc.photo} height="100%">
          <Title color={themeUse.primary}>{desc.photo.heading}</Title>
          <Gallery desc={desc.photo} data={data} theme={theme} themeUse={themeUse}/>
      </Template>
  )
}

export async function getServerSideProps() {
  const response = await client.getEntries({
    content_type: 'picture',
  });

  const transformedData = response.items.map((item) => {
    return {
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
    };
  });
  transformedData.sort((a, b) => {return new Date(b.createdAt) - new Date(a.createdAt);});
  return {
    props: {
      data: transformedData,
    },
  };
}
export default photo