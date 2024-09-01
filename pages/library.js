import {Template, Title} from '../components/Template'
import {Blog} from '../components/Post'
import {desc} from '../lib'

const contentful = require('contentful');
import dotenv from 'dotenv';
dotenv.config();
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const writings = ({themeUse,theme, data}) => {
    return (
        <Template description={desc.pics} height="100%">
            <Title color={themeUse.primary}>Library</Title>
            <Blog data={data} themeUse={themeUse} theme={theme}/>
        </Template>
    );
}

export const getStaticProps = async () => {
    try {
      const response = await client.getEntries({
        content_type: 'behanceBlog'
      });
  
      console.log('Contentful response:', response); // Log để kiểm tra response từ Contentful
  
      const sortedData = response.items.map(item => ({
        id: item.sys.id,
        attributes: {
          Title: item.fields.title,
          Image: item.fields.image.fields.file.url,
          createdAt: item.fields.date,
          url: item.fields.url,
          desc: item.fields.desc
        }
      })).sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));
  
      console.log('Sorted data:', sortedData); // Log để kiểm tra dữ liệu sau khi xử lý
  
      return {
        props: {
          data: sortedData
        },
        revalidate: 60 // ISR sau mỗi 60 giây
      };
    } catch (error) {
      console.error('Error fetching entries:', error);
      return {
        props: {
          data: [] // Trả về mảng rỗng nếu có lỗi
        },
        revalidate: 60
      };
    }
  };

export default writings;