"use client";
import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";
import PageShell from "@/components/PageShell/PageShell";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import SiteLogo from "@/public/svgs/siteLogo";
import mainLoad from "@/public/json/mainload.json";
import { mitr } from "@/lib/fonts";
import type { Ensemble } from "@/public/data/musicband/ensembles";
import { getInstrument, type Instrument } from "@/public/data/musicband/instruments";
import VenueScene from "./VenueScene";
import InstrumentTray from "./InstrumentTray";
import StagePieceItem from "./StagePieceItem";
import StageNoteItem from "./StageNoteItem";
import { useBandAudio } from "./useBandAudio";
import { exportStageToPDF, type ExportStep } from "./exportStagePDF";
import { clampScale, type StageNote, type StagePiece } from "./types";
import styles from "./BandStage.module.scss";

const i18nNamespaces = ["musicBandScreen"];

export default function BandStage({
  locale,
  ensemble,
}: {
  locale: string;
  ensemble: Ensemble;
}) {
  const { t, resources, ready } = useTranslations(locale, i18nNamespaces);
  const isThai = locale === "th";
  const thFont = isThai ? `${mitr.className} ${styles.thfont}` : "";

  const [pieces, setPieces] = useState<StagePiece[]>([]);
  const [notes, setNotes] = useState<StageNote[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportStep, setExportStep] = useState<ExportStep>("prepare");
  const [exportPercent, setExportPercent] = useState(0);
  const [exportError, setExportError] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const topZ = useRef(1);
  const seq = useRef(0);

  const audio = useBandAudio(ensemble.id);

  const nextZ = () => {
    topZ.current += 1;
    return topZ.current;
  };

  // Every pick drops a fresh instance, so tapping the same instrument again
  // adds another copy rather than moving the existing one.
  const addPiece = useCallback((instrument: Instrument) => {
    seq.current += 1;
    const uid = `${instrument.id}-${seq.current}`;
    // Fan new pieces out slightly so stacked copies stay distinguishable.
    const spread = (seq.current % 5) * 6 - 12;
    setPieces((current) => [
      ...current,
      {
        uid,
        instrumentId: instrument.id,
        x: 50 + spread,
        y: 58 + ((seq.current % 3) - 1) * 8,
        scale: 1,
        z: nextZ(),
      },
    ]);
    setSelected(uid);
  }, []);

  const movePiece = useCallback((uid: string, x: number, y: number) => {
    setPieces((current) =>
      current.map((piece) => (piece.uid === uid ? { ...piece, x, y } : piece))
    );
  }, []);

  const scalePiece = useCallback((uid: string, scale: number) => {
    setPieces((current) =>
      current.map((piece) =>
        piece.uid === uid ? { ...piece, scale: clampScale(scale) } : piece
      )
    );
  }, []);

  const removePiece = useCallback((uid: string) => {
    setPieces((current) => current.filter((piece) => piece.uid !== uid));
    setSelected((current) => (current === uid ? null : current));
  }, []);

  const selectPiece = useCallback((uid: string) => {
    setSelected(uid);
    setPieces((current) =>
      current.map((piece) =>
        piece.uid === uid ? { ...piece, z: nextZ() } : piece
      )
    );
    setNotes((current) =>
      current.map((note) => (note.uid === uid ? { ...note, z: nextZ() } : note))
    );
  }, []);

  const addNote = useCallback(() => {
    seq.current += 1;
    const uid = `note-${seq.current}`;
    setNotes((current) => [
      ...current,
      { uid, x: 50, y: 22, text: "", z: nextZ() },
    ]);
    setSelected(uid);
  }, []);

  const clearStage = () => {
    if (pieces.length === 0 && notes.length === 0) return;
    if (!window.confirm(t("stage.clearConfirm"))) return;
    setPieces([]);
    setNotes([]);
    setSelected(null);
  };

  const handleExport = async () => {
    const stage = stageRef.current;
    if (!stage || exporting) return;
    setSelected(null);
    setExportError(false);
    setExportStep("prepare");
    setExportPercent(0);
    setExporting(true);
    try {
      // Let the selection chrome unmount before the capture.
      await new Promise((resolve) => window.setTimeout(resolve, 60));
      await exportStageToPDF(
        stage,
        `music-band-${ensemble.id}`,
        (step, percent) => {
          setExportStep(step);
          setExportPercent(percent);
        }
      );
      // Hold the finished bar briefly so the completion is actually visible;
      // saving happens in the same tick the bar reaches 100%.
      await new Promise((resolve) => window.setTimeout(resolve, 350));
    } catch {
      // Surface the failure instead of silently returning to the idle button.
      setExportError(true);
    } finally {
      setExporting(false);
    }
  };

  const itemCount = pieces.length + notes.length;

  return (
    <PageShell
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
      ready={ready}
      loaderAnimation={mainLoad}
    >
      <div className={styles.MobileHeader}>
        <header className={styles.LayoutHeader}>
          <Link href="/" className={styles.textLink}>
            <div className={styles.BrandContainer}>
              <div className={styles.LogoContainer}>
                <SiteLogo />
              </div>
            </div>
          </Link>
        </header>
      </div>

      <main
        className={styles.main}
        style={{ ["--accent" as string]: ensemble.accent }}
      >
        <div className={styles.HeaderSection}>
          <MainNavigationTopBar fill locale={locale} />
        </div>

        <div className={styles.workspace}>
          <div className={styles.toolbar}>
            <Link
              href={`/${locale}/onlinetools/educationandparent/musiccard/band`}
              className={`${styles.toolButton} ${thFont}`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 12H6M12 5l-7 7 7 7" />
              </svg>
              {t("stage.back")}
            </Link>

            <div className={styles.toolbarTitle}>
              <span className={`${styles.toolbarName} ${thFont}`}>
                {isThai ? ensemble.nameTh : ensemble.nameEn}
              </span>
            </div>

            <div className={styles.toolbarActions}>
              <button
                type="button"
                className={`${styles.toolButton} ${thFont}`}
                onClick={audio.toggle}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 9v6h4l5 4V5L9 9H5z" />
                  {audio.playing ? (
                    <path d="M17 8.5a5 5 0 0 1 0 7" />
                  ) : (
                    <path d="M17 9.5l5 5M22 9.5l-5 5" />
                  )}
                </svg>
                {audio.playing ? t("stage.soundOn") : t("stage.soundOff")}
              </button>

              <button
                type="button"
                className={`${styles.toolButton} ${thFont}`}
                onClick={addNote}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 20h4l10-10-4-4L4 16v4z" />
                </svg>
                {t("stage.addText")}
              </button>

              <button
                type="button"
                className={`${styles.toolButton} ${thFont}`}
                onClick={clearStage}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13" />
                </svg>
                {t("stage.clear")}
              </button>

              <button
                type="button"
                className={`${styles.toolButton} ${styles.toolButtonPrimary} ${thFont}`}
                onClick={handleExport}
                disabled={exporting}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 4v11M8 11l4 4 4-4M5 19h14" />
                </svg>
                {exporting ? t("stage.exporting") : t("stage.export")}
              </button>
            </div>
          </div>

          <div
            className={styles.stage}
            ref={stageRef}
            data-band-stage="true"
            onPointerDown={(event) => {
              if (event.target === event.currentTarget) setSelected(null);
            }}
          >
            <VenueScene scene={ensemble.id} />

            {itemCount === 0 && (
              <p
                className={`${styles.emptyHint} ${thFont}`}
                data-html2canvas-ignore="true"
              >
                {t("stage.empty")}
              </p>
            )}

            {pieces.map((piece) => {
              const instrument = getInstrument(piece.instrumentId);
              if (!instrument) return null;
              return (
                <StagePieceItem
                  key={piece.uid}
                  piece={piece}
                  instrument={instrument}
                  label={isThai ? instrument.nameTh : instrument.nameEn}
                  selected={selected === piece.uid}
                  stageRef={stageRef}
                  labels={{
                    remove: t("stage.remove"),
                    smaller: t("stage.smaller"),
                    bigger: t("stage.bigger"),
                  }}
                  onMove={movePiece}
                  onScale={scalePiece}
                  onSelect={selectPiece}
                  onRemove={removePiece}
                />
              );
            })}

            {notes.map((note) => (
              <StageNoteItem
                key={note.uid}
                note={note}
                selected={selected === note.uid}
                placeholder={t("stage.notePlaceholder")}
                removeLabel={t("stage.remove")}
                thFont={thFont}
                stageRef={stageRef}
                onMove={(uid, x, y) =>
                  setNotes((current) =>
                    current.map((entry) =>
                      entry.uid === uid ? { ...entry, x, y } : entry
                    )
                  )
                }
                onChange={(uid, text) =>
                  setNotes((current) =>
                    current.map((entry) =>
                      entry.uid === uid ? { ...entry, text } : entry
                    )
                  )
                }
                onSelect={selectPiece}
                onRemove={(uid) => {
                  setNotes((current) =>
                    current.filter((entry) => entry.uid !== uid)
                  );
                  setSelected((current) => (current === uid ? null : current));
                }}
              />
            ))}

            <span className={styles.stageCount} data-html2canvas-ignore="true">
              {itemCount} {t("stage.itemsLabel")}
            </span>
          </div>

          <InstrumentTray
            isThai={isThai}
            labels={{
              scrollLeft: t("stage.scrollLeft"),
              scrollRight: t("stage.scrollRight"),
            }}
            onPick={addPiece}
          />
        </div>

        {/* Outside the stage element (and ignored by html2canvas) so it can
            never end up inside the exported PDF. */}
        {exporting && (
          <div
            className={styles.exportOverlay}
            data-html2canvas-ignore="true"
            role="status"
            aria-live="polite"
          >
            <div className={styles.exportCard}>
              <p className={`${styles.exportStep} ${thFont}`}>
                {t(`stage.exportSteps.${exportStep}`)}
              </p>
              <div
                className={styles.exportBar}
                role="progressbar"
                aria-valuenow={exportPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span
                  className={styles.exportBarFill}
                  style={{ width: `${exportPercent}%` }}
                />
              </div>
              <p className={styles.exportPercent}>{exportPercent}%</p>
            </div>
          </div>
        )}

        {exportError && (
          <div
            className={styles.exportOverlay}
            data-html2canvas-ignore="true"
            role="alert"
          >
            <div className={styles.exportCard}>
              <p className={`${styles.exportErrorText} ${thFont}`}>
                {t("stage.exportFailed")}
              </p>
              <button
                type="button"
                className={`${styles.toolButton} ${thFont}`}
                onClick={() => setExportError(false)}
              >
                {t("stage.close")}
              </button>
            </div>
          </div>
        )}
      </main>
    </PageShell>
  );
}
