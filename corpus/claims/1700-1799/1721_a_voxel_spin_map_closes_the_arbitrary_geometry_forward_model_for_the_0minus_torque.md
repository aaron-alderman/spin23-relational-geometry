# A Voxel Spin Map Closes the Arbitrary-Geometry Forward Model for the 0-Minus Torque

**Date:** 23 October 2026

**Status:** executable rigid-polarization finite-geometry response; experimental maps and backgrounds remain external

**Depends on:** [the dual-orientation observable](1719_a_dual_orientation_polarized_electron_experiment_separates_the_0minus_mass_from_its_unknown_matching.md) and [the exact spherical benchmark](1720_uniform_polarized_spheres_preserve_the_coupling_free_0minus_mass_estimator_exactly.md)

**Evidence:** [point-voxel witness](../../../evidence/data/spin23-polarized-geometry-point-witness-v1.json), [forward solver](../../../verification/analyze/analyze_spin23_polarized_geometry_response.mjs), and [verifier](../../../verification/verify/verify_spin23_polarized_geometry_response.mjs)

## Result

The finite-geometry forward problem is now executable for arbitrary separated
voxel maps with rigid source and detector polarization directions.  For voxel
positions \(\mathbf x_a,\mathbf y_b\) and polarized electron counts
\(n_a,n_b\), the solver constructs

\[
G_{ij}(m)=\sum_{a,b}n_an_b\,
\partial_i\partial_jY_m(|\mathbf y_b-\mathbf x_a|).
\]

For unit polarization directions \(\mathbf u\) and \(\mathbf v\),

\[
U=f_e^2u_iG_{ij}v_j
={y_e^2\over4m_e^2}u_iG_{ij}v_j.
\]

The full symmetric \(3\times3\) response tensor is more useful than a single
potential value: it generates every rigid orientation scan, its angular
derivatives generate torque templates, and its eigenvectors identify the
maximal and null response axes.

## Kernel and units

For each separated pair, with \(x=mr\),

\[
\partial_i\partial_jY_m(r)
={e^{-x}\over4\pi}\left[
-\left({m\over r^2}+{1\over r^3}\right)\delta_{ij}
+\left({m^2\over r}+{3m\over r^2}+{3\over r^3}\right)
\hat r_i\hat r_j
\right].
\]

The implementation converts metres to GeV\(^{-1}\), returns \(G_{ij}\) in
GeV\(^3\), and also returns the energy tensor in joules per \(y_e^2\).
Coincident voxels are rejected because the separated-body kernel does not
define the contact interaction there.

## Point witness

The supplied input contains one \(10^{24}\)-electron voxel in each body,
separated by \(10\) cm, with \(m_\varphi=1.973269804\,\mu\)eV.  Hence
\(x=1\).  The solver reproduces

\[
-{G_{zz}\over G_{xx}}={5\over2}
\]

and the claim-1719 threshold

\[
y_{e,\min}=1.2037943\times10^{-10}
\]

for a \(10^{-21}\) N m resolved transverse torque.

The exact uniform-sphere result of claim 1720 supplies the nontrivial
finite-volume normalization test for future voxel refinements.

## Boundary of what is now missing

No further particle-theory derivation is required to produce a likelihood
template.  The remaining inputs are empirical:

1. voxelized polarized-electron counts or calibrated spin-density maps;
2. the modulation axis and angular time series;
3. separation and alignment uncertainties;
4. torque or magnetometer noise; and
5. magnetic-background templates.

Once supplied, the solver produces the exotic response for every mediator
mass.  UV matching is needed only to turn the resulting exclusion or
measurement in \((m_\varphi,y_e)\) into separate constraints on
\((c_e,A,B)\).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_polarized_geometry_response.mjs
node verification/analyze/analyze_spin23_polarized_geometry_response.mjs evidence/data/spin23-polarized-geometry-point-witness-v1.json
~~~
