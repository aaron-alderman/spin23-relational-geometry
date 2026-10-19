const C = (re, im) => ({ re, im });
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const conj = (a) => C(a.re, -a.im);
const abs2 = (a) => a.re ** 2 + a.im ** 2;
const phase = (x) => C(Math.cos(x), Math.sin(x));
const amp = {
  aa: C(0.8, 0.3),
  ab: C(-0.4, 0.9),
  bb: C(1.1, -0.2),
};
const p = mul(amp.aa, amp.bb);
const q = mul(amp.ab, amp.ab);
const z = mul(p, conj(q));
const t = (abs2(p) + abs2(q)) / 2;
const R = [[t + z.re, z.im], [z.im, t - z.re]];
const det = (M) => M[0][0] * M[1][1] - M[0][1] ** 2;
const expectedDet = ((abs2(p) - abs2(q)) / 2) ** 2;
const eigenvalues = [t - Math.hypot(z.re, z.im), t + Math.hypot(z.re, z.im)];
const intensity = (chi) => abs2(add(p, mul(phase(chi), q)));
const extractedImag = (intensity(Math.PI / 2) - intensity(-Math.PI / 2)) / 4;

const ta = 0.43;
const tb = -0.31;
const rephased = {
  aa: mul(phase(2 * ta), amp.aa),
  ab: mul(phase(ta + tb), amp.ab),
  bb: mul(phase(2 * tb), amp.bb),
};
const pr = mul(rephased.aa, rephased.bb);
const qr = mul(rephased.ab, rephased.ab);
const zr = mul(pr, conj(qr));

const result = {
  protocol: "two-copy-lnv-quartet-positive-h2r-interferometer/1",
  elementaryAmplitudes: amp,
  compositePaths: {
    p: "F_aa F_bb",
    q: "F_ab^2",
    pValue: p,
    qValue: q,
    commonRephasingCharge: "2(theta_a+theta_b)",
    commonExternalMultiset: "two alpha leptons plus two beta leptons",
  },
  quartetCoherence: z,
  cpOddQuartet: z.im,
  rephasedCoherence: zr,
  rephasingError: Math.hypot(zr.re - z.re, zr.im - z.im),
  positiveH2RCompression: {
    matrix: R,
    t,
    determinant: det(R),
    expectedDeterminant: expectedDet,
    eigenvalues,
    positive: eigenvalues[0] >= -1e-12,
  },
  quadratureProtocol: {
    IplusPiOver2: intensity(Math.PI / 2),
    IminusPiOver2: intensity(-Math.PI / 2),
    extractedImaginaryCoherence: extractedImag,
    extractionError: Math.abs(extractedImag - z.im),
    formula: "Im(p q*)=[I(pi/2)-I(-pi/2)]/4",
  },
  boundary: "The algebraic two-copy paths have the same external flavor charge, but a physical four-W/four-lepton process or simulator must make them coherent and kinematically indistinguishable.",
};
result.passed =
  result.rephasingError < 1e-12 &&
  Math.abs(det(R) - expectedDet) < 1e-12 &&
  result.positiveH2RCompression.positive &&
  result.quadratureProtocol.extractionError < 1e-12 &&
  Math.abs(z.im) > 1e-12;

console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
