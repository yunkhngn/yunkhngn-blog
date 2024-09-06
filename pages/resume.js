import { Template, Title } from "../components/Template/";
import { Para } from "../components/Template/";
import { desc } from "../lib";
import ElementSpace from "../components/Post/ElementSpace";
import Link from "next/link";
import { Div } from "atomize";

const resume = ({ themeUse, theme }) => {
  return (
    <Template description={desc.resume} height="100%">
      <Title color={themeUse.primary}>Resume</Title>
      <Para color={themeUse.secondary}>
        Resume cá nhân của tớ cho các nhà tuyển dụng.
      </Para>
      <hr className={"hr" + theme} />
      <iframe
        src="https://drive.google.com/file/d/1bAccojOEH2PSSLP0w70FOxs8DxosggqY/preview"
        allow="autoplay"
        allowFullScreen="true"
        lazy="true"
        title="resume"
      ></iframe>
      <Link href="/" passHref scroll={true}>
        <Div
          m={{ t: "1em" }}
          textColor={themeUse.secondary}
          hoverTextColor={themeUse.hover}
          transition
        >
          Quay lại trang chủ...
        </Div>
      </Link>
      <ElementSpace space="12em" />
    </Template>
  );
};

export default resume;
