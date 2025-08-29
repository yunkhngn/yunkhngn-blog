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

const truncateHtml = (htmlString, maxLength) => {
  const text = htmlToText(documentToHtmlString(htmlString), {
    wordwrap: false,
  });
  
  // Tách chuỗi thành mảng các từ
  const words = text.split(" ");
  
  // Biến để giữ kết quả đã nối và tính tổng độ dài
  let truncatedText = "";
  let currentLength = 0;

  // Lặp qua các từ và dừng khi đạt giới hạn maxLength
  for (let word of words) {
    // Kiểm tra nếu việc thêm từ tiếp theo sẽ vượt quá giới hạn
    if (currentLength + word.length + 1 > maxLength) {
      truncatedText += "...";
      break;
    }
    // Thêm từ vào chuỗi kết quả và cập nhật tổng độ dài
    truncatedText += word + " ";
    currentLength += word.length + 1; // +1 để tính khoảng trắng
  }

  return truncatedText.trim();
};

const writing = ({themeUse,theme, content}) => {
  
    return (
        <Template description={desc.blog} height="100%">
            <Title color={themeUse.primary}>{desc.blog.heading}</Title>
            <Write desc={desc.blog} themeUse={themeUse} theme={theme} content={content}/>
        </Template>
    );
}

export async function getStaticProps() {
  try {
    const response = await client.getEntries({
      content_type: 'blogPage',
      include: 1, // resolve linked assets (image)
      // select: 'fields.title,fields.image,fields.slug,fields.description,sys.createdAt,fields.body', // có thể bật để giảm payload
    });

    const content = response.items
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

    return { 
      props: { content },
      // Revalidate every 30 minutes (1800 seconds)
      revalidate: 1800,
    };
  } catch (error) {
    console.error('Error fetching content:', error);
    return {
      props: { content: [] },
      revalidate: 1800,
    };
  }
}

export default writing;