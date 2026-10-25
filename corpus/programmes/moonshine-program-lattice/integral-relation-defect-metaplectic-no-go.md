# The integral relation rail and metaplectic scalar no-go

**Date:** 25 October 2026

**Status:** explicit lift and congruence kernel constructed; genuine scalar (C_4) route ruled out for the declared one-block metaplectic embedding

**Evidence:** [machine-readable relation ledger](../../../evidence/data/moonshine-integral-relation-defect-metaplectic-no-go-v1.json)

**Certificate:** [exact matrix and phase verifier](../../../verification/verify/verify_moonshine_integral_relation_defect_metaplectic_no_go.mjs)

## Result

The congruence-lift problem can be made completely explicit. In the declared
one-symplectic-pair block (SL(2)hookrightarrow Sp(4)), choose

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

Also (S^2=-I) exactly. The only finite dicyclic relation that fails over the
integers is (S^2=R^{11}). Its defect is

\[
K=S^2R^{-11}=-R^{-11}in\Gamma(23).
\]

Thus the selected integral subgroup does not require an uncontrolled search
through the full principal congruence group. Its kernel over
(mathrm{Dic}_{11}) is the single infinite cyclic rail

\[
1\longrightarrow\langle K\rangle\cong\mathbb Z
\longrightarrow\langle R,S\rangle
\longrightarrow\mathrm{Dic}_{11}
\longrightarrow1.
\]

More importantly, the proposed genuine scalar metaplectic character is
already impossible before evaluating (K). A lift (widetilde S) of the
quarter-turn in the real metaplectic double cover satisfies

\[
\widetilde S^4=\varepsilon,
\]

where (arepsilon) is the nontrivial central element above the identity. A
genuine character must send (arepsilonmapsto-1), and therefore

\[
\chi(\widetilde S)^4=-1.
\]

It follows that (chi(widetilde S)) must be a primitive eighth root, never
(i). Conversely, the finite (C_4) character
(widetilde Smapsto i) has fourth power (+1), so it is non-genuine and
kills the metaplectic center. The earlier requirements

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

Every element of (langle R,Sangle) has a normal form (R^nS^j), with
(jin\{0,1,2,3\}). Reduction modulo 23 is the identity only when

- (j=0) and (n\equiv0\pmod{22}), or
- (j=2) and (n\equiv11\pmod{22}).

Since (K=S^2R^{-11}) and (K^2=R^{-22}), both families are precisely powers
of (K). This proves
(langle R,S\rangle\cap\Gamma(23)=langle K\rangle).

The relation rail remains useful for any future vector-valued calculation:
its multiplier must assign a consistent operator—not merely a scalar guessed
from the finite quotient—to this explicit (K).

## 2. Why the eighth root changes the frontier

There are two different central signs:

1. the dicyclic center (-I=S^2) in the **base** finite group;
2. the metaplectic kernel (arepsilon) above the **identity** symplectic
   transformation.

The finite character (Smapsto i) correctly sends the first sign to (-1),
but it cannot be a genuine character of the double cover because it sends the
second sign to (+1). A genuine metaplectic character does the opposite kind
of bookkeeping: (widetilde S) has an eighth-root value and its square has
value (pm i), not (-1).

Therefore no one-dimensional line simultaneously retains the finite
dicyclic sign in the proposed (C_4) manner and detects the metaplectic
kernel. This is a structural obstruction, not a normalization choice: the
other lift (-widetilde S) has the same fourth power.

## 3. Revised surviving corridor

The scalar sign-retaining 5,280-label proposal is closed in its stated form.
The remaining routes are:

1. the 240-label projective seam using the ordinary (C_2) parity line;
2. a genuinely vector-valued metaplectic/Weil kernel in which the two central
   operations act on different components rather than through one scalar;
3. a different symplectic embedding whose Maslov parity is explicitly shown
   to cancel—this would be a new carrier, not a repair of the one-block map;
4. cross-grade VOA or genus-two sewing data that supplies such a
   vector-valued action directly.

The next calculation is no longer “does a scalar (C_4) cocycle match?” It
is “can an explicit vector-valued sewn kernel represent both central
operations and the relation defect (K) without identifying them?”

## Boundary

This no-go applies to the declared one-block embedding
(SL(2)\hookrightarrow Sp(4)) and to one-dimensional genuine characters. It
does not rule out vector-valued Weil representations, a two-block embedding
with different Maslov parity, or a higher-genus defect module. It also does
not create a physical Wick rotation, clock or detector.

## Sources and corpus links

- Rao, [*The Maslov index on the simply connected covering group and the metaplectic representation*](https://doi.org/10.1016/0022-1236(92)90104-Q)
- Wang, [*Siegel modular forms associated to Weil representations*](https://arxiv.org/abs/2501.12140)
- [Metaplectic congruence-lift gate](metaplectic-congruence-lift-gate.md)
- [Quarter-turn coupling gate](quarter-turn-metaplectic-gate.md)
- [Mixed-level genus-two seam](mixed-level-46-genus-two-seam.md)
- [Exhaustion checkpoint](exhaustion-checkpoint.md)
