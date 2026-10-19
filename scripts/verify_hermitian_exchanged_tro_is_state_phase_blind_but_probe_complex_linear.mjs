const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (l, A) => A.map((r) => r.map((x) => mul(l, x)));
const dagger = (A) => A[0].map((_, j) => A.map((r) => conj(r[j])));
const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => add(s, mul(x, B[k][j])), C())));
const madd = (A, B) => A.map((r, i) => r.map((x, j) => add(x, B[i][j])));
const msub = (A, B) => A.map((r, i) => r.map((x, j) => C(x.re - B[i][j].re, x.im - B[i][j].im)));
const norm = (A) => Math.sqrt(A.flat().reduce((s, x) => s + x.re ** 2 + x.im ** 2, 0));
const P = [[C(0), C(1)], [C(1), C(0)]];
const exchange = (A) => mm(mm(P, A), P);
const response = (x, z) => {
  const middle = dagger(exchange(x));
  return madd(mm(mm(x, middle), z), mm(mm(z, middle), x));
};

const x = [[C(1.2, -0.4), C(0.3, 0.7)], [C(-0.2, 0.5), C(0.9, -0.1)]];
const z = [[C(0.6, 0.2), C(-0.4, 0.3)], [C(0.1, -0.8), C(1.1, 0.4)]];
const phi = 0.71;
const phase = C(Math.cos(phi), Math.sin(phi));
const lambda = C(-0.3, 0.8);
const base = response(x, z);
const phaseBlindError = norm(msub(response(scale(phase, x), z), base));
const probeLinearError = norm(msub(response(x, scale(lambda, z)), scale(lambda, base)));

const amplitude = C(1.7, 0);
const amplitudeScaled = response(scale(amplitude, x), z);
const expectedAmplitudeScaled = scale(C(amplitude.re ** 2, 0), base);
const quadraticStateScalingError = norm(msub(amplitudeScaled, expectedAmplitudeScaled));

const result = {
  protocol: "hermitian-exchanged-tro-slot-linearity/1",
  response: "R_x^H(z)=x S(x)^dagger z + z S(x)^dagger x",
  statePhase: phi,
  statePhaseBlindnessError: phaseBlindError,
  complexProbeScalar: lambda,
  probeComplexLinearityError: probeLinearError,
  stateAmplitude: amplitude.re,
  quadraticStateScalingError,
  slotTyping: {
    repeatedStateSlot: "sesquilinear and U(1)-phase blind",
    probeSlot: "complex linear before any Hermitian observable projection",
  },
  consequence: "The bare Hermitian selector cannot transmit a phase stored in x. A complex Z2 phase can be transported only if Z2 enters through a separately typed complex probe/source slot, followed by a specified Hermitian response map.",
};
result.passed = [phaseBlindError, probeLinearError, quadraticStateScalingError].every((v) => v < 1e-12);

console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
