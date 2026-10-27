/**
 * The LegalSimple MVA phase-1 creative slate — 26 assets in 5 sections.
 *
 * Captions are carried over verbatim from the reference build that was being
 * zipped and emailed to partners
 * (…/12-LegalSimple/05-MVA/Creative-Review/index.html), so this page and that
 * folder stay the same review artifact.
 *
 * The media itself is NOT in this repo. simplemedianetwork is a PUBLIC GitHub
 * repo, and these are pre-launch drafts pending attorney sign-off — committing
 * them to /public would publish them. They live in a Supabase Storage bucket
 * instead, which also gives the <video> elements byte-range streaming for free.
 *
 * The storage prefix ends in the review code, and the code is not in this repo
 * (it travels in the partner link). That is what makes the gate real on a public
 * repo: without the code there is no way to build a working asset URL, so the
 * media is unreachable even though the bucket is public.
 */
const STORAGE_ROOT =
  "https://jqjftrlnyysqcwbbigpw.supabase.co/storage/v1/object/public/creative-review";

/** Where this slate's assets live, given the reviewer's code. */
export function assetBase(code: string): string {
  return `${STORAGE_ROOT}/legalsimple-mva-${code}`;
}

/** Cheap, always-present object used to check a code before revealing the page. */
export const PROBE_PATH = "statics/ST01_geo-listicle-lead.png";

export type Asset = { file: string; title: string; note: string };

export type Section = {
  heading: string;
  sub: string;
  /** Statics are 4:5 stills in a lightbox; everything else is a 9:16 player. */
  kind: "image" | "video";
  /** Folder under ASSET_BASE — mirrors the source assets/ tree. */
  dir: string;
  assets: Asset[];
};

