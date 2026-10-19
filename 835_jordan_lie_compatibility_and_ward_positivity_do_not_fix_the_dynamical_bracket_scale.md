# Jordan–Lie Compatibility and Ward Positivity Do Not Fix the Dynamical Bracket Scale

**Date:** 17 October 2026  
**Branches:** Jordan–Lie dynamics, (H_2) response, Ward quotient, positivity, and (Spin(2,3)) normalization  
**Claim status:** exact finite-dimensional scale audit; normalization dependency isolated  
**Certificate:** [test_whether_jordan_lie_compatibility_positivity_and_a_ward_quotient_fix_the_bracket_scale.mjs](scripts/test_whether_jordan_lie_compatibility_positivity_and_a_ward_quotient_fix_the_bracket_scale.mjs)

## Executive result

Jordan–Lie compatibility does not by itself fix the strength of the Lie bracket relative to the positive Jordan carrier. Positivity and homogeneous Ward identities do not remove the freedom.

Write a Hermitian (2\times2) matrix as

\[
A=a_0I+\mathbf a\cdot\boldsymbol\sigma
\]

and use the ordinary special-Jordan product

\[
A\circ B=\frac12(AB+BA).
\]

On the traceless vectors, introduce a one-parameter bracket

\[
[A,B]_\lambda
=\lambda(\mathbf a\times\mathbf b)\cdot\boldsymbol\sigma.
\]

The certificate verifies, for several generic triples and five distinct nonzero values of (lambda),

\[
(A\circ B)\circ C-A\circ(B\circ C)
=-\frac1{\lambda^2}[B,[A,C]_\lambda]_\lambda.
\]

Thus compatibility fixes the combination

\[
\lambda^2\kappa=-1

\]

if (kappa) denotes the coefficient multiplying the double bracket. It does not separately fix (lambda) and (kappa).

The positive cone depends only on

\[
\det A=a_0^2-|\mathbf a|^2

\]

and is unchanged throughout this family. Likewise a Ward identity of the homogeneous form

\[
q^TK=Kq=0

\]

remains true after (q) or its associated generator is rescaled. The explicit projected kernel in the certificate is transverse for every tested (lambda).

Therefore

\[
\boxed{
\text{Jordan–Lie compatibility}
+\text{positivity}
+\text{Ward transversality}
\not\Longrightarrow
\text{absolute bracket normalization}.
}
\]

## 1. What compatibility really determines

The Jordan product remembers the symmetric part of an associative product. Its nonassociativity is controlled by a double commutator. But any rescaling

\[
[\ ,\ ]\mapsto\lambda[\ ,\ ]

\]

can be absorbed into the coefficient of that double commutator. The compatibility axiom is therefore a relation between conventions unless one coefficient has already been fixed by independent physics.

In quantum mechanics that independent datum is normally encoded in the action/commutator normalization, conventionally involving (hbar). In a response theory it could instead be set by a calibrated spectral residue, canonical symplectic form, quantized charge, or boundary term. None is supplied merely by identifying the positive Jordan cone.

## 2. Positivity cannot see the bracket scale

For (H_2(\mathbb C)), positivity is the Lorentz-cone condition

\[
a_0\ge0,
\qquad
a_0^2-|\mathbf a|^2\ge0.
\]

No (lambda) occurs. The certificate tests interior and boundary points and obtains the same result for the entire bracket family.

This is not an accident. A cone orders observables and constrains spectral weights; it does not determine the unit in which Hamiltonian or symplectic flow is measured.

## 3. Ward identities provide admissibility, not calibration

The finite model chooses a longitudinal vector (q), constructs

\[
P=I-\frac{qq^T}{q^Tq},
\qquad
K=PRP,

\]

and verifies

\[
q^TK=Kq=0.
\]

Replacing (q) by (lambda q) preserves the identity. This matches the earlier corpus result: Ward identities enforce the range condition required for a legal singular Schur quotient, but they do not choose the probes, the response normalization, or a unique kernel.

A nonhomogeneous Ward identity with a physically normalized contact term could change this verdict. That term would be the new datum doing the calibration.

## 4. The real-carrier closure warning

The computation deliberately uses the associative envelope (H_2(\mathbb C)). The proposed external carrier is (H_2(\mathbb R)), spanned in Pauli coordinates by

\[
I,\ \sigma_x,\ \sigma_z.

\]

It is closed under the Jordan product but not under the Hermitian commutator bracket: the commutator of (sigma_x) and (sigma_z) points along the missing (sigma_y) direction. Consequently the phrase “Jordan–Lie dynamics on (H_2(\mathbb R))” is ambiguous unless one specifies one of the following:

1. the complex associative envelope (H_2(\mathbb C));
2. the derivation algebra of the real Jordan algebra;
3. the Tits–Kantor–Koecher/conformal algebra (mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3));
4. a Poisson/symplectic bracket on a separate state or phase space.

These are related structures, but they are not interchangeable.

## 5. Programme consequence

This closes one tempting shortcut:

> Positivity plus Ward consistency cannot be used to derive the absolute dynamical or quantum normalization of the (Spin(2,3)) interface.

It also sharpens the correct next question. Rather than asking whether the Jordan cone secretly contains the missing scale, ask which physical structure couples its order geometry to a normalized antisymmetric form:

\[
\text{positive Jordan response}
\quad+\quad
\text{normalized symplectic/commutator datum}.

\]

The strongest candidates already present in the corpus are:

- the canonical symplectic form underlying (Sp(4,\mathbb R)), provided its units are fixed by an action;
- quantized gauge charge or topological level;
- ultraviolet asymptotics and a sum rule fixing a response residue;
- a nonhomogeneous Ward/contact term;
- canonical anticommutation normalization in a fully derived Furey particle module.

## 6. Branch verdict

| Claim | Verdict |
|---|---|
| The special Jordan associator is a double Lie bracket | **proved in the explicit (H_2(\mathbb C)) model** |
| Compatibility relates bracket and associator coefficients | **proved** |
| Compatibility fixes the bracket scale absolutely | **false** |
| Jordan-cone positivity fixes it | **false** |
| A homogeneous Ward quotient fixes it | **false** |
| (H_2(\mathbb R)) is closed under the ambient Hermitian commutator | **false** |
| A normalized action/contact/residue could fix it | **open dependency** |

## 7. Stop-everything and falsification criteria

**Stop-everything positive:** derive, from the same microscopic Standard Model/Furey construction, both the positive two-face kernel and a nonhomogeneous normalization identity that fixes its antisymmetric/symplectic scale without a free rescaling.

**Falsification of the present no-go:** exhibit a normalization functional constructed solely from the unscaled Jordan product, cone order and homogeneous Ward quotient that changes under ([\ ,\ ]\mapsto\lambda[\ ,\ ]). The explicit scale family shows that no such functional exists in this model.

## 8. Position in the corpus

- [Furey's weak Jordan ladder](69_furey_weak_jordan_ladder_spin23.md)
- [the conserved-current Ward quotient](205_conserved_current_ward_quotient_to_h2_response.md)
- [the conserved-stress Ward quotient](206_conserved_stress_spectral_quotient_to_h2_response.md)
- [UV normalization and the symplectic parabolic](214_uv_normalization_reduces_sp4_to_siegel_parabolic.md)
- [the grand synthesis](40_grand_synthesis_spin23_pole.md)

