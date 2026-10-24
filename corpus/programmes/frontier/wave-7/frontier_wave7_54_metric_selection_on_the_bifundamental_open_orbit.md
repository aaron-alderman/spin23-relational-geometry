# Frontier Wave 7.54: Metric Selection on the Bifundamental Open Orbit

**Date:** 24 October 2026  
**Status:** exact orbit--stabilizer result; physical endpoint identification remains open  
**Ledger:** [metric-selected orbit](metric_selected_bifundamental_orbit_v1.json)  
**Certificate:** [orbit and metric verifier](../../../../verification/verify/verify_metric_selected_bifundamental_orbit.mjs)

## Result

The bifundamental retyping exposes where admissibility first becomes physical.
For the complex action

\[
SL_3(\mathbb C)\times SL_2(\mathbb C)
\curvearrowright
\operatorname{Hom}(\mathbb C^2,\mathbb C^3),
\qquad K\mapsto g_3Kg_2^{-1},
\]

all rank-two maps occupy one open orbit. Bare complex symmetry therefore does
not distinguish the typed partial-sewing channel from a generic full-rank
channel.

The distinction appears only after retaining the positive Hermitian metric.
Then the spectrum of \(E^\dagger E\) is invariant under the metric-preserving
action and becomes observable response data.

## 1. Orbit and stabilizer

Put a full-rank map into the normal form

\[
K_0=\begin{pmatrix}I_2\\0\end{pmatrix}.
\]

The infinitesimal stabilizer equation

\[
YK_0=K_0X,
\qquad
Y\in\mathfrak{sl}_3,
\quad X\in\mathfrak{sl}_2
\]

has the solutions

\[
Y=\begin{pmatrix}X&b\\0&0\end{pmatrix},
\qquad b\in\mathbb C^2.
\]

Hence the stabilizer is

\[
\mathfrak{sl}_2\ltimes\mathbb C^2
\]

of dimension five. Since

\[
\dim(\mathfrak{sl}_3\oplus\mathfrak{sl}_2)=11,
\]

the orbit has dimension \(11-5=6\), equal to the full bifundamental module.
The rank-two locus is therefore open.

This is spontaneous selection in a precise limited sense: choosing \(E\)
reduces the endpoint symmetry to its five-dimensional stabilizer. It is not
yet a dynamical account of why that choice occurs.

## 2. The positive metric restores distinctions

For the rational checkpoint,

\[
E^\dagger E=
\begin{pmatrix}
1&3/13\\
3/13&1
\end{pmatrix},
\]

so

\[
\operatorname{spec}(E^\dagger E)
=\left\{\frac{16}{13},\frac{10}{13}\right\},
\qquad
\det(E^\dagger E)=\frac{160}{169}.
\]

These values are not invariants of the full complex \(SL_3\times SL_2\)
orbit. They are invariants under left and right unitary changes of basis.
Equivalently, the positive dagger structure reduces the available
transformations and makes the singular values measurable.

## 3. Admissibility interpretation

The chain now has four distinct layers:

\[
\text{complex carrier}
\supset
\text{open full-rank orbit}
\supset
\text{metric-positive orbit class}
\supset
\text{dynamically selected channel}.
\]

- Complex rank decides whether a channel can connect both source directions.
- The positive metric decides which transformations preserve physical norms.
- The Gram spectrum records the surviving response distinction.
- Dynamics, boundary data or preparation must select one admissible point.

This is the exact place where “admissibility as an optimization problem” can
be stated without metaphor: an action or variational principle must optimize
over the metric-positive channel space, not over the undifferentiated complex
orbit.

## 4. Consequence for the larger programme

The algebra alone can explain the available motions and the residual
stabilizer. It cannot explain the measured Gram spectrum, because the full
complex group changes it. Any proposed unification that omits the dagger,
positive cone, passivity condition or equivalent real-form datum loses the
very quantities that distinguish the physical channel.

The next admissible mechanism must therefore provide all three:

1. the two cross-carrier endpoint identifications;
2. a positive metric or passive inner completion compatible with them; and
3. a functional whose stationary or stable point fixes the Gram spectrum.

## Verdict

\[
\boxed{
\text{Lie symmetry supplies the open orbit};\quad
\text{positivity supplies the invariants};\quad
\text{dynamics must supply the selection}.
}
\]

That division is sharper than treating symmetry breaking, Wick rotation,
kenosis and measurement as one event. They occupy successive mathematical
roles in the same channel.

[Wave 7.55](frontier_wave7_55_channel_selector_atlas_and_entropy_guardrail.md)
shows that positivity supplies a feasible Gram disk but does not choose which
optimization principle acts on it: volume, entropy and minimum dilation rank
select different points or strata.

## Boundary

An open group orbit is not evidence that nature realizes the group as a
fundamental symmetry. The stabilizer statement is conditional on the endpoint
actions, and the physical carrier identifications remain unproved.
