# The Full Passive Silver-Loss Family Has Positive C3 Barycentric Effects and Exact Six-Port Dilations

**Date:** 17 October 2026  
**Branches:** passive Schur loss, global POVM positivity, order-three Naimark dilation, Bernstein certificates, and coherent environment ports  
**Claim status:** exact theorem on the full passive-loss quadrant; broadband analytic dilation remains open  
**Certificates:** [symbolic derivation](scripts/derive_passive_silver_loss_povm_positivity.py) and [dependency-free exact $\mathbb Q(\sqrt2)$ certificate](scripts/certify_global_passive_silver_loss_c3_povm.mjs)

## Executive result

The 81-point positivity census in document 929 was not hiding an interior failure. For every pair of passive attenuations

\[
\ell_n,\ell_t\geq0,
\]

the lossy silver-pole cycle has positive operator-valued barycentric coordinates at the three cube roots of unity:

\[
C=P_0+\zeta P_1+\zeta^2P_2,
\qquad
P_k\succeq0,
\qquad
\sum_kP_k=I_2.
\]

At the lossless point, the ranks are \((0,1,1)\). At every finite nonzero loss pair, including loss in only one channel, all three effects are positive definite and the ranks are \((2,2,2)\). Hence every strictly lossy member has an exact six-dimensional order-three Naimark dilation.

This is a pointwise theorem in the loss parameters. It does **not** yet provide one frequency-independent embedding that dilates the entire dispersive transfer function analytically.

## 1. Passive coordinates and the two scalar channels

Put

\[
p=e^{-\ell_n},\qquad q=e^{-\ell_t},\qquad 0\leq p,q\leq1,
\]

and use the reciprocal silver numbers

\[
r=1+\sqrt2,\qquad h=\sqrt2-1=r^{-1}.
\]

For

\[
f(\gamma,\ell)
=\left(\frac{1-i\gamma e^{-\ell}}{1+i\gamma e^{\ell}}\right)^2,
\]

write \(a=f(r,\ell_n)\), \(b=f(h,\ell_t)\). Their real and imaginary parts factor as

\[
\begin{aligned}
\Re a&=-\frac{r^2p^2(1-p^2)^2}{(p^2+r^2)^2},
&\Im a&= \frac{4r^2p^3(1+p^2)}{(p^2+r^2)^2},\\
\Re b&=-\frac{h^2q^2(1-q^2)^2}{(q^2+h^2)^2},
&\Im b&=-\frac{4h^2q^3(1+q^2)}{(q^2+h^2)^2}.
\end{aligned}
\]

The opposite imaginary signs are the passive continuation of the two opposite checkpoint eigenphases.

## 2. The matrix problem collapses to five scalar inequalities

Let

\[
x=|a|^2,\quad y=|b|^2,\quad \bar ab=u+iv.
\]

For the fixed 60-degree mixing frame, the Hermitian real part of the cycle is diagonal:

\[
\operatorname{Re}_{H}C=
\begin{pmatrix}
(-x+3y+6u)/8&0\\
0&(3x-y+6u)/8
\end{pmatrix}.
\]

The unique root-of-unity barycentric effects are

\[
P_0=\frac{I+2\operatorname{Re}_{H}C}{3},
\qquad
P_{1,2}=\frac{I-P_0}{2}\pm\frac{\operatorname{Im}_{H}C}{\sqrt3}.
\]

Thus \(P_0\) is diagonal and \(P_1,P_2\) are isospectral. Positivity is equivalent to

\[
0\leq (P_0)_{11},(P_0)_{22}\leq1,
\qquad
\det P_1\geq0.
\]

The original matrix-valued global question is therefore exactly five real polynomial-sign questions.

## 3. Common-denominator polynomial form

Define

\[
D_a=(p^2+r^2)^2,qquad D_b=(q^2+h^2)^2,qquad M=D_aD_b,
\]

\[
X=p^4(1+r^2p^2)^2,qquad
Y=q^4(1+h^2q^2)^2,
\]

\[
U=p^2q^2\left[(1-p^2)^2(1-q^2)^2-16pq(1+p^2)(1+q^2)\right],
\]

\[
V=4p^2q^2\left[q(1-p^2)^2(1+q^2)+p(1+p^2)(1-q^2)^2\right].
\]

Then

\[
x=\frac{XD_b}{M},\qquad
y=\frac{YD_a}{M},\qquad
u=\frac{U}{M},\qquad
v=\frac{V}{M}.
\]

All denominators are strictly positive on the closed unit square. The four diagonal bounds have bidegree-\((8,8)\) numerators. After clearing the denominator, \(\det P_1\) has a bidegree-\((16,16)\) numerator with 104 nonzero power-basis terms.

## 4. Exact Bernstein certificate

For a bidegree-\((m,n)\) polynomial, write

\[
N(p,q)=\sum_{i=0}^{m}\sum_{j=0}^{n}
\beta_{ij}B_i^m(p)B_j^n(q),
\]

