# Conjugate $Z_3$ sectors are degenerate for same-parity probes, but an oriented odd probe separates them without solving A5

**Date:** 20 October 2026  
**Status:** exact symmetry theorem plus finite local-observable counterexample; no physical defect reader or orientation selector derived  
**Role:** A11 exhaustion lane B  
**Evidence:** [machine-readable ledger](../../../evidence/data/spin23-a11-z3-orientation-readout.json) and [verifier](../../../verification/verify/verify_spin23_a11_z3_orientation_readout.mjs)

## Result

Let $h=0,1,2$ label the three flat $Z_3$ holonomies, with $-1=2$. If charge conjugation, CP or time reversal maps the theory in sector $h$ to sector $-h$, then a real symmetrized response built from probes of one common symmetry parity obeys

\[
C_1=C_2.
\]

This does **not** force the three-sector first harmonic to vanish. Its cosine component compares $h=0$ with the conjugate-pair average and may be nonzero in a completely CP/T-symmetric theory. Only its sine component distinguishes $h=1$ from $h=2$:

\[
\boxed{
D_c={2C_0-C_1-C_2\over3},
\qquad
D_s={C_1-C_2\over\sqrt3}.
}
\]

Therefore the omnibus statistic of document 1222,

\[
A_\perp\propto\sqrt{L(D_c)^2+L(D_s)^2},
\]

is a valid holonomy-dependence test but is not by itself an orientation test.

The smallest escape depends on the requested output:

- one CP/T-even charged-matter observable can distinguish $h=0$ from the pair $\{1,2\}$;
- one oriented CP/T-odd local expectation value can distinguish $h=1$ from $h=2$;
- a positive symmetric two-probe response needs one even and one odd probe, so their cross covariance supplies the odd direction.

An apparatus orientation can supply that odd probe without supplying the A5 family selector. It permits an operational measurement; it does not explain why nature selected a particular internal family or chiral orientation.

## 1. Everyday picture

Mark an arrow around a circular railway. A clockwise and anticlockwise phase twist have the same standing-wave energies when the railway respects time reversal. An ordinary thermometer therefore reads them identically.

A current meter with its positive direction painted along the arrow does distinguish them: the two equilibrium currents have opposite signs. The meter has not proved that the railway chose clockwise as metaphysically preferred. It has supplied an oriented convention against which clockwise and anticlockwise can be compared.

That distinction is the entire result:

\[
\text{reading an orientation}
\ne
\text{dynamically selecting an orientation}.
\]

## 2. Conjugate-sector response theorem

Let $\Theta$ be a unitary or antiunitary involution satisfying

\[
\Theta H_h\Theta^{-1}=H_{-h},
\qquad
\Theta\rho_h\Theta^{-1}=\rho_{-h}.
\]

Let a vector of Hermitian probes transform by a fixed real orthogonal matrix $R$:

\[
\Theta O_a(h)\Theta^{-1}
=\sum_bR_{ab}O_b(-h).
\]

For the real symmetrized covariance response

\[
C_{h,ab}
={1\over2}\operatorname{Tr}
\rho_h\{\Delta O_a,\Delta O_b\},
\]

covariance of the state and trace gives

\[
\boxed{C_{-h}=R C_hR^T.}
\]

The same parity logic becomes the usual Onsager-Casimir transpose relation for dynamical linear response. The present theorem is stated for a real symmetric Gram response because that is the object used by the A11 protocol.

### Same-parity no-go

If all retained probes are even, $R=I$. If all are odd, $R=-I$. In both cases

\[
R C_hR^T=C_h,
\]

and therefore

\[
\boxed{C_1=C_2.}
\]

This includes a subtle but important point. A single odd observable may have an odd one-point function,

\[
\langle J\rangle_1=-\langle J\rangle_2,
\]

but its autocorrelation contains the parity twice and is even. A one-probe positive response cannot retain the sign.

### Mixed-parity escape

For one even probe $K$ and one odd probe $J$,

