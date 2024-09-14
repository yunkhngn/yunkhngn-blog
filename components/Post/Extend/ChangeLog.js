import { Para, ElementSpace } from "../../Template";
import { Div } from "atomize";
import Link from "next/link";

const ChangeLog = ({ theme, themeUse, desc, log }) => {
  const FormattedDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const hour = d.getHours();
    const minute = d.getMinutes();
    const second = d.getSeconds();
    return `${hour}:${minute}:${second} ${day}/${month}/${year}`;
  }
  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: "1.7em" }} />
      <hr className={"hr" + theme} />
      <Div>
        {log.length === 0 ? (
          <Para color={themeUse.secondary}>Chưa có change log nào ở đây.</Para>
        ) : (
          log.map((item) => (
            <div className="post" key={item.id}>
                <Div
                  justify="flex-start"
                  align="center"
                  d="flex"
                  hoverBg={theme === "light" ? "gray200" : "#222222"}
                  rounded="12px"
                  p="16px"
                  transition
                  m={{ r: "-16px", l: "-16px" }}
                >
                  <Para
                    margin="true"
                    which="right"
                    color={theme === "light" ? "#171717" : "#ededed"}
                  >
                    <strong>{item.author}</strong>
                  </Para>
                  <Para
                    w={{ xs: "170px", md: "350px" }}
                    margin="true"
                    which="right"
                    color={theme === "light" ? "#171717" : "#ededed"}
                  >
                    {item.message}
                  </Para>
                  <hr className={"hr" + theme} />
                  <Para margin="true" which="left" color={themeUse.secondary}>
                    {FormattedDate(item.date)}
                  </Para>
                </Div>
            </div>
          ))
        )}
      </Div>
      <Link href="/" passHref scroll={true}>
        <Div
                m={{ t: "0.5em" }}
                textColor={themeUse.secondary}
                hoverTextColor={themeUse.hover}
                transition
                >
                Quay lại...
        </Div>
      </Link>
      <ElementSpace space="12em" />
    </article>
  );
};

export default ChangeLog;
