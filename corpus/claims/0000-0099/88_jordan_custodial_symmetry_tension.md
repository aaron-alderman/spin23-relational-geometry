# Jordan Automorphisms versus Custodial Symmetry

**Date:** 17 October 2026  
**Branches:** B01, B04, B05 and B11  
**Claim status:** exact incompatibility between full right-hand custodial rotations and the determinant/trace structure of \(H_2(\mathbb R)\); accidental-sector symmetry remains possible

## 1. Coordinate form of the Jordan carrier

Write

\[
X(t,x,y)=
\begin{pmatrix}
t+x&y\\
y&t-x
\end{pmatrix}.
\]

Then

\[
\operatorname{tr}X=2t,
\qquad
\det X=t^2-x^2-y^2.
\]

The compact Jordan automorphism rotates \((x,y)\) while fixing \(t\). This is exactly the external \(SO(2)\) used by the original two-column lock.

## 2. Why the custodial enlargement is not Jordan-native

The full-carrier custodial completion treats \((t,x,y)\) as a Euclidean three-vector under a right-hand \(SO(3)_R\). But a rotation mixing \(t\) with \(x\) does not preserve either trace or determinant. For example,

\[
(t,x,y)=(1,0,0)
\quad\longmapsto\quad
(0,1,0)
\]

under a quarter-turn in the \(t\)-\(x\) plane, while

\[
\det X: 1\longmapsto-1,
\qquad
\operatorname{tr}X:2\longmapsto0.
\]

Hence

\[
\boxed{
SO(3)_R\not\subset\operatorname{Aut}H_2(\mathbb R).
}
\]

It also does not preserve the positive cone. The Jordan-native compact subgroup is only the \(SO(2)\) fixing the trace axis.

## 3. The exact tension

Two attractive requirements now pull in different directions:

\[
\begin{array}{c|c}
\text{Jordan selection}&\text{custodial electroweak repair}\\ \hline
\det=t^2-x^2-y^2&\delta_{ab}\text{ on }(t,x,y)\\
SO(2)\text{ fixes }t&SO(3)_R\text{ mixes all three axes}\\
\text{positive Lorentz cone}&\text{Euclidean right-frame isotropy}
\end{array}
\]

The custodial completion uses the vector space underlying \(H_2(\mathbb R)\), but not its full Jordan geometry.

## 4. Viable interpretations

### Accidental custodial symmetry

The locking kinetic and potential sector may possess an accidental \(SO(3)_R\) larger than the symmetry of the complete theory. Jordan-specific interactions then break it to the native \(SO(2)\). This is analogous in structure to custodial symmetry being exact only in a restricted scalar/gauge limit, but the size of the induced breaking must be computed.

### Spurionic completion

The trace axis may be assigned a spurion that formally completes an \(SO(3)_R\) multiplet. This organizes operators but does not explain the symmetry or protect the vacuum alignment.

### Non-electroweak selector

Retain the original \(SO(2)\)-native two-column lock as geometry and abandon its direct electroweak identification. Then no custodial enlargement is required.

### Larger algebra

A larger Jordan or related algebra might possess a compact automorphism group containing the required right \(SO(3)\). Such a move must rederive, rather than assume, the special \(H_2(\mathbb R)\to Spin_0(2,3)\) interface.

## 5. Falsification and reopening criteria

**Positive:** a derived action makes \(SO(3)_R\) an accidental symmetry of all custodially relevant operators, with Jordan-breaking corrections small or symmetry-controlled.

**Negative:** the determinant-dependent interactions required for the \(Spin(2,3)\) carrier necessarily generate custodial-breaking vacuum misalignment above allowed levels.

**Current result:** the full-carrier representation solves the tree-level \(\rho\) problem but does not derive custodial symmetry from the Jordan algebra.

The complete renormalizable potential now makes this tension quantitative: native symmetry permits independent trace-axis and traceless-plane masses and quartics. The resulting vacuum ratio obeys \(\rho=(w^2+k^2)/(2k^2)\), so custodial breaking enters linearly near \(w=k\).

**Unsafe shortcut:** replace the Lorentzian determinant metric by a Euclidean metric on the same three coordinates and call the transformation a Jordan automorphism.

## 6. Certificate

The [symmetry-tension certificate](../../../verification/verify/verify-jordan-custodial-symmetry-tension.mjs) verifies determinant and trace preservation under the native traceless-plane rotation and gives an explicit trace-mixing rotation that reverses the determinant sign.

## Companion documents

- [Full-Jordan-carrier custodial completion](87_full_jordan_carrier_custodial_completion.md)
- [Jordan selection and conformal descent](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
- [Locking tensor orbit geometry](79_locking_tensor_orbits_and_selector_geometry.md)
- [Positive Jordan cone](58_positive_cone_and_two_mode_selection_branch.md)
- [General Jordan-native full-lock potential](89_jordan_native_full_lock_potential.md)
- [Custodial alignment and rho sensitivity](92_custodial_alignment_rho_sensitivity.md)

