import Link from "next/link";
import { Icon } from "@/components/icons";
import { Container, PageHead } from "@/components/ui";
import { RATGEBER } from "@/lib/data";

export const metadata = {
  title: "Ratgeber: Banking nach Lebenssituation sortiert | neoradar.de",
};

export default function RatgeberPage() {
  const sig = RATGEBER[0];
  const rest = RATGEBER.slice(1);
  const stackTiles: [string, "percent" | "plane" | "briefcase"][] = [
    ["Zins-Stack", "percent"],
    ["Reise-Stack", "plane"],
    ["Selbstständigen-Stack", "briefcase"],
  ];
  return (
    <section>
      <Container className="pt-14 pb-10 lg:pt-20">
        <PageHead
          kicker="Ratgeber"
          title="Banking, nach Lebenssituation sortiert."
          lead="Keine Produkt-Listen, sondern Entscheidungshilfen: vom Konto-Stack über den Hauptkonto-Wechsel bis zur Einlagensicherung."
        />
      </Container>
      <Container className="pb-20">
        {/* signature feature */}
        <Link
          href={`/ratgeber/${sig.id}`}
          className="w-full text-left rounded-2xl overflow-hidden grid lg:grid-cols-[1.1fr_0.9fr] mb-4 transition-transform hover:-translate-y-0.5"
          style={{ border: "1px solid var(--h-line)" }}
        >
          <div className="p-8 lg:p-10" style={{ background: "var(--h-ink)" }}>
            <div
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: "var(--h-accent-bright)" }}
            >
              <Icon name="layers" size={13} /> {sig.kicker}
            </div>
            <h2 className="font-bold mt-4 text-white" style={{ fontSize: "clamp(26px,3.2vw,38px)", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
              {sig.title}
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              {sig.teaser}
            </p>
            <span className="inline-flex items-center gap-2 mt-7 text-[14px] font-semibold text-white">
              Jetzt lesen <Icon name="arrowRight" size={16} />
            </span>
          </div>
          <div className="hidden lg:flex items-center justify-center p-8" style={{ background: "var(--h-term-bg)" }}>
            <div className="space-y-3 w-full max-w-[280px]">
              {stackTiles.map(([t, ic]) => (
                <div
                  key={t}
                  className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{ background: "var(--h-term-chip)" }}
                >
                  <span
                    className="grid place-items-center h-8 w-8 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.06)", color: "var(--h-accent-bright)" }}
                  >
                    <Icon name={ic} size={16} />
                  </span>
                  <span className="text-[14px] font-medium" style={{ color: "var(--h-term-fg)" }}>
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Link>
        {/* grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((r) => (
            <Link
              key={r.id}
              href={`/ratgeber/${r.id}`}
              className="text-left rounded-2xl p-6 flex flex-col transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--h-card)", border: "1px solid var(--h-line)" }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--h-accent-ink)" }}>
                  {r.kicker}
                </span>
                <span className="font-mono text-[11px]" style={{ color: "var(--h-faint)" }}>
                  {r.read}
                </span>
              </div>
              <h3 className="font-bold mt-4 text-[18px]" style={{ color: "var(--h-ink)", letterSpacing: "-0.01em" }}>
                {r.title}
              </h3>
              <p className="text-[14px] leading-relaxed mt-2 flex-1" style={{ color: "var(--h-muted)" }}>
                {r.teaser}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-5 text-[13.5px] font-semibold" style={{ color: "var(--h-accent-ink)" }}>
                Lesen <Icon name="arrowRight" size={14} />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
