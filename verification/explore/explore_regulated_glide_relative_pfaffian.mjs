const C = (re, im = 0) => ({ re, im });
const addC = (a, b) => C(a.re + b.re, a.im + b.im);
const mulC = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conjC = (a) => C(a.re, -a.im);
const scaleC = (s, a) => C(s * a.re, s * a.im);
const zeroMatrix = (n, m = n) => Array.from({ length: n }, () => Array.from({ length: m }, () => C(0)));
const addTo = (a, i, j, value) => { a[i][j] = addC(a[i][j], value); };
const addM = (a, b) => a.map((row, i) => row.map((x, j) => addC(x, b[i][j])));
const scaleM = (s, a) => a.map((row) => row.map((x) => scaleC(s, x)));
const mulM = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, x, k) => addC(sum, mulC(x, b[k][j])), C(0))));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conjC(row[j])));
const star = (a) => a.map((row) => row.map(conjC));
const equalM = (a, b, tolerance = 1e-8) => a.every((row, i) => row.every((x, j) =>
  Math.abs(x.re - b[i][j].re) < tolerance && Math.abs(x.im - b[i][j].im) < tolerance));
const kron = (a, b) => a.flatMap((rowA) => b.map((rowB) =>
  rowA.flatMap((x) => rowB.map((y) => mulC(x, y)))));

const I2 = [[C(1), C(0)], [C(0), C(1)]];
const sx = [[C(0), C(1)], [C(1), C(0)]];
const sy = [[C(0), C(0, -1)], [C(0, 1), C(0)]];
const sz = [[C(1), C(0)], [C(0), C(-1)]];
const ax = kron(sx, I2);
const ay = kron(sy, I2);
const b1 = kron(sz, sx);
const b2 = kron(sz, sz);
const ax8 = kron(ax, I2);
const ay8 = kron(ay, I2);
const b18 = kron(b1, I2);
const b28 = kron(b2, I2);
const MW8 = kron(kron(sz, I2), sz);
const glide8 = kron(ax, sx);
const C8 = kron(ax, I2);
const chiralBreaker8 = kron(kron(I2, sy), I2);
const I8 = kron(kron(I2, I2), I2);
const W2 = [[C(1 / Math.sqrt(2)), C(0, 1 / Math.sqrt(2))],
  [C(1 / Math.sqrt(2)), C(0, -1 / Math.sqrt(2))]];
const W8 = kron(kron(W2, I2), I2);

const build = ({ L, M, r, m0, mu, delta = 0, boundaryMass = 0, texture }) => {
  const nx = 2 * L;
  const ny = 2 * M + 1;
  const sites = nx * ny;
  const spin = 8;
  const n = sites * spin;
  const siteIndex = (x, y) => ((y + M) * nx + ((x % nx) + nx) % nx);
  const idx = (x, y, a) => spin * siteIndex(x, y) + a;
  const H = zeroMatrix(n);
  for (let y = -M; y <= M; y += 1) for (let x = 0; x < nx; x += 1) {
    const masses = texture === "defect"
      ? [m0 * Math.sin(Math.PI * x / L), mu * y]
      : [m0 * Math.cos(Math.PI * x / L), m0 * Math.sin(Math.PI * x / L)];
    const onsite = addM(addM(addM(addM(scaleM(masses[0], b18), scaleM(masses[1], b28)), scaleM(2 * r, MW8)),
      scaleM(delta, chiralBreaker8)), scaleM(Math.abs(y) === M ? boundaryMass : 0, MW8));
    for (let a = 0; a < spin; a += 1) for (let b = 0; b < spin; b += 1) {
      addTo(H, idx(x, y, a), idx(x, y, b), onsite[a][b]);
      addTo(H, idx(x, y, a), idx(x + 1, y, b), addC(mulC(C(0, -0.5), ax8[a][b]), scaleC(-r / 2, MW8[a][b])));
      addTo(H, idx(x, y, a), idx(x - 1, y, b), addC(mulC(C(0, 0.5), ax8[a][b]), scaleC(-r / 2, MW8[a][b])));
      if (y < M) addTo(H, idx(x, y, a), idx(x, y + 1, b), addC(mulC(C(0, -0.5), ay8[a][b]), scaleC(-r / 2, MW8[a][b])));
      if (y > -M) addTo(H, idx(x, y, a), idx(x, y - 1, b), addC(mulC(C(0, 0.5), ay8[a][b]), scaleC(-r / 2, MW8[a][b])));
    }
  }
  const U = zeroMatrix(n);
  for (let y = -M; y <= M; y += 1) for (let x = 0; x < nx; x += 1) {
    const gx = (x + L) % nx;
    const gy = -y;
    for (let a = 0; a < spin; a += 1) for (let b = 0; b < spin; b += 1) {
      addTo(U, idx(gx, gy, a), idx(x, y, b), glide8[a][b]);
    }
  }
  const W = zeroMatrix(n);
  for (let site = 0; site < sites; site += 1) for (let a = 0; a < spin; a += 1) for (let b = 0; b < spin; b += 1) {
    W[spin * site + a][spin * site + b] = W8[a][b];
  }
  const HM = mulM(mulM(dagger(W), H), W);
  const UM = mulM(mulM(dagger(W), U), W);
  return { H, U, HM, UM, n };
};

