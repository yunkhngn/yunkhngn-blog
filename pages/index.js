//this is the main page
import {Template, Title} from '../components/Template/'
import {Intro} from '../components/Post/'
import {desc} from '../lib'

export default function Home({theme, themeUse}) {
  return (
    <Template description={desc.home} height="100%">
      <Title color={themeUse.primary}>{desc.home.heading}</Title>
      <Intro content={desc.home.content} themeUse={themeUse} theme={theme}/>
    </Template>
  )
}
