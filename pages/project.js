import {Template, Title} from '../components/Template'
import {Project} from '../components/Content'
import {desc} from '../components/lib'

const projects = ({themeUse,theme,prj}) => {
    return (
        <Template description={desc.projects} height="100%">
            <Title color={themeUse.primary}>{desc.projects.heading}</Title>
            <Project desc={desc.projects} prj={prj} themeUse={themeUse} theme={theme}/>
        </Template>
    );
}

export async function getServerSideProps({ res }) {
  try {
    const token = process.env.GITHUB_TOKEN; 
    const response = await fetch('https://api.github.com/users/yunkhngn/repos', {
      headers: {
        'Authorization': `token ${token}`, 
        'Accept': 'application/vnd.github.v3+json' 
      }
    });
    const prj = await response.json();
    res.setHeader('Cache-Control', 'no-store');
    const filteredRepos = prj
    .filter(repo => !repo.fork)
    .filter(repo => repo.name !== 'yunkhngn')
    .sort((a, b) => {
      if (a.updated_at === b.updated_at) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    return {
      props: {
        prj: filteredRepos,
      }
    };
  }
  catch (error) {
    console.error(error);
    return {
      props: {
        prj: [],
      },
    };
  }
}
export default projects;