import type { Metadata } from "next";
import {
  cards,
  cardCategories,
} from "@/public/data/gamificationinbusiness/cards_en";
import BoardPage from "@/components/BoardPage/BoardPage";
import { toolMetadata } from "@/lib/seo";
import enTools from "@/locales/en/toolsListData.json";
import thTools from "@/locales/th/toolsListData.json";

const ONLINE_LINK =
  "onlinetools/businessandinnovation/gamificationinbusiness/board";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return toolMetadata(ONLINE_LINK, locale, enTools, thTools);
}

export default function CardBoard({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <BoardPage
      locale={locale}
      cards={cards}
      cardCategories={cardCategories}
      title="Gamification In Business"
      tool="gamificationinbusiness"
    />
  );
}
