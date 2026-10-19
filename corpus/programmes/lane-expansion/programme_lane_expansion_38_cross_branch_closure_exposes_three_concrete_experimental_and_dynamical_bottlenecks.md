# Result 38: cross-branch closure exposes three concrete experimental and dynamical bottlenecks

## Outcome

The third parallel round crossed the previously independent constructions. It produced three exact boundaries.

### 1. The five-current quotient has a rank-complete observable design

For

\[
z=(v_u,v_d,v_e,v_\nu;A_2),
\]

top-sensitive production plus charged-lepton lifetime has rank two. Adding a source-matched neutral-gauge anomaly row gives rank three but leaves the neutrino direction and one bottom--weak degeneracy.

The visible set

\[
(T,B,L,W)
\]

has rank four. It can test the incidence residual

\[
R=A_2-v_u-v_d
\]

and distinguish the two charged-lepton normalizations. Adding a neutrino-chirality row gives rank five, but a light Dirac neutrino is practically invisible: at \(m_\nu=0.1\) eV and \(f=10^6\) GeV its amplitude scale is about \(10^{-16}\).

In a generic ALP EFT, both a bottom compass and a genuinely electroweak weak-anomaly compass are required. Rates alone retain a global sign ambiguity, so a signed test of \(R=0\) needs interference or phase information.

### 2. The exceptional selector is healthy, but its tangent 16 is bosonic

Around a primitive rank-one vacuum, the potential

\[
V(x)=\lambda(\|x\|^2-v^2)^2+\kappa\|x^\#\|^2
\]

has the exact real spectrum

| sector | multiplicity | mass squared |
|---|---:|---:|
| radial | 1 | \(8\lambda v^2\) |
| phase | 1 | 0 |
| tangent \(16_{\mathbb C}\) | 32 | 0 |
| normal \(10_{\mathbb C}\) | 20 | \(2\kappa v^2\) |

The Hessian has rank 21 and a 33-dimensional kernel, exactly the \(E_6/Spin(10)\) orbit. For positive \(\lambda,\kappa\), it is a healthy Morse--Bott selector with no accidental transverse flats.

But the tangent \(16\) consists of scalar Goldstone directions, not the Furey fermions. Gauged \(E_6\) eats them; global \(E_6\) leaves them massless. Fermionic matter must therefore be supplied as a separate associated bundle over the selected orbit. The equality of representation labels is not an identity of physical fields.

### 3. The exceptional 10 and Furey first order disagree exactly on proton-dangerous channels

The exceptional Higgs representation branches as

\[
10_H\to
(1,2)_{1/2}\oplus(1,2)_{-1/2}
\oplus(3,1)_{-1/3}\oplus(\bar3,1)_{1/3}.
\]

The \(16_F16_F10_H\) cubic produces nine Standard-Model channels:

\[
4\text{ ordinary Yukawas}
+3\text{ Furey }S_1\text{ links}
+2\text{ diquark links}.
\]

The intersection with doubled-Furey first order is exactly the first seven. The mismatch is

\[
QQT,\qquad u^cd^c\bar T.
\]

Thus Furey first order removes precisely the two proton-dangerous partners restored by full \(Spin(10)\) covariance. A lone exact \(Spin(10)\) invariant cannot keep the proton-safer \(S_1\) subset: doublet--triplet splitting, decoupling or another symmetry-breaking mechanism is required.

## Combined interpretation

The exceptional-crystal reading has survived, but in a more disciplined form:

- the exceptional action can select a class of faces;
- a chosen face canonically defines a matter-shaped tangent representation;
- actual fermions remain separate fields over that geometry;
- the exceptional Higgs channel economically unifies the Yukawas, but also restores proton-dangerous coloured partners;
- the Furey first-order rule supplies a potentially meaningful additional filter not respected by exact \(Spin(10)\).

The next unification test is therefore concrete: construct a broken exceptional/Furey action whose vacuum is the healthy rank-one orbit, whose fermion bundle is the completed \(16\), and whose breaking removes the two diquark channels without arbitrary zeros while retaining the observed Yukawas.

## Reproduction

- `verification/verify/verify_programme_five_coordinate_observable_map.mjs`
- `verification/verify/verify_representation_trunk_exceptional_selector_hessian.mjs`
- `verification/cross/cross_spin10_ten_cubic_with_doubled_furey_links.mjs`

All certificates pass.
