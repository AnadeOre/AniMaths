import Head from 'next/head';
import Theme from './Theme';
import Link from 'next/link';
import Footer from './Footer';
import styles from './layout.module.css';
export const siteTitle = 'AniMahts';

export default function Layout({children, whereTo}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel='icon' href='../favicon.ico' />
        <meta name='description' content='Learn maths with animations' />
        <meta
          property='og:image'
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name='og:title' content={siteTitle} />

        <title>AniMaths</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.topRight}>
        <Theme />
      </div>

      {whereTo && (
        <div className={styles.linkCard}>
          <Link href={`${whereTo}`}>
            <h3 className={styles.textCard}>
              &larr; Back{whereTo === '/' ? ' to home' : ''}
            </h3>
          </Link>
        </div>
      )}
      {/* 
      <header className={styles.header}>
      </header> */}
      <main>{children}</main>

      <Footer />
    </div>
  );
}
