
import {Template, Title} from '../components/Template/'
import {desc} from '../components/lib'
import { ContactForm } from '../components/Content'
const contact = ({theme, themeUse}) => {
  return (
    <Template description={desc.contact} height="100%">
            <Title color={themeUse.primary}>{desc.contact.heading}</Title>
            <ContactForm desc={desc.contact} theme={theme} themeUse={themeUse}/>
    </Template>
  )
}

export default contact