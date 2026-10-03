"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import PageShell from "@/components/PageShell/PageShell";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import PageFooter from "@/components/Footer/PageFooter";
import ImageWithSkeleton from "@/components/Media/ImageWithSkeleton/ImageWithSkeleton";
import CategoryIcon from "@/components/ToolDetails/CategoryIcon";
import DeckCard from "@/components/ToolDetails/DeckCard";
import FlippableDeckCard from "@/components/ToolDetails/FlippableDeckCard";
import StepCards from "@/components/ToolDetails/StepCards";
import {
  loadExampleCards,
  pickVariedCards,
  type ExampleCard,
} from "@/components/ToolDetails/loadExampleCards";
import { toolDetails, neighbourTools } from "@/public/data/toolDetails";
import toolsListEn from "@/locales/en/toolsListData.json";
import { mitr } from "@/lib/fonts";
import styles from "./ToolDetails.module.scss";

const i18nNamespaces = ["toolDetailsScreen"];

type ListItem = { lead?: string; text?: string; children?: ListItem[] };
type BodyBlock = { p?: string; quote?: string; list?: ListItem[] };

function BodyList({ items, className = "" }: { items: ListItem[]; className?: string }) {
  return (
    <ul className={`${styles.bodyList} ${className}`}>
      {items.map((item, i) => (
        <li key={i}>
          {item.lead && <strong>{item.lead}</strong>}
          {item.lead && item.text ? " " : null}
          {item.text}
          {item.children && <BodyList items={item.children} className={className} />}
        </li>
      ))}
    </ul>
  );
}

/**
 * The "Explore more" page every card tool shares. What differs per tool comes
 * from public/data/toolDetails.ts (theme, categories, image), the curated
 * cards in public/data/toolExampleCards/<toolId>.json, and the
 * `tools.<toolId>` copy in the toolDetailsScreen namespace.
 */
