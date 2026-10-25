# Literature review: the Monster order-23 programme channel

**Date:** 25 October 2026

**Scope:** primary literature bearing directly on the Golay cycle, Leech fixed
lattice, Monster \(23A/23B\) trace, Lorentzian grading plane, orbifold sectors,
defects and higher-genus completion

**Status:** literature and corpus synthesis; exact calculations are separately
certified by the [bridge verifier](../../../verification/verify/verify_moonshine_program_lattice_bridge.mjs)

## Review conclusion

The literature now supports an uninterrupted scalar chain

```text
Golay 23-cycle
 -> Leech order-23 fixed lattice
 -> discriminant -23 ideal theta series
 -> genus-zero 23+ theta/eta quotient
 -> Monster 23A/23B McKay-Thompson series
```

and a separate but compatible transition chain

```text
Monster 23AB symmetry
 -> anomaly-free cyclic orbifold
 -> 529 twist-charge sectors with q(a,b)=ab/23
 -> P(23) parafermion subalgebra
 -> finite Fourier transform and non-invertible duality defect.
```

The finite quadratic module in the second chain is the discriminant form of
\(U(23)\), so both chains meet the same hyperbolic plane that grades the
Monster Lie algebra and embeds diagonally in \(H_2(\mathbb R)\).  What remains
unknown is no longer whether a bridge exists.  It is whether a declared
orientation can be retained by defect data and genus-two sewing, and whether
any of this chiral two-dimensional structure has a source-derived
four-dimensional physical interpretation.

## Source-by-source findings

| source | established object/result | use here | hard boundary |
|---|---|---|---|
| Conway--Norton (1979) | Monster classes and genus-zero McKay--Thompson predictions | identifies the common \(23A/23B\) Hauptmodul and replication target | conjectural in the original paper; later proof uses VOA/Monster Lie algebra |
| Breuer--Magaard--Wilson (2026) | independently verifies Monster conjugacy classes, Sylow normalizers and power-map data; order 23 has two generator orbits and normalizer quotient of order 11 | grounds the QR/QNR and inversion interpretation of \(23A/23B\) | the A/B names still require a representative convention |
| ATLAS class table plus the order-23 centralizer and anomaly-transgression audits (2026 corpus calculations) | \(C_{\mathbb M}(g)\cong C_{23}\times S_4\); five insertion types exhaust scalar traces, while coprimality makes the twisted projective class trivial | exhausts the full genus-one centralizer representation up to isomorphism | cross-grade VOA products and genus-two relations are not supplied |
| Borcherds (1992) | Monster Lie algebra graded by \(II_{1,1}\), denominator product and Hecke recursion | makes “lattice-like formula” literal and supplies the integral hyperbolic carrier | does not identify \(II_{1,1}\) with spacetime or real-time evolution |
| Paquette--Persson--Volpato (2016--17) | Monstrous CHL models interpret \(T_g\) as spacetime BPS indices, their invariance groups as T-dualities and \(\mathfrak m_g\) as spontaneously broken gauge-symmetry algebras | supplies a genuine physical carrier in which the root grades are winding and momentum and \(Z_{g,1}(T,U)=(T_{1,g}(T)-T_{g,1}(U))^{24}\) | compactification is effectively \(0+1\)-dimensional and treated at zero string coupling because of gravitational-anomaly subtleties; it is not laboratory evidence or a four-dimensional lift |
| Kondo--Tasaka (1986) | fixed Leech sublattice theta quotients for \(M_{24}\) automorphisms are genus-zero functions; cycle shape \(1\,23\) maps to \(23+\) | closes the order-23 Leech-theta/Hauptmodul bridge | a scalar function does not retain the oriented generator |
| Höhn--Mason (2016) and Lam--Shimakura | classification of Leech fixed lattices; order-23 fixed lattice has rank two and Gram \(\left(\begin{smallmatrix}4&1\\1&6\end{smallmatrix}\right)\); the two order-23 lattice classes generate conjugate cyclic subgroups | fixes the exact lattice, determinant and lift ambiguity | conjugate subgroups do not canonically label Monster \(23A\) versus \(23B\) |
| Beneish et al. (2024) | code--lattice fixed theta quotients, replicability and lift/order-doubling criteria | confirms that code automorphisms can generate replicable modular outputs through fixed sublattices | replicability alone is not a VOA isomorphism or dynamics |
| Akbary--Totani (2025), revisiting van der Blij | the three discriminant-\(-23\) forms and the exceptional identity \(\Theta_{[1,1,6]}-\Theta_{[2,1,3]}=2\eta\eta_{23}\) | supplies the exact principal/nonprincipal class arithmetic beneath the Leech quotient | inverse oriented classes have equal scalar theta series |
| Johnson-Freyd (2019) | the Moonshine anomaly has exact order \(24\) | proves by coprime-order restriction that the \(C_{23}\) channel is anomaly-free | absence of an anomaly does not construct the desired intertwiner |
| Carnahan (2017--2021) | generalized moonshine, Hecke-monicity and cyclic-orbifold duality | supplies the rigorous twisted-sector/Hecke language | the “51 constructions” Leech theorem assumes fixed-point-free automorphisms; the coordinate 23-cycle has a rank-two fixed lattice and is not covered by that theorem |
| Volpato (September 2026 preprint) | every Fricke non-anomalous Monster symmetry is self-orbifold; \(P(N)\) embeds; a Tambara--Yamagami duality defect exists; list includes \(23AB\) | supplies the current-frontier \(P(23)\), twist--charge and finite Fourier channel | commutant rationality and the full dual-pair property are not proved in general; physical spacetime meaning is absent |
| Honda--Kaidi--Orii (2026) | conditional parafermionic decomposition gives \(\operatorname{Rep}(\mathfrak{so}(3)_p)\) defects; nontrivial defect series have invariance group \(\Gamma_1(p+2)\) | at \(p=23\), predicts a 12-line refinement governed by positive-genus \(\Gamma_1(25)\) | the stronger rational-CFT decomposition is assumed for general \(p\), and explicit character tables are only given for \(p=3,5,7\) |
| Tuite; Mason--Tuite; Gilroy--Tuite | genus-two sewing for meromorphic, lattice, bosonic and VOA correlators | supplies the analytic machinery for the next order-23 sewing calculation | no sourced \(23AB\)-twined genus-two Monster amplitude was located |
| Gaberdiel--Volpato (2009) | for \(c\leq24\), genus one fixes untwined vacuum amplitudes through genus four; some theories first separate at genus five | proves that low-genus untwined partition functions are lossy program checksums | inserted, twined and defect data can still distinguish theories |
| Lin--Shao (2019) | \(2A\) fermionization and Monster duality defect via free Majorana times fermionic Baby Monster | supplies the separate ten-even-spin seam candidate | it is the \(2A\) branch, not the \(23AB\) branch; a junction is still missing |
| Lin (2022) | topological-modularity divisibility constraints for symmetric and Monster-subgroup orbifolds | confirms that Monster orbifold data has topological consistency tests beyond scalar coefficients | studies CFT/orbifold invariants, not a microscopic Leech-edge Hamiltonian |
| Harvey--Moore (2020) | code and quantum-error-correction structures organize special sporadic-symmetry CFTs | supports the use of protected code spaces as implementation language for moonshine-adjacent CFTs | its explicit code constructions concern the Conway and K3 models, not a laboratory realization of \(V^\natural\) |

