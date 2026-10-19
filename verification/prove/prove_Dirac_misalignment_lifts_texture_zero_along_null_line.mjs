const eps = 1e-10;
const dot = (a, b) => a.reduce((s, x, i) => s + x*b[i], 0);

// In the Takagi-adapted heavy basis from document 1111.
const a = 2, x = 5, y = 7, d = 3;
const c = [0, 1/y];
const H = [[1/d, -x/(d*y)], [-x/(d*y), (x*x-a*d)/(d*y*y)]];
const dP = 2;

function selectedEntry(epsilon, r) {
  return -2*epsilon*dP*dot(c, r) - epsilon*epsilon*dot(r, [dot(H[0], r), dot(H[1], r)]);
}

const rImage = [1, 0];       // leakage along im(Q M_R Q)
const rNull = [0, 1];        // leakage along ker(Q M_R Q)
const rGeneric = [2, -3];
const h = 1e-6;

const derivative = r => (selectedEntry(h, r) - selectedEntry(-h, r)) / (2*h);
const expectedDerivative = r => -2*dP*dot(c, r);

for (const r of [rImage, rNull, rGeneric]) {
  if (Math.abs(derivative(r) - expectedDerivative(r)) > 1e-8) throw new Error('linear lifting formula failed');
}
if (Math.abs(derivative(rImage)) > eps) throw new Error('image-direction leakage should have no linear lift');
if (Math.abs(derivative(rNull)) < 1e-3) throw new Error('null-direction leakage should lift linearly');

// The exact polynomial agrees with direct contraction of the selected Dirac
// row v=(dP, epsilon*r1, epsilon*r2) against M_R^{-1}.
const Minv = [[0, 0, 1/y], [0, H[0][0], H[0][1]], [1/y, H[1][0], H[1][1]]];
function direct(epsilon, r) {
  const v = [dP, epsilon*r[0], epsilon*r[1]];
  return -dot(v, Minv.map(row => dot(row, v)));
}
for (const r of [rImage, rNull, rGeneric]) {
  for (const e of [-0.2, -0.01, 0.03, 0.4]) {
    if (Math.abs(direct(e, r) - selectedEntry(e, r)) > eps) throw new Error('exact contraction failed');
  }
}

console.log(JSON.stringify({
  protocol: 'Dirac-misalignment-null-line-texture-lifting/1',
  inverseBlockForm: {PP: 0, PQ: c, QQ: H},
  exactFormula: 'delta m_PP=-2 epsilon d_P c^T r-epsilon^2 r^T H r',
  geometricSelection: {
    leakageAlongImageOfRankOneQBlock: {
      r: rImage,
      linearCoefficient: derivative(rImage),
      firstNonzeroOrder: 'quadratic',
    },
    leakageAlongKernelOfRankOneQBlock: {
      r: rNull,
      linearCoefficient: derivative(rNull),
      firstNonzeroOrder: 'linear',
    },
    genericLeakage: {
      r: rGeneric,
      linearCoefficient: derivative(rGeneric),
    },
  },
  interpretation: 'The same charged cross-face component that restores full heavy rank makes Dirac leakage toward the complementary null line the dangerous first-order symmetry-breaking direction.',
  passed: true,
}, null, 2));
