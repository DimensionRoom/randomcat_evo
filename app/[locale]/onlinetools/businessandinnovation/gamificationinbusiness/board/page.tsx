import {
  cards,
  cardCategories,
} from "@/public/data/gamificationinbusiness/cards_en";
import BoardPage from "@/components/BoardPage/BoardPage";

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
