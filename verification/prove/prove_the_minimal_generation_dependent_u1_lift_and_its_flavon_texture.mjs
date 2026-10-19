import assert from "node:assert/strict";

const mod = (x, n) => ((x % n) + n) % n;
const fields = ["Q", "uc", "dc", "L", "ec", "nuc"];
const dims = [6, 3, 3, 2, 1, 1];
const y6 = [1, -4, 2, -3, 6, 0];
const targetResidues = [0, 1, 2, 1, 1, 0];

const makeRow = (A, B, H) => {
  const q = 3 * A;
  const l = 1 + 3 * B;
  const h = 2 + 3 * H;
  return {
    h,
    charges: [q, -q - h, -q + h, l, -l + h, -l - h],
  };
};

const anomalyLedger = (rows) => {
  const sum = (fn) =>
    rows.reduce(
      (outer, row) =>
        outer +
        row.charges.reduce(
          (inner, charge, i) => inner + fn(charge, i),
          0,
        ),
      0,
    );
  return {
    su3Squared: rows.reduce(
      (s, row) => s + 2 * row.charges[0] + row.charges[1] + row.charges[2],
      0,
    ),
    su2Squared: rows.reduce(
      (s, row) => s + 3 * row.charges[0] + row.charges[3],
      0,
    ),
    gravitational: sum((q, i) => dims[i] * q),
    cubic: sum((q, i) => dims[i] * q ** 3),
    ySquaredX: sum((q, i) => dims[i] * y6[i] ** 2 * q),
    yXSquared: sum((q, i) => dims[i] * y6[i] * q ** 2),
  };
};

// Exhaustive bounded census in the natural integer parameters.
const values = [-2, -1, 0, 1, 2];
const solutions = [];
for (const A1 of values)
  for (const A2 of values)
    for (const A3 of values)
      for (const B1 of values)
        for (const B2 of values)
          for (const B3 of values)
            for (const H of values) {
              const As = [A1, A2, A3];
              const Bs = [B1, B2, B3];
              if (
                1 + As.reduce((sum, A, i) => sum + 3 * A + Bs[i], 0) !==
                0
              )
                continue;
              const rows = As.map((A, i) => makeRow(A, Bs[i], H));
              const h = rows[0].h;
              assert.ok(rows.every((row) => row.h === h));
              for (const row of rows)
                assert.deepEqual(
                  row.charges.map((q) => mod(q, 3)),
                  targetResidues,
                );
              const anomalies = anomalyLedger(rows);
              assert.ok(Object.values(anomalies).every((x) => x === 0));
              const allCharges = [h, ...rows.flatMap((row) => row.charges)];
              solutions.push({
                As,
                Bs,
                H,
                h,
                rows: rows.map((row) => row.charges),
                anomalies,
                maxAbs: Math.max(...allCharges.map(Math.abs)),
                l1: allCharges.reduce((sum, q) => sum + Math.abs(q), 0),
              });
            }

assert.equal(solutions.length, 3825);
solutions.sort(
  (a, b) =>
    a.maxAbs - b.maxAbs ||
    a.l1 - b.l1 ||
    JSON.stringify(a.rows).localeCompare(JSON.stringify(b.rows)),
);
const minMaxAbs = solutions[0].maxAbs;
const minL1 = solutions[0].l1;
const minimizers = solutions.filter(
  (s) => s.maxAbs === minMaxAbs && s.l1 === minL1,
);
assert.equal(minMaxAbs, 3);
assert.equal(minL1, 19);
assert.equal(minimizers.length, 3);

const witness = minimizers[0];
assert.deepEqual(witness.rows, [
  [0, 1, -1, -2, 1, 3],
  [0, 1, -1, 1, -2, 0],
  [0, 1, -1, 1, -2, 0],
]);
assert.equal(witness.h, -1);

const matrix = (entry) =>
  witness.rows.map((left, i) =>
    witness.rows.map((right, j) => entry(left, right, i, j)),
  );
const up = matrix((left, right) => left[0] + right[1] + witness.h);
const down = matrix((left, right) => left[0] + right[2] - witness.h);
const chargedLepton = matrix(
  (left, right) => left[3] + right[4] - witness.h,
);
const diracNeutrino = matrix(
  (left, right) => left[3] + right[5] + witness.h,
);
const majorana = matrix((left, right) => left[5] + right[5]);

const zero3 = Array.from({ length: 3 }, () => [0, 0, 0]);
assert.deepEqual(up, zero3);
assert.deepEqual(down, zero3);
assert.deepEqual(chargedLepton, [
  [0, -3, -3],
  [3, 0, 0],
  [3, 0, 0],
]);
assert.deepEqual(diracNeutrino, [
  [0, -3, -3],
  [3, 0, 0],
  [3, 0, 0],
]);
assert.deepEqual(majorana, [
  [6, 3, 3],
  [3, 0, 0],
  [3, 0, 0],
]);

// A charge-three flavon or its conjugate fills every Dirac cross-block at
// first order and the exceptional Majorana diagonal at second order.
for (const charges of [chargedLepton, diracNeutrino])
  assert.ok(charges.flat().every((q) => Math.abs(q / 3) <= 1));
assert.ok(majorana.flat().every((q) => Math.abs(q / 3) <= 2));

// Fully connected one-Higgs Yukawas force universal q and l. The anomaly
// equation l=-3q contradicts q=0 mod3 and l=1 mod3.
for (let q = -30; q <= 30; q += 1) {
  if (mod(q, 3) !== 0) continue;
  const l = -3 * q;
  assert.notEqual(mod(l, 3), 1);
}

const result = {
  protocol: "minimal-generation-dependent-u1-lift-and-flavon-texture/1",
  analyticClassification: {
    parameterization:
      "q_a=3A_a, l_a=1+3B_a, h=2+3H; partners fixed by diagonal Dirac Yukawas",
    masterCondition: "sum_a(3 q_a + l_a)=0",
    integerCondition: "Nf + 3 sum_a(3A_a+B_a)=0",
    familyConsequence: "Nf must be divisible by 3",
  },
  boundedCensus: {
    parameterRange: "A_a,B_a,H in [-2,2]",
    solutionCount: solutions.length,
    minimumMaxAbsCharge: minMaxAbs,
    minimumL1AtThatMaximum: minL1,
    minimizerCount: minimizers.length,
  },
  witness: {
    higgsCharge: witness.h,
    fields,
    familyRows: witness.rows,
    anomalies: witness.anomalies,
  },
  textures: {
    up,
    down,
    chargedLepton,
    diracNeutrino,
    majorana,
    flavonChargeMagnitude: 3,
  },
  theorem:
    "Three families admit a minimal exact-anomaly-free continuous lift of baryon triality with one common Higgs. It leaves quark Yukawas fully connected, enforces a 1+2 lepton texture, and a charge-three flavon fills Dirac cross-blocks at first order and the exceptional Majorana entry at second order.",
  boundary:
    "The abstract lift and texture are not yet embedded in the NCG finite triple or fitted to lepton masses and PMNS data.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
