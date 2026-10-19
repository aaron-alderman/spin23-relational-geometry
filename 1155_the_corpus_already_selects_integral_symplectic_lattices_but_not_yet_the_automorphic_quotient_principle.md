# The Corpus Already Selects Integral Symplectic Lattices but Not Yet the Automorphic Quotient Principle

**Date:** 19 October 2026  
**Branches:** arithmetic \(Sp(4)\), compact phase space, Furey/Higgs ribbon topology, color-average lattice, code carrier, automorphic response  
**Claim status:** corpus-wide selection audit; exact distinctions between lattice, automorphism group, quotient and dynamics

## Executive verdict

The programme does contain independent routes to an integral rank-four symplectic lattice. In that limited sense, document 1154's arithmetic step is not an alien addition.

The strongest existing routes are:

1. a compact two-port phase/flux torus, whose primitive homology lattice has automorphism group \(Sp(4,\mathbb Z)\);
2. a genus-two ribbon/homology realization, whose intersection lattice has mapping-class action through \(Sp(4,\mathbb Z)\);
3. an exact color-average completion integrally equivalent to the canonical unimodular symplectic lattice;
4. two-qutrit/code reductions that reproduce \(Sp(4,\mathbb F_3)\) and admit an integral genus-two lift;
5. multiple \(C_3\)-related placements whose combined integral Lie order closes to the full Chevalley \(\mathfrak{sp}_4(\mathbb Z)\).

But none yet proves the full automorphic construction required by document 1154.

The missing step is:

\[
\boxed{
\text{Why are configurations related by }Sp(4,\mathbb Z)
\text{ physically identified or summed over?}
}
\]

An integral carrier makes \(Sp(4,\mathbb Z)\) the group of admissible lattice automorphisms. It does not automatically make

\[
Sp(4,\mathbb Z)\backslash\mathfrak H_2
\]

the physical configuration or moduli space.

## 1. Five levels that must not be conflated

The arithmetic branch contains a strict hierarchy:

\[
\begin{array}{rcl}
\mathbf{L0} &:& \text{real symplectic space }(\mathbb R^4,\Omega),\\
\mathbf{L1} &:& \text{primitive integral symplectic lattice }(\Lambda,\Omega),\\
\mathbf{L2} &:& \operatorname{Aut}(\Lambda,\Omega)\cong Sp(4,\mathbb Z),\\
\mathbf{L3} &:& \text{quotient principle identifying lattice-related frames},\\
\mathbf{L4} &:& \text{automorphic operator/scattering theory on the quotient},\\
\mathbf{L5} &:& \text{physical sources coupled to its spectral observables}.
\end{array}
\]

The corpus has several exact or conditional constructions through L2. Document 1154 supplies the standard mathematics of L4 assuming L3. No branch yet completes L3 and L5 physically.

This distinction resolves an apparent contradiction:

- the earlier corpus repeatedly “found \(Sp(4,\mathbb Z)\)”;
- document 1154 called the arithmetic lattice an extra choice.

Both statements are correct. The corpus found candidate integral carriers and generators. It did not yet establish that the complete arithmetic group acts as a physical redundancy on the Jordan tube.

## 2. Route A: noncompact positive response fails to select integrality

For a noncompact two-port response,

\[
(q,p)\mapsto(Dq,D^{-T}p),
\qquad D\in GL(2,\mathbb R),
\]

is a legal canonical rescaling. It preserves positivity and the symplectic form while changing which shear coefficients are integers.

Therefore:

\[
\boxed{
\text{positive response}+\text{real symplectic structure}
\not\Longrightarrow
\text{canonical integral lattice}.
}
\]

The invariant datum is a normalized coupling such as

\[
\frac{X_{12}}{\sqrt{X_{11}X_{22}}},
\]

not the raw integer entries of \(X\).

This route stops at L0.

## 3. Route B: compact phase/flux variables reach L2 exactly

If both conjugate pairs are periodic with primitive periods, phase space becomes a principally polarized torus

\[
\mathbb R^4/\mathbb Z^4.
\]

The primitive lattice

\[
\Lambda\cong\mathbb Z^4
\]

has its canonical integral alternating pairing. Its automorphism group is exactly

\[
\operatorname{Aut}(\Lambda,\Omega)=Sp(4,\mathbb Z).
\]

