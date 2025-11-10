import React from "react";

type Role = "client" | "candidate" | "internal";
type Lang = "auto" | "en" | "es" | "fr" | "de";

export default function ChatUI(){
  const [role, setRole] = React.useState<Role>("client");
  const [lang, setLang] = React.useState<Lang>("auto");
  const [translateToEnglish, setTranslate] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [messages, setMessages] = React.useState<{from:string;text:string;alt?:string}[]>([]);
  const [busy, setBusy] = React.useState(false);

  async function send(){
    if (!query.trim() || busy) return;
    const payload = { role, lang, query, translateToEnglish };
    setMessages(m=>[...m, {from:"you", text: query}]);
    setQuery("");
    setBusy(true);
    try{
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      const text = data?.text || "";
      const alt  = data?.text_en || null;
      setMessages(m=>[...m, {from:data.agent||"aeo", text, alt}]);
    }catch{
      setMessages(m=>[...m, {from:"system", text:"Error sending message."}]);
    }finally{
      setBusy(false);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>){
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="mb-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <select value={role} onChange={e=>setRole(e.target.value as Role)} className="border rounded p-2">
          <option value="client">Client</option>
          <option value="candidate">Candidate</option>
          <option value="internal">Internal</option>
        </select>
        <select value={lang} onChange={e=>setLang(e.target.value as Lang)} className="border rounded p-2">
          <option value="auto">Auto</option>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
        <label className="flex items-center gap-2 text-sm border rounded p-2">
          <input type="checkbox" checked={translateToEnglish} onChange={e=>setTranslate(e.target.checked)} />
          Translate replies to English
        </label>
      </div>

      <div className="border rounded p-3 min-h-[260px] bg-white">
        {messages.length === 0 && (
          <div className="text-slate-500 text-sm">Type a prompt to get started…</div>
        )}
        {messages.map((m,i)=>(
          <div key={i} className="mb-3 leading-relaxed">
            <b className="mr-1">{m.from}:</b> {m.text}
            {m.alt && <div className="text-xs text-slate-600 mt-1"><i>EN:</i> {m.alt}</div>}
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 border rounded p-2"
          value={query}
          onChange={e=>setQuery(e.target.value)}
          onKeyDown={onKey}
          placeholder="Type your message and press Enter…"
        />
        <button className="px-3 py-2 rounded bg-cyan-500 text-white disabled:opacity-60"
                onClick={send} disabled={busy}>
          {busy ? "Sending…" : "Send"}
        </button>
      </div>

      <p className="text-[11px] text-slate-500 mt-3">
        Consent-first: personal details may be masked until authorized. © EMEA EXECUTIVES
      </p>
    </div>
  );
}
