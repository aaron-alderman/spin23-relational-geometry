# Thirty-Link Unitarity Reduction and a Helicity-Ansatz No-Go

**Date:** 17 October 2026  
**Branches:** B07, B08, B11 and B13  
**Claim status:** exact autocorrelation reduction and exact no-go for the direction-aligned two-component ansatz; no general two-component no-go

## 1. From moment weights to quantum amplitudes

The 30-link radius-three shell has excellent positive moment properties. A quantum walk instead requires matrices \(A_e\) such that

\[
U(\mathbf k)=\sum_{e\in\mathcal S_{30}}A_e e^{-i\mathbf k\cdot e}
\]

is unitary for every \(\mathbf k\).

Equating Fourier coefficients in \(U^\dagger U=UU^\dagger=I\) gives

\[
\sum_e A_e^\dagger A_{e+r}=\delta_{r0}I,
\qquad
\sum_e A_e A_{e+r}^\dagger=\delta_{r0}I,
\]

where amplitudes outside the support are zero. These are matrix autocorrelation equations, not scalar normalization conditions.

## 2. Difference-graph reduction

The 30-point shell has 326 nonzero directed displacement differences. Their ordered-pair multiplicities are:

| pair multiplicity | number of differences |
|---:|---:|
| 1 | 30 |
| 2 | 204 |
| 4 | 66 |
| 6 | 20 |
| 8 | 6 |

The 30 unique directed differences are exactly the two orientations of the 15 antipodal pairs:

\[
e\longleftrightarrow -e.
\]

Their autocorrelation equations cannot cancel against another pair and therefore impose

\[
\boxed{
A_e^\dagger A_{-e}=0,
\qquad
A_e A_{-e}^\dagger=0.
}
\]

## 3. Consequence for a two-component carrier

Suppose \(A_e,A_{-e}\in M_2(\mathbb C)\) are both nonzero. The first equation makes their output ranges orthogonal; the second makes their input supports orthogonal. Hence

\[
\operatorname{rank}A_e+operatorname{rank}A_{-e}\leq2.
\]

Both matrices must therefore have rank one. Up to complex weights they have the form

\[
A_e=|r_e\rangle\langle d_e|,
\qquad
A_{-e}=|r_e^\perp\rangle\langle d_e^\perp|.
\]

Thus an all-nonzero two-component solution, if it exists, is already forced into a conditional-shift-like system of complementary spin lines on every antipodal pair.

This is a substantial reduction, but not a contradiction.

## 4. Natural cubic helicity ansatz

The simplest covariant choice aligns the input and output spin line with the spatial direction:

\[
P_{\hat e}=\frac12(I+\hat e\cdot\boldsymbol\sigma),
\qquad
A_e=
\begin{cases}
\alpha P_{\hat e},&e\in\mathcal S_A,\\
\beta P_{\hat e},&e\in\mathcal S_M.
\end{cases}
\]

Here \(\mathcal S_A\) is the six-vector axis orbit and \(\mathcal S_M\) is the 24-vector mixed orbit. Since \(P_{\hat e}P_{-\hat e}=0\), the unique antipodal constraints are satisfied exactly.

The opposite-helicity convention gives the same result below.

## 5. Exact factor-of-three contradiction

At zero momentum, antipodal cancellation of the Pauli vectors gives

\[
U(0)=(3\alpha+12\beta)I.
\]

At \(\mathbf k=(\pi,0,0)\), the two axis links in the \(x\)-direction acquire a minus sign while the other four do not, giving an axis contribution \(\alpha I\). Of the mixed links, eight have odd \(x\)-coordinate and sixteen have even \(x\)-coordinate; their vector parts again cancel, giving \(4\beta I\). Therefore

\[
U(\pi,0,0)=(\alpha+4\beta)I,
\]

and hence

\[
\boxed{U(0)=3U(\pi,0,0).}
\]

Unitarity would require the modulus of both scalar coefficients to be one. That is impossible because

\[
|3z|=|z|=1
\]

has no solution.

Thus the direction-aligned two-component helicity ansatz fails for every pair of complex orbit weights \(\alpha,\beta\).

## 6. Scope of the no-go

The result rules out:

- two-component amplitudes proportional to the spatial helicity projectors;
- either common helicity convention;
- arbitrary complex relative amplitude and phase between the two cubic orbits;
- using the positive cubature weights as squared versions of these amplitudes.

It does **not** rule out:

- a mixed-orbit spin line not parallel to \(e\);
- different input and output spin textures;
- a projective cubic action with additional internal phases;
- vanishing amplitudes on a subset of the 30 links;
- a carrier dimension larger than two;
- a staggered or multi-step unit cell.

Because the proper cubic orbit of \((1,2,2)\) has little stabilizer, skew spin textures are not obviously forbidden. They are the next two-component case to solve.

## 7. Relation to the Jordan/Furey programme

The rank-one antipodal structure resembles a polarization into complementary faces. That is compatible with the relational-carrier picture, but the resemblance does not supply the amplitudes.

A meaningful Jordan contribution would have to select the input/output lines and solve the remaining multiplicity-two, -four, -six and -eight autocorrelation equations. Merely assigning \(P_{\hat e}\) by geometric intuition is now excluded.

The Furey carrier offers larger internal block spaces, so a higher-dimensional solution is possible in principle. It must not be accepted merely because more parameters make the equations soluble: the additional components must reduce to the selected chiral matter content rather than become regulator mirrors.

## 8. Stop-everything and falsification gates

**Skew-texture success:** a projectively cubic two-component rank-one texture solves every autocorrelation equation and produces one desired Weyl cone.

**Two-component no-go:** the remaining difference equations force direction alignment or otherwise contradict normalization.

**Furey selection:** the minimal successful carrier dimension and spin texture follow from one of the surviving TRO/linking structures.

**Mirror failure:** a higher-dimensional solution is unitary only because it contains independent light conjugate sectors.

**Geometry demotion:** the 30-link cubature remains useful for classical discretization but admits no physically selected quantum amplitudes.

## 9. Certificate

The [30-link unitarity-reduction certificate](../../../verification/verify/verify_30_link_unitarity_reduction.mjs) enumerates the complete difference multiplicities, identifies all unique pairs as antipodes, verifies projector orthogonality and proves the factor-of-three contradiction at the two high-symmetry momenta.

## Companion documents

- [Weighted 30-link null shell](178_weighted_30_link_null_shell_fourth_order_isotropy.md)
- [Body-diagonal parity theorem](177_body_diagonal_parity_theorem_and_floquet_chirality_balance.md)
- [Eight-body-diagonal Weyl walk](176_eight_body_diagonal_weyl_walk_and_null_speed_gate.md)
- [Furey TRO to walk-coin support](150_furey_tro_to_walk_coin_translation.md)
