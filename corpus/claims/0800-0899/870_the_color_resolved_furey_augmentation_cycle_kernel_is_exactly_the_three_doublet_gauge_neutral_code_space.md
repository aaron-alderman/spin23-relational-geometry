# The Color-Resolved Furey Augmentation-Cycle Kernel Is Exactly the Three-Doublet Gauge-Neutral Code Space

**Date:** 17 October 2026  
**Branches:** color-resolved Furey graph, local-coefficient homology, Standard-Model code, incidence selection, and integral topology  
**Claim status:** exact integral kernel identification; selection of one embedded augmentation copy still uses incidence  
**Certificate:** [compute_color_resolved_furey_augmentation_cycle_kernel_and_compare_to_code.mjs](../../../verification/compute/compute_color_resolved_furey_augmentation_cycle_kernel_and_compare_to_code.mjs)

## Executive result

Refining the Furey graph by its three color sheets recovers exactly the gauge-neutral color-standard deformation lattice of the punctured Standard-Model code.

Let

\[
I=\ker\!\left(\epsilon:\mathbb Z[C_3]\to\mathbb Z\right)
\]

be the rank-two color augmentation ideal. Assign an \(I\)-valued coefficient to each colored matter family

\[
u,\ d,\ u^c,\ d^c.
\]

Cycle closure at the three resolved \(O_2\) color vertices is

\[
\boxed{u+d-u^c-d^c=0\quad\text{in }I.}
\]

Therefore the local-coefficient cycle kernel is

\[
\boxed{
K_{\rm Furey}^{\rm aug}
\cong I^{\oplus3},
}
\]

of integral rank six.

Embedded in the fifteen punctured field coordinates, this is precisely the same primitive lattice as the color-standard part of the four-gauge-stabilizer kernel.

## 1. Color-resolved graph

Resolve the color vertex \(O_2\) into

\[
O_{2,1},O_{2,2},O_{2,3}.
\]

The colored arrows are

\[
\begin{aligned}
u_i &: H_5\to O_{2,i},&
d_i &: H_4\to O_{2,i},\\
u_i^c &: O_{2,i}\to C,&
d_i^c &: O_{2,i}\to D.
\end{aligned}
\]

The remaining arrows \(e,e^c,\nu,\nu^c\) are color fixed.

An augmentation coefficient has zero sum across the three sheets, so its boundary contribution at a fixed endpoint cancels. Only the resolved \(O_{2,i}\) boundary remains. At each sheet it gives

\[
u_i+d_i-u_i^c-d_i^c=0.
\]

Collecting all sheets gives the single \(I\)-valued equation above.

## 2. Integral parameterization

Choose arbitrary

\[
u,d,u^c\in I.
\]

Then

\[
d^c=u+d-u^c.
\]

Thus the kernel is freely parameterized by three augmentation coefficients:

\[
(u,d,u^c)\in I^3.
\]

No torsion or additional saturation is needed.

## 3. Equality with the code kernel

Embed these coefficients into the punctured five-bit coordinate ordering

\[
u^c(3),d(3),e,u(3),\nu,e^c,d^c(3).
\]

The resulting \(15\times6\) integer basis:

- has rank six;
- is annihilated by all four gauge-stabilizer rows;
- lies entirely in the color-standard isotypic component;
- has gcd-one maximal minors and is therefore primitive.

The independent code census already proved that the gauge-neutral color-standard space has real dimension six. Containment plus equal dimension proves equality over \(\mathbb Q\), while primitivity upgrades the comparison to the natural integral lattice:

\[
\boxed{
K_{\rm Furey}^{\rm aug}
=
K_{\rm code}^{\rm gauge,std}.
}
\]

This is a new exact Furey-graph/code intertwiner beyond the earlier five-bit grading.

## 4. Position of the incidence-selected plane

The rank-two selected lattice satisfies the same cycle equation and lies primitively inside this rank-six kernel:

\[
L_{\rm inc}\subset I^{\oplus3}.
\]

Topology therefore reconstructs the complete three-doublet candidate space found in document 861. It does not select the one distinguished copy.

The division of labor is now exact:

\[
\boxed{
\begin{aligned}
\text{color-resolved Furey topology}
&\Longrightarrow I^{\oplus3},\\
\text{Furey incidence + Hilbert--Schmidt metric}
&\Longrightarrow L_{\rm inc}\cong I.
\end{aligned}}
\]

## 5. Consequence for radiative protection

The full \(I^{\oplus3}\) kernel has a metric-independent integral definition as a local-coefficient cycle lattice. Interactions respecting the color-resolved graph boundary preserve this six-dimensional lattice even if they rotate the incidence eigenline inside it.

This separates two protection questions:

1. **topological protection of the three-doublet envelope:** supplied by the augmentation-cycle kernel;
2. **protection of the selected active copy:** still requires incidence-compatible dynamics or an additional topological class.

The exact integral handle module may rotate among the three augmentation copies without leaving the protected envelope.

## 6. Relation to the ordinary ribbon

Sector aggregation quotients

\[
\mathbb Z[C_3]\to\mathbb Z
\]

by augmentation. It retains the singlet and kills \(I\). That is why ordinary six-arrow homology annihilates the active plane.

The color-resolved calculation restores precisely the information lost under this quotient. No contradiction exists between documents 868 and 870; they analyze different coefficient systems.

## 7. Stop-everything and falsification criteria

**Selection trigger:** the ribbon intersection form, a local-coefficient torsion pairing or an oriented seam class selects the same diagonal \(I\subset I^3\) as \(E_{\rm inc}\).

**Protection trigger:** the interacting boundary operator preserves that selected \(I\), not merely the full \(I^3\) envelope.

**Sewing trigger:** one augmentation cycle and the Higgs-dressed neutrino complement acquire the unimodular alternating pairing of document 865.

**Negative trigger:** physically correct color transports change the local-coefficient boundary equation away from \(u+d-u^c-d^c=0\).

**Falsifier:** claiming ordinary sector homology already contains \(I^3\). The augmentation coefficient system is essential.

## 8. Verdict

The Furey and Standard-Model code branches now meet integrally at the complete gauge-neutral color-standard kernel:

\[
\boxed{
\text{color-resolved Furey cycle closure}
=
\text{punctured-code gauge neutrality}
=
I^{\oplus3}.
}
\]

The remaining nontrivial selection is \(I^3\to I\), already supplied algebraically—but not dynamically protected—by the incidence Laplacian.

## 9. Dependencies

- [ordinary sector-homology no-go](868_ordinary_furey_cycle_homology_annihilates_the_incidence_selected_color_plane_and_cannot_protect_it.md)
- [augmentation-ideal identity](869_the_incidence_selected_active_lattice_is_the_c3_augmentation_ideal_and_its_index_three_nonsplitting_explains_the_qutrit_shadow.md)
- [three-doublet code census](861_the_punctured_generation_code_contains_three_gauge_compatible_color_doublets_and_does_not_select_the_unique_handle_environment.md)
- [incidence selection](863_the_furey_incidence_laplacian_conditionally_selects_one_of_the_three_code_color_doublets.md)

