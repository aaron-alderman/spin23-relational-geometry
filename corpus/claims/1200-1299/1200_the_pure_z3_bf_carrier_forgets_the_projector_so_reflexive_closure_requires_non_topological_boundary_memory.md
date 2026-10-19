# The pure \(\mathbb Z_3\) BF carrier forgets the projector, so reflexive closure requires non-topological boundary memory

## Main result

The infrared map from a rank-one family projector to the residual central \(\mathbb Z_3\) topological theory is non-injective. In fact, it is constant on the entire projector orbit.

For every Hermitian rank-one projector \(P\),

\[
X(P)=I-3P

\]

satisfies

\[
\boxed{
e^{2\pi iX(P)/3}=\omega I,
\qquad
\omega=e^{2\pi i/3},
}

\]

independently of \(P\). Consequently, after charge-three Higgsing and passage to the central residual group, the pure BF data do not remember which line was selected.

The level,

\[
\frac3{2\pi}\int b\wedge da,

\]

the line/surface braiding phase, the finite Heisenberg algebra, and the nine-dimensional torus Hilbert space are the same for all \(P\in\mathbb{CP}^2\).

Therefore no return map

\[
\mathcal H_{\mathrm{BF}}\longrightarrow P

\]

can be constructed from pure topological data alone. Reflexive closure requires additional boundary or bulk memory retaining the embedding of the residual \(\mathbb Z_3\) into the ultraviolet matter representation.

## 1. Constancy of the central remnant

Because \(P^2=P\), functional calculus gives

\[
e^{-2\pi iP}=I.

\]

Hence

\[
\begin{aligned}
e^{2\pi iX(P)/3}
&=e^{2\pi i(I-3P)/3}\\
&=e^{2\pi i/3}e^{-2\pi iP}\\
&=\omega I.
\end{aligned}

\]

No coordinate choice or adapted basis was used. The result holds for every primitive projector on the orbit.

Thus the map

\[
\mathfrak r:
\mathbb{CP}^2
\longrightarrow
\{\text{central }\mathbb Z_3\text{ subgroups}
\}

\]

is constant:

\[
\mathfrak r(P)=\langle\omega I\rangle.

\]

## 2. Why the charge-three relation loses orientation

The oriented cross-Peirce sectors have continuous charges \(\pm3\):

\[
\operatorname{Hom}(L,Q):+3,
\qquad
\operatorname{Hom}(Q,L):-3.

\]

Modulo the residual group,

\[
+3\equiv-3\equiv0\pmod3.

\]

Therefore the link that remembered the direction of the \(P|Q\) relation becomes neutral in the discrete theory. Its condensate leaves the centre but erases the oriented continuous weight that distinguished the two Peirce directions.

This is not a defect of the construction. It is the defining purpose of Higgsing to the centre: the low-energy theory retains the protected finite phase while discarding the continuous embedding data.

## 3. BF universality

The untwisted \(\mathbb Z_3\) BF theory depends only on the integer level three and the topology of spacetime. Its fundamental relation is

\[
W(C)V(\Sigma)
=\omega^{\operatorname{Link}(C,\Sigma)}
V(\Sigma)W(C).

\]

Neither \(P\) nor the embedding of \(X(P)\) appears.

On the reduced \(2+1\)-dimensional defect,

\[
S_{\Sigma_3}=\frac3{2\pi}\int c\wedge da.

\]

On spatial \(T^2\), the algebra and Hilbert-space dimension are

\[
\mathbb F_3^4,
\qquad
\dim\mathcal H(T^2)=9.

\]

These data are identical for \(P_e,P_\mu,P_\tau\) and for every continuously rotated rank-one projector before explicit flavour breaking.

## 4. Information-theoretic no-go

Suppose the descent is

\[
D:\mathbb{CP}^2\to\mathfrak T_3,

\]

where \(\mathfrak T_3\) denotes the pure untwisted level-three BF theory. Since

\[
D(P_1)=D(P_2)

\]

for all \(P_1,P_2\), no function

\[
A:\mathfrak T_3\to\mathbb{CP}^2

\]

can satisfy

\[
A\circ D=\operatorname{id}_{\mathbb{CP}^2}.

\]

The descent has no left inverse.

