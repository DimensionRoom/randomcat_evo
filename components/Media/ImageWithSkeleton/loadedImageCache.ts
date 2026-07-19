// In-memory, session-scoped cache of image sources that have already
// finished loading at least once. Deliberately module-level (like
// hooks/useCollaboration.ts's mock store) rather than sessionStorage: a
// hard refresh should start fresh, a client-side route change should not.
const loadedImages = new Set<string>();

export function hasImageLoaded(src: string): boolean {
  return loadedImages.has(src);
}

export function markImageLoaded(src: string): void {
  loadedImages.add(src);
}
