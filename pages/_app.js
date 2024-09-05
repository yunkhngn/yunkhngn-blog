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
import { injectSpeedInsights } from '@vercel/speed-insights';

injectSpeedInsights();

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
      name: "Trang chủ",
      shortcut: ["t"],
      keywords: "back home, trang chu",
      section: "Navigation",
      perform: () => router.push('/'),
      subtitle: "Về lại trang chủ.",
    },
    {
      id: "aboutMeAction",
      name: "Giới thiệu",
      shortcut: ["g"],
      keywords: "gioi thieu ve toi",
      section: "Navigation",
      perform: () => router.push('/about'),
      subtitle: "Giới thiệu về tớ.",
    },
    {
      id: "projectsAction",
      name: "Dự án",
      shortcut: ["d"],
      keywords: "project projects du an work featured",
      section: "Navigation",
      perform: () => router.push('/project'),
      subtitle: "Các dự án của tớ.",
    },
    {
      id: "libraryAction",
      name: "Thư viện",
      shortcut: ["l"],
      keywords: "library thu vien design work behance",
      section: "Navigation",
      perform: () => router.push('/library'),
      subtitle: "Thư viện dự án thiết kế.",
    },
    {
      id: "writingsAction",
      name: "Viết linh tinh",
      shortcut: ["v"],
      keywords: "writing writings viet linh tinh blog",
      section: "Navigation",
      perform: () => router.push('/writing'),
      subtitle: "Chỗ tớ viết linh tinh.",
    },
    {
      id: "scrollToTopAction",
      name: "Kéo lên",
      shortcut: ["s","t"],
      keywords: "scroll top",
      section: "Preferences",
      perform: () => window.scrollTo(0, 0),
      subtitle: "Kéo lên trên cùng.",
    },
    {
      id: "scrollToBotAction",
      name: "Kéo xuống dưới",
      shortcut: ["s","b"],
      keywords: "scroll bottom",
      section: "Preferences",
      perform: () => window.scrollTo(0, document.body.scrollHeight),
      subtitle: "Kéo xuống dưới cùng.",
    },
    {
      id: "facebookAction",
      name: "Facebook",
      shortcut: ["f","b"],
      keywords: "facebook social media",
      section: "Social media",
      perform: () => window.open('https://www.facebook.com/yun.khngn/', '_blank'),
      subtitle: "Facebook của tớ.",
    },
    {
      id: "instagramAction",
      name: "Instagram",
      shortcut: ["i","g"],
      keywords: "instagram social media",
      section: "Social media",
      perform: () => window.open('https://www.instagram.com/yun.khngn', '_blank'),
      subtitle: "Instagram của tớ.",
    },
    {
      id: "githubAction",
      name: "Github",
      shortcut: ["g","h"],
      keywords: "github social media",
      section: "Social media",
      perform: () => window.open('https://github.com/yunkhngn', '_blank'),
      subtitle: "Github có đăng các dự án của tớ.",
    },
    {
      id: "behanceAction",
      name: "Behance",
      shortcut: ["b","e"],
      keywords: "behance social media",
      section: "Social media",
      perform: () => window.open('https://www.behance.net/yunkhngn_', '_blank'),
      subtitle: "Các dự án thiết kế của tớ trên Behance.",
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
