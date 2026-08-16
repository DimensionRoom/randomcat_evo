/** A placed instrument. x/y are percentages of the stage box, so the layout
 *  survives window resizes and exports exactly as it looks on screen. */
export interface StagePiece {
  uid: string;
  instrumentId: string;
  x: number;
  y: number;
  scale: number;
  z: number;
}

export interface StageNote {
  uid: string;
  x: number;
  y: number;
  text: string;
  z: number;
}

export const MIN_SCALE = 0.45;
export const MAX_SCALE = 2.6;
export const SCALE_STEP = 0.15;

export function clampScale(value: number): number {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
}

export function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}
