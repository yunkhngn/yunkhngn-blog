// Clean minimal version for debugging
import "../styles/globals.css";
import { styletron } from "../styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { StyleReset } from "atomize";
import { useState } from "react";
import { themeProvider } from "../components/lib";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("");
  const [themeUse, setThemeUse] = useState(themeProvider[0]);

  return (
    <StyletronProvider value={styletron}>
      <StyleReset />
      <Component 
        themeUse={themeUse?.styles || {}}
        theme={theme}
        {...pageProps} 
      />
    </StyletronProvider>
  );
}

export default MyApp;