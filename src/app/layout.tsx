import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: {
    default: "AKR Group UAE | Real Estate, Finance, Risk & Brand Architects",
    template: "%s",
  },
  description:
    "Unified UAE platform across Dubai & Sharjah offering RERA-licensed real estate, Tier-1 banking consultation, risk protection & brand growth. 25+ years expertise.",
};

import Script from 'next/script';
import { LanguageProvider } from '@/context/LanguageContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
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
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
            </CurrencyProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
