# Stress–Energy to the Jordan Carrier: The Reduction Gate

**Date:** 16 October 2026  
**Status:** exact tensor bookkeeping plus candidate physical bridges; no completed dynamics claimed

---

## 1. The mismatch that must be solved

The algebraic result uses

\[
J=H_2(\mathbb R)=\operatorname{Sym}_2(\mathbb R),
\qquad \dim_{\mathbb R}J=3.
\]

A four-dimensional stress–energy tensor is

\[
T_{\mu\nu}=T_{\nu\mu},
\qquad \dim\operatorname{Sym}^2(\mathbb R^{1,3})=10.
\]

There is therefore no canonical identification

\[
T_{\mu\nu}\stackrel?=X\in H_2(\mathbb R).
\]

The dimensions, transformation laws and tensor ranks differ. Any claim that the two outer entries in \(AXB\) are “stress–energy components” must specify a reduction map.

---

## 2. What (H_2(\mathbb C)) and (H_2(\mathbb R)) encode

The Pauli map sends a four-vector to a Hermitian matrix:

\[
v^\mu=(v^0,v^1,v^2,v^3)
\longmapsto
V=v^0I+v^1\sigma_1+v^2\sigma_2+v^3\sigma_3
\in H_2(\mathbb C),
\]

with

\[
\det V=(v^0)^2-(v^1)^2-(v^2)^2-(v^3)^2.
\]

Entrywise conjugation fixes \(v^2=0\), leaving

\[
V_\parallel=v^0I+v^1\sigma_1+v^3\sigma_3
\in H_2(\mathbb R).
\]

Geometrically, this is the Lorentzian hyperplane orthogonal to a selected spacelike direction \(n^\mu\). In a frame where \(n\) is the second spatial axis,

\[
n_\mu v^\mu=0
\quad\Longleftrightarrow\quad
v^2=0.
\]

Thus the real-structure descent has an immediate spacetime meaning:

\[
\boxed{
H_2(\mathbb R)\text{ encodes tangent vectors to a selected }2+1
\text{ Lorentzian hyperplane.}
}
\]

This interpretation is intrinsic only when the normal \(n^\mu\), or an equivalent anti-linear involution, is physically selected.

---

## 3. Why simple projection of (T_{mu\nu}) is still too large

Let \(n\) be a non-null spacelike normal and define the convention-independent projector

\[
h^\mu{}_{\nu}
=\delta^\mu{}_{\nu}
-\frac{n^\mu n_\nu}{n^\rho n_\rho}.
\]

The tangential stress tensor is

\[
T^\parallel_{ab}
=h^\mu{}_a h^\nu{}_bT_{\mu\nu}.
\]

It is a symmetric tensor on a three-dimensional Lorentzian space and therefore has six independent components. It still is not one element of the three-dimensional Jordan carrier.

This eliminates a tempting but incorrect shortcut:

\[
\boxed{
\text{hypersurface projection alone does not map }T_{\mu\nu}
\text{ into }H_2(\mathbb R).
}
\]

---

## 4. The minimal current construction

A symmetric stress tensor becomes a vector after contraction with a vector field \(u^\nu\):

\[
j_\mu(u)=T_{\mu\nu}u^\nu.
\]

Project this current into the selected hyperplane:

\[
j^\parallel_\mu(u)
=h^\rho{}_{\mu}T_{\rho\nu}u^\nu.
\]

The projected current has three independent components and can be encoded by the Pauli map as

\[
\Pi_{n,u}(T)
=j^0I+j^1\sigma_1+j^3\sigma_3
\in H_2(\mathbb R)
\]

in an adapted frame. Therefore a mathematically honest candidate bridge is

\[
\boxed{
\Pi_{n,u}:\operatorname{Sym}^2(T^*M)
\longrightarrow H_2(\mathbb R),
\qquad
T\mapsto\operatorname{Pauli}_{\mathbb R}
\big(h\cdot T\cdot u\big).
}
\]

