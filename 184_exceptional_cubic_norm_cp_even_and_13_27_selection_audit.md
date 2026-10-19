# Exceptional Cubic Norm, CP Evenness, and the \(13{:}27\) Selection Audit

**Date:** 17 October 2026  
**Branches:** B03, B06, B09, B10, B12 and B13  
**Claim status:** primary-source comparison plus exact complex-Jordan invariant test; full integral-flag computation remains open

## 1. Two new burdens on the exceptional branch

The preceding local calculations supplied two concrete targets:

1. explain or select the radius-three null-shell orbit weights
   \[
   w_A:w_M=13:27;
   \]
2. relate the independent quark and Majorana CP-odd portal coefficients through one source-derived invariant action.

This document tests whether the established Leech/exceptional-Jordan results already meet either burden.

They do not—but they sharpen what additional structure would be required.

## 2. What Wilson actually derives

Wilson constructs the Leech lattice from triples of integral octonions and derives its 196560 minimal vectors in three families:

\[
3\cdot240,
\qquad
3\cdot240\cdot16,
\qquad
3\cdot240\cdot16^2.
\]

Thus

\[
196560=3\cdot240(1+16+16^2).
\]

The proof uses explicit integral-octonion ideals and identities such as \(LR=2B\) and \(BL=L\). It does not contain a 6-versus-24 cubic lattice shell, a fourth-moment cubature problem, or weights \(13/40\) and \(27/40\). See [Wilson, *Octonions and the Leech lattice*](https://webspace.maths.qmul.ac.uk/r.a.wilson/pubs_files/octoLeech1rev.pdf), especially the minimal-vector enumeration on pp. 3–5.

## 3. What Elkies–Gross actually derives

Elkies and Gross relate an integral structure on the 27-dimensional exceptional cone to:

- 819 Jordan roots;
- a rank-26 even lattice of discriminant three;
- the 24-dimensional Leech lattice;
- the identity
  \[
  196560=240\cdot819.
  \]

The relationship is genuine and much stronger than shared use of octonions. See [Elkies–Gross, *The exceptional cone and the Leech lattice*](https://doi.org/10.1155/S1073792896000426) and the authors' [bibliographic abstract](https://celebratio.org/Gross_BH/article/1029/).

It still does not supply the null-shell orbit measures.

There is a tempting numerical observation:

\[
13=\frac{26}{2},
\qquad
27=\dim H_3(\mathbb O).
\]

But the walk weights arise from

\[
w_A\frac13+w_M\frac{11}{81}=\frac15,
\qquad
w_M\frac8{81}=\frac1{15},
\]

not from splitting the exceptional lattice rank or Jordan dimension. No map currently explains why the trace-zero rank should be halved, why the full dimension should remain unhalved, or why those quantities should weight the two cubic-shell orbits.

The \(13{:}27\) resemblance is therefore a registered clue, not evidence of provenance.

## 4. The Baez–Schwahn flag supplies a disconnected antiunitary component

Baez and Schwahn prove that for a nested pair

\[
H_2(\mathbb C)\subset H_3(\mathbb C)\subset H_3(\mathbb O),
\]

the relevant identity-component stabilizer is the faithful Standard-Model gauge group. They also emphasize that the full stabilizer is disconnected: outside the identity component are transformations acting antiunitarily on \(H_3(\mathbb C)\). See [Baez–Schwahn, *The Standard Model Gauge Group from the Exceptional Jordan Algebra*](https://arxiv.org/html/2606.15235v1), especially their discussion following the stabilizer theorem.

This is directly relevant to the orientation programme. The exceptional flag already contains:

\[
\text{connected gauge transformations}
\quad\text{and}\quad
\text{a disconnected antiunitary operation}.
\]

It is a mathematically credible home for an internal conjugation parity.

But a disconnected component is not yet a dynamical order parameter, and it does not automatically fix a CP-odd coupling.

## 5. Why the cubic norm is not the missing CP-odd contraction

On the complex Jordan subalgebra \(H_3(\mathbb C)\), the cubic Jordan norm is the ordinary determinant:

\[
N(X)=\det X.
\]

For Hermitian \(X\),

\[
\det X\in\mathbb R,
\]

and entrywise conjugation gives

\[
\det\overline X=\overline{\det X}=\det X.
\]

The lower characteristic coefficients \(\operatorname{Tr}X\) and \(\operatorname{Tr}X^2\) are also real and conjugation even.

The antiunitary component belongs to the full Jordan stabilizer, so it preserves the Jordan product and its characteristic invariants. Consequently the exceptional cubic norm is an **even consistency invariant**, not an odd orientation scalar.

It may constrain magnitudes, admissible integral points or vacuum strata. By itself it cannot produce a term that changes sign like \(J_q\) or \(J_M\), and it cannot fix their relative odd coupling.

## 6. What additional exceptional data would be needed

A CP-odd contraction requires more than the real cubic norm. Candidate additions include:

- an oriented complex subalgebra rather than an unoriented one;
- a choice of component in the disconnected stabilizer;
- a complex volume form on the \(\mathbb C^3\) complement;
- a flag-dependent alternating tensor;
- a dynamical field odd under the antiunitary component;
- an integral orientation or cocycle not preserved by the full normalizer.

Any such choice reduces the symmetry. It must be derived from the flag/order or admitted as new selector data.

## 7. Counterterm-selection test

Suppose an exceptional action contains only the trace form and cubic norm of real Jordan variables. Then all its coefficients are even under the antiunitary flag component. It cannot distinguish the two CP orientations and cannot generate a linear odd source.

If an odd flag tensor \(\Omega_F\) is added, one must calculate whether there is a unique invariant of the schematic form

\[
\Omega_F\,\mathcal J_{\rm flavor},
\]

or whether separate quark and lepton contractions remain allowed. The latter reproduces the ordinary-EFT obstruction.

Thus the exceptional branch advances only when it computes the invariant space after the oriented flag is included.

## 8. Consequences for Leech, Conway and moonshine claims

Wilson’s construction correctly links integral octonions to the Leech lattice and hence to Conway symmetry. That does not provide:

- an action on the Furey matter TROs;
- the \(13{:}27\) null-shell measure;
- a CP-odd invariant tensor;
- a common quark/lepton portal coefficient;
- a Monster module or moonshine partition function for the local theory.

The Monster/moonshine branch therefore remains quarantined. It should reopen only after an explicit graded state space or modular function enters a surviving calculation.

## 9. Branch verdicts

### Radius-three shell

**Status:** no source-derived exceptional selection found. The \(13=26/2\), \(27=\dim J\) observation is retained as a clue with zero evidential weight until a map is constructed.

### CP portal

**Status:** cubic norm alone fails by parity. The disconnected antiunitary flag component is relevant new structure, but an odd tensor/order parameter and invariant-space computation are still missing.

### Arithmetic flag

**Status:** remains live. Integral exceptional-Jordan structures and the Leech relation are exact, but compatibility with the Baez–Schwahn nested flag has not been computed.

## 10. Stop-everything and falsification gates

**Arithmetic selection:** an integral nested flag is unique up to arithmetic automorphism and its scalar extension yields the Standard-Model stabilizer.

**Odd-tensor success:** the oriented flag canonically supplies one antiunitary-odd tensor whose invariant space is one-dimensional and couples quark and lepton CP data with fixed ratio.

**Shell success:** the same integral construction produces the radius-three cubic shell and derives \(13{:}27\) without moment fitting.

**Cubic-norm failure:** if only trace and determinant invariants occur, the exceptional sector cannot solve the CP-orientation portal problem.

**Sporadic demotion:** no compatible flag action or local observable is found; Leech/Conway/Monster structures remain mathematical neighbors rather than physical rules.

## 11. Certificate

The [exceptional selection-audit certificate](scripts/verify_exceptional_cubic_cp_even_selection_audit.mjs) checks the exact Wilson/Elkies–Gross counts, rederives the \(13{:}27\) weights solely from fourth moments, and verifies that the trace, quadratic trace and determinant of a complex Hermitian Jordan element are real and invariant under entrywise conjugation.

## Companion documents

- [Octonions and the Leech-lattice branch](33_octonions_leech_lattice_jordan_branch.md)
- [Integral flag and real stabilizer architecture](142_integral_flag_and_real_stabilizer_architecture.md)
- [Weighted 30-link null shell](178_weighted_30_link_null_shell_fourth_order_isotropy.md)
- [Independent CP portal obstruction](183_common_orientation_field_independent_cp_portal_obstruction.md)
- [Grand synthesis](40_grand_synthesis_spin23_pole.md)
