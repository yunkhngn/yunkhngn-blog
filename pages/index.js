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

const truncateHtml = (htmlString, maxLength) =>{
  const text = htmlToText(documentToHtmlString(htmlString), {
    wordwrap: false
  });
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }

  return text;
}

export default function Home({theme, themeUse, content,prj}) {
  return (
    <Template description={desc.home} height="100%">
      <Title color={themeUse.primary}>{desc.home.heading}</Title>
      <Intro writing={content} project={prj} content={desc.home.content} themeUse={themeUse} theme={theme}/>
    </Template>
  )
}

export async function getStaticProps() {
  const response = await client.getEntries({
    content_type: 'blogPage'
  });

  const token = process.env.GITHUB_TOKEN; 
    const res = await fetch('https://api.github.com/users/yunkhngn/repos', {
      headers: {
        'Authorization': `token ${token}`, 
        'Accept': 'application/vnd.github.v3+json' 
      }
    });
    const prj = await res.json();
    const filteredRepos = prj
    .filter(repo => !repo.fork)
    .filter(repo => repo.name !== 'yunkhngn')
    .slice(0,3)
    .sort((a, b) => {
      if (a.updated_at === b.updated_at) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    })

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
  })).slice(0,5).sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));

  return {
    props: {
      content,
      prj: filteredRepos,
    },
    revalidate: 60 // ISR sau mỗi 60 giây
  };
}