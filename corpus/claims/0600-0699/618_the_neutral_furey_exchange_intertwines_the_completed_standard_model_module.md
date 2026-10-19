# The Neutral Furey Exchange Intertwines the Completed Standard-Model Module

**Date:** 17 October 2026  
**Branches:** B03 and B11  
**Claim status:** exact on the completed sixteen-state TRO/Fock module; source-algebra extension remains open  
**Certificate:** [verify_furey_survivor_exchange_sm_intertwiner.mjs](../../../verification/verify/verify_furey_survivor_exchange_sm_intertwiner.mjs)

## Executive result

The linear neutral-block exchange required by the Hermitian selector intertwines the complete Standard-Model gauge representation already constructed on the sixteen even-Fock particle states.

Write the two neutral relational roles as \(D\) and \(E\). The survivor exchange acts by \(D\leftrightarrow E\) on TRO endpoints but maps every named particle to the same five-bit Fock state. Let \(S\) denote this map between the two exchanged topology realizations. The certificate verifies

\[
\boxed{S G_A=G_B S}
\]

for eleven generators:

- color \(E_{12},E_{21},E_{23},E_{32}\);
- weak \(E_{45},E_{54}\);
- all five Cartan number operators \(N_1,\ldots,N_5\).

Every one of the sixteen five-bit weights is preserved.

## Why this covers the Standard-Model action

The tested nonabelian root operators generate the color and weak actions on this chiral spinor module. The five commuting number operators contain the complete Cartan data from which hypercharge and the other displayed weight combinations are formed. Since \(S\) preserves every weight and intertwines the raising and lowering operators, it intertwines the completed Lie-algebra representation.

Preservation of the complete exponentiated weight representation also preserves its central kernel. Thus the exchange does not alter the faithful Standard-Model quotient already selected by the completed module.

## Consequence for the Hermitian selector

The covariance condition from [document 617](617_the_hermitian_furey_selector_is_a_standard_exchanged_tro_response.md) is satisfied on the completed particle module. Therefore

\[
R_x^{\rm H}(z)=xS(x)^\dagger z+zS(x)^\dagger x
\]

has a gauge-stable construction at this representation level, rather than merely a gauge-stable zero set.

Together with the positivity and CP certificates, the chain is now

\[
\begin{aligned}
\text{neutral exchanged TRO response}
&\Longrightarrow \text{global zero locus }L\otimes F,\\
&\Longrightarrow \text{complex isotropic branches removed},\\
&\Longrightarrow \text{nonzero flavor CP retained},\\
&\Longrightarrow \text{completed SM module intertwined}.
\end{aligned}
\]

## Remaining source pin

This does **not** prove that \(S\) is an automorphism or canonical intertwiner of Furey’s underlying nested division-algebra/CAR construction. The completed TRO representation forgets some source structure. It also does not establish Lorentz covariance or derive a dynamical observable whose response is \(R^{\rm H}\).

The remaining B03 question is

\[
\boxed{\text{Does the completed-module exchange lift to the source CAR/nested algebra and Lorentz action?}}
\]

Failure to lift would preserve all results in the completed module but stop the claim that the selector is intrinsic to Furey’s source theory.

## Reproducibility

```powershell
node verification/verify/verify_furey_survivor_exchange_sm_intertwiner.mjs
```
