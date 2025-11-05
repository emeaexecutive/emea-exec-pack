import type { Request, Response } from "express";

type Role = "client" | "candidate" | "internal";
type Lang = "auto" | "en" | "es" | "fr" | "de";

// Agents
import { orionCandidateFit } from "../agents/orion";
import { vegaClientMatch } from "../agents/vega";
import { lyraConsentCheck } from "../agents/lyra";
import { atlasEnrich } from "../agents/atlas";
import { novaOutreach } from "../agents/nova";
import { translateTo } from "./translate";

export async function chatHandler(req: Request, res: Response) {
  const { role, lang, query, translateToEnglish } =
    (req.body ?? {}) as { role: Role; lang: Lang; query: string; translateToEnglish?: boolean };

  const detectedLang: Exclude<Lang, "auto"> = lang && lang !== "auto" ? lang : "en";

  // Consent-first guard
  const consent = await lyraConsentCheck({ contextRole: role, query });
  if (!consent.ok) {
    return res.json({ lang: detectedLang, text: consent.message, meta: { guard: "consent" } });
  }

  // Simple intent route
  const q = (query || "").toLowerCase();
  let agent: "orion" | "vega" | "atlas" | "nova" = "nova";
  let text = "";

  if (q.includes("candidate") || q.includes("fit") || q.includes("score")) {
    agent = "orion";
    text = await orionCandidateFit({ query, lang: detectedLang });
  } else if (q.includes("company") || q.includes("role") || q.includes("market")) {
    agent = "vega";
    text = await vegaClientMatch({ query, lang: detectedLang });
  } else if (q.includes("update") || q.includes("job change") || q.includes("signal")) {
    agent = "atlas";
    text = (await atlasEnrich({ query, lang: detectedLang })).text;
  } else {
    agent = "nova";
    text = await novaOutreach({ query, lang: detectedLang, tone: role });
  }

  // Optional translate → English
  let text_en: string | null = null;
  if (translateToEnglish && detectedLang !== "en") {
    text_en = await translateTo(text, "en", detectedLang);
  }

  return res.json({
    agent,
    detectedLang,
    text,
    text_en,
    meta: { consent: true, translateToEnglish: !!translateToEnglish }
  });
}
