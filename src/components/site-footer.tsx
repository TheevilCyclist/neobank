import Link from "next/link";
import { Container } from "./ui";

const COLS: [string, [string, string][]][] = [
  [
    "Vergleich",
    [
      ["Alle Konten", "/vergleich"],
      ["Zinsen", "/vergleich?filter=zinsen"],
      ["Reisen", "/vergleich?filter=reisen"],
      ["Digitale Klassiker", "/vergleich?filter=klassiker"],
    ],
  ],
  [
    "Ratgeber",
    [
      ["Konto-Stack", "/ratgeber/konto-stack"],
      ["Hauptkonto wechseln", "/ratgeber/hauptkonto-wechseln"],
      ["Neobank vs. Direktbank", "/ratgeber/neobank-oder-direktbank"],
      ["Einlagensicherung", "/ratgeber/einlagensicherung-neobanken"],
    ],
  ],
  [
    "Portal",
    [
      ["Transparenz", "/transparenz"],
      ["Über uns", "/ueber-uns"],
      ["Impressum", "/impressum"],
      ["Datenschutz", "/datenschutz"],
    ],
  ],
];

export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--h-line)", background: "var(--h-card)" }}>
      <Container className="py-14">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-sm">
            <div className="text-[20px] font-bold" style={{ color: "var(--h-ink)" }}>
              neoradar<span style={{ color: "var(--h-faint)" }}>.de</span>
            </div>
            <p
              className="mt-4 text-[13.5px] leading-relaxed"
              style={{ color: "var(--h-muted)" }}
            >
              Unabhängiges Vergleichsportal für digitale Banken in Deutschland — von der
              Neobank bis zum Direktbank-Klassiker. Finanziert über Affiliate-Links, ohne
              Kosten für dich.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-[13.5px]">
            {COLS.map(([h, items]) => (
              <div key={h}>
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.16em] mb-3"
                  style={{ color: "var(--h-faint)" }}
                >
                  {h}
                </div>
                <ul className="space-y-2.5">
                  {items.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-left transition-opacity hover:opacity-60"
                        style={{ color: "var(--h-muted)" }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-2 font-mono text-[11px]"
          style={{ borderTop: "1px solid var(--h-line)", color: "var(--h-faint)" }}
        >
          <span>© 2026 neoradar.de · Kein Bankprodukt, kein offizieller Anbieter.</span>
          <span>Alle Angaben ohne Gewähr · Beispieldaten · Stand Juni 2026</span>
        </div>
      </Container>
    </footer>
  );
}
