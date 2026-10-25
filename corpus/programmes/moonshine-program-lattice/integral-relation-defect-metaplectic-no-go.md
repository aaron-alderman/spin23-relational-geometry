# The integral relation rail and finite-\(C_4\) metaplectic no-go

**Date:** 25 October 2026

**Status:** explicit lift and congruence kernel constructed; identification of the finite \(C_4\) character with a genuine scalar metaplectic character ruled out

**Evidence:** [machine-readable relation ledger](../../../evidence/data/moonshine-integral-relation-defect-metaplectic-no-go-v1.json)

**Certificate:** [exact matrix and phase verifier](../../../verification/verify/verify_moonshine_integral_relation_defect_metaplectic_no_go.mjs)

## Result

The congruence-lift problem can be made completely explicit. In the declared
one-symplectic-pair block \(SL(2)\hookrightarrow Sp(4)\), choose

\[
R=
\begin{pmatrix}5&23\\23&106\end{pmatrix},
\qquad
S=
\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
\]

Both have determinant one, and modulo 23 they reduce to

\[
\bar R=\operatorname{diag}(5,14)=D_5,
\qquad
\bar S(a,b)=(b,-a).
\]

The lift was chosen symmetric, so the inversion relation closes **exactly**:

\[
SRS^{-1}=R^{-1}.
\]

Also \(S^2=-I\) exactly. The only finite dicyclic relation that fails over the
integers is \(S^2=R^{11}\). Its defect is

\[
K=S^2R^{-11}=-R^{-11}\in\Gamma(23).
\]

Thus the selected integral subgroup does not require an uncontrolled search
through the full principal congruence group. Its kernel over
\(\mathrm{Dic}_{11}\) is the single infinite cyclic rail

\[
1\longrightarrow\langle K\rangle\cong\mathbb Z
\longrightarrow\langle R,S\rangle
\longrightarrow\mathrm{Dic}_{11}
\longrightarrow1.
\]

The finite \(C_4\) character cannot be promoted unchanged to a genuine
metaplectic character. A lift \(\widetilde S\) of the quarter-turn satisfies

\[
\widetilde S^4=\varepsilon,
\]

where \(\varepsilon\) is the nontrivial central element above the identity. A
genuine character sends \(\varepsilon\mapsto-1\), and therefore

\[
\chi(\widetilde S)^4=-1.
\]

It follows that \(\chi(\widetilde S)\) must be a primitive eighth root, never
\(i\). Conversely, the finite \(C_4\) assignment
\(\widetilde S\mapsto i\) has fourth power \(+1\), so it kills the
metaplectic center. The requirements

\[
\widetilde S\mapsto i,
\qquad
\varepsilon\mapsto-1
\]

cannot hold simultaneously.

## 1. The exact relation defect

The eleventh power is

\[
R^{11}=
\begin{pmatrix}
1416117336519507874666 & 6525899079200191817257\\
6525899079200191817257 & 30073326336485567593925
\end{pmatrix}
\equiv-I\pmod{23}.
\]

Hence

\[
K=
\begin{pmatrix}
-30073326336485567593925 & 6525899079200191817257\\
6525899079200191817257 & -1416117336519507874666
\end{pmatrix}
\equiv I\pmod{23}.
\]

Every element of \(\langle R,S\rangle\) has a normal form \(R^nS^j\), with
\(j\in\{0,1,2,3\}\). Reduction modulo 23 is the identity only when

- \(j=0\) and \(n\equiv0\pmod{22}\), or
- \(j=2\) and \(n\equiv11\pmod{22}\).

Since \(K=S^2R^{-11}\) and \(K^2=R^{-22}\), both families are precisely powers
of \(K\). This proves
\(\langle R,S\rangle\cap\Gamma(23)=\langle K\rangle\).

The relation rail remains useful for every scalar or vector-valued
calculation: its multiplier must assign a consistent phase or operator to
this explicit \(K\).

## 2. The two central operations

There are two different central objects:

1. the dicyclic center \(-I=S^2\) in the **base** finite group;
2. the metaplectic kernel \(\varepsilon\) above the **identity** symplectic
   transformation.

The finite character \(S\mapsto i\) sends the first to \(-1\), but it sends
the second to \(+1\). A genuine metaplectic character instead gives
\(\widetilde S\) an eighth-root value and sends its square to \(\pm i\), not
\(-1\). This obstruction is not a normalization choice: the other lift
\(-\widetilde S\) has the same fourth power.

## 3. Revised surviving corridor

The finite-\(C_4\)-valued 5,280-label proposal is closed in its stated form.
The [Dedekind eta audit](dedekind-eta-relation-phase.md) supplies a narrower
scalar survivor:

\[
\widetilde S\mapsto\zeta_8,\qquad
\widetilde S^2\mapsto i,\qquad
\varepsilon\mapsto-1,\qquad
K\mapsto i.
\]

The remaining routes are:

1. the 240-label projective seam using the ordinary \(C_2\) parity line;
2. the genuine eta line, pending comparison with the sewn defect phase on
   \(K\);
3. a vector-valued metaplectic/Weil kernel in which the two central
   operations act on distinct components;
4. a different symplectic embedding whose Maslov parity is explicitly shown
   to differ—this would be a new carrier, not a repair of the one-block map;
5. cross-grade VOA or genus-two sewing data that supplies the required
   action directly.

The next scalar calculation is the comparison between
\(v_\eta(K)=i\) and the sewn order-23 defect/Pfaffian phase on \(K\). A
mismatch moves the route to a vector-valued kernel.

## Boundary

This no-go applies to identifying the finite character
\(S\mapsto i,\ S^2\mapsto-1\) with a one-dimensional genuine character of
the declared one-block embedding. It does not rule out genuine scalar
eighth-root multipliers, vector-valued Weil representations, a different
embedding with different Maslov parity, or a higher-genus defect module. It
also does not create a physical Wick rotation, clock or detector.

## Sources and corpus links

- Rao, [*The Maslov index on the simply connected covering group and the metaplectic representation*](https://doi.org/10.1016/0022-1236(92)90104-Q)
- Wang, [*Siegel modular forms associated to Weil representations*](https://arxiv.org/abs/2501.12140)
- [Dedekind eta relation phase](dedekind-eta-relation-phase.md)
- [Metaplectic congruence-lift gate](metaplectic-congruence-lift-gate.md)
- [Quarter-turn coupling gate](quarter-turn-metaplectic-gate.md)
- [Mixed-level genus-two seam](mixed-level-46-genus-two-seam.md)
- [Exhaustion checkpoint](exhaustion-checkpoint.md)
