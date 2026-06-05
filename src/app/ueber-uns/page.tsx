import { Container, PageHead } from "@/components/ui";
import { Btn } from "@/components/button";
import { hrefFor } from "@/lib/routes";

export const metadata = {
  title: "Über uns — Wir lesen das Kleingedruckte | neobank.de",
};

export default function UeberUnsPage() {
  const stats: [string, string][] = [
    ["10", "Banken im Radar"],
    ["7+3", "Neobanken & Klassiker"],
    ["8 Wo.", "Mindest-Testdauer"],
    ["0 €", "Kosten für dich"],
  ];
  return (
    <section>
      <Container className="pt-14 pb-10 lg:pt-20">
        <PageHead
          kicker="Über uns"
          title="Wir sind die, die das Kleingedruckte lesen."
          lead="neobank.de ist ein unabhängiges Vergleichsportal für digitale Banken in Deutschland — von der Neobank bis zum Direktbank-Klassiker."
        />
      </Container>
      <Container className="pb-20">
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-10 items-center">
          <div className="space-y-5">
            <p className="text-[17px] leading-relaxed" style={{ color: "var(--h-muted)" }}>
              Gegründet, weil die großen Vergleichsseiten zu oft die Frage beantworten, welches
              Konto am meisten Provision bringt — statt der Frage, welches Konto zu deinem Leben
              passt.
            </p>
            <p className="text-[17px] leading-relaxed" style={{ color: "var(--h-muted)" }}>
              Wir glauben nicht an „die beste Bank“. Wir glauben an scharfe Profile, ehrliche
              Rechenbeispiele und daran, dass zwei spezialisierte Konten besser sind als ein
              mittelmäßiges. Deshalb findest du bei uns{" "}
              <span style={{ color: "var(--h-ink)", fontWeight: 600 }}>Euro-Beträge statt Sternchen</span>,
              Lizenzmodelle statt Logos und ein klares „Für wen nicht“ in jedem Steckbrief.
            </p>
            <div className="pt-2">
              <Btn href={hrefFor("vergleich")}>Konten vergleichen</Btn>
            </div>
          </div>
          <div className="rounded-2xl p-8" style={{ background: "var(--h-tint)", border: "1px solid var(--h-line)" }}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map(([n, l]) => (
                <div key={l}>
                  <div className="text-[30px] font-bold tabular-nums" style={{ color: "var(--h-accent-ink)" }}>
                    {n}
                  </div>
                  <div className="text-[13px] mt-1.5" style={{ color: "var(--h-muted)" }}>
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