const realPart = (a) => a.map((row) => row.map((z) => z.re));
const imagPart = (a) => a.map((row) => row.map((z) => z.im));
const maxAbs = (a) => {
  let maximum = 0;
  for (const row of a) for (const value of row) maximum = Math.max(maximum, Math.abs(value));
  return maximum;
};
const transposeR = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const mulR = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => s + x * b[k][j], 0)));

const sectorBasis = (u, sign = 1, tolerance = 1e-9) => {
  const n = u.length;
  const basis = [];
  for (let column = 0; column < n; column += 1) {
    const v = Array.from({ length: n }, (_, i) => ((i === column ? 1 : 0) + sign * u[i][column]) / 2);
    for (const q of basis) {
      const overlap = q.reduce((s, x, i) => s + x * v[i], 0);
      for (let i = 0; i < n; i += 1) v[i] -= overlap * q[i];
    }
    const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
    if (norm > tolerance) basis.push(v.map((x) => x / norm));
  }
  return Array.from({ length: n }, (_, i) => basis.map((q) => q[i]));
};

const pfaffianSignLog = (input, tolerance = 1e-9) => {
  const a = input.map((row) => [...row]);
  let sign = 1;
  let logAbs = 0;
  for (let k = 0; k < a.length; k += 2) {
    let pivotIndex = k + 1;
    for (let j = k + 2; j < a.length; j += 1) if (Math.abs(a[k][j]) > Math.abs(a[k][pivotIndex])) pivotIndex = j;
    if (Math.abs(a[k][pivotIndex]) < tolerance) return { sign: 0, logAbs: -Infinity };
    if (pivotIndex !== k + 1) {
      [a[k + 1], a[pivotIndex]] = [a[pivotIndex], a[k + 1]];
      for (let i = 0; i < a.length; i += 1) [a[i][k + 1], a[i][pivotIndex]] = [a[i][pivotIndex], a[i][k + 1]];
      sign *= -1;
    }
    const pivot = a[k][k + 1];
    sign *= Math.sign(pivot);
    logAbs += Math.log(Math.abs(pivot));
    for (let i = k + 2; i < a.length; i += 1) for (let j = i + 1; j < a.length; j += 1) {
      a[i][j] -= (a[k][i] * a[k + 1][j] - a[k][j] * a[k + 1][i]) / pivot;
      a[j][i] = -a[i][j];
    }
  }
  return { sign, logAbs };
};

const projectedSystems = (parameters, sectorSign = 1) => {
  const reference = build({ ...parameters, texture: "reference" });
  const defect = build({ ...parameters, texture: "defect" });
  if (!equalM(dagger(reference.H), reference.H) || !equalM(dagger(defect.H), defect.H)) throw new Error("Hermiticity failure");
  if (!equalM(mulM(mulM(reference.U, reference.H), dagger(reference.U)), reference.H)) throw new Error("reference glide failure");
  if (!equalM(mulM(mulM(defect.U, defect.H), dagger(defect.U)), defect.H)) throw new Error("defect glide failure");
  if (maxAbs(realPart(reference.HM)) > 1e-8 || maxAbs(realPart(defect.HM)) > 1e-8) throw new Error("Majorana Hamiltonian not imaginary");
  if (maxAbs(imagPart(reference.UM)) > 1e-8) throw new Error("Majorana glide not real");
  const u = realPart(reference.UM);
  const q = sectorBasis(u, sectorSign);
  const project = (hm) => {
    const A = imagPart(hm); // H_M=iA with A real antisymmetric.
    return mulR(mulR(transposeR(q), A), q);
  };
  const ar = project(reference.HM);
  const ad = project(defect.HM);
  return {
    parameters,
    sectorSign,
    n: reference.n,
    sectorDimension: q[0].length,
    q,
    ar,
    ad,
    fullAr: imagPart(reference.HM),
    fullAd: imagPart(defect.HM),
    fullGlide: realPart(reference.UM),
    nx: 2 * parameters.L,
    ny: 2 * parameters.M + 1,
    spin: 8,
  };
};

