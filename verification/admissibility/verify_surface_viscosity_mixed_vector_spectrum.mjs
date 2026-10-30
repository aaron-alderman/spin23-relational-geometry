import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-surface-viscosity-mixed-vector-spectrum-v1.json",
  import.meta.url,
), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
const zeros = (n, m = n) => Array.from({ length: n }, () => Array(m).fill(0));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
function multiply(a, b) {
  const out = zeros(a.length, b[0].length);
  for (let i = 0; i < a.length; i += 1) for (let k = 0; k < b.length; k += 1) {
    for (let j = 0; j < b[0].length; j += 1) out[i][j] += a[i][k] * b[k][j];
  }
  return out;
}
function matVec(a, v) {
  return a.map((row) => row.reduce((sum, value, i) => sum + value * v[i], 0));
}
function cholesky(a) {
  const l = zeros(a.length);
  for (let i = 0; i < a.length; i += 1) for (let j = 0; j <= i; j += 1) {
    let sum = a[i][j];
    for (let k = 0; k < j; k += 1) sum -= l[i][k] * l[j][k];
    if (i === j) {
      assert(sum > 1e-12, "mass matrix is singular");
      l[i][j] = Math.sqrt(sum);
    } else l[i][j] = sum / l[j][j];
  }
  return l;
}
function inverseLower(l) {
  const inv = zeros(l.length);
  for (let column = 0; column < l.length; column += 1) for (let row = 0; row < l.length; row += 1) {
    let value = row === column ? 1 : 0;
    for (let k = 0; k < row; k += 1) value -= l[row][k] * inv[k][column];
    inv[row][column] = value / l[row][row];
  }
  return inv;
}
function jacobi(input) {
  const a = input.map((row) => [...row]);
  const v = zeros(a.length);
  for (let i = 0; i < a.length; i += 1) v[i][i] = 1;
  for (let iteration = 0; iteration < 20000; iteration += 1) {
    let p = 0; let q = 1; let maximum = 0;
    for (let i = 0; i < a.length; i += 1) for (let j = i + 1; j < a.length; j += 1) {
      if (Math.abs(a[i][j]) > maximum) { maximum = Math.abs(a[i][j]); p = i; q = j; }
    }
    if (maximum < 1e-12) break;
    const angle = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]);
    const c = Math.cos(angle); const s = Math.sin(angle);
    const app = a[p][p]; const aqq = a[q][q]; const apq = a[p][q];
    a[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
    a[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
    a[p][q] = 0; a[q][p] = 0;
    for (let k = 0; k < a.length; k += 1) if (k !== p && k !== q) {
      const akp = a[k][p]; const akq = a[k][q];
      a[k][p] = c * akp - s * akq; a[p][k] = a[k][p];
      a[k][q] = s * akp + c * akq; a[q][k] = a[k][q];
    }
    for (let k = 0; k < a.length; k += 1) {
      const vkp = v[k][p]; const vkq = v[k][q];
      v[k][p] = c * vkp - s * vkq; v[k][q] = s * vkp + c * vkq;
    }
  }
  const order = a.map((row, i) => ({ value: row[i], i })).sort((x, y) => x.value - y.value);
  return { values: order.map((x) => x.value), vectors: v.map((row) => order.map((x) => row[x.i])) };
}
function generalized(q, mass) {
  const l = cholesky(mass);
  const inv = inverseLower(l);
  const symmetric = multiply(multiply(inv, q), transpose(inv));
  const eig = jacobi(symmetric);
  const vectors = multiply(transpose(inv), eig.vectors);
  let residual = 0;
  for (let column = 0; column < eig.values.length; column += 1) {
    const vector = vectors.map((row) => row[column]);
    const left = matVec(q, vector);
    const right = matVec(mass, vector).map((x) => x * eig.values[column]);
    residual = Math.max(residual, Math.hypot(...left.map((x, i) => x - right[i])));
  }
  return { values: eig.values, vectors, residual };
}

function quadratic(matrix, vector) {
  const product = matVec(matrix, vector);
  return vector.reduce((sum, value, i) => sum + value * product[i], 0);
}

