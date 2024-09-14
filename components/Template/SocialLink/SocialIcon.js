import { Icon } from "atomize";
const SocialIcon = ({ icon, link, theme }) => {
  const open = () => {
    window.open(link, "_blank");
  };
  return <Icon 
  onClick={open} 
  name={icon} 
  color={theme === "light" ? "#858585" : "#a0a0a0"}
  hoverColor={theme === "light" ? "dark" : "info200"}
  transition
  cursor="pointer"
  alt={icon}
  
  />;
};

export default SocialIcon;
