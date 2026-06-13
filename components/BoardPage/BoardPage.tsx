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
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import DynamicModal from "@/components/Modal/DynamicModal/DynamicModal";
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
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [projectName, setProjectName] = useState("");
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
    setProjectName(title);
    setShowSaveModal(true);
  }, [user, signInWithGoogle, title]);

  const confirmSaveProject = useCallback(async () => {
    const name = projectName.trim();
    if (!name) return;
    try {
      const saved = await saveProject({
        id: currentProjectId ?? undefined,
        tool,
        title: name,
        boardCards,
        textAnnotations,
        brainstormNotes,
      });
      setCurrentProjectId(saved.id);
      showToast(t ? t("board.saved") : "Project saved", "success");
    } catch (e) {
      showToast(t ? t("board.saveError") : "Could not save project", "error");
    } finally {
      setShowSaveModal(false);
    }
  }, [
    projectName,
    currentProjectId,
    tool,
    boardCards,
    textAnnotations,
    brainstormNotes,
    showToast,
    t,
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
      showToast(t ? t("board.listError") : "Could not load your projects", "error");
    }
  }, [user, signInWithGoogle, tool, showToast, t]);

  const handleLoadProject = useCallback(
    async (id: string) => {
      try {
        const project = await loadProject(id);
        setBoardCards(project.board_cards ?? []);
        setTextAnnotations(project.text_annotations ?? []);
        setBrainstormNotes(project.brainstorm_notes ?? "");
        setCurrentProjectId(project.id);
        setShowProjects(false);
        showToast(
          `${t ? t("board.loaded") : "Loaded"} "${project.title}"`,
          "success"
        );
      } catch (e) {
        showToast(t ? t("board.loadError") : "Could not open that project", "error");
      }
    },
    [showToast, t]
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
              <div className={styles.headerRow}>
                <div className={styles.headerText}>
                  <h2 className={styles.header}>
                    {t ? t("board.title") : "Creative Board"} - {title}
                  </h2>
                  <p className={styles.subtext}>
                    {t
                      ? t("board.subtitle")
                      : "Drag cards from the sidebar to start brainstorming"}
                  </p>
                </div>
                {configured && (
                  <div className={styles.headerActions}>
                    <FlatBtn
                      locale={locale}
                      className={styles.saveBtn}
                      onClick={handleSaveProject}
                      text={
                        user
                          ? t
                            ? t("board.save")
                            : "Save"
                          : t
                          ? t("board.signInToSave")
                          : "Sign in to save"
                      }
                    />
                    {user && (
                      <FlatBtn
                        locale={locale}
                        className={styles.projectsBtn}
                        onClick={handleOpenProjects}
                        text={t ? t("board.myProjects") : "My Projects"}
                      />
                    )}
                    {showProjects && (
                      <div className={styles.projectsDropdown}>
                        {savedProjects.length === 0 ? (
                          <p className={styles.projectsEmpty}>
                            {t ? t("board.noProjects") : "No saved projects yet."}
                          </p>
                        ) : (
                          savedProjects.map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              className={styles.projectItem}
                              onClick={() => handleLoadProject(p.id)}
                            >
                              {p.title}
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
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

      <DynamicModal
        size="small"
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      >
        <div className={styles.saveModal}>
          <h3 className={styles.saveModalTitle}>
            {t ? t("board.saveTitle") : "Save project"}
          </h3>
          <input
            className={styles.saveInput}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder={t ? t("board.namePrompt") : "Project name:"}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") confirmSaveProject();
            }}
          />
          <FlatBtn
            locale={locale}
            className={styles.saveBtn}
            onClick={confirmSaveProject}
            text={t ? t("board.save") : "Save"}
          />
        </div>
      </DynamicModal>
    </TranslationsProvider>
  );
}
