import { Icon } from "./icons";
import { ZinsRechner } from "./zins-rechner";
import type { Block } from "@/lib/data";

export function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case "h2":
      return (
        <h2
          className="font-bold mt-12 mb-4"
          style={{ color: "var(--h-ink)", fontSize: "clamp(22px,2.8vw,32px)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
        >
          {b.x}
        </h2>
      );
    case "p":
      return (
        <p className="text-[17px] leading-[1.75] mt-5" style={{ color: "var(--h-muted)" }}>
          {b.x}
        </p>
      );
    case "lead":
      return (
        <p
          className="text-[19px] lg:text-[21px] leading-[1.65] mt-6 font-medium"
          style={{ color: "var(--h-ink)", letterSpacing: "-0.01em" }}
        >
          {b.x}
        </p>
      );
    case "callout":
      return (
        <div className="mt-8 rounded-2xl p-6 lg:p-7" style={{ background: "var(--h-accent-soft)", border: "1px solid var(--h-accent-line)" }}>
          <div
            className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.16em] mb-3"
            style={{ color: "var(--h-accent-ink)" }}
          >
            <Icon name={b.icon || "layers"} size={14} /> {b.label}
          </div>
          <p className="text-[16px] leading-relaxed" style={{ color: "var(--h-ink)" }}>
            {b.x}
          </p>
        </div>
      );
    case "steps":
      return (
        <ol className="mt-8 space-y-3">
          {b.items.map((s, i) => (
            <li key={i} className="flex gap-4 rounded-xl p-4" style={{ background: "var(--h-card)", border: "1px solid var(--h-line)" }}>
              <span
                className="grid place-items-center h-8 w-8 rounded-full font-bold text-[14px] shrink-0"
                style={{ background: "var(--h-ink)", color: "var(--h-bg)" }}
              >
                {i + 1}
              </span>
              <span className="text-[15.5px] leading-relaxed self-center" style={{ color: "var(--h-muted)" }}>
                {s}
              </span>
            </li>
          ))}
        </ol>
      );
    case "list":
      return (
        <ul className="mt-6 space-y-2.5">
          {b.items.map((x, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[16px] leading-relaxed" style={{ color: "var(--h-muted)" }}>
              <Icon name="check" size={17} className="mt-1 shrink-0" style={{ color: "var(--h-accent-ink)" }} />
              {x}
            </li>
          ))}
        </ul>
      );
    case "stackcard":
      return (
        <div className="mt-6 rounded-2xl p-6" style={{ background: "var(--h-card)", border: "1px solid var(--h-line)" }}>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="grid place-items-center h-10 w-10 rounded-xl"
              style={{ background: "var(--h-accent-soft)", color: "var(--h-accent-ink)" }}
            >
              <Icon name={b.icon} size={19} />
            </span>
            <h3 className="text-[18px] font-bold" style={{ color: "var(--h-ink)" }}>
              {b.title}
            </h3>
          </div>
          <p className="text-[15.5px] leading-relaxed" style={{ color: "var(--h-muted)" }}>
            {b.x}
          </p>
        </div>
      );
    case "keyvals":
      return (
        <div className="mt-6 rounded-2xl p-6" style={{ background: "var(--h-card)", border: "1px solid var(--h-line)" }}>
          <div className="flex items-center gap-3 mb-4">
            {b.icon && (
              <span
                className="grid place-items-center h-10 w-10 rounded-xl shrink-0"
                style={{ background: "var(--h-accent-soft)", color: "var(--h-accent-ink)" }}
              >
                <Icon name={b.icon} size={19} />
              </span>
            )}
            <h3 className="text-[18px] font-bold" style={{ color: "var(--h-ink)" }}>
              {b.title}
            </h3>
          </div>
          <dl className="space-y-3">
            {b.rows.map((r, i) => (
              <div key={i}>
                <dt className="text-[13.5px] font-bold" style={{ color: "var(--h-ink)" }}>
                  {r[0]}
                </dt>
                <dd className="text-[14.5px] leading-relaxed mt-0.5" style={{ color: "var(--h-muted)" }}>
                  {r[1]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case "zinsrechner":
      return <ZinsRechner embedded />;
    case "coltable":
      return (
        <div className="mt-8 rounded-2xl overflow-hidden" style={{ border: "1px solid var(--h-line)" }}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[14px]" style={{ minWidth: 460 }}>
              <thead>
                <tr style={{ background: "var(--h-tint)" }}>
                  {b.head.map((h, i) => (
                    <th
                      key={i}
                      className="text-left font-semibold px-4 py-3 whitespace-nowrap"
                      style={{ color: "var(--h-faint)", borderBottom: "1px solid var(--h-line)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, ri) => (
                  <tr key={ri} style={{ borderTop: ri ? "1px solid var(--h-line)" : "none", background: "var(--h-card)" }}>
                    {r.map((c, ci) => (
                      <td
                        key={ci}
                        className={"px-4 py-3 whitespace-nowrap " + (ci === 0 ? "font-semibold" : "font-mono tabular-nums")}
                        style={{ color: ci === 0 ? "var(--h-ink)" : c.includes("−") ? "#b4452f" : "var(--h-muted)" }}
                      >
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "table":
      return (
        <div className="mt-8 rounded-2xl overflow-hidden" style={{ border: "1px solid var(--h-line)" }}>
          {b.rows.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-[0.9fr_1.1fr] gap-4 px-5 py-3.5 text-[14.5px]"
              style={{
                background: i === 0 ? "var(--h-tint)" : "var(--h-card)",
                borderTop: i ? "1px solid var(--h-line)" : "none",
              }}
            >
              <span className="font-semibold" style={{ color: i === 0 ? "var(--h-faint)" : "var(--h-ink)" }}>
                {r[0]}
              </span>
              <span style={{ color: "var(--h-muted)" }}>{r[1]}</span>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}