where every Bernstein basis function is nonnegative on \([0,1]^2\). Exact arithmetic in \(\mathbb Q(\sqrt2)\) gives:

| numerator | bidegree | Bernstein coefficients | negative | zero indices |
|---|---:|---:|---:|---|
| \((P_0)_{11}\) | \((8,8)\) | 81 | 0 | \((8,7),(8,8)\) |
| \((P_0)_{22}\) | \((8,8)\) | 81 | 0 | \((7,8),(8,8)\) |
| \(1-(P_0)_{11}\) | \((8,8)\) | 81 | 0 | none |
| \(1-(P_0)_{22}\) | \((8,8)\) | 81 | 0 | none |
| \(\det P_1\) | \((16,16)\) | 289 | 0 | \((16,16)\) |

Every coefficient sign is asserted symbolically, not inferred from floating-point sampling. Since the only determinant zero coefficient is the terminal \((16,16)\) coefficient, the determinant is strictly positive everywhere except \((p,q)=(1,1)\). The same basis argument shows both entries of \(P_0\) are strictly positive away from that corner. Therefore

\[
\boxed{P_0,P_1,P_2\succ0\quad\text{for every nonzero passive attenuation}.}
\]

At \((p,q)=(1,1)\), \(P_0=0\) and \(P_1,P_2\) are the two rank-one spectral projectors of the exact order-three cycle.

## 5. Dilation consequence

Choose \(B_k\) with \(B_k^*B_k=P_k\), and define

\[
V\psi=(B_0\psi,B_1\psi,B_2\psi),
\qquad
\widetilde C=\operatorname{diag}(I_2,\zeta I_2,\zeta^2I_2).
\]

Then

\[
V^*V=I_2,qquad
V^*\widetilde C V=C,qquad
\widetilde C^3=I_6.
\]

Strict loss gives three rank-two effects, so any dilation with these three spectral values needs at least \(2+2+2=6\) dimensions. The construction is therefore minimal within the three-character spectral realization.

The twelve-port full-selector construction of document 930 consequently applies to the entire finite passive-loss quadrant, not merely the earlier witness points.

## 6. What this closes and what it does not

Closed:

- positivity of the three barycentric effects on the whole passive quadrant;
- absence of hidden interior or one-channel-loss failures;
- full-rank six-port dilation for every strictly lossy point;
- the exact lossless rank collapse to the two nontrivial characters;
- global applicability of the pointwise twelve-port order-eighteen extension.

Still open:

- one analytic inner dilation valid for all frequencies at once;
- a frequency-independent physical port embedding;
- microscopic derivation of the effect factors from the Furey/mediator boundary action;
- coherence protection of the environment ports;
- whether the common-mode activation has an observable Standard-Model interpretation.

## 7. Stop-everything and falsification criteria

**Broadband trigger:** construct one rational-inner \(\widetilde C(z)\) and constant isometry \(V\) satisfying \(V^*\widetilde C(z)V=C(z)\) throughout a frequency domain.

**Microscopic trigger:** derive the three positive effect factors as boundary couplings of one typed three-label field.

**Minimality falsifier:** find a strict-loss point at which an effect loses rank, or a three-character unitary dilation of dimension below six.

**Global-positivity falsifier:** exhibit \(p,q\in[0,1]\) giving a negative principal minor. This would contradict the exact nonnegative Bernstein expansion and must first locate an error in the displayed algebra or certificate.

**Overclaim warning:** pointwise Naimark dilation does not imply a causal broadband dilation with fixed ports.

## 8. Verdict

| Question | Verdict |
|---|---|
| Was the 81-point census representative of the full passive quadrant? | **yes, now proved exactly** |
| Are all three effects positive semidefinite for arbitrary passive loss? | **yes** |
| Are they full rank away from zero loss? | **yes** |
| Is the strict-loss six-port dilation minimal in the three-character construction? | **yes** |
| Does this solve broadband analytic dilation? | **no** |

## 9. Position in the corpus

- [strict passive-loss reduced no-go](928_strict_passive_loss_destroys_exact_finite_order_in_the_reduced_selector_network.md)
- [initial Naimark construction and finite census](929_the_lossy_active_cycle_has_an_exact_six_port_order_three_naimark_dilation_but_the_handle_lift_is_not_automatic.md)
- [full twelve-port selector dilation](930_the_lossy_four_channel_selector_is_the_compression_of_an_exact_twelve_port_order18_unitary_representation.md)
- [broadband analytic-dilation boundary](931_the_enlarged_order18_checkpoint_is_a_constant_reciprocal_inner_network_but_not_yet_a_dilation_of_the_full_dispersive_law.md)
- [orbit/character duality](932_the_dilation_sectors_are_fourier_dual_to_the_a2_root_labels_but_are_not_the_same_three_effect_frame.md)
