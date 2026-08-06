/**
 * Social and external profile links.
 *
 * Every entry below is a PLACEHOLDER. Replace `href` with the real profile URL
 * and set `isPlaceholder: false`. Links that are still placeholders are
 * rendered with `rel="nofollow"` and are excluded from structured data, so an
 * unfinished profile never gets advertised to search engines.
 */

export type SocialIconName =
  | "linkedin"
  | "github"
  | "youtube"
  | "mail"
  | "instagram";

export type Social = {
  label: string;
  href: string;
  icon: SocialIconName;
  isPlaceholder: boolean;
};

export const socials: Social[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alhutchinsonnp",
    icon: "linkedin",
    isPlaceholder: false,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/alhutchinsonnp",
    icon: "instagram",
    isPlaceholder: false,
  },
  {
    label: "YouTube",
    /** Moon Tape Radio — the channel, so the link outlives any one episode. */
    href: "https://www.youtube.com/@MoonTapeRadio",
    icon: "youtube",
    isPlaceholder: false,
  },
  {
    label: "Email",
    href: "mailto:AlhutchinsonAPRN@outlook.com",
    icon: "mail",
    isPlaceholder: false,
  },
];

/** Only fully-configured profiles are safe to publish in structured data. */
export const publishedSocials = socials.filter((s) => !s.isPlaceholder);
