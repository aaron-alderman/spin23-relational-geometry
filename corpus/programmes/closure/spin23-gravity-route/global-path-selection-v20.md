# Spin(2,3) Global Path Selection v20: Both Spin-Two Escapes Are Non-Identifiable

**Frozen:** 23 October 2026

Both explicit healthy escapes from the finite local spin-two pole problem have
now been matched back to local curvature data.  Neither inverse problem is
unique, and neither contains the axial vertex.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| EN | Zero-free entire completion | completed | infinitely many functions share the pole count and \(p^4\) coefficient |
| BM | Positive-residue bimetric completion | completed | fixed local coefficient determines only \(\tan^2\theta/m_2^2\) |
| CS | Curvature data select the UV parent | rejected as selector | both inverse maps have continuous degeneracies |
| AS | Spin-two parent selects \(1/8\) | rejected as selector | axial vertex is absent from both matching equations |
| NQ | Complete enlarged quantum parent | externally blocked | parent principle, nonlinear consistency, positivity, flow and matching absent |
| SV | Stabilized torsional compactification | externally blocked | microscopic vacuum data absent |

The spin-two problem admits healthy enlarged solutions, but the low-energy
packet cannot choose among them or determine the torsion-fermion coefficient.
Further progress requires a parent principle with genuinely cross-sector Ward
relations, or the independent stabilized compactification construction.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_entire_completion_matching_degeneracy.mjs
node verification/verify/verify_spin23_bimetric_matching_degeneracy.mjs
node verification/verify/verify_spin23_new_model_path_selection_v8.mjs
~~~
