# No supplied finite square internal map derives three selected generations, while an \(\mathcal O(3)\)-twisted \(\mathbb{CP}^1\) Dirac operator is a conditional index-three escape

> **Scope correction (documents 1398 and 1450):** rank--nullity proves zero Fredholm index for finite **square** maps; it does not exclude rectangular complexes or symmetry-protected finite kernels. The \(\mathbb{CP}^1\) construction is an exact bundle-level index fixture, not yet a physical escape: a local six-dimensional Weyl parent, CAR polarization, self-adjoint domain and higher-dimensional anomaly audit are additional requirements. Document 1450 performs the minimal local-parent kill test.

**Date:** 20 October 2026  
**Gate:** A6, physical chiral Hilbert space  
**Status:** exact no-go for the current finite four-dimensional inventory; explicit conditional topological escape  
**Inputs:** [effective selector 1235](../1200-1299/1235_an_oriented_boundary_can_select_one_anomaly_free_furey_tro_and_retain_cp_only_if_an_exchange_odd_portal_exists.md), [sterile portal audit 1291](../1200-1299/1291_no_exchange_odd_portal_exists_in_the_endpoint_blind_sm15_but_the_sterile_majorana_pseudoscalar_is_the_minimal_conditional_extension.md), and [A6 matching audit 1390](1390_a_decoupling_limit_can_fit_the_standard_model_but_a6_first_fails_at_the_unconstructed_chiral_fermion_operator.md)  
**Evidence:** [machine-readable audit](../../../evidence/data/spin23-a6-fermionic-index-audit.json) and [verifier](../../../verification/verify/verify_spin23_a6_fermionic_index_audit.mjs)

## Result

The current four-dimensional finite data cannot produce the required fermion operator.

There are three independent reasons:

1. the two survivor TROs carry the same Standard-Model charges, so their bare exchange cannot be the gauge-equivariant CAR adjoint;
2. no Standard-Model-invariant holomorphic bilinear exists on the SM15 that could gap one complete survivor while leaving the other chiral;
3. every finite square operator has index zero, so an index of three requires either an inserted dimension imbalance or new topology.

A fully explicit conditional escape does exist. On

\[
M_4\times\mathbb{CP}^1,
\]

twist a common family Dirac operator by

\[
L=\mathcal O(3).
\]

Its chiral index is exactly three. Tensoring its three positive-chirality zero modes with one SM15 produces \(45\) four-dimensional Weyl components, and tensoring with one sterile singlet produces three \(\nu^c\). A self-dual CAR/Nambu structure can make the conjugate bundle the adjoint/antiparticle half rather than an independent same-chirality mirror.

But the degree-three line bundle is new input. The programme's charge-three flavon and level-three BF coefficient do not presently derive its first Chern number. Therefore:

\[
\boxed{
\text{minimal conditional index-three operator: yes}
\qquad
\text{index three derived by the programme: no}.
}
\]

A6 remains blocked.

## 1. The everyday distinction

A book and its reflection in a mirror are not two books. But two identical books on adjacent shelves are two books, even if a clerk swaps their shelf labels.

The CAR adjoint is like the reflection: creation and annihilation operators are related parts of one quantum field. The two Furey survivors are initially like the adjacent books: they have the same gauge labels. Calling one the reflection of the other does not make it so. A genuine quantum construction must supply the conjugate gauge action, conjugate Lorentz chirality and the CAR relation.

The number of generations is a different issue. Writing three books on the inventory derives nothing about why there are three. An index theorem can turn a topological winding into a count, but then the winding itself must come from somewhere.

## 2. What a valid CAR construction requires

For a one-particle space \(K\), the self-dual or Nambu presentation is

\[
\mathcal K=K\oplus\overline K
\]

with antiunitary involution

\[
\Gamma(v,\overline w)=(w,\overline v),
\qquad
\Gamma^2=1,
\]

and field operators satisfying

\[
B(F)^*=B(\Gamma F).
\]

If \(K\) carries a gauge representation \(\rho\), the doubled space must carry

\[
\rho\oplus\overline\rho.
\]

Then \(\Gamma\) commutes with the gauge action. The second half supplies adjoints, not a second set of independent same-chirality generators.

The same is required for Lorentz representations:

\[
\left(\tfrac12,0\right)
\longleftrightarrow
\left(0,\tfrac12\right).
\]

The independent complex generators live in \(K\); the Nambu doubling is bookkeeping constrained by \(\Gamma\).

For three SM15 generations plus three sterile fields,

\[
\dim_{\mathbb C}K=3(15+1)=48,
\]

while

\[
\dim_{\mathbb C}\mathcal K=96.
\]

This construction has zero independent mirrors. It is mathematically consistent once \(K\) is chosen. It does not explain why \(K\) contains one survivor or why its family factor is \(\mathbb C^3\).

## 3. Why the bare survivor exchange is not the CAR involution

For a state of hypercharge \(y\),

\[
\rho_y(\theta)v=e^{iy\theta}v.
\]

An antiunitary map obeys

\[
J\rho_y(\theta)v=e^{-iy\theta}Jv.
\]

