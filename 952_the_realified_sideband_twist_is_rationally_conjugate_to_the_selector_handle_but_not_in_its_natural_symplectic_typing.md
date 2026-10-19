# The Realified Sideband Twist Is Rationally Conjugate to the Selector Handle but Not in Its Natural Symplectic Typing

**Date:** 17 October 2026  
**Branches:** sideband realification, selector handle, chart exchange, symplectic typing, integral lattice, and Jordan middle operation  
**Claim status:** exact real/rational conjugacy with a precise symplectic and arithmetic obstruction  
**Certificate:** [compare_the_realified_sideband_twist_with_the_full_selector_handle.mjs](scripts/compare_the_realified_sideband_twist_with_the_full_selector_handle.mjs)

## Executive result

Realifying the active interface \(DK\) gives a four-real-dimensional involution

\[
T_{DK}=\operatorname{diag}(D,-D)
=\operatorname{diag}(1,-1,-1,1).
\]

The established full selector handle is

\[
H=\begin{pmatrix}0&X\\X&0\end{pmatrix},
\qquad
X=\begin{pmatrix}1&1\\0&-1\end{pmatrix}.
\]

Both square to the identity and both have \((+1,-1)\) multiplicities \((2,2)\).  They are therefore conjugate over \(\mathbb R\), and an explicit integral intertwiner is

\[
P=
\begin{pmatrix}
1&1&0&0\\
0&0&1&1\\
1&-1&-1&1\\
0&0&1&-1
\end{pmatrix},
\qquad
HP=PT.
\]

However,

\[
\det P=-4,
\]

so this is a rational/real conjugacy with image-lattice index four, not an integral unimodular identification of the two lattices.

More importantly, their natural symplectic typings differ.  On Fourier quadratures, \(T_{DK}\) is anti-symplectic.  On the completed selector carrier, \(H\) is symplectic.  They become symplectically equivalent only after transporting the selector form through \(P\), which changes what is paired with what.

The failure of unimodularity is intrinsic, not an accident of this \(P\). The nonzero Smith invariants are

\[
\operatorname{SNF}_{\ne0}(T_{DK}-I)=(2,2),
\qquad
\operatorname{SNF}_{\ne0}(H-I)=(1,1).
\]

Unimodular conjugacy would make the two difference matrices integrally equivalent and hence preserve their Smith forms. Therefore no \(GL(4,\mathbb Z)\) conjugator exists.

Thus:

\[
\boxed{
DK\text{ and }H\text{ share the same real involution class,}
\quad
\text{but handle = chart exchange is not yet canonical.}
}
\]

## 1. Realification of the antiunitary interface

Write a complex active amplitude as \(z=x+iy\), with \(x,y\in\mathbb R^2\).  Since \(D\) is real,

\[
DK(z)=D(x-iy).
\]

On \((x,y)\), this is

\[
(x,y)\longmapsto(Dx,-Dy),
\]

which gives \(T_{DK}\) above.

The anti-linearity has disappeared after realification.  It is now an ordinary real orthogonal transition matrix.  Its memory remains in how it acts on the natural complex structure and symplectic form.

## 2. Natural Fourier typing is anti-symplectic

Let

\[
J_F=
\begin{pmatrix}0&I_2\\-I_2&0\end{pmatrix}.
\]

Then

\[
T_{DK}^TJ_FT_{DK}=-J_F.
\]

This is the real form of antiunitarity: the chart transition reverses the Kähler/symplectic orientation associated with multiplication by \(i\).

## 3. Selector typing is symplectic

The selector carrier uses

\[
J_{\rm code}=\varepsilon\oplus(-\varepsilon),
\qquad
H^TJ_{\rm code}H=J_{\rm code}.
\]

Transport this form to the sideband basis:

\[
J_T=P^TJ_{\rm code}P.
\]

Then

\[
T_{DK}^TJ_TT_{DK}=J_T.
\]

So the same real involution can be anti-symplectic for the Fourier pairing and symplectic for the transported handle pairing.  The issue is not the abstract involution; it is the physical choice of alternating form.

