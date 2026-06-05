"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/data";
import { hrefFor } from "@/lib/routes";
import { Container, LiveDot } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (id: string) => {
    if (id === "vergleich") return pathname.startsWith("/vergleich");
    if (id === "banken") return pathname.startsWith("/steckbrief");
    if (id === "ratgeber") return pathname.startsWith("/ratgeber");
    return false;
  };

  return (
    <header className="sticky top-0 z-40">
      <div style={{ background: "var(--h-ink)" }}>
        <Container className="h-8 flex items-center justify-center gap-3">
          <LiveDot color="var(--h-accent-bright)" />
          <span
            className="font-mono text-[10.5px] uppercase tracking-[0.2em] whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            Echtzeit · Stand Juni 2026
          </span>
          <span
            className="hidden sm:inline font-mono text-[10.5px] uppercase tracking-[0.2em] whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            · Unabhängiges Vergleichsportal
          </span>
        </Container>
      </div>
      <div
        style={{
          background: "var(--h-nav)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--h-line)",
        }}
      >
        <Container className="h-[66px] flex items-center justify-between gap-6">
          <Link
            href="/"
            className="text-[19px] font-bold tracking-tight"
            style={{ color: "var(--h-ink)" }}
          >
            neoradar<span style={{ color: "var(--h-faint)" }}>.de</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium">
            {NAV.map((l) => {
              const active = isActive(l.id);
              return (
                <Link
                  key={l.id}
                  href={hrefFor(l.id)}
                  className="transition-opacity hover:opacity-60"
                  style={{
                    color: active ? "var(--h-ink)" : "var(--h-muted)",
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </Container>
      </div>
    </header>
  );
}
