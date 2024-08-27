import { Para } from '../../Template';
import Link from 'next/link';
import { Div, Image } from 'atomize'; // Sử dụng Image từ atomize
import ElementSpace from '../ElementSpace';

const Blog = ({ theme, themeUse }) => {
    const dateFormer = (date) => {
        let dateArr = date.split('T')[0].split('-');
        return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
    };

    const data = [
        {
            id: 1,
            attributes: {
                Title: 'Graphic Design Project 1',
                Image: 'https://via.placeholder.com/150', // URL của hình ảnh
                createdAt: '2023-07-06T00:00:00.000Z',
                slug: 'graphic-design-project-1'
            }
        },
        {
            id: 2,
            attributes: {
                Title: 'Graphic Design Project 2',
                Image: 'https://via.placeholder.com/150',
                createdAt: '2023-07-06T00:00:00.000Z',
                slug: 'graphic-design-project-2'
            }
        },
        {
            id: 3,
            attributes: {
                Title: 'Graphic Design Project 3',
                Image: 'https://via.placeholder.com/150',
                createdAt: '2023-07-06T00:00:00.000Z',
                slug: 'graphic-design-project-3'
            }
        }
    ];

    return (
        <article>
            <Para color={themeUse.secondary}>A collection of my (un)organized musings.</Para>
            <Div m={{ b: '1.7em' }} />
            <hr className={'hr' + theme} />
            <Div>
                {data.map((item) => {
                    return (
                        <div key={item.id}>
                        <a target="_blank" rel="noreferrer" href={item.attributes.Link}>
                        <Div
            justify="flex-start"
            align="center"
            d="flex"
            flexWrap="wrap" // Cho phép các phần tử xuống dòng khi không còn đủ không gian
            hoverBg={theme === 'light' ? 'gray200' : '#222222'}
            rounded="12px"
            p="16px"
            transition
            m={{ r: '-16px', l: '-16px' }}
            textAlign="left"
        >
            <Image
                m={{ r: '16px' }}
                alt="image"
                src={item.attributes.Image}
                h={{ xs: '70px', sm: '100px' }} // Đặt kích thước hình ảnh theo kích thước màn hình
                w={{ xs: '70px', sm: '100px' }}
                rounded="12px"
            />
            <Para
                margin={{ b: '16px' }}
                which="right"
                color={theme === 'light' ? '#171717' : '#ededed'}
                d={{ xs: 'block', sm: 'flex' }} // Đặt kiểu hiển thị linh hoạt
                textAlign={{ xs: 'center', sm: 'left' }} // Căn chỉnh văn bản tùy thuộc vào kích thước màn hình
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
                Đây là project mẫu
            </Para>
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
                d={{ xs: 'block', sm: 'flex' }}
                textAlign={{ xs: 'center', sm: 'left' }}
            >
                {dateFormer(item.attributes.createdAt)}
            </Para>
        </Div>
                        </a>
                    </div>
                    );
                })}
            </Div>
            <ElementSpace space="12em" />
        </article>
    );
};

export default Blog;