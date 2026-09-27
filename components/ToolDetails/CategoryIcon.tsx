import { categoryIconPaths, type CategoryIconName } from './categoryIcons';

/** Decorative: the adjacent category label provides the accessible name. */
export default function CategoryIcon({ name, className }: {
  name: CategoryIconName;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true" focusable="false" className={className}>
      <path d={categoryIconPaths[name]} />
    </svg>
  );
}
