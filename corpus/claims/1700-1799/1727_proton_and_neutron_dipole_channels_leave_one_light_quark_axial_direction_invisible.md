# Proton and Neutron Dipole Channels Leave One Light-Quark Axial Direction Invisible

**Date:** 23 October 2026

**Status:** exact linear-algebraic consequence of a declared lattice axial-charge input

**Depends on:** [the universal benchmark match](1726_universal_light_quark_matching_suppresses_the_nucleon_torsion_portal.md)

**Evidence:** [flavor-map ledger](../../../evidence/data/spin23-nucleon-axial-flavor-map-v1.json) and [verifier](../../../verification/verify/verify_spin23_nucleon_axial_flavor_map.mjs)

## Complete light-flavor map

Using the same physical-point proton axial charges and isospin symmetry gives

\[
\begin{pmatrix}c_p\\c_n\end{pmatrix}
=
\begin{pmatrix}
0.862&-0.424&-0.0458\\
-0.424&0.862&-0.0458
\end{pmatrix}
\begin{pmatrix}c_u\\c_d\\c_s\end{pmatrix}.
\]

The physically transparent combinations are

\[
\boxed{c_p-c_n=1.286(c_u-c_d)},
\]

\[
\boxed{c_p+c_n=0.438(c_u+c_d)-0.0916c_s}.
\]

Thus proton/neutron comparison cleanly measures the isovector light-quark
direction.  The isoscalar channel mixes the \(u+d\) and strange directions.

## Structural non-identifiability

The map has rank two and the exact central-value kernel

\[
\boxed{(c_u,c_d,c_s)\ \longrightarrow\
(c_u,c_d,c_s)+\lambda(1,1,9.56332)}.
\]

Every point on that line produces identical \(c_p\) and \(c_n\).  This is not
an experimental-sensitivity problem: even perfect proton and neutron dipole
measurements cannot recover three independent light-quark coefficients.

The two nonzero singular values are 1.286 and 0.44276, with condition number
2.90 on the observable subspace.  The measurable two-dimensional map is not
badly conditioned; the problem is the exact missing third direction.

## Experimental interface

The 2025 electron-neutron point becomes the coefficient-space inequality

\[
{A\over |c_e|\,|-0.424c_u+0.862c_d-0.0458c_s|}
>8.00195\times10^5\ {\rm GeV}^2.
\]

For \(c_e=1/8\), equivalently,

\[
{A\over|-0.424c_u+0.862c_d-0.0458c_s|}
>1.00024\times10^5\ {\rm GeV}^2.
\]

An electron-proton curve would add the other row, but still not remove the
kernel.  Unique light-flavor tomography requires a third independent hadronic
observable or a theory prior such as universality, vanishing strange coupling,
or a UV-derived flavor relation.

## Implication

Hadronic matching can translate assumed quark coefficients and can identify
which combinations experiments probe.  It cannot manufacture a UV prediction.
The universal result of claim 1726 is one slice through this map, not a
deduction that nature or the Spin(2,3) parent selects that slice.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_nucleon_axial_flavor_map.mjs
~~~
