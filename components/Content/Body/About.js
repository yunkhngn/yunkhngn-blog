import { Para, ElementSpace, SocialLink, Spacer, Footer } from "../../Template";
import { Div } from "atomize";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

const About = ({ desc, theme, themeUse, content }) => {
  return (
    <article>
      <Para color={themeUse.secondary}>{desc.desc}</Para>
      <Div m={{ b: "1.7em" }} />
      <hr className={"hr" + theme} />
      <Div m={{ b: "1.7em" }} />
      <div className="titleGroup">
        <Image
          src="/me.jpeg"
          width="230"
          height="230"
          alt="Picture of Khoa Nguyen"
          priority={true}
          quality={75}
          style={{
            borderRadius: "50%",
            marginBottom: "1em",
            
          }}
          onDragStart={(e) => e.preventDefault()}
        />
        <p className="titleName">Khoa Nguyễn</p>
        <Para color={themeUse.secondary}>
          Graphic Designer / Software Engineer
        </Para>
      </div>
      <Div justify="center" align="center" d="flex" m="auto">
        <SocialLink theme={theme} />
      </Div>
      <Spacer theme={theme} length="100%" />
      <Div
      justify="center"
      align="center"
      >
      <ReactMarkdown>{content.Description}</ReactMarkdown>
      <br />
      <blockquote className="about--quote" >"{content.Quote}"</blockquote>
      <br />
      <ReactMarkdown>{content.Content}</ReactMarkdown>
      <br />
      <Footer content="Vài dòng thư tay viết vội." />
      </Div>
      <Spacer theme={theme} length="80px" />
      <a target="_blank" rel="noreferrer" href="https://facebook.com/yun.khngn">
        <Div
          m={{ t: "1em" }}
          textColor={themeUse.secondary}
          hoverTextColor={themeUse.hover}
          transition
        >
          Theo dõi tớ để biết thêm nhiều điều hay...
        </Div>
      </a>
    </article>
  );
};

export default About;
