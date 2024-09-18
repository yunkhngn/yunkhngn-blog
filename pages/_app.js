import "../styles/globals.css";
import "../styles/Bar.css";
import "../styles/BarIcon.css";

import { styletron } from "../styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { StyleReset } from "atomize";
import { useState } from "react";
import { useRouter } from "next/router";
import { AnimatedTags, ThemeLoader } from "../components/Template";
import { injectSpeedInsights } from "@vercel/speed-insights";

import { barList } from "../components/lib";
import { KBarProvider } from "kbar";
import { AnimatePresence } from "framer-motion";
import { themeProvider } from "../components/lib";
import ReactGA from "react-ga4";
import dynamic from "next/dynamic";

const Bar = dynamic(() => import("../components/Navigate").then(mod => mod.Bar));
const CmdBar = dynamic(() => import("../components/Navigate").then(mod => mod.CmdBar));

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("");
  const [themeUse, setThemeUse] = useState(themeProvider[0]);
  const router = useRouter();

  useEffect(() => {
    ReactGA.initialize(process.env.TRACKING_ID);
    injectSpeedInsights();
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
