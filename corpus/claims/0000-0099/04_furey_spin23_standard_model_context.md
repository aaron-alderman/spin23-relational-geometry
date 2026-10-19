# Furey and Spin(2,3) in Standard-Model context

**Question:** What, precisely, does Furey's division-algebra programme contribute to Aaron's Spin(2,3) proposal, and where do the two frameworks fail to meet?

## 1. Executive conclusion

There is no result in Furey's published programme that derives \(\mathrm{Spin}(2,3)\), a second timelike coordinate, gravity, or the Standard Model stress tensor. Conversely, \(\mathrm{Spin}(2,3)\) by itself does not generate Furey's octonionic colour, charge ladder, three-generation multiplicities or triality structure.

The cleanest possible synthesis is therefore **factorised**:

\[
\boxed{
\text{Spin}(2,3)-related constrained geometry}
\quad\times\quad
\text{division-algebraic internal module}
}
\]

with a single action coupling the factors. The most dangerous synthesis is to identify an internal octonionic/quaternionic direction directly with T2 merely because both are “hidden” or non-ordinary. They are different mathematical categories.

## 2. Side-by-side comparison

| Feature | Spin(2,3) programme | Furey programme | Standard Model requirement |
|---|---|---|---|
| Primary object | indefinite geometry/group; \(Sp(4,\mathbb R)\) | division algebras, multiplication maps, ideals | local chiral gauge QFT |
| Natural role | spacetime/AdS symmetry or Cartan geometry | internal representations and algebraic selection | product of Lorentz and internal actions |
| Spinors | four-real-dimensional fundamental/even-Clifford module | complex-quaternionic Lorentz spinors; Clifford ideals | Weyl spinors of \(Spin(1,3)\) |
| Colour | absent | octonionic/MTIS \(SU(3)\) | \(SU(3)_c\) gauge connection |
| Weak chirality | absent | partial algebraic construction | chiral \(SU(2)_L\) |
| Hypercharge/charge | absent | number/stabiliser and intersection constructions | exact anomaly-free assignments |
| Three generations | absent | chain-algebra multiplicity and triality proposals | three observed chiral families |
| Higgs | absent | triality and symmetry-breaking representations | dynamical complex doublet |
| Gravity | potential geometric home | not developed | Einstein/semiclassical response |
| Stress tensor | candidate higher-dimensional response | not derived as programme core | Hilbert tensor of one action |
| Dynamics | not yet specified | not yet complete | unitary renormalised QFT |

## 3. The spacetime algebra facts

\(\mathrm{Spin}(2,3)\) is locally the symmetry group of four-dimensional anti-de Sitter space and obeys

\[
\mathrm{Spin}(2,3)\cong Sp(4,\mathbb R).
\]

Its Lie algebra has dimension ten. Its maximal compact subgroup is \(U(2)\). The Lorentz group \(\mathrm{Spin}(1,3)\cong SL(2,\mathbb C)\) can occur as the stabiliser used in the AdS coset

\[
AdS_4\simeq SO(2,3)/SO(1,3)
\]

locally, with global qualifications.

In real-Clifford conventions where the first index counts positive generators, one may write the even algebra as a matrix algebra supporting four-real-component spinors; exact \(Cl(p,q)\) labels swap when sign conventions swap. The invariant point is that the spin representation is small and symplectic. It does not contain the \(64\)-complex-dimensional chain algebra used for Furey's generation result.

Furey's recurring spacetime object is instead

\[
\mathbb C\otimes\mathbb H\cong M_2(\mathbb C),
\]

which naturally supports \(SL(2,\mathbb C)\) Lorentz spinors. Her principal unification group in the later particle papers is \(Spin(10)\), not \(Spin(2,3)\). The similar word “Spin” does not imply subgroup descent or shared physical dimensions.

## 4. Three genuine contact points

### 4.1 Selection by compatible structures

Aaron proposes that a stable Lorentzian sector is selected from a larger indefinite configuration geometry. Furey repeatedly obtains the Standard Model algebra as the transformations that preserve several structures simultaneously:

\[
\mathfrak g_{\rm allowed}=\bigcap_a\mathfrak g_a.
\]

This suggests replacing a vague “statistical preference for T1” with a well-defined compatibility condition. A selector \(n\), complex structure \(J\), idempotent \(P\), or family of volume elements could define the common stabiliser. However, the selector must be a field or constrained datum with an equation of motion if the selection is to be physical.

