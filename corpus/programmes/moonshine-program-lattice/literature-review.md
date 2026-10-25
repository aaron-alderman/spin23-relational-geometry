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

That dense mixer now has an exact finite-register implementation.
[Wave 7.157](../frontier/wave-7/frontier_wave7_157_leech_finite_qudit_channel_mixer.md)
reduces \(K^{-1}\bmod853\) to 24 single-qudit scales and 531 two-qudit
controlled additions, while preserving the finite Weyl pairing and sending
the Leech interaction columns to \(I_{24}\). The 853-level choice retains the
centered entries through magnitude 422 and needs at most 240 binary qubits per
chiral block as a raw allocation. This is an exact digital surrogate, not a
continuum-limit proof or a material realization; rotor-cutoff convergence and
infrared chirality are now the explicit Gate-A tests.

The first cutoff audit catches an important distinction inside that
surrogate. [Wave 7.158](../frontier/wave-7/frontier_wave7_158_leech_wrap_free_rotor_cutoff_ladder.md)
computes \(\lVert K^{-1}\rVert_\infty=2579\), so a bounded position box
\(\lVert n\rVert_\infty\le N\) is guaranteed alias-free only when
\(p>5158N\). An explicit unit-cube input gives exact channel output 2579 but
decodes as 20 modulo 853. The first sufficient prime is therefore 5167 for
\(N=1\), rising to 330131 for \(N=64\); the corresponding raw 24-channel
allocations are 312 and 456 binary qubits. This is a falsifiable convergence
preflight, not evidence that the continuum limit has already been reached.

The corresponding interaction gap creates a second, independent obstruction.
[Wave 7.159](../frontier/wave-7/frontier_wave7_159_leech_clock_locking_gap_scaling.md)
diagonalizes the direct clock penalty exactly and finds
\(\Delta_p=2u_p\sin^2(\pi/p)\). Fixed coupling therefore closes the locking
gap as \(p^{-2}\); fixing the gap instead requires
\(u_p/\Delta_\star\sim p^2/(2\pi^2)\), rising from
\(1.35\times10^6\) at the safe \(N=1\) rung to \(5.52\times10^9\) at
\(N=64\). Exact relative-label thermodynamics gives
\(\beta\Delta_\star\ge8.47114\) for at most one-percent unlocking across 24
channels, equivalent to 1.765 GHz at 10 mK. The naïve fixed-strength clock
route is therefore rejected; a rotor-native or multiscale kinetic-plus-cosine
architecture is the live Gate-A design problem.

The first rotor-native replacement is now executable.
[Wave 7.160](../frontier/wave-7/frontier_wave7_160_leech_rotor_native_pendulum_gap.md)
uses the open, noncyclic momentum truncation
\(H_N=n^2/2+1-\cos\theta\). Its first gap converges at fixed control strengths
to 0.8784249807; \(N=4\) differs from the \(N=64\) benchmark by only
\(1.21\times10^{-7}\). Complete-spectrum thermodynamics across 24 independent
relative modes gives \(\beta E_{\rm unit}\ge8.86675\), corresponding to a
1.62292 GHz first gap at 10 mK. This repairs the local locking problem. It
does not yet address collective interwire propagation, bulk-gap scaling or
the extraction of 24 net chiral edge modes.

The ideal finite strip is now compiled as well.
[Wave 7.161](../frontier/wave-7/frontier_wave7_161_leech_rotor_strip_gap_and_edge_count.md)
proves that the dual-basis bonds form a disjoint matching:
\(24(Y-1)\) convergent rotor pendula gap all interior chiral modes while
exactly 24 modes survive on each open boundary. Periodic closure leaves none.
The ideal bulk gap remains 0.8784249807 through \(Y=32\); the one-percent
whole-strip thermal energy scale at 10 mK rises only from 1.84753 GHz at
\(Y=2\) to 2.65993 GHz at \(Y=32\). A finite-device Weyl bound controls
globally bounded perturbations, but thermodynamic stability under extensive
local perturbations and the edge dispersion remain open.

Gate A now has a complete observable preregistration rather than only a
construction. [Wave 7.162](../frontier/wave-7/frontier_wave7_162_leech_edge_chiral_dispersion_preregistration.md)
requires spatially separated velocity signs, \(|c_-|=24\) per edge, the
dimensionless onsets \(f_1L/v=1\) and \(f_{\rm lattice}L/v=2\), Casimir ratio
\(-1\), and signed thermal Hall slope
\(2.2714347639\times10^{-11}\ {\rm W\,K^{-2}}\). Exactly 24 weight-one
oscillator currents must appear with no norm-two lattice roots; the 196560
norm-four primaries plus 324 oscillator states give 196884 states at weight
two. Rooted Niemeier, nonchiral, generic \(c=24\), clock and premature
Monster interpretations each fail a separate part of this record.

