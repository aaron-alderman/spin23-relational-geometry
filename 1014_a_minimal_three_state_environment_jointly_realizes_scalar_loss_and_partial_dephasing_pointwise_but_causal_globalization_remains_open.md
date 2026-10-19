# A Minimal Three-State Environment Jointly Realizes Scalar Loss and Partial Dephasing Pointwise, but Causal Globalization Remains Open

**Date:** 18 October 2026  
**Branches:** joint dilation, strict loss, partial dephasing, outgoing ports, Gram geometry, and causal realization  
**Claim status:** exact pointwise unitary-dilation theorem; causal rational and unequal-channel realization remain open  
**Certificate:** [construct_the_minimal_pointwise_joint_loss_and_dephasing_environment_dilation.mjs](scripts/construct_the_minimal_pointwise_joint_loss_and_dephasing_environment_dilation.mjs)

## Executive result

Document 1013 correctly separated strict amplitude loss from population-preserving dephasing. They are not the same channel. Nevertheless, they can arise as two different reductions of one environment coupling.

Let \(f\in\mathbb C\), \(|f|=r\le1\). Choose three normalized environment vectors

\[
|e_{\rm ref}\rangle,
\qquad
|e_0\rangle,
\qquad
|e_1\rangle
\]

with Gram data

\[
\langle e_{\rm ref}|e_0\rangle
=\langle e_{\rm ref}|e_1\rangle=f,
\qquad
\langle e_1|e_0\rangle=r.
\]

Define the controlled isometry

\[
W|j\rangle=|j\rangle|e_j\rangle,
\qquad j=0,1.
\]

Then:

1. projecting the environment onto \(|e_{\rm ref}\rangle\) gives the common scalar transfer
   \[
   (I\otimes\langle e_{\rm ref}|)W=fI;
   \]
2. tracing the environment gives phase damping with
   \[
   \rho_{01}\mapsto r\rho_{01}=|f|\rho_{01}.
   \]

Thus the conditional bridge \(s=|f|\) has an exact joint pointwise dilation.

For strict loss \(0<r<1\), the three-vector Gram matrix has determinant

\[
\boxed{(1-r)^2(1+2r)>0.}
\]

Its rank is therefore three. The environment needs one reference direction and exactly two additional directions—the same auxiliary count as the rank-two outgoing-port realization.

What remains open is whether these pointwise frequency-dependent vectors can be assembled into the existing causal rational inner dilation, and whether the construction survives when the two physical face channels have unequal transfers.

## 1. Explicit environment vectors

Take an orthonormal basis of \(\mathbb C^3\) and set

\[
e_{\rm ref}=(1,0,0),
\]

\[
e_0=left(f,\sqrt{1-r^2},0\right),
\]

\[
e_1=left(
f,
r\sqrt{\frac{1-r}{1+r}},
\sqrt{\frac{(1-r)(1+2r)}{1+r}}
\right).
\]

Direct calculation gives unit norms and the required overlaps. Since the system labels \(|0\rangle,|1\rangle\) are orthogonal, \(W\) is an isometry and can be extended to a unitary on a larger space.

The complex phase of \(f\) appears only in the common reference overlap. The face-record overlap is its positive magnitude \(r\), as required by the Real-compatible dephasing channel.

## 2. Two operational reductions

### Reference-port compression

Select the same environment output state for both faces:

\[
\langle e_{\rm ref}|W|j\rangle=f|j\rangle.
\]

This realizes the nonunitary observed transfer \(fI\). Missing norm occupies the two orthogonal auxiliary directions.

### Environment trace

For an input density matrix \(\rho\),

\[
\operatorname{Tr}_E(W\rho W^\dagger)_{01}
=\langle e_1|e_0\rangle\rho_{01}
=r\rho_{01}.
\]

The diagonal populations are unchanged. This is exactly the phase-damping channel used in document 1012.

The two channels are therefore distinct operational questions asked of one dilation, not rival descriptions of the same reduction.

## 3. Minimality and the two outgoing directions

After rephasing the two conditioned vectors together, the Gram matrix is the equicorrelation matrix

\[
G_r=
\begin{pmatrix}
1&r&r\\
r&1&r\\
r&r&1
\end{pmatrix}.
\]

Its eigenvalues are

\[
1+2r,
\qquad
1-r,
\qquad
1-r.
\]

