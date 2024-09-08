import {Template, Title} from '../components/Template/'
import {desc} from '../lib'
import {About} from '../components/Post'

const about = ({themeUse,theme}) => {
    return (
        <Template description={desc.about} height="100%">
            <Title color={themeUse.primary}>{desc.about.heading}</Title>
            <About desc={desc.about} content={desc.about.content} themeUse={themeUse} theme={theme}/>
        </Template>
    );
}

export default about;