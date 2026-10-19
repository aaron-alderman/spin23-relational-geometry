# Three Flavors Open a Nonvanishing Sterile Pairing Channel, but No Interaction Fixes Its Sign

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B05, B06, B08, B09, B11 and B13  
**Claim status:** exact local exterior-algebra, flavor-representation and auxiliary-field result; attraction, criticality and condensation remain open

## 1. The apparent contradiction

The mirror-interaction audit proved that the one-generation holomorphic operator

\[
(\nu^c\nu^c)^2
\]

vanishes at one spacetime point. A two-component Weyl field supplies only two
independent Grassmann generators, so a fourth power of the same field is zero.

That fact does **not** imply that the Hermitian pairing channel

\[
(\nu^c\nu^c)^\dagger(\nu^c\nu^c)
\]

vanishes. The conjugate field supplies independent Grassmann generators in the
classical path integral, and creation and annihilation operators are independent
in the operator algebra. Nor does the one-flavor result eliminate cross-flavor
pairs.

The earlier result was correct but narrower than the composite-condensate
question.

## 2. Exact Lorentz-scalar pair

For three left-handed sterile fields, define

\[
B_{ab}=\epsilon_{\alpha\beta}
\nu^{c\alpha}_a\nu^{c\beta}_b.
\]

Grassmann antisymmetry and spinor antisymmetry cancel, giving

\[
\boxed{B_{ab}=B_{ba}.}
\]

Thus the six operators

\[
B_{11},B_{12},B_{13},B_{22},B_{23},B_{33}
\]

span \(\operatorname{Sym}^2(\mathbb C^3)\). An explicit exterior-algebra
calculation proves that all six are nonzero and linearly independent.

For one flavor,

\[
B_{11}^2=0,
\qquad
B_{11}^\dagger B_{11}\ne0.
\]

This is the precise reconciliation with the one-generation quartic audit.

## 3. The invariant interaction exists

Under sterile flavor \(U(3)\),

\[
\nu^c\mapsto U\nu^c,
\qquad
B\mapsto UBU^T.
\]

The Frobenius norm is invariant:

\[
\operatorname{tr}(B^\dagger B)
\mapsto
\operatorname{tr}(U^*B^\dagger U^\dagger UBU^T)
=\operatorname{tr}(B^\dagger B).
\]

Therefore the local four-fermion channel

\[
\boxed{
\mathcal L_{\rm pair}
=G\operatorname{tr}(B^\dagger B)
}
\]

is Lorentz invariant, Standard-Model gauge invariant and \(U(3)\)-invariant.
It is also nonzero.

With the convention \(B-L(\nu^c)=+1\),

\[
B-L(B)=+2,
\qquad
B-L(B^\dagger B)=0.
\]

The interaction preserves \(B-L\). A condensate can break it spontaneously;
the Lagrangian need not break it explicitly.

## 4. Hubbard--Stratonovich field

Introduce a complex symmetric auxiliary field \(\Sigma_{ab}\) with
\(B-L=-2\). Componentwise, the algebraic Lagrangian

\[
\mathcal L_{\rm HS}
=-\frac1G\operatorname{tr}(\Sigma^\dagger\Sigma)
+\operatorname{tr}(\Sigma^\dagger B+B^\dagger\Sigma)
\]

has stationary equation

\[
\Sigma=GB.
\]

Eliminating \(\Sigma\) returns

\[
\mathcal L_{\rm HS}\longrightarrow
G\operatorname{tr}(B^\dagger B).
\]

This gives an exact field-theoretic meaning to the composite scalar of the
previous document. It does not make \(\Sigma\) elementary. A kinetic term can
emerge only after integrating fermion fluctuations and depends on the
regulator and ultraviolet completion.

## 5. What three flavors add

One flavor supplies one nonzero pair and a nonzero Hermitian norm, but three
flavors supply the full six-complex-dimensional order parameter. This makes
possible:

- the isotropic orbit \(U(3)/O(3)\);
- a primitive determinant-winding-one flavor vortex;
- the trace-plus-fiveplet split after isotropic locking;
- anisotropic splitting of the common-phase class-three vortex.

Three flavors therefore enlarge the topology and order-parameter geometry.
They are not required merely to make a norm-square quartic nonzero.

## 6. The sign is the real obstruction

Writing an invariant operator does not determine whether its coefficient is
attractive in the pairing channel. Even an attractive bare coefficient does not
prove condensation. A regulated four-dimensional gap equation has a
cutoff-dependent critical coupling, and other channels may win first.

The present corpus supplies no derivation of:

1. the sign of \(G\);
2. its magnitude relative to the compositeness scale;
3. a supercritical gap equation;
4. the full-rank isotropic minimum \(\langle\Sigma\rangle=vI_3\);
5. stability against Dirac Yukawa and exceptional flavor anisotropies.

These are dynamical questions, not representation-theory questions.

