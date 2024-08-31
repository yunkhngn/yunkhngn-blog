import {Para} from '../../Template'
import {Div} from 'atomize'
import {useState, useEffect} from 'react'
import Link from 'next/link'
const contentful = require('contentful')

const client = contentful.createClient({
    space: 'ylftmc9jqqoq',
    environment: 'master', // defaults to 'master' if not set
    accessToken: 'Kj4D3ADbeK9g1DA4zKE338aBQT9JfbaJkW_Hiznt_fg'
  })
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Đảm bảo có 2 chữ số cho ngày
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, cộng thêm 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

const Write = ({theme,themeUse, write}) => {
    const [content, setContent] = useState([]); // Khai báo state để lưu trữ dữ liệu
    const dateFormer = (date) => {
        let dateArr = date.split('T')[0].split('-');
        return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
    };

    useEffect(() => {
        // Fetch dữ liệu từ Contentful
        const fetchEntries = async () => {
            try {
                const response = await client.getEntries({
                    content_type: 'blogPage' 
                });
                console.log(response);
                const fetchedData = response.items.map(item => ({
                    id: item.sys.id,
                    attributes: {
                      Title: item.fields.title,
                      Image: `https:${item.fields.image.fields.file.url}`, // Thêm "https:" để đảm bảo URL đầy đủ
                      Slug: item.fields.slug,
                      createdAt: item.sys.createdAt,
                      Desc: item.fields.description, // Chuyển đổi rich text sang HTML
                    }
                  }));
                  setContent(fetchedData);
                console.log(fetchedData);
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };

        fetchEntries();
    }, []); // Chạy một lần khi component được mount


    return (
        <article>
        <Para color={themeUse.secondary}>A collection of my (un)organized musings.</Para>
        <Div m={{ b: '1.7em' }} />
        <hr className={'hr' + theme} />
        <Div>
          {content.length === 0 ? (
            <Para color={themeUse.secondary}>No writing posted yet.</Para>
          ) : (
            content.map((item) => (
              <div key={item.id}>
               <Link href={`/writing/${item.attributes.Slug}`} passHref>
                  <Div
                    justify="flex-start"
                    align="center"
                    d="flex"
                    hoverBg={theme === 'light' ? 'gray200' : '#222222'}
                    rounded="12px"
                    p="16px"
                    transition
                    m={{ r: '-16px', l: '-16px' }}
                  >
                    <Para margin="true" which="right" color={theme === 'light' ? '#171717' : '#ededed'}>
                      <strong>{item.attributes.Title}</strong>
                    </Para>
                    <Para w={{ xs: '170px', md: '350px' }} margin="true" which="right" color={theme === 'light' ? '#171717' : '#ededed'}>
                      {item.attributes.Desc+ '...'}
                    </Para>
                    <hr className={'hr' + theme} />
                    <Para margin="true" which="left" color={themeUse.secondary}>
                    {formatDate(item.attributes.createdAt)} 
                    </Para>
                  </Div>
                </Link>
              </div>
            ))
          )}
        </Div>
      </article>
    );
}

export default Write;