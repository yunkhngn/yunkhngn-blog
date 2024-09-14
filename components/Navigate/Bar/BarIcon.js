import { Icon, Tag } from "atomize";
import { useState } from "react";
import { useRouter } from "next/router";

const BarIcon = ({ icon, name, url, clickHandler, changeColor, theme }) => {
  const [bounce, setBounce] = useState(false);
  const [hover, setHover] = useState(false);

  const changeHandler = () => {
    setBounce(true);
    setHover(true);
    setTimeout(() => {
      setBounce(false);
      setHover(false);
    }, 700);
  };

  const location = useRouter();
  const path = location.pathname;
  const displayNav = path === url;

  const handleClick = () => {
    setTimeout(() => {
      changeHandler();
      if (clickHandler) {
        clickHandler();
      }
    }, 100);
  };

  return (
    <div className="Icon--container" alt={name} style={{ position: "relative" }}>
       <Tag
          pos="fixed"
          top={{ xs: "-30px", md: "-40px" }}
          w="auto"
          d={hover ? "block" : "none"}
          bg={changeColor ? "#fefefe" : "#161616"}
          border="0.5px solid"
          borderColor={changeColor ? "#dbdbdb" : "#3e3e3e"}
          textColor={changeColor ? "#858585" : "#7e7e7e"}
          transition="0.3s"
        >
          {name}
        </Tag>
      <div className={bounce ? "Icon--bounce icon2" : "icon2"}>
        <span
          id="icon"
          className={"Icon Icon" + theme}
          onClick={handleClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Icon
            name={bounce ? "Loading" : icon}
            color={changeColor ? "#858585" : "#7e7e7e"}
            size="22px"
          />
        </span>
      </div>
      <Icon
        d={displayNav ? null : "none"}
        name="Dot"
        m="auto"
        color={changeColor ? "#dbdbdb" : "#3e3e3e"}
        size="10px"
      />
    </div>
  );
};

export default BarIcon;