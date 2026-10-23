# Spin(2,3) Global Path Selection v25: N=2 Geometry Organizes but Does Not Select

**Frozen:** 23 October 2026

The representative extended-supersymmetry branch has been instantiated with
general matter-coupled N=2 supergravity.  Supersymmetry fixes the geometric
form of couplings but leaves the target manifold, gauged isometry, coupling,
moment maps, symplectic embedding and vacuum as model data.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| N2 | General matter-coupled N=2 supergravity | completed | organizes vector, hyper and tensor sectors geometrically |
| GS | N=2 symmetry selects the canonical coefficient | rejected as selector | \(gk/\sqrt{h_{aa}}\) depends on chosen gauging and geometry |
| PI | Hypermultiplet axion equals PGT torsion | rejected as selector | extra multiplet and missing connection-mode map |
| NV | Specified N=2 Spin(2,3)-matched vacuum | externally blocked | target, gauging, vacuum, mass matrix and thresholds absent |
| NX | Higher-N or broken extended SUSY | externally blocked | complete enlarged model absent |
| HD | Higher-spin/PGT dictionary | externally blocked | normalized holographic map absent |
| SV | Stabilized torsional compactification | externally blocked | microscopic vacuum data absent |

Extended supersymmetry is therefore a framework for constructing the missing
model, not a symmetry-only derivation of one eighth.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_n2_sugra_axial_selector_audit.mjs
node verification/verify/verify_spin23_new_model_path_selection_v13.mjs
~~~
