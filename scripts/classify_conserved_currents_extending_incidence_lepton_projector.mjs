import assert from "node:assert/strict";

const prime = 1000003;
const mod = (x) => ((x % prime) + prime) % prime;
const inverse = (x) => {
  let a = mod(x), b = prime, u = 1, v = 0;
  while (b) { const q = Math.floor(a / b); [a, b] = [b, a - q * b]; [u, v] = [v, u - q * v]; }
  return mod(u);
};
const rankMod = (rows) => {
  const a = rows.map((row) => row.map(mod));
  let rank = 0;
  for (let column = 0; column < a[0].length && rank < a.length; column += 1) {
    const pivot = a.findIndex((row, i) => i >= rank && row[column] !== 0);
    if (pivot < 0) continue;
    [a[rank], a[pivot]] = [a[pivot], a[rank]];
    const scale = inverse(a[rank][column]);
    a[rank] = a[rank].map((value) => mod(value * scale));
    for (let i = 0; i < a.length; i += 1) if (i !== rank && a[i][column]) {
      const factor = a[i][column];
      a[i] = a[i].map((value, j) => mod(value - factor * a[rank][j]));
    }
    rank += 1;
  }
  return rank;
};
const dot = (row, vector) => row.reduce((sum, value, i) => sum + value * vector[i], 0);

const fields15 = ["Q", "uc", "dc", "L", "ec", "H"];
const fields16 = [...fields15.slice(0, 5), "nuc", "H"];
const rowsFor = (withNuc, includeGravity) => {
  const f = withNuc ? fields16 : fields15;
  const row = (entries) => f.map((name) => entries[name] ?? 0);
  const rows = [
    row({ Q: 1, uc: 1, H: 1 }),
    row({ Q: 1, dc: 1, H: -1 }),
    row({ L: 1, ec: 1, H: -1 }),
  ];
  if (withNuc) rows.push(row({ L: 1, nuc: 1, H: 1 }));
  rows.push(
    row({ Q: 2, uc: 1, dc: 1 }),
    row({ Q: 3, L: 1 }),
    // Mixed Y^2-X anomaly, with Y6=6Y and representation multiplicities.
    row({ Q: 6, uc: 48, dc: 12, L: 18, ec: 36 }),
  );
  if (includeGravity) rows.push(row({ Q: 6, uc: 3, dc: 3, L: 2, ec: 1, nuc: 1 }));
  return { fields: f, rows };
};

const y15 = [1, -4, 2, -3, 6, 3];
const bmL15 = [1, -1, -1, -3, 3, 0]; // 3(B-L)
const y16 = [1, -4, 2, -3, 6, 0, 3];
const bmL16 = [1, -1, -1, -3, 3, 3, 0];

const gauge15 = rowsFor(false, false);
const full15 = rowsFor(false, true);
const gauge16 = rowsFor(true, false);
const full16 = rowsFor(true, true);
for (const row of gauge15.rows) assert.equal(dot(row, y15), 0);
for (const row of gauge15.rows) assert.equal(dot(row, bmL15), 0);
for (const row of full16.rows) assert.equal(dot(row, y16), 0);
for (const row of full16.rows) assert.equal(dot(row, bmL16), 0);
assert.notEqual(dot(full15.rows.at(-1), bmL15), 0);

const dimensions = {
  fifteenGaugeMixedAnomalyFree: fields15.length - rankMod(gauge15.rows),
  fifteenIncludingGravity: fields15.length - rankMod(full15.rows),
  sixteenGaugeMixedAnomalyFree: fields16.length - rankMod(gauge16.rows),
  sixteenIncludingGravity: fields16.length - rankMod(full16.rows),
};
assert.deepEqual(dimensions, {
  fifteenGaugeMixedAnomalyFree: 2,
  fifteenIncludingGravity: 1,
  sixteenGaugeMixedAnomalyFree: 2,
  sixteenIncludingGravity: 2,
});

const fermionData16 = [
  { m: 6, y: 1, b: 1 }, { m: 3, y: -4, b: -1 },
  { m: 3, y: 2, b: -1 }, { m: 2, y: -3, b: -3 },
  { m: 1, y: 6, b: 3 }, { m: 1, y: 0, b: 3 },
];
const sums = {
  y3: fermionData16.reduce((s, r) => s + r.m * r.y ** 3, 0),
  y2b: fermionData16.reduce((s, r) => s + r.m * r.y ** 2 * r.b, 0),
  yb2: fermionData16.reduce((s, r) => s + r.m * r.y * r.b ** 2, 0),
  b3: fermionData16.reduce((s, r) => s + r.m * r.b ** 3, 0),
  gravY: fermionData16.reduce((s, r) => s + r.m * r.y, 0),
  gravB: fermionData16.reduce((s, r) => s + r.m * r.b, 0),
};
assert(Object.values(sums).every((value) => value === 0));

const leptonDoubletOnly = { Q: 0, uc: 0, dc: 0, L: 1, ec: 0, H: 0 };
const leptonNumber = { Q: 0, uc: 0, dc: 0, L: 1, ec: -1, H: 0 };
const su2Anomaly = (charges) => 3 * charges.Q + charges.L;
assert.equal(su2Anomaly(leptonDoubletOnly), 1);
assert.equal(su2Anomaly(leptonNumber), 1);

console.log(JSON.stringify({
  protocol: "conserved-currents-extending-incidence-lepton-projector/1",
  constraints: {
    classical: ["Q H uc", "Q Hdag dc", "L Hdag ec", "and L H nuc in the sixteen-state branch"],
    quantumLinear: ["SU(3)^2-X", "SU(2)^2-X", "Y^2-X", "gravity^2-X when requested"],
  },
  nullspaceDimensions: dimensions,
  fifteenStateResult: {
    mixedSMGaugeAnomalyFreeBasis: ["Y", "B-L"],
    gravityIncludedBasis: ["Y only"],
    obstruction: "3(B-L) has nonzero gravitational and cubic anomaly without nu^c.",
  },
  sixteenStateResult: {
    fullLinearBasis: ["Y", "B-L"],
    cubicAndMixedPolynomialCoefficients: sums,
    conclusion: "With nu^c, every linear combination aY+b(B-L) passes the displayed linear, cubic, and mixed abelian anomaly tests.",
  },
  incidenceCurrentAudit: {
    leptonDoubletOnlySU2Anomaly: su2Anomaly(leptonDoubletOnly),
    totalLeptonNumberSU2Anomaly: su2Anomaly(leptonNumber),
    conclusion: "P_L selects neither a classically closed current by itself nor a quantum-anomaly-free lepton current. The minimal fully anomaly-free extension with a genuine lepton component is B-L in the sixteen-state nu^c completion, modulo gauged hypercharge."
  },
  physicalGate: "Determine whether the Furey exchange and incidence projector extend coherently to the nu^c arrow and whether a B-L two-face response selects new physics beyond an ordinary anomaly-free current.",
  passed: true,
}, null, 2));
