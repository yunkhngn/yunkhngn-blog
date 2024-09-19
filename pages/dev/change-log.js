import { Template, Title } from "../../components/Template";
import { ChangeLog } from "../../components/Content";
import { desc } from "../../components/lib";

const changeLog = ({theme,themeUse,log}) => {
  return (
    <Template description={desc.changeLog} height="100%">
        <Title color={themeUse.primary}>{desc.changeLog.heading}</Title>
        <ChangeLog desc={desc.changeLog} theme={theme} themeUse={themeUse} log={log}/>
  </Template>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://api.github.com/repos/yunkhngn/next-project/commits', {
      headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`
      }
  });

  let log = await res.json();
  log = log
      .filter(commit => commit.commit.message.includes('[Change log]'))
      .map(commit => ({
          id: commit.sha, 
          message: commit.commit.message.replace(/\[Change log\]/g, ''),
          author: commit.commit.author.name,
          date: commit.commit.author.date
      }));

  return {
      props: {
          log
      },
      revalidate: 60
  }
}
export default changeLog