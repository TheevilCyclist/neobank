import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { Container, ZinsDisclaimer } from "@/components/ui";
import { BlockView } from "@/components/article-blocks";
import { ARTICLES, RATGEBER } from "@/lib/data";

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES[slug];
  return { title: a ? `${a.title} | neoradar.de` : "Ratgeber | neoradar.de" };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = ARTICLES[slug];
  if (!a) notFound();
  const related = (a.related || [])
    .map((rid) => RATGEBER.find((r) => r.id === rid))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <article>
      <Container className="pt-8">
        <Link
          href="/ratgeber"
          className="inline-flex items-center gap-2 text-[13.5px] font-medium transition-opacity hover:opacity-60"
          style={{ color: "var(--h-muted)" }}
        >
          <Icon name="arrowLeft" size={15} /> Alle Ratgeber
        </Link>
      </Container>
      <Container className="pt-8 pb-6">
        <div className="max-w-[46rem]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--h-accent-ink)" }}>
              {a.kicker}
            </span>
            <span className="font-mono text-[11px]" style={{ color: "var(--h-faint)" }}>
              · {a.read} Lesezeit
            </span>
          </div>
          <h1
            className="font-bold mt-5"
            style={{ color: "var(--h-ink)", fontSize: "clamp(30px,4.4vw,52px)", lineHeight: 1.06, letterSpacing: "-0.025em" }}
          >
            {a.title}
          </h1>
        </div>
      </Container>
      <Container className="pb-16">
        <div className="max-w-[46rem]">
          {a.blocks.map((b, i) => (
            <BlockView key={i} b={b} />
          ))}
          {["konto-stack", "zinsen-ohne-hopping"].includes(slug) && (
            <div className="mt-8">
              <ZinsDisclaimer variant="subtle" />
            </div>
          )}
          <div className="mt-10 font-mono text-[11px]" style={{ color: "var(--h-faint)" }}>
            Stand Juni 2026 · Alle Angaben ohne Gewähr · keine Anlageberatung.
          </div>
        </div>
      </Container>
      {related.length > 0 && (
        <Container className="pb-20">
          <div className="pt-10" style={{ borderTop: "1px solid var(--h-line)" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] mb-5" style={{ color: "var(--h-faint)" }}>
              Weiterlesen
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/ratgeber/${r.id}`}
                  className="text-left rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--h-card)", border: "1px solid var(--h-line)" }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--h-accent-ink)" }}>
                    {r.kicker}
                  </span>
                  <h3 className="font-bold mt-2 text-[16px]" style={{ color: "var(--h-ink)" }}>
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      )}
    </article>
  );
}
