import {Template, Title} from '../components/Template'
import {Project} from '../components/Post'
import {desc} from '../lib'

const projects = ({themeUse,theme}) => {
    const prj = [
        {
            id: 1,
            attributes: {
                Title: 'Project 1',
                Link: 'https://www.khoanguyen.dev',
                createdAt: '2021-07-06T00:00:00.000Z'
            }
        },
        {
            id: 2,
            attributes: {
                Title: 'Project 2',
                Link: 'https://www.khoanguyen.dev',
                createdAt: '2021-07-06T00:00:00.000Z'
            }
        },
        {
            id: 3,
            attributes: {
                Title: 'Project 3',
                Link: 'https://www.khoanguyen.dev',
                createdAt: '2021-07-06T00:00:00.000Z'
            }
        },
        {
            id: 4,
            attributes: {
                Title: 'Project 4',
                Link: 'https://www.khoanguyen.dev',
                createdAt: '2021-07-06T00:00:00.000Z'
            }
        },
        {
            id: 5,
            attributes: {
                Title: 'Project 5',
                Link: 'https://www.khoanguyen.dev',
                createdAt: '2021-07-06T00:00:00.000Z'
            }
        },
        {
            id: 6,
            attributes: {
                Title: 'Project 6',
                Link: 'https://www.khoanguyen.dev',
                createdAt: '2021-07-06T00:00:00.000Z'
            }
        },
        {
            id: 7,
            attributes: {
                Title: 'Project 7',
                Link: 'https://www.khoanguyen.dev',
                createdAt: '2021-07-06T00:00:00.000Z'
            }
        },
        {
            id: 8,
            attributes: {
                Title: 'Project 8',
                Link: 'https://www.khoanguyen.dev',
                createdAt: '2021-07-06T00:00:00.000Z'
            }
        },
        {
            id: 9,
            attributes: {
                Title: 'Project 9',
                Link: 'https://www.khoanguyen.dev',
                createdAt: '2021-07-06T00:00:00.000Z'
            }
        }
    ]
    return (
        <Template description={desc.projects} height="100%">
            <Title color={themeUse.primary}>Project</Title>
            <Project prj={prj} themeUse={themeUse} theme={theme}/>
        </Template>
    );
}

export default projects;