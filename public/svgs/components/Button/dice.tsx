import React from "react";

export interface Props {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

export default ({
  width = "100%",
  height = "100%",
  color = "#fff",
  className,
}: Props) => {
  return (
    <svg width={width} height={height} className={className} viewBox="0 0 16 16">
      <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z" />
      <path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    </svg>
  );
};
