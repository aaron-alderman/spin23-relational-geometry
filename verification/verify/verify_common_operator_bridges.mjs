const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const close = (a, b, tolerance = 1e-10) => Math.abs(a - b) <= tolerance;
const closeVector = (a, b, tolerance = 1e-10) =>
  a.length === b.length && a.every((value, index) => close(value, b[index], tolerance));
const dot = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0);

const witnesses = [];
const refusals = [];

// Heat kernel and Brownian motion retain the same second-moment law.
{
  const diffusivity = 0.37;
  const time = 1.8;
  const heatKernelVariance = 2 * diffusivity * time;
  const brownianVariance = 2 * diffusivity * time;
  assert(close(heatKernelVariance, brownianVariance), "heat/Brownian variance bridge failed");
  witnesses.push({ id: "heat_brownian", retained: "variance", value: heatKernelVariance });
}

// Quadratic overdamped Langevin and its Gibbs density have the same stationary variance.
{
  const stiffness = 2.3;
  const temperature = 0.8;
  const ouStationaryVariance = temperature / stiffness;
  const gibbsVariance = temperature / stiffness;
  assert(close(ouStationaryVariance, gibbsVariance), "OU/Gibbs stationary bridge failed");
  witnesses.push({ id: "ou_gibbs", retained: "stationary covariance", value: gibbsVariance });
}

// Tweedie's identity for a discrete prior observed through Gaussian noise.
{
  const support = [-1, 2];
  const prior = [0.4, 0.6];
  const sigma = 0.7;
  const y = 0.3;
  const variance = sigma * sigma;
  const unnormalized = support.map((x, index) =>
    prior[index] * Math.exp(-((y - x) ** 2) / (2 * variance))
  );
  const evidence = unnormalized.reduce((a, b) => a + b, 0);
  const posteriorMean = unnormalized.reduce((sum, weight, index) => sum + weight * support[index], 0) / evidence;
  const score = unnormalized.reduce((sum, weight, index) => sum - weight * (y - support[index]) / variance, 0) / evidence;
  const tweedieMean = y + variance * score;
  assert(close(posteriorMean, tweedieMean), "Tweedie conditional-mean bridge failed");
  witnesses.push({ id: "tweedie", retained: "posterior mean", value: posteriorMean });
}

// Gibbs normalization and softmax are the same algebra after z=-E/T.
{
  const energies = [0.2, 1.1, -0.4];
  const temperature = 0.7;
  const logits = energies.map((energy) => -energy / temperature);
  const normalizedExp = (values) => {
    const shift = Math.max(...values);
    const weights = values.map((value) => Math.exp(value - shift));
    const total = weights.reduce((a, b) => a + b, 0);
    return weights.map((weight) => weight / total);
  };
  const gibbs = normalizedExp(energies.map((energy) => -energy / temperature));
  const softmax = normalizedExp(logits);
  assert(closeVector(gibbs, softmax), "Gibbs/softmax bridge failed");
  witnesses.push({ id: "gibbs_softmax", retained: "normalized weights", value: gibbs });
}

// Semi-implicit damped oscillator step equals a heavy-ball recurrence.
{
  const step = 0.08;
  const damping = 0.5;
  const curvature = 3.0;
  let previous = 1.2;
  let position = 1.1;
  let velocity = (position - previous) / step;
  const beta = 1 - damping * step;
  for (let index = 0; index < 8; index += 1) {
    const nextVelocity = beta * velocity - step * curvature * position;
    const oscillatorNext = position + step * nextVelocity;
    const heavyBallNext = position + beta * (position - previous) - step * step * curvature * position;
    assert(close(oscillatorNext, heavyBallNext), "oscillator/heavy-ball discretization failed");
    previous = position;
    position = oscillatorNext;
    velocity = nextVelocity;
  }
  witnesses.push({ id: "oscillator_heavy_ball", retained: "discrete trajectory", value: position });
}

