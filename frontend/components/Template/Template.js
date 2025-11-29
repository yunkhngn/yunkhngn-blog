import { Div } from "atomize";
import Meta from "./Function/Meta";
import StructuredData from "./Function/StructuredData";
import PerformanceAnalytics from "./Function/PerformanceAnalytics";

const Template = ({ children, description, height }) => {
  return (
    <>
      {/* Existing Meta component */}
      <Meta description={description} />
      
      {/* Structured Data for better SEO */}
      <StructuredData
        type={description?.structuredDataType || 'website'}
        data={description}
      />
      
      {/* Performance Analytics */}
      <PerformanceAnalytics />
      
      {/* Main Content */}
      <Div
        maxW="720px"
        m="0 auto 12em"
        justify="center"
        align="center"
        p={{ t: { xs: "70px", md: "100px" }, l: "16px", r: "16px" }}
        h={height}
      >
        {children}
      </Div>
    </>
  );
};

export default Template;
