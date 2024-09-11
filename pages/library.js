import {Template, Title} from '../components/Template'
import {Pics} from '../components/Post'
import {desc} from '../lib'

// Lấy content từ api
const contentful = require('contentful');
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const writings = ({themeUse,theme, data}) => {
    return (
        <Template description={desc.pics} height="100%">
            <Title color={themeUse.primary}>{desc.pics.heading}</Title>
            <Pics desc={desc.pics} data={data} themeUse={themeUse} theme={theme}/>
        </Template>
    );
}

export const getStaticProps = async () => {
    try {
      const response = await client.getEntries({
        content_type: 'behanceBlog'
      });

      const sortedData = response.items.map(item => ({
        id: item.sys.id,
        attributes: {
          Title: item.fields.title,
          Image: item.fields.image.fields.file.url,
          createdAt: item.fields.date,
          url: item.fields.url,
          desc: item.fields.desc
        }
      }));
  
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