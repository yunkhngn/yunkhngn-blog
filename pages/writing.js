import {Template, Title} from '../components/Template/'
import {Write} from '../components/Post/'
import {desc} from '../lib'

const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const writing = ({themeUse,theme, content}) => {
    return (
        <Template description={desc.blog} height="100%">
            <Title color={themeUse.primary}>{desc.blog.heading}</Title>
            <Write desc={desc.blog} themeUse={themeUse} theme={theme} content={content}/>
        </Template>
    );
}

export async function getStaticProps() {
    const response = await client.getEntries({
      content_type: 'blogPage'
    });
  
    const content = response.items.map(item => ({
      id: item.sys.id,
      attributes: {
        Title: item.fields.title,
        Image: `https:${item.fields.image.fields.file.url}`,
        Slug: item.fields.slug,
        createdAt: item.sys.createdAt,
        Desc: item.fields.description,
      }
    })).sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));
  
    return {
      props: {
        content
      },
      revalidate: 60 // ISR sau mỗi 60 giây
    };
  }

export default writing;