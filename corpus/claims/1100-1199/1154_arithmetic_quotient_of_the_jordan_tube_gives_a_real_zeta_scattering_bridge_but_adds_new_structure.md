# An Arithmetic Quotient of the Jordan Tube Gives a Real Zeta–Scattering Bridge but Adds New Structure

**Date:** 19 October 2026  
**Branches:** \(H_2(\mathbb R)\), Siegel space, \(Sp(4)\), automorphic spectrum, Eisenstein scattering, Riemann zeta, matrix-Herglotz response  
**Claim status:** established mathematical bridge; physical identification and probe selection remain open

## Executive result

The previous document stopped one step too early. There is an established mathematical route from the exact Jordan carrier used in this programme to zeta-valued scattering:

\[
\boxed{
\begin{aligned}
H_2(\mathbb R)_+
&\longrightarrow
\mathfrak H_2
=H_2(\mathbb R)+iH_2(\mathbb R)_+\\
&\longrightarrow
Sp(4,\mathbb Z)\backslash\mathfrak H_2\\
&\longrightarrow
\text{self-adjoint automorphic Laplacian}\\
&\longrightarrow
\text{Eisenstein scattering/intertwining operators}\\
&\longrightarrow
\text{completed zeta factors}.
\end{aligned}}
\]

Moreover, if \(\Delta_\Gamma\) is the self-adjoint Laplacian on the arithmetic quotient and \(B\) is a two-probe observation map, then

\[
R_B(z)=B(\Delta_\Gamma-zI)^{-1}B^*
\]

is a matrix-valued Herglotz response:

\[
\operatorname{Im}R_B(z)\succeq0
\qquad(\operatorname{Im}z>0).
\]

This is the first precise common structure joining:

- the \(H_2(\mathbb R)\) Jordan cone;
- \(Sp(4,\mathbb R)\cong Spin_0(2,3)\);
- a natural self-adjoint operator;
- causal/passive resolvent response;
- arithmetic zeta factors.

The decisive qualification is equally sharp:

\[
\boxed{
\text{zeta enters after imposing the arithmetic lattice }Sp(4,\mathbb Z).
}
\]

Neither Jordan positivity nor continuous \(Spin_0(2,3)\) symmetry selects that lattice. Arithmetic is new structure.

## 1. The Jordan cone is exactly the base of the genus-two Siegel tube

Let

\[
V=H_2(\mathbb R)
\]

with Jordan product

\[
X\circ Y=\frac12(XY+YX)
\]

and positive cone

\[
\Omega=H_2(\mathbb R)_+.
\]

Its tube domain is

\[
T_\Omega
=
V+i\Omega
=
\left\{
Z=X+iY:
X,Y\in H_2(\mathbb R),\;
Y>0
\right\}.
\]

This is precisely the genus-two Siegel upper half-space:

\[
\mathfrak H_2=T_\Omega.
\]

The symplectic group acts by fractional linear transformations

\[
Z\longmapsto
(AZ+B)(CZ+D)^{-1},
\qquad
\begin{pmatrix}A&B\\C&D\end{pmatrix}\in Sp(4,\mathbb R).
\]

Thus the programme's Jordan cone is not merely analogous to a classical automorphic domain. It is the positive imaginary part of one.

## 2. The arithmetic step

The continuous homogeneous domain \(\mathfrak H_2\) contains no preferred integers or primes. To obtain automorphic arithmetic one chooses a discrete subgroup, canonically the full Siegel modular group

\[
\Gamma=Sp(4,\mathbb Z),
\]

or one of its congruence subgroups.

The quotient

\[
\mathcal A_2=\Gamma\backslash\mathfrak H_2
\]

is the Siegel modular variety of degree two, also interpretable as a moduli space of principally polarized abelian surfaces.

This quotient supplies:

- periodic identifications;
- cusps and boundary components;
- automorphic forms;
- Hecke correspondences;
- Eisenstein series;
- arithmetic \(L\)-functions;
- a spectral decomposition of invariant differential operators.

But none of this follows from the real cone alone. The passage

\[
Sp(4,\mathbb R)
\longrightarrow
Sp(4,\mathbb Z)
\]

is a reduction from continuous symmetry to an arithmetic lattice. It must be derived or declared.

## 3. The natural operator

The symmetric space carries an invariant Riemannian metric and corresponding Laplace–Beltrami/Casimir operator. On a suitable \(L^2\) domain of the quotient, write its nonnegative self-adjoint realization as

\[
\Delta_\Gamma.
\]

Its spectral decomposition contains:

- discrete cuspidal eigenfunctions;
- possible residual spectrum;
- continuous spectrum described by Eisenstein series.

This answers one question left open in document 1153:

> Is there a natural self-adjoint operator associated with the Jordan/\(Sp(4)\) domain?

Yes:

\[
\boxed{\Delta_\Gamma\text{ on }L^2(\Gamma\backslash\mathfrak H_2).}
\]