Therefore the proposed ascent

\[
\mathbb C^9
\to
\text{response}
\to
P

\]

cannot use the abstract nine-state carrier alone. Any successful ascent must access information outside the universal topological sector.

## 5. What information survives outside pure BF

Several ultraviolet or non-topological structures can still distinguish projectors.

### Matter-charge embedding

Although the residual centre acts as \(\omega I\) on the family fundamental, the full continuous charge operator

\[
q_X^{(r)}(P)=B_r-2Y_r-3L_rP

\]

retains \(P\). Massive matter thresholds, selection rules before taking charges modulo three, and couplings to the heavy \(U(1)_X\) gauge boson can remember the embedding.

### Neutral relational maps

The Yukawa maps \(K_{PQ}\) specify which cross-Peirce directions were populated. They survive as mass and mixing data even after the flavon phase is Higgsed.

### Projector textures

Derivative data such as

\[
DP,
\qquad
-i\operatorname{Tr}(PDP\wedge DP)

\]

can distinguish nontrivial projector configurations, though not a constant orientation in a fully symmetric vacuum.

### Massive defect spectrum

Gapped charged particles can retain family-dependent masses and couplings. Their exponentially suppressed virtual effects may split otherwise topological states and encode the ultraviolet embedding.

### Family-resolved external sources

A response source coupled to a Hermitian family tensor can read the selected projector, but that source is additional to pure BF theory.

## 6. Exact versus approximate topological isolation

There is now a tension between two objectives.

### Exact isolated BF carrier

If all non-topological charged matter is excluded and only pure BF data remain, the nine-state carrier is exact—but projector information is completely lost.

### Projector-sensitive return channel

If massive matter or relational sources remain available, the boundary can retain information about \(P\)—but the topological factor is then only approximately isolated, with corrections such as

\[
O(e^{-mL}).

\]

Thus exact topological protection and exact reflexive memory of the family embedding cannot both reside in the same pure BF degrees of freedom.

The programme must use a layered boundary:

\[
\boxed{
\text{universal protected BF core}
\quad+quad
\text{gapped non-topological memory sector}.
}

## 7. Consequence for the (Spin(2,3)) boundary role

The \(H_2(\mathbb R)/Spin(2,3)\) causal geometry can organize the defect observables and stress response, but conformal/causal symmetry alone does not restore the erased family orientation. The family-sensitive operator inserted into the boundary response must act on the lifted matter/memory sector, not solely on the BF Hilbert space.

The schematic sandwich should therefore be refined from

\[
T\,\mathbb S_{\mathrm{BF}}\,T

\]

to

\[
\boxed{
T\,\mathbb S_{P,K,\mathrm{massive}}\,T,
}

\]

with the BF core supplying protected finite transport and the massive sector supplying the embedding data needed for the return map.

## 8. Boundary-feedback branches

### Pure BF branch

Closed as a no-go for family selection. It cannot distinguish \(P\).

### BF plus massive faithful matter

Live. Integrating out matter may generate a family-valued effective response while retaining approximate topological protection.

### BF plus fixed Yukawa ports

Live but spurionic. The boundary reads a family distinction already supplied by \(K\).

### BF plus dynamical relational ports

Live but demanding. The port fields need their own stable, gapped response equations.

## 9. Revised closure loop

The loop cannot be

\[
P\to\mathbb Z_3\text{ BF}\to P.

\]

The first arrow erases the necessary information. The minimal viable loop is

\[
\boxed{
P
\to
\left(
\mathbb Z_3\text{ BF core},
\text{gapped lifted matter memory}
\right)
\to
\mathcal R[P]
\to
P.
}

\]

The BF core and the memory sector perform different functions:

- BF preserves the finite relational algebra against local disturbance;
- lifted massive matter remembers which ultraviolet relation produced it.

## 10. Terminal statement

The pure-topological boundary-feedback route is rigorously closed:

\[
\boxed{
\text{the nine-state }\mathbb Z_3\text{ carrier cannot by itself reconstruct or select the rank-one projector.}
}

This does not close the full programme. It specifies the minimum additional content required for reflexive closure: a gapped, faithful, non-topological memory sector coupled to the \(Spin(2,3)\)-organized boundary response.

