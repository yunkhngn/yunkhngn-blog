import React from 'react';
import { Div, Icon } from "atomize";
import {Noti} from '../';

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
    ]
    const linkToCopy = url;
    const copyLink = () => {
      navigator.clipboard.writeText(linkToCopy);
      setState(true);
  };
  const [showNotification, setState] = React.useState(false);
  return (
    <Div 
    justify="space-between" 
    d="flex" 
    w="150px"
    m={{ t: "1em", b: "1.5em" }}
    >
       <Noti
        message="Đã copy link vào clipboard!"
        showNotification={showNotification}
        setState={setState}
        theme={theme}
      />
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
      <Icon name="Link" size="20px" 
          onClick={copyLink}
          color={theme === "light" ? "#858585" : "#a0a0a0"}
          hoverColor={theme === "light" ? "dark" : "info200"}
          transition
          cursor="pointer"
          />
    </Div>
  );
};

export default SocialShare;
