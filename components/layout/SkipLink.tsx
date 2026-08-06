/**
 * SkipLink — first tab stop on every page, visible only when focused.
 */

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-full focus:bg-accent focus:px-5 focus:text-sm focus:font-medium focus:text-canvas"
    >
      Skip to main content
    </a>
  );
}
