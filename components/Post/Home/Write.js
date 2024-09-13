import { Para } from '../../Template';
import { Div, Input } from 'atomize';
import Link from 'next/link';
import ElementSpace from '../ElementSpace';
import { Spacer } from "../../Hooks";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Đảm bảo có 2 chữ số cho ngày
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0, cộng thêm 1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const searchPost = (e) => {
  const posts = document.querySelectorAll('.post');
  posts.forEach((post) => {
    if (post.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  }
  );
};

const Write = ({desc, theme, themeUse, content }) => {
  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: '1.7em' }} />
      <hr className={'hr' + theme} />
      <Para textSize="subheader" color={themeUse.primary}>
        Tìm kiếm các bài viết của tớ
      </Para>
      <Para color={themeUse.secondary} m={{ b: "1em" }}>
        Viết linh tinh về cuộc sống, lập trình, nghệ thuật,...
      </Para>
      <Input
        placeholder="Tìm kiếm post..."
        m={{ t: "1em", b: "1.5em" }}
        w="100%"
        h="3.5em"
        textSize="subheader"
        textColor={themeUse.secondary}
        rounded="12px"
        focusBorderColor={theme === "light" ? "gray300" : "#171717"}
        onChange={searchPost}
        border="1px solid"
        bg={theme === "light" ? "#f9f9f9" : "rgba(20,20,20)"}
        borderColor={theme === "light" ? "gray300" : "#171717"}
        />
        <Spacer length="100%" theme={theme} />
      <Div>
        {content.length === 0 ? (
          <Para color={themeUse.secondary}>Chưa có post nào ở đây.</Para>
        ) : (
          content.map((item) => (
            <div className="post" key={item.id}>
              <Link href={`/writing/${item.attributes.Slug}`} passHref>
                <Div
                  justify="flex-start"
                  align="center"
                  d="flex"
                  hoverBg={theme === 'light' ? 'gray200' : '#222222'}
                  rounded="12px"
                  p="16px"
                  transition
                  m={{ r: '-16px', l: '-16px' }}
                >
                  <Para margin="true" which="right" color={theme === 'light' ? '#171717' : '#ededed'}>
                    <strong>{item.attributes.Title}</strong>
                  </Para>
                  <Para w={{ xs: '170px', md: '350px' }} margin="true" which="right" color={theme === 'light' ? '#171717' : '#ededed'}>
                    {item.attributes.Desc}
                  </Para>
                  <hr className={'hr' + theme} />
                  <Para margin="true" which="left" color={themeUse.secondary}>
                    {formatDate(item.attributes.createdAt)}
                  </Para>
                </Div>
              </Link>
            </div>
          ))
        )}
      </Div>
      <ElementSpace space="12em" />
    </article>
  );
};

export default Write;