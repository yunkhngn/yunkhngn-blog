import { Div, Button } from "atomize";
import SocialIcon from "./SocialIcon";
import Link from "next/link";
import { barList } from "../../lib";


const SocialLink = ({ theme }) => {
  return (
    <footer>
      <Div justify="left" align="center" d="flex">
        <Div d="flex">
          <Link href="/business/resume" passHref scroll={true}>
            <Button
              h="2rem"
              p={{ x: "0.75rem" }}
              textSize="caption"
              textColor={theme === "light" ? "#858585" : "#a0a0a0"}
              hoverTextColor={theme === "light" ? "#171717" : "#ededed"}
              bg="transparent"
              border="1px solid"
              borderColor={theme === "light" ? "#858585" : "#a0a0a0"}
              hoverBorderColor={theme === "light" ? "#171717" : "#ededed"}
            >
              Resume
            </Button>
          </Link>
        </Div>
        <Div
          h="25px"
          border={{ r: "1.9px solid" }}
          rounded="xs"
          m={{ r: "1em", l: "1.5em" }}
          borderColor={
            theme === "light"
              ? "hsl(0 0% 0% / 0.071)"
              : "hsl(0 0% 100% / 0.077)"
          }
        />
        <Div justify="space-between" d="flex" w="170px">
          {barList.social.map((item) => (
            <SocialIcon
              key={item.id}
              icon={item.icon}
              link={item.link}
              theme={theme}
            />
          ))}
        </Div>
      </Div>
    </footer>
  );
};

export default SocialLink;
