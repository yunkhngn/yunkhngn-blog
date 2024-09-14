import { Template, Title, Para } from "../../components/Template";
import { Cv } from "../../components/Post/";
import { desc } from "../../components/lib";

const resume = ({ themeUse, theme }) => {
  return (
    <Template description={desc.resume} height="100%">
      <Title color={themeUse.primary}>{desc.resume.heading}</Title>
      <Para color={themeUse.secondary}>{desc.resume.desc}</Para>
      <hr className={"hr" + theme} />
      <Cv themeUse={themeUse} />
    </Template>
  );
};

export default resume;
