# The charge-three link has a scalar-flavon versus dynamical-cross-Peirce fork, separating BF closure from flavour closure

## Main result

The globally correct charged relation bundle is

\[
\mathcal L_{PQ}
=\operatorname{Hom}(L,Q)\otimes R^3.
\]

But two physically distinct realizations must be separated.

### Dynamical cross-Peirce link

The entire field

\[
\Phi\in\Gamma(\mathcal L_{PQ})
\]

is dynamical. Its nonzero vacuum selects a line in \(Q\), completes a full Jordan frame, and generically leaves directional \(\mathbb{CP}^1\) modes that must be gapped.

### Scalar flavon with a relational spurion

The link factorizes as

\[
\boxed{
\Phi=sK,
\qquad
s\in\Gamma(R^3),
\qquad
K\in\Gamma(\operatorname{Hom}(L,Q)).
}

Only the scalar \(s\) is the charge-three Higgs field. The neutral map \(K\) supplies the direction and support of the cross-family coupling. If \(K\) is fixed, the Higgs vacuum has no \(\mathbb{CP}^1\) directional Goldstones, but the family relation has been inserted as Yukawa/spurion data.

The scalar branch is sufficient to derive autonomous level-three BF theory. The dynamical branch is required only if the programme aims to derive the family frame itself.

## 1. Why the factorization is allowed

The line bundle \(R^3\) carries the entire relative \(U(1)\) charge. The cross-Peirce factor

\[
\operatorname{Hom}(L,Q)

\]

specifies where the link begins and ends in family space but is neutral under the independent line-bundle gauge transformation once its endpoint weights have been factored into \(R^3\).

Locally, any decomposable section of \(\mathcal L_{PQ}\) may be written

\[
\Phi(x)=s(x)K(x).

\]

Under

\[
R\ni r\mapsto e^{it}r,

\]

we have

\[
s\mapsto e^{3it}s,
\qquad
K\mapsto K,
\qquad
\Phi\mapsto e^{3it}\Phi.

\]

The gauge charge and the family direction are therefore distinct data.

## 2. Relation to flavon-dressed Yukawa entries

The ultraviolet Yukawa system contains cross-block terms of the schematic form

\[
Y_{PQ}\frac{s}{\Lambda}

\]

or

\[
Y_{QP}\frac{s^\dagger}{\Lambda}.

\]

Here

\[
Y_{PQ}\in\operatorname{Hom}(L,Q)

\]

is the neutral relational map, while \(s\) compensates its charge-three mismatch. Thus the phenomenological flavon model already realizes the factorization

\[
\Phi=sY_{PQ}.

\]

The same applies to the selected Majorana self-pair, whose charge six requires

\[
M_{PP}\frac{s^2}{\Lambda^2}.

\]

## 3. Scalar branch vacuum

Let

\[
V(s)=-\mu^2|s|^2+\lambda|s|^4,
\qquad
\lambda>0.

\]

For \(\mu^2>0\),

\[
|s|=v.

\]

The vacuum circle is gauged by the charge-three \(U(1)\). Its stabilizer is

\[
\mathbb Z_3.

\]

There are no additional family-direction modes because \(K\) is not varied as part of \(s\). The radial mode is massive, the phase is Higgsed/dualized, and the infrared topological action is

\[
\frac{3}{2\pi}\int b\wedge da.

\]

Thus:

\[
\boxed{
\text{fixed }K+\text{dynamical scalar }s
\quad\Rightarrow\quad
\text{clean BF closure without }\mathbb{CP}^1\text{ Goldstones}.
}

## 4. What the scalar branch does not derive

The fixed map \(K\) determines:

- which direction inside \(Q\) couples to \(L\);
- which cross-family entries appear;
- the relative strengths and phases of those entries;
- whether the support graph is connected;
- the resulting mixing pattern.

Therefore the scalar branch derives the charge and topological remnant but not the family frame. Its closure status is:

\[
\boxed{
\text{topological closure: potentially complete},
\qquad
\text{flavour closure: spurionic}.
}

## 5. Dynamical-link branch vacuum

If \(K\) or the full \(\Phi\) is dynamical, then a fixed-norm nonzero link selects a direction in the complex rank-two space

\[
\operatorname{Hom}(L,Q)\cong\mathbb C^2.

\]

After quotienting its overall gauge phase, the directional manifold is

\[
\mathbb{CP}^1.

\]

A nondegenerate response tensor on \(Q\) is required to isolate a direction and gap its two real fluctuations. In this branch the link can complete the full Jordan frame, but the dynamics is more demanding.

## 6. Intermediate branch: several fixed maps and one scalar

The most realistic effective field theory may contain several neutral cross-Peirce tensors:

\[
K_a\in\operatorname{Hom}(L,Q)

\]

multiplied by powers of the same scalar flavon:

\[
\Phi_a=sK_a,
\qquad
\widetilde\Phi_a=s^\dagger\widetilde K_a.

\]

The scalar still supplies one universal charge-three breaking and one BF sector, while the family support and mixing reside in the collection \(K_a\).

This matches the earlier support-graph result: the scalar completes every edge crossing the \(P|Q\) split, but the numerical edge weights remain independent flavour data.

## 7. Global factorization caveat

A global nonvanishing factorization

\[
\Phi=sK

\]

requires compatible zero sets and bundle topology. If \(R^3\) or \(\operatorname{Hom}(L,Q)\) is nontrivial, neither factor need possess a nowhere-vanishing global section.

The fundamental object is the section of the tensor-product bundle \(\mathcal L_{PQ}\). The factorized description is valid when the model independently specifies:

- a charge-three line field \(s\);
- a neutral relational morphism \(K\);
- a multiplication map into \(\mathcal L_{PQ}\).

This is automatic in the local effective theory but must be checked for topologically nontrivial configurations.

## 8. Consequence for the response no-go

Document 1196 proved that \(P\) alone cannot select its orientation. The factorization fork makes the alternatives explicit.

### Fixed \(K\)

The second family tensor is already present. The no-go is evaded, but selection is input.

### Dynamical \(K\)

The second tensor must satisfy its own Euler–Lagrange/gap equation. Absolute closure remains possible but unproved.

### No \(K\)

A scalar \(s\) alone carries no family direction and cannot generate cross-Peirce mixing. It can Higgs \(U(1)) but cannot complete the Yukawa graph.

## 9. Revised minimal action fork

The common gauge/Higgs sector is

\[
S_{a,s}
=\int\left[
\frac1{2e_X^2}f\wedge*f
+|D_{3a}s|^2
+V(s)
\right].

\]

The flavour sector is then either:

### Effective/spurionic

\[
S_{\mathrm{flavour}}
\supset
\overline\Psi_Q
\left(K_0+\frac{s}{\Lambda}K_++\frac{s^\dagger}{\Lambda}K_-\right)
\Psi_P
+\mathrm{h.c.}

\]

with fixed \(K\)-matrices.

### Dynamical

\[
S_{\mathrm{flavour}}
\supset
|D K|^2+V(P,K)
+\overline\Psi_Q\frac{sK}{\Lambda}\Psi_P
+\mathrm{h.c.}

\]

with a response potential required to select and gap \(K\).

## 10. Closure ledger

| Question | Scalar-flavon branch | Dynamical-link branch |
|---|---|---|
| Why charge three? | Derived from line twist | Derived from line twist |
| Why level-three BF? | Derived by scalar dualization | Derived after all link directions are gapped |
| Independent flat holonomies? | Yes, from \(R\) connection | Yes, from \(R\) connection |
| Family direction selected? | No; supplied by \(K\) | Potentially |
| \(\mathbb{CP}^1\) Goldstones? | No, if \(K\) fixed | Yes unless response-gapped |
| Full Jordan frame derived? | No | Yes, conditionally |
| Effective Standard Model closure? | Plausible | Plausible but harder |
| Absolute flavour closure? | No | Open |

## 11. Programme consequence

The programme should now pursue two closure claims separately.

### Claim I: effective topological closure

Given a rank-one lepton-family projector and the observed Yukawa spurions, the unique determinant-neutral line twist produces a charge-three scalar flavon, the correct global discrete remnant, and an autonomous level-three defect.

### Claim II: absolute flavour closure

The same action dynamically generates the projector and neutral relational maps that reproduce the observed family frame and mixing.

Claim I is much closer to completion. Claim II faces the second-family-tensor no-go and requires new dynamics.

Keeping these claims distinct prevents a successful BF derivation from being overstated as a derivation of flavour.