If its target is declared to have the same charge \(y\), ordinary gauge equivariance would require

\[
e^{-iy\theta}=e^{iy\theta}
\]

for every \(\theta\), which is impossible unless \(y=0\).

Both \(T_A\) and \(T_B\) contain the same charged types:

\[
Q_{1/6},\quad
u^c_{-2/3},\quad
d^c_{1/3},\quad
L_{-1/2},\quad
e^c_1.
\]

Therefore the neutral endpoint exchange

\[
T_A\leftrightarrow T_B
\]

is not itself a gauge-equivariant CAR conjugation. One may repair it by assigning \(T_B\) the conjugate gauge and Lorentz action. That is a legitimate Nambu polarization, but it is additional structure rather than a consequence of the original block incidence.

The sterile \(N\) is special because it is gauge neutral. The Majorana pseudoscalar

\[
i\left(NN-(NN)^\dagger\right)
\]

is a valid conditional exchange-odd portal once the CAR reversal is supplied. It still does not turn the charged same-representation TRO exchange into CAR conjugation by itself.

## 4. Why one survivor cannot simply be made heavy

One might try to start with both \(T_A,T_B\), give one a large mass, and retain the other. The attempt fails before choosing a coefficient.

A Lorentz scalar mass for two left-handed Weyl fields requires a gauge singlet in their tensor product. Exhausting unordered pairs from

\[
Q,\ u^c,\ d^c,\ L,\ e^c
\]

finds none. The verifier checks color, weak isospin and hypercharge simultaneously.

Thus a complete SM15 has no gauge-preserving quadratic mass. This is the familiar meaning of a chiral representation. Its anomaly cancellation does not make it vectorlike.

The alternatives also fail:

- a positive nondegenerate kinetic matrix on the \(A/B\) endpoint doublet propagates both combinations;
- a zero kinetic eigenvalue makes the Gaussian operator singular rather than producing a healthy projected theory;
- a negative kinetic eigenvalue creates a ghost;
- assigning conjugate charges to \(T_B\) allows vectorlike masses, but changes \(T_B\) into the Nambu/conjugate representation and inserts the required polarization.

The healthy four-dimensional construction is therefore to quantize only the selected \(K\) and include \(\overline K\) as its CAR adjoint. That is a consistent effective theory, not a dynamical derivation of selection.

## 5. Finite index no-go

Let

\[
T:\mathbb C^n\longrightarrow\mathbb C^n
\]

be any finite square map. Rank–nullity gives

\[
\dim\ker T=n-\operatorname{rank}T
\]

and

\[
\dim\ker T^\dagger=n-\operatorname{rank}T^\dagger.
\]

Because

\[
\operatorname{rank}T=\operatorname{rank}T^\dagger,
\]

\[
\boxed{\operatorname{index}T
=\dim\ker T-\dim\ker T^\dagger=0.}
\]

A rectangular map can have finite nonzero index, but its dimension imbalance has already inserted the answer. A Hermitian finite Dirac matrix can display selected zero modes, but their multiplicity is a chosen matrix degeneracy unless protected by additional symmetry or topology.

Therefore no finite internal Hessian or endpoint matrix derives

\[
\operatorname{index}=3.
\]

The existing charge-three scalar does not change this theorem.

## 6. Minimal compact topological escape

A compact one-dimensional Dirac operator has zero complex chiral index. The smallest standard compact geometry supporting a nonzero complex Dirac index is two-dimensional.

Take the Riemann sphere

\[
\Sigma=\mathbb{CP}^1
\]

and a line bundle

\[
L=\mathcal O(3),
\qquad
c_1(L)=3.
\]

The square root of the canonical bundle is

\[
K_\Sigma^{1/2}=\mathcal O(-1).
\]

The positive-chirality twisted zero modes are holomorphic sections of

\[
K_\Sigma^{1/2}\otimes L
=\mathcal O(2).
\]

They have basis

\[
1,\quad z,\quad z^2
\]

and hence

\[
\dim H^0(\mathbb{CP}^1,\mathcal O(2))=3.
\]

The opposite kernel is

\[
H^1(\mathbb{CP}^1,\mathcal O(2))=0.
\]

Therefore

\[
\boxed{
\operatorname{index}D_{\mathbb{CP}^1,\mathcal O(3)}
=3-0=3.
}
\]

This is Riemann–Roch in its smallest useful form. Once the line bundle is supplied, the count is no longer a tuned eigenvalue degeneracy.

## 7. The explicit product operator

On

\[
M_4\times\mathbb{CP}^1
\]

use

\[
D_6
=D_4\otimes1
+\gamma_5\otimes D_{\mathbb{CP}^1,L}.
\]

It is local and first order. With the unitary connection on \(L\), it is gauge covariant. The full internal Dirac operator is self-adjoint on both internal chiralities, while its chiral block has index three.

Tensoring one SM15 carrier with the positive kernel gives

\[
15\times3=45
\]

four-dimensional left-handed Weyl components. Tensoring the sterile arrow gives three \(\nu^c\).

Charge conjugation maps

