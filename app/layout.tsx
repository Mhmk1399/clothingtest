import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/(ui)/NavBar/page";
import Footer from "@/components/(ui)/Footer/page";

// Import and configure Google Fonts
import { Amiri, Cinzel, Vazirmatn } from 'next/font/google';
import { SmallFooter } from "@/components/small-footer";
import SocialFooter from "@/components/social-footer";

const inter = Inter({ subsets: ["latin"] });
// const amiri = Amiri({ subsets: ['arabic'], display: 'swap' },);
const cinzel = Cinzel({ subsets: ['latin'], display: 'swap' });
const vazirmatn = Vazirmatn({ subsets: ['arabic'], display: 'swap' });

export const metadata: Metadata = {
  title: "lusyman store",
  description: "best clothing store of itan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Include Google Fonts CDN links (optional for better performance) */}
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"></link>
        <link
          href={`https://fonts.googleapis.com/css2?family=&family=${cinzel.style.fontFamily}&family=${vazirmatn.style.fontFamily}&display=swap`}
          rel="stylesheet"
        />
      </head>
      <body className={vazirmatn.className}>
        <NavBar />
        {children}
        <SocialFooter />
      </body>
    </html>
  );
}
