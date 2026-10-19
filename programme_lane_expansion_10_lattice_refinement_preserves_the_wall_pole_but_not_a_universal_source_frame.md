# Lane Expansion 10: Lattice Refinement Preserves the Wall Pole but Not a Universal Source Frame

**Date:** 17 October 2026  
**Lane:** L3, nonperturbative lattice and functional response  
**Claim status:** exact free domain-wall refinement result; not an interacting chiral-gauge simulation  
**Certificate:** [verify_programme_domain_wall_refinement_source_frame.mjs](scripts/verify_programme_domain_wall_refinement_source_frame.mjs)

## Result in ordinary language

A lattice is a ruler laid across a domain wall. Making its marks finer should remove artifacts caused by the ruler. It cannot, however, decide the shape of the wall being measured.

That distinction is exact in the programme's transverse domain-wall chain. Under refinement:

- the localized zero mode remains an exact kernel vector;
- its projected pole remains rank one and positive;
- a symmetric wall converges to the equal-face ray ((1,1));
- unequal decay rates on the two sides continuously rotate that ray.

Thus a regulator-independent boundary response exists, but the regulator does not select a universal source frame. The limiting eigenvector remembers physical wall-profile data.

## 1. The refined wall

On a grid with spacing (a), let

\[
(Qf)_j=f_{j+1}-e^{-a m_j}f_j.
\]

The exact kernel recurrence is

\[
f_{j+1}=e^{-a m_j}f_j.
\]

Take (m_j=-m_L) to the left of the wall and (m_j=+m_R) to the right, with (m_L,m_R>0). The continuum profile is therefore proportional to

\[
f(x)=
\begin{cases}
e^{m_Lx},&x<0,\\
e^{-m_Rx},&x>0.
\end{cases}
\]

This is the familiar localized shape: it grows toward the wall from the left and decays away on the right.

## 2. Two fixed physical probes

Place probes at the fixed physical locations (-d) and (+d), rather than at fixed lattice indices. Their zero-mode amplitudes form

\[
p=(f(-d),f(+d)).
\]

The limiting ratio is

\[
\boxed{\frac{p_+}{p_-}=e^{-(m_R-m_L)d}.}
\]

For a reflection-symmetric wall (m_L=m_R), this is one and the normalized ray is

\[
\frac1{\sqrt2}(1,1).
\]

But any allowed asymmetry (m_L\ne m_R) rotates the ray continuously. The certificate checks spacings corresponding to 64, 128, 256 and 512 intervals. Because the piecewise-constant profile is integrated exactly by the recurrence, every refinement already agrees with the continuum formula at the chosen probes.

## 3. The pole and positivity survive

For the Hermitian chiral Hamiltonian

\[
H=\begin{pmatrix}0&Q^T\\Q&0\end{pmatrix},
\]

the projected resolvent near zero has

\[
G(z)\sim-\frac{pp^T}{z}.
\]

The residue (pp^T) is positive semidefinite and rank one for every profile. At (z=i\eta), (\eta>0), the pole contributes

\[
\operatorname{Im}G(i\eta)=\frac{pp^T}{\eta}\succeq0.
\]

So localization, rank and Herglotz positivity are robust. The direction of the rank-one residue is not universal.

## 4. What is regulator data and what is physical data

Changing the number of lattice points while holding (m_L,m_R,d) fixed is a regulator change. It leaves the continuum ray fixed.

Changing (m_L/m_R), moving the probes or changing their smearing functions changes the physical preparation. It changes the ray even after the regulator has been removed.

This distinction blocks an easy but invalid inference:

\[
\text{stable under lattice refinement}
\not\Rightarrow
\text{canonically selected by the theory}.
\]

The equal-face vector is selected only after reflection symmetry of the wall and probes has been declared. It is not supplied by domain-wall topology alone.

## 5. Mirror and interaction boundary

The calculation concerns one exact rectangular-chain index mode. A finite slab still has a remote wall or antikink. The existing slab calculation shows that the two wall modes split by an exponentially small amount but persist. Refinement does not solve that mirror problem.

Gauge interactions may renormalize the wall profile and broaden the spectral function. Spectral positivity should survive for gauge-invariant probes, but neither positivity nor the index forces the profile-dependent face vector to match the Furey incidence/B-L plane.

## 6. Landscape and closure ledgers

### Landscape value

- separates continuum stability from source-frame universality;
- gives an exact refinement benchmark for future simulations;
- identifies wall reflection symmetry as the assumption behind the equal-face ray;
- preserves the rank-one Herglotz pole across asymmetric profiles.

### Closure value

Negative at this level. The lattice construction transports a chosen profile into a response eigenvector; it does not derive the programme's physical ports or their normalization.

## 7. Concrete continuation

The next bounded calculation is a small overlap/domain-wall simulation with two explicitly gauge-invariant Standard-Model current insertions. For each lattice spacing it should record:

1. Ward-identity residuals;
2. remote-wall contamination;
3. the normalized (2\times2) Euclidean correlator;
4. drift of its eigenvectors under profile and smearing changes;
5. continuum extrapolation at fixed physical volume, followed by volume extrapolation.

**Go signal:** an eigenframe or dimensionless spectral relation survives profile, smearing, regulator and volume changes and can be matched to physical current protocols.

**No-go signal:** only pole rank and positivity survive, while the source frame tracks freely adjustable wall/probe data as in the present exact benchmark.

## Reproducibility

```powershell
node scripts\verify_programme_domain_wall_refinement_source_frame.mjs
```
