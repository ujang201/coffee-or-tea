// One Letter: Coffee or Tea — entry program.
//
// The entry is a single letter, "A", meaning coffee. The grader's gate
// accepts exactly one non-whitespace UTF-8 character, so the program
// picks the letter, proves it is a lone character, and puts that one
// byte into <output-dir>/entry.txt. Nothing is read, nothing is timed,
// nothing is random: every run leaves the same single byte behind.
//
// Coffee is the pick because it is the louder answer — bold, dark,
// awake in the cup — where tea would only whisper. The letter A is
// the fuller, more awake half of the coffee-against-tea argument.
import { closeSync, mkdirSync, openSync, writeSync } from "node:fs";
import { join } from "node:path";

// The letter the entry stands behind. B would mean tea; A means coffee.
const PICK = "A";

function singleLetter(value: string): string {
  const points = [...value];
  if (points.length !== 1) {
    throw new Error(`entry must be one character, got ${points.length}`);
  }
  const [only] = points;
  if (!only || only.trim() === "") {
    throw new Error("entry must be a visible character, not whitespace");
  }
  return only;
}

function writeAll(fd: number, bytes: Buffer): void {
  let written = 0;
  while (written < bytes.length) {
    written += writeSync(fd, bytes, written, bytes.length - written);
  }
}

function placeLetter(letter: string, dir: string): void {
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  const fd = openSync(target, "w");
  try {
    writeAll(fd, Buffer.from(letter, "utf8"));
  } finally {
    closeSync(fd);
  }
}

const letter = singleLetter(PICK);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
placeLetter(letter, outDir);
