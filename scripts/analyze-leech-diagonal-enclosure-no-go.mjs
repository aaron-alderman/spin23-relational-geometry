#!/usr/bin/env node
import fs from "node:fs";

const source = JSON.parse(fs.readFileSync(
  new URL("../evidence/data/leech-positive-charging-enclosure-v1.json", import.meta.url)
));
const ratio = 0.01;
const gramDiagonal = 4;
const sites = 24;
const perSiteDiagonalCeiling = 1 / gramDiagonal;
const traceCeiling = sites * perSiteDiagonalCeiling;

const results = source.results.map((row) => {
  const maximumAddedLowerEnergy = ratio * row.cutoff ** 2 * traceCeiling / 2;
  const potentialOnlyOddLower = row.sectorIntervals.odd.lower;
  const universalDiagonalOddCeiling =
    potentialOnlyOddLower + maximumAddedLowerEnergy;
  return {
    cutoff: row.cutoff,
    potentialOnlyOddLower,
    evenRitzUpper: row.sectorIntervals.even.upper,
    maximumAddedLowerEnergy,
    universalDiagonalOddCeiling,
    bestPossibleDiagonalGapLowerCeiling:
      universalDiagonalOddCeiling - row.sectorIntervals.even.upper,
    diagonalClosureRuledOut:
      universalDiagonalOddCeiling < row.sectorIntervals.even.upper
  };
});

const output = {
  schemaVersion: "leech-diagonal-enclosure-no-go-v1",
  date: "2026-10-25",
  premise: "For every diagonal D>=0 with K-D>=0, K-d_i e_i e_i^T>=0, so the rank-one update criterion gives d_i<=1/(K^{-1})_ii=1/G_ii=1/4.",
  traceCeiling,
  energyCeiling: "On cutoff N, (U/2)d_i q_i^2 <= (U/2)d_i N^2 I. Therefore no diagonal separable lower operator can raise its odd-sector lower endpoint by more than (U/2)N^2 sum_i d_i.",
  ratio,
  results,
  conclusion: "Every positive diagonal split is rigorously too weak to close the cutoff-two or cutoff-three full-carrier gap interval.",
  nextRequirement: "retain off-diagonal charging correlations through certified two-site or larger blocks, or use a validated Lehmann/shifted-inertia enclosure"
};

fs.writeFileSync(
  new URL("../evidence/data/leech-diagonal-enclosure-no-go-v1.json", import.meta.url),
  JSON.stringify(output, null, 2) + "\n"
);
console.log(JSON.stringify(output, null, 2));
