"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/data";
import { hrefFor } from "@/lib/routes";
import { Container, LiveDot } from "./ui";
import { Icon } from "./icons";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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
            neo<span style={{ color: "#c115b4" }}>radar</span>
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
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid place-items-center -mr-1 h-11 w-11 rounded-xl"
            style={{ color: "var(--h-ink)" }}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
          >
            <Icon name={open ? "x" : "menu"} size={24} />
          </button>
        </Container>
        {open && (
          <div className="md:hidden" style={{ borderTop: "1px solid var(--h-line)", background: "var(--h-card)" }}>
            <Container className="py-2 flex flex-col">
              {NAV.map((l) => {
                const active = isActive(l.id);
                return (
                  <Link
                    key={l.id}
                    href={hrefFor(l.id)}
                    onClick={() => setOpen(false)}
                    className="py-3.5 text-[17px] transition-opacity hover:opacity-60"
                    style={{
                      color: active ? "var(--h-ink)" : "var(--h-muted)",
                      fontWeight: active ? 700 : 500,
                      borderBottom: "1px solid var(--h-line)",
                    }}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </Container>
          </div>
        )}
      </div>
    </header>
  );
}