### 4.2 Ideals as physical-state subspaces

The two-time proposal needs a mechanism that removes negative-norm modes and leaves an observable Hilbert space. Furey's use of primitive idempotents and minimal ideals gives an algebraic model of projection:

\[
\mathcal H_{\rm phys}=\mathcal A P.
\]

This is not yet a solution to the ghost problem. An ideal selected inside an internal Clifford algebra is not automatically the kernel/cohomology of the constraints of a two-time field theory. But it suggests a precise research question: can the first-class constraints of the Spin(2,3) theory be represented by an idempotent or BRST complex whose cohomology is a positive Lorentzian ideal carrying Furey's Standard Model module?

### 4.3 Response rather than label

Furey's generators act on internal modules; the Spin(2,3) programme needs geometric response. Both can be joined by a covariant derivative

\[
\mathbb D_\mu
=\partial_\mu+\Omega_\mu^{AB}\Sigma_{AB}
+G_\mu^aT_a+W_\mu^i\tau_i+B_\mu Y,
\]

where \(\Omega\) is the geometric spin/Cartan connection and \(T_a,\tau_i,Y\) are realised on a division-algebraic module. Variation with respect to each connection yields the corresponding current; variation with respect to the tetrad/metric yields stress–energy.

This is the strongest defensible common framework.

## 5. Four false bridges to avoid

### 5.1 Non-associativity is not a time arrow

\[
(ab)c\ne a(bc)
\]

means bracket-sensitive multiplication. It does not by itself select a temporal orientation, increase entropy or make evolution irreversible. Reversible non-associative dynamics can be written; irreversible associative dynamics can also be written.

### 5.2 An internal imaginary unit is not an extra timelike coordinate

A complex structure \(J^2=-1\) acts on a vector space. A timelike tangent vector has negative metric norm. These statements can coexist but neither implies the other. Identifying Furey's chosen octonionic imaginary unit with T2 would require a metric, a bundle map and a dynamical reason.

### 5.3 A Clifford signature is not a physical spacetime count

The same matrix algebra can realise Clifford algebras of different signatures or appear as an endomorphism algebra. An occurrence of \(Cl(p,q)\) in internal multiplication maps does not prove that nature has \(p+q\) spacetime dimensions.

### 5.4 Triality is not the proposed three-strand temporal braid

Spin(8) triality permutes vector and two spinor representation types. A braid group records topological exchanges with relations such as \(\sigma_1\sigma_2\sigma_1=\sigma_2\sigma_1\sigma_2\). Both involve “three,” but they are not the same structure. A functor or explicit representation relating them would be required.

## 6. The safest architecture: external geometry, internal algebra

Let \(\mathcal S_{2,3}\) be a spinor/module associated with the geometric factor and \(\mathcal F\) a Furey-style internal module. Matter fields live in

\[
\Psi\in\Gamma(\mathcal S_{2,3}\otimes\mathcal F).
\]

A selector \(n\) reduces the geometric factor to an effective Lorentz spin bundle,

\[
\mathcal S_{2,3}\xrightarrow{\;P_n\;}\mathcal S_{1,3},
\]

while internal projectors/intersections reduce \(\mathcal F\) to the Standard Model chiral module,

\[
\mathcal F\xrightarrow{\;P_F\;}\mathcal F_{\rm SM}.
\]

The physical field is then

\[
\Psi_{\rm phys}=(P_n\otimes P_F)\Psi.
\]

This keeps the two selection problems distinct. It also exposes the hard requirement: \(P_n\) and \(P_F\) must commute appropriately with the kinetic operator or form a consistent constraint system. Otherwise time evolution leaks out of the physical subspace.

## 7. A Cartan-geometric option

Instead of treating \(\mathbb R^{2,3}\) as a literal five-dimensional spacetime with two times, use \(Spin(2,3)\) as a Cartan gauge group on ordinary four-dimensional spacetime. A symmetry-breaking vector \(V^A\) with fixed norm reduces it to \(Spin(1,3)\). An \(\mathfrak{so}(2,3)\) connection decomposes schematically as

\[
\mathcal A_\mu^{AB}longrightarrow
(\omega_\mu^{ab},\,\ell^{-1}e_\mu^a),
\]

so the Lorentz spin connection and tetrad are components of one Cartan connection. This is related to MacDowell–Mansouri-type AdS gravity.

Advantages:

