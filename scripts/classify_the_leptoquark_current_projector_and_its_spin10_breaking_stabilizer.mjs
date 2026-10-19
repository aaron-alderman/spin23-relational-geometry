import assert from "node:assert/strict";

// The Pati--Salam fundamental is C^4=C^3_colour + C_lepton.
// Its exterior square has the ordered basis
//   cc = 01,02,12 and cl = 03,13,23.
const pairs = [[0, 1], [0, 2], [1, 2], [0, 3], [1, 3], [2, 3]];
const pairIndex = new Map(pairs.map((pair, i) => [pair.join(","), i]));
const zero = (n, m = n) => Array.from({ length: n }, () => Array(m).fill(0));
const eye = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const maxAbs = A => Math.max(...A.flat().map(Math.abs));
const rank = A0 => {
  const A = A0.map(row => [...row]);
  let r = 0;
  for (let c = 0; c < A[0].length && r < A.length; c++) {
    let p = r;
    while (p < A.length && Math.abs(A[p][c]) < 1e-12) p++;
    if (p === A.length) continue;
    [A[r], A[p]] = [A[p], A[r]];
    const q = A[r][c];
    for (let j = c; j < A[0].length; j++) A[r][j] /= q;
    for (let i = 0; i < A.length; i++) if (i !== r) {
      const f = A[i][c];
      for (let j = c; j < A[0].length; j++) A[i][j] -= f * A[r][j];
    }
    r++;
  }
  return r;
};

const E = (a, b) => {
  const X = zero(4);
  X[a][b] = 1;
  return X;
};

// Induced infinitesimal action on Lambda^2 C^4.
const wedge2 = X => {
  const W = zero(6);
  for (let col = 0; col < pairs.length; col++) {
    const [a, b] = pairs[col];
    for (let i = 0; i < 4; i++) {
      // X e_a wedge e_b.
      if (X[i][a] !== 0 && i !== b) {
        const lo = Math.min(i, b), hi = Math.max(i, b);
        const sign = i < b ? 1 : -1;
        W[pairIndex.get(`${lo},${hi}`)][col] += sign * X[i][a];
      }
      // e_a wedge X e_b.
      if (X[i][b] !== 0 && i !== a) {
        const lo = Math.min(a, i), hi = Math.max(a, i);
        const sign = a < i ? 1 : -1;
        W[pairIndex.get(`${lo},${hi}`)][col] += sign * X[i][b];
      }
    }
  }
  return W;
};

const Pcc = zero(6), Plq = zero(6);
for (let i = 0; i < 3; i++) Pcc[i][i] = 1;
for (let i = 3; i < 6; i++) Plq[i][i] = 1;
assert.deepEqual(Pcc.map((r, i) => r.map((x, j) => x + Plq[i][j])), eye(6));
assert.deepEqual(mm(Plq, Plq), Plq);

const commutator = (A, B) => sub(mm(A, B), mm(B, A));
const audit = [];

// Six colour off-diagonal generators, three traceless Cartan generators,
// and six colour--lepton root generators span sl_4(C).
for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (i !== j) {
  const C = commutator(Plq, wedge2(E(i, j)));
  audit.push({ generator: `E${i + 1}${j + 1}`, sector: "sl3_colour", commutatorRank: rank(C) });
}
for (let i = 0; i < 3; i++) {
  const H = sub(E(i, i), E(3, 3));
  const C = commutator(Plq, wedge2(H));
  audit.push({ generator: `H${i + 1}=E${i + 1}${i + 1}-E44`, sector: "block_diagonal_Cartan", commutatorRank: rank(C) });
}
for (let i = 0; i < 3; i++) for (const [a, b, label] of [[i, 3, "colour_to_lepton"], [3, i, "lepton_to_colour"]]) {
  const C = commutator(Plq, wedge2(E(a, b)));
  audit.push({ generator: `E${a + 1}${b + 1}`, sector: label, commutatorRank: rank(C) });
}

const commuting = audit.filter(x => x.commutatorRank === 0);
const broken = audit.filter(x => x.commutatorRank !== 0);
assert.equal(audit.length, 15);
assert.equal(commuting.length, 9);
assert.equal(broken.length, 6);
assert(commuting.every(x => x.sector === "sl3_colour" || x.sector === "block_diagonal_Cartan"));
assert(broken.every(x => x.sector.includes("colour_to_lepton") || x.sector.includes("lepton_to_colour")));

