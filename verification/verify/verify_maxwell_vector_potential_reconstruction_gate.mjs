import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(new URL("../../evidence/data/maxwell-vector-potential-reconstruction-gate-v1.json", import.meta.url), "utf8"));
assert.equal(record.schemaVersion, "maxwell-vector-potential-reconstruction-gate-v1");

const N = 4;
const idx = (x, y, z) => ((x + N) % N) * N * N + ((y + N) % N) * N + ((z + N) % N);
const field = fn => Array.from({length:N ** 3}, (_, n) => {
  const x = Math.floor(n / (N * N));
  const y = Math.floor(n / N) % N;
  const z = n % N;
  return fn(x, y, z);
});
const derivative = (f, axis) => field((x,y,z) => {
  const q = [x,y,z];
  q[axis] += 1;
  return f[idx(...q)] - f[idx(x,y,z)];
});
const gradient = f => [0,1,2].map(a => derivative(f,a));
const curl = A => {
  const dAzDy = derivative(A[2],1), dAyDz = derivative(A[1],2);
  const dAxDz = derivative(A[0],2), dAzDx = derivative(A[2],0);
  const dAyDx = derivative(A[1],0), dAxDy = derivative(A[0],1);
  return [
    dAzDy.map((v,n) => v - dAyDz[n]),
    dAxDz.map((v,n) => v - dAzDx[n]),
    dAyDx.map((v,n) => v - dAxDy[n])
  ];
};
const isZero = f => f.every(x => x === 0);

const chi = field((x,y,z) => x*x + 2*y*z + 3*z);
const pureGauge = gradient(chi);
assert.ok(curl(pureGauge).every(isZero), "commuting periodic differences require curl grad=0");

const A = [
  field((x,y,z) => x + y),
  field((x,y,z) => y + z),
  field((x,y,z) => z + x)
];
const shifted = A.map((component,i) => component.map((v,n) => v + pureGauge[i][n]));
assert.deepEqual(curl(shifted), curl(A), "gauge shift must leave curvature unchanged");
assert.notDeepEqual(shifted, A, "the encoder must be non-injective before quotienting");

const flat = [field(() => 1), field(() => 0), field(() => 0)];
assert.ok(curl(flat).every(isZero), "constant periodic connection is flat");
const gradientSums = pureGauge.map(component => component.reduce((a,b) => a+b, 0));
assert.deepEqual(gradientSums, [0,0,0], "every periodic exact one-form has zero period sum");
assert.notEqual(flat[0].reduce((a,b) => a+b, 0), 0, "the flat x connection has a nonzero period and is not a periodic gradient");

const k = [2,-3,5];
const cross = [
  [0,-k[2],k[1]],
  [k[2],0,-k[0]],
  [-k[1],k[0],0]
];
for (let i=0;i<3;i++) for (let j=0;j<3;j++) assert.ok(cross[j][i] + cross[i][j] === 0);
// Complex conjugation changes i to -i, so (iK)^dagger=(-i)K^T=iK.
for (let i=0;i<3;i++) for (let j=0;j<3;j++) assert.ok(-cross[j][i] - cross[i][j] === 0);

assert.equal(record.typedReconstruction.encoder, "C(A)=curl A=B");
assert.match(record.typedReconstruction.verdict, /cannot reconstruct/);
assert.match(record.dynamics.conclusion, /kinematics, not a dynamical law/);
assert.match(record.topologicalObservable.gaugeBoundary, /relative helicity/);
assert.equal(record.imageAudit.filter(row => row.status === "undefined in the supplied source").length, 1);

console.log(JSON.stringify({
  status: "PASS",
  grid: "4x4x4 periodic",
  localKernel: "curl grad chi=0",
  gaugeCollision: "curl(A+grad chi)=curl(A)",
  topologicalCollision: "constant flat connection has nonzero period and zero curl",
  fourierTyping: "k-times is real skew; i(k-times) is Hermitian",
  reconstruction: "B plus gauge, boundary and Wilson periods"
}));
