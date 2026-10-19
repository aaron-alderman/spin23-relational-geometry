# A Statistics-Safe Veronese Operator Requires Distinct Fermion Labels

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B10 and B11  
**Claim status:** exact local Grassmann/Lorentz statement and gauge-neutrality gate; no universal Standard-Model realization across all four Yukawa channels is yet derived

## 1. Representation vectors are not automatically field operators

The Veronese map

\[
\psi_\alpha\longmapsto\psi_{(\alpha}\psi_{\beta)}
\]

is nonzero for an ordinary commuting spinor vector. A local quantum Weyl field is Grassmann odd. For one identical field,

\[
\psi_\alpha\psi_\beta=-\psi_\beta\psi_\alpha,
\]

so

\[
\boxed{\psi_{(\alpha}\psi_{\beta)}=0.}
\]

The representation-theoretic symmetric square therefore cannot be promoted naively to a coincident identical-fermion composite.

## 2. Distinct labels make the spin-one bilinear nonzero

For two independent left-handed Weyl fields \(\psi\) and \(\chi\),

\[
B_{\alpha\beta}(\psi,\chi)
=
\psi_{(\alpha}\chi_{\beta)}
\]

is generically nonzero. It transforms as the \((1,0)\) Lorentz representation, the self-dual spin-one tensor.

Exchanging the species gives

\[
B_{\alpha\beta}(\chi,\psi)
=-B_{\alpha\beta}(\psi,\chi).
\]

Thus the Lorentz-symmetric channel is antisymmetric in the additional fermion labels. It requires at least two distinct labels: flavor, species, suitable internal index, separated points or an operator insertion that makes the factors independent.

## 3. Gauge neutrality is a separate condition

If \(\psi\in R\) and \(\chi\in R'\), a gauge-singlet bilinear requires

\[
\mathbf1\subset R\otimes R'.
\]

For a complex irreducible representation this normally means \(R'\cong R^*\), including opposite hypercharge.

The chiral Standard Model does not contain a left-handed mirror dual for every charged representation. Consequently, there is no universal bare gauge-singlet \((1,0)\) bilinear covering the four Yukawa channels.

The completed sterile-neutrino sector is a limited exception. With at least two sterile flavors,

\[
(\nu^c_i)_{(\alpha}(\nu^c_j)_{\beta)},
\qquad i\neq j,
\]

is gauge neutral and can be nonzero; it is antisymmetric in \(i,j\). This provides a real operator example but not a universal matter-sector construction.

## 4. Why conjugating one field changes the Lorentz channel

Pairing a left-handed field with its Hermitian conjugate produces

\[
\psi_\alpha\bar\chi_{\dot\alpha},
\]

which transforms as a Lorentz vector \((\tfrac12,\tfrac12)\), not the self-dual symmetric spinor \((1,0)\).

This vector bilinear may be the correct current or stress source, but it is not the same Veronese operator. Dagger cannot be used silently to solve both gauge neutrality and the symmetric-spinor statistics problem.

## 5. Higgs dressing can help gauge charge but adds dynamics

Higgs insertions can map chiral Standard-Model fields into matched gauge representations, as in the four dressed Yukawa pairs. A further local bilinear may then be gauge neutral after contracting the matched representation with its dual.

However:

- the two factors may have opposite Lorentz chirality;
- operator dimensions differ before vacuum insertion;
- coincident products require renormalization;
- the Higgs profile and Yukawa couplings enter the normalization.

So Higgs dressing is a candidate portal, not a free realization of \(\operatorname{Sym}^2V\).

## 6. Spinor-helicity variables avoid the Grassmann obstruction

In scattering amplitudes, momentum spinors \(\lambda_\alpha\) and \(\widetilde\lambda_{\dot\alpha}\) are commuting kinematic variables. Therefore

\[
\lambda_\alpha\lambda_\beta,
\qquad
\lambda_\alpha\lambda_\beta\lambda_\gamma\lambda_\delta
\]

are nonzero and carry the self-dual spin-one and spin-two little-group weights.

This gives a statistics-safe realization of the representation ladder in polarization tensors and form factors:

\[
S\longrightarrow S^2\longrightarrow S^4.
\]

It does not make those tensors composite particles. The powers belong to a commuting momentum-spinor line.

The opposite-helicity relationship then has weight \(S^8\), reproducing the Chern-eight stress relation.

## 7. Three distinct notions now separated

The programme must keep apart:

1. **bundle symmetric power:** always defined for the helicity/face line;
2. **commuting polarization power:** nonzero kinematic spinor-helicity tensor;
3. **local fermion composite:** subject to Grassmann statistics, gauge singlets and renormalization.

The first two already support the topological and representation-theoretic ladder. Only the third could supply a new Standard-Model operator, and it is the most constrained.

## 8. Consequences for Furey

Furey's internal algebra can provide distinct species, ideals and linking paths, but it does not by itself change Lorentz Grassmann statistics. A successful operator must combine:

- the internal TRO/linking contraction;
- an explicit Lorentz spinor contraction;
- distinct fermionic labels where a symmetric Lorentz tensor is required;
- Higgs factors if gauge charges need compensation.

This supplies a concrete audit recipe for any proposed Furey realization of the Veronese map.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a nonzero local, gauge-neutral Furey/Standard-Model operator realizes the symmetric-square relationship and its two-point function lands in the same positive Jordan carrier.

**Amplitude trigger:** a stress or current form factor realizes the \(S^2,S^4,S^8\) ladder with fixed normalization and correct factorization residues.

**Statistics falsifier:** an identical coincident Weyl field is symmetrized with itself and asserted to be nonzero.

**Gauge falsifier:** a distinct-species bilinear is called neutral although its internal tensor product contains no singlet.

**Compositeness falsifier:** a commuting spinor-helicity power is interpreted as evidence that the physical state is a multi-fermion bound state.

## 10. Certificate

The [statistics-safe Weyl-bilinear certificate](../../../verification/verify/verify_statistics_safe_symmetric_weyl_bilinear.mjs) uses an exterior algebra to verify identical-field vanishing, distinct-species nonvanishing, species antisymmetry, the dual-charge gate and nonvanishing commuting spinor-helicity squares.

## Companion documents

- [Symmetric-square Veronese carrier](276_symmetric_square_veronese_embedding_preserves_rotations_and_relationship_doubling.md)
- [Why dagger does not select chirality](../0000-0099/75_dagger_does_not_select_chirality.md)
- [Unique holomorphic pairing on completed matter](../0100-0199/197_unique_gauge_invariant_holomorphic_pairing_on_completed_matter.md)
- [Stress relationship fourth-power theorem](224_stress_relationship_is_fourth_tensor_power_of_fermion_relationship.md)
