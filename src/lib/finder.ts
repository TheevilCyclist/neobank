// neoradar.de — Konto-Finder (5 Fragen → redaktionelle Empfehlung / Stack)
import { BANK_BY_ID } from "./data";

export interface FinderQuestion {
  key: string;
  q: string;
  opts: { v: string; l: string }[];
}

export const FINDER_Q: FinderQuestion[] = [
  {
    key: "purpose", q: "Wofür suchst du ein Konto?", opts: [
      { v: "haupt", l: "Hauptkonto fürs Gehalt" },
      { v: "zweit", l: "Zweitkonto für einen Zweck" },
      { v: "gemeinsam", l: "Gemeinsames Konto" },
      { v: "selbst", l: "Konto für die Selbstständigkeit" },
    ],
  },
  {
    key: "travel", q: "Wie oft bist du außerhalb der Eurozone?", opts: [
      { v: "selten", l: "Selten" },
      { v: "manchmal", l: "1–3× im Jahr" },
      { v: "staendig", l: "Ständig unterwegs" },
    ],
  },
  {
    key: "income", q: "Geht regelmäßig Einkommen über 700 € ein?", opts: [
      { v: "ja", l: "Ja" },
      { v: "nein", l: "Nein" },
      { v: "schwankend", l: "Schwankend" },
    ],
  },
  {
    key: "cash", q: "Wie wichtig ist dir Bargeld?", opts: [
      { v: "oft", l: "Hebe oft ab" },
      { v: "gelegentlich", l: "Gelegentlich" },
      { v: "fastnie", l: "Fast nie" },
    ],
  },
  {
    key: "type", q: "Was beschreibt dich am besten?", opts: [
      { v: "sorglos", l: "Ich will mich um nichts kümmern" },
      { v: "optimierer", l: "Ich optimiere gern (Pockets, Regeln, Cashback)" },
      { v: "sicherheit", l: "Sicherheit & eine etablierte Bank" },
    ],
  },
];

export type FinderAnswers = Partial<Record<string, string>>;

export interface Recommendation {
  mode: "single" | "stack";
  primary: string;
  second?: string;
  alt: string;
  stackHint?: string;
  reasons: string[];
  cantDo: string;
}

