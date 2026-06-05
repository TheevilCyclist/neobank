import Script from "next/script";

export const GA_ID = "G-9SMRWNGPHT";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GA4 mit Google Consent Mode v2.
 * Standard: alle Speicher-Signale auf "denied", es wird nichts gesetzt/getrackt,
 * bis der Nutzer im Cookie-Banner zustimmt (dann `consent: update` → granted).
 * Eine frühere Einwilligung (Cookie `neoradar-consent=all`) wird beim Laden
 * automatisch berücksichtigt.
 */
export function GoogleAnalytics() {
  return (
    <>
      <Script id="ga-consent-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());

          // Consent Mode v2, Default: alles abgelehnt, bis Zustimmung erfolgt
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied'
          });
          gtag('set', 'url_passthrough', true);
          gtag('set', 'ads_data_redaction', true);

          // Frühere Einwilligung wiederkehrender Besucher übernehmen
          try {
            if (document.cookie.split('; ').indexOf('neoradar-consent=all') !== -1) {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
          } catch (e) {}

          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
      <Script
        id="ga-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
