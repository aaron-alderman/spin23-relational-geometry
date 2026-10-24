# A positive spectral atom carries the boundary-measure step

**Date:** 25 October 2026  
**Status:** scalar quantity-level measure witness closed; general operator and measured-record gates open  
**Topics:** OT-026, OT-027  
**Parent:** [AZ-085 physical admittance operator](admissibility_85_physical_admittance_operator_and_held_out_current_witness.md)  
**Evidence:** [physical operator-measure witness](../../../evidence/data/claimipedia-d02-physical-operator-measure-witness-v1.json)  
**Generator:** [operator-measure witness runner](../../../scripts/run-claimipedia-d02-physical-operator-measure-witness.mjs)  
**Verifier:** [operator-measure witness certificate](../../../verification/admissibility/verify_claimipedia_d02_physical_operator_measure_witness.mjs)

## Result

The named D02 step `extract-positive-operator-measure` now has a physical scalar specialization. The internal branch of AZ-085's passive RC network has

\[
D(s)=G_i+G_c+sC_i=C_i(s+\lambda),
\qquad
\lambda=\frac{G_i+G_c}{C_i}.
\]

Its Schur term is

\[
\frac{G_c^2}{D(s)}=\frac{R}{s+\lambda},
\qquad
R=\frac{G_c^2}{C_i}>0.
\]

Thus (R\,\delta_\lambda) is a positive one-atom spectral measure. The response is measured in siemens, the spectral coordinate in inverse seconds, and the atom weight in siemens per second. Evaluating the atom divides by a rate and returns siemens. Both nonzero dimension changes pass `common-algebra-2`; corrupting the extraction delta kills the path.

For the fixed component values,

\[
\lambda=7021.276595744681\;\mathrm{s}^{-1},
\qquad
R=13.297872340425533\;\mathrm{S\,s}^{-1}.
\]

The identities (\lambda C_i=G_i+G_c) and (RC_i=G_c^2) are recovered exactly at floating-point precision. At the held-out 997 Hz point, atomic Stieltjes evaluation predicts

\[
(1.05452676753-0.940841688889i)\;\mathrm{mS},
\]

agreeing with direct eliminated-block inversion to (2.43\times10^{-19}\;\mathrm{S}).

## What closed

This closes the quantity-level form of one boundary-measure path:

- the response, spectral coordinate, atom and evaluated correction have explicit SI dimensions;
- positivity is a numerical and structural requirement, not a label;
- a negative-residue control is refused;
- the atom predicts a held-out response contribution;
- the loss is explicit: (G_c) and (-G_c) produce the same positive residue.

The last point matters for admissibility. A positive measure retains response strength but quotients away an orientation carried by the coupling square root. The measure cannot later be asked to recover that sign without a second datum.

## What remains open

This is a rank-one scalar atom, not reconstruction of a general operator-valued measure. The existing D02 finite-probe no-go remains: finitely many compressions, even with total trace, do not determine arbitrary hidden operator residue. No Jordan product has been induced from Claimipedia relation composition. No independent laboratory record has been predicted.

OT-026 therefore stays gated. Positivity supplies a cone and admits Jordan structure when a carrier and product are independently given; it does not make the relationship graph generate that product. OT-027 also stays gated because a component-defined response operator is not yet a common action generating dynamics and detector records.

## Implication and look-here instruction

The two nearest purely computational translation excuses are now exhausted: the system can carry a physical response operator and its positive spectral measure. The next work must add information rather than more wrappers:

1. a source-native measured admittance or impedance dataset with calibration and uncertainty;
2. a separating probe family sufficient for the declared finite operator class, or an explicit refusal for the unrestricted class;
3. a product identity derived from source composition rather than inserted into an edge;
4. a preregistered held-out measured record.

This is where theoretical engineering can improve real inference. New physics would require a stable residual after the ordinary positive-real network family, parasitics, calibration drift and detector likelihood are frozen.

## Reproduction

~~~powershell
node scripts/run-claimipedia-d02-physical-operator-measure-witness.mjs --write
node verification/admissibility/verify_claimipedia_d02_physical_operator_measure_witness.mjs
~~~
