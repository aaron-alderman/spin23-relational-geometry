# Spin(2,3) Requires a Sector-Selective, Not Universal, Gravitational Mass Gap

**Date:** 20 October 2026

**Gates:** A1, A2, A4, A6, A7 and A8

**Status:** finite quadratic-spectrum admission witness; no spectrum derived from a complete Spin(2,3) action

**Depends on:** [the Lense--Thirring vector-sector gate](1589_lense_thirring_is_the_vector_sector_gravity_gate_beyond_the_scalar_geopotential.md) and the four-dimensional Yang--Mills mass-gap distinction

**Evidence:** [sector-selective mass-gap ledger](../../../evidence/data/spin23-sector-selective-mass-gap.json) and [deterministic verifier](../../../verification/verify/verify_spin23_sector_selective_mass_gap.mjs)

## Result

The Yang--Mills phrase "mass gap" cannot be transferred wholesale to a Spin(2,3) Cartan connection. Ordinary long-range gravity requires a massless, positive-residue spin-2 pole. The admissible target is therefore

\[
\boxed{\text{massless Einstein spin 2}\quad+\quad
\text{positive gaps for any physical non-Einstein modes}.}
\]

A universal gap in the physical connection spectrum would replace the static \(1/r\) response by a Yukawa response \(e^{-m_g r}/r\). It would also suppress the stationary \(g_{0i}\) field that produces the Lense--Thirring effect in claim 1589. A gapped torsion, selector or other auxiliary sector is possible in principle; a gapped Einstein sector is not the GR limit.

This is adjacent to, but does not solve, the four-dimensional compact Yang--Mills mass-gap problem. Spin(2,3) is noncompact and the coframe/connection system is constrained by diffeomorphism and local Lorentz gauge symmetry. It is not an ordinary compact internal Yang--Mills theory.

## Connection and curvature split

After the symmetry-breaking choice \(Spin(2,3)\to Spin(1,3)\), write

\[
\mathcal A={1\over2}\omega^{ab}J_{ab}+{1\over\ell}e^aJ_{a4}.
\]

Its curvature separates schematically as

\[
\mathcal F^{ab}=R^{ab}+\ell^{-2}e^a\wedge e^b,
\qquad
\mathcal F^{a4}=\ell^{-1}T^a.
\]

This algebraic split does not give a particle spectrum. That requires a complete action, vacuum, gauge fixing, constraint analysis and quadratic Hessian. In particular, \(e^a\) is not simply a quartet of massive coset gauge bosons after breaking: it supplies the spacetime soldering form, and its constrained fluctuations contain the graviton.

Possible non-Einstein fields include irreducible axial, trace and tensor pieces of torsion; extra connection modes introduced by curvature-squared terms; and radial or orientational fluctuations of a dynamical symmetry-breaking selector. Which of these propagate is action dependent. Some can be algebraic constraints rather than particles.

## Finite quadratic witness

The evidence ledger gives a five-dimensional reduced mode-space model with mutually orthogonal projectors

\[
P_g+P_{T_A}+P_{T_V}+P_\sigma=I,
\qquad P_iP_j=\delta_{ij}P_i.
\]

\(P_g\) has rank two, representing the two physical massless graviton helicities. The other projectors are one-dimensional proxies for axial torsion, trace torsion and a selector-radial mode. The Euclidean quadratic kernel is

\[
K(q^2)=M_{\rm Pl}^2q^2P_g+
\sum_s Z_s(q^2+m_s^2)P_s.
\]

The explicit witness chooses

\[
M_{\rm Pl}^2=1,
\quad (Z_s)=(0.75,0.50,1.25),
\quad (m_s^2\ell^2)=(1.44,0.64,0.36).
\]

At \(q^2=0\), the kernel has nullity exactly two while every auxiliary eigenvalue is positive. The smallest auxiliary mass satisfies

\[
m_{\rm aux}^2\ell^2=0.36>0.
\]

This proves only that the desired sign pattern is algebraically nonempty. It is not a spectrum prediction. A Spin(2,3) proposal must derive its own \(Z_s\), \(m_s^2\), mixing blocks and source couplings from its action.

## Ghost and tachyon stop rules

For each physical pole of the source-saturated propagator:

- a negative residue is a ghost and stops admission;
- \(m_s^2<0\) is a tachyon around that vacuum and stops admission;
- an unexplained extra zero eigenvalue means an additional massless mode or a missed gauge redundancy;
- a vanishing kinetic eigenvalue is not automatically healthy: without a proven gauge symmetry and nonlinear constraint closure it may indicate strong coupling;
- positivity around Minkowski space is not enough if the proposal claims de Sitter, anti-de Sitter, cosmological or strong-field backgrounds.

The simplest higher-derivative spin-2 warning is already decisive:

\[
{1\over p^2(1+p^2/M^2)}
={1\over p^2}-{1\over p^2+M^2}.
\]

The two poles have opposite residues. With ordinary pole quantization, the massive spin-2 excitation is a ghost. Curvature-squared terms therefore cannot be promoted merely because they generate a scale or improve power counting; their physical saturated residues must be checked.

## Link to Lense--Thirring

The massless Einstein pole controls both the scalar Newtonian response and the vector/gravitomagnetic response. For a rotating source, the latter appears as \(g_{0i}\) and produces frame dragging. Giving this pole a common mass \(m_g\) generically changes the long-range Green function from \(1/r\) to \(e^{-m_g r}/r\), so the exact weak-field recovery test in claim 1589 becomes a direct infrared stop rule.

Consequently, a viable broken Spin(2,3) theory must recover the unsuppressed GR Lense--Thirring coefficient while placing any extra propagating connection or selector modes behind separately derived healthy gaps. Agreement with Lense--Thirring constrains the massless sector; it does not prove the auxiliary gap.

## What would count as progress

A candidate action should pass the following derivation chain:

1. choose and justify a symmetry-breaking vacuum;
2. expand \(e^a\), \(\omega^{ab}\) and every selector field to quadratic order;
3. fix diffeomorphism and local Lorentz redundancies and eliminate nondynamical fields;
4. block-diagonalize the physical Hessian with spin-parity projectors;
5. show exactly two positive-residue massless spin-2 helicities;
6. show every additional physical pole has positive residue and \(m^2>0\);
7. recover Newtonian and Lense--Thirring infrared coefficients; and
8. verify hyperbolicity and constraint closure beyond the chosen linear vacuum.

The strongest useful outcome would be a symmetry-protected region of coupling space in which the auxiliary gap and residue signs are stable under radiative corrections. A single tuned healthy point is weaker; a connection decomposition without a quadratic spectrum establishes no gap at all.

## Sources

- [MacDowell and Mansouri, unified geometric theory of gravity and supergravity](https://doi.org/10.1103/PhysRevLett.38.739)
- [Díaz-Saldaña et al., symmetry breaking in a MacDowell--Mansouri action](https://arxiv.org/abs/2010.12515)
- [Lin, Hobson and Lasenby, systematic ghost- and tachyon-free Poincaré gauge theories](https://arxiv.org/abs/1812.02675)
- [Percacci and Sezgin, ghost- and tachyon-free metric-affine gravities](https://arxiv.org/abs/1912.01023)
- [Marzo, saturated propagators and spin projectors through spin 3](https://arxiv.org/abs/2108.11982)
- [Stelle, higher-derivative quantum gravity](https://doi.org/10.1103/PhysRevD.16.953)
- [Gravity Probe B final frame-dragging result](https://arxiv.org/abs/1105.3456)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_sector_selective_mass_gap.mjs
~~~
