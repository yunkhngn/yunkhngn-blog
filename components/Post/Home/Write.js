import {Para} from '../../Template'
import {Div} from 'atomize'

const Write = ({theme,themeUse, write}) => {
    const dateFormer = (date) =>{
        let dateArr = date.split('T')[0].split('-')
        return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`
    }

    return (
        <article>
            <Para color={themeUse.secondary} >A collection of my (un)organized musings.</Para>
            <Div m={{b:'1.7em'}}/>
            <hr className={'hr'+theme}/>
            <Div>
                { write.length === 0 ? <Para color={themeUse.secondary} >No writing posted yet.</Para> :
                write.map(item => (
                    <div key={item.id}>
                        <a target="_blank" rel="noreferrer" href={item.attributes.Link}>
                            <Div justify="space-between" align="center" d="flex" hoverBg={theme === 'light' ? "gray200" : '#222222'} rounded='12px' p="16px" transition m={{r:"-16px", l:"-16px"}}>
                                <Para margin="true" which="right" color={theme === 'light' ? '#171717' : "#ededed"}><strong>{item.attributes.Title}</strong></Para>
                                <hr className={'hr'+theme}/>
                                <Para margin="true" which="left" color={themeUse.secondary}>{dateFormer(item.attributes.createdAt)}</Para>
                            </Div>
                        </a>
                    </div>
                ))}
            </Div>
        </article>
    );
}

export default Write;