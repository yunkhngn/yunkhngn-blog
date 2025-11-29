
import {Template, Title} from '../components/Template/'
import {desc} from '../components/lib'
import { ContactForm } from '../components/Content'
export default function ContactPage({theme, themeUse}) {
  return (
    <Template 
      description={{
        ...desc.contact,
        structuredDataType: 'website'
      }}
    >
      <Title color={themeUse.primary}>{desc.contact.heading}</Title>
      <ContactForm desc={desc.contact} theme={theme} themeUse={themeUse}/>
    </Template>
  )
}