What it does **not** establish is that its eigenvalues are the imaginary parts of the Riemann zeros.

## 4. The compressed resolvent is automatically a Herglotz response

Let \(A=A^*\) be any self-adjoint operator and let

\[
B:\mathcal H\to\mathbb C^2
\]

be a bounded two-probe map. Define

\[
R_B(z)=B(A-zI)^{-1}B^*.
\]

The resolvent identity gives

\[
\operatorname{Im}(A-zI)^{-1}
=
(\operatorname{Im}z)
(A-\bar zI)^{-1}(A-zI)^{-1}
\succeq0
\]

for \(\operatorname{Im}z>0\). Therefore

\[
\boxed{
\operatorname{Im}R_B(z)
=
(\operatorname{Im}z)\,
B(A-\bar zI)^{-1}(A-zI)^{-1}B^*
\succeq0.
}
\]

Taking \(A=\Delta_\Gamma\) produces a canonical class of two-face matrix-Herglotz functions on the arithmetic Jordan domain.

Its spectral representation is

\[
R_B(z)
=
\int_{\mathbb R}
\frac{d\Sigma_B(\lambda)}{\lambda-z},
\qquad
d\Sigma_B(\lambda)=B\,dE_A(\lambda)\,B^*\succeq0.
\]

This is exactly the response architecture developed earlier:

\[
\text{self-adjoint hidden realization}
\longrightarrow
\text{positive matrix spectral measure}
\longrightarrow
\text{two-face Herglotz response}.
\]

Here the hidden realization is no longer an arbitrary finite bath. It is an automorphic differential operator.

## 5. Where the Riemann zeta function appears

Eisenstein series describe scattering from the cusps of an arithmetic quotient. Their constant terms are controlled by intertwining operators. For arithmetic groups, the normalizing factors of these operators contain completed zeta and more general automorphic \(L\)-functions.

Explicit computations for \(Sp(4)\) express constant terms and Fourier coefficients in zeta and Whittaker functions: [Siu Hang Man, Fourier coefficients of \(Sp(4)\) Eisenstein series](https://doi.org/10.4064/aa230511-16-1).

The rank-one modular case displays the mechanism transparently. For the nonholomorphic Eisenstein series,

\[
E(\tau,s)
=
y^s+\varphi(s)y^{1-s}
+\text{nonconstant modes},
\]

with scattering coefficient

\[
\varphi(s)
=
\frac{\xi(2s-1)}{\xi(2s)},
\]

up to the chosen standard completion convention, where

\[
\xi(s)=\pi^{-s/2}\Gamma(s/2)\zeta(s)
\]

or a closely related completed normalization.

The functional equation becomes a scattering relation:

\[
\varphi(s)\varphi(1-s)=1.
\]

On the unitary line, the scattering amplitude has unit modulus under the appropriate normalization. Zeta zeros and poles therefore appear in the analytic structure of the boundary scattering operator.

For \(Sp(4)\), the Weyl group and parabolic structure produce a higher-rank matrix of scattering channels and products of zeta/\(L\)-factors rather than one scalar coefficient.

## 6. The two-face interpretation is real but conditional

The constant term

\[
y^s+\varphi(s)y^{1-s}
\]

has a natural incoming/outgoing, or incident/reflected, interpretation. This provides a mathematically genuine version of:

\[
\text{one carrier, two asymptotic faces, one scattering relation}.
\]

It is tempting to identify those faces with the programme's two relational channels. That identification is not automatic.

The automorphic faces are cusp asymptotics. The physical faces in the stress programme are selected probe/source channels. A bridge requires a map from the physical sources to automorphic boundary data.

Without such a map, the similarity is structural rather than physical.

## 7. What happened to inverse-spectral ambiguity?

The arithmetic quotient does not magically make every inverse problem unique. It changes the candidate class profoundly.

Instead of arbitrary positive pole configurations, candidates must arise from:

- one fixed locally symmetric space;
- its invariant operator algebra;
- automorphic boundary conditions;
- a chosen arithmetic lattice;
- Hecke and Weyl symmetries;
- functional equations;
- trace formulas.

That is precisely the kind of local-to-global rigidity identified in document 1153.

The ambiguity becomes:

\[
\text{Which arithmetic quotient, representation, automorphic sector and probe map?}
\]

rather than:

\[
\text{Which arbitrary collection of poles?}
\]

This is major progress conceptually, but it relocates the prior rather than eliminating it.

## 8. A candidate arithmetic response functor

The most economical mathematical proposal is

\[
\boxed{
(\Gamma,\Delta_\Gamma,B)
\longmapsto
R_{\Gamma,B}(z)
=
B(\Delta_\Gamma-zI)^{-1}B^*.
}
\]

It has the required properties:

1. **Jordan carrier:** the underlying tube is \(H_2(\mathbb R)+iH_2(\mathbb R)_+\).
2. **Spin/symplectic organization:** the continuous group is \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).
3. **Discrete global structure:** \(\Gamma\subset Sp(4,\mathbb R)\) supplies arithmetic recurrence.
4. **Natural generator:** \(\Delta_\Gamma\) is self-adjoint.
5. **Positive response:** the compressed resolvent is matrix Herglotz.
6. **Zeta data:** Eisenstein scattering contains completed zeta/\(L\)-factors.
7. **Inverse problem:** the spectral measure records what the probes can observe.

