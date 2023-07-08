import './styles/globals.css';
import styles from './styles/layout.module.css';
import Link from 'next/link';
import ThemeMode from './components/ThemeMode';
import Footer from './components/Footer';

export const metadata = {
  title: 'AniMaths',
  description: 'The website where you learn maths with animations.',
};

export default function RootLayout({children, whereTo}) {
  return (
    <html lang='en' theme='light'>
      <body>
        <div className={styles.topRight}>
          <ThemeMode />
        </div>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