export default function ToolDetailsPage({
  params: { locale, toolId },
}: {
  params: { locale: string; toolId: string };
}) {
  const config = toolDetails[toolId];
  if (!config) notFound();

  const { t, resources, ready } = useTranslations(locale, i18nNamespaces);
  const [cards, setCards] = useState<ExampleCard[]>([]);
  const [examples, setExamples] = useState<ExampleCard[]>([]);

  useEffect(() => {
    let active = true;
    loadExampleCards(toolId).then((loaded) => {
      if (!active) return;
      // Drawn once per page load: four examples spread across categories, then
      // the hero card, which comes from outside those four whenever the file
      // has more than four cards.
      const [a, b, c, d, hero] = pickVariedCards(loaded, 5);
      const drawn = [a, b, c, d].filter(Boolean);
      setExamples(drawn);
      setCards([hero ?? drawn[0]].filter(Boolean));
    });
    return () => {
      active = false;
    };
  }, [toolId]);

  const isThai = locale === "th";
  const thFont = isThai ? `${mitr.className} ${styles.thfont}` : "";
  const tool = (key: string, options?: object) => t(`tools.${toolId}.${key}`, options);

  const title = tool("title");
  const tags = tool("testimonial.tags", { returnObjects: true }) as string[];
  const body = tool("testimonial.body", { returnObjects: true }) as BodyBlock[];
  const testimonialTitle = tool("testimonial.title");
  const image = config.testimonialImage;

  const heroCard = cards[0] ?? null;
  // The hero arrows step through the other tools in the same category.
  const neighbours = neighbourTools(toolId, toolsListEn.tools);
  const toolTitle = (id: string) => t(`tools.${id}.title`);

  const back = heroCard ? (
    <DeckCard
      side="back"
      theme={config.cardTheme ?? config.theme}
      toolTitle={title}
      card={heroCard}
    />
  ) : null;

  // A row of two leftovers is split in half rather than left short, so five
  // categories read as 3 + 2 wide tiles instead of 3 + 2 with a hole.
  const catCount = config.categories.length;
  const lastRowCount = catCount % 3;

  const bodyBlocks = Array.isArray(body) ? body : [];
  const renderBody = () =>
    bodyBlocks.map((block, i) => {
      if (block.quote) {
        return (
          <p key={i} className={`${styles.quote} ${thFont}`}>
            “{block.quote}”
          </p>
        );
      }
      if (block.list) return <BodyList key={i} items={block.list} className={thFont} />;
      return (
        <p key={i} className={thFont}>
          {block.p}
        </p>
      );
    });

  return (
    <PageShell
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
      ready={ready}
    >
      <MainNavigationTopBar fill locale={locale} />
      <main className={`${styles.main} ${styles[config.theme]}`}>
        {/* ---------- Hero ---------- */}
        <section className={styles.hero}>
          <h1 className={styles.title}>{title}</h1>
          <p className={`${styles.subtitle} ${thFont}`}>{tool("subtitle")}</p>

          <div className={styles.showcase}>
            {neighbours ? (
              <Link
                href={`/${locale}/onlinetools/details/${neighbours.prev}`}
                className={styles.arrow}
                aria-label={t("ui.prevTool", { name: toolTitle(neighbours.prev) })}
                title={toolTitle(neighbours.prev)}
              >
                <ChevronsLeft aria-hidden="true" />
              </Link>
            ) : (
              <span className={styles.arrowSpacer} />
            )}

            <div className={styles.showcaseCards}>
              <div className={styles.showcaseFront}>
                {heroCard && (
                  <DeckCard
                    key={heroCard.code}
                    side="front"
                    theme={config.cardTheme ?? config.theme}
                    card={heroCard}
                    toolTitle={title}
                    brandLabel={toolId === "innovation_design" ? "Inno Design" : title}
                    className={styles.fadeIn}
                  />
                )}
              </div>
              <div className={styles.showcaseBack}>{back}</div>
            </div>

            {neighbours ? (
              <Link
                href={`/${locale}/onlinetools/details/${neighbours.next}`}
                className={styles.arrow}
                aria-label={t("ui.nextTool", { name: toolTitle(neighbours.next) })}
                title={toolTitle(neighbours.next)}
              >
                <ChevronsRight aria-hidden="true" />
              </Link>
            ) : (
              <span className={styles.arrowSpacer} />
            )}
          </div>
        </section>

        {/* ---------- Categories ---------- */}
        <section className={styles.categories}>
          <h2 className={`${styles.sectionTitle} ${thFont}`}>
            {tool("categoriesHeading")}
          </h2>
          <div className={styles.categoryGrid}>
            {config.categories.map(({ key }, i) => {
              const inLastRow = lastRowCount === 2 && i >= catCount - 2;
              return (
                <div
                  key={key}
                  className={styles.categoryTile}
                  data-shade={i % 6}
                  style={inLastRow ? { gridColumn: "span 3" } : undefined}
                >
                  <CategoryIcon name={key} className={styles.categoryIcon} />
                  <span className={thFont}>{tool(`categories.${key}`)}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------- Steps ---------- */}
        <section className={styles.steps}>
          {[t("ui.step1"), t("ui.step2"), tool("step3")].map((text, i) => (
            <div key={i} className={styles.step}>
              <StepCards count={i + 1} />
              <p className={`${styles.stepLabel} ${thFont}`}>
                {t("ui.stepLabel", { n: i + 1 })}
              </p>
              <p className={`${styles.stepText} ${thFont}`}>{text}</p>
            </div>
          ))}
        </section>

        {/* ---------- Testimonial ---------- */}
        <section className={styles.testimonial}>
          <h2 className={`${styles.sectionTitle} ${thFont}`}>
            {t("ui.testimonialTitle")}
          </h2>
          {Array.isArray(tags) && tags.length > 0 && (
            <p className={`${styles.tags} ${thFont}`}>{tags.join("  |  ")}</p>
          )}

          {image?.layout === "side" ? (
            <div className={styles.testimonialSide}>
              <div className={styles.testimonialImage}>
                <ImageWithSkeleton
                  src={image.src}
                  alt={testimonialTitle}
                  responsive
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 720px) 80vw, 360px"
                />
              </div>
              <div className={styles.testimonialBody}>
                {testimonialTitle && (
                  <h3 className={`${styles.testimonialHeading} ${thFont}`}>
                    {testimonialTitle}
                  </h3>
                )}
                {renderBody()}
              </div>
            </div>
          ) : (
            <div className={styles.testimonialStacked}>
              {testimonialTitle && (
                <h3 className={`${styles.testimonialHeading} ${thFont}`}>
                  {testimonialTitle}
                </h3>
              )}
              {image && (
                <div className={styles.testimonialImageCenter}>
                  <ImageWithSkeleton
                    src={image.src}
                    alt={testimonialTitle}
                    responsive
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 720px) 80vw, 420px"
                  />
                </div>
              )}
              <div className={styles.testimonialBody}>{renderBody()}</div>
            </div>
          )}
        </section>

        {/* ---------- Card example ---------- */}
        <section className={styles.examples}>
          <h2 className={`${styles.sectionTitle} ${thFont}`}>
            {t("ui.cardExampleTitle")}
          </h2>
          <div className={styles.exampleRow} data-count={examples.length}>
            {examples.map((card, index) => (
              <FlippableDeckCard key={`${toolId}-${card.code}`} theme={config.cardTheme ?? config.theme}
                card={card} toolTitle={title}
                initiallyFlipped={index === 2}
                brandLabel={toolId === "innovation_design" ? "Inno Design" : title}
                showFrontLabel={t("ui.showFront")}
                showBackLabel={t("ui.showBack")} />
            ))}
          </div>
        </section>

        <section className={styles.footerSection}>
          <PageFooter locale={locale} />
        </section>
      </main>
    </PageShell>
  );
}
