import { Div, Button } from "atomize";
import SocialIcon from "./SocialIcon";
import Link from "next/link";
const social = [
  {
    id: 4,
    name: "Facebook",
    icon: "Facebook",
    link: "https://www.facebook.com/yun.khngn",
  },
  {
    id: 5,
    name: "Instagram",
    icon: "Instagram",
    link: "https://instagram.com/yun.khngn",
  },
  {
    id: 6,
    name: "Github",
    icon: "Github",
    link: "https://github.com/yunkhngn",
  },
  {
    id: 7,
    name: "Behance",
    icon: "Behance",
    link: "https://www.behance.net/yunkhngn_",
  },
];

const SocialLink = ({ theme }) => {
  console.log(theme);
  return (
    <footer>
      <Div justify="left" align="center" d="flex">
        <Div m={{ t: "1em" }}>
        <Link href='/resume' passHref scroll={true} >
          <Button
            h="2rem"
            p={{ x: "0.75rem" }}
            textSize="caption"
            textColor={theme === "light" ? "#6f6f6f" : "#a0a0a0"}
            hoverTextColor={theme === "light" ? "#000" : "#fff"}
            bg="transparent"
            border="1px solid"
            borderColor={theme === "light" ? "#6f6f6f" : "#a0a0a0"}
            hoverBorderColor={theme === "light" ? "#000" : "#fff"}
          >
              Resume
          </Button>
          </Link>
        </Div>
        <Div
          h="25px"
          border={{ r: "1.9px solid" }}
          rounded="xs"
          m={{ t: "1em", r: "1em", l: "1em" }}
          borderColor={
            theme === "light"
              ? "hsl(0 0% 0% / 0.071)"
              : "hsl(0 0% 100% / 0.077)"
          }
        />
        <Div justify="space-between" d="flex" w="170px" m={{ t: "1em" }}>
          {social.map((item) => (
            <SocialIcon key={item.id} icon={item.icon} link={item.link} />
          ))}
        </Div>
      </Div>
    </footer>
  );
};

export default SocialLink;
