# Anomaly-Free Charge and Ternary Incidence Jointly Generate the Full Six-Sector Center

**Date:** 17 October 2026  
**Branches:** B03, B04, B10 and B11  
**Claim status:** exact joint-spectrum theorem on the sixteen-state completed module; physical normalization remains open  
**Certificate:** [classify_joint_spectrum_of_incidence_and_bl.mjs](scripts/classify_joint_spectrum_of_incidence_and_bl.mjs)

## Executive result

Neither anomaly-free charge nor ternary incidence alone distinguishes all six irreducible matter sectors. Together they do.

Let

\[
B=3(B-L)
\]

and let \(\Lambda\) be either of the two natural positive incidence Laplacians. Their joint eigenpairs are distinct on

\[
Q,u^c,d^c,L,e^c,ν^c.
\]

Consequently,

\[
\boxed{C^*(B,\Lambda)=\mathbb C^6
=\operatorname{End}_{SM,B-L}(\mathcal M_{16}).}
\]

Thus anomaly cancellation and ternary relational incidence are complementary coordinates on the completed matter center.

## 1. What each observable sees

The \(B\) eigenvalues are

\[
(1,-1,-1,-3,3,3).
\]

They define four charge classes:

\[
\{Q\},\quad
\{u^c,d^c\},\quad
\{L\},\quad
\{e^c,ν^c\}.
\]

The deduplicated incidence eigenvalues are

\[
(5,5,1,1,1,0),
\]

giving three classes:

\[
\{Q,u^c\},\quad
\{d^c,L,e^c\},\quad
\{ν^c\}.
\]

The multiplicity-preserving incidence normalization changes only the charged-lepton value,

\[
(5,5,1,1,3,0),
\]

and gives four classes. Neither incidence convention is complete alone.

## 2. The sterile projector is not enough

The pair \((B,P_{ν^c})\) produces five joint classes. It separates \(e^c\) from \(ν^c\), but leaves \(u^c\) and \(d^c\) indistinguishable because both have charge \(-1\) and vanish under the sterile projector.

Therefore the full incidence spectrum contains information not retained by its kernel projector. Reducing \(\Lambda\) immediately to \(P_{ν^c}\) loses the distinction required to reconstruct the matter center.

## 3. Joint eigenpairs

For the deduplicated normalization,

\[
\begin{array}{c|rrrrrr}
r&Q&u^c&d^c&L&e^c&ν^c\\ \hline
B_r&1&-1&-1&-3&3&3\\
\Lambda_r&5&5&1&1&1&0
\end{array}
\]

Every column is different. The same is true after replacing the \(e^c\) incidence value one by three. Joint functional calculus therefore recovers every primitive sector projector.

This gives a precise sense in which two independently motivated structures complete one another:

\[
\text{anomaly-free additive charge}
+
\text{positive ternary incidence}
\Longrightarrow
\text{complete sector resolution}.
\]

## 4. A single primitive generator exists but is not canonical

For example,

\[
\Omega=\Lambda+3B
\]

has six distinct eigenvalues. In the deduplicated convention they are

\[
(8,2,-2,-8,10,9),
\]

and in the multiplicity convention

\[
(8,2,-2,-8,12,9).
\]

Each projector is then an exact Lagrange polynomial,

\[
P_r=\prod_{s\ne r}\frac{\Omega-\omega_sI}{\omega_r-\omega_s}.
\]

But the coefficient three and the relative scale between \(B\) and \(\Lambda\) are choices. The canonical statement is the two-observable joint spectrum, not this particular \(\Omega\).

## 5. Relation to the two-face carrier

Every joint spectral projector selects one of the six sector-resolved face cones:

\[
P_r
\left(\bigoplus_sH_2(\mathbb R)_s\right)
P_r
\cong H_2(\mathbb R)_r.
\]

Meanwhile a conserved current such as \(B-L\) defines a positive aggregation across them. Therefore the joint algebra supports both operations required by the programme:

1. resolve individual matter sectors;
2. aggregate them according to a physical source.

This is structural compatibility, not yet a derivation of dynamics or particle parameters.

## 6. Stop-everything criteria

Stop treating the pair as fundamental if:

1. the source-algebra lift changes the incidence joint spectrum;
2. radiative operator mixing destroys the commutation or sector-scalar form of \(\Lambda\);
3. \(B-L\) is broken without a controlled remnant before the carrier becomes meaningful;
4. the joint resolution merely restates the already known Standard-Model projectors with no source-derived constraints;
5. no action uses both observables in a common response.

## 7. Next gates

1. Introduce a Majorana mass for \(ν^c\), compute the residual discrete charge algebra and retest joint sector resolution.
2. Determine whether the completed linking algebra supplies \(B\) and \(\Lambda\) intrinsically or only after importing particle labels.
3. Construct a two-face current kernel in which \(B\) fixes residues while \(\Lambda\) fixes sector projectors, then test Herglotz positivity and threshold running.

## Reproducibility

```powershell
node scripts\classify_joint_spectrum_of_incidence_and_bl.mjs
```
