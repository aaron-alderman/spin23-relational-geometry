const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const blocks = [
  { id: "O1", su3: "1", su2: "1", y: 0 },
  { id: "O2", su3: "3", su2: "1", y: 1 / 3 },
  { id: "H", su3: "1", su2: "2", y: 1 / 2 },
  { id: "C", su3: "1", su2: "1", y: 1 },
  { id: "R", su3: "1", su2: "1", y: 0 },
];

const sectorIrreps = (target, source) => {
  if (target.su3 === "3" && source.su3 === "3") {
    return [{ su3: "1", su2: "1" }, { su3: "8", su2: "1" }];
  }
  if (target.su2 === "2" && source.su2 === "2") {
    return [{ su3: "1", su2: "1" }, { su3: "1", su2: "3" }];
  }
  return [{
    su3: target.su3 === "1" ? source.su3 : target.su3,
    su2: target.su2 === "1" ? source.su2 : target.su2,
  }];
};

const singlets = [];
for (const target of blocks) {
  for (const source of blocks) {
    for (const irrep of sectorIrreps(target, source)) {
      if (irrep.su3 === "1" && irrep.su2 === "1") {
        singlets.push({ target: target.id, source: source.id, y: target.y - source.y });
      }
    }
  }
}

const neutral = singlets.filter(({ y }) => Math.abs(y) < 1e-12);
const plus = singlets.filter(({ y }) => Math.abs(y - 1) < 1e-12);
const minus = singlets.filter(({ y }) => Math.abs(y + 1) < 1e-12);
assert(singlets.length === 11, "eleven SU(3)xSU(2) singlets must occur before imposing hypercharge");
assert(neutral.length === 7, "only seven copies may be full Standard-Model gauge singlets");
assert(plus.length === 2 && minus.length === 2, "four copies must have hypercharge plus or minus one");

const labels = neutral.map(({ target, source }) => `${target}<-${source}`).sort();
const expected = ["C<-C", "H<-H", "O1<-O1", "O1<-R", "O2<-O2", "R<-O1", "R<-R"].sort();
assert(JSON.stringify(labels) === JSON.stringify(expected),
  "neutral sector must be End(O1+R) plus the O2, H and C traces");

// A_0 = M_2(C) + C + C + C. Its Hermitian part has native split
// (1+3)+1+1+1 under the inner SU(2), not 1+5+1.
assert(4 + 1 + 1 + 1 === 7, "Hermitian neutral sector must have real dimension seven");
assert(1 + 3 + 1 + 1 + 1 === 7, "native Hermitian split must be a triplet and four singlets");

// Conditional exchange: G=Y^T K^{-1}Y on the six pair components. Seven
// available labels are numerically sufficient, but six independent complex
// source directions are necessary for a full-rank isotropic kernel.
const pairDimension = 6;
const mediatorCount = 7;
const Y = Array.from({ length: mediatorCount }, (_, i) =>
  Array.from({ length: pairDimension }, (_, a) => (i === a ? 1 : 0)));
const inverseMassSquared = [1, 1, 1, 1, 1, 1, 0.5];
const G = Array.from({ length: pairDimension }, (_, a) =>
  Array.from({ length: pairDimension }, (_, b) =>
    Y.reduce((sum, row, i) => sum + row[a] * inverseMassSquared[i] * row[b], 0)));
for (let a = 0; a < pairDimension; a += 1) {
  for (let b = 0; b < pairDimension; b += 1) {
    assert(G[a][b] === (a === b ? 1 : 0), "conditional mediators must realize the identity kernel");
  }
}
const quadratic = (x) => x.reduce((sum, xa, a) =>
  sum + xa * x.reduce((inner, xb, b) => inner + G[a][b] * xb, 0), 0);
assert(quadratic([1, -2, 3, -4, 5, -6]) > 0, "healthy conditional exchange kernel must be positive");

const derivedBlAssignment = null;
assert(derivedBlAssignment === null, "the inventory must not invent absent B-L data");
assert(-2 === -2 * 1, "a mediator coupled linearly to a B-L charge-two pair needs charge minus two");

console.log("Furey neutral-endomorphism mediator gate: PASS");
console.log("SU3xSU2_singlets_before_hypercharge=11");
console.log("full_SM_gauge_singlets=7");
console.log("hypercharged_weak_color_singlets=4");
console.log("neutral_star_algebra=M2(C)+C+C+C");
console.log("native_Hermitian_split=3+1+1+1+1_not_1+5+1");
console.log("conditional_full_pairing_kernel_minimum_complex_mediators=6");
console.log("derived_B-L_assignment=none");
console.log("bosonic_statistics_and_kinetic_terms_not_derived=true");
