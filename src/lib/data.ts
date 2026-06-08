// neoradar.de, Datenmodell (10 Banken, IA, Inhalte). Stand Juni 2026, illustrativ.
// Alle Konditionen plausibel gesetzt, vor Launch verifizieren.
import type { IconName } from "@/components/icons";

export type SicherungTone = "ok" | "warn" | "risk";

export interface SicherungModel {
  label: string;
  note: string;
  tone: SicherungTone;
}

export interface Bank {
  id: string;
  url: string;
  name: string;
  mono: string;
  typ: string;
  tarif: string;
  fee: number;
  feeNote: string;
  feeCond?: string;
  rate: number;
  rateLabel: string;
  blurb: string;
  highlight: string;
  hero: boolean;
  rating: number;
  sicherung: SicherungId;
  cats: string[];
  thesis: string;
  intro: string;
  forWhom: string[];
  notForWhom: string[];
  daten: [string, string][];
  alltag: [string, string][];
  fazit: string;
  stackRole: string;
  alternativen: string[];
  faq: [string, string][];
}

export interface UseCase {
  id: string;
  icon: IconName;
  title: string;
  sub: string;
  target: { view: string; filter?: string };
}

export interface Filter {
  id: string;
  label: string;
}

export interface RatgeberMeta {
  id: string;
  kicker: string;
  title: string;
  teaser: string;
  read: string;
}

// ---- Navigation ----
export const NAV: { id: string; label: string }[] = [
  { id: "vergleich", label: "Vergleich" },
  { id: "banken", label: "Steckbriefe" },
  { id: "ratgeber", label: "Ratgeber" },
];

// ---- Use-Cases (Fallback-Einstieg für Selbst-Navigierer) ----
export const USECASES: UseCase[] = [
  { id: "wechseln", icon: "repeat", title: "Hauptkonto wechseln", sub: "In 12 Werktagen umgezogen", target: { view: "ratgeber-hauptkonto-wechseln" } },
  { id: "reisen", icon: "plane", title: "Viel unterwegs", sub: "0 % Fremdwährung, weltweit abheben", target: { view: "vergleich", filter: "reisen" } },
  // Vorerst ausgeblendet, da die zugehörigen Artikel noch unveröffentlicht sind:
  // { id: "selbststaendig", icon: "briefcase", title: "Selbstständig", sub: "Sub-IBANs für Steuern & Rücklagen", target: { view: "ratgeber-konto-selbststaendige" } },
  // { id: "gemeinschaft", icon: "users", title: "Konto teilen", sub: "Modelle für Paare & WGs", target: { view: "ratgeber-gemeinschaftskonto" } },
  { id: "nachhaltig", icon: "leaf", title: "Nachhaltig banken", sub: "Klimaneutrales Banking", target: { view: "ratgeber-nachhaltige-neobank" } },
  { id: "system", icon: "scale", title: "Fintech oder etablierte Bank?", sub: "Neobank vs. DKB, ING & Co.", target: { view: "ratgeber-neobank-oder-direktbank" } },
  { id: "zinsen", icon: "percent", title: "Sparen & Zinsen", sub: "Guthabenzinsen im Vergleich", target: { view: "vergleich", filter: "zinsen" } },
];

// ---- Filter-Tabs der Vergleichsmatrix ----
export const FILTERS: Filter[] = [
  { id: "alle", label: "Alle" },
  { id: "neobanken", label: "Neobanken" },
  { id: "klassiker", label: "Digitale Klassiker" },
  { id: "zinsen", label: "Zinsen" },
  { id: "reisen", label: "Reisen" },
  { id: "gemeinschaft", label: "Gemeinschaftskonto" },
  { id: "unterkonten", label: "Unterkonten" },
  { id: "premium", label: "Premium" },
  { id: "lizenz", label: "Vollbanklizenz" },
];

// ---- Sicherungs-Modelle ----
export type SicherungId =
  | "de_voll"
  | "de_plus"
  | "partner"
  | "lt"
  | "nl"
  | "es"
  | "egeld";

export const SICHERUNG: Record<SicherungId, SicherungModel> = {
  de_voll: { label: "Deutsche Einlagensicherung", note: "Eigene Vollbanklizenz · gesetzlich bis 100.000 €", tone: "ok" },
  de_plus: { label: "Deutsche Sicherung + Verbund", note: "Gesetzlich bis 100.000 € · zusätzlich erweiterte Verbundsicherung", tone: "ok" },
  partner: { label: "Partnerbank (Solaris)", note: "Sicherung läuft über die Partnerbank, bis 100.000 €", tone: "ok" },
  lt: { label: "Litauische Einlagensicherung", note: "EU-Richtlinie bis 100.000 € · anderes Sicherungsvermögen", tone: "warn" },
  nl: { label: "Niederländische Einlagensicherung", note: "EU-Richtlinie bis 100.000 € · anderes Sicherungsvermögen", tone: "warn" },
  es: { label: "Spanische Einlagensicherung", note: "EU-Richtlinie bis 100.000 € · Santander-Gruppe", tone: "warn" },
  egeld: { label: "E-Geld-Institut", note: "Keine gesetzliche Einlagensicherung · Gelder getrennt verwahrt", tone: "risk" },
};

