import {SocialLink, Spacer} from '../../Hooks'
import {Para} from '../../Template'
import {Button} from 'atomize'
import ReactMarkdown from 'react-markdown'

const Intro = ({theme,themeUse, content}) => {
    return (
        <article>
            <Para color={themeUse.secondary}>Graphic Designer / Software Engineer</Para>
            <Spacer theme={theme} length="140px"/>
            <ReactMarkdown>{content.Description}</ReactMarkdown>
            <br/>
            <i>{content.Content}</i>
            <Spacer theme={theme} length="80px"/>
            <SocialLink theme={theme}/>

        </article>
    );
}

export default Intro;