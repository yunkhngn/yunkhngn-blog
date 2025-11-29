import { Div } from "atomize";
import { Para, Spacer } from "./";
import Image from "next/image";
import { useState } from "react";

// For writing page
const ImageRow = ({ title, theme, themeUse, description, date, image, short }) => {
  const FormattedDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
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
      rounded={{ xs: "16px", md: "30px" }}
      p={{ xs: "10px", md: "25px" }}
      transition
      m={{ xs: "0 -10px 0 -10px", md: "0 -25px 0 -25px" }}
    >
     <div className={"writePhoto" + (!loaded ? (" skeleton--"+theme) : "")}>
      <Image
            src={image}
            fill={true}
            alt="Picture"
            loading="lazy" 
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
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
          w={{ xs: "300px", md: "350px" }}
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
        <Div
        d={{ xs: "block", md: "flex" }}
        >
          <Para
              color={themeUse.secondary}
              margin="true"
              align="left"
              which="left"
              transition
            >
            <strong>Ngày đăng:</strong>
            </Para>
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
      </Div>
      <Div
        textAlign="left"
        align="left"
        w="100%"
        m={{t: "5px",b:"5px"}}
      >
      <Para
         align="left"
          color={themeUse.secondary}
          transition
        >
         {short}
        </Para>
        <Div
        d="flex"
        w="100%"
        justify="space-between"
        >
          <Para
            align="left"
            color={themeUse.secondary}
            transition
            margin="true"
            which="right"
            
          >
          <strong>Author:</strong> @yun.khngn
          </Para>
          <hr className={"hr" + theme} />
        </Div>
      </Div>
    </Div>
  );
};

export default ImageRow;