Weak local interactions no longer leave the finite-cutoff bulk without a
theorem. [Wave 7.163](../frontier/wave-7/frontier_wave7_163_leech_fixed_cutoff_local_gap_stability.md)
maps the periodic \(N=8\) rotor product into Yarotsky's noninteracting,
nondegenerate and uniformly gapped finite-spin setting. The sourced result
implies a nonzero perturbation-strength neighborhood, uniform in bulk volume,
for bounded finite-range local terms. The threshold is not numerically known
here and is not proved uniform as \(N\to\infty\); the open chiral edge is also
outside the bulk theorem. A 72-setting cutoff-width-strength scan is frozen
to measure the missing radius rather than infer it from the theorem.

One local perturbation direction now has an exact radius.
[Wave 7.164](../frontier/wave-7/frontier_wave7_164_leech_pendulum_excitation_hopping_stress_lane.md)
projects each converged pendulum to its lowest doublet and couples neighboring
excitations with hopping \(t\). The exact band
\(E(k)=\Delta+2t\cos k\) closes at
\(|t_c|=\Delta/2=0.4392124903\), independent of even periodic size.
Low-strength data calibrate the band and the 0.3, 0.4 and 0.45
\(|t|/\Delta\) points are held out. This is a quantitative extensive-local
stress test, not the general Yarotsky radius or a substitute for higher-level
leakage measurements.

The physical operator dictionary narrows that lane further.
[Wave 7.165](../frontier/wave-7/frontier_wave7_165_leech_pendulum_two_level_leakage_audit.md)
diagonalizes the \(N=8\) rotor with eigenvectors and evaluates the natural
\(\sin\theta\) matrix elements. The desired \(0\to1\) transition carries
94.4972% of the ground-state \(\sin^2\theta\) weight, but negative
anharmonicity and a large \(1\to2\) matrix element restrict a static
\(\sin\theta_j\sin\theta_{j+1}\) coupler to
\(t_{\rm eff}/\Delta\lesssim0.1956\) under the declared one-percent
first-order leakage proxy. Stronger stress points require transition-selective
or Floquet exchange, or a full multilevel prediction.

The strong lane now has an exact digital alternative.
[Wave 7.166](../frontier/wave-7/frontier_wave7_166_leech_transition_selective_exchange_compiler.md)
diagonalizes each 17-level pendulum and applies a two-register Givens rotation
only on \(|1,0\rangle,|0,1\rangle\), giving zero ideal leakage in the
finite-cutoff model. Reflection parity lowers the local basis-change upper
bound from 136 to 72 Givens rotations. A 744-cell chain needs 743 selective
exchanges per bond step and, under a conservative one-percent telescoping
budget, per-exchange operator error below \(1.35\times10^{-5}\). Platform
decomposition and overlapping-bond Trotter error remain open.

The one-excitation Trotter cost is now explicit.
[Wave 7.167](../frontier/wave-7/frontier_wave7_167_leech_selective_exchange_trotter_budget.md)
derives
\(\lVert[A,B]\rVert=2t^2\cos[\pi/(M/2+1)]\) for the even--odd split.
At 744 cells the coefficient is 1.999929. A one-percent first-order bound
needs only 9–21 steps for \(T\Delta=1\) across the held-out stress range, but
2,025 steps and 1.61 million logical gates at
\(T\Delta=10,t/\Delta=0.45\). Short-time brickwork is retained; long-time
work is routed to analog exchange, matchgates/free fermions or higher-order
formulas. The bound is explicitly one-excitation only.

That routing decision is now executable rather than aspirational.
[Wave 7.168](../frontier/wave-7/frontier_wave7_168_leech_free_fermion_matchgate_evolution.md)
uses the Jordan--Wigner/free-fermion form of the ideal selected chain and its
open-boundary sine modes to compile
\(U(T)=S\operatorname{diag}(e^{-iT\epsilon_k})S^T\) exactly. A generic
logical upper bound is \(M^2+144M\) gates including pendulum-basis I/O. At
744 cells this is 660672 gates, independent of simulated time, and becomes
cheaper than first-order brickwork at 746 Trotter steps. It is 2.44 times
smaller at the strongest long-time point. Matchgate simulability is treated
as a calibration null model: it removes product-formula ambiguity but is not
Monster evidence or quantum advantage.

The corresponding literal circuit map has now been tested and rejected.
[Wave 7.169](../frontier/wave-7/frontier_wave7_169_leech_passive_capacitance_sign_no_go.md)
asks whether the dual-coordinate charging form
\(n^TK^{-1}n/2\) can come from an ordinary positive-capacitor network, which
would require a node capacitance matrix proportional to (K). The Leech
matrix contains the sign-frustrated triangle
\((K_{12},K_{25},K_{51})=(-2,-2,+2)\). Its positive edge product is invariant
under every local polarity reversal, whereas three passive mutual-capacitance
off-diagonals would have negative product. This is an exact no-go for the
direct capacitor-only mapping, not for the Leech phase: it selects mediated
signed couplers, the original many-field interactions or a digitally
certified low-energy isometry.

