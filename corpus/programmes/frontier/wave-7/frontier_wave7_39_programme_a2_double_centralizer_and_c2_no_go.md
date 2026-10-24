# Frontier Wave 7.39: The Programme Core Is an \(A_2\) Double-Centralizer, Not \(C_2\)

**Date:** 24 October 2026  
**Status:** exact nine-node programme-core calculation; programme route to \(C_2\) closed  
**Source:** [programme core v1](claimipedia_programme_core_source_v1.json)  
**Verifier:** [A2 and double-centralizer verifier](../../../../verification/verify/verify_claimipedia_programme_a2_double_centralizer.mjs)

## Result

Claimipedia's three policy programmes share the exact typed chain

\[
\text{Program}
\xrightleftarrows[\texttt{program}]{\texttt{currentVersion}}
\text{Version}
\xrightleftarrows[\texttt{programVersion}]{\texttt{example}}
\text{Example}.
\]

The chain occurs once for each of `credentialReview`, `equalEvidence` and
`independentSource`.  On the nine-node core this gives the tensor factorization

\[
V\cong\mathbb Q^3_{\rm stage}\otimes\mathbb Q^3_{\rm policy}.
\]

The four reciprocal field operators generate

\[
M_3(\mathbb Q)\otimes I_3,
\]

and their full commutant is

\[
I_3\otimes M_3(\mathbb Q).
\]

This is a genuine double-centralizer: stage transformations and policy-family
transformations mutually commute and each is the other's full matrix
commutant.  The threefold multiplicity is therefore mathematically real on the
declared reduced carrier, even though it arises from three authored policy
families rather than from particle generations or physical triality.

## 1. Exact root system

Let \(E_{ij}\) act on the three stages Program, Version and Example, identically
across all three policies.  Choose

\[
e_1=E_{12},\quad f_1=E_{21},\qquad
e_2=E_{23},\quad f_2=E_{32},
\]

and \(h_i=[e_i,f_i]\).  Exact matrix multiplication gives

\[
[h_i,e_j]=a_{ij}e_j,
\qquad
(a_{ij})=
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix}.
\]

Moreover,

\[
(\operatorname{ad}e_1)^2e_2=0,
\qquad
(\operatorname{ad}e_2)^2e_1=0.
\]

These are the Cartan and Serre relations of \(A_2\), so the commutator algebra
is \(\mathfrak{sl}_3(\mathbb Q)\).

For \(C_2\), one off-diagonal Cartan integer must be \(-2\), with the
corresponding asymmetric Serre exponent.  The programme core is symmetric:
both off-diagonal entries are \(-1\).  Rescaling root operators cannot change
the normalized Cartan integers.  This route therefore closes as exact \(A_2\),
not approximate \(C_2\).

## 2. Why it does not complete the Spin--Temple root

The Spin--Temple relation carrier and the programme carrier have no typed edge
between them in the captured corpus.  Their direct sum therefore supplies

\[
\mathfrak{sl}_2\oplus\mathfrak{sl}_3,
\]

not \(\mathfrak{sp}_4\).  Since \(\mathfrak{sp}_4\) is simple, a faithful map
into this direct sum would have to inject into at least one simple factor; its
dimension ten exceeds both \(\dim\mathfrak{sl}_2=3\) and
\(\dim\mathfrak{sl}_3=8\).  Thus the disconnected sum cannot conceal a
\(\mathfrak{sp}_4\) subalgebra.

The missing datum is a cross-operator that places the two root systems on one
carrier and produces the asymmetric \(-1,-2\) Cartan coupling.  No such
operator is present in the programme, example, evidence or relationship
records.

## 3. Relation to W33 and the Hecke lane

The policy multiplicity commutant is exactly \(M_3(\mathbb Q)\), the same
abstract block type as W33's largest noncommutative Hecke block.  The
relationship carrier supplies an abstract \(M_2(\mathbb Q)\), likewise a block
type appearing in W33.  This explains why the structures feel mutually
legible:

\[
M_2\quad\text{and}\quad M_3
\]

appear as multiplicity endomorphism algebras in both settings.  But abstract
matrix blocks of a given size are unique up to isomorphism; the match is not
evidence of a shared group action.  An intertwiner preserving the ambient
representations remains absent.

## Boundary

The calculation deliberately removes thresholds, rule counts, constitutions,
claims and expected decisions to isolate the reciprocal nine-node programme
core.  Those attributes break policy-family symmetry rather than strengthen it.
The result establishes an exact \(A_2\) double-centralizer in Claimipedia's
schema; it establishes neither physical triality nor \(Spin(2,3)\).
