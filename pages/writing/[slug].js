import { useRouter } from 'next/router';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Title, Para, Template, Spacer, Footer, Back } from '../../components/Template';
import { PicWrite } from "../../components/Content";
import { Text } from 'atomize';
import { htmlToText } from 'html-to-text';
import Image from 'next/image';

const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const getYouTubeEmbedUrl = (url) => {
  const videoId = url.split('v=')[1];
  const ampersandPosition = videoId.indexOf('&');
  return `https://www.youtube.com/embed/${ampersandPosition === -1 ? videoId : videoId.substring(0, ampersandPosition)}`;
};

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file, title, description } = node.data.target.fields;
      if (file.contentType.startsWith('image/')) {
        const imageUrl = `https:${file.url}`;
        return (
          <div className="embed">
          <div className="embedPhoto">
            <Image
              src={imageUrl}
              alt={title || 'Embedded Image'}
              fill
              priority={true}
              quality={75}
              sizes="100%"
              style={{
                objectFit: "cover",
              }}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
            <Text
            >
              <i>P/s: {description || 'Embedded Image'}</i>
            </Text>
          </div>
        );
      }
      return null;
    },
    'paragraph': (node) => {
            const text = node.content[0].value;
            const youTubeUrlPattern = /https?:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
            const match = text.match(youTubeUrlPattern);
            if (match) {
                const embedUrl = getYouTubeEmbedUrl(match[0]);
                return (
                    <div>
                        <iframe
                            // fit with video ratio
                            style={{
                                width: '100%',
                                aspectRatio: '16 / 9',
                            }}
                            src={embedUrl}
                            allowFullScreen
                            title="YouTube Video"
                        ></iframe>
                    </div>
                );
            }
            return <p>{text}</p>;
        },
  },
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day} tháng ${month} năm ${year}.`;
};

export async function getStaticPaths() {
  // Fetch all posts to get slugs for each post
  const response = await client.getEntries({ content_type: 'blogPage' });

  const paths = response.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return { paths, fallback: true }; 
}

export async function getStaticProps({ params }) {
  try {
    const response = await client.getEntries({
      content_type: 'blogPage',
      'fields.slug': params.slug,
    });

    if (response.items.length > 0) {
      const item = response.items[0];
      const postData = {
        id: item.sys.id,
        Title: item.fields.title,
        Image: `https:${item.fields.image.fields.file.url}`,
        createdAt: item.sys.createdAt,
        Body: item.fields.body,  
        Desc: item.fields.description,
        slug: item.fields.slug,
      };
      return {
        props: { post: postData }, 
        revalidate: 60, 
      };
    } else {
      return {
        notFound: true, 
      };
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    return { notFound: true };
  }
}

const WritingPage = ({ post, themeUse, theme }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Loading...</p>;
  }
  function truncateHtml(htmlString, maxLength) {
    const text = htmlToText(documentToHtmlString(htmlString), {
      wordwrap: false
    });
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
  
    return text;
  }
  const src = post.Image;
  const desc = {
    title: `${post.Title} - ${post.Desc}`,
    desc: truncateHtml(post.Body, 100),
    url: `https://khoanguyen.codes/writing/${post.slug}`,
    img: src,
    route: `/writing/${post.slug}`,
  };

  return (
    <Template description={desc} height="100%">
      <article>
        <Title color={themeUse.primary}>{post.Title}</Title>
        <Para color={themeUse.secondary}>
          {"Hà Nội, ngày " + formatDate(post.createdAt)}
        </Para>
        <Spacer theme={theme} length="200px" />
        <Para color={themeUse.secondary}>Tác giả: Khoa Nguyễn</Para>
        <Para color={themeUse.secondary}>{"Phân loại: " + post.Desc}</Para>
        <Spacer theme={theme} length="150px" />
        <PicWrite src={src} theme={theme} themeUse={themeUse} title={post.Title} />
        <hr className={"hr" + theme} />
        <div className='writingBody'>{documentToReactComponents(post.Body, options)}</div>
        <Spacer theme={theme} length="200px" />
        <Footer content="Viết vài dòng bởi tớ!" />
        <Back themeUse={themeUse} route="/writing" />
      </article>
    </Template>
  );
};

export default WritingPage;