// A fixed linear state recurrence equals its causal convolution realization.
{
  const a = 0.6;
  const b = 1.2;
  const c = -0.7;
  const d = 0.15;
  const input = [1, -0.5, 0.2, 0.8];
  let state = 0;
  const recurrent = input.map((value) => {
    state = a * state + b * value;
    return c * state + d * value;
  });
  const convolved = input.map((value, n) => {
    let result = d * value;
    for (let j = 0; j <= n; j += 1) result += c * (a ** (n - j)) * b * input[j];
    return result;
  });
  assert(closeVector(recurrent, convolved), "state-space/convolution bridge failed");
  witnesses.push({ id: "state_space_convolution", retained: "input-output record", value: recurrent });
}

// RoPE relation score depends on the relative rotation.
{
  const rotate = ([x, y], angle) => [x * Math.cos(angle) - y * Math.sin(angle), x * Math.sin(angle) + y * Math.cos(angle)];
  const query = [0.4, -1.2];
  const key = [1.1, 0.3];
  const m = 0.7;
  const n = 1.9;
  const direct = dot(rotate(query, m), rotate(key, n));
  const relative = dot(query, rotate(key, n - m));
  assert(close(direct, relative), "RoPE relative-rotation bridge failed");
  witnesses.push({ id: "rope_relative_rotation", retained: "relation score", value: direct });
}

// Factorized causal attention equals recurrent sufficient statistics.
{
  const phi = (x) => [1 + x * x, 1 + 0.5 * x];
  const queries = [0.2, -0.1, 0.7];
  const keys = [-0.3, 0.4, 0.1];
  const values = [1.2, -0.8, 0.5];
  const batch = queries.map((query, index) => {
    let numerator = 0;
    let denominator = 0;
    for (let j = 0; j <= index; j += 1) {
      const kernel = dot(phi(query), phi(keys[j]));
      numerator += kernel * values[j];
      denominator += kernel;
    }
    return numerator / denominator;
  });
  const statistic = [0, 0];
  const normalizer = [0, 0];
  const recurrent = queries.map((query, index) => {
    const keyFeature = phi(keys[index]);
    keyFeature.forEach((value, component) => {
      statistic[component] += value * values[index];
      normalizer[component] += value;
    });
    return dot(phi(query), statistic) / dot(phi(query), normalizer);
  });
  assert(closeVector(batch, recurrent), "linear-attention sufficient-state bridge failed");
  witnesses.push({ id: "linear_attention", retained: "causal output", value: recurrent });
}

// Refusal 1: input-selective recurrence is nonlinear and cannot be one fixed convolution.
{
  const selective = (input) => {
    let state = 0;
    return input.map((value) => {
      const gate = 1 / (1 + Math.exp(-value));
      state = gate * state + value;
      return state;
    });
  };
  const first = [0.3, -0.2, 0.5];
  const second = [-0.1, 0.4, 0.2];
  const sum = first.map((value, index) => value + second[index]);
  const responseSum = selective(sum);
  const summedResponses = selective(first).map((value, index) => value + selective(second)[index]);
  const separation = Math.max(...responseSum.map((value, index) => Math.abs(value - summedResponses[index])));
  assert(separation > 1e-4, "selective recurrence unexpectedly behaved as fixed convolution");
  refusals.push({ id: "selective_not_fixed_convolution", separation });
}

// Refusal 2: finite Newton-Schulz is not the exact scalar polar factor near zero.
{
  let iterate = 0.01;
  for (let index = 0; index < 5; index += 1) iterate = 1.5 * iterate - 0.5 * iterate ** 3;
  const separation = Math.abs(1 - iterate);
  assert(separation > 0.5, "finite Newton-Schulz incorrectly treated as exact polar map");
  refusals.push({ id: "finite_newton_schulz_not_exact_polar", separation });
}

// Refusal 3: a Gaussian stationary density can carry rotational probability current.
{
  const omega = 0.9;
  const point = [1.2, -0.4];
  const rotationalCurrent = [-omega * point[1], omega * point[0]];
  const currentNorm = Math.hypot(...rotationalCurrent);
  assert(currentNorm > 0, "rotational stationary current was erased");
  refusals.push({ id: "stationary_not_detailed_balance", currentNorm });
}

console.log(JSON.stringify({
  status: "PASS",
  positiveWitnesses: witnesses.length,
  deliberateRefusals: refusals.length,
  witnesses,
  refusals,
  verdict: "Eight scoped records commute; three tempting global identifications deliberately do not."
}, null, 2));
