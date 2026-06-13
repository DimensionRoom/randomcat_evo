"use client";
import React, { useState, useEffect, useCallback } from "react";

import { useCollaboration } from "@/hooks/useCollaboration";
import {
  Card,
  BoardCard,
  TextAnnotation,
} from "@/components/CanvasBoard/types/Card";
import initTranslations from "@/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import LottieAnimation from "@/components/Loading/LottieAnimation";
import mainLoad from "@/public/json/mainload.json";
import styles from "./BoardPage.module.scss";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import CanvasBoard from "@/components/CanvasBoard/CanvasBoard";
import CategorySection from "@/components/CanvasBoard/CategorySection";
import BrainstormNotes from "@/components/CanvasBoard/BrainstormNotes";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import {
  saveProject,
  listProjects,
  loadProject,
  type BoardProjectSummary,
} from "@/lib/supabase/boardProjects";

const i18nNamespaces = ["contentboard"];

interface BoardPageProps {
  locale: string;
  cards: Card[];
  cardCategories: Record<string, { name: string; color: string; icon: string }>;
  title: string;
  tool: string;
}

export default function BoardPage({
  locale,
  cards,
  cardCategories,
  title,
  tool,
}: BoardPageProps) {
  const { user, configured, signInWithGoogle } = useAuth();
  const { showToast } = useToast();
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [savedProjects, setSavedProjects] = useState<BoardProjectSummary[]>([]);
  const [showProjects, setShowProjects] = useState(false);
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [boardCards, setBoardCards] = useState<BoardCard[]>([]);
  const [textAnnotations, setTextAnnotations] = useState<TextAnnotation[]>([]);
  const [draggedCard, setDraggedCard] = useState<Card | null>(null);
  const [brainstormNotes, setBrainstormNotes] = useState("");
  const [userName, setUserName] = useState("");

  const [sessionId, setSessionId] = useState<string>("");

  const {
    isConnected,
    onlineUsers,
    broadcastBoardUpdate,
    broadcastNotesUpdate,
    subscribeToUpdates,
  } = useCollaboration(sessionId, userName);

  useEffect(() => {
    if (isConnected && userName) {
      subscribeToUpdates(
        (newBoardCards: BoardCard[]) => setBoardCards(newBoardCards),
        (newNotes: string) => setBrainstormNotes(newNotes)
      );
    }
  }, [isConnected, userName, subscribeToUpdates]);

  const categorizedCards = cards.reduce((acc, card) => {
    if (!acc[card.category]) acc[card.category] = [];
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
      prev.map((a) => (a.id === id ? { ...a, text } : a))
    );
  }, []);

  const handleTextRemove = useCallback((id: string) => {
    setTextAnnotations((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const handleTextMove = useCallback((id: string, x: number, y: number) => {
    setTextAnnotations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, x, y } : a))
    );
  }, []);

  const handleNotesChange = useCallback(
    (notes: string) => {
      setBrainstormNotes(notes);
      broadcastNotesUpdate(notes);
    },
    [broadcastNotesUpdate]
  );

  const handleSaveProject = useCallback(async () => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    const projectName = window.prompt("Project name:", title)?.trim() || "";
    if (!projectName) return;
    try {
      const saved = await saveProject({
        id: currentProjectId ?? undefined,
        tool,
        title: projectName,
        boardCards,
        textAnnotations,
        brainstormNotes,
      });
      setCurrentProjectId(saved.id);
      showToast("Project saved", "success");
    } catch (e) {
      showToast("Could not save project", "error");
    }
  }, [
    user,
    signInWithGoogle,
    title,
    currentProjectId,
    tool,
    boardCards,
    textAnnotations,
    brainstormNotes,
    showToast,
  ]);

  const handleOpenProjects = useCallback(async () => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    try {
      const list = await listProjects(tool);
      setSavedProjects(list);
      setShowProjects(true);
    } catch (e) {
      showToast("Could not load your projects", "error");
    }
  }, [user, signInWithGoogle, tool, showToast]);

  const handleLoadProject = useCallback(
    async (id: string) => {
      try {
        const project = await loadProject(id);
        setBoardCards(project.board_cards ?? []);
        setTextAnnotations(project.text_annotations ?? []);
        setBrainstormNotes(project.brainstorm_notes ?? "");
        setCurrentProjectId(project.id);
        setShowProjects(false);
        showToast(`Loaded "${project.title}"`, "success");
      } catch (e) {
        showToast("Could not open that project", "error");
      }
    },
    [showToast]
  );

  useEffect(() => {
    async function fetchTranslations() {
      const { t, resources } = await initTranslations(locale, i18nNamespaces);
      setT(() => t);
      setResources(resources);
      setTimeout(() => setLoading(false), 1000);
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
              <h2 className={styles.header}>Creative Board - {title}</h2>
              <p className={styles.subtext}>
                Drag cards from the sidebar to start brainstorming
              </p>
              {configured && (
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={handleSaveProject}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 8,
                      border: "1px solid #ddd",
                      background: "#fff",
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    {user ? "Save" : "Sign in to save"}
                  </button>
                  {user && (
                    <button
                      type="button"
                      onClick={handleOpenProjects}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        border: "1px solid #ddd",
                        background: "#fff",
                        cursor: "pointer",
                        fontSize: 13,
                      }}
                    >
                      My Projects
                    </button>
                  )}
                </div>
              )}
              {showProjects && (
                <div
                  style={{
                    marginTop: 8,
                    border: "1px solid #eee",
                    borderRadius: 8,
                    padding: 8,
                    maxHeight: 200,
                    overflow: "auto",
                  }}
                >
                  {savedProjects.length === 0 ? (
                    <p style={{ fontSize: 13, color: "#666" }}>
                      No saved projects yet.
                    </p>
                  ) : (
                    savedProjects.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleLoadProject(p.id)}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          padding: "6px 8px",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          fontSize: 13,
                        }}
                      >
                        {p.title}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
            <div className={styles.boardArea} data-board="true">
              <CanvasBoard
                categoryInfo={cardCategories}
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
                    keyName={category}
                    key={category}
                    category={cardCategories}
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
