import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-klein-nonlinear-triad-v1.json",
  import.meta.url,
), "utf8"));

const tolerance = 1e-10;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function A(x, y) {
  return Math.cos(x) * Math.cos(y);
}

function B(x, y) {
  return Math.sin(2 * x) * Math.sin(y);
}

function bracketDirect(x, y) {
  const Ax = -Math.sin(x) * Math.cos(y);
  const Ay = -Math.cos(x) * Math.sin(y);
  const Bx = 2 * Math.cos(2 * x) * Math.sin(y);
  const By = Math.sin(2 * x) * Math.cos(y);
  return Ax * By - Ay * Bx;
}

function bracketClosed(x, y) {
  return 0.25 * Math.cos(x)
    + 0.75 * Math.cos(3 * x)
    - 0.75 * Math.cos(x) * Math.cos(2 * y)
    - 0.25 * Math.cos(3 * x) * Math.cos(2 * y);
}

const samplePoints = [
  [0.17, 0.31],
  [0.83, 1.27],
  [1.62, 2.18],
  [2.73, 0.94],
];

for (const [x, y] of samplePoints) {
  assert(Math.abs(bracketDirect(x, y) - bracketClosed(x, y)) < tolerance,
    "closed-form Poisson bracket mismatch");
  assert(Math.abs(bracketClosed(x + Math.PI, -y) + bracketClosed(x, y)) < tolerance,
    "nonlinear bracket must remain deck odd");
}

for (const mode of evidence.poissonBracket.daughterModes) {
  const transverseParity = 1;
  assert(((-1) ** mode.k) * transverseParity === -1,
    "daughter mode violates Klein selection law");
}

const grid = 256;
const dx = 2 * Math.PI / grid;
let energyTransfer = 0;
let enstrophyTransfer = 0;
let bracketNorm = 0;

for (let i = 0; i < grid; i += 1) {
  const x = (i + 0.5) * dx;
  for (let j = 0; j < grid; j += 1) {
    const y = (j + 0.5) * dx;
    const psi = A(x, y) + B(x, y);
    const omega = 2 * A(x, y) + 5 * B(x, y);
    const nonlinear = evidence.poissonBracket.vorticityCrossFactor * bracketClosed(x, y);
    energyTransfer += psi * nonlinear;
    enstrophyTransfer += omega * nonlinear;
    bracketNorm += nonlinear * nonlinear;
  }
}

const areaWeight = dx * dx;
energyTransfer *= areaWeight;
enstrophyTransfer *= areaWeight;
bracketNorm *= areaWeight;

assert(Math.abs(energyTransfer) < 1e-9,
  "quadratic term must conserve inviscid energy");
assert(Math.abs(enstrophyTransfer) < 1e-9,
  "quadratic term must conserve inviscid enstrophy");
assert(bracketNorm > 1,
  "interaction must be nonzero");

console.log(JSON.stringify({
  status: "PASS",
  daughterModes: evidence.poissonBracket.daughterModes,
  energyTransfer,
  enstrophyTransfer,
  nonlinearL2Squared: bracketNorm,
  verdict: "The first nonzero quadratic interaction remains inside the Klein anti-invariant sector and redistributes, rather than creates, energy and enstrophy."
}, null, 2));
