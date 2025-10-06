"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Download, Trash2 } from "lucide-react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Kanit, Quicksand, Mitr, Poppins } from "next/font/google";
import { useCollaboration } from "@/hooks/useCollaboration";
import {
  Card,
  BoardCard,
  TextAnnotation,
} from "@/components/CanvasBoard/types/Card";
import {
  cards,
  cardCategories,
} from "@/public/data/gamificationinbusiness/cards_en";
import { exportBoardToPDF } from "@/utils/pdfExport";
import initTranslations from "@/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import LottieAnimation from "@/components/Loading/LottieAnimation";
import mainLoad from "@/public/json/mainload.json";
import styles from "./Board.module.scss";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import CanvasBoard from "@/components/CanvasBoard/CanvasBoard";
import CategorySection from "@/components/CanvasBoard/CategorySection";
import BrainstormNotes from "@/components/CanvasBoard/BrainstormNotes";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";

export type SubCategoryProps = {
  name: string;
  nameEx: string;
  fullDescription: string;
  catItemId: string;
};

const i18nNamespaces = ["contentboard"];
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const popins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const mitr = Mitr({
  subsets: ["thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
});
export default function CardBoard({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [t, setT] = useState<any>(null);
  const searchParams = useSearchParams();
  const searchParamsInfo = searchParams.get("info");
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [subCategory, setSubCategory] = useState<SubCategoryProps[]>([
    {
      name: "Gamification",
      nameEx: "In Business",
      fullDescription: '"-"',
      catItemId: "gamificationinbusiness",
    },
  ]);
  const fullCategoryName = "Gamification In Business";
  // Existing states
  const [boardCards, setBoardCards] = useState<BoardCard[]>([]);
  const [textAnnotations, setTextAnnotations] = useState<TextAnnotation[]>([]);
  const [draggedCard, setDraggedCard] = useState<Card | null>(null);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [brainstormNotes, setBrainstormNotes] = useState("");
  const [userName, setUserName] = useState("");

  // Collaboration states
  const [sessionId, setSessionId] = useState<string>("");
  const [showCollaboration, setShowCollaboration] = useState(false);

  // Project management states
  const [showProjectManager, setShowProjectManager] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);

  // Project code search states
  const [showProjectCodeInput, setShowProjectCodeInput] = useState(false);

  // Auth modal state
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Collaboration hook
  const {
    isConnected,
    onlineUsers,
    broadcastBoardUpdate,
    broadcastNotesUpdate,
    subscribeToUpdates,
    refreshSession,
    joinSession,
  } = useCollaboration(sessionId, userName);

  // Subscribe to collaboration updates
  useEffect(() => {
    if (isConnected && userName) {
      subscribeToUpdates(
        (newBoardCards: BoardCard[]) => {
          setBoardCards(newBoardCards);
        },
        (newNotes: string) => {
          setBrainstormNotes(newNotes);
        }
      );
    }
  }, [isConnected, userName, subscribeToUpdates]);

  // Group cards by category
  const categorizedCards = cards.reduce((acc, card) => {
    if (!acc[card.category]) {
      acc[card.category] = [];
    }
    acc[card.category].push(card);
    return acc;
  }, {} as Record<string, Card[]>);

  const handleDragStart = useCallback((e: React.DragEvent, card: Card) => {
    setDraggedCard(card);
    e.dataTransfer.effectAllowed = "copy";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();

      if (!draggedCard) return;

      const boardRect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - boardRect.left - 100;
      const y = e.clientY - boardRect.top - 70;

      const newBoardCard: BoardCard = {
        ...draggedCard,
        id: `${draggedCard.id}-${Date.now()}`,
        x: Math.max(0, x),
        y: Math.max(0, y),
        isFlipped: false,
      };

      const updatedCards = [...boardCards, newBoardCard];
      setBoardCards(updatedCards);
      broadcastBoardUpdate(updatedCards);
      setDraggedCard(null);
    },
    [draggedCard, boardCards, broadcastBoardUpdate]
  );

  const handleCardMove = useCallback(
    (id: string, x: number, y: number) => {
      const updatedCards = boardCards.map((card) =>
        card.id === id ? { ...card, x, y } : card
      );
      setBoardCards(updatedCards);
      broadcastBoardUpdate(updatedCards);
    },
    [boardCards, broadcastBoardUpdate]
  );

  const handleCardFlip = useCallback(
    (id: string) => {
      const updatedCards = boardCards.map((card) =>
        card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
      );
      setBoardCards(updatedCards);
      broadcastBoardUpdate(updatedCards);
    },
    [boardCards, broadcastBoardUpdate]
  );

  const handleCardRemove = useCallback(
    (id: string) => {
      const updatedCards = boardCards.filter((card) => card.id !== id);
      setBoardCards(updatedCards);
      broadcastBoardUpdate(updatedCards);
    },
    [boardCards, broadcastBoardUpdate]
  );

  // Text annotation handlers
  const handleTextAdd = useCallback((x: number, y: number, text: string) => {
    const newAnnotation: TextAnnotation = {
      id: `text-${Date.now()}`,
      x,
      y,
      text,
      fontSize: 14,
      color: "#374151",
      createdAt: Date.now(),
    };
    setTextAnnotations((prev) => [...prev, newAnnotation]);
  }, []);

  const handleTextUpdate = useCallback((id: string, text: string) => {
    setTextAnnotations((prev) =>
      prev.map((annotation) =>
        annotation.id === id ? { ...annotation, text } : annotation
      )
    );
  }, []);

  const handleTextRemove = useCallback((id: string) => {
    setTextAnnotations((prev) =>
      prev.filter((annotation) => annotation.id !== id)
    );
  }, []);

  const handleTextMove = useCallback((id: string, x: number, y: number) => {
    setTextAnnotations((prev) =>
      prev.map((annotation) =>
        annotation.id === id ? { ...annotation, x, y } : annotation
      )
    );
  }, []);

  const handleClearBoard = useCallback(() => {
    setBoardCards([]);
    setTextAnnotations([]);
    setBrainstormNotes("");
    broadcastBoardUpdate([]);
    broadcastNotesUpdate("");
  }, [broadcastBoardUpdate, broadcastNotesUpdate]);

  const handleNotesChange = useCallback(
    (notes: string) => {
      setBrainstormNotes(notes);
      broadcastNotesUpdate(notes);
    },
    [broadcastNotesUpdate]
  );

  const handleExportPDF = useCallback(async () => {
    setIsExporting(true);
    const boardElement = document.querySelector(
      '[data-export="creative-session"]'
    ) as HTMLElement;
    console.log("boardElement", boardElement);
    if (boardElement) {
      const success = await exportBoardToPDF(
        boardElement,
        "think-tool-session",
        userName,
        brainstormNotes
      );
      if (!success) {
        alert("Failed to export PDF. Please try again.");
      }
    }

    setIsExporting(false);
  }, [userName, brainstormNotes]);

  useEffect(() => {
    async function fetchTranslations() {
      const { t, resources } = await initTranslations(locale, i18nNamespaces);
      setT(() => t);
      setResources(resources);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    fetchTranslations();
  }, [locale]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieAnimation animationData={mainLoad} />
      </div>
    );
  }

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <MainNavigationTopBar locale={locale} />
      <main className={styles.main}>
        <div className={styles.canvasSession} data-export="creative-session">
          <div className={styles.creativeArea}>
            <div className={styles.notesHeaderWrapper}>
              <h2 className={styles.header}>
                Creative Board - Gamification In Business
              </h2>
              <p className={styles.subtext}>
                Drag cards from the sidebar to start brainstorming
              </p>
              {/* <FlatBtn
                className={`${styles.randomAllMobileBtn}`}
                text="Export PDF"
                onClick={() => handleExportPDF()}
              /> */}
            </div>
            <div className={styles.boardArea} data-board="true">
              <CanvasBoard
                cards={boardCards}
                textAnnotations={textAnnotations}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onCardMove={handleCardMove}
                onCardFlip={handleCardFlip}
                onCardRemove={handleCardRemove}
                onTextAdd={handleTextAdd}
                onTextUpdate={handleTextUpdate}
                onTextRemove={handleTextRemove}
                onTextMove={handleTextMove}
              />
            </div>
            <div className={styles.notesHeaderWrapper}>
              <h2 className={styles.header}>Brainstorming Notes</h2>
              <p className={styles.subtext}>
                Write down your ideas, insights, and creative thoughts
                {onlineUsers.length > 1 && (
                  <span className={styles.shared}>
                    • Shared with all collaborators
                  </span>
                )}
              </p>
            </div>
            <BrainstormNotes
              brainstormNotes={brainstormNotes}
              onChange={handleNotesChange}
              onlineUsers={onlineUsers}
            />
          </div>
          {/* Right Sidebar - Card Categories */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarContent}>
              <div className={styles.header}>
                <h2 className={styles.title}>Card Library</h2>
                <p className={styles.subtitle}>
                  Double-click to preview • Drag to board
                </p>
              </div>

              <div className={styles.categoryList}>
                {Object.entries(cardCategories).map(([category, info]) => (
                  <CategorySection
                    key={category}
                    category={category as keyof typeof cardCategories}
                    cards={categorizedCards[category] || []}
                    onDragStart={handleDragStart}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </TranslationsProvider>
  );
}
