# Furey–Jordan External/Internal Interface: Representation Constraints Before Dynamics

**Date:** 16 October 2026  
**Branches:** B03 Furey interface and B11 Standard-Model representation synthesis  
**Claim status:** viable tensor-product architecture established; direct Higgs identification rejected; commutant calculation pinned pending a machine-readable full module

---

## 1. Keep the two algebraic jobs distinct

The strongest present division of labor is

\[
\underbrace{Spin_0(2,3)\text{ or }H_2(\mathbb R)}_{\text{external geometry, phase space, response}}
\quad\times\quad
\underbrace{G_{SM}\curvearrowright\mathcal F}_{\text{internal charge and family module}}.
\]

Matter belongs to a bundle of the form

\[
\mathcal S_{\mathrm{ext}}\otimes\mathcal F,
\]

with covariant derivative

\[
D_\mu
=\partial_\mu
+\Omega_\mu^{\mathrm{ext}}
+A_\mu^{SM}.
\]

This conservative product architecture respects the fact that Furey’s complex structures carry charge and chirality information, while the real Jordan slice concerns the external carrier.

---

## 2. Why the selector five is not the Higgs

The complement in

\[
\mathfrak{so}(2,4)=\mathfrak{so}(2,3)\oplus\mathbf5
\]

is the external five-vector of \(Spin(2,3)\). Under a further Lorentz stabilizer,

\[
Spin(2,3)\longrightarrow Spin(1,3),
\]

it decomposes as

\[
\mathbf5\longrightarrow\mathbf4_{\mathrm{Lorentz}}\oplus\mathbf1.
\]

The Standard-Model Higgs is instead

\[
(\mathbf1,\mathbf2)_{1/2}
\]

under \(Spin(1,3)\times SU(2)_L\times U(1)_Y\): it is a Lorentz scalar and an internal complex doublet.

Therefore the numerical fact that both contain “four real components” does not permit an identification. They transform in different categories.

\[
\boxed{
\mathbf4_{\mathrm{Lorentz}}
\ne
\text{four real components of an internal Higgs doublet}.
}
\]

This rules out the simplest direct claim that the broken selector directions are the Higgs.

---

## 3. Allowed gauge-preserving selector couplings

Suppose an external selector field \(\Phi\) is a Standard-Model gauge singlet. Any linear action on the internal module that preserves \(G_{SM}\) must lie in the commutant

\[
\operatorname{End}_{G_{SM}}(\mathcal F).
\]

By Schur’s lemma, on a single irreducible gauge multiplet this action is scalar. Nontrivial matrices can act only among repeated equivalent multiplets—most importantly family multiplicities—or between sectors not distinguished by the preserved gauge group.

Consequently an external gauge-singlet selector can naturally:

- rescale masses or kinetic terms universally;
- couple through \(H^\dagger H\);
- act on generation multiplicity space;
- couple a Lorentz-vector component to gauge-singlet currents;
- modify gravitational or boundary response.

It cannot by itself supply the gauge quantum numbers of the Higgs or gauge bosons.

---

## 4. Higgs and Yukawa maps remain internal intertwiners

A Yukawa coupling requires an intertwiner schematically of the form

\[
Y:\mathcal F_R\otimes H
\longrightarrow\mathcal F_L,
\]

where \(H\) carries the Higgs gauge representation. Furey’s triality or division-algebraic scalar sector may constrain this map. The external selector can at most multiply, grade or choose among allowed internal intertwiners unless a nontrivial locking symmetry is explicitly constructed.

The correct question is therefore not “is the selector the Higgs?” but

> Does the external Jordan/selector structure reduce the commutant or grading of Furey’s allowed Yukawa intertwiners?

That is a precise representation calculation.

---

## 5. The common-idempotent possibility

Both programmes use selection:

- the external side chooses a real form, Lagrangian relation, boundary normal or Cartan stabilizer;
- the internal side uses primitive idempotents, minimal ideals and compatibility intersections.

