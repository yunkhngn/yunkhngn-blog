
import {Template, Title} from '../components/Template/'
import {desc} from '../lib'
import { ContactForm } from '../components/Post'
const contact = ({theme, themeUse}) => {
  return (
    <Template description={desc.contact} height="100%">
            <Title color={themeUse.primary}>Liên hệ</Title>
            <ContactForm desc={desc.contact} theme={theme} themeUse={themeUse}/>
    </Template>
  )
}

export default contact