import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const registerPath = path.join(root, "corpus", "programmes", "common-operator-atlas", "control_inference_closure_v1.json");
const register = JSON.parse(fs.readFileSync(registerPath, "utf8"));

const assert = (condition, message) => { if (!condition) throw new Error(message); };
const close = (a, b, tolerance = 1e-10) => Math.abs(a - b) <= tolerance;
const closeVector = (a, b, tolerance = 1e-10) => a.length === b.length && a.every((value, index) => close(value, b[index], tolerance));
const zeros = (rows, columns) => Array.from({ length: rows }, () => Array(columns).fill(0));
const identity = (n) => Array.from({ length: n }, (_, row) => Array.from({ length: n }, (_, column) => row === column ? 1 : 0));
const transpose = (matrix) => matrix[0].map((_, column) => matrix.map((row) => row[column]));
const add = (a, b) => a.map((row, i) => row.map((value, j) => value + b[i][j]));
const subtract = (a, b) => a.map((row, i) => row.map((value, j) => value - b[i][j]));
const multiply = (a, b) => {
  const output = zeros(a.length, b[0].length);
  for (let i = 0; i < a.length; i += 1) for (let k = 0; k < b.length; k += 1) for (let j = 0; j < b[0].length; j += 1) output[i][j] += a[i][k] * b[k][j];
  return output;
};
const matrixVector = (matrix, vector) => matrix.map((row) => row.reduce((sum, value, index) => sum + value * vector[index], 0));
const outer = (a, b) => a.map((left) => b.map((right) => left * right));
const trace = (matrix) => matrix.reduce((sum, row, index) => sum + row[index], 0);
const rank = (matrix, tolerance = 1e-10) => {
  const work = matrix.map((row) => [...row]);
  let pivotRow = 0;
  for (let column = 0; column < work[0].length && pivotRow < work.length; column += 1) {
    let selected = pivotRow;
    for (let row = pivotRow + 1; row < work.length; row += 1) if (Math.abs(work[row][column]) > Math.abs(work[selected][column])) selected = row;
    if (Math.abs(work[selected][column]) <= tolerance) continue;
    [work[pivotRow], work[selected]] = [work[selected], work[pivotRow]];
    const pivot = work[pivotRow][column];
    for (let j = column; j < work[0].length; j += 1) work[pivotRow][j] /= pivot;
    for (let row = 0; row < work.length; row += 1) {
      if (row === pivotRow) continue;
      const factor = work[row][column];
      for (let j = column; j < work[0].length; j += 1) work[row][j] -= factor * work[pivotRow][j];
    }
    pivotRow += 1;
  }
  return pivotRow;
};
const columns = (...vectors) => vectors[0].map((_, row) => vectors.map((vector) => vector[row]));

assert(register.schemaVersion === "common-operator-control-inference-v1", "control register schema mismatch");
assert(register.operatorChain.length === 9, "operator chain is incomplete");
assert(register.executableWitnesses.length === 6, "witness register drifted");
assert(register.deliberateRefusals.length === 3, "refusal register drifted");
assert(/never an input/i.test(register.lithiumNiobateAllocation.firewall), "science/control firewall missing");

const witnesses = [];
const refusals = [];

// Exact zero-order hold for xdot=a*x+b*u.
{
  const a = -2;
  const b = 1.4;
  const delta = 0.17;
  const initial = 0.8;
  const input = -0.3;
  const F = Math.exp(a * delta);
  const G = ((F - 1) / a) * b;
  const discrete = F * initial + G * input;
  const analytic = Math.exp(a * delta) * initial + b * input * (Math.exp(a * delta) - 1) / a;
  assert(close(discrete, analytic), "exact scalar zero-order hold failed");
  assert(Math.abs(F) < 1, "stable continuous pole did not map inside unit disk");
  witnesses.push({ id: "exact_scalar_zero_order_hold", F, G, state: discrete });
}

// Discrete state-space recurrence equals its Markov-parameter convolution.
{
  const F = [[0.72, 0.11], [-0.08, 0.64]];
  const G = [1.0, 0.3];
  const C = [0.4, -0.9];
  const D = 0.12;
  const input = [1, -0.2, 0.5, 0.1, -0.4];
  let state = [0, 0];
  const recurrent = input.map((value) => {
    state = matrixVector(F, state).map((entry, index) => entry + G[index] * value);
    return C[0] * state[0] + C[1] * state[1] + D * value;
  });
  const powers = [identity(2)];
  for (let index = 1; index < input.length; index += 1) powers.push(multiply(powers[index - 1], F));
  const convolved = input.map((value, time) => {
    let output = D * value;
    for (let j = 0; j <= time; j += 1) output += C.reduce((sum, coefficient, index) => sum + coefficient * matrixVector(powers[time - j], G)[index], 0) * input[j];
    return output;
  });
  assert(closeVector(recurrent, convolved), "z-domain impulse convolution failed");
  witnesses.push({ id: "discrete_state_space_equals_impulse_convolution", output: recurrent });
}

