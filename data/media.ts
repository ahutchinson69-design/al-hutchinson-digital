/**
 * Media page + homepage media section.
 *
 * PLACEHOLDER LINKS — every external URL below is a stand-in. Replace `href`
 * with the real destination and set `isPlaceholder: false`. Placeholder links
 * render as disabled chips rather than as live links, so the site never points
 * a visitor at a URL that does not exist.
 */

export type MediaLink = {
  label: string;
  href: string;
  isPlaceholder: boolean;
};

export type MediaItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  /** "video" | "audio" | "visual" — drives the placeholder graphic. */
  kind: "video" | "audio" | "visual";
  /** Path under /public. Null renders the generated placeholder. */
  image?: string | null;
  /** Short alt text — required whenever `image` is set. */
  imageAlt?: string;
  links: MediaLink[];
};

export const featuredMedia: MediaItem = {
  slug: "moon-tape-radio",
  title: "Moon Tape Radio",
  category: "Creative Media",
  kind: "video",
  image: "/images/media/moon-tape-radio.jpg",
  imageAlt:
    "Painted night scene: an open window above a small desk lamp, looking out over rooftops toward a full moon.",
  description:
    "A visual and musical storytelling project pairing atmospheric lofi music with original illustrated environments. Each episode is built as a place rather than a playlist — a single scene, held long enough to become somewhere you can work, study, or rest inside.",
  links: [
    {
      label: "Watch on YouTube",
      href: "https://www.youtube.com/@MoonTapeRadio",
      isPlaceholder: false,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/alhutchinsonnp",
      isPlaceholder: false,
    },
  ],
};

export const mediaItems: MediaItem[] = [
  {
    slug: "video-projects",
    title: "Video Projects",
    category: "Video",
    kind: "video",
    image: "/images/media/video-projects.jpg",
    imageAlt:
      "A length of 16mm film unspooled beside a metal reel on a dark surface, lit by a single beam of light.",
    description:
      "Short-form explainer and promotional video work, including motion pieces built programmatically rather than in a timeline editor.",
    // No link until there is somewhere real to send people. Moon Tape Radio
    // has its own channel link on the featured card above.
    links: [],
  },
  {
    slug: "audio-experiences",
    title: "Audio Experiences",
    category: "Audio",
    kind: "audio",
    image: "/images/media/audio-experiences.jpg",
    imageAlt:
      "Concentric ripples spreading across dark still water, their crests catching a low warm light.",
    description:
      "Ambient and atmospheric audio work — arrangement, sequencing, and the sound design that gives a scene its sense of place.",
    links: [],
  },
  {
    slug: "visual-design",
    title: "Visual Design Work",
    category: "Design",
    kind: "visual",
    image: "/images/media/visual-design.jpg",
    imageAlt:
      "Painted night scene: fireflies drifting over a misty river in a dark forest, beneath a crescent moon.",
    description:
      "Illustrated environments, cover art, and the visual language that keeps a recurring project recognisable at a glance.",
    links: [],
  },
  {
    slug: "infographics",
    title: "Infographics and Visual Guides",
    category: "Education",
    kind: "visual",
    image: "/images/media/infographics.jpg",
    imageAlt:
      "An abstract diagram of circles, rectangles and connecting lines drawn in pale gold ink on dark grey paper.",
    description:
      "Visual explanations of AI workflows and healthcare technology concepts, designed to be understood without technical background.",
    links: [],
  },
  {
    slug: "interviews",
    title: "Interviews and Presentations",
    category: "Speaking",
    kind: "video",
    image: "/images/media/interviews.jpg",
    imageAlt:
      "A vintage broadcast microphone alone on a stand under a single spotlight in an empty, darkened studio.",
    description:
      "Recorded talks, panels and interviews. Nothing is published here yet — this section fills as speaking engagements are recorded.",
    links: [],
  },
];
