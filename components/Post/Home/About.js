import { SocialLink, Spacer } from "../../Hooks";
import { Para } from "../../Template";
import { Button } from "atomize";
import ReactMarkdown from "react-markdown";
import Image from "next/Image";
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
      
      <SocialLink theme={theme} />
      <Spacer theme={theme} length="75%" />
      <ReactMarkdown>{content.Description}</ReactMarkdown>
      <br />
      <ReactMarkdown>{content.Content}</ReactMarkdown>
      <Spacer theme={theme} length="80px" />
      <ReactMarkdown>Follow me for more...</ReactMarkdown>
    </article>
  );
};

export default About;
