# All Three Mutual-Shear Axes Factor through the Weak Higgs Doublet and Require No Colored Mediator

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B07, B09, B10, B11 and B14  
**Claim status:** exact weight-level mediator factorization and weak-root closure; phase-gate dynamics remain open

## 1. The decisive mediator question

The three transvection axes realizing the mutual shear are supported on the code/Furey spanning tree. A direct matter-only ternary realization is already ruled out: minimum logical quartets do not satisfy the matrix-unit incidence equations for one product \(xy^\dagger z\).

The correct next test is whether the axes factor through the light weak-doublet part of the \(SO(10)\,\mathbf{10}\), or require its dangerous colored-triplet partners.

For this particular shear word, the answer is exceptionally favorable:

\[
\boxed{
\text{all three axes have weak-doublet mediator routes, and none requires a colored direction.}
}
\]

## 2. The \(Z_D\) axis

The weight-three representative dual to the \(\nu^c\) puncture obeys the exact integer relation

\[
q(\nu^c)+q(e)=q(d_1)+q(u^c_1)=2e_5.
\]

Equivalently,

\[
q(\nu^c)=q(d_1)+q(u^c_1)-q(e).
\]

This is the mixed-current family in the code taxonomy. Its mediator is the weak oscillator direction \(+2e_5\).

## 3. The \(Z_C\) axis

The weight-three representative dual to the \(e^c\) puncture obeys

\[
q(e^c)+q(e)=q(d_1)+q(d^c_1)=-2e_4.
\]

Thus its two bilinear faces are sewn by the other weak oscillator direction, \(-2e_4\). Again no color direction appears.

## 4. The weight-two sum axis

The relation behind \(Z_C+Z_D\sim-e-\nu\) is the charged-lepton quartet

\[
q(\nu^c)+q(e^c)+q(e)+q(\nu)=0.
\]

It has two weak factorization channels:

\[
q(\nu^c)+q(\nu)
=-\bigl(q(e^c)+q(e)\bigr)
=2e_4,
\]

and

\[
q(\nu^c)+q(e)
=-\bigl(q(e^c)+q(\nu)\bigr)
=2e_5.
\]

The cheapest logical axis is therefore precisely the one with both components of the weak Higgs-doublet channel available.

## 5. The weak root closes the component mismatch

The certified Standard-Model root operator

\[
E_{45}=a_4^\dagger a_5
\]

exchanges the two weak oscillator directions. On the completed Furey matter states it exchanges the appropriate components of \(Q\) and \(L\), including the \(e/\nu\) pair up to orientation.

Consequently the earlier \(H_4/H_5\) fine-incidence mismatch is not an arbitrary extra connector. It is exactly the existing \(SU(2)_L\) root action relating the two components of the same weak-doublet mediator.

This establishes representation-level fine closure:

\[
\text{tree paths}
+\text{ weak }E_{45}
+\text{ Higgs-doublet directions }\pm2e_{4,5}.
\]

## 6. Why this does not yet derive the gate

Weight factorization proves that gauge-covariant two-vertex channels exist. It does not prove that integrating out the weak doublet generates a unitary qutrit Pauli transvection with the required coefficient.

A physical derivation must still provide:

1. the \(16\,16\,10\) Clebsch coefficients or their Furey linking-algebra equivalent;
2. Lorentz and fermionic contractions;
3. the mediator propagator and its phase;
4. a parity-phase effective operator rather than only an ordinary Yukawa amplitude;
5. the relative coefficient \(2,1,1\) in \(T_{Z_C+Z_D}^2T_{Z_C}T_{Z_D}\);
6. protection against unwanted operators in the same weak channels.

The result removes the colored-mediator obstruction; it does not manufacture the missing dynamics.

## 7. Cross-branch synthesis

The relational generator now has a highly constrained source carrier:

\[
\begin{array}{c}
\text{two puncture chords }e^c,\nu^c\\
\downarrow\\
\text{tree-supported logical cocycles}\\
\downarrow\\
\text{weak }\mathbf{10}\text{ directions }\pm2e_4,\pm2e_5\\
\downarrow\\
\text{candidate Higgs/weak parity phase}\\
\downarrow\\
K_{\mathrm{mut}}.
\end{array}
\]

Unlike the full set of 25 anomaly-code logicals, this particular \(Sp(4)\) cross gate never requires a colored-triplet route.

## 8. Claim ledger

- **Exact:** the \(Z_D\) axis factors through \(+2e_5\).
- **Exact:** the \(Z_C\) axis factors through \(-2e_4\).
- **Exact:** the weight-two sum axis has both weak \(e_4\) and \(e_5\) channels.
- **Exact:** none of the three axes requires an oscillator direction \(1,2,3\).
- **Exact:** the Standard-Model weak root exchanges the two required directions and the \(e/\nu\) components.
- **Exact obstruction:** no axis is one direct matter-only TRO ternary product.
- **Candidate mechanism:** Higgs-doublet exchange plus weak-root transport generates the three phase rotations.
- **Open:** effective phase, relative coefficients, unwanted-channel cancellation and positive-real lift.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** integrating out the existing Furey Higgs-doublet connector produces the three parity phases with relative powers \((1,1,2)\) and no colored mediator.

**Low-energy trigger:** the resulting interaction induces \(K_{\mathrm{mut}}\) while all baryon-violating colored-only code channels remain absent or heavy.

**Mediator falsifier:** any of the displayed pair sums fails to equal \(\pm2e_4\) or \(\pm2e_5\).

**Ternary falsifier:** the weight identities are presented as one direct \(xy^\dagger z\) product despite the certified incidence no-go.

**Dynamics falsifier:** existence of a weak mediator channel is called a derived Clifford phase without an effective action.

## 10. Certificate

The [mutual-shear weak-mediator certificate](scripts/verify_all_three_mutual_shear_axes_have_only_weak_doublet_mediator_channels.mjs) checks all integer weight identities, classifies every mediator direction and verifies weak-root exchange of the two required channels.

## Companion documents

- [Furey spanning-tree support](484_the_mutual_shear_support_is_the_furey_spanning_tree_and_the_two_punctures_are_its_cycle_closing_chords.md)
- [Low-weight mutual-shear synthesis](483_three_low_weight_code_transvections_realize_exactly_the_genus_two_mutual_seam_shear.md)
- [Vector-\(\mathbf{10}\) factorization of all code logicals](446_all_25_code_logicals_factor_through_the_so10_vector_10_but_12_require_colored_mediators.md)
- [Direct ternary-product no-go](445_the_25_minimum_anomaly_code_logicals_are_not_single_furey_ternary_products.md)
- [Furey nonabelian root action](413_the_so10_fock_root_operators_close_exactly_on_the_completed_furey_matter_tro.md)
