"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "./icons";
import { LiveDot, Monogram } from "./ui";
import { Btn } from "./button";
import { BANK_BY_ID } from "@/lib/data";
import { FINDER_Q, recommend, type FinderAnswers } from "@/lib/finder";
import { hrefFor } from "@/lib/routes";

function FinderOption({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all flex items-center justify-between gap-3 group"
      style={{ background: "var(--h-tint)", border: "1px solid var(--h-line)", color: "var(--h-ink)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--h-accent)";
        e.currentTarget.style.background = "var(--h-card)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--h-line)";
        e.currentTarget.style.background = "var(--h-tint)";
      }}
    >
      {label}
      <Icon
        name="arrowRight"
        size={16}
        style={{ color: "var(--h-faint)", flexShrink: 0 }}
        className="transition-transform group-hover:translate-x-0.5"
      />
    </button>
  );
}

function ResultBank({ id, role }: { id: string; role?: string }) {
  const b = BANK_BY_ID[id];
  return (
    <div
      className="flex items-center gap-3.5 rounded-xl p-3.5"
      style={{ background: "var(--h-card)", border: "1px solid var(--h-line)" }}
    >
      <Monogram size={44}>{b.mono}</Monogram>
      <div className="min-w-0 flex-1">
        {role && (
          <div
            className="font-mono text-[9.5px] uppercase tracking-[0.16em] mb-1 leading-none"
            style={{ color: "var(--h-accent-ink)" }}
          >
            {role}
          </div>
        )}
        <div className="flex items-baseline gap-2 leading-tight">
          <span className="text-[16px] font-bold whitespace-nowrap" style={{ color: "var(--h-ink)" }}>
            {b.name}
          </span>
          <span className="text-[12px] whitespace-nowrap truncate" style={{ color: "var(--h-faint)" }}>
            {b.tarif}
          </span>
        </div>
        <div className="text-[12.5px] truncate mt-1 leading-tight" style={{ color: "var(--h-muted)" }}>
          „{b.blurb}“
        </div>
      </div>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="konto-finder"
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "var(--h-card)",
        border: "1px solid var(--h-line)",
        boxShadow:
          "0 30px 70px -30px rgba(20,18,12,0.30), 0 8px 24px -12px rgba(20,18,12,0.18)",
        minHeight: "480px",
      }}
    >
      {children}
    </div>
  );
}

function Bar() {
  return (
    <div
      className="flex items-center justify-between px-5 h-12 shrink-0"
      style={{ borderBottom: "1px solid var(--h-line)", background: "var(--h-tint)" }}
    >
      <span
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]"
        style={{ color: "var(--h-accent-ink)" }}
      >
        <LiveDot /> Konto-Finder
      </span>
      <span
        className="inline-flex items-center gap-1.5 font-mono text-[10.5px]"
        style={{ color: "var(--h-faint)" }}
      >
        <Icon name="lock" size={12} /> Wir wollen dein Match, nicht deine Daten.
      </span>
    </div>
  );
}