It requires two pieces of selection data:

1. a spacelike normal or real structure \(n\), selecting the \(2+1\) carrier;
2. a timelike observer, flow, or eigenvector \(u\), converting stress into an energy–momentum current.

This is the minimum tensorial content hidden by the phrase “stress component.”

---

## 5. Can (u) be derived rather than imposed?

For suitable stress tensors, a Landau energy frame chooses \(u\) as a future-timelike eigenvector:

\[
T^\mu{}_{\nu}u^\nu=\rho u^\mu.
\]

Then \(u\) is determined by \(T\), up to normalization and degeneracies. This changes the bridge to

\[
\Pi_n(T)=\operatorname{Pauli}_{\mathbb R}
\big(h\cdot T\cdot u(T)\big).
\]

Advantages:

- it removes an arbitrary observer from generic type-I matter;
- it ties the Jordan element to the local energy flow;
- positivity or a dominant-energy condition can place the resulting vector in a Lorentz cone.

Limitations:

- not every quantum or classical stress tensor has a unique timelike eigenvector;
- degeneracy makes the map non-smooth or multivalued;
- expectation values and operator-valued stress tensors require different treatments;
- the spacelike selector \(n\) remains unexplained;
- for an exact eigenvector, \(T\cdot u=\rho u\), so the current may discard shear and anisotropic stress information.

The Landau construction is therefore a viable reduction, not yet the unique one.

---

## 6. The spinor form exposes the missing contraction