// B-L on 4 is diag(1/3,1/3,1/3,-1).  On Lambda^2 it has
// eigenvalue +2/3 on cc and -2/3 on cl, hence Plq is its spectral projector.
const BminusL4 = zero(4);
for (let i = 0; i < 3; i++) BminusL4[i][i] = 1 / 3;
BminusL4[3][3] = -1;
const BminusL6 = wedge2(BminusL4);
const spectralPlq = eye(6).map((row, i) => row.map((x, j) => (x - 1.5 * BminusL6[i][j]) / 2));
assert(maxAbs(sub(spectralPlq, Plq)) < 1e-12);

// At the five named-current level, this is the desired-only incidence mask.
const currentOrder = ["QQ", "uc_ec", "dc_nuc", "Q_L", "uc_dc"];
const desiredMask = [0, 1, 1, 1, 0];
assert.deepEqual(currentOrder.filter((_, i) => desiredMask[i]), ["uc_ec", "dc_nuc", "Q_L"]);

// Separate baryon number can protect the mask at vertex level.  Assign
// B(T)=+1/3 and B(Tbar)=-1/3.  Desired vertices are neutral; diquark
// vertices have total B=+1 and -1.  B-L cannot do this, as audited in 1075.
const baryonVertexTotals = {
  T_QQ: 2 / 3 + 1 / 3,
  T_uc_ec: -1 / 3 + 1 / 3,
  T_dc_nuc: -1 / 3 + 1 / 3,
  Tbar_Q_L: 1 / 3 - 1 / 3,
  Tbar_uc_dc: -2 / 3 - 1 / 3,
};
assert.equal(baryonVertexTotals.T_QQ, 1);
assert.equal(baryonVertexTotals.T_uc_ec, 0);
assert.equal(baryonVertexTotals.T_dc_nuc, 0);
assert.equal(baryonVertexTotals.Tbar_Q_L, 0);
assert.equal(baryonVertexTotals.Tbar_uc_dc, -1);

console.log(JSON.stringify({
  protocol: "Pati-Salam-leptoquark-current-projector-stabilizer/1",
  carrier: "Lambda^2 C^4 with C^4=C^3_colour direct-sum C_lepton",
  basis: pairs.map(([a, b]) => `e${a + 1}^e${b + 1}`),
  decomposition: {
    colourColour: ["e1^e2", "e1^e3", "e2^e3"],
    colourLepton: ["e1^e4", "e2^e4", "e3^e4"],
    underSU3xU1BL: "6 -> 3bar_(+2/3) + 3_(-2/3), up to conjugate-orientation convention",
  },
  leptoquarkProjector: Plq,
  spectralFormula: "P_lq=(I-(3/2) Q_(B-L)^(Lambda2))/2 on Lambda^2 4",
  sl4GeneratorAudit: audit,
  stabilizer: {
    commutingGeneratorCount: commuting.length,
    brokenGeneratorCount: broken.length,
    connectedGroup: "S(U(3)xU(1)) subset SU(4), with Lie-algebra dimension 9",
    brokenCoset: "six real colour-lepton directions SU(4)/S(U(3)xU(1))",
  },
  namedCurrentProjector: { order: currentOrder, diagonal: desiredMask },
  retainedClebschCurrent: "Q L together with (u^c e^c - d^c nu^c)",
  removedCurrents: ["Q Q", "u^c d^c"],
  baryonVertexTotals,
  conclusions: [
    "The desired-only current projector commutes with SU(3)_c x U(1)_(B-L), and therefore with the Standard-Model gauge subgroup, but not with the six SU(4) colour-lepton root directions.",
    "It preserves SU(2)_L x SU(2)_R when it acts only on the SU(4) index and retains the complete right-isospin singlet u^c e^c-d^c nu^c.",
    "A reality-compatible projector on the single mediator 6 cannot retain both conjugate triplet orientations while deleting their diquark sources; the operation must be a vertex/source projector, an extra selection rule, or multi-mediator interference.",
    "Separate baryon number protects the desired vertices and forbids the two diquark vertices at classical level, whereas B-L does not; anomaly and ultraviolet completion of that extra selection remain open.",
  ],
  stopEverything: "If the low-energy coupling is required to remain the restriction of one unspurioned Spin(10)-equivariant 16_F 16_F 10_H map, the proton-safe desired-only projector is impossible.",
  passed: true,
}, null, 2));
