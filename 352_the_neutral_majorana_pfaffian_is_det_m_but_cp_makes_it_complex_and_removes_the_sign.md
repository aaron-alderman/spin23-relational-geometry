# The Neutral Majorana Pfaffian Is \(\det M\), but CP Makes It Complex and Removes the Sign

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B06, B08 and B11  
**Claim status:** exact Lorentz-antisymmetric Pfaffian identity and realification obstruction; a compatible physical real structure for the CP-violating neutral selector remains open

## 1. Build the neutral Majorana bilinear correctly

Let

\[
M=M^T\in M_3(\mathbb C)
\]

be the sterile or light-neutrino flavor Majorana matrix.

The two-component Lorentz contraction uses

\[
\varepsilon=
\begin{pmatrix}
0&1\\
-1&0
\end{pmatrix}.
\]

The full bilinear form is

\[
\boxed{
\Omega=M\otimes\varepsilon.}
\]

Because \(M\) is symmetric and \(\varepsilon\) antisymmetric,

\[
\Omega^T=-\Omega.
\]

This is the correct antisymmetric matrix whose Pfaffian enters the fermionic Gaussian integral.

## 2. Pfaffian identity

For diagonal \(M=\operatorname{diag}(m_1,m_2,m_3)\),

\[
\Omega
=m_1\varepsilon\oplus m_2\varepsilon\oplus m_3\varepsilon,
\]

so

\[
\operatorname{Pf}\Omega=m_1m_2m_3=\det M.
\]

Both sides transform identically under complex congruence, so generally

\[
\boxed{
\operatorname{Pf}(M\otimes\varepsilon)=\det M.}
\]

## 3. Exceptional checkpoint

For

\[
M=
\begin{pmatrix}
5&2&1\\
2&7&i\\
1&i&11
\end{pmatrix},
\]

one has

\[
\boxed{
\det M
=\operatorname{Pf}\Omega
=339+4i.}
\]

The same \(r\alpha\beta\) structure that creates the Majorana triangle gives the imaginary determinant component.

The Pfaffian is complex. It has no sign.

## 4. Odd flavor number still reverses the complex Pfaffian

Under a full mass reversal,

\[
M\mapsto-M,
\]

the three-flavor determinant changes as

\[
\det(-M)=(-1)^3\det M=-\det M.
\]

Equivalently,

\[
\operatorname{Pf}(-\Omega)=-\operatorname{Pf}\Omega.
\]

But in the complex mass space there is a nonsingular path

\[
M(\theta)=e^{i\theta}M,
\qquad
0\le\theta\le\pi,
\]

connecting \(M\) to \(-M\). Along the path,

\[
\det M(\theta)
=e^{3i\theta}\det M
\ne0.
\]

Therefore the sign reversal is not a topological obstruction once arbitrary complex phases are allowed.

## 5. The underlying-real alternating form squares away the phase

For a complex antisymmetric matrix

\[
\Omega=A+iB,
\]

the ordinary complex-linear real representation

\[
\begin{pmatrix}A&-B\\B&A\end{pmatrix}
\]

is **not** antisymmetric when \(B\ne0\). The relevant real alternating
bilinear form is instead \(\operatorname{Re}(z^T\Omega w)\), represented by

\[
\mathcal R(\Omega)
=
\begin{pmatrix}
A&-B\\
-B&-A
\end{pmatrix}.
\]

This is a real antisymmetric \(12\times12\) matrix.

Its Pfaffian has magnitude

\[
\left|\operatorname{Pf}\mathcal R(\Omega)\right|
=|\operatorname{Pf}\Omega|^2
=|\det M|^2.
\]

Under \(\Omega\mapsto-\Omega\), the real matrix has six antisymmetric pairs, so

\[
\operatorname{Pf}[-\mathcal R(\Omega)]
=(-1)^6
\operatorname{Pf}\mathcal R(\Omega)
=\operatorname{Pf}\mathcal R(\Omega).
\]

