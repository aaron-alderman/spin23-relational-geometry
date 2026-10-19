# Schur Reduction Turns Three-Port Holonomy into Exactly the Two (O/R) Spurions Needed by the Pin Phase

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B05, B06, B08, B09, B11 and B13  
**Claim status:** exact algebraic reduction and rephasing theorem; physical port identification, causal provenance and Pin normalization remain open

## 1. Reopening the pinned holonomy path

The exceptional-to-Pin audit required two (O/R) relationship amplitudes with
the same relative rephasing weight. Assigning such a weight directly to the
exceptional cubic coefficient was underived.

The existing three-port Majorana/response construction supplies the required
pair automatically through Schur elimination.

## 2. Three-port response

Write a positive Hermitian response as

\[
R=
\begin{pmatrix}
d_1&u&\bar w\\
\bar u&d_2&v\\
w&\bar v&d_3
\end{pmatrix},
\qquad d_i>0.
\]

Interpret ports (1,2) provisionally as (O,R), and port (3) as an
additional neutral channel. Under vertex rephasing,

\[
u\mapsto e^{i(\theta_1-\theta_2)}u,
\]

\[
v\mapsto e^{i(\theta_2-\theta_3)}v,
\qquad
w\mapsto e^{i(\theta_3-\theta_1)}w.
\]

The loop product

\[
uvw
\]

is invariant.

## 3. Eliminate the third port

The Schur complement of (d_3) has effective (O/R) off-diagonal entry

\[
u_{\rm eff}
=u-\frac{\bar w\bar v}{d_3}.
\]

Define the indirect path amplitude

\[
\boxed{
q_{\rm ind}=\frac{\bar w\bar v}{d_3}.}
\]

It transforms as

\[
q_{\rm ind}
\mapsto e^{i(\theta_1-\theta_2)}q_{\rm ind},
\]

exactly like the direct edge (u). Thus the direct and indirect terms are the
two equally charged relationship spurions required by the previous theorem.

## 4. Exact oriented-area identity

Their relative phase is

\[
\boxed{
\Omega_{OR}
=\operatorname{Im}(u\bar q_{\rm ind})
=\frac1{d_3}\operatorname{Im}(uvw).}
\]

This identity has all required properties:

- invariant under all three vertex rephasings;
- odd under complex conjugation;
- zero exactly when the direct and indirect paths are collinear in the complex
  relationship plane;
- nonzero precisely when the three-port loop has oriented holonomy.

The two-spurion Pin orientation is therefore the Schur shadow of the
three-port CP holonomy.

## 5. Map to the (O/R) matrix units

Both paths multiply the same matrix unit (E_{OR}). Before elimination, keep
their provenance:

\[
X_{\rm direct}=uE_{OR}+\bar uE_{RO},
\]

\[
X_{\rm indirect}=q_{\rm ind}E_{OR}+\bar q_{\rm ind}E_{RO}.
\]

Choose a relative phase gauge in which (q_{\rm ind}>0). Then

\[
u=a+ib
\]

and

\[
X_{\rm direct}=a\sigma_x-b\sigma_y,
\qquad
\Omega_{OR}=bq_{\rm ind}.
\]

The physical (sigma_y) direction is now fixed relative to the real indirect
path. A conditional Pin coefficient is

\[
\delta
=-\kappa\frac{\Omega_{OR}}{q_{\rm ind}}
=-\kappa b,
\]

with sign depending on the matrix-unit convention.

Unlike (operatorname{Im}c) for an isolated coefficient, this construction is
basis invariant before gauge fixing.

## 6. Why the reduced (2\times2) matrix alone is insufficient

The total effective edge

\[
u_{\rm eff}=u-q_{\rm ind}
\]

is one complex number and can itself be made real by an (O/R) rephasing. If
the direct/indirect decomposition is forgotten, the oriented area is lost.

Therefore a physical realization must retain path provenance through at least
one of:

- controlled detuning or elimination of the third port;
- frequency dependence distinguishing direct and indirect transfer functions;
- an explicit microscopic decomposition in the action;
- comparison between the full and Schur-reduced responses.

