import { Suspense } from "react";
import { VergleichView } from "@/components/vergleich-view";

export const metadata = {
  title: "Vergleich — Zehn Banken, ein ehrlicher Blick | neobank.de",
};

export default function VergleichPage() {
  return (
    <Suspense>
      <VergleichView />
    </Suspense>
  );
}
