/**
 * Minimal className joiner.
 *
 * Deliberately dependency-free — the project does not need the conflict
 * resolution that clsx + tailwind-merge provide, and this keeps the client
 * bundle smaller.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
