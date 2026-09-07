/**
 * Institutions shown in the "Awarded by" band on the home page.
 *
 * Kept as data rather than translation keys because each entry pairs copy with
 * a logo file — the same shape the tool decks in public/data use.
 *
 * Names only: the logos supplied are the institutions themselves, and the award
 * each one gave is not recorded anywhere, so there is nothing else here that
 * could be stated as fact.
 */
export interface Award {
  id: string;
  /** Institution name, as printed on its own logo lock-up. */
  nameEn: string;
  nameTh: string;
  logo: string;
}

const LOGO = "/image/awards";

export const awards: Award[] = [
  {
    id: "chulalongkorn",
    nameEn: "Chulalongkorn University",
    nameTh: "จุฬาลงกรณ์มหาวิทยาลัย",
    logo: `${LOGO}/chulalongkorn.png`,
  },
  {
    id: "khonkaen",
    nameEn: "Khon Kaen University",
    nameTh: "มหาวิทยาลัยขอนแก่น",
    logo: `${LOGO}/khonkaen.png`,
  },
  {
    id: "suansunandha",
    nameEn: "Suan Sunandha Rajabhat University",
    nameTh: "มหาวิทยาลัยราชภัฏสวนสุนันทา",
    logo: `${LOGO}/suansunandha.png`,
  },
  {
    id: "kasetsart",
    nameEn: "Kasetsart University",
    nameTh: "มหาวิทยาลัยเกษตรศาสตร์",
    logo: `${LOGO}/kasetsart.png`,
  },
  {
    id: "sripatum",
    nameEn: "Sripatum University",
    nameTh: "มหาวิทยาลัยศรีปทุม",
    logo: `${LOGO}/sripatum.png`,
  },
];
