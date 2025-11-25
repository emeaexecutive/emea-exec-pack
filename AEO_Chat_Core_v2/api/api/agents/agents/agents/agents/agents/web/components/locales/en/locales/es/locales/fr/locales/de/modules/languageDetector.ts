import franc from "franc";

export function detectLanguage(text: string): string {
  const code = franc(text);
  if (code === "und") return "auto";
  return code;
}
