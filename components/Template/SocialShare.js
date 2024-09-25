import React from "react";
import { Div, Icon } from "atomize";
const SocialShare = ({ url, theme }) => {
    const socialShare = [
    {
      icon: "Facebook",
      link: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      icon: "Twitter",
      link: `https://twitter.com/intent/tweet?url=${url}`,
    },
    {
      icon: "Linkedin",
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${url}`,
    },
    {
      icon: "Mail",
      link: `mailto:?subject=I wanted you to see this site&body=Check out this site ${url}`,
    },
    ]
  return (
    <Div 
    justify="space-between" 
    d="flex" 
    w="170px"
    m={{ t: "1em", b: "1.5em" }}
    >
     {socialShare.map((item) => (
          <Icon name={item.icon} size="20px" 
          key={item.icon}
          onClick={() => window.open(item.link, "_blank")}
          color={theme === "light" ? "#858585" : "#a0a0a0"}
          hoverColor={theme === "light" ? "dark" : "info200"}
          transition
          cursor="pointer"
          />
      ))}
    </Div>
  );
};

export default SocialShare;
