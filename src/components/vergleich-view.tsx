"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Icon } from "./icons";
import {
  Container,
  PageHead,
  Monogram,
  TypeChip,
  Stars,
  Badge,
  SicherungChip,
  Disclaimer,
  ZinsDisclaimer,
} from "./ui";
import { BANKS, FILTERS, eur } from "@/lib/data";
import { hrefFor } from "@/lib/routes";

const VCOLS =
  "grid-cols-1 lg:grid-cols-[1.7fr_0.85fr_1.25fr_1.15fr_auto]";

type SortField = "fee" | "rate";

function FilterTabs({
  active,
  onChange,
  counts,
}: {
  active: string;
  onChange: (id: string) => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((f) => {
        const on = f.id === active;
        return (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            className="rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors flex items-center gap-1.5"
            style={
              on
                ? { background: "var(--h-ink)", color: "var(--h-bg)" }
                : { background: "var(--h-card)", color: "var(--h-muted)", border: "1px solid var(--h-line)" }
            }
          >
            {f.label}
            <span className="font-mono tabular-nums text-[11px]" style={{ opacity: 0.62 }}>
              {counts[f.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function VergleichView() {
  const params = useSearchParams();
  const initialFilter = params.get("filter") || "alle";
  const [active, setActive] = useState(
    FILTERS.some((f) => f.id === initialFilter) ? initialFilter : "alle",
  );
  const [sort, setSort] = useState<{ field: SortField; dir: "asc" | "desc" }>({
    field: "rate",
    dir: "desc",
  });

  const counts = useMemo(
    () =>
      Object.fromEntries(
        FILTERS.map((f) => [
          f.id,
          f.id === "alle" ? BANKS.length : BANKS.filter((b) => b.cats.includes(f.id)).length,
        ]),
      ) as Record<string, number>,
    [],
  );

  const rows = useMemo(() => {
    const list = active === "alle" ? BANKS.slice() : BANKS.filter((b) => b.cats.includes(active));
    const dir = sort.dir === "asc" ? 1 : -1;
    return list.sort((a, b) => (a[sort.field] - b[sort.field]) * dir);
  }, [active, sort]);

  const onSort = (field: SortField) =>
    setSort((s) =>
      s.field === field
        ? { field, dir: s.dir === "asc" ? "desc" : "asc" }
        : { field, dir: field === "fee" ? "asc" : "desc" },
    );

  const arrow = (f: SortField) =>
    sort.field === f ? (
      <span>{sort.dir === "asc" ? "↑" : "↓"}</span>
    ) : (
      <Icon name="sort" size={12} style={{ opacity: 0.4 }} />
    );

  return (
    <section>
      <Container className="pt-14 pb-8 lg:pt-20">
        <PageHead
          kicker="Die Vergleichsmatrix"
          title="Zehn Banken, zwei Welten. Ein ehrlicher Blick."
          lead="Sieben Neobanken treffen auf drei digitale Klassiker. Wir vergleichen nicht den Preis im Schaufenster, sondern was im Alltag zählt: die dritte Bargeldabhebung, die Einlagensicherung und welcher Zins auch nach dem Neukunden-Halbjahr noch gilt."
        />
      </Container>
      <Container className="pb-20">
        <div className="mb-6">
          <ZinsDisclaimer />
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <FilterTabs active={active} onChange={setActive} counts={counts} />
          <div
            className="font-mono text-[11px] uppercase tracking-[0.12em] whitespace-nowrap"
            style={{ color: "var(--h-faint)" }}
          >
            {rows.length} Konten
          </div>
        </div>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "var(--h-card)",
            border: "1px solid var(--h-line)",
            boxShadow: "0 1px 2px rgba(20,18,12,0.04), 0 18px 40px -26px rgba(20,18,12,0.18)",
          }}
        >
          <div
            className={"hidden lg:grid " + VCOLS + " gap-4 px-6 py-3.5"}
            style={{ borderBottom: "1px solid var(--h-line)", background: "var(--h-tint)" }}
          >
            <div
              className="font-mono text-[11px] uppercase tracking-[0.12em] self-center"
              style={{ color: "var(--h-faint)" }}
            >
              Anbieter
            </div>
            <button
              onClick={() => onSort("fee")}
              className="font-mono text-[11px] uppercase tracking-[0.12em] self-center flex items-center gap-1.5"
              style={{ color: sort.field === "fee" ? "var(--h-ink)" : "var(--h-faint)" }}
            >
              Preis / Mt. {arrow("fee")}
            </button>
            <div
              className="font-mono text-[11px] uppercase tracking-[0.12em] self-center"
              style={{ color: "var(--h-faint)" }}
            >
              Sicherung
            </div>
            <button
              onClick={() => onSort("rate")}
              className="font-mono text-[11px] uppercase tracking-[0.12em] self-center flex items-center gap-1.5"
              style={{ color: sort.field === "rate" ? "var(--h-ink)" : "var(--h-faint)" }}
            >
              Zins p. a. {arrow("rate")}
            </button>
            <div
              className="font-mono text-[11px] uppercase tracking-[0.12em] self-center text-right"
              style={{ color: "var(--h-faint)" }}
            >
              Profil
            </div>
          </div>
          {rows.map((b, i) => (
            <Link
              key={b.id}
              href={hrefFor("steckbrief", { id: b.id })}
              className={"w-full text-left grid " + VCOLS + " gap-4 px-6 py-5 items-center transition-colors"}
              style={{ borderTop: i ? "1px solid var(--h-line)" : "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--h-tint)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div className="flex items-center gap-3.5">
                <Monogram size={44}>{b.mono}</Monogram>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[16px] font-bold" style={{ color: "var(--h-ink)" }}>
                      {b.name}
                    </span>
                    <TypeChip typ={b.typ} />
                  </div>
                  <div className="text-[14px] mt-1" style={{ color: "var(--h-muted)" }}>
                    „{b.blurb}“
                  </div>
                  <div className="mt-1.5">
                    <Stars value={b.rating} />
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="text-[20px] font-bold tabular-nums leading-none"
                  style={{ color: b.fee === 0 ? "var(--h-accent-ink)" : "var(--h-ink)" }}
                >
                  {eur(b.fee)}
                </div>
                <div className="text-[12px] mt-1.5" style={{ color: "var(--h-faint)" }}>
                  {b.feeNote}
                </div>
                {b.feeCond && (
                  <div className="text-[11px] mt-1 leading-snug" style={{ color: "#b07a1e" }}>
                    {b.feeCond}
                  </div>
                )}
              </div>
              <div className="self-center">
                <SicherungChip id={b.sicherung} />
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="font-mono tabular-nums text-[18px] font-bold" style={{ color: "var(--h-ink)" }}>
                  {b.rateLabel}
                </span>
                <Badge>{b.highlight}</Badge>
              </div>
              <div
                className="lg:justify-self-end inline-flex items-center gap-1.5 rounded-full h-10 px-4 text-[13.5px] font-semibold whitespace-nowrap"
                style={{ background: "var(--h-ink)", color: "var(--h-bg)" }}
              >
                Steckbrief <Icon name="arrowRight" size={14} />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Disclaimer>
            <strong style={{ color: "var(--h-ink)" }}>
              Nicht alle Anbieter sind gleich abgesichert.
            </strong>{" "}
            N26, C24, bunq, Trade Republic, DKB und ING unterliegen der gesetzlichen deutschen
            Einlagensicherung bis 100.000 € (DKB &amp; ING zusätzlich der erweiterten
            Verbundsicherung), Tomorrow über die Partnerbank Solaris. Openbank läuft über die
            spanische, Revolut über die litauische, bunq über die niederländische Sicherung. Vivid
            ist ein{" "}
            <strong style={{ color: "var(--h-ink)" }}>
              E-Geld-Institut ohne gesetzliche Einlagensicherung
            </strong>
            , Kundengelder werden getrennt verwahrt, das ist aber nicht dasselbe.
          </Disclaimer>
        </div>
        <div className="mt-4 font-mono text-[11px]" style={{ color: "var(--h-faint)" }}>
          * Zinsen variabel, Stand Juni 2026, vor Launch verifizieren. „0 € mit Bedingung“
          (DKB/ING) wird nie wie bedingungslos kostenlos gewertet.
        </div>
      </Container>
    </section>
  );
}
