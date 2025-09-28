// Debugging step 3: Add NProgress (potential culprit)
import "../styles/globals.css";
import "../styles/Bar.css";
import "../styles/BarIcon.css";

import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

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

  useEffect(() => {
    NProgress.configure({ showSpinner: false, trickleSpeed: 120 });
    let timer;
    const start = () => {
      clearTimeout(timer);
      timer = setTimeout(() => NProgress.start(), 120);
    };
    const done = () => {
      clearTimeout(timer);
      NProgress.done();
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', done);
    router.events.on('routeChangeError', done);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', done);
      router.events.off('routeChangeError', done);
    };
  }, [router.events]);

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