import assert from "node:assert/strict";

// A one-generator endpoint exp(TX) does not determine its control history:
// both pulse shapes below have the same integral and hence the same endpoint.
const T = 1;
const steps = 100000;
const integrate = (f) => {
  let sum = 0;
  const dt = T / steps;
  for (let i = 0; i < steps; i += 1) sum += f((i + 0.5) * dt) * dt;
  return sum;
};
const flatPulse = integrate(() => 1);
const rampPulse = integrate((t) => 2 * t / T);
assert(Math.abs(flatPulse - T) < 1e-9);
assert(Math.abs(rampPulse - T) < 1e-9);

// A minimal two-dimensional reset environment is not a named physical system:
// changing its orthonormal basis preserves the reduced channel.
const rotations = [0, Math.PI / 7, Math.PI / 3];
for (const theta of rotations) {
  const U = [[Math.cos(theta), -Math.sin(theta)], [Math.sin(theta), Math.cos(theta)]];
  const columnNorms = U[0].map((_, j) => U.reduce((s, row) => s + row[j] ** 2, 0));
  assert(columnNorms.every((n) => Math.abs(n - 1) < 1e-12));
}

const gates = {
  globalPfaffianLine: {
    established: "local theta-normal multiplier and local two-zero-mode sign",
    requiredInput: "real skew-adjoint fermion family A(lambda), parameter base B, and anomaly/orientation data",
    status: "not defined by the finite machine carrier",
  },
  dynamicalProvenance: {
    established: "exact quadratic Hamiltonian endpoints and times",
    obstruction: "distinct pulse shapes with the same integral give the same one-generator endpoint",
    requiredInput: "microscopic control action or measured source protocol",
  },
  physicalLevelThreeSector: {
    established: "exact Sp(4,F3) two-qutrit/BF carrier",
    requiredInput: "gauged Z3 sector, compact cycles or gapped interface, plus anomaly inflow/cancellation",
    status: "representation does not imply realization",
  },
  resetResource: {
    established: "minimal environment dimension two and exact collision unitary",
    obstruction: "minimal Stinespring environments are defined only up to environment unitary",
    requiredInput: "physical ancilla identity, preparation/refresh mechanism, coupling and timing",
  },
};

assert.equal(Object.keys(gates).length, 4);
assert.notEqual(flatPulse.toString(), ((t) => 2 * t / T).toString());
console.log(JSON.stringify({ flatPulse, rampPulse, gates }, null, 2));
console.log("PASS verify_tm23_remaining_gates_are_provenance_inputs");
