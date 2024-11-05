//this is the main page
import {Template, Title} from '../components/Template/'
import {Intro} from '../components/Content/'
import {desc} from '../components/lib'

export default function Home({theme, themeUse, content,prj}) {
  return (
    <Template description={desc.home} height="100%">
      <Title color={themeUse.primary}>{desc.home.heading}</Title>
      <Intro writing={content} project={prj} content={desc.home.content} themeUse={themeUse} theme={theme}/>
    </Template>
  )
}