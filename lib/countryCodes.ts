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

/** Full English country name -> ISO alpha-3 code (matches GeoJSON feature ids). */
export function nameToAlpha3(name: string): string | null {
  const alpha2 = nameToAlpha2[name];
  if (!alpha2) return null;
  return countries.alpha2ToAlpha3(alpha2) || null;
}