The no-go has a constructive passive recovery at the ideal-network level.
[Wave 7.170](../frontier/wave-7/frontier_wave7_170_leech_transformer_capacitance_recovery.md)
computes the exact rational factorization (K=LDL^T). A signed lossless
mode transformer (x=L^T\phi) feeding 24 positive diagonal capacitors
reproduces (C=K) exactly. The capacitor values span only a factor of 16 and
every off-diagonal transformer ratio has magnitude at most (1/2), but the
network is dense: 242 of 276 lower-triangular coefficients are nonzero. This
turns the platform problem into a measurable 24-port admittance target while
leaving layout, parasitics, bandwidth and the infrared Leech phase open.

The first robustness number is less forgiving.
[Wave 7.171](../frontier/wave-7/frontier_wave7_171_leech_transformer_conditioning_tolerance.md)
finds (\kappa_2(K)=31816.43) in the recorded coordinates, corresponding to
a 178.37 extreme frequency ratio under a common inductive scale. The standard
inverse-perturbation bound demands relative matrix error below
(3.11\times10^{-7}) for a uniform one-percent worst-case guarantee on
(K^{-1}). This is an adversarial sufficient bound, not a per-component
fabrication prediction; it selects full-matrix admittance calibration and a
joint search over equivalent integral bases for conditioning, density and
interaction locality.

That integral-basis search has now produced a concrete improvement.
[Wave 7.172](../frontier/wave-7/frontier_wave7_172_leech_integral_hardware_basis_search.md)
tests 3000 candidates from 1000 frozen permutations and three LLL parameters.
The best observed integral basis lowers the condition number from 31816.43 to
740.225, a factor of 42.98, while all 24 basis vectors remain norm-four Leech
minimal vectors. Exact reconstruction gives a unimodular transform with
determinant (-1). The cost is not hidden: the Gram matrix has 195 rather than
191 nonzero off-diagonal pairs and the transform has 160 nonzero entries.
This is a better calibration basis, not a sparse-layout solution or an
optimality theorem.

The finite scan also resolves the basis-selection ambiguity into a physical
dictionary rather than a single arbitrary score.
[Wave 7.173](../frontier/wave-7/frontier_wave7_173_leech_hardware_basis_pareto_frontier.md)
retains four mutually nondominated designs below condition number 1000:
precision-first, transform-count-first, Gram-routing-first and
small-ratio-balanced. Selecting among them requires measured admittance-error
covariance, loss/bandwidth cost per mixer coefficient, routing cost per Gram
pair and signed-ratio fabrication cost. The mathematical candidate set is now
finite and executable; the remaining weights are platform data.

The coordinate proxies have now been lowered to actual ideal transformer
factors.
[Wave 7.174](../frontier/wave-7/frontier_wave7_174_leech_pareto_transformer_factor_audit.md)
reconstructs exact rational (G=LDL^T) factors for all four candidates. Each
has capacitor dynamic range 16 and maximum physical ratio (1/2), proving
that the largest integral coordinate-map entry was not a turns-ratio proxy.
The Gram-first basis gives the sparsest factor: 252 nonzero and 174 distinct
signed ratios at condition number 953.03. It is selected for the next ideal
circuit pass, with a full-matrix covariance-propagation commissioning rule.

The first component-yield curve is now frozen.
[Wave 7.175](../frontier/wave-7/frontier_wave7_175_leech_transformer_structured_tolerance.md)
perturbs all 276 selected-factor parameters independently under a declared
mean-one lognormal model, removes one global scale and evaluates 40000 inverse
matrix reconstructions. At 0.2% component log scatter, 4999 of 5000 draws pass
the one-percent inverse-metric target; the 95% Wilson lower yield is 99.887%.
At 0.3% the observed yield is 96.12%, at 0.5% it is 47.62%, and at 1% it is
0.28%. These are conditional procurement predictions, not substitutes for a
measured 24-port covariance matrix.

That iid procurement target does not survive correlation unchanged.
[Wave 7.176](../frontier/wave-7/frontier_wave7_176_leech_transformer_correlated_tolerance.md)
puts 90% of component-error variance into either six four-row process blocks
or one smooth row gradient. At 0.2% scatter their yields fall to 97.02% and
98.08%. At 0.15%, both retain a 95% Wilson lower yield above 99%, so 0.15%
replaces 0.2% as the cross-model conditional target. Arbitrary covariance,
additive parasitics and frequency-dependent loss remain unmodelled.