A targeted literature refresh on 25 October 2026 found strong adjacent work
on Monster orbifold consistency, duality defects, code/CFT correspondences and
generic orbifold coupled wires, but did not locate a published microscopic
spin, qubit, electronic, photonic or superconducting Hamiltonian whose edge
has been shown to flow to \(V^\natural\). The corpus constructions below
therefore remain a proposed compilation route, not a rediscovery claim about
an existing device.

## Exact synthesis with the corpus

### 1. Finite-field rail

The cyclic Golay generator and its reciprocal split the nontrivial
\(23\)-rd roots over \(\mathbb F_2\) into the quadratic-residue and
nonresidue orbits.  Multiplication by \(5\) exchanges the orbits.  Rule 60
\(T=1+\sigma\) has a genuine order-\(23\) component
\(T^{89}=\sigma^2\), but its order-\(89\) residue prevents \(T\) itself
from being a Monster group element.

### 2. Quadratic-field rail

The complex Gaussian periods of those two residue orbits satisfy

\[
\alpha+\bar\alpha=-1,\qquad
\alpha\bar\alpha=6,
\]

and therefore generate \(\mathbb Q(\sqrt{-23})\).  The Leech fixed
quadratic form is the normalized norm form of a nonprincipal norm-two ideal:

\[
Q_+(a,b)=2a^2+ab+3b^2
=\frac{N(2a-b\alpha)}2.
\]

The two nonprincipal oriented ideal classes are inverse.  Orientation reversal
identifies their ordinary theta series, exactly matching the loss of the
\(23A/23B\) label in the scalar McKay--Thompson series.

The relation is stronger than a matched pair.  The two degree-eleven factors
of \(\Phi_{23}\) over \(\mathbb F_2\) define the two residue-degree-eleven
primes over \(2\) in \(\mathbb Q(\zeta_{23})\).  The verifier reduces the QR
Gaussian period on the two factors and obtains \(0\) and \(1\).  Their
contractions to \(\mathbb Q(\sqrt{-23})\) are consequently
\((2,\alpha)\) and \((2,\alpha+1)\), the conjugate norm-two ideal classes.
This closes the oriented finite-field-to-ideal arrow relative to a declared
primitive root.  Only the final convention assigning the lifted generator to
the Monster name \(23A\) or \(23B\) remains.

The normalizer clarifies that this last residue is not a hidden invariant.  Its
order-11 action is the square subgroup of \(\mathbb F_{23}^{\times}\), so the
two Monster classes are the QR and QNR generator orbits.  Because \(-1\) is a
nonresidue modulo \(23\), inversion exchanges them.  An A/B assignment is
therefore an orientation convention on a generator, while the cyclic subgroup
and all inversion-invariant scalar traces necessarily forget it.

### 3. Modular-output rail

The fixed lattice and oscillator determinant give

\[
\frac{\Theta_{Q_+}}{\eta\eta_{23}}-1
=T_{23A}=T_{23B}.
\]

The verifier checks this through \(q^{30}\), the discriminant-\(-23\)
theta/eta identity through \(q^{40}\), and the second replication identity
through \(q^{15}\).  The published modular theorems promote the finite checks
to established analytic identities; the checks protect the corpus's chosen
normalizations and conventions.

### 4. Defect/transition rail

For the \(23AB\) Monster self-orbifold, the modules \(V_{a,b}\) carry

\[
q(a,b)=\frac{ab}{23}\pmod1,
\qquad
\(a,b\)\in\mathbb Z_{23}^2.
\]

This is the discriminant form of \(U(23)\).  The modular action contains the
quarter-turn \(S(a,b)=(b,-a)\); the duality defect exchanges the axes; and the
Fourier bicharacter \(e^{2\pi iak/23}\) maps twist sectors to charge sectors.
This is a genuine compositional/transition mechanism in the VOA, rather than
an analogy based only on matching numbers.