const run = (parameters, sectorSign = 1) => {
  const projected = projectedSystems(parameters, sectorSign);
  const { ar, ad } = projected;
  const pfr = pfaffianSignLog(ar);
  const pfd = pfaffianSignLog(ad);
  return { parameters, sectorSign, n: projected.n, sectorDimension: projected.sectorDimension, pfr, pfd, relative: pfr.sign * pfd.sign,
    antiR: maxAbs(ar.map((row, i) => row.map((x, j) => x + ar[j][i]))),
    antiD: maxAbs(ad.map((row, i) => row.map((x, j) => x + ad[j][i]))) };
};

const labels = ["I", "x", "y", "z"];
const Q = kron(kron(sz, sy), sy);
const Z8 = scaleM(0, kron(kron(I2, I2), I2));
const commute = (a, b) => addM(mulM(a, b), scaleM(-1, mulM(b, a)));
const anticommute = (a, b) => addM(mulM(a, b), mulM(b, a));
const allowedChiralBreakers = [];
const orientationLineCandidates = [];
for (let a = 0; a < 4; a += 1) for (let b = 0; b < 4; b += 1) for (let c = 0; c < 4; c += 1) {
  const matrix = kron(kron([I2, sx, sy, sz][a], [I2, sx, sy, sz][b]), [I2, sx, sy, sz][c]);
  const glideEven = equalM(mulM(mulM(glide8, matrix), dagger(glide8)), matrix);
  const particleHoleOdd = equalM(mulM(mulM(C8, star(matrix)), dagger(C8)), scaleM(-1, matrix));
  const breaksQ = !equalM(anticommute(Q, matrix), Z8);
  if (glideEven && particleHoleOdd && breaksQ) {
    allowedChiralBreakers.push({ label: `${labels[a]}${labels[b]}${labels[c]}`,
      commutesQ: equalM(commute(Q, matrix), Z8) });
  }
  const glideOdd = equalM(mulM(mulM(glide8, matrix), dagger(glide8)), scaleM(-1, matrix));
  const particleHoleEven = equalM(mulM(mulM(C8, star(matrix)), dagger(C8)), matrix);
  const majoranaMatrix = mulM(mulM(dagger(W8), matrix), W8);
  const majoranaReal = maxAbs(imagPart(majoranaMatrix)) < 1e-9;
  if (glideOdd && particleHoleEven && majoranaReal) {
    orientationLineCandidates.push({
      label: `${labels[a]}${labels[b]}${labels[c]}`,
      matrix,
      majoranaMatrix: realPart(majoranaMatrix),
      commutesAx: equalM(commute(matrix, ax8), Z8),
      commutesAy: equalM(commute(matrix, ay8), Z8),
      commutesB1: equalM(commute(matrix, b18), Z8),
      commutesB2: equalM(commute(matrix, b28), Z8),
      commutesWilson: equalM(commute(matrix, MW8), Z8),
      commutesSelector: equalM(commute(matrix, chiralBreaker8), Z8),
    });
  }
}

const transverseHoppingAudit = (r) => {
  const tPlus = ay8.map((row, i) => row.map((value, j) =>
    addC(mulC(C(0, -0.5), value), scaleC(-r / 2, MW8[i][j]))));
  const squareTarget = scaleM((r * r - 1) / 4, I8);
  const invertible = Math.abs(r * r - 1) > 1e-12;
  const inverseCandidate = invertible ? scaleM(4 / (r * r - 1), tPlus) : null;
  return {
    r,
    squareIdentity: equalM(mulM(tPlus, tPlus), squareTarget),
    invertible,
    inverseIdentity: invertible && equalM(mulM(tPlus, inverseCandidate), I8),
    squareCoefficient: (r * r - 1) / 4,
  };
};

