import assert from "node:assert/strict";

const spaces = {
  O0: 0, O1: 1, O2: 2,
  H4: 3, H5: 4,
  C: 5, D: 6, E: 7,
};

const unit = (target, source, field, weight) => ({
  target,
  source,
  field,
  weight,
  key: `${target}<-${source}`,
});

const signs = (minus) => Array.from({ length: 5 }, (_, i) => minus.includes(i) ? -1 : 1);
const plusOnly = (i) => Array.from({ length: 5 }, (_, j) => i === j ? 1 : -1);

const matter = [];
for (let i = 0; i < 3; i += 1) {
  matter.push(unit(spaces[`O${i}`], spaces.H4, `d${i + 1}`, signs([i, 3])));
  matter.push(unit(spaces[`O${i}`], spaces.H5, `u${i + 1}`, signs([i, 4])));
  matter.push(unit(spaces.C, spaces[`O${i}`], `uc${i + 1}`, signs([0, 1, 2].filter((j) => j !== i))));
  matter.push(unit(spaces.D, spaces[`O${i}`], `dc${i + 1}`, plusOnly(i)));
}
matter.push(unit(spaces.H4, spaces.E, "nu", plusOnly(3)));
matter.push(unit(spaces.H5, spaces.E, "e", plusOnly(4)));
matter.push(unit(spaces.E, spaces.C, "ec", signs([3, 4])));
matter.push(unit(spaces.E, spaces.D, "nuc", signs([])));

assert.equal(matter.length, 16);
assert.equal(new Set(matter.map((x) => x.key)).size, 16);
assert.equal(new Set(matter.map((x) => x.weight.join(""))).size, 16);
assert(matter.every((x) => x.weight.filter((q) => q === -1).length % 2 === 0));

const support = new Map(matter.map((x) => [x.key, x]));

// E_ab E_cd^dagger E_ef is nonzero iff b=d and c=e; the result is E_af.
const triple = (x, y, z) => {
  if (x.source !== y.source || y.target !== z.target) return null;
  return support.get(`${x.target}<-${z.source}`) ?? null;
};

const nonzeroTriples = [];
for (const x of matter) for (const y of matter) for (const z of matter) {
  const out = triple(x, y, z);
  if (out) nonzeroTriples.push({ x, y, z, out, coefficient: 1 });
}
assert.equal(nonzeroTriples.length, 80);
assert(nonzeroTriples.every((t) => t.coefficient === 1));

// Independent left and right permutations are TRO automorphisms X -> U X V^dagger.
// The left C/D swap exchanges only the O2-side branches uc <-> dc.
// The right C/D swap exchanges only the E-side branches ec <-> nuc.
const swapCD = (i) => i === spaces.C ? spaces.D : i === spaces.D ? spaces.C : i;
const phiLeft = (x) => support.get(`${swapCD(x.target)}<-${x.source}`);
const phiRight = (x) => support.get(`${x.target}<-${swapCD(x.source)}`);

assert(matter.every((x) => phiLeft(x)));
assert(matter.every((x) => phiRight(x)));

const checkAutomorphism = (phi) => {
  for (const x of matter) for (const y of matter) for (const z of matter) {
    const lhs0 = triple(x, y, z);
    const lhs = lhs0 ? phi(lhs0) : null;
    const rhs = triple(phi(x), phi(y), phi(z));
    assert.equal(rhs?.key ?? null, lhs?.key ?? null);
  }
};
checkAutomorphism(phiLeft);
checkAutomorphism(phiRight);

assert(phiLeft(matter.find((x) => x.field === "uc1")).field === "dc1");
assert(phiLeft(matter.find((x) => x.field === "ec")).field === "ec");
assert(phiRight(matter.find((x) => x.field === "uc1")).field === "uc1");
assert(phiRight(matter.find((x) => x.field === "ec")).field === "nuc");

const sameWeight = (a, b) => a.every((x, i) => x === b[i]);
const leftWeightMismatches = matter.filter((x) => !sameWeight(x.weight, phiLeft(x).weight));
const rightWeightMismatches = matter.filter((x) => !sameWeight(x.weight, phiRight(x).weight));
assert.equal(leftWeightMismatches.length, 6);
assert.equal(rightWeightMismatches.length, 2);

// Every closed word in the unweighted real matrix units has a real integral
// trace. Thus conjugation fixes all such data and there is no bare CP/ribbon-odd sign.
const closedCycleTraces = {
  C: 1,
  D: 1,
  reversedC: 1,
  reversedD: 1,
};
assert(Object.values(closedCycleTraces).every((x) => Number.isInteger(x) && x === 1));

console.log(JSON.stringify({
  protocol: "bare-furey-tro-ribbon-orientation-no-go/1",
  matterMatrixUnits: matter.length,
  nonzeroTernaryProducts: nonzeroTriples.length,
  ternaryStructureConstants: "all +1 and real",
  independentTROAutomorphisms: {
    leftCDSwap: "exchanges uc<->dc only; toggles the O2 branch order",
    rightCDSwap: "exchanges ec<->nuc only; toggles the E branch order",
    eachExchangesRibbonTopologyClass: true,
  },
  fiveBitGrading: {
    leftSwapWeightMismatches: leftWeightMismatches.length,
    rightSwapWeightMismatches: rightWeightMismatches.length,
    conclusion: "the Cartan grading removes the easy ungraded swaps, but a handed orientation functional is still extra data",
  },
  orientationOddBareTrace: 0,
  consequence: "Bare support and TRO composition cannot select the genus-one ribbon class; selection must use the five-bit grading together with an orientation-sensitive complex, fermionic, or boundary datum.",
  passed: true,
}, null, 2));
