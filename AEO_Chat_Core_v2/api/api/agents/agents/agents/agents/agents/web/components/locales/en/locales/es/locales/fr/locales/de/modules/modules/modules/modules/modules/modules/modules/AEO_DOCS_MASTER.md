# AEO — Automated Executive Outreach (EMEA EXECUTIVES)

**Founder:** Keith Speres  
**Company:** EMEA EXECUTIVES  
**Founder LinkedIn:** https://www.linkedin.com/in/keithsperes/  
**Company LinkedIn:** https://www.linkedin.com/company/emea-executives/

**Tagline:**  
AI-native, consent-first executive outreach for EMEA founders, investors and global leadership teams.

---

## 1. System Overview (Executive Summary)

AEO is an AI-native executive search engine that combines:

- Autonomous agents that constantly update market intel, candidate data and opportunity signals.
- Multilingual, voice-enabled chat for clients, candidates and internal use.
- A consent-first architecture (GDPR & Spanish / UK privacy regimes in mind).
- Transparent fit scoring and auditable decision trails for boards and investors.

**Core benefits for clients (founders / investors / CHROs):**

- Faster shortlists (days, not months).
- Clearer evidence for why each candidate fits (and where they don’t).
- Less manual recruiter work — more time on deep conversations and closing.

**Core benefits for candidates:**

- Context-aware outreach (not spam).
- Transparency: why they were approached, how their data is used.
- Cross-border opportunities in key EMEA hubs.

---

## 2. Agent Architecture

AEO is built around specialized agents:

- **Orion — Candidate Fit**  
  Evaluates candidate–role fit (experience, outcomes, culture) and produces an explainable score.

- **Vega — Client & Market Match**  
  Aligns mandates with market context: sector, funding stage, geography, hiring velocity.

- **Lyra — Consent & Compliance**  
  Checks and enforces consent before revealing PII or triggering outreach.

- **Atlas — Signals & Enrichment**  
  Monitors job changes, funding news, leadership moves, and enriches profiles.

- **Nova — Outreach & Engagement**  
  Crafts tone-matched outreach, follow-ups, and sequences across languages.

- **Gemini — Multilingual & Voice (NEW)**  
  Bridges languages (EN/ES/FR/DE and more later) and handles voice ↔ text.

- **Titan — CRM & Data Hygiene (NEW)**  
  Keeps CRM fields current (titles, companies, status, last contact), flags stale records.

- **Halo — Job Change & Re-Engagement (NEW)**  
  Watches for job/title changes in your network and suggests outreach or BD plays.

Agents talk to each other through an internal message bus (conceptually):

- Vega → Orion: “Here’s a role, evaluate these candidates.”
- Atlas → Vega: “Funding round + leadership change; this company is now a BD opportunity.”
- Halo → Nova: “Candidate X just became VP Product at Company Y; prepare warm congrats + re-engagement outreach.”
- Lyra → All: “No consent → mask sensitive fields; abort outreach.”

---

## 3. API Overview

### 3.1 Core Chat Endpoint

`POST /api/chat`

**Request:**
```json
{
  "role": "client | candidate | internal",
  "lang": "auto | en | es | fr | de",
  "query": "string",
  "translateToEnglish": true
}
