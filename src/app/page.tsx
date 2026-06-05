import Link from "next/link";
import { Icon } from "@/components/icons";
import { Container, Eyebrow, LiveDot } from "@/components/ui";
import { Btn } from "@/components/button";
import { KontoFinder } from "@/components/konto-finder";
import { USECASES } from "@/lib/data";
import { hrefFor } from "@/lib/routes";

function HomeHero() {
  return (
    <section>
      <Container className="pt-14 pb-12 lg:pt-20 lg:pb-16">
        <div className="grid lg:grid-cols-[1fr_0.92fr] gap-12 lg:gap-14 items-center">
          <div>
            <Eyebrow>
              <LiveDot /> Der Konto-Finder · 2026
            </Eyebrow>
            <h1
              className="font-bold mt-6"
              style={{
                color: "var(--h-ink)",
                fontSize: "clamp(38px,5.4vw,64px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
              }}
            >
              Dein Leben entscheidet.
              <br />
              <span style={{ color: "var(--h-muted)" }}>Nicht die Bank.</span>
            </h1>
            <p className="mt-6 text-[17.5px] leading-relaxed max-w-[34rem]" style={{ color: "var(--h-muted)" }}>
              Beantworte 5 Fragen — wir sagen dir, welches der 10 Konten in unserem Radar zu
              deiner Situation passt. Ohne Anmeldung, ohne E-Mail, ohne Verkaufsdruck. Und wenn
              die ehrliche Antwort
              <span style={{ color: "var(--h-ink)", fontWeight: 600 }}> „zwei Konten“</span> lautet,
              sagen wir auch das.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Btn kind="ghost" icon="arrowUpRight" href={hrefFor("vergleich")}>
                Lieber selbst vergleichen
              </Btn>
            </div>
          </div>
          <div className="lg:pl-4">
            <KontoFinder />
          </div>
        </div>
      </Container>
    </section>
  );
}

