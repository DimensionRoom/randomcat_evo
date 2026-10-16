import { toCountryCode } from "./countryCodes";

/**
 * Flag emoji for a stored country value (any wording, or a raw ISO code);
 * globe for unknown.
 */
export function countryFlag(name: string): string {
  const code = toCountryCode(name);
  if (!code) return "🌐";
  return String.fromCodePoint(
    ...[...code].map((ch) => 127397 + ch.charCodeAt(0))
  );
}
