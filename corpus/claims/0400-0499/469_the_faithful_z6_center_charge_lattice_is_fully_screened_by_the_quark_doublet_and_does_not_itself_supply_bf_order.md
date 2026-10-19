# The Faithful \(\mathbb Z_6\) Centre-Charge Lattice Is Fully Screened by the Quark Doublet and Does Not Itself Supply BF Order

**Date:** 17 October 2026  
**Branches:** B03, B04, B07, B09, B10, B11, B12 and B14  
**Claim status:** exact finite screening and fundamental-group no-go; defect recovery remains open

## 1. Allowed finite centre labels

Write a representation's finite centre data as

\[
(t,s,y)\in\mathbb Z_3\times\mathbb Z_2\times\mathbb Z_6,
\]

where \(t\) is colour triality, \(s\) is weak doublet parity and \(y=6Y\pmod6\). Descent to the faithful quotient requires

\[
2t+3s+y=0\pmod6.
\]

Exactly six triples satisfy this condition. They form a cyclic group.

## 2. The quark doublet screens the entire finite group

The left-handed quark doublet has

\[
Q:(t,s,y)=(1,1,1).
\]

Its six multiples exhaust all allowed centre labels. The remaining matter charges are powers of this generator:

\[
u^c,d^c=(2,0,2),
\qquad
L,H=(0,1,3),
\qquad
e^c,\nu^c=(0,0,0)
\]

modulo the finite centre lattice.

Therefore every allowed finite electric centre charge can be screened by dynamical Standard-Model matter. There is no residual exact finite electric one-form symmetry hidden in the faithful \(\mathbb Z_6\) quotient.

## 3. The magnetic lattice is not a finite \(\mathbb Z_3\) partner

Using

\[
G_{\mathrm{SM}}\cong S(U(3)\times U(2)),
\]

the determinant constraint sends winding numbers \((m,n)\in\mathbb Z^2\) to \(m+n\). Its kernel is

\[
\{(m,-m):m\in\mathbb Z\}\cong\mathbb Z.
\]

Thus

\[
\pi_1(G_{\mathrm{SM}})\cong\mathbb Z,
\]

not a torsion \(\mathbb Z_3\). The global gauge quotient changes magnetic-flux quantization and the allowed line spectrum, but it does not by itself provide the two finite conjugate groups of a deconfined \(\mathbb Z_3\) BF theory.

## 4. Consequence for the proposed BF bridge

The exact colour \(A_2\) lattice still supplies determinant three and a natural triality discriminant. What fails is the inference

\[
\text{faithful }\mathbb Z_6\text{ quotient}
\Longrightarrow
\text{bulk }\mathbb Z_3\text{ topological order}.
\]

The quark doublet destroys the electric one-form symmetry, while the global group's fundamental group supplies an infinite magnetic lattice rather than a finite conjugate qutrit.

An exact BF sector therefore requires additional structure:

- a boundary condition forbidding quark endpoints;
- a gapped defect on which triality is conserved;
- an emergent rather than microscopic \(\mathbb Z_3\) gauge field;
- a topological coset sector separated from ordinary bulk line operators;
- or anomaly inflow that leaves finite boundary degrees of freedom.

## 5. Massive matter does not restore an exact symmetry

Making quarks heavy may yield an approximate low-energy centre symmetry, but finite-mass worldlines still permit string breaking. Exact topological degeneracy requires an exact superselection rule or an idealized decoupling limit.

Confinement likewise does not by itself restore the ultraviolet one-form symmetry in the presence of dynamical fundamentals. The proposed nine-state carrier must be protected by the defect construction, not assumed from ordinary QCD confinement.

## 6. Claim ledger

- **Exact:** the allowed finite centre labels form \(\mathbb Z_6\).
- **Exact:** the quark doublet generates all six labels.
- **Exact:** dynamical matter screens every finite electric centre class.
- **Exact:** \(\pi_1(S(U(3)\times U(2)))\cong\mathbb Z\), with no finite \(\mathbb Z_3\) torsion factor.
- **No-go:** the faithful quotient alone does not furnish deconfined level-three BF order.
- **Open:** a boundary/defect condition restoring an exact finite triality sector.
- **Not established:** topological protection of the proposed two-qutrit carrier in the Standard-Model vacuum.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** a gauge-invariant defect forbids all local operators carrying the generator \((1,1,1)\) while retaining two finite conjugate line operators.

**Screening falsifier:** an alleged exact centre line can end on an allowed local quark-doublet operator.

**Topology falsifier:** the infinite magnetic winding lattice is treated as a finite \(\mathbb Z_3\) partner without an additional quotient or condensate.

**Approximation falsifier:** heavy-quark approximate centre symmetry is used to claim exact topological degeneracy.

## 8. Certificate

The [faithful-centre screening certificate](../../../verification/verify/verify_sm_z6_center_charge_lattice_is_fully_screened_by_quark_doublet.mjs) enumerates the allowed quotient labels, proves the quark doublet generates all of them and verifies the torsion-free determinant-winding kernel.

## Companion documents

- [Furey colour \(A_2\) bridge and centre obstruction](468_the_furey_color_root_lattice_is_exactly_the_a2_response_but_quarks_obstruct_a_standalone_z3_bf_sector.md)
- [Faithful global \(\mathbb Z_6\) quotient](418_the_faithful_global_group_of_the_puncture_neutral_ternary_stabilizer_has_the_standard_z6_quotient.md)
- [Level-three BF source model](465_level_three_bf_theory_realizes_the_hyperbolic_two_qutrit_carrier_and_its_missing_mutual_phase.md)
- [Domain-wall anomaly gate](../0200-0299/228_one_standard_model_generation_passes_domain_wall_anomaly_gate.md)
