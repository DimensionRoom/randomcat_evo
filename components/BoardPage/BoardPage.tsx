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
const MAX_PROJECTS = 3;

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
  const [currentProjectTitle, setCurrentProjectTitle] = useState<string>("");
  const [savedProjects, setSavedProjects] = useState<BoardProjectSummary[]>([]);
  const [showProjects, setShowProjects] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showOverwriteModal, setShowOverwriteModal] = useState(false);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [overwriteCandidates, setOverwriteCandidates] = useState<
    BoardProjectSummary[]
  >([]);
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

  // Restore a draft saved before the "Sign in to save" OAuth redirect (if any).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`tt_board_draft_${tool}`);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (
        draft?.boardCards?.length ||
        draft?.textAnnotations?.length ||
        draft?.brainstormNotes
      ) {
        setBoardCards(draft.boardCards ?? []);
        setTextAnnotations(draft.textAnnotations ?? []);
        setBrainstormNotes(draft.brainstormNotes ?? "");
      }
      localStorage.removeItem(`tt_board_draft_${tool}`);
    } catch {}
    // run once on mount (e.g. when returning from the OAuth redirect)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleCopyNotes = useCallback(async () => {
    if (!brainstormNotes.trim()) {
      showToast(t ? t("board.nothingToCopy") : "Nothing to copy", "info");
      return;
    }
    try {
      await navigator.clipboard.writeText(brainstormNotes);
      showToast(t ? t("board.copied") : "Copied to clipboard", "success");
    } catch (e) {
      showToast(t ? t("board.copyError") : "Copy failed", "error");
    }
  }, [brainstormNotes, showToast, t]);

  const handleSaveProject = useCallback(async () => {
    if (!user) {
      // Persist the current board so it survives the OAuth redirect/remount.
      try {
        localStorage.setItem(
          `tt_board_draft_${tool}`,
          JSON.stringify({ boardCards, textAnnotations, brainstormNotes })
        );
      } catch {}
      signInWithGoogle();
      return;
    }
    setProjectName(currentProjectTitle || title);
    setShowSaveModal(true);
  }, [
    user,
    signInWithGoogle,
    title,
    tool,
    currentProjectTitle,
    boardCards,
    textAnnotations,
    brainstormNotes,
  ]);

  // Shared write: saves (insert when id is undefined, overwrite when given) and
  // syncs the "currently open" project state + toast.
  const persistProject = useCallback(
    async (id: string | undefined, name: string) => {
      try {
        const saved = await saveProject({
          id,
          tool,
          title: name,
          boardCards,
          textAnnotations,
          brainstormNotes,
        });
        setCurrentProjectId(saved.id);
        setCurrentProjectTitle(name);
        showToast(t ? t("board.saved") : "Project saved", "success");
      } catch (e) {
        showToast(t ? t("board.saveError") : "Could not save project", "error");
      }
    },
    [tool, boardCards, textAnnotations, brainstormNotes, showToast, t]
  );

  const confirmSaveProject = useCallback(async () => {
    const name = projectName.trim();
    if (!name) return;
    // Overwrite the open project only when the name is unchanged. A new name
    // means "save as" a separate project.
    const isUpdate = !!currentProjectId && name === currentProjectTitle;

    // Same name as the open project -> confirm before overwriting it.
    if (isUpdate) {
      setShowSaveModal(false);
      setShowUpdateConfirm(true);
      return;
    }

    // New project: enforce the per-tool limit. When full, ask the user which
    // existing project to overwrite instead of creating another.
    try {
      const list = await listProjects(tool);
      if (list.length >= MAX_PROJECTS) {
        setOverwriteCandidates(list);
        setShowSaveModal(false);
        setShowOverwriteModal(true);
        return;
      }
    } catch (e) {
      showToast(t ? t("board.saveError") : "Could not save project", "error");
      setShowSaveModal(false);
      return;
    }

    await persistProject(undefined, name);
    setShowSaveModal(false);
  }, [
    projectName,
    currentProjectId,
    currentProjectTitle,
    tool,
    showToast,
    t,
    persistProject,
  ]);

  const confirmUpdateProject = useCallback(async () => {
    const name = projectName.trim();
    if (!name || !currentProjectId) return;
    await persistProject(currentProjectId, name);
    setShowUpdateConfirm(false);
  }, [projectName, currentProjectId, persistProject]);

  const confirmOverwrite = useCallback(
    async (id: string) => {
      const name = projectName.trim();
      if (!name) return;
      await persistProject(id, name);
      setShowOverwriteModal(false);
    },
    [projectName, persistProject]
  );

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
        setCurrentProjectTitle(project.title);
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
        <div className={styles.mobileNotice}>
          <span className={styles.mobileNoticeIcon}>🖥️</span>
          <h2 className={styles.mobileNoticeTitle}>
            {t ? t("board.mobileTitle") : "Larger screen required"}
          </h2>
          <p className={styles.mobileNoticeText}>
            {t
              ? t("board.mobileDetail")
              : "The creative board is designed for tablet and desktop screens only. Please open this page on a tablet or computer."}
          </p>
        </div>
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
              <div className={styles.headerRow}>
                <div className={styles.headerText}>
                  <h2 className={styles.header}>
                    {t ? t("board.notesTitle") : "Brainstorming Notes"}
                  </h2>
                  <p className={styles.subtext}>
                    {t
                      ? t("board.notesSubtitle")
                      : "Write down your ideas, insights, and creative thoughts"}
                    {onlineUsers.length > 1 && (
                      <span className={styles.shared}>
                        • {t ? t("board.shared") : "Shared with all collaborators"}
                      </span>
                    )}
                  </p>
                </div>
                <div className={styles.headerActions}>
                  <FlatBtn
                    locale={locale}
                    className={styles.projectsBtn}
                    onClick={handleCopyNotes}
                    text={t ? t("board.copyNotes") : "Copy notes"}
                  />
                </div>
              </div>
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
        closeMode="cancel"
        cancelLabel={t ? t("board.cancel") : "Cancel"}
        confirmLabel={t ? t("board.save") : "Save"}
        onConfirm={confirmSaveProject}
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
        </div>
      </DynamicModal>

      <DynamicModal
        size="small"
        isOpen={showOverwriteModal}
        onClose={() => setShowOverwriteModal(false)}
        closeMode="cancel"
        cancelLabel={t ? t("board.cancel") : "Cancel"}
      >
        <div className={styles.saveModal}>
          <h3 className={styles.saveModalTitle}>
            {t ? t("board.overwriteTitle") : "Storage full (3/3)"}
          </h3>
          <p className={styles.overwritePrompt}>
            {t
              ? t("board.overwritePrompt", { name: projectName.trim() })
              : `You can save up to 3 projects. Choose one to replace with "${projectName.trim()}":`}
          </p>
          <div className={styles.overwriteList}>
            {overwriteCandidates.map((p) => (
              <button
                key={p.id}
                type="button"
                className={styles.projectItem}
                onClick={() => confirmOverwrite(p.id)}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      </DynamicModal>

      <DynamicModal
        size="small"
        isOpen={showUpdateConfirm}
        onClose={() => setShowUpdateConfirm(false)}
        closeMode="cancel"
        cancelLabel={t ? t("board.cancel") : "Cancel"}
        confirmLabel={t ? t("board.overwrite") : "Overwrite"}
        onConfirm={confirmUpdateProject}
      >
        <div className={styles.saveModal}>
          <h3 className={styles.saveModalTitle}>
            {t ? t("board.updateConfirmTitle") : "Overwrite this project?"}
          </h3>
          <p className={styles.overwritePrompt}>
            {t
              ? t("board.updateConfirmPrompt", { name: projectName.trim() })
              : `This will overwrite the existing project "${projectName.trim()}". Continue?`}
          </p>
        </div>
      </DynamicModal>
    </TranslationsProvider>
  );
}
