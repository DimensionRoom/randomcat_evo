/**
 * Where to draw a dot for countries with no shape in the map's geography
 * (world-atlas countries-110m): mostly small islands and micro-states, which
 * would be under a pixel at world scale even on a detailed map. Countries that
 * do have a shape are drawn as shapes; their entries here are simply unused.
 *
 * Keyed by ISO alpha-2; values are [longitude, latitude] near the capital or
 * main island.
 */
export const MAP_POINTS: Record<string, [number, number]> = {
  AD: [1.52, 42.51], // Andorra
  AG: [-61.8, 17.08], // Antigua & Barbuda
  AI: [-63.05, 18.22], // Anguilla
  AS: [-170.7, -14.3], // American Samoa
  AW: [-69.97, 12.52], // Aruba
  AX: [19.92, 60.18], // Åland Islands
  BB: [-59.55, 13.19], // Barbados
  BH: [50.55, 26.07], // Bahrain
  BL: [-62.83, 17.9], // St. Barthélemy
  BM: [-64.78, 32.3], // Bermuda
  BQ: [-68.26, 12.15], // Caribbean Netherlands (Bonaire)
  BV: [3.41, -54.42], // Bouvet Island
  CC: [96.87, -12.17], // Cocos (Keeling) Islands
  CK: [-159.78, -21.24], // Cook Islands
  CV: [-23.6, 15.1], // Cape Verde
  CW: [-68.99, 12.17], // Curaçao
  CX: [105.69, -10.45], // Christmas Island
  DM: [-61.37, 15.41], // Dominica
  FM: [158.21, 6.92], // Micronesia
  FO: [-6.91, 61.89], // Faroe Islands
  GD: [-61.68, 12.12], // Grenada
  GF: [-53.13, 3.93], // French Guiana
  GG: [-2.59, 49.45], // Guernsey
  GI: [-5.35, 36.14], // Gibraltar
  GP: [-61.55, 16.25], // Guadeloupe
  GS: [-36.59, -54.43], // South Georgia & South Sandwich Islands
  GU: [144.79, 13.44], // Guam
  HK: [114.17, 22.32], // Hong Kong
  HM: [73.5, -53.08], // Heard & McDonald Islands
  IM: [-4.55, 54.24], // Isle of Man
  IO: [72.4, -7.3], // British Indian Ocean Territory
  JE: [-2.13, 49.21], // Jersey
  KI: [172.98, 1.45], // Kiribati
  KM: [43.87, -11.88], // Comoros
  KN: [-62.78, 17.36], // St. Kitts & Nevis
  KP: [127.51, 40.34], // North Korea
  KY: [-81.25, 19.31], // Cayman Islands
  LC: [-60.98, 13.91], // St. Lucia
  LI: [9.55, 47.17], // Liechtenstein
  MC: [7.42, 43.74], // Monaco
  MF: [-63.08, 18.07], // St. Martin
  MH: [171.18, 7.13], // Marshall Islands
  MO: [113.54, 22.2], // Macao
  MP: [145.75, 15.18], // Northern Mariana Islands
  MQ: [-61.02, 14.64], // Martinique
  MS: [-62.19, 16.74], // Montserrat
  MT: [14.38, 35.94], // Malta
  MU: [57.55, -20.35], // Mauritius
  MV: [73.22, 3.2], // Maldives
  NF: [167.95, -29.04], // Norfolk Island
  NR: [166.93, -0.52], // Nauru
  NU: [-169.87, -19.05], // Niue
  PF: [-149.4, -17.68], // French Polynesia
  PM: [-56.27, 46.94], // St. Pierre & Miquelon
  PN: [-130.1, -25.07], // Pitcairn Islands
  PW: [134.58, 7.51], // Palau
  RE: [55.54, -21.12], // Réunion
  SC: [55.49, -4.68], // Seychelles
  SG: [103.82, 1.35], // Singapore
  SH: [-5.71, -15.96], // St. Helena
  SJ: [15.47, 78.22], // Svalbard & Jan Mayen
  SM: [12.46, 43.94], // San Marino
  SS: [31.31, 7.86], // South Sudan
  ST: [6.61, 0.19], // São Tomé & Príncipe
  SX: [-63.06, 18.04], // Sint Maarten
  TC: [-71.8, 21.69], // Turks & Caicos Islands
  TK: [-171.85, -9.2], // Tokelau
  TO: [-175.2, -21.18], // Tonga
  TV: [179.19, -8.52], // Tuvalu
  UM: [166.61, 19.28], // U.S. Outlying Islands (Wake Island)
  VA: [12.45, 41.9], // Vatican City
  VC: [-61.2, 13.25], // St. Vincent & Grenadines
  VG: [-64.64, 18.42], // British Virgin Islands
  VI: [-64.9, 18.34], // U.S. Virgin Islands
  WF: [-176.2, -13.77], // Wallis & Futuna
  WS: [-172.1, -13.76], // Samoa
  XK: [20.9, 42.6], // Kosovo
  YT: [45.17, -12.83], // Mayotte
};
