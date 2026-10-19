#!/usr/bin/env node

const assert = (condition, message) => { if (!condition) throw new Error(message); };

const projector = theta => {
  const c = Math.cos(theta), s = Math.sin(theta);
  return [[c * c, c * s], [c * s, s * s]];
};
const phaseOfProjector = P => ({ re: P[0][0] - P[1][1], im: 2 * P[0][1] });
const phasePower = (z, n) => {
  let out = { re: 1, im: 0 };
  for (let k = 0; k < n; k++) out = { re: out.re * z.re - out.im * z.im, im: out.re * z.im + out.im * z.re };
  return out;
};
const winding = phaseFn => {
  const N = 1440;
  let previous = 0, accumulated = 0;
  for (let k = 0; k <= N; k++) {
    const theta = 2 * Math.PI * k / N;
    const z = phaseFn(theta);
    const phase = Math.atan2(z.im, z.re);
    if (k > 0) {
      let delta = phase - previous;
      while (delta > Math.PI) delta -= 2 * Math.PI;
      while (delta < -Math.PI) delta += 2 * Math.PI;
      accumulated += delta;
    }
    previous = phase;
  }
  return Math.round(accumulated / (2 * Math.PI));
};

const relationshipPhase = theta => phaseOfProjector(projector(theta));
const fermionDegree = winding(relationshipPhase);
const stressDegree = winding(theta => phasePower(relationshipPhase(theta), 4));
const reversedDegree = winding(theta => {
  const z = relationshipPhase(theta);
  return { re: z.re, im: -z.im };
});

assert(fermionDegree === 2, "projector/clutching degree must be two");
assert(stressDegree === 8, "fourth tensor power degree must be eight");
assert(reversedDegree === -2, "orientation reversal must flip the degree sign");

console.log("Projector-defect clutching ladder certificate: PASS");
console.log(`RP1_projector_degree=${fermionDegree}; chosen_U1_clutch_c1=${fermionDegree}; fourth_tensor_power_c1=${stressDegree}`);
console.log(`orientation_reversal_c1=${reversedDegree}; numerical_match_exact=true; physical_base_map_and_operator_morphism_open=true`);
