import {Para, SocialLink, Spacer, Snake, Footer} from '../../Template'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import {Div} from 'atomize'
  
const Intro = ({theme,themeUse, content}) => {
    return (
        <article>
            <Para color={themeUse.secondary}>Graphic Designer / Software Engineer</Para>
            <Spacer theme={theme} length={{xs:"100%", md:"200px"}} />
            <ReactMarkdown>{content}</ReactMarkdown>
            <br/>
            <i><span className={"keyboard kb--"+theme}>&#8984;</span><span className={"keyboard kb--"+theme}>k</span>để khám phá...</i>
            <Spacer theme={theme} length="160px"/>
            <SocialLink theme={theme}/>
            <Spacer theme={theme} length="100px"/>
            <blockquote className="blockQuote">Mr. Snake eating my contributions.</blockquote>
            <Snake theme={theme}/>
            <Spacer theme={theme} length="60px"/>
            <Footer content="Dùng máy tính để có trải nghiệm tốt nhất."/>
            <Link href="/dev/change-log" passHref scroll={true}>
                <Div
                    textColor={themeUse.secondary}
                    hoverTextColor={themeUse.hover}
                    transition
                    m={{ t: "1em" }}
                    >
                    Change log...
                </Div>
            </Link>
        </article>
    );
}

export default Intro;