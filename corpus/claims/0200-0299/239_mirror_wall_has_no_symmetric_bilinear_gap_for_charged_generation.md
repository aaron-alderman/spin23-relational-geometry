# A Mirror Wall Has No Symmetric Bilinear Gap for a Charged Standard-Model Generation

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B11 and B13  
**Claim status:** exact representation-theoretic bilinear obstruction; interacting symmetric mass generation remains open

## 1. The finite-slab problem

A finite domain-wall regulator contains a physical chiral wall and an opposite-chirality remote wall. Their pole splitting is exponentially small, not cutoff-heavy. The next question is whether the remote generation can be gapped locally while the Standard-Model gauge group remains unbroken and the physical wall stays light.

At quadratic order the answer is almost entirely negative.

## 2. One-generation inventory

In left-handed notation, including a sterile neutrino,

\[
Q:(\mathbf3,\mathbf2)_{1/6},\quad
u^c:(\bar{\mathbf3},\mathbf1)_{-2/3},\quad
d^c:(\bar{\mathbf3},\mathbf1)_{1/3},
\]

\[
L:(\mathbf1,\mathbf2)_{-1/2},\quad
e^c:(\mathbf1,\mathbf1)_1,\quad
\nu^c:(\mathbf1,\mathbf1)_0.
\]

A same-wall Weyl bilinear can be a gauge singlet only if:

1. its color factors contain \(\mathbf1\);
2. its weak factors contain \(\mathbf1\);
3. its hypercharges sum to zero; and
4. its exchange symmetry is compatible with a Lorentz scalar.

Exhausting the pairs leaves only

\[
\boxed{\nu^c\nu^c.}
\]

This is the optional sterile-neutrino Majorana mass. None of the fifteen charged Weyl components receives an unbroken-gauge bilinear mass.

## 3. Why the ordinary Yukawa solution is different

The missing weak and hypercharge quantum numbers are supplied by the Higgs:

\[
u^cQ^T\epsilon H,\qquad
d^cH^\dagger Q,\qquad
e^cH^\dagger L,\qquad
\nu^cL^T\epsilon H.
\]

Once \(H\) condenses, these can gap the mirror fermions—but they also break electroweak symmetry. Making the mirror scale much larger than the physical electroweak scale then requires a separate mirror-localized Higgs background, very large mirror Yukawas, or additional dynamics. None follows from geometric separation alone.

## 4. Cross-wall overlap is not selective

The physical and remote zero modes carry opposite spacetime chirality in matching gauge representations. Their overlap is a gauge-invariant Dirac pairing. For each internal state it has the two-face form

\[
H_{\mathrm{overlap}}=
\begin{pmatrix}
0&\delta\\
\bar\delta&0
\end{pmatrix},
\qquad
E_\pm=\pm|\delta|.
\]

It gaps the symmetric and antisymmetric combinations of **both** walls. It does not leave the physical wall massless while lifting only the remote wall. Increasing slab thickness makes \(|\delta|\) smaller and restores two independent chiral walls.

Therefore ordinary overlap cannot solve the mirror problem selectively.

## 5. The remaining possibilities

The obstruction leaves four genuine branches:

1. **Higgsed mirror wall:** a remote localized scalar background breaks the weak symmetry there and produces large mirror Yukawa masses.
2. **Additional conjugate matter:** new remote partners make the mirror sector vectorlike, at the cost of enlarging the internal spectrum.
3. **Interacting symmetric mass generation:** gauge-invariant multi-fermion interactions gap the anomaly-free mirror sector without a bilinear condensate.
4. **Infinite/overlap limit:** remove the remote wall to infinite separation and define the chiral determinant through a nonlocal limiting construction.

Options 1 and 2 change the microscopic content. Option 4 weakens the finite local-regulator ambition. Option 3 is therefore the most interesting but also the least automatic.

## 6. Relation to anomaly cancellation

Anomaly freedom is necessary for symmetric mirror gapping, but it is not sufficient. The complete one-generation mirror spectrum passes all perturbative and Witten anomaly tests, so anomaly matching does not forbid a fully gapped symmetric phase. The bilinear census shows only that such a phase, if it exists, must be genuinely interacting or topologically ordered.

This is an important distinction:

\[
\text{anomaly-free}
\;\not\Rightarrow\;
\text{quadratically gappable}.
\]

## 7. Furey/TRO implications

The Furey matter TRO organizes the same chiral representation incidences and Higgs arrows. It does not by itself provide a gauge-singlet quadratic mirror mass. A proposed TRO mirror solution must therefore exhibit one of:

- an explicit higher-order invariant whose strong-coupling phase is symmetric and gapped;
- additional conjugate blocks and a reason they do not reappear physically;
- a boundary condition or index construction equivalent to the infinite-wall limit.

Merely invoking dagger closure is insufficient, because an adjoint operator is not an independent conjugate Weyl field.

## 8. Stop-everything and falsification gates

**Positive trigger:** a local gauge-invariant Furey/TRO interaction produces a unique symmetric gapped mirror phase with no massless composites or topological order, while the physical wall response stays chiral.

**Topological trigger:** the mirror can gap only into a specific topologically ordered boundary whose anomaly inflow fixes new observable data.

**Spectrum cost:** every symmetric gap requires additional conjugate matter, proving that the sixteen-state module is not a complete finite regulator.

**Falsifier of a proposed bilinear solution:** its mass term either violates \(SU(3)\times SU(2)\times U(1)\), uses a Higgs condensate while claiming unbroken symmetry, or pairs across the slab and consequently gaps both wall combinations.

## 9. Certificate

The [mirror bilinear-gapping obstruction certificate](../../../verification/verify/verify_mirror_bilinear_gapping_obstruction.mjs) exhausts all unordered pairs in one sixteen-state generation, checks color, weak and hypercharge singlet conditions, finds only the sterile-neutrino Majorana bilinear, counts the fifteen ungapped charged components and verifies that cross-wall overlap gives paired nonzero eigenvalues for every state.

## Companion documents

- [Finite-slab mirror poles](233_finite_slab_mirror_poles_split_exponentially_but_persist.md)
- [One-generation domain-wall anomaly gate](228_one_standard_model_generation_passes_domain_wall_anomaly_gate.md)
- [Dagger closure: antiparticles versus mirrors](../0100-0199/151_dagger_antiparticle_vs_mirror_distinction.md)
- [Full one-generation Higgs/Yukawa portal](237_full_one_generation_higgs_yukawa_portal_is_gauge_covariant.md)