It also displays all unresolved choices:

- why \(\Gamma=Sp(4,\mathbb Z)\) rather than another lattice;
- which invariant operator or combination of Casimirs is physical;
- what fixes the two-probe map \(B\);
- whether the relevant information lies in eigenvalues, scattering poles or resonances;
- how this automorphic coordinate couples to Standard-Model stress.

## 9. Relation to the learning path

This construction suggests a stronger form of candidate generation.

The learner would not invent arbitrary poles. It would change among structurally admissible triples

\[
(\Gamma,\mathcal A,B),
\]

where \(\mathcal A\) is a self-adjoint operator in an allowed automorphic/operator algebra.

Parameter learning changes:

- couplings or boundary probes;
- spectral weights;
- admissible deformations of the metric/operator.

Structural learning changes:

- automorphic representation sector;
- congruence level;
- boundary channel;
- quotient or correspondence class.

This is far more constrained than generic rational model selection. It may also be far too rigid or physically unmotivated. The immediate task is not to build an “arithmetic brain,” but to test whether any physical datum selects the arithmetic quotient.

## 10. Why this is not a Riemann-hypothesis solution

The construction does not prove that

\[
\operatorname{spec}\Delta_\Gamma
=
\{\gamma_n\}.
\]

Instead, zeta factors occur in scattering/intertwining coefficients. Their zeros may appear as scattering poles, zeros or resonances after changes of variable and normalization.

This is related to the spectral approaches of Selberg and Connes, but it is not the missing Hilbert–Pólya operator.

Nor does matrix-Herglotz positivity imply the Riemann hypothesis. Resolvent positivity follows from self-adjointness of \(\Delta_\Gamma\); the hard arithmetic question is how all zeta zeros enter the scattering data and what positivity statement, if any, forces their critical-line location.

## 11. Stop-everything gates

1. **Physical lattice selection:** a quantization, charge lattice, modular consistency condition or relational holonomy derives \(Sp(4,\mathbb Z)\) or a specific congruence subgroup.
2. **Probe derivation:** Standard-Model stress or Furey data canonically define the two automorphic boundary probes \(B\).
3. **Functional-equation realization:** the physical face exchange implements the Weyl reflection underlying \(s\leftrightarrow1-s\).
4. **Scattering match:** a measurable causal response has the same normalized scattering determinant as an automorphic intertwining operator.
5. **Trace-formula match:** physical primitive cycles reproduce the prime-power side of an explicit formula.
6. **Positivity equivalence:** a Jordan/passivity condition is proved equivalent to a Weil-type positivity criterion, not merely analogous to it.

## 12. Decision

Promote the following statement:

\[
\boxed{
\begin{gathered}
\text{The Jordan cone has a canonical automorphic extension}\\
\text{whose self-adjoint compressed resolvents are Herglotz responses}\\
\text{and whose cusp scattering contains zeta factors.}
\end{gathered}}
\]

Do not promote:

\[
\text{Jordan cone}\Longrightarrow\text{Riemann zeta}
\]

or

\[
Spin(2,3)\Longrightarrow\text{Riemann hypothesis}.
\]

The arithmetic quotient is the new hinge. The next question is whether the research programme contains any independent reason for the continuous response geometry to acquire the lattice \(Sp(4,\mathbb Z)\).

[AZ-147](../../programmes/admissibility/admissibility_147_xi_genus_two_weil_spectral_compression_and_hyperbolic_trace_gate.md)
adds a distinct arithmetic route that should not be collapsed into this one.
Localized Weil quadratic forms and self-adjoint differentiation operators
produce finite spectra converging to zeta ordinates under RH without passing
through the genus-two Jordan tube. Conversely, a new Xi discriminant produces
a genuine genus-two curve and period lattice, but does not identify its marked
cycles with this automorphic quotient. Zeta scattering, Weil spectral
compression and Xi genus-two geometry are now three typed constructions, not
one inferred equivalence.

## Executable structural certificate

Run:

    node verification/verify/verify_two_probe_self_adjoint_resolvent_is_h2_herglotz.mjs

The certificate compresses a finite self-adjoint spectrum through two probes and verifies strict positivity of the resulting imaginary response matrix in the upper half-plane. It certifies the general resolvent-to-Herglotz mechanism used above. It does not certify the automorphic origin of the hidden operator or the occurrence of zeta factors; those rely on the cited theory of arithmetic Eisenstein series.
