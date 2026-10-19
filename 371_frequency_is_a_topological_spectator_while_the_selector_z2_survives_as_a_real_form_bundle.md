# Frequency Is a Topological Spectator While the Selector \(\mathbb Z_2\) Survives as a Real-Form Bundle

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact bundle and positive-response separation theorem; physical defect Dirac family and equivariant kernel remain open

## 1. Mixed parameter space

After the frequency-fold theorem, consider

\[
\mathcal B=\mathbb C_+\times S^1_{\rm defect}.
\]

The upper half-plane \(\mathbb C_+\) is contractible. Therefore

\[
\mathcal B\simeq S^1.
\]

Adding passive frequency does not create a new two-cycle or an independent
winding generator. Any surviving topology must already come from the defect
circle unless the frequency boundary, poles or compactification are included.

## 2. Primitive selector lift

Choose a lift of the primitive projective loop:

\[
n(\varphi)=
\left(\cos\frac{\varphi}{2},
\sin\frac{\varphi}{2},0\right),
\qquad 0\leq\varphi\leq2\pi.
\]

Then

\[
n(2\pi)=-n(0),
\]

while the director projector closes:

\[
P(\varphi)=n(\varphi)n(\varphi)^T,
\qquad P(2\pi)=P(0).
\]

The lifted line has deck transition \(-1\), so

\[
\boxed{w_1(L_{\rm selector})=1\in H^1(S^1,\mathbb Z_2).}
\]

This is the primitive \(\mathbb{RP}^2\) topology in its simplest bundle form.

## 3. A positive response family over the defect

Use a strictly positive regularized residue

\[
\rho(\varphi)=\epsilon I+u(\varphi)u(\varphi)^T,
\qquad \epsilon>0,
\]

where \(u(\varphi)\) is an antiperiodic two-component lift. Although
\(u(2\pi)=-u(0)\),

\[
\rho(2\pi)=\rho(0).
\]

The Herglotz response

\[
F(\zeta,\varphi)
=\frac{\rho(\varphi)}{m-\zeta}
\]

is periodic in the physical defect angle, strictly passive for
\(\operatorname{Im}\zeta>0\), and nonsingular.

Its determinant is independent of the orientation of \(u\):

\[
\det F(\zeta,\varphi)
=\frac{\epsilon(1+\epsilon)}{(m-\zeta)^2}.
\]

Consequently

\[
\boxed{w_\varphi[\det F]=0.}
\]

The projective selector remains nontrivial even though the complex determinant
line is topologically trivial.

## 4. Two different invariants

The distinction is now exact:

\[
\begin{array}{c|c|c}
\text{object}&\text{invariant}&\text{value}\\ \hline
\text{selector real line}&w_1&1\pmod2\\
\text{positive response determinant}&w[\det F]&0.
\end{array}
\]

The selector topology lives in the real-form/eigenline bundle. It need not
appear as a phase winding of a positive response determinant.

This resolves an implicit assumption in the earlier mixed branch: adding a
causal response does not convert every \(\mathbb Z_2\) real-bundle invariant
into a complex determinant winding.

## 5. Frequency contraction leaves the selector class

Any two points of \(\mathbb C_+\) can be joined without crossing the real
boundary. Contracting the frequency coordinate pulls the family back to one
fixed \(\zeta_0\), while leaving the defect projector untouched. Hence

\[
w_1(\pi_{S^1}^*L_{\rm selector})=1
\]

throughout the mixed family.

Herglotz positivity is compatible with the defect topology; it is simply not
its carrier.

## 6. When a genuinely mixed invariant could arise

A genuinely mixed frequency/defect invariant requires more structure:

- compactifying frequency so that the compactification point is controlled;
- using a Green-function inverse with a specified ultraviolet flattening;
- including a real-frequency boundary cut or singularity;
- forming a two-dimensional closed parameter surface;
- imposing a symmetry class whose \(K\)-theory invariant uses both variables.

Without one of these additions, \(\mathbb C_+\times S^1\) retracts to \(S^1\)
and the invariant is purely the selector \(w_1\).

## 7. Consequence for zero modes

The nontrivial real line can still control fermion signs and mod-two kernel
parity. A Dirac family transported around the defect may return its mass or
grading with a deck transformation even when every positive response
determinant is single-valued.

Therefore the next index calculation should be equivariant:

\[
\operatorname{Ind}_{\mathbb Z_2}\mathcal D
\]

or its real/twisted analogue. An ordinary complex determinant index is the
wrong invariant for the primitive selector loop.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the selector \(w_1\) equals the mod-two equivariant
Dirac kernel parity for a physically derived mass family.

**Determinant falsifier:** trivial determinant winding is used to declare the
real selector bundle topologically trivial.

**Mixing falsifier:** a product with a contractible passive frequency domain is
called a genuinely two-dimensional invariant.

**Lift falsifier:** the antiperiodic lift is required to close as a vector
rather than as a projective line.

**Positivity falsifier:** topology is manufactured by allowing the positive
residue to become singular without recording the gap closing.

## 9. Pinned dependency and continuation

The mixed response branch closes positively for compatibility and negatively
for determinant winding. Pin the remaining physics at the equivariant Dirac
family.

The next calculation must determine the deck action on the double-cover kernel.
The ordinary index on the cover is insufficient because it forgets how the
zero modes decompose into deck characters.

## 10. Certificate

The [mixed defect-bundle certificate](scripts/verify_h2r_defect_bundle_w1_survives_with_zero_mixed_determinant_winding.mjs) verifies the antipodal lift, nontrivial deck sign, periodic positive response, zero determinant winding and survival of the selector class under contraction of the frequency coordinate.

## Companion documents

- [Folded response and zero interior winding](370_a_positive_frequency_fold_restores_the_h2r_cone_but_has_zero_interior_determinant_winding.md)
- [Dynamical \(\mathbb{RP}^2\) selector](297_a_dynamical_real_form_selector_has_rp2_order_parameter_and_two_orientation_modes.md)
- [Selector deck determinant parity](353_selector_deck_gluing_turns_complex_mass_sign_into_determinant_winding_parity.md)
- [Primitive matrix-vortex gate](358_the_full_matrix_vortex_has_index_three_but_the_primitive_rp2_defect_is_twisted.md)
