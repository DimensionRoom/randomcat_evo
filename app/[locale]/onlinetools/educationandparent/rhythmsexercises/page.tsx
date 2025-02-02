"use client";
import React, { useState, useEffect, useRef, use } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Kanit, Quicksand, Mitr, Poppins } from "next/font/google";
import initTranslations from "@/i18n";
import MainNavigationTopBar from "@/components/NavigationBar/MainNavigationTopBar";
import Link from "next/link";
import Image from "next/image";
import TranslationsProvider from "@/components/TranslationsProvider";
import FlatBtn from "@/components/Button/FlatBtn/FlatBtn";
import ToggleBtn from "@/components/Button/ToggleBtn/toggleBtn";
import TempoControl from "@/components/TempoControl/TempoControl";
import musicLoad from "@/public/json/musicLoading.json";
import SiteLogo from "@/public/svgs/siteLogo";
import styles from "./RhythmsExercises.module.scss";

const i18nNamespaces = ["common"];
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

type NoteType =
  | "quarter"
  | "whole"
  | "half"
  | "quarterRest"
  | "wholeRest"
  | "halfRest"
  | "eighth"
  | "eighthRest";

interface NoteOption {
  id: NoteType;
  symbol: string;
}

export default function RhythmsExercises({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const [t, setT] = useState<any>(null);
  const [resources, setResources] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [noteOptions, setNoteOptions] = useState<NoteOption[]>([
    { id: "half", symbol: "half" },
    { id: "whole", symbol: "whole" },
    {
      id: "quarter",
      symbol: "quarter",
    },
    {
      id: "eighth",
      symbol: "eighth",
    },
    {
      id: "halfRest",
      symbol: "halfRest",
    },
    {
      id: "wholeRest",
      symbol: "wholeRest",
    },
    {
      id: "quarterRest",
      symbol: "quarterRest",
    },
    {
      id: "eighthRest",
      symbol: "eighthRest",
    },
  ]);
  const [selectedNotes, setSelectedNotes] = useState<NoteOption[]>(noteOptions);
  const [generatedNotes, setGeneratedNotes] = useState<NoteType[]>([]);
  const [tempo, setTempo] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const nextNoteTime = useRef(0);
  const timerID = useRef<number | null>(null);

  const toggleNote = (noteType: NoteType) => {
    setSelectedNotes((prev) => {
      if (prev.some((note) => note.id === noteType)) {
        if (prev.length === 1) return prev;
        return prev.filter((note) => note.id !== noteType);
      } else {
        return [...prev, noteOptions.find((note) => note.id === noteType)!];
      }
    });
  };

  const scheduleNote = (time: number) => {
    if (!audioContext.current) return;
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    oscillator.frequency.value = 440;
    gainNode.gain.value = 0.1;
    oscillator.start(time);
    oscillator.stop(time + 0.1);
  };

  const scheduler = () => {
    if (!audioContext.current) return;
    while (nextNoteTime.current < audioContext.current.currentTime + 0.1) {
      scheduleNote(nextNoteTime.current);
      nextNoteTime.current += 60.0 / tempo;
    }
    timerID.current = window.setTimeout(scheduler, 25.0);
  };

  const togglePlay = () => {
    if (isPlaying) {
      timerID.current && clearTimeout(timerID.current);
      setIsPlaying(false);
    } else {
      if (audioContext.current) {
        nextNoteTime.current = audioContext.current.currentTime;
        scheduler();
        setIsPlaying(true);
      }
    }
  };

  const generateNewSequence = () => {
    console.log("gg");
    if (selectedNotes.length === 0) return;
    const availableNotes = selectedNotes;
    console.log("availableNotes", availableNotes, selectedNotes);
    setGeneratedNotes(
      Array.from(
        { length: 8 },
        () =>
          availableNotes[Math.floor(Math.random() * availableNotes.length)].id
      )
    );
  };

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
    generateNewSequence();
    audioContext.current = new AudioContext();
    return () => {
      audioContext.current?.close();
    };
  }, [locale]);

  useEffect(() => {
    if (isPlaying) {
      timerID.current && clearTimeout(timerID.current);
      scheduler();
    }
  }, [tempo]);

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
        <Player
          autoplay
          loop
          src={musicLoad}
          style={{ width: "30vh" }}
        ></Player>
      </div>
    );
  }

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className={`${styles.MobileHeader}`}>
        <header className={`${styles.LayoutHeader}`}>
          <Link href="/" className={`${styles.textLink}`}>
            <div className={styles.BrandContainer}>
              <div className={styles.LogoContainer}>
                <SiteLogo />
              </div>
            </div>
          </Link>
        </header>
      </div>
      <main className={styles.main}>
        <div className={styles.HeaderSection}>
          <MainNavigationTopBar fill fillMode="transparent" locale={locale} />
        </div>
        <div className={styles.randomSection}>
          <div className={styles.ToolName}>
            <p className={`${styles.ToolNameText}`}>Exercises: Rhythms</p>
          </div>
          <div className={styles.noteOptionsContainer}>
            {noteOptions.map((note) => (
              <ToggleBtn
                key={note.id}
                locale={locale}
                pressed={selectedNotes.some(
                  (selectedNote) => selectedNote.id === note.id
                )}
                onPressedChange={() => toggleNote(note.id)}
              >
                <span className="mr-2">{t(`note.${note.symbol}`)}</span>
              </ToggleBtn>
            ))}
          </div>
          <div className={styles.generatedNotesContainer}>
            <div className={styles.noteContainer}>
              {generatedNotes.map((note, index) => {
                const noteSymbol = noteOptions.find(
                  (opt) => opt.id === note
                )?.symbol;
                return (
                  <div key={index} className={styles.noteDisplay}>
                    <Image
                      className={styles.icon}
                      src={`/svgs/svg/soundnote/${noteSymbol}.svg`}
                      width={100}
                      height={100}
                      style={{ objectFit: "contain" }}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.tempoContainer}>
              <TempoControl
                tempo={tempo}
                setTempo={setTempo}
                togglePlay={togglePlay}
                isPlaying={isPlaying}
              />
            <FlatBtn
              className={styles.generateBtn}
              onClick={() => generateNewSequence()}
              text="สุ่ม"
              icon={<SiteLogo />}
            />
          </div>
        </div>
      </main>
    </TranslationsProvider>
  );
}