// ---- Banken (10) ----
export const BANKS: Bank[] = [
  {
    id: "c24", url: "https://www.c24.de/", name: "C24", mono: "C", typ: "Neobank", tarif: "Smart", fee: 0, feeNote: "dauerhaft kostenlos",
    rate: 0.5, rateLabel: "bis 0,5 %", blurb: "Cashback im Check24-Ökosystem", highlight: "Check24-Ökosystem", hero: true,
    rating: 4.7, sicherung: "de_voll", cats: ["neobanken", "unterkonten", "lizenz", "gemeinschaft"],
    thesis: "Das Check24-Konto: Cashback statt Spitzenzins.",
    intro: "Der Guthabenzins ist 2026 auf 0,5 % gefallen, die einstige Zins-Krone ist weg. Was bleibt, ist das Check24-Ökosystem mit Pockets und Cashback. Der Preis: Du bewegst dich in einem Kosmos, der vom Querverkauf lebt. Wir zeigen, wie du die Vorteile mitnimmst, ohne Vertrags-Upselling mitzukaufen.",
    forWhom: ["Check24-Nutzer", "Pockets-Sparer", "Cashback-Jäger"],
    notForWhom: ["Zins-Maximierer", "Wer maximale Daten-Sparsamkeit will", "Wer einen Auslandsschwerpunkt hat"],
    daten: [["Kontoführung", "0 € / Monat"], ["Guthabenzins", "bis 0,5 % p. a. (variabel)"], ["Karte", "Visa Debit, Apple/Google Pay"], ["Unterkonten", "bis 3 Pockets"], ["Lizenz", "Vollbank, deutsche Einlagensicherung"]],
    alltag: [["Zins-Setup", "Guthaben wird ab dem ersten Euro verzinst, aktuell aber nur 0,5 %, kein separates Tagesgeldkonto nötig."], ["Pockets als Sparziele", "Bis zu drei Töpfe; gut für Rücklagen, auch wenn der Zins mager ist."], ["Cashback-Strecke", "Über das Check24-Ökosystem; lohnt nur bei aktiver Nutzung."]],
    fazit: "Die einstige Zins-Spitze ist 2026 abgeschmolzen, C24 punktet jetzt eher mit Cashback und Pockets als mit dem Guthabenzins. Wer das Maximum will, schaut auf ING oder Trade Republic.",
    stackRole: "Spezialkonto fürs Check24-Ökosystem (Cashback & Pockets).",
    alternativen: ["trade-republic", "ing"],
    faq: [["Wie hoch ist der Zins?", "Aktuell bis 0,5 % p. a., variabel und an die EZB-Einlagenfazilität gekoppelt, die frühere Spitze ist abgeschmolzen. Wir prüfen die Konditionen laufend."], ["Brauche ich ein Tagesgeldkonto?", "Nein, das Guthaben wird direkt auf dem Girokonto verzinst."], ["Wie sicher ist mein Geld?", "C24 hat eine deutsche Vollbanklizenz, gesetzliche Einlagensicherung bis 100.000 €."]],
  },
  {
    id: "trade-republic", url: "https://traderepublic.com/de-de", name: "Trade Republic", mono: "T", typ: "Neobank/Broker", tarif: "Girokonto", fee: 0, feeNote: "dauerhaft kostenlos",
    rate: 3.0, rateLabel: "3,0 % ab 1. €", blurb: "Zinsen + Depot in einer App", highlight: "Zins + Depot", hero: true,
    rating: 4.4, sicherung: "de_voll", cats: ["neobanken", "zinsen", "lizenz"],
    thesis: "Der Broker, der ein Girokonto wurde.",
    intro: "Seit der Vollbanklizenz ist Trade Republic mehr als ein Neobroker: deutsche IBAN, Visa, 3 % Zinsen ab dem ersten Euro ohne Obergrenze, SEPA Instant. Damit zählt es 2026 zur Zins-Spitze und ist stark für alle, die Sparen und Investieren in einer App wollen.",
    forWhom: ["Sparer mit ETF-Plan", "App-affine Einsteiger", "Wer Konto & Depot bündeln will"],
    notForWhom: ["Unterkonten-Fans (keine Pockets)", "Gemeinschaftskonto-Suchende"],
    daten: [["Kontoführung", "0 € / Monat"], ["Guthabenzins", "3,0 % ab dem ersten Euro, ohne Limit"], ["Karte", "Visa, SEPA Instant"], ["Depot", "Aktien, ETFs, Sparpläne integriert"], ["Lizenz", "Vollbank, deutsche Einlagensicherung"]],
    alltag: [["Zins ohne Limit", "3 % gelten ab dem ersten Euro, kein Staffelmodell."], ["Geldmarktfonds-Frage", "Ein Teil des Guthabens liegt ggf. im Fonds; relevant für die Einlagensicherung."], ["Sparen + Investieren", "Dauerauftrag plus ETF-Sparplan in einer App."]],
    fazit: "Die beste Wahl, wenn Konto und Depot zusammengehören sollen, mit ehrlichem Blick auf die Geldmarktfonds-Konstruktion.",
    stackRole: "Hauptkonto im Zins-Stack mit Depot-Anbindung.",
    alternativen: ["c24", "n26"],
    faq: [["Gilt der Zins wirklich unbegrenzt?", "3 % gelten ab dem ersten Euro ohne Obergrenze, Stand Juni 2026, variabel."], ["Liegt mein Geld in einem Fonds?", "Teilweise; wir erklären im Einlagensicherungs-Ratgeber, was das bedeutet."], ["Gibt es Unterkonten?", "Nein, derzeit keine Pockets oder Sub-IBANs."]],
  },
  {
    id: "n26", url: "https://n26.com/de-de", name: "N26", mono: "N", typ: "Neobank", tarif: "Standard", fee: 0, feeNote: "dauerhaft kostenlos",
    rate: 0.0, rateLabel: "0,00 %", blurb: "Beste App-User-Experience", highlight: "Beste App-UX", hero: true,
    rating: 4.6, sicherung: "de_voll", cats: ["neobanken", "premium", "unterkonten", "lizenz"],
    thesis: "Das Default-Konto, das du hinterfragen solltest.",
    intro: "N26 ist für viele die erste Neobank und die App setzt bis heute den UX-Maßstab. Aber: Beim Guthabenzins ist 2026 Schluss (aktuell 0 %), und wer Bargeld-intensiv lebt, zahlt den Komfort mit Opportunitätskosten.",
    forWhom: ["App-Puristen", "Einsteiger", "Gehaltskonto-Nutzer"],
    notForWhom: ["Zins-Maximierer", "Bargeld-Fans (CASH26-Limits)", "Gemeinschaftskonto-Suchende"],
    daten: [["Kontoführung", "0 € / Monat (Standard)"], ["Guthabenzins", "0,00 % p. a. (aktuell keine Verzinsung)"], ["Karte", "Virtuelle Mastercard Debit, Apple/Google Pay"], ["Unterkonten", "Spaces (Sharing möglich)"], ["Lizenz", "Vollbank, deutsche Einlagensicherung"]],
    alltag: [["Gehaltseingang & Push", "Echtzeit-Benachrichtigung bei jeder Buchung."], ["Abhebung im Ausland", "Im Gratistarif limitiert; Metal erweitert das Limit."], ["Spaces als Budgettöpfe", "Unterkonten zum Sparen, optional geteilt."]],
    fazit: "Das komfortabelste Einsteiger-Konto, als Hauptkonto stark, beim Zins mit 0 % aber das Schlusslicht. Oft ist ein Zins-Zweitkonto die bessere Antwort als ein Metal-Upgrade.",
    stackRole: "Hauptkonto fürs Gehalt (App-Komfort).",
    alternativen: ["c24", "trade-republic"],
    faq: [["Lohnt sich N26 Metal?", "Nur bei hohem Bargeld-/Reisebedarf, wir rechnen es im Steckbrief vor."], ["Gibt es ein Gemeinschaftskonto?", "Kein echtes; nur Spaces-Sharing zwischen Konten."], ["Wie hoch ist der Zins?", "Aktuell 0 % p. a., N26 verzinst das Guthaben derzeit nicht (Stand Juni 2026)."]],
  },
  {
    id: "bunq", url: "https://www.bunq.com/de", name: "bunq", mono: "b", typ: "Neobank", tarif: "Easy Bank", fee: 3.99, feeNote: "pro Monat",
    rate: 2.01, rateLabel: "bis 2,01 %", blurb: "Bis zu 25 Unterkonten mit eigener IBAN", highlight: "25 Sub-IBANs", hero: true,
    rating: 4.3, sicherung: "nl", cats: ["neobanken", "unterkonten", "premium", "gemeinschaft"],
    thesis: "25 IBANs: Das Konto als Ordnungssystem.",
    intro: "bunq ist die einzige Bank im Radar, die das Konto als Datei-System denkt: bis zu 25 Unterkonten mit eigener IBAN. Das kostet 3,99 €/Monat und ist für drei Gruppen jeden Cent wert: WGs, Paare mit Drei-Konten-Modell und Selbstständige mit Steuer-Pocket.",
    forWhom: ["WGs", "Paare mit Drei-Konten-Modell", "Selbstständige mit Steuer-Pocket"],
    notForWhom: ["Wer ein simples Gratiskonto sucht", "Minimalisten (Overkill)"],
    daten: [["Kontoführung", "3,99 € / Monat (Easy Bank)"], ["Guthabenzins", "bis 2,01 % p. a. (variabel)"], ["Unterkonten", "bis 25 mit eigener IBAN"], ["Karte", "Maestro/Mastercard, Apple/Google Pay"], ["Lizenz", "Niederländische Banklizenz & Einlagensicherung"]],
    alltag: [["Sub-IBAN je Zweck", "Eine IBAN für Miete, eine für Sparen, eine für Steuern."], ["WG-Aufteilung", "Gemeinsame Töpfe mit getrennten IBANs, faire Abrechnung."], ["Steuer-Pocket", "19 % jeder Rechnung sofort umbuchen."]],
    fazit: "Für strukturierte Köpfe und Selbstständige jeden Cent wert, für alle anderen Overkill.",
    stackRole: "Struktur-Konto im Selbstständigen-Stack.",
    alternativen: ["n26", "c24"],
    faq: [["Warum kostet bunq Geld?", "Die 3,99 €/Monat finanzieren die 25 Sub-IBANs und Features, lohnt nur bei aktivem Bedarf."], ["Ist mein Geld sicher?", "bunq unterliegt der niederländischen Einlagensicherung bis 100.000 €."], ["Eignet sich bunq fürs Gemeinschaftskonto?", "Ja, über geteilte Unterkonten, siehe Gemeinschaftskonto-Ratgeber."]],
  },
  {
    id: "revolut", url: "https://www.revolut.com/de-DE/", name: "Revolut", mono: "R", typ: "Neobank", tarif: "Standard", fee: 0, feeNote: "dauerhaft kostenlos",
    rate: 2.0, rateLabel: "bis 2,0 %", blurb: "Perfekt für Reisen & Ausland", highlight: "Top für Reisen", hero: true,
    rating: 4.4, sicherung: "lt", cats: ["neobanken", "reisen", "premium"],
    thesis: "Das Reise-Schweizermesser, als Zweitkonto.",
    intro: "30+ Währungen, Wechselkurse nahe Interbank, Wochenend-Aufschlag als Kleingedrucktes. Unsere klare Empfehlung: Revolut nicht als Hauptkonto, sondern als Reise-Modul im Konto-Stack.",
    forWhom: ["Vielreisende", "Fremdwährungs-Nutzer", "Krypto-Neugierige"],
    notForWhom: ["Gehaltskonto-Traditionalisten (litauische IBAN)", "Wer Wert auf deutsche Sicherung legt"],
    daten: [["Kontoführung", "0 € / Monat (Standard)"], ["Währungen", "30+ Währungen, Interbank-nah"], ["Karte", "Visa/Mastercard, virtuelle Karten"], ["Wochenende", "Aufschlag beim Tausch am Wochenende"], ["Lizenz", "Litauische Banklizenz & Einlagensicherung"]],
    alltag: [["10-Tage-Fernreise", "Hausbank vs. Revolut = dreistellige Ersparnis."], ["Budget vorab laden", "Per Instant-Überweisung aufs Reisekonto."], ["IBAN-Diskriminierung", "Litauische IBAN kann bei Lastschriften haken."]],
    fazit: "Als Reise-Modul brillant, als Hauptkonto wegen der LT-IBAN mit Vorsicht zu genießen.",
    stackRole: "Reise-Modul im Reise-Stack.",
    alternativen: ["dkb", "n26"],
    faq: [["Kann ich Revolut als Gehaltskonto nutzen?", "Möglich, aber manche Arbeitgeber/Lastschriften haken bei der LT-IBAN."], ["Was kostet der Geldwechsel?", "Werktags nahe Interbank; am Wochenende mit Aufschlag."], ["Wie ist die Einlagensicherung?", "Litauische Sicherung bis 100.000 € nach EU-Richtlinie."]],
  },
  {
    id: "vivid", url: "https://vivid.money/de-de/", name: "Vivid", mono: "V", typ: "Neobank", tarif: "Standard", fee: 0, feeNote: "dauerhaft kostenlos",
    rate: 3.0, rateLabel: "Zins-Pocket 3,0 %", blurb: "Cashback & Trading", highlight: "Cashback & Trading", hero: false,
    rating: 4.0, sicherung: "egeld", cats: ["neobanken", "premium"],
    thesis: "Cashback und Zins-Pockets, für Finanz-Tüftler, nicht für Jedermann.",
    intro: "Vivid belohnt aktives Management: Cashback auf Lastschriften, Zins-Pockets über Geldmarktfonds, integriertes Trading. Der entscheidende Unterschied: Vivid ist ein E-Geld-Institut, keine gesetzliche Einlagensicherung.",
    forWhom: ["Finanz-Tüftler", "Cashback-Jäger", "Trading-Neugierige"],
    notForWhom: ["Wer gesetzliche Einlagensicherung braucht", "Set-and-forget-Sparer"],
    daten: [["Kontoführung", "0 € / Monat (Standard)"], ["Zins", "bis 3,0 % über Geldmarktfonds-Pockets (Basiszins niedrig)"], ["Cashback", "auf ausgewählte Lastschriften"], ["Trading", "Aktien & Krypto integriert"], ["Lizenz", "E-Geld-Institut, keine gesetzliche Einlagensicherung"]],
    alltag: [["Zins-Pocket", "Verzinsung läuft über Fonds, nicht über Guthabenzins."], ["Cashback-Logik", "Belohnt aktive Nutzung, nicht Parken."], ["Segregation", "Kundengelder getrennt verwahrt, anders als Einlagensicherung."]],
    fazit: "Spannend für aktive Tüftler, aber das E-Geld-Modell ohne gesetzliche Einlagensicherung muss man bewusst wählen.",
    stackRole: "Optionales Spezialkonto für Cashback/Trading.",
    alternativen: ["trade-republic", "revolut"],
    faq: [["Ist Vivid eine Bank?", "Nein, ein E-Geld-Institut. Gelder werden getrennt verwahrt, es gibt keine gesetzliche Einlagensicherung."], ["Wie funktioniert der Zins?", "Über Geldmarktfonds-Pockets, der Basis-Guthabenzins ist niedrig."], ["Für wen lohnt sich Vivid?", "Für aktive Nutzer mit Cashback- und Trading-Interesse."]],
  },
  {
    id: "tomorrow", url: "https://www.tomorrow.one/", name: "Tomorrow", mono: "T", typ: "Neobank", tarif: "Now", fee: 0, feeNote: "dauerhaft kostenlos",
    rate: 2.5, rateLabel: "bis 2,5 %", blurb: "Klimaneutrales Banking aus Hamburg", highlight: "Klimaneutral", hero: false,
    rating: 4.2, sicherung: "partner", cats: ["neobanken"],
    thesis: "Was „nachhaltige Bank“ konkret heißt und was es kostet.",
    intro: "Tomorrow investiert Einlagen zu 100 % nachhaltig und ist klimaneutral, aber mit 2,5 % Zins und Limits bei Gratis-Abhebungen zahlst du gegenüber der Spitze eine messbare Haltungsprämie. Wir machen sie transparent.",
    forWhom: ["Nachhaltigkeits-Bewusste", "Hamburg-Fans", "Wer Impact über Zins stellt"],
    notForWhom: ["Zins-Maximierer", "Bargeld-Intensive"],
    daten: [["Kontoführung", "0 € / Monat (Now)"], ["Guthabenzins", "bis 2,5 % p. a. (variabel)"], ["Investition", "100 % nachhaltig, klimaneutral"], ["Karte", "Recycling-Karte mit CO₂-Tracking"], ["Lizenz", "über Partnerbank Solaris abgesichert"]],
    alltag: [["Haltungsprämie", "X € pro Jahr gegenüber der Zins-Spitze (ING), wir beziffern es."], ["CO₂-Tracking", "Ausgaben werden ökologisch eingeordnet."], ["Partnerbank-Modell", "Sicherung läuft über Solaris."]],
    fazit: "Ein sauberes Produkt für alle, die Nachhaltigkeit wirklich priorisieren, die Zinsdifferenz ist die bewusst gewählte Prämie.",
    stackRole: "Hauptkonto für Werte-orientierte Nutzer.",
    alternativen: ["c24", "n26"],
    faq: [["Wie nachhaltig ist Tomorrow wirklich?", "Einlagen werden nach eigenen Kriterien investiert; wir prüfen Zertifizierungen kritisch."], ["Wer sichert mein Geld?", "Die Partnerbank Solaris, bis 100.000 €."], ["Was kostet die Nachhaltigkeit?", "Die Zinsdifferenz zur Spitze, im Steckbrief in Euro/Jahr beziffert."]],
  },
  {
    id: "dkb", url: "https://www.dkb.de/", name: "DKB", mono: "D", typ: "Klassiker", tarif: "Girokonto", fee: 0, feeNote: "mit Aktivstatus", feeCond: "ab 700 € Geldeingang/Monat, sonst 4,50 €/Monat",
    rate: 1.0, rateLabel: "Tagesgeld 1,0 %", blurb: "Reise-Klassiker mit Aktivstatus", highlight: "Reise-Klassiker", hero: false,
    rating: 4.3, sicherung: "de_plus", cats: ["klassiker", "reisen", "lizenz", "gemeinschaft"],
    thesis: "Der Klassiker, der wie eine Neobank rechnet, wenn du Aktivkunde bist.",
    intro: "Die DKB ist mit über 5 Millionen Kunden einer der großen Direktbank-Klassiker und seit Jahren das Lieblingskonto von Vielreisenden: Visa Debit kostenlos, weltweit gebührenfrei bezahlen und abheben, Gemeinschaftskonto inklusive. Der Haken steckt im Aktivstatus.",
    forWhom: ["Gehaltskonto-Wechsler", "Vielreisende mit Einkommen", "Paare (echtes Gemeinschaftskonto)", "Sicherheitsbewusste"],
    notForWhom: ["Geringverdiener unter 700 € Eingang (über 28)", "Zins-Maximierer", "App-Puristen"],
    daten: [["Kontoführung", "0 € mit Aktivstatus, sonst 4,50 €/Monat"], ["Aktivstatus", "ab 700 € Geldeingang/Monat oder unter 28"], ["Tagesgeld", "1,0 % p. a. (variabel)"], ["Karte", "Visa Debit, weltweit gebührenfrei (Aktivkunde)"], ["Lizenz", "Deutsche Vollbank + Verbundsicherung"]],
    alltag: [["Aktivstatus-Logik", "Eigene Umbuchungen per Dauerauftrag zählen; Wertpapierumsätze nicht."], ["Abhebung Fernreise", "Weltweit gebührenfrei an Visa-Automaten."], ["Kontowechselservice", "Geführter Umzug von Gehalt & Lastschriften."]],
    fazit: "Ein starkes Hauptkonto für Reisende mit regelmäßigem Einkommen, der Aktivstatus ist die zentrale Bedingung.",
    stackRole: "Starkes Hauptkonto, kombiniert mit C24 (Zinsen) oder Revolut (Wochenend-Kurse).",
    alternativen: ["ing", "revolut"],
    faq: [["Wie werde ich Aktivkunde?", "Ab 700 € monatlichem Geldeingang oder Alter unter 28; eigene Umbuchungen per Dauerauftrag zählen."], ["Was kostet das Konto ohne Aktivstatus?", "4,50 €/Monat plus Fremdwährungsgebühr im Ausland."], ["Gibt es ein Gemeinschaftskonto?", "Ja, als Standardprodukt, anders als bei vielen Neobanken."]],
  },
  {
    id: "ing", url: "https://www.ing.de/", name: "ING", mono: "I", typ: "Klassiker", tarif: "Girokonto", fee: 0, feeNote: "ab 700 € Eingang", feeCond: "ab 700 € Geldeingang/Monat oder unter 28",
    rate: 3.2, rateLabel: "Aktionszins 3,2 %", blurb: "Marktführer-Allrounder", highlight: "Allrounder", hero: false,
    rating: 4.2, sicherung: "de_plus", cats: ["klassiker", "lizenz", "gemeinschaft"],
    thesis: "Der Marktführer-Allrounder: unaufgeregt, aber selten die Spitze.",
    intro: "Deutschlands größte Direktbank macht wenig falsch und wenig spektakulär: kostenloses Girokonto ab 700 € Geldeingang oder unter 28, große Automaten-Abdeckung über Visa, solides Banking ohne Überraschungen. Die Zins-Story läuft über das Extra-Konto.",
    forWhom: ["Wechsel-Skeptiker", "Hauptkonto-Suchende mit Gehalt", "Dispo-Nutzer (fairer Zins)"],
    notForWhom: ["Zins-Optimierer nach Aktionsende", "Vielreisende (Fremdwährungsgebühr)", "Unterkonten-Fans"],
    daten: [["Kontoführung", "0 € ab 700 € Eingang oder unter 28"], ["Extra-Konto", "Aktionszins bis 3,2 % für Neukunden, danach Basiszins"], ["Karte", "Visa Debit + Girocard optional"], ["Automaten", "große Abdeckung über Visa"], ["Lizenz", "Deutsche Vollbank + Verbundsicherung"]],
    alltag: [["Aktionszins-Verlauf", "Was bleibt nach dem Aktionszeitraum übrig?"], ["Dispo-Kosten", "Vergleichsweise fairer Dispozins."], ["App im Vergleich", "Solide, aber kein N26-Niveau."]],
    fazit: "Die sichere Wahl für alle, denen Neobanken zu jung und Filialbanken zu teuer sind, selten die beste Einzeldisziplin.",
    stackRole: "Unaufgeregtes Allround-Hauptkonto.",
    alternativen: ["dkb", "c24"],
    faq: [["Bleibt der Aktionszins dauerhaft?", "Nein, nach dem Aktionszeitraum gilt der Basiszins, wir tracken das."], ["Ist das Konto wirklich kostenlos?", "Ab 700 € Geldeingang/Monat oder unter 28; sonst fallen Gebühren an."], ["Gibt es Unterkonten?", "Nein, keine Pockets/Sub-IBANs wie bei Neobanken."]],
  },
  {
    id: "openbank", url: "https://www.openbank.de/", name: "Openbank", mono: "O", typ: "Klassiker", tarif: "Girokonto", fee: 0, feeNote: "bedingungslos kostenlos",
    rate: 0.2, rateLabel: "Tagesgeld 0,2 %", blurb: "Santander-Tochter mit Zins-Aktionen", highlight: "Zins-Aktionen", hero: false,
    rating: 4.0, sicherung: "es", cats: ["klassiker", "zinsen"],
    thesis: "Santanders Digitalbank: Zins-Aktionen mit spanischem Sicherungsnetz.",
    intro: "Openbank ist die Digitaltochter der Santander-Gruppe, eine „Neobank mit Konzernmutter“. Stärken: bedingungslos kostenloses Konto und gelegentliche Tagesgeld-Aktionen für Neukunden (Basiszins aktuell rund 0,2 %).",
    forWhom: ["Zins-Hopper", "Zweitkonto-Sucher", "Santander-Bestandskunden"],
    notForWhom: ["Wer ein deutsches Sicherungssystem priorisiert", "Feature-Maximierer"],
    daten: [["Kontoführung", "0 € / Monat (bedingungslos)"], ["Tagesgeld", "Aktionszins für Neukunden, danach Basiszins"], ["Karte", "Debit-Karte, Apple/Google Pay"], ["Mutter", "Santander-Gruppe"], ["Lizenz", "Spanische Einlagensicherung bis 100.000 €"]],
    alltag: [["Aktionszins", "Zeitlich befristet, aktuell rund 0,2 % Basiszins, wir tracken, was bleibt."], ["Spanisches Sicherungssystem", "Bis 100.000 €, aber andere Abwicklung als die deutsche EdB."], ["Kontoeröffnung", "Vollständig digital."]],
    fazit: "Interessant für Zins-Aktionen als Zweitkonto, das spanische Sicherungssystem sollte man bewusst einordnen.",
    stackRole: "Zweitkonto für Zins-Aktionen.",
    alternativen: ["c24", "ing"],
    faq: [["Wo ist mein Geld abgesichert?", "Über die spanische Einlagensicherung (Santander-Gruppe), bis 100.000 € nach EU-Richtlinie."], ["Sind die Top-Zinsen dauerhaft?", "Nein, meist befristete Aktionen, danach Basiszins."], ["Ist das Konto wirklich bedingungslos kostenlos?", "Ja, ohne Mindestgeldeingang, anders als DKB/ING."]],
  },
];