The resulting device-acceptance experiment is now explicit.
[Wave 7.177](../frontier/wave-7/frontier_wave7_177_leech_24port_admittance_commissioning_packet.md)
uses seven frequencies, 168 single-port tomography settings, 84 held-out
multiport drives and 25200 complex acquisitions. Eight frozen gates test
fixture removal, reciprocity, passivity, loss, dispersion, positive
definiteness, one-percent inverse-metric agreement and prediction without
refitting. Passing commissions only the measured quadratic Leech metric; it
does not establish a gap, chiral edge, orbifold or Monster structure.

The packet has also survived a discriminating parasitic-pole audit, with an
important qualification.
[Wave 7.178](../frontier/wave-7/frontier_wave7_178_leech_admittance_parasitic_pole_stress.md)
adds a passive rank-one series-RLC branch at four or ten times the band center.
Ten ppm relative low-frequency capacitance passes all 4000 orientations with
a 99.808% Wilson lower yield; at 100 ppm, yields collapse to 60.65% and 71.4%
even though dispersion and loss remain comfortably inside their gates. The
inverse-metric test, amplified by the soft Gram direction, is the necessary
detector. This is a one-pole ensemble, not a general parasitic theorem.

The general passive static statement is now exact.
[Wave 7.179](../frontier/wave-7/frontier_wave7_179_leech_adversarial_psd_parasitic_bound.md)
proves the tight bound
\(\kappa\eta/(1+\kappa\eta)\) for any PSD sum of parasitic capacitances,
saturated by a rank-one perturbation along the soft Gram eigenvector. The
static one-percent limit is 10.599 ppm. Correcting for the seven-frequency
\(Q=30\) near-pole amplification lowers the adversarial joint-fit target to
8 ppm, or 3.9 ppm for a separate inverse claim at every frequency.

The nonlinear carrier cannot be obtained by simply appending the earlier
independent-pendulum result.
[Wave 7.180](../frontier/wave-7/frontier_wave7_180_leech_coupled_metric_pendulum_gap_audit.md)
joins the measured Gram-first charging metric to 24 local compact cosines.
Because the metric has 179 off-diagonal pairs, the result is a coupled
24-dimensional Hamiltonian. Its harmonic frequencies are exactly
\(\sqrt{Uu/\lambda_a(G)}\), spanning 0.21210--6.54773 for the unit benchmark.
The 0.8784249807 single-pendulum gap is therefore a local cutoff benchmark,
not the physical joined gap. Weak 24-mode spectroscopy followed by held-out
anharmonic spectroscopy and finite-cutoff diagonalization is now an explicit
pre-Gate-A requirement.

[Wave 7.181](../frontier/wave-7/frontier_wave7_181_leech_coupled_anharmonic_spectroscopy.md)
derives the first nonlinear fingerprint instead of assigning independent
phenomenological Kerr shifts. The Gram-first eigenvectors fix all 24 leading
quartic corrections through
$\delta\omega_a/\omega_a=-\alpha_a\sqrt{U/u}$, with
$0.17638\leq\alpha_a\leq0.31420$ and every shift downward. At
$U/u=10^{-3}$ the largest correction is 0.994%; at $10^{-2}$ it is 3.142%.
This is a controlled semiclassical perturbative target, not the exact compact
spectrum. Held-out modes and independently calibrated tunable-ratio settings
now distinguish the joined Hamiltonian from mode-by-mode fitting.

The near-degenerate-mode loophole is separately closed at projected quartic
order in
[Wave 7.182](../frontier/wave-7/frontier_wave7_182_leech_one_quantum_quartic_mixing.md).
The full $24\times24$ one-quantum transition block includes every off-diagonal
quartic matrix element. At $U/u=10^{-2}$ its diagonalization changes the
diagonal-only transitions by at most 0.0404% relative. This preserves the
Wave 7.181 leading fingerprint but does not count as a systematic second-order
calculation, because virtual three- and five-quantum states and higher cosine
terms remain absent.

[Wave 7.183](../frontier/wave-7/frontier_wave7_183_leech_four_mode_full_cosine_active_space.md)
moves beyond that polynomial block for the four softest modes. It projects the
other twenty modes onto their harmonic vacuum with Debye--Waller factors,
retains the full cosine, and diagonalizes parity-resolved Fock spaces through
total excitation cutoff eight. The gap converges to 0.0066596911 at
$U/u=10^{-3}$ and 0.0207397902 at $10^{-2}$, with final cutoff changes below
$6\times10^{-10}$ relative. This establishes excitation-cutoff convergence
inside one declared active space, not convergence in active-mode count or the
full 24-mode compact gap.

[Wave 7.184](../frontier/wave-7/frontier_wave7_184_leech_full_cosine_active_mode_ladder.md)
starts the independent active-mode convergence axis. Two-, four- and six-mode
gaps are excitation-cutoff converged, while an eight-mode cutoff-six
reconnaissance contains 3003 parity-split states. Every gap stays positive and
each two-mode enlargement changes it by less than $3\times10^{-5}$ relative
through the declared scan. Because the increments are not monotone and no
tail bound controls the omitted sixteen modes, this is strong finite-mode
stability evidence rather than a 24-mode gap proof.

