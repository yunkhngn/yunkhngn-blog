//this is the main page
import {Template, Title} from '../components/Template/'
import {Intro} from '../components/Content/'
import {desc} from '../components/lib'
import { htmlToText } from 'html-to-text';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const truncateHtml = (htmlString, maxLength) => {
  const text = htmlToText(documentToHtmlString(htmlString), {
    wordwrap: false,
  });
  
  const words = text.split(" ");
  let truncatedText = "";
  let currentLength = 0;

  for (let word of words) {
    if (currentLength + word.length + 1 > maxLength) {
      truncatedText += "...";
      break;
    }
    truncatedText += word + " ";
    currentLength += word.length + 1;
  }

  return truncatedText.trim();
};

export default function Home({theme, themeUse, content, prj}) {
  return (
    <Template 
      description={{
        ...desc.home,
        structuredDataType: 'person'
      }} 
      height="100%"
    >
      <Title color={themeUse.primary}>{desc.home.heading}</Title>
      <Intro writing={content} project={prj} content={desc.home.content} themeUse={themeUse} theme={theme}/>
    </Template>
  )
}

export async function getStaticProps() {
  try {
    // Fetch writing content
    const contentResponse = await client.getEntries({
      content_type: 'blogPage',
      include: 1,
      limit: 5, // Only get latest 5 for homepage
    });

    const content = contentResponse.items
      .map(item => ({
        id: item.sys.id,
        attributes: {
          Title: item.fields.title,
          Image: `https:${item.fields.image.fields.file.url}`,
          Slug: item.fields.slug,
          createdAt: item.sys.createdAt,
          Desc: item.fields.description,
          Short: truncateHtml(item.fields.body, 200),
        }
      }))
      .sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));

    // Fetch GitHub projects
    let prj = [];
    const token = process.env.GITHUB_TOKEN;
    
    if (token) {
      try {
        const response = await fetch('https://api.github.com/users/yunkhngn/repos', {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        if (response.ok) {
          const repos = await response.json();
          if (Array.isArray(repos)) {
            prj = repos
              .filter(repo => !repo.fork)
              .filter(repo => repo.name !== 'yunkhngn')
              .sort((a, b) => {
                if (a.updated_at === b.updated_at) {
                  return b.stargazers_count - a.stargazers_count;
                }
                return new Date(b.updated_at) - new Date(a.updated_at);
              })
              .slice(0, 6); // Only get latest 6 for homepage
          }
        }
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
      }
    }

    return {
      props: {
        content,
        prj,
      },
      revalidate: 1800, // Revalidate every 30 minutes
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      props: {
        content: [],
        prj: [],
      },
      revalidate: 1800,
    };
  }
}