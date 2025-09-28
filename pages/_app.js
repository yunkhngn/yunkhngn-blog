// Debugging step 2: Add router and basic state
import "../styles/globals.css";
import "../styles/Bar.css";
import "../styles/BarIcon.css";

import { styletron } from "../styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { StyleReset } from "atomize";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { themeProvider } from "../components/lib";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("");
  const [themeUse, setThemeUse] = useState(themeProvider[0]);
  const router = useRouter();

  return (
    <StyletronProvider value={styletron}>
      <StyleReset />
      <Component 
        themeUse={themeUse.styles}
        theme={theme}
        {...pageProps} 
      />
    </StyletronProvider>
  );
}

export default MyApp;