// Exact two-step transfer system in the open transverse direction.  The slice
// retains the complete periodic circumference, so this is not a single-site
// or continuum-tail approximation.
const transverseTransferSystem = ({ L, y, r, m0, mu, delta = 0 }) => {
  if (Math.abs(r * r - 1) < 1e-12) throw new Error("transverse hopping is singular at |r|=1");
  const nx = 2 * L;
  const sliceDimension = 8 * nx;
  const index = (x, a) => 8 * (((x % nx) + nx) % nx) + a;
  const tPlus = ay8.map((row, i) => row.map((value, j) =>
    addC(mulC(C(0, -0.5), value), scaleC(-r / 2, MW8[i][j]))));
  const tMinus = dagger(tPlus);
  const tPlusInverse = scaleM(4 / (r * r - 1), tPlus);
  const V = zeroMatrix(sliceDimension);
  const TPlus = zeroMatrix(sliceDimension);
  const TMinus = zeroMatrix(sliceDimension);
  for (let x = 0; x < nx; x += 1) {
    const onsite = addM(addM(addM(scaleM(m0 * Math.sin(Math.PI * x / L), b18), scaleM(mu * y, b28)),
      scaleM(2 * r, MW8)), scaleM(delta, chiralBreaker8));
    for (let a = 0; a < 8; a += 1) for (let b = 0; b < 8; b += 1) {
      addTo(V, index(x, a), index(x, b), onsite[a][b]);
      addTo(V, index(x, a), index(x + 1, b), addC(mulC(C(0, -0.5), ax8[a][b]), scaleC(-r / 2, MW8[a][b])));
      addTo(V, index(x, a), index(x - 1, b), addC(mulC(C(0, 0.5), ax8[a][b]), scaleC(-r / 2, MW8[a][b])));
      TPlus[index(x, a)][index(x, b)] = tPlus[a][b];
      TMinus[index(x, a)][index(x, b)] = tMinus[a][b];
    }
  }
  const TPlusInverse = zeroMatrix(sliceDimension);
  for (let x = 0; x < nx; x += 1) for (let a = 0; a < 8; a += 1) for (let b = 0; b < 8; b += 1) {
    TPlusInverse[index(x, a)][index(x, b)] = tPlusInverse[a][b];
  }
  const P = scaleM(-1, mulM(TPlusInverse, V));
  const Qtransfer = scaleM(-1, mulM(TPlusInverse, TMinus));
  const transfer = zeroMatrix(2 * sliceDimension);
  const currentForm = zeroMatrix(2 * sliceDimension);
  for (let i = 0; i < sliceDimension; i += 1) for (let j = 0; j < sliceDimension; j += 1) {
    transfer[i][j] = P[i][j];
    transfer[i][sliceDimension + j] = Qtransfer[i][j];
    transfer[sliceDimension + i][j] = C(Number(i === j));
    currentForm[i][sliceDimension + j] = mulC(C(0, -1), TMinus[i][j]);
    currentForm[sliceDimension + i][j] = mulC(C(0, 1), TPlus[i][j]);
  }
  return { L, y, r, m0, mu, delta, nx, sliceDimension, V, TPlus, TMinus, transfer, currentForm };
};
if (process.argv[1]?.endsWith("explore_regulated_glide_relative_pfaffian.mjs")) {
  for (const parameters of [
    { L: 2, M: 1, r: 0.4, m0: 0.8, mu: 0.7 },
    { L: 2, M: 1, r: 0.8, m0: 0.8, mu: 0.7 },
    { L: 2, M: 1, r: 1.2, m0: 0.8, mu: 0.7 },
    { L: 3, M: 1, r: 0.8, m0: 0.8, mu: 0.7 },
  ]) console.log(JSON.stringify(run(parameters)));
  console.log(JSON.stringify({ allowedChiralBreakers }));
  for (const delta of [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3]) {
    console.log(JSON.stringify(run({ L: 2, M: 1, r: 0.8, m0: 0.8, mu: 0.7, delta })));
  }
}

export { run, projectedSystems, allowedChiralBreakers, orientationLineCandidates, transverseHoppingAudit,
  transverseTransferSystem };
