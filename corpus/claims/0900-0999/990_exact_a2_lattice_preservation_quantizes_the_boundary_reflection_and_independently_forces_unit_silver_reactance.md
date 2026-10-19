# Exact A2 Lattice Preservation Quantizes the Boundary Reflection and Independently Forces Unit Silver Reactance

**Date:** 18 October 2026  
**Branches:** integral (A_2) lattice, boundary normalizer, rational-inner phase, Furey grading, and finite monodromy protection  
**Claim status:** exact arithmetic protection theorem conditional on physical lattice preservation  
**Certificate:** [classify_the_integral_a2_boundary_normalizer_and_its_silver_phase_quantization.mjs](../../../verification/classify/classify_the_integral_a2_boundary_normalizer_and_its_silver_phase_quantization.mjs)

## Executive result

Document 909 proved that topology alone cannot protect the exact Coxeter angle: the orientation-reversing component of (O(2)) is continuous. It proposed an arithmetic escape—require the boundary face to preserve the integral (A_2) lattice—but did not compute it.

That computation now closes.

For

\[
G_{A_2}=\begin{pmatrix}2&-1\\-1&2\end{pmatrix},
\]

the integral orthogonal normalizer

\[
O(G_{A_2},\mathbb Z)
=\{M\in GL(2,\mathbb Z):M^TG_{A_2}M=G_{A_2}\}
\]

has exactly twelve elements. It is the dihedral group (D_6): six rotations and six reflections. Every determinant-(-1) element satisfies

\[
\boxed{F^2=I,\qquad \operatorname{tr}F=0.}
\]

Hence every orientation-reversing integral boundary map has projective eigenvalue ratio exactly (-1). The continuous phase freedom is gone.

For the response family of document 989, the projective eigenphase difference is

\[
4\arctan k.
\]

Requiring the projectivized face to be an orientation-reversing integral (A_2) isometry therefore gives

\[
4\arctan k=\pi,
\]

whose unique positive solution is

\[
\boxed{k=1.}
\]

This supplies an independent arithmetic reason for the unit silver reactance. It is conditional on a new, sharply stated physical premise: the boundary response must preserve the integral placement/(A_2) lattice exactly.

## 1. Why the normalizer is finite

The norm-two vectors of the (A_2) lattice are

\[
\pm(1,0),\qquad
\pm(0,1),\qquad
\pm(1,1).
\]

An integral isometry permutes these six roots. Choosing the image of one root and a compatible second simple root produces twelve possibilities. Exhaustive integer solution of

\[
M^TG_{A_2}M=G_{A_2}

\]

confirms

\[
|O(G_{A_2},\mathbb Z)|=12.
\]

Its element-order distribution is

\[
1^1,\qquad 2^7,\qquad 3^2,\qquad 6^2,
\]

the distribution of the hexagonal dihedral group.

## 2. Orientation reversal becomes a reflection

In the continuous group (O(2)), determinant (-1) fixes only a connected component. After imposing integral (A_2) preservation, every such element has trace zero and square identity. Its eigenvalues are exactly ((+1,-1)).

Thus

\[
\text{topological orientation reversal}
+
\text{exact lattice preservation}
\Longrightarrow
\text{quantized reflection}.
\]

This answers the arithmetic trigger posed in document 909. The integral lattice pins both the allowed axes and the relative reflection phase.

## 3. The mediator faces are integral root reflections

Transporting the two Euclidean mediator Householder maps of document 898 through its whitening/orbit basis gives

\[
F_+=\begin{pmatrix}0&-1\\-1&0\end{pmatrix},
\qquad
F_-=\begin{pmatrix}1&0\\1&-1\end{pmatrix}.
\]

Both preserve (G_{A_2}), have determinant (-1), and square to identity. Their ordered product is

\[
F_-F_+
=\begin{pmatrix}0&-1\\1&-1\end{pmatrix}
=A,
\qquad A^3=I.
\]

The two physical face candidates are therefore not merely at the correct Euclidean angle. In the integral basis they are literal (A_2) lattice reflections whose product is the integral Coxeter action.

## 4. Arithmetic normalization of the response amplitude

For

\[
K(k)=k(-D),
\]

the two Cayley eigenvalues have projective ratio

\[
\rho(k)=e^{4i\arctan k}.
\]

A real reflection has ratio (-1). Exact membership of the projectivized face in the determinant-(-1) part of (O(G_{A_2},\mathbb Z)) therefore imposes

\[
\rho(k)=-1.
\]

For (k>0), this uniquely gives (k=1). The arithmetic boundary condition and the Coxeter phase condition of document 989 are the same equation reached from opposite directions:

- document 989 starts from desired finite monodromy;
- this theorem starts from preservation of the already-derived integral placement lattice.

That makes the normalization non-circular **if** exact lattice preservation follows independently from the physical boundary construction.

## 5. What remains unproved

The programme has established an integral (A_2) placement/environment lattice and an analytic two-face response. It has not yet proved that the physical face sewing acts as an exact automorphism of that lattice rather than merely on its real span.

Possible sources of exact preservation include:

- quantized placement charges;
- a boundary Hilbert module with the (A_2) root lattice as its charge lattice;
- a defect whose admissible transition functions are restricted to (O(G_{A_2},\mathbb Z));
- a categorical/groupoid action in which face traversal is already an integral morphism.

Until one is derived, arithmetic protection is a precise conditional mechanism, not a completed microscopic explanation.

## 6. Stop-everything and falsification tests

**Charge-lattice trigger:** the mediator or outgoing-port states carry quantized (A_2) charges and boundary scattering preserves them exactly.

**Groupoid trigger:** the three placement objects and face arrows form an integral groupoid whose active-plane representation is (O(G_{A_2},\mathbb Z)).

**Renormalization trigger:** all admissible counterterms preserve the integral lattice, preventing continuous drift of (k) away from one.

**Lattice-preservation falsifier:** the physical response mixes the active plane by a generic real or complex matrix not preserving (G_{A_2}) integrally.

**Topology overclaim:** determinant parity alone is used to infer (k=1) or exact order three.

**Projective-phase falsifier:** a claimed integral orientation-reversing face has projective eigenvalue ratio other than (-1).

## Verdict

| Question | Verdict |
|---|---|
| What is (O(G_{A_2},\mathbb Z))? | **A twelve-element dihedral group** |
| Are all integral orientation reversals actual reflections? | **Yes** |
| Do the mediator faces belong to it? | **Yes, after the established transport** |
| Does lattice-reflection membership force (k=1)? | **Yes, uniquely for (k>0)** |
| Does topology alone force this? | **No** |
| Is exact physical lattice preservation derived? | **Not yet** |

## Position in the corpus

- [topology-versus-angle no-go](909_topology_protects_the_orientation_reversing_interface_component_but_not_the_exact_a2_coxeter_angle.md)
- [integral mediator/Coxeter conjugacy](../0800-0899/898_color_multiplicity_and_an_oriented_weak_sign_turn_the_paired_so10_mediator_reflections_into_the_exact_a2_coxeter_generator.md)
- [Furey grading and scalar normalization](989_the_furey_higgs_product_grading_is_the_silver_reactance_direction_and_a2_monodromy_fixes_its_unit_amplitude.md)
- [trace-zero placement (A_2) environment](956_the_trace_zero_amplitudes_of_the_three_sublattice_holonomy_are_exactly_the_a2_environment_and_galois_doublet.md)
