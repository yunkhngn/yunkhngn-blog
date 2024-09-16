import { Para, Spacer, Search } from "../../Template";
import { Div, Tag } from "atomize";

const Project = ({ desc, theme, themeUse, prj }) => {
  const dateFormer = (date) => {
    let dateArr = date.split("T")[0].split("-");
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
  };
  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: "1.7em" }} />
      <hr className={"hr" + theme} />
      <Search
        title="Tìm kiếm repository Github"
        subtitle="Các pet project/public repository sử dụng Node.js, React..."
        placeholder="Tìm kiếm repository..."
        theme={theme}
        themeUse={themeUse}
        postName="repo"
      />
      <Div>
        {prj.length === 0 ? (
          <Para color={themeUse.secondary}>Chưa có project nào ở đây.</Para>
        ) : (
          prj.map((item) => (
            <div className="repo" key={item.id}>
              <a target="_blank" rel="noreferrer" href={item.html_url}>
                <Div
                  hoverBg={theme === "light" ? "gray200" : "#222222"}
                  rounded="12px"
                  p={{t: "24px", b: "24px", l: "16px", r: "16px"}}
                  transition
                  m={{ r: "-16px", l: "-16px" }}
                  d="flex"
                  justify="space-between"
                >
                  <Div w="80%">
                    <Para textSize="title" color={themeUse.primary}>
                      <strong>{item.name}</strong>
                    </Para>
                    <Para
                      textSize="paragraph"
                      color={themeUse.secondary}
                      which="bottom"
                      margin="true"
                    >
                      {item.description ? item.description : "Không có mô tả"}
                    </Para>
                    <Div>
                      <Tag 
                        m={{ r: "0.5em", b: "0.5em" }}
                        bg="transparent"
                        border="1px solid"
                        borderColor={theme === "light" ? "success500" : "success700"}
                        textColor={theme === "light" ? "success600" : "success700"}
                        >
                        {item.language || "None"}
                      </Tag>
                      <Tag
                        d={item.forks_count === 0 ? "none" : "inline-block"}
                        m={{ r: "0.5em", b: "0.5em" }}
                        bg="transparent"
                        border="1px solid"
                        borderColor={theme === "light" ? "brand500" : "brand700"}
                        textColor={theme === "light" ? "brand600" : "brand700"}
                      >
                        {item.forks_count} Fork
                      </Tag>
                      <Tag
                        d={item.license ? "inline-block" : "none"}
                        m={{ r: "0.5em", b: "0.5em" }}
                        bg="transparent"
                        border="1px solid"
                        borderColor={theme === "light" ? "warning500" : "warning700"}
                        textColor={theme === "light" ? "warning600" : "warning600"}
                      >
                        {item.license ? item.license.name : ""}
                      </Tag>
                      <Tag m={{ r: "0.5em", b: "0.5em" }}
                      bg={theme === "light" ? "gray300" : "white"}
                      textColor={theme === "light" ? "gray900" : "dark"}
                      >
                        Cập nhật lúc {dateFormer(item.updated_at)}
                      </Tag>
                    </Div>
                  </Div>
                  <Div d="flex" align="center" justify="space-between">
                    <Para color={themeUse.primary} textSize="paragraph">
                      <strong>Star:</strong> {item.stargazers_count}
                    </Para>
                  </Div>
                </Div>
              </a>
              <Spacer length="100%" theme={theme} />
            </div>
          ))
        )}
      </Div>

      <a target="_blank" rel="noreferrer" href="https://github.com/yunkhngn">
        <Div
          m={{ t: "1em" }}
          textColor={themeUse.secondary}
          hoverTextColor={themeUse.hover}
          transition
        >
          Xem Github của tớ...
        </Div>
      </a>
    </article>
  );
};

export default Project;
