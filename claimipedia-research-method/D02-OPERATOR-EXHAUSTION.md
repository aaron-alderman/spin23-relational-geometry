# D-02 bounded-operator exhaustion audit

## Final dispatcher

For bounded operators on separable Hilbert spaces, at interior upper-half-plane frequencies and with reciprocal frequency-independent coupling:

1. If the interior is boundedly invertible, use the ordinary operator Schur complement.
2. If it has fixed closed range, use the bounded Moore–Penrose/support complement after the kernel gate.
3. If it has non-closed range but a certified common-scale/Douglas factorization, use the factorized form complement.
4. Otherwise, a specified approximation net may define a response in a named topology. Retain the net groupoid and descend only when all admitted nets agree in that topology.
5. If no bounded complement or bounded topology-labelled limit exists, retain the interior or refuse elimination.

## Why support is not enough

Infinite dimensions require an eight-coordinate stratum:

`support × gap × Douglas class × complementability × topology × ideal × approach net × scalarization`.

The support projection misses spectral accumulation at zero. Kernel annihilation misses failure of square-root range compatibility. A bounded strong limit misses norm stability. A bounded positive operator-valued measure misses trace finiteness. A finite probe ledger misses hidden operator residues.

## Closed branches

The programme now covers ordinary and closed-range inverses, non-closed-range factorized complements, noncommuting reduced interiors, essential-spectrum criticality, strict weak/strong/norm/trace topologies, Harnack invariance across frequency, arbitrary positive kernel residues, and finite-probe reconstruction failure.

The strongest positive extension is the factorized theorem. The strongest negative results are:

- norm-convergent block endpoints can have different strong Schur limits at an emerging kernel;
- the same full support can conceal loss of the spectral gap;
- weakly convergent positive residues need not converge strongly;
- no finite probes plus trace reconstruct an unrestricted operator residue.

## Re-entry programmes

Unbounded domains, real-axis boundary limits, frequency-dependent/nonreciprocal coupling, and Hilbert-module or Banach-space categories require new assumptions. They cannot change the bounded interior dispatcher without changing its declared type.
