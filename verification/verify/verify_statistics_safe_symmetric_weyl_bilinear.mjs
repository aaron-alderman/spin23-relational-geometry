#!/usr/bin/env node

const eps = 1e-12;
const assert = (condition, message) => { if (!condition) throw new Error(message); };

// Tiny exterior algebra: a polynomial is Map<bitmask, coefficient>.
const generator = i => new Map([[1 << i, 1]]);
const add = (A, B, scaleB = 1) => {
  const out = new Map(A);
  for (const [m, c] of B) out.set(m, (out.get(m) || 0) + scaleB * c);
  for (const [m, c] of [...out]) if (Math.abs(c) < eps) out.delete(m);
  return out;
};
const wedge = (A, B) => {
  const out = new Map();
  for (const [ma, ca] of A) for (const [mb, cb] of B) {
    if (ma & mb) continue;
    let inversions = 0;
    for (let i = 0; i < 30; i++) if (ma & (1 << i)) {
      for (let j = 0; j < i; j++) if (mb & (1 << j)) inversions++;
    }
    const m = ma | mb;
    const c = ca * cb * (inversions % 2 ? -1 : 1);
    out.set(m, (out.get(m) || 0) + c);
  }
  for (const [m, c] of [...out]) if (Math.abs(c) < eps) out.delete(m);
  return out;
};
const scale = (s, A) => new Map([...A].map(([m, c]) => [m, s * c]));
const nonzero = A => A.size > 0;

const psi1 = generator(0), psi2 = generator(1);
const chi1 = generator(2), chi2 = generator(3);

// Identical Grassmann field: psi_(alpha psi_beta) vanishes componentwise.
const identical11 = wedge(psi1, psi1);
const identical12 = scale(0.5, add(wedge(psi1, psi2), wedge(psi2, psi1)));
const identical22 = wedge(psi2, psi2);
assert(!nonzero(identical11) && !nonzero(identical12) && !nonzero(identical22),
  "identical symmetric Weyl bilinear must vanish");

// Distinct fields: psi_(alpha chi_beta) is nonzero.
const distinct11 = wedge(psi1, chi1);
const distinct12 = scale(0.5, add(wedge(psi1, chi2), wedge(psi2, chi1)));
const distinct22 = wedge(psi2, chi2);
assert(nonzero(distinct11) && nonzero(distinct12) && nonzero(distinct22),
  "distinct symmetric Weyl bilinear must be nonzero");

// Exchanging species reverses the symmetric-spinor bilinear.
const exchanged12 = scale(0.5, add(wedge(chi1, psi2), wedge(chi2, psi1)));
assert(add(distinct12, exchanged12).size === 0, "bilinear must be flavor/species antisymmetric");

// Gauge U(1) neutrality requires opposite charges; two distinct sterile
// neutrino flavors with charge zero pass, a repeated charged species does not.
const neutral = (q1, q2) => q1 + q2 === 0;
assert(neutral(0, 0), "sterile pair should be neutral");
assert(neutral(4, -4), "dual charged representations should be neutral");
assert(!neutral(4, 4), "same charged representation should not be neutral");

// Commuting spinor-helicity variables do not obey Grassmann nilpotence.
const lambda = [2, -3];
const commutingSymSquare = [[lambda[0] ** 2, lambda[0] * lambda[1]], [lambda[0] * lambda[1], lambda[1] ** 2]];
assert(commutingSymSquare.flat().some(x => Math.abs(x) > eps), "commuting polarization square must be nonzero");

console.log("Statistics-safe symmetric Weyl bilinear certificate: PASS");
console.log("identical_local_Grassmann_Sym2=0; distinct_species_Sym2_nonzero=true; species_exchange_sign=-1");
console.log("gauge_neutrality_requires_dual_charges=true; two_sterile_flavors_pass=true; commuting_spinor_helicity_Veroneses_nonzero=true");
