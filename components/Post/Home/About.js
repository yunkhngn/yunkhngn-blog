import { SocialLink, Spacer } from "../../Hooks";
import { Para } from "../../Template";
import { Div, Image } from "atomize";
import ReactMarkdown from "react-markdown"; 
const About = ({ theme, themeUse, content }) => {
  return (
    <article>
      <Para color={themeUse.secondary}>
        Graphic Designer / Software Engineer
      </Para>
      <Spacer theme={theme} length="200px" />
      <Image
        src="/image/self.svg"
        width={200}
        height={200}
        alt="Picture of the author"
      />
      <Div
      justify="center"
      align="center"
      d="flex"
      >
      <SocialLink theme={theme} />
      </Div>
      <Spacer theme={theme} length="100%" />
      <ReactMarkdown>{content.Description}</ReactMarkdown>
      <br />
      <ReactMarkdown>{content.Content}</ReactMarkdown>
      <Spacer theme={theme} length="80px" />
      <a target="_blank" rel="noreferrer" href="https://facebook.com/yun.khngn"><Div m={{t:"1em"}} textColor={themeUse.secondary} hoverTextColor={themeUse.hover} transition>Follow me for more...</Div></a>
    </article>
  );
};

export default About;