Passing to the underlying-real alternating form doubles the number of
antisymmetric pairs and erases the odd three-flavor sign. This construction is
canonical for the real part of the bilinear form, but it is not by itself a
physical Majorana reality condition.

## 6. Consequence for the selector Pfaffian proposal

The earlier real-Pfaffian domain-wall invariant is valid when the physical endpoint forms lie in one gauge-compatible real antisymmetric class.

The CP-violating exceptional mass does not satisfy that condition merely because it is neutral:

\[
\operatorname{Pf}\Omega=339+4i.
\]

Neutrality removes the gauge obstruction to a real structure, but it does not select one compatible with the complex mass.

The required physical antiunitary must constrain the allowed phase path. Otherwise \(M\) and \(-M\) are connected without a gap closing.

## 7. Possible repairs

The sign invariant can be restored if:

1. a generalized CP symmetry makes \(\det M\) real;
2. the selector endpoints lie on a real submanifold even though the wall interior breaks CP;
3. momentum-dependent particle-hole symmetry supplies Pfaffians only at invariant momenta;
4. the relevant invariant is a phase winding of \(\det M\), not a real sign;
5. a relative Pfaffian is defined against the triality-selected real structure \(W\);
6. the physical Majorana basis is smaller than the naive twelve-dimensional realification because CAR redundancy is quotiented correctly.

Each option requires an explicit operator construction.

## 8. Determinant phase as the surviving information

Even when a sign is unavailable, the phase

\[
\arg\det M
\]

is meaningful relative to a fixed antiunitary or reference mass.

For the exceptional texture,

\[
\operatorname{Im}\det M=2r\alpha\beta.
\]

The determinant phase and the three-edge triangle therefore share the same CP source.

A causal or spatial winding of this phase may support an integer or spectral-flow invariant, but no such theorem follows from the endpoint matrices alone.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the neutral Furey/CAR operator supplies a gauge-compatible real structure for which the physical endpoint Pfaffians are real and opposite.

**Winding trigger:** a spatially varying exceptional mass has a quantized \(\arg\det M\) winding tied to a protected defect mode.

**Sign falsifier:** a sign is assigned directly to the complex number \(339+4i\).

**Realification falsifier:** the twelve-dimensional underlying-real alternating form is claimed to retain the odd three-flavor Pfaffian flip.

**Neutrality falsifier:** gauge neutrality alone is claimed to make every complex Majorana mass real.

**Path falsifier:** \(M\) and \(-M\) are called disconnected while the nonsingular path \(e^{i\theta}M\) is allowed.

## 10. Pinned dependency

The neutral Majorana form is now explicit, and the naive Pfaffian shortcut fails for the CP-violating texture.

The branch is pinned at constructing the selector- and CAR-compatible real submanifold or replacing the sign by a proven determinant-phase winding invariant.

## 11. Certificate

The [neutral Majorana complex-Pfaffian reality-gate certificate](scripts/verify_neutral_majorana_pfaffian_equals_det_and_complex_phase_obstructs_sign.mjs) verifies antisymmetry, \(\operatorname{Pf}(M\otimes\varepsilon)=\det M\), the \(339+4i\) checkpoint, the nonsingular complex sign-rotation path and loss of the sign in the underlying-real alternating form.

## Companion documents

- [Pfaffian selector parity](347_particle_hole_symmetry_upgrades_selector_parity_to_a_pfaffian_zero_mode_invariant.md)
- [Exceptional Majorana phase](329_the_exceptional_cubic_phase_splits_dirac_completion_from_majorana_index_breaking.md)
- [Gauge-commutant flag antiunitary](337_the_flag_antiunitary_lives_in_the_gauge_multiplicity_commutant_and_cp_breaks_it.md)
- [Causal complexification](351_causal_dispersion_supplies_the_missing_exceptional_complex_structure_nonlocally.md)
