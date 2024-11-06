import "../styles/globals.css";
import "../styles/Bar.css";
import "../styles/BarIcon.css";

import { styletron } from "../styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { StyleReset } from "atomize";
import { useState } from "react";
import { useRouter } from "next/router";
import { AnimatedTag, ThemeLoader } from "../components/Template";

import { barList } from "../components/lib";
import { KBarProvider } from "kbar";
import { AnimatePresence } from "framer-motion";
import { themeProvider } from "../components/lib";
import dynamic from "next/dynamic";
import { VercelToolbar } from '@vercel/toolbar/next';

const Bar = dynamic(() => import("../components/Navigate").then(mod => mod.Bar), { ssr: false });
const CmdBar = dynamic(() => import("../components/Navigate").then(mod => mod.CmdBar), { ssr: false });

function MyApp({ Component, pageProps }) {
  const shouldInjectToolbar = process.env.NODE_ENV === 'development'
  const [theme, setTheme] = useState("");
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
            <AnimatePresence mode="wait">
              <AnimatedTag key={router.pathname}>
                  <Component
                    themeUse={themeUse.styles}
                    theme={theme}
                    {...pageProps}
                  />
              </AnimatedTag>
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
        {shouldInjectToolbar && <VercelToolbar />}
      </StyletronProvider>
  );
}

export default MyApp;
