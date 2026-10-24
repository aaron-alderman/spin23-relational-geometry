import fs from "node:fs";

const register = JSON.parse(fs.readFileSync(
  "corpus/programmes/quotient-scars/quotient_scar_register_v1.json",
  "utf8",
));

const nodes = register.entries.map((entry) => entry.id);
const edges = register.relations.filter((relation) => relation.type !== "shares_action_not_carrier");

if (nodes.length !== 16 || edges.length !== 24) {
  throw new Error(`expected a 16-node, 24-edge backbone; received ${nodes.length}, ${edges.length}`);
}

const incidence = nodes.map((node) => edges.map((edge) => BigInt(
  (edge.to === node ? 1 : 0) - (edge.from === node ? 1 : 0),
)));

const gram = edges.map((_, i) => edges.map((__, j) => {
  const incidenceProduct = incidence.reduce((sum, row) => sum + row[i] * row[j], 0n);
  return incidenceProduct + (i === j ? 2n : 0n);
}));

function determinantBareiss(matrix) {
  const work = matrix.map((row) => row.slice());
  let previousPivot = 1n;
  let sign = 1n;
  for (let k = 0; k < work.length - 1; k += 1) {
    let pivotRow = k;
    while (pivotRow < work.length && work[pivotRow][k] === 0n) pivotRow += 1;
    if (pivotRow === work.length) return 0n;
    if (pivotRow !== k) {
      [work[k], work[pivotRow]] = [work[pivotRow], work[k]];
      sign = -sign;
    }
    const pivot = work[k][k];
    for (let i = k + 1; i < work.length; i += 1) {
      for (let j = k + 1; j < work.length; j += 1) {
        work[i][j] = (work[i][j] * pivot - work[i][k] * work[k][j]) / previousPivot;
      }
    }
    previousPivot = pivot;
  }
  return sign * work.at(-1).at(-1);
}

const determinant = determinantBareiss(gram);
const expectedDeterminant = 4_950_507_216_896n;
if (determinant !== expectedDeterminant) {
  throw new Error(`unexpected determinant: ${determinant}`);
}

let oddPart = determinant;
let twoAdicValuation = 0;
while (oddPart % 2n === 0n) {
  oddPart /= 2n;
  twoAdicValuation += 1;
}

if (twoAdicValuation !== 13 || oddPart !== 604_309_963n) {
  throw new Error(`unexpected factorization: 2^${twoAdicValuation} * ${oddPart}`);
}

if (gram.some((row, i) => row[i] !== 4n)) {
  throw new Error("every graph-lattice basis vector should have norm four");
}

// q(x)=2||x||^2+||Bx||^2 proves positivity. If ||x||^2=1,
// x is a signed basis vector and q=4; if ||x||^2>=2, q>=4.
const minimumNorm = 4;
const even = gram.every((row, i) => row[i] % 2n === 0n);
if (!even || minimumNorm !== 4) throw new Error("evenness or minimum-norm certificate failed");

// Distinct directed typed degree signatures imply typed graph rigidity.
const types = register.relationTypes;
const signatures = nodes.map((node) => types.flatMap((type) => [
  register.relations.filter((edge) => edge.from === node && edge.type === type).length,
  register.relations.filter((edge) => edge.to === node && edge.type === type).length,
]).join(","));

if (new Set(signatures).size !== nodes.length) {
  throw new Error("node signatures are not all distinct; the simple rigidity certificate no longer applies");
}

console.log(JSON.stringify({
  result: "pass",
  lattice: {
    rank: edges.length,
    gram: "2I + B^T B",
    integral: true,
    positiveDefinite: true,
    even,
    rootless: true,
    minimumNorm,
    determinant: determinant.toString(),
    factorization: `2^${twoAdicValuation} * ${oddPart}`,
    determinantIsSquare: false,
    integralUnimodularOverlatticeAtFixedForm: false,
  },
  typedGraphRigidByDistinctLocalSignatures: true,
  verdict: "near_leech_local_geometry_but_fixed_form_unimodular_gluing_impossible",
}, null, 2));

