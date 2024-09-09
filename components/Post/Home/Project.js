import { Para } from "../../Template";
import { Div, Input } from "atomize"; // Import Button từ Atomize
import ElementSpace from "../ElementSpace";
import { Spacer } from "../../Hooks";

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
  }
  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: "1.7em" }} />
      <hr className={"hr" + theme} />
      <Para textSize="subheader" color={themeUse.primary}>
        Repository search
      </Para>
      <Para color={themeUse.secondary} m={{ b:"1em" }}>
        Các pet project/public repository sử dụng Node.js, React...
      </Para>
      <Input
        placeholder="Tìm kiếm project..."
        m={{ t: "1em", b:"1.5em" }}
        w="100%"
        h="3.5em"
        textSize="subheader"
        textColor={themeUse.secondary}
        rounded="12px"
        focusBorderColor={theme === "light" ? "gray300" : "dark"}
        transition
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
                  p="16px"
                  transition
                  m={{ r: "-16px", l: "-16px" }}
                >
                  <Div justify="flex-start" align="center" d="flex">
                    <Para
                      margin="true"
                      which="right"
                      color={theme === "light" ? "#171717" : "#ededed"}
                      textSize="subheader"
                    >
                      <strong>{item.name}</strong>
                    </Para>
                    <hr className={"hr" + theme} />
                    <Para margin="true" which="left" color={themeUse.secondary}>
                      <strong>Stars:</strong> {item.stargazers_count}
                    </Para>
                  </Div>
                  <Div
                    justify="flex-start"
                    align="center"
                    d="flex"
                    m={{ t: "0.5em" }}
                  >
                    <Para
                      margin="true"
                      which="right"
                      color={theme === "light" ? "#171717" : "#ededed"}
                      w={{ xs: "50%", md: "100%" }}
                    >
                      {item.description || "No description"}
                    </Para>
                    <hr className={"hr" + theme} />
                    <Para margin="true" which="left" color={themeUse.secondary}>
                      {dateFormer(item.created_at)}
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
