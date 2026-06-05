import Link from "next/link";
import { Container, PageHead } from "@/components/ui";

export const metadata = {
  title: "Datenschutz | neobank.de",
};

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="font-bold flex gap-3"
        style={{ color: "var(--h-ink)", fontSize: "clamp(22px,2.8vw,30px)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
      >
        <span className="font-mono tabular-nums" style={{ color: "var(--h-accent-ink)" }}>
          {n}.
        </span>
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[16.5px] font-bold mt-6" style={{ color: "var(--h-ink)" }}>
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[16.5px] leading-[1.7]" style={{ color: "var(--h-muted)" }}>
      {children}
    </p>
  );
}

const Imp = () => (
  <Link href="/impressum" className="font-medium underline underline-offset-2 transition-opacity hover:opacity-60" style={{ color: "var(--h-accent-ink)" }}>
    Impressum
  </Link>
);

export default function DatenschutzPage() {
  return (
    <section>
      <Container className="pt-14 pb-10 lg:pt-20">
        <PageHead
          kicker="Rechtliches"
          title="Datenschutz."
          lead="Transparente Informationen darüber, welche Daten wir wann, wie und auf welcher Rechtsgrundlage verarbeiten."
        />
      </Container>
      <Container className="pb-20">
        <div className="max-w-[46rem] space-y-12">
          <Section n={1} title="Datenschutz auf einen Blick">
            <SubHead>Allgemeine Hinweise</SubHead>
            <P>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </P>
            <SubHead>Datenerfassung auf dieser Website</SubHead>
            <P>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
              Kontaktdaten können Sie dem <Imp /> dieser Website entnehmen. Ihre Daten werden zum
              einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. per E-Mail). Andere Daten
              werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
              IT-Systeme erfasst (z. B. IP-Adresse, Browser oder Uhrzeit des Seitenaufrufs).
            </P>
          </Section>

          <Section n={2} title="Hosting durch Vercel">
            <P>
              Wir hosten unsere Website bei Vercel (Vercel Inc., 440 Bond Street, Brooklyn, NY
              11231, USA). Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles
              inklusive Ihrer IP-Adressen. Vercel ist eine Plattform zum Bereitstellen und
              Veröffentlichen von modernen Websites.
            </P>
            <P>
              Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir
              haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer
              Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die
              Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die
              Einwilligung ist jederzeit widerrufbar.
            </P>
          </Section>

          <Section n={3} title="Analyse-Tools und Werbung">
            <SubHead>Google Analytics</SubHead>
            <P>
              Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist
              die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.
            </P>
            <P>
              Google Analytics verwendet sog. „Cookies“. Das sind Textdateien, die auf Ihrem
              Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie
              ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser
              Website werden in der Regel an einen Server von Google in den USA übertragen und dort
              gespeichert.
            </P>
            <ul className="space-y-3">
              {[
                ["IP-Anonymisierung:", "Wir haben auf dieser Website die Funktion IP-Anonymisierung aktiviert. Dadurch wird Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum vor der Übermittlung in die USA gekürzt."],
                ["Auftragsverarbeitung:", "Wir haben mit Google einen Vertrag zur Auftragsverarbeitung abgeschlossen und setzen die strengen Vorgaben der deutschen Datenschutzbehörden bei der Nutzung von Google Analytics vollständig um."],
                ["Widerruf der Datenerfassung:", "Sie können die Erfassung Ihrer Daten durch Google Analytics verhindern, indem Sie in unserem Cookie-Banner die entsprechende Auswahl treffen oder ein Browser-Add-on zur Deaktivierung von Google Analytics installieren."],
              ].map(([label, text]) => (
                <li
                  key={label}
                  className="rounded-xl p-4 text-[15.5px] leading-relaxed"
                  style={{ background: "var(--h-card)", border: "1px solid var(--h-line)", color: "var(--h-muted)" }}
                >
                  <strong style={{ color: "var(--h-ink)" }}>{label}</strong> {text}
                </li>
              ))}
            </ul>
            <P>
              Die Speicherung von Google-Analytics-Cookies und die Nutzung dieses Analyse-Tools
              erfolgen auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Die Einwilligung
              ist jederzeit über unseren Cookie-Banner widerrufbar.
            </P>
          </Section>

          <Section n={4} title="Consent-Management (Cookie-Banner)">
            <P>
              Um die Einwilligung der Nutzer für den Einsatz von Cookies und Analyse-Tools
              einzuholen, nutzen wir eine Consent-Management-Technologie (Cookie-Banner).
            </P>
            <P>
              Beim Aufruf unserer Website wird Ihnen ein Banner angezeigt, über den Sie Ihre
              Zustimmung zur Speicherung bestimmter Cookies geben können. Ihre Entscheidung wird in
              einem funktionalen Cookie gespeichert, damit die Abfrage bei einem erneuten Besuch
              nicht erneut erscheint. Die Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an der rechtssicheren Einholung von Einwilligungen).
            </P>
          </Section>

          <Section n={5} title="Affiliate-Links (Partnerprogramme)">
            <P>
              Wir binden auf unserer Webseite Affiliate-Links ein. Wenn Sie auf einen solchen Link
              klicken und anschließend ein Konto bei der jeweiligen Bank eröffnen, erhalten wir eine
              Vermittlungsprovision.
            </P>
            <P>
              Für die Abrechnung dieser Provision ist es erforderlich, dass der Anbieter (die Bank
              oder ein dazwischengeschaltetes Affiliate-Netzwerk) erkennt, dass Sie über unsere
              Seite gekommen sind. Hierzu werden Cookies eingesetzt, die die Herkunft des Klicks
              speichern (sog. „Tracking-Cookies“). Diese Speicherung erfolgt auf Grundlage von Art.
              6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse ergibt sich daraus, dass uns nur
              durch das Tracking die Affiliate-Provision zugeordnet werden kann.
            </P>
          </Section>

          <Section n={6} title="Ihre Rechte">
            <P>Sie haben jederzeit das Recht:</P>
            <ul className="space-y-2.5">
              {[
                "Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.",
                "Die Berichtigung oder Löschung dieser Daten zu verlangen.",
                "Eine erteilte Einwilligung zur Datenverarbeitung zu widerrufen.",
                "Sich bei der zuständigen Aufsichtsbehörde zu beschweren.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[16px] leading-relaxed"
                  style={{ color: "var(--h-muted)" }}
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ background: "var(--h-accent)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <P>
              Bitte wenden Sie sich hierzu an die im <Imp /> angegebene Adresse.
            </P>
          </Section>
        </div>
      </Container>
    </section>
  );
}
