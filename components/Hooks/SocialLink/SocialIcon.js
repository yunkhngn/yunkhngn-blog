import { Icon } from "atomize";
const SocialIcon = ({ icon, link, theme }) => {
  const open = () => {
    window.open(link, "_blank");
  };
  return <Icon 
  onClick={open} 
  name={icon} 
  color={theme === "light" ? "#858585" : "#a0a0a0"}
  />;
};

export default SocialIcon;