function UseCases() {
  return (
    <section className="py-16 lg:py-24" style={{ borderTop: "1px solid var(--h-line)" }}>
      <Container>
        <div className="max-w-[42rem] mb-10">
          <Eyebrow>Oder direkt einsteigen</Eyebrow>
          <h2
            className="font-bold mt-4"
            style={{
              color: "var(--h-ink)",
              fontSize: "clamp(28px,3.6vw,44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            Du weißt schon, was du brauchst?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed" style={{ color: "var(--h-muted)" }}>
            Spring direkt zum passenden Vergleich oder Ratgeber — der Finder ist optional.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {USECASES.map((u) => (
            <Link
              key={u.id}
              href={hrefFor(u.target.view, { filter: u.target.filter })}
              className="group text-left rounded-2xl p-6 flex items-center gap-4 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--h-card)", border: "1px solid var(--h-line)" }}
            >
              <span
                className="grid place-items-center h-11 w-11 rounded-xl shrink-0"
                style={{
                  background: "var(--h-accent-soft)",
                  color: "var(--h-accent-ink)",
                  border: "1px solid var(--h-accent-line)",
                }}
              >
                <Icon name={u.icon} size={20} sw={1.9} />
              </span>
              <div className="min-w-0 flex-1">
                <h3
                  className="font-bold text-[16.5px]"
                  style={{ color: "var(--h-ink)", letterSpacing: "-0.01em" }}
                >
                  {u.title}
                </h3>
                <p className="text-[13px] mt-0.5 truncate" style={{ color: "var(--h-muted)" }}>
                  {u.sub}
                </p>
              </div>
              <Icon
                name="arrowRight"
                size={17}
                style={{ color: "var(--h-faint)" }}
                className="shrink-0 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TrustBlock() {
  const items: { icon: "fileText" | "lock" | "search"; t: string; s: string }[] = [
    { icon: "fileText", t: "Geprüft auf das, was zählt", s: "Kosten, Zinsen, Lizenzmodell, App und Support — gewichtet bewertet." },
    { icon: "lock", t: "0 € Kosten für dich", s: "Finanziert über Affiliate-Links, nie über deinen Geldbeutel." },
    { icon: "search", t: "Finder-Logik offengelegt", s: "Keine Black Box — die Empfehlung folgt nachvollziehbaren Regeln." },
  ];
  return (
    <section
      className="py-16 lg:py-24"
      style={{ borderTop: "1px solid var(--h-line)", background: "var(--h-tint)" }}
    >
      <Container>
        <div className="grid sm:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.t} className="flex gap-3.5">
              <span
                className="grid place-items-center h-11 w-11 rounded-xl shrink-0"
                style={{ background: "var(--h-card)", color: "var(--h-accent-ink)", border: "1px solid var(--h-line)" }}
              >
                <Icon name={it.icon} size={20} />
              </span>
              <div>
                <div className="text-[15.5px] font-bold" style={{ color: "var(--h-ink)" }}>
                  {it.t}
                </div>
                <div className="text-[13.5px] mt-1 leading-relaxed" style={{ color: "var(--h-muted)" }}>
                  {it.s}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function StackTeaser() {
  const stacks: [string, string, "percent" | "plane" | "briefcase"][] = [
    ["Zins-Stack", "N26 / Trade Republic + C24", "percent"],
    ["Reise-Stack", "Hauptkonto + Revolut", "plane"],
    ["Selbstständigen-Stack", "Privatkonto + bunq", "briefcase"],
  ];
  return (
    <section className="py-16 lg:py-24" style={{ borderTop: "1px solid var(--h-line)" }}>
      <Container>
        <div
          className="rounded-2xl overflow-hidden grid lg:grid-cols-[1.1fr_0.9fr]"
          style={{ border: "1px solid var(--h-line)" }}
        >
          <div className="p-8 lg:p-12" style={{ background: "var(--h-card)" }}>
            <Eyebrow>
              <Icon name="layers" size={13} /> Signatur · Konto-Stack
            </Eyebrow>
            <h2
              className="font-bold mt-5"
              style={{
                color: "var(--h-ink)",
                fontSize: "clamp(26px,3.4vw,40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              Ein Konto reicht oft nicht. Zwei sind genug.
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed max-w-[34rem]" style={{ color: "var(--h-muted)" }}>
              Manchmal ist das ehrlichste Finder-Ergebnis ein{" "}
              <span style={{ color: "var(--h-ink)", fontWeight: 600 }}>Konto-Stack</span>: ein
              Hauptkonto fürs Gehalt, ein Spezialkonto für Reisen oder Struktur. Wie du den Stack
              baust — ohne Gebühren und ohne Chaos.
            </p>
            <div className="mt-8">
              <Btn href={hrefFor("ratgeber-konto-stack")}>Konto-Stack lesen</Btn>
            </div>
          </div>
          <div className="p-8 lg:p-10 flex flex-col justify-center gap-3" style={{ background: "var(--h-tint)" }}>
            {stacks.map(([t, s, ic]) => (
              <div
                key={t}
                className="flex items-center gap-3.5 rounded-xl px-4 py-3.5"
                style={{ background: "var(--h-card)", border: "1px solid var(--h-line)" }}
              >
                <span
                  className="grid place-items-center h-9 w-9 rounded-lg shrink-0"
                  style={{ background: "var(--h-accent-soft)", color: "var(--h-accent-ink)" }}
                >
                  <Icon name={ic} size={17} />
                </span>
                <div className="min-w-0">
                  <div className="text-[14.5px] font-bold" style={{ color: "var(--h-ink)" }}>
                    {t}
                  </div>
                  <div className="text-[12.5px] truncate" style={{ color: "var(--h-muted)" }}>
                    {s}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <UseCases />
      <TrustBlock />
      <StackTeaser />
    </>
  );
}
