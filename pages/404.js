import {Title, Para, Template} from '../components/Template/'
import {Spacer} from '../components/Hooks/'
import Link from 'next/link'
import {Div} from 'atomize'

const description = {
    title: '404 Not found - Khoa Nguyễn',
    url: 'https://www.khoanguyen.dev/',
}

const Custom404 = ({themeUse, theme}) =>{
    return (
        <Template description={description} height="100%">
            <Title color={themeUse.primary} size="display1">Oops!</Title>
            <Para color={themeUse.secondary}>We can't seem to find the page you are looking for!<br/>Please go back to the homepage! <br/> <strong>Error code: 404</strong></Para>
            <Spacer theme={theme} length="80px"/>
            <Link href="/"><a><Div textColor={themeUse.secondary} hoverTextColor={themeUse.hover} transition>Go back...</Div></a></Link>
        </Template> 
    )
}

export default Custom404;