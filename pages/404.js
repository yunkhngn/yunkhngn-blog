import {Title, Para, Template} from '../components/Template/'
import {Spacer} from '../components/Hooks/'
import Link from 'next/link'
import {Div} from 'atomize'

const description = {
    title: '404 Not found | Khoa Nguyễn',
    url: 'https://www.khoanguyen.codes/',
}

const Custom404 = ({themeUse, theme}) =>{
    return (
        <Template description={description} height="100%">
            <Title color={themeUse.primary} size="display1">Oops!</Title>
            <Para color={themeUse.secondary}>Có vẻ như trang bạn tìm không có!<br/>Hãy quay trở lại trang chủ! <br/> <strong>Error code: 404</strong></Para>
            <Spacer theme={theme} length="80px"/>
            <Link passHref href="/"><Div textColor={themeUse.secondary} hoverTextColor={themeUse.hover} transition>Quay lại...</Div></Link>
        </Template> 
    )
}

export default Custom404;