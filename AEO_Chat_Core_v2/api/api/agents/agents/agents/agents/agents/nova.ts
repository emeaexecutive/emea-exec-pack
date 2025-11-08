// Nova — Outreach & Engagement Agent
export async function novaOutreach({
  query,
  lang,
  tone
}: {
  query: string;
  lang: string;
  tone: string;
}) {
  const persona =
    tone === "client"
      ? "executive"
      : tone === "candidate"
      ? "talent"
      : "partner";
  return `💬 Nova drafted a ${persona}-style outreach message for "${query}" (${lang}).`;
}
