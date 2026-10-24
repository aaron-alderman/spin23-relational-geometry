import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const evidencePath = path.join(root, "evidence/data/lattice-subroutine-gravity-preflight-v1.json");
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));

const N = 6;
const mul = (a, b) => {
  const out = Array(N + 1).fill(0n);
  for (let i = 0; i < a.length; i += 1) {
    for (let j = 0; j < b.length && i + j <= N; j += 1) out[i + j] += a[i] * b[j];
  }
  return out;
};
const pow = (a, n) => {
  let out = [1n];
  for (let i = 0; i < n; i += 1) out = mul(out, a);
  return out;
};
const sigma3 = (n) => {
  let sum = 0n;
  for (let d = 1; d <= n; d += 1) if (n % d === 0) sum += BigInt(d) ** 3n;
  return sum;
};
const divide = (numerator, denominator) => {
  if (denominator[0] !== 1n) throw new Error("series denominator must have unit constant");
  const out = Array(N + 1).fill(0n);
  for (let n = 0; n <= N; n += 1) {
    let value = numerator[n] ?? 0n;
    for (let k = 1; k <= n; k += 1) value -= (denominator[k] ?? 0n) * out[n - k];
    out[n] = value;
  }
  return out;
};

const e4 = Array(N + 1).fill(0n);
e4[0] = 1n;
for (let n = 1; n <= N; n += 1) e4[n] = 240n * sigma3(n);
const e4cubed = pow(e4, 3);

let deltaOverQ = [1n, ...Array(N).fill(0n)];
for (let n = 1; n <= N; n += 1) {
  const factor = Array(N + 1).fill(0n);
  for (let k = 0; k <= 24 && k * n <= N; k += 1) {
    let choose = 1n;
    for (let j = 1; j <= k; j += 1) choose = (choose * BigInt(25 - j)) / BigInt(j);
    factor[k * n] = (k % 2 === 0 ? 1n : -1n) * choose;
  }
  deltaOverQ = mul(deltaOverQ, factor);
}

// j = q^-1 E4^3/(Delta/q); array index zero is the q^-1 coefficient.
const jShifted = divide(e4cubed, deltaOverQ);
const jLaurent = [jShifted[0], jShifted[1], jShifted[2], jShifted[3], jShifted[4]];
const JLaurent = [...jLaurent];
JLaurent[1] -= 744n;
const leechLaurent = [...jLaurent];
leechLaurent[1] -= 720n;

const expectedJ = evidence.modularNormalization.JCoefficientsFromQMinus1ThroughQ3.map(BigInt);
const expectedLeech = evidence.modularNormalization.leechCharacterCoefficientsFromQMinus1ThroughQ3.map(BigInt);
if (JSON.stringify(JLaurent.map(String)) !== JSON.stringify(expectedJ.map(String))) throw new Error("J q-series mismatch");
if (JSON.stringify(leechLaurent.map(String)) !== JSON.stringify(expectedLeech.map(String))) throw new Error("Leech character q-series mismatch");

const c = evidence.centralChargeBudget;
if (c.bosonic.criticalMatterCentralCharge - c.leechOrMonsterChiralCentralCharge !== 2) throw new Error("bosonic c budget mismatch");
if (c.bosonic.criticalMatterCentralCharge - c.bosonic.fourNoncompactCoordinateCentralCharge !== 22) throw new Error("4D bosonic internal c mismatch");
if (c.heterotic4D.leftCriticalMatterCentralCharge - c.heterotic4D.leftNoncompactCentralCharge !== 22) throw new Error("heterotic left c mismatch");
if (c.heterotic4D.rightCriticalMatterCentralCharge - c.heterotic4D.rightNoncompactBosonFermionCentralCharge !== 9) throw new Error("heterotic right c mismatch");
if (c.typeII4D.criticalMatterCentralChargePerSide - c.typeII4D.noncompactBosonFermionCentralChargePerSide !== 9) throw new Error("type-II c mismatch");

console.log(JSON.stringify({
  ok: true,
  qRange: "q^-1 through q^3",
  J: JLaurent.map(String),
  leechCharacter: leechLaurent.map(String),
  centralChargeBudget: c
}, null, 2));
