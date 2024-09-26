import "../styles/globals.css";
import "../styles/Bar.css";
import "../styles/BarIcon.css";

import { styletron } from "../styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { StyleReset } from "atomize";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatedTags, ThemeLoader } from "../components/Template";

import { barList } from "../components/lib";
import { KBarProvider } from "kbar";
import { AnimatePresence } from "framer-motion";
import { themeProvider } from "../components/lib";
import dynamic from "next/dynamic";

const Bar = dynamic(() => import("../components/Navigate").then(mod => mod.Bar), { ssr: false });
const CmdBar = dynamic(() => import("../components/Navigate").then(mod => mod.CmdBar), { ssr: false });
const loadReactGA = () => import("react-ga4").then(mod => mod.default);

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("");
  const [themeUse, setThemeUse] = useState(themeProvider[0]);
  const router = useRouter();

  useEffect(() => {
    loadReactGA().then(ReactGA => {
      ReactGA.initialize(process.env.TRACKING_ID);
    });
  }, []);

  return (
      <StyletronProvider value={styletron}>
        <ThemeLoader
          theme={theme}
          setTheme={setTheme}
          setThemeUse={setThemeUse}
          themeProvider={themeProvider}
        />
        <KBarProvider
          options={{
            enableHistory: true,
          }}
          actions={barList.actions}
          setTheme={setTheme}
        >
          <div className={"selection--" + theme}>
            <CmdBar theme={theme} />
            <StyleReset />
            <AnimatePresence exitBeforeEnter>
              <AnimatedTags key={router.pathname}>
                  <Component
                    themeUse={themeUse.styles}
                    theme={theme}
                    {...pageProps}
                  />
              </AnimatedTags>
            </AnimatePresence>
            <Bar
              theme={theme}
              setTheme={setTheme}
              setThemeUse={setThemeUse}
              themeProvider={themeProvider}
            />
            <div className="blur-overlay" />
          </div>
        </KBarProvider>
      </StyletronProvider>
  );
}

export default MyApp;
