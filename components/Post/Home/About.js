import { SocialLink, Spacer } from "../../Hooks";
import { Para } from "../../Template";
import { Div, Image } from "atomize";
import ReactMarkdown from "react-markdown"; 
import { ElementSpace } from "../";

const About = ({desc, theme, themeUse, content }) => {
  return (
    <article><Para color={themeUse.secondary}>
    {desc.desc}
  </Para>
  <Div m={{ b: "1.7em" }} />
  <hr className={"hr" + theme} />
  <Div m={{ b: "1.7em" }}/>
      <div className="titleGroup">
      <Image
        src="image/me.jpeg"
        w="230px"
        h="230px"
        alt="Picture of the author"
        rounded="circle"
        align="center"
        justify="center"
        m={{ b: "1em" }}
      />
      <p className="titleName">Khoa Nguyễn</p>
      <Para color={themeUse.secondary}>
        Graphic Designer / Software Engineer
      </Para>
      </div>
      <Div
      justify="center"
      align="center"
      d="flex"
      m="auto"
      >
      <SocialLink theme={theme} />
      </Div>
      <Spacer theme={theme} length="100%" />
      <ReactMarkdown>{content.Description}</ReactMarkdown>
      <br />
      <ReactMarkdown>{content.Content}</ReactMarkdown>
      <br />
      <p><i>Viết bởi tớ</i></p>
      <p><strong>Khoa Nguyễn</strong></p>
      <Spacer theme={theme} length="80px" />
      <a target="_blank" rel="noreferrer" href="https://facebook.com/yun.khngn"><Div m={{t:"1em"}} textColor={themeUse.secondary} hoverTextColor={themeUse.hover} transition>Theo dõi tớ để biết thêm nhiều điều hay...</Div></a>
      <ElementSpace space="12em" />
    </article>
  );
};

export default About;
