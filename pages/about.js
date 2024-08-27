import {Template, Title} from '../components/Template/'
import {Intro} from '../components/Post/'
import {desc} from '../lib'
import ElementSpace from '../components/Post/ElementSpace'
const about = ({themeUse,theme}) => {
    const content = {
        Description: "Hi, I'm Khoa Nguyễn",
        Content: "I am the one you looking for"
      }
    return (
        <Template description={desc.about} height="100%">
            <Title color={themeUse.primary}>About me</Title>
            <Intro content={content} themeUse={themeUse} theme={theme}/>
            <ElementSpace/>
            &nbsp;
        </Template>
    );
}

export default about;