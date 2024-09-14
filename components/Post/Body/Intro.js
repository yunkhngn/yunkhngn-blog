import {Para, SocialLink, Spacer} from '../../Template'
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
            <Spacer theme={theme} length="120px"/>
            <SocialLink theme={theme}/>
            <Spacer theme={theme} length="60px"/>
            <Link href="/dev/change-log" passHref scroll={true}>
                <Div
                    m={{ t: "1em" }}
                    textColor={themeUse.secondary}
                    hoverTextColor={themeUse.hover}
                    transition
                    >
                    Change log...
                </Div>
            </Link>
        </article>
    );
}

export default Intro;