export function applyPersonaTone(text: string, persona: string){
  switch(persona){
    case "executive":
      return `Confident, direct: ${text}`;
    case "consultative":
      return `Advisory tone: ${text}`;
    case "friendly":
      return `Warm tone: ${text}`;
    default:
      return text;
  }
}
