import { Template, Title } from "../../components/Template";
import { ChangeLog } from "../../components/Post";
const desc = {
    title: 'Change log | Khoa Nguyễn',
    heading: 'Change log',
    url: 'https://khoanguyen.codes/change-log',
    desc: "Change log của website của tớ.",
    img: 'https://khoanguyen.codes/image/wall.png',
}

const changeLog = ({theme,themeUse,log}) => {
  return (
    <Template description={desc} height="100%">
        <Title color={themeUse.primary}>{desc.heading}</Title>
        <ChangeLog desc={desc} theme={theme} themeUse={themeUse} log={log}/>
  </Template>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/yunkhngn/next-project/commits', {
      headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`
      }
  });

  let log = await res.json();
  log = log
      .filter(commit => commit.commit.message.includes('[Change log]'))
      .slice(0, 5)
      .map(commit => ({
          id: commit.sha, 
          message: commit.commit.message, 
          author: commit.commit.author.name,
          date: commit.commit.author.date
      }));

  return {
      props: {
          log
      }
  }
}
export default changeLog