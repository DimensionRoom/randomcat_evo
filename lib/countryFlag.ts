// Reverse map: full English country name -> ISO-3166 alpha-2 code, built once
// from Intl.DisplayNames so we can render a flag emoji from the stored name.
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const nameToCode: Record<string, string> = {};
for (let i = 65; i <= 90; i++) {
  for (let j = 65; j <= 90; j++) {
    const code = String.fromCharCode(i) + String.fromCharCode(j);
    const name = regionNames.of(code);
    // Keep the first (standard) code; otherwise aliases like UK/FX/SU overwrite
    // GB/FR/RU and produce non-rendering flag emojis.
    if (name && name !== code && !nameToCode[name]) nameToCode[name] = code;
  }
}

/** Flag emoji for a full English country name; globe for unknown. */
export function countryFlag(name: string): string {
  const code = nameToCode[name];
  if (!code) return "🌐";
  return String.fromCodePoint(
    ...[...code].map((ch) => 127397 + ch.charCodeAt(0))
  );
}
