# The Compact-Group Coin Intertwiner Theorem

**Date:** 17 October 2026  
**Branches:** B03, B05, B11 and B13  
**Claim status:** exact finite-dimensional representation theorem and Standard-Model charge audit; dynamics and anomalies remain open

## 1. General statement

Let a compact gauge group (G) act on two face spaces by unitary representations

\[
\rho_L:G\to U(V_L),
\qquad
\rho_R:G\to U(V_R).
\]

An off-diagonal coin block (M:V_R\to V_L) is fixed and gauge invariant exactly when

\[
\boxed{\rho_L(g)M=M\rho_R(g)\quad\text{for all }g\in G.}
\]

Therefore (M\in\operatorname{Hom}_G(V_R,V_L)). If (V_L) and (V_R) are inequivalent irreducible complex representations, Schur's lemma gives

\[
\operatorname{Hom}_G(V_R,V_L)=0.
\]

This is the general form of the unequal-charge obstruction found in the Abelian walk.

## 2. Field-valued intertwiners

Let a local field (Phi(x)in\operatorname{Hom}(V_R,V_L)) transform as

\[
\boxed{\Phi\mapsto\rho_L(g)\Phi\rho_R(g)^{-1}.}
\]

Then the Hermitian block generator

\[
K_\Phi=
\begin{pmatrix}
0&\Phi\\
\Phi^\dagger&0
\end{pmatrix}
\]

transforms by conjugation on (V_L\oplus V_R). Consequently (C_\Phi=e^{-iK_\Phi}) is a unitary gauge-covariant coin.

This exact theorem does not require (Phi) to be elementary. It may be a Higgs field, composite, boundary order parameter or effective dressed operator.

## 3. Standard-Model audit

Use the convention in which the coin maps a conventional right-handed field into its left-handed partner. The required field representation is

\[
\operatorname{Hom}(V_R,V_L)\simeq V_L\otimes V_R^*.
\]

| channel | (V_L) | (V_R) | required doublet (Y) | field |
|---|---|---|---:|---|
| charged lepton | (L:(\mathbf1,\mathbf2)_{-1/2}) | (e_R:(\mathbf1,\mathbf1)_{-1}) | (+1/2) | (H) |
| Dirac neutrino, if present | (L:(\mathbf1,\mathbf2)_{-1/2}) | (N_R:(\mathbf1,\mathbf1)_0) | (-1/2) | (\widetilde H) |
| up quark | (Q:(\mathbf3,\mathbf2)_{1/6}) | (u_R:(\mathbf3,\mathbf1)_{2/3}) | (-1/2) | (\widetilde H) |
| down quark | (Q:(\mathbf3,\mathbf2)_{1/6}) | (d_R:(\mathbf3,\mathbf1)_{-1/3}) | (+1/2) | (H) |

In every row (V_L) and (V_R) differ as weak representations, so the bare fixed coin vanishes. In the quark rows the color factors match and the intertwiner uses the color identity, leaving a color-singlet weak doublet.

Thus the ordinary Higgs and conjugate Higgs are exactly the minimal field-valued coin representations required by the Standard-Model charges.

## 4. Relation to the Furey cyclic topology

The Furey TRO documents use left-handed conjugate fields and directed block arrows, whereas the table above uses conventional right-handed fields and a map (V_R\to V_L). Dagger and arrow orientation must therefore be converted before comparing labels.

After that conversion, the structural conclusions agree:

- the cyclic block rule selects (h_C) for the up chain and charged-lepton closure;
- it selects (h_D) for the down chain;
- no single elementary Furey block map closes every charged Yukawa relation;
- either two doublet components remain independent or a locking relation identifies one physical Higgs direction.

The coin theorem does not derive the cyclic-trace rule. It explains what that rule would mean dynamically: selection of the field-valued intertwiners allowed to mix propagation faces.

## 5. Flavor and normalization remain free

With three generations, the coin block is schematically (Phi_H\otimes Y_f), where (Y_f) is a complex flavor matrix. Gauge covariance fixes the representation of (Phi_H), but not:

- the entries or hierarchy of (Y_f);
- CKM or PMNS phases;
- the overall coin angle or mass normalization;
- the Higgs potential;
- whether the two Furey Higgs components are locked;
- how the Floquet (pi) sector transforms.

This preserves the earlier flavor-CP conclusion: real external face geometry cannot be extended indiscriminately over complex flavor space.

## 6. Precise bridge criterion

For a Furey matter TRO (mathcal M) to define the walk coins rather than merely label them, it must provide:

1. face modules (V_L,V_R\subset\mathcal M);
2. gauge link representations on each face;
3. a selected covariant subspace (W_H\subset\operatorname{Hom}(V_R,V_L));
4. a rule selecting one physical (Phi_H\in W_H) or its dynamical orbit;
5. compatible coins for every charged channel;
6. an action on both zero- and (pi)-quasienergy sectors;
7. anomaly-correct second quantization.

Items 1–3 are representation theory. Items 4–7 are the unresolved physical selection problem.

## 7. Stop-everything and falsification gates

**Canonical selection:** the surviving Furey topology and external Jordan real structure jointly reduce (W_H) to one normalized physical coin orbit.

**Predictive result:** that reduction constrains at least one Yukawa invariant beyond ordinary gauge symmetry.

**No-go:** every gauge-covariant coin necessarily includes the dagger-reverse mirror TRO or couples the zero and (pi) sectors into a vectorlike spectrum.

**Demotion:** the construction permits exactly the same arbitrary (Y_f) and Higgs operators as ordinary lattice gauge theory and adds no constraint from the Jordan carrier.

## 8. Certificate

The [Standard-Model coin-intertwiner certificate](../../../verification/verify/verify_standard_model_coin_intertwiners.mjs) checks weak dimension, color singlet and hypercharge difference for the charged-lepton, optional Dirac-neutrino, up-quark and down-quark channels, and verifies that no channel admits a bare fixed intertwiner.

## Companion documents

- [Gauge covariance of the null walk](148_gauge_covariant_null_walk_higgs_coin.md)
- [Cyclic Yukawa topology selection](111_furey_cyclic_yukawa_topology_selection.md)
- [Furey Higgs-doublet nonuniqueness](105_furey_higgs_doublet_nonuniqueness.md)
- [Real two-face carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
