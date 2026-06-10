"use client";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Icon, type IconName } from "./icons";

type Kind = "primary" | "dark" | "ghost";

const STYLES: Record<Kind, CSSProperties> = {
  primary: {
    background: "#c115b4",
    color: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 10px 28px -10px rgba(193,21,180,0.42)",
  },
  dark: {
    background: "var(--h-ink)",
    color: "var(--h-bg)",
    borderRadius: "999px",
  },
  ghost: {
    border: "2px solid #c115b4",
    color: "var(--h-ink)",
    background: "var(--h-card)",
    borderRadius: "8px",
  },
};

const BASE =
  "inline-flex items-center gap-2 text-[16px] font-semibold whitespace-nowrap transition-all px-7 hover:brightness-105 active:brightness-95";

export function Btn({
  kind = "primary",
  children,
  onClick,
  href,
  className = "",
  icon = "arrowRight",
  iconLeft,
}: {
  kind?: Kind;
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: IconName | null;
  iconLeft?: IconName;
}) {
  const style: CSSProperties = { height: "56px", ...STYLES[kind] };
  const inner = (
    <>
      {iconLeft && <Icon name={iconLeft} size={18} />}
      {children}
      {!iconLeft && icon && <Icon name={icon} size={18} />}
    </>
  );
  if (href) {
    // External providers and first-party affiliate redirects (/go/<id>) render
    // as a plain anchor: real top-level navigation, opens in a new tab, no Link
    // prefetch (which would trigger the redirect). The /go/ path keeps the
    // affiliate target out of the DOM so ad blockers don't strip the button.
    if (/^https?:\/\//.test(href) || href.startsWith("/go/")) {
      return (
        <a
          href={href}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={BASE + " " + className}
          style={style}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={BASE + " " + className} style={style}>
        {inner}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={BASE + " " + className} style={style}>
      {inner}
    </button>
  );
}
