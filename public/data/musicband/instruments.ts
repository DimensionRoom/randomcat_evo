export interface Instrument {
  id: string;
  nameEn: string;
  nameTh: string;
  hintEn: string;
  hintTh: string;
  image: string;
}

export interface InstrumentCategory {
  id: string;
  nameEn: string;
  nameTh: string;
  accent: string;
  instruments: Instrument[];
}

/**
 * Artwork lives in public/image/Instruments/<Category>/<File>.png.
 *
 * Paths are written out in full rather than derived from `nameEn` because the
 * supplied filenames are not consistently cased or spelled ("Double bass.png",
 * "Accodian.png", "Maracus.png"). Casing matters: it resolves either way on
 * macOS but is significant on the Linux hosts the site deploys to.
 */
const ART = "/image/Instruments";

/** Categories and the first 28 entries follow the client's spec sheet. */
export const instrumentCategories: InstrumentCategory[] = [
  {
    id: "strings",
    nameEn: "String Instruments",
    nameTh: "เครื่องสาย",
    accent: "#d9a441",
    instruments: [
      {
        id: "violin",
        nameEn: "Violin",
        nameTh: "ไวโอลิน",
        hintEn: "Bright and leading",
        hintTh: "เสียงสูงใส นำทำนอง",
        image: `${ART}/String/Violin.png`,
      },
      {
        id: "viola",
        nameEn: "Viola",
        nameTh: "วิโอลา",
        hintEn: "Warm middle voice",
        hintTh: "เสียงกลาง อบอุ่น",
        image: `${ART}/String/Viola.png`,
      },
      {
        id: "cello",
        nameEn: "Cello",
        nameTh: "เชลโล",
        hintEn: "Deep and grounded",
        hintTh: "เสียงต่ำหนักแน่น",
        image: `${ART}/String/Cello.png`,
      },
      {
        id: "doublebass",
        nameEn: "Double Bass",
        nameTh: "ดับเบิลเบส",
        hintEn: "The lowest voice",
        hintTh: "เสียงทุ้มต่ำสุด",
        image: `${ART}/String/Double bass.png`,
      },
      {
        id: "harp",
        nameEn: "Harp",
        nameTh: "ฮาร์ป",
        hintEn: "Flowing and sweet",
        hintTh: "เสียงไพเราะคลื่น",
        image: `${ART}/String/Harp.png`,
      },
      {
        id: "acousticguitar",
        nameEn: "Acoustic Guitar",
        nameTh: "กีตาร์โปร่ง",
        hintEn: "Soft and easy",
        hintTh: "เสียงเบาสบาย",
        image: `${ART}/String/Acoustic Guitar.png`,
      },
      {
        id: "electricguitar",
        nameEn: "Electric Guitar",
        nameTh: "กีตาร์ไฟฟ้า",
        hintEn: "Loud and cutting",
        hintTh: "เสียงจัดจ้าน",
        image: `${ART}/String/Electric Guitar.png`,
      },
      {
        id: "electricbass",
        nameEn: "Electric Bass",
        nameTh: "เบสไฟฟ้า",
        hintEn: "Low-end groove",
        hintTh: "จังหวะทุ้มต่ำ",
        image: `${ART}/String/Electric Bass.png`,
      },
    ],
  },
  {
    id: "woodwinds",
    nameEn: "Woodwind Instruments",
    nameTh: "เครื่องลมไม้",
    accent: "#7fb069",
    instruments: [
      {
        id: "piccolo",
        nameEn: "Piccolo",
        nameTh: "พิคโคโล",
        hintEn: "Highest and piercing",
        hintTh: "เสียงสูงแหลมสุด",
        image: `${ART}/Woodwind/Piccolo.png`,
      },
      {
        id: "flute",
        nameEn: "Flute",
        nameTh: "ฟลูต",
        hintEn: "Clear and airy",
        hintTh: "เสียงใสโปร่ง",
        image: `${ART}/Woodwind/Flute.png`,
      },
      {
        id: "clarinet",
        nameEn: "Clarinet",
        nameTh: "คลาริเน็ต",
        hintEn: "Round and mellow",
        hintTh: "เสียงกลมนุ่ม",
        image: `${ART}/Woodwind/Clarinet.png`,
      },
      {
        id: "oboe",
        nameEn: "Oboe",
        nameTh: "โอโบ",
        hintEn: "Reedy and precise",
        hintTh: "เสียงแหลมเรียบ",
        image: `${ART}/Woodwind/Oboe.png`,
      },
      {
        id: "saxophone",
        nameEn: "Saxophone",
        nameTh: "แซกโซโฟน",
        hintEn: "Smooth and striking",
        hintTh: "เสียงเพราะจัดจ้าน",
        image: `${ART}/Woodwind/Saxophone.png`,
      },
      {
        id: "bassoon",
        nameEn: "Bassoon",
        nameTh: "บาสซูน",
        hintEn: "Thick and low",
        hintTh: "เสียงต่ำหนา",
        image: `${ART}/Woodwind/Bassoon.png`,
      },
    ],
  },
  {
    id: "brass",
    nameEn: "Brass Instruments",
    nameTh: "เครื่องลมทองเหลือง",
    accent: "#e8c25e",
    instruments: [
      {
        id: "trumpet",
        nameEn: "Trumpet",
        nameTh: "ทรัมเป็ต",
        hintEn: "Bright and bold",
        hintTh: "เสียงใสโดดเด่น",
        image: `${ART}/Brass/Trumpet.png`,
      },
      {
        id: "frenchhorn",
        nameEn: "French Horn",
        nameTh: "เฟรนช์ฮอร์น",
        hintEn: "Blending and round",
        hintTh: "เสียงกลมกลืน",
        image: `${ART}/Brass/French Horn.png`,
      },
      {
        id: "trombone",
        nameEn: "Trombone",
        nameTh: "ทรอมโบน",
        hintEn: "Sliding and full",
        hintTh: "เสียงเลื่อนไหลเต็ม",
        image: `${ART}/Brass/Trombone.png`,
      },
      {
        id: "euphonium",
        nameEn: "Euphonium",
        nameTh: "ยูโฟเนียม",
        hintEn: "Warm and singing",
        hintTh: "เสียงนุ่มกังวาน",
        image: `${ART}/Brass/Euphonium.png`,
      },
      {
        id: "tuba",
        nameEn: "Tuba",
        nameTh: "ทูบา",
        hintEn: "Big and deep",
        hintTh: "เสียงทุ้มใหญ่",
        image: `${ART}/Brass/Tuba.png`,
      },
    ],
  },
  {
    id: "keyboard",
    nameEn: "Keyboard Instruments",
    nameTh: "เครื่องลิ่มนิ้ว",
    accent: "#9b8bf0",
    instruments: [
      {
        id: "grandpiano",
        nameEn: "Grand Piano",
        nameTh: "แกรนด์เปียโน",
        hintEn: "Covers every range",
        hintTh: "เสียงครอบคลุมทุกช่วง",
        image: `${ART}/Keyboard/Grand Piano.png`,
      },
      {
        id: "uprightpiano",
        nameEn: "Upright Piano",
        nameTh: "เปียโน",
        hintEn: "Compact and warm",
        hintTh: "ขนาดกะทัดรัด เสียงอบอุ่น",
        image: `${ART}/Keyboard/Upright Piano.png`,
      },
      {
        id: "keyboard",
        nameEn: "Keyboard",
        nameTh: "คีย์บอร์ด",
        hintEn: "Many voices in one",
        hintTh: "เสียงหลากหลาย",
        image: `${ART}/Keyboard/Keyboard.png`,
      },
      {
        id: "accordion",
        nameEn: "Accordion",
        nameTh: "แอคคอร์เดียน",
        hintEn: "Bellows-driven and expressive",
        hintTh: "เสียงลมยืดหยุ่น",
        // File is spelled "Accodian" in the supplied artwork.
        image: `${ART}/Keyboard/Accodian.png`,
      },
    ],
  },
  {
    id: "percussion",
    nameEn: "Percussion Instruments",
    nameTh: "เครื่องกระทบ",
    accent: "#c0392b",
    instruments: [
      {
        id: "xylophone",
        nameEn: "Xylophone",
        nameTh: "ไซโลโฟน",
        hintEn: "Bright wooden notes",
        hintTh: "เสียงไม้ใสกังวาน",
        image: `${ART}/Percussion/Xylophone.png`,
      },
      {
        id: "timpani",
        nameEn: "Timpani",
        nameTh: "ทิมปานี",
        hintEn: "Tuned thunder",
        hintTh: "เสียงก้องทุ้ม",
        image: `${ART}/Percussion/Timpani.png`,
      },
      {
        id: "cymbals",
        nameEn: "Cymbals",
        nameTh: "ฉาบ",
        hintEn: "Shimmering accent",
        hintTh: "เสียงแฉ่งกังวาน",
        image: `${ART}/Percussion/Cymbals.png`,
      },
      {
        id: "bassdrum",
        nameEn: "Bass Drum",
        nameTh: "กลองใหญ่",
        hintEn: "Heavy and booming",
        hintTh: "เสียงหนักก้อง",
        image: `${ART}/Percussion/Bass drum.png`,
      },
      {
        id: "snaredrum",
        nameEn: "Snare Drum",
        nameTh: "กลองสแนร์",
        hintEn: "Crisp and sharp",
        hintTh: "จังหวะคมชัด",
        image: `${ART}/Percussion/Snare drum.png`,
      },
      {
        id: "drumset",
        nameEn: "Drum Set",
        nameTh: "กลองชุด",
        hintEn: "Keeps the whole groove",
        hintTh: "คุมจังหวะทั้งวง",
        image: `${ART}/Percussion/Drum set.png`,
      },
      {
        id: "maracas",
        nameEn: "Maracas",
        nameTh: "มาราคัส",
        hintEn: "Shaken rhythm",
        hintTh: "เขย่าให้จังหวะ",
        // File is spelled "Maracus" in the supplied artwork.
        image: `${ART}/Percussion/Maracus.png`,
      },
      {
        id: "tambourine",
        nameEn: "Tambourine",
        nameTh: "แทมโบรีน",
        hintEn: "Jingling accent",
        hintTh: "กระทบกรุ๊งกริ๊ง",
        image: `${ART}/Percussion/Tambourine.png`,
      },
    ],
  },
];

const byId = new Map<string, Instrument>();
instrumentCategories.forEach((category) =>
  category.instruments.forEach((instrument) => byId.set(instrument.id, instrument))
);

export function getInstrument(id: string): Instrument | undefined {
  return byId.get(id);
}