The leading omitted-mode contribution is nevertheless finite and now fully
enumerated.
[Wave 7.185](../frontier/wave-7/frontier_wave7_185_leech_24mode_quartic_second_order.md)
applies the quartic interaction in the complete 24-mode basis and sums 17,851
ground-sector plus 20,174 excited-sector reachable states. Its second-order
gap correction is only $-1.11\times10^{-4}$ of the harmonic gap at
$U/u=10^{-3}$ and $-1.11\times10^{-3}$ at $10^{-2}$.

[Wave 7.186](../frontier/wave-7/frontier_wave7_186_leech_24mode_full_cosine_order_three_halves.md)
then adds the sextic first-order term required at the same $U^{3/2}$ order.
It cancels 51.72% of the quartic second-order coefficient. The resulting
all-24-mode, order-consistent one-well prediction agrees with the independent
eight-mode full-cosine ladder within 0.0081% and 0.0818% at the two principal
ratios. This is convergence between two approximation schemes, not yet a
rigorous $U^2$ remainder bound or a compact-tunnelling calculation.

Compact winding now has an exact exponent-level constraint.
[Wave 7.187](../frontier/wave-7/frontier_wave7_187_leech_compact_winding_action_bound.md)
uses the integral inverse of the Gram-first metric. Minimizing kinetic cost
over all spectator velocities gives effective coordinate masses
$1/(G^{-1})_{ii}$ and a minimum $1/22$. Every nonzero winding therefore obeys
$S_E\ge8\sqrt{u/(22U)}$. The floor is 53.94 at $U/u=10^{-3}$ and 17.06 at
$10^{-2}$. This makes the bare exponential factor tiny, but does not rigorously
bound its fluctuation determinant, multi-instanton prefactor or dissipative
renormalization.

The next full-cosine order is also explicit.
[Wave 7.189](../frontier/wave-7/frontier_wave7_189_leech_24mode_full_cosine_order_two.md)
rewrites quartic third order as a sparse resolvent norm, evaluates the mixed
quartic--sextic term through an operator overlap and adds the octic moment.
The three coefficients are -0.0259363, +0.0214243 and -0.00243131, leaving a
strongly cancelled net $-0.00694331U^2$. At $U/u=10^{-2}$ this is only
$3.27\times10^{-5}$ of the harmonic gap. The computation is order complete,
but it remains an asymptotic coefficient rather than a rigorous remainder
bound.

The theory outputs are now collected into an executable same-carrier packet.
[Wave 7.188](../frontier/wave-7/frontier_wave7_188_leech_nonlinear_commissioning_packet.md)
freezes twelve calibration and twelve held-out modes, 228 configurations and
22,800 repeated acquisitions. Six gates test the harmonic fingerprint, shared
anharmonic coefficients, soft gap, parity, zero-power stability and compact
offset-phase trend without mode-specific refitting. Passing commissions a
finite nonlinear compact Leech-metric rotor only; it does not promote the
chiral edge, orbifold or Monster operator algebra.

The dependency graph has now been audited backward as well as extended
forward. [Wave 7.190](../frontier/wave-7/frontier_wave7_190_leech_product_to_coupled_dependency_audit.md)
shows that the strip endpoint matching still leaves exactly 24 modes on each
open edge, but each inter-wire bond is one coupled 24-channel cell rather
than 24 pendula. The old 0.8784249807 gap, thermal table, leakage thresholds
and 17-level compiler costs are therefore calibration-surrogate results.
The edge preregistration and weak-interaction stability theorem survive only
conditionally on a joined-cell gap certificate. This correction narrows the
next decisive computation to interval-certified lowest even and odd
eigenvalues of one finite-cutoff Gram-first cell.

[Wave 7.191](../frontier/wave-7/frontier_wave7_191_leech_joined_cell_mpo_certificate_architecture.md)
removes the apparent storage obstruction. Although the cutoff Hilbert space
has dimension $(2N+1)^{24}$, the joined Hamiltonian has an exact MPO of bond
dimension at most 26 because its nonlocal terms are only bilinear charge
couplings. The inverse-metric cross-block rank peaks at 12, giving a
compressed target of 14. Dense one-to-four-channel reconstruction is exact
to $8.9\times10^{-16}$. This makes parity-resolved tensor optimization
practical, while explicitly requiring validated lower spectral enclosures
before any Ritz-value gap is promoted.

The tensor ordering is also no longer arbitrary.
[Wave 7.192](../frontier/wave-7/frontier_wave7_192_leech_joined_cell_mps_order.md)
computes exact harmonic Gaussian cut entropies from $G^{\pm1/2}$ and selects
a deterministic coordinate order. It reduces maximum cut entropy by 20.75%
and the exponential entropy proxy by a factor 2.55. The catalogue order is
retained as an adversarial convergence control; agreement between both
orders is required because this harmonic optimization does not certify the
nonlinear state.

