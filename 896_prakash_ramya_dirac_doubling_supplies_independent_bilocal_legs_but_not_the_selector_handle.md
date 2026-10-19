# Prakash–Ramya Dirac Doubling Supplies Independent Bilocal Legs but Not the Selector Handle

**Date:** 17 October 2026  
**Source:** Shiroman Prakash and K. L. Ramya, *One generation of the Standard Model as a quantum error-correcting code*, arXiv:2610.21879v1  
**Branches:** Standard-Model code, Dirac doubling, bilocal carrier, selector handle, and $Spin(2,3)$ interface  
**Claim status:** exact representation and response-typing result; dynamical handle remains open  
**Certificate:** [test_prakash_ramya_dirac_doubling_as_bilocal_carrier_and_handle_no_go.mjs](scripts/test_prakash_ramya_dirac_doubling_as_bilocal_carrier_and_handle_no_go.mjs)  
**Primary source:** [arXiv full text](https://arxiv.org/html/2610.21879v1)

## Executive result

The paper resolves part—but not all—of the bilocal-carrier problem.

Its doubling theorem divides the punctured generation into two independently populated Dirac-paired faces. The Weyl element

\[
\sigma(q_1,q_2,q_3,q_4,q_5)
=(-q_1,-q_2,-q_3,q_4,-q_5)
\]

pairs

\[
(u^c_i,d^c_i,e^c;\nu^c)
\longleftrightarrow
(u_i,d_i,e;\nu).
\]

Consequently, after the appropriate invariant contractions, two independent complex Dirac responses such as

\[
m_\ell=e^ce,
\qquad
m_q=\sum_{i=1}^3u^c_i u_i
\]

span a genuine

\[
\boxed{(m_\ell,m_q)\in\mathbb C^2\cong\mathbb R^4.}
\]

This gives a concrete Standard-Model realization of the independent second leg required by documents 855–857. It is stronger than merely postulating two external copies.

However, the same doubling involution preserves the leptonic and colored sectors separately. Reversing the two Dirac faces therefore acts within each response channel:

\[
(m_\ell,m_q)\mapsto(m_\ell,m_q)
\]

for commuting even bilinears, or at most by a convention-dependent conjugation within each channel. It does **not** give

\[
H:(m_\ell,m_q)\mapsto(m_q,m_\ell).
\]

Thus the paper supplies the missing independent bilocal *degrees of freedom*, but not the missing cross-sector *handle dynamics*.

## 1. Exact doubled-face pairing

The certificate reconstructs all sixteen even-parity $Spin(10)$ weights and applies the paper's doubling Weyl element. It verifies

\[
\begin{aligned}
\nu^c&\leftrightarrow\nu, & e^c&\leftrightarrow e,\\
u_i^c&\leftrightarrow u_i, & d_i^c&\leftrightarrow d_i.
\end{aligned}
\]

Each pair has opposite electric charge, so its Dirac contraction is neutral after electroweak symmetry breaking. Color triplets pair with their dual representations and leptons pair with leptons.

The important improvement over a constrained sideband or a one-body propagator is independence: the two Weyl fields in a Dirac pair are distinct field coordinates. Their amplitudes are not fixed linear or anti-linear functions of one another.

## 2. Rank-four bilocal response

Choose one leptonic Dirac response and one color-contracted quark response. For arbitrary target values $a,b\in\mathbb C$, take, schematically,

\[
e^c=a,\quad e=1,
\qquad
u^c=(b,0,0),\quad u=(1,0,0).
\]

Then

\[
(m_\ell,m_q)=(a,b).
\]

The response map is therefore surjective onto $\mathbb C^2$ before equations of motion, reality conditions, or a particular state correlate the amplitudes.

This is the precise sense in which Prakash–Ramya doubling supplies the independent covariant legs demanded by document 857.

There is an important typing refinement. For two copies in the *same* color representation, document 855 used the Hermitian contraction $w_t^\dagger v_t$. Dirac partners transform in dual representations, so their invariant is instead the complex bilinear $u^{cT}u$. Both yield a complex gauge singlet, but they are not the same microscopic operation.

## 3. Why doubling does not generate the handle

Define the sector projectors on the field-label space:

\[
P_\ell=\text{leptons},
\qquad
P_q=\text{colored fields}.
\]

The exact weight permutation satisfies

\[
[\sigma,P_\ell]=[\sigma,P_q]=0.
\]

It never sends a lepton to a quark or a quark to a lepton. Therefore any bilinear action functorially induced by $\sigma$ preserves the two response sectors.

The selector handle instead obeys

\[
HP_\ell H^{-1}=P_q
\]

on the reduced two-channel space. This is categorically different. It exchanges already-contracted response modes rather than microscopic Dirac partners.

The distinction survives all phase conventions: phases or complex conjugations can change the action *inside* each channel, but cannot turn a block-preserving operation into a block exchange.

## 4. Relation to the paper's minimum logical operators

Prakash and Ramya identify minimum logical errors with neutral four-fermion combinations, including

\[
(\nu\nu^c)(ee^c).
\]

This is further evidence that products of independently variable Dirac bilinears are native to the code. It makes the bilocal interpretation materially less ad hoc.

But a four-fermion logical relation is not automatically a quadratic Hamiltonian that swaps two response modes. The code controls charge neutrality, distance, and transversal cubic phase; it does not fix the coefficients or time evolution of the corresponding effective operators.

## 5. Consequence for the $Spin(2,3)$ programme

The current chain can now be stated more sharply:

\[
\begin{aligned}
&\text{five-mode }Spin(10)\text{ generation}\\
&\quad\xrightarrow{\text{Prakash--Ramya doubling}}
\text{independent Dirac faces}\\
&\quad\xrightarrow{\text{invariant bilinears}}
\mathbb C^2\cong\mathbb R^4\\
&\quad\xrightarrow{\text{canonical response transformations}}
Sp(4,\mathbb R)\cong Spin_0(2,3).
\end{aligned}
\]

The first two arrows now have exact Standard-Model representation content. The last arrow is mathematically admitted and already realized by the selector, but its specific generators are not derived from Standard-Model dynamics.

This is precisely the role appropriate to $Spin(2,3)$: not another microscopic gauge group inside $Spin(10)$, but a possible canonical group of the relational response space built from gauge-neutral bilinears.

## 6. Highest-value open paths

### A. Effective-kernel calculation

Compute the quadratic spectral kernel for a chosen pair $(m_\ell,m_q)$ after integrating out the relevant Standard-Model or $SO(10)$ mediator. Test whether the off-diagonal kernel is nonzero and whether its normalized transfer realizes $H$.

### B. $SO(10)$ vector-representation exchange

The paper states that all minimum logical supports have the charge structure generated by exchange of an $SO(10)$ vector $\mathbf{10}$. Decompose that mediator channel and test whether it couples the leptonic and color-contracted bilinears with equal primitive residue. This is the most direct remaining physical route to the handle.

### C. Symmetry-breaking audit

Track the candidate exchange from $SO(10)$ through Pati–Salam or $SU(5)$ breaking. If the low-energy Yukawa and threshold matrices split the two channels without a surviving Ward identity, equality is tuning rather than protection.

### D. Neutral-pair residue

Repeat the response calculation for the ordered $(\nu^c,\nu)$ complement of document 895. Its primitive determinant area is exact at lattice level; the missing datum is the physical two-point-function normalization.

## 7. Stop-everything criteria

**Positive handle trigger:** an explicit mediator or Ward identity yields an off-diagonal quadratic kernel whose normalized canonical transfer is exactly $H$, with the same primitive area on both channels.

**Strong $Spin(2,3)$ trigger:** the same effective action also generates a noncompact symplectic element outside the finite selector, establishing a physical neighborhood in $Sp(4,\mathbb R)$, not merely a finite subgroup.

**Conditional trigger:** $SO(10)$ symmetry gives the exchange only above the breaking scale. Then the handle is an ultraviolet boundary condition whose infrared violation is computable.

**Negative trigger:** every allowed mediator kernel is block diagonal in $P_\ell\oplus P_q$, or the off-diagonal residue vanishes by gauge/chirality selection rules. Then Prakash–Ramya doubling supplies the carrier but cannot generate the selector handle.

## 8. Verdict

| Question | Verdict |
|---|---|
| Does the paper provide two independent matter faces? | **yes** |
| Can their invariant Dirac bilinears span $\mathbb C^2$? | **yes** |
| Is this a concrete realization of the independent-leg requirement? | **yes, at kinematic field-space level** |
| Does the doubling involution exchange lepton and color responses? | **no** |
| Does it derive the selector handle $H$? | **no** |
| Best next calculation | **the off-diagonal mediator/spectral kernel** |

## 9. Position in the corpus

- [first synthesis of the Prakash–Ramya paper](887_prakash_ramya_standard_model_code_places_the_project_cubic_form_weak_reflection_and_golay_boundary_on_one_exact_lattice.md)
- [minimal bilocal gauge-singlet carrier](855_no_linear_full_color_singlet_four_quotient_exists_but_the_minimal_bilocal_response_is_c2_with_canonical_j0.md)
- [selector as typed Bogoliubov transformations](856_the_minimal_bilocal_c2_carrier_supports_the_full_selector_as_typed_two_mode_bogoliubov_transformations.md)
- [independent-leg criterion](857_only_an_independent_covariant_second_leg_supplies_the_full_bilocal_c2_carrier_at_fixed_frequency.md)
- [primitive active and neutrino areas sewn into the selector lattice](895_normalized_color_contraction_produces_the_primitive_relationship_area_and_the_ordered_neutrino_pair_completes_the_exact_selector_lattice.md)
