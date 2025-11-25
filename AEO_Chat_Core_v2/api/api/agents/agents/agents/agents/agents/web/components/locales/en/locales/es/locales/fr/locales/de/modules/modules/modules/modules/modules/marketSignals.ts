export async function getMarketSignals(query: string){
  return [
    { type: "job_change", detail: "Candidate moved to VP Product at N26" },
    { type: "funding_round", detail: "Series B raised in Berlin" }
  ];
}
