import {Template, Title} from '../components/Template/'
import {desc} from '../lib'
import {ElementSpace, About} from '../components/Post'

const about = ({themeUse,theme}) => {
    const content = {
        Description: "Xin chào, tớ là Khoa Nguyễn (yun.khngn), sinh viên chuyên ngành Công nghệ thông tin tại Đại học FPT. Hiện tại tớ đang là freelancer thiết kế đồ hoạ và phát triển một số dự án cá nhân liên quan tới chuyên ngành của mình. Ngoài ra, tớ còn là guitarist của ban nhạc Giấy Trắng ở Hà Nội.",
        Content: "Tớ đến từ Nam Định, lớn lên và làm việc tại Hà Nội. Bén duyên với cái ngành này cũng là do từ bé đã có sở thích với mấy cái hay ho. Tớ thích tìm hiểu về những thứ mới mẻ, thử thách bản thân và không ngừng học hỏi (phương châm của tớ là làm nhưng hãy làm tốt hơn). Tớ cũng thích chơi guitar, đọc sách, xem phim và nhiếp ảnh, quay phim. Tuy rằng hơi bận rộn nhưng tớ vẫn cố gắng dành thời gian cho những sở thích của mình, tập đàn 5 tiếng mỗi ngày, hay là ngồi code cả tối, dành thời gian cho người yêu siêu nhiều. Thôi cũng chẳng biết viết gì hơn nữa, tạm kết ở đây nha!",
      }
    return (
        <Template description={desc.about} height="100%">
            <Title color={themeUse.primary}>Giới thiệu</Title>
            <About content={content} themeUse={themeUse} theme={theme}/>
            <ElementSpace/>
            &nbsp;
        </Template>
    );
}

export default about;