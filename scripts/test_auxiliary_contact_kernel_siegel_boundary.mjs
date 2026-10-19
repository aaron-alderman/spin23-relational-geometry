import assert from "node:assert/strict";

// On Z=i y I_2, the genus-two trace metric is ds^2=2(dy/y)^2.
// Hence the vertical distance is sqrt(2)|log(y2/y1)|.
const verticalDistance = (y1, y2) => {
  assert(y1 > 0 && y2 > 0);
  return Math.sqrt(2) * Math.abs(Math.log(y2 / y1));
};

const targetImaginaryScale = 1;
const regulators = [1e-1, 1e-2, 1e-4, 1e-8];
const distances = regulators.map((epsilon) => verticalDistance(epsilon, targetImaginaryScale));
for (let i = 1; i < distances.length; i += 1) assert(distances[i] > distances[i - 1]);

// A real algebraic auxiliary response has zero absorptive part.  Adding an
// epsilon regulator approaches the boundary, and its distance to any fixed
// interior response diverges logarithmically.
const expected = regulators.map((epsilon) => Math.sqrt(2) * Math.log(1 / epsilon));
for (let i = 0; i < expected.length; i += 1) {
  assert(Math.abs(distances[i] - expected[i]) < 1e-12);
}

// A positive spectral atom rho/(s-z), rho>0, has positive imaginary part in
// the upper half-plane: Im[rho/(s-(x+iy))]=rho*y/((s-x)^2+y^2)>0.
const spectralImaginaryPart = ({ rho, s, x, y }) => rho * y / ((s - x) ** 2 + y ** 2);
const dressedImaginary = spectralImaginaryPart({ rho: 2, s: 3, x: 1, y: 0.5 });
assert(dressedImaginary > 0);

console.log(JSON.stringify({
  protocol: "auxiliary-contact-kernel-siegel-boundary/1",
  bareAuxiliaryResponse: {
    form: "K_aux=g^2 M^-1, real positive and frequency independent",
    imaginaryPart: 0,
    location: "boundary of the closed Siegel cone, not a point of H_2",
  },
  regulatedBoundaryApproach: regulators.map((epsilon, i) => ({ epsilon, distanceToI: distances[i] })),
  exactDivergence: "d_H2(i epsilon I_2, i I_2)=sqrt(2) log(1/epsilon) -> infinity",
  dressedSpectralWitness: {
    response: "rho/(s-z)",
    parameters: { rho: 2, s: 3, x: 1, y: 0.5 },
    imaginaryPart: dressedImaginary,
    strictlyInterior: true,
  },
  conclusion: "The bare nondynamical topology auxiliary kernel cannot be one endpoint of a finite Siegel geodesic lock. The lock must use a dressed causal composite response with strictly positive spectral imaginary part, or a different geometry that includes the boundary.",
  passed: true,
}, null, 2));
