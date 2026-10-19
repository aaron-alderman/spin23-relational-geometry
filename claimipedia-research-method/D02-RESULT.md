# D-02 result: the local law survives; the global law splits

**Disposition:** retain the fixed-support theorem; split the rank-changing problem into stratum-specific calculi; transport decorations only under explicit compatibility rules.

## 1. Exact bounded local theorem

Let

\[
K(z)=\begin{pmatrix}A(z)&B\\B^T&D(z)\end{pmatrix}
\]

be a finite-dimensional reciprocal block response on the upper half-plane. Assume:

1. `A` and the restriction of `D` to a fixed support `R` are analytic Herglotz functions;
2. `D` has one constant kernel `N` and is invertible on `R`;
3. `B` is real, frequency-independent and satisfies the range condition `B P_N = 0`.

Then

\[
D^+(z)=P_R(D|_R)^{-1}P_R
\]

is analytic and

\[
K_{\mathrm{eff}}(z)=A(z)-BD^+(z)B^T
\]

is Herglotz. Indeed,

\[
\operatorname{Im}K_{\mathrm{eff}}
=\operatorname{Im}A
+B(D|_R)^{-\dagger}\operatorname{Im}(D|_R)(D|_R)^{-1}B^T\succeq0.
\]

The operation is independent of a null regulator. Under an orthogonal support-frame change `U`,

\[
D_R\mapsto U^T D_RU,
\qquad B_R\mapsto B_RU,
\]

and the correction `B_R D_R^{-1} B_R^T` is unchanged. Thus the local law belongs to the support bundle, not to a chosen frame.

This theorem was already present in corpus document 215. The strike independently re-ran its finite cases and added an explicit support-frame covariance test.

## 2. Minimal rank-change obstruction

Take one eliminated channel with

\[
D_t(z)=tz,
\qquad \operatorname{Im}z>0,
\]

and two continuous coupling paths approaching the same limiting full block:

\[
B_t^{(1)}=b\sqrt t,
\qquad
B_t^{(2)}=bt.
\]

Both have `D_t → 0` and `B_t → 0`. For every `t>0`, ordinary Schur elimination is lawful and passive. But

\[
B_t^{(1)}D_t^{-1}B_t^{(1)T}=\frac{b^2}{z},
\qquad
B_t^{(2)}D_t^{-1}B_t^{(2)T}=\frac{tb^2}{z}\to0.
\]

At `t=0`, the Moore–Penrose prescription also gives zero. Therefore the same limiting full block has at least two inequivalent eliminated limits: one retains a finite pole term and one does not.

This refutes a canonical continuous extension determined only by the limiting block matrix. Rank-changing loci require additional approach, residue, scaling or retained-mode data.

## 3. Decoration transport

| Decoration | Result | Exact boundary |
|---|---|---|
| Ward null/support | Preserved locally | Constant support plus `B P_N=0`; otherwise regulator divergence |
| KMS temperature | Preserved locally | One common temperature and real frequency-independent sewing; unequal temperatures leave the equilibrium class |
| Passive/Herglotz carrier | Preserved locally | Each permitted inverse/support-inverse handler satisfies the positivity identity |
| Support-frame covariance | Preserved locally | Frame transformations must carry `D`, `B` and the support projector together |
| Wall spectral residue | Preserved when probe-visible | An invisible zero mode has no boundary residue and must not be inferred |
| Wall chiral index | Not determined by the projected response | Keep grading/bulk index as a separate decoration or emit an explicit loss receipt |

The wall-index negative case is exact: a chiral Hamiltonian and the direct sum obtained by adding an uncoupled positive-grade zero mode have identical projected boundary resolvents for probes in the original summand, while their bulk indices differ by one.

## 4. Branch update

- **Fixed-support calculus:** `MERGED/RETAIN`. Ordinary inverse and support pseudoinverse are two local handlers of one passive law.
- **Global rank-changing calculus:** `SPLIT`. No path-independent continuation follows from the limiting block alone.
- **Residue calculus:** `OPEN`. Pole/residue data are required and may connect neighboring strata, but a complete gluing theorem remains outstanding.
- **Decoration-preserving calculus:** `OPEN–UNCOMFORTABLE`. Ward and common-temperature KMS data transport locally; the bulk wall index does not descend to the common boundary carrier.
- **Universal physical-unification reading:** `NO-GO`. Shared local composition does not identify the underlying physical systems.

## 5. Revised lightning chain

The strike closes the local portion of LS4–LS5 and the support-frame portion of LS6. LS7 does not close as a universal preservation law: it becomes a typed compatibility matrix with preservation, loss and refusal outcomes. The original terminal proposition survives only in that partial, receipt-producing form.

The next discriminant is no longer another local inverse calculation. It is whether residue and approach-direction data admit a canonical groupoid or measure-valued gluing law across rank-changing strata. Until that exists, global composition must remain split.

## 6. Independent mathematical context

- [Gesztesy and Tsekanovskii, *On Matrix-Valued Herglotz Functions*](https://arxiv.org/abs/funct-an/9712004) supplies the matrix-valued Herglotz representation and linear-fractional setting.
- [Friedrich, Günther and Klotz, *A generalized Schur complement for non-negative operators on linear space*](https://arxiv.org/abs/1708.01545) places generalized Schur complementation in a broader non-negative-operator setting.

These sources support the surrounding mathematical framework. The two-path rank-change obstruction and the decoration disposition are the bounded results of this strike and retain proposal-only authority pending independent review.

