import './styles/globals.css';
import {Inter} from 'next/font/google';

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: 'AniMaths',
  description: 'The website where you learn maths with animations.',
};

export default function RootLayout({children}) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