The two relevant transformations close exactly.  Orientation exchange acts by
\(D_5=\operatorname{diag}(5,5^{-1})\), while the modular quarter-turn is
\(S:(a,b)\mapsto(b,-a)\).  Their relations
\(D_5^{22}=1\), \(S^2=D_5^{11}=-I\), and
\(SD_5S^{-1}=D_5^{-1}\) generate \(\mathrm{Dic}_{11}\) of order 44 inside
\(SL(2,23)\).  This supplies an exact finite transition skeleton joining the
QR/QNR swap to the twist/charge rotation; its physical interpretation remains
open.

Projectivizing the nonzero sector labels removes the central \(-I\), so the
dicyclic group descends to \(D_{11}\) of order 22 on
\(\mathbb P^1(\mathbb F_{23})\).  The 24 directions split into the two-axis
orbit and one 22-direction mixed orbit.  This quotient is useful precisely
because it exposes the lost datum: the dicyclic lift distinguishes a central
sign that the dihedral/projective record cannot retain.

It also has a precise finite Spin adjacency:
\(SL(2,23)=Sp(2,23)\) embeds as a symplectic block in
\(Sp(4,23)\cong Spin(5,23)\).  The latter has the same algebraic
\(C_2/B_2\) type as \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).  This does not
preserve or recover the real signature, cone or time orientation, so it is an
arithmetic bridge rather than a physical spacetime derivation.

### 4.1 The scalar Fourier refinement is exhausted

For a fixed order-23 generator, all nonidentity powers have the same scalar
trace \(T_{23A}=T_{23B}\).  The untwisted charge projections are consequently

\[
C_0=(J+22T_{23})/23,\qquad C_{b\ne0}=(J-T_{23})/23.
\]

The first terms are \(C_0=q^{-1}+8564q+934518q^2+\cdots\) and
\(C_{b\ne0}=8560q+934511q^2+\cdots\).  There are not twenty-three distinct
scalar outputs: there are only two.  This is an exact no-go for extracting the
quadratic-residue/nonresidue orientation by Fourier-projecting the already
known McKay--Thompson series.

The parafermionic route uses strictly more data.  Volpato's formulas first
Fourier-transform the full twisted--twining table, then recover commutant
characters from an \(su(2)_{23}\) character decomposition.  Honda--Kaidi--Orii
show that, under their stronger general-\(p\) decomposition, the associated
defect functions have invariance group \(\Gamma_1(25)\).  The modular curve
\(X_1(25)\) has genus \(12\), so a class-sensitive result should not be
expected to collapse to a single Hauptmodul.  At \(p=23\),

\[
c_{P(23)}=44/25,\qquad c_{\mathrm{Com}}=556/25,\qquad
\operatorname{rank}\operatorname{Rep}(\mathfrak{so}(3)_{23})=12.
\]

The genus \(12\) happens to equal the rank \(12\) of
\(\operatorname{Rep}(\mathfrak{so}(3)_{23})\).  This is an exact numerical
coincidence, not an established correspondence: the former counts
holomorphic differentials and the latter simple defect types.  This locates
the missing “program”: it is a vector of defect/commutant
characters assembled from the 529 twist--charge sectors, not another scalar
eta quotient.  The literature supplies the algorithm but not a published
explicit \(p=23\) coefficient table.

A modular-orbit audit narrows that omission substantially.  All 528 nonzero
labels form one \(SL_2(\mathbb F_{23})\) orbit, while the
\(\Gamma_0(23)\)-invariance of the scalar Hauptmodul collapses them to the 24
directions of \(\mathbb P^1(\mathbb F_{23})\), each with multiplicity 22.
Together with the non-anomalous normalization
\(h(V_{a,b})=ab/23\pmod{\mathbb Z}\), modular covariance therefore gives a
functional prescription for every twisted--twining entry from \(T_{23}\).
Fricke invariance gives the mixed branches as
\(T_{g^a,g^b}(\tau)=T_{23}((\tau+ba^{-1})/23)\).  The Fourier transform then
keeps precisely the coefficients \(c(n)\) with \(n\equiv ab\pmod{23}\).
Thus all 529 module characters reduce to 23 twisted product-residue types and
the two untwisted characters.  Executing Volpato's equation (2.33) then gives
positive first terms for all twelve even-\(l\), \(t=0\) commutant characters;
the vacuum begins \(q^{-139/150}(1+1878q^2+150556q^3+\cdots)\), matching
\(-c_{\mathrm{Com}}/24\). Direct assembly gives
\(Z^{\mathcal N}_{23}/\sqrt{23}=q^{-1}+2+2446q+115834q^2+2446684q^3+
33295322q^4+\cdots\). The scalar trace is invariant under fifth-power
orientation exchange because every input character depends only on the
preserved product \(ab\). What remains is a refined insertion or genus-two
record, not 529 independent source functions.

The 22 nonidentity powers of a chosen order-23 generator also form eleven
inverse pairs, transitively cycled by fifth power; adding the identity gives
another exact \(1+11=12\) decomposition.  This makes the count less arbitrary
without supplying the missing map from generator pairs to defect objects.

An exact survey over the odd Monster primes makes the coincidence sharper:
\(p=23\) is the unique member for which
\(g(X_1(p+2))=(p+1)/2\).  The genus lies below the defect rank for the smaller
Monster primes and above it for every larger one.  This is recorded as a
signpost only; no mathematical identification between those two 12-element or
12-dimensional structures is presently known.

### 5. Spin(2,3) relation

