// Cheap checks that run before the model is called. They catch the obvious
// prompt-extraction and jailbreak attempts so those never reach the model (and
// never cost a request). The instructions handle everything subtler.

const ATTACK_PATTERNS = [
  // Overriding or extracting the instructions
  /\b(ignore|disregard|forget|override|bypass)\b.{0,40}\b(instructions?|rules|prompt|guidelines|guardrails|above|previous)\b/i,
  /\b(system|developer|initial|hidden|original)\s*(prompt|message|instructions?)\b/i,
  /\b(reveal|show|print|repeat|output|dump|leak|tell me|what (is|are))\b.{0,30}\b(your|the)\s+(instructions|prompt|rules|guidelines|configuration|config)\b/i,
  /\b(repeat|print)\b.{0,30}\b(above|everything|verbatim|word for word)\b/i,
  // Role-play jailbreaks
  /\b(jailbreak|do anything now|developer mode|god mode|unfiltered|uncensored)\b/i,
  /\bDAN\b/,
  /\b(you are now|from now on you|pretend (to be|you are)|roleplay as|act as (if|my|an? (ai|assistant|chatbot|different|unrestricted)))\b/i,
  /<\/?(system|instructions?|im_start|im_end)>|\[\/?INST\]/i,
  // Secrets
  // No word boundaries: names like OPENROUTER_API_KEY contain underscores.
  /api[\s_-]?keys?|secret[\s_-]?keys?|access[\s_-]?tokens?|env(ironment)?[\s_-]?var(iable)?s?|\.env\b|openrouter|upstash/i,
];

export function looksLikeAttack(text: string) {
  return ATTACK_PATTERNS.some((pattern) => pattern.test(text));
}

const REFUSALS = [
  "Nice try. My instructions stay locked up tighter than Drake's unreleased verses. Ask me about Yash's work instead.",
  "I've seen this one before, and I've got trust issues. Not happening. Ask me about Yash's projects, though.",
  "Can't feel my face, can't share my prompt. The Weeknd would understand. Ask me something about Yash instead.",
  "Better now? Nope, still not spilling anything. I only talk about Yash's work, his projects and his writing.",
  "API keys live on the server, far away from me. I couldn't leak them if I tried. Want to hear what Yash has built instead?",
];

export function refusal() {
  return REFUSALS[Math.floor(Math.random() * REFUSALS.length)];
}
