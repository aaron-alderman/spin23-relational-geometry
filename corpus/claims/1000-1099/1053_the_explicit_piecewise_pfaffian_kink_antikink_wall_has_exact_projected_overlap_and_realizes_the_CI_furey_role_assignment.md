# The Explicit Piecewise Pfaffian Kink–Antikink Wall Has Exact Projected Overlap and Realizes the CI Furey Role Assignment

**Date:** 18 October 2026  
**Branches:** response-root Pfaffian, paired BDI walls, endpoint projection, Furey antiunitaries, CI/DIII fork  
**Claim status:** exact two-mode projection and exact symmetry classification for the stated continuum model; full spectrum subsequently solved in document 1054; microscopic Standard-Model derivation open  
**Certificate:** [project_the_piecewise_pfaffian_kink_antikink_dirac_operator_onto_its_endpoint_modes.mjs](../../../verification/project/project_the_piecewise_pfaffian_kink_antikink_dirac_operator_onto_its_endpoint_modes.mjs)

## Executive result

The abstract reciprocal endpoint witness of document 1051 can be obtained from an explicit real Dirac wall.

Take

\[
H=A\partial_x+m(x)X,
\qquad
A=-i\sigma_2=
\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad
X=\sigma_1,
\]

with the symmetric kink–antikink profile

\[
m(x)=
\begin{cases}
-m_0,&x<0,\\
+m_0,&0<x<L,\\
-m_0,&x>L,
\end{cases}
\qquad m_0>0.
\]

The normalized isolated-wall zero modes are

\[
\psi_L(x)=\sqrt{m_0}\,e^{-m_0|x|}e_+,
\qquad
\psi_R(x)=\sqrt{m_0}\,e^{-m_0|x-L|}e_-.
\]

Projecting the paired-wall operator onto their span gives the exact off-diagonal matrix element

\[
\boxed{t=\langle\psi_L|H|\psi_R\rangle=-m_0e^{-m_0L}.}
\]

Thus

\[
H_{\rm end}=tX.
\]

Reflection about the interval midpoint, \(P:x\mapsto L-x\), completes the internal Furey operations into symmetries of the spatial wall:

\[
\Theta_P=PXK,
\qquad
\Theta_P^2=+1,
\qquad
\Theta_PH\Theta_P^{-1}=+H,
\]

\[
\Gamma_P=P\varepsilon K,
\qquad
\Gamma_P^2=-1,
\qquad
\Gamma_PH\Gamma_P^{-1}=-H.
\]

The concrete wall therefore realizes the **CI** role assignment. It does not realize the minimal DIII zero-pair branch unless extra bulk/Nambu structure or an exact rule kills the overlap.

The qualification is decisive: the formula above is exact for the projection onto the two isolated-wall modes. It is not by itself a proof that the exact finite-\(L\) bound-state energies of the full differential operator are precisely \(\pm m_0e^{-m_0L}\). [Document 1054](1054_the_exact_piecewise_pfaffian_kink_antikink_spectrum_obeys_an_implicit_exponential_law_and_calibrates_the_endpoint_projection.md) subsequently solves that spectrum and proves that this expression is the leading large-separation term of a distinct implicit energy law.

## 1. Why these are the isolated zero modes

At zero energy,

\[
A\psi'(x)+m(x)X\psi(x)=0.
\]

Since \(A^{-1}=-A\) and \(AX=-D\), with \(D=\operatorname{diag}(1,-1)\),

\[
\psi'(x)=-m(x)D\psi(x).
\]

For a kink from \(-m_0\) to \(+m_0\), the \(D=+1\) component is normalizable and gives \(\psi_L\). For an antikink from \(+m_0\) to \(-m_0\), the \(D=-1\) component is normalizable and gives \(\psi_R\). Each envelope has unit norm because

\[
m_0\int_{-\infty}^{\infty}e^{-2m_0|x|}\,dx=1.
\]