The unscaled lattice \(U=II_{1,1}\) embeds as the diagonal integral plane in
\(H_2(\mathbb R)\), whose conformal group is \(Sp(4,\mathbb R)\cong
Spin_0(2,3)\).  Scaling to \(U(23)\) and taking the discriminant group produces
the finite order-23 twist--charge plane.  Thus the continuous carrier, Monster
Lie grading and finite defect channel share one quadratic architecture:

\[
mn\quad\longrightarrow\quad \frac{ab}{23}\pmod1.
\]

This remains a kinematic/arithmetic descent.  No continuous Monster action,
four-dimensional field equation or physical clock follows.

### 5.1 Direct Griess--Jordan relation

The diagonal \(II_{1,1}\) bridge is not the only contact. Griess records that
if \(C\) is the centralizer of a Monster \(2B\)-involution, the fixed points of
its extraspecial normal subgroup \(O_2(C)\) in the 196,884-dimensional unital
Griess algebra form the 300-dimensional Jordan algebra

\[
 (B^\natural)^{O_2(C)}\cong\operatorname{Sym}_{24}(\mathbb R).
\]

Every declared principal two-corner is a product-preserving copy of
\(H_2(\mathbb R)\). The corpus certificate checks its Jordan identity, triple
product and ten-dimensional TKK closure
\(\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3)\). This is a direct
weight-two VOA-product bridge and does not pass through a conjectural
\(E_8\to\mathbb M\) map.

It is an existence theorem, not a physical selector. There are
\(\binom{24}{2}=276\) coordinate two-corners and a continuous family of general
rank-two choices. A laboratory or dynamical realization must derive the fixed
sector and mark one corner on the same carrier. Moreover, the TKK group is a
continuous prolongation of that selected corner, not a subgroup of the finite
Monster group. See [Wave 7.116](../frontier/wave-7/frontier_wave7_116_monster_griess_jordan_corner_to_spin23.md).

### 5.2 The Ising-pair affine-E8 atlas

McKay's extended-\(E_8\) observation has a precise operator-algebraic form.
Lam--Yamada--Yamauchi construct the node-labelled subalgebras, and Sakuma's
theorem classifies the nine positive two-Ising-vector possibilities. In the
Moonshine VOA an Ising vector defines a Monster \(2A\) Miyamoto involution.
For a pair \(e,f\), the order and class of \(\tau_e\tau_f\), together with
the normalized overlap \(\langle e,f\rangle\), identify one of the nine
Norton--Sakuma algebras. Their product orders

\[
(1,2,3,4,5,6,4,2;3)
\]

are the affine-\(E_8\) marks and obey the affine Cartan null relation. This
is therefore an exact \(E_8\)-shaped atlas of physical conformal-field
operators, not merely a numerical resemblance.

The type statement also supplies its own no-go boundary. Since
\((V^\natural)_1=0\), the Moonshine VOA has no weight-one currents generating
an affine \(\mathfrak e_8\) current algebra. The diagram classifies finite
pair composition; it is not evidence for 248 conserved currents or an
\(E_8\) gauge group. The executable certificate reconstructs the rank-eight
affine Cartan matrix and shows why overlap alone is insufficient: the
\(3C\) and \(4B\) types both have overlap \(1/256\) but different return
orders. See [Wave 7.117](../frontier/wave-7/frontier_wave7_117_monster_ising_pair_affine_e8_operator_atlas.md).

### 5.3 The order-46 connected benchmark

The common order-46 carrier does not automatically couple its order-2 and
order-23 parts. Since the factors are coprime,
\(H^3(C_{46},U(1))\cong\mathbb Z_2\oplus\mathbb Z_{23}\); the mixed
Kunneth term is trivial. A cyclic anomaly therefore cannot distinguish a
genuinely joined carrier from independent topological factors.

The normalized connected trace

\[
R(g,z;\tau)=\frac{Z(g,z;\tau)Z(1,1;\tau)}
{Z(g,1;\tau)Z(1,z;\tau)}
\]

does make that distinction: it is exactly one for a tensor product. The
anomaly-free order-46 modular transport and the Ford--McKay--Norton
eta-quotient formulas give the phase-convention-independent magnitudes
\(|R_{46AB}(i)|=0.00373794542221053\) and
\(|R_{46CD}(i)|=0.0784643601781287\). These are genus-one Monster-CFT
benchmarks rather than fitted laboratory numbers. A physical carrier must
implement all four traces in one calibrated modular frame. See
[Wave 7.120](../frontier/wave-7/frontier_wave7_120_order46_connected_ratio_numerical_benchmark.md).

The closest one-Hamiltonian carrier does not yet satisfy that requirement.
The root-of-unity XXZ chain realizes the \(Z_{23}\) TY fusion algebra with a
physical flux twist and an explicit duality MPO, but the authors leave its
associator undetermined. Its natural spin-flip extension is dihedral and has
no order-46 element. A finite interacting \(C_{23}\times C_2\) control can be
tuned to the \(46CD\) value at \(\tau=i\), but it fails the independently
computed Monster curve at \(0.8i\) and \(1.2i\). This supplies an executable
generic-interaction rival rather than promoting the XXZ carrier to Monster
provenance. See [Wave 7.122](../frontier/wave-7/frontier_wave7_122_xxz23_physical_dictionary_and_order46_gap.md)
and [Wave 7.123](../frontier/wave-7/frontier_wave7_123_one_hamiltonian_order46_toy_and_heldout_rejection.md).

