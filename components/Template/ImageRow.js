import { Div } from "atomize";
import { Para, Spacer } from "../Template";
import Image from "next/image";
import { useState } from "react";

const ImageRow = ({ title, theme, themeUse, description, date, image, short }) => {
  const FormattedDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `Ngày ${day}/${month}/${year}`;
  };
  const [loaded, setLoaded] = useState(false);
  const handleImageLoad = () => {
    setLoaded(true);
  };
  return (
    <Div
      justify="center"
      align="center"
      d="flex"
      flexDir="column"
      hoverBg={theme === "light" ? "gray200" : "#222222"}
      rounded="12px"
      p={{ xs: "10px", md: "16px" }}
      transition
      m={{ xs: "0 -10px 0 -10px", md: "0 -16px 0 -16px" }}
    >
     <div className={"writePhoto" + (!loaded ? (" skeleton--"+theme) : "")}>
      <Image
            src={image}
            fill={true}
            alt="Picture of Khoa Nguyen"
            priority={true}
            quality={75}
            sizes="100%"
            onLoad={handleImageLoad}
            style={{
            objectFit: "cover",
            }}
            onDragStart={(e) => e.preventDefault()}
      />
    </div>
    <Spacer theme={theme} length="100%" />
      <Div
      justify="flex-start"
      align="center"
      d="flex"
      w="100%"
      >
        <Div
        d={{ xs: "block", md: "flex" }}
        justify="center"
        align="center"
        >
        <Para
          w={{ xs: "170px", md: "350px" }}
          margin="true"
          which="right"
          align="left"
          color={theme === "light" ? "#171717" : "#ededed"}
          p={{ xs: "10px", md: "16px" }}
          transition
          textSize="subheader"
        >
          <strong>{title}</strong>
        </Para>
        <Para
          w={{ xs: "170px", md: "350px" }}
          margin="true"
          which="right"
          align="left"
           textSize="subheader"
          color={theme === "light" ? "#171717" : "#ededed"}
          p={{ xs: "10px", md: "16px" }}
          transition
        >
          {description}
        </Para>
        </Div>
        <hr className={"hr" + theme} />
        <Para
          color={themeUse.secondary}
          p={{ xs: "10px", md: "16px" }}
          margin="true"
          align="left"
          which="left"
          transition
        >
         {FormattedDate(date)}
        </Para>
      </Div>
      <Div
      textAlign="left"
        align="left"
        w="100%"
        d="flex"
        m={{t: "5px",b:"5px"}}
      >
      <Para
         align="left"
          color={themeUse.secondary}
          transition
        >
         <i>{short}</i>
        </Para>
      </Div>
      <Spacer theme={theme} length="100%" />
    </Div>
  );
};

export default ImageRow;