The full compact carrier has now been attacked directly in
[Wave 7.193](../frontier/wave-7/frontier_wave7_193_leech_joined_cell_dmrg_reconnaissance.md).
At a common bond-32/six-sweep budget and $U/u=10^{-2}$, the parity-resolved
variational gap falls from 0.6811 to 0.3327, 0.1870 and 0.1195 as the charge
cutoff rises from one to four. This monotone sequence is a convergence
failure, not an extrapolation: the cutoff-four residual proxies exceed the
reported gap, which remains 5.77 times the perturbative reference. A
catalogue-order control differs by 0.188% at cutoff two. The calculation
therefore establishes full-carrier feasibility and fixes the next
bond/cutoff grid while refusing a gap certificate.

Wave 7.194 then isolates tensor error at cutoff four by resuming the same
states through bond dimensions 32, 48 and 64. The variational gap moves
0.12005 to 0.11809 to 0.11674, while residual proxies fall but remain
0.102/0.113. The latest gap shift is still 69.1% of the previous shift. This
quantifies a convergence failure and defers cutoff five; it also adds
sector-level checkpoints and optional deferred variance evaluation so the
long calculation is monitorable and resumable.

Wave 7.195 resumes the bond-64 states for two more sweeps at fixed cutoff.
The gap changes only 0.000235, 17.4% of the preceding bond-48-to-64 shift,
and the per-sweep energy shifts contract. This isolates bond capacity as the
larger tensor error. It does not certify convergence; it selects a
symmetry-native parity implementation or subspace expansion before bonds 80
and 96, with residual evaluation deferred to accepted checkpoints.

Wave 7.196 compiles global inversion into an exact local and virtual Z2
charge. In the parity basis, $n$ is odd, $n^2$ and the cosine are even, and
$n_i n_j$ conserves the global charge; all selection-rule residuals vanish
through cutoff eight. The 26-state MPO automaton splits into two even
boundary states and 24 odd open-charge states. Wave 7.197 now executes those
charges in a block-sparse MPS/MPO solver. It agrees with three exact controls
below $8\times10^{-12}$ and reproduces the independent full-carrier
cutoff-one penalty-sector gap to 0.0252%. This validates the symmetry-native
bridge and removes the artificial penalty, but the bond-16 run is not
converged and supplies no cutoff-stable spectral certificate.
Wave 7.198 then raises the exact-sector bond from 16 to 24 at fixed cutoff.
Both sector energies fall, while the gap changes by $4.08\times10^{-5}$, or
0.00599%. This is encouraging bond stability, but two unconverged
variational upper-bound differences remain insufficient for a spectral
enclosure. The local dense charged-block eigensolve, rather than the MPO bond,
is now the measured computational frontier.
Wave 7.199 replaces full local diagonalization by iterative lowest-eigenpair
updates, verifies the same three exact controls, survives fresh-process MPS
checkpoint reload and extends cutoff one to bond 32. Iterative and dense-local
full-carrier gaps agree to $2.74\times10^{-12}$. The effective charge block is
still materialized, so this is not yet a fully matrix-free contraction.

Wave 7.200 supplies the first full-carrier exact-sector cutoff-two ladder.
Bond 16 to 24 lowers both variational energies and changes the gap by 0.230%;
the bond-24 value is within 0.0723% of the earlier penalty-sector result.
Because two further sweeps still move the gap by $1.96\times10^{-5}$ and no
lower enclosure exists, this establishes feasibility and the direction of
convergence rather than a cutoff-stable spectrum.
Wave 7.201 removes the dense effective block rather than merely diagonalizing
it iteratively. A charged trial vector is inserted into the effective tensor
network and contracted through the MPO environments at each ARPACK matvec.
All exact controls survive; cutoff one reproduces the stabilized bond-32 gap,
and cutoff two reaches bond 32 with sector dimension 12832. Both energies
decrease and the gap becomes 0.3326327244. The remaining 0.0957% bond
correction and $7.13\times10^{-5}$ fixed-bond relative drift prevent a
spectral certificate, but effective-matrix storage is no longer the blocker.
Wave 7.202 grows the same cutoff-two checkpoints to bond 40. Both sector
energies decrease and the gap corrections from 24 to 32 and 32 to 40 contract
in magnitude by a factor 0.504. The latest correction remains 0.0483% and no
lower enclosure exists. A three-point Aitken value is retained only as a
quarantined diagnostic, not as a continuum prediction.
Wave 7.203 adds bond 48. Both sector energies decrease throughout bonds 24,
32, 40 and 48; successive gap-correction ratios are 0.504 and 0.481, and
fixed-bond drift falls to 4.03 ppm. The latest bond correction remains 232
ppm, however, and an independently justified lower enclosure is still absent.
Wave 7.204 opens cutoff three through bond 24 with the same non-materialized
exact-sector solver. Both energies decrease, but the bond correction is 1.02%
and successive fixed-bond gap shifts have opposite signs. The corpus records
this as feasibility plus a convergence failure, not as a cutoff-three gap or
an extrapolation datum.
Wave 7.205 extends cutoff two to bond 56. The bond correction is 135 ppm and
the final fixed-bond drift is 2.40 ppm. Wave 7.206 extends cutoff three to
bond 32: successive sweep drifts contract by factors 0.331 and 0.319, but the
remaining 0.582% bond correction and 105 ppm drift keep the value outside the
admissible spectral set.
Wave 7.207 turns “lower enclosure” into an executable admission rule. A
zero-residual excited-state counterexample shows why residual proximity does
not identify the ground state. Temple--Kato is admitted only with certified
neighbour separation; Lehmann or inertia routes must record the same missing
ordinal information. Even and odd intervals compose to
$[L_- - U_+,U_- - L_+]$.

