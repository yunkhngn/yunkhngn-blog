import "../styles/globals.css";
import "../styles/Bar.css";
import "../styles/BarIcon.css";

import { Bar, CmdBar } from "../components/Navigate";
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
import { Div } from "atomize";
import { themeProvider } from "../components/lib";

injectSpeedInsights();

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  const [themeUse, setThemeUse] = useState(themeProvider[0]);
  const router = useRouter();
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
                <Div textColor={themeUse.styles.secondary}>
                  <Component
                    themeUse={themeUse.styles}
                    theme={theme}
                    {...pageProps}
                  />
                </Div>
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
