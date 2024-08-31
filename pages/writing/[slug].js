// pages/writing/[slug].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const contentful = require('contentful');
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Template } from '../../components/Template';
import { Title, Para } from '../../components/Template';
import { Spacer } from '../../components/Hooks';
import ElementSpace from '../../components/Post/ElementSpace';
import { Div, Image } from 'atomize';
import Link from 'next/link';

import dotenv from 'dotenv';
dotenv.config();
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Đảm bảo có 2 chữ số cho ngày
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, cộng thêm 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

const WritingPage = ({ themeUse, theme }) => {
  const router = useRouter();
  const { slug } = router.query; // Lấy slug từ URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // State để xử lý lỗi

  useEffect(() => {
    if (!slug) return;

    const fetchPostBySlug = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'blogPage',
          'fields.slug': slug // Tìm bài viết theo slug
        });

        if (response.items.length > 0) {
          const item = response.items[0];
          const bodyHtml = documentToHtmlString(item.fields.body); // Chuyển đổi rich text sang HTML mà không loại bỏ thẻ

          const postData = {
            id: item.sys.id,
            Title: item.fields.title,
            Image: `https:${item.fields.image.fields.file.url}`,
            createdAt: item.sys.createdAt,
            Body: bodyHtml,
            Desc: item.fields.description
          };
          setPost(postData);
        } else {
          setError(true); // Không tìm thấy bài viết
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(true); // Xử lý lỗi khi fetch dữ liệu
        setLoading(false);
      }
    };

    fetchPostBySlug();
  }, [slug]);

  if (loading) {
    const desc = {
      title: "Loading",
      desc: "Loading...",
      url: "https://khoanguyen.me/writing"
    };
    return ( <Template description={desc} height="100%">
      <article>
        <Title color={themeUse.primary}>Loading...</Title>
        
        <Spacer theme={theme} length="200px" />
        <Para color={themeUse.secondary}>We are searching for your page.</Para>
        <Spacer theme={theme} length="150px" />
        <Link href="/writing" passHref>
          <Div m={{ t: '1em' }} textColor={themeUse.secondary} hoverTextColor={themeUse.hover} transition>
            Go back...
          </Div>
        </Link>
        <ElementSpace space="12em" />
      </article>
    </Template>) // Hiển thị thông báo lỗi nếu không tìm thấy bài viết hoặc có lỗi
  }

  if (error) {
    const desc = {
      title: "Page not found",
      desc: "Sorry, your post looking for is not found!",
      url: "https://khoanguyen.me/writing"
    };
    return ( <Template description={desc} height="100%">
      <article>
        <Title color={themeUse.primary}>Post not found!</Title>
        
        <Spacer theme={theme} length="200px" />
        <Para color={themeUse.secondary}>Sorry, your post looking for is not found!</Para>
        <Spacer theme={theme} length="150px" />
        <Link href="/writing" passHref>
          <Div m={{ t: '1em' }} textColor={themeUse.secondary} hoverTextColor={themeUse.hover} transition>
            Go back...
          </Div>
        </Link>
        <ElementSpace space="12em" />
      </article>
    </Template>) 
  }

  const desc = {
    title: post.Title,
    desc: post.Body,
    url: `https://khoanguyen.me/writing/${slug}`
  };
  const src = post.Image;

  return (
    <Template description={desc} height="100%">
      <article>
        <Title color={themeUse.primary}>{post.Title}</Title>
        <Para color={themeUse.secondary}>
        {"Publish Date: " + formatDate(post.createdAt)}
        </Para>
        <Spacer theme={theme} length="200px" />
        <Para color={themeUse.secondary}>Author: Khoa Nguyễn</Para>
        <Para color={themeUse.secondary}>{"P/s: " +post.Desc}</Para>
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
        <br/>
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