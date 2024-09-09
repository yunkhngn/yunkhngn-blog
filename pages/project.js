import {Template, Title} from '../components/Template'
import {Project} from '../components/Post'
import {desc} from '../lib'

const formatRepoName = (name) => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '); 
  };

const projects = ({themeUse,theme,prj}) => {
  console.log(prj[12])
    return (
        <Template description={desc.projects} height="100%">
            <Title color={themeUse.primary}>{desc.projects.heading}</Title>
            <Project desc={desc.projects} prj={prj} themeUse={themeUse} theme={theme}/>
        </Template>
    );
}

export async function getStaticProps() {
  const res = await fetch('https://api.github.com/users/yunkhngn/repos');
  const prj = await res.json();
  const filteredRepos = prj
    .filter(repo => !repo.fork)
    .sort((a, b) => {
      if (a.stargazers_count === b.stargazers_count) {
        return new Date(b.created_at) - new Date(a.created_at); 
      }
      return b.stargazers_count - a.stargazers_count;
    })
    .map(repo => ({
      ...repo,
      name: formatRepoName(repo.name), 
    }));

  return {
    props: {
      prj: filteredRepos,
    },
    revalidate: 60 
  };
}
export default projects;