function decayLedger(solved, mass) {
  const initial = Array.from({ length: mass.length }, (_, i) => 1 / (i + 1));
  const scale = 1 / Math.sqrt(0.5 * quadratic(mass, initial));
  for (let i = 0; i < initial.length; i += 1) initial[i] *= scale;
  const massInitial = matVec(mass, initial);
  const modal = solved.vectors[0].map((_, column) => solved.vectors.reduce(
    (sum, row, rowIndex) => sum + row[column] * massInitial[rowIndex], 0,
  ));
  const { viscosity, observationTime } = evidence.decayExperiment;
  let finalEnergy = 0;
  let plateauEnergy = 0;
  let integratedDissipation = 0;
  for (let i = 0; i < solved.values.length; i += 1) {
    const componentEnergy = 0.5 * modal[i] ** 2;
    const decay = Math.exp(-2 * viscosity * Math.max(0, solved.values[i]) * observationTime);
    finalEnergy += componentEnergy * decay;
    integratedDissipation += componentEnergy * (1 - decay);
    if (Math.abs(solved.values[i]) <= evidence.thresholds.zeroEigenvalue) plateauEnergy += componentEnergy;
  }
  const firstPositive = solved.values.find((value) => value > evidence.thresholds.zeroEigenvalue);
  return {
    initialEnergy: 1,
    finalEnergy,
    plateauEnergy,
    plateauFraction: plateauEnergy,
    energyIdentityResidual: 1 - finalEnergy - integratedDissipation,
    observationTimeForOnePercentPositiveEnergy: Math.log(100) / (2 * viscosity * firstPositive),
  };
}

function normalizationConstant(epsilon, grid) {
  let mean = 0;
  for (let i = 0; i < grid; i += 1) {
    const x = 2 * Math.PI * (i + 0.5) / grid;
    mean += Math.exp(2 * epsilon * Math.cos(2 * x));
  }
  return -0.5 * Math.log(mean / grid);
}

function psiMode(xType, k, yType) {
  return (x, y) => {
    const X = xType === "cos" ? Math.cos(k * x) : Math.sin(k * x);
    const X1 = k * (xType === "cos" ? -Math.sin(k * x) : Math.cos(k * x));
    const X2 = -k * k * X;
    const Y = yType === "cos" ? Math.cos(y) : Math.sin(y);
    const Y1 = yType === "cos" ? -Math.sin(y) : Math.cos(y);
    const Y2 = -Y;
    return { px: X1 * Y, py: X * Y1, pxx: X2 * Y, pxy: X1 * Y1, pyy: X * Y2 };
  };
}

function basis(sector, refined) {
  const fields = [{ name: "harmonic-dx", kind: "psi", evaluate: () => ({ px: 0, py: 1, pxx: 0, pxy: 0, pyy: 0 }) }];
  if (sector === "rotation") {
    fields.push({ name: "harmonic-dy", kind: "psi", evaluate: () => ({ px: -1, py: 0, pxx: 0, pxy: 0, pyy: 0 }) });
    fields.push({ name: "killing-dy", kind: "killing" });
  }
  const count = refined ? (sector === "klein" ? 4 : 3) : (sector === "klein" ? 3 : 2);
  for (let n = 0; n < count; n += 1) {
    const k = sector === "klein" ? 2 * n + 1 : 2 * n;
    fields.push({ name: "cos-" + k, kind: "psi", evaluate: psiMode("cos", k, "cos") });
  }
  const sinCount = refined ? (sector === "klein" ? 4 : 3) : (sector === "klein" ? 3 : 2);
  for (let n = 0; n < sinCount; n += 1) {
    const k = 2 * (n + 1);
    fields.push({ name: "sin-" + k, kind: "psi", evaluate: psiMode("sin", k, "sin") });
  }
  assert(fields.length === (refined ? evidence.refinedDimension : evidence.baseDimension), "basis dimension mismatch");
  return fields;
}

function fieldData(field, x, y, g) {
  if (field.kind === "killing") {
    return {
      ux: 0, uy: 1, cov: [0, g.sx, -g.sx, 0],
      def: [0, 0, 0], dAlpha: 2 * g.sx * g.exp2,
    };
  }
  const p = field.evaluate(x, y);
  const inv = 1 / g.exp2;
  const ux = inv * p.py; const uy = -inv * p.px;
  const uxX = inv * (p.pxy - 2 * g.sx * p.py);
  const uxY = inv * p.pyy;
  const uyX = -inv * (p.pxx - 2 * g.sx * p.px);
  const uyY = -inv * p.pxy;
  const cov = [
    uxX + g.sx * ux,
    uyX + g.sx * uy,
    uxY - g.sx * uy,
    uyY + g.sx * ux,
  ];
  const dxx = p.pxy - g.sx * p.py;
  const dxy = 0.5 * (-p.pxx + p.pyy + 2 * g.sx * p.px);
  const dyy = -p.pxy + g.sx * p.py;
  return { ux, uy, cov, def: [dxx, dxy, dyy], dAlpha: -(p.pxx + p.pyy) };
}

