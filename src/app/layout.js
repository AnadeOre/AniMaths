'use client';
import './styles/globals.css';
import styles from './styles/layout.module.css';
import ThemeMode from './components/ThemeMode';
import Footer from './components/Footer';
import LangToggle from './components/LangToggle';

import store from './store.js';
import {Provider} from 'react-redux';

export default function RootLayout({children}) {
  return (
    <Provider store={store}>
      <html lang='en' theme='light'>
        <title>AniMaths</title>
        <meta name='description' content='Learn maths with animations' />
        <body>
          <div className={styles.topRight}>
            <div className={styles.innerTopRight}>
              <ThemeMode />
              <LangToggle />
            </div>
          </div>
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
