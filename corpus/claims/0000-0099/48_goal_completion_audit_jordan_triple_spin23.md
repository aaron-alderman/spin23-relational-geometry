# Completion Audit: Jordan-Triple Recursion to (Sp(4,\mathbb R)\cong Spin_0(2,3))

**Date:** 16 October 2026  
**Audited objective:** determine precisely whether and under what hypotheses Jordan-triple recursion implies \(Sp(4,\mathbb R)\cong Spin_0(2,3)\), continuously maintain Markdown research documents, and backfill the substantive discussion since the last written synthesis.

---

## 1. Final answer under audit

The unqualified implication is false:

\[
\boxed{
\text{Jordan-triple recursion alone}
\centernot\Longrightarrow
Sp(4,\mathbb R).
}
\]

The exact sufficient statement is:

\[
\boxed{
\begin{gathered}
J\cong\operatorname{Sym}_2(\mathbb R),\\
\{A,X,B\}=AXB+BXA,\\
\text{canonical Tits--Kantor--Koecher closure}
\end{gathered}
\Longrightarrow
\operatorname{TKK}(J)\cong\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).
}
\]

At global-group level,

\[
\boxed{
Sp(4,\mathbb R)/\{\pm I\}\cong SO_0(2,3),
\qquad
Sp(4,\mathbb R)\cong Spin_0(2,3).
}
\]

A basis-independent selection package sufficient to force the carrier is:

\[
\boxed{
\text{finite-dimensional homogeneous self-dual irreducible cone}
+\operatorname{rank}2+\dim_{\mathbb R}3
\Longrightarrow
J\cong H_2(\mathbb R).
}
\]

The physical truth of those selector assumptions remains a research question; it is not part of the proved implication.

---

## 2. Requirement and evidence matrix

| Requirement | Authoritative evidence | Audit finding |
|---|---|---|
| Decide whether an arbitrary Jordan triple implies \(Sp(4,\mathbb R)\) | Counterfamilies and classification discussion in [42](42_jordan_triple_to_sp4r_determination.md) | **Proved false.** Jordan triples yield multiple classical and exceptional TKK algebras. |
| State the exact carrier and triple | \(J=\operatorname{Sym}_2(\mathbb R)\), \(\{A,X,B\}=AXB+BXA\) in [42](42_jordan_triple_to_sp4r_determination.md) | **Complete.** Carrier, product, normalization freedom and closure are explicit. |
| Show the triple reconstructs \(\mathfrak{sp}(4,\mathbb R)\) | Explicit \(3+4+3\) block grading and double commutator in [42](42_jordan_triple_to_sp4r_determination.md) | **Complete.** Product equality is displayed, not inferred from dimension. |
| Verify the Jordan and symplectic identities | Exact-integer script [`verify-jordan-sp4-bridge.mjs`](../../../verification/verify/verify-jordan-sp4-bridge.mjs) and record [45](45_jordan_sp4_executable_certificate.md) | **Passed.** 10/10 symplectic generators, 27/27 double brackets, 27/27 outer symmetries and 243/243 Jordan-identity cases. |
| Explain why \(\mathfrak{so}(2,3)\) appears | Determinant form on \(H_2(\mathbb R)\) in [42](42_jordan_triple_to_sp4r_determination.md) | **Complete.** Signature \((1,2)\) and conformal completion are explicit. |
| Justify the global group, not just the Lie algebra | Primitive-bivector construction, kernel and connected image in [47](47_global_group_isomorphism_sp4r_spin023.md) | **Complete.** The five-dimensional orthogonal representation has kernel \(\{\pm I\}\) and image \(SO_0(2,3)\). |
| Verify the orthogonal representation | Exact-integer script [`verify-sp4-spin23-cover.mjs`](../../../verification/verify/verify-sp4-spin23-cover.mjs) | **Passed.** Five-dimensional metric signature, ten preserved generators and induced rank ten are checked. |
| Clarify what “recursion” must mean | Conditions in Sections 7 and 13 of [42](42_jordan_triple_to_sp4r_determination.md) | **Complete.** Nested evaluation alone is rejected; canonical TKK closure is required. |
| Give hypotheses that select the carrier without naming it | Koecher–Vinberg and Euclidean-Jordan classification chain in [44](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md) | **Complete as a conditional theorem.** HSD, irreducible, rank two and dimension three are visible assumptions. |
| Relate \(Spin(2,4)\) and \(Spin(2,3)\) | Fixed-point descent \(H_2(\mathbb C)^\kappa=H_2(\mathbb R)\) in [44](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md) | **Complete mathematically.** The physical source of \(\kappa\) is explicitly open. |
| Distinguish the carriers | [42](42_jordan_triple_to_sp4r_determination.md) and [47](47_global_group_isomorphism_sp4r_spin023.md) | **Complete.** Jordan carrier dimension 3, symplectic/spinor carrier dimension 4, orthogonal vector carrier dimension 5. |
| Recover the remembered \(AXB\) intuition | [41](41_relational_carrier_jordan_triple_composition.md) and [43](43_relational_carrier_programme_integration_and_provenance.md) | **Complete within available evidence.** Raw sandwich, vectorization, symmetrization and uncertain provenance are distinguished. |
| Test the stress–energy interpretation | [46](46_stress_energy_to_jordan_carrier_reduction_gate.md) | **Complete as a gate analysis.** Full \(T_{\mu\nu}\) is rejected as a Jordan element; the minimal projected-current map and its falsifiers are stated. |
| Integrate the result with the grand narrative | [40](40_grand_synthesis_spin23_pole.md) | **Complete.** Exact Jordan spine and open physical selector are incorporated without promoting speculation. |
| Maintain a navigable document set | [00](00_research_document_map.md) and [90](90_active_goal_research_log.md) | **Complete.** New artifacts are indexed and progress is recorded. |
| Backfill substantive discussion since writing stopped | [40–47](40_grand_synthesis_spin23_pole.md) collectively | **Complete for the accessible conversation.** Pole narrative, relational carrier, provenance, selection theorem, conformal descent, executable checks, stress reduction and group topology are all written. |