function assemble(sector, refined) {
  const fields = basis(sector, refined);
  const n = fields.length;
  const mass = zeros(n); const hodge = zeros(n); const bochner = zeros(n); const deformation = zeros(n);
  const grid = 320; const step = 2 * Math.PI / grid;
  const c = normalizationConstant(evidence.epsilon, grid * 8);
  for (let ix = 0; ix < grid; ix += 1) {
    const x = (ix + 0.5) * step;
    const sigma = c + evidence.epsilon * Math.cos(2 * x);
    const g = { exp2: Math.exp(2 * sigma), sx: -2 * evidence.epsilon * Math.sin(2 * x) };
    const inv = 1 / g.exp2;
    for (let iy = 0; iy < grid; iy += 1) {
      const y = (iy + 0.5) * step;
      const data = fields.map((field) => fieldData(field, x, y, g));
      for (let i = 0; i < n; i += 1) for (let j = i; j < n; j += 1) {
        const di = data[i]; const dj = data[j]; const w = step * step;
        mass[i][j] += g.exp2 ** 2 * (di.ux * dj.ux + di.uy * dj.uy) * w;
        hodge[i][j] += inv * di.dAlpha * dj.dAlpha * w;
        bochner[i][j] += g.exp2 * di.cov.reduce((sum, value, k) => sum + value * dj.cov[k], 0) * w;
        deformation[i][j] += 2 * inv * (di.def[0] * dj.def[0]
          + 2 * di.def[1] * dj.def[1] + di.def[2] * dj.def[2]) * w;
      }
    }
  }
  for (const matrix of [mass, hodge, bochner, deformation]) {
    for (let i = 0; i < n; i += 1) for (let j = 0; j < i; j += 1) matrix[i][j] = matrix[j][i];
  }
  let identityResidual = 0;
  // Q_H + Q_D = 2 Q_B on divergence-free fields.
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) {
    identityResidual = Math.max(identityResidual, Math.abs(hodge[i][j] + deformation[i][j] - 2 * bochner[i][j]));
  }
  return { fields: fields.map((x) => x.name), mass, hodge, bochner, deformation, identityResidual };
}

function spectrum(sector, refined) {
  const system = assemble(sector, refined);
  const spectra = {};
  for (const convention of ["hodge", "bochner", "deformation"]) {
    const solved = generalized(system[convention], system.mass);
    const nullity = solved.values.filter((x) => Math.abs(x) <= evidence.thresholds.zeroEigenvalue).length;
    const positive = solved.values.filter((x) => x > evidence.thresholds.zeroEigenvalue);
    spectra[convention] = {
      values: solved.values,
      nullity,
      firstPositive: positive[0],
      residual: solved.residual,
      decay: decayLedger(solved, system.mass),
    };
  }
  return { fields: system.fields, identityResidual: system.identityResidual, spectra };
}

const results = {
  klein: { base: spectrum("klein", false), refined: spectrum("klein", true) },
  rotation: { base: spectrum("rotation", false), refined: spectrum("rotation", true) },
};
const refinement = {};
for (const sector of ["klein", "rotation"]) {
  refinement[sector] = {};
  for (const convention of ["hodge", "bochner", "deformation"]) {
    const base = results[sector].base.spectra[convention];
    const refined = results[sector].refined.spectra[convention];
    refinement[sector][convention] = Math.abs(base.firstPositive - refined.firstPositive) / refined.firstPositive;
    assert(base.nullity === evidence.expectedNullities[sector][convention], sector + " " + convention + " base nullity mismatch");
    assert(refined.nullity === evidence.expectedNullities[sector][convention], sector + " " + convention + " refined nullity mismatch");
    assert(refined.firstPositive >= evidence.thresholds.minimumPositiveEigenvalue, "positive gap failed to open");
    assert(base.residual <= evidence.thresholds.maximumGeneralizedResidual, "base generalized residual failed");
    assert(refined.residual <= evidence.thresholds.maximumGeneralizedResidual, "refined generalized residual failed");
    assert(refinement[sector][convention] <= evidence.thresholds.maximumRefinedFirstGapRelativeDifference,
      sector + " " + convention + " first positive gap failed refinement");
    assert(Math.abs(refined.decay.energyIdentityResidual) <= 1e-12,
      sector + " " + convention + " decay energy identity failed");
    assert(Math.abs(refined.decay.finalEnergy - refined.decay.plateauEnergy)
      <= evidence.decayExperiment.plateauRelativeTolerance,
    sector + " " + convention + " did not reach its kernel plateau");
  }
  assert(results[sector].base.identityResidual <= evidence.thresholds.maximumIdentityMatrixResidual,
    sector + " base form identity failed");
  assert(results[sector].refined.identityResidual <= evidence.thresholds.maximumIdentityMatrixResidual,
    sector + " refined form identity failed");
}

console.log(JSON.stringify({
  status: "PASS",
  epsilon: evidence.epsilon,
  results,
  firstPositiveGapRelativeChanges: refinement,
  verdict: "Mixed vector bases independently reproduce all six kernel dimensions and yield refined positive gaps for Hodge, Bochner and deformation viscosity on both quotients."
}, null, 2));