\[
R=\operatorname{diag}(1,-1),
\]

so

\[
C_2=
\begin{pmatrix}
C_{KK}&-C_{KJ}\\
-C_{KJ}&C_{JJ}
\end{pmatrix}_{h=1}.
\]

The diagonal autocovariances remain degenerate. The mixed covariance is the minimal odd component. Positivity is not threatened because changing the sign of the off-diagonal entry is an orthogonal congruence and preserves eigenvalues and determinant.

## 3. Exact $Z_3$ harmonic split

Using $θ_h=2πh/3$, the cosine and sine contrasts reduce algebraically to

\[
D_c={2\over3}\sum_h\cos\theta_h C_h
={2C_0-C_1-C_2\over3},
\]

\[
D_s={2\over3}\sum_h\sin\theta_h C_h
={C_1-C_2\over\sqrt3}.
\]

Under sector conjugation:

- $D_c$ is even;
- $D_s$ is odd;
- exact same-parity CP/T symmetry forces $D_s=0$, not $D_c=0$.

This gives a necessary reporting correction for A11. Keep the omnibus statistic for discovery, but report separately

\[
A_{\rm even}={|L(D_c)|\over S},
\qquad
A_{\rm orient}={|L(D_s)|\over S}.
\]

A result with $A_{\rm even}>0$ and $A_{\rm orient}=0$ is a genuine holonomy-sensitive response. It does not show that all three sectors are individually readable and does not provide an orientation selector.

## 4. Locality boundary

Document 1227 proved that a strictly local gauge-invariant polynomial of flat field strengths cannot read any of the three holonomies. The present result does not evade that theorem by algebraic trickery.

A local charged field on a multiply connected space is governed by a globally twisted state or spectrum. Its local energy or current density can consequently depend on holonomy. Once that charged field is integrated out, the dependence is a winding contribution to the effective action: it is global, nonlocal and normally suppressed with gap times cycle length.

Thus:

\[
\text{local measured density}
\quad\text{can read}\quad
\text{global holonomy-dependent state},
\]

while

\[
\text{pure local curvature expansion}
\quad\text{cannot read}\quad
\text{flat holonomy}.
\]

## 5. Finite three-site counterexample

Take one charged particle on an oriented three-site ring with hopping $t=1$, positive energy offset $m=3$, inverse temperature $β=1$, and flux

\[
\Phi_h={2\pi h\over3}.
\]

The local Hamiltonian is

\[
H_h=mI-t\sum_{j=0}^2
\left(e^{i\Phi_h/3}|j+1\rangle\langle j|+\mathrm{h.c.}\right).
\]

Complex conjugation gives

\[
H_h^*=H_{-h}.
\]

On one declared oriented bond define

\[
K_0=-t\left(e^{i\Phi_h/3}|1\rangle\langle0|+\mathrm{h.c.}\right),
\]

\[
J_0=it\left(e^{i\Phi_h/3}|1\rangle\langle0|-\mathrm{h.c.}\right).
\]

Then $K_0$ is even and $J_0$ is odd under conjugation plus $h\mapsto-h$. The verifier constructs the exact thermal density matrix and the symmetrized covariance Gram of $(K_0,J_0)$.

It verifies:

1. sectors (1) and (2) are isospectral;
2. every even thermodynamic scalar agrees between them;
3. the local current expectations are equal and opposite;
4. the response diagonals agree while the cross covariance reverses sign;
5. all three response matrices are positive;
6. the three matrices span the full three-dimensional real symmetric $2\times2$ space;
7. deleting the odd coordinate restores the conjugate-sector degeneracy.

This is an explicit counterexample to the overly strong claim that local observables can never distinguish conjugate flat sectors. The correct statement is that a local **same-parity** response cannot distinguish them when the conjugating symmetry is exact. An oriented odd local observable can read the globally prepared holonomy.

## 6. Does this import A5 by hand?

Not necessarily—but it also does not solve A5.

