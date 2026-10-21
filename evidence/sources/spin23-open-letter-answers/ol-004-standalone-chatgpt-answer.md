**Yes. \(H_2(\mathbb R)\) supports a complete operational probabilistic theory with a well-defined effect space, continuous reversible dynamics, and a consistent composition rule. With standard real-quantum composition, its local tomography status is definite: local tomography fails.** If the programme requires both local tomography and continuous reversible interactions, the nearby rank-two complex-qubit model \(H_2(\mathbb C)\) is the natural alternative under the usual symmetry assumptions. [arxiv.org](https://arxiv.org/html/1005.4870v1?utm_source=chatgpt.com)

The remaining issue is whether either construction faithfully represents the programme’s **two-current response interpretation**. I do not have its defining equations available here, so I will distinguish two precise interpretations: two signed response observables, and a positive quadratic response involving two channels. Both admit useful constructions, with different requirements.

The principal choices are:

| Elementary model and composition | Effect space | Continuous reversible dynamics | Reversible interactions | Local tomography |
|---|---|---|---|---|
| \(H_2(\mathbb R)\), with standard real-quantum composition | Real operators \(0\le E\le I\) | Orthogonal conjugations | Available | Fails |
| Rebit disk, with minimal or maximal GPT tensor products | Order interval in the dual composite cone | Local rotations | Ruled out under the continuous symmetry assumptions discussed below | Holds |
| \(H_2(\mathbb C)\), with standard complex-quantum composition | Complex Hermitian operators \(0\le E\le I\) | Unitary conjugations | Available | Holds |

These alternatives make different commitments about composites. The single-system Jordan cone does not select among them.

## 1. An explicit operational model on \(H_2(\mathbb R)\)

Take
\[
A=H_2(\mathbb R)=\operatorname{Sym}_2(\mathbb R),
\qquad
A_+=\{a\in A:a\succeq0\},
\]
with Jordan product
\[
a\circ b=\frac12(ab+ba).
\]

Choose the deterministic effect
\[
u(a)=\operatorname{Tr}a.
\]
The normalized states are therefore
\[
\Omega_A=\{\rho\succeq0:\operatorname{Tr}\rho=1\}.
\]

Using the real Pauli matrices
\[
X=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\qquad
Z=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\]
every normalized state has the form
\[
\rho=\frac12(I+r_xX+r_zZ),
\qquad
r_x^2+r_z^2\le1.
\]

The eigenvalues are \((1\pm\sqrt{r_x^2+r_z^2})/2\), so positivity gives precisely a disk. Equivalently, writing an unnormalized state as
\[
a=\frac12(tI+xX+zZ),
\]
its positivity condition is the Lorentz-cone inequality
\[
t\ge\sqrt{x^2+z^2}.
\]

This separates three quantities that should not be conflated:

- The Jordan algebra has **rank two**.
- Its underlying real vector space has **dimension three**.
- Its normalized state space has **dimension two**.

With the full effect space below, rank two means that at most two states can be perfectly distinguished in one measurement. It does not, by itself, identify two physical currents.

### Effects and probabilities

A coherent choice is the full order interval
\[
\mathcal E_A=\{E\in H_2(\mathbb R):0\preceq E\preceq I\}.
\]
This is a substantive operational choice: it says that every mathematically admissible effect is available.

Write
\[
E=\alpha I+\beta_xX+\beta_zZ.
\]
Its eigenvalues give the exact effect constraint
\[
\sqrt{\beta_x^2+\beta_z^2}\le\min(\alpha,1-\alpha).
\]
The probability rule is
\[
p(E\mid\rho)=\operatorname{Tr}(\rho E)
=\alpha+\beta_xr_x+\beta_zr_z.
\]

A measurement is a collection \(\{E_k\}\) with \(\sum_kE_k=I\). Consequently, all outcome probabilities are nonnegative and sum to one.

Thus, once the normalization and allowed effects are specified, there is no difficulty defining the local probabilistic model. The additional physical question is whether the programme supplies preparations and measurements realizing these states and effects.

## 2. What the two currents can mean operationally

### A. Two signed response observables

One possible dictionary identifies suitably calibrated mean responses with
\[
j_1=\operatorname{Tr}(\rho X)=r_x,
\qquad
j_2=\operatorname{Tr}(\rho Z)=r_z.
\]

This gives a particularly economical state description: the two mean responses determine the normalized local state. It also imposes a testable constraint,
\[
j_1^2+j_2^2\le1.
\]
Having two independently bounded responses, \(|j_1|\le1\) and \(|j_2|\le1\), would not be enough; the allowed region must be a disk, or an ellipse after an invertible affine calibration.

Each response can be measured through a binary measurement:
\[
E_{x,\pm}=\frac12(I\pm X),
\qquad
E_{z,\pm}=\frac12(I\pm Z).
\]
The difference between the two outcome probabilities is the corresponding mean response.

There is an interpretive requirement here. These are **two different sharp measurements**, and they are incompatible. If the programme treats the currents as two simultaneously and sharply readable classical quantities, identifying them with \(X\) and \(Z\) requires further justification. It may instead be appropriate to model them as expectation values obtained in different measurement contexts, or through suitably unsharp joint measurements.

Operational access matters as well. If the apparatus can measure only effects diagonal in one fixed basis, and no available transformation reveals the other coordinate, the off-diagonal component is operationally invisible. The distinguishable model then reduces to a classical bit. A full rebit interpretation needs access to at least two nonparallel measurement directions, directly or through controlled transformations.

### B. A positive quadratic response involving two channels

A second, often more natural, interpretation starts from a symmetric response matrix
\[
R=
\begin{pmatrix}
a&c\\
c&b
\end{pmatrix},
\qquad
a,b\ge0,\quad c^2\le ab.
\]
For a real probe or force vector \(f=(f_1,f_2)^T\), define
\[
q_R(f)=f^TRf
=af_1^2+2cf_1f_2+bf_2^2\ge0.
\]

This is exactly the positive cone of \(H_2(\mathbb R)\). It contains two diagonal responses and a signed cross-response. There are therefore **three unnormalized parameters**, with two remaining after normalization.

For \(R\ne0\), put
\[
\tau=\operatorname{Tr}R=a+b,
\qquad
\rho_R=\frac{R}{\tau}.
\]
Then
\[
r_z=\frac{a-b}{a+b},
\qquad
r_x=\frac{2c}{a+b},
\]
and \(c^2\le ab\) becomes \(r_x^2+r_z^2\le1\).

For a unit probe direction \(n\),
\[
p_n(R)=\frac{n^TRn}{\operatorname{Tr}R}
      =\operatorname{Tr}(\rho_R E_n),
\qquad
E_n=nn^T.
\]
Because
\[
E_n+E_{n^\perp}=I,
\]
these normalized responses are a valid binary probability distribution. This provides an exact bridge from a positive two-channel response to rebit effects.

For \(n=(\cos\theta,\sin\theta)^T\), the response is
\[
p_n(R)=\frac12\left(1+r_z\cos2\theta+r_x\sin2\theta\right).
\]
The off-diagonal coefficient becomes measurable through the dependence on probe direction.

Several features of this dictionary must remain explicit:

**Normalization separates response shape from intensity.** The normalized state \(\rho_R\) records relative response; \(\tau\) records its overall scale. If absolute response is physically important, retain the unnormalized cone or retain \(\tau\) alongside the normalized state.

**Calibration determines the normalization.** Adding the diagonal entries presupposes compatible units or a chosen reference metric. More generally, one can choose \(G\succ0\), normalize by
\[
u_G(R)=\operatorname{Tr}(GR),
\]
and use effect matrices \(0\preceq E\preceq G\). A change of coordinates then reduces this to the standard trace convention.

**Mixing must have the intended operational meaning.** Normalizing
\[
\lambda R_1+(1-\lambda)R_2
\]
produces an intensity-weighted mixture of \(\rho_{R_1}\) and \(\rho_{R_2}\). Its weights equal \(\lambda\) and \(1-\lambda\) only when the two traces agree.

**A current vector and its quadratic response are different data.** The assignment \(j\mapsto jj^T\) loses the distinction between \(j\) and \(-j\). It also turns ensemble averages into second-moment data rather than mean-current data. That is acceptable only if the programme intends this identification.

Finally, positive response matrices also arise in classical statistical descriptions. Their existence establishes a useful cone representation; the physical state space, accessible effects, and composition experiments determine how much of the operational theory is realized.

### Antisymmetric response requires additional structure

If the programme uses a general linear response law
\[
J=LF,\qquad L=S+A,\qquad S^T=S,\quad A^T=-A,
\]
then
\[
F^TLF=F^TSF.
\]
Nonnegative dissipation constrains \(S\succeq0\), while leaving \(A\) unconstrained by that quadratic condition.

Accordingly, \(H_2(\mathbb R)_+\) naturally represents the symmetric positive response sector. It does not include an independent antisymmetric response coefficient.

Moving to \(H_2(\mathbb C)\) does not automatically solve that physical identification. Encoding
\[
S+iA=
\begin{pmatrix}
a&c+i\kappa\\
c-i\kappa&b
\end{pmatrix}
\]
as a positive state requires
\[
c^2+\kappa^2\le ab.
\]
This is stronger than positivity of the dissipative response, which requires only \(c^2\le ab\). Any such complex encoding needs its own physical justification.

## 3. Reversible dynamics and sequential operations are available

On a rebit, real orthogonal conjugation gives reversible transformations:
\[
\rho\longmapsto O\rho O^T,
\qquad O\in O(2).
\]
These preserve positivity, trace, and the probability pairing when effects transform correspondingly. Their induced action supplies the full orthogonal symmetry of the Bloch disk.

Continuous reversible evolution has the form
\[
O(t)=e^{tK},
\qquad K^T=-K,
\]
and hence
\[
\dot\rho=[K,\rho].
\]

There is one independent continuous generator:
\[
\operatorname{Der}(H_2(\mathbb R))\cong\mathfrak{so}(2),
\qquad
\dim\mathfrak{so}(2)=1.
\]
Thus two independent response observables fit comfortably, but a single rebit does not supply two independent continuous symmetry generators. If the programme assigns that stronger dynamical role to the currents, additional structure is needed.

It is also essential to distinguish normalized reversibility from cone symmetry. An invertible congruence
\[
R\longmapsto MRM^T
\]
preserves the positive cone, but generally changes its trace. The normalized expression
\[
\rho\longmapsto
\frac{M\rho M^T}{\operatorname{Tr}(M\rho M^T)}
\]
is generally nonlinear in \(\rho\). After appropriate scaling, it describes a conditional filtering update. It is not a deterministic reversible transformation of the convex normalized state space.

### Instruments supply actual measurement processes

A concrete sequential theory uses real Kraus operations:
\[
\mathcal T_k(\rho)
=\sum_\alpha M_{k\alpha}\rho M_{k\alpha}^T,
\qquad
\sum_{k,\alpha}M_{k\alpha}^TM_{k\alpha}=I.
\]
The probability of outcome \(k\) is
\[
p_k=\operatorname{Tr}\mathcal T_k(\rho),
\]
and its effect is
\[
E_k=\sum_\alpha M_{k\alpha}^TM_{k\alpha}.
\]

Every effect \(0\le E\le I\) can be implemented by the operation
\[
\rho\longmapsto\sqrt E\,\rho\,\sqrt E,
\]
together with the complementary outcome. This supplies both outcome probabilities and conditional state updates.

A stronger Hamiltonian requirement deserves separate treatment. A nontrivial continuous disk rotation preserves no nonconstant affine observable: if \(\alpha+\beta\cdot r\) is conserved for every state under that rotation, then \(\beta=0\). Thus reversible rebit dynamics does not automatically provide the familiar correspondence between a nonzero generator and a nonconstant conserved energy observable. Barnum, Müller and Ududec formalize such an additional requirement and show that, among ball state spaces with the stated transitive symmetry assumptions, it selects the three-dimensional Bloch ball. [arxiv.org](https://arxiv.org/html/1403.4147v4?utm_source=chatgpt.com)

## 4. Standard real composition gives a complete theory—and fails local tomography

The most direct completion takes finite-dimensional real Hilbert spaces as systems and uses their ordinary real tensor product:
\[
H_m(\mathbb R)\odot H_n(\mathbb R)=H_{mn}(\mathbb R).
\]

Joint states are real positive semidefinite matrices of trace one; joint effects satisfy \(0\le E\le I\); instruments use real Kraus operators. Product preparations and effects are ordinary matrix tensor products. Partial traces give marginals, and independent local operations compose consistently.

This theory includes continuous reversible interactions. For example, an orthogonal rotation in the span of \(\lvert00\rangle,\lvert11\rangle\) can send
\[
\lvert00\rangle
\longmapsto
\cos\theta\,\lvert00\rangle+\sin\theta\,\lvert11\rangle.
\]
For generic \(\theta\), the resulting state is entangled.

### The tomography deficit is exactly visible for two rebits

Local tomography asks whether **all joint probabilities of local measurement outcomes**, including their correlations, determine the joint state. It is stronger than knowing the marginal states.

For two rebits,
\[
\dim H_2(\mathbb R)=3,
\qquad
\dim H_4(\mathbb R)=10,
\]
whereas the span of product effects has dimension
\[
3\times3=9.
\]
There is one extra global coordinate. In normalized affine dimensions, the same comparison is nine joint-state parameters versus eight accessible through product statistics.

The following direct calculation exhibits it. Define
\[
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad
C=J\otimes J.
\]
Although \(J\) is antisymmetric, \(C\) is real symmetric, with
\[
C^2=I_4,\qquad \operatorname{Tr}C=0.
\]
Therefore
\[
\rho_\pm=\frac14(I_4\pm C)
\]
are valid, distinct joint states.

For every pair of real symmetric local effects \(E,F\),
\[
\operatorname{Tr}(EJ)=\operatorname{Tr}(FJ)=0.
\]
It follows that
\[
\operatorname{Tr}\bigl[(E\otimes F)\rho_\pm\bigr]
=\frac14\operatorname{Tr}E\,\operatorname{Tr}F.
\]
The two states agree on every product measurement.

Nevertheless, the valid global effect
\[
P_+=\frac12(I_4+C)
\]
distinguishes them perfectly:
\[
\operatorname{Tr}(P_+\rho_+)=1,
\qquad
\operatorname{Tr}(P_+\rho_-)=0.
\]

This is a failure of local tomography within a fully specified operational theory.

Moreover, the extra direction is generated by the ordinary Jordan product:
\[
(X\otimes X)\circ(Z\otimes Z)=J\otimes J.
\]
Deleting it to obtain a nine-dimensional space does not preserve the usual matrix Jordan algebra.

Under the compatible dynamics, adjoint, and generation conditions used by Barnum, Graydon and Wilce, Jordan composites are constrained by the universal Jordan tensor product; the real–real case gives the standard real composite. Those hypotheses matter: the result does not prohibit other GPT tensor cones for disk systems. [quantum-journal.org](https://quantum-journal.org/papers/q-2020-11-08-359/pdf/?utm_source=chatgpt.com)

Real quantum theory has a weaker positive tomography result: it is **bilocally tomographic**. Measurements on blocks of at most two elementary components, together with correlations across those blocks, suffice. This should not be confused with reconstruction from the collection of two-party reduced states alone. [arxiv.org](https://arxiv.org/html/1005.4870v1?utm_source=chatgpt.com)

### Process composition needs an equally explicit definition

For a complete real theory, specify transformations as real completely positive maps on full real matrix algebras, or equivalently identify them by their behavior with arbitrary ancillas.

Their action on isolated symmetric states can be insufficient. Two processes may agree on every local rebit state yet act differently on the joint \(J\otimes J\) sector. Barnum, Graydon and Wilce explicitly accommodate this distinction between processes and their induced single-system positive maps. It is a failure of local **process** tomography, and retaining the ancillary action makes composition unambiguous. [quantum-journal.org](https://quantum-journal.org/papers/q-2020-11-08-359/pdf/?utm_source=chatgpt.com)

## 5. Local tomography can be retained with a different tensor rule

If local tomography is required, one can put the composite on the vector space \(A\otimes B\) itself and choose a suitable cone there.

For state cones \(C_A,C_B\), the standard extremes are
\[
C_A\otimes_{\min}C_B
=
\operatorname{cone}\{a\otimes b:a\in C_A,\ b\in C_B\},
\]
and
\[
C_A\otimes_{\max}C_B
=
\left\{
w:(f\otimes g)(w)\ge0
\text{ for all }f\in C_A^*,\,g\in C_B^*
\right\}.
\]

The minimal cone contains only separable states. The maximal cone permits every state compatible with positivity on product effects. For nonclassical proper cones such as the rebit cone, these constructions differ. [arxiv.org](https://arxiv.org/html/1911.09663v3?utm_source=chatgpt.com)

After selecting \(C_{AB}\), define the unrestricted composite effects by
\[
\mathcal E_{AB}
=
\{e\in C_{AB}^*:u_A\otimes u_B-e\in C_{AB}^*\}.
\]
Thus the effect space remains well-defined. In particular, enlarging the state cone changes its dual effect cone; states and effects cannot both be enlarged independently.

The minimal and maximal constructions extend associatively to multiple systems, preserve local rotations, and are locally tomographic because product functionals separate points of the chosen tensor-product vector space. They need not preserve a Jordan-algebra structure on the composite.

The limitation concerns reversible interactions. Krumm and Müller prove that for ball state spaces of dimension \(d\ge2\), with full local \(SO(d)\), no-signalling, local tomography, and a closed connected global reversible transformation group, \(d\ne3\) permits only products of local reversible transformations. [arxiv.org](https://arxiv.org/html/1804.05736v3?utm_source=chatgpt.com)

For a disk, \(d=2\), this rules out continuous reversible coupling under those assumptions. It does **not** rule out a consistent locally tomographic theory, irreversible coupling, or entangled states supplied by preparation. Those are separate questions.

Accordingly, if the programme needs only local reversible changes and an irreversible response mechanism, a locally tomographic disk GPT remains a possible choice. If it requires reversible interaction between independently prepared systems, the distinction becomes decisive.

## 6. What a nearby rank-two cone changes

A rank-two spin factor has Lorentz cone
\[
C_d=\{(t,x)\in\mathbb R\oplus\mathbb R^d:t\ge\|x\|\},
\]
and a normalized state space that is a \(d\)-dimensional ball. The familiar cases are:

| \(d\) | Rank-two model | Normalized state space |
|---:|---|---|
| 1 | \(\mathbb R\oplus\mathbb R\) | Classical interval |
| 2 | \(H_2(\mathbb R)\) | Rebit disk |
| 3 | \(H_2(\mathbb C)\) | Qubit ball |
| 5 | \(H_2(\mathbb H)\) | Quaternionic five-dimensional ball |

Increasing \(d\) preserves rank two while adding state coordinates. It therefore does not, by itself, preserve the claim that two responses completely describe the elementary state. These ball models and their relation to real, complex and quaternionic bits are discussed in the primary analysis of reversible ball theories. [arxiv.org](https://arxiv.org/html/1804.05736v3?utm_source=chatgpt.com)

For the complex qubit, the real disk is the section
\[
\rho=\frac12(I+r_xX+r_yY+r_zZ),
\qquad r_y=0.
\]
The full theory adds the third coordinate \(r_y\). With the standard complex Hilbert-space tensor product,
\[
H_2(\mathbb C)\odot H_2(\mathbb C)=H_4(\mathbb C),
\]
and
\[
\dim_{\mathbb R}H_4(\mathbb C)=16=4\times4.
\]
Product effects span the joint Hermitian space, so local tomography holds.

The two current responses can remain distinguished observables in this completion. The third coordinate must then be given an operational meaning, or acknowledged as additional state information. General qubit dynamics does not preserve a fixed real disk.

There is also a broader Jordan restriction. Barnum and Wilce show that a theory with homogeneous self-dual cones, factorizing self-dualizing inner products, closure under locally tomographic composites, and an actual complex qubit has systems given by self-adjoint parts of complex matrix algebras. The factorization and qubit assumptions are essential to the stated result. [arxiv.org](https://arxiv.org/html/1202.4513v2?utm_source=chatgpt.com)

One further constraint applies to every proposed rank-two programme: **the composites cannot all remain rank two** if independent composition is intended. Two systems each possessing two perfectly distinguishable preparations yield four perfectly distinguishable product preparations. The standard real completion handles this by passing from \(H_2(\mathbb R)\) to \(H_4(\mathbb R)\).

## 7. The commitment the programme needs to make

A mathematically complete rebit version can state:

> An elementary system is a normalized positive two-channel response matrix in \(H_2(\mathbb R)\). Effects are the order interval \(0\le E\le I\), probabilities use the trace pairing, and instruments are real completely positive operations. Reversible dynamics is orthogonal conjugation. Systems compose through the real Hilbert-space tensor product. The resulting theory admits reversible interactions and is bilocally, rather than locally, tomographic.

That is a coherent operational theory. To establish that it implements the intended programme, the response interpretation must supply three pieces of evidence:

1. **A faithful state dictionary:** which current data determine the positive matrix, which data normalization removes, and whether the required disk or positivity constraints hold.
2. **An operational effect dictionary:** which experimental procedures realize the proposed effects, including access to the cross-response.
3. **A dynamical and compositional commitment:** whether the currents are observables, generators, or response coefficients, and which joint measurements and interactions are physically available.

If local tomography and continuous reversible interactions are both indispensable under the stated symmetry assumptions, I would formulate the programme on \(H_2(\mathbb C)\), retaining the two currents as distinguished response observables and explicitly accounting for the additional coordinate. If preserving exactly the rebit’s two normalized coordinates is indispensable, standard real composition provides the strongest straightforward completion, with its failure of local tomography treated as a definite prediction of the model.

