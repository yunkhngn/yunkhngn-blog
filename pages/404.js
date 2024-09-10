import {Title, Para, Template} from '../components/Template/'
import {Spacer} from '../components/Hooks/'
import {Div} from 'atomize'
import {useRouter} from 'next/router'

const description = {
    title: '404 Not found | Khoa Nguyễn',
    url: 'https://www.khoanguyen.codes/',
}

const Custom404 = ({themeUse, theme}) =>{
    const router = useRouter();
    return (
        <Template description={description} height="100%">
            <Title color={themeUse.primary} size="display1">Oops!</Title>
            <Para color={themeUse.secondary}>Có vẻ như trang bạn tìm không có!<br/>Hãy quay trở lại trang chủ! <br/> <strong>Error code: 404</strong></Para>
            <Spacer theme={theme} length="80px"/>
            <Div onClick={() => router.back()}  textColor={themeUse.secondary} hoverTextColor={themeUse.hover} transition>Quay lại...</Div>
        </Template> 
    )
}

export default Custom404;