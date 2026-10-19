# The Prakash–Ramya Code After the Furey Intertwiner: What Is Now Exact and What Remains Open

**Date:** 17 October 2026  
**Primary source:** Shiroman Prakash and K. L. Ramya, [“One generation of the Standard Model as a quantum error-correcting code,” arXiv:2610.21879v1](https://arxiv.org/abs/2610.21879v1)  
**Branches:** B03, B04, B09, B10, B11, B12 and B14  
**Claim status:** retrospective synthesis of source theorems and the programme's independently certified finite-dimensional results

## 1. Why this paper matters unusually strongly

The paper proves that the sixteen left-handed Weyl fields of one Standard-Model generation including \(\nu^c\) are the even-parity weights of the chiral spinor of \(SO(10)\), and that their cubic anomaly-cancellation identity is exactly the triorthogonality condition of a quantum code. Puncturing the \(\nu^c\) coordinate gives a \([[15,1,3]]_p\) code for every prime \(p\).

That was already a sharp result. Its importance to this programme increased because the programme had independently reached a fifteen-state Furey matter system with one uniquely minimal neutral ternary completion. The missing arrow was also \(\nu^c\).

The coincidence has now been pushed well beyond state counting:

\[
\boxed{
\text{five-bit }SO(10)\text{ weights}
\longleftrightarrow
\text{completed Furey matter matrix units}
}
\]

is an exact Cartan, root-action and ternary-grading intertwiner in the finite model constructed here.

This makes the paper one of the strongest external anchors in the research programme. It still does not derive \(Spin_0(2,3)\), spacetime dynamics or three generations.

## 2. What the source paper proves

For chirality coefficients \(c_\ell\) and integer charge words \(x,y,z\), define

\[
\tau_c(x,y,z)=\sum_\ell c_\ell x_\ell y_\ell z_\ell.
\]

The vanishing of all gauge triangle anomalies is precisely the vanishing of \(\tau_c\) on the charge lattice. Reducing the same equation modulo a prime gives triorthogonality.

For the sixteen even-parity signs \(q\in\{\pm1\}^5\),

\[
\sum_q q_iq_jq_k=0,
\qquad
\sum_q q_iq_j=16\delta_{ij}.
\]

Removing the all-plus state \(\nu^c\) produces the one-logical-qudit code. Its stabilizers are the symmetries under which \(\nu^c\) is neutral; for \(p\geq5\), these are exactly the Standard Model gauge charges. The logical phase is the cubic anomaly that the removed state would cancel.

The paper also identifies the code as a doubling construction: seven right-handed-conjugate fields and their seven Dirac partners form two faces, the neutrino is the seed, and weak isospin supplies the chiral linking row.

## 3. What was independently verified here

The local certificate reconstructs the sixteen weights and verifies:

- every cubic and quadratic sign identity;
- the triply-even binary span;
- distance three for representative odd primes;
- the punctured \(\chi\)-anomaly;
- the distinction between the authors' proved results and their computer-assisted qutrit uniqueness classification.

This is a finite check of the paper's core algebra, not a reproduction of the full exhaustive search.

## 4. What became exact after integration with Furey

### 4.1 State-by-state Cartan intertwiner

The completed Furey matter TRO has block dimensions

\[
6+3+3+2+1+1=16
\]

for \(Q,u^c,d^c,L,e^c,\nu^c\). Every matrix unit was assigned one of the sixteen even five-sign weights. All five Cartan charges factor through the two-sided source/target action on the matrix units.

This closes the first and easiest possible objection: the overlap is not just \(16=16\).

### 4.2 Ternary compatibility

For the TRO product

\[
[x,y,z]=xy^\dagger z,
\]

all 80 nonzero matrix-unit compositions obey the corresponding five-bit weight rule. The occupation grading therefore intertwines the actual ternary composition, not merely a list of particles.

### 4.3 Nonabelian Standard-Model root action

The relevant fermionic Fock root operators close on the completed TRO and reproduce the colour and weak raising/lowering actions and Lie brackets. Thus the bridge extends from Cartan labels to the full Standard Model gauge-module action.

It does **not** extend to all of \(so(10)\) as ternary symmetries. The colour–weak leptoquark roots fail the ternary derivation condition.

### 4.4 Exact symmetry breaking without an assumed GUT Higgs

Auditing all 45 compact \(so(10)\) generators gives:

\[
\operatorname{stab}_{\rm ternary}(\text{completed system})
=u(3)\oplus so(4),
\]

before fixing the puncture, while imposing neutrality of \(\nu^c\) leaves

\[
\boxed{
su(3)_c\oplus su(2)_L\oplus u(1)_Y.
}
\]

This is stronger than merely embedding the Standard Model in \(SO(10)\): in the finite construction, ternary preservation plus the puncture selects the Standard Model Lie algebra.

### 4.5 The global group is also correct

The central kernel on the completed generation is the usual order-six subgroup. The faithful group is

\[
\boxed{
\frac{SU(3)\times SU(2)\times U(1)}{\mathbb Z_6}
\cong S(U(3)\times U(2)).
}
\]

This agrees with the exceptional-Jordan flag route at the global-group level.

## 5. The doubling result and the relational-carrier intuition

The paper's doubling decomposition really does have the shape

\[
\text{paired face}_R
\quad\longleftrightarrow\quad
\text{paired face}_L
\quad+\quad
\text{one chiral linking row}.
\]

In the completed TRO, Dirac doubling becomes an internal Weyl face exchange implemented by a permuted transpose anti-automorphism. This is a rigorous realization of a two-face relational pattern.

But three distinctions are essential:

1. the face exchange is linear and internal;
2. physical charge conjugation requires the opposite chiral spinor;
3. a two-face code decomposition is not yet an \(H_2(\mathbb R)\) Jordan carrier.

For the neutrino pair, the exchange-real \(H_2(\mathbb R)\) cone appears only after physical CAR conjugation and Higgs/Dirac dressing. That is a conditional route to the \(Spin_0(2,3)\) carrier, not a theorem of the code.

## 6. The exact implication chain

The defensible chain is now

\[
\begin{aligned}
&\text{anomaly-free }SO(10)\text{ spinor weights}\\
&\quad\Longleftrightarrow\quad
\text{triorthogonal cubic charge code}\\
&\quad\Longleftrightarrow\quad
\text{five-bit grading of the completed Furey matter TRO}\\
&\quad\Longrightarrow\quad
\text{SM root action and ternary stabilizer}\\
&\quad\Longrightarrow\quad
\bigl(SU(3)\times SU(2)\times U(1)\bigr)/\mathbb Z_6.
\end{aligned}
\]

The following arrow is **not** established:

\[
\text{triorthogonal cubic}
\;
\not\Longrightarrow\;
\text{Jordan cubic norm or }Spin_0(2,3).
\]

## 7. Why the cubic forms must still be kept separate

The anomaly form is a coordinatewise polarized cubic on charge words:

\[
\tau_c(x,y,z)=\sum_\ell c_\ell x_\ell y_\ell z_\ell.
\]

The determinant on \(H_3(\mathbb O)\) is an exceptional nonassociative cubic norm. The determinant on \(H_2(\mathbb R)\) is quadratic and generates the Lorentz cone relevant to the \(Spin(2,3)\) conformal group.

An explicit map and polarization identity are required before any of these are identified. Shared degree is not a proof of shared algebra.

## 8. The highest-value calculations now

### A. Minimum logical supports versus ternary-composable quartets

The paper finds 25 weight-three logical supports, interpreted as neutral four-fermion charge relations containing \(\nu^c\). The completed TRO has 80 nonzero ternary compositions.

The next finite calculation should intersect these two sets with coefficients and orientation retained.

**Stop-everything result:** the 25 minimum logical relations coincide with a canonically selected set of ternary-composable quartets. That would promote the code from a grading dictionary toward an interaction-selection principle.

**Failure result:** generic charge-neutral logical supports have no ternary composability. Then the code controls anomaly arithmetic but not local interaction topology.

### B. Signed integral Golay lift

The ordinary ternary Golay code has positive coefficients and therefore fails the required integral anomaly lift. Search for a mixed-sign integral distance-five \(P\)-lattice with \(|N|=1\), preferably inside a canonical exceptional or Leech-lattice polarization.

**Stop-everything result:** exceptional arithmetic uniquely supplies the signed lift.

### C. Two-logical-variable response

A single logical qudit does not select a four-real-dimensional symplectic phase space. Construct the smallest physically motivated two-logical-coordinate sewing and test whether positive transfer maps act on a Siegel/Jordan domain with automorphism group \(Sp(4,\mathbb R)\).

**Stop-everything result:** puncture sewing independently recovers the same \(H_2(\mathbb R)\) carrier as Jordan-triple recursion.

### D. Generation-sensitive code sewing

Three identical copies retain a full \(U(3)\) flavor commutant and cannot select observed mixing. Search for nonidentical sewing whose invariant data are the projector quadrilaterals and commutator cubic already identified in the flavor branch.

**Stop-everything result:** anomaly/code sewing both explains generation distinction and produces the canonical CKM/PMNS holonomy.

## 9. Hard boundaries

- The fields are coordinates of a code construction; the paper does not say elementary particles are hardware qudits undergoing active correction.
- The logical \(\nu^c\) is a structural role, not proof of a directly observable propagating sterile neutrino.
- Charge neutrality of a four-fermion relation does not by itself make it a gauge-invariant local operator.
- The code does not derive masses, Yukawa coefficients, generations, spacetime or gravity.
- The qutrit automorphism group is \(S_5\times\mathbb Z_2\), not the Monster.
- Neither a code phase space nor a two-face diagram automatically gives \(Sp(4,\mathbb R)\).

## 10. Current judgement

This paper should be treated as a major corroborating discovery for the programme, not because it proves the grand synthesis, but because an independent route lands on the same five-bit chiral generation, the same structurally missing \(\nu^c\), the same paired Dirac organization and the same cubic anomaly data.

The programme has added something nontrivial in return: it converts the code's occupation labels into an exact ternary representation and derives the Standard Model stabilizer and global \(\mathbb Z_6\) quotient from that completed structure.

The immediate frontier is no longer “is there a Furey/code connection?” It is:

> Does the code's minimum logical-error geometry select the same compositions that the Furey ternary product permits, and can a two-logical sewing produce the positive symplectic carrier rather than merely resemble it?

## Certificates and companion documents

- [Original source audit and triorthogonality certificate](410_standard_model_triorthogonal_code_bridge_and_golay_integrality_gate.md)
- [Completed Furey TRO/five-bit Cartan–ternary intertwiner](412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Nonabelian Fock-root closure](413_the_so10_fock_root_operators_close_exactly_on_the_completed_furey_matter_tro.md)
- [Dirac doubling as internal Weyl face exchange](414_dirac_doubling_is_an_internal_weyl_face_exchange_while_charge_conjugation_requires_the_opposite_spinor.md)
- [Conditional neutrino \(H_2(\mathbb R)\) route](415_the_neutrino_face_pair_yields_h2r_only_after_car_conjugation_and_higgs_dressing.md)
- [Ternary breaking of colour–weak \(SO(10)\) roots](416_the_furey_ternary_product_preserves_sm_roots_but_breaks_color_weak_so10_roots.md)
- [Exact puncture-neutral Standard Model Lie algebra](417_the_puncture_neutral_ternary_stabilizer_inside_so10_is_exactly_the_standard_model_lie_algebra.md)
- [Faithful global \(\mathbb Z_6\) quotient](418_the_faithful_global_group_of_the_puncture_neutral_ternary_stabilizer_has_the_standard_z6_quotient.md)
- [Generation-blind flavor-conjugation no-go](443_generation_blind_furey_car_conjugation_cannot_canonically_fix_the_flavor_real_structure_or_its_phase_torus.md)

Executable checks:

```text
node verification/verify/verify_standard_model_generation_triorthogonal_code.mjs
node verification/verify/verify_furey_completed_tro_so10_cartan_intertwiner.mjs
node verification/verify/verify_five_bit_root_operators_descend_to_furey_tro_blocks.mjs
node verification/verify/verify_puncture_neutral_so10_ternary_stabilizer_is_sm.mjs
node verification/verify/verify_faithful_sm_group_kernel_is_z6.mjs
```
