const WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
  "Eight", "Nine", "Ten", "Eleven", "Twelve",
];

/**
 * Spell a small count for display copy, so headlines like "Eight properties"
 * are derived from the list they describe instead of being hand-typed and
 * drifting out of sync with it. Falls back to digits past twelve.
 */
export function spellCount(n: number): string {
  return WORDS[n] ?? String(n);
}
