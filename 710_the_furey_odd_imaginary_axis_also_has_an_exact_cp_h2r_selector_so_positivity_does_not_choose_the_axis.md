# The Furey-Odd Imaginary Axis Also Has an Exact CP \(H_2(\mathbb R)\) Selector, So Positivity Does Not Choose the Axis

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B07, B08, B09, B10, B11, B14 and the Clifford/Furey parity branch  
**Claim status:** exact CP selector and cone equivalence; physical parity of the response remains open  
**Certificate:** [verify_furey_odd_axis_clifford_selector_is_cp_and_h2r.mjs](scripts/verify_furey_odd_axis_clifford_selector_is_cp_and_h2r.mjs)

## Executive result

The CP-even scalar response axis \(q=1\) is not the only mathematically admissible Clifford selector compatible with Furey’s \(SU(3)\).

Let \(u\in\operatorname{Im}\mathbb O\) be the imaginary unit defining Furey’s complex subalgebra. There is an explicit spin rotation

\[
\boxed{
W_u
=\exp\!\left(\frac{\pi}{4}\Gamma_u\Gamma_1\right)
=\frac1{\sqrt2}(I+\Gamma_u\Gamma_1)
}
\]

that:

- fixes the diagonal face generator \(\Gamma_d\);
- sends the scalar-link generator \(\Gamma_1\) to \(\Gamma_u\);
- and conjugates the scalar-axis Clifford expectation into an odd-axis expectation.

The resulting \(64\)-Kraus channel has exact associative range

\[
\operatorname{Alg}
\{I,\Gamma_d,\Gamma_u,\Gamma_d\Gamma_u\}
\cong M_2(\mathbb R),
\]

and exact symmetric range

\[
\boxed{
\operatorname{span}_{\mathbb R}
\{I,\Gamma_d,\Gamma_u\}
\cong H_2(\mathbb R).
}
\]

On

\[
A=tI+d\Gamma_d+\sum_{\mu=0}^{7}z_\mu\Gamma_\mu,
\]

it acts as

\[
\boxed{
\mathcal E_u(A)
=tI+d\Gamma_d
+\langle u,z\rangle\Gamma_u.
}
\]

The selected determinant is

\[
t^2-d^2-\langle u,z\rangle^2,
\]

the same Lorentz cone as the scalar-axis selector.

Therefore positivity, rank and \(Spin(2,3)\) conformal geometry do not distinguish the even \(q=1\) and odd \(q=u\) axes.

## 1. Spin rotation between the axes

The Clifford generators obey

\[
\Gamma_1^2=\Gamma_u^2=I,
\qquad
\{\Gamma_1,\Gamma_u\}=0.
\]

Hence

\[
J_u=\Gamma_u\Gamma_1
\]

is skew-symmetric and satisfies

\[
J_u^2=-I.
\]

The rotation

\[
W_u(\theta)
=\exp\!\left(\frac{\theta}{2}J_u\right)
\]

acts by

\[
W_u(\theta)\Gamma_1W_u(\theta)^T
=\cos\theta\,\Gamma_1+\sin\theta\,\Gamma_u.
\]

At \(\theta=\pi/2\),

\[
W_u\Gamma_1W_u^T=\Gamma_u.
\]

Because \(\Gamma_d\) anticommutes with both \(\Gamma_1\) and \(\Gamma_u\), it commutes with their product:

\[
[J_u,\Gamma_d]=0.
\]

Therefore the diagonal face direction remains fixed.

## 2. Rotated conditional expectation

Let \(\mathcal E_1\) be the scalar-axis conditional expectation of document 706. Define

\[
\mathcal E_u(A)
=
W_u\,
\mathcal E_1(W_u^TAW_u)\,
W_u^T.
\]

Unitary conjugation preserves:

- complete positivity;
- trace preservation;
- unitality;
- idempotence;
- and the dimension and algebra type of the range.

If

\[
U_{a,b}=I_2\otimes P_{a,b}
\]

are the \(64\) real Pauli unitaries used in \(\mathcal E_1\), then

\[
\widetilde U_{a,b}
=W_uU_{a,b}W_u^T
\]

give the explicit odd-axis Kraus representation:

\[
\mathcal E_u(A)
=\frac1{64}
\sum_{a,b}
\widetilde U_{a,b}A\widetilde U_{a,b}^T.
\]

The certificate constructs all matrices from the Fano multiplication table and verifies Kraus completeness.

## 3. Exact action on the spin factor

The rotated channel fixes:

\[
I,\qquad
\Gamma_d,\qquad
\Gamma_u,\qquad
\Gamma_d\Gamma_u.
\]

It kills:

\[
\Gamma_1
\]

and all six imaginary-link generators orthogonal to \(u\).

Its symmetric fixed space is therefore exactly

\[
J_u
=\operatorname{span}_{\mathbb R}
\{I,\Gamma_d,\Gamma_u\}.
\]

For a unit \(u\), the coefficient retained from \(z\in\mathbb O\) is the Euclidean component

\[
z_u=\langle u,z\rangle.
\]

This produces a rank-two real spin factor even though the surviving off-diagonal octonion direction is imaginary.

## 4. Positivity and determinant

Every element of \(J_u\) has the form

\[
X=tI+d\Gamma_d+r\Gamma_u.
\]

