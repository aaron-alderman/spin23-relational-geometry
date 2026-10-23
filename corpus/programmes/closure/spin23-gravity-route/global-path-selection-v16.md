# Spin(2,3) Global Path Selection v16: Concrete Compactification Boundary

**Frozen:** 23 October 2026

The strongest remaining string path has been instantiated with a known
three-generation heterotic standard-embedding quotient.  Its topology
successfully fixes a discrete chiral index, but its single Kähler modulus
changes the canonical axial normalization without changing that index.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| TG | Three-generation \(E_6\) quotient | completed | \(\chi=-6\) fixes three net generations |
| KN | Kähler normalization | rejected as selector | \(N_{\rm gen}=3\) while \(\lambda_c\mapsto r^{-3}\lambda_c\) |
| PM | Universal axion equals PGT pole | rejected as selector | massless shift mode is not the independent massive \(0^-\) connection pole |
| SV | Stabilized torsional three-generation vacuum | externally blocked | no complete vacuum, normalized mixing matrix or matched spectrum supplied |
| FP | Nonperturbative fixed point | externally blocked | complete quantum packet absent |

This closes the inference available from the known compactification.  The
string branch can reopen only by constructing a new globally consistent
torsional or flux vacuum and calculating all normalization and matching data.
The field-theory branch can reopen only with the complete Spin(2,3) quantum
packet.  Neither is a remaining algebraic subtask of the present corpus.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_three_generation_heterotic_normalization.mjs
node verification/verify/verify_spin23_new_model_path_selection_v4.mjs
~~~
