import "../styles/globals.css";
import "../styles/Bar.css";
import "../styles/BarIcon.css";

import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

import { styletron } from "../styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { StyleReset } from "atomize";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/router";
import { AnimatedTag, ThemeLoader } from "../components/Template";
import LoadingCanva from "../components/Template/Function/LoadingCanva";

import { barList } from "../components/lib";
import { KBarProvider } from "kbar";
import { AnimatePresence } from "framer-motion";
import { themeProvider } from "../components/lib";
import dynamic from "next/dynamic";
import { VercelToolbar } from '@vercel/toolbar/next';
import Head from 'next/head';

// Lazy load heavy components
const Bar = dynamic(() => import("../components/Navigate").then(mod => mod.Bar), { 
  ssr: false,
  loading: () => <div style={{ height: '60px' }} />
});
const CmdBar = dynamic(() => import("../components/Navigate").then(mod => mod.CmdBar), { 
  ssr: false,
  loading: () => <div style={{ height: '40px' }} />
});

function MyApp({ Component, pageProps }) {
  const shouldInjectToolbar = process.env.NODE_ENV === 'development'
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

  // Prefetch critical pages
  useEffect(() => {
    // Prefetch main pages
    router.prefetch('/writing');
    router.prefetch('/project');
    router.prefetch('/photo');
    router.prefetch('/about');
    router.prefetch('/contact');
  }, [router]);

  // Register service worker with better update handling
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);

          // Handle service worker updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker is available
                console.log('New service worker available');
                // Optionally show update notification to user
                if (confirm('New version available! Reload to update?')) {
                  window.location.reload();
                }
              }
            });
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });

      // Handle service worker controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service worker controller changed');
        // Reload page to use new service worker
        window.location.reload();
      });
    }
  }, []);

  // Load clear cache script
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = '/clear-cache.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
      <StyletronProvider value={styletron}>
        <Head>
          {/* Preload critical resources */}
          <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="//api.github.com" />
          <link rel="dns-prefetch" href="//images.ctfassets.net" />
          <link rel="dns-prefetch" href="//raw.githubusercontent.com" />
          
          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://api.github.com" />
          <link rel="preconnect" href="https://images.ctfassets.net" />
          <link rel="preconnect" href="https://raw.githubusercontent.com" />
          
          {/* Cache control headers */}
          <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="0" />
        </Head>
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
            <Suspense fallback={<LoadingCanva theme={theme} themeUse={themeUse} />}>
              <AnimatePresence mode="wait">
                <AnimatedTag key={router.pathname}>
                    <Component
                      themeUse={themeUse.styles}
                      theme={theme}
                      {...pageProps}
                    />
                </AnimatedTag>
              </AnimatePresence>
            </Suspense>
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
