import {Template, Title} from '../components/Template/'
import {desc} from '../lib'
import {ElementSpace, About} from '../components/Post'

const about = ({themeUse,theme}) => {
    const content = {
        Description: "Xin chào, tớ là Khoa Nguyễn (yun.khngn), sinh viên chuyên ngành Công nghệ thông tin tại Đại học FPT. Hiện tại tớ đang là freelancer thiết kế đồ hoạ và phát triển một số dự án cá nhân liên quan tới chuyên ngành của mình. Bên cạnh đó, tớ còn là một guitarist đến từ ban nhạc Giấy Trắng tại Hà Nội.",
        Content: "Giới thiệu nhiều hơn một chút về bản thân, tớ đến từ Nam Định, lớn lên và làm việc tại Hà Nội. Bắt nguồn từ sự tò mò và sở thích muốn mày mò và nghiên cứu mấy thứ hay ho, tớ đã bén duyên với chuyên ngành mình đang theo đuổi. Ngoài ra, tớ thích tìm hiểu về những thứ mới mẻ, thử thách bản thân và không ngừng học hỏi nhiều thứ hơn nữa. Tớ luôn đặt ra phương châm rằng hãy làm và làm tốt hơn - làm kim chỉ nam cho công việc của mình. Tớ cũng có niềm yêu thích với guitar, đọc sách, xem phim và nhiếp ảnh, quay phim. Tuy rằng hơi bận rộn nhưng tớ vẫn luôn cố gắng dành thời gian cho những sở thích của riêng mình. Dù vẫn thường dành thời gian tập đàn 5 tiếng mỗi ngày, hay là ngồi code cả tối và dành siêu nhiều thời gian cho người yêu. Chắc hết rồi, viết đến đây thôi!",
      }
    return (
        <Template description={desc.about} height="100%">
            <Title color={themeUse.primary}>{desc.about.heading}</Title>
            <About desc={desc.about} content={content} themeUse={themeUse} theme={theme}/>
            <ElementSpace/>
            &nbsp;
        </Template>
    );
}

export default about;