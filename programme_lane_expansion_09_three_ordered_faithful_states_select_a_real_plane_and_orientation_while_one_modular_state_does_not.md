# Lane Expansion 09: Three Ordered Faithful States Select a Real Plane and Orientation, While One Modular State Does Not

**Date:** 17 October 2026  
**Lane:** L7, modular and operator-algebraic reconstruction  
**Claim status:** exact finite (M_2(\mathbb C)) classification and conditional physical bridge; not yet a local-QFT modular reconstruction  
**Certificate:** [verify_programme_modular_state_frame_selection.mjs](scripts/verify_programme_modular_state_frame_selection.mjs)

## Result in ordinary language

A state is a reproducible preparation of a system: the analogue of setting a compass needle or loading a spring before measuring it. One preparation can mark an axis, but it cannot mark which direction around that axis should count as “real.” A second, non-aligned preparation fixes a plane. A third preparation outside that plane distinguishes the two possible handednesses.

This gives a precise finite answer to the lane's first question:

\[
\boxed{\text{algebra alone: no real-plane selector}}
\]

\[
\boxed{\text{one faithful state: modular scale, but still no }H_2(\mathbb R)\text{ selector}}
\]

\[
\boxed{\text{ordered noncommuting pair: a real plane; ordered noncoplanar triple: an orientation}.}
\]

The word **faithful** means that the preparation assigns nonzero weight to every possible direction; for a two-level system its density matrix has two strictly positive eigenvalues. The word **modular** refers here to the canonical flow obtained when an algebra is considered together with such a state.

## 1. Why one modular state is insufficient

Use the finite standard representation

\[
\mathcal H=M_2(\mathbb C),\qquad A=M_2(\mathbb C)
\]

with (A) acting by left multiplication. A faithful density matrix (\rho) supplies the cyclic and separating vector (\Omega=\rho^{1/2}). Its modular operator and modular conjugation act as

\[
\Delta_\rho(X)=\rho X\rho^{-1},\qquad J(X)=X^\dagger.
\]

If (\rho=\operatorname{diag}(p,q)), then the four matrix units have modular weights

\[
1,\quad p/q,\quad q/p,\quad 1.
\]

For (p\ne q), the fixed algebra of the modular flow is only the two-dimensional complex algebra commuting with (\rho). If (p=q), the flow is trivial and fixes all of (M_2(\mathbb C)). Neither case selects the programme's three-real-dimensional space (H_2(\mathbb R)).

There is a second mismatch. (J(X)=X^\dagger) fixes **all Hermitian matrices**, a four-real-dimensional space spanned by

\[
I,\sigma_x,\sigma_y,\sigma_z.
\]

The real-symmetric plane (H_2(\mathbb R)) excludes (\sigma_y) and has dimension three. Thus modular conjugation is not the same object as entrywise complex conjugation in a specially selected basis. Conflating the two would falsely manufacture the desired selector.

## 2. Two states select the missing plane

Every faithful two-level state can be written

\[
\rho_a=\frac12(I+\mathbf r_a\cdot\boldsymbol\sigma),\qquad |\mathbf r_a|<1.
\]

The three real numbers in (\mathbf r_a) can be pictured as an arrow inside a ball. A unitary basis change rotates every arrow by the same proper three-dimensional rotation.

An ordered pair (\rho_0,\rho_1) with nonparallel arrows supplies a canonical frame:

\[
\mathbf e_z=\frac{\mathbf r_0}{|\mathbf r_0|},
\]

\[
\mathbf e_x=
\frac{\mathbf r_1-(\mathbf r_1\cdot\mathbf e_z)\mathbf e_z}
{|\mathbf r_1-(\mathbf r_1\cdot\mathbf e_z)\mathbf e_z|},
\qquad
\mathbf e_y=\mathbf e_z\times\mathbf e_x.
\]

In that basis both (\rho_0) and (\rho_1) have no (\sigma_y) component and (\rho_1) has positive (\sigma_x) component. Entrywise conjugation in this basis fixes exactly (H_2(\mathbb R)).

