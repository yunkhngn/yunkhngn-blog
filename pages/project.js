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
    .slice(0, 5) // Chỉ lấy 5 repository đầu tiên
    .map(repo => ({
      ...repo,
      name: formatRepoName(repo.name), // Chuyển đổi tên repo
    }));

  return {
    props: {
      prj: filteredRepos,
    },
    revalidate: 60 // ISR sau mỗi 60 giây
  };
}

// Hàm để chuyển đổi tên repo
const formatRepoName = (name) => {
return name
  .split('-') // Tách chuỗi bằng dấu gạch
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu
  .join(' '); // Ghép các từ lại với nhau bằng dấu cách
};

export default projects;