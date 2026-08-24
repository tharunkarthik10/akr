import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AKR Group | Premium Real Estate Advisory",
  description: "Red & Gold Edition. Premium real estate and advisory services.",
};

import Script from 'next/script';
import { LanguageProvider } from '@/context/LanguageContext';
import { CurrencyProvider } from '@/context/CurrencyContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <CurrencyProvider>
            <div id="google_translate_element" style={{ display: 'none' }}></div>
            <Script 
              src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
              strategy="afterInteractive" 
            />
          <Script id="google-translate-init" strategy="afterInteractive">
            {`
              function googleTranslateElementInit() {
                new google.translate.TranslateElement(
                  { pageLanguage: 'en', autoDisplay: false },
                  'google_translate_element'
                );
              }
            `}
          </Script>
          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