The construction fails when the first state is maximally mixed or the two arrows are parallel. That is useful rather than embarrassing: it identifies the exact degeneracy at which the physical preparation cannot select a real plane.

## 3. A third state selects handedness

For a third ordered preparation define

\[
\tau=\mathbf r_0\cdot(\mathbf r_1\times\mathbf r_2).
\]

This is the signed volume of the parallelepiped drawn by the three arrows. It is unchanged by a common unitary basis change. It changes sign under complex conjugation, whose action on the arrows is the reflection

\[
(x,y,z)\mapsto(x,-y,z).
\]

Therefore (\operatorname{sgn}\tau) is an orientation bit whenever (\tau\ne0). If the three states are coplanar, (\tau=0) and no handedness has been supplied.

This is a close mathematical match to the programme's repeated pattern:

\[
\text{two channels determine a plane, while an extra physical datum is needed to orient it}.
\]

## 4. What this does and does not establish

The calculation establishes that **algebra plus a sufficiently rich ordered family of states** can select exactly the kind of real structure and orientation that the bare algebra leaves free. It also explains why a single KMS or vacuum state was too optimistic.

It does not show that the Standard Model naturally provides these three states, that their order is canonical, or that their orientation agrees with the Spin(2,3) topology assignment. It is invariant under unitary changes of the two-level Hilbert-space basis, not under the full (GL_2(\mathbb R)) congruence freedom of an uncalibrated response apparatus. Connecting those equivalence groups is a remaining bridge.

The third state is not necessarily a third fundamental source. It may be a third controlled preparation, temperature, defect setting or response matrix measured using the same apparatus.

## 5. Cross-lane consequence

Lane L1 found that one positive response matrix has no calibration invariant, while a pair has a generalized spectrum and a third response can expose noncommutativity and orientation. The modular calculation supplies a geometric explanation:

- the first preparation supplies a scale/axis;
- the second removes the residual rotation and selects a real plane;
- the third tests which side of that plane the family occupies.

This is a genuine synthesis between measurement-first and operator-algebraic reconstruction, though still at finite two-level scale.

## 6. Landscape and closure ledgers

### Landscape value

- classifies exactly why one modular state cannot select (H_2(\mathbb R));
- separates modular adjunction (X\mapsto X^\dagger) from basis conjugation;
- gives a minimal state-family construction of a real plane and orientation;
- links the modular lane to the measurement-first response hierarchy.

### Closure value

Conditional only. Closure requires a physical protocol that canonically orders the state family, maps it to Standard-Model operators and identifies (\operatorname{sgn}\tau) with the existing topology orientation without an adjustable convention.

## 7. Concrete continuation and experiment

Prepare three faithful (2\times2) response or density matrices using the same calibrated apparatus. After the permitted normalization, reconstruct their Bloch arrows and evaluate (\tau).

Then perform a declared physical reversal—wall normal, flux, CP-conjugate preparation or defect orientation—and test:

1. proper unitary recalibration leaves (\tau) unchanged;
2. the declared reversal flips (\tau);
3. the topology-first orientation witness flips in the same trials;
4. the sign relation survives continuous changes that do not pass through (\tau=0).

**Go signal:** a physically specified ordered family gives a stable (\tau\) sign that agrees with the independent topology orientation.

**No-go signal:** only one state is physically distinguished; all available families are coplanar; the ordering is conventional; or an allowed recalibration changes the sign.

## Primary literature boundary

- [Sorce, a short proof of the Tomita-Takesaki theorem](https://arxiv.org/abs/2309.16762)
- [Uhlmann, antilinearity in finite-dimensional operator theory](https://arxiv.org/abs/1507.06545)

These references delimit the modular machinery. The ordered-state frame and its proposed use in this programme are the present finite construction, not a result attributed to those papers.

## Reproducibility

```powershell
node scripts\verify_programme_modular_state_frame_selection.mjs
```