export const SECTIONS: Section[] = [
  {
    heading: "Statics",
    sub: "Feed-ready 4:5. Full placement set (1:1 + 9:16) also produced.",
    kind: "image",
    dir: "statics",
    assets: [
      {
        file: "ST01_geo-listicle-lead.png",
        title: "Geo-Listicle Lead",
        note: "Lead static — pairs with the long-copy geo listicle (the proven Top Injury Claims playbook).",
      },
      {
        file: "ST02b_lowball.png",
        title: "Don’t Let Insurance Lowball You",
        note: "Blunt DR — crushed car + explicit claim.",
      },
      {
        file: "ST03_uninsured-driver.png",
        title: "Uninsured Driver",
        note: "Educational angle — low compliance exposure.",
      },
      {
        file: "ST04c_injured-first-offer-fight.png",
        title: "Never Take the First Offer",
        note: "Advocacy — ‘get legal help to fight for you.’",
      },
      {
        file: "ST05b_really-worth.png",
        title: "Find Out What It’s Really Worth",
        note: "Blunt DR — intersection wreck.",
      },
      {
        file: "ST06_how-it-works.png",
        title: "How It Works (3-step)",
        note: "Trust-builder — answer → see worth → connected to an attorney.",
      },
      {
        file: "ST07_retarget-waiting.png",
        title: "Retargeting — Estimate Waiting",
        note: "Abandoner: ‘Still thinking about it?’",
      },
      {
        file: "ST08_retarget-money-table.png",
        title: "Retargeting — Money on the Table",
        note: "Abandoner: ‘Pick up where you left off.’",
      },
    ],
  },
  {
    heading: "UGC — Full Cuts",
    sub: "You-frame money scripts, matched voices, captioned. ~25–34s.",
    kind: "video",
    dir: "ugc",
    assets: [
      {
        file: "LS-MVA_W01_Miriam_hybrid_CAP_9x16_1080.mp4",
        title: "W01 — Contrast Anchor (crash hybrid)",
        note: "Money-first: $4k→$78k, crash cold-open.",
      },
      {
        file: "LS-MVA_W02_Julia_CAP_9x16_1080.mp4",
        title: "W02 — Your Number",
        note: "Curiosity: ‘your case has a number.’",
      },
      {
        file: "LS-MVA_W03_Brittany_CAP_9x16_1080.mp4",
        title: "W03 — Lowball / Most People",
        note: "‘Most people settle for less.’",
      },
      {
        file: "LS-MVA_W04_Simone_CAP_9x16_1080.mp4",
        title: "W04 — Payout Proof",
        note: "‘$10k→$90k’ cousin story.",
      },
      {
        file: "LS-MVA_W05_AuthMale_CAP_9x16_1080.mp4",
        title: "W05 — Adjuster Villain",
        note: "Authority male — ‘how insurers think.’",
      },
      {
        file: "LS-MVA_W07_Simone_CAP_9x16_1080.mp4",
        title: "W07 — Rideshare / 18-Wheeler",
        note: "Bigger-policy niche.",
      },
    ],
  },
  {
    heading: "UGC — Hook Cuts",
    sub: "Short thumb-stop versions for the hook-rate test.",
    kind: "video",
    dir: "hooks",
    assets: [
      { file: "LS-MVA_W01_Miriam_hybrid_HOOK_9x16_1080.mp4", title: "W01 Hook", note: "8–16s thumbstop cut." },
      { file: "LS-MVA_W02_Julia_HOOK_9x16_1080.mp4", title: "W02 Hook", note: "8–16s thumbstop cut." },
      { file: "LS-MVA_W03_Brittany_HOOK_9x16_1080.mp4", title: "W03 Hook", note: "8–16s thumbstop cut." },
      { file: "LS-MVA_W04_Simone_HOOK_9x16_1080.mp4", title: "W04 Hook", note: "8–16s thumbstop cut." },
      { file: "LS-MVA_W05_AuthMale_HOOK_9x16_1080.mp4", title: "W05 Hook", note: "8–16s thumbstop cut." },
      { file: "LS-MVA_W07_Simone_HOOK_9x16_1080.mp4", title: "W07 Hook", note: "8–16s thumbstop cut." },
    ],
  },
  {
    heading: "Crash / Advocate",
    sub: "Generated crash reenactments + the suit-advocate presenter.",
    kind: "video",
    dir: "crash",
    assets: [
      {
        file: "LS-MVA_CRASH_A_advocacyVO_9x16_1080.mp4",
        title: "Crash Montage + VO",
        note: "Advocacy VO over generated crash reenactments.",
      },
      {
        file: "LS-MVA_CRASH_B_advocateclose_9x16_1080.mp4",
        title: "Crash Hook → Advocate Close",
        note: "Crash cold-open cuts to the authority advocate.",
      },
      {
        file: "LS-MVA_CRASH_spoxPIP_lowerright_9x16_1080.mp4",
        title: "Crash + Green-Screen Presenter",
        note: "Keyed suit spokesperson over crash footage (PIP).",
      },
    ],
  },
  {
    heading: "Dramatized Stories",
    sub: "First-person stories (AI avatars — labeled dramatization, not actual clients).",
    kind: "video",
    dir: "testimonials",
    assets: [
      {
        file: "LS-MVA_DS1_Rosa_v3_CAP_9x16_1080.mp4",
        title: "Rosa — Almost Took the First Check",
        note: "Dramatized story · injury + ‘free tool a friend told me about.’",
      },
      {
        file: "LS-MVA_DS2_Ray_v2_CAP_9x16_1080.mp4",
        title: "Ray — Blue-Collar",
        note: "Dramatized story · back injury + time off work.",
      },
      {
        file: "LS-MVA_DS3_Gloria_v2_CAP_9x16_1080.mp4",
        title: "Gloria — The Friendly Adjuster",
        note: "Dramatized story · daughter found the free tool.",
      },
    ],
  },
];

export const ASSET_COUNT = SECTIONS.reduce((n, s) => n + s.assets.length, 0);