Compactness removes arbitrary real rescalings because a generic \(D\in GL(2,\mathbb R)\) does not preserve the lattice.

This is a complete L1–L2 theorem. The physical gap is that the current Standard-Model/Furey response has not been shown to provide **two compact conjugate pairs**. Compact configuration variables alone quantize momenta but do not automatically compactify the full classical phase space.

The global periodic action must also be specified; a bare quadratic potential is not single-valued on a torus.

## 4. Route C: genus-two homology reaches L2 geometrically

For a closed oriented genus-two surface,

\[
H_1(\Sigma_2,\mathbb Z)\cong\mathbb Z^4
\]

with the unimodular intersection form. Orientation-preserving mapping classes act symplectically, and their homological image is

\[
Sp(4,\mathbb Z).
\]

This is the cleanest route to L3 if the surface is physically a moduli object: changing the homology basis is then a change of marking, and quotienting by the mapping-class action is natural.

The Furey/Higgs graph genuinely admits genus-two ribbon embeddings: 36 of its 96 rotation systems have the required topology. The same enumeration also exposes the obstruction. If every Yukawa triangle is required to be a literal local face, the selected ribbon embedding is planar.

Thus:

\[
\text{matter graph}
\Longrightarrow
\text{genus-two option},
\]

but not yet

\[
\text{matter dynamics}
\Longrightarrow
\text{genus-two selection}.
\]

The topology route reaches L2 for the genus-two branch and makes L3 natural, but the branch selector is missing.

## 5. Route D: the \(A_2\) two-qutrit theory gives an exact finite and integral lift

The genus-two \(A_2\) discriminant theory produces a nine-dimensional state space, matching two qutrits. Local handle twists generate the two self-relations; the Dehn twist around a primitive sum cycle generates the mutual relation.

The resulting finite action closes to

\[
Sp(4,\mathbb F_3),
\qquad
|Sp(4,\mathbb F_3)|=51840,
\]

and is the reduction of the integral homological action

\[
Sp(4,\mathbb Z)\longrightarrow Sp(4,\mathbb F_3).
\]

This is a strong compatibility result:

\[
\text{two faces}+\text{third mutual relation}
\longleftrightarrow
\text{two handles}+\text{sum-cycle twist}.
\]

It still does not identify the code basis with physical stress probes or show that the integral mapping classes act dynamically.

## 6. Route E: the color-average completion produces the canonical lattice internally

The color/weak branch constructs a rank-four integral lattice whose alternating form is unimodular and integrally equivalent to the canonical symplectic form. Its primitive two-form lattice is

\[
U\oplus U\oplus\langle-2\rangle,
\]

carrying the expected integral signature-\((2,3)\) orthogonal shadow.

This is especially important because it arises from matter/code incidence rather than by first assuming a surface.

Its present status is conditional:

- equal area on the two symplectic planes must be selected;
- the typed physical source map is missing;
- the lattice is proved arithmetic-compatible, not yet populated as the physical response carrier;
- the full automorphism group need not be a realized symmetry.

The route reaches an exact L1 and therefore canonically defines L2, conditional on the equal-area physical selection.

## 7. Route F: relational placement repairs the integral Lie order

A single selected placement generates only an index-\(512\) dyadic boundary order. Adding any second distinct \(C_3\)-related placement restores the full Chevalley integral order

\[
\mathfrak{sp}_4(\mathbb Z).
\]

This is an arithmetic version of the relational lesson:

\[
\text{one placement is parabolic/incomplete},
\qquad
\text{a transverse relationship completes the algebra}.
\]

All three placements retain the canonical \(S_3/A_2\) environment, even though two suffice for Lie generation.

The remaining condition is physical traversal of more than one placement. Algebraic availability is not dynamics.

## 8. What is actually selected?

The current evidence can be ranked:

| Object | Status |
|---|---|
| Real \(Sp(4,\mathbb R)\) carrier | exact |
| Abstract canonical symplectic lattice \(\mathbb Z^4\) | realized by several branches |
| Full lattice automorphism group \(Sp(4,\mathbb Z)\) | exact once the lattice is physical |
| Finite reduction \(Sp(4,\mathbb F_3)\) | exact in the two-qutrit/genus-two representation |
| Integral \((2,3)\) primitive-form shadow | exact in the color-average completion |
| Physical selection of the lattice normalization | conditional |
| Physical selection of genus-two topology | open and opposed by the local-face reading |
| Identification under every \(Sp(4,\mathbb Z)\) basis change | open |
| Automorphic Laplacian as physical generator | open |
| Stress/Furey probe map into automorphic scattering | open |

