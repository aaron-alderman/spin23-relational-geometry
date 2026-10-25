# Frontier Wave 7.109: The Z9 Twist Is a Discrete Screw, While a Double Helix Requires a Paired Completion

**Date:** 25 October 2026

**Status:** exact finite-extension and affine-action theorem; helix is a faithful Cayley embedding; physical double strand and topological dynamics remain conditional

**Certificate:** [discrete-screw verifier](../../../../verification/verify/verify_z9_discrete_screw_and_paired_twist_helix.mjs)

**Evidence packet:** [typed screw-extension record](../../../../evidence/data/z9-discrete-screw-and-paired-twist-helix-v1.json)

**Infographic:** [split, screw and paired-twist comparison in the Rodin role palette](assets/z9_twist_helix_infographic_rodin_palette.png)

**Alternate:** [earlier neutral-palette version](assets/z9_twist_helix_infographic.png)

## Result

The helix intuition has an exact algebraic core.  For the three Abelian
level-three twist classes

\[
K_p=\begin{pmatrix}0&3\\3&2p\end{pmatrix},
\qquad p=0,1,2\pmod3,
\]

let \(e_1,e_2\) denote the two integer generators of the discriminant group
\(A_p=\mathbb Z^2/K_p\mathbb Z^2\).  The column relations are

\[
3e_2=0,
\qquad
3e_1+2p e_2=0.
\]

They imply

\[
\boxed{
\begin{array}{c|c|c}
p&A_p&\text{lift of one three-step base circuit}\\ \hline
0&\mathbb Z_3\oplus\mathbb Z_3&3e_1=0\\
1&\mathbb Z_9&3e_1=+e_2\\
2=-1&\mathbb Z_9&3e_1=-e_2
\end{array}}
\]

Thus the split carrier closes after three horizontal steps.  Each non-split
carrier returns to the same base residue after three steps but lands on the
next fibre sheet; it closes only after nine.  The two nonzero classes have
opposite fibre displacement.  A spiral staircase is therefore a faithful
embedding of the *marked extension*, not an inference from visual
resemblance.

The double-helix picture is one step more conditional.  Orientation reversal
exchanges \(p=1\) and \(p=2=-1\), so the two classes can be drawn as
counter-wound helices.  They do not automatically coexist.  A physical
double strand requires a doubled theory, paired fixed planes, an
exchange/Real symmetry or another mechanism retaining both sectors.  Its
rungs require an additional mutual pairing or local intertwiner.

## 1. The finite screw as a cocycle

Write a state as a base coordinate and fibre coordinate

\[
(q,f)\in\mathbb Z_3\times\mathbb Z_3.
\]

For \(p\in\{0,1,2\}\), define the marked lift

\[
G_p(q,f)=
\left(q+1,\ f+p\,\delta_{q,2}\right)\pmod3.
\]

The fibre changes only when the base circuit crosses from \(q=2\) back to
\(q=0\).  Consequently

\[
G_p^3(q,f)=(q,f+p).
\]

For \(p=0\), \(G_0\) has order three and decomposes into three disjoint
three-cycles.  For \(p=1,2\), \(G_p\) has order nine and visits all nine
states in one cycle.  Reversing the lift sends \(p\mapsto-p\).

Equivalently, the central-extension cocycle can be represented by

\[
c_p(a,b)=p\left\lfloor\frac{a+b}{3}\right\rfloor\pmod3,
\qquad a,b\in\{0,1,2\}.
\]

The verifier exhausts all \(3^3\) associativity triples.  The zero cocycle
gives the product group; either nonzero marked class gives a cyclic group of
order nine with opposite chosen fibre orientation.

This finite \(H^2\)-extension description must not be conflated with the
\(H^3(\mathbb Z_3,U(1))\) cocycle defining the Dijkgraaf--Witten action.
Here it describes the resulting discriminant group's marked screw structure.
The earlier \(K\)-matrix classification is what joins the two.

## 2. What the two strands can mean

There are three distinct pictures, and the corpus should not merge them.

### 2.1 Split rails

For \(p=0\), the discriminant group is

\[
\mathbb Z_3\oplus\mathbb Z_3.
\]

The two order-three directions are independent.  This is a grid or torus
picture and supplies the two-qutrit exponent structure after both handle
cycles are included.  It is not a single nine-step staircase.

### 2.2 One screw rail

For \(p\ne0\), the extension is cyclic:

\[
\mathbb Z_9.
\]

The base and fibre are no longer independent directions.  A base circuit
translates the fibre, so one generator traverses the entire carrier.  The
helix depicts that non-splitting.

### 2.3 A paired screw

A doubled \(p\oplus(-p)\) system admits an exchange operation taking one
handed lift to the other.  Only then is the DNA-like double helix faithful.
The strands encode conjugate orientation sectors; they are not biological
DNA and do not imply molecular replication.  A rung is extra data such as:

- a nondegenerate intersection or charge--flux pairing;
- an exchange-equivariant local coupling;
- a reflection sewing condition between fixed planes; or
- a detector that interferes the two orientation sectors.

