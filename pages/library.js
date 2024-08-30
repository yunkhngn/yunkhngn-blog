import {Template, Title} from '../components/Template'
import {Blog} from '../components/Post'
import {desc} from '../lib'

const writings = ({content,themeUse,theme}) => {
    return (
        <Template description={desc.pics} height="100%">
            <Title color={themeUse.primary}>Library</Title>
            <Blog data={content} themeUse={themeUse} theme={theme}/>
        </Template>
    );
}

export default writings;