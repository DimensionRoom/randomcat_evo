"use client";
import React from "react";
import { notFound } from "next/navigation";
import BandStage from "@/components/MusicBand/BandStage";
import { getEnsemble } from "@/public/data/musicband/ensembles";

export default function BandStagePage({
  params: { locale, bandId },
}: {
  params: { locale: string; bandId: string };
}) {
  const ensemble = getEnsemble(bandId);
  if (!ensemble) notFound();

  return <BandStage locale={locale} ensemble={ensemble} />;
}