In \(3+1\) dimensions a real vector is a bispinor \(v^{AA'}\), matching \(H_2(\mathbb C)\). A symmetric stress tensor is schematically

\[
T^{AA'BB'}.
\]

To obtain one bispinor, an index pair must be contracted:

\[
j^{AA'}=T^{AA'BB'}u_{BB'}.
\]

To obtain a real symmetric two-spinor appropriate to \(2+1\) dimensions, one must additionally impose the real structure associated with the chosen normal. The matrix reduction above is therefore not an artifact of notation: spinor index counting demands the same two operations.

This gives the clean answer to the remembered nesting:

> (A) and (B) cannot be unrestricted stress tensors. They can be Jordan-carrier images of stress-derived currents after a specified contraction and real-structure projection.

---

## 7. The resulting Jordan triple

Given three stress configurations or channels, define

\[
A=\Pi_{n,u_A}(T_A),
\qquad
X=\Pi_{n,u_X}(T_X),
\qquad
B=\Pi_{n,u_B}(T_B),
\]

with \(A,X,B\in H_2(\mathbb R)\). Then

\[
\{A,X,B\}=AXB+BXA
\in H_2(\mathbb R).
\]

Algebraic closure is automatic once the images lie in \(H_2(\mathbb R)\). Physical closure is not. To claim that the output is another admissible stress-derived current, one needs

\[
\{\Pi(T_A),\Pi(T_X),\Pi(T_B)\}
\in\operatorname{im}\Pi.
\]

This is stronger than closure in the ambient Jordan algebra. It is the first direct falsification test for the stress–energy interpretation.

---

## 8. Positivity and the cone

For

\[
J=j^0I+j^1\sigma_1+j^3\sigma_3,
\]

Jordan positivity is equivalent to

\[
j^0\ge0,
\qquad
(j^0)^2-(j^1)^2-(j^3)^2\ge0.
\]

Thus a future-causal projected energy current lies in the positive cone of \(H_2(\mathbb R)\). This is a genuine physical point of contact: suitable energy conditions can become Jordan positivity.

But the logical direction matters:

\[
\text{dominant energy condition}
\Longrightarrow
j(T,u)\text{ causal for timelike }u,
\]

while a generic quantum stress tensor can violate pointwise energy conditions. A quantum formulation may require averaged energy conditions, state-dependent cones, or an operator-order interpretation.

---

## 9. Avoiding circularity

If \(T_{\mu\nu}\) is derived from an action and the Jordan recursion is then used to generate that same action, the programme risks a closed definition with no independent content.

Three non-circular architectures are possible.

### 9.1 Response-first

Take \(J\) as a primitive local response algebra. Derive an effective action and then show that its Hilbert stress tensor projects back into \(J\). The required condition is a fixed point:

\[
J
\xrightarrow{\text{dynamics}}
S[J]
\xrightarrow{\delta/\delta g}
T[J]
\xrightarrow{\Pi}
J',
\qquad J'=J
\]

in the appropriate structural sense.

### 9.2 Matter-first

Start with independently defined Standard-Model/Furey matter, compute \(T\), and test whether \(\Pi(T)\) exhibits the Jordan triple closure. Failure is informative and does not destabilize the matter theory.

### 9.3 Geometry-first

Derive \(H_2(\mathbb R)\) from causal or boundary geometry, then treat stress-derived currents as representations of the carrier rather than its origin.

The second route is the cleanest initial test; the first is the strongest eventual synthesis.

---

## 10. What could select the normal (n)?

The remaining codimension-one selector can arise from several open branches:

1. **Physical boundary:** \(n\) is the boundary normal; \(Spin(2,3)\) is the boundary conformal group.
2. **Dynamical order parameter:** \(n\) is a vacuum field whose stabilizer is the reduced group.
3. **Stress eigenstructure:** \(n\) is a distinguished spacelike eigenvector of anisotropic stress.
4. **Causal screen or foliation:** \(n\) is determined by an observer-independent screen construction.
5. **Internal/external locking:** the Furey-sector real structure selects a matching external involution.
6. **Discrete microstructure:** a lattice or code retains only a real Jordan slice in the continuum limit.

Each branch must answer covariance. A fixed coordinate axis is not a physical selector.

---

## 11. Stop-everything tests

### Positive

Stop and reorganize the programme if a naturally computed Standard-Model or Furey stress tensor supplies both \(u\) and \(n\), and its projected currents are closed under the Jordan triple with no fitted projection.

An equally strong result would be an action whose order parameter breaks \(Spin_0(2,4)\) to \(Spin_0(2,3)\) and whose stress current is exactly the corresponding \(H_2(\mathbb R)\) carrier.

### Negative

Demote the stress interpretation if:

- \(\Pi\) requires arbitrary frame choices;
- its image is not triple-closed;
- it discards all physically relevant anisotropic information;
- positivity fails generically in the intended quantum regime;
- different reasonable choices of \(u\) or \(n\) yield inequivalent dynamics with no selection rule.

In that case, retain the Jordan–\(Sp(4)\) bridge as observable or phase-space mathematics rather than stress–energy ontology.

---

## 12. Current verdict

The phrase “(A) and (B) are stress–energy components” can now be made tensorially meaningful, but only in the qualified form

\[
\boxed{
A=\Pi_{n,u_A}(T_A),
\qquad
B=\Pi_{n,u_B}(T_B),
}
\]

where \(\Pi\) contracts each stress tensor to an energy–momentum current and projects it through an intrinsic \(2+1\) real structure. The Jordan triple then closes algebraically:

\[
\{A,X,B\}=AXB+BXA.
\]

What remains to be shown is that the selected currents form the image of a covariant physical reduction, that this image is dynamically triple-closed, and that the selector \(n\) is produced rather than chosen.

This is narrower than the original intuition, but it is now a calculable research programme.

## Companion documents

- [The Standard Model as stress–energy: full analysis](01_standard_model_as_stress_energy_full_analysis.md)
- [Determination: Jordan triple to \(Sp(4,\mathbb R)\)](42_jordan_triple_to_sp4r_determination.md)
- [Jordan selection and \(Spin(2,4)\to Spin_0(2,3)\)](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
- [Executable algebra certificate](45_jordan_sp4_executable_certificate.md)