- no second independent physical clock is required;
- the selected Lorentzian sector is geometrically precise;
- the tetrad needed for fermions and stress–energy emerges naturally;
- Furey's internal algebra can remain a separate fibre.

Limitations:

- it does not implement the thesis's literal T2 transport unless additional structure is added;
- ordinary AdS gauge gravity does not derive the Standard Model internal group;
- the selector and action still have to reproduce GR and observed cosmology.

This is the mathematically conservative interpretation of “Spin(2,3) geometry.”

## 8. A literal two-time option

If the five-dimensional metric itself has two physical timelike directions, the theory must solve:

- ultrahyperbolic initial data rather than an ordinary Cauchy problem;
- negative-norm/negative-energy excitations;
- tachyonic sign from simple T2 Fourier modes;
- closed-timelike/causality risks depending on global geometry;
- recovery of one universal low-energy time for every Standard Model sector.

A possible strategy is a gauge constraint of Bars-type two-time physics or a degenerate/foliated geometry that leaves only one physical time. Furey's ideals could label the surviving internal states, but they do not supply the required first-class spacetime constraints.

## 9. Stress–energy in the combined context

Furey's internal symmetry generators do not change the definition

\[
T_{\mu\nu}=-\frac{2}{\sqrt{-g}}\frac{\delta S}{\delta g^{\mu\nu}}.
\]

They change the representation in which \(\Psi,H\) and gauge fields live and therefore change the multiplicities and couplings appearing in \(S\). A complete Furey-based field theory would still produce the same sector forms:

\[
T=T_{\rm gauge}+T_{\rm scalar}+T_{\rm spinor}+T_{\rm selector}+T_{\rm hidden}.
\]

This supplies a decisive audit rule:

> If a proposed algebraic particle identification cannot be inserted into a generally covariant action and varied to produce a conserved tensor, it is not yet part of the gravitational synthesis.

The reverse audit also holds: a hidden tensor fitted to galaxy dynamics is not a Standard Model derivation unless its fields carry the correct algebraic representations and interactions.

## 10. Coleman–Mandula and factorisation

Under standard assumptions about a nontrivial relativistic \(S\)-matrix, the Coleman–Mandula theorem strongly restricts nontrivial mixing of spacetime and internal symmetries in an ordinary Lie algebra. Supersymmetry is the graded extension highlighted by Haag–Łopuszański–Sohnius.

This does not ban every geometric or nonassociative unification, but it demands precision. The default low-energy structure should be a direct product or controlled semidirect/graded construction. Claiming that colour is literally a spacetime rotation in an extra signature direction risks unwanted multiplet degeneracies and conflicts with observed Lorentz invariance unless the theorem's assumptions are explicitly evaded.

## 11. Research questions created by the comparison

1. Can the Lorentz selector in a \(Spin(2,3)\) Cartan theory be expressed as an algebraic idempotent compatible with a Furey internal idempotent?
2. Does a single covariant Dirac operator preserve the tensor-product physical ideal?
3. Can Furey's intersection principle arise as the vacuum stabiliser of selector fields rather than as an imposed condition?
4. Can the resulting Higgs representation be given a potential that realises the claimed algebraic breaking cascade?
5. Does the total one-loop anomaly polynomial vanish after the full chiral module and any hidden sector are included?
6. Does the selector's stress tensor produce any non-Standard-Model gravitational effect without violating precision Lorentz bounds?
7. Can the model calculate rather than assign one dimensionless observable—such as a mixing relation or portal coefficient?

### 11.1 A newly exact structural meeting

The 2026 nested-embedding construction sharpens the earlier verdict. Its pre-Higgs weak observable block is \(H_2(\mathbb C)\), while its post-Higgs diagonal block is \(\mathbb R\oplus\mathbb R\). The programme’s carrier sits canonically between them:

\[
H_2(\mathbb C)\supset H_2(\mathbb R)\supset\mathbb R\oplus\mathbb R,
\]

with conformal-algebra chain

\[
\mathfrak{so}(2,4)\supset\mathfrak{so}(2,3)\supset\mathfrak{so}(2,2).
\]

This is a genuine algebraic bridge and is developed in [the weak Jordan ladder analysis](69_furey_weak_jordan_ladder_spin23.md). It does not yet connect the dynamics: the source does not select the real middle block, and no shared internal/external involution, Higgs action or stress tensor has been derived.

