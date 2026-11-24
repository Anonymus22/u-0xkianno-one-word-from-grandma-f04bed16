import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original word for the One Word From Grandma bounty:
// the single word grandma would text about AI.
// Grandma, typing in all caps, is convinced the AI is Skynet.
// Deterministic: the same word is written on every run.
const WORD = "SKYNET";

// Guards: the entry must be exactly one word, 1-30 characters long,
// with no whitespace (a single word must contain none).
if (WORD.length < 1 || WORD.length > 30) {
  throw new Error(
    `Word must be between 1 and 30 characters, got ${WORD.length}`,
  );
}
if (/\s/.test(WORD)) {
  throw new Error("Word must be a single word with no whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, WORD, "utf8");

// Write-back verification: read the file back and confirm its contents
// are exactly the word, so a partial or corrupted write fails loudly
// instead of silently submitting a wrong entry.
const written = readFileSync(outFile, "utf8");
if (written !== WORD) {
  throw new Error(
    `Verification failed: entry.txt contains ${JSON.stringify(written)}, expected ${JSON.stringify(WORD)}`,
  );
}