Without one of these, the two helices are merely juxtaposed copies.

There is nevertheless a canonical minimal emulator.  Fibre reflection

\[
R(q,f)=(q,-f)
\]

satisfies

\[
R^2=I,
\qquad
R G_{+} R^{-1}=G_{-}.
\]

Take two labelled copies of the nine-state carrier,

\[
\mathcal H_{\rm pair}=\mathcal H_+\oplus\mathcal H_-,
\qquad \dim\mathcal H_{\rm pair}=18,
\]

and define the strand exchange

\[
J|q,f,+\rangle=|q,-f,-\rangle,
\qquad
J|q,f,-\rangle=|q,-f,+\rangle.
\]

Then \(J^2=I\) and \(J\) commutes with the paired step
\(G_+\oplus G_-\).  This is the smallest exact double-helix controller.
A tunable rung pulse \(e^{-i\lambda J}\) creates even/odd strand
superpositions and makes the cross-strand coherence monitorable.  It is an
engineered emulator until a physical interface or defect derives \(J\) and
protects its phase.

## 3. The Rodin colours form the affine action around the staircase

Wave 7.108 isolated two different operations on \(\mathbb Z_9\).  Writing
the displayed digit \(9\) as residue zero, define

\[
T(n)=n+1,
\qquad
D(n)=2n
\pmod9.
\]

The blue sequence is the translation \(T\).  The red sequence is

\[
n\mapsto n+4=T^4(n),
\]

so the two apparent axes are not independent.  The yellow sequence is the
unit automorphism \(D\), and the green sequence is

\[
D^{-1}(n)=5n.
\]

They obey

\[
T^9=D^6=1,
\qquad
DTD^{-1}=T^2,
\qquad
D^3(n)=-n.
\]

Therefore they generate

\[
\operatorname{AGL}(1,\mathbb Z_9)
=\mathbb Z_9\rtimes(\mathbb Z_9)^\times,
\qquad |\operatorname{AGL}(1,\mathbb Z_9)|=54.
\]

This gives the colour coding a precise interpretation:

| colour role | algebraic operation | geometric reading |
|---|---|---|
| blue | \(T\) | advance one stair |
| red | \(T^4\) | advance four stairs on the same rail |
| yellow | \(D\) | relabel the rail by the doubling automorphism |
| green | \(D^{-1}\) | inverse relabelling |
| orange | invariant ideal \(\{0,3,6\}\) | the three aligned fibre sheets |
| magenta/cyan | opposite traversal of a constructed closed word | paired orientation, not a new generator |

The additive \(C_9\) staircase and multiplicative \(C_6\) colour orbit are
related by the affine semidirect product, but they are not the same cycle.

## 4. The corpus already contains the candidate rung

The completed Furey graph has two independent cycles but no intrinsic
intersection form.  Document 580 proves that aligned cyclic orders at its
two trivalent vertices thicken the graph to a once-punctured torus with a
nondegenerate intersection form, while opposite orders give a pair of pants
with zero intersection rank.

This supplies exactly the missing distinction:

\[
\boxed{
\text{two rails}
+\text{derived ribbon order}
\longrightarrow
\text{paired rails with a symplectic rung}.}
\]

It does not yet identify the Furey cycles with the \(p=\pm1\) twist sectors.
That requires a field-labelled intertwiner preserving the extension class,
orientation reversal and measured phase.

## 5. Dynamics and an executable discriminator

The helix becomes dynamical only after a step operator is implemented.  The
minimal nine-state benchmark uses the permutation \(G_p\) above.

| target | cycle decomposition | cubic return | ninth return |
|---|---|---|---|
| split \(p=0\) | \(3+3+3\) | \(G_0^3=I\) | \(I\) |
| right screw \(p=1\) | \(9\) | fibre shift \(+1\) | \(I\) |
| left screw \(p=2\) | \(9\) | fibre shift \(-1\) | \(I\) |

This can be realized in a nine-mode photonic, acoustic, microwave or qutrit
network.  Such a device tests the finite transport law, not fundamental new
physics.  The preregistered protocol is:

1. label the modes by \((q,f)\) and calibrate one application of \(G_p\);
2. prepare every basis mode and perform process tomography after one, three
   and nine applications;
3. test whether the cubic return is identity, \(+1\) fibre translation or
   \(-1\) fibre translation;
4. reverse the drive order and verify \(p\leftrightarrow-p\);
5. randomize the spatial layout while keeping the transition matrix fixed;
6. compare complex amplitudes, not populations alone, so the two
   orientations remain distinguishable.

For the doubled benchmark, insert a calibrated rung pulse
\(e^{-i\lambda J}\), sweep \(\lambda\), and measure the strand-exchange
characters \(J=\pm1\).  With \(\lambda=0\) the strands are merely parallel;
nonzero coherent splitting tests the added rung without confusing it with
the screw motion along either rail.

For a genuine topological realization, this permutation benchmark is
insufficient.  The \(K\)-matrix predicts for the primitive \(e_1\) line

\[
\theta_{e_1}=\exp\!\left(-\frac{2\pi i p}{9}\right),
\]

