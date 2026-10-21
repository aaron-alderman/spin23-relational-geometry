**The real incidence geometry is well established. A reconstruction theorem becomes valid only after one specifies a field equation, an admissible class of boundary data, a boundary condition, and the structures that carry causality and positivity.** The group \(\operatorname{Spin}_0(2,3)\) does not supply those dynamical choices by itself.

The essential distinction is between three objects:

- **Real projective twistors:** \(\mathbb{RP}^{3}\), parametrizing null geodesics of the three-dimensional conformal boundary.
- **Boundary spacetime:** the real Lagrangian Grassmannian \(\operatorname{Lag}(2,\mathbb R^{4})\), with appropriate covering information.
- **Lorentzian bulk points:** certain **complex** two-planes in \(\mathbb C^{4}\), satisfying a Hermitian reality condition.

For reconstruction, there are precise positive results in free and linearized sectors. What requires a separate theorem is the assertion that a proposed real twistor transform identifies exactly the physical boundary-data space and preserves its symplectic, spectral, and distributional structures.

I will take “bulk” to mean Lorentzian \(\mathrm{AdS}_{4}\), or a specified asymptotically AdS geometry, and use mostly-plus spacetime signature.

## 1. The real boundary correspondence

Let \(S\cong\mathbb R^{4}\) carry a nondegenerate alternating form \(\Omega\). Then

\[
G=\operatorname{Sp}(S,\Omega)
\cong\operatorname{Spin}_0(2,3).
\]

The two relevant homogeneous spaces are

\[
\mathcal T_{\mathbb R}=\mathbb P(S)\cong\mathbb{RP}^{3},
\qquad
\mathcal E=\operatorname{Lag}(S,\Omega).
\]

Their correspondence space is

\[
\mathcal F
=
\{(\ell,L):\ell\subset L\subset S,\ 
\dim\ell=1,\ \dim L=2,\ \Omega|_L=0\},
\]

giving the double fibration

\[
\mathcal T_{\mathbb R}
\ \longleftarrow\ 
\mathcal F
\ \longrightarrow\
\mathcal E.
\]

Both fibres are \(\mathbb{RP}^{1}\). The geometric dictionary is:

