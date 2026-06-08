import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieBanner } from "@/components/cookie-banner";
import { GoogleAnalytics } from "@/components/google-analytics";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "neoradar.de: Das unabhängige Vergleichsportal für digitale Banken",
  description:
    "Der Konto-Finder von neoradar.de: Beantworte 5 Fragen und finde unter 10 Neobanken und digitalen Klassikern das Konto, das zu deinem Leben passt. Unabhängig, ohne Anmeldung.",
  // Google Search Console: Bei der "HTML-Tag"-Methode den exakten content-Wert
  // aus der Search Console hier eintragen (er unterscheidet sich vom Token der
  // HTML-Datei in /public/google21a1580a606fa3be.html).
  verification: {
    google: "21a1580a606fa3be",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${jakarta.variable} ${ibmPlexMono.variable} h-full`}
    >
      {/* Impact tracking / site verification. strategy="beforeInteractive"
          must live in the root layout and is always injected into <head> of
          the initial server HTML (next/script docs), which is what Impact's
          verification crawler looks for on the homepage. */}
      <Script id="impact-stat" strategy="beforeInteractive">
        {`(function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('https://utt.impactcdn.com/P-A7391104-2d0b-4a69-991d-1c8f1ee4043f1.js','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');`}
      </Script>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieBanner />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