The transported form has determinant \(16\), reflecting the index-four conjugator.  It is not the primitive unimodular selector lattice form.

## 4. What is now exact

- the antiunitary active interface becomes an ordinary real involution after quadrature realification;
- it lies in the same \(GL(4,\mathbb R)\) and \(GL(4,\mathbb Q)\) conjugacy class as the full selector handle;
- an explicit integral index-four intertwiner exists;
- no unimodular integral conjugator exists, by the Smith invariants of the fixed-lattice quotients;
- the natural Fourier form is reversed;
- the pulled-back selector form is preserved;
- integral unimodular equivalence is not supplied by this intertwiner.

## 5. Why this matters for the Jordan-triple programme

The middle operation in the two-face response has exactly the correct real involution type to become a handle exchange after changing basis.  This gives a concrete algebraic meaning to “one carrier, two faces, one twist.”

But the change of pairing is substantive.  A Jordan-triple derivation must explain why the physical alternating form descends from the Fourier/Kähler pairing to the selector pairing, or why both arise on different levels of the construction.  Merely observing equal eigenvalue multiplicities is insufficient.

A plausible hierarchy is:

\[
\text{complex face amplitudes with }J_F
\xrightarrow{\text{real reduction / quotient}}
\text{integral selector carrier with }J_{\rm code}.
\]

The missing arrow must account for the index four and primitivity restoration.

## 6. Strongest counterexamples and open gates

**Natural-form counterexample:** if the physical symplectic form must remain \(J_F\), then \(T_{DK}\) cannot equal a symplectic selector handle.

**Arithmetic counterexample:** the displayed conjugator has determinant four, so it does not identify the primitive integral lattices.

**Typing counterexample:** the realified active sideband space consists of response quadratures; the selector carrier consists of neutral plus active real planes.  A physical map between those labels is still absent.

Open gates:

- derive a quotient, saturation or added neutral pair that restores the primitive selector lattice;
- compare the pulled-back form with the known index-two and index-three completion defects;
- derive the basis change from Jordan-triple recursion rather than choosing eigenbases.

## 7. Stop-everything and falsification criteria

**Canonical-handle trigger:** a physically typed reduction sends \((J_F,T_{DK})\) to \((J_{\rm code},H)\) and explains the lattice index.

**Saturation trigger:** a physically typed quotient or lattice saturation explains the Smith change from \((2,2)\) to \((1,1)\) and the index-four rational intertwiner.

**Jordan trigger:** the middle-slot triple product produces the required transported alternating form and involution simultaneously.

**Symplectic falsifier:** \(T_{DK}\) is called symplectic with respect to \(J_F\); it reverses that form.

**Conjugacy overclaim:** real conjugacy is presented as equality of Fourier and selector physical carriers.

**Arithmetic falsifier:** the determinant-four map is called a lattice isomorphism.

## 8. Verdict

| Question | Verdict |
|---|---|
| Is \(DK\) complex-linear? | **no** |
| Does it become real-linear after realification? | **yes** |
| Is its real involution conjugate to the selector handle? | **yes, over \(\mathbb Q\) and \(\mathbb R\)** |
| Is the displayed conjugacy unimodular? | **no; determinant four** |
| Can any unimodular conjugacy exist? | **no; the Smith invariants differ** |
| Is \(DK\) symplectic for the natural Fourier form? | **no; it is anti-symplectic** |
| Can it preserve a transported selector form? | **yes** |
| Is handle = chart exchange physically derived? | **not yet** |

## 9. Position in the corpus

- [same-half-plane analytic no-go](951_the_two_face_sideband_cycle_is_boundary_monodromy_not_one_same_half_plane_rational_inner_transfer.md)
- [full handle Lagrangian graph](912_the_full_selector_handle_is_a_primitive_lagrangian_graph_defect_with_an_invariant_positive_energy_metric.md)
- [primitive selector lattice](865_a_fixed_rank_two_complement_and_handle_exchange_complete_the_incidence_mode_to_a_unique_unimodular_symplectic_selector.md)
- [local active real interface](908_a_local_real_interface_supplies_the_antiunitary_sideband_twist_and_closes_the_boundary_monodromy_model.md)
