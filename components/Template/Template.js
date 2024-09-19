import { Div } from "atomize";
import MetaTags from "./MetaTags";
import RouteChange from "./RouteChange";

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
      <RouteChange route={description.route} title={description.title}/>
      <MetaTags description={description} />
      {children}
    </Div>
  );
};

export default Template;
