'use client';
import './styles/globals.css';
import styles from './styles/layout.module.css';
import ThemeMode from './components/ThemeMode';
import Footer from './components/Footer';
// import LangToggle from './components/LangToggle';
export default function RootLayout({children}) {
  return (
    <html lang='en' theme='light'>
      <title>AniMaths</title>
      <meta name='description' content='Learn maths with animations' />
      <body>
        <div className={styles.topRight}>
          <div>
            <ThemeMode />
            {/* <LangToggle /> */}
          </div>
        </div>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
