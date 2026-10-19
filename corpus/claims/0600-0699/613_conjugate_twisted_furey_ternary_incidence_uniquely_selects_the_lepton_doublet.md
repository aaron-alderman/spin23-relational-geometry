# Conjugate-Twisted Furey Ternary Incidence Uniquely Selects the Lepton Doublet

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B10 and B11  
**Claim status:** exact exhaustive result in the two explicit one-generation matter TROs; source derivation and full algebraic zero locus remain open  
**Certificate:** [test_furey_conjugate_twisted_ternary_incidence.mjs](../../../verification/test/test_furey_conjugate_twisted_ternary_incidence.mjs)

## Executive result

The conjugate-twisted incidence programme has now crossed from the finite Golay model into the explicit Furey matter topology.

Let \(T_A\) and \(T_B\) be the two exchange-related, anomaly-free, cyclic one-generation ternary rings of operators retained by the earlier Furey audit. Each has complex dimension fifteen and particle arrows

\[
Q:H\to O_2,\quad u^c:O_2\to C,\quad d^c:O_2\to O_1,\quad L:R\to H,\quad e^c:C\to R,
\]

with \(T_B\) obtained by interchanging the neutral one-dimensional blocks (O_1\leftrightarrow R).

Let \(\Theta\) be the antiunitary exchange between these two topologies: it conjugates coefficients and swaps \(O_1\) with \(R\). The composite

\[
J(x)=\Theta(x)^\dagger
\]

is complex-linear. For every \(x\) in one of the TROs and every physical probe \(z\) in the same TRO, define

\[
R_x(z)=xJ(x)z,
\qquad
R_x^{\mathrm J}(z)=xJ(x)z+zJ(x)x.
\]

The exact result is

\[
\boxed{R_x(T)=0\text{ for all }x\in W\quad\Longleftrightarrow\quad W\subseteq L}
\]

for every coordinate matrix-unit subspace \(W\), and identically for \(R^{\mathrm J}\). Consequently,

\[
\boxed{L\text{ is the unique maximal nonzero coordinate-null subspace.}}
\]

This holds in both \(T_A\) and \(T_B\).

## 1. Exhaustive scope

The certificate works with the full eight-dimensional block carrier

\[
O_1\oplus O_2\oplus H\oplus C\oplus R
\]

of dimensions \(1+3+2+1+1=8\). Each matter TRO contains fifteen matrix units:

| sector | complex dimension |
|---|---:|
| \(Q\) | 6 |
| \(u^c\) | 3 |
| \(d^c\) | 3 |
| \(L\) | 2 |
| \(e^c\) | 1 |
| total | 15 |

For each topology and each incidence law, the calculation exhausts:

1. all 31 nonempty unions of the five physical arrow sectors;
2. all (2^{15}-1=32767) nonempty coordinate matrix-unit subspaces;
3. every unordered pair of selected basis units, supplying every quadratic coefficient of a general vector in that subspace;
4. all fifteen physical matrix-unit probes \(z\).

This is an exact support-and-composition calculation. No random sampling or floating-point tolerance enters.

## 2. Sector-level result

For both topologies, the null sector unions are precisely

\[
\{L\}.
\]

The other sectors fail by explicit witnesses:

- \(Q\) and \(u^c\) fail against probes in their own sectors;
- \(d^c\) fails against an \(e^c\) probe;
- \(e^c\) fails against a \(d^c\) probe.

Every union containing one of those sectors inherits a nonzero quadratic coefficient. Hence no larger union can become null by a cancellation required to hold for every vector in the subspace.

## 3. Matrix-unit result

The stronger coordinate audit finds, for each topology and each incidence law,

| null coordinate dimension | count |
|---:|---:|
| 1 | 2 |
| 2 | 1 |

The two lines are the two weak components of \(L\). Their span is the full complex doublet. There are no null coordinate subspaces of dimension three or higher and no null coordinate line outside \(L\).

Thus the maximal coordinate-null locus is exactly the two-dimensional \(H\)-target block sourced by the exchanged neutral singlet:

\[
L=\operatorname{Hom}(R,H)
\]

in topology A and

\[
L=\operatorname{Hom}(O_1,H)
\]

in topology B.

## 4. Why the doublet is null