Static knowledge of the reduced (H_2(\mathbb C)) matrix is not enough.

## 7. Exceptional/Majorana realization

For the three-flavor Majorana construction, the product (uvw) is proportional
to the weak-basis triangle invariant sourced by the exceptional phase. Thus

\[
\text{exceptional oriented cubic}
\longrightarrow
\text{Majorana three-port holonomy}
\longrightarrow
\Omega_{OR}
\longrightarrow
\sigma_y\text{ Pin orientation}
\]

is now an exact algebraic chain, conditional only at the physical
identifications between stages.

This route is superior to assigning the exceptional coefficient an (O/R)
charge by hand: vertex covariance and the second relationship path are built
into the three-port geometry.

## 8. Candidate third neutral ports

The corrected Furey neutral inventory contains

\[
M_2(\mathbb C)\oplus\mathbb C^3.
\]

After choosing (O,R) for the (M_2) block, the three trace directions from
(operatorname{End}(O_2)), (operatorname{End}(H)) and
(operatorname{End}(C)) are algebraic candidates for port (3).

None is currently canonical:

- the (O_2) trace is tied to the color triplet block;
- the (H) trace is tied to the weak doublet block;
- the (C) trace is tied to the charged singlet block.

Their trace operators are gauge neutral, but physical currents, spectral
weights and couplings to both (O) and (R) have not been derived. Choosing
one by convenience would merely move the arbitrary portal.

## 9. Relation to (Spin(2,3))

Each direct or Schur-reduced two-port response is locally an
(H_2(\mathbb R)) carrier after a phase choice, with conformal group

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

The nonzero loop holonomy is the obstruction to choosing those local real
forms globally and simultaneously. The Pin (sigma_y) term records that
obstruction on one reduced edge.

This makes the “Spin(2,3) pole” interpretation precise but limited: it is the
local real two-face geometry, while the global three-port object retains a
complex orientation.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** three named neutral Furey currents form a passive
causal response with nonzero loop holonomy, controlled Schur elimination
produces the same (Omega_{OR}), and its normalization places the regulated
Pin lattice in the nontrivial phase.

**Provenance falsifier:** only (u_{\rm eff}) is retained while the direct and
indirect paths are discarded, yet their relative phase is still claimed.

**Port falsifier:** a trace direction is selected as port (3) without a
physical current or coupling to both (O) and (R).

**Passivity falsifier:** the three-port matrix has no positive/Herglotz
completion.

**Normalization falsifier:** the dimensionless response holonomy is equated to
the Hamiltonian coefficient (delta) without a scale and convention map.

## 11. Pinned dependency and continuation

The two-spurion algebraic bridge is now closed by Schur reduction. Pin the
physical route at:

1. selection of a third neutral Furey current;
2. a causal positive three-port spectral density;
3. retention of direct/indirect path provenance;
4. normalization from (Omega_{OR}) to (delta).

Continue by testing the three neutral trace candidates against available
Standard-Model currents and stress insertions.

## 12. Certificate

The [Schur-holonomy-to-Pin certificate](../../../verification/verify/verify_schur_holonomy_supplies_two_or_pin_spurions.mjs)
checks vertex-gauge covariance, the exact loop/area identity, matrix-unit
quadratures, antiunitary parity and loss of orientation when path provenance is
discarded.

## Companion documents

- [Exceptional two-spurion gate](385_the_exceptional_cubic_can_source_the_pin_orientation_only_through_a_second_or_relationship_spurion.md)
- [Majorana CP three-port holonomy](331_majorana_cp_is_the_holonomy_obstructing_three_local_spin23_edges_from_one_global_real_carrier.md)
- [Furey oriented neutral Pin selector](384_the_minimal_pin_phase_selector_is_the_oriented_neutral_furey_relationship_but_its_phase_is_not_canonical.md)
- [Three-boundary Peirce--Schur recursion](../0200-0299/203_three_boundary_scalar_star_realizes_peirce_schur_recursion.md)
