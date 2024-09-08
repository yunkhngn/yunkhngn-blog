import '../styles/globals.css'
import '../styles/Bar.css'
import '../styles/BarIcon.css'

import { themeProvider } from '../lib'
import { Bar, CmdBar } from '../components/Hooks'
import { styletron } from '../styletron'
import { Provider as StyletronProvider } from 'styletron-react'
import { StyleReset } from 'atomize'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AnimatedTags } from '../components/Template'
import { injectSpeedInsights } from '@vercel/speed-insights'
import { barList } from '../lib'
import { KBarProvider } from 'kbar'
import { AnimatePresence } from 'framer-motion'
import { Div } from 'atomize'
import { Analytics } from '@vercel/analytics/react'

injectSpeedInsights()

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light')
  const [themeUse, setThemeUse] = useState(themeProvider[0])
  const router = useRouter()

  useEffect(() => {
    // Kiểm tra nếu là lần đầu truy cập trang
    const isFirstTimeOnPage = !localStorage.getItem('userTheme')

    if (isFirstTimeOnPage) {
      // Lấy theme mặc định của hệ thống
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme(systemTheme)
      localStorage.setItem('userTheme', systemTheme) // Lưu theme mặc định vào localStorage
      setThemeUse(systemTheme === 'light' ? themeProvider[0] : themeProvider[1])
    } else {
      // Lấy theme từ localStorage
      const savedTheme = localStorage.getItem('userTheme')
      setTheme(savedTheme)
      setThemeUse(savedTheme === 'light' ? themeProvider[0] : themeProvider[1])
    }

    // Lắng nghe sự thay đổi theme của hệ thống
    const themeChangeListener = (e) => {
      const newTheme = e.matches ? 'dark' : 'light'
      setTheme(newTheme)
      setThemeUse(newTheme === 'light' ? themeProvider[0] : themeProvider[1])
      localStorage.setItem('userTheme', newTheme) // Cập nhật theme trong localStorage
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', themeChangeListener)

    // Clean up khi component unmount
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', themeChangeListener)
    }
  }, [])

  useEffect(() => {
    // Thay đổi lớp của phần tử HTML dựa trên theme
    document.documentElement.className = theme === 'light' ? 'light-theme' : 'dark-theme'
  }, [theme])

  return (
    <StyletronProvider value={styletron}>
      <KBarProvider
        options={{
          enableHistory: true,
        }}
        actions={barList.actions}
        setTheme={setTheme}
      >
        <div className={'webkit selection ' + theme}>
          <CmdBar theme={theme} />
          <StyleReset />
          <AnimatePresence exitBeforeEnter>
            <AnimatedTags key={router.pathname}>
              <Div textColor={themeUse.styles.secondary}>
                <Component themeUse={themeUse.styles} theme={theme} {...pageProps} />
              </Div>
            </AnimatedTags>
          </AnimatePresence>
          <Bar theme={theme} setTheme={setTheme} setThemeUse={setThemeUse} themeProvider={themeProvider} />
          <div className="blur-overlay" />
        </div>
      </KBarProvider>
      <Analytics />
    </StyletronProvider>
  )
}

export default MyApp