import {Template, Title} from '../components/Template/'
import {Write} from '../components/Post/'
import {desc} from '../lib'

const writing = ({themeUse,theme}) => {
    const write = [
    ]
    return (
        <Template description={desc.blog} height="100%">
            <Title color={themeUse.primary}>Writing</Title>
            <Write write={write} themeUse={themeUse} theme={theme}/>
        </Template>
    );
}

export default writing;