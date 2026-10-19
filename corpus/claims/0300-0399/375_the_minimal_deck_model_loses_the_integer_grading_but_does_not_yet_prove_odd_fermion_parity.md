# The Minimal Deck Model Loses the Integer Grading but Does Not Yet Prove Odd Fermion Parity

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact finite-dimensional spectral-flow, occupied-bundle and Pfaffian audit; the spatial defect parity remains open pending a regulated Fredholm operator

## 1. The uncomfortable question

The four-component model of the previous document proves that the primitive
selector circuit can descend the Hamiltonian while reversing its chiral
grading. It therefore identifies the *possible target* as class D. It does not
follow that the class-D invariant is nontrivial.

That distinction matters. A symmetry class says which invariant may exist; it
does not determine the value of that invariant.

For

\[
H(k,\varphi)=k\alpha+cos\frac{\varphi}{2}\,\beta _1
                    +\sin\frac{\varphi}{2}\,\beta _2,
\qquad S=\alpha,
\]

the present calculation asks three separate questions:

1. does an eigenvalue cross zero during the primitive circuit?
2. is the sewn negative-energy bundle nonorientable?
3. does the zero-dimensional Majorana Pfaffian change sign?

All three answers are **no** for this finite-dimensional family.

## 2. Ordinary spectral flow is zero

The Clifford relations give

\[
H(k,\varphi)^2=(k^2+1)I_4.
\]

Hence the spectrum is

\[
\operatorname{spec}H(k,\varphi)
=\{-\sqrt{k^2+1},-\sqrt{k^2+1},
    +\sqrt{k^2+1},+\sqrt{k^2+1}\},
\]

independent of \(\varphi\). No eigenvalue crosses zero and the ordinary
spectral flow is exactly zero.

This is not a contradiction. A gapped bulk family is expected to have no
ordinary energy crossing. A defect invariant, if present, belongs to a
spatial Fredholm operator or to a compactified bulk symbol, not to the raw
point spectrum of this mass matrix.

## 3. Exact occupied-frame transport

At \(k=0\), put \(\theta=\varphi/2\) and

\[
h(\theta)=\cos\theta\,\sigma_x+\sin\theta\,\sigma_z.
\]

Since

\[
H(0,\varphi)=\sigma_z\otimes h(\theta),
\]

define

\[
a(\theta)=\frac{\pi}{4}-\frac{\theta}{2},\qquad
u_+(\theta)=\binom{\cos a}{\sin a},\qquad
u_-(\theta)=\binom{-\sin a}{\cos a}.
\]

Then \(h u_\pm=\pm u_\pm\), and a continuous real orthonormal frame of the
negative-energy space is

\[
e_1(\theta)=|+\rangle\otimes u_-(\theta),\qquad
e_2(\theta)=|-\rangle\otimes u_+(\theta).
\]

At the end of the primitive circuit, \(\theta=\pi\). Sewing with
\(S=\sigma_x\otimes I\) gives

\[
S e_1(\pi)=e_2(0),\qquad
S e_2(\pi)=-e_1(0).
\]

Thus the natural sewn holonomy in the initial occupied frame is

\[
W=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad W^2=-I_2,
\qquad \det W=+1.
\]

The quarter-turn is the occupied-space shadow of \((S\Gamma)^2=-1\). But the
topological orientation invariant of a real bundle over \(S^1\) is
\(\operatorname{sgn}\det W\), so

\[
\boxed{w_1(E_-)=0.}
\]

The occupied rank-two real bundle is orientable, even though the primitive
selector eigenline has \(w_1=1\).

## 4. Why the selector line does not equal the occupied bundle

The selector line follows one antipodally identified direction and returns
with sign \(-1\). The Hamiltonian contains two negative-energy real lines that
are exchanged by the deck action. Their sewn transition is a rotation, not a
reflection.

Equivalently,

\[
w_1(L_{\rm selector})=1
\quad\not\Longrightarrow\quad
w_1(E_-)=1.
\]

The two-channel Clifford completion can cancel the orientation parity while
still retaining a nontrivial projective quarter-turn. This is the precise
place where the earlier intuitive identification of selector parity with
fermion parity was too fast.

## 5. Majorana Pfaffian audit

At the particle--hole-invariant point \(k=0\), the unitary part of
\(C=SK\) is \(S\). Define the real antisymmetric Majorana matrix

\[
A(\varphi)=H(0,\varphi)S.
\]

Because \(S\) anticommutes with both mass matrices,
\(A^T=-A\). At the endpoints,

\[
H(0,2\pi)=-H(0,0),\qquad A(2\pi)=-A(0).
\]