export const BANK_BY_ID: Record<string, Bank> = Object.fromEntries(
  BANKS.map((b) => [b.id, b]),
);

// ---- Ratgeber-Cluster ----
export const RATGEBER: RatgeberMeta[] = [
  { id: "konto-stack", kicker: "Signatur", title: "Der Konto-Stack", teaser: "Warum zwei Konten besser sind als das eine perfekte.", read: "6 Min" },
  { id: "hauptkonto-wechseln", kicker: "Praxis", title: "Hauptkonto wechseln 2026", teaser: "In 12 Werktagen umgezogen, so läuft's wirklich.", read: "5 Min" },
  { id: "neobank-oder-direktbank", kicker: "Entscheidung", title: "Neobank oder Direktbank?", teaser: "Der ehrliche Systemvergleich entlang fünf Dimensionen.", read: "7 Min" },
  { id: "zinsen-ohne-hopping", kicker: "Geld", title: "Guthabenzinsen 2026", teaser: "Bis 3,2 % ohne Tagesgeld-Hopping, wie das geht.", read: "4 Min" },
  // { id: "reisekonto", kicker: "Reisen", title: "Das beste Reisekonto 2026", teaser: "Was eine Fernreise wirklich kostet.", read: "7 Min" },
  // { id: "konto-selbststaendige", kicker: "Business", title: "Konto für Selbstständige", teaser: "Privat trennen, Steuern parken, Belege exportieren.", read: "8 Min" },
  { id: "nachhaltige-neobank", kicker: "Werte", title: "Nachhaltige Neobank", teaser: "Was dein Kontoguthaben anrichtet oder bewirkt.", read: "7 Min" },
  // { id: "gemeinschaftskonto", kicker: "Teilen", title: "Gemeinschaftskonto", teaser: "Drei Modelle, eine Empfehlung.", read: "6 Min" },
  // { id: "einlagensicherung-neobanken", kicker: "Sicherheit", title: "Einlagensicherung erklärt", teaser: "Bank, E-Geld-Institut oder Partnerbank, der Unterschied, der zählt.", read: "6 Min" },
];

