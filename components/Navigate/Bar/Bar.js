import Icon from "./BarIcon";
import Link from "next/link";
import Spacer from "./Spacer";
import { barList } from "../../lib";

const Bar = ({ setTheme, theme, setThemeUse, themeProvider }) => {
  const changeTheme = () => {
     // Lấy phần tử có id "bar"
     const barElement = document.getElementById("bar");
     const iconElement = document.getElementById("icon");
     if (barElement && iconElement) {
       barElement.style.transition = "background 0.25s ease-out, color 0.25s ease-out, border 0.25s ease-out";
        iconElement.style.transition = "background-image 0.25s ease-out, color 0.25s ease-out, border 0.25s ease-out !important";
     }
     
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setThemeUse(newTheme === "light" ? themeProvider[0] : themeProvider[1]);
    localStorage.setItem("userTheme", newTheme);
  };
  const openURL = (url) => {
    setTimeout(() => {
      window.open(url, "_blank");
    }, 750);
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <nav id="bar" className={"Bar--container Bar--" + theme}>
      <div className="Bar">
        <div className="Bar--section">
          <Link href="/" passHref>
            <div className="Bar--section" aria-label="Home" role="navigation">
              <Icon
                icon="HomeSolid2"
                name="Home"
                url="/"
                alt="Home"
                changeColor={theme === "light" ? true : false}
                theme={theme}
              ></Icon>
            </div>
          </Link>
        </div>
        <Spacer theme={theme} />

        <div className="Bar--section">
          {barList.navigate.map((item) => (
            <Link href={item.url} passHref key={item.id} scroll={true}>
              <div
                className="Bar--section"
                role="navigation"
                aria-label={item.name}
                tabIndex={0}
              >
                <Icon
                  icon={item.icon}
                  name={item.name}
                  alt={item.name}
                  changeColor={theme === "light" ? true : false}
                  url={item.url}
                  theme={theme}
                />
              </div>
            </Link>
          ))}
        </div>
        <Spacer theme={theme} />
        <div className="Bar--section">
          {barList.social.map((item) => (
            <Icon
              icon={item.icon}
              name={item.name}
              key={item.id}
              clickHandler={() => openURL(item.link)}
              alt={item.name}
              changeColor={theme === "light" ? true : false}
              theme={theme}
            />
          ))}
          <Link href="/contact" passHref>
              <div
                className="Bar--section"
                role="navigation"
                aria-label="Contact"
                tabIndex={0}
              >
                <Icon
                  icon="Attachment"
                  name="Contact"
                  alt="Contact"
                  changeColor={theme === "light" ? true : false}
                  url="/contact"
                  theme={theme}
                />
              </div>
            </Link>
        </div>
        <Spacer theme={theme} />
        <div className="Bar--section">
          <Icon
            icon="SettingsSolid"
            name="Change Theme"
            alt="Change Theme"
            changeColor={theme === "light" ? true : false}
            clickHandler={changeTheme}
            theme={theme}
          />
        </div>
        <div className="Bar--section">
          <Icon
            icon="UpArrow"
            name="Scroll up"
            alt="Scroll up"
            changeColor={theme === "light" ? true : false}
            clickHandler={scrollToTop}
            theme={theme}
          />
        </div>
      </div>
    </nav>
  );
};

export default Bar;