export function KontoFinder() {
  const router = useRouter();
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [qi, setQi] = useState(0);
  const [ans, setAns] = useState<FinderAnswers>({});

  const reset = () => {
    setAns({});
    setQi(0);
    setPhase("intro");
  };
  const pick = (key: string, v: string) => {
    setAns((prev) => ({ ...prev, [key]: v }));
    if (qi < FINDER_Q.length - 1) setQi(qi + 1);
    else setPhase("result");
  };
  const back = () => {
    if (qi > 0) setQi(qi - 1);
    else setPhase("intro");
  };

  if (phase === "intro") {
    return (
      <Shell>
        <Bar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-7 py-10">
          <span
            className="grid place-items-center h-14 w-14 rounded-2xl mb-6"
            style={{
              background: "var(--h-accent-soft)",
              color: "var(--h-accent-ink)",
              border: "1px solid var(--h-accent-line)",
            }}
          >
            <Icon name="search" size={26} />
          </span>
          <h3 className="font-bold" style={{ color: "var(--h-ink)", fontSize: "23px", letterSpacing: "-0.02em" }}>
            Welches Konto passt zu dir?
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed max-w-[20rem]" style={{ color: "var(--h-muted)" }}>
            5 Fragen, unter 60 Sekunden — und eine ehrliche Empfehlung. Auch wenn sie „zwei
            Konten“ lautet.
          </p>
          <div className="mt-7 w-full max-w-[18rem]">
            <Btn
              className="w-full justify-center"
              onClick={() => {
                setPhase("quiz");
                setQi(0);
              }}
            >
              Los geht&apos;s
            </Btn>
          </div>
          <div
            className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.14em]"
            style={{ color: "var(--h-faint)" }}
          >
            Ohne Anmeldung · ohne E-Mail
          </div>
        </div>
      </Shell>
    );
  }

  if (phase === "quiz") {
    const cur = FINDER_Q[qi];
    const pctDone = (qi / FINDER_Q.length) * 100;
    return (
      <Shell>
        <Bar />
        <div className="px-5 pt-5 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={back}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-opacity hover:opacity-60"
              style={{ color: "var(--h-faint)" }}
            >
              <Icon name="arrowLeft" size={13} /> Zurück
            </button>
            <span className="font-mono text-[11px]" style={{ color: "var(--h-faint)" }}>
              Frage {qi + 1} von {FINDER_Q.length}
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--h-line)" }}>
            <div
              style={{
                width: pctDone + "%",
                height: "100%",
                background: "var(--h-accent)",
                transition: "width .3s ease",
              }}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col px-5 py-6">
          <h3
            className="font-bold mb-5"
            style={{ color: "var(--h-ink)", fontSize: "20px", letterSpacing: "-0.01em", lineHeight: 1.2 }}
          >
            {cur.q}
          </h3>
          <div className="flex flex-col gap-2.5">
            {cur.opts.map((o) => (
              <FinderOption key={o.v} label={o.l} onClick={() => pick(cur.key, o.v)} />
            ))}
          </div>
        </div>
      </Shell>
    );
  }

  // result
  const r = recommend(ans);
  return (
    <Shell>
      <Bar />
      <div
        className="px-5 py-3 flex items-center justify-between shrink-0"
        style={{ borderBottom: "1px solid var(--h-line)" }}
      >
        <span className="inline-flex items-center gap-2 text-[13px] font-bold" style={{ color: "var(--h-accent-ink)" }}>
          <Icon name="check" size={16} /> {r.mode === "stack" ? "Dein Konto-Stack" : "Deine Empfehlung"}
        </span>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-opacity hover:opacity-60"
          style={{ color: "var(--h-muted)" }}
        >
          <Icon name="repeat" size={13} /> Neu starten
        </button>
      </div>
      <div className="flex-1 overflow-auto px-5 py-5">
        {r.mode === "stack" ? (
          <div className="space-y-2.5">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--h-faint)" }}>
              {r.stackHint}
            </div>
            <ResultBank id={r.primary} role="Spezial-Konto" />
            <div className="flex justify-center">
              <Icon name="layers" size={16} style={{ color: "var(--h-faint)" }} />
            </div>
            {r.second && <ResultBank id={r.second} role="Zweites Konto" />}
          </div>
        ) : (
          <ResultBank id={r.primary} />
        )}

        <div className="mt-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2.5" style={{ color: "var(--h-faint)" }}>
            Warum für dich
          </div>
          <ul className="space-y-2">
            {r.reasons.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[13.5px] leading-relaxed"
                style={{ color: "var(--h-ink)" }}
              >
                <Icon name="check" size={15} className="mt-0.5 shrink-0" style={{ color: "var(--h-accent-ink)" }} />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="mt-5 rounded-xl p-3.5 flex gap-2.5"
          style={{ background: "var(--h-tint)", border: "1px solid var(--h-line)" }}
        >
          <Icon name="shieldAlert" size={15} style={{ color: "#b07a1e", flexShrink: 0, marginTop: 1 }} />
          <div>
            <span className="text-[12px] font-bold" style={{ color: "var(--h-ink)" }}>
              Ehrlich dazu:{" "}
            </span>
            <span className="text-[12.5px] leading-relaxed" style={{ color: "var(--h-muted)" }}>
              {r.cantDo}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2.5 text-[12.5px]" style={{ color: "var(--h-muted)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--h-faint)" }}>
            Fast genauso gut
          </span>
          <Link
            href={hrefFor("steckbrief", { id: r.alt })}
            className="inline-flex items-center gap-1 font-semibold transition-opacity hover:opacity-60"
            style={{ color: "var(--h-accent-ink)" }}
          >
            {BANK_BY_ID[r.alt].name} <Icon name="arrowRight" size={13} />
          </Link>
        </div>
      </div>
      <div
        className="px-5 py-4 flex flex-col sm:flex-row gap-2.5 shrink-0"
        style={{ borderTop: "1px solid var(--h-line)" }}
      >
        <Btn className="flex-1 justify-center" icon="arrowUpRight" href={BANK_BY_ID[r.primary].url}>
          Zum Anbieter
        </Btn>
        <Btn
          kind="ghost"
          className="flex-1 justify-center"
          onClick={() => router.push(hrefFor("steckbrief", { id: r.primary }))}
        >
          Zum Steckbrief
        </Btn>
      </div>
    </Shell>
  );
}
