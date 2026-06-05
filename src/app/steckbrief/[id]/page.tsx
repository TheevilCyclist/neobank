import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SteckbriefView } from "@/components/steckbrief-view";
import { BANKS, BANK_BY_ID } from "@/lib/data";

export function generateStaticParams() {
  return BANKS.map((b) => ({ id: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const b = BANK_BY_ID[id];
  if (!b) return { title: "Steckbrief | neobank.de" };
  return { title: `${b.name} im Steckbrief — ${b.thesis} | neobank.de` };
}

export default async function SteckbriefPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bank = BANK_BY_ID[id];
  if (!bank) notFound();
  return <SteckbriefView bank={bank} />;
}
