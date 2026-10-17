/**
 * Turns a visit's referrer host and UTM tags into a traffic channel, for the
 * admin "Traffic sources" card. Kept in code rather than SQL so the lists can
 * grow without a migration; usage_by_source stores the raw values.
 */

export type Channel = "search" | "social" | "ai" | "referral" | "campaign" | "direct";

export interface SourceInput {
  referrer_host?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
}

export interface Classified {
  channel: Channel;
  /** Display name of the source: "Google", "LINE", "example.com", ... */
  source: string;
}

// Checked in order; first match wins. AI comes before search because
// gemini.google.com would otherwise read as Google search.
const RULES: { channel: Channel; name: string; test: RegExp }[] = [
  { channel: "ai", name: "ChatGPT", test: /(^|\.)(chatgpt\.com|chat\.openai\.com)$/ },
  { channel: "ai", name: "Gemini", test: /(^|\.)gemini\.google\.com$/ },
  { channel: "ai", name: "Perplexity", test: /(^|\.)perplexity\.ai$/ },
  { channel: "ai", name: "Copilot", test: /(^|\.)copilot\.microsoft\.com$/ },
  { channel: "ai", name: "Claude", test: /(^|\.)claude\.ai$/ },
  { channel: "search", name: "Google", test: /(^|\.)google\.[a-z.]+$/ },
  { channel: "search", name: "Bing", test: /(^|\.)bing\.com$/ },
  { channel: "search", name: "Yahoo", test: /(^|\.)yahoo\.[a-z.]+$/ },
  { channel: "search", name: "DuckDuckGo", test: /(^|\.)duckduckgo\.com$/ },
  { channel: "search", name: "Baidu", test: /(^|\.)baidu\.com$/ },
  { channel: "search", name: "Yandex", test: /(^|\.)yandex\.[a-z.]+$/ },
  { channel: "search", name: "Naver", test: /(^|\.)naver\.com$/ },
  { channel: "search", name: "Ecosia", test: /(^|\.)ecosia\.org$/ },
  { channel: "search", name: "Brave Search", test: /^search\.brave\.com$/ },
  { channel: "social", name: "Facebook", test: /(^|\.)(facebook\.com|fb\.com|fb\.me|messenger\.com)$/ },
  { channel: "social", name: "Instagram", test: /(^|\.)instagram\.com$/ },
  { channel: "social", name: "LINE", test: /(^|\.)line\.me$/ },
  { channel: "social", name: "X", test: /(^|\.)(t\.co|twitter\.com|x\.com)$/ },
  { channel: "social", name: "TikTok", test: /(^|\.)tiktok\.com$/ },
  { channel: "social", name: "YouTube", test: /(^|\.)(youtube\.com|youtu\.be)$/ },
  { channel: "social", name: "LinkedIn", test: /(^|\.)(linkedin\.com|lnkd\.in)$/ },
  { channel: "social", name: "Pinterest", test: /(^|\.)pinterest\.[a-z.]+$/ },
  { channel: "social", name: "Reddit", test: /(^|\.)reddit\.com$/ },
  { channel: "social", name: "Threads", test: /(^|\.)threads\.(net|com)$/ },
];

const byHost = (host: string) => RULES.find((r) => r.test.test(host));

// Short utm_source spellings people actually type.
const UTM_ALIASES: Record<string, string> = {
  fb: "Facebook",
  ig: "Instagram",
  yt: "YouTube",
  tw: "X",
  twitter: "X",
  li: "LinkedIn",
  gpt: "ChatGPT",
  openai: "ChatGPT",
};

export function classifySource(input: SourceInput): Classified {
  const host = (input.referrer_host ?? "").toLowerCase().replace(/^www\./, "");
  const utm = (input.utm_source ?? "").trim();

  // A tag naming a known site counts as that site's channel, so a link shared
  // in LINE chats as ?utm_source=line lands under Social / LINE (in-app
  // browsers usually send no referrer). Any other tag is a campaign.
  if (utm) {
    const name = UTM_ALIASES[utm.toLowerCase()] ?? utm;
    const known = RULES.find((r) => r.name.toLowerCase() === name.toLowerCase());
    return known ? { channel: known.channel, source: known.name } : { channel: "campaign", source: utm };
  }
  if (!host) return { channel: "direct", source: "Direct" };
  const rule = byHost(host);
  if (rule) return { channel: rule.channel, source: rule.name };
  return { channel: "referral", source: host };
}

/**
 * Hosts that are not a source even though they show up as the referrer: the
 * sign-in round trip (Google accounts, Supabase auth) lands back on the site
 * with them as the referrer.
 */
export function isIgnoredReferrer(host: string): boolean {
  return /(^|\.)(accounts\.google\.com|supabase\.co|supabase\.in)$/.test(host.toLowerCase());
}