The first stabilizer test is negative. Under ordinary weak conjugation, the real plane and final diagonal line are preserved by different \(U(1)\) subgroups, with no common continuous generator. The exact middle rung therefore cannot be promoted to an electroweak-breaking stage without additional Higgs-module or antiunitary structure. See the [stabilizer analysis](71_weak_real_form_stabilizer_obstruction.md).

The operator-level route is more promising but not yet selective. The natural endomorphism inventory contains every one-generation Standard-Model representation type, together with mirrors and excess copies. Moreover, extending the real selector to all flavor matrices would force the CP-odd Jarlskog invariant to vanish. The current bridge must therefore combine a chiral endomorphism projector with a sector-limited or flavor-broken real structure; see the [endomorphism inventory](73_furey_endomorphism_sector_inventory.md) and [CP obstruction](74_real_selector_cp_violation_obstruction.md).

The natural \(\dagger\)-split does not supply that projector: it relates each charged block map to its mirror and separates the matrix algebra into real Hermitian and anti-Hermitian halves. A genuinely chiral selection must be complex-linear and arise from an additional grading, ideal or index mechanism. See [the dagger analysis](75_dagger_does_not_select_chirality.md).

A nontrivial external/internal lock can now be written explicitly as a real \(3\times2\) tensor. Its direct electroweak reading is a complex \(|Y|=1\) weak triplet and predicts \(\rho=1/2\), so it cannot be the sole Standard-Model Higgs. Restoring the trace coordinate of the full external \(H_2(\mathbb R)\) adds exactly one neutral real triplet and produces a \(3\times3\) custodial bitriplet with \(\rho=1\). This is the smallest explicit external-index construction joining Furey's neutral weak adjoint to the full Jordan carrier. However, the right \(SO(3)\) protecting the alignment is not a Jordan automorphism, and the complete Jordan-native potential permits independent trace/traceless vacuum values. Quantitatively, \(\rho=(w^2+k^2)/(2k^2)\), so misalignment enters linearly near \(w=k\). See [the full-carrier completion](87_full_jordan_carrier_custodial_completion.md), [Jordan/custodial tension](88_jordan_custodial_symmetry_tension.md), [general native potential](89_jordan_native_full_lock_potential.md), and [rho sensitivity](92_custodial_alignment_rho_sensitivity.md).

The matter gate is also asymmetric. The full lock contains no weak doublet and cannot generate ordinary quark or charged-lepton Yukawas. Its unique renormalizable chiral portal is \(LL\Delta_{Y=1}\), so the fiveplet is not automatically fermiophobic and the triplet vacuum can feed Majorana neutrino masses. Furey's three lepton-doublet block origins yield a six-entry symmetric portal matrix, but cannot yet be interpreted as three generations because the quark and singlet multiplicities do not align. See the [fermion-bilinear gate](99_full_lock_fermion_bilinear_and_fermiophobia_gate.md) and [Furey triplet-portal analysis](../0100-0199/100_furey_lepton_doublet_triplet_portal.md).

## 12. Verdict

Furey provides a plausible **internal kinematic engine**; Spin(2,3) may provide an **external geometric engine**. The Standard Model stress tensor is the coupling shaft. No published derivation currently connects all three.

The synthesis should therefore be presented as a research architecture, not as a completed unification:

\[
\boxed{
\begin{array}{c}
\text{Spin(2,3) selector/Cartan geometry}\\
\downarrow\\
\text{effective Spin(1,3) tetrad and causal structure}
\end{array}}
\quad\otimes\quad
\boxed{
\begin{array}{c}
\text{division-algebraic ideals/intersections}\\
\downarrow\\
\text{effective }SU(3)_c\times SU(2)_L\times U(1)_Y\text{ module}
\end{array}}
\]

\[
\downarrow\quad\text{one local action, one set of Ward identities}\quad\downarrow
\]

\[
\boxed{\text{known Standard Model currents and conserved stress--energy}}
\]

Anything stronger remains to be demonstrated.

## Sources

- The Furey primary sources are listed in [the comprehensive review](02_furey_comprehensive_research_review.md).
- V. Branding, A. Lindström and M. Sobak, [*The energy-momentum tensor of the Standard Model with applications to energy conditions*](https://arxiv.org/abs/2605.08216) (2026).
- S. MacDowell and F. Mansouri, *Unified geometric theory of gravity and supergravity*, Phys. Rev. Lett. 38 (1977) 739; erratum 38 (1977) 1376.
- S. Coleman and J. Mandula, *All possible symmetries of the S matrix*, Phys. Rev. 159 (1967) 1251.

