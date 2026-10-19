# A Fixed Rank-Two Complement and Handle Exchange Complete the Incidence Mode to a Unique Unimodular Symplectic Selector

**Date:** 17 October 2026  
**Branches:** integral sewing, symplectic carrier, handle involution, order-18 selector, and code/Furey origin  
**Claim status:** exact conditional completion theorem; microscopic complement and exchange remain unconstructed  
**Certificate:** [classify_integral_symplectic_sewings_of_fixed_and_incidence_selected_c3_modes.mjs](scripts/classify_integral_symplectic_sewings_of_fixed_and_incidence_selected_c3_modes.mjs)

## Executive result

Once the incidence-selected active lattice is supplemented by any primitive color-fixed rank-two complement, the remaining integral symplectic problem is almost rigid.

Let

\[
L=L_{\rm fixed}\oplus L_{\rm inc},
\qquad
R=I_2\oplus C,
\qquad
C=
\begin{pmatrix}1&3\\-1&-2\end{pmatrix}.
\]

Every \(R\)-invariant integral alternating form has the block-diagonal shape

\[
J(a,d)=
\begin{pmatrix}
a\varepsilon&0\\
0&d\varepsilon
\end{pmatrix},
\qquad
\varepsilon=
\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
\]

Unimodularity forces

\[
a,d\in\{\pm1\}.
\]

Transporting the established handle swap into the incidence-selected integral basis then forces \(d=-a\). Only the overall orientation remains.

The two generators reproduce the exact order-18 symplectic selector.

## 1. Color forbids cross-pairing

Write a general alternating form as

\[
J=
\begin{pmatrix}
a\varepsilon&B\\
-B^T&d\varepsilon
\end{pmatrix}.
\]

The condition \(R^TJR=J\) imposes

\[
B(C-I)=0.
\]

But

\[
\det(C-I)=3\ne0,
\]

so over \(\mathbb Q\),

\[
B=0.
\]

Color therefore leaves two independent area scales and no cross-mode alternating pairing:

\[
\operatorname{Alt}(L)^R
=\mathbb Z\varepsilon_{\rm fixed}
\oplus
\mathbb Z\varepsilon_{\rm inc}.
\]

This is the integral version of the earlier two-scale symplectic-pencil result.

## 2. Unimodularity discretizes the scale freedom

For \(J(a,d)\),

\[
\operatorname{Pf}J=ad,
\qquad
\det J=(ad)^2.
\]

A primitive self-dual symplectic lattice requires \(\det J=1\), hence

\[
|a|=|d|=1.
\]

The continuous two-scale pencil collapses to four sign choices. Overall sign reverses orientation, leaving one meaningful relative sign.

## 3. Transported handle involution

The integral conjugator between the incidence-selected color block and the standard active handle block is

\[
X=
\begin{pmatrix}1&1\\0&-1\end{pmatrix},
\qquad X^2=I,\qquad\det X=-1.
\]

Transporting the ordinary mode swap gives

\[
H=
\begin{pmatrix}
0&X\\
X&0
\end{pmatrix}.
\]

It is an integral involution:

\[
H^2=I.
\]

In the incidence-selected basis,

\[
H^TJ(a,d)H=J(a,d)
\quad\Longleftrightarrow\quad
d=-a.
\]

The sign reversal relative to the standard handle basis is exactly the orientation reversal \(\det X=-1\). In the standard handle basis this is the familiar equal-area condition.

Choosing \(a=1,d=-1\) gives

\[
J_{\rm code}=
\begin{pmatrix}
\varepsilon&0\\
0&-\varepsilon
\end{pmatrix}.
\]

The alternative is \(-J_{\rm code}\), the same symplectic structure with reversed global orientation.

## 4. Exact finite group

The constructed matrices obey

\[
R^3=I,\qquad H^2=I,
\]

preserve \(J_{\rm code}\), and generate exactly eighteen integral matrices.

Thus the conditional completion is not merely an embedding into \(Sp(4,\mathbb Q)\). It is an integral realization of the already established finite selector inside the symplectic group of the completed lattice.

## 5. What follows and what was inserted

### Derived from the incidence-selected active mode

- the integral order-three block \(C\);
- the absence of invariant cross-pairing with a fixed complement;
- the two integral area scales;
- characteristic-three \(J_2\) behavior.

### Derived after imposing self-duality

- unit magnitudes of both area scales;
- only a relative sign and overall orientation remain.

### Derived after imposing the transported handle exchange

- the relative sign;
- the full order-18 group;
- uniqueness of the symplectic form up to overall orientation.

### Still inserted

- the existence and physical identity of \(L_{\rm fixed}\);
- the handle exchange \(H\) as a matter/response operation;
- the decomposition \(L_{\rm fixed}\oplus L_{\rm inc}\);
- the source map to the bilocal carrier.

The theorem therefore says exactly how little remains, not that the remaining data have been derived.

## 6. Candidate origins of the fixed complement

The complement must be color fixed, primitive, rank two and physically paired. Live candidates are:

1. puncture/restoration amplitudes \((\nu^c,\nu)\);
2. two independent bilocal source legs after color contraction;
3. positive/negative-frequency boundary data, provided they are independent rather than reality-related;
4. the two neutral Furey endpoint sectors \(D,E\);
5. a logical coordinate and its canonically conjugate response variable.

Earlier work excludes treating constrained sideband doubling or the neutral exchanged copy alone as two independent fixed-frequency matter directions. Any successful complement must evade those no-go results explicitly.

## 7. Stop-everything and falsification criteria

**Positive complement trigger:** one candidate above yields a primitive integral rank-two lattice with a derived area form and no discretionary normalization.

**Exchange trigger:** the physical Furey/puncture/bilocal exchange induces the transported matrix \(H\), up to an integral symplectic basis change.

**Full bridge trigger:** the direct sum maps isometrically to the existing bilocal carrier and sends \(R,H,J_{\rm code}\) to the established \(R,H,J_0\).

**Negative trigger:** every candidate complement is either rank one, constrained by reality to the active mode, nonprimitive, or carries an independently adjustable area scale.

**Falsifier:** claiming the active incidence doublet alone determines \(Sp(4)\). A rank-two complement and its exchange remain essential.

## 8. Verdict

The algebraic completion problem is solved conditionally:

\[
\boxed{
L_{\rm inc}
+\text{ primitive fixed pair}
+\text{ handle exchange}
\Longrightarrow
\text{unique unimodular }J
+\text{ order-18 selector}.
}
\]

The programme's central unresolved dependency is now physical rather than classificatory: derive the fixed pair and exchange from the puncture, Furey neutral sector or bilocal source construction.

## 9. Dependencies

- [integral active-mode bridge](864_the_incidence_selected_code_doublet_is_integrally_conjugate_to_the_active_handle_c3_module.md)
- [bilocal carrier](855_no_linear_full_color_singlet_four_quotient_exists_but_the_minimal_bilocal_response_is_c2_with_canonical_j0.md)
- [second-leg classification](857_only_an_independent_covariant_second_leg_supplies_the_full_bilocal_c2_carrier_at_fixed_frequency.md)
- [neutral exchange no-go](846_the_neutral_furey_exchange_cannot_lock_the_singlet_and_triplet_symplectic_scales.md)