For \(0\le r<1\), its rank is three. No two-dimensional environment can realize all three required vectors with this Gram data.

Relative to the reference ray, however, only two extra directions are needed. This matches the exact minimal port count for a two-channel strictly dissipative Cayley generator derived in document 962.

This dimensional match is structural evidence for a common dilation, not yet an identification of the port basis with Furey or placement degrees of freedom.

## 4. Insert the strict-loss transfer

For

\[
f(\omega)=
\left(\frac{\omega-i\alpha}{\omega+i\beta}\right)^2,
\]

the construction gives

\[
r(\omega)=|f(\omega)|
=\frac{\omega^2+\alpha^2}{\omega^2+\beta^2}.
\]

At every real frequency with \(\beta>\alpha>0\), the Gram matrix is positive definite and the joint pointwise dilation exists.

At the lossless boundary \(r=1\), all three environment vectors collapse to one ray and both auxiliary eigenvalues vanish. This agrees with the disappearance of the outgoing-port defect.

## 5. Why pointwise existence is not yet a causal model

A frequency-by-frequency positive Gram matrix does not automatically give:

- analytic transfer functions in the upper half-plane;
- a rational inner matrix of the already established McMillan degree;
- one time-local boundary action;
- a frequency-independent environment basis;
- the correct high-frequency normalization;
- compatibility with both unequal reflection eigenchannels.

The explicit vectors contain square roots of \(1-r\) and \(1+2r\). Spectral factorization may realize them analytically, but that factorization must be constructed rather than inferred from boundary positivity.

## 6. Unequal-channel boundary

The theorem uses a common scalar transfer \(fI\) on the two face labels. The physical response branch can have different eigenchannel transfers \(f_n\) and \(f_t\).

Then the desired Gram constraints become

\[
\langle e_{\rm ref}|e_0\rangle=f_n,
\qquad
\langle e_{\rm ref}|e_1\rangle=f_t,
\]

with a separately specified dephasing overlap. Positivity no longer reduces to the equicorrelation matrix, and a scalar \(s=|f|\) is insufficient.

The common-transfer theorem should therefore be applied only to a degenerate scalar sector or after proving the relevant response root sees one common normalized transfer.

## 7. Stop-everything and falsification tests

**Rational-inner trigger:** construct a causal rational inner matrix whose reference compression is the established \(f(\omega)I\) and whose conditioned environment overlap is \(|f(\omega)|\).

**Port trigger:** identify the two Gram-complement directions with the existing minimal outgoing-port pair and verify the $A_2$ action.

**Local-action trigger:** derive the three environment rays from one boundary Lagrangian or Hamiltonian with outgoing conditions.

**Unequal-channel trigger:** generalize the Gram positivity and minimality theorem to \(f_n\ne f_t\).

**Analyticity falsifier:** no analytic spectral factor can realize the required Gram function with the pole structure of the established response.

**Typing falsifier:** the two outgoing ports transform incompatibly with the face-conditioned record states.

**Common-transfer falsifier:** the neutral response root necessarily sees unequal transfers at every admissible scale.

## Verdict

| Question | Verdict |
|---|---|
| Can loss and dephasing arise from one dilation? | **Yes, pointwise** |
| Is the environment dimension minimal? | **Yes: three total, two beyond the reference ray** |
| Does this match the outgoing-port count? | **Yes dimensionally** |
| Is a causal rational realization proved? | **No** |
| Are unequal physical face transfers covered? | **No** |
| Is the environment microscopically identified? | **No** |

## Position in the corpus

- [strict-loss/dephasing defect bridge](1013_the_strict_loss_schur_defect_fixes_the_partial_dephasing_overlap_conditionally_but_does_not_identify_the_two_channels.md)
- [partial-dephasing compatibility](1012_partial_face_dephasing_is_the_exact_compatibility_window_between_the_jordan_determinant_barrier_and_the_hopf_cubic_phase.md)
- [minimal outgoing-port Schur realization](962_the_dissipative_cayley_generator_has_a_minimal_outgoing_port_schur_realization_but_no_closed_finite_hermitian_elimination.md)
- [fixed rational-inner dilation](948_each_lossy_response_face_has_a_fixed_six_port_rational_inner_dilation_with_two_positive_environment_rates.md)
