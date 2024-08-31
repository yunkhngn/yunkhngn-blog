import { useEffect, useState } from 'react'; // Thêm useState và useEffect
import { Para } from '../../Template';
import { Div, Image } from 'atomize';
import ElementSpace from '../ElementSpace';
const contentful = require('contentful');

const client = contentful.createClient({
  space: 'ylftmc9jqqoq',
  environment: 'master',
  accessToken: 'Kj4D3ADbeK9g1DA4zKE338aBQT9JfbaJkW_Hiznt_fg'
});

const Blog = ({ theme, themeUse }) => {
  const [data, setData] = useState([]); // Khai báo state để lưu trữ dữ liệu

  const dateFormer = (date) => {
    let dateArr = date.split('T')[0].split('-');
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
  };

  useEffect(() => {
    // Fetch dữ liệu từ Contentful
    const fetchEntries = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'behanceBlog'
        });

        // Sắp xếp dữ liệu theo ngày từ mới nhất đến cũ nhất
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

        setData(sortedData);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchEntries();
  }, []); // Chạy một lần khi component được mount

  return (
    <article>
      <Para color={themeUse.secondary}>A collection of my graphic design from Behance.</Para>
      <Div m={{ b: '1.7em' }} />
      <hr className={'hr' + theme} />
      <Div p={{ b: '1em' }}>
        {data.length === 0 ? (
          <Para color={themeUse.secondary}>There are no post yet...</Para>
        ) : (
          data.map((item) => (
            <div key={item.id}>
              <a target="_blank" rel="noreferrer" href={item.attributes.url}>
                <Div
                  justify="space-between"
                  align="center"
                  d="flex"
                  flexWrap="wrap"
                  hoverBg={theme === 'light' ? 'gray200' : '#222222'}
                  rounded={{ xs: '26px', sm: '24px' }}
                  p={{ xs: '16px', md: '16px' }}
                  transition
                  m={{ r: '-16px', l: '-16px' }}
                  textAlign="left"
                >
                  <Image
                    src={item.attributes.Image}
                    alt={item.attributes.Title}
                    h={{ xs: '70px', sm: '100px' }}
                    w={{ xs: '70px', sm: '100px' }}
                    rounded={{ xs: '12px', sm: '16px' }}
                    m={{ r: '1em' }}
                  />
                  <Div>
                    <Para
                      margin="true"
                      which="right"
                      color={theme === 'light' ? '#171717' : '#ededed'}
                      d={{ xs: 'block', sm: 'flex' }}
                      textAlign={{ xs: 'center', sm: 'left' }}
                    >
                      <strong>{item.attributes.Title}</strong>
                    </Para>
                    <Para
                      margin={{ b: '16px' }}
                      which="right"
                      color={theme === 'light' ? '#171717' : '#ededed'}
                      d={{ xs: 'block', sm: 'flex' }}
                      textAlign={{ xs: 'center', sm: 'left' }}
                    >
                      {item.attributes.desc}
                    </Para>
                  </Div>
                  <hr
                    className={'hr' + theme}
                    style={{
                      margin: '16px 0',
                      width: '100%',
                    }}
                  />
                  <Para
                    margin={{ t: '16px' }}
                    which="left"
                    color={themeUse.secondary}
                    textAlign={{ xs: 'center', sm: 'left' }}
                    //hide when xs
                    d={{ xs: "block", md: "flex" }}
                  >
                    {dateFormer(item.attributes.createdAt)}
                  </Para>
                </Div>
              </a>
            </div>
          ))
        )}
      </Div>
      <a target="_blank" rel="noreferrer" href="https://www.behance.net/yunkhngn_">
        <Div textColor={themeUse.secondary} hoverTextColor={themeUse.hover} transition>
          View all my Behance...
        </Div>
      </a>
      <ElementSpace space="12em" />
    </article>
  );
};

export default Blog;