import { Para, ElementSpace, Spacer } from "../../Template";
import { Div, Input, Tag } from "atomize";

const Project = ({ desc, theme, themeUse, prj }) => {
  const dateFormer = (date) => {
    let dateArr = date.split("T")[0].split("-");
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
  };
  const searchRepo = (e) => {
    const repos = document.querySelectorAll(".repo");
    repos.forEach((repo) => {
      if (repo.innerText.toLowerCase().includes(e.target.value.toLowerCase())) {
        repo.style.display = "block";
      } else {
        repo.style.display = "none";
      }
    });
  };
  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: "1.7em" }} />
      <hr className={"hr" + theme} />
      <Para textSize="subheader" color={themeUse.primary}>
        Tìm kiếm repository Github
      </Para>
      <Para color={themeUse.secondary} m={{ b: "1em" }}>
        Các pet project/public repository sử dụng Node.js, React...
      </Para>
      <Input
        placeholder="Tìm kiếm project..."
        m={{ t: "1em", b: "1.5em" }}
        w="100%"
        h="3.5em"
        textSize="subheader"
        textColor={themeUse.secondary}
        rounded="12px"
        focusBorderColor={theme === "light" ? "gray300" : "#171717"}
        onChange={searchRepo}
        border="1px solid"
        bg={theme === "light" ? "#f9f9f9" : "rgba(20,20,20)"}
        borderColor={theme === "light" ? "gray300" : "#171717"}
      />
      <Spacer length="100%" theme={theme} />
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
                      bg={theme === "light" ? "gray200" : "gray400"}
                      textColor={theme === "light" ? "gray900" : "black700"}
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
      <ElementSpace space="12em" />
    </article>
  );
};

export default Project;
