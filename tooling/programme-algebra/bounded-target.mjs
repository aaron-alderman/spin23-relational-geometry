import assert from "node:assert/strict";
import { createInterface } from "node:readline";

export function boundDecision({ upperBound, target, required, margin = 0 }) {
  assert.ok([upperBound, target, margin].every(Number.isFinite) && margin >= 0);
  assert.ok(required === ">" || required === ">=");
  const ceiling = upperBound + margin;
  const impossible = required === ">" ? ceiling <= target : ceiling < target;
  return impossible ? "certified-impossible" : "unresolved";
}

if (import.meta.main) {
  assert.equal(process.argv[2], "--lines", "Use --lines with one JSON request per line.");
  const input = createInterface({ input: process.stdin });
  for await (const line of input) console.log(boundDecision(JSON.parse(line)));
}
