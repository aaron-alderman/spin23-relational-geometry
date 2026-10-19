# Prakash–Ramya: the Distance-Five Open Problem Is Solved Arithmetically, but Not Yet Physically

**Date:** 17 October 2026  
**Primary source:** Shiroman Prakash and K. L. Ramya, [“One generation of the Standard Model as a quantum error-correcting code,” arXiv:2610.21879v1](https://arxiv.org/abs/2610.21879v1)  
**Local constructive result:** [An explicit nonunit integral ternary-Golay lift and length-37 qutrit doubling](590_an_explicit_nonunit_integral_ternary_golay_lift_and_length_37_qutrit_doubling.md)  
**Claim status:** direct source comparison plus executable local certificate

## Executive verdict

This paper is not merely adjacent to the programme. It states, in almost exactly the programme's current language, the missing arithmetic problem that Cycles 504–506 then solve.

Prakash and Ramya prove that one \(SO(10)\) generation, including \(\nu^c\), is an integral triorthogonal charge lattice. Puncturing \(\nu^c\) gives a \([[15,1,3]]_p\) code for every prime \(p\). They further explain that doubling this Standard-Model seed with the ternary Golay \(P\)-code gives a \([[37,1,5]]_3\) code over \(\mathbb F_3\), but the ordinary all-\(+1\) Golay coefficients do not lift to an integral indefinite \(P\)-lattice. Their Outlook identifies the missing input:

\[
\boxed{\text{an integral distance-five \(P\)-lattice with }|N|=1.}
\]

The local construction supplies exactly that input in the authors' algebraic definition:

\[
\mu=(2,2,2,2,2,2,-4,-4,-1,-1,-1),
\qquad N=\sum_i\mu_i=1,
\]

together with an explicit rank-five integer matrix \(G\) satisfying

\[
G\mu=0,
\qquad
G\operatorname{diag}(\mu)G^T=0,
\qquad
d_{\mathbb Q}(G)=d_3(G)=5.
\]

Its reduction modulo three is the ternary Golay dual. Substitution into the paper's integral-doubling formula gives an explicit weighted integral \([[37,1,5]]_3\) construction.

The exact verdict is therefore:

\[
\boxed{
\begin{array}{ll}
\text{paper's algebraic \(P\)-lattice input:} & \textbf{solved},\\
\text{literal one-Weyl-field-per-coordinate spectrum:} & \textbf{not solved},\\
\text{Jordan/Spin(2,3) derivation of the weights:} & \textbf{open}.
\end{array}}
\]

## 1. What the paper proves

For integer charge words \(x,y,z\) and chirality coefficients \(c_\ell=\pm1\), the paper uses

\[
\tau_c(x,y,z)=\sum_\ell c_\ell x_\ell y_\ell z_\ell.
\]

Over the integers, vanishing of this trilinear form is cubic and mixed gauge-anomaly cancellation. Modulo a prime, the same identity is triorthogonality and supplies a transversal non-Clifford gate.

For the positive spinor \(\mathbf{16}\) of \(SO(10)\), the weights are the even-parity sign vectors in \(\{\pm1\}^5\). Removing \(\nu^c=(1,1,1,1,1)\) produces:

- fifteen physical qudits identified with the fifteen remaining Weyl fields;
- one logical qudit identified with the removed \(\nu^c\);
- stabilizers identified with charges under which \(\nu^c\) is neutral;
- a logical cubic phase identified with the anomaly that \(\nu^c\) would cancel;
- distance three, with minimum logical relations corresponding to neutral four-field charge combinations.

The paper also gives a doubled presentation. The two seven-coordinate blocks are Dirac-paired sectors, the neutrino is the seed, and weak isospin is the linking row. This is a rigorous coding-theoretic realization of “two paired faces plus one chiral relation,” although it is not itself a Jordan-triple theorem.

## 2. Exact comparison with the paper's open input

The paper defines an integral \(P\)-lattice \((\mathcal S,\mu)\) by

\[
\sum_i\mu_i s_i=0,
\qquad
\sum_i\mu_i s_i s_i'=0
\quad
\text{for all }s,s'\in\mathcal S,
\qquad
N=\sum_i\mu_i\ne0.
\]

The displayed local matrix \(G\) obeys these equations exactly, not only modulo three. Its rational distance and qutrit distance are both five. With the paper's fifteen-coordinate Standard-Model seed,

\[
\lambda_T=-1,
\qquad
\kappa=1,
\qquad
N\kappa^3+\lambda_T=1-1=0.
\]

The resulting doubled matrix has length \(11+11+15=37\). The local certificate checks all \(11^3=1331\) ordered cubic row triples and exhaustively searches supports through weight five over \(\mathbb F_3\). Only the logical cube is nonzero, with exponent \(-1\), and the qutrit distance is five.

This is a direct instantiation of the paper's Proposition S3 and its Outlook condition.

## 3. Why “nonunit” is the decisive qualifier

In the gauge-theory dictionary, \(c_\ell=\pm1\) is a Weyl chirality. The constructed coefficients are \(2,-4,-1\). They are legitimate nonzero integer weights in the paper's abstract integral \(P\)-lattice definition, but they are not the chirality list of one ordinary Weyl fermion per coordinate.

Replacing a coefficient such as \(2\) by two parallel unit-chirality columns is not innocent: parallel columns create low-weight relations and may destroy distance five. Therefore the physical problem is not solved by verbally calling the coefficients “multiplicities.” A valid interpretation must preserve the effective coordinate and distance structure.

Open physical interpretations include:

1. a genuine index produced after integrating out an internal fibre;
2. an orbifold or boundary weight;
3. a block coordinate whose internal degeneracy is inaccessible to the error model;
4. a superselection-weighted trace;
5. a Jordan or operator-algebraic compression producing the same weighted cubic form.

Each proposal must reproduce both the weighted bilinear \(P\)-condition and the operational meaning of one effective coordinate.

## 4. Contact with the Jordan–\(Spin(2,3)\) programme

There are three different levels of contact.

### Direct

- The paper makes the Standard Model's cubic anomaly tensor into an exact finite trilinear object.
- Its doubled presentation has two paired sectors and one linking row.
- The local distance-five lift is constructed as a maximal isotropic graph in a split rational space \(H^5\).

### Suggestive but not derived

- A \(P\)-lattice is governed by a weighted quadratic pairing, while its doubled code is governed by a cubic form. This quadratic/cubic interface is structurally compatible with the programme's Jordan-carrier viewpoint.
- The logical Pauli \(X/Z\) commutator supplies a genuine alternating two-form, making it a better possible route to symplectic structure than the diagonal cubic phase alone.
- The puncture \(16\to15\), Dirac pairing and linking row line up with the completed Furey generation and its relational-carrier language.

### Not established

- The paper does not derive \(Sp(4,\mathbb R)\) or \(Spin_0(2,3)\).
- The split \(H^5\) used in the distance-five lift has orthogonal group of \(O(5,5)\)-type; it is not the five-dimensional quadratic representation of \(Spin(2,3)\).
- The anomaly cubic is not thereby identified with an exceptional Jordan determinant.
- Golay, Mathieu and code symmetry do not by themselves imply a Leech-lattice or Monster action on local physics.

The highest-value bridge is now explicit: construct a natural compression or functor from the weighted \(P\)-lattice/doubling data to the two-face Jordan/TRO carrier, and prove that its logical commutator becomes the carrier's symplectic form. An abstract dimension match is insufficient.

## 5. New branch point created by the paper

The old question was whether the Standard Model's finite combinatorics could be made exact. The paper answers yes at the cubic anomaly/code level. The local construction answers yes at the weighted distance-five integral-lift level.

The new question is more focused:

\[
\boxed{
\text{What physical or Jordan-native mechanism produces }
(2^6,-4^2,-1^3)
\text{ as effective cubic weights?}}
\]

This is now a better target than searching vaguely for a Golay/Leech resemblance. It has a fixed coefficient orbit, exact equations, two known integral lifts, a verified symmetry-breaking pattern and a clear physical failure mode.

## 6. Stop-everything tests

Stop and reorganize the programme if any of the following occurs:

1. a Jordan compression derives the nonunit weights and preserves distance five without hidden parallel columns;
2. the paper's logical Pauli commutator maps canonically to the \(H_2(\mathbb R)\) carrier symplectic form;
3. a Furey-sector index produces precisely the coefficient multiset \((2^6,-4^2,-1^3)\);
4. an anomaly-free unit-chirality realization of the same effective \([[37,1,5]]_3\) structure is found;
5. a no-go theorem proves that no unitary local field theory can realize nonunit \(P\)-weights without distance collapse.

## 7. Immediate next calculations

1. Compute the full monomial automorphism group of the ternary Golay \(P\)-space that preserves its logical line, not merely the all-one representative.
2. Classify the nonunit coefficient placements under that physically relevant group.
3. Search Furey's completed matter TRO for natural traces, indices or block multiplicities matching \(2,-4,-1\).
4. Build the field-labelled logical \(X/Z\) commutator and test transport to the stationary binary two-plane already isolated in the lift tower.
5. Separate code equivalence, sign gauge and genuine physical coefficient changes at every step.

## Reproducible certificates

    python scripts/construct_exact_nonunit_golay_lift.py
    node verification/verify/verify_explicit_length37_nonunit_golay_doubling.mjs
    node verification/classify/classify_nonunit_weight_partition_under_m11.mjs
    node verification/prove/prove_witt_block_stabilizer_cannot_fix_a_maximal_rational_isotropic_lift.mjs

The first two establish the arithmetic solution. The latter two show that its coefficient symmetry and its characteristic-zero integral frame must not be conflated.