Wave 7.208 implements the first full-carrier lower interval without requiring
a guessed separator. The Leech charging matrix is positive, so dropping its
quadratic form gives an exact separable path-potential lower operator. Its
local inversion-even and inversion-odd minima are analytic. Composed with the
sector Ritz upper bounds, they certify
$\Delta_{N=1}\in[0.3756663388,1.0123638218]$ on all 24 joined channels. At
cutoffs two and three this deliberately coarse lower operator falls short by
0.2917081970 and 0.7271192632 respectively. The finite-cutoff existence proof
therefore advances, while continuum cutoff stability and the physical strip
gap remain explicitly open.

Wave 7.209 closes the diagonal branch of that strengthening problem. If
\(K-D\succeq0\) for positive diagonal \(D\), then each rank-one downdate
obeys \(d_i\le1/(K^{-1})_{ii}=1/G_{ii}=1/4\), hence
\(\sum_i d_i\le6\). The finite charge norm then places a universal ceiling on
the lower-energy gain. That ceiling still yields negative best-possible gap
lower endpoints, \(-0.1717081970\) at cutoff two and \(-0.4571192632\) at
cutoff three. The next lower enclosure must therefore retain correlations
through multi-site blocks, sum-of-squares structure, or eigenvalue-counting
machinery; tuning independent one-site charging penalties cannot succeed.

Wave 7.210 proves the analogous statement for every disjoint two-site
positive split. Each block is bounded by the inverse of its \(2\times2\)
Leech Gram principal minor; \(|G_{ij}|\le2\) forces block norm at most
\(1/2\). Twelve optimistically saturated pairs still leave negative
gap-lower ceilings at cutoffs two and three. Exhausting all 2,024
three-coordinate minors gives minimum eigenvalue \(4-2\sqrt2\), whose shorted
norm ceiling is no longer small enough to exclude closure. Thus three-site
correlation is the first viable disjoint-block frontier, while a constructive
PSD partition and certified cluster spectra remain open.

Wave 7.211 tests rather than assumes that triple frontier. A deterministic
natural-plus-200-random partition search scales the eight principal
\(K\)-blocks to the PSD boundary and solves every \(5^3\)-state cluster by
inversion sector. The best common-scale gap lower value is
\(-0.2844679556\); independent constrained weighting reaches only
\(-0.2841525847\). The calculation is explicitly classified as negative
reconnaissance, not an exhaustive no-go. It disfavors block-Jacobi principal
triples and increases the value of overlapping \(LDL^T\) sums of squares,
general block semidefinite optimization and Lehmann/inertia routes.

Wave 7.212 makes the Lehmann/Temple route quantitative. Ordered min--max
comparison with the potential-only Hamiltonian gives
\(\beta_2^{(+)}=3.9474411167\), above the even Ritz energy, and
\(\beta_{25}^{(-)}=4.3134665205\), above the odd Ritz energy after a
24-fold lowest odd band. An uncompressed full-state contraction of the
bond-56 even MPS gives residual \(0.0086196568444\), agrees across compression
tolerances within \(2\times10^{-12}\), and reproduces dense reduced controls
within \(1.4\times10^{-15}\). The resulting padded Temple interval is only
\(9.9976\times10^{-4}\) wide. It remains a numerical candidate pending
outward-rounded arithmetic; the odd calculation has become a precise
24-vector block-Ritz task rather than an unspecified lower-bound problem.

Wave 7.213 executes the first such block seed. The 24 one-local-odd-mode
product vectors give a dense-controlled Rayleigh and residual calculation,
but every Ritz value lies above the exact 25th-level separator and the
residual-block norm is 0.6339. The result is an admission failure, not evidence
for a closed physical gap: it demonstrates that the low odd cluster is
strongly dressed by configurations outside the bare potential band. The next
subspace must be block-DMRG, Davidson or Krylov enriched, consistent with
quadratic residual analyses designed for clustered Rayleigh--Ritz values
rather than independent scalar residual assignment.

