import assert from 'node:assert/strict';

const tol = 1e-10;
const close = (x, y, t = tol) => Math.abs(x - y) < t;
const overlap = (omega, alpha, beta) => (omega ** 2 + alpha ** 2) / (omega ** 2 + beta ** 2);
const responseDefect = (omega, alpha, beta) => {
  const num = (beta ** 2 - alpha ** 2) * (2 * omega ** 2 + alpha ** 2 + beta ** 2);
  return num / (omega ** 2 + beta ** 2) ** 2;
};

for (const ell of [0, 0.1, 0.5, 1.2]) {
  const gamma = 1.7;
  const alpha = gamma * Math.exp(-ell);
  const beta = gamma * Math.exp(ell);
  for (const omega of [0, 0.2, 1, 4, 30]) {
    const s = overlap(omega, alpha, beta);
    assert.ok(close(1 - s ** 2, responseDefect(omega, alpha, beta)));
    if (ell === 0) assert.ok(close(s, 1));
    else assert.ok(s > 0 && s < 1);
  }
  assert.ok(close(overlap(0, alpha, beta), Math.exp(-4 * ell)));
  assert.ok(close(overlap(0, alpha, beta) ** 6, Math.exp(-24 * ell)));
}

const alpha = 0.7;
const beta = 2.1;
let previous = overlap(0, alpha, beta);
for (let n = 1; n <= 100; n += 1) {
  const current = overlap(n / 10, alpha, beta);
  assert.ok(current > previous);
  previous = current;
}
assert.ok(Math.abs(overlap(1e6, alpha, beta) - 1) < 1e-10);

console.log(JSON.stringify({
  protocol: 'strict-loss-defect-to-partial-dephasing-overlap/1',
  strictLossTransfer: 'f=((omega-i alpha)/(omega+i beta))^2',
  conditionalIdentification: 's=|f|=(omega^2+alpha^2)/(omega^2+beta^2)',
  exactDefectMatch: '1-s^2=1-|f|^2',
  lockingSuppression: 's^6',
  hyperbolicZeroFrequency: 's(0)=exp(-4 ell), s(0)^6=exp(-24 ell)',
  strictLossWindow: '0<s(omega)<1 for beta>alpha>0 and finite real omega',
  channelBoundary: 'strict amplitude loss and population-preserving phase damping are not the same CPTP map',
  passed: true,
}, null, 2));
