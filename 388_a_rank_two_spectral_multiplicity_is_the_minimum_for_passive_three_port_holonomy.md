# A Rank-Two Spectral Multiplicity Is the Minimum for Passive Three-Port Holonomy

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B08, B09, B11 and B13  
**Claim status:** exact minimal-rank, positivity, Herglotz and Schur-holonomy construction; named physical currents and normalization remain open

## 1. Can a positive spectral density carry the required phase?

The third-port route was moved from internal matrix units to a source-space
response of three gauge-invariant composite currents. Positivity might have
forced its loop product to be real, which would have closed the branch.

It does not. A positive three-port spectral density can carry nonzero oriented
holonomy, but a rank-one residue cannot. Rank two is minimal.

## 2. Rank-one no-go

For one spectral transition vector

\[
a=(a_1,a_2,a_3)^T,
\]

the residue is

\[
\rho=aa^\dagger,
\qquad \rho_{ij}=a_i\bar a_j.
\]

Its loop product is

\[
\rho_{12}\rho_{23}\rho_{31}
=a_1\bar a_2a_2\bar a_3a_3\bar a_1
=|a_1a_2a_3|^2\geq0.
\]

Therefore

\[
\boxed{
\operatorname{Im}(\rho_{12}\rho_{23}\rho_{31})=0
\quad\text{for every rank-one residue}.}
\]

A single nondegenerate intermediate state cannot source the Pin orientation.

## 3. Minimal rank-two construction

Take two transition vectors

\[
a=(1,1,1)^T,
\qquad
b=(1,i,0)^T.
\]

Then

\[
\rho_2=aa^\dagger+bb^\dagger
=
\begin{pmatrix}
2&1-i&1\\
1+i&2&1\\
1&1&1
\end{pmatrix}
\succeq0.
\]

Its edges are

\[
u=\rho_{12}=1-i,qquad
v=\rho_{23}=1,qquad
w=\rho_{31}=1,
\]

so

\[
\boxed{
\operatorname{Im}(uvw)=-1.}
\]

This proves rank two is sufficient and, by the rank-one theorem, minimal.

## 4. Strict positivity

Add independent diagonal spectral weight:

\[
\rho=\rho_2+I_3
=
\begin{pmatrix}
3&1-i&1\\
1+i&3&1\\
1&1&2
\end{pmatrix}.
\]

For every nonzero (x\in\mathbb C^3),

\[
x^\dagger\rho x
=|a^\dagger x|^2+|b^\dagger x|^2+\|x\|^2>0.
\]

Hence

\[
\boxed{\rho>0.}
\]

The diagonal completion changes no edge and therefore preserves the loop
orientation.

## 5. Exact Schur orientation

Eliminate port three. Since (d_3=2),

\[
q_{\rm ind}
=\frac{\bar w\bar v}{d_3}
=\frac12.
\]

The effective edge is

\[
u_{\rm eff}=u-q_{\rm ind}
=\frac12-i.
\]

The direct/indirect oriented area is

\[
\boxed{
\Omega_{OR}
=\operatorname{Im}(u\bar q_{\rm ind})
=-\frac12
=\frac1{d_3}\operatorname{Im}(uvw).}
\]

Thus strict positivity and nonzero Pin-source orientation coexist in one exact
matrix.

## 6. Causal Herglotz completion

Place the residue at a real spectral frequency (omega_0):

\[
G(z)=\frac{\rho}{\omega_0-z},
\qquad \operatorname{Im}z>0.
\]

Because

\[
\operatorname{Im}\frac1{\omega_0-z}>0,
\]

one has

\[
\boxed{\operatorname{Im}G(z)>0.}
\]

The model is a strictly passive matrix Herglotz response. Schur elimination
commutes with the common scalar spectral factor, so the direct/indirect path
decomposition survives at every nonsingular (z).

A multi-pole generalization can give distinct frequency dependence to direct
and indirect paths, making their provenance experimentally separable.

## 7. Physical spectral meaning

For Hermitian currents (J_i), a pointwise spectral density has Gram form

\[
\rho_{ij}(\omega)
=\sum_{n:E_n-E_0=\omega}
\langle0|J_i|n\rangle
\langle n|J_j|0\rangle.
\]

The rank-two minimum means at least two linearly independent transition vectors
must contribute at the same spectral value or within an unresolved spectral
bin. Equivalently, multi-pole interference can produce the oriented response
away from the real axis.

The holonomy is therefore a statement about relational spectral multiplicity,
not merely about three operator labels.

## 8. Relation to Furey currents

The construction does not require an internal neutral (M_3). It requires
three gauge-invariant currents whose transition-amplitude vectors resemble
(a,b) up to continuous deformation.

The two neutral (O/R) currents supply the first two ports. A weak-, charged-
or color-trace composite could supply the third only if interactions create at
least two shared spectral channels. A single isolated mediator yields rank one
and cannot generate the loop orientation.

This adds a new dynamical gate to third-port selection.

## 9. Stress--energy route

Sector-resolved stress insertions naturally couple to many common intermediate
states and can have spectral rank greater than one. They are therefore credible
sources of the required multiplicity. But positivity of the total stress
spectral density does not automatically give nonzero off-diagonal holonomy;
Ward identities, improvements and connected subtraction remain essential.

The minimal example is a target spectral pattern, not yet a Standard-Model
stress calculation.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** three named Furey/Standard-Model composite currents
have a positive spectral density of rank at least two with regulator-stable
nonzero loop holonomy, and its normalized Schur area lands in the nontrivial
Pin interval.

**Rank-one falsifier:** one nondegenerate intermediate state is claimed to
produce a nonzero spectral loop phase.

**Positivity falsifier:** complex edge phases are introduced in a matrix that
is not a positive spectral density or Herglotz response.

**Degeneracy falsifier:** unresolved multiple transitions are called one rank-
one state.

**Causality falsifier:** a static positive matrix is called a retarded response
without a spectral/Herglotz completion.

## 11. Pinned dependency and continuation

The positive causal existence question is closed. Pin physical realization at
named currents with shared spectral multiplicity and a normalization to the
Pin Hamiltonian.

Continue by building the minimal two-pole response with distinguishable path
dispersion and auditing sector-resolved Standard-Model stress/current
correlators for the required Gram rank.

## 12. Certificate

The [minimal passive holonomy certificate](scripts/verify_rank_two_minimum_passive_three_port_holonomy.mjs)
proves the rank-one no-go, verifies the rank-two Gram example, strict
positivity, nonzero loop and Schur areas, and Herglotz passivity.

## Companion documents

- [Composite-response third-port obstruction](387_no_third_furey_singlet_extends_the_neutral_m2_to_m3_so_the_holonomy_port_must_be_a_composite_response.md)
- [Schur holonomy to Pin orientation](386_schur_reduction_turns_three_port_holonomy_into_exactly_the_two_or_spurions_needed_by_the_pin_phase.md)
- [Majorana CP three-port holonomy](331_majorana_cp_is_the_holonomy_obstructing_three_local_spin23_edges_from_one_global_real_carrier.md)
- [Lorentzian passivity and causal response](70_lorentzian_passivity_and_causal_response.md)
