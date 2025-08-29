import { Para, Search, ProjectRow } from "../../Template";
import { Div } from "atomize";
import { useState, useEffect } from "react";

const Project = ({ desc, theme, themeUse, prj }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const dateFormer = (date) => {
    let dateArr = date.split("T")[0].split("-");
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
  };

  if (isLoading) {
    return (
      <article>
        <Para color={themeUse.secondary}>{desc.desc}</Para>
        <Div m={{ b: "1.7em" }} />
        <hr className={"hr" + theme} />
        <Div
          d="flex"
          flexDir="column"
          align="center"
          justify="center"
          minH="50vh"
          p="2rem"
        >
          <Div
            w="100%"
            maxW="800px"
            spaceY="1rem"
          >
            {[...Array(3)].map((_, i) => (
              <Div
                key={i}
                h="120px"
                bg={themeUse.secondary}
                rounded="lg"
                w="100%"
                m={{ b: "1rem" }}
                style={{
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
            ))}
          </Div>
        </Div>
      </article>
    );
  }

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