For a \(4\times4\) antisymmetric matrix,

\[
\operatorname{Pf}(-A)=(-1)^2\operatorname{Pf}(A)
=\operatorname{Pf}(A).
\]

Direct evaluation gives the same nonzero Pfaffian at both endpoints. The
finite-dimensional endpoint test therefore has even parity.

This calculation does **not** prove that every spatial selector vortex is
class-D trivial. It proves that the local \(4\times4\) mass family and its
endpoint Pfaffians are insufficient to establish an odd defect mode.

## 6. What is actually missing

A physical mod-two defect index needs an operator of the form

\[
\mathcal D_{\rm defect}
=-i\alpha_x D_x-i\alpha_yD_y
+m_1(x,y)\beta_1+m_2(x,y)\beta_2
+\mathcal R_{\rm UV},
\]

together with:

- a radial mass profile regular at the core;
- a specification of the primitive deck sewing on spinors;
- boundary conditions or a Fredholm domain;
- a UV regulator or lattice completion fixing the behavior at momentum
  infinity;
- the physical reality operator on the same domain.

Only then may one compute kernel parity, a mod-two Fredholm index, or an
equivalent compactified bulk invariant. The one-dimensional symbol
\(H(k,\varphi)\) does not supply those data by itself.

## 7. Consequence for the index-three cover

The conventional double-cover vortex can still have integer index three. The
present result says that neither of the following shortcuts is valid:

\[
3\bmod2=1
\quad\Longrightarrow\quad
\text{primitive quotient parity}=1,
\]

or

\[
w_1(L_{\rm selector})=1
\quad\Longrightarrow\quad
\dim\ker\mathcal D_{\rm primitive}=1\pmod2.
\]

The odd cover index already proved that ordinary quotient descent fails. A
twisted equivariant index theorem must specify which deck character and real
domain survive. The finite local model cannot choose them.

## 8. Repair paths

Four paths remain open:

1. **Spatial Fredholm path.** Construct the full two-dimensional primitive
   vortex and compute its real kernel parity directly.
2. **Regulated bulk path.** Add a symmetry-compatible Wilson regulator,
   compactify momentum space and calculate the class-D invariant.
3. **Boundary-domain path.** Derive a self-adjoint boundary condition whose
   deck action retains one real channel rather than an orientable exchanged
   pair.
4. **Furey selection path.** Determine whether the neutral CAR carrier
   supplies a physical real submodule or polarization that removes the
   cancelling partner without violating gauge covariance or reinstating a
   mirror generation.

The fourth path is especially constrained: an arbitrary projection would
invalidate the CAR and anomaly accounting already established.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a domain-level Furey/selector intertwiner produces
a Fredholm primitive defect operator whose kernel parity is odd and whose
double-cover complex index is three.

**Parity falsifier:** selector-line \(w_1\) is quoted as the fermion parity
without constructing the occupied or kernel bundle.

**Spectral-flow falsifier:** the constant gapped eigenvalues of the local mass
matrix are described as an eigenvalue crossing.

**Pfaffian falsifier:** \(\operatorname{Pf}(-A)=-\operatorname{Pf}(A)\) is used
for a \(4\times4\) antisymmetric matrix; the sign is actually unchanged.

**Projection falsifier:** one member of the exchanged occupied pair is removed
without a gauge-, CAR- and domain-compatible projector.

## 10. Pinned dependency and next calculation

Pin the claim of nontrivial primitive fermion parity. What is established is
the grading obstruction and class-D eligibility, not the value of the
class-D invariant.

The next calculation should build the smallest spatially regulated Dirac
operator with the same deck sewing and test whether its real kernel is odd or
even. In parallel, the Furey neutral block should be audited for a canonical
real submodule capable of selecting the required domain.

## 11. Certificate

The [finite-family parity audit](../../../verification/verify/verify_minimal_4x4_deck_family_parity_audit.mjs)
checks the constant squared spectrum, exact occupied-frame sewing, orientable
rank-two occupied bundle, projective quarter-turn and equal endpoint
Pfaffians.

## Companion documents

- [Minimal four-component deck model](374_a_minimal_four_component_dirac_model_descends_the_hamiltonian_but_reverses_the_chiral_grading.md)
- [Odd-cover descent obstruction](372_the_odd_double_cover_index_proves_the_primitive_selector_operator_is_twisted_not_an_ordinary_quotient.md)
- [Selector bundle over passive frequency](371_frequency_is_a_topological_spectator_while_the_selector_z2_survives_as_a_real_form_bundle.md)
- [Class-D reality gate](355_the_selector_index_reduces_to_class_d_parity_only_with_a_reality_sewing.md)
