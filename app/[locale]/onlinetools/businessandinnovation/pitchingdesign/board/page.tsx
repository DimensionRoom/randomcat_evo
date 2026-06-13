import {
  cards,
  cardCategories,
} from "@/public/data/pitchingdesign/cards_en";
import BoardPage from "@/components/BoardPage/BoardPage";

export default function PitchingDesignBoard({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <BoardPage
      locale={locale}
      cards={cards}
      cardCategories={cardCategories}
      title="Pitching Design"
      tool="pitchingdesign"
    />
  );
}
