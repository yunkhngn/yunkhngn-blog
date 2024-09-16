import { Para, ElementSpace, Search } from "../../Template";
import { Div } from "atomize";
import Link from "next/link";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Đảm bảo có 2 chữ số cho ngày
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0, cộng thêm 1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Write = ({ desc, theme, themeUse, content }) => {
  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: "1.7em" }} />
      <hr className={"hr" + theme} />
      <Search
        title="Tìm kiếm các bài viết của tớ"
        subtitle="Viết linh tinh về cuộc sống, lập trình, nghệ thuật,..."
        placeholder="Tìm kiếm post..."
        theme={theme}
        themeUse={themeUse}
        postName="post"
      />
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
                  hoverBg={theme === "light" ? "gray200" : "#222222"}
                  rounded="12px"
                  p={{xs : "10px", md: "16px"}}
                  transition
                  m={{xs : "0 -10px 0 -10px", md: "0 -16px 0 -16px"}}
                >
                  <Para
                    margin="true"
                    which="right"
                    color={theme === "light" ? "#171717" : "#ededed"}
                    p={{xs : "10px", md: "16px"}}
                  transition
                  m={{xs : "0 -10px 0 -10px", md: "0 -16px 0 -16px"}}
                  >
                    <strong>{item.attributes.Title}</strong>
                  </Para>
                  <Para
                    w={{ xs: "170px", md: "350px" }}
                    margin="true"
                    which="right"
                    color={theme === "light" ? "#171717" : "#ededed"}
                    p={{xs : "10px", md: "16px"}}
                  transition
                  m={{xs : "0 -10px 0 -10px", md: "0 -16px 0 -16px"}}
                  >
                    {item.attributes.Desc}
                  </Para>
                  <hr className={"hr" + theme} />
                  <Para 
                  margin="true" 
                  which="left" 
                  color={themeUse.secondary} 
                  p={{xs : "10px", md: "16px"}}
                  transition
                  m={{xs : "0 -10px 0 -10px", md: "0 -16px 0 -16px"}}
                  >
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
