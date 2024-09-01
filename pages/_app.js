import '../styles/globals.css'
import '../styles/Bar.css'
import '../styles/BarIcon.css'

import { themeProvider } from '../lib'
import { Bar, CmdBar} from '../components/Hooks'
import {styletron} from '../styletron'
import { Provider as StyletronProvider } from 'styletron-react'
import {StyleReset} from 'atomize'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import { AnimatedTags, Metatags } from '../components/Template'

import {KBarProvider} from 'kbar'
import {AnimatePresence} from 'framer-motion'
import {Div} from 'atomize'
import { Analytics } from "@vercel/analytics/react"

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light')
  const router = useRouter()  
  useEffect(() => {
    // Thay đổi lớp của phần tử HTML dựa trên theme
    document.documentElement.className = theme === 'light' ? 'light-theme' : 'dark-theme';
  }, [theme])
  // cmd bar actions
  const actions = [
    {
      id: "homeAction",
      name: "Home",
      shortcut: ["h"],
      keywords: "back",
      section: "Navigation",
      perform: () => router.push('/'),
      subtitle: "Navigating to the home page.",
    },
    {
      id: "aboutMeAction",
      name: "About me",
      shortcut: ["a"],
      keywords: "about me description",
      section: "Navigation",
      perform: () => router.push('/about'),
      subtitle: "A little bit about me.",
    },
    {
      id: "projectsAction",
      name: "Project",
      shortcut: ["p"],
      keywords: "project projects work featured",
      section: "Navigation",
      perform: () => router.push('/project'),
      subtitle: "Some of projects I have worked on.",
    },
    {
      id: "libraryAction",
      name: "Library",
      shortcut: ["l"],
      keywords: "library design work behance",
      section: "Navigation",
      perform: () => router.push('/library'),
      subtitle: "My works on designing.",
    },
    {
      id: "writingsAction",
      name: "Writing",
      shortcut: ["w"],
      keywords: "writing writings blog",
      section: "Navigation",
      perform: () => router.push('/writing'),
      subtitle: "Wrote something crazy here.",
    },
    {
      id: "scrollToTopAction",
      name: "Scroll to top",
      shortcut: ["s","t"],
      keywords: "scroll top",
      section: "Preferences",
      perform: () => window.scrollTo(0, 0),
      subtitle: "Scroll to the top.",
    },
    {
      id: "scrollToBotAction",
      name: "Scroll to bottom",
      shortcut: ["s","b"],
      keywords: "scroll bottom",
      section: "Preferences",
      perform: () => window.scrollTo(0, document.body.scrollHeight),
      subtitle: "Scroll to the bottom.",
    },
    {
      id: "facebookAction",
      name: "Facebook",
      shortcut: ["f","b"],
      keywords: "facebook social media",
      section: "Social media",
      perform: () => window.open('https://www.facebook.com/yun.khngn/', '_blank'),
      subtitle: "Visit my facebook account.",
    },
    {
      id: "instagramAction",
      name: "Instagram",
      shortcut: ["i","g"],
      keywords: "instagram social media",
      section: "Social media",
      perform: () => window.open('https://www.instagram.com/yun.khngn', '_blank'),
      subtitle: "Follow my instagram account.",
    },
    {
      id: "githubAction",
      name: "Github",
      shortcut: ["g","h"],
      keywords: "github social media",
      section: "Social media",
      perform: () => window.open('https://github.com/yunkhngn', '_blank'),
      subtitle: "See my works and view the codes here.",
    },
    {
      id: "behanceAction",
      name: "Behance",
      shortcut: ["b","e"],
      keywords: "behance social media",
      section: "Social media",
      perform: () => window.open('https://www.behance.net/yunkhngn_', '_blank'),
      subtitle: "Looking for my design projects?.",
    },
  ];
  const [themeUse, setThemeUse] = useState(themeProvider[0]);
  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(systemTheme);
    setThemeUse(systemTheme === 'light' ? themeProvider[0] : themeProvider[1]);
    const themeChangeListener = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      setThemeUse(newTheme === 'light' ? themeProvider[0] : themeProvider[1]);
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', themeChangeListener);

    // Clean up khi component unmount
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', themeChangeListener);
    };
  }, []);
  
  return (
    <StyletronProvider value={styletron}>
        <KBarProvider
      options={{
        enableHistory: true,
      }}
      actions={actions}
      setTheme={setTheme}
      >
          <div className={'webkit selection'+theme}>
            <CmdBar theme={theme}/>
            <Metatags description='null'/>
            <StyleReset/>
            <AnimatePresence exitBeforeEnter>
              <AnimatedTags key={router.pathname}>
                <Div textColor={themeUse.styles.secondary}>
                  <Component themeUse={themeUse.styles} theme={theme} {...pageProps}/>
                </Div>
              </AnimatedTags>
            </AnimatePresence>
            <Bar theme={theme} setTheme={setTheme} setThemeUse={setThemeUse} themeProvider={themeProvider}/>
            <div className="blur-overlay" />
          </div>
          </KBarProvider>
          <Analytics/>
    </StyletronProvider>
  )
}

export default MyApp
