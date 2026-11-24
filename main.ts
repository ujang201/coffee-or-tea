// One Letter: Coffee or Tea — entry program.
// Writes exactly one letter, "A" (coffee), to /output/entry.txt.
// Coffee is the vivid pick: bold, dark, loud, alive in the cup —
// the single letter that lands as the fuller, more awake answer.
// No input is read, no time or randomness is used: every run
// writes the same single byte.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY = "A"; // A = coffee, B = tea. One letter, nothing else.

// The gate requires exactly 1 UTF-8 character, not only whitespace.
if ([...ENTRY].length !== 1 || ENTRY.trim().length !== 1) {
  throw new Error("entry must be exactly one non-whitespace character");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
