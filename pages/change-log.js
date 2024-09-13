import { Template, Title } from "../components/Template/";

const desc = {
    title: 'Change log | Khoa Nguyễn',
    heading: 'Change log',
    url: 'https://khoanguyen.codes/change-log',
    desc: "Change log của website của tớ.",
    img: 'https://khoanguyen.codes/image/wall.png',
}

const changeLog = ({theme,themeUse}) => {
  return (
    <Template description={desc} height="100%">
        <Title color={themeUse.primary}>{desc.heading}</Title>
  </Template>
  )
}

export default changeLog