/**
 * Project catalogue — the single source of truth for the Projects gallery,
 * the homepage "Featured Projects" grid and every project detail page.
 *
 * ── Adding a project ────────────────────────────────────────────────────────
 * Append an object to `projects`. `slug` becomes the URL (/projects/<slug>)
 * and must be unique. Every detail-page field is optional: sections with no
 * content simply do not render.
 *
 * ── Content status ──────────────────────────────────────────────────────────
 * `contentStatus: "placeholder"` marks detail copy that is illustrative
 * scaffolding rather than a real account, and surfaces a visible notice on the
 * detail page. Every entry here is now "final" — Al has reviewed and approved
 * the write-ups. Use "placeholder" again only for a genuinely unwritten entry.
 *
 * No dates, employers, clients, metrics or outcomes are asserted anywhere in
 * this file. Do not add them unless they are verified.
 */

export const PROJECT_CATEGORIES = [
  "Healthcare",
  "AI",
  "Education",
  "Media",
  "Research",
  "Design",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type ProjectStatus = "Concept" | "Active" | "Research" | "Published";

export type Project = {
  slug: string;
  title: string;
  /** Filter bucket used by the Projects gallery. */
  category: ProjectCategory;
  /** Additional gallery filters for projects that span more than one area. */
  additionalCategories?: ProjectCategory[];
  /** Human-readable label shown on the card — may be more specific. */
  categoryLabel: string;
  status: ProjectStatus;
  /** One-to-two sentence summary used on cards. */
  summary: string;
  /** Marks the project for the homepage grid. */
  featured?: boolean;
  /**
   * Path under /public, e.g. "/images/projects/snf-ai.jpg".
   * Leave null to render the generated placeholder graphic.
   */
  image?: string | null;
  /** Short alt text — required whenever `image` is set. */
  imageAlt?: string;
  /** Live deployment, if the project is publicly viewable. */
  liveUrl?: string;
  /** Label for the live link, e.g. "Open the prototype". */
  liveLabel?: string;

  /* ── Detail page ──────────────────────────────────────────────────────── */
  contentStatus: "placeholder" | "draft" | "final";
  overview?: string;
  problem?: string[];
  solution?: string[];
  process?: { title: string; description: string }[];
  tools?: string[];
  lessons?: string[];
  nextSteps?: string[];
  /** Slugs of related projects shown at the foot of the detail page. */
  related?: string[];
};

export const projects: Project[] = [
  {
    slug: "hutchinson-careos-one",
    title: "Hutchinson CareOS One",
    category: "Healthcare",
    additionalCategories: ["AI"],
    categoryLabel: "Healthcare AI",
    status: "Active",
    featured: true,
    image: "/images/projects/hutchinson-careos-one.jpg",
    imageAlt:
      "The CareOS One prototype on screen: a dark navy panel headed “See the signals that need your team's attention” beside a demonstration sign-in form offering a choice of care-team role.",
    contentStatus: "final",
    liveUrl: "https://hutchinson-careos-one.mightyaeh.chatgpt.site",
    liveLabel: "Open the prototype",
    summary:
      "Care Operations, Clarified — a working prototype that gives skilled nursing leaders a connected operational view of resident risk, documentation readiness, and provider-review context, built entirely on synthetic data.",
    overview:
      "CareOS One is a demonstration prototype for care facility leaders evaluating operational intelligence. It answers a specific question I kept running into on the floor: what would it look like if the signals a Director of Nursing actually needs — who is at risk, what documentation is incomplete, what is waiting on provider review — were visible in one place instead of assembled by hand from four systems.",
    problem: [
      "Operational visibility in a facility is reconstructed manually, usually by the person with the least spare time.",
      "Risk and documentation gaps surface during review or survey rather than while they can still be corrected.",
      "Evaluating any new operational tool normally means exposing real resident data before you know whether the tool is worth it.",
      "Different roles — DON, Administrator, Provider, MDS Coordinator — need different views of the same underlying picture.",
    ],
    solution: [
      "A single operational view covering resident risk, documentation readiness, and provider-review context.",
      "Role-based entry: the interface adapts to whether you are a Director of Nursing, Administrator, Provider, or MDS Coordinator.",
      "Entirely synthetic data and no clinical integration, so the prototype can be evaluated and used for training with no privacy exposure at all.",
      "Human review stays in control — the system prioritises what needs attention, it does not decide what happens next.",
    ],
    process: [
      {
        title: "Start from the daily question",
        description:
          "Work backwards from what facility leadership actually needs to know at the start of a shift, rather than from what data happens to be available.",
      },
      {
        title: "Model the roles",
        description:
          "Map how the same operational picture differs for a DON, an Administrator, a Provider, and an MDS Coordinator.",
      },
      {
        title: "Build on synthetic data",
        description:
          "Construct a realistic but entirely fabricated resident population so the concept can be shown, tested and taught without touching PHI.",
      },
      {
        title: "Ship something clickable",
        description:
          "Put a working prototype in front of people. Descriptions of operational software persuade nobody who runs a building.",
      },
    ],
    tools: [
      "Operational modelling",
      "Synthetic data design",
      "Role-based UX",
      "Prototype development",
    ],
    lessons: [
      "Leaders respond to a prototype they can click through in a way they never respond to a slide.",
      "Building on synthetic data removed the single biggest obstacle to showing the idea at all.",
      "The hard part is not surfacing information — it is deciding what is worth interrupting someone for.",
    ],
    nextSteps: [
      "Gather structured feedback from DONs and administrators working in facilities today.",
      "Expand the documentation-readiness logic.",
      "Define what a real integration would require, and what safeguards would have to hold first.",
    ],
    related: ["snf-ai-documentation-system", "ai-human-work-benchmark-map"],
  },
  {
    slug: "carecompass",
    title: "CareCompass",
    category: "Design",
    categoryLabel: "Product Design",
    status: "Concept",
    featured: true,
    image: "/images/projects/carecompass.jpg",
    imageAlt:
      "A design for the CareCompass landing page: the wordmark over a photograph of a smiling woman, headed “Find the right skilled nursing facility and complete admission paperwork with confidence — in under thirty minutes, not three hours.”, with Start Facility Search and Begin Admission Packet buttons.",
    contentStatus: "final",
    summary:
      "In design. A searchable database of skilled nursing facilities paired with a guided admission-paperwork intake for families — aimed at finding the right facility and completing the packet in under thirty minutes rather than three hours.",
    overview:
      "CareCompass is currently a design, not a product — the interface is drawn, the flows are worked out, and nothing has been built yet. The problem it addresses is one I watch families run into constantly. Choosing a skilled nursing facility usually happens under time pressure, often straight after a hospitalisation, and almost always without any prior experience of the system. Families face two separate problems at once: working out which facilities are appropriate and available, and then completing an admission packet that assumes knowledge they do not have. The design puts both in one place.",
    problem: [
      "Facility selection happens under time pressure, frequently during a discharge window measured in days.",
      "Families have no basis for comparison — the information that distinguishes one facility from another is scattered, inconsistent, or written for regulators rather than relatives.",
      "Admission packets assume familiarity with terminology, insurance mechanics and documentation that most families encounter for the first time.",
      "The paperwork burden lands on the person least equipped to carry it, at the worst possible moment.",
    ],
    solution: [
      "A searchable facility database built around what a family actually needs to compare, not what is easiest to publish.",
      "A guided intake that takes the admission packet one step at a time and explains what each part is for.",
      "Plain language throughout — the interface assumes no prior exposure to skilled nursing.",
      "A compliance view, so the facility side of the process is served by the same tool rather than a parallel one.",
    ],
    process: [
      {
        title: "Start from the family's week",
        description:
          "Map what actually happens between a discharge decision and an admission, and where the hours go.",
      },
      {
        title: "Separate the two problems",
        description:
          "Facility search and paperwork completion are distinct tasks with distinct failure modes; treat them as such rather than merging them into one funnel.",
      },
      {
        title: "Write for the reader who has never done this",
        description:
          "Every label and explanation is aimed at a relative under stress, not at an administrator who already knows the vocabulary.",
      },
    ],
    tools: [
      "Product design",
      "Search and data modelling",
      "Guided intake flows",
      "Plain-language content design",
    ],
    lessons: [
      "The paperwork is not incidental to the admission — for the family it often is the admission.",
      "Two audiences share one process: what reduces work for the facility and what reduces confusion for the family are not automatically the same thing.",
      "Designing the search first and the intake second was the wrong order. The paperwork is where families actually lose their week, so it should lead.",
    ],
    nextSteps: [
      "Put the designed flows in front of families who have recently been through an admission, before any of it is built.",
      "Work out where the facility data would come from, and what could be kept current honestly.",
      "Scope a build once the intake flow survives contact with real families.",
    ],
    related: ["hutchinson-careos-one", "snf-ai-documentation-system"],
  },
  {
    slug: "ai-human-work-benchmark-map",
    title: "AI–Human Work Benchmark Map",
    category: "Research",
    additionalCategories: ["AI"],
    categoryLabel: "Applied Research",
    status: "Active",
    featured: true,
    image: "/images/projects/ai-human-work-benchmark-map.jpg",
    imageAlt:
      "The AI–Human Work Benchmark Map on screen, headed “Where AI helps. Where people remain accountable.”, with summary cards for 64 illustrative task cases, 32 occupation contexts and six model identities.",
    contentStatus: "final",
    liveUrl: "https://ai-human-work-map.mightyaeh.chatgpt.site",
    liveLabel: "Explore the map",
    summary:
      "Where AI helps. Where people remain accountable. A task-level decision tool scoring 64 illustrative work tasks across healthcare, technology, and baseline industries against six frontier models.",
    overview:
      "Most published claims about AI and work are occupation-level, which is precisely the wrong altitude — occupations are bundles of very different tasks, and averaging across them produces numbers that sound authoritative and mean nothing. This map works at the task level instead, and separates two questions that usually get collapsed: what AI can technically do, and what a person should remain accountable for.",
    problem: [
      "Occupation-wide replacement statistics obscure the fact that a single role contains tasks with completely different AI fit.",
      "Technical capability and appropriate delegation get treated as the same question. They are not.",
      "Benchmark claims are often compared across models on incompatible evidence.",
      "Organisations need a basis for deployment decisions, not a headline percentage.",
    ],
    solution: [
      "Evaluate individual work activities — 64 illustrative tasks, two per occupation across 32 roles.",
      "Score every task independently across six stable model identities, using compatible evidence only.",
      "Plot tasks on two axes: AI capability against required human judgment and accountability, producing four zones — human-led high stakes, AI–human opportunity, limited AI fit, and AI-led potential.",
      "Withhold occupation-level ratings deliberately, so the tool cannot be misread as a workforce forecast.",
      "Publish an analyst overlay that argues frankly against the map's own conservatism for structured digital work.",
    ],
    process: [
      {
        title: "Task selection",
        description:
          "Choose two illustrative cases per occupation across healthcare, technology, and baseline industries such as electricians, teachers, and retail workers.",
      },
      {
        title: "Scoring",
        description:
          "Assess each task ordinally, with provenance recorded, across six frontier models on evidence that is actually comparable.",
      },
      {
        title: "Framing",
        description:
          "Treat human accountability as a safety gate rather than as a claim that the human is more accurate — a distinction that changes what the map means.",
      },
      {
        title: "Adoption scenarios",
        description:
          "Model conservative, expected and accelerated timelines for how capability turns into workplace practice.",
      },
    ],
    tools: [
      "Benchmark synthesis",
      "Task decomposition",
      "Evidence provenance",
      "Scenario modelling",
      "Data visualisation",
    ],
    lessons: [
      "Equal case weights matter: without them the tool would generate exactly the false workforce statistics it exists to avoid.",
      "Accountability is a safety gate, not an accuracy claim — conflating the two produces bad deployment decisions in both directions.",
      "Being explicit about where your own analysis is probably too conservative earns more trust than defending it.",
    ],
    nextSteps: [
      "Broaden task coverage within healthcare.",
      "Refresh model scoring as capabilities move.",
      "Develop the guided research sequence into a deployment workshop.",
    ],
    related: ["hutchinson-careos-one", "emerging-technology-analysis"],
  },
  {
    slug: "snf-ai-documentation-system",
    title: "SNF AI Documentation System",
    category: "Healthcare",
    additionalCategories: ["AI"],
    categoryLabel: "Healthcare AI",
    status: "Concept",
    featured: true,
    image: "/images/projects/snf-ai-documentation-system.jpg",
    imageAlt:
      "Sheets of blank paper fanned open in an otherwise dark room, their edges catching a single narrow warm light.",
    contentStatus: "final",
    summary:
      "A structured concept for improving skilled nursing documentation, clinical organization, consistency, and provider oversight with AI-assisted workflows.",
    overview:
      "Documentation is where a great deal of clinical time disappears inside a skilled nursing facility. This concept explores what changes if AI assistance is applied to the structure of documentation rather than to its content — organising, cross-checking and surfacing what a clinician has already recorded, instead of generating clinical language on their behalf.",
    problem: [
      "The same information is frequently re-entered across separate systems and forms.",
      "Charting quality varies by shift, by staffing level, and by how much time is left at the end of a round.",
      "Gaps are usually discovered downstream — during review, audit, or survey — rather than at the point of entry.",
      "Time spent reconciling records is time not spent with residents.",
    ],
    solution: [
      "Treat AI as a structuring and checking layer that sits alongside documentation, not as an author of clinical narrative.",
      "Flag missing, contradictory, or incomplete entries while the clinician is still at the point of care.",
      "Standardise the shape of routine entries so that review and oversight become predictable rather than investigative.",
      "Keep every AI-generated suggestion visibly attributable, reviewable, and easy for a licensed professional to reject.",
    ],
    process: [
      {
        title: "Observation",
        description:
          "Map where documentation time is actually spent across a shift, and which steps are duplication rather than clinical work.",
      },
      {
        title: "Workflow modelling",
        description:
          "Describe the current documentation path end to end, including the informal workarounds staff rely on.",
      },
      {
        title: "Concept design",
        description:
          "Identify the specific points in that path where an assistive layer would reduce friction without taking over judgment.",
      },
      {
        title: "Safeguard definition",
        description:
          "Define what the system must never do — and what a clinician must always confirm — before any of it is built.",
      },
    ],
    tools: [
      "Workflow mapping",
      "Prompt design",
      "Structured data modelling",
      "Human-factors review",
    ],
    lessons: [
      "The bottleneck is rarely typing speed. It is fragmentation across systems that were never designed to talk to each other.",
      "A tool that adds a review step is only adopted if it removes a larger one somewhere else.",
      "Clinical staff will trust a system that shows its reasoning far sooner than one that is simply confident.",
    ],
    nextSteps: [
      "Develop a detailed workflow map for one documentation type end to end.",
      "Draft the safeguard and escalation rules in full.",
      "Seek review from clinicians and administrators working in skilled nursing today.",
    ],
    related: ["hutchinson-healthcare-ai-model", "ai-career-resume-education"],
  },
  {
    slug: "hutchinson-healthcare-ai-model",
    title: "Hutchinson Healthcare AI Model",
    category: "Healthcare",
    additionalCategories: ["AI"],
    categoryLabel: "Business Innovation",
    status: "Concept",
    featured: true,
    image: "/images/projects/hutchinson-healthcare-ai-model.jpg",
    imageAlt:
      "Interlocking blocks of brushed steel and brass fitted together into one ordered structure on dark slate.",
    contentStatus: "final",
    summary:
      "A future-facing operating model exploring how AI could streamline skilled nursing operations, improve quality monitoring, and reduce administrative friction.",
    overview:
      "An operating-model concept rather than a product. It asks what a skilled nursing organisation would look like if AI assistance were assumed from the start — how roles, review cycles, quality monitoring and administrative overhead would be arranged differently.",
    problem: [
      "Administrative load grows faster than clinical capacity.",
      "Quality signals often arrive too late to change the outcome they describe.",
      "Technology is usually added to existing processes rather than used to reconsider them.",
    ],
    solution: [
      "Model operations around continuous, low-friction signal rather than periodic manual reporting.",
      "Define where human review is mandatory and design the rest of the system to protect that time.",
      "Treat staff education as part of the operating model, not as a rollout afterthought.",
    ],
    process: [
      {
        title: "Current-state model",
        description:
          "Describe how operational and quality information moves through a facility today.",
      },
      {
        title: "Friction inventory",
        description:
          "Catalogue the recurring administrative costs that consume clinical and leadership time.",
      },
      {
        title: "Target-state design",
        description:
          "Sketch an operating model in which assistive systems handle collection and structuring, and people handle judgment.",
      },
    ],
    tools: ["Operating model design", "Process mapping", "Systems thinking"],
    lessons: [
      "Operational change fails when it is introduced as software rather than as a change in how work is organised.",
    ],
    nextSteps: [
      "Expand the target-state model into a written framework.",
      "Test the assumptions against the experience of operators in the field.",
    ],
    related: ["snf-ai-documentation-system", "emerging-technology-analysis"],
  },
  {
    slug: "ai-career-resume-education",
    title: "AI Career and Résumé Education",
    category: "Education",
    additionalCategories: ["AI"],
    categoryLabel: "Education",
    status: "Active",
    featured: true,
    image: "/images/projects/ai-career-resume-education.jpg",
    imageAlt:
      "A blank cream sheet of paper and a fountain pen on a dark desk, one corner of the page lifted into the light.",
    contentStatus: "final",
    summary:
      "Visual guides and practical workflows that help healthcare professionals use AI to strengthen résumés, identify opportunities, and present their experience effectively.",
    overview:
      "Healthcare professionals carry a great deal of hard-won operational experience that rarely survives the translation onto a page. This work builds practical, repeatable AI-assisted workflows for describing that experience accurately — without inflating it.",
    problem: [
      "Clinical experience is often described in task language rather than in terms of responsibility and judgment.",
      "General-purpose AI advice tends to produce generic, interchangeable résumé copy.",
      "Most professionals have no reliable way to tell whether an AI suggestion has quietly overstated their record.",
    ],
    solution: [
      "Provide structured prompt workflows that draw out specifics instead of inviting embellishment.",
      "Teach a review habit: every AI-produced claim gets checked against something that actually happened.",
      "Deliver the material visually, in formats that can be worked through in short sessions.",
    ],
    process: [
      {
        title: "Common failure patterns",
        description:
          "Collect the ways AI-assisted résumé writing typically goes wrong for clinical professionals.",
      },
      {
        title: "Workflow design",
        description:
          "Build step-by-step prompt sequences that produce specific, verifiable language.",
      },
      {
        title: "Visual translation",
        description:
          "Turn each workflow into a guide that can be followed without prior AI experience.",
      },
    ],
    tools: ["Prompt design", "Instructional design", "Visual explanation"],
    lessons: [
      "The useful output of an AI résumé session is better questions about your own experience — not finished prose.",
    ],
    nextSteps: [
      "Expand the guides into a downloadable set.",
      "Add worked examples covering several healthcare roles.",
    ],
    related: ["snf-ai-documentation-system"],
  },
  {
    slug: "moon-tape-radio",
    title: "Moon Tape Radio",
    category: "Media",
    categoryLabel: "Creative Media",
    status: "Published",
    featured: true,
    image: "/images/projects/moon-tape-radio.jpg",
    imageAlt:
      "Painted night scene: a lantern-lit path across a grassy headland above a sleeping coastal town, with a full moon low over the sea.",
    contentStatus: "final",
    summary:
      "A visual and musical storytelling project built around atmospheric lofi experiences, original imagery, and immersive world-building.",
    overview:
      "Moon Tape Radio is an ongoing creative project pairing atmospheric lofi music with original illustrated environments. Each episode is built as a place rather than a playlist — a single scene, held long enough to become somewhere you can work, study, or rest inside.",
    problem: [
      "Ambient music channels are plentiful; ones with a coherent visual world are rarer.",
      "Sustaining a recurring release schedule requires a production pipeline, not just inspiration.",
    ],
    solution: [
      "Establish a consistent visual language so every episode reads as part of the same world.",
      "Build a repeatable production process covering artwork, music selection, assembly and publishing.",
    ],
    process: [
      {
        title: "World-building",
        description:
          "Define the recurring setting, palette and mood that identify the project at a glance.",
      },
      {
        title: "Episode production",
        description:
          "Generate and refine scene artwork, pair it with a musical arc, and assemble the finished piece.",
      },
      {
        title: "Release",
        description:
          "Publish on a predictable cadence with consistent titling and presentation.",
      },
    ],
    tools: [
      "Visual art direction",
      "Music curation and arrangement",
      "Video assembly",
      "Publishing workflow",
    ],
    lessons: [
      "Consistency of atmosphere matters more to an ambient audience than novelty of content.",
    ],
    nextSteps: [
      "Continue the release schedule.",
      "Extend the visual world into additional formats.",
    ],
    related: ["future-housing-concepts"],
  },
  {
    slug: "future-housing-concepts",
    title: "Future Housing Concepts",
    category: "Design",
    categoryLabel: "Design Research",
    status: "Research",
    featured: true,
    image: "/images/projects/future-housing-concepts.jpg",
    imageAlt:
      "A hand-built architectural model of stepped modular housing units in chipboard and pale timber, lit from one side on a workbench.",
    contentStatus: "final",
    summary:
      "Modular and affordable housing concepts designed around efficiency, rapid installation, climate resilience, and future economic pressures.",
    overview:
      "Design research into housing that can be produced quickly, installed with a small crew, and remain habitable under increasing climate and cost pressure. The interest is less in architectural novelty than in what is actually buildable and maintainable at scale.",
    problem: [
      "Construction timelines and costs place new housing out of reach for many households.",
      "Climate resilience is frequently treated as an upgrade rather than a baseline requirement.",
      "Modular approaches often optimise for factory output rather than for the people living in the result.",
    ],
    solution: [
      "Prioritise rapid installation and straightforward maintenance over bespoke design.",
      "Treat thermal performance and resilience as starting constraints.",
      "Design for the long tail of ownership: repair, adaptation and replacement of parts.",
    ],
    process: [
      {
        title: "Constraint gathering",
        description:
          "Identify the cost, time, climate and regulatory constraints that shape what is realistically buildable.",
      },
      {
        title: "Concept sketching",
        description:
          "Develop modular layouts that respond to those constraints rather than working around them.",
      },
    ],
    tools: ["Design research", "Constraint analysis", "Concept sketching"],
    lessons: [
      "Buildability and maintainability constrain a housing concept far more than aesthetics do.",
    ],
    nextSteps: [
      "Document the constraint set in full.",
      "Develop detailed drawings for one representative module.",
    ],
    related: ["emerging-technology-analysis"],
  },
  {
    slug: "emerging-technology-analysis",
    title: "Emerging Technology Analysis",
    category: "Research",
    categoryLabel: "Research",
    status: "Active",
    featured: true,
    image: "/images/projects/emerging-technology-analysis.jpg",
    imageAlt:
      "A glass prism on a dark surface, splitting a narrow beam of light into a faint spectrum.",
    contentStatus: "final",
    summary:
      "Accessible explanations of developments in artificial intelligence, healthcare, transportation, energy, and human-machine collaboration.",
    overview:
      "An ongoing effort to explain significant technology developments in plain language — what actually changed, what it enables, and what remains unproven. The aim is to be useful to a working professional who has fifteen minutes, not to be first to comment.",
    problem: [
      "Coverage of emerging technology tends to swing between promotional and dismissive.",
      "Professionals outside a field have little way to judge which developments matter to their own work.",
    ],
    solution: [
      "Separate demonstrated capability from projected capability in every explanation.",
      "Write for a curious non-specialist, and state plainly where the evidence is thin.",
    ],
    process: [
      {
        title: "Selection",
        description:
          "Choose developments with plausible near-term relevance to healthcare, work, or daily life.",
      },
      {
        title: "Translation",
        description:
          "Explain the mechanism and its limits without requiring technical background.",
      },
    ],
    tools: ["Research synthesis", "Technical writing"],
    lessons: [
      "Stating the limits of a technology earns more trust than describing its ceiling.",
    ],
    nextSteps: ["Publish on a regular cadence.", "Group analyses by theme."],
    related: ["hutchinson-healthcare-ai-model"],
  },
];

/* ── Helpers ───────────────────────────────────────────────────────────── */

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectMatchesCategory(
  project: Project,
  category: ProjectCategory,
): boolean {
  return (
    project.category === category ||
    project.additionalCategories?.includes(category) === true
  );
}

export function getRelatedProjects(project: Project): Project[] {
  return (project.related ?? [])
    .map(getProject)
    .filter((p): p is Project => Boolean(p));
}
