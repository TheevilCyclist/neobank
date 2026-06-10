import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BANK_BY_ID } from "@/lib/data";

// Affiliate-Link-Cloaking: /go/<bank-id> ist eine First-Party-URL, die
// serverseitig zur (ggf. Affiliate-)Anbieter-URL weiterleitet. So bleibt der
// "Zum Anbieter"-CTA im DOM unauffällig (kein financeads.net-Ziel), wodurch
// Ad-/Trackingblocker den Button nicht mehr per kosmetischem Filter entfernen.
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const bank = BANK_BY_ID[id];
  if (!bank?.url) {
    return NextResponse.redirect(new URL("/", req.url), 307);
  }
  return NextResponse.redirect(bank.url, 302);
}
