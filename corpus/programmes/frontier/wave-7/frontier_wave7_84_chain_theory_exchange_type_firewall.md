# Frontier Wave 7.84: The Chain-Theory Exchange Type Firewall

**Date:** 25 October 2026
**Status:** direct selector-to-exchange identification closed by representation fingerprints; a two-copy record functor remains open
**Certificate:** [exchange-type verifier](../../../../verification/verify/verify_chain_theory_exchange_type_firewall.mjs)

## Result

The corpus selector operations cannot be identified directly with the two
exchanges used in the target record census.

The target operations (X) and (Y) are independent commuting involutions on
a 172-dimensional two-read record space. The corpus operations (R) and (H)
act internally on the two- and three-dimensional endpoint carriers. Their
orders, domains and joint spectral fingerprints differ.

The required bridge is therefore not a change of basis. It is a functor that
takes a typed endpoint channel, forms two read copies and constructs their
record algebra together with its copy exchanges.

## 1. Target exchange fingerprint

Using signs (+) and (-) for the two exchange eigenvalues, the target joint
sectors are

\[
(n_{++},n_{+-},n_{-+},n_{--})
=(79,48,42,3).
\]

Consequently

\[
\dim\mathcal R_{
m records}=172,
\]

and the three character traces are

\[
\operatorname{tr}X=82,
\qquad
\operatorname{tr}Y=70,
\qquad
\operatorname{tr}(XY)=-8.
\]

These traces and joint multiplicities are invariant under a simultaneous
change of basis. They are a stronger comparison than the statement that both
constructions contain involutions.

## 2. Existing endpoint involutions

The repaired corpus endpoint actions contain

\[
H_2=-I_2
\]

on the two-sector and a sign-twisted reflection (H_3) on the three-sector.
Separating their left and right actions on

\[
\operatorname{Hom}(\mathbb C^3,\mathbb C^2)
\]

does give two commuting involutions, because left and right multiplication
commute. But their six-dimensional joint-sector fingerprint is

\[
(0,0,2,4),
\]

up to sign and sector relabelling. Central parity on the two-sector forces one
involution to have only a single eigenvalue.

Using the unrepaired ordinary two-dimensional reflection fills all four
sectors, but gives

\[
(1,2,1,2),
\]

again up to relabelling. Neither fingerprint is proportional to

\[
(79,48,42,3).
\]

The order-three selector (R) cannot repair this direct comparison: it is not
an involution.

## 3. Why this is not a failure of the inverse programme

The target exchanges do not act on the one-link carrier. They act only after
the read has been copied into two labelled links:

\[
(Q_1,q_1;Q_2,q_2).
\]

The 172-dimensional space then includes products of letters at different
slots and three additional commutator records. No existing endpoint
representation is supposed to have that dimension or spectrum before the
record construction.

The failed direct identification therefore removes a shortcut:

\[
\boxed{R,H\ne X,Y.}
\]

What remains possible is

\[
\boxed{
\mathcal F_{\rm record}(K;	ext{two copies})
=(\mathcal R,X,Y),
}

where (mathcal F_{
m record}) must specify:

1. how the rectangular read is copied;
2. which endpoint observables become letters;
3. which two-letter products are retained;
4. why the qubit commutators are additional records;
5. how read-swap and far-end-swap act; and
6. which trace form normalizes the resulting algebra.

## 4. Nearest corpus construction

The corpus already has many of the ingredients separately:

- typed partial sewing supplies the rectangular map;
- Stinespring/Kraus constructions explain how a channel acquires labelled
  environment copies;
- the three-relationship lane distinguishes elementary arms from generated
  cross terms;
- selector parities supply internal endpoint fingerprints;
- detector lanes preserve preparation and measurement records rather than
  quotienting them away.

None currently assembles those ingredients into the target record functor.
In particular, the corpus order-two pulse tests endpoint parity; it does not
by itself exchange two independently labelled reads.

## 5. Revised next gate

The next calculation should not attempt to transport (R,H) directly into
(X,Y). It should construct the doubled channel

\[
K_1\otimes K_2
\]

with explicit copy labels and then derive the two permutation actions:

- exchange the read labels while retaining their endpoint typing;
- exchange only the far-end qubits while keeping the shared qutrit fixed.

The decisive question is whether the corpus's ordinary tensor, Kraus and
Jordan-composition rules produce the target record subspace, rather than the
full unconstrained operator tensor product.

## Verdict

The selector-to-exchange shortcut is closed. The inverse programme survives
in a sharper form: **construct or falsify a two-copy record functor.** If such
a functor independently produces the four sector traces

\[
(82,70,-8),

\]

then the coefficient tuple follows without a numerical fit. If it produces a
different invariant subspace, the target and corpus carriers are not the same
physical construction.

## Corpus anchors

- [common-carrier intertwiner classification](frontier_wave7_76_common_carrier_intertwiner_classification.md)
- [reverse-phase physical selection](frontier_wave7_78_reverse_phase_physical_selection_boundary.md)
- [two-by-three calibration protocol](frontier_wave7_80_two_by_three_selector_calibration_protocol.md)
- [inverse arithmetic target](frontier_wave7_82_chain_theory_two_by_three_inverse_reconstruction.md)
- [read-end rectangular gate](frontier_wave7_83_chain_theory_read_end_rectangular_gate.md)
