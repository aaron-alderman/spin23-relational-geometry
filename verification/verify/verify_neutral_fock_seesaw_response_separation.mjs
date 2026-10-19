import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;
const mD = 3;
const MR = 40;
const disc = Math.sqrt(MR * MR + 4 * mD * mD);
const lambdaMinus = (MR - disc) / 2;
const lambdaPlus = (MR + disc) / 2;
const mLight = -lambdaMinus;
const mHeavy = lambdaPlus;

assert(lambdaMinus < 0 && lambdaPlus > 0);
assert(close(mLight * mHeavy, mD * mD));
assert(close(mHeavy - mLight, MR));
assert.equal(-mD * mD < 0, true); // det M

const seesaw = mD * mD / MR;
assert(Math.abs(mLight - seesaw) / mLight < 0.01);

// K=M^T M is positive: positive leading minor and determinant.
const K00 = mD * mD;
const K01 = mD * MR;
const K11 = mD * mD + MR * MR;
const detK = K00 * K11 - K01 * K01;
assert(K00 > 0 && detK > 0);
assert(close(detK, Math.pow(mD, 4)));

const schurSquared = K00 - K01 * K01 / K11;
assert(schurSquared > 0);
assert(close(schurSquared, Math.pow(mD, 4) / (mD * mD + MR * MR)));
assert.equal(close(schurSquared, mLight * mLight), false);
assert(Math.abs(schurSquared - mLight * mLight) / (mLight * mLight) < 0.01);

console.log('Neutral Fock/seesaw response-separation certificate: PASS');
console.log(`m_light=${mLight}, m_heavy=${mHeavy}, positive squared Schur=${schurSquared}`);

