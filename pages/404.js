import {Title, Para, Template, Spacer, Back} from '../components/Template/'

const description = {
    title: '404 Not found | Khoa Nguyễn',
    url: 'https://khoanguyen.codes/',
}

const Custom404 = ({themeUse, theme}) =>{
    return (
        <Template description={description} height="100%">
            <Title color={themeUse.primary} size="display1">Oops!</Title>
            <Spacer theme={theme} length="60px"/>
            <Para color={themeUse.secondary}>Có vẻ như trang cậu tìm không có!<br/>Hãy quay trở lại! <br/> <strong>Error code: 404</strong></Para>
            <Spacer theme={theme} length="80px"/>
            <Back themeUse={themeUse}/>
        </Template> 
    )
}

export default Custom404;