// Nominal rank and a deliberate unreachable/invisible carrier.
{
  const A = [[0.8, 0.1, 0], [0, 0.7, 0.2], [0.1, 0, 0.6]];
  const B = [1, 0.3, -0.2];
  const C = [0.4, 1, 0.6];
  const AB = matrixVector(A, B);
  const A2B = matrixVector(A, AB);
  const CA = C.map((_, column) => C.reduce((sum, value, row) => sum + value * A[row][column], 0));
  const CA2 = CA.map((_, column) => CA.reduce((sum, value, row) => sum + value * A[row][column], 0));
  const controllabilityRank = rank(columns(B, AB, A2B));
  const observabilityRank = rank([C, CA, CA2]);
  assert(controllabilityRank === 3 && observabilityRank === 3, "nominal system is not minimal");

  const deficientA = [[0.8, 0, 0], [0, 0.7, 0], [0, 0, 0.6]];
  const deficientB = [1, 0, 0];
  const deficientC = [1, 0, 0];
  const dAB = matrixVector(deficientA, deficientB);
  const dA2B = matrixVector(deficientA, dAB);
  const dCA = deficientC.map((_, column) => deficientC.reduce((sum, value, row) => sum + value * deficientA[row][column], 0));
  const dCA2 = dCA.map((_, column) => dCA.reduce((sum, value, row) => sum + value * deficientA[row][column], 0));
  const deficientControlRank = rank(columns(deficientB, dAB, dA2B));
  const deficientObserveRank = rank([deficientC, dCA, dCA2]);
  assert(deficientControlRank === 1 && deficientObserveRank === 1, "deficient rank counterexample failed");
  witnesses.push({ id: "controllability_and_observability_rank", controllabilityRank, observabilityRank });
  refusals.push({ id: "scalar_transfer_does_not_identify_unobservable_state", deficientControlRank, deficientObserveRank });
}

// One three-state Kalman update reduces posterior uncertainty and preserves symmetry.
{
  const F = [[0.91, 0.08, 0], [0, 0.84, 0.07], [0.02, 0, 0.95]];
  const P = [[1.0, 0.1, 0], [0.1, 0.8, 0.05], [0, 0.05, 1.2]];
  const Q = [[0.02, 0, 0], [0, 0.03, 0], [0, 0, 0.01]];
  const C = [0.6, -0.3, 0.7];
  const R = 0.12;
  const predicted = add(multiply(multiply(F, P), transpose(F)), Q);
  const projected = matrixVector(predicted, C);
  const innovationVariance = C.reduce((sum, value, index) => sum + value * projected[index], R);
  const gain = projected.map((value) => value / innovationVariance);
  const posterior = multiply(subtract(identity(3), outer(gain, C)), predicted);
  const symmetryError = Math.max(...posterior.flatMap((row, i) => row.map((value, j) => Math.abs(value - posterior[j][i]))));
  assert(trace(posterior) < trace(predicted), "Kalman update did not contract covariance trace");
  assert(symmetryError < 1e-10, "Kalman covariance lost symmetry");
  assert(posterior.every((row, index) => row[index] > 0), "Kalman posterior lost positive diagonal");
  witnesses.push({ id: "kalman_covariance_contraction", priorTrace: trace(predicted), posteriorTrace: trace(posterior), innovationVariance });
}

// PI saturation trial: anti-windup must recover faster after an unreachable set point is removed.
{
  const simulate = (antiWindup) => {
    let output = 0;
    let integral = 0;
    let recoveryCost = 0;
    let saturatedSteps = 0;
    for (let step = 0; step < 220; step += 1) {
      const reference = step < 80 ? 4 : 0;
      const error = reference - output;
      const raw = 0.9 * error + 0.18 * integral;
      const applied = Math.max(-1, Math.min(1, raw));
      if (Math.abs(applied - raw) > 1e-12) saturatedSteps += 1;
      integral += error + (antiWindup ? 0.8 * (applied - raw) : 0);
      output = 0.94 * output + 0.06 * applied;
      if (step >= 80) recoveryCost += Math.abs(output);
    }
    return { recoveryCost, saturatedSteps, finalOutput: output, integral };
  };
  const naive = simulate(false);
  const protectedLoop = simulate(true);
  assert(protectedLoop.recoveryCost < 0.6 * naive.recoveryCost, "anti-windup did not materially improve recovery");
  witnesses.push({ id: "anti_windup_recovery", naive, protected: protectedLoop });
  refusals.push({ id: "saturated_loop_is_not_one_fixed_linear_transfer", saturationObserved: naive.saturatedSteps > 0 });
}

// The nuisance lock reduces common detuning while an orientation-odd science record remains held out.
{
  const run = (phaseSign) => {
    let detuning = 0.8;
    let integral = 0;
    const science = [];
    for (let step = 0; step < 120; step += 1) {
      const estimatedDetuning = detuning;
      const error = -estimatedDetuning;
      integral += error;
      const command = Math.max(-0.4, Math.min(0.4, 0.35 * error + 0.025 * integral));
      detuning = 0.96 * detuning + 0.08 * command;
      science.push(phaseSign * (1 + 0.03 * detuning * detuning));
    }
    return { detuning, scienceMean: science.reduce((a, b) => a + b, 0) / science.length };
  };
  const positive = run(1);
  const negative = run(-1);
  assert(Math.abs(positive.detuning) < 0.02 && Math.abs(negative.detuning) < 0.02, "common-detuning lock failed");
  assert(positive.scienceMean > 0.9 && negative.scienceMean < -0.9, "nuisance lock erased orientation-odd record");
  witnesses.push({ id: "three_mode_science_channel_survives_nuisance_lock", positive, negative });
  refusals.push({ id: "science_residual_must_not_be_controller_error", firewall: register.lithiumNiobateAllocation.firewall });
}

assert(witnesses.length === register.executableWitnesses.length, "executed witness count does not match register");
assert(refusals.length === register.deliberateRefusals.length, "executed refusal count does not match register");

console.log(JSON.stringify({
  status: "PASS",
  witnesses,
  refusals,
  verdict: "The state-space/Laplace-z/Kalman/PID loop closes at software-design level while the lithium-niobate science channel remains outside nuisance feedback."
}, null, 2));