---

## 3. Counterexamples establishing that the unrestricted arrow is false

The conclusion cannot follow from the Jordan triple identity alone. Examples include:

\[
\begin{array}{c|c}
\text{Jordan carrier}&\text{conformal/TKK algebra}\\
\hline
\mathbb R&\mathfrak{sl}(2,\mathbb R)\\
\operatorname{Sym}_n(\mathbb R)&\mathfrak{sp}(2n,\mathbb R)\\
H_n(\mathbb C)&\mathfrak{su}(n,n)\\
H_n(\mathbb H)&\mathfrak{so}^*(4n)\\
H_3(\mathbb O)&\mathfrak e_{7(-25)}
\end{array}
\]

Therefore dimension, rank, real form and positivity data are indispensable. This directly answers the “whether” part of the objective.

---

## 4. Minimal algebraic hypotheses

The hypotheses needed for the explicit result are:

1. \(J\) is the real vector space \(\operatorname{Sym}_2(\mathbb R)\), or a Jordan triple isomorphic to it.
2. The triple is the special outer-symmetric product
   \[
   \{A,X,B\}=AXB+BXA
   \]
   up to an overall nonzero normalization.
3. Recursion means closure under the triple followed by the canonical TKK construction.
4. The real form is the split symplectic real form \(\mathfrak{sp}(4,\mathbb R)\), not a compact or complex form.
5. The connected global group is used when identifying the orthogonal image with \(SO_0(2,3)\).

Under these assumptions the implication is proved.

---

## 5. Basis-independent sufficient selector hypotheses

If one does not want to name \(\operatorname{Sym}_2(\mathbb R)\) at the outset, it is sufficient to require:

1. a finite-dimensional real ordered vector space with a proper cone and order unit;
2. homogeneity of the cone;
3. self-duality under a positive inner product;
4. irreducibility of the cone;
5. Jordan rank or operational capacity two;
6. real vector-space dimension three.

Koecher–Vinberg supplies a Euclidean Jordan algebra from items 1–3. Irreducibility makes it simple. Rank two makes it a spin factor. Dimension three selects the three-dimensional spin factor, which is \(H_2(\mathbb R)\).

These assumptions are sufficient, not asserted necessary in every generalized formulation. A non-Euclidean Jordan triple could realize the same Lie algebra through a different presentation. The audit therefore avoids claiming a uniqueness theorem stronger than the classification supports.

---

## 6. Scope boundary: what remains open without invalidating completion

The objective was to determine the implication and its hypotheses. It did not require proving that nature satisfies them. The following remain deliberately open:

- derivation of homogeneity and self-duality from microscopic dynamics;
- physical derivation of rank two and dimension three;
- an intrinsic mechanism selecting \(H_2(\mathbb R)\subset H_2(\mathbb C)\);
- a covariant, dynamically closed stress–energy reduction;
- coupling to Furey’s internal complex module;
- a predictive action and experimental discriminator.

These are next-stage physics questions. The documents state them as open and do not use them as premises for the completed mathematical result.

---

## 7. Verification commands

Run from `C:\Users\aaron\grand-theory`:

```powershell
node verification/verify/verify-jordan-sp4-bridge.mjs
node verification/verify/verify-sp4-spin23-cover.mjs
```

Both scripts use integer arithmetic and have no external package dependency.

The document audit additionally checks that every relative Markdown link resolves. At the time of this audit, the only malformed link-like fragments found were two truncated source previews in the older corpus register; those previews were converted to literal paths and the full relative-link check then passed.

---

## 8. Completion determination

Every explicit part of the objective has direct evidence:

- the unrestricted implication has been refuted;
- the exact conditional theorem has been proved and independently checked;
- the group-level cover has been constructed and independently checked;
- basis-independent sufficient selector hypotheses have been identified;
- ambiguous physical extensions have been isolated instead of assumed;
- all substantive intervening discussion has been written into indexed Markdown artifacts.

Accordingly, the stated research goal is complete at the level it asks for. The wider Furey/Standard-Model/stress–energy research programme remains open and should proceed as a new goal rather than silently enlarging this theorem-determination objective.