## 7. Audit of proposed sources

### 7.1 Mirror quartics

The seven one-generation holomorphic mirror quartics were selected to remove
accidental species phases. They do not contain
\(\operatorname{tr}(B^\dagger B)\), because that audit classified four
left-handed matter fields rather than a bilinear times its conjugate.

Adding the norm channel is compatible with the symmetries, but its coefficient
is new unless it is produced by a specified mediator or renormalization flow.

### 7.2 Exceptional cubic

If exceptional Jordan coordinates are themselves fermion bilinears, a cubic
norm is generically sixth order in fermions. It does not automatically reduce
to the quartic norm above. Such a reduction would require a background,
contraction or exchanged mode whose coefficient and sign can be computed.

### 7.3 TRO/Jordan products

Ternary closure identifies allowed composite maps, but algebraic closure alone
does not choose an action coefficient or an attractive Euclidean kernel. A
positive Jordan norm can become either sign in a Lorentzian interaction after
convention choices and mediator elimination. The physical sign must be derived
from a propagator or positive spectral representation.

## 8. Minimal dynamical routes

The branch now has three concrete routes:

1. **Exchange route:** identify an existing massive gauge-singlet bosonic mode
   coupling linearly to \(B\), then integrate it out and compute the induced
   sign and flavor tensor.
2. **Strong four-fermion route:** posit the invariant norm channel at a cutoff,
   derive its gap equation, and map the phase diagram including competing
   condensates.
3. **Exceptional background route:** show that a derived Jordan/exceptional
   background lowers the sixth-order invariant to this quartic with a fixed
   positive pairing coefficient.

The exchange route is the most falsifiable because it demands a named mediator,
kinetic sign and source map.

## 9. Relation to the Spin(2,3) programme

If \(\Sigma\) condenses isotropically, its \(O(3)\) trace/fiveplet decomposition
has the same dimensions as the external Jordan carrier's scalar plus spin-two
relationship split. This still does not identify sterile flavor with the
external carrier.

The missing bridge is a canonical intertwiner

\[
\operatorname{Sym}^2_0(\mathbb R^3)_{\rm sterile}
\longrightarrow
\operatorname{Sym}^2_0(\mathbb R^3)_{\rm relationship}
\]

that is produced by the action and respects gauge, CAR and causal-response
structures. If the same exchange kernel both makes \(G\) attractive and supplies
this intertwiner, the composite Majorana sector would become a genuine source
for the \(Spin_0(2,3)\) selector rather than a dimensional analogy.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** a named Furey/Jordan mediator produces
\(G\operatorname{tr}(B^\dagger B)\) with a calculable attractive sign above the
gap threshold, and the same source canonically locks the sterile traceless
fiveplet to the external relationship fiveplet.

**Operator falsifier:** the Hermitian norm is dismissed using the vanishing of
the holomorphic one-flavor fourth power. They use different Grassmann
generators and are not the same operator.

**Dynamics falsifier:** symmetry allowance or a Hubbard--Stratonovich rewrite is
reported as evidence of condensation.

**Source falsifier:** a free coefficient \(G\) is described as derived from the
Jordan or Furey algebra without a mediator, propagator, matching calculation or
renormalization condition.

**Locking falsifier:** the two five-dimensional representations are identified
solely because both are called fiveplets.

## 11. Pinned dependency and continuation

The operator-existence question is closed positively. The source question is
closed negatively for the currently explicit interactions.

Pin the branch at

\[
\boxed{\text{derive the sign, scale and source tensor of }G.}
\]

Continue in parallel by auditing the seven Furey gauge-singlet endomorphisms as
possible mediators, computing their allowed linear couplings to \(B\), and
checking whether a positive propagator induces attraction or repulsion.

## 12. Certificate

The [three-flavor sterile-pairing certificate](../../../verification/verify/verify_three_flavor_sterile_pairing_channel.mjs) constructs the twelve-generator exterior algebra explicitly, proves symmetry and rank six of the pair operators, distinguishes the vanishing holomorphic square from the nonzero Hermitian norm, and verifies the auxiliary-field completion and \(B-L\) charges.

## Companion documents

- [Sterile composite and \(U(3)/O(3)\) topology](360_no_existing_elementary_bminusl_two_singlet_but_the_sterile_symmetric_composite_has_u3_over_o3_topology.md)
- [One-generation mirror quartic audit](../0200-0299/242_maximal_mirror_quartics_leave_only_bminusl_before_majorana.md)
- [Exceptional Majorana phase](329_the_exceptional_cubic_phase_splits_dirac_completion_from_majorana_index_breaking.md)
- [Furey endomorphism-sector inventory](../0000-0099/73_furey_endomorphism_sector_inventory.md)
- [Full matrix vortex and primitive selector gate](358_the_full_matrix_vortex_has_index_three_but_the_primitive_rp2_defect_is_twisted.md)
