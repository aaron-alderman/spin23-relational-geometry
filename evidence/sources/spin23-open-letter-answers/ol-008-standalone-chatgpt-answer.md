**A qualified yes: a finite internal spectral triple can supply a covariant action when the `Spin(2,3)` carrier is realized as four-dimensional spin or Cartan geometry. The real-structure and first-order conditions do not prohibit that product construction. They do, however, rule out several natural-looking identifications of the carrier with the internal algebra.**

The distinction is between three claims:

| Claim | Assessment |
|---|---|
| Couple a finite internal geometry to a spacetime geometry described using an AdS Cartan connection | A viable construction route, with substantial established machinery |
| Identify noncompact `Sp(4,R)` with the internal unitary gauge group of a conventional finite spectral triple | Excluded under the usual positive-definite finite-Hilbert-space assumptions |
| Derive spacetime, the Standard Model, its vacuum, and observables from the carrier’s representation theory alone | Not established by specifying the carrier group |

The missing information for a verdict on the *particular* proposed coupling is its represented algebra, module, operator, real structure, and grading:
\[
(\mathcal A,\mathcal H,D,J,\gamma).
\]
Nevertheless, one can state a constructive route and precise tests that would either validate it or produce a useful obstruction.

## 1. What the spacetime carrier must supply

For this purpose, \(\mathrm{Spin}(2,3)\) and \(\mathrm{Sp}(4,\mathbb R)\) describe the same connected AdS spin symmetry. The relevant geometric step is to obtain a four-dimensional soldering form and Lorentz connection from it.

A concrete construction starts with an \(\mathfrak{so}(2,3)\)-connection \(\mathcal A\) and a compensator \(V^A\). Choose conventions
\[
\eta_{AB}=\operatorname{diag}(-,+,+,+,-),
\qquad V_AV^A=-\ell^2,
\]
and define
\[
E^A=D_{\mathcal A}V^A.
\]
Because \(V\cdot E=0\), the \(E^A\) take values in a four-dimensional subspace with Lorentzian signature. **If \(E\) has rank four**, then
\[
g_{\mu\nu}=\eta_{AB}E^A_\mu E^B_\nu
\]
is a nondegenerate spacetime metric with signature \((-+++)\).

