import { Div } from "atomize";
import Meta from "./Function/Meta";

const Template = ({ children, description, height }) => {
  return (
    <Div
      maxW="720px"
      m="0 auto 12em"
      justify="center"
      align="center"
      p={{ t: { xs: "70px", md: "100px" }, l: "16px", r: "16px" }}
      h={height}
    >
      <Meta description={description} />
      {children}
    </Div>
  );
};

export default Template;
