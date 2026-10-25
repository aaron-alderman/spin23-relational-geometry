# Frontier Wave 7.216: exact inversion-odd charging floor

## The missed operator inequality

At cutoff two the joined carrier is

\[
H=V+T,\qquad T={U\over2}q^TG^{-1}q,
\]

where (q\in\mathbb Z^{24}) and (G) is an integral Gram matrix of the
Leech lattice. Unimodularity identifies the dual lattice with the Leech
lattice itself, whose minimum nonzero squared norm is four. Hence every
nonzero integral charge satisfies

\[
q^TG^{-1}q\ge4.
\]

Inversion sends (q\mapsto-q). Its odd subspace contains antisymmetric
combinations of nonzero charge pairs and excludes the only zero-energy charge
configuration (q=0). Therefore the charging operator obeys the exact
parity-resolved inequality

\[
T\big|_-\ge {U\over2}4,I_-.
\]

For (U/u=0.01), the floor is 0.02. Adding it to the potential-only min--max
bound strengthens the exact 25th odd separator from 4.313466520526786 to

\[
\boxed{\beta_{25}^{(-)}\ge4.333466520526786}.
\]

## Consequence and boundary

The Wave 7.215 variational spectrum still has only 20 values below the
strengthened separator. Its twenty-first value is 4.364703049260699, leaving
a 0.031236528734 gap to cross; the twenty-fourth remains 4.567522699577261.
Thus this exact lattice/parity dictionary materially reduces the missing
margin but does not certify the cluster.

The result is stronger than positivity alone and applies at every symmetric
finite charge cutoff. It depends on the already certified identification of
the integral charging form with the dual Leech lattice. It does not supply an
exterior residual or a Lehmann lower bound.

## Reproduce

```powershell
node scripts/analyze-leech-odd-charging-floor.mjs --write
node verification/verify/verify_leech_odd_charging_floor.mjs
```

## Evidence

- `evidence/data/leech-odd-charging-floor-v1.json`
- `scripts/analyze-leech-odd-charging-floor.mjs`
- `verification/verify/verify_leech_odd_charging_floor.mjs`

## Corpus links

- [Targeted second odd-sector enrichment](frontier_wave7_215_leech_odd_targeted_second_enrichment.md)
- [Temple separator burden](frontier_wave7_212_leech_temple_separator_burden.md)
- [Explicit Leech matrix](frontier_wave7_138_explicit_leech_k_matrix_interaction_compiler.md)
