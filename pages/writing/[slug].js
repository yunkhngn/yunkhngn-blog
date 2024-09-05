import { useRouter } from 'next/router';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Title, Para, Template } from '../../components/Template';
import { Spacer } from '../../components/Hooks';
import {ElementSpace} from '../../components/Post/';
import { Div } from 'atomize';
import Link from 'next/link';
import { htmlToText } from 'html-to-text';

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

export async function getStaticPaths() {
  // Fetch all posts to get slugs for each post
  const response = await client.getEntries({ content_type: 'blogPage' });

  const paths = response.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return { paths, fallback: false }; // Pre-render only these paths at build time, other routes will return 404
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
      const postData = {
        id: item.sys.id,
        Title: item.fields.title,
        Image: `https:${item.fields.image.fields.file.url}`,
        createdAt: item.sys.createdAt,
        Body: bodyHtml,
        Desc: item.fields.description,
        slug: item.fields.slug,
      };
      return {
        props: { post: postData }, // Pass post data to the page component as props
        revalidate: 60, // Revalidate every 60 seconds
      };
    } else {
      return {
        notFound: true, // If post not found, return 404
      };
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    return { notFound: true }; // Return 404 if there is an error
  }
}

const WritingPage = ({ post, themeUse, theme }) => {
  const router = useRouter();

  // Show loading state if path is not yet pre-rendered
  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  if (!post) {
    const desc = {
      title: "Page not found",
      desc: "Sorry, your post looking for is not found!",
      url: `https://khoanguyen.codes/writing/${post.slug}`,
      img: "https://khoanguyen.codes/favicon/wall.png"
    };
    return ( 
      <Template description={desc} height="100%">
        <article>
          <Title color={themeUse.primary}>Không có post nào ở đây!</Title>
          <Spacer theme={theme} length="200px" />
          <Para color={themeUse.secondary}>Post bạn tìm hiện không thấy!</Para>
          <Spacer theme={theme} length="150px" />
          <Link href="/writing" passHref>
            <Div m={{ t: '1em' }} textColor={themeUse.secondary} hoverTextColor={themeUse.hover} transition>
              Quay lại...
            </Div>
          </Link>
          <ElementSpace space="12em" />
        </article>
      </Template>
    );
  }

  function truncateHtml(htmlString, maxLength) {
    // Chuyển đổi HTML thành văn bản thuần
    const text = htmlToText(htmlString, {
      wordwrap: false
    });
  
    // Cắt ngắn văn bản và thêm ba dấu chấm
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
  
    return text;
  }

  const src = post.Image;
  
  const desc = {
    title: post.Title,
    desc: truncateHtml(post.Body, 100), // Cắt ngắn với chiều dài 100 ký tự
    url: `https://khoanguyen.codes/writing/${post.slug}`,
    img: src,
  };
  return (
    <Template description={desc} height="100%">
      <article>
        <Title color={themeUse.primary}>{post.Title}</Title>
        <Para color={themeUse.secondary}>
          {"Ngày đăng: " + formatDate(post.createdAt)}
        </Para>
        <Spacer theme={theme} length="200px" />
        <Para color={themeUse.secondary}>Tác giả: Khoa Nguyễn</Para>
        <Para color={themeUse.secondary}>{"Phân loại: " + post.Desc}</Para>
        <Spacer theme={theme} length="150px" />
        <Div
          bgImg={src}
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

        <Spacer theme={theme} length="200px" />
        <h3>Khoa Nguyễn</h3>
        <p>&copy; 2024 Khoa Nguyễn. All rights reserved.</p>
        <Link href="/writing" passHref>
          <Div m={{ t: '1em' }} textColor={themeUse.secondary} hoverTextColor={themeUse.hover} transition>
            Quay lại...
          </Div>
        </Link>
        <ElementSpace space="12em" />
      </article>
    </Template>
  );
};

export default WritingPage;