An oriented current probe may be defined by an independently recorded loop direction, wall normal, source ordering or laboratory handedness. Under reversal, both the probe orientation and reported sign transform. This is a covariant measurement datum, not a claim that the internal family space selected a preferred line.

It becomes circular only if the programme identifies that external arrow with the missing A5 family/chiral selector without deriving a coupling between them.

The honest ledger is:

| Datum | Separates (1,2)? | Selects A5 family orientation? |
|---|---:|---:|
| CP/T-even energy or stress autocorrelation | No | No |
| oriented CP/T-odd current expectation | Yes | No |
| even-odd cross response | Yes | No |
| explicit CP/T-odd coefficient | Yes | No, unless its family action is derived |
| anomaly or boundary orientation coupled covariantly to family data | Potentially | Only after the complete A5 audit |

## 7. Strongest no-go and escape theorem

The strongest justified no-go is:

> In a pure flat BF sector with no charged winding reader, or in a charged completion with exact conjugating symmetry and a probe space of one common symmetry parity, the real symmetrized local response satisfies $C_1=C_2$. No amount of sampling can turn its sine harmonic on.

The minimal escape is:

> Supply one independently sourced orientation-odd local expectation value, or—inside a positive response matrix—one even probe, one odd probe and their cross response. This distinguishes the conjugate sectors while preserving a CP/T-symmetric microscopic law because the prepared holonomy and oriented probe transform together.

The stronger claim that the theory dynamically chooses one orientation still requires CP/T breaking, an anomaly, oriented boundary/history data, or spontaneous breaking plus a recorded domain. Those are physical inputs to derive, not consequences of the abstract $Z_3$ label.

## 8. Protocol decisions

### Even-sector advance

If $A_{\rm even}$ passes while $A_{\rm orient}$ is null, record a holonomy-sensitive response beyond pure BF locality. Do not call it an orientation result.

### Oriented-sector advance

If a preregistered opposite-parity probe pair gives nonzero $A_{\rm orient}$, require:

- fixed and hashed orientation provenance;
- reversal of the loop/probe orientation, which must reverse $D_s$;
- unchanged $D_c$ under that reversal;
- CP/T-conjugate control preparation;
- the positivity, calibration, contact and power gates of documents 1222 and 1225.

### Stop

If only same-parity probes are physically available and CP/T is exact, the oriented A11 sub-branch is closed. The even A11 branch remains testable.

## 9. Exact, model-dependent and speculative boundary

### Exact

- $C_{-h}=RC_hR^T$ under the declared covariance hypotheses.
- Same-parity probes force $C_1=C_2$.
- $D_s=(C_1-C_2)/\sqrt3$ is the orientation-sensitive harmonic.
- $D_c$ can be nonzero without orientation breaking.
- Mixed-parity Gram responses preserve positivity while their cross term changes sign.

### Model-dependent

- The finite ring realizes the escape with a local bond current.
- A gapped unit-charged defect mode could realize it in the Spin(2,3) programme if its localization, anomaly cancellation, gap and probe coupling are derived.

### Speculative

- Defect orientation, a parity anomaly, a flavour CP invariant or cosmological history could supply the oriented datum.
- Any identification of that datum with A5 remains speculative until one action derives the coupling.

Physical admission remains false.

## Literature boundary

The general reciprocity background is standard: [Onsager 1931](https://doi.org/10.1103/PhysRev.37.405) established microscopic-reversibility relations, and [Casimir 1945](https://doi.org/10.1103/RevModPhys.17.343) supplied the time-reversal-parity and reversed-field refinement. The flux-even spectral / flux-odd persistent-current pattern is standard mesoscopic-ring physics; see [Akkermans et al. 1991](https://doi.org/10.1103/PhysRevLett.66.76).

The contribution here is the exact application to the programme's three $Z_3$ sectors, the separation of the A11 cosine and sine claims, and the anti-circularity boundary with A5. It is not a claim to have discovered Onsager-Casimir reciprocity or persistent current.
