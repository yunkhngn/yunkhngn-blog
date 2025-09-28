// Debugging step 1: Add basic styling
import "../styles/globals.css";
import "../styles/Bar.css";
import "../styles/BarIcon.css";

import { styletron } from "../styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { StyleReset } from "atomize";

function MyApp({ Component, pageProps }) {
  return (
    <StyletronProvider value={styletron}>
      <StyleReset />
      <Component {...pageProps} />
    </StyletronProvider>
  );
}

export default MyApp;