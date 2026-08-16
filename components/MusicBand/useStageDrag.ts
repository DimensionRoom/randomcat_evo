import { useCallback, useEffect, useRef, useState } from "react";
import { clampPercent } from "./types";

/**
 * Drag helper built on Pointer Events so one code path serves mouse, touch and
 * pen — the older board components in this repo bind mouse events only, which
 * is why they cannot be used on a phone.
 *
 * The move/up listeners live on `window` for the duration of the gesture rather
 * than relying on setPointerCapture: selecting a piece re-renders it, which
 * drops the capture after the first move and strands the drag.
 *
 * Coordinates are the element's centre expressed as a percentage of the stage
 * box, so a drag lands in the same relative spot on any screen size.
 */
export function useStageDrag({
  stageRef,
  onMove,
  onDragStart,
}: {
  stageRef: React.RefObject<HTMLElement>;
  onMove: (x: number, y: number) => void;
  onDragStart?: () => void;
}) {
  const [dragging, setDragging] = useState(false);
  // Offset between the pointer and the element centre, in px, for one gesture.
  const grab = useRef({ dx: 0, dy: 0 });
  const pointerId = useRef<number | null>(null);
  const moved = useRef(false);

  // Keep the latest onMove without restarting the listener effect mid-drag.
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      // Without this the browser starts its native image drag on the card
      // artwork and immediately fires pointercancel, stranding the gesture.
      event.preventDefault();
      const rect = event.currentTarget.getBoundingClientRect();
      grab.current = {
        dx: event.clientX - (rect.left + rect.width / 2),
        dy: event.clientY - (rect.top + rect.height / 2),
      };
      pointerId.current = event.pointerId;
      moved.current = false;
      setDragging(true);
      onDragStart?.();
    },
    [onDragStart]
  );

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (event: PointerEvent) => {
      if (pointerId.current !== null && event.pointerId !== pointerId.current) {
        return;
      }
      const stage = stageRef.current;
      if (!stage) return;
      const stageRect = stage.getBoundingClientRect();
      if (!stageRect.width || !stageRect.height) return;

      moved.current = true;
      const centerX = event.clientX - grab.current.dx;
      const centerY = event.clientY - grab.current.dy;

      onMoveRef.current(
        clampPercent(((centerX - stageRect.left) / stageRect.width) * 100),
        clampPercent(((centerY - stageRect.top) / stageRect.height) * 100)
      );
    };

    const stopDrag = () => {
      pointerId.current = null;
      setDragging(false);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("pointercancel", stopDrag);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", stopDrag);
      window.removeEventListener("pointercancel", stopDrag);
    };
  }, [dragging, stageRef]);

  return {
    dragHandlers: { onPointerDown: handlePointerDown },
    dragging,
    /** True when the last gesture actually moved — lets callers tell a tap from a drag. */
    didMove: () => moved.current,
  };
}
