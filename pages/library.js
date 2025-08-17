import {Template, Title} from '../components/Template'
import {Pics} from '../components/Content'
import {desc} from '../components/lib'

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

export const getServerSideProps = async ({ res }) => {
    try {
      const response = await client.getEntries({
        content_type: 'behanceBlog'
      });

      res.setHeader('Cache-Control', 'no-store');

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
      return {
        props: {
          data: sortedData
        }
      };
    } catch (error) {
      console.error('Error fetching entries:', error);
      return {
        props: {
          data: [] // Trả về mảng rỗng nếu có lỗi
        }
      };
    }
  };

export default writings;