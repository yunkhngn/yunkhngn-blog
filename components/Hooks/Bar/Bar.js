import Icon from "./BarIcon";
import Link from "next/link";
import Spacer from "./Spacer";
import { barList } from "../../../lib";

const Bar = ({ setTheme, theme, setThemeUse, themeProvider }) => {
  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setThemeUse(theme === "light" ? themeProvider[1] : themeProvider[0]);
    localStorage.setItem("userTheme", theme === "light" ? "dark" : "light");

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
    <nav className={"Bar--container Bar--" + theme}>
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
