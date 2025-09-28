// Fast restore version - essential components only
import "../styles/globals.css";
import "../styles/Bar.css";
import "../styles/BarIcon.css";

import { styletron } from "../styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { StyleReset } from "atomize";
import { useState } from "react";
import { ThemeLoader } from "../components/Template";
import { Bar } from "../components/Navigate"; // Direct import instead of dynamic
import { themeProvider } from "../components/lib";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("");
  const [themeUse, setThemeUse] = useState(themeProvider[0]);

  return (
    <StyletronProvider value={styletron}>
      <ThemeLoader
        theme={theme}
        setTheme={setTheme}
        setThemeUse={setThemeUse}
        themeProvider={themeProvider}
      />
      <div className={"selection--" + theme}>
        <StyleReset />
        <Component 
          themeUse={themeUse?.styles || {}}
          theme={theme}
          {...pageProps} 
        />
        <Bar
          theme={theme}
          setTheme={setTheme}
          setThemeUse={setThemeUse}
          themeProvider={themeProvider}
        />
        <div className="blur-overlay" />
      </div>
    </StyletronProvider>
  );
}

export default MyApp;