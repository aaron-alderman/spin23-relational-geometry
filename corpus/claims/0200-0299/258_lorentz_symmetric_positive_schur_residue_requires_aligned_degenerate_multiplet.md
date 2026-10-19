# A Lorentz-Symmetric Positive Schur Residue Requires an Aligned Degenerate Multiplet

**Date:** 17 October 2026  
**Branches:** B01, B04, B06, B07 and B11  
**Claim status:** exact positive-residue classification and minimal construction; source of the required degeneracy remains open

## 1. General positive residue

Several heavy modes with one common pole contribute

\[
S=\sum_r v_rv_r^T\geq0
\]

to the Schur residue on the three \(H_2(\mathbb R)\) coordinates.

The Lorentz-conformal condition is

\[
S^T\eta+\eta S=\lambda\eta,
\qquad
\eta=\operatorname{diag}(1,-1,-1).
\]

Since \(S\) is Euclidean symmetric, the condition has the exact solution

\[
\boxed{
S=
\begin{pmatrix}
a&b&c\\
b&a&0\\
c&0&a
\end{pmatrix}.}
\]

Positivity requires

\[
\boxed{a\geq\sqrt{b^2+c^2}\geq0.}
\]

## 2. Minimal rank

A nonzero rank-one positive matrix cannot have this form. On the boundary

\[
a=\sqrt{b^2+c^2}>0,
\]

the eigenvalues are

\[
0,\quad a,\quad 2a,
\]

so the minimum nonzero rank is two.

Therefore:

\[
\boxed{
\text{at least two aligned heavy channels are required}.}
\]

## 3. Explicit two-residue completion

Let

\[
n=(n_1,n_2),
\qquad
n_1^2+n_2^2=1,
\]

and choose

\[
v_1=(1,n_1,n_2),
\qquad
v_2=(0,-n_2,n_1).
\]

Then

\[
v_1v_1^T+v_2v_2^T
=
\begin{pmatrix}
1&n_1&n_2\\
n_1&1&0\\
n_2&0&1
\end{pmatrix},
\]

which is positive, rank two and exactly Lorentz conformal.

Each residue separately breaks the determinant symmetry; only their aligned sum restores it.

## 4. Pole degeneracy is essential

For equal heavy masses,

\[
\Sigma(z)
=
\frac{v_1v_1^T+v_2v_2^T}{M-z},
\]

and the conformal condition holds at every \(z\).

For split masses,

\[
\Sigma(z)
=
\frac{v_1v_1^T}{M_1-z}
+\frac{v_2v_2^T}{M_2-z},
\]

the relative residue weights depend on \(z\). Since neither rank-one term is conformal, the alignment fails whenever

\[
M_1\ne M_2.
\]

More generally, residues at distinct isolated poles must each satisfy the conformal condition independently.

## 5. Implication for the selector spectrum

The minimal paired-Peirce locking has only one heavy exchange-even imaginary response mode. By itself it cannot generate the rank-two aligned completion.

Possible sources of a second degenerate channel include:

- matter/flavor multiplicity;
- another neutral Peirce corner;
- a symmetry partner in a larger Jordan representation;
- a boundary mode required by a full \(Sp(4,\mathbb R)\) multiplet.

But multiplicity alone is insufficient: the coupling vectors and masses must obey the exact alignment.

## 6. Exact versus emergent protection

There are now two clean protection architectures:

1. **Parity protection:** response conjugation forbids all dangerous residues.
2. **Multiplet completion:** a symmetry forces a degenerate aligned positive residue of the classified form.

The first is minimal. The second could be more revealing if Furey/Jordan structure mandates it, because it would turn the apparent obstruction into evidence for a larger response multiplet.

## 7. Stop-everything and falsification gates

**Multiplet trigger:** the full Furey/Peirce response supplies exactly the rank-two vectors and an exact degeneracy.

**Group trigger:** the aligned residue is recognized as part of one \(Sp(4,\mathbb R)\) representation rather than tuned coefficients.

**Splitting observable:** radiative mass splitting predicts a controlled energy-dependent determinant anisotropy.

**Falsifier:** two arbitrary heavy modes are claimed to restore the symmetry without satisfying equal-pole and residue-alignment conditions.

## 8. Certificate

The [positive multi-residue Lorentz-alignment certificate](../../../verification/verify/verify_positive_multi_residue_lorentz_alignment.mjs) constructs the minimal rank-two positive solution, verifies each rank-one summand fails separately, confirms the sum is conformal and shows that splitting the pole masses destroys the identity.

## Companion documents

- [Rank-one determinant-symmetry no-go](257_any_nonzero_rank_one_selector_schur_correction_breaks_lorentz_determinant_symmetry.md)
- [Exchange-allowed selector mixings](256_exchange_symmetry_allows_three_dangerous_selector_mixings.md)
- [Positive Peirce selector locking](253_positive_exchange_diagonal_locking_leaves_exactly_h2r.md)
- [Custodial scalar-loop closure](../0000-0099/93_full_lock_custodial_loop_closure.md)
