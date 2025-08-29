import {Template, Title} from '../components/Template/'
import {desc} from '../components/lib'
import {About} from '../components/Content'

export default function AboutPage({theme, themeUse}) {
  return (
    <Template 
      description={{
        ...desc.about,
        structuredDataType: 'person'
      }}
    >
      <Title color={themeUse.primary}>{desc.about.heading}</Title>
      <About desc={desc.about} content={desc.about.content} themeUse={themeUse} theme={theme}/>
    </Template>
  )
}

