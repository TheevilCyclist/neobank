import type { Metadata } from "next";
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
      {/* Impact site verification — needs the non-standard `value` attribute,
          which Next's metadata API can't emit (it renders `content`), so the
          raw tag is rendered here and hoisted into <head> by React. */}
      <meta
        name="impact-site-verification"
        value="c22399df-ea18-4277-9c15-9b995522c382"
      />
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
