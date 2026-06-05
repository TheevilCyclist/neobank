import { Container, PageHead, Disclaimer } from "@/components/ui";

export const metadata = {
  title: "Transparenz — Wovon wir leben, und wovon nicht | neobank.de",
};

export default function TransparenzPage() {
  const items = [
    "Provisionen beeinflussen weder Bewertung noch Reihenfolge — beide folgen der Methodik.",
    "Wir verlinken auch Anbieter ohne Partnerschaft, wenn sie ins Radar gehören; entgangene Provision ist kein Ausschlusskriterium.",
    "Einmal jährlich legen wir offen, welcher Anteil unserer Einnahmen von welchem Anbieter stammt (Transparenzbericht, PDF).",
  ];
  return (
    <section>
      <Container className="pt-14 pb-10 lg:pt-20">
        <PageHead
          kicker="Transparenz"
          title="Wovon wir leben — und wovon nicht."
          lead="neobank.de finanziert sich über Affiliate-Links: Eröffnest du ein Konto über einen unserer Links, erhalten wir vom Anbieter eine Provision. Für dich ändert sich nichts — weder Preis noch Konditionen."
        />
      </Container>
      <Container className="pb-20">
        <div className="rounded-2xl p-8 lg:p-10" style={{ background: "var(--h-card)", border: "1px solid var(--h-line)" }}>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-6" style={{ color: "var(--h-faint)" }}>
            Drei Selbstverpflichtungen
          </div>
          <div className="space-y-5">
            {items.map((x, i) => (
              <div key={i} className="flex gap-4">
                <span
                  className="grid place-items-center h-9 w-9 rounded-full font-bold text-[14px] shrink-0"
                  style={{ background: "var(--h-accent-soft)", color: "var(--h-accent-ink)", border: "1px solid var(--h-accent-line)" }}
                >
                  {i + 1}
                </span>
                <p className="text-[16px] leading-relaxed self-center" style={{ color: "var(--h-ink)" }}>
                  {x}
                </p>
              </div>
            ))}
          </div>
          <p
            className="mt-8 pt-6 text-[15px] leading-relaxed"
            style={{ borderTop: "1px solid var(--h-line)", color: "var(--h-muted)" }}
          >
            Werbung im redaktionellen Gewand gibt es bei uns nicht. Gesponserte Inhalte wären als
            solche markiert — bisher haben wir alle Anfragen abgelehnt.
          </p>
        </div>
        <div className="mt-4">
          <Disclaimer>
            Affiliate-Kennzeichnung erfolgt sichtbar oberhalb des ersten Links. Diese Seite ist
            Teil eines Prototyps; Beträge und Konditionen sind illustrativ.
          </Disclaimer>
        </div>
      </Container>
    </section>
  );
}
