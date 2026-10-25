# Frontier Wave 7.196: Joined-Cell Z2 Sector Compiler

**Date:** 25 October 2026

**Status:** exact symmetry dictionary; block-sparse execution completed in Wave 7.197

**Evidence:** [Z2 compiler record](../../../../evidence/data/leech-joined-cell-z2-sector-compiler-v1.json)

**Executable:** [local and virtual charge compiler](../../../../scripts/compile-leech-joined-cell-z2-sectors.mjs)

**Certificate:** [basis, selection-rule and dimension verifier](../../../../verification/verify/verify_leech_joined_cell_z2_sector_compiler.mjs)

## Make inversion a conserved tensor charge

The charge basis \(|-N\rangle,\ldots,|N\rangle\) hides global inversion.
At each site use instead

\[
 |0\rangle,\qquad
 |e_n\rangle={|n\rangle+|-n\rangle\over\sqrt2},
 \qquad
 |o_n\rangle={|n\rangle-|-n\rangle\over\sqrt2}.
\]

There are \(N+1\) local even states and \(N\) local odd states. In this basis
inversion is diagonal. The charge operator \(n\) is Z2-odd, while \(n^2\)
and the cosine shift \(S^++S^-\) are Z2-even. Consequently every metric term
\(n_i(G^{-1})_{ij}n_j\) flips two local parities and conserves the global
charge exactly.

The executable verifies the basis and these (anti)commutators for cutoffs one
through eight. Maximum floating error is \(2.23\times10^{-16}\); the charge,
charge-squared, cosine and two-site selection-rule residuals are zero.

## MPO and MPS charge flow

The Wave 7.191 automaton acquires an exact virtual-charge typing:

- start and end states carry even charge;
- opening a metric channel with \(n_i\) creates an odd virtual channel;
- identity propagation retains that odd charge;
- closing with \(n_j\) returns it to even.

Before rank compression the 26 virtual states therefore split into two even
boundary states and 24 odd open-charge states. The MPS boundary charge is
fixed to zero for the even ground state and one for the odd first state. A
symmetry-aware optimizer can then target both states without adding the
unphysical global parity-penalty MPO used in reconnaissance.

At cutoff four the full \(9^{24}\) space splits exactly into even and odd
dimensions 39883221538436254931681 and 39883221538436254931680. The split
alone is only a factor two; the computational benefit comes from block-sparse
virtual tensors and exact exclusion of the wrong sector.

## Backend boundary and supersession

[Symmray](https://github.com/jcmgray/symmray) supplies Z2 block-sparse arrays,
and Quimb's [operator builder](https://quimb.readthedocs.io/en/latest/autoapi/quimb/operator/builder/index.html)
can construct sparse matrices in a declared Z2 sector. However, symmetry in
an operator builder is not automatically symmetry in MPO-DMRG; an official
[Quimb discussion](https://github.com/jcmgray/quimb/discussions/339) documents
this distinction for its U1U1 path. No verified route was found in the
installed dense DMRG interface that consumes the compiled charge maps.

Wave 7.197 instantiates these maps in a genuinely block-sparse MPS/MPO
optimizer. Three reduced exact controls through cutoff two agree below
$8\times10^{-12}$, and the 24-channel cutoff-one gap agrees with the prior
penalty-sector result to 0.0252%. Higher cutoff and bond convergence remain
open.

## Boundary

The symmetry dictionary is exact. Its former execution boundary is superseded
by Wave 7.197, but neither wave certifies the spectral gap.

## Corpus links

- [Fixed-bond sweep convergence](frontier_wave7_195_leech_joined_cell_sweep_convergence.md)
- [Fixed-cutoff bond convergence](frontier_wave7_194_leech_joined_cell_bond_convergence.md)
- [Joined-cell MPO architecture](frontier_wave7_191_leech_joined_cell_mpo_certificate_architecture.md)
- [Symmetry-native DMRG execution](frontier_wave7_197_leech_z2_block_dmrg_execution.md)
