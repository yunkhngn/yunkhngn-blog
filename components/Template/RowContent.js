import { Div } from "atomize";
import { Para } from "../Template";

const RowContent = ({ title, theme, themeUse, description, date }) => {
  const FormattedDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    const minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    const second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    return `${hour}:${minute}:${second} ${day}/${month}/${year}`;
  };
  return (
    <Div
      justify="flex-start"
      align="center"
      d="flex"
      hoverBg={theme === "light" ? "gray200" : "#222222"}
      rounded="12px"
      p={{ xs: "10px", md: "16px" }}
      transition
      m={{ xs: "0 -10px 0 -10px", md: "0 -16px 0 -16px" }}
    >
      <Para
        margin="true"
        which="right"
        color={theme === "light" ? "#171717" : "#ededed"}
        p={{ xs: "10px", md: "16px" }}
        transition
        m={{ xs: "0 -10px 0 -10px", md: "0 -16px 0 -16px" }}
      >
        <strong>{title}</strong>
      </Para>
      <Para
        w={{ xs: "170px", md: "350px" }}
        margin="true"
        which="right"
        color={theme === "light" ? "#171717" : "#ededed"}
        p={{ xs: "10px", md: "16px" }}
        transition
        m={{ xs: "0 -10px 0 -10px", md: "0 -16px 0 -16px" }}
      >
        {description}
      </Para>
      <hr className={"hr" + theme} />
      <Para
        margin="true"
        which="left"
        color={themeUse.secondary}
        p={{ xs: "10px", md: "16px" }}
        transition
        m={{ xs: "0 -10px 0 -10px", md: "0 -16px 0 -16px" }}
      >
        {FormattedDate(date)}
      </Para>
    </Div>
  );
};

export default RowContent;
