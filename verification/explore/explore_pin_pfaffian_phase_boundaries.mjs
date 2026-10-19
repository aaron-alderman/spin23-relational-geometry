import { run } from "./explore_regulated_glide_relative_pfaffian.mjs";

const base = { L: 2, M: 1, r: 0.8, m0: 0.8, mu: 0.7 };
const cache = new Map();
const state = (delta, parameters = base) => {
  const key = JSON.stringify({ ...parameters, delta });
  if (!cache.has(key)) cache.set(key, run({ ...parameters, delta }, 1));
  return cache.get(key);
};

const root = (field, lo, hi, parameters = base, iterations = 18) => {
  let slo = state(lo, parameters)[field].sign;
  let shi = state(hi, parameters)[field].sign;
  if (slo === 0) return lo;
  if (shi === 0) return hi;
  if (slo === shi) throw new Error(`No ${field} sign change in [${lo},${hi}]`);
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const mid = (lo + hi) / 2;
    const smid = state(mid, parameters)[field].sign;
    if (smid === 0) return mid;
    if (smid === slo) { lo = mid; slo = smid; } else { hi = mid; shi = smid; }
  }
  return (lo + hi) / 2;
};

const boundaries = [
  { field: "pfd", bracket: [0, 0.25] },
  { field: "pfr", bracket: [0.25, 0.5] },
  { field: "pfd", bracket: [0.75, 1] },
  { field: "pfr", bracket: [1.5, 2] },
].map(({ field, bracket }) => ({ field, value: root(field, ...bracket) }));

console.log(JSON.stringify({ base, boundaries, evaluations: cache.size }, null, 2));
for (let i = 0; i < boundaries.length - 1; i += 1) {
  const midpoint = (boundaries[i].value + boundaries[i + 1].value) / 2;
  console.log(JSON.stringify({ midpoint, state: state(midpoint) }));
}

const scan = [];
for (let step = 0; step <= 80; step += 1) {
  const delta = step * 0.025;
  const result = state(delta);
  scan.push({ delta, pfr: result.pfr.sign, pfd: result.pfd.sign, relative: result.relative });
}
const signChangeBrackets = [];
for (let i = 1; i < scan.length; i += 1) {
  for (const field of ["pfr", "pfd"]) {
    if (scan[i - 1][field] !== scan[i][field]) {
      signChangeBrackets.push({ field, lo: scan[i - 1].delta, hi: scan[i].delta });
    }
  }
}
console.log(JSON.stringify({ signChangeBrackets, nontrivialSamples: scan.filter((point) => point.relative === -1) }, null, 2));
const refinedAll = signChangeBrackets.map(({ field, lo, hi }) => ({
  field,
  value: root(field, lo, hi, base, 14),
}));
console.log(JSON.stringify({ refinedAll, totalEvaluations: cache.size }, null, 2));