The result is controlled by relational support. Under \(\Theta\) followed by dagger, an \(L\) arrow is sent to a reversed arrow involving the opposite exchanged singlet. The required source-target match for either \(xJ(x)z\) or \(zJ(x)x\) never occurs for a physical probe \(z\) in the selected matter TRO. Both weak components therefore vanish as a subspace, including their mixed quadratic coefficient.

For every other matrix unit, at least one physical probe completes a nonzero composable path. The selection is incidence-theoretic rather than a numerical degeneracy.

Because the argument uses support, arbitrary nonzero exchange phases merely rescale witnesses. The classification is insensitive to such phase conventions and to choosing topology A rather than topology B.

## 5. Relation to the Golay quartic selector

The finite Golay branch established

\[
\tau_\mu(s,F(s),-)=0,
\qquad F(s)=s^3,
\]

whose zero locus is the \(11+110\) cap-plus-singular union in \(PG(4,9)\). The present Furey computation realizes the same typed pattern:

\[
\boxed{\text{state}\times\text{conjugate/reversed state}\times\text{all probes}=0.}
\]

The common structure consists of a trilinear relational product, a distinguished conjugation/exchange in the middle slot, a null-incidence condition tested against the whole physical probe space, and a sharply selected exceptional locus.

The polynomial degrees are not the same. Frobenius is cubic over \(\mathbb F_9\), so the Golay equation is homogeneous quartic. In the Furey model, \(\Theta\) and dagger are each antilinear and their composite \(J\) is complex-linear, so the displayed Furey equation is quadratic in \(x\). This is a structural bridge, not an identification of the two polynomials.

## 6. Physical meaning—and its limit

The selected object is the observed weak lepton doublet sector of one Standard-Model generation. This is more specific than a dimension match: the selector is evaluated inside the already anomaly-audited matter TRO and rejects all four other physical arrow sectors.

What is established is

\[
\text{explicit Furey matter topology}
\Longrightarrow
\text{conjugate-twisted ternary null incidence}
\Longrightarrow
\text{unique maximal coordinate sector }L.
\]

What is not established is equally important:

- \(\Theta\) has not yet been derived by transporting the full source-level Furey CAR/Lorentz conjugation through the particle-module intertwiner;
- the zero locus among arbitrary linear subspaces, rather than coordinate matrix-unit subspaces, is not yet classified;
- no Higgs field, Yukawa coefficient, mass hierarchy or generation structure follows from this calculation;
- the selector has not yet been shown covariant under the full faithful Standard-Model group action;
- no implication to \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) has yet been proved.

## 7. Stop-everything criteria

The bridge should be stopped or reformulated if any of the following occurs:

1. the source-derived Furey conjugation is incompatible with the exchange used here;
2. the full gauge action does not preserve the null condition or selected \(L\) subspace;
3. the arbitrary-vector zero locus contains generic quark or charged-singlet branches that destroy selectivity;
4. the exchange cannot be defined without adding mirror matter or violating the faithful \(\mathbb Z_6\) quotient;
5. the construction depends on an unphysical basis after the module intertwiner is explicit.

Any one would leave the exact block-incidence theorem intact while defeating its intended physical interpretation.

## 8. Highest-value next steps

1. Transport the actual CAR/Lorentz conjugation through the explicit particle-module map and compare it with \(\Theta\) block by block.
2. Compute the full algebraic zero variety of \(xJ(x)T=0\), allowing arbitrary complex linear combinations across sectors.
3. Verify covariance under the complete Standard-Model root action and faithful global quotient.
4. Determine whether the two-dimensional null space naturally supplies the \(M_2(\mathbb C)\to H_2(\mathbb R)\) response gate isolated in the \(Spin(2,3)\) branch.
5. Test whether Higgs or Yukawa data arise only after pairing this null doublet with complementary non-null incidence channels.

## 9. Reproducibility

Run:

```powershell
node verification/test/test_furey_conjugate_twisted_ternary_incidence.mjs
```

The script asserts both topologies, both ternary laws, all 31 sector unions and all 32767 coordinate subspaces before reporting success.

## 10. Immediate boundary found in Cycle 529

The third stop criterion has now fired. Full equation extraction finds non-coordinate complex-isotropic \(Q\) and \(d^c\) null vectors. Accordingly, the theorem in this document remains exact only for sector unions and coordinate matrix-unit subspaces; it is not a globally unique complex-vector selector. See [Complex isotropic branches limit the Furey lepton-doublet selector](614_complex_isotropic_branches_limit_the_furey_lepton_doublet_selector.md).
