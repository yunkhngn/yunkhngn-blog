//this is the main page
import {Template, Title} from '../components/Template/'
import {Intro} from '../components/Post/'
import {desc} from '../lib'

export default function Home({theme, themeUse}) {
  const content = {
    Description: "Xin chào, tớ là Khoa Nguyễn. Tớ là sinh viên chuyên ngành Công nghệ thông tin tại Đại học FPT. Hiện tại tớ cũng đang là freelancer thiết kế đồ hoạ và phát triển một số dự án cá nhân liên quan tới chuyên ngành.",
  }
  return (
    <Template description={desc.home} height="100%">
      <Title color={themeUse.primary}>Khoa Nguyễn</Title>
      <Intro content={content} themeUse={themeUse} theme={theme}/>
    </Template>
  )
}
