import {Div} from 'atomize'
import Metatags from './Metatags'

const Template = ({children, description, height}) => {
    return (
    <section>
        <Div maxW="720px" m="auto" justify="center" align="center" p={{t:{xs:"50px", md:"120px"}, l:"16px", r:"16px"}} h={height}>
            <Metatags description={description}/>
            {children}
        </Div>
    </section>
    );
}

export default Template;