A genuine synthesis would require commuting or compatible projectors

\[
P_{\mathrm{ext}}P_F=P_FP_{\mathrm{ext}}
\]

on the full matter module, or a single graded projector whose image carries

\[
Spin(1,3)\times G_{SM}.
\]

Merely placing the two projectors in a tensor product makes them commute trivially and predicts nothing. The high-value case is a shared algebra in which compatibility removes otherwise allowed states or couplings.

---

## 6. Boundary interface opportunity

The boundary branch supplies an external defect operator algebra. Furey’s internal module could live on the defect or obey boundary conditions there. Then the relevant intertwiners are boundary operators with definite:

- \(SO(2,3)\) conformal representation;
- Standard-Model gauge representation;
- Furey ideal or generation grade;
- parity and reality type.

This offers a controlled meeting point: defect OPE coefficients and displacement-operator couplings are genuine observables, while internal ideals restrict which boundary fields exist.

---

## 7. Immediate calculation and current blocker

The next exact calculation is the commutant

\[
\operatorname{End}_{G_{SM}}(\mathcal F_{\mathrm{Furey}})
\]

for the complete proposed chiral module, including generation labels and the scalar/triality sector. It should answer:

1. which selector couplings are universal;
2. which act in family space;
3. which mix unwanted mirrors or conjugate sectors;
4. whether the Furey construction restricts Yukawa matrices beyond Standard-Model gauge symmetry;
5. whether any shared involution respects all charges.

The current prose corpus describes the representations but does not provide one canonical machine-readable basis and action table for the latest full module. The calculation is therefore pinned at data preparation, not at a mathematical mystery.

---

## 8. Pin record

### Pinned dependency: full commutant

- **Blocker:** no single machine-readable basis with every \(G_{SM}\) generator, chirality and generation action for the chosen Furey model.
- **Last established point:** external gauge-singlet actions lie in the internal commutant; direct Higgs identification has the wrong transformation type.
- **Unlock condition:** encode or import the complete module action table.
- **Unsafe shortcut:** infer a restricted Yukawa texture from matching representation names or dimensions.

---

## 9. Stop-everything and falsification tests

### Positive

Re-root the synthesis if the full commutant is smaller than an arbitrary family matrix algebra and the surviving intertwiners reproduce a nontrivial observed Yukawa or mixing relation.

An equally strong result would be a shared nontrivial projector that simultaneously selects Lorentzian external states and the internal chiral Standard-Model ideal.

### Negative

Demote the unified interface if the result is only

\[
\text{external theory}\otimes\text{Furey module}
\]

with every gauge-allowed portal coefficient arbitrary. That remains a valid coupling architecture but not an explanatory synthesis.

---

## 10. Branch state

**Established:** the external and internal structures can coexist as a product representation; the selector five is not the Higgs; gauge-preserving selector actions belong to the internal commutant.

**Active:** boundary/defect realization, shared involutions and preparation of a canonical module table.

The later invariant analysis sharpens this statement: with independent external \(SO(2)\) and internal \(SO(3)\) automorphisms, the unique bilinear portal is trace–trace. Any coupling of traceless relational coordinates requires an additional locking tensor and therefore cannot be treated as automatic. See [the minimal portal classification](78_minimal_symmetry_safe_external_internal_portal.md).

**Pinned:** explicit full commutant and Yukawa restriction until the module action is encoded.

## Companion documents

- [Furey technical algebraic guide](03_furey_technical_algebraic_guide.md)
- [Furey and \(Spin(2,3)\) context](04_furey_spin23_standard_model_context.md)
- [Furey–\(Spin(2,3)\)–Standard Model synthesis](05_furey_spin23_standard_model_synthesis.md)
- [Boundary selector](53_boundary_defect_selector_branch.md)
- [Multi-branch registry](49_multi_branch_research_registry.md)
