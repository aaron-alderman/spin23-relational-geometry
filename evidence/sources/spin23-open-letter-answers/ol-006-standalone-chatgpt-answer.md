## Verdict

**A precise twistor construction can induce an oriented four-dimensional geometry and its chiral decomposition from the real \(\mathrm{Spin}(2,3)\) spinor space. Bare projective null incidence does not, by itself, select a physically preferred chirality.**

There is a useful positive result here: the real symplectic spinor representation can reconstruct Lorentzian AdS\(_4\) as a space of complex twistor lines. Its reality structure and an orientation can be obtained from the construction, without adding an unrelated Hermitian form or independently choosing an orientation at every point. A published realization of this construction appears in Kuzenko and Tartaglino-Mazzucchelli’s treatment of AdS twistor geometry. [Springer Nature Link](https://link.springer.com/article/10.1140/epjc/s10052-022-10072-y?utm_source=chatgpt.com)

But three claims must be distinguished:

1. **Chiral decomposition:** constructing the two four-dimensional Weyl sectors.
2. **Geometric ordering:** distinguishing those sectors through an orientation or a specified incidence construction.
3. **Physical selection:** explaining an asymmetry in dynamics, spectrum, couplings, or observables.

The geometry can establish the first two in a carefully specified reconstruction. The third does not follow from them.

Since the detailed A5 statement is not included, I assess it below against the physical chirality-selection requirement stated in your question.

## 1. What the \((2,3)\) pure-spinor geometry actually supplies

Take \(V=\mathbb R^{2,3}\), with two positive and three negative directions. Work with the connected spin group:

\[
G=\mathrm{Spin}_0(2,3)\cong\mathrm{Sp}(4,\mathbb R).
\]

Its real spinor representation is a four-dimensional symplectic vector space

\[
(S,\Omega),\qquad \dim_{\mathbb R}S=4.
\]

There is only one irreducible complex spin representation in dimension five. There is no five-dimensional Weyl splitting into two chiral spin representations. Moreover, in dimension five every nonzero complex spinor is pure; the split real form supplies the corresponding real pure-spinor geometry. These facts are explicit in Taghavi-Chabert’s treatment, particularly §2.1 and Appendix B.2. [arxiv.org](https://arxiv.org/pdf/1304.1076?utm_source=chatgpt.com)

Thus **purity itself imposes no additional selection among nonzero spinors in this dimension**.

For a nonzero real spinor \(s\), its annihilator is a maximal totally null two-plane:

\[
N_s=\{v\in V:c(v)s=0\},
\qquad \dim_{\mathbb R}N_s=2.
\]

Here one may use the real Clifford convention \(c(v)^2=-q(v)\). The annihilator is unchanged by rescaling \(s\), so it belongs naturally to projective spinor geometry.

The relevant incidence dictionary is

\[
\mathbb P(S)\cong\mathbb{RP}^{3},
\qquad
Q=\{[x]\in\mathbb P(V):q(x)=0\}
   \cong\mathrm{Lag}(2,S).
\]

The quadric \(Q\) is the three-dimensional conformal Einstein universe. Its null geodesics correspond to points of \(\mathbb P(S)\), which carries a contact structure. In the symplectic description, incidence is simply

\[
[s]\text{ incident with }W
\quad\Longleftrightarrow\quad
\mathbb Rs\subset W,
\qquad W\in\mathrm{Lag}(2,S).
\]

Barbot and collaborators develop this correspondence explicitly in §§5.1–5.7. [arxiv.org](https://arxiv.org/pdf/0706.3055?utm_source=chatgpt.com)

### The dimension distinction matters

Several four-dimensional objects occur nearby, but they are different:

| Object | Real dimension | What it supplies |
|---|---:|---|
| Spinor space \(S\) | 4 | A symplectic vector space |
| Projective spinor space \(\mathbb P(S)\) | 3 | Contact and projective geometry |
| Projective null quadric \(Q\subset\mathbb P(V)\) | 3 | A Lorentzian conformal three-geometry |
| Nonzero null cone in \(V\) | 4 | A degenerate induced metric |
| Point–null-geodesic incidence correspondence | 4 | A flag geometry |

The null cone has dimension four because projectivization has not yet removed its radial direction. That radial direction is also the radical of its induced metric. Equivalently, for a null line \(\ell\),

\[
\dim\ell^\perp=4,
\qquad
\operatorname{rad}(q|_{\ell^\perp})=\ell,
\]

and the nondegenerate quotient \(\ell^\perp/\ell\) has dimension three.

Likewise, the four real components of \(S\) do not make \(S\) a Lorentzian tangent space. Its symplectic form supplies the orientation \(\Omega\wedge\Omega\), but no invariant Lorentzian metric.

There is also a representation-theoretic obstruction to a **fixed** chiral split:

\[
\operatorname{End}_{G}(S)=\mathbb R.
\]

Consequently, there is no nontrivial \(G\)-invariant rank-two projector on \(S\). A four-dimensional chiral decomposition must arise relative to some further geometric object—such as a spacetime point in a reconstructed model. That qualification is exactly what makes the positive construction possible.

## 2. A genuine positive construction: oriented AdS\(_4\) from twistor lines

This is the strongest reason not to give a blanket negative answer.

Start with the same real symplectic space \((S,\Omega)\), and complexify:

\[
T=S\otimes_{\mathbb R}\mathbb C.
\]

The real form supplies conjugation \(z\mapsto\bar z\). Define

\[
h(z,w)=i\,\Omega(\bar z,w).
\]

Because \(\Omega\) is real and antisymmetric, \(h\) is Hermitian. In a symplectic basis, its matrix is \(i\Omega\), which has signature \((2,2)\).

**Thus the Hermitian structure required for this Lorentzian twistor construction can be derived from the declared real symplectic input.** It need not be an independently inserted tensor.

Now define a space of complex two-planes:

\[
\mathcal M=
\left\{
L\in\mathrm{Gr}_2(T):
h|_L=0,\quad
\Omega|_L\text{ is nondegenerate}
\right\}.
\]

Equivalently,

\[
\Omega(L,\bar L)=0,
\qquad
\Omega|_L\neq0.
\]

The ordinary, nonsupersymmetric case of the AdS construction in Kuzenko–Tartaglino-Mazzucchelli is precisely this moduli problem: their complex frames satisfy these conditions and are identified under changes of basis in \(\mathrm{GL}(2,\mathbb C)\). The resulting space is AdS\(_4\). [Springer Nature Link](https://link.springer.com/article/10.1140/epjc/s10052-022-10072-y?utm_source=chatgpt.com)

### The Weyl decomposition follows

Since \(L\) is symplectic and \(\bar L\) is its symplectic orthogonal complement,

\[
L^{\perp_\Omega}=\bar L,
\qquad
T=L\oplus\bar L.
\]

The directness is easy to check: an element of \(L\cap\bar L\) would lie in the radical of \(\Omega|_L\), which is zero.

The stabilizer of \(L\) is \(\mathrm{SL}(2,\mathbb C)\), viewed as a real group. Therefore

\[
\mathcal M\cong
\frac{\mathrm{Sp}(4,\mathbb R)}
     {\mathrm{SL}(2,\mathbb C)},
\qquad
\dim_{\mathbb R}\mathcal M=10-6=4.
\]

At the point represented by \(L\), the two Weyl factors are the tautological plane and its conjugate:

\[
S^+_L=L,
\qquad
S^-_L=\bar L,
\]

up to the convention naming the factors. The complexified tangent space is

\[
(T_L\mathcal M)_{\mathbb C}
\cong
\operatorname{Hom}_{\mathbb C}(L,T/L)
\cong
L^*\otimes\bar L.
\]

This is a point-dependent chiral decomposition. It does not contradict the absence of a fixed \(\mathrm{Sp}(4,\mathbb R)\)-invariant splitting of \(S\).

### The Lorentzian signature and orientation can also be checked directly

Here is an algebraic derivation of the orientation, rather than an assumption that it exists.

A Grassmannian tangent vector is a map

\[
\phi:L\longrightarrow T/L.
\]

Since \(h|_L=0\), the form

\[
B_\phi(u,v)=h(u,\phi(v))
\]

is well-defined. Linearizing the condition that the varying plane remain \(h\)-null gives

\[
B_\phi(u,v)+\overline{B_\phi(v,u)}=0.
\]

Hence \(H_\phi=iB_\phi\) is Hermitian, and

\[
T_L\mathcal M\cong\mathrm{Herm}_2(\mathbb C).
\]

Write a Hermitian matrix as

\[
H=
\begin{pmatrix}
t+x&y+iz\\
y-iz&t-x
\end{pmatrix}.
\]

Then

\[
\det H=t^2-x^2-y^2-z^2.
\]

The determinant therefore gives a Lorentzian conformal quadratic form.

An orientation can be defined using the usual ordered real coordinates of a Hermitian matrix, for example

\[
(H_{11},H_{22},\operatorname{Re}H_{12},
\operatorname{Im}H_{12}).
\]

Under a complex change of basis \(A\),

\[
H\longmapsto A^\dagger H A,
\]

and the determinant of this transformation on the real four-dimensional space is

\[
\det_{\mathbb R}(H\mapsto A^\dagger H A)
=
|\det_{\mathbb C}A|^4>0.
\]

So this orientation is independent of the chosen complex basis. Once the universal coordinate convention is stated, no local orientation choices are needed.

Even the sign of \(\Omega\) does not change this four-dimensional orientation: replacing \(\Omega\) by \(-\Omega\) sends \(H\) to \(-H\), which preserves orientation in real dimension four.

**The positive result is therefore substantial:** a specified twistor-line reconstruction supplies Lorentzian four-geometry, an orientation, and two distinguished Weyl bundles from the real symplectic spinor data.

What it has not established is why this reconstructed model is the programme’s physical spacetime, or why its physics should prefer one bundle.

## 3. Where projectivization loses chirality

The distinction between a twistor line and its polar is decisive.

On \(\mathcal M\), symplectic polarity acts as

\[
L\longmapsto L^{\perp_\Omega}=\bar L.
\]

It exchanges the two Weyl factors and reverses the induced four-dimensional orientation.

In an ambient AdS description, the correspondence is, after fixing consistent spinor–vector conventions,

\[
L\longleftrightarrow n,
\qquad
\bar L\longleftrightarrow -n.
\]

With the signature convention used here,

\[
q(n)=\ell^2,
\qquad
T_n\mathrm{AdS}_4=n^\perp,
\]

and \(n^\perp\) has signature \((1,3)\).

The projective ambient description retains only

\[
[n]\longleftrightarrow\{L,\bar L\}.
\]

It has forgotten which member of the pair was the individual twistor line.

### The orientation obstruction is global, not merely a label ambiguity

Given an ambient orientation \(\varepsilon_V\), a signed normal induces

\[
\varepsilon_{n^\perp}(v_1,v_2,v_3,v_4)
=
\varepsilon_V(n,v_1,v_2,v_3,v_4).
\]

Thus

\[
n\mapsto -n
\quad\Longrightarrow\quad
\varepsilon_{n^\perp}\mapsto-\varepsilon_{n^\perp}.
\]

The projective domain of positive-norm lines is the antipodal quotient of the AdS hyperboloid. Its topology makes the obstruction explicit:

\[
\mathrm{AdS}_4\cong S^1\times\mathbb R^3,
\]

and the antipodal map acts as

\[
(\theta,\mathbf x)\longmapsto
(\theta+\pi,-\mathbf x).
\]

It preserves the orientation of \(S^1\) and reverses that of \(\mathbb R^3\). Consequently, the antipodal quotient is nonorientable.

Therefore:

> An ordered four-dimensional chirality cannot descend globally to the projective AdS domain that identifies \(n\) with \(-n\), or equivalently \(L\) with \(\bar L\).

One can retain the individual-line space, use an appropriate cover, or work locally with orientation choices. Those alternatives are mathematically consequential and must be explicit.

### This does not invalidate the positive construction

The existence of an orientation-reversing map is not, by itself, a proof that an orientation cannot be naturally constructed.

The twistor construction remembers projective object types: points, lines, and hyperplanes. Symplectic polarity is a projective **correlation**, exchanging points with hyperplanes; it is not an ordinary projective point transformation induced by a linear map of \(T\).

Accordingly:

- If the declared input retains those incidence types and the spacetime points are individual \(L\)’s, the orientation construction above is natural under its linear symplectic symmetries.
- If the programme identifies polar descriptions, the ordered chirality does not survive that identification.

This is the appropriate meaning of “canonical” to audit. One must specify the automorphisms and equivalences of the input before testing whether the output respects them.

Similarly, an already specified spin structure can carry orientation information. A proof cannot silently use that information and subsequently claim to have derived it from unoriented incidence.

### A narrower obstruction for one pure spinor

There is also a clean obstruction to extracting a nonnull normal from just one real projective pure spinor.

The stabilizer \(P\) of \([s]\in\mathbb{RP}^3\) has dimension

\[
\dim P=10-3=7.
\]

The stabilizer \(H\) of a nonnull normal line has dimension six. An equivariant assignment

\[
[s]\longmapsto[n(s)]
\]

would require \(P\) to lie in a conjugate of \(H\), which is impossible by dimension.

So one real projective pure spinor cannot canonically produce the missing nondegenerate four-plane. Reconstructing the whole four-dimensional twistor-line moduli space is a different operation and avoids this obstruction.

## 4. Reality is derivable in the AdS construction, but the physical real form is not uniquely forced

A further qualification is necessary: the same real symplectic data support more than one natural four-dimensional construction.

On \(\mathrm{Gr}_2(T)\), define

\[
\kappa(L)=\bar L,
\qquad
\sigma(L)=L^{\perp_\Omega}.
\]

These operations commute.

The fixed locus of \(\kappa\) is

\[
\operatorname{Fix}(\kappa)
=
\mathrm{Gr}_2(\mathbb R^4).
\]

Its tangent spaces are real \(2\times2\) matrices, with determinant quadratic form of split signature \((2,2)\).

The fixed locus of \(\kappa\sigma\) consists of the maximal \(h\)-null complex two-planes. Its tangent spaces are Hermitian \(2\times2\) matrices, with Lorentzian signature. Restricting to planes on which \(\Omega\) is nondegenerate gives the AdS model above.

Thus **the real symplectic input makes Lorentzian reality available, but does not alone prove that this particular moduli problem is the physical one**. The familiar distinction between Lorentzian, split, and other real slices is reflected in their different spinor conjugations. In Lorentzian signature, conjugation exchanges the two Weyl factors; in split signature, it can preserve each separately. [arxiv.org](https://arxiv.org/pdf/1712.02196?utm_source=chatgpt.com)

This matters when auditing claims about “real pure-spinor planes.” A real Lorentzian four-space has maximal totally null real subspaces of dimension one. Its \(\alpha\)- and \(\beta\)-planes are complex two-planes. Real totally null two-planes belong naturally to split four-geometry or the original five-dimensional split geometry.

### What the four-dimensional Hodge decomposition requires

For an oriented four-dimensional metric with \(t\) negative directions,

\[
*^2\big|_{\Lambda^2}=(-1)^t.
\]

Therefore:

| Four-dimensional signature | Hodge square | Chiral two-form spaces |
|---|---:|---|
| Lorentzian \((1,3)\) | \(-1\) | \(\Lambda^2_{\mathbb C}=\Lambda^2_{+i}\oplus\Lambda^2_{-i}\) |
| Split \((2,2)\) | \(+1\) | \(\Lambda^2_{\mathbb R}=\Lambda^2_{+1}\oplus\Lambda^2_{-1}\) |

For Lorentzian signature,

\[
P_\pm=\frac12(1\mp i*).
\]

Orientation reversal sends \(*\) to \(-*\), exchanging the projectors. Positive conformal rescaling leaves the Hodge operator on two-forms unchanged. Consequently, an **oriented conformal structure** suffices for this decomposition; a metric scale is unnecessary. Krasnov gives the Lorentzian Hodge construction and its conformal invariance explicitly. [arxiv.org](https://arxiv.org/html/0904.0423v2?utm_source=chatgpt.com)

Lorentzian reality also gives

\[
\overline{\Lambda^2_{+i}}=\Lambda^2_{-i},
\qquad
\overline{S^+}=S^-.
\]

The chiral pair is therefore ordered geometrically while remaining linked by conjugation.

## 5. What additional data are mathematically unavoidable?

There is no single list of tensors that must always be independently added. Different constructions can derive one piece of structure from another. The unavoidable requirements are better stated as things the programme must supply **or derive**.

| Requirement | What must be established |
|---|---|
| **A nondegenerate four-dimensional target** | A four-manifold or tangent geometry with the intended signature. In the twistor route, justify the chosen line moduli space as physical spacetime. |
| **A compatible real structure** | Explain the reality operation and its consequences. For the AdS construction, \(h=i\Omega(\bar{\cdot},\cdot)\) is derived; its physical interpretation still needs justification. |
| **An ordering that survives the actual identifications** | Retain individual \(L\)’s, signed normals, or an appropriate oriented cover. If polar pairs are identified, global ordered chirality is lost. |
| **A relation between internal and spacetime geometry** | If the spinors initially live in an internal bundle, provide a nondegenerate soldering map or equivalent reconstruction relating them to \(TM\). |
| **A global spinorial realization, when required** | For global Weyl fields, demonstrate the relevant spin structure and bundle construction; it may be inherited rather than separately chosen. |
| **A physical asymmetry** | Supply dynamics, matter representations, a state, boundary conditions, or another justified mechanism that produces an observable chiral preference. |

Two things should not be added to this list indiscriminately.

First, **time orientation is distinct from spacetime orientation**. It matters for future-directed propagation and energy conventions, but is not required merely to define the Hodge split. In the twistor construction, the sign of \(h\) can affect a positive-cone convention even though it does not change the four-dimensional orientation.

Second, **a scale is not needed merely for chirality**. It becomes relevant when selecting a particular metric, curvature radius, or gravitational dynamics.

### The Cartan-gravity route makes the missing link explicit

If the programme treats \(\mathrm{Spin}(2,3)\) as an internal gauge symmetry over an independently supplied four-manifold, a standard construction introduces a nonnull compensator \(n^A\) and a connection \(A^{AB}\).

For the Lorentzian reduction in our convention, take \(q(n)>0\), and define

\[
\Pi^A{}_B
=
\delta^A{}_B-\frac{n^A n_B}{q(n)},
\qquad
e^A=\Pi^A{}_B\,Dn^B.
\]

Then

\[
g_{\mu\nu}=q_{AB}e^A{}_\mu e^B{}_\nu
\]

is nondegenerate only if \(e\) has rank four. The sign of \(q(n)\) distinguishes Lorentzian and split stabilizers. Westman and Złośnik explicitly formulate gravity using such a connection and symmetry-breaking field. [arxiv.org](https://arxiv.org/html/1302.1103v2?utm_source=chatgpt.com)

This offers a legitimate research route: derive the compensator, its norm sign, and nondegenerate soldering from the programme’s other principles. A null-incidence relation alone has not established them.

Moreover, the orientation of the soldering matters when translating internal self-duality into spacetime self-duality. Sahlmann and Seeger exhibit that dependence explicitly in their equation (88). [arxiv.org](https://arxiv.org/html/2310.19729v1?utm_source=chatgpt.com)

For the homogeneous twistor-line model, these structures are built into the reconstruction. For general curved gravity, their existence and dynamics require further work.

## 6. Why a chiral formulation of gravity does not complete the selection argument

There are two different uses of “self-dual gravity” that must remain separate.

### A self-dual curvature restriction

For a real Lorentzian metric, the two chiral Weyl curvatures are conjugate:

\[
C^-=\overline{C^+}.
\]

Consequently,

\[
C^-=0
\quad\Longrightarrow\quad
C^+=0
\quad\Longrightarrow\quad
C=0.
\]

A real Lorentzian metric with only one nonzero chiral Weyl component is therefore impossible. A half-flat real Lorentzian conformal geometry is conformally flat. If it is also Einstein, it is locally a constant-curvature geometry.

This explains why nontrivial self-dual gravitational geometries are naturally studied in complex, Euclidean, or split settings. The usual nonlinear graviton construction describes a self-dual gravitational sector through integrable twistor geometry; integrability is a substantive condition, not a consequence of pointwise spinor purity. [arxiv.org](https://arxiv.org/abs/2110.06066?utm_source=chatgpt.com)

### A self-dual formulation of full real gravity

A complex self-dual connection can nevertheless describe full real Lorentzian GR.

In familiar canonical conventions,

\[
A=\Gamma(E)+iK,
\]

with reality conditions represented schematically by

\[
E=\bar E,
\qquad
A+\bar A=2\Gamma(E).
\]

These conditions recover real gravity. They do not remove one gravitational polarization. Sahlmann and Seeger explicitly recover the two real physical gravitational degrees of freedom and the real Einstein theory from the self-dual formulation. [arxiv.org](https://arxiv.org/html/2310.19729v1?utm_source=chatgpt.com)

Therefore, neither writing the theory with one chiral connection nor obtaining one distinguished twistor ruling proves a physical preference for one graviton helicity.

Nor does Lorentzian conjugation prohibit chiral matter theories. A Weyl field can have asymmetric interactions or representation content. Those are statements about the matter theory and its couplings; they do not follow just from the existence of the two spinor bundles.

The relevant physical test is an asymmetry in quantities such as allowed representations, interaction strengths, propagation, or amplitudes. A convention for calling one bundle “left” does not supply that asymmetry.

## 7. Assessment of the A5 chirality gate

I would formulate the assessment in three stages.

### A5: geometric reconstruction — achievable

A precise positive statement is:

> From a real symplectic four-dimensional spinor space, the specified moduli space of nondegenerate complex two-planes satisfying \(\Omega(L,\bar L)=0\) reconstructs Lorentzian AdS\(_4\), with an orientation induced by the complex incidence construction and a tautological ordered pair of Weyl bundles.

This avoids an unnecessarily strong claim that orientation and Lorentzian reality must always be independently postulated.

It also makes the limits explicit: the result is a particular reconstructed four-geometry, with both chiral factors present.

### A5: compatibility with projective identifications — a decisive test

The programme must say whether its spacetime points retain \(L\) or only the pair

\[
\{L,L^{\perp_\Omega}\}.
\]

Equivalently, does it retain \(n\) or only \([n]\)?

If it identifies the pair, global orientation and ordered chirality do not descend. If it retains individual lines, the construction can induce them. If an existing projective physical spacetime is being lifted to that space, the lift must be justified.

A useful audit is:

> Does every equivalence declared physically irrelevant preserve the proposed chirality, or does one of those equivalences exchange its two sectors?

This test must use the actual declared input. It would be incorrect either to introduce a chirality-exchanging equivalence after constructing the orientation, or to silently exclude one that the programme originally treated as irrelevant.

### A5: physical selection — not established by incidence

The remaining proposition is stronger:

> Why does the physical theory distinguish the two geometrically available sectors?

Pure-spinor incidence does not answer that question merely by supplying an ordered pair. The programme would need an independently justified mechanism and an observable consequence. A symmetry-breaking state, boundary condition, chiral matter representation, or parity-sensitive interaction could contribute, but each introduces a further claim to establish.

**The defensible programme result is therefore a conditional success for geometric chirality, together with a sharp projective obstruction and an unresolved physical selection step.** Twistor incidence can do more than provide convenient notation: it can reconstruct the oriented Lorentzian geometry. To pass the physical version of A5, the programme must then show why its spacetime retains the requisite incidence distinction and how that distinction produces a measurable preference for one chiral sector.

