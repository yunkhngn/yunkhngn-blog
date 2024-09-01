import {Template, Title} from '../components/Template'
import {Project} from '../components/Post'
import {desc} from '../lib'

const projects = ({themeUse,theme,prj}) => {
    return (
        <Template description={desc.projects} height="100%">
            <Title color={themeUse.primary}>Project</Title>
            <Project prj={prj} themeUse={themeUse} theme={theme}/>
        </Template>
    );
}

export async function getStaticProps() {
    const res = await fetch('https://api.github.com/users/yunkhngn/repos');
    const prj = await res.json();
    const filteredRepos = prj
    .sort((a, b) => {
      if (a.stargazers_count === b.stargazers_count) {
        return new Date(b.created_at) - new Date(a.created_at); // Sắp xếp theo ngày tạo nếu số sao bằng nhau
      }
      return b.stargazers_count - a.stargazers_count; // Sắp xếp theo số sao giảm dần
    })
    .slice(0, 5); // Chỉ lấy 5 repository đầu tiên
    return {
      props: {
        prj: filteredRepos,
      },
    };
  }

export default projects;