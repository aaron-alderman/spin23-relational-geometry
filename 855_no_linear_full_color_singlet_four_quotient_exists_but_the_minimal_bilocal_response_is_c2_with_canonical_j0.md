# No Linear Full-Color Singlet Four-Quotient Exists, but the Minimal Bilocal Response Is C² with Canonical J₀

**Date:** 17 October 2026  
**Branches:** full-color reduction, bilocal response, four-real symplectic carrier, and selector typing  
**Claim status:** exact linear no-go and exact bilocal construction; physical second leg and selector dynamics remain open  
**Certificate:** [prove_no_linear_su3_singlet_four_quotient_and_construct_the_minimal_bilocal_complex_two_carrier.mjs](scripts/prove_no_linear_su3_singlet_four_quotient_and_construct_the_minimal_bilocal_complex_two_carrier.mjs)

## Executive result

There is no surjective linear \(SU(3)_c\)-equivariant map from the eight-real-dimensional carrier

\[
V=(\mathbf1\oplus\mathbf3)_{\mathbb R}
\]

to a four-real-dimensional gauge-trivial response space.

The invariant covector space of \(V\) has real dimension two—the real and imaginary coordinates of the complex singlet. Every row of a linear map to a trivial target must lie in this space. Therefore

\[
\boxed{
\operatorname{rank}\Pi_{\rm singlet}\le2<4.
}
\]

The minimal credible replacement is bilocal. For two carriers

\[
v=(v_s,v_t),
\qquad
w=(w_s,w_t),
\]

with \(v_s,w_s\in\mathbb C\) and \(v_t,w_t\in\mathbb C^3\), define

\[
B(v,w)
=
\left(
\bar w_sv_s,
w_t^\dagger v_t
\right)
\in\mathbb C^2.
\]

Both components are full-color singlets. Realification gives a four-dimensional carrier with the standard symplectic form

\[
J_0=
\begin{pmatrix}
0&0&1&0\\
0&0&0&1\\
-1&0&0&0\\
0&-1&0&0
\end{pmatrix}.
\]

This supplies the first fully gauge-singlet construction with exactly the right carrier type. It does not yet derive the selector group action or fix the physical bilocal state \(w\).

## 1. Linear quotient no-go

Let \(W\cong\mathbb R^4\) carry the trivial color action. A linear intertwiner

\[
\Pi:V\to W
\]

must satisfy

\[
\Pi X=0
\]

for every color Lie-algebra generator \(X\). Hence every row of \(\Pi\) is an invariant covector on \(V\).

The certificate solves the Cartan and root equations and finds

\[
\dim(V^*)^{SU(3)}=2.
\]

Consequently every such \(\Pi\) has row rank at most two. This strengthens document 844: not only can the color triplet not act on the same real four-carrier, it also cannot be removed linearly while leaving four independent gauge-singlet response coordinates.

## 2. Minimal bilocal construction

The two elementary complex contractions are

\[
u=\bar w_sv_s,
\qquad
z=w_t^\dagger v_t.
\]

Under a common color transformation \(U\in SU(3)\),

\[
(Uw_t)^\dagger(Uv_t)
=w_t^\dagger v_t.
\]

Thus

\[
B(v,w)=(u,z)
\]

is gauge invariant. The certificate checks an exact color cycle and a determinant-one diagonal phase, while the unitary inner-product identity proves the full group statement.

The real coordinates

\[
(\operatorname{Re}u,operatorname{Re}z,operatorname{Im}u,operatorname{Im}z)
\]

carry exactly the standard \(J_0\) already used by the response selector.

## 3. Why two legs are essential

For one carrier vector, the triplet supplies only the real invariant norm

\[
v_t^\dagger v_t.
\]

Together with the complex singlet \(v_s\), this gives at most three independent real invariants. A second transformed triplet provides a complex relative amplitude

\[
w_t^\dagger v_t,
\]

adding both quadratures and producing the required four-real space.

The “relational carrier” is therefore literally relational: the missing conjugate pair exists between two color-covariant legs, not inside one isolated field vector.

## 4. SU(4) boundary

Before color–lepton breaking, the full \(SU(4)\)-invariant contraction is

\[
w^dagger v
=
\bar w_sv_s+w_t^\dagger v_t.
\]

An \(SU(4)\) transformation mixing lepton and color changes the two separated components while preserving only their sum. The certificate demonstrates this with a coordinate exchange.

Thus:

- exact \(SU(4)\) gives one complex invariant contraction;
- breaking to \(SU(3)\times U(1)\) resolves it into two complex response channels;
- those two channels form \(\mathbb C^2\cong\mathbb R^4\).

This is a precise mechanism by which symmetry breaking can enlarge the observable response carrier even though the microscopic parent is more symmetric.

## 5. What remains unselected

The construction leaves four physical questions:

1. **Second leg:** is \(w\) another source, a conjugate sideband, a boundary state, a Higgs-dressed reference, or an integrated internal propagator?
2. **Relative normalization:** what fixes the scale between \(u\) and \(z\)? Exact \(SU(4)\) fixes component normalization before breaking, but thresholds can split it.
3. **Selector action:** how do the order-18 matrices \(R,H_i\) act on the two complex contractions?
4. **Dynamics:** does the quadratic response channel of document 839 arise from summing physical bilocal processes?

The appearance of the same numerical \(J_0\) is a type-level convergence, not yet an identity of physical carriers.

## 6. Stop-everything criteria

**Positive trigger:** identify \(w\) within the completed Furey/Standard-Model response, derive the induced order-18 action on \((u,z)\), and reproduce the class-sum channel with positive causal dynamics.

**Pati–Salam trigger:** show that symmetry breaking and matching canonically normalize the two contractions and preserve the resulting four-real response below the breaking scale.

**Negative trigger:** every admissible second leg is gauge equivalent, dephased or constrained so that \(w_t^\dagger v_t\) is real. Then the response has at most three real directions and cannot be the required symplectic four-carrier.

**Falsifier:** a rank-four linear map from \((\mathbf1\oplus\mathbf3)_{\mathbb R}\) to a trivial color representation, or failure of the bilocal contractions to be gauge invariant. The exact representation and contraction checks exclude both.

## 7. Verdict

| Question | Verdict |
|---|---|
| Does a linear gauge-singlet four-real quotient exist? | **no; rank at most two** |
| Can one carrier vector supply four real invariants? | **no; generically at most three** |
| Can two covariant legs supply four? | **yes; two complex contractions** |
| Is the output naturally symplectic? | **yes; canonical \(J_0\) on \(\mathbb C^2\)** |
| Is the physical second leg selected? | **no** |
| Is the selector action derived? | **no** |

## 8. Position in the corpus

- [full color cannot act on the real four-carrier](844_the_discrete_color_cycle_quotient_cannot_be_promoted_to_full_su3_on_the_same_real_symplectic_four_carrier.md)
- [SU(4) selects equal parent normalization](852_pati_salam_su4_collapses_the_full_color_symplectic_pencil_to_the_equal_component_line_but_is_not_a_furey_tro_symmetry.md)
- [SU(4) breaking reopens two response sectors](853_su4_breaking_to_su3_times_b_minus_l_reopens_the_two_scale_pencil_unless_a_transitive_discrete_response_symmetry_survives.md)
- [full selector class-sum channel](848_the_quadratic_handle_twirl_is_a_central_class_sum_for_the_full_order_18_selector.md)
- [the full selector acts as typed bilocal Bogoliubov transformations](856_the_minimal_bilocal_c2_carrier_supports_the_full_selector_as_typed_two_mode_bogoliubov_transformations.md)

