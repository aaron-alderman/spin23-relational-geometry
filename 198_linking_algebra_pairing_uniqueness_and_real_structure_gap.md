# Linking-Algebra Pairing Uniqueness and the Real-Structure Gap

**Date:** 17 October 2026  
**Branches:** B03, B05 and B11  
**Claim status:** exact finite-dimensional pairing classification; global antiunitary and coefficient selection remain open

## 1. What “the linking algebra supplies a pairing” can mean

Three different structures are easily conflated:

1. a Hermitian norm on a TRO or bimodule;
2. a complex bilinear form used in a holomorphic Weyl mass term;
3. the numerical coupling multiplying that form in the action.

The linking algebra supplies the first canonically up to normalization. It does not automatically supply the second or third.

## 2. Canonical Hermitian pairing

For a rectangular matrix TRO \(X=M_{m,n}(\mathbb C)\), the natural pairing is

\[
h(x,y)=\operatorname{Tr}(x^\dagger y).
\]

Under the left--right unitary action

\[
x\mapsto UxV^\dagger,
\qquad
U\in U(m),\ V\in U(n),
\]

one has

\[
h(UxV^\dagger,UyV^\dagger)=h(x,y).
\]

On an irreducible rectangular bimodule, Schur's lemma makes this invariant positive Hermitian form unique up to an overall positive scale.

For the selected normalized neutral arrow \(n_A\),

\[
h(n_A,n_A)
=\operatorname{Tr}(n_A^\dagger n_A)
=1.
\]

This justifies the internal normalization used in the Lorentz-exterior pairing.

## 3. Why the Hermitian pairing is not yet a Majorana pairing

The Hermitian form is antilinear in one argument:

\[
h(\lambda x,y)=\overline\lambda,h(x,y).
\]

A holomorphic Weyl mass term instead needs a complex bilinear coefficient multiplying \(NN\). One cannot obtain that merely by writing \(h(Nn_A,Nn_A)\), because this produces \(|N|^2\)-type conjugation rather than the holomorphic Grassmann product.

The internal basis can still be contracted by a bilinear form, but an additional real or antiunitary structure is required to convert the Hermitian dual into a complex-linear dual.

## 4. Antiunitary structures on the neutral line

Let the neutral support be the complex line \(L=\mathbb C n_A\). Every conjugation

\[
J_\phi(z n_A)
=e^{i\phi}\overline z,n_A
\]

is antiunitary and obeys

\[
J_\phi^2=1.
\]

Combining it with the Hermitian form gives the complex bilinear pairing

\[
B_\phi(x,y)
:=h(J_\phi x,y).
\]

For \(x=zn_A\) and \(y=wn_A\),

\[
B_\phi(x,y)
=e^{-i\phi}zw.
\]

Thus the permitted bilinear space is one complex dimensional, exactly as found by the gauge-representation classification. But the linking norm alone does not choose \(\phi\).

## 5. Phase choice versus physical phase

For a single isolated sterile field, changing the basis phase of \(n_A\) shifts the presentation of \(J_\phi\), and the mass coefficient transforms oppositely. The choice of \(\phi\) by itself is not a one-generation observable.

Relative phases become physical only after comparison with other structures, such as:

- the neutrino Yukawa pairing;
- additional generations;
- an exceptional coefficient \(C\);
- an external orientation response.

Therefore the real-structure phase cannot be advertised as a predicted Majorana phase.

## 6. Failure of a global chiral real structure

On the complete all-left Standard-Model module, charged irreducible representations are complex. Gauge conjugation sends

\[
(R,Y)\longmapsto(\overline R,-Y),
\]

and the conjugate module is not another vector in the same chiral matter TRO merely because its adjoint operator exists.

Consequently, a gauge-equivariant antiunitary \(J\) does not act internally on the whole undoubled chiral module. It naturally acts on a Nambu or particle--antiparticle completion.

The neutral singlet is exceptional because it is self-conjugate as a gauge representation. The local \(J_\phi\) exists there even though the global native-real-algebra exchange fails.

## 7. A naive complex bilinear is not linking-unitary invariant

The matrix expression

\[
b(x,y)=\operatorname{Tr}(x^T y)
\]

is complex bilinear, but under generic independent left and right unitaries it is not invariant. It becomes meaningful only after additional identifications of a module with its dual.

This demonstrates precisely why the star operation and trace do not by themselves create a holomorphic mass pairing on every TRO block.

## 8. Answer to the current gate

The completed linking algebra provides:

- a canonical adjoint operation;
- a canonical positive Hermitian norm on each irreducible block, up to scale;
- the dual neutral arrow in the observable algebra.

It does **not** by itself provide:

- a preferred neutral conjugation phase \(\phi\);
- a global gauge-equivariant real structure on the undoubled chiral module;
- the numerical Majorana coefficient;
- a family tensor;
- alignment with the exceptional coefficient.

Hence the source currently **permits and normalizes** the unique neutral pairing but does not yet **require or phase-fix** it.

## 9. Stop-everything and falsification gates

**Canonical real structure:** the source algebra or Lorentz/Fock representation singles out one \(J\) compatible with every gauge, Yukawa and ternary operation.

**Relative-phase prediction:** the chosen \(J\) fixes a basis-invariant relation between \(M\), \(Y_\nu\), the exceptional coefficient and an external response.

**Action coefficient:** a spectral-action, trace or variational principle fixes the magnitude of the unique neutral term.

**Permission-only outcome:** all \(J_\phi\) and all complex mass coefficients remain allowed. Then the linking algebra explains support and normalization but not neutrino parameters.

**Global obstruction:** any attempted undoubled real structure maps charged states outside the chiral module. Then the real structure must remain factor-local to the neutral/Nambu completion.

## 10. Certificate

The [linking-pairing/real-structure certificate](scripts/verify_linking_pairing_real_structure_gap.mjs) verifies left--right unitary invariance of the Hilbert--Schmidt form, failure of a naive transpose bilinear, the one-parameter family \(J_\phi^2=1\), bilinearity of \(h(J_\phi x,y)\), and phase dependence of the resulting neutral pairing.

## Companion documents

- [Unique completed-matter pairing](197_unique_gauge_invariant_holomorphic_pairing_on_completed_matter.md)
- [Lorentz exterior pairing](196_lorentz_exterior_pairing_resolves_nilpotent_arrow_mass_gate.md)
- [Furey real-form obstruction](163_furey_real_form_obstruction_and_complex_carrier_escape.md)
- [Furey conjugation and Nambu repair](166_furey_complex_conjugation_repairs_nambu_but_not_neutral_exchange.md)