| Symplectic object | Boundary interpretation |
|---|---|
| A real Lagrangian plane \(L\) | A spacetime point |
| A real projective twistor \(\ell=[Z]\) | An unparametrized null geodesic, or photon |
| \(\ell\subset L\) | The photon passes through the point |
| \(\mathbb P(L)\subset\mathbb{RP}^{3}\) | The family of photons through that point |
| \(L\cap L'\ne0\), for distinct planes | The corresponding points are null incident |

This is the established symplectic description of the \(2+1\)-dimensional Einstein universe. [arxiv.org](https://arxiv.org/html/0706.3055v1?utm_source=chatgpt.com)

The contact distribution on twistor space is

\[
\mathcal H_{[Z]}
=
\{\dot Z\bmod Z:\Omega(Z,\dot Z)=0\}.
\]

It descends projectively because \(\Omega(Z,dZ)\) changes by a nonzero square under rescaling. Each incident line \(\mathbb P(L)\) is Legendrian.

### A direct local calculation

Choose \(S=\mathbb R^{2}\oplus(\mathbb R^{2})^{*}\), with

\[
\Omega((\lambda,\mu),(\lambda',\mu'))
=
\lambda^{T}\mu'-\mu^{T}\lambda'.
\]

A Lagrangian plane transverse to the second factor is the graph

\[
L_x=\{(\lambda,x\lambda)\},
\qquad x=x^{T}.
\]

Write

\[
x=
\begin{pmatrix}
t+x_1 & x_2\\
x_2 & t-x_1
\end{pmatrix}.
\]

Then the incidence relation and conformal quadratic form are

\[
\mu=x\lambda,
\qquad
\det(dx)=dt^{2}-dx_1^{2}-dx_2^{2}.
\]

Consequently,

\[
L_x\cap L_y\ne0
\iff
\ker(x-y)\ne0
\iff
\det(x-y)=0.
\]

Thus Lorentzian null separation follows directly from Lagrangian intersection. Intrinsically, \(T_L\mathcal E\cong\operatorname{Sym}^{2}L^{*}\), and the determinant gives its conformal structure.

The same correspondence has an ambient-vector description. The primitive bivectors

\[
\Lambda^{2}_{0}S
=
\ker\!\left(\Lambda^{2}S\xrightarrow{\Omega}\mathbb R\right)
\]

form the five-dimensional vector representation, with invariant quadratic form of signature \((2,3)\), up to overall sign. The Plücker map \(L=\langle u,v\rangle\mapsto[u\wedge v]\) identifies \(\mathcal E\) with its projective null quadric. These descriptions and the determinant conformal structure agree. [arxiv.org](https://arxiv.org/pdf/1009.1364?utm_source=chatgpt.com)

This already makes the spinor–null-incidence part of the proposed bridge exact. It does not yet specify a field or a propagator.

## 2. Lorentzian bulk reality requires complex twistor lines

Complexify \(S\), retaining its real conjugation, and define

\[
T=S\otimes_{\mathbb R}\mathbb C,
\qquad
h(Z,W)=i\,\Omega(\overline Z,W).
\]

The form \(h\) is Hermitian of signature \((2,2)\). A Lorentzian AdS bulk point is represented by a complex two-plane \(P\subset T\) satisfying

\[
\boxed{
h|_{P\times P}=0,
\qquad
\Omega|_P\ne0.
}
\]

The resulting orbit is

\[
\mathrm{AdS}_{4}
\cong
\operatorname{Sp}(4,\mathbb R)/
\operatorname{SL}(2,\mathbb C),
\]

before unwrapping time. Its incident twistor line is \(\mathbb P(P)\cong\mathbb{CP}^{1}\). These conditions appear explicitly in the bosonic specialization of the AdS supertwistor construction. [arxiv.org](https://arxiv.org/html/2512.14347v1?utm_source=chatgpt.com)

This is ordinary periodic AdS, with antipodal bulk points distinct. Conjugate planes \(P\) and \(\overline P\) correspond to those distinct antipodal points; identifying them would impose an additional quotient. [arxiv.org](https://arxiv.org/pdf/2308.04135?utm_source=chatgpt.com)

### Why this is the correct reality condition

In a complex graph chart \(P=\operatorname{graph}(X)\), the condition \(h|_P=0\) becomes

\[
X=X^\dagger.
\]

We may therefore write

\[
X=
\begin{pmatrix}
t+x_1 & x_2+ir\\
x_2-ir & t-x_1
\end{pmatrix}.
\]

A calculation gives

\[
\Omega|_P
=
2ir
\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
\]

Thus \(r\ne0\) is the bulk, while \(r=0\) recovers the real symmetric boundary matrix. On the \(r>0\) Poincaré patch, the AdS metric is

\[
ds^{2}
=
\frac{L^{2}}{r^{2}}
\left(-dt^{2}+dx_1^{2}+dx_2^{2}+dr^{2}\right).
\]

This calculation exposes the signature issue: **Lorentzian bulk reality is Hermitian reality of the plane.** Taking arbitrary real two-planes in \(\mathbb R^{4}\) instead leads to the split-signature Grassmannian geometry underlying the real X-ray transform. That transform solves an ultrahyperbolic equation; it is not, by that identification alone, a Lorentzian AdS reconstruction theorem. [arxiv.org](https://arxiv.org/pdf/0812.3692?utm_source=chatgpt.com)

There is also a useful boundary-limit argument. The Hermitian-null condition implies

\[
\overline P=P^{\perp_\Omega}.
\]

When \(\Omega|_P\) degenerates to zero, \(P=P^{\perp_\Omega}\), hence \(P=\overline P\). Therefore \(P=L_{\mathbb C}\) for a real Lagrangian plane \(L\).

Conversely, in the bulk, \(\Omega|_P\ne0\) implies \(P\cap\overline P=0\). A bulk twistor line consequently has **no projectively real points**. An arbitrary function on \(\mathbb{RP}^{3}\) cannot simply be evaluated or integrated along that bulk \(\mathbb{CP}^{1}\); an extension or an appropriate integral transform must be supplied.

The full Lorentzian null-twistor hypersurface is

\[
\mathcal Q
=
\{[Z]\in\mathbb{CP}^{3}:h(Z,Z)=0\},
\qquad
\dim_{\mathbb R}\mathcal Q=5.
\]

The real boundary photon space \(\mathbb{RP}^{3}\) sits inside it. Keeping these two spaces distinct is essential to Lorentzian twistor reality. [arxiv.org](https://arxiv.org/pdf/1712.02196?utm_source=chatgpt.com)

### The covering information is physical

The projective boundary is

\[
\mathcal E
\cong
\frac{S^{1}\times S^{2}}
{(\tau,n)\sim(\tau+\pi,-n)}.
\]

The usual conformal boundary of unquotiented periodic AdS is its oriented double cover \(S^{1}\times S^{2}\). Causal global field theory uses

\[
\partial\widetilde{\mathrm{AdS}}_{4}
\cong\mathbb R\times S^{2}.
\]

Both compact-time versions have closed timelike curves. A global future/past distinction therefore requires the universal cover, or a suitable causal patch. [arxiv.org](https://arxiv.org/html/0706.3055v1?utm_source=chatgpt.com)

Accordingly, “projective boundary data” must retain the necessary bundle, spin, and monodromy information. It cannot always mean a single-valued scalar function on the unoriented compact quotient.

## 3. What Penrose reconstruction already establishes

There are two different reconstruction statements to keep separate.

### Local complex Penrose reconstruction

For a suitable open complex spacetime domain \(U\), the usual Penrose transform gives, in one helicity convention,

\[
H^{1}\!\left(\mathbb{PT}_{U},\mathcal O(-2s-2)\right)
\longrightarrow
\{\text{holomorphic chiral spin-}s
\text{ zero-rest-mass fields on }U\}.
\]

A standard sufficient condition for this to be an isomorphism is that the relevant incidence projection have connected fibres with vanishing first Betti number. The domain and cohomological support conditions are part of the theorem. [arxiv.org](https://arxiv.org/pdf/0812.3692?utm_source=chatgpt.com)

Several qualifications matter physically:

- The ordinary transform reconstructs specified massless field-strength sectors.
- Smooth causal solutions and Green distributions require a suitable distributional, CR, or boundary-value formulation; arbitrary smooth data do not acquire a holomorphic extension automatically.
- Lorentzian reality relates conjugate helicity sectors. For example, since \(*^{2}=-1\) on Lorentzian two-forms, a real Maxwell field contains conjugate self-dual and anti-self-dual parts.
- The scalar \(\mathcal O(-2)\) transform gives the conformally coupled scalar. On AdS\(_4\),

  \[
  (\Box_g-R/6)\phi=0,
  \qquad R=-12/L^{2},
  \qquad m_{\rm eff}^{2}L^{2}=-2.
  \]

  Changing the usual projective helicity weight is not a generic-mass scalar prescription. [arxiv.org](https://arxiv.org/pdf/1712.02196?utm_source=chatgpt.com)

### Real boundary incidence transforms

The real correspondence also supports concrete boundary constructions. Schematically, a conserved spin-\(s\) current can be represented by

\[
J_{\alpha_1\ldots\alpha_{2s}}(x)
=
\int_{\mathbb{RP}^{1}}
D\lambda\;
\lambda_{\alpha_1}\cdots\lambda_{\alpha_{2s}}\,
f(\lambda,x\lambda),
\]

with conventional phases suppressed and

\[
f(aZ)=a^{-2s-2}f(Z).
\]

The homogeneity makes the integral projectively well defined; incidence makes current conservation manifest. In this construction the boundary conformal dimension is \(\Delta=s+1\). Such real transforms have been developed explicitly for three-dimensional conserved-current correlators. [arxiv.org](https://arxiv.org/html/2408.02727v1?utm_source=chatgpt.com)

This is a substantial part of the common language the programme seeks. But a representation formula still needs a theorem identifying its kernel, its range, and its physical completion before it becomes a complete bulk reconstruction map.

## 4. A concrete reconstruction theorem: the free scalar benchmark

A useful benchmark is a scalar on the universal cover of global AdS\(_4\):

\[
(\Box_g-m_{\rm eff}^{2})\phi=0,
\qquad
\nu=\sqrt{\frac94+m_{\rm eff}^{2}L^{2}},
\qquad
\Delta_\pm=\frac32\pm\nu.
\]

Near the boundary, with defining function \(z\),

\[
\phi
=
z^{\Delta_-}(a+\cdots)
+
z^{\Delta_+}(b+\cdots).
\]

Resonant cases can contain logarithms. In standard quantization, \(a\) is the source coefficient and the response is proportional to \(b\), with local renormalization terms where required. These coefficients have different conformal weights. The asymptotic and boundary-value theory is formulated precisely in weighted function spaces. [arxiv.org](https://arxiv.org/pdf/0911.5440?utm_source=chatgpt.com)

### First choose stable, causal dynamics

AdS has a timelike boundary, so the equation alone does not define an evolution. In the static formulation one seeks a self-adjoint spatial operator \(A_B\) with

\[
\partial_t^{2}\phi=-A_B\phi.
\]

For the usual scalar finite-energy framework:

| Parameter range | Boundary-condition structure |
|---|---|
| \(\nu^{2}\ge1\) | The relevant self-adjoint extension is unique and positive |
| \(0<\nu^{2}<1\) | A family of extensions exists; positivity restricts the Robin parameter |
| \(\nu=0\) | The logarithmic endpoint requires separate treatment |
| \(\nu^{2}<0\) | The extensions are unbounded below |

Thus the Breitenlohner–Freedman inequality \(m_{\rm eff}^{2}L^{2}\ge-9/4\) does not make every Robin choice stable. The usual alternate-quantization window is \(0<\nu<1\). These statements follow from the explicit extension analysis of Ishibashi and Wald. [arxiv.org](https://arxiv.org/html/hep-th/0402184v4?utm_source=chatgpt.com)

For causality, additionally require a **local boundary condition with a well-posed evolution and finite propagation**. Abstract self-adjointness alone would permit spatially nonlocal choices that need not have the intended locality. Dirichlet and appropriate local Robin conditions fall within the established propagation theory. [arxiv.org](https://arxiv.org/pdf/1812.06564?utm_source=chatgpt.com)

Full \(G\)-equivariance is another requirement. A generic mixed condition \(b=\kappa a\) introduces a coupling of scaling dimension \(2\nu\), so it generally breaks the full conformal symmetry even when the dynamics is stable. The standard and alternate endpoints are the familiar conformal choices away from exceptional cases. [arxiv.org](https://arxiv.org/html/hep-th/0402184v4?utm_source=chatgpt.com)

### Source data determine a response after past data are fixed

There is an immediate obstruction to source-only reconstruction:

> Every nonzero standard normalizable mode has \(a=0\).

Hence knowing the source on the entire boundary for all time does not determine an arbitrary bulk solution. One may add homogeneous normalizable solutions without changing it.

For a source vanishing sufficiently far in the past, impose zero past bulk data and the selected boundary condition. A well-posed problem then defines

\[
\phi=K_{\rm ret}a,
\qquad
b=\mathcal R_{\rm ret}a.
\]

The retarded support condition is

\[
\operatorname{supp}K_{\rm ret}
\subset
\{(X,y):X\in J^{+}_{\overline M}(y)\},
\]

using the causal conformal completion. The choice of past data removes the homogeneous ambiguity. This distinction between boundary prescriptions and homogeneous additions is explicit in the classical real-time analysis of Enciso and Kamran. [arxiv.org](https://arxiv.org/pdf/1203.2743?utm_source=chatgpt.com)

Here \(\mathcal R_{\rm ret}\) is a Lorentzian boundary response, or Dirichlet-to-Neumann/scattering operator. Its definition includes the selected dynamics and any local renormalization convention. This is a precise meaning of “scattering operator” available in AdS. [arxiv.org](https://arxiv.org/pdf/0911.5440?utm_source=chatgpt.com)

### The normalizable boundary trace gives a different inverse problem

Now choose standard quantization, \(\nu>0\), and global coordinates

\[
ds^{2}
=
L^{2}\sec^{2}\rho
\left(-d\tau^{2}+d\rho^{2}
+\sin^{2}\rho\,d\Omega_{2}^{2}\right).
\]

The positive-frequency modes can be written

\[
u_{n\ell m}
=
N_{n\ell}e^{-i\omega_{n\ell}\tau}
(\cos\rho)^{\Delta}
(\sin\rho)^\ell
P_n^{(\ell+1/2,\Delta-3/2)}(\cos2\rho)
Y_{\ell m},
\]

where

\[
\Delta=\Delta_+,
\qquad
\omega_{n\ell}=\Delta+\ell+2n.
\]

The physical frequency is \(\omega_{n\ell}/L\). These are the standard global normal modes used in bulk–boundary constructions. [arxiv.org](https://arxiv.org/pdf/0708.1283?utm_source=chatgpt.com)

For solutions with sufficiently rapidly decreasing mode coefficients, take the weighted trace

\[
B\phi
=
\lim_{\rho\to\pi/2}
(\cos\rho)^{-\Delta}\phi.
\]

The boundary multiplier of each radial mode is

\[
c_{n\ell}
=
N_{n\ell}(-1)^n
\frac{\Gamma(n+\Delta-\tfrac12)}
{n!\,\Gamma(\Delta-\tfrac12)}
\ne0.
\]

This gives an elementary reconstruction proof:

1. Decompose the full-time boundary trace into spherical harmonics and the allowed frequencies.
2. Divide each coefficient by \(c_{n\ell}\).
3. Insert those coefficients into the bulk mode expansion.

Therefore \(B\) is injective on this solution class and invertible onto its image. **Its image is a restricted spectral space**, with frequencies \(\pm(\Delta+\ell+2n)\), the required coefficient decay, and the reality relation. Arbitrary boundary functions do not belong to it.

If the \(u_{n\ell m}\) are Klein–Gordon normalized, the positive-frequency boundary norm is

\[
\|b^{+}\|_{\partial}^{2}
=
\sum_{n,\ell,m}
\left|\frac{b^{+}_{n\ell m}}{c_{n\ell}}\right|^{2}.
\]

The trace is unitary with this induced norm. That establishes positivity on the complex positive-frequency sector; it does not derive a Hilbert norm from projective geometry. Nor does it establish stability in an independently chosen local boundary norm.

This calculation also shows why covering data matter: for generic \(\Delta\), positive-frequency modes acquire a nontrivial phase under \(\tau\mapsto\tau+2\pi\).

HKLL reconstruction belongs to this normalizable-trace problem. Its smearing kernel may use boundary points spacelike separated from the bulk point. That is compatible with causality because the kernel is an operator representation; locality is tested by the reconstructed commutator. HKLL also makes explicit that kernels can differ by terms annihilating the allowed boundary spectral range. [arxiv.org](https://arxiv.org/pdf/hep-th/0606141?utm_source=chatgpt.com)

## 5. What must preserve causality and positivity

The symplectic form \(\Omega\) and the indefinite Hermitian form \(h\) do not themselves give the physical Hilbert-space positivity condition.

There is a simple logical reason. Changing the overall sign of a covariant two-point expression preserves its homogeneity, incidence singularities, and symmetry, while reversing its positive-type inequality. Geometry alone cannot select that sign.

Likewise, a singular algebraic expression does not specify its Lorentzian boundary value. Retarded, advanced, Feynman, and differently ordered Wightman prescriptions carry distinct information.

This is visible in current twistor research. The 2026 work of Ansari, Jain, and Dhruva states explicitly that its real half-Fourier twistor expressions are obtained after removing spectral theta functions and analytically continuing to spacelike momenta. Those expressions encode valuable correlator information, but the spectral restrictions must be restored to recover physical Wightman distributions. [arxiv.org](https://arxiv.org/pdf/2512.04172?utm_source=chatgpt.com)

### Positivity transports through a valid reconstruction map

Suppose \(K\) is a reconstruction operator and its transpose acts appropriately on bulk test functions. Given a positive boundary or twistor covariance \(W_{\rm tw}\), define

\[
W_{\rm bulk}(f,g)
=
W_{\rm tw}(K^{*}f,K^{*}g).
\]

Whenever these operations are distributionally well defined,

\[
W_{\rm bulk}(f,f)\ge0.
\]

That is a direct proof of transported positivity.

**Locality requires a separate identity.** With \(E_{\rm bulk}\) the causal commutator distribution for the intended boundary condition, one must establish

\[
W_{\rm bulk}-W_{\rm bulk}^{\rm op}
=
iE_{\rm bulk}.
\]

Equivalently, the reconstruction must preserve the physical symplectic or CCR structure. A positive covariance with the wrong antisymmetric part does not reconstruct the intended local field theory.

For the usual vacuum theory, the remaining requirements include:

- The correct adjoint and reality operation.
- Positive energy with respect to lifted global AdS time.
- The field equation and chosen boundary condition in each argument.
- Hadamard short-distance behavior and the appropriate boundary wavefront conditions.
- Well-defined compositions of distributions, including singular incidence integrals.

The holographic Hadamard framework supplies a rigorous treatment of these microlocal conditions and their behavior under boundary restriction. It also permits different physical states; the singularity condition does not uniquely fix a state. [arxiv.org](https://arxiv.org/pdf/1612.01203?utm_source=chatgpt.com)

For a Gaussian theory, a valid positive two-point function with the correct commutator determines the higher correlators. An interacting theory requires the corresponding higher-point consistency and positivity conditions as well.

A retarded response kernel is a different object: it is not required to be a positive-type covariance. In a free theory, distinct states can share the same retarded response. Its physical positivity content comes from the underlying positive theory and spectral structure.

## 6. Local and nonlinear reconstruction need further hypotheses

### Restricted boundary observations

If only a boundary region \(O\) is available, there are three separate questions:

1. **Existence:** Is the proposed datum in the trace range?
2. **Uniqueness:** Does vanishing trace on \(O\) force the solution to vanish in the desired bulk region?
3. **Stability:** Is there an estimate controlling the bulk solution by the observed data?

A typical stability requirement would take the form

\[
\|\phi\|_{\mathcal H(D)}
\le C\,\|B\phi|_O\|_{\mathcal B(O)},
\]

for explicitly chosen norms. Uniqueness alone does not supply this estimate.

Holzegel–Shao prove boundary unique-continuation results under geometric hypotheses and observation intervals related to null-geodesic refocusing. [arxiv.org](https://arxiv.org/abs/1508.03820?utm_source=chatgpt.com) Dybalski–Wrochna use suitable unique-continuation properties to obtain inclusions of bulk observable algebras into boundary algebras. Their result is a rigorous algebraic reconstruction mechanism, rather than an unrestricted pointwise smearing formula. [arxiv.org](https://arxiv.org/pdf/1809.05123?utm_source=chatgpt.com)

Trapping can obstruct stable recovery: modes with extremely small boundary imprint can require an unbounded inverse. This issue occurs in analyses of AdS black-hole smearing functions. [arxiv.org](https://arxiv.org/abs/1304.6821?utm_source=chatgpt.com)

For an asymptotically AdS replacement, one should also impose the intended **boundary causality** condition: bulk causal propagation must not connect boundary points that are spacelike according to the boundary geometry.

### Reconstructing the geometry itself

If the bulk metric or operator is unknown, reconstruction from a boundary response map is a further inverse problem. Projective incidence alone does not determine the bulk radius, couplings, or dynamics.

There are substantial nonlinear results with stronger data. For vacuum asymptotically AdS Einstein metrics, Holzegel–Shao show that the boundary metric \(g^{(0)}\) together with the undetermined Fefferman–Graham coefficient \(g^{(n)}\) determines the metric near suitable boundary domains satisfying generalized null convexity. In four bulk dimensions the second datum is \(g^{(3)}\), related to the boundary stress tensor. This is a uniqueness result with dynamical data and geometric hypotheses, not reconstruction from the boundary conformal-incidence space alone. [arxiv.org](https://arxiv.org/abs/2207.14217?utm_source=chatgpt.com)

## 7. The precise bridge theorem to ask for

The preceding results suggest the following **conditional sufficient formulation**. This is a synthesis of the requirements, not an assertion that every proposed real twistor transform already satisfies them.

Fix:

- A causal bulk domain or the universal cover of AdS.
- A specified field operator, local boundary condition, and gauge quotient.
- A solution space \(\mathscr S_{\rm bulk}\) with its physical symplectic structure.
- A weighted boundary trace
  \[
  B:\mathscr S_{\rm bulk}\longrightarrow\mathscr B.
  \]
- A twistor-data space \(\mathscr D_{\rm tw}\), including homogeneity, real structure, contours, supports, wavefront restrictions, and covering information.
- An incidence transform
  \[
  T:\mathscr D_{\rm tw}\longrightarrow\mathscr B.
  \]

A classical reconstruction exists for the supplied twistor data if

\[
B\text{ is injective},
\qquad
\operatorname{im}T\subseteq\operatorname{im}B,
\qquad
K=B^{-1}T
\]

is well defined. Stable reconstruction additionally requires continuity in the stated data and solution topologies.

A **complete bridge for the claimed sector** requires equality of the ranges and a topological isomorphism

\[
\boxed{
\mathscr D_{\rm tw}/\ker T
\ \cong\
\operatorname{im}B
\ \cong\
\mathscr S_{\rm bulk}.
}
\]

For a positive local quantum bridge, this isomorphism must also preserve:

\[
\boxed{
\text{adjoint/reality}
\quad+\quad
\text{symplectic or CCR structure}
\quad+\quad
\text{the chosen spectral structure}
\quad+\quad
\text{appropriate wavefront conditions}.
}
\]

These are independently testable requirements. Range equality establishes completeness; the symplectic identity establishes the correct commutator; positive-frequency or positive-covariance compatibility establishes positivity; support and wavefront control establish the intended causal and local interpretation.

A particularly useful first target is the conformally coupled scalar, \(m_{\rm eff}^{2}L^{2}=-2\), with its \(\Delta=1\) and \(\Delta=2\) quantizations. The explicit scalar mode inverse provides a benchmark against which a real twistor construction can be checked. Maxwell and linearized gravitational field strengths then add helicity reality and gauge constraints. Proving these identifications would turn the shared twistor language into a physically faithful bridge in specified sectors, with a clear statement of what survives beyond kinematics.

