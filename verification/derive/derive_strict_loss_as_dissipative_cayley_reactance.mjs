import assert from 'node:assert/strict';

const tolerance = 1e-10;
const complex = (re, im = 0) => ({ re, im });
const add = (x, y) => complex(x.re + y.re, x.im + y.im);
const subtract = (x, y) => complex(x.re - y.re, x.im - y.im);
const multiply = (x, y) => complex(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const divide = (x, y) => {
  const denominator = y.re * y.re + y.im * y.im;
  return complex((x.re * y.re + x.im * y.im) / denominator, (x.im * y.re - x.re * y.im) / denominator);
};
const square = x => multiply(x, x);
const magnitudeSquared = x => x.re * x.re + x.im * x.im;
const close = (x, y, toleranceHere = tolerance) => Math.hypot(x.re - y.re, x.im - y.im) < toleranceHere;

function response(omega, a, b) {
  return divide(square(complex(omega, -a)), square(complex(omega, b)));
}

function cayleyReactanceFromResponse(f) {
  return multiply(complex(0, -1), divide(subtract(complex(1), f), add(complex(1), f)));
}

function closedReactance(omega, a, b) {
  const numerator = complex(a * a - b * b, 2 * omega * (a + b));
  const denominator = complex(2 * omega * omega - a * a - b * b, 2 * omega * (b - a));
  return multiply(complex(0, -1), divide(numerator, denominator));
}

function defectNumerator(omega, a, b) {
  return (b * b - a * a) * (2 * omega * omega + a * a + b * b);
}

function reactanceDenominatorSquared(omega, a, b) {
  const real = 2 * omega * omega - a * a - b * b;
  const imaginary = 2 * omega * (b - a);
  return real * real + imaginary * imaginary;
}

for (const ell of [0, 0.05, 0.2, 0.8, 1.4]) {
  const gamma = 1.7;
  const a = gamma * Math.exp(-ell);
  const b = gamma * Math.exp(ell);
  for (const omega of [-4, -1.1, 0, 0.7, 3.2]) {
    const f = response(omega, a, b);
    const q = cayleyReactanceFromResponse(f);
    const qClosed = closedReactance(omega, a, b);
    assert.ok(close(q, qClosed), `closed Cayley formula failed at ell=${ell}, omega=${omega}`);

    const predictedNegativeImaginary = defectNumerator(omega, a, b) / reactanceDenominatorSquared(omega, a, b);
    assert.ok(Math.abs(-q.im - predictedNegativeImaginary) < tolerance);

    const responseDefect = 1 - magnitudeSquared(f);
    const directDefect = defectNumerator(omega, a, b) / ((omega * omega + b * b) ** 2);
    assert.ok(Math.abs(responseDefect - directDefect) < tolerance);

    if (ell > 0) {
      assert.ok(q.im < 0, 'strict passive loss must give lower-half-plane reactance');
      assert.ok(responseDefect > 0, 'strict passive loss must give positive response defect');
    } else {
      assert.ok(Math.abs(q.im) < tolerance, 'lossless reactance must be real');
    }
  }
}

const gamma = 2.3;
const omega = 3.1;
const lossless = closedReactance(omega, gamma, gamma);
assert.ok(Math.abs(lossless.re - (2 * omega * gamma) / (omega * omega - gamma * gamma)) < tolerance);
assert.ok(Math.abs(lossless.im) < tolerance);

console.log(JSON.stringify({
  protocol: 'strict-loss-dissipative-cayley-reactance/1',
  response: 'f=((omega-i a)/(omega+i b))^2 with 0<a<=b',
  reactance: 'q=-i(1-f)/(1+f)',
  closedForm: 'q=-i[(a^2-b^2)+2i omega(a+b)]/[2omega^2-a^2-b^2+2i omega(b-a)]',
  dissipativePart: '-Im(q)=(b^2-a^2)(2omega^2+a^2+b^2)/|2omega^2-a^2-b^2+2i omega(b-a)|^2',
  responseDefect: '1-|f|^2=(b^2-a^2)(2omega^2+a^2+b^2)/(omega^2+b^2)^2',
  sharedNumerator: '(b^2-a^2)(2omega^2+a^2+b^2)',
  losslessLimit: 'q=2omega gamma/(omega^2-gamma^2)=2r/(1-r^2), r=gamma/omega',
  interpretation: 'Strict passive attenuation is exactly a lower-half-plane dissipative deformation of the Cayley reactance, and its dissipative numerator is the same polynomial that controls the minimal spectral environment coupling.',
  boundary: 'This proves the response/spectral-factor identity. It does not identify the environment port with a Furey, Galois, Jordan, or Standard-Model degree of freedom.',
  passed: true
}, null, 2));
