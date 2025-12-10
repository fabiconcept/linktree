import './globals.css';
import './styles/fonts.css';
import { Inter } from 'next/font/google';
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Link Tree',
  description: 'This is a Link tree Clone Web App Developed by Fabiconcept.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="eDdSbajfbiXqKmKgyUZEBOobGiP4VGg1x-EnrTHgG_E" />
        <meta name="google-site-verification" content="uDJzp2l9Yhzie-f1ShUgIajhasXvs3_0rZoOqOG87Ig" />
      </head>
      <body className={inter.className}>
        <NextTopLoader color='#8129D9' />
        {children}
      </body>
    </html>
  )
}