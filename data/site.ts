/**
 * Global site configuration.
 *
 * This is the first file to edit when personalising the site: name, tagline,
 * navigation, contact details and the résumé download all originate here.
 *
 * Anything marked PLACEHOLDER must be replaced with real information before
 * the site goes live. Nothing in this file should assert a credential, date,
 * employer or award that has not been supplied.
 */

export const site = {
  /** Public-facing brand name. */
  name: "Al Hutchinson Digital",

  /** How the person is referred to in prose. */
  personName: "Al Hutchinson",

  /** Full professional name, as it appears on the CV. */
  fullName: "Alonda “Al” Hutchinson",

  /** Post-nominals. Shown alongside the full name on About and in metadata. */
  credentials: "MSN, RN, AGPCNP-C",

  /** Primary professional title. */
  role: "Adult-Gerontology Primary Care Nurse Practitioner",

  /** Wordmark rendered in the header and footer. */
  /**
   * The wordmark reads "AL HUTCHINSON | DIGITAL", split so the two halves can
   * be weighted differently: the name at full strength, the suffix dimmer,
   * with a hairline rule between them.
   */
  wordmark: "AL HUTCHINSON",
  wordmarkSuffix: "DIGITAL",

  /** Optional smaller label beneath the wordmark. */
  wordmarkSub: "Healthcare • AI • Education",

  /** Innovation / project-lab label used for experimental work. */
  labName: "Hutchinson FutureWorks",

  /** Default browser tab + search result title. */
  title: "Al Hutchinson, MSN, RN, AGPCNP-C | Healthcare, AI & Innovation",

  /** Primary tagline. */
  tagline:
    "Building practical connections between healthcare, artificial intelligence, education, and creativity.",

  /** Default meta description. */
  description:
    "Alonda “Al” Hutchinson, MSN, RN, AGPCNP-C — board-certified Adult-Gerontology Primary Care Nurse Practitioner, Fleet Marine Force veteran, retired critical care paramedic, healthcare educator, and DNP candidate working on practical AI for healthcare.",

  /**
   * Production domain. Drives canonical URLs, Open Graph tags, the sitemap,
   * robots.txt and structured data.
   *
   * NOTE: the brand is styled "AlHutchinson:Digital", but a colon cannot
   * appear in a domain name — only letters, digits and hyphens are legal. The
   * registrable equivalent is alhutchinsondigital.com. Update this line if you
   * buy a different one.
   */
  url: "https://alhutchinsondigital.com",

  /** Monitored contact address. */
  email: "AlhutchinsonAPRN@outlook.com",

  /** PLACEHOLDER — general location line. Leave broad, not a street address. */
  location: "United States",

  /**
   * The public résumé — one page, condensed from the full CV.
   *
   * Source is `public/resume/src/resume.html`; see the README there to edit
   * and re-render. It deliberately omits home address, phone number, DEA
   * registration and licence numbers, none of which belong on a document
   * anyone can download.
   *
   * The full CV is NOT published. It carries a "CONFIDENTIAL" marking and
   * lives outside `public/` at `assets/cv/` so it is never deployed — send it
   * to named recipients yourself.
   */
  resume: {
    href: "/resume/al-hutchinson-resume.pdf",
    label: "Download Résumé",
    isPlaceholder: false,
  },

  /**
   * Portrait photograph, under /public. Set to null to fall back to the
   * generated "AH" monogram panel.
   */
  portrait: "/images/portrait-outdoor.jpg" as string | null,

  /** Alt text for the portrait — describe what is shown, not that it is a photo. */
  portraitAlt:
    "Al Hutchinson outdoors at golden hour in a white coat embroidered “Hutchinson, AGPCNP”, over a purple shirt and paisley tie.",
} as const;

/** Primary navigation shown in the header and mobile drawer. */
export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Healthcare AI", href: "/healthcare-ai" },
  { label: "Teaching", href: "/teaching" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Secondary navigation. Media lives here rather than in the primary bar to
 * keep the header concise; it is also linked from the homepage and footer.
 */
export const secondaryNav = [{ label: "Media", href: "/media" }] as const;

/** Footer link groups. */
export const footerNav = [
  {
    heading: "Explore",
    links: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Healthcare AI", href: "/healthcare-ai" },
    ],
  },
  {
    heading: "Work",
    links: [
      { label: "Teaching", href: "/teaching" },
      { label: "Insights", href: "/insights" },
      { label: "Media", href: "/media" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
] as const;

/** Short mission statement rendered in the footer. */
export const footerMission =
  "Exploring how artificial intelligence, thoughtful design, and education can make healthcare and human work more efficient and more humane.";
