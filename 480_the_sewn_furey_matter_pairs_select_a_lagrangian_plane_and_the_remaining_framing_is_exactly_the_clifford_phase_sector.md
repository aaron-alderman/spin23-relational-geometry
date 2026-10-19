# The Sewn Furey Matter Pairs Select a Lagrangian Plane, and the Remaining Framing Is Exactly the Clifford Phase Sector

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact integral homology and stabilizer calculation; physical longitude framing remains open

## 1. What the sewing actually fixes

Let the four planar Yukawa boundaries obey the oriented sewing relations

\[
[e]=-[u],
\qquad
[\nu]=-[d].
\]

The final matter boundary satisfies

\[
[m]=-[u]-[e]-[d]-[\nu]=0,
\]

as it must for the only boundary of a genus-two surface. The two seam circles define primitive meridians

\[
a_1=[u]=-[e],
\qquad
a_2=[d]=-[\nu].
\]

They are disjoint, so

\[
a_i\cdot a_j=0.
\]

Therefore the Furey matter pairing selects a primitive rank-two Lagrangian sublattice

\[
A=\operatorname{span}_{\mathbb Z}\{a_1,a_2\}
\subset H_1(\Sigma_{2,1},\mathbb Z).
\]

This is more precise than saying that the graph merely suggests two handles.

## 2. Closing arcs supply complementary longitudes

Choose planar arcs joining \(u\) to \(e\) and \(d\) to \(\nu\). After sewing, those arcs close to cycles \(b_1,b_2\). They can be arranged so that

\[
a_i\cdot b_j=\delta_{ij},
\qquad
b_i\cdot b_j=0.
\]

Then \((a_1,a_2,b_1,b_2)\) is a symplectic basis with matrix

\[
J=\begin{pmatrix}0&I_2\\-I_2&0\end{pmatrix}.
\]

The meridian plane is selected by the paired boundaries. The complementary longitudes depend on how the closing arcs wind through the sewn surface.

## 3. The full framing ambiguity

Hold \(a_1,a_2\) fixed and change the longitudes by

\[
B'=B+KA,
\]

where \(A=(a_1,a_2)^T\), \(B=(b_1,b_2)^T\). Direct substitution gives

\[
b_i'\cdot b_j'=K_{ji}-K_{ij}.
\]

Consequently the new frame is symplectic exactly when

\[
K=K^T,
\qquad
K\in\operatorname{Sym}_2(\mathbb Z).
\]

Thus the unresolved longitude framing is not an arbitrary \(Sp(4,\mathbb Z)\) freedom. Once the matter seams fix the Lagrangian plane, it is precisely the integral symmetric-shear subgroup.

## 4. Reduction modulo three recovers the phase gates

Modulo three,

\[
K=\begin{pmatrix}k_1&k_{12}\\k_{12}&k_2\end{pmatrix},
\qquad
k_1,k_2,k_{12}\in\mathbb F_3.
\]

There are \(3^3=27\) such framings.

- \(k_1\) is the first local quadratic phase;
- \(k_2\) is the second local quadratic phase;
- \(k_{12}\) is the mutual controlled phase.

The nine diagonal choices are the local phase subgroup. The two nonzero purely off-diagonal choices are a mutual gate and its inverse. This is exactly the phase sector found independently in the two-qutrit Clifford calculation.

In particular, the primitive sum-cycle twist has

\[
K_{a_1+a_2}=2
\begin{pmatrix}1&1\\1&1\end{pmatrix}
\pmod 3.
\]

Removing its two diagonal self twists leaves

\[
K_{\mathrm{mut}}=
\begin{pmatrix}0&2\\2&0\end{pmatrix},
\]

the unique nonzero mutual class up to inversion.

## 5. The ambiguity has become an operation

This changes the interpretation of the missing framing. It is not merely an unwanted convention. Different complementary longitudes are related by the very Dehn twists that act as logical phase gates.

The programme now separates three levels:

1. **matter factorization** selects the Lagrangian meridian plane;
2. **longitude framing** supplies the local and mutual Clifford shear sector;
3. **Fourier handle exchanges** complete the shear sector to the full finite \(Sp(4,\mathbb F_3)\) action.

The missing choice is physical only if the theory must prepare one preferred vacuum framing. As an operation algebra, the entire ambiguity is useful and controlled.

## 6. Orientation is still not selected

For either handle one may replace

\[
(a_i,b_i)\mapsto(-a_i,-b_i)
\]

without changing \(J\). The two handles therefore retain four independent sign choices. This is the homological form of the absolute determinant-line ambiguity: the sewing selects the meridian sublattice but not a preferred oriented generator of either seam.

The distinction is now sharp:

- the **symmetric shear** is an observable mapping-class operation;
- the **simultaneous sign reversal** is a basis orientation convention until coupled to an oriented microscopic line.

## 7. Claim ledger

- **Exact:** the paired Yukawa boundaries select a primitive rank-two isotropic meridian lattice.
- **Exact:** the remaining matter boundary is null-homologous after both sewings.
- **Exact:** symplectic longitude changes fixing the meridians are parameterized by \(\operatorname{Sym}_2(\mathbb Z)\).
- **Exact:** modulo three this is a 27-element shear group with two local and one mutual coordinates.
- **Exact:** the off-diagonal coordinate is the mutual Clifford phase class.
- **Exact:** four simultaneous handle sign choices preserve the symplectic form.
- **Candidate physical reading:** the paired matter cycles define logical \(Z\) meridians and closing arcs define logical \(X\) longitudes.
- **Open:** which microscopic operation prepares a framing and implements the sum-cycle twist.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the code puncture charges are identified with \(a_1,a_2\), while a source-derived surgery realizes \(B\mapsto B+K_{\mathrm{mut}}A\).

**Framing trigger:** a Higgs polar phase or determinant-line connection produces the integral symmetric matrix \(K\) rather than an arbitrary portal coupling.

**Symplectic falsifier:** a proposed longitude change has nonsymmetric \(K\) but is still called intersection preserving.

**Canonicity falsifier:** the matter pairing is said to select a full symplectic basis rather than only its meridian Lagrangian plane.

**Orientation falsifier:** the four handle sign choices are treated as physically distinct without an oriented microscopic observable.

## 9. Certificate

The [sewn matter-meridian framing certificate](scripts/verify_sewn_matter_meridians_select_a_lagrangian_plane_and_symmetric_shear_framing.mjs) verifies the boundary homology relations, proves the symmetric-matrix condition by exhaustive integral samples, counts the 27 mod-three framings, isolates the mutual coordinate and checks all four orientation signs.

## Companion documents

- [Matter-selected planar-to-genus-two sewing](479_the_two_furey_matter_cycles_canonically_sew_the_planar_yukawa_ribbon_into_the_genus_two_sp4_carrier.md)
- [Genus-two Weil/code equivalence](478_the_genus_two_a2_weil_representation_is_exactly_the_two_qutrit_clifford_carrier_and_derives_the_cross_gate_from_a_sum_cycle_twist.md)
- [Unique quadratic interface](464_there_is_a_unique_nontrivial_quadratic_interface_between_two_a2_qutrits_and_the_response_selects_its_class.md)
- [Domain-wall relative orientation transport](475_domain_wall_pfaffian_spectral_flow_can_transport_the_ribbon_sign_but_cannot_supply_its_absolute_octonion_sewing.md)
