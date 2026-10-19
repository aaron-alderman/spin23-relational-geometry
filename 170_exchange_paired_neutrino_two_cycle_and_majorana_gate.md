# The Exchange-Paired Neutrino Arrows Form a Quadratic Cycle

**Date:** 17 October 2026  
**Branches:** B03, B05, B06 and B11  
**Claim status:** exact block-cycle and anomaly result; Majorana versus sterile-Dirac interpretation remains a CAR question

## 1. The two completed survivors

For survivor \(A\),

\[
(D_A,E_A)=(O_1,R),
\qquad
n_A:=\nu_A^c:O_1\to R.
\]

For survivor \(B\),

\[
(D_B,E_B)=(R,O_1),
\qquad
n_B:=\nu_B^c:R\to O_1.
\]

Thus the completed-carrier exchange sends

\[
s(n_A)=n_B,
\qquad
s(n_B)=n_A.
\]

The two arrows are reverse block orientations.

## 2. One survivor has no quadratic trace cycle

Because source and target differ,

\[
n_A^2=0,
\qquad
n_B^2=0.
\]

Therefore a cyclic internal action using only one survivor cannot form a nonzero holomorphic quadratic trace from \(n_A n_A\) or \(n_B n_B\).

This does not mean a gauge-singlet Weyl fermion cannot have a Majorana mass in ordinary QFT. It means the additional **cyclic block-trace rule** does not represent that mass inside a single oriented support without a conjugation map or reverse arrow.

## 3. The exchange pair closes a two-cycle

Together,

\[
O_1\xrightarrow{n_A}R
\xrightarrow{n_B}O_1
\]

is closed. In normalized one-dimensional block bases,

\[
\operatorname{Tr}(n_Bn_A)=1,
\qquad
\operatorname{Tr}(n_An_B)=1.
\]

For a complex coefficient \(m\), define the exchange-fixed Hermitian operator

\[
N(m)=m n_A+\overline m\,n_B.
\]

Then

\[
N(m)^\dagger=N(m),
\]

and

\[
N(m)^2
=|m|^2(p_{O_1}+p_R).
\]

Its two eigenvalues on the neutral plane are

\[
\pm|m|.
\]

The phase of \(m\) is paired by the exchange rather than forced to vanish.

## 4. Majorana or sterile Dirac?

The same two-by-two block admits two different physical readings.

### Majorana reading

If the CAR real structure identifies \(n_B\) with the charge-conjugate/adjoint presentation of \(n_A\), then the closed two-cycle represents one neutral self-conjugate degree of freedom with a Majorana mass scale \(|m|\).

### Sterile-Dirac reading

If \(n_A\) and \(n_B\) are independent left-handed gauge singlets, the off-diagonal matrix is a Dirac mass mixing two sterile Weyl fields. It contains twice the independent neutral content.

Block incidence and Hermiticity alone do not distinguish these readings. The self-dual CAR relation does.

## 5. Gauge anomalies are unchanged

The new arrow transforms as

\[
(\mathbf1,\mathbf1)_0.
\]

It contributes zero to

\[
SU(3)^3,quad SU(3)^2U(1),quad SU(2)^2U(1),
\quad U(1)^3,quad \text{gravity}^2U(1),
\]

and it adds no \(SU(2)\) doublet, so the Witten parity count is unchanged.

Therefore both the fifteen-state and sixteen-state branches pass the same perturbative and global gauge-anomaly tests.

## 6. Seesaw possibility

The completed support now admits both

\[
y_\nu L\nu^c h_D
\]

and, conditionally on the exchange/CAR interpretation,

\[
M\nu^c\nu^c.
\]

If \(|M|\gg |y_\nu v|\), the ordinary type-I seesaw scaling

\[
m_\nu\sim\frac{|y_\nu v|^2}{|M|}
\]

becomes representation-theoretically available. No hierarchy or numerical mass is derived here; only the required support and cycles are identified.

This supplies a possible physical role for the survivor exchange: it may be unnecessary for charged-particle adjunction but essential for closing the neutral Majorana cycle.

## 7. Relation to the neutral \(H_2\) carrier

The operator

\[
N(m)=
\begin{pmatrix}
0&\overline m\\
m&0
\end{pmatrix}
\]

lives in the same \(O_1/R\) neutral two-face matrix algebra whose real Hermitian part gives \(H_2(\mathbb R)\). Its real and imaginary parts occupy the reciprocal and orientation-odd off-diagonal directions.

Consequently a complex sterile-neutrino mass phase is a concrete candidate source for the oriented \(\sigma_y\) component, while \(|m|\) controls the reciprocal spectral gap. Establishing this requires a dynamical propagator, not just the finite block matrix.

## 8. Stop-everything and falsification gates

**Stop-everything positive:** the full CAR construction identifies the reverse survivor neutral arrow with charge conjugation, produces a type-I seesaw, and the phase of its mass kernel sources the same external orientation variable that controls flavor CP and reciprocal descent.

**Majorana failure:** locality or chirality makes the reverse arrow an independent sterile field, yielding an unobserved light or weakly constrained extra sector rather than one Majorana state.

**Cyclic-rule failure:** the physical Majorana mass exists without any block two-cycle, showing that cyclic internal traces are not a fundamental interaction rule.

**Phenomenological failure:** the resulting neutrino count, mixing or sterile spectrum conflicts with oscillation and cosmological constraints.

## 9. Certificate

The [exchange-neutrino two-cycle certificate](scripts/verify_exchange_neutrino_majorana_gate.mjs) constructs both oriented matrix units, verifies nilpotence of each, the two nonzero cyclic traces, exchange covariance, Hermiticity and the squared mass spectrum, and confirms zero anomaly contributions.

## Companion documents

- [Unique right-handed-neutrino TRO completion](167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [Neutrino Peirce corner](168_neutrino_peirce_corner_restores_gauge_neutral_h2r.md)
- [Exchange-fixed CAR obstruction](165_exchange_fixed_car_gauge_equivariance_obstruction.md)
- [Exchange-paired Yukawa CP gate](164_exchange_paired_yukawas_and_cp_orientation_gate.md)