In an adapted gauge, the connection decomposes into a Lorentz connection and coframe. With consistent generator conventions,
\[
\mathcal F^{ab}
=
R^{ab}[\omega]+\ell^{-2}e^a\wedge e^b,
\qquad
\mathcal F^a{}_4=\ell^{-1}T^a.
\]
This is the Cartan-geometric interpretation of the AdS carrier: the connection contains both parallel transport and the soldering of internal tangent directions to spacetime. Choosing an AdS *model geometry* does not require the physical Cartan connection to be flat. [arxiv.org](https://arxiv.org/pdf/gr-qc/0611154?utm_source=chatgpt.com)

Two consequences matter immediately.

First, the ambient \((2,3)\) signature does not automatically give a physical spacetime with two times. The compensator and nondegenerate soldering form select the four-dimensional Lorentzian tangent geometry. Conversely, the group name alone does not establish that this selection occurs.

Second, this construction must be **derived from, or explicitly added to, the proposed carrier**. If one supplies a conventional spacetime and coframe independently, one has constructed a coupling to the carrier; one has not yet shown that the carrier generates spacetime.

### Chirality needs a compatible geometric reduction

On the irreducible four-complex-dimensional AdS spinor representation, Schur’s lemma excludes a nontrivial fixed grading commuting with the entire group. This is a statement about that finite-dimensional representation. Four-dimensional AdS spacetime can still support chiral spinor bundles.

The compensator suggests a covariant chirality operator. For
\[
\{\Gamma_A,\Gamma_B\}=2\eta_{AB},
\]
set
\[
\Gamma_V=i\,\frac{V^A\Gamma_A}{\ell},
\qquad \Gamma_V^2=1.
\]
It transforms with \(V\), and in an adapted gauge agrees with four-dimensional chirality up to conventions.

However,
\[
\nabla^{\mathcal A}\Gamma_V
=
\frac{i}{\ell}E^A\Gamma_A
\]
is generally nonzero. Merely inserting \(\Gamma_V\) into a Dirac operator built from the full AdS connection does not prove the required oddness relation.

One possible repair is the reduced connection
\[
\omega_V{}^A{}_B
=
\mathcal A^A{}_B+
\ell^{-2}(E^AV_B-V^AE_B),
\]
for which direct substitution gives \(D_{\omega_V}V=0\). It preserves the induced chirality. This supplies a concrete construction to test, although a \(V\)-dependent family of geometries is different from an action of the whole AdS group preserving the grading of one fixed spectral triple.

There is also a practical fermionic issue: contracting the translational part of the AdS connection in a Dirac operator produces an algebraic term of order \(1/\ell\). In an explicit \(SO(2,3)\)-covariant construction, Gočanin and Radovanović obtain a \(2/\ell\) mass contribution and construct additional invariant terms that cancel it, leaving the desired Dirac mass. Their result establishes a useful covariant-action precedent; their Moyal-deformed framework is not itself a proof of a Connes spectral-triple coupling. [Springer Nature Link](https://link.springer.com/article/10.1140/epjc/s10052-018-5669-4?utm_source=chatgpt.com)

## 2. RP-1 — derive the action and the fermion operator

### Start with an actual internal/spacetime product

The conventional Euclidean benchmark is
\[
\begin{aligned}
\mathcal A&=C^\infty(M_E)\otimes\mathcal A_F,\\
\mathcal H&=L^2(M_E,S)\otimes\mathcal H_F,\\
D_E&=\not D_{M_E}\otimes1+\gamma_5\otimes D_F,\\
\gamma&=\gamma_5\otimes\gamma_F.
\end{aligned}
\]

Here \(D_F\) is essential dynamical data: its permitted blocks encode Yukawa and possible Majorana couplings. A list of representations supplies neither those blocks nor their values.

For the familiar Euclidean four-dimensional spacetime and finite KO-dimension-six choice,
\[
J=J_M\otimes J_F,
\qquad \mathrm{KO}(M_E\times F)=2\pmod8,
\]
with total signs
\[
J^2=-1,\qquad JD_E=D_EJ,\qquad J\gamma=-\gamma J.
\]
These signs make the bilinear \(\langle J\Psi,D_E\Psi'\rangle\) antisymmetric on the positive total-chirality subspace. The fermionic action is consequently
\[
S_{F,E}
=
\frac12\langle J\Psi,D_{E,\mathbb A}\Psi\rangle,
\qquad
\Psi\in\mathcal H^+\ \text{Grassmann}.
\]
Its Grassmann integral has the Pfaffian structure needed for the Euclidean fermionic formulation. One should not additionally impose \(J\Psi=\Psi\) in this convention, since \(J^2=-1\). [arxiv.org](https://arxiv.org/pdf/hep-th/0608226?utm_source=chatgpt.com)

For an ordinary real triple satisfying first order, take self-adjoint represented one-forms
\[
\mathbb A=\sum_i\rho(a_i)[D_E,\rho(b_i)]
\]
and fluctuate
\[
D_{E,\mathbb A}
=
D_E+\mathbb A+J\mathbb A J^{-1}.
\]

Locally, the resulting operator has the form
\[
\boxed{
D_{E,\mathbb A}
=
-i\gamma^\mu
\bigl(\nabla^S_\mu\otimes1+1\otimes B_\mu\bigr)
+\gamma_5\otimes\Phi(x)
}
\]
in a standard Hermitian Euclidean gamma-matrix convention. Here \(B_\mu\) is the internal gauge connection and \(\Phi\) is the finite operator after scalar fluctuations.

That is the central RP-1 object. It specifies propagation, gauge couplings, scalar couplings, and the fermionic mass structure in a common operator.

A carrier Casimir is not an adequate substitute. On an irreducible carrier it is scalar; as a spacetime quadratic Casimir it is generally a second-order operator. A local fermionic operator instead needs a Clifford principal symbol and the corresponding first-order propagation. A catalogue of Casimir or oscillator eigenvalues does not establish these properties.

### The bosonic action is an additional principle with computable consequences

For a suitable elliptic Euclidean operator, the spectral-action prescription can be written
\[
S_{B,E}
=
\operatorname{Tr}F\!\left(
\frac{D_{E,\mathbb A}^{\,2}}{\Lambda^2}
\right),
\]
where \(F\) is a suitable cutoff function and \(\Lambda\) is a mass scale.

This is an **action principle added to the spectral data**. It does not follow from the group representation alone. Its virtue is that, once those data and the prescription are fixed, many terms and coefficient relations follow from one calculation. The original spectral-action construction yields Einstein gravity, gauge and Higgs terms, and additional gravitational curvature terms. [arxiv.org](https://arxiv.org/abs/hep-th/9606001?utm_source=chatgpt.com)

On a compact four-dimensional Euclidean manifold without boundary,
\[
S_{B,E}
\sim
c_4\Lambda^4a_0
+c_2\Lambda^2a_2
+c_0a_4+\cdots,
\]
where \(a_k=a_k(D_{E,\mathbb A}^2)\) are heat-kernel coefficients. With this \(F(D^2/\Lambda^2)\) convention,
\[
c_4=\int_0^\infty uF(u)\,du,\qquad
c_2=\int_0^\infty F(u)\,du,\qquad
c_0=F(0).
\]
The coefficients generate local curvature, gauge, scalar-kinetic, and scalar-potential invariants. Boundaries require additional coefficients and specified boundary conditions. [arxiv.org](https://arxiv.org/abs/hep-th/0306138?utm_source=chatgpt.com)

After a justified Lorentzian reconstruction, a useful form of the resulting low-energy bosonic action is
\[
\begin{aligned}
S_{B,L}=\int d^4x\,\sqrt{-g}\Big[
&\frac12\mathcal M^2(\phi)R-U(\phi)
-\frac14 k_{ab}F^a_{\mu\nu}F^{b\,\mu\nu}\\
&-\frac12G_{ij}(\phi)D_\mu\phi^iD^\mu\phi^j
+\mathcal L_{\mathrm{curvature}^2}
+\cdots
\Big].
\end{aligned}
\]
The functions and coefficients must be calculated from the specified triple. In particular, the nonminimal scalar-curvature term belongs inside \(\mathcal M^2(\phi)\); it affects both vacuum selection and fluctuations.

For the carrier programme, RP-1 must determine whether the physical gauge and scalar kinetic forms are positive and whether the effective gravitational coefficient has the required sign.

### A Cartan action and a spectral action must be matched explicitly

The MacDowell–Mansouri construction provides a particularly relevant comparison:
\[
S_{\rm MM}\propto
\int
\epsilon_{ABCDE}\frac{V^E}{\ell}\,
\mathcal F^{AB}\wedge\mathcal F^{CD}.
\]
After reduction, this produces an Einstein–Hilbert/Palatini term, a cosmological term, and an Euler term. Thus the AdS carrier does admit an established route to a gravitational action. [Phys. Rev. Lett.](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.38.739?utm_source=chatgpt.com)

But one must demonstrate how that action relates to the spectral trace. A generic spectral expansion has additional curvature terms, including a Weyl-squared contribution. Writing down both constructions does not establish their equivalence.

Likewise, a Levi-Civita Dirac operator and an operator with an independently varied spin connection define different variational problems. Spectral actions with torsion have been studied, but the torsion content and resulting equations depend on the chosen operator. [arxiv.org](https://arxiv.org/abs/1101.1424?utm_source=chatgpt.com)

### Signature cannot be handled by a formal substitution

The conventional trace and heat-kernel argument use ellipticity. A Lorentzian Dirac square is hyperbolic, so replacing \(D_E\) by \(D_L\) in the same formula requires a new analytic justification.

There are two defensible routes.

- **Euclidean construction followed by controlled continuation.** Continue the tetrad, fermionic bilinear, and physical field identifications consistently. D’Andrea, Kurkov, and Lizzi show why removal of the remaining redundant fermionic variables must be coordinated with Wick rotation to recover Lorentz covariance. A Euclidean chiral projection alone does not finish the physical reconstruction. [arxiv.org](https://arxiv.org/abs/1605.03231?utm_source=chatgpt.com)
- **An intrinsically Lorentzian construction.** Use the appropriate indefinite spinor pairing and operator adjoint. A linear fundamental symmetry \(K\), defining a Krein adjoint such as \(D^\times=KD^\dagger K\), is distinct from the antilinear real structure \(J\). Lorentzian almost-commutative fermionic constructions explicitly recovering Standard Model Lagrangians exist. [arxiv.org](https://arxiv.org/abs/1505.01939?utm_source=chatgpt.com)

There are also Lorentzian bosonic spectral-action constructions using complex powers and spectral densities, including the work of Dang and Wrochna. Their analytic hypotheses matter; they cannot simply be transferred to an arbitrary AdS/internal product. [arxiv.org](https://arxiv.org/abs/2012.00712?utm_source=chatgpt.com)

For actual noncompact AdS, RP-1 must therefore specify the operator domain and an appropriate trace, relative-trace, or local-density prescription.

### Correct gauge content comes from the whole finite geometry

The familiar benchmark
\[
\mathcal A_F=\mathbb C\oplus\mathbb H\oplus M_3(\mathbb C)
\]
produces Standard Model gauge and Higgs content **with the appropriate bimodule, grading, real structure, Dirac operator, and unimodularity/gauge-lift prescription**. The algebra alone does not specify the physical hypercharges, family multiplicities, or numerical Yukawa matrices. [math.fsu.edu](https://www.math.fsu.edu/~marcolli/SMpaper.pdf?utm_source=chatgpt.com)

For a new carrier coupling, calculate the actual lifted group
\[
G_F=
\left\{
\rho_F(u)J_F\rho_F(u)J_F^{-1}:u\in U(\mathcal A_F)
\right\},
\]
including its kernel and any imposed restriction. Then check the charges and anomalies of the **physical chiral spectrum**. Anomaly cancellation must not be inferred merely by counting all particle/antiparticle bookkeeping copies in the enlarged spectral Hilbert space. The known relationship between unimodularity and anomaly cancellation was established for specified Standard Model data, not arbitrary finite geometries. [arxiv.org](https://arxiv.org/abs/hep-th/9506115?utm_source=chatgpt.com)

## 3. Where reality and first order can actually rule out the coupling

The relevant conditions are concrete matrix identities. Write
\[
\rho_F^o(b)=J_F\rho_F(b^*)J_F^{-1}.
\]
Then require
\[
[\rho_F(a),\rho_F^o(b)]=0
\]
and
\[
[[D_F,\rho_F(a)],\rho_F^o(b)]=0.
\]
These are the order-zero and first-order conditions, respectively. They accompany self-adjointness, grading conditions, and the chosen signs in
\[
J_F^2=\epsilon,\qquad
J_FD_F=\epsilon'D_FJ_F,\qquad
J_F\gamma_F=\epsilon''\gamma_FJ_F.
\]

Four tests are particularly important here.

### A. The noncompact group cannot be the conventional finite internal unitary group

A finite-dimensional real \(C^*\)-algebra has the form
\[
\mathcal A_F\simeq
\bigoplus_r M_{n_r}(\mathbb K_r),
\qquad
\mathbb K_r\in\{\mathbb R,\mathbb C,\mathbb H\}.
\]
Its unitary factors are \(O(n)\), \(U(n)\), and compact \(Sp(n)\). Their lifted images and closed subgroup restrictions remain compact. Consequently, noncompact \(\mathrm{Sp}(4,\mathbb R)\) cannot arise as the internal unitary gauge group under these assumptions. [arxiv.org](https://arxiv.org/html/0902.2068v2?utm_source=chatgpt.com)

In particular,
\[
U(M_2(\mathbb H))=Sp(2)\simeq USp(4)
\]
is the compact symplectic group, not split \(Sp(4,\mathbb R)\). The word “symplectic” does not identify these constructions.

This obstruction leaves the spacetime/Cartan interpretation available. An indefinite or more general internal framework would change the assumptions and require its own action and positivity analysis.

### B. The minimal irreducible carrier can fail before first order

Suppose the proposal takes
\[
\mathcal A_F=M_4(\mathbb C),
\qquad
\mathcal H_F=\mathbb C^4
\]
with the defining irreducible action.

Its commutant is
\[
\rho_F(\mathcal A_F)'=\mathbb C\,1.
\]
Order zero would require the faithful opposite matrix algebra \(J_F\rho_F(\mathcal A_F)J_F^{-1}\) to lie inside this scalar commutant. That is impossible.

This is a direct obstruction to that particular ansatz. It does not apply to every enlargement of the module.

For example, left multiplication on \(M_4(\mathbb C)\), together with \(Jx=x^*\), produces a commuting right action. That repairs order zero, but changes the module and leaves chirality, field content, and dynamics to be established.

The carrier’s invariant symplectic bilinear form does not by itself supply a spectral real structure. One still needs an antilinear operator with the correct adjoint, square, commutation signs, and opposite-algebra action.

### C. Acting internally on the spacetime spinor indices can violate bounded commutators

For a matrix \(a\) acting on spacetime spinor indices,
\[
[\not D_M,a]
=
-i[\gamma^\mu,a]\partial_\mu
+\text{terms of order zero}.
\]
Unless the derivative term vanishes, this is generally unbounded. Thus a proposed internal algebra cannot freely reuse the Clifford matrices while retaining an ordinary almost-commutative spectral triple.

This is one mathematical reason the separate internal tensor factor matters. Twisted spectral triples offer specific ways to modify the commutator condition; the grand-symmetry literature uses such a modification to address precisely this type of problem. It is a change of framework requiring a fresh covariance calculation. [arxiv.org](https://arxiv.org/abs/1411.1320?utm_source=chatgpt.com)

### D. First order filters the proposed Yukawa and mixing blocks

For matrix-summand bimodules, write
\[
\mathcal H_F=\bigoplus_{i,j}\mathcal H_{ij}.
\]
Testing first order with central projections gives the necessary selection rule
\[
(D_F)_{ij,kl}\ne0
\quad\Longrightarrow\quad
i=k\ \text{or}\ j=l.
\]
Testing the noncentral matrix generators imposes further intertwining conditions. This is the content encoded by the horizontal and vertical edges of Krajewski diagrams. [arxiv.org](https://arxiv.org/pdf/hep-th/9701081?utm_source=chatgpt.com)

A proposed coupling that needs a forbidden block therefore fails within the chosen ordinary triple. Conversely, first order does not generically eliminate all useful couplings.

Indeed, for the separated product, with \(a=f\otimes a_F\) and \(b=g\otimes b_F\), the double commutator reduces to terms proportional to
\[
[a_F,b_F^o]
\quad\text{and}\quad
[[D_F,a_F],b_F^o].
\]
Both vanish when the finite order-zero and first-order conditions hold. **This is the direct reason there is no blanket first-order obstruction to the product route.**

There are two cautions about proposed repairs. In the minimal Standard Model construction, the Majorana block commutes with \(\mathcal A_F\), so it does not generate an ordinary scalar inner fluctuation. A new scalar multiplying that block needs a specified extension. [math.fsu.edu](https://www.math.fsu.edu/~marcolli/SMpaper.pdf?utm_source=chatgpt.com) And dropping first order changes the fluctuation prescription: the established generalization adds a quadratic term to maintain the relevant covariance. Keeping the ordinary linear formula after abandoning its hypotheses is insufficient. [arxiv.org](https://arxiv.org/abs/1304.7583?utm_source=chatgpt.com)

## 4. RP-2 — demonstrate a vacuum of the derived action

RP-2 must solve the field equations of the same action obtained in RP-1. A subgroup decomposition or a chosen value of the compensator does not establish a vacuum.

At minimum, the calculation should determine:

- Whether the soldering form remains nondegenerate.
- Which scalar configurations are allowed by the finite differential calculus.
- The unbroken internal gauge group.
- The spacetime curvature and effective gravitational coefficient.
- The torsion equation, if the spin connection is independent.
- The boundary conditions defining the variational problem.

One must vary the scalar fields actually generated by the construction, rather than minimize over arbitrary matrices in \(\operatorname{End}\mathcal H_F\).

A simple calculation makes the curvature issue explicit. Retain the two-derivative terms
\[
S=\int\sqrt{-g}\left[
\frac12\mathcal M^2(\phi)R-U(\phi)
-\frac12G_{ij}\partial_\mu\phi^i\partial^\mu\phi^j
\right].
\]
For constant scalars and vanishing gauge field strengths, the equations are
\[
\partial_iU-\frac12R\,\partial_i\mathcal M^2=0,
\]
\[
\mathcal M^2G_{\mu\nu}+U\,g_{\mu\nu}=0.
\]
For a four-dimensional Einstein background,
\[
R_{\mu\nu}
=
\frac{U(\phi_0)}{\mathcal M^2(\phi_0)}\,g_{\mu\nu}.
\]

Therefore an AdS vacuum of radius \(\ell\), in this approximation, requires
\[
\boxed{
U(\phi_0)
=
-\frac{3\,\mathcal M^2(\phi_0)}{\ell^2}
}
\]
together with the scalar stationarity equations and \(\mathcal M^2(\phi_0)>0\).

This is an actual test of the model. The negative vacuum energy must follow from the computed coefficients, scalar vacuum contribution, and stated renormalization conditions. Naming the carrier \(Spin(2,3)\) does not supply that result.

Higher-curvature terms can modify the equations, and quantum vacuum selection requires an effective-action calculation. The displayed equations are a useful first check with a clearly stated approximation.

A fixed-norm compensator also needs careful interpretation. Imposing \(V^2=-\ell^2\) is a geometric constraint. If the programme claims dynamically selected symmetry breaking, it must identify the field variations and potential responsible for that selection.

## 5. RP-3 — calculate the physical fluctuation spectrum

Once a stationary background \(q_0\) is known, calculate the quadratic operator
\[
\mathcal K_{IJ}
=
\left.
\frac{\delta^2S_{\rm gauge\ fixed}}
{\delta q_I\,\delta q_J}
\right|_{q_0}.
\]
Its physical content emerges after gauge fixing, constraints, mixing, and canonical normalization are handled.

The required outputs are parallel but distinct:

| Sector | Required calculation |
|---|---|
| Fermions | Kinetic normalization, chiral content, Yukawa/Majorana mass matrix, and propagator |
| Gauge fields | Unbroken generators, vector masses, kinetic signs, and scalar-vector mixing |
| Scalars | Physical Hessian including curvature couplings and mixing with gravitational modes |
| Gravity and torsion | Propagating degrees of freedom, constraints, kinetic signs, and any additional poles |

The scalar Hessian of \(U\) alone can be misleading because \(\mathcal M^2(\phi)R\) contributes to the coupled fluctuation problem. Likewise, internal Dirac eigenvalues become physical masses only after the relevant normalization and mixing are accounted for.

For an AdS vacuum, negative scalar mass-squared is not automatically an instability. A canonically normalized scalar in AdS\(_4\) must satisfy the Breitenlohner–Freedman condition
\[
m_{\rm eff}^2\ell^2\ge-\frac94,
\]
with compatible boundary conditions. AdS has a timelike conformal boundary, and admissible boundary conditions are part of the dynamical specification; they can affect the spectrum and positivity. [arxiv.org](https://arxiv.org/html/hep-th/0402184v4?utm_source=chatgpt.com)

The gravitational curvature terms also need explicit attention. A finite higher-derivative truncation can introduce additional propagator poles. Their residues and locations must be computed around the actual stationary background. A flat-background calculation can be physically inappropriate when that background fails the cosmological field equation. These issues are discussed directly in analyses of spectral-action higher-derivative gravity. [Springer Nature Link](https://link.springer.com/article/10.1140/epjc/s10052-020-7805-1?utm_source=chatgpt.com)

There are two different standards of interpretation here:

- As an **effective field theory**, the calculation is organized below its validity scale; poles inferred outside that regime cannot automatically be counted as predicted particles.
- As an **exact ultraviolet theory**, the full kinetic kernels, analytic prescription, and physical state space require a unitarity analysis.

The carrier’s representation labels can organize the modes after this calculation. They do not determine kinetic signs, residues, or stability.

## 6. The route to observables must include renormalization

A defensible predictive chain is
\[
(\mathcal A_F,\mathcal H_F,D_F,J_F,\gamma_F,F,\Lambda)
\longrightarrow
c_i(\Lambda)
\longrightarrow
\text{running and threshold matching}
\longrightarrow
\mathcal O_{\rm physical}.
\]

The first arrow is the spectral calculation. The remaining arrows require quantum field theory.

This distinction has explicit support within the spectral-action literature. Van Suijlekom shows that, although appropriate almost-commutative actions satisfy renormalizability conditions, different sectors generally acquire different counterterm coefficients. The common spectral coefficient relations are consequently not preserved as universal identities under renormalization. The action can instead specify a starting point for the renormalization-group flow. [arxiv.org](https://arxiv.org/html/1112.4690v1?utm_source=chatgpt.com)

For the proposed programme, the calculation should proceed as follows.

1. **Match at a stated scale.** Extract canonically normalized gauge, Yukawa, scalar, gravitational, and higher-dimensional couplings. Distinguish free spectral inputs from relations imposed by the construction.

2. **Run the actual field content.** Include every scalar, fermion, and gauge state produced by RP-3. Integrate out heavy states at their thresholds. Include curvature and vacuum-energy couplings when they matter for the background.

3. **Compute physical quantities.** Convert running parameters to pole masses, mixing parameters, amplitudes, or the observables appropriate to the chosen spacetime. Global AdS requires its own observable prescription or a justified regime approximating flat-space physics.

4. **State what is predicted.** Count the independently adjustable parameters. A quantity fitted through \(D_F\) or a cutoff moment is an input unless an additional mechanism fixes it.

For example, the familiar spectral Standard Model relation
\[
g_3^2(\Lambda)=g_2^2(\Lambda)
=\frac53g_Y^2(\Lambda)
\]
uses conventional hypercharge normalization and is a high-scale matching relation. Its phenomenological success depends on the running, particle thresholds, and matching assumptions; it is not a low-energy identity supplied by the algebra. [arxiv.org](https://arxiv.org/html/1208.1030v2?utm_source=chatgpt.com)

Positive renormalization results for spectral Yang–Mills theory on a flat four-dimensional background are substantial, but their scope does not establish a unitary quantum theory of the entire gravity–fermion–gauge system. [arxiv.org](https://arxiv.org/abs/1101.4804?utm_source=chatgpt.com) An effective-field-theory treatment of gravity gives a controlled route to low-energy calculations without requiring that stronger claim first. [arxiv.org](https://arxiv.org/abs/gr-qc/9405057?utm_source=chatgpt.com)

## What would decisively advance the programme

The next deliverable should be **one explicit coupling**, narrow enough to check completely:

- The represented carrier and internal algebra, with explicit \(J\) and grading.
- A nondegenerate spacetime realization and a local fermionic operator.
- Verification of order zero, first order, reality, and grading for that operator.
- The fluctuated bosonic and fermionic actions, including their signature prescription and allowed variations.
- A stationary vacuum and its physical quadratic operators.
- Matching conditions identifying the parameters that will be run to observables.

That work could produce either a consistent model or a precise obstruction—for example, an impossible opposite-algebra action, an unbounded commutator, or a required Yukawa block forbidden by first order. Each outcome would be stronger than another branching table. The decisive mathematical object is the **fully specified fluctuated Dirac operator**, and the decisive physical tests are the vacuum equations and the propagators derived from its action.

