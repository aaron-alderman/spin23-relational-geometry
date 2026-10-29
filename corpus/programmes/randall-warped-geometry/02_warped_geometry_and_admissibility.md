# Warped Geometry and Admissibility

## 1. Minimal five-dimensional system

A representative warped action contains a bulk Einstein term, negative bulk
cosmological constant and localized brane tensions,

\[
S=\int d^5x\sqrt{-G}\left(2M_5^3R-\Lambda_5\right)
-\sum_i\int d^4x\sqrt{-g_i}\,V_i.
\]

The RS1 ground-state metric can be written

\[
ds^2=e^{-2k|y|}\eta_{\mu\nu}dx^\mu dx^\nu+dy^2,
\qquad 0\le y\le L,
\]

with the endpoints supplied by an \(S^1/\mathbb Z_2\) orbifold. The bulk
Einstein equation fixes the AdS curvature in terms of \(\Lambda_5\); junction
conditions relate the jump in extrinsic curvature to the brane tensions. The
metric is therefore not a freely chosen optical index. Bulk and boundary source
data must jointly solve the field equations.

## 2. Exponential hierarchy

For a brane field at \(y=L\), canonical normalization changes a fundamental
mass parameter \(m_0\) to

\[
m_{\mathrm{IR}}=e^{-kL}m_0.
\]

Taking \(m_0/m_{\mathrm{IR}}\sim10^{16}\) requires

\[
kL=\log 10^{16}\approx36.84.
\]

The squared hierarchy is then of order \(10^{32}\). The four-dimensional
Planck scale comes from the normalized gravitational zero-mode integral,

\[
M_{\rm Pl}^2
=M_5^3\int_{-L}^{L}dy\,e^{-2k|y|}
=\frac{M_5^3}{k}\left(1-e^{-2kL}\right).
\]

This separates two effects often merged in popular accounts:

- local particle scales on the infrared brane are exponentially redshifted;
- the effective gravitational coupling is obtained by normalizing the bulk
  gravitational mode.

## 3. Three localization regimes

| Regime | Face | Retained gravity | Extra spectrum |
|---|---|---|---|
| RS1 | two flat branes bounding a compact warped interval | massless zero mode | discrete massive KK tower and radion |
| RS2 | one flat brane in noncompact warped bulk | normalizable massless zero mode | gapless continuum giving controlled corrections |
| Karch--Randall | curved \(AdS_4\) brane in \(AdS_5\) | light massive bound graviton | additional massive modes; asymptotic AdS boundary retained |

“Gravity is four-dimensional” therefore means that the brane detector couples
dominantly to a selected normalizable or quasibound mode over the tested range.
It does not mean that the bulk carrier has disappeared.

## 4. Corpus grammar

Define the model card

\[
\mathfrak W=(X,A,T,J,\rho,L,D,I,R)
\]

as follows:

| Coordinate | Warped-geometry realization |
|---|---|
| \(X\), carrier | five-dimensional metric, bulk matter and perturbation modes |
| \(A\), admissibility | Einstein equations, junction conditions, orbifold parity, normalizability, stability and EFT cutoff |
| \(T\), transport | bulk wave equation and parallel/geodesic propagation |
| \(J\), selector | brane embedding, induced metric, boundary action and parity conditions |
| \(\rho\), realization | zero/bound mode plus KK or continuum spectral measure |
| \(L\), dynamics | radion/stabilizer evolution, brane motion and thermal transition |
| \(D\), detector | brane-localized matter, collider channels, gravitational response and cosmological records |
| \(I\), invariants | induced covariance, conserved stress data, spectral normalization and bulk constraints |
| \(R\), scars | KK resonances, radion, modified gravity, distributed bulk response and phase-transition records |

The brane is a face in a technically strong sense: it carries an induced metric
and localized fields, while retaining relations to the bulk through gravity,
junction data and global constraints.

## 5. What the geometry does not license

1. The spacelike coordinate \(y\) is not the corpus's proposed second time.
2. A brane is not automatically an \(H_2(\mathbb R)\) Jordan face.
3. Orbifold reflection is not automatically the corpus's mirror involution.
4. An exponential warp does not select three generations, triality or \(E_8\).
5. Localized gravity does not create an absolute reference frame; the full
   theory remains diffeomorphism covariant.

These are possible dictionary questions, not conclusions of the model.
