import countries from "i18n-iso-countries";

// Build a full-English-name -> ISO alpha-2 map from Intl (keep the first/standard
// code seen, so e.g. "United Kingdom" stays GB rather than the alias UK).
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const nameToAlpha2: Record<string, string> = {};
for (let i = 65; i <= 90; i++) {
  for (let j = 65; j <= 90; j++) {
    const code = String.fromCharCode(i) + String.fromCharCode(j);
    const name = regionNames.of(code);
    // Only accept real ISO 3166-1 codes so aliases (DD, FX, SU, UK, ...) don't
    // overwrite DE/FR/RU/GB and break the alpha-3 lookup / map highlight.
    if (name && name !== code && countries.alpha2ToAlpha3(code) && !nameToAlpha2[name]) {
      nameToAlpha2[name] = code;
    }
  }
}

// Stored names come from each visitor's browser, and browsers word some places
// differently from this runtime's Intl ("Hong Kong" vs "Hong Kong SAR China").
// Without these the same country splits into two rows and loses its flag.
// Both directions matter: this resolver also runs in the browser (the map),
// whose Intl may not know the server's wording either.
const ALIASES: Record<string, string> = {
  "hong kong": "HK",
  "hong kong sar china": "HK",
  "macau": "MO",
  "macao": "MO",
  "macao sar china": "MO",
  "burma": "MM",
  "myanmar": "MM",
  "myanmar (burma)": "MM",
  "turkey": "TR",
  "türkiye": "TR",
  "czech republic": "CZ",
  "ivory coast": "CI",
  "cote d'ivoire": "CI",
  "côte d’ivoire": "CI",
  "swaziland": "SZ",
  "cape verde": "CV",
  "palestine": "PS",
  "usa": "US",
  "united states of america": "US",
  "uk": "GB",
  "great britain": "GB",
  "korea": "KR",
  "republic of korea": "KR",
};

const lowerNameToAlpha2: Record<string, string> = {};
for (const [name, code] of Object.entries(nameToAlpha2)) lowerNameToAlpha2[name.toLowerCase()] = code;

/**
 * ISO alpha-2 code for a stored country value, whichever form it is in: a raw
 * code ("TH"), this runtime's English name, or another browser's wording.
 * `null` for empty/"unknown"/unrecognised values.
 */
export function toCountryCode(value: string | null | undefined): string | null {
  const v = (value ?? "").trim();
  if (!v || v.toLowerCase() === "unknown") return null;
  if (/^[A-Za-z]{2}$/.test(v) && countries.alpha2ToAlpha3(v.toUpperCase())) return v.toUpperCase();
  return nameToAlpha2[v] ?? lowerNameToAlpha2[v.toLowerCase()] ?? ALIASES[v.toLowerCase()] ?? null;
}

/**
 * One display name per country, so every variant of a stored value groups
 * under the same label. Unrecognised values are kept as they are.
 */
export function canonicalCountryName(value: string | null | undefined): string {
  const code = toCountryCode(value);
  if (code) return regionNames.of(code) ?? code;
  const v = (value ?? "").trim();
  return v || "unknown";
}

/** Any stored country value -> ISO alpha-3 code (matches GeoJSON feature ids). */
export function nameToAlpha3(name: string): string | null {
  const alpha2 = toCountryCode(name);
  if (!alpha2) return null;
  return countries.alpha2ToAlpha3(alpha2) || null;
}
