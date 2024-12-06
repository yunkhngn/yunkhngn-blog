import {Para, SocialLink, Spacer, Footer} from '../../Template'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import {Div} from 'atomize'
  
const Intro = ({theme,themeUse, content}) => {
    return (
        <article>
            <Para color={themeUse.secondary}>Graphic Designer / Software Engineer</Para>
            <Spacer theme={theme} length={{xs:"100%", md:"200px"}}/>
            <ReactMarkdown>{content}</ReactMarkdown>
            <br/>
            <i><span className={"keyboard kb--"+theme}>&#8984;</span><span className={"keyboard kb--"+theme}>k</span>để khám phá...</i>
            <Spacer theme={theme} length="160px"/>
            <SocialLink theme={theme}/>
            <Spacer theme={theme} length="60px"/>
            <Footer content="Dùng máy tính để có trải nghiệm tốt nhất."/>
        </article>
    );
}

export default Intro;