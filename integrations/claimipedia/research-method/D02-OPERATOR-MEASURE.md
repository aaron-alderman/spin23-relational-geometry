# D-02 operator residue and measure audit

## The rank-changing fibre is a positive-operator cone

On an emerging kernel `K`, take

`D_delta=z delta I_K`, `B_delta=sqrt(delta) L`.

The Schur correction is exactly

`L L*/z`.

Thus the critical residue is an arbitrary bounded positive operator, not generally a scalar or finite matrix. The passive response sees only `R=L L*`; right-unitary changes `L -> L U` are invisible. Orientation or a particular coupling square root remains extra decoration.

## Finite probes cannot reconstruct the residue

For any fixed finite probe subspace, put one rank-one residue on each of two distinct orthogonal directions outside it. Both visible compressions vanish. Both residues can have trace one. Nevertheless, the operators differ.

Therefore neither a finite set of matrix elements nor those elements plus total trace determines a general infinite-dimensional residue. A faithful record must retain the operator-valued measure or a declared separating family of states.

## Weak is genuinely weaker than strong

Let `P_n` be the multiplication projections associated with successively finer Rademacher signs. Then `P_n` tends weakly to `I/2`: every fixed pair of test vectors sees its oscillations average away. But

`||(P_n-I/2)x||=||x||/2`

for every vector `x`, so there is no strong convergence. The residues stay positive throughout and therefore define passive Herglotz atoms.

This makes the topology hierarchy strict even inside the positive cone:

`trace norm -> operator norm -> strong operator -> weak operator`.

Each arrow loses downstream licenses. In particular, weak measure convergence does not imply vectorwise response convergence, and strong convergence does not imply trace or determinant control.
