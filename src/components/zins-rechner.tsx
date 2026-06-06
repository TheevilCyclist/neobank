"use client";
import { useState } from "react";
import { BANKS, eur, pct } from "@/lib/data";
import { Container, Eyebrow, Monogram, ZinsDisclaimer } from "./ui";
import { Icon } from "./icons";

// ── Zentrale Zins-Quelle ──────────────────────────────────────────────────
// Top-3-Zins-Anbieter dynamisch aus der Matrix (data.ts = Single Source of
// Truth). So bleibt der Rechner automatisch synchron mit Vergleichstabelle und
// Steckbriefen. Sollen hier feste Schaukasten-Werte stehen statt der Matrix,
// genügt es, TOP3 durch ein Literal-Array { name, mono, rate } zu ersetzen.
const TOP3 = [...BANKS]
  .sort((a, b) => b.rate - a.rate)
  .slice(0, 3)
  .map((b) => ({ name: b.name, mono: b.mono, rate: b.rate }));

// Visueller Kontrast: klassische Hausbank ohne Verzinsung.
const HAUSBANK = { name: "Klassische Hausbank", mono: "H", rate: 0 };

const fmtAmount = (n: number) => n.toLocaleString("de-DE") + " €";
const perYear = (amount: number, rate: number) => eur((amount * rate) / 100) + " / Jahr";

function ResultRow({
  mono,
  name,
  rate,
  amount,
  muted,
}: {
  mono: string;
  name: string;
  rate: number;
  amount: number;
  muted?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3"
      style={
        muted
          ? { background: "transparent", border: "1px dashed var(--h-line-strong)" }
          : { background: "var(--h-tint)", border: "1px solid var(--h-line)" }
      }
    >
      {muted ? (
        <span
          className="grid place-items-center rounded-xl font-bold shrink-0 text-[12px]"
          style={{ width: 36, height: 36, background: "var(--h-card)", color: "var(--h-faint)", border: "1px solid var(--h-line)" }}
        >
          {mono}
        </span>
      ) : (
        <Monogram size={36}>{mono}</Monogram>
      )}
      <div className="min-w-0 flex-1">
        <div className="text-[14.5px] font-bold" style={{ color: muted ? "var(--h-muted)" : "var(--h-ink)" }}>
          {name}
        </div>
        <div className="font-mono text-[11.5px]" style={{ color: "var(--h-faint)" }}>
          {pct(rate)} p. a.
        </div>
      </div>
      <div
        className="font-mono tabular-nums text-[15px] font-bold text-right whitespace-nowrap"
        style={{ color: muted ? "var(--h-faint)" : "var(--h-accent-ink)" }}
      >
        {perYear(amount, rate)}
      </div>
    </div>
  );
}

// Die eigentliche Rechner-Karte (Slider + Live-Tabelle). Zustand wird vom
// Eltern-Element gehalten, damit beide Layout-Varianten (und mehrere Instanzen
// im selben DOM) sauber unabhängig funktionieren.
function ZinsRechnerCard({ amount, setAmount }: { amount: number; setAmount: (n: number) => void }) {
  return (
    <div
      className="rounded-2xl p-6 lg:p-7"
      style={{
        background: "var(--h-card)",
        border: "1px solid var(--h-line)",
        boxShadow: "0 1px 2px rgba(20,18,12,0.04), 0 18px 40px -26px rgba(20,18,12,0.18)",
      }}
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--h-faint)" }}>
        Dein Guthaben
      </div>
      <div
        className="text-[40px] lg:text-[44px] font-bold tabular-nums mt-1 leading-none"
        style={{ color: "var(--h-ink)", letterSpacing: "-0.02em" }}
      >
        {fmtAmount(amount)}
      </div>
      <input
        type="range"
        min={0}
        max={50000}
        step={500}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        aria-label="Guthaben in Euro"
        className="w-full mt-5 cursor-pointer"
        style={{ accentColor: "var(--h-accent)" }}
      />
      <div className="flex justify-between font-mono text-[11px] mt-1" style={{ color: "var(--h-faint)" }}>
        <span>0 €</span>
        <span>50.000 €</span>
      </div>

      <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] mb-2.5" style={{ color: "var(--h-faint)" }}>
        Das zahlen sie dir
      </div>
      <div className="space-y-2.5">
        {TOP3.map((b) => (
          <ResultRow key={b.name} mono={b.mono} name={b.name} rate={b.rate} amount={amount} />
        ))}
        <ResultRow mono={HAUSBANK.mono} name={HAUSBANK.name} rate={HAUSBANK.rate} amount={amount} muted />
      </div>

      <div className="mt-5">
        <ZinsDisclaimer variant="subtle" />
      </div>
    </div>
  );
}

/**
 * Wiederverwendbarer Guthabenzins-Rechner.
 * - Standard (`embedded={false}`): volle Sektion mit Headline links + Karte rechts (Startseite).
 * - `embedded`: nur die Karte, passend für die Content-Spalte einer Ratgeberseite.
 */
export function ZinsRechner({ embedded = false }: { embedded?: boolean }) {
  const [amount, setAmount] = useState(10000);

  if (embedded) {
    return (
      <div className="mt-8">
        <ZinsRechnerCard amount={amount} setAmount={setAmount} />
      </div>
    );
  }

  const best = TOP3[0];
  const bestGain = (amount * best.rate) / 100;

  return (
    <section className="py-16 lg:py-24" style={{ borderTop: "1px solid var(--h-line)" }}>
      <Container>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
          <div>
            <Eyebrow>
              <Icon name="percent" size={13} /> Zins-Rechner
            </Eyebrow>
            <h2
              className="font-bold mt-4"
              style={{
                color: "var(--h-ink)",
                fontSize: "clamp(28px,3.6vw,44px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              Was bringt dir dein Guthaben wirklich?
            </h2>
            <p className="mt-4 text-[16.5px] leading-relaxed max-w-[32rem]" style={{ color: "var(--h-muted)" }}>
              Schiebe den Regler auf dein aktuelles Erspartes und sieh im Live-Radar, was die
              Neobanken dir im Jahr zahlen, im Vergleich zu 0 % bei der klassischen Hausbank.
            </p>
            <div
              className="mt-7 hidden lg:inline-flex items-center gap-2.5 rounded-xl px-4 py-3 text-[14px]"
              style={{ background: "var(--h-accent-soft)", color: "var(--h-accent-ink)", border: "1px solid var(--h-accent-line)" }}
            >
              <Icon name="trendingUp" size={16} />
              <span>
                Bis zu <strong className="tabular-nums">{eur(bestGain)}</strong> mehr pro Jahr als bei 0 %.
              </span>
            </div>
          </div>

          <ZinsRechnerCard amount={amount} setAmount={setAmount} />
        </div>
      </Container>
    </section>
  );
}
