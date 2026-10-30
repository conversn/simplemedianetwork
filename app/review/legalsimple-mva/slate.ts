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

/** Drives both the grid track width and the tile's aspect-ratio. */
export type Ratio = "4x5" | "1x1" | "9x16";

export type Section = {
  heading: string;
  sub: string;
  /** Stills open in a lightbox; videos get an inline player. */
  kind: "image" | "video";
  ratio: Ratio;
  /** Folder under the asset base — mirrors the source tree. */
  dir: string;
  assets: Asset[];
};

export const SECTIONS: Section[] = [
  {
    heading: "P1 — Statics",
    sub: "Newest batch · square 1:1 (2048² except S01, S05 medical-bill and S07 at 1024²). Numbering as delivered — see the two S05s and the S-less 18-wheeler.",
    kind: "image",
    ratio: "1x1",
    dir: "p1-statics",
    assets: [
      { file: "MVA-S01-Latina-Check-Victim.png", title: "S01 — Claimant with Check", note: "Settlement-check hero." },
      {
        file: "MVA-S02-Same-Check-Different-Guy.png",
        title: "S02 — Same Check, Different Guy",
        note: "Check hero, second casting.",
      },
      { file: "MVA-S03-NoWin-NoPay.png", title: "S03 — No Win, No Pay", note: "Fee-structure angle." },
      {
        file: "MVA-S04-Accident-DoDont-SideSide.png",
        title: "S04 — Do / Don't (side-by-side)",
        note: "Post-accident do/don't split.",
      },
      {
        file: "MVA-S05-Geo-Texas-Breakthrough.png",
        title: "S05 — Geo: Texas",
        note: "Geo-targeted cut.",
      },
      {
        file: "MVA-S05-MedicalBill-Pain.png",
        title: "S05 (second) — Medical Bills / Pain",
        note: "Ships with the same S05 number as the Texas geo.",
      },
      { file: "MVA-06-18-Wheeler.png", title: "S06 — 18-Wheeler", note: "Bigger-policy niche. Filename has no S." },
      {
        file: "MVA-S07-Rideshare-Uber-Lyft.png",
        title: "S07 — Rideshare (Uber / Lyft)",
        note: "Bigger-policy niche.",
      },
      {
        file: "MVA-S09-Claymation-Adjuster-Villian.png",
        title: "S09 — Claymation: Adjuster Villain",
        note: "Claymation treatment, adjuster-as-villain.",
      },
      { file: "MVA-S10-ZeroOOP-Guy.png", title: "S10 — Zero Out-of-Pocket", note: "Cost objection." },
      { file: "MVA-S11-Pain-Loss-Everything.png", title: "S11 — Pain / Loss", note: "Emotional register." },
      {
        file: "MVA-S12-Simple-Text-Conversation.png",
        title: "S12 — Text Conversation",
        note: "Native-feeling text-thread format.",
      },
      { file: "MVA-S13-Offervs78k.png", title: "S13 — Offer vs $78k", note: "Contrast anchor." },
      { file: "MVA-S14-Lady-Neck-Brace-Helpless.png", title: "S14 — Neck Brace", note: "Injury-first visual." },
      {
        file: "MVA-S15-Claymation-Claimant-96k.png",
        title: "S15 — Claymation: $96k Claimant",
        note: "Claymation treatment, payout anchor.",
      },
      {
        file: "MVA-S16-Alert-Distracted-Driver.png",
        title: "S16 — Distracted-Driver Alert",
        note: "Alert / PSA framing.",
      },
      { file: "MVA-S17-Driver-4kto92k.png", title: "S17 — $4k → $92k", note: "Contrast anchor." },
    ],
  },
  {
    heading: "P1 — Video",
    sub: "Newest batch · 9:16 1080×1920, 6–10s.",
    kind: "video",
    ratio: "9x16",
    dir: "p1-video",
    assets: [
      {
        file: "MVA-V01-male-selfie-living-room.mp4",
        title: "V01 — Selfie (living room)",
        note: "7s · male presenter, selfie frame.",
      },
      { file: "MVA-V02-screenshot-reel.mp4", title: "V02 — Screenshot Reel", note: "6s · screen-capture cut." },
      { file: "MVA-V03-selfie-car.mp4", title: "V03 — Selfie (car)", note: "7s · car-interior selfie." },
      { file: "MVA-V04-check-lap-car.mp4", title: "V04 — Check on Lap (car)", note: "6s · settlement-check reveal." },
      {
        file: "MVA-V05-rear-end-do-dont-reel.mp4",
        title: "V05 — Rear-End Do / Don't",
        note: "10s · do/don't reel.",
      },
    ],
  },
  {
    heading: "Statics — first batch",
    sub: "Feed-ready 4:5. Full placement set (1:1 + 9:16) also produced.",
    kind: "image",
    ratio: "4x5",
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
    ratio: "9x16",
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
    ratio: "9x16",
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
    ratio: "9x16",
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
    ratio: "9x16",
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
