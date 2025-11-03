# AEO Chat — Core (Multilingual + Consent-First)

**Brand:** EMEA EXECUTIVES (sky→emerald visual language)

This core delivers:
✅ Multilingual chat (EN/ES/FR/DE)
✅ Five specialized agents
   • Orion — Candidate Fit  
   • Vega — Client Match  
   • Lyra — Consent Guard  
   • Atlas — Signals + Enrichment  
   • Nova — Outreach Generation  
✅ Explainable scoring + compliance hooks
✅ Translate-to-English toggle
✅ Structured for voice modules to be dropped in later

---

## File Structure

/api
  chat.ts
  translate.ts

/agents
  orion.ts
  vega.ts
  lyra.ts
  atlas.ts
  nova.ts

/web/components
  ChatUI.tsx

/locales
  en/chat.json
  es/chat.json
  fr/chat.json
  de/chat.json

---

## Quick Start

1️⃣ Wire `/api/chat.ts` to Express/NextJS
2️⃣ Import `<ChatUI />` into your UI
3️⃣ Confirm locales served statically
4️⃣ Insert real translation API into `/api/translate.ts`
5️⃣ Add Whisper/TTS later for voice

---

## Notes

🔹 GDPR-first — Lyra blocks disclosure without consent  
🔹 UI uses browser voice API stubs → swappable  
🔹 Minimal styling (branding applied globally by parent app)

---

© 2025 EMEA EXECUTIVES — All rights reserved.
