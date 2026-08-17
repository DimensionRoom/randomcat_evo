export type SceneId =
  | "jazz"
  | "string"
  | "stringcombo"
  | "folk"
  | "chamber"
  | "orchestra";

export interface Ensemble {
  id: SceneId;
  nameEn: string;
  nameTh: string;
  subtitle: string;
  venueEn: string;
  venueTh: string;
  descEn: string;
  descTh: string;
  accent: string;
}

/** The six band types from the client's Music Band spec sheet. */
export const ensembles: Ensemble[] = [
  {
    id: "jazz",
    nameEn: "Jazz Band",
    nameTh: "วงแจ๊ส",
    subtitle: "Jazz Band",
    venueEn: "Late-night jazz club",
    venueTh: "คลับแจ๊สยามค่ำคืน",
    descEn:
      "Saxophone, trumpet, piano, bass and drums built on improvisation and swing.",
    descTh:
      "แซกโซโฟน ทรัมเป็ต เปียโน เบส และกลอง เน้นการด้นสดและจังหวะสวิง",
    accent: "#c98f1f",
  },
  {
    id: "string",
    nameEn: "String Band",
    nameTh: "วงสตริง",
    subtitle: "String Band",
    venueEn: "Concert stage",
    venueTh: "เวทีคอนเสิร์ต",
    descEn:
      "A popular-music line-up of electric guitar, bass, drums and keyboard.",
    descTh:
      "วงดนตรีสมัยนิยม ประกอบด้วยกีตาร์ไฟฟ้า เบส กลองชุด และคีย์บอร์ด",
    accent: "#c0392b",
  },
  {
    id: "stringcombo",
    nameEn: "String Combo Band",
    nameTh: "วงสตริงคอมโบ",
    subtitle: "String Combo Band",
    venueEn: "Open-air festival stage",
    venueTh: "เวทีกลางแจ้ง",
    descEn:
      "A string band expanded with a horn section for a fuller, punchier sound.",
    descTh:
      "วงสตริงที่เพิ่มแถวเครื่องเป่าเข้ามา ทำให้เสียงหนาและมีพลังยิ่งขึ้น",
    accent: "#e0567a",
  },
  {
    id: "folk",
    nameEn: "Folk Band",
    nameTh: "วงโฟล์ค",
    subtitle: "Folk Band",
    venueEn: "Acoustic café",
    venueTh: "คาเฟ่อะคูสติก",
    descEn:
      "A warm acoustic group of guitars and light percussion, at home in cafés.",
    descTh:
      "วงอะคูสติกอบอุ่น เน้นกีตาร์โปร่งและเครื่องกระทบเบา ๆ เหมาะกับคาเฟ่",
    accent: "#7fb069",
  },
  {
    id: "chamber",
    nameEn: "Chamber Music",
    nameTh: "วงแชมเบอร์",
    subtitle: "Chamber Music",
    venueEn: "Classical chamber hall",
    venueTh: "ห้องบรรเลงคลาสสิก",
    descEn:
      "A small classical ensemble, usually strings, with one player to a part.",
    descTh:
      "วงคลาสสิกขนาดเล็ก ส่วนใหญ่เป็นเครื่องสาย บรรเลงแนวละหนึ่งคน",
    accent: "#e8c25e",
  },
  {
    id: "orchestra",
    nameEn: "Orchestra Band",
    nameTh: "วงออร์เคสตรา",
    subtitle: "Orchestra Band",
    venueEn: "Grand concert hall",
    venueTh: "ห้องประสานเสียงขนาดใหญ่",
    descEn:
      "A full-scale ensemble of strings, woodwinds, brass and percussion.",
    descTh:
      "วงใหญ่ครบเครื่อง รวมเครื่องสาย ลมไม้ ลมทองเหลือง และเครื่องกระทบ",
    accent: "#f0d896",
  },
];

export function getEnsemble(id: string): Ensemble | undefined {
  return ensembles.find((ensemble) => ensemble.id === id);
}
