//this is the main page
import {Template, Title} from '../components/Template/'
import {Intro} from '../components/Post/'
import {desc} from '../lib'

export default function Home({theme, themeUse}) {
  const content = {
    Description: "Hi, I’m Khoa Nguyễn. I’m currently a college student at FPT University, where I’m honing my skills in software engineering. I have a deep interest in building dynamic applications using Reactjs and Nodejs, and I thrive on creating innovative designs.",
    Content: "Ctrl / Cmd + K to discover..."
  }
  return (
    <Template description={desc.home} height="100%">
      <Title color={themeUse.primary}>Khoa Nguyễn</Title>
      <Intro content={content} themeUse={themeUse} theme={theme}/>
    </Template>
  )
}