Its spin-factor determinant is

\[
\det X=t^2-d^2-r^2.
\]

Its positive cone is

\[
t\ge\sqrt{d^2+r^2}.
\]

This is identical to the scalar-axis cone after the coordinate relabelling

\[
r=\operatorname{Re}z
\quad\longleftrightarrow\quad
r=\langle u,z\rangle.
\]

Thus none of the following selects the axis:

- Jordan positivity;
- determinant signature;
- rank-one/null boundary;
- conformal group \(Spin_0(2,3)\);
- complete positivity of the dilation;
- or the Lindblad spectrum, which is carried over by conjugation.

## 5. Conjugation parity is the actual distinction

Furey’s complex conjugation on

\[
\mathbb C_u=\operatorname{span}\{1,u\}
\]

acts by

\[
\kappa_u(1)=1,
\qquad
\kappa_u(u)=-u.
\]

Therefore:

| selector | retained link | Furey conjugation parity |
|---|---|---|
| \(\mathcal E_1\) | \(\operatorname{Re}z\) | even |
| \(\mathcal E_u\) | \(\langle u,z\rangle\) | odd |

The two channels are Clifford-conjugate before matter coupling. They need not remain physically equivalent after the Furey complex structure is used to define charge, color and particle ideals.

## 6. Stress–energy does not automatically reject the odd axis

For a Hermitian response kernel, both \(\Gamma_1\) and \(\Gamma_u\) are real symmetric \(16\times16\) matrices. Both selected cones are positive Lorentz cones.

Consequently, the general requirement

\[
\text{positive stress response}
\]

does not force even conjugation parity.

An exclusion of the odd axis must instead follow from a more specific statement, such as:

- CP invariance of a scalar stress channel;
- absence of a pseudoscalar gravitational response;
- parity properties of the source coupling;
- or experimental bounds on CP-odd stress correlators.

Those are physical conditions, not consequences of Jordan positivity alone.

## 7. General circle of equivalent Clifford selectors

For

\[
q(\theta)=\cos\theta\,1+\sin\theta\,u,
\]

define

\[
W(\theta)
=\exp\!\left(\frac{\theta}{2}\Gamma_u\Gamma_1\right).
\]

Then

\[
\mathcal E_\theta
=\operatorname{Ad}_{W(\theta)}
\circ\mathcal E_1
\circ\operatorname{Ad}_{W(\theta)^T}
\]

is a CP conditional expectation onto

\[
J_\theta
=\operatorname{span}
\{I,\Gamma_d,\Gamma_{q(\theta)}\}.
\]

All members have identical abstract Jordan and dynamical spectra. The angle becomes meaningful only relative to the Furey conjugation or another matter-sector frame.

## 8. New synthesis target

The matter-to-response map must now determine not merely whether an \(H_2(\mathbb R)\) carrier exists, but which Furey parity it carries.

A candidate Hermitian kernel \(\mathcal R\) should be decomposed as

\[
\mathcal R
=R_{\rm even}\Gamma_1
+R_{\rm odd}\Gamma_u
+\cdots.
\]

Then:

- \(R_{\rm odd}=0\) selects the scalar axis;
- \(R_{\rm even}=0\) selects the imaginary axis;
- both nonzero select a mixed angle;
- a symmetry relating them may make the angle dynamical.

This is a sharper and more testable target than “connect Furey to \(Spin(2,3)\).”

## 9. Stop-everything criteria

Stop claiming uniqueness of the scalar-axis selector from positivity or CP; the odd axis passes both tests.

Stop the odd-axis physical branch if:

- the relevant stress-response kernel is rigorously CP even;
- the odd coefficient violates CPT or reflection positivity;
- it creates an experimentally excluded long-range pseudoscalar response;
- or the rotated noise algebra necessarily acts on Furey matter rather than the response dilation.

Stop treating the circle angle as physical if an exact response-only \(Spin(2)\) gauge redundancy identifies every \(\theta\) after coupling. Conversely, it is physical if the Furey conjugation frame breaks that rotation and an invariant relative angle remains.

## 10. Highest-value next calculations

1. Classify gauge-invariant Hermitian Standard-Model bilinears by Furey conjugation parity and Lorentz scalar/pseudoscalar type.
2. Determine whether the stress tensor can source the odd response line without derivatives or epsilon tensors.
3. Compute whether mixed \(\theta\) gives a CP-odd response invariant.
4. Test the Higgs-dressed Dirac exchange on \(\Gamma_1\) and \(\Gamma_u\).
5. Formulate experimental consequences only after a source-normalized kernel fixes the response parity.

## Companion documents

- [Furey \(SU(3)\) leaves a circle of response lines](709_fureys_su3_stabilizer_leaves_a_circle_of_clifford_response_lines_until_conjugation_parity_selects_an_axis.md)
- [Exact scalar-axis Clifford selector](706_a_clifford_multiplicity_conditional_expectation_exactly_selects_h2r_without_the_g2_fixed_range_excess.md)
- [Clifford selector Lindbladian](707_a_six_jump_clifford_lindbladian_converges_to_h2r_with_exact_gap_but_must_not_depolarize_the_same_face.md)
- [Typed topology/Clifford audit](708_the_topology_face_and_clifford_carrier_must_be_separately_typed_or_the_joint_selector_collapses_to_scalars.md)
