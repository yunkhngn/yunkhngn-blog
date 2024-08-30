import '../styles/globals.css'
import '../styles/Bar.css'
import '../styles/BarIcon.css'
import { themeProvider } from '../lib'
import { Bar, CmdBar} from '../components/Hooks'
import {styletron} from '../styletron'
import { Provider as StyletronProvider } from 'styletron-react'
import {StyleReset} from 'atomize'
import {useState} from 'react'
import Metatags from '../components/Template/Metatags'
import { AnimatedTags } from '../components/Template'
import {KBarProvider} from 'kbar'
import {useRouter} from 'next/router'
import {AnimatePresence} from 'framer-motion'
import {Div} from 'atomize'
import { Analytics } from "@vercel/analytics/react"
function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light')
  const router = useRouter()  
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
      name: "Projects",
      shortcut: ["p"],
      keywords: "project projects work featured",
      section: "Navigation",
      perform: () => router.push('/projects'),
      subtitle: "Some of projects I have worked on.",
    },
    {
      id: "writingsAction",
      name: "Writings",
      shortcut: ["w"],
      keywords: "writing writings blog",
      section: "Navigation",
      perform: () => router.push('/writings'),
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
      perform: () => window.open('https://www.instagram.com/yun.khngn_', '_blank'),
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
      perform: () => window.open('https://www.behance.net/yunkhngn', '_blank'),
      subtitle: "Looking for my design projects?.",
    },
  ];

  const [themeUse,setThemeUse] = useState(theme === 'light' ? themeProvider[0] : themeProvider[1])
  const [isLove, setIsLove] = useState(false)
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
                  <Component isLove={isLove} setIsLove={setIsLove} themeUse={themeUse.styles} theme={theme} {...pageProps}/>
                </Div>
              </AnimatedTags>
            </AnimatePresence>
            <Bar theme={theme} setTheme={setTheme} setThemeUse={setThemeUse} themeProvider={themeProvider}/>
          </div>
          </KBarProvider>
          <Analytics/>
    </StyletronProvider>
  )
}

export default MyApp
