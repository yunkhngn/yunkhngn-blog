import {Template, Title} from '../components/Template'
import {Project} from '../components/Post'
import {desc} from '../lib'

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
    },
    revalidate: 60 
  };
}
export default projects;