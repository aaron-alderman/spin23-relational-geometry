# Active Research Goal Log

> **Historical completed-goal log.** The theorem-level goal recorded here closed on 16 October 2026. It is retained as provenance, not as the active programme controller. The current programme is summarized in [The admissibility frontier](../../syntheses/the_admissibility_frontier_current_synthesis.md).

**Opened:** 16 October 2026  
**Goal:** determine precisely whether and under what hypotheses

\[
\text{Jordan-triple recursion}
\Longrightarrow Sp(4,\mathbb R)\cong Spin_0(2,3)
\]

and maintain the research record as Markdown throughout.

**Determination status:** completion audit passed on 16 October 2026; the theorem-level goal is complete, while the physical selector and dynamical programme remain open follow-on research.

## Current determination

The unconditional implication is **false**. Jordan triple systems have many Tits–Kantor–Koecher Lie algebras.

A precise conditional result is **true**:

\[
J=\operatorname{Sym}_2(\mathbb R),
\qquad
\{X,Y,Z\}=XYZ+ZYX
\]

has Tits–Kantor–Koecher/conformal Lie algebra

\[
\operatorname{TKK}(J)\cong\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).
\]

At the connected group level this yields the familiar low-dimensional identification

\[
Sp(4,\mathbb R)\cong Spin_0(2,3)
\]

up to the convention used for connected spin groups and covers.

The exact mechanism is the three-grading

\[
\mathfrak{sp}(4,\mathbb R)
=J^{-}\oplus\mathfrak{gl}(2,\mathbb R)\oplus J^{+},
\]

where both \(J^\pm\) are copies of \(\operatorname{Sym}_2(\mathbb R)\). The Jordan triple product is recovered by a double Lie bracket.

## Critical correction

The Jordan carrier \(J\) is three-dimensional. The defining symplectic carrier on which \(Sp(4,\mathbb R)\) acts is four-dimensional. The construction relates them; it does not identify them.

## Documents being maintained

- [Relational carrier and Jordan-triple composition](41_relational_carrier_jordan_triple_composition.md)
- [Determination: Jordan triple to Sp(4,R)](42_jordan_triple_to_sp4r_determination.md)
- [Programme integration and provenance](43_relational_carrier_programme_integration_and_provenance.md)
- [Jordan selection axioms and the \(Spin(2,4)\to Spin_0(2,3)\) descent](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
- [Executable algebra certificate](45_jordan_sp4_executable_certificate.md)
- [Stress–energy to the Jordan carrier: reduction gate](46_stress_energy_to_jordan_carrier_reduction_gate.md)
- [Global group isomorphism \(Sp(4,\mathbb R)\cong Spin_0(2,3)\)](47_global_group_isomorphism_sp4r_spin023.md)
- [Goal completion audit](48_goal_completion_audit_jordan_triple_spin23.md)
- [Grand synthesis](40_grand_synthesis_spin23_pole.md)

## Research status

1. Exact algebraic bridge: **determined**.
2. Conditional uniqueness: **determined**; a homogeneous self-dual irreducible cone of rank/capacity two and real dimension three yields the three-dimensional spin factor \(\cong\operatorname{Sym}_2(\mathbb R)\). Physical derivation of those hypotheses remains open.
3. Derivation from stress–energy: **open**.
4. Physical action, positivity and observable: **open**.
5. Historical provenance of the original \(AXB\) intuition: **unresolved**.
6. Exact conformal descent: **determined mathematically**; \(H_2(\mathbb R)=H_2(\mathbb C)^\kappa\) induces \(\mathfrak{sp}(4,\mathbb R)\subset\mathfrak{su}(2,2)\), or \(\mathfrak{so}(2,3)\subset\mathfrak{so}(2,4)\). The physical origin of \(\kappa\) is open.
7. Executable verification: **passed**; exact integer checks cover the 10 symplectic generators, 27 triple products, 27 outer-symmetry cases and 243 Jordan-identity cases.
8. Minimal stress reduction: **formulated**; a full \(T_{\mu\nu}\) must first be contracted with a timelike flow \(u\) and projected through a codimension-one real structure \(n\) before it becomes an element of \(H_2(\mathbb R)\). Covariant selection and dynamical triple closure remain open.
9. Global group topology: **determined**; the primitive exterior-square representation gives \(Sp(4,\mathbb R)/\{\pm I\}\cong SO_0(2,3)\), and the connected double cover is \(Spin_0(2,3)\). A second exact-integer certificate verifies the five-dimensional metric representation and its full ten-dimensional induced Lie algebra.

## Next mathematical gate

Derive—or falsify—the physical selector that reduces the natural four-dimensional carrier \(H_2(\mathbb C)\) to the real fixed carrier \(H_2(\mathbb R)\), while preserving the complex internal algebra needed for Standard-Model quantum numbers. In parallel, determine whether homogeneity, self-duality, irreducibility, capacity two and dimension three follow from the proposed relational or stress–energy dynamics rather than being assumed.

## Progress record

### 16 October 2026 — exact bridge

- Rejected the unrestricted implication from an arbitrary Jordan triple.
- Identified the exact carrier \(J=\operatorname{Sym}_2(\mathbb R)\).
- Reconstructed its triple as a double bracket in the \(3+4+3\) grading of \(\mathfrak{sp}(4,\mathbb R)\).
- Distinguished the three-dimensional Jordan carrier from the four-dimensional defining symplectic representation.

### 16 October 2026 — selection and descent

- Replaced “assume a Jordan algebra” by the conditional Koecher–Vinberg route from a homogeneous self-dual cone.
- Added irreducibility, capacity two and dimension three as the visible selectors that force \(H_2(\mathbb R)\).
- Identified the exact fixed-point descent \(H_2(\mathbb C)^\kappa=H_2(\mathbb R)\), corresponding to \(Spin_0(2,3)\subset Spin_0(2,4)\).
- Isolated the physical involution as the next decisive unknown.
- Reran the executable certificate successfully with exact integer arithmetic.
- Derived the minimal tensorially valid map \(\Pi_{n,u}(T)=\operatorname{Pauli}_{\mathbb R}(h\cdot T\cdot u)\) and identified its covariance, positivity and image-closure tests.
- Closed the global-topology gap using the primitive-bivector representation, kernel \(\{\pm I\}\), connected image and maximal-compact identification.
- Completed the requirement-by-requirement audit, reran both exact-integer certificates and checked the full Markdown document set for unresolved relative links.
