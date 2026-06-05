"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Icon } from "./icons";

const COOKIE = "neoradar-consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 Tage
const OPEN_EVENT = "neoradar:open-cookie-settings";

// Read the cookie (external, non-React state) during render — no effect needed.
const subscribe = () => () => {};
const hasConsentClient = () =>
  document.cookie.split("; ").some((c) => c.startsWith(COOKIE + "="));
const hasConsentServer = () => true; // SSR: assume decided → banner stays hidden

function consentValue(): "all" | "essential" | null {
  const m = document.cookie.split("; ").find((c) => c.startsWith(COOKIE + "="));
  if (!m) return null;
  const v = m.split("=")[1];
  return v === "all" ? "all" : "essential";
}

const btnBase =
  "inline-flex items-center justify-center h-11 px-5 text-[14px] font-semibold whitespace-nowrap transition-all hover:brightness-105 active:brightness-95";

const PRIMARY: CSSProperties = {
  background: "#c115b4",
  color: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 10px 28px -10px rgba(193,21,180,0.42)",
};
const GHOST: CSSProperties = {
  border: "2px solid #c115b4",
  color: "var(--h-ink)",
  background: "var(--h-card)",
  borderRadius: "8px",
};

function Toggle({
  on,
  onChange,
  disabled,
}: {
  on: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!on)}
      className="relative shrink-0 transition-colors"
      style={{
        width: 38,
        height: 22,
        borderRadius: 999,
        background: on ? "var(--h-accent)" : "var(--h-line-strong)",
        opacity: disabled ? 0.55 : 1,
        cursor: disabled ? "default" : "pointer",
      }}
    >
      <span
        className="absolute rounded-full transition-all"
        style={{
          top: 2,
          left: on ? 18 : 2,
          width: 18,
          height: 18,
          background: "#fff",
          boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
        }}
      />
    </button>
  );
}

function SettingsRow({
  title,
  desc,
  on,
  onChange,
  fixed,
}: {
  title: string;
  desc: string;
  on: boolean;
  onChange?: (v: boolean) => void;
  fixed?: boolean;
}) {
  return (
    <div
      className="flex items-start justify-between gap-4 rounded-xl p-4"
      style={{ background: "var(--h-tint)", border: "1px solid var(--h-line)" }}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-bold" style={{ color: "var(--h-ink)" }}>
            {title}
          </span>
          {fixed && (
            <span
              className="font-mono text-[9.5px] uppercase tracking-[0.14em]"
              style={{ color: "var(--h-accent-ink)" }}
            >
              Immer aktiv
            </span>
          )}
        </div>
        <p className="text-[12.5px] leading-relaxed mt-1" style={{ color: "var(--h-muted)" }}>
          {desc}
        </p>
      </div>
      <Toggle on={on} onChange={onChange} disabled={fixed} />
    </div>
  );
}

export function CookieBanner() {
  const consentSet = useSyncExternalStore(subscribe, hasConsentClient, hasConsentServer);
  const [dismissed, setDismissed] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  const [view, setView] = useState<"main" | "settings">("main");
  const [analytics, setAnalytics] = useState(false);

  // Re-open from anywhere (e.g. footer link) via a window event.
  useEffect(() => {
    const open = () => {
      setAnalytics(consentValue() === "all");
      setView("settings");
      setForceOpen(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const save = (value: "all" | "essential") => {
    document.cookie = `${COOKIE}=${value}; max-age=${MAX_AGE}; path=/; SameSite=Lax`;
    // Google Consent Mode: Analytics nur bei "all" freigeben
    window.gtag?.("consent", "update", {
      analytics_storage: value === "all" ? "granted" : "denied",
    });
    setDismissed(true);
    setForceOpen(false);
    setView("main");
  };

  const visible = forceOpen || (!consentSet && !dismissed);
  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-5"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-Einwilligung"
    >
      <div className="mx-auto max-w-[1180px]">
        <div
          className="rounded-2xl p-5 lg:p-6"
          style={{
            background: "var(--h-card)",
            border: "1px solid var(--h-line)",
            boxShadow:
              "0 24px 60px -24px rgba(20,18,12,0.40), 0 8px 24px -12px rgba(20,18,12,0.20)",
          }}
        >
          {view === "main" ? (
            <div className="flex flex-col lg:flex-row lg:items-center gap-5">
              <div className="flex gap-3.5 flex-1">
                <span
                  className="grid place-items-center h-10 w-10 rounded-xl shrink-0"
                  style={{
                    background: "var(--h-accent-soft)",
                    color: "var(--h-accent-ink)",
                    border: "1px solid var(--h-accent-line)",
                  }}
                >
                  <Icon name="lock" size={19} />
                </span>
                <div>
                  <div className="text-[15px] font-bold" style={{ color: "var(--h-ink)" }}>
                    Cookies &amp; Einwilligung
                  </div>
                  <p
                    className="mt-1 text-[13.5px] leading-relaxed"
                    style={{ color: "var(--h-muted)" }}
                  >
                    Wir verwenden notwendige Cookies für den Betrieb der Seite und — nur mit deiner
                    Einwilligung — Google Analytics, um die Nutzung zu verstehen. Du kannst deine
                    Wahl jederzeit ändern. Mehr in der{" "}
                    <Link
                      href="/datenschutz"
                      className="font-medium underline underline-offset-2"
                      style={{ color: "var(--h-accent-ink)" }}
                    >
                      Datenschutzerklärung
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                <button
                  onClick={() => {
                    setAnalytics(consentValue() === "all");
                    setView("settings");
                  }}
                  className={btnBase}
                  style={GHOST}
                >
                  Einstellungen
                </button>
                <button onClick={() => save("essential")} className={btnBase} style={GHOST}>
                  Nur notwendige
                </button>
                <button onClick={() => save("all")} className={btnBase} style={PRIMARY}>
                  Alle akzeptieren
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <Icon name="lock" size={18} style={{ color: "var(--h-accent-ink)" }} />
                <div className="text-[15px] font-bold" style={{ color: "var(--h-ink)" }}>
                  Cookie-Einstellungen
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-2.5">
                <SettingsRow
                  title="Notwendige"
                  desc="Für den Betrieb der Seite erforderlich (z. B. das Speichern deiner Cookie-Wahl). Lassen sich nicht deaktivieren."
                  on
                  fixed
                />
                <SettingsRow
                  title="Statistik · Google Analytics"
                  desc="Hilft uns, die Nutzung der Seite anonymisiert zu verstehen. Nur mit deiner Einwilligung."
                  on={analytics}
                  onChange={setAnalytics}
                />
              </div>
              <div className="mt-5 flex flex-col sm:flex-row sm:justify-end gap-2.5">
                <button onClick={() => save("essential")} className={btnBase} style={GHOST}>
                  Nur notwendige
                </button>
                <button
                  onClick={() => save(analytics ? "all" : "essential")}
                  className={btnBase}
                  style={PRIMARY}
                >
                  Auswahl speichern
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Footer trigger to re-open the settings at any time.
export function CookieSettingsButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className="text-left transition-opacity hover:opacity-60"
      style={{ color: "var(--h-muted)" }}
    >
      Cookie-Einstellungen
    </button>
  );
}
