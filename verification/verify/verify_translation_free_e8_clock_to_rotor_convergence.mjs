import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/translation-free-e8-clock-to-rotor-convergence-v1.json",
  import.meta.url,
), "utf8"));

assert.equal(record.schemaVersion, "translation-free-e8-clock-to-rotor-convergence-v1");

const jacobiEigenvalues = (input, tolerance = 2e-12, maxSweeps = 40) => {
  const A = input.map(row => [...row]);
  const n = A.length;
  for (let sweep = 0; sweep < maxSweeps; sweep += 1) {
    let largest = 0;
    for (let p = 0; p < n-1; p += 1) for (let q = p+1; q < n; q += 1) {
      const apq = A[p][q];
      largest = Math.max(largest, Math.abs(apq));
      if (Math.abs(apq) < tolerance) continue;
      const tau = (A[q][q]-A[p][p])/(2*apq);
      const t = Math.sign(tau || 1)/(Math.abs(tau)+Math.sqrt(1+tau*tau));
      const c = 1/Math.sqrt(1+t*t);
      const s = t*c;
      const app = A[p][p];
      const aqq = A[q][q];
      A[p][p] = app-t*apq;
      A[q][q] = aqq+t*apq;
      A[p][q] = A[q][p] = 0;
      for (let k = 0; k < n; k += 1) if (k !== p && k !== q) {
        const akp = A[k][p];
        const akq = A[k][q];
        A[k][p] = A[p][k] = c*akp-s*akq;
        A[k][q] = A[q][k] = s*akp+c*akq;
      }
    }
    if (largest < tolerance) break;
  }
  return A.map((row,i) => row[i]).sort((a,b) => a-b);
};

const clockHamiltonian = q => {
  const N = (q-1)/2;
  assert.equal(Number.isInteger(N), true);
  const d = 1-Math.cos(2*Math.PI/q);
  const A = Array.from({length:q}, () => Array(q).fill(0));
  for (let i = 0; i < q; i += 1) {
    const n = i-N;
    A[i][i] = 0.5*(1-Math.cos(2*Math.PI*n/q))/d+1;
    A[i][(i+1)%q] = -0.5;
    A[(i+1)%q][i] = -0.5;
  }
  return A;
};

const pendulumEigenvalues = N => {
  const diagonal = Array.from({length:2*N+1}, (_,i) => 0.5*(i-N)**2+1);
  const countBelow = x => {
    let pivot = diagonal[0]-x;
    let count = pivot < 0 ? 1 : 0;
    for (let i = 1; i < diagonal.length; i += 1) {
      if (Math.abs(pivot) < 1e-14) pivot = pivot < 0 ? -1e-14 : 1e-14;
      pivot = diagonal[i]-x-0.25/pivot;
      if (pivot < 0) count += 1;
    }
    return count;
  };
  return [0,1].map(k => {
    let lower=-1, upper=0.5*N*N+3;
    for (let iteration=0; iteration<120; iteration+=1) {
      const midpoint=(lower+upper)/2;
      if (countBelow(midpoint)<=k) lower=midpoint; else upper=midpoint;
    }
    return (lower+upper)/2;
  });
};

for (const rung of record.clockLadder) {
  const values = jacobiEigenvalues(clockHamiltonian(rung.q));
  assert.ok(Math.abs(values[0]-rung.groundEnergy) < 2e-10, `ground q=${rung.q}`);
  assert.ok(Math.abs(values[1]-values[0]-rung.gap) < 2e-10, `gap q=${rung.q}`);
  assert.ok(rung.gap > 0);
}

const reference = pendulumEigenvalues(record.model.continuumReferenceCutoff);
assert.ok(Math.abs(reference[0]-record.continuumReference.groundEnergy) < 2e-12);
assert.ok(Math.abs(reference[1]-reference[0]-record.continuumReference.gap) < 2e-12);
const last = record.clockLadder.at(-1);
const groundError = Math.abs(last.groundEnergy-reference[0])/reference[0];
const gapError = Math.abs(last.gap-record.continuumReference.gap)/record.continuumReference.gap;
assert.ok(Math.abs(groundError-record.convergence.q129RelativeGroundError) < 2e-12);
assert.ok(Math.abs(gapError-record.convergence.q129RelativeGapError) < 2e-12);
assert.ok(gapError < 1.2e-4);
assert.ok(record.clockLadder.slice(2).every((rung,i,array) => i===0 || rung.gap > array[i-1].gap));

for (const wires of record.convergence.idealStripWidths) {
  assert.equal(8*(wires-1)*2 + record.convergence.unpairedEdgeModesAtEveryWidth, 16*wires);
  assert.equal(record.convergence.productStripGapAtQ129, last.gap);
}

assert.match(record.renormalizationAudit.previousBellContinuumMeaning, /q\^2/u);
assert.ok(record.claimBoundary.open.includes("the full eight-channel K_E8^-1 charging metric"));

console.log(JSON.stringify({
  status:"PASS",
  qValues:record.clockLadder.map(rung=>rung.q),
  fixedCouplingContinuumGap:record.continuumReference.gap,
  q129Gap:last.gap,
  q129RelativeGapError:gapError,
  idealStripWidths:record.convergence.idealStripWidths,
  edgeModes:record.convergence.unpairedEdgeModesAtEveryWidth,
  renormalizationVerdict:record.renormalizationAudit.verdict,
  nextGate:record.claimBoundary.open[0],
}));
