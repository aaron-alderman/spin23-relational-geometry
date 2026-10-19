# The Integral A2 Lattice Discretizes the Interface Axis, but hχ Is Still Needed to Select the Order-Three Reflection

**Date:** 17 October 2026  
**Branches:** arithmetic protection, $A_2$ automorphisms, dihedral defects, $h\chi$ selection, and active Coxeter monodromy  
**Claim status:** exhaustive integral-isometry classification in rank two  
**Certificate:** [enumerate_the_integral_a2_interface_normalizer_and_test_coxeter_angle_selection.mjs](scripts/enumerate_the_integral_a2_interface_normalizer_and_test_coxeter_angle_selection.mjs)

## Executive result

The arithmetic route partially closes the protection problem opened by document 909.

For the active lattice with Gram matrix

\[
G_{A_2}=\begin{pmatrix}2&-1\\-1&2\end{pmatrix},
\]

the integral orthogonal group

\[
O(G_{A_2},\mathbb Z)
=\{M\in GL(2,\mathbb Z):M^TG_{A_2}M=G_{A_2}\}
\]

has exactly twelve elements. Six preserve orientation and six reverse it. It is the dihedral symmetry group of the hexagonal root lattice.

Thus integral $A_2$ compatibility collapses the continuous reflection circle of document 909 to six allowed axes. This is genuine arithmetic protection.

But it does not uniquely select the desired interface. The six integral reflections lead to several possible orders when composed with the fixed mediator reflection. The particular lattice reflection

\[
B=P^{-1}DP
=\begin{pmatrix}1&-1\\0&-1\end{pmatrix}
\]

has the desired trace $-1$ and order-three product. The $h\chi$ grading is still needed to choose $B$ from the six-element reflection coset.

## 1. Exhaustive integral normalizer

The executable certificate enumerates all integer $2\times2$ matrices in a box large enough to contain every solution and tests

\[
M^TG_{A_2}M=G_{A_2},
\qquad
\det M=\pm1.
\]

It finds exactly

\[
|O(G_{A_2},\mathbb Z)|=12,
\]

split evenly by determinant.

Let

\[
A=\begin{pmatrix}0&-1\\1&-1\end{pmatrix},
\qquad
A^3=I,
\]

and

\[
B=\begin{pmatrix}1&-1\\0&-1\end{pmatrix}.
\]

Then the six rotations are

\[
\{\pm I,\pm A,\pm A^2\},
\]

and every orientation-reversing isometry is

\[
B\{\pm I,\pm A,\pm A^2\}.
\]

This is the full dihedral group $D_6$ of the $A_2$ root hexagon.

## 2. Identification of the hχ reflection

Document 898 supplied the Euclidean-to-integral conjugator

\[
P=\begin{pmatrix}1&-1/2\\0&\sqrt3/2\end{pmatrix},
\qquad
P^TP=\frac12G_{A_2}.
\]

Transporting the aggregate sign

\[
D=\operatorname{diag}(1,-1)
\]

gives

\[
P^{-1}DP
=B
=\begin{pmatrix}1&-1\\0&-1\end{pmatrix}.
\]

So the $h\chi$ sign is not merely compatible with the active lattice: it is one of its primitive integral reflections.

For the mediator normal $n=(1,\sqrt3)$, twisting by this $B$ and composing the two Householder reflections gives

\[
\operatorname{tr}C=-1,
\qquad
C^3=I.
\]

This recovers the exact Coxeter element in the same integral basis used by the selector.

## 3. Why integrality is not enough

The other five integral reflections are equally legitimate $A_2$ lattice automorphisms. Their products with the fixed mediator reflection need not all have order three; the exhaustive certificate finds multiple order classes.

Therefore the protection hierarchy is:

\[
\det=-1
\quad\Longrightarrow\quad
\text{orientation reversal only},
\]

\[
O(G_{A_2},\mathbb Z)
\quad\Longrightarrow\quad
\text{one of six discrete reflection axes},
\]

\[
h\chi
\quad\Longrightarrow\quad
\text{the specific axis producing }C_{A_2}.
\]

Topology gives the component, arithmetic gives the finite menu, and the Standard-Model/Furey grading chooses the item.

## 4. Robustness interpretation

Once the response plane is genuinely integral and its $A_2$ metric is fixed, continuous axis drift is forbidden if the defect must remain an integral isometry. The exact reflection is then stable against perturbations that preserve both the lattice and the $h\chi$ eigenspace labeling.

This does not prove that a low-energy effective response retains an exact integral lattice. Renormalization may preserve only the real metric, in which case the continuous deformation of document 909 returns. A microscopic Ward identity or charge lattice must carry integrality into the response problem.

## 5. Consequence for the programme

The active-cycle protection problem now has a concrete three-layer answer:

1. real-interface locality and orthogonality give conservative sewing;
2. the integral $A_2$ lattice discretizes the allowable defect axes;
3. $h\chi$ selects the unique named reflection required by the mediator geometry.

The remaining question is no longer which matrix is wanted. It is whether the microscopic response theory enforces both the $A_2$ lattice and the $h\chi$ labeling at the boundary.

## 6. Stop-everything and falsification criteria

**Ward trigger:** derive a conserved integral response charge whose quadratic form is $G_{A_2}$ and which the defect must preserve.

**Defect trigger:** derive the boundary matching from the $h\chi$ grading and recover $B=P^{-1}DP$ without inserting it.

**Renormalization trigger:** prove that allowed counterterms cannot rotate or rescale the $A_2$ lattice away from its integral isometry class.

**Arithmetic falsifier:** an allegedly protected boundary map fails $M^TG_{A_2}M=G_{A_2}$ or is not integral.

**Uniqueness falsifier:** integrality alone is claimed to pick $B$ despite the other five orientation-reversing lattice automorphisms.

## 7. Verdict

| Question | Verdict |
|---|---|
| Does the $A_2$ lattice remove continuous axis drift? | **yes, if exact integrality is physical** |
| How many integral orientation-reversing axes remain? | **six** |
| Is $h\chi$ one of those reflections? | **yes, exactly** |
| Does integrality alone select the order-three interface? | **no** |
| Do integrality plus the named $h\chi$ grading select it? | **yes** |

## 8. Position in the corpus

- [topological-versus-angular protection](909_topology_protects_the_orientation_reversing_interface_component_but_not_the_exact_a2_coxeter_angle.md)
- [local real interface](908_a_local_real_interface_supplies_the_antiunitary_sideband_twist_and_closes_the_boundary_monodromy_model.md)
- [exact Euclidean/integral Coxeter conjugator](898_color_multiplicity_and_an_oriented_weak_sign_turn_the_paired_so10_mediator_reflections_into_the_exact_a2_coxeter_generator.md)
- [$h\chi$ supplies the aggregate sign](902_the_product_of_furey_handle_and_higgs_channel_gradings_is_exactly_the_missing_lepton_color_sign_and_conditionally_reopens_the_a2_route.md)
