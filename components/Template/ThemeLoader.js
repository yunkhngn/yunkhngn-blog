import React from "react";
import Head from "next/head";
import { useEffect } from "react";
const ThemeLoader = ({theme, setTheme, setThemeUse, themeProvider}) => {
  useEffect(() => {
    const isFirstTimeOnPage = !localStorage.getItem('userTheme');

    if (isFirstTimeOnPage) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
      localStorage.setItem('userTheme', systemTheme);
      setThemeUse(systemTheme === 'light' ? themeProvider[0] : themeProvider[1]);
    } else {
      const savedTheme = localStorage.getItem('userTheme');
      setTheme(savedTheme);
      setThemeUse(savedTheme === 'light' ? themeProvider[0] : themeProvider[1]);
    }

    const themeChangeListener = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      setThemeUse(newTheme === 'light' ? themeProvider[0] : themeProvider[1]);
      localStorage.setItem('userTheme', newTheme);
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', themeChangeListener);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', themeChangeListener);
    };
  }, []);

  useEffect(() => {
    document.documentElement.className = theme === 'light' ? 'light-theme' : 'dark-theme';
  }, [theme]);
  return (
    <>
      <Head>
        {/* Đoạn style để thiết lập theme ngay lập tức */}
        <style>
          {`
            :root {
              --background-color-light: #ffffff;
              --background-color-dark: #000000;
              --text-color-light: #000000;
              --text-color-dark: #ffffff;
            }
            
            html.light-theme {
              background-color: var(--background-color-light);
              color: var(--text-color-light);
            }
            
            html.dark-theme {
              background-color: var(--background-color-dark);
              color: var(--text-color-dark);
            }

            /* Đặt theme ngay lập tức */
            html {
              background-color: var(--background-color-light);
              color: var(--text-color-light);
              transition: background-color 0.1s ease-out, color 0.1s ease-out;
            }
          `}
        </style>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var userTheme = localStorage.getItem('userTheme');
                if (userTheme) {
                  document.documentElement.className = userTheme === 'dark' ? 'dark-theme' : 'light-theme';
                } else {
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  document.documentElement.className = systemTheme === 'dark' ? 'dark-theme' : 'light-theme';
                }
              })();
            `,
          }}
        />
      </Head>
    </>
  );
};

export default ThemeLoader;
