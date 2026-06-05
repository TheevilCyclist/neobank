import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./icons";
import { SICHERUNG, type SicherungId } from "@/lib/data";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={"mx-auto max-w-[1180px] px-6 lg:px-8 " + className}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className = "",
  center,
}: {
  children: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <div
      className={
        "font-mono text-[11px] uppercase tracking-[0.2em] " +
        (center ? "flex justify-center " : "") +
        className
      }
      style={{ color: "var(--h-accent-ink)" }}
    >
      <span className="inline-flex items-center gap-2">{children}</span>
    </div>
  );
}

export function LiveDot({ color }: { color?: string }) {
  const c = color || "var(--h-accent)";
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
        style={{ background: c }}
      />
      <span
        className="relative inline-flex h-1.5 w-1.5 rounded-full"
        style={{ background: c }}
      />
    </span>
  );
}

export function Badge({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: "accent" | "muted";
}) {
  const s: CSSProperties =
    tone === "accent"
      ? {
          background: "var(--h-accent-soft)",
          color: "var(--h-accent-ink)",
          border: "1px solid var(--h-accent-line)",
        }
      : {
          background: "var(--h-tint)",
          color: "var(--h-muted)",
          border: "1px solid var(--h-line)",
        };
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium whitespace-nowrap"
      style={s}
    >
      <span
        className="h-1 w-1 rounded-full"
        style={{ background: tone === "accent" ? "var(--h-accent)" : "var(--h-faint)" }}
      />
      {children}
    </span>
  );
}

export function TypeChip({ typ }: { typ: string }) {
  return (
    <span
      className="font-mono text-[10px] uppercase tracking-[0.14em] px-1.5 py-0.5 rounded"
      style={{ background: "var(--h-tint)", color: "var(--h-faint)" }}
    >
      {typ}
    </span>
  );
}

export function Monogram({
  children,
  size = 44,
}: {
  children: ReactNode;
  size?: number;
}) {
  return (
    <span
      className="grid place-items-center rounded-xl font-bold shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: "var(--h-ink)",
        color: "var(--h-bg)",
      }}
    >
      {children}
    </span>
  );
}

export function Stars({ value }: { value: number }) {
  return (
    <span
      className="inline-flex items-center gap-1 font-mono tabular-nums text-[12px]"
      style={{ color: "var(--h-faint)" }}
    >
      <Icon name="star" size={12} fill="var(--h-accent)" style={{ color: "var(--h-accent)" }} />
      {value.toLocaleString("de-DE", { minimumFractionDigits: 1 })}
    </span>
  );
}

export function SicherungChip({ id, full }: { id: SicherungId; full?: boolean }) {
  const s = SICHERUNG[id];
  const col =
    s.tone === "ok"
      ? "var(--h-accent-ink)"
      : s.tone === "warn"
      ? "#b07a1e"
      : "#b4452f";
  const icon = s.tone === "risk" ? "shieldAlert" : "shieldCheck";
  return (
    <span
      className={"inline-flex items-center gap-1.5 " + (full ? "text-[13px]" : "text-[12px]")}
      style={{ color: col }}
    >
      <Icon name={icon} size={full ? 15 : 13} />
      {s.label}
    </span>
  );
}

export function PageHead({
  kicker,
  title,
  lead,
  center,
}: {
  kicker: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center max-w-[44rem] mx-auto" : "max-w-[48rem]"}>
      <Eyebrow center={center}>{kicker}</Eyebrow>
      <h1
        className={"font-bold mt-4 " + (center ? "mx-auto" : "")}
        style={{
          color: "var(--h-ink)",
          fontSize: "clamp(30px,4.4vw,52px)",
          lineHeight: 1.06,
          letterSpacing: "-0.025em",
        }}
      >
        {title}
      </h1>
      {lead && (
        <p
          className={"mt-5 text-[17.5px] leading-relaxed " + (center ? "mx-auto" : "")}
          style={{ color: "var(--h-muted)", maxWidth: "42rem" }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

export function Disclaimer({
  children,
  tone = "warn",
}: {
  children: ReactNode;
  tone?: "warn" | "risk";
}) {
  const col = tone === "risk" ? "#b4452f" : "#9a7320";
  const bg = tone === "risk" ? "rgba(180,69,47,0.06)" : "rgba(154,115,32,0.07)";
  const icon = tone === "risk" ? "shieldAlert" : "shieldCheck";
  return (
    <div
      className="rounded-2xl p-5 flex gap-3.5 text-[13.5px] leading-relaxed"
      style={{
        background: bg,
        border:
          "1px solid " +
          (tone === "risk" ? "rgba(180,69,47,0.2)" : "rgba(154,115,32,0.22)"),
        color: "var(--h-muted)",
      }}
    >
      <Icon name={icon} size={18} style={{ color: col, flexShrink: 0, marginTop: 1 }} />
      <div>{children}</div>
    </div>
  );
}
