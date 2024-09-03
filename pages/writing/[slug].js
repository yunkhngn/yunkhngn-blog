import { useRouter } from 'next/router';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Title, Para, Template } from '../../components/Template';
import { Spacer } from '../../components/Hooks';
import { ElementSpace } from '../../components/Post/';
import { Div } from 'atomize';
import Link from 'next/link';
import { htmlToText } from 'html-to-text';
import sharp from 'sharp';
const contentful = require('contentful'); 

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const optimizeImage = async (url) => {
  try {
    // Fetch the image from the URL
    const response = await fetch(url);
    const buffer = await response.buffer();

    // Process the image with Sharp
    const optimizedBuffer = await sharp(buffer)
      .resize({ width: 1200, height: 675, fit: 'cover' }) // Resize to 16:9 aspect ratio
      .jpeg({ quality: 80 }) // Convert to JPEG and compress
      .toBuffer();

    // Convert buffer to base64 for rendering in HTML
    const base64Image = optimizedBuffer.toString('base64');
    return `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    console.error('Error optimizing image:', error);
    return url; // Return the original URL if there's an error
  }
};

export async function getStaticPaths() {
  const response = await client.getEntries({ content_type: 'blogPage' });

  const paths = response.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const response = await client.getEntries({
      content_type: 'blogPage',
      'fields.slug': params.slug,
    });

    if (response.items.length > 0) {
      const item = response.items[0];
      const bodyHtml = documentToHtmlString(item.fields.body);

      // Optimize image using Sharp
      const optimizedImage = await optimizeImage(`https:${item.fields.image.fields.file.url}`);

      const postData = {
        id: item.sys.id,
        Title: item.fields.title,
        Image: optimizedImage,
        createdAt: item.sys.createdAt,
        Body: bodyHtml,
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

  if (!post) {
    const desc = {
      title: "Page not found",
      desc: "Sorry, the post you are looking for is not found!",
      url: `https://khoanguyen.codes/writing/${router.query.slug}`,
      img: "https://khoanguyen.codes/favicon/wall.png",
    };
    return (
      <Template description={desc} height="100%">
        <article>
          <Title color={themeUse.primary}>Post not found!</Title>
          <Spacer theme={theme} length="200px" />
          <Para color={themeUse.secondary}>Sorry, the post you are looking for is not found!</Para>
          <Spacer theme={theme} length="150px" />
          <Link href="/writing" passHref>
            <Div m={{ t: '1em' }} textColor={themeUse.secondary} hoverTextColor={themeUse.hover} transition>
              Go back...
            </Div>
          </Link>
          <ElementSpace space="12em" />
        </article>
      </Template>
    );
  }

  function truncateHtml(htmlString, maxLength) {
    const text = htmlToText(htmlString, {
      wordwrap: false,
    });

    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }

    return text;
  }

  const desc = {
    title: post.Title,
    desc: truncateHtml(post.Body, 100),
    url: `https://khoanguyen.codes/writing/${post.slug}`,
    img: post.Image,
  };

  return (
    <Template description={desc} height="100%">
      <article>
        <Title color={themeUse.primary}>{post.Title}</Title>
        <Para color={themeUse.secondary}>{"Publish Date: " + formatDate(post.createdAt)}</Para>
        <Spacer theme={theme} length="200px" />
        <Para color={themeUse.secondary}>Author: Khoa Nguyễn</Para>
        <Para color={themeUse.secondary}>{"P/s: " + post.Desc}</Para>
        <Spacer theme={theme} length="150px" />
        <Div
          bgImg={post.Image}
          bgSize="cover"
          bgPos="center"
          h="300px"
          w="100%"
          cursor="pointer"
          rounded="lg"
          m={{ b: '1.5em' }}
        />
        <div dangerouslySetInnerHTML={{ __html: post.Body }} />
        <br />
        <h3>Khoa Nguyễn</h3>
        <p>&copy; 2024 Khoa Nguyễn. All rights reserved.</p>
        <Link href="/writing" passHref>
          <Div m={{ t: '1em' }} textColor={themeUse.secondary} hoverTextColor={themeUse.hover} transition>
            Go back...
          </Div>
        </Link>
        <ElementSpace space="12em" />
      </article>
    </Template>
  );
};

export default WritingPage;