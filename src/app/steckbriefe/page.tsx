import Link from "next/link";
import {
  Container,
  PageHead,
  Monogram,
  Stars,
  SicherungChip,
} from "@/components/ui";
import { BANKS, type Bank } from "@/lib/data";
import { hrefFor } from "@/lib/routes";

export const metadata = {
  title: "Steckbriefe — Zehn Banken, zehn klare Winkel | neobank.de",
};

function BankCard({ b }: { b: Bank }) {
  return (
    <Link
      href={hrefFor("steckbrief", { id: b.id })}
      className="text-left rounded-2xl p-6 flex flex-col transition-transform hover:-translate-y-0.5"
      style={{ background: "var(--h-card)", border: "1px solid var(--h-line)" }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Monogram size={44}>{b.mono}</Monogram>
          <div>
            <div className="text-[16px] font-bold" style={{ color: "var(--h-ink)" }}>
              {b.name}
            </div>
            <div className="text-[12.5px] mt-0.5" style={{ color: "var(--h-faint)" }}>
              {b.tarif}
            </div>
          </div>
        </div>
        <Stars value={b.rating} />
      </div>
      <p className="text-[14.5px] leading-snug mt-4 font-medium flex-1" style={{ color: "var(--h-ink)" }}>
        {b.thesis}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <SicherungChip id={b.sicherung} />
        <span className="font-mono tabular-nums text-[14px] font-bold" style={{ color: "var(--h-accent-ink)" }}>
          {b.rateLabel}
        </span>
      </div>
    </Link>
  );
}

export default function SteckbriefePage() {
  const neo = BANKS.filter((b) => b.typ !== "Klassiker");
  const klass = BANKS.filter((b) => b.typ === "Klassiker");
  return (
    <section>
      <Container className="pt-14 pb-10 lg:pt-20">
        <PageHead
          kicker="Steckbriefe"
          title="Zehn Banken, zehn klare Winkel."
          lead="Jede Bank bekommt bei uns einen eigenen redaktionellen Blick — mit ehrlichem „Für wen nicht“ statt Hochglanz-Prosa."
        />
      </Container>
      <Container className="pb-20">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--h-faint)" }}>
            Neobanken
          </span>
          <span className="flex-1 h-px" style={{ background: "var(--h-line)" }} />
          <span className="font-mono text-[11px]" style={{ color: "var(--h-faint)" }}>
            {neo.length}
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {neo.map((b) => (
            <BankCard key={b.id} b={b} />
          ))}
        </div>
        <div className="flex items-center gap-3 mb-5 mt-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--h-faint)" }}>
            Digitale Klassiker
          </span>
          <span className="flex-1 h-px" style={{ background: "var(--h-line)" }} />
          <span className="font-mono text-[11px]" style={{ color: "var(--h-faint)" }}>
            {klass.length}
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {klass.map((b) => (
            <BankCard key={b.id} b={b} />
          ))}
        </div>
      </Container>
    </section>
  );
}