while the basic mutual charge--flux phase remains \(e^{2\pi i/3}\) for every
\(p\).  Thus:

- the mutual response does not distinguish the twist;
- self-statistics or an equivalent modular-\(T\) phase does;
- orientation reversal gives complex-conjugate modular data only together
  with its induced relabelling of the primitive line; in the fixed
  \(e_1\) basis the displayed \(p=1,2\) phases are not literal conjugates;
- an intensity-only or orientation-blind detector can collapse the pair.

The promotion experiment must therefore demonstrate protected braiding or
self-statistics, robustness to local deformations, and the appropriate gauge
constraint.  A nine-cycle alone can be ordinary engineered switching.

## 6. Platform ladder

The closest current platforms occupy different rungs and should not be
reported as equivalent.

| rung | available capability | what it could test | what it cannot establish |
|---|---|---|---|
| classical finite controller | nine coupled modes with programmable complex transfer | \(3+3+3\) versus \(9\) cycle structure and cubic fibre shift | quantum statistics or topological order |
| synthetic-frequency photonics | mode lattice, modulation phase, gauge potential and sharp synthetic boundary | screw transport, reversal and layout randomization with complex readout | a Dijkgraaf--Witten phase without a many-body gauge construction |
| digital qutrit/qubit circuit | exact permutations, coherent strand exchange and tomography | the 18-state paired emulator and rung pulse | protection against arbitrary local errors unless encoded |
| twisted-quantum-double code | cocycle-weighted gauge dynamics and logical Wilson operators | self/mutual phases and topological robustness | automatic identification with the corpus's matter labels |
| material screw defect | an actual spatial screw boundary condition and defect-bound spectrum | whether a geometric screw carries robust localized response | the \(\mathbb Z_9\) extension or its Dijkgraaf--Witten class without an explicit map |

Dynamically modulated ring resonators are therefore the shortest finesse
route to the *transport benchmark*.  General Abelian twisted-quantum-double
circuits are the correct theoretical route to the *topological benchmark*.
Experiments on physical screw dislocations are a valuable geometric control,
not evidence that the finite screw is literally a crystal defect.

## 7. Kill tests

**Drawing kill:** if changing only the 3D embedding changes the claimed
invariant, the helix was decorative rather than algebraic.

**Permutation kill:** observing \(G_p^9=I\) without a protected phase or
gauge constraint establishes a finite controller, not Dijkgraaf--Witten
order.

**Strand kill:** two counter-wound drawings do not establish a double sector;
an exchange symmetry and a cross-strand observable are required.

**Orientation kill:** populations cannot distinguish \(p\) from \(-p\) when
the readout forgets complex phase.

**Rodin kill:** the six-step doubling orbit cannot be identified with the
nine-step additive screw.  The former is an automorphism action on the
latter.

## Verdict

Retain exactly:

\[
\boxed{
\text{non-split }\mathbb Z_9\text{ discriminant group}
=
\text{three-step base loop plus fibre translation}.}
\]

Retain conditionally:

\[
\boxed{
p=\pm1
+\text{exchange/Real pairing}
+\text{mutual intertwiner}
\longrightarrow
\text{double-helix carrier}.}
\]

Do not yet promote either picture to physical spacetime, DNA, a material
helix or new electrodynamics.  The immediate useful target is a nine-mode
complex-amplitude benchmark followed, on a genuinely topological platform,
by the self-statistics test that separates \(p=0,+1,-1\).

## Sources and corpus anchors

- R. Dijkgraaf and E. Witten, [*Topological Gauge Theories and Group Cohomology*](https://doi.org/10.1007/BF02096988)
- D. Freed and F. Quinn, [*Chern--Simons Theory with Finite Gauge Group*](https://arxiv.org/abs/hep-th/9111004)
- [general Abelian Dijkgraaf--Witten circuit construction](https://arxiv.org/abs/2403.12119)
- [symmetries of Abelian Dijkgraaf--Witten theories](https://arxiv.org/abs/1404.6646)
- [synthetic dimensions from dynamically modulated ring resonators](https://arxiv.org/abs/1710.01373)
- [experimental synthetic-frequency boundaries](https://arxiv.org/abs/2203.11296)
- [experimental probe of fragile topology with a screw dislocation](https://arxiv.org/abs/2405.02057)
- [Z9 colour-centre reduction](../../../claims/1100-1199/1181_symplectic_reduction_by_the_gauged_colour_centre_takes_the_z9_lift_from_81_to_9_torus_states_and_descends_the_pairing_to_level_three.md)
- [twist and Smith classification](../../../claims/1100-1199/1182_only_the_untwisted_z3_defect_has_the_two_qutrit_exponent_module_and_the_bf_orbifold_projects_bulk_discrete_theta_out_of_the_zero_modes.md)
- [Furey ribbon-twist theorem](../../../claims/0500-0599/580_the_two_furey_cycles_have_a_relative_holonomy_but_only_a_ribbon_twist_makes_them_symplectic.md)
- [Rodin mod-nine orbit audit](frontier_wave7_108_rodin_coil_mod9_orbit_audit.md)
