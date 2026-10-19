# Ordinary Furey Cycle Homology Annihilates the Incidence-Selected Color Plane and Cannot Protect It

**Date:** 17 October 2026  
**Branches:** Furey ribbon topology, incidence-selected active lattice, color resolution, and topological protection  
**Claim status:** exact no-go for the existing sector-level graph; color-local-coefficient refinement remains open  
**Certificate:** [test_incidence_selected_active_lattice_against_furey_cycle_homology.mjs](../../../verification/test/test_incidence_selected_active_lattice_against_furey_cycle_homology.mjs)

## Executive result

The established six-arrow Furey graph cannot topologically protect the incidence-selected active lattice because it does not see it.

The selected basis vectors have zero total coefficient separately in every colored sector:

\[
\sum_{i\in u^c}v_i
=\sum_{i\in d}v_i
=\sum_{i\in u}v_i
=\sum_{i\in d^c}v_i
=0.
\]

The ordinary Furey graph replaces each multiplet by one sector arrow. Its aggregation map therefore sends the entire rank-two active lattice to zero.

Consequently the previously constructed genus-one and genus-two ribbon homologies protect color-singlet sector cycles, not the newly selected color-standard handle mode.

## 1. Sector aggregation

The punctured coordinate ordering consists of

\[
u^c(3)\oplus d(3)\oplus e\oplus u(3)\oplus\nu\oplus e^c\oplus d^c(3).
\]

The completed graph uses six arrows

\[
(Q,u^c,d^c,e^c,\nu^c,L),
\]

where

\[
Q=u\oplus d,
\qquad
L=e\oplus\nu.
\]

Let

\[
\pi_{\rm sec}:\mathbb Z^{15}\to\mathbb Z^6
\]

sum all components belonging to each sector arrow. The exact calculation gives

\[
\boxed{\pi_{\rm sec}(L_{\rm inc})=0.}
\]

This holds basis-independently because \(L_{\rm inc}\) lies in the augmentation-zero part of every colored orbit.

## 2. Why existing cycle classes cannot help

The completed graph's two cycles are

\[
c_C=(1,1,0,1,0,1),
\qquad
c_D=(1,0,1,0,1,1),
\]

with relative class

\[
c_C-c_D=(0,1,-1,1,-1,0).
\]

All lie in the six-arrow sector quotient. Any ordinary cycle, ribbon intersection or scalar edge holonomy constructed there factors through \(\pi_{\rm sec}\). It therefore annihilates \(L_{\rm inc}\).

The earlier topological carrier remains correct for its declared color-singlet cycle data. It simply lives at the wrong resolution to protect the active color-standard plane.

## 3. Required refinement

The minimal repair is to retain the three color sheets. Algebraically, replace a colored sector arrow by a module over

\[
\mathbb Z[C_3].
\]

Its canonical zero-sum submodule is the augmentation ideal

\[
\ker\!\left(
\epsilon:\mathbb Z[C_3]\to\mathbb Z
\right),
\qquad
\epsilon\!\left(\sum a_ig^i\right)=\sum a_i.
\]

This has rank two and is the natural topological home of a color-standard fluctuation.

Geometrically, one may use:

- a three-sheet color-resolved cover;
- ribbon homology with \(C_3\) local coefficients;
- a voltage graph;
- noncentral color edge transports before tracing.

## 4. Stop-everything and falsification criteria

**Positive local-coefficient trigger:** the color-resolved Furey ribbon has a canonical homology class with coefficient module equal to \(L_{\rm inc}\), and its intersection/sewing reproduces the active handle block.

**Holonomy trigger:** a non-Abelian edge transport has a color-standard component whose integral lattice is the incidence-selected one.

**Negative trigger:** every gauge-invariant refinement traces color before forming homology, again annihilating the augmentation ideal.

**Falsifier:** treating the existing sector-cycle classes \(c_C,c_D\) as the active incidence doublet. Their images and representation types differ.

## 5. Verdict

Ordinary Furey ribbon topology does not protect the active lattice:

\[
\boxed{
L_{\rm inc}
\subset\ker\pi_{\rm sec}.
}
\]

The topological branch must be reopened with color local coefficients rather than discarded.

## 6. Dependencies

- [incidence-selected integral mode](864_the_incidence_selected_code_doublet_is_integrally_conjugate_to_the_active_handle_c3_module.md)
- [two-cycle ribbon theorem](../0500-0599/580_the_two_furey_cycles_have_a_relative_holonomy_but_only_a_ribbon_twist_makes_them_symplectic.md)
- [genus-two matter-cycle sewing](../0400-0499/479_the_two_furey_matter_cycles_canonically_sew_the_planar_yukawa_ribbon_into_the_genus_two_sp4_carrier.md)