The physical modulus is now fixed rather than borrowed from the finite toy.
For the published XXZ normalization,
\(v=23\sin(\pi/23)=3.1318329292136715\) and
\(\tau=iv\beta/L\). Thus the \(L=46\) Monster checkpoints require
\(\beta=11.7503,14.6879,17.6255\), with proportional scaling at
\(L=92,138\). A 54-cell MPS/MPO convergence grid, independent velocity-lock
gate and resource floor are specified in
[Wave 7.125](../frontier/wave-7/frontier_wave7_125_xxz23_aspect_ratio_and_tensor_network_protocol.md).
The same audit exposes a categorical boundary: the XXZ--Ising ladder has
\(c=3/2\), so even exact trace agreement cannot make it the \(c=24\)
Monster CFT.

The strongest provenance route instead uses a theorem. The Moonshine VOA has
a frame of 48 Ising \(c=1/2\) factors, and a holomorphic framed VOA with
\(c=24\) and \(V_1=0\) is isomorphic to \(V^\natural\). This reduces a
physical proof to a local realization of the code extension plus measurable
frame, holomorphicity and spectrum gates. The tempting realization of order
23 as two 23-cycles on the frame fails exactly for the distinguished
Moonshine code: its \(1/16\)-code has dimension 7, whereas the smallest
nontrivial binary \(C_{23}\)-module has dimension 11, and its 48 generator
columns are distinct. Hence no order-23 coordinate permutation stabilizes
that frame. The operator must change frames or act nonlocally through the
extension. See [Wave 7.126](../frontier/wave-7/frontier_wave7_126_framed_ising_route_to_a_physical_monster.md)
and [Wave 7.127](../frontier/wave-7/frontier_wave7_127_moonshine_frame_order23_permutation_no_go.md).

The formal physical-realization question has a shorter exact answer than the
simulator programme. A Leech Gram matrix is an even positive-definite
unimodular \(K\)-matrix of rank 24, hence defines an invertible Abelian
Chern--Simons bulk with a 24-chiral-boson \(V_\Lambda\) edge. The inversion
orbifold plus its projected twisted sector is exactly \(V^\natural\). An
executable character calculation starts from
\(\Theta_\Lambda=E_4^3-720\Delta\), performs all four orbifold sums and
returns \(J=q^{-1}+196884q+21493760q^2+864299970q^3+\cdots\), including the
zero weight-one coefficient. This establishes Monster as a genuine chiral
CFT/topological-edge theory. It does not supply a fabricated Hamiltonian or a
naturally selected material. See
[Wave 7.129](../frontier/wave-7/frontier_wave7_129_leech_edge_orbifold_proves_formal_monster_physics.md).

The resulting detector hierarchy corrects a common Moonshine mistake.
\(V_{E_8}^{\otimes3}\), \(V_\Lambda\) and \(V^\natural\) all have \(c=24\)
and the same weight-two character coefficient 196884. Their weight-one
dimensions are instead \(744,24,0\): rootlessness removes 720 currents and
the inversion projection removes the remaining 24. The Monster weight-two
space further splits as \(98580\) untwisted plus \(98304\) twisted states.
These lower-cost current and sector measurements precede any attempt to
resolve the order-46 trace. See
[Wave 7.130](../frontier/wave-7/frontier_wave7_130_c24_current_ladder_and_monster_detector.md).

The first microscopic layer can now be written as a coupled-wire null-vector
construction. Counterpropagating \(K\oplus(-K)\) Leech wires are joined by 24
primitive commuting cosine terms per bond; an open array gaps every bulk mode
and leaves one 24-component chiral edge on each boundary. The remaining
orbifold operation has an exact condensation dictionary. \(V_\Lambda^+\) has
the toric-code sectors \(\{1,e,m,\epsilon\}\), and its two bosonic extensions
are \(1\oplus e\to V_\Lambda\) and
\(1\oplus m\to V^\natural\). Their interface has quantum dimension
\(\sqrt2\). A surface-code/Majorana certificate now verifies the fusion-space
scaling and noncommuting braid operations of that interface. No reviewed
source supplies the final local Hamiltonian selecting the \(m\) condensate on
the full Leech edge. See
[Wave 7.131](../frontier/wave-7/frontier_wave7_131_leech_coupled_wire_null_vector_blueprint.md),
[Wave 7.132](../frontier/wave-7/frontier_wave7_132_leech_monster_toric_code_condensation_fork.md)
and [Wave 7.133](../frontier/wave-7/frontier_wave7_133_condensation_interface_surface_code_toy.md).

The commissioning observable is quantitatively easier than the marked defect.
After vacuum normalization, the exact character differences are
\(\widehat Z_\Lambda-\widehat Z_\natural=24e^{-2\pi y}\) and
\(\widehat Z_{E_8^3}-\widehat Z_\natural=744e^{-2\pi y}\). At \(y=1\) the
Leech--Monster separation is 0.0448186, more than an order of magnitude above
the \(46AB\) connected-ratio magnitude. Finite-size spectroscopy needs
resolution below \(\pi v/L\) to separate the \(h=1,3/2,2\) onsets. See
[Wave 7.134](../frontier/wave-7/frontier_wave7_134_normalized_character_commissioning_curve.md).

The Jordan and exceptional layers now have a common physical measurement
dictionary on that edge. For weight-two states, \(a_3b\) is the two-point
vacuum coefficient and \(a_1b\) is the Griess product in the second-order OPE
pole. A selected \(H_2(\mathbb R)\) corner is reconstructible from six
two-point and ten symmetric three-point coefficients; raising one index
recovers the product and permits a held-out Jordan-identity test. Ising-pair
overlap plus Miyamoto-line return order identifies the Norton--Sakuma type.
The affine-\(E_8\) pattern remains a pair atlas rather than a current algebra,
because \(V_1=0\). See
[Wave 7.135](../frontier/wave-7/frontier_wave7_135_monster_edge_operator_tomography_dictionary.md).

