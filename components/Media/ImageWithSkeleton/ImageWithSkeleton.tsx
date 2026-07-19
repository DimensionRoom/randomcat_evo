"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ImageWithSkeleton.module.scss";
import { hasImageLoaded, markImageLoaded } from "./loadedImageCache";

// Don't arm the shimmer for loads fast enough that showing it would just
// be a flash (cached decode, tiny asset).
const SKELETON_DELAY_MS = 150;

// Repo's existing broken-image fallback (already referenced in
// TemplateCard.tsx for a missing `image` prop).
const ERROR_FALLBACK = "/image/defaultimg.jpg";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  fill?: boolean;
  /** Numeric = next/image intrinsic sizing (required unless `fill`/`raw`). String (e.g. "100%") is only meaningful in `raw` mode, applied to the wrapper. */
  width?: number | string;
  height?: number | string;
  /** Fill a parent that already has a DEFINITE width and height (e.g. a 48x48 avatar circle). The image is taken out of flow, so a parent whose height is content-driven will collapse to 0 — use `responsive` for those instead. */
  fluid?: boolean;
  /** Match a caller whose CSS sizes the inner image as `width:100%; height:auto` (fluid width, intrinsic aspect ratio) rather than a fixed-height box. `width`/`height` are still required (numeric) when not `raw`, so next/image can compute the aspect ratio and srcset. */
  responsive?: boolean;
  className?: string;
  skeletonClassName?: string;
  /** Extra inline style merged onto the wrapper span (box mode only) — for callers whose sizing (maxWidth/maxHeight/percentage height) must resolve against the wrapper rather than the inner image, e.g. a lightbox image sized relative to its overlay. */
  wrapperStyle?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  style?: React.CSSProperties;
  quality?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Render a plain <img> instead of next/image — for remote sources not covered by next.config.mjs's (currently absent) images.remotePatterns, e.g. OAuth avatars and showcase URLs. */
  raw?: boolean;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export default function ImageWithSkeleton({
  src,
  alt,
  fill,
  width,
  height,
  fluid,
  responsive,
  className,
  skeletonClassName,
  wrapperStyle,
  sizes,
  priority,
  loading,
  style,
  quality,
  onClick,
  raw,
  referrerPolicy,
}: ImageWithSkeletonProps) {
  // Hydration-safe: the first client render must match SSR markup exactly,
  // so the cache is never consulted during render — only after mount.
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const finish = () => {
    markImageLoaded(src);
    setLoaded(true);
  };

  useEffect(() => {
    setLoaded(false);
    setErrored(false);
    setShowSkeleton(false);

    if (hasImageLoaded(src)) {
      setLoaded(true);
      return;
    }

    // Browser-cached images can already be `complete` before/without ever
    // firing onLoad once React attaches — catch that here.
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      finish();
      return;
    }

    const timer = setTimeout(() => setShowSkeleton(true), SKELETON_DELAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const showOverlay = !loaded && !errored && showSkeleton;

  const wrapperClass = fill
    ? styles.wrapperFill
    : fluid
      ? styles.wrapperFluid
      : responsive
        ? styles.wrapperResponsive
        : styles.wrapperBox;

  const isSizedByClass = fill || fluid || responsive;

  // next/image requires either `fill` or numeric width+height. `fluid` mode
  // has neither (it's pure CSS sizing via wrapperFluid), but wrapperFluid is
  // already `position:relative` with a definite width/height, so it's a
  // valid `fill` target — treat fluid as fill for the underlying <Image>.
  const imageFill = fill || (fluid && !raw);

  const resolvedSrc = errored ? ERROR_FALLBACK : src;

  const handleLoad = () => finish();
  const handleError = () => {
    markImageLoaded(src);
    setErrored(true);
  };

  return (
    <span
      className={`${wrapperClass} ${skeletonClassName ?? ""}`}
      style={
        !isSizedByClass ? { width, height, ...wrapperStyle } : wrapperStyle
      }
      onClick={onClick}
    >
      {showOverlay && <span className={styles.shimmer} aria-hidden="true" />}
      {raw ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={resolvedSrc}
          alt={alt}
          className={className}
          style={style}
          referrerPolicy={referrerPolicy}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <Image
          ref={imgRef}
          src={resolvedSrc}
          alt={alt}
          fill={imageFill}
          width={!imageFill && typeof width === "number" ? width : undefined}
          height={
            !imageFill && typeof height === "number" ? height : undefined
          }
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : loading}
          quality={quality}
          className={className}
          style={style}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </span>
  );
}
