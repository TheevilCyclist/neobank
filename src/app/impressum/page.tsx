import { Container, PageHead } from "@/components/ui";

export const metadata = {
  title: "Impressum | neoradar.de",
};

function Address() {
  return (
    <div className="text-[15px] leading-relaxed not-italic" style={{ color: "var(--h-ink)" }}>
      Marcus Kühne
      <br />
      Tannenweg 1a
      <br />
      04288 Leipzig
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[15px] font-bold mb-2" style={{ color: "var(--h-ink)" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function ImpressumPage() {
  return (
    <section>
      <Container className="pt-14 pb-10 lg:pt-20">
        <PageHead
          kicker="Rechtliches"
          title="Impressum."
          lead="Angaben gemäß § 5 TMG."
        />
      </Container>
      <Container className="pb-20">
        <div className="max-w-[46rem]">
          <div
            className="rounded-2xl p-8 lg:p-10 grid sm:grid-cols-2 gap-x-8 gap-y-7"
            style={{ background: "var(--h-card)", border: "1px solid var(--h-line)" }}
          >
            <Block title="Betreiber der Website">
              <Address />
            </Block>
            <Block title="Kontakt">
              <div className="text-[15px] leading-relaxed" style={{ color: "var(--h-muted)" }}>
                E-Mail:{" "}
                <a
                  href="mailto:marcus.kuehne@t-online.de"
                  className="font-medium underline underline-offset-2 transition-opacity hover:opacity-60"
                  style={{ color: "var(--h-accent-ink)" }}
                >
                  marcus.kuehne@t-online.de
                </a>
              </div>
            </Block>
            <Block title="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV">
              <Address />
            </Block>
          </div>

          <div className="mt-12 space-y-12">
            <div>
              <h2
                className="font-bold"
                style={{ color: "var(--h-ink)", fontSize: "clamp(22px,2.8vw,30px)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
              >
                Hinweis auf Affiliate-Links
              </h2>
              <p className="text-[16.5px] leading-[1.7] mt-4" style={{ color: "var(--h-muted)" }}>
                Einige der auf dieser Webseite verwendeten Links sind sogenannte Affiliate-Links.
                Wenn Sie über einen dieser Links ein Konto eröffnen, erhält der Betreiber dieser
                Seite unter Umständen eine Provision. Für Sie entstehen dadurch keine zusätzlichen
                Kosten oder Nachteile bei den Konditionen. Diese Einnahmen helfen dabei, dieses
                Projekt unabhängig zu betreiben und die Inhalte aktuell zu halten.
              </p>
            </div>

            <div>
              <h2
                className="font-bold"
                style={{ color: "var(--h-ink)", fontSize: "clamp(22px,2.8vw,30px)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
              >
                Streitschlichtung
              </h2>
              <p className="text-[16.5px] leading-[1.7] mt-4" style={{ color: "var(--h-muted)" }}>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-2 transition-opacity hover:opacity-60"
                  style={{ color: "var(--h-accent-ink)" }}
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder
                verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                teilzunehmen.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
