"use client";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import {
  Container,
  Eyebrow,
  Monogram,
  TypeChip,
  Stars,
  SicherungChip,
  ZinsDisclaimer,
} from "./ui";
import { Btn } from "./button";
import { BANK_BY_ID, SICHERUNG, eur, type Bank } from "@/lib/data";
import { hrefFor } from "@/lib/routes";

function FaqRow({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ borderBottom: "1px solid var(--h-line)" }}>
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 py-5 text-left">
        <span className="text-[16px] font-semibold" style={{ color: "var(--h-ink)" }}>
          {q}
        </span>
        <span
          className="grid place-items-center h-8 w-8 rounded-full shrink-0 transition-transform"
          style={{
            border: "1px solid var(--h-line-strong)",
            color: "var(--h-muted)",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          <Icon name="x" size={14} style={{ transform: open ? "none" : "rotate(45deg)" }} />
        </span>
      </button>
      <div style={{ maxHeight: open ? "240px" : "0", overflow: "hidden", transition: "max-height .24s ease" }}>
        <p className="pb-5 text-[15px] leading-relaxed max-w-[46rem]" style={{ color: "var(--h-muted)" }}>
          {a}
        </p>
      </div>
    </div>
  );
}

export function SteckbriefView({ bank }: { bank: Bank }) {
  const b = bank;
  const [openFaq, setOpenFaq] = useState(0);
  const alts = (b.alternativen || []).map((aid) => BANK_BY_ID[aid]).filter(Boolean);

  return (
    <article>
      <Container className="pt-8">
        <Link
          href={hrefFor("vergleich")}
          className="inline-flex items-center gap-2 text-[13.5px] font-medium transition-opacity hover:opacity-60"
          style={{ color: "var(--h-muted)" }}
        >
          <Icon name="arrowLeft" size={15} /> Zurück zum Vergleich
        </Link>
      </Container>

      {/* hero */}
      <Container className="pt-8 pb-10 lg:pt-10 lg:pb-14">
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-10 lg:gap-14 items-start">
          <div>
            <div className="flex items-center gap-4">
              <Monogram size={56}>{b.mono}</Monogram>
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[24px] font-bold" style={{ color: "var(--h-ink)" }}>
                    {b.name}
                  </span>
                  <TypeChip typ={b.typ} />
                </div>
                <div className="text-[14px] mt-1 flex items-center gap-1.5" style={{ color: "var(--h-muted)" }}>
                  {b.tarif} · <Stars value={b.rating} />
                </div>
              </div>
            </div>
            <Eyebrow className="mt-8">Steckbrief · Unser Winkel</Eyebrow>
            <h1
              className="font-bold mt-4"
              style={{
                color: "var(--h-ink)",
                fontSize: "clamp(28px,4vw,48px)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
              }}
            >
              {b.thesis}
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed max-w-[40rem]" style={{ color: "var(--h-muted)" }}>
              {b.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn icon="arrowUpRight" href={b.url}>
                Zum Anbieter
              </Btn>
              <Btn kind="ghost" icon="arrowRight" href={hrefFor("ratgeber-konto-stack")}>
                Im Konto-Stack nutzen
              </Btn>
            </div>
          </div>
          {/* quick facts */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "var(--h-card)", border: "1px solid var(--h-line)", boxShadow: "0 1px 2px rgba(20,18,12,0.04)" }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-4" style={{ color: "var(--h-faint)" }}>
              Auf einen Blick
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5 pb-5" style={{ borderBottom: "1px solid var(--h-line)" }}>
              <div>
                <div
                  className="text-[22px] font-bold tabular-nums"
                  style={{ color: b.fee === 0 ? "var(--h-accent-ink)" : "var(--h-ink)" }}
                >
                  {eur(b.fee)}
                </div>
                <div className="text-[12px] mt-1" style={{ color: "var(--h-faint)" }}>
                  {b.feeNote}
                </div>
              </div>
              <div>
                <div className="text-[22px] font-bold tabular-nums" style={{ color: "var(--h-ink)" }}>
                  {b.rateLabel}
                </div>
                <div className="text-[12px] mt-1" style={{ color: "var(--h-faint)" }}>
                  Guthabenzins
                </div>
              </div>
            </div>
            <div className="space-y-2.5">
              {b.daten.map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-4 text-[13.5px]">
                  <span style={{ color: "var(--h-faint)" }}>{k}</span>
                  <span className="text-right font-medium" style={{ color: "var(--h-ink)" }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--h-line)" }}>
              <ZinsDisclaimer variant="subtle" />
            </div>
          </div>
        </div>
      </Container>

      {/* für wen / nicht */}
      <Container className="py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl p-7" style={{ background: "var(--h-card)", border: "1px solid var(--h-line)" }}>
            <div className="inline-flex items-center gap-2 text-[13px] font-bold mb-4" style={{ color: "var(--h-accent-ink)" }}>
              <Icon name="check" size={16} /> Für wen?
            </div>
            <ul className="space-y-2.5">
              {b.forWhom.map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-[15px]" style={{ color: "var(--h-ink)" }}>
                  <Icon name="check" size={16} className="mt-0.5 shrink-0" style={{ color: "var(--h-accent-ink)" }} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl p-7" style={{ background: "var(--h-tint)", border: "1px solid var(--h-line)" }}>
            <div className="inline-flex items-center gap-2 text-[13px] font-bold mb-4" style={{ color: "var(--h-muted)" }}>
              <Icon name="x" size={16} /> Für wen nicht?
            </div>
            <ul className="space-y-2.5">
              {b.notForWhom.map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-[15px]" style={{ color: "var(--h-muted)" }}>
                  <Icon name="x" size={16} className="mt-0.5 shrink-0" style={{ color: "var(--h-faint)" }} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* alltagstest */}
      <Container className="py-12 lg:py-16">
        <div className="max-w-[40rem] mb-8">
          <Eyebrow>Alltagstest</Eyebrow>
          <h2 className="font-bold mt-4" style={{ color: "var(--h-ink)", fontSize: "clamp(24px,3vw,36px)", letterSpacing: "-0.02em" }}>
            Drei Szenarien aus der Praxis.
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          {b.alltag.map(([t, d], i) => (
            <div key={t} className="rounded-2xl p-6" style={{ background: "var(--h-card)", border: "1px solid var(--h-line)" }}>
              <div className="font-mono tabular-nums text-[13px] mb-3" style={{ color: "var(--h-accent-ink)" }}>
                0{i + 1}
              </div>
              <h3 className="text-[16.5px] font-bold" style={{ color: "var(--h-ink)" }}>
                {t}
              </h3>
              <p className="text-[14px] leading-relaxed mt-2" style={{ color: "var(--h-muted)" }}>
                {d}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* sicherheit */}
      <Container className="py-12 lg:py-16">
        <div
          className="rounded-2xl p-7 lg:p-9 grid lg:grid-cols-[0.4fr_0.6fr] gap-8"
          style={{ background: "var(--h-tint)", border: "1px solid var(--h-line)" }}
        >
          <div>
            <Eyebrow>Sicherheit &amp; Lizenz</Eyebrow>
            <div className="mt-4">
              <SicherungChip id={b.sicherung} full />
            </div>
          </div>
          <p className="text-[15.5px] leading-relaxed self-center" style={{ color: "var(--h-muted)" }}>
            {SICHERUNG[b.sicherung].note}. Was die einzelnen Sicherungsmodelle im Insolvenzfall
            praktisch bedeuten, erklären wir nüchtern im{" "}
            <Link
              href={hrefFor("ratgeber-einlagensicherung-neobanken")}
              className="font-semibold underline underline-offset-2"
              style={{ color: "var(--h-accent-ink)" }}
            >
              Einlagensicherungs-Ratgeber
            </Link>
            .
          </p>
        </div>
      </Container>

      {/* fazit + alternativen */}
      <Container className="py-12 lg:py-16">
        <div className="grid lg:grid-cols-[1fr_0.7fr] gap-8 lg:gap-12">
          <div>
            <Eyebrow>Fazit</Eyebrow>
            <p
              className="mt-4 text-[20px] lg:text-[23px] leading-snug font-medium"
              style={{ color: "var(--h-ink)", letterSpacing: "-0.01em" }}
            >
              {b.fazit}
            </p>
            <div
              className="mt-6 inline-flex items-center gap-2.5 rounded-xl px-4 py-3 text-[14px]"
              style={{ background: "var(--h-accent-soft)", color: "var(--h-accent-ink)", border: "1px solid var(--h-accent-line)" }}
            >
              <Icon name="layers" size={16} />{" "}
              <span>
                <strong>Stack-Rolle:</strong> {b.stackRole}
              </span>
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-3" style={{ color: "var(--h-faint)" }}>
              Alternativen
            </div>
            <div className="space-y-3">
              {alts.map((a) => (
                <Link
                  key={a.id}
                  href={hrefFor("steckbrief", { id: a.id })}
                  className="w-full flex items-center gap-3.5 rounded-xl p-4 text-left transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--h-card)", border: "1px solid var(--h-line)" }}
                >
                  <Monogram size={40}>{a.mono}</Monogram>
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-bold" style={{ color: "var(--h-ink)" }}>
                      {a.name}
                    </div>
                    <div className="text-[12.5px] truncate" style={{ color: "var(--h-muted)" }}>
                      „{a.blurb}“
                    </div>
                  </div>
                  <Icon name="arrowRight" size={16} style={{ color: "var(--h-faint)" }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* faq */}
      <Container className="py-12 lg:py-16">
        <div className="max-w-[40rem] mb-6">
          <Eyebrow>Häufige Fragen</Eyebrow>
          <h2 className="font-bold mt-4" style={{ color: "var(--h-ink)", fontSize: "clamp(24px,3vw,36px)", letterSpacing: "-0.02em" }}>
            {b.name} — kurz beantwortet.
          </h2>
        </div>
        <div style={{ borderTop: "1px solid var(--h-line)" }}>
          {b.faq.map(([q, a], i) => (
            <FaqRow
              key={q}
              q={q}
              a={a}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
            />
          ))}
        </div>
      </Container>

      {/* cta */}
      <Container className="py-16 lg:py-24 text-center">
        <h2
          className="font-bold mx-auto max-w-[20ch]"
          style={{ color: "var(--h-ink)", fontSize: "clamp(26px,3.6vw,42px)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
        >
          Passt {b.name} zu deinem Leben?
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Btn icon="arrowUpRight" href={b.url}>
            Zum Anbieter
          </Btn>
          <Btn kind="ghost" href={hrefFor("vergleich")}>
            Weiter vergleichen
          </Btn>
        </div>
      </Container>
    </article>
  );
}
