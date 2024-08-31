import {Text} from 'atomize'

const Paragraph = ({d, children, color, margin, which,w}) => {
    const marginText = () => {
        if (margin){
            if (which === 'left'){
                return {l:'1em'}
            } else if (which === 'right'){
                return {r:'1em'}
            } else if (which === 'bottom'){
                return {b:'1em'}
            }  else if (which === 'top'){
                return {t:'0.7em'}
            } else if (which === 'both'){
                return {r:'1em',l:'1em'}
            }
        }
        return {}
    }
    return (
        <section>
            <Text maxW={w} d={d} m={marginText()} textWeight="450" textSize="paragraph" fontFamily='Magnat Text, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue' textColor={color}>
            {children}
            </Text>
        </section>
    );
}

export default Paragraph;