\[
L=\mathcal O(3)
\longleftrightarrow
\overline L=\mathcal O(-3)
\]

and reverses the internal chirality. In the usual KO-dimension-two convention the internal real structure has

\[
J^2=-1,\qquad
JD=DJ,\qquad
J\gamma=-\gamma J.
\]

After imposing the self-dual CAR polarization, the conjugate zero modes are the adjoint/antiparticle presentation. They are not counted as independent same-chirality mirrors.

This resolves an apparent paradox: the complete self-adjoint/Nambu operator has balanced total index, as any real doubled presentation must, while its particle-polarized chiral block has index \(+3\).

## 8. Locality, gauge covariance and anomalies

The conditional product operator passes the immediate formal checks:

| Requirement | Result |
|---|---|
| local differential operator | yes |
| first order | yes |
| Hermitian full internal operator | yes |
| Standard-Model gauge covariance | yes, if the family twist commutes with \(G_{\rm SM}\) |
| three selected chiral zero modes | yes |
| conjugate modes treated as CAR adjoints | yes, after the Nambu polarization |
| four-dimensional SM anomalies | zero generation by generation |
| sterile anomaly contribution | zero |

There are two important qualifications.

First, a common family twist must act uniformly on every SM multiplet. Identifying it with the displayed \(U(1)_X=B-2Y-3L_i\) does **not** work: those charges are species and family dependent, so the index would not yield three complete identical SM generations.

Second, a genuine six-dimensional parent has its own perturbative and global anomaly conditions. Four-dimensional cancellation of three zero-mode generations does not certify the higher-dimensional theory. Green–Schwarz terms, additional bulk partners or a non-geometric finite spectral interpretation might be required.

## 9. Why the existing defect does not already provide this index

Document 1292 constructs a wall inside \(3+1\) dimensions. Its localized fields live in \(2+1\) dimensions. It cannot produce three \(3+1\)-dimensional generations without adding another ambient dimension.

Likewise:

- the flavon's charge \(q_s=3\) is a representation weight;
- the BF coefficient \(3/(2\pi)\) is a topological level;
- \(c_1(L)=3\) is a flux integral over a compact two-surface.

These are all integers equal to three, but they are different typed objects. Equality of their values is not a map between them.

The missing bridge must construct the family line bundle and prove

\[
{1\over2\pi}\int_{\mathbb{CP}^1}F_L=3
\]

from the existing action, rather than choosing \(\mathcal O(3)\) because three generations are desired.

## 10. Exact, conditional and missing

### Exact for the current inventory

- the bare survivor exchange is not a gauge-equivariant CAR adjoint;
- the SM15 admits no gauge-invariant holomorphic bilinear;
- one survivor cannot be quadratically gapped without changing the representation content;
- every finite square operator has index zero;
- the sterile field uniquely adds the \(NN\) bilinear.

### Exact after adding the family geometry

- \(\mathcal O(3)\) on \(\mathbb{CP}^1\) has twisted Dirac index three;
- its positive kernel has basis \(1,z,z^2\);
- tensoring produces \(45\) SM and three sterile four-dimensional Weyl modes;
- self-dual CAR bookkeeping avoids an independent mirror count.

### Still missing

- a derivation of \(\mathbb{CP}^1\), or an equivalent family Fredholm problem;
- a derivation of \(c_1=3\);
- a typed bridge from the charge-three/BF data to the family connection;
- the higher-dimensional ultraviolet fermion content and anomaly cancellation;
- compactification scale, moduli stabilization and Kaluza–Klein thresholds;
- locking of the sterile exchange-odd portal to the charged TRO;
- the Yukawa overlap integrals and their radiative stability.

## 11. Minimal extra datum and falsifier

The minimal extra datum is

\[
\boxed{
\text{a common family Fredholm operator with a derived index of three}.
}
\]

The \(\mathbb{CP}^1,\mathcal O(3)\) construction is the smallest explicit representative, not a claim that the universe contains this surface.

The escape is falsified if every admissible family operator:

1. has index zero;
2. gives species-dependent indices rather than three complete SM generations;
3. forces the conjugate kernel to be independently quantized;
4. violates higher-dimensional anomaly cancellation;
5. cannot be linked to the selector without inserting a second orientation spurion.

## 12. Verdict

\[
\boxed{
\begin{array}{l}
\text{current four-dimensional finite operator: no},\\
\text{minimal conditional topological operator: yes},\\
\text{generation count derived by the programme: no},\\
A6\text{ status: blocked}.
\end{array}
}
\]

This closes the most optimistic finite-matrix route without closing the broader programme. It turns “derive three generations” into a precise next question: can any already motivated geometric or operator-theoretic sector supply a **common**, gauge-compatible Fredholm index three without simply relabelling the charge-three input?

## Reproduction

~~~powershell
node verification/verify/verify_spin23_a6_fermionic_index_audit.mjs
~~~

The verifier exhausts SM15 bilinears, identifies \(NN\) as the unique sterile extension, checks the same-charge antiunitary obstruction, verifies the finite square-index theorem on representative ranks, and computes the \(\mathbb{CP}^1\) twisted kernels, index and zero-mode counts.
