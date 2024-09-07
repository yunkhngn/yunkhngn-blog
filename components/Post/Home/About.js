import { SocialLink, Spacer } from "../../Hooks";
import { Para } from "../../Template";
import { Div, Image } from "atomize";
import ReactMarkdown from "react-markdown"; 

const About = ({ theme, themeUse, content }) => {
  console.log(themeUse)
  return (
    <article><Para color={themeUse.secondary}>
    Giới thiệu chút về bản thân mình nhé.
  </Para>
  <Div m={{ b: "1.7em" }} />
  <hr className={"hr" + theme} />
  <Div m={{ b: "1.7em" }} />
      <Image
        src="/image/self.svg"
        width={200}
        height={200}
        alt="Picture of the author"
        m={{ b: "1em" }}
      />
      <div className="titleGroup">
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
    </article>
  );
};

export default About;
