import { Para, Search } from "../../Template";
import { Div } from "atomize";
import Image from "next/image";
import { useState } from "react";

const Pics = ({ desc, theme, themeUse, data }) => {
  const dateFormer = (date) => {
    let dateArr = date.split("T")[0].split("-");
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
  };
  const [loaded, setLoaded] = useState({});

  const handleImageLoad = (id) => {
    setLoaded((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: "1.7em" }} />
      <hr className={"hr" + theme} />
      <Search
        title="Tìm kiếm các design của tớ"
        subtitle="Các design mà tớ đã làm trên Behance."
        placeholder="Tìm kiếm design..."
        theme={theme}
        themeUse={themeUse}
        postName="behance"
      />
      <div className="gallery">
        {data.length === 0 ? (
          <Para color={themeUse.secondary}>Chưa có post nào ở đây.</Para>
        ) : (
          data.map((item) => (
            <div className="behance" key={item.id}>
              <a target="_blank" rel="noreferrer" href={item.attributes.url}>
                <Div
                  justify="center"
                  aligt="center"
                  hoverBg={theme === "light" ? "gray200" : "#222222"}
                  rounded={{ xs: "26px", md: "30px" }}
                  w="100%"
                  p={{ xs: "26px", md: "30px" }}
                  transition
                  textAlign="center"
                >
                  <div className={"behancePhoto" + (!loaded[item.id] ? " skeleton--" + theme : "")}>
                  <Image
                    fill={true}
                    src={"https:" + item.attributes.Image}
                    alt={item.attributes.Title}
                    quality={50}
                    loading="lazy" 
                    sizes="(max-width: 768px) calc(100vw / 3), (max-width: 1200px) calc(100vw / 3), 33vw"
                    onLoad={() => handleImageLoad(item.id)} 
                    style={{
                      objectFit: "cover",
                    }}
                    onDragStart={(e) => e.preventDefault()}
                  />
                  </div>
                  <Para
                    color={theme === "light" ? "#171717" : "#ededed"}
                    textSize="heading"
                    margin="true"
                    which="top"
                    align="center"
                  >
                    <strong>{item.attributes.Title}</strong>
                  </Para>
                  <Para
                    color={theme === "light" ? "#171717" : "#ededed"}
                    textSize="subheader"
                    align="center"
                  >
                    {item.attributes.desc}
                  </Para>
                  <Para
                    color={themeUse.secondary}
                    align="center"
                  >
                    Date published: {dateFormer(item.attributes.createdAt)}
                  </Para>
                </Div>
              </a>
            </div>
          ))
        )}
      </div>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.behance.net/yunkhngn_"
      >
        <Div
          textColor={themeUse.secondary}
          hoverTextColor={themeUse.hover}
          transition
          textAlign="center"
          m={{ t: "1em" }}
        >
          Xem các project Behance của tớ...
        </Div>
      </a>
    </article>
  );
};

export default Pics;
