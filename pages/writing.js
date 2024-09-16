import {Template, Title} from '../components/Template/'
import {Write} from '../components/Content/'
import {desc} from '../components/lib'
import { htmlToText } from 'html-to-text';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const truncateHtml = (htmlString, maxLength) =>{
  const text = htmlToText(documentToHtmlString(htmlString), {
    wordwrap: false
  });
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }

  return text;
}

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
        Short: truncateHtml(item.fields.body,200),
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