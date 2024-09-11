import { Para } from "../../Template";
import { Div } from "atomize";
import ElementSpace from "../ElementSpace";
import Image from "next/image";

const Pics = ({ desc, theme, themeUse, data }) => {
  const dateFormer = (date) => {
    let dateArr = date.split("T")[0].split("-");
    return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
  };
  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: "1.7em" }} />
      <hr className={"hr" + theme} />
      <div className="gallery">
        {data.length === 0 ? (
          <Para color={themeUse.secondary}>Chưa có post nào ở đây.</Para>
        ) : (
          data.map((item) => (
            <div key={item.id}>
              <a target="_blank" rel="noreferrer" href={item.attributes.url}>
                <Div
                  justify="center"
                  aligt="center"
                  hoverBg={theme === "light" ? "gray200" : "#222222"}
                  rounded={{ xs: "26px", sm: "24px" }}
                  w="100%"
                  p={{ t: "1em", b: "1.5em", l: "1em", r: "1em" }}
                  transition
                  textAlign="center"
                >
                  <div className="behancePhoto">
                  <Image
                    fill={true}
                    src={"https:" + item.attributes.Image}
                    alt={item.attributes.Title}
                    sizes="100%"
                    quality={70}
                    priority={true}
                    style={{
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                  </div>
                  <Para
                    color={theme === "light" ? "#171717" : "#ededed"}
                    textSize="heading"
                    margin="true"
                    which="top"
                  >
                    <strong>{item.attributes.Title}</strong>
                  </Para>
                  <Para
                    color={theme === "light" ? "#171717" : "#ededed"}
                    textSize="subheader"
                  >
                    {item.attributes.desc}
                  </Para>
                  <Para
                    color={themeUse.secondary}
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
      <ElementSpace space="12em" />
    </article>
  );
};

export default Pics;
