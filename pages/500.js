import {Title, Para, Template} from '../components/Template/'
import {Spacer} from '../components/Hooks/'

const description = {
    title: 'Server-side error occurred - Khoa Nguyễn',
    url: 'https://www.khoanguyen.dev/',
}

const Custom404 = ({themeUse, theme}) =>{
    return (
        <Template description={description} height="100%">
            <Title color={themeUse.primary} size="display1">Oops!</Title>
            <Para color={themeUse.secondary}>Server-side error occurred! Brace yourself till we get the error fixed.<br/>You may also refresh the page or try again later.<br/> <strong>Error code: 500</strong></Para>
            <Spacer theme={theme} length="80px"/>
        </Template> 
    )
}

export default Custom404;