The toric-code parent also needs symmetry enrichment, not just the right
fusion table. Its flux must transport a Leech vertex label
\(\ell\mapsto-\ell\); a factorized toric-code stack leaves \(\ell\) fixed.
An executable 23-clock surrogate distinguishes the two by
\(PTP^{-1}=T^{-1}\) versus \(T\), with normalized group-commutator traces
zero and one. This adds a crossed-action gate before condensation in
[Wave 7.136](../frontier/wave-7/frontier_wave7_136_leech_orbifold_symmetry_enrichment_witness.md).

Those results are now assembled into a single-carrier laboratory promotion
protocol in [Wave 7.137](../frontier/wave-7/frontier_wave7_137_monster_laboratory_promotion_dag.md).
Its sequence is Leech edge, crossed inversion, orbifold sector tomography,
twisted condensation, zero-current Moonshine spectrum, independent 2A and
marked 23AB defects, an order-46 common root, and finally held-out
Griess/Jordan/Norton--Sakuma closure. The dependency rule is substantive: an
XXZ category experiment, a separate surface-code twist and a numerical
Moonshine character cannot jointly establish a laboratory Monster. They are
commissioning instruments until one carrier passes the entire chain.

Gate A has also been compiled beyond the symbolic \(K\)-matrix level. The
Nebe--Sloane catalogue's explicit Leech Gram matrix gives 24 fixed integer
cosine vectors per coupled-wire bond. Exact arithmetic verifies positive
definiteness and determinant one; the columns have support 12–22 and maximum
coefficient \(\ell_1\)-weight 39. [Wave 7.138](../frontier/wave-7/frontier_wave7_138_explicit_leech_k_matrix_interaction_compiler.md)
therefore converts the continuum construction into a finite interaction bill,
while exposing the remaining microscopic problem: compile these high-body
vertex terms into native or ancilla-mediated few-body controls without losing
the commuting null-vector gap.