The dependency graph has now been audited backward as well as extended
forward. [Wave 7.190](../frontier/wave-7/frontier_wave7_190_leech_product_to_coupled_dependency_audit.md)
shows that the strip endpoint matching still leaves exactly 24 modes on each
open edge, but each inter-wire bond is one coupled 24-channel cell rather
than 24 pendula. The old 0.8784249807 gap, thermal table, leakage thresholds
and 17-level compiler costs are therefore calibration-surrogate results.
The edge preregistration and weak-interaction stability theorem survive only
conditionally on a joined-cell gap certificate. This correction narrows the
next decisive computation to interval-certified lowest even and odd
eigenvalues of one finite-cutoff Gram-first cell.

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
a genuine action on the pre-projection twisted ground module. The associated
**symmetry** action has now been lifted through the half modes in
[Wave 7.151](../frontier/wave-7/frontier_wave7_151_moonshine_2b_centralizer_semidirect_trace_protocol.md):
the full 98304-state sector carries the compatible
\(2_+^{1+24}.Co_1\) semidirect representation, with 48 seed-covariance checks
and phase-free trace bounds. The distinct zero mode of each minimal-vector
**vertex operator** is derived in
[Wave 7.152](../frontier/wave-7/frontier_wave7_152_moonshine_minimal_vector_twisted_weight2_zero_mode.md).
The twisted Heisenberg exponential supplies the missing rank-one channel
factor, giving
\(O_\alpha=(I-2\alpha(\alpha^TK))\otimes P_{[\alpha]}/8\).
Its spectrum is \(\{\pm7/8,\pm1/8\}\), with multiplicities
\(2048,2048,47104,47104\), and its trace moments are
\((0,4608,2424)\) at powers one, two and four. The 300
oscillator-bilinear zero modes are now closed in
[Wave 7.153](../frontier/wave-7/frontier_wave7_153_moonshine_oscillator_bilinear_twisted_zero_modes.md):
\(B_{h,k}=(hk^\flat+kh^\flat)/2+(h,k)I/8\). The anomalous scalar restores
\(o(\omega)=2I\) and the Griess-unit identity \(o(\omega/2)=I\). Thus the
entire \(98580\)-dimensional untwisted action on the \(98304\)-dimensional
twisted block is now known parametrically. [Wave 7.154](../frontier/wave-7/frontier_wave7_154_moonshine_cross_sector_griess_product_oracle.md)
uses invariant-form adjointness to transpose it into the full
\(T\times T\to U\) product. The result is an executable streaming oracle:
its oscillator component is
\(\langle s,t\rangle[h(-1)k(-1)/2+(h,k)\omega/8]\), and each minimal-pair
coefficient is
\(\langle R_\alpha h,k\rangle\langle P_{[\alpha]}s,t\rangle/16\).
It derives the universal \(e/3\) projection and predicts the marked
cross-sector transition \(-7/4\). Laboratory tomography and held-out closure,
not the abstract cross-sector tensor, are now open.

[Wave 7.155](../frontier/wave-7/frontier_wave7_155_moonshine_cross_sector_sparse_tomography_protocol.md)
turns that oracle into a preregistered sparse experiment. Sixteen of the 24
marked minimal-vector seeds calibrate the channel and Pauli frames; eight are
committed blind. Their normalized transition target is \(-7/8\), while the
bare-Pauli impostor predicts \(+1\). At absolute tolerance 0.02 and family-wise
failure probability 0.05, the eight holdouts require 28842 shots each, or
230736 total. An independent oscillator test distinguishes the required
twisted-vacuum response \(1/8\) from the no-anomaly value zero. These are
experimental targets, not observations; the same-carrier requirement remains.

The operator formulas also close a previously abstract involution junction.
Lam and Shimakura's norm-four axes
\(\omega_\alpha^\pm=\alpha(-1)^2/16\pm u_\alpha/4\), combined with the
compiled zero modes, have twisted-sector spectrum
\(0^{47104},(1/2)^{2048},(1/16)^{49152}\). Their Miyamoto involutions act as
\(-P_{[\alpha]}\) and \(+P_{[\alpha]}\) on the twisted block, so their product
is the \(2B\) sector sign while each involution is class \(2A\). This exact
\((1A,2A,2A,2B)\) Klein four junction is verified for 24 marked pairs in
[Wave 7.156](../frontier/wave-7/frontier_wave7_156_moonshine_norm4_ising_spectrum_2a2b_junction.md).
It joins the Ising/Norton--Sakuma and orbifold-sector lanes on one operator
dictionary; laboratory spectral resolution remains open.

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