So the answer to document 1154's question is:

\[
\boxed{
\text{The programme nearly selects the lattice, but not yet the quotient.}
}
\]

## 9. The quotient principle is the true missing axiom

Suppose a physical derivation provides a primitive symplectic lattice \(\Lambda\). There are two interpretations of its automorphisms.

### 9.1 Physical transformations

Each \(g\in Sp(4,\mathbb Z)\) maps one physically distinct state or experiment to another. Then the group is a discrete dynamical or duality symmetry.

### 9.2 Changes of marking

Different primitive symplectic bases describe the same physical configuration. Then \(Sp(4,\mathbb Z)\) is a gauge/moduli redundancy, and the quotient

\[
Sp(4,\mathbb Z)\backslash\mathfrak H_2
\]

is mandatory.

Only the second interpretation automatically yields the automorphic moduli space used in document 1154. The first yields a group action but not necessarily a quotient of physically equivalent descriptions.

This suggests the decisive question:

> Are the two faces and their conjugate fluxes physically labelled, or are they only a choice of primitive symplectic marking?

If the labels are observable—electron versus neutrino, color versus weak, input versus output—generic basis changes are not gauge. If only invariant intersection and response data are observable, quotienting becomes plausible.

## 10. A concrete convergence route

The strongest possible synthesis uses different branches for different burdens:

\[
\begin{aligned}
\text{color/Furey/code incidence}
&\longrightarrow \text{physical primitive lattice},\\
\text{genus-two ribbon or compact torus}
&\longrightarrow \text{quotient/marking interpretation},\\
\text{Jordan tube}
&\longrightarrow \mathfrak H_2,\\
\text{invariant kinetic operator}
&\longrightarrow \Delta_\Gamma,\\
\text{two physical boundary probes}
&\longrightarrow B(\Delta_\Gamma-z)^{-1}B^*,\\
\text{Eisenstein boundary sector}
&\longrightarrow \text{zeta-valued scattering}.
\end{aligned}
\]

No individual branch currently supplies all six arrows. Their convergence is nontrivial because each independently produces the same rank-four symplectic architecture.

## 11. Immediate falsification tests

1. **Label obstruction:** if the primitive basis vectors carry immutable Standard-Model quantum numbers, full \(Sp(4,\mathbb Z)\) cannot be a marking redundancy.
2. **Planarity obstruction:** if locality forces all Yukawa cycles to be ribbon faces, the direct genus-two mapping-class route closes.
3. **Normalization obstruction:** if no compact or quantized conjugate variables exist, the response remains real-symplectic without canonical arithmetic.
4. **Equal-area failure:** if the two color-average planes have physically unequal normalizations, the canonical unimodular completion is not selected.
5. **Fixed-placement obstruction:** if dynamics never traverses a second \(C_3\)-related placement, the integral algebra remains a proper boundary order.
6. **Probe obstruction:** if physical source matrices do not transform as automorphic boundary data, zeta scattering remains mathematically adjacent but physically disconnected.

## 12. Stop-everything triggers

1. A physical compactification produces two conjugate primitive phase/flux pairs.
2. The Furey/Higgs action selects one of the genus-two ribbon systems rather than the planar local-face system.
3. The equal-area color lattice is derived from a Ward identity or normalized response.
4. Physical observables are proved independent of the primitive symplectic marking, forcing the quotient.
5. The stress/source response equals a compression of the automorphic resolvent.
6. A measurable scattering determinant contains the completed-zeta normalizing factor.

## 13. Decision

The arithmetic bridge is no longer merely imported:

\[
\boxed{
\text{the corpus contains several independent precursors of }
(\mathbb Z^4,\Omega)\text{ and }Sp(4,\mathbb Z).
}
\]

But the new frontier is not another construction of the same group. It is the quotient principle:

\[
\boxed{
\text{derive why full integral symplectic re-marking is physically redundant.}
}
\]

Until that is done, the automorphic zeta branch is a mathematically natural completion of the carrier, not a derived law of the Standard Model or consciousness.