Unimodularity removes that apparent interaction-order obstruction at the
continuum level. With \(\phi=K^{-1}\phi'\), the transformed topological matrix
is \(K^{-1}\) while all 24 gap-opening columns become the identity.
[Wave 7.139](../frontier/wave-7/frontier_wave7_139_leech_unimodular_dual_basis_compiler.md)
verifies the integral inverse and both transformation identities exactly. The
cost is a dense mixing matrix with entries as large as 422, so the laboratory
question becomes a concrete sparsity trade-off rather than an undefined
high-body interaction.

The same carrier now has a quantitative dynamics record in
[Wave 7.140](../frontier/wave-7/frontier_wave7_140_monster_edge_dynamics_and_transport_witness.md).
For \(H=(2\pi\hbar v/L)(L_0-c/24)\), the Leech edge has a 24-fold weight-one
onset at \(v/L\), whereas the Moonshine extension has no weight-one states and
first appears at \(2v/L\) with total degeneracy 196884. Its thermal Hall slope
is the universal \(c_-=24\) value \(8\pi^2k_B^2/h\). Transport establishes the
chiral carrier; the missing onset, sector split and marked defects supply the
increasingly Monster-specific tests.

The inversion step also admits an explicit local gauge primitive.
[Wave 7.141](../frontier/wave-7/frontier_wave7_141_local_inversion_gauge_and_twist_module.md)
places \(\mathbb Z_{23}\) matter on sites and a \(\mathbb Z_2\) sign on each
link, with Gauss generators that invert matter and flip incident links. The
bond projector is gauge invariant on all 1058 two-site basis states; its 46
satisfying states reduce to twelve gauge orbits, while negative ring holonomy
enforces the inversion-twisted closure condition. This closes the locality of
the gauging mechanism as a finite module. Coupling one such gauge field to all
24 Leech modes and recovering the full \(V_\Lambda^+\) sector data remains
open.

The carrier coupling itself is now explicit in
[Wave 7.142](../frontier/wave-7/frontier_wave7_142_gauged_leech_dual_basis_null_vector_array.md).
One shared gauge sign per wire bond controls all 24 diagonalized gap terms;
the 1152 mutual null pairings vanish for both flux values, and endpoint gauge
transformations leave every cosine invariant. This rules out the incorrect
\(\mathbb Z_2^{24}\) construction and closes coherent continuum P3B. A device
and an infrared measurement of the four \(V_\Lambda^+\) sectors are still
required before twisted-module condensation.

The condensation target itself now has a compact resource decomposition.
[Wave 7.143](../frontier/wave-7/frontier_wave7_143_moonshine_twisted_sector_resource_compiler.md)
uses the exact orbifold data \(h_{\rm twist}=24/16=3/2\) and ground
multiplicity \(2^{12}=4096\). Projection removes that raw onset; one of 24
half-oscillators raises the first retained states to weight two, giving
\(4096\times24=98304\). A fixed-parity surface-code array needs 26 e/m
junctions to supply the same 12 protected logical qubits. The equality is an
implementation budget, not a proof that the stabilizer fusion space is the
Leech twisted module.

The finite algebra comparison is stronger than dimension alone.
[Wave 7.144](../frontier/wave-7/frontier_wave7_144_leech_twisted_ground_pauli_bridge.md)
reduces the explicit Leech form modulo two and computes twelve hyperbolic
pairs and the Arf-zero quadratic refinement. Mapping those pairs to logical
\(X_i,Z_i\) preserves generator squares, commutators and the central sign, so
it identifies the full finite extraspecial-group presentation on the
4096-dimensional twisted ground module. The still-open data are coupling to
the 24 half-modes and preservation of twisted vertex products.

Tensoring that module with the half-mode selector gives an explicit first-grade
representation in [Wave 7.145](../frontier/wave-7/frontier_wave7_145_moonshine_weight2_twisted_pauli_compiler.md).
The normal \(2_+^{1+24}\) layer acts by twelve-qubit Paulis on all 98304
twisted weight-two states, with traces \(98304,-98304,0\) for the identity,
central minus and noncentral generators. The remaining representation problem
is physically marking that action and joining the cross-sector product with
the 98580-dimensional invariant untwisted piece. Algebraically,
[Wave 7.146](../frontier/wave-7/frontier_wave7_146_leech_co1_to_twelve_qubit_clifford_lift.md)
extracts the catalogue's two \(Co_0\) generators, verifies \(GKG^T=K\), and
conjugates their mod-2 actions into twelve-qubit Clifford transformations. A
block compiler gives standard-gate upper bounds of 34 and 157 gates with
native swaps for the two displayed generators.

The untwisted partner is equally structured. [Wave 7.147](../frontier/wave-7/frontier_wave7_147_moonshine_weight2_sector_join_and_2b_trace.md)
decomposes it as 300 symmetric two-oscillator states plus 98280 antipodal pairs
of the 196560 Leech minimal vectors. Joining that 98580 block to the 98304
twisted block gives 196884, while the orbifold quantum-symmetry sign gives the
independent \(2B\) trace \(98580-98304=276\). Cross-sector OPE products, not
state counting, are now the remaining finite-algebra gate.

The universal part of those products is fixed in
[Wave 7.148](../frontier/wave-7/frontier_wave7_148_2b_graded_cross_sector_ope_calibration.md).
The Griess unit \(e=\omega/2\) has norm three, so orthonormal twisted probes
obey \(\operatorname{Proj}_e(t_a\circ t_b)=\delta_{ab}e/3\); \(2B\) parity
also kills every invariant three-point function with an odd number of twisted
insertions. Twenty-four marked probes require 300 Gram and 300 matching
identity-coupled three-point coefficients. Subtracting this universal piece
isolates the genuinely Monster-specific residual tensor.

A noncentral part of the residual action is now explicit in
[Wave 7.149](../frontier/wave-7/frontier_wave7_149_leech_minimal_pair_to_pauli_cross_sector_action.md).
Antipodal norm-four Leech vectors inject into \(\Lambda/2\Lambda\); their
invariant vertex operators act on the twisted ground module through the
corresponding extraspecial elements. The 24 sourced basis vectors compile to
24 independent twelve-qubit Pauli labels, reproduce \(K\bmod2\) as their
commutator matrix, and pass 48 catalogue-generator covariance checks. This is
a genuine action on the pre-projection twisted ground module; its lift through
the half modes, absolute OPE normalization and the full
\(T\times T\to U\) tensor remain open.

The accumulated result is stated as a proof certificate, rather than left as
an implication of the review, in
[Wave 7.150](../frontier/wave-7/frontier_wave7_150_monster_is_physics_proof_certificate.md).
It proves the following existence claim: there is a consistent unitary
dynamical quantum theory with local chiral observables whose exact
automorphism group is the Monster and whose measurable thermal and defect
amplitudes are Moonshine functions. The proof uses the unitary holomorphic
Moonshine VOA, its Leech inversion-orbifold construction, Hamiltonian cylinder
dynamics and independently physical heterotic realization. It does not prove
that a natural material, four-dimensional spacetime, gravity or the Standard
Model selects the Monster. Those are laboratory and nature-selection claims,
not missing clauses silently folded into the word “physics.”

## Frontier after the review

The literature does supply a physical string-theory realization of the
Moonshine series and Monster Lie algebra through BPS indices and broken gauge
symmetry.  It did not locate a completed \(23AB\)-twined genus-two
Monster amplitude, a published canonical identification of the two Golay
factors with the two oriented ideal/Monster classes, or a \(23AB\) defect
junction to the corpus's \(2A\) fermionic seam.  Those are the three live
mathematical targets.

The untwisted scalar specialization is exhausted by the two-character no-go
above, but modular transport reopens a finite route from \(T_{23}\).  The 24
branches and their Fourier projections are now explicit coefficient filters,
and the first three terms of all twelve needed even-\(l\) commutant characters
are verified. The scalar defect assembly is also complete through \(q^4\) and
fails the orientation test exactly. The next calculation must add a commuting
insertion or genus-two sewing and compare its Galois action under multiplication
by \(5\). The scalar negative result has already forced that refinement, and
the oriented generator convention remains necessary.

## Primary sources

- Borcherds, [*Monstrous moonshine and monstrous Lie superalgebras*](https://math.berkeley.edu/~reb/papers/monster/monster.pdf)
- Paquette, Persson and Volpato, [*Monstrous BPS-Algebras and the Superstring Origin of Moonshine*](https://arxiv.org/abs/1601.05412) and [*BPS Algebras, Genus Zero, and the Heterotic Monster*](https://arxiv.org/abs/1701.05169)
- Conway and Norton, [*Monstrous Moonshine*](https://doi.org/10.1112/blms/11.3.308)
- Breuer, Magaard and Wilson, [*Verification of the conjugacy classes and ordinary character table of the Monster*](https://arxiv.org/abs/2412.12182)
- Kondo and Tasaka, [*The theta functions of sublattices of the Leech lattice*](https://doi.org/10.1017/S0027763000000374)
- Höhn and Mason, [*The 290 fixed-point sublattices of the Leech lattice*](https://arxiv.org/abs/1505.06420)
- Beneish et al., [*Replicable functions arising from code-lattice VOAs fixed by automorphisms*](https://arxiv.org/abs/2306.15402)
- Akbary and Totani, [*Binary quadratic forms of odd class number*](https://arxiv.org/abs/2408.00184)
- Johnson-Freyd, [*The Moonshine Anomaly*](https://arxiv.org/abs/1707.08388)
- Carnahan, [*Generalized Moonshine IV*](https://arxiv.org/abs/1208.6254) and [*51 constructions of the Moonshine module*](https://arxiv.org/abs/1707.02954)
- Volpato, [*Monstrous parafermionic defects and other non-invertible symmetries in chiral CFTs*](https://arxiv.org/abs/2609.03043)
- Honda, Kaidi and Orii, [*Parafermionizing the Monster*](https://arxiv.org/abs/2605.10902)
- Tuite, [*Genus Two Meromorphic Conformal Field Theory*](https://arxiv.org/abs/math/9910136)
- Gilroy and Tuite, [*Genus Two Zhu Theory for Vertex Operator Algebras*](https://arxiv.org/abs/1511.07664)
- Gaberdiel and Volpato, [*Higher genus partition functions of meromorphic conformal field theories*](https://arxiv.org/abs/0903.4107)
- Lin and Shao, [*Duality Defect of the Monster CFT*](https://arxiv.org/abs/1911.00042)
- Lin, [*Topological modularity of Monstrous Moonshine*](https://arxiv.org/abs/2207.14076)
- Harvey and Moore, [*Moonshine, Superconformal Symmetry, and Quantum Error Correction*](https://arxiv.org/abs/2003.13700)
- Griess, [*Nonassociativity in VOA theory and finite group theory*](https://www.kurims.kyoto-u.ac.jp/EMIS/journals/CMUC/pdf/cmuc1002/griess.pdf)
- Dong, Griess and Höhn, [*Framed vertex operator algebras, codes and the moonshine module*](https://arxiv.org/abs/q-alg/9707008)
- Lam and Yamauchi, [*A characterization of the moonshine vertex operator algebra by means of Virasoro frames*](https://arxiv.org/abs/math/0609718)
- Vernier, Miao and Yamazaki, [*Lattice non-invertible symmetry from non-commuting transfer matrices*](https://arxiv.org/abs/2606.25660)
- Lam and Shimakura, [*Frame stabilizers for framed vertex operator algebras associated to lattices having 4-frames*](https://arxiv.org/abs/0905.4769)
- Nebe and Sloane, [Catalogue entry for the Leech lattice](https://www.math.rwth-aachen.de/~Gabriele.Nebe/LATTICES/Leech.html)
- Abe, Dong and Li, [*Fusion rules for the vertex operator algebras \(M(1)^+\) and \(V_L^+\)*](https://doi.org/10.1007/s00220-003-0874-5)
- Huang, [*A nonmeromorphic extension of the moonshine module vertex operator algebra*](https://arxiv.org/abs/hep-th/9406190)
- Kane and Stern, [*Coupled Wire Model of \(Z_4\) Orbifold Quantum Hall States*](https://arxiv.org/abs/1804.02177)

## Sourced order-23 composition law

Volpato's 2026 construction supplies part of the cross-grade composition data
that this review previously listed as missing. For the non-anomalous Fricke
class \(23AB\), the self-orbifold duality defect and the invertible
\(\mathbb Z_{23}\) defects generate
\(\operatorname{TY}(\mathbb Z_{23},\chi,\epsilon)\), with the explicitly
fixed bicharacter

\[
 \chi(g^a,g^b)=e^{2\pi iab/23}.
\]

In a standard skeletal gauge this gives the three-defect recoupling matrix
\(F_{ab}=\epsilon e^{-2\pi iab/23}/\sqrt{23}\). The associated executable
certificate checks its 529 entries, unitarity, \(F^2=C\), \(F^4=1\), and
rephasing-invariant plaquette ratios. This is genuine Monster interaction
data, not another scalar trace.

Two boundaries matter. First, the cited construction does not evaluate the
Frobenius--Schur sign \(\epsilon\). That sign is nevertheless a closed
categorical observable: \(\nu_2(\mathcal N)=\epsilon\), and odd-order TY
categories are distinguished by closed three-manifold state sums. Second,
the fifth-power generator change sends the bicharacter parameter
\(s\mapsto25s=2s\), but \(2=5^2\) is a square modulo 23. Hence it is exactly
the channel relabelling \(a\mapsto5a\) and does not change the abstract fusion
category. A \(23A/23B\) orientation detector therefore still needs a marked
physical identification of the charge/twist channels; no unmarked TY state
sum can supply it. See [Wave 7.113](../frontier/wave-7/frontier_wave7_113_monster_z23_tambara_yamagami_recoupling.md).

The carrier question has also moved. Wen--Inamura--Schafer-Nameki give a
QCA-refined tensor-product lattice realization for any weakly integral fusion
category and explicitly cover general Tambara--Yamagami symmetry. Independently,
Vernier--Miao--Yamazaki construct \(\mathbb Z_N\) TY fusion relations in a
root-of-unity XXZ spin chain, while Ren--Tantivasadakarn--Williamson provide
adaptive finite-depth preparation for solvable string nets with an explicit
\(\mathbb Z_3\) TY example. These results make a \(\mathbb Z_{23}\) physical
carrier plausible or constructive at the category level, but none identifies
that carrier with \(V^\natural\). The corpus therefore separates fusion-ring,
bicharacter, Frobenius--Schur, Monster-CFT and full-provenance witnesses in
[Wave 7.114](../frontier/wave-7/frontier_wave7_114_monster_ty23_carrier_and_provenance_protocol.md).