// ---- Ratgeber-Artikel (block content) ----
export type Block =
  | { t: "h2"; x: string }
  | { t: "p"; x: string }
  | { t: "lead"; x: string }
  | { t: "callout"; label: string; x: string; icon?: IconName }
  | { t: "steps"; items: string[] }
  | { t: "list"; items: string[] }
  | { t: "stackcard"; icon: IconName; title: string; x: string }
  | { t: "keyvals"; icon?: IconName; title: string; rows: [string, string][] }
  | { t: "table"; rows: [string, string][] }
  | { t: "coltable"; head: string[]; rows: string[][] }
  | { t: "zinsrechner" };

export interface Article {
  kicker: string;
  read: string;
  title: string;
  blocks: Block[];
  related: string[];
}

export const ARTICLES: Record<string, Article> = {
  "konto-stack": {
    kicker: "Signatur · Konto-Stack", read: "6 Min",
    title: "Der Konto-Stack: Warum zwei Konten besser sind als das eine perfekte",
    blocks: [
      { t: "lead", x: "Die ehrliche Antwort auf „Welche Neobank ist die beste?“ lautet: keine. Jeder Anbieter hat ein scharfes Profil und genau das kannst du nutzen." },
      { t: "p", x: "Statt nach dem einen perfekten Konto zu suchen, kombinierst du zwei spezialisierte Konten zu einem Stack. Kostenpunkt: meist 0 €. Aufwand: ein Nachmittag." },
      { t: "stackcard", icon: "percent", title: "Stack 1: Der Zins-Stack", x: "Gehalt läuft auf N26 (App-Komfort), der Sparpuffer liegt bei ING mit Aktionszins bis 3,2 % p. a. oder bei Trade Republic mit 3 % ab dem ersten Euro. Ein Dauerauftrag am Monatsersten verschiebt automatisch. Bei 10.000 € Puffer macht der Unterschied zwischen 0 % und 3,2 % rund 320 € im Jahr, steuerpflichtig, aber real." },
      { t: "stackcard", icon: "plane", title: "Stack 2: Der Reise-Stack", x: "Hauptkonto bleibt, wo es ist. Dazu Revolut Standard für 0 €: vor der Reise Budget per Instant-Überweisung laden, werktags zum Interbank-nahen Kurs tauschen, vor Ort ohne Fremdwährungsaufschlag zahlen. Alternative für Gehaltsbezieher: gleich die DKB als Hauptkonto, mit Aktivstatus entfallen Auslandsgebühren komplett." },
      { t: "stackcard", icon: "briefcase", title: "Stack 3: Der Selbstständigen-Stack", x: "Privatkonto deiner Wahl plus bunq mit Sub-IBANs: eine IBAN für Einnahmen, ein Pocket „Umsatzsteuer“ (19 % jeder Rechnung sofort umbuchen), ein Pocket „Einkommensteuer-Rücklage“. Was im Einnahmen-Konto bleibt, ist wirklich deins." },
      { t: "h2", x: "Drei Regeln für jeden Stack" },
      { t: "list", items: ["Maximal zwei Konten, ab drei kippt Ordnung in Verwaltung.", "Automatisiere die Verschiebung per Dauerauftrag, sonst stirbt der Stack nach zwei Monaten.", "Prüfe einmal jährlich die Zinsen, variable Konditionen ändern sich, der kurze Check lohnt sich."] },
      { t: "callout", icon: "trendingUp", label: "Rechenbeispiel", x: "10.000 € Sparpuffer bei 0 % (Hausbank) vs. 3,2 % (ING) = 320 € Zinsen pro Jahr. Der Stack kostet dich 0 € und einen Nachmittag Einrichtung." },
    ],
    related: ["zinsen-ohne-hopping", "reisekonto", "einlagensicherung-neobanken"],
  },
  "hauptkonto-wechseln": {
    kicker: "Praxis", read: "5 Min",
    title: "Hauptkonto wechseln 2026: In 12 Werktagen umgezogen",
    blocks: [
      { t: "lead", x: "Der Kontowechsel ist gesetzlich geregelt (§§ 20–26 ZKG): Der gesetzliche Wechselservice dauert maximal 12 Werktage." },
      { t: "p", x: "In der Praxis übernehmen die Apps der Neobanken den Papierkram: Zahlungspartner informieren, Daueraufträge umziehen, altes Konto kündigen." },
      { t: "h2", x: "Schritt für Schritt" },
      { t: "steps", items: ["Neues Konto eröffnen (Video-Ident, 10–20 Min).", "Kontowechselservice in der App starten, er liest die letzten 12 Monate Umsätze und erkennt Arbeitgeber, Vermieter, Versicherungen, Abos.", "Gehaltseingang zuerst umstellen, dann Lastschriften.", "Altes Konto 2–3 Monate parallel laufen lassen als Auffangnetz für Jahreszahler (Kfz-Versicherung!).", "Altes Konto kündigen."] },
      { t: "h2", x: "Die drei häufigsten Wechsel-Fallen" },
      { t: "list", items: ["Jahreslastschriften, die erst in 9 Monaten kommen.", "Hinterlegte Karten in Payment-Diensten (PayPal, Apple Pay, Streaming).", "IBAN-Diskriminierung bei ausländischen IBANs (LT bei Revolut, NL bei bunq), Arbeitgeber müssen jede SEPA-IBAN akzeptieren, manche Lohnbuchhaltung sträubt sich trotzdem."] },
    ],
    related: ["konto-stack", "neobank-oder-direktbank"],
  },
  "neobank-oder-direktbank": {
    kicker: "Entscheidung", read: "7 Min",
    title: "Neobank oder Direktbank? Der ehrliche Systemvergleich",
    blocks: [
      { t: "lead", x: "Die Frage ist nicht „alt gegen neu“, sondern: Welches Geschäftsmodell passt zu dir? Wir vergleichen entlang von fünf Dimensionen und räumen mit zwei Mythen auf." },
      { t: "h2", x: "1. Kostenlogik" },
      { t: "p", x: "Neobanken sind meist bedingungslos kostenlos (N26, C24, Revolut, Tomorrow) und verdienen an Premium-Tarifen und Interchange. Klassiker wie DKB und ING knüpfen „kostenlos“ an Bedingungen, typischerweise 700 € Geldeingang pro Monat oder Alter unter 28. Wer die Bedingung reißt, zahlt bei der DKB 4,50 €/Monat." },
      { t: "h2", x: "2. Funktionsumfang" },
      { t: "p", x: "Pockets, Sub-IBANs, Echtzeit-Kategorisierung, In-App-Trading, hier sind Neobanken 2–3 Jahre voraus. Klassiker kontern mit Produktbreite: echter Dispo zu fairen Zinsen, Baufinanzierung, Gemeinschaftskonto als Standardprodukt." },
      { t: "h2", x: "3. Bargeld & Karten" },
      { t: "p", x: "DKB-Aktivkunden heben weltweit an Visa-Automaten gebührenfrei ab, das schlägt die Abhebe-Limits vieler Neobank-Gratistarife. Dafür fehlt Klassikern oft die granulare Kartensteuerung." },
      { t: "h2", x: "4. Sicherheit" },
      { t: "p", x: "Mythos 1, „Neobanken sind unsicher“: N26, C24, bunq und Trade Republic haben Vollbanklizenzen mit gesetzlicher Einlagensicherung, genau wie DKB und ING. Die echte Trennlinie verläuft nicht zwischen alt und neu, sondern zwischen Bank und E-Geld-Institut." },
      { t: "h2", x: "5. Support" },
      { t: "p", x: "Mythos 2, „Bei der Direktbank erreichst du Menschen“: Auch DKB und ING sind filiallos. Neobanken setzen auf Chat, mit großen Qualitätsunterschieden, die wir je Steckbrief testen." },
      { t: "callout", icon: "scale", label: "Unsere Entscheidungsregel", x: "Regelmäßiges Gehalt über 700 € und Wunsch nach einem unaufgeregten Allround-Hauptkonto → Klassiker (DKB für Reisende, ING für Allrounder). Optimierung einzelner Disziplinen → Neobank. Beides? → Konto-Stack." },
    ],
    related: ["konto-stack", "einlagensicherung-neobanken"],
  },
/*   "einlagensicherung-neobanken": {
    kicker: "Sicherheit", read: "6 Min",
    title: "Einlagensicherung: Bank, E-Geld-Institut oder Partnerbank, der Unterschied, der zählt",
    blocks: [
      { t: "lead", x: "Die wichtigste Vertrauensfrage des Portals: Wo genau liegt dein Geld und was passiert damit, wenn der Anbieter pleitegeht?" },
      { t: "h2", x: "Die vier Modelle" },
      { t: "table", rows: [["Modell", "Was es bedeutet"], ["Eigene Vollbanklizenz", "N26, C24, bunq, Trade Republic, DKB, ING → gesetzliche Sicherung bis 100.000 € je Kunde."], ["Partnerbank", "Tomorrow über Solaris → Sicherung läuft über die Partnerbank, Fintech ist die Oberfläche."], ["E-Geld-Institut", "Vivid → keine gesetzliche Einlagensicherung; Gelder werden getrennt verwahrt (Segregation)."], ["EU-Ausland", "Revolut (LT), bunq (NL), Openbank (ES) → gleiche 100.000-€-Grenze, anderes Sicherungsvermögen."]] },
      { t: "p", x: "DKB und ING gehören zusätzlich freiwilligen bzw. erweiterten Sicherungssystemen ihrer Verbünde an, den Unterschied zwischen gesetzlich und freiwillig sollte man kennen." },
      { t: "callout", icon: "users", label: "Gemeinschaftskonto", x: "Bei gemeinsamen Konten verdoppelt sich die Grenze: bis zu 200.000 € sind abgesichert (100.000 € je Inhaber)." },
    ],
    related: ["neobank-oder-direktbank", "konto-stack"],
  }, */
  "zinsen-ohne-hopping": {
    kicker: "Geld", read: "4 Min",
    title: "Guthabenzinsen 2026: Bis 3,2 % ohne Tagesgeld-Hopping",
    blocks: [
      { t: "lead", x: "Tagesgeld-Hopping ist 2026 für die meisten unnötig geworden: Mehrere Neobanken verzinsen das Girokonto-Guthaben dauerhaft, teils ab dem ersten Euro." },
      { t: "p", x: "Wie kommen die Zinsen zustande? Anker ist die EZB-Einlagenfazilität, die Zinsen sind also variabel. Und es gibt einen Unterschied zwischen „echten“ Guthabenzinsen und Geldmarktfonds-Konstruktionen (Trade Republic teilweise, Vivid-Pockets)." },
      { t: "list", items: ["Freistellungsauftrag stellen, damit der Sparerpauschbetrag greift.", "Bei echten Guthabenzinsen gibt es keine Vorabpauschale.", "Variable Zinsen heißt: einmal jährlich prüfen."] },
      { t: "zinsrechner" },
    ],
    related: ["konto-stack", "einlagensicherung-neobanken"],
  },
/*   "reisekonto": {
    kicker: "Reisen", read: "7 Min",
    title: "Das beste Reisekonto 2026: Was eine Fernreise wirklich kostet",
    blocks: [
      { t: "lead", x: "Kernstück ist eine durchgerechnete 10-Tage-Reise (Thailand, 1.500 € Budget)." },
      { t: "table", rows: [["Karte", "Kosten auf der Reise"], ["Hausbank-Kreditkarte", "1,75–3 % Fremdwährungsentgelt + 5–7,50 € je Abhebung"], ["Revolut / N26 / C24", "0 % Aufschlag werktags, geringe Restkosten"], ["DKB mit Aktivstatus", "weltweit gebührenfrei an Visa-Automaten"]] },
      { t: "h2", x: "Die Fallen" },
      { t: "list", items: ["Wochenend-Aufschläge bei Revolut.", "DCC-Falle am Automaten: „In Euro abrechnen?“, immer ablehnen.", "Automatenbetreiber-Entgelte als Restkosten auch bei „gebührenfreien“ Karten.", "Backup-Karte ist Pflicht."] },
      { t: "h2", x: "Das Drei-Konten-Modell für den Urlaub (Der Reise-Stack)" },
      { t: "p", x: "Wer blind mit nur einer Karte abhebt, verliert. Ein echter Reise-Stack besteht aus zwei aktiven Karten und einer eisernen Reserve im Hotelsafe. Wenn dir am Strand von Phuket die Primärkarte gesperrt wird, weil das Betrugssystem der Bank fälschlicherweise anspringt, stehst du sonst ohne Bargeld da." },
      { t: "keyvals", icon: "globe", title: "1. Das Schweizer Taschenmesser: Revolut (Standard)", rows: [
        ["Einsatzzweck", "Jede alltägliche Zahlung im Restaurant, Supermarkt oder Tuk-Tuk."],
        ["Vorteil", "Absolut unschlagbare Wechselkurse unter der Woche, ohne versteckte Aufschläge."],
        ["Limit im Hinterkopf", "Denk an die 1.000-€-Grenze im Gratismodell für den kostenlosen Währungsumtausch. Alles darüber kostet 1 % Gebühr."],
        ["Reise-Hack", "Tausche dein Wochenend-Budget (z. B. für Samstagsausflüge) schon am Freitagnachmittag in der App in Thailändische Baht (THB) um. So umgehst du den Wochenend-Aufschlag von 1 % komplett."],
      ] },
      { t: "keyvals", icon: "percent", title: "2. Der Bargeld-Automatenknacker: DKB (mit Aktivstatus) oder C24", rows: [
        ["Einsatzzweck", "Reine Bargeldversorgung am Geldautomaten."],
        ["Vorteil", "Von deutscher Seite komplett gebührenfrei beim Abheben. C24 erlaubt in den größeren Paketen bzw. als aktives Hauptkonto ebenfalls kostenlose Auslandsabhebungen."],
        ["Die ATM-Falle", "Thailändische Banken verlangen standardmäßig 220 THB (ca. 6 €) Eigengebühr pro Abhebung, völlig egal, welche deutsche Karte du nutzt. Das erstattet dir heute keine Bank mehr."],
        ["Die Lösung", "Hebe selten, dafür aber den Maximalbetrag (oft 20.000 THB) auf einmal ab, um die Fixgebühr prozentual zu minimieren."],
      ] },
      { t: "keyvals", icon: "lock", title: "3. Das Backup im Safe: Eine echte Kreditkarte (z. B. Barclays oder Hanseatic)", rows: [
        ["Einsatzzweck", "Mietwagen-Kautionen und Hotel-Check-ins."],
        ["Warum Neobanken hier oft scheitern", "N26, Revolut und Co. bieten Debitkarten. Viele Autovermietungen im Ausland blocken den Kautionsbetrag (oft 1.000 €+) schlicht nicht auf einer Debitkarte, selbst wenn das Guthaben da ist. Ohne echte Kreditkarte („Credit“ auf der Vorderseite) gehst du am Mietwagenschalter leer aus."],
      ] },
      { t: "h2", x: "Fazit: Welches Konto sichert dir die Reise?" },
      { t: "p", x: "Es gibt nicht die eine perfekte Karte für den Urlaub. Wer schlau ist, kombiniert die Stärken." },
      { t: "p", x: "Wenn du reiner App-Nutzer bist und deine Finanzen unterwegs in Echtzeit tracken willst, ist das Gespann aus C24 (für den Alltag) und Revolut (für den exakten Währungstausch unter der Woche) deine Basis." },
      { t: "p", x: "Geht es dir primär um Mietwagen und maximale Akzeptanz abseits der typischen Backpacker-Routen, gehört eine dauerhaft gebührenfreie, echte Kreditkarte als Sicherheitsnetz zwingend ins Gepäck." },
      { t: "callout", icon: "shieldCheck", label: "Transparenz-Check", x: "Alle hier genannten Konten lassen sich in wenigen Minuten komplett digital und ohne Papierkram vom Sofa aus eröffnen. Die Basis-Modelle sind dauerhaft kostenlos, du zahlst also nur, was du auf der Reise wirklich verbrauchst." },
    ],
    related: ["konto-stack", "neobank-oder-direktbank"],
  }, */
/*   "konto-selbststaendige": {
    kicker: "Business", read: "8 Min",
    title: "Konto für Selbstständige: Privat trennen, Steuern parken, Belege exportieren",
    blocks: [
      { t: "lead", x: "Viele Neobanken-AGB erlauben geschäftliche Nutzung des Privatkontos nicht oder nur eingeschränkt, diese Rechtsfrage klären wir zuerst." },
      { t: "h2", x: "Das Drei-Pocket-System" },
      { t: "list", items: ["Einnahmen, alles, was reinkommt.", "Umsatzsteuer, 19 % jeder Rechnung sofort umbuchen.", "Einkommensteuer-Rücklage, Faustregel 30 %."] },
      { t: "p", x: "Dann zählt der Export für die Steuerkanzlei: CSV/MT940-Vergleich je Anbieter. Und die Abgrenzung, ab wann lohnt ein echtes Geschäftskonto (Kontist, Qonto, Finom)?" },
      { t: "callout", icon: "briefcase", label: "Empfehlung", x: "bunq mit Sub-IBANs bildet das Drei-Pocket-System sauber ab, siehe Selbstständigen-Stack im Konto-Stack-Ratgeber." },
      { t: "h2", x: "Wann reicht das smarte Unterkonten-System nicht mehr? (Die harte Grenze)" },
      { t: "p", x: "Solange du als Einzelunternehmer oder Freelancer (Freiberufler) auf eigene Rechnung agierst, ist die Trennung über smarte Unterkonten und Sub-IBANs (wie bei bunq oder C24 Business) rechtlich völlig legitim und extrem effizient." },
      { t: "p", x: "Es gibt jedoch genau drei harte Mauern, bei denen dieses Setup einstürzt:" },
      { t: "keyvals", icon: "shieldAlert", title: "Die drei harten Grenzen", rows: [
        ["Die Rechtsform verlangt es", "Sobald du eine UG oder GmbH gründest, ist die Firma eine eigene juristische Person. Du musst zwingend ein echtes Geschäftskonto auf den Firmennamen eröffnen. Ein privates Konto mit „Sub-IBAN für die Firma“ führt hier geradewegs in das Visier der Compliance-Abteilung."],
        ["Der Steuerberater streikt", "Wenn deine Buchhaltung wächst und du Belege per DATEV-Schnittstelle automatisiert übertragen musst, stoßen viele klassische Neobanken an ihre Grenzen."],
        ["Schufa-Trennung", "Jedes normale Girokonto (auch viele Business-Ableger für Einzelunternehmer) wird in deine private Schufa eingetragen. Echte B2B-Firmenkonten laufen komplett isoliert auf das Unternehmen."],
      ] },
      { t: "h2", x: "Die Aufsteiger-Klasse: Kontist, Qonto und Finom im Direktvergleich" },
      { t: "p", x: "Wenn du merkst, dass dein Business die klassischen Taschen- und Pocket-Modelle sprengt, kommen die spezialisierten B2B-Anbieter ins Spiel. Sie kosten zwar eine monatliche Grundgebühr, sparen dir aber Stunden an Lebenszeit bei der Buchhaltung." },
      { t: "keyvals", icon: "zap", title: "1. Kontist: Der automatisierte Steuerhelfer", rows: [
        ["Für wen", "Solo-Selbstständige und Freelancer, die ihre Buchhaltung hassen."],
        ["Das Killer-Feature", "Kontist berechnet bei jedem Geldeingang vollautomatisch deine voraussichtliche Einkommen- und Umsatzsteuer und schiebt sie virtuell beiseite. Durch die direkte Lexoffice- oder SevDesk-Integration schreibt sich die Buchhaltung fast von selbst."],
      ] },
      { t: "keyvals", icon: "fileText", title: "2. Finom: Der Rechnungs-Turbo", rows: [
        ["Für wen", "Dienstleister und Agenturen, die viele Kundenrechnungen schreiben müssen."],
        ["Das Killer-Feature", "Du kannst Rechnungen direkt im Banking-Dashboard erstellen. Finom überwacht den Geldeingang und gleicht offene Posten automatisch ab. Dazu gibt es extrem hohe Cashback-Raten auf Kartenzahlungen in den Business-Tarifen."],
      ] },
      { t: "keyvals", icon: "users", title: "3. Qonto: Für wachsende Teams", rows: [
        ["Für wen", "Gründer mit UG/GmbH oder Teams, die Unterkarten für Mitarbeiter brauchen."],
        ["Das Killer-Feature", "Volle DATEV-Kompatibilität und ein extrem mächtiges Rechtemanagement. Du kannst deinem Steuerberater einen eigenen Lesezugriff einrichten, damit er sich die Kontoauszüge und Belege selbst zieht, ohne dass du PDFs exportieren musst."],
      ] },
      { t: "callout", icon: "scale", label: "Der ehrliche neoradar-Tipp", x: "Starte am ersten Tag deiner Selbstständigkeit nicht direkt mit dem teuersten GmbH-Konto. Wenn du als Freelancer startest, nimm ein kostenloses oder günstiges Modell mit Sub-IBANs (wie bunq), um deine Steuern sauber zu parken. Sobald die Umsätze stabil fünfstellig werden oder Mitarbeiter dazukommen, ziehst du den Stecker und wechselst sauber zu einem vollwertigen Buchhaltungs-Konto wie Kontist oder Qonto." },
    ],
    related: ["konto-stack", "einlagensicherung-neobanken"],
  }, */
  "nachhaltige-neobank": {
    kicker: "Werte", read: "7 Min",
    title: "Nachhaltige Neobank: Was dein Kontoguthaben anrichtet oder bewirkt",
    blocks: [
      { t: "lead", x: "Einlagen sind nie „neutral geparkt“: Banken arbeiten mit dem Geld." },
      { t: "p", x: "Wir erklären den Mechanismus, stellen Tomorrows Investitionskriterien vor, prüfen sie kritisch (Zertifizierungen, Impact-Reporting) und beziffern die „Haltungsprämie“ gegenüber der Zins-Spitze ehrlich in Euro/Jahr." },
      { t: "callout", icon: "leaf", label: "Unsere kantige Pointe", x: "Wer Nachhaltigkeit priorisiert, bekommt bei Tomorrow ein sauberes Produkt. Wer nur ein grünes Feigenblatt will, sollte lieber konventionell banken und die Zinsdifferenz spenden." },
      { t: "h2", x: "Der Tomorrow-Check: Wo landet dein Geld wirklich?" },
      { t: "p", x: "Konventionelle Banken nutzen dein Sparguthaben im Hintergrund als Deckung für Kredite. Wo diese hinfließen, entscheidest du nicht, oft sind es fossile Energien, Rüstung oder die Tabakindustrie." },
      { t: "p", x: "Tomorrow (Partnerbank ist die Solaris SE) filtert diese Industrien über ein strenges Negativ- und Positiv-Schnittmuster (nach den UN Sustainable Development Goals)." },
      { t: "keyvals", icon: "leaf", title: "So filtert Tomorrow", rows: [
        ["Die Blockliste", "Keine Kohle, keine Waffen, keine Gentechnik, keine Tierversuche."],
        ["Das Impact-Investment", "Dein Geld fließt stattdessen aktiv in grüne Anleihen (Social & Green Bonds). Damit werden konkrete Projekte finanziert, vom Ausbau von Solarparks in Europa bis hin zu regionalen Trinkwasserprojekten."],
        ["Das Kontrollorgan", "Ein unabhängiger „Impact Council“ prüft jeden einzelnen Investment-Case. Über das monatliche Impact Reporting in der App ist das für dich komplett einsehbar."],
      ] },
      { t: "h2", x: "Die „Haltungsprämie“: Was dich dein Gewissen in Euro kostet" },
      { t: "p", x: "Machen wir die ehrliche neoradar-Rechnung auf. Stand Juni 2026 bietet die Zins-Spitze (ING) rund 3,2 % aufs Tagesgeld bzw. Girokonto, Trade Republic 3,0 % (siehe unser Zins-Ratgeber). Tomorrow verzinst das Guthaben mit 2,5 % p. a., also bewusst etwas unterhalb der Spitze." },
      { t: "p", x: "Wenn du 10.000 € auf dem Konto parkst, sieht die jährliche Realität so aus:" },
      { t: "coltable", head: ["Bank / Setup", "Zinssatz", "Ertrag pro Jahr", "Kosten für den „Impact“"], rows: [
        ["Zins-Spitze (ING)", "3,2 %", "320,00 €", "0 €"],
        ["Tomorrow", "2,5 %", "250,00 €", "−70,00 €"],
      ] },
      { t: "h2", x: "Das ehrliche Fazit: Wie nachhaltig bist du wirklich?" },
      { t: "p", x: "Diese Differenz von rund 70 € im Jahr nennen wir die Haltungsprämie. Du verzichtest auf einen Teil der Rendite, damit im Hintergrund kein Unfug mit deinem Geld getrieben wird." },
      { t: "keyvals", icon: "scale", title: "Lohnt sich die Prämie für dich?", rows: [
        ["Wann Tomorrow Sinn ergibt", "Wenn du den Komfort eines modernen Smartphone-Kontos willst und dir sicher sein willst, dass dein Geld, während es auf dem Konto liegt, keinen Schaden anrichtet."],
        ["Wann das „Feigenblatt“ greift", "Wenn dich die 70 € Zinsdifferenz eigentlich schmerzen. Dann fährst du finanziell und oft auch moralisch besser, wenn du dein Geld bei der Zins-Spitze (z. B. ING) parkst, die vollen 320 € einsackst und davon am Jahresende einen festen Betrag direkt an ein Klimaprojekt deiner Wahl spendest. Du hast mehr Geld in der Tasche und die Spende kommt direkter an."],
      ] },
    ],
    related: ["konto-stack", "zinsen-ohne-hopping"],
  },
/*   "gemeinschaftskonto": {
    kicker: "Teilen", read: "6 Min",
    title: "Gemeinschaftskonto bei Neobanken: Drei Modelle, eine Empfehlung",
    blocks: [
      { t: "lead", x: "Echtes Gemeinschaftskonto, Drei-Konten-Modell oder Sub-Konto-Sharing? Wir nehmen die drei Wege im Härtetest auseinander, inklusive der Steuerfalle, die kaum ein Vergleichsportal erwähnt." },
      { t: "h2", x: "Die drei Modelle im Härtetest: Welches passt zu euch?" },
      { t: "keyvals", icon: "users", title: "1. Das echte Gemeinschaftskonto (Oder-Konto)", rows: [
        ["Prinzip", "Das Konto gehört juristisch beiden Partnern zu gleichen Teilen (50/50). Jeder bekommt eine eigene Karte und vollen App-Zugriff."],
        ["Wer bietet es", "C24 Bank (kostenlos im Smart-Tarif), DKB, ING. Bei reinen Neobanken wie N26 oder Revolut sucht man ein echtes Gemeinschaftskonto mit zwei rechtlichen Inhabern oft vergeblich, oder es ist an teurere Abos gekoppelt."],
        ["Der große Vorteil", "Maximale rechtliche Sicherheit. Stirbt ein Partner, wird das Konto nicht sofort gesperrt, der andere kann weiter über das Geld verfügen."],
        ["Das Risiko (Haftung)", "Ihr haftet gesamtschuldnerisch. Überzieht dein Partner das Konto komplett, kann die Bank das Geld zu 100 % von dir zurückfordern. Zudem löst die Eröffnung bei beiden Partnern eine Schufa-Abfrage aus."],
      ] },
      { t: "keyvals", icon: "layers", title: "2. Das Drei-Konten-Modell (Der Klassiker für Paare)", rows: [
        ["Prinzip", "Beide Partner behalten ihr eigenes, privates Girokonto für Gehalt und persönliche Ausgaben. Zusätzlich läuft ein drittes Konto (das Gemeinschaftskonto), auf das beide per Dauerauftrag einen fixen Betrag für Miete, Einkäufe und Fixkosten überweisen."],
        ["Der neoradar-Tipp", "Nutzt eine Bank, die Echtzeitüberweisungen (Instant Payment) kostenlos anbietet. So schiebt ihr beim gemeinsamen Wocheneinkauf in Sekunden Geld aufs Haushaltskonto, falls es mal knapp wird."],
        ["Vorteil", "Absolute finanzielle Unabhängigkeit und null Streitpotenzial bei persönlichen Ausgaben (Hobbys, Geschenke)."],
      ] },
      { t: "keyvals", icon: "briefcase", title: "3. Sub-Konto-Sharing (Die moderne WG-Lösung)", rows: [
        ["Prinzip", "Ein Partner eröffnet ein normales Einzelkonto und gibt über die App ein bestimmtes Unterkonto (Pocket/Space) für den anderen Partner oder die Mitbewohner frei."],
        ["Wer bietet es", "bunq (Joint Pockets) oder N26 (Shared Spaces)."],
        ["Der Haken", "Rechtlicher Inhaber des Geldes bleibt immer die Person, die das Hauptkonto eröffnet hat. Der andere Partner hat lediglich eine Vollmacht über dieses eine Pocket."],
        ["Vorteil", "Extrem flexibel. Pockets lassen sich mit wenigen Klicks erstellen, teilen und wieder löschen, ohne Verträge oder Schufa-Abfragen. Perfekt für WGs oder unverheiratete Paare in der Kennenlernphase."],
      ] },
      { t: "h2", x: "Die unterschätzte Falle: Schenkungssteuer bei unverheirateten Paaren" },
      { t: "p", x: "Ein Punkt, den fast alle Vergleichsportale verschweigen, weil er ungemütlich ist: die Schenkungssteuer." },
      { t: "p", x: "Wenn ihr nicht verheiratet seid, liegt der steuerliche Freibetrag für Schenkungen untereinander bei gerade einmal 20.000 € innerhalb von 10 Jahren." },
      { t: "p", x: "Das Problem in der Praxis: Ihr eröffnet ein echtes Gemeinschaftskonto (Modell 1). Ein Partner verdient deutlich mehr und zahlt jeden Monat 3.000 € ein, der andere nur 500 €. Rechtlich gehört das Guthaben beiden zu gleichen Teilen, also kann das Finanzamt die Differenz (die Hälfte der höheren Einzahlung) als Schenkung werten. Über die Jahre reißt man so den 20.000-€-Freibetrag extrem schnell." },
      { t: "callout", icon: "scale", label: "Die Lösung", x: "Für unverheiratete Paare ist das Drei-Konten-Modell (Modell 2) die sauberste Option. Zahlt dort nur so viel ein, wie monatlich für die gemeinsamen Lebenshaltungskosten verbraucht wird, damit sich kein hohes, steuerlich relevantes Vermögen auf dem Gemeinschaftskonto anstaut." },
      { t: "h2", x: "Der finale Radar-Check: So entscheidet ihr" },
      { t: "keyvals", icon: "scale", title: "So entscheidet ihr", rows: [
        ["Verheiratet oder gefestigte Partnerschaft", "Wählt ein echtes Gemeinschaftskonto bei C24, ING oder DKB als Haushaltsbasis (Modell 1 oder 2)."],
        ["WG oder unverbindlich", "Nutzt das Sub-Konto-Sharing von bunq oder N26 (Modell 3), das spart euch den bürokratischen Aufwand und das Schufa-Risiko."],
      ] },
    ],
    related: ["konto-stack", "neobank-oder-direktbank"],
  }, */
};

// ---- formatters ----
export function eur(n: number): string {
  return n === 0
    ? "0,00 €"
    : n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
}

export function pct(n: number): string {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + " %";
}
