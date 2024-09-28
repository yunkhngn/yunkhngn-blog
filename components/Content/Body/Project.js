import { Para, Search, ProjectRow } from "../../Template";
import { Div } from "atomize";

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
           <ProjectRow
            key={item.id}
            item={item}
            theme={theme}
            themeUse={themeUse}
          />
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