Their opposite \(D\)-eigenvalues are the two endpoint chiralities already anticipated by the zero total index of the pair.

## 2. Exact projected overlap

Use the isolated right antikink as the reference operator for \(\psi_R\). Its mass is \(+m_0\) for every \(x<L\) and \(-m_0\) for \(x>L\). The paired profile differs from it only on \(x<0\), where

\[
\Delta m=-2m_0.
\]

Because \(e_+^TXe_-=1\),

\[
\begin{aligned}
t
&=\int_{-\infty}^{0}\psi_L(x)^T\,\Delta m X\,\psi_R(x)\,dx\\
&=-2m_0^2e^{-m_0L}\int_{-\infty}^{0}e^{2m_0x}\,dx\\
&=-m_0e^{-m_0L}.
\end{aligned}
\]

The diagonal matrix elements vanish in this isolated-mode basis, so

\[
H_{\rm end}=
\begin{pmatrix}0&t\\t&0\end{pmatrix}=tX.
\]

This converts the earlier qualitative locality statement into a quantitative two-mode result: the splitting scale is controlled by the dimensionless separation \(m_0L=L/\xi\), where \(\xi=m_0^{-1}\).

## 3. Reflection is the missing spatial operation

The profile obeys

\[
m(L-x)=m(x).
\]

Reflection exchanges the two envelopes,

\[
\psi_L(L-x)\longleftrightarrow\psi_R(x),
\]

and reverses the derivative,

\[
P\partial_xP^{-1}=-\partial_x.
\]

The internal identities are

\[
XAX=-A,
\qquad
XXX=X,
\]

and

\[
\varepsilon A\varepsilon^{-1}=A,
\qquad
\varepsilon X\varepsilon^{-1}=-X.
\]

Consequently, the two minus signs from \(P\) and \(XAX=-A\) cancel for the kinetic term under \(PXK\), while the mass term is preserved. Under \(P\varepsilon K\), reflection reverses the kinetic term and \(\varepsilon\) reverses the mass term, so the whole Hamiltonian changes sign.

This spatial completion is not optional. Testing \(XK\) or \(\varepsilon K\) only on the internal matrices misses the fact that a kink and an antikink are exchanged by reflection.

## 4. Endpoint reduction and AZ class

On the ordered endpoint basis \((\psi_L,\psi_R)\), reflection exchanges the states. The projected Hamiltonian is the reciprocal matrix \(tX\). Its completed antiunitary signs are

\[
T=PXK:\quad T^2=+1,\quad TH_{\rm end}T^{-1}=H_{\rm end},
\]

\[
C=P\varepsilon K:\quad C^2=-1,\quad CH_{\rm end}C^{-1}=-H_{\rm end}.
\]

This is the CI square pattern. The explicit wall therefore promotes the CI result from an algebraically allowed endpoint matrix to a realized continuum projection.

It still does not show that the full Standard-Model/Furey source produces this wall. The assumptions remain:

1. the response-root Pfaffian \(a=\det\Psi\) couples linearly as the real Dirac mass;
2. its sign profile can form the stated kink–antikink configuration;
3. the spatial reflection is an exact or sufficiently accurate symmetry of the conversion region;
4. no additional flavour, gauge, Nambu or CP-violating masses change the class.

## 5. Exact statement versus asymptotic interpretation

There are three different claims that must not be conflated.

### Exact

The matrix element between the specified normalized isolated-wall modes is

\[
t=-m_0e^{-m_0L}.
\]

### Controlled large-separation approximation

For \(m_0L\gg1\), those modes approximate the low-energy states of the paired problem, so the two low eigenvalues are expected to be governed at leading order by \(\pm|t|\).

### Not established by the projection alone

The exact finite-\(L\) eigenvalues need not equal \(\pm|t|\) without corrections. The isolated modes are not exact eigenvectors of the paired profile because each sees the other wall's mass deformation. The separate matching calculation in document 1054 gives \(|E|=m_0\exp[-L\sqrt{m_0^2-E^2}]\).