export function recommend(a: FinderAnswers): Recommendation {
  const B = (id: string) => BANK_BY_ID[id];
  const { purpose, travel, income, cash, type } = a;
  const travels = travel === "staendig" || travel === "manchmal";

  // Selbstständigkeit → Struktur-Stack
  if (purpose === "selbst") {
    const main = type === "sorglos" ? "n26" : "c24";
    return {
      mode: "stack", primary: "bunq", second: main, alt: "trade-republic", stackHint: "Privatkonto + Struktur-Konto",
      reasons: [
        "Weil du ein Konto für die Selbstständigkeit suchst, brauchst du vor allem Struktur: bunq gibt dir bis zu 25 Sub-IBANs für Einnahmen, Umsatzsteuer und Rücklagen.",
        `Dein Privates läuft sauber getrennt über ${B(main).name} — so vermischen sich geschäftliche und private Buchungen nie.`,
        "Am Monatsende liegt auf dem Einnahmen-Konto nur das, was nach Steuer-Pocket wirklich dir gehört.",
      ],
      cantDo: "bunq kostet 3,99 €/Monat und ersetzt kein vollwertiges Geschäftskonto (Kontist, Qonto) — für Freiberufler reicht es meist, für eine GmbH nicht.",
    };
  }

  // Gemeinsames Konto
  if (purpose === "gemeinsam") {
    if (income === "ja") {
      return {
        mode: "single", primary: "dkb", alt: "ing",
        reasons: [
          "Ihr wollt ein gemeinsames Konto und habt regelmäßiges Einkommen — damit passt die DKB: ein echtes Gemeinschaftskonto als Standardprodukt, nicht nur geteilte Spaces.",
          "Mit Aktivstatus (ab 700 € Eingang) ist es kostenlos und ihr hebt weltweit gebührenfrei ab.",
          "Beide haften gemeinsam, beide haben vollen Zugriff — das saubere Modell für Paare mit gemeinsamer Kasse.",
        ],
        cantDo: "Ohne 700 € Geldeingang kostet die DKB 4,50 €/Monat, und beim Guthabenzins ist sie nur Mittelfeld (ca. 1,0 %).",
      };
    }
    return {
      mode: "single", primary: "bunq", alt: "n26",
      reasons: [
        "Ihr wollt ein Konto teilen, aber (noch) ohne gesichertes Einkommen — am flexibelsten sind geteilte Unterkonten: bunq bietet Sub-IBANs für faire Aufteilung in WG oder Partnerschaft.",
        "Jeder Topf hat eine eigene IBAN, Miete und Haushalt lassen sich getrennt führen.",
        "Wächst der Bedarf zum echten Gemeinschaftskonto, ist später ein Wechsel zu DKB oder ING leicht.",
      ],
      cantDo: "bunq ist kein klassisches Gemeinschaftskonto mit gemeinsamer Haftung — wer das braucht, ist bei DKB oder ING besser aufgehoben.",
    };
  }

  // Zweitkonto
  if (purpose === "zweit") {
    if (travels) {
      return {
        mode: "single", primary: "revolut", alt: "n26",
        reasons: [
          "Als Zweitkonto für unterwegs ist Revolut das Reise-Schweizermesser: 30+ Währungen, Wechselkurse nahe Interbank, kostenlos.",
          "Du lädst vor der Reise dein Budget auf — dein Hauptkonto bleibt sauber, falls die Karte am Strand verschwindet.",
          cash === "oft"
            ? "Bei deinem Bargeld-Bedarf achte auf die Abhebe-Limits im Gratistarif — sonst lohnt zusätzlich die DKB."
            : "Werktags zahlst du ohne Fremdwährungsaufschlag, das spart auf einer Fernreise schnell dreistellig.",
        ],
        cantDo: "Revolut nutzt eine litauische IBAN und am Wochenende einen Kurs-Aufschlag — als Gehaltskonto nur bedingt geeignet.",
      };
    }
    if (type === "optimierer") {
      return {
        mode: "single", primary: "vivid", alt: "bunq",
        reasons: [
          "Als Zweitkonto zum Optimieren passt Vivid: Cashback auf Lastschriften, Zins-Pockets und integriertes Trading in einer App.",
          "Du wirst für aktives Management belohnt, nicht fürs reine Parken von Geld.",
          "Ideal als Spielwiese neben deinem bestehenden Hauptkonto.",
        ],
        cantDo: "Vivid ist ein E-Geld-Institut ohne gesetzliche Einlagensicherung — größere Beträge gehören hier nicht dauerhaft hin.",
      };
    }
    return {
      mode: "single", primary: "trade-republic", alt: "c24",
      reasons: [
        "Als Zweitkonto zum Sparen holt Trade Republic 2026 das Maximum: 3 % ab dem ersten Euro, ohne Limit und ohne separates Tagesgeldkonto.",
        "Ein Dauerauftrag schiebt deinen Sparpuffer automatisch hierher — der Rest bleibt auf deinem Hauptkonto.",
        "Deutsche Vollbanklizenz und gesetzliche Einlagensicherung machen es auch für größere Beträge solide.",
      ],
      cantDo: "Ein Teil des Guthabens liegt unter Umständen in einem Geldmarktfonds — relevant für die Einlagensicherung; und der Zins ist variabel.",
    };
  }

  // Hauptkonto
  if (type === "sicherheit") {
    if (income === "ja") {
      return {
        mode: "single", primary: "dkb", alt: "ing",
        reasons: [
          "Du willst ein Hauptkonto bei einer etablierten Bank — und mit regelmäßigem Einkommen erfüllst du den DKB-Aktivstatus mühelos.",
          "Damit ist das Konto kostenlos, du hebst weltweit gebührenfrei ab und bekommst Verbund-Sicherung obendrauf.",
          travel === "staendig"
            ? "Gerade weil du ständig unterwegs bist, ist die DKB der unterschätzte Reise-Klassiker."
            : "Solides Banking ohne Überraschungen — der ruhige Anker fürs Gehalt.",
        ],
        cantDo: "Beim Guthabenzins ist die DKB nur Mittelfeld — fürs Sparen lohnt später ein Zins-Zweitkonto wie Trade Republic oder ING.",
      };
    }
    return {
      mode: "single", primary: "n26", alt: "c24",
      reasons: [
        "Du willst Sicherheit und eine etablierte Bank — aber ohne geregelten Eingang über 700 € würden DKB oder ING Gebühren kosten.",
        "Ehrlicher ist daher eine bedingungslos kostenlose Bank mit deutscher Vollbanklizenz und gesetzlicher Einlagensicherung: N26.",
        "Du bekommst dieselbe 100.000-€-Absicherung — ohne Mindestgeldeingang.",
      ],
      cantDo: "N26 ist kein Filialbank-Ersatz: Bargeld-Abhebungen sind im Gratistarif limitiert (CASH26).",
    };
  }

  if (type === "optimierer") {
    if (travel === "staendig") {
      return {
        mode: "stack", primary: "trade-republic", second: "revolut", alt: "ing", stackHint: "Zins-Hauptkonto + Reise-Modul",
        reasons: [
          "Du optimierst gern und bist viel unterwegs — ein einzelnes Konto kann beides selten. Deshalb ein Stack aus zwei Spezialisten.",
          "Trade Republic holt mit 3 % ab dem ersten Euro das Maximum aufs Guthaben, Revolut deckt Auslandszahlungen nahe Interbank ab.",
          "Ein Dauerauftrag verbindet beide — du nutzt jeweils die Stärke, ohne Kompromiss.",
        ],
        cantDo: "Zwei Konten heißen zwei Apps — dafür bekommst du Spitzenzins und gebührenfreie Auslandszahlungen zugleich.",
      };
    }
    return {
      mode: "single", primary: "c24", alt: "trade-republic",
      reasons: [
        "Du optimierst gern — dann liefert C24 Pockets, Cashback und das Check24-Ökosystem zum Justieren.",
        "Den Sparpuffer parkst du per Dauerauftrag, der Rest läuft im Alltag durchs Konto — Stärke sind hier Struktur und Cashback, nicht der Zins.",
        type === "optimierer" && income === "schwankend"
          ? "Ganz ohne Mindestgeldeingang — auch bei schwankendem Einkommen."
          : "Deutsche Vollbanklizenz inklusive — solide auch für größere Beträge.",
      ],
      cantDo: "C24 lebt vom Querverkauf, und der Guthabenzins ist mit 0,5 % mager — fürs Zins-Maximum schau auf Trade Republic oder ING.",
    };
  }

  // sorglos
  if (travel === "staendig" && income === "ja") {
    return {
      mode: "single", primary: "dkb", alt: "n26",
      reasons: [
        "Du willst dich um wenig kümmern und bist viel unterwegs — die DKB löst beides in einem Konto.",
        "Mit Aktivstatus hebst du weltweit gebührenfrei ab und zahlst überall ohne Fremdwährungsaufschlag.",
        "Ein einziges Konto statt Reise-Stack — angenehm unkompliziert.",
      ],
      cantDo: "Kostenlos nur mit Aktivstatus (700 € Eingang), und beim Zins liegt die DKB im Mittelfeld.",
    };
  }
  return {
    mode: "single", primary: "n26", alt: "c24",
    reasons: [
      "Du willst dich um nichts kümmern: N26 hat die beste App-UX, ist bedingungslos kostenlos und in Minuten eröffnet.",
      income === "schwankend" || income === "nein"
        ? "Gerade bei schwankendem Einkommen punktet ein Konto ganz ohne Mindestgeldeingang."
        : "Gehalt rein, Push-Benachrichtigung, Spaces fürs Sparen — fertig.",
      "Deutsche Vollbanklizenz und gesetzliche Einlagensicherung bis 100.000 € inklusive.",
    ],
    cantDo: "Wer Guthabenzins will, lässt bei N26 alles liegen — 0 % gegenüber bis zu 3,2 % beim Marktführer ING.",
  };
}
