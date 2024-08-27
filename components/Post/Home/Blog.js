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
                        <Link href="https://facebook.com" key={item.id}>
                            <a>
                                <Div
                                    justify="space-between"
                                    align="center"
                                    d="flex"
                                    hoverBg={theme === 'light' ? 'gray200' : '#222222'}
                                    rounded="12px"
                                    p="16px"
                                    transition
                                    m={{ r: '-16px', l: '-16px' }}
                                >
                                    <Image
                                        src={item.attributes.Image} // Hiển thị hình ảnh
                                        alt={item.attributes.Title}
                                        w="150px"
                                        h="150px"
                                        rounded="12px"
                                    />
                                    <Div flexGrow="1" m={{ l: '16px' }}>
                                        <Para margin="true" which="right" color={theme === 'light' ? '#171717' : '#ededed'}>
                                            <strong>{item.attributes.Title}</strong>
                                        </Para>
                                        <Para margin="true" which="left" color={themeUse.secondary}>
                                            {dateFormer(item.attributes.createdAt)}
                                        </Para>
                                    </Div>
                                </Div>
                            </a>
                        </Link>
                    );
                })}
            </Div>
            <ElementSpace space="12em" />
        </article>
    );
};

export default Blog;