This separation prevents an effective two-state calculation from being silently promoted into a spectral theorem.

## 6. What this does to the CI/DIII fork

For the minimal real wall actually written above, the fork is decided in favor of CI:

\[
\boxed{PXK\text{ is TRS},\qquad P\varepsilon K\text{ is PHS}.}
\]

A DIII realization now requires additional structure rather than a relabelling of the same two-state wall. Plausible open paths include:

- a genuine BdG/Nambu doubling in which the quaternionic operation acts as physical time reversal;
- a microscopic placement charge that forbids left–right tunnelling exactly;
- an additional Kramers multiplicity not present in the two-component real Dirac operator;
- a bulk topological invariant whose boundary representation differs from this finite kink–antikink pair.

Absent one of those mechanisms, the paired endpoints split exponentially rather than remaining exact zero modes.

## 7. Stop-everything tests and falsifiers

**Microscopic mass trigger:** derive a term \(a(x)\bar\chi X\chi\), with \(a=\det\Psi\), from the completed Furey/Higgs response action. This would turn the conditional wall into a source-derived defect.

**Spectral trigger:** solve the full piecewise matching problem and compare its lowest eigenvalue with the two-mode expression over \(m_0L\). This determines the regime in which the projection is quantitatively reliable.

**DIII trigger:** find a source-derived antiunitary with square \(-1\) that commutes with the complete wall/BdG Hamiltonian and forbids the projected \(tX\) term.

**Reflection falsifier:** an asymmetric mass profile or boundary action may destroy \(P\), after which the completed CI operations used here need not be symmetries.

**Complex-mass falsifier:** a permitted second mass anticommuting with the real Dirac terms can remove the sign wall without closing the gap, as already established in document 1049.

**Multiplicity falsifier:** extra endpoint modes can alter both the projected symmetry representation and the AZ classification.

## Verdict

| Question | Verdict |
|---|---|
| Is the overlap between the stated isolated endpoint modes exact? | **Yes: \(t=-m_0e^{-m_0L}\)** |
| Does the explicit symmetric real wall realize the reciprocal \(tX\) endpoint kernel? | **Yes** |
| Which Furey role assignment does this model select? | **CI** |
| Are its finite-\(L\) bound-state energies exactly \(\pm|t|\)? | **No; document 1054 gives the corrected implicit law** |
| Does this derive the wall from the Standard Model? | **No** |
| What is now the highest-value calculation? | **Derive the Pfaffian mass coupling or solve and calibrate the exact finite-wall spectrum** |

## Position in the corpus

- [oriented Gram-root double cover](1047_fixing_the_phase_symplectic_orientation_reduces_the_gram_root_gauge_to_SO2_and_turns_the_pfaffian_sign_into_a_rank_one_separated_Z2_sheet.md)
- [conditional single BDI wall](1048_if_the_response_pfaffian_is_a_BDI_dirac_mass_then_its_rank_one_wall_binds_one_exact_zero_mode_but_the_coupling_is_not_yet_derived.md)
- [paired-wall stability audit](1049_the_minimal_paired_seam_has_zero_total_BDI_index_so_its_endpoint_modes_can_hybridize_and_a_complex_second_mass_removes_sign_protection.md)
- [Furey CI/DIII endpoint fork](1050_the_two_furey_antiunitaries_protect_or_split_the_paired_wall_endpoints_according_to_their_time_reversal_particle_hole_role_assignment.md)
- [minimal reciprocal CI witness](1051_the_minimal_reciprocal_endpoint_kernel_realizes_the_CI_furey_role_assignment_but_noise_reciprocity_alone_cannot_exclude_DIII.md)
- [exact paired-wall spectrum](1054_the_exact_piecewise_pfaffian_kink_antikink_spectrum_obeys_an_implicit_exponential_law_and_calibrates_the_endpoint_projection.md)
