export function generateOutreach({ role, name, context }:{
  role: "client"|"candidate";
  name: string;
  context: string;
}){
  if(role === "client"){
    return `Hi ${name}, we’re seeing active hiring velocity across ${context} — here’s where I can help.`;
  }
  return `Hi ${name}, based on your background, a new opportunity in ${context} may be relevant.`;
}
