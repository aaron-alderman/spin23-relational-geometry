# Geometry tournament v1 separates geometry, coupling and reader

Version 1 closes the main architectural gap in v0. A hypothesis is now a typed word

\[
H=(G,\ C_1\circ C_2,\ R),
\]

where (G) is one of ten geometry primitives, the coupling word has length at most two over eight coupling types, and (R) is one of six compatible readers. Type requirements prevent a reader from observing a channel its coupling never produced.

The bounded grammar generates 29 canonical coupling words and 490 compatible composites. It then quotients five ordinary nuisance actions: unknown source gain, affine signed spatial trend, global phase and gain, width calibration offset and loop baseline offset.

After nuisance reduction, 490 composites become 46 canonical observable classes. The largest equivalence class contains 74 raw composites. This is the intended compression: unused couplings, invisible displacement and reader-blind geometry are merged before data fitting rather than rewarded as separate explanations.

The runner materializes the bounded hypothesis library as `GT1-001` through `GT1-046`, recording for every class its representative geometry, coupling word, reader and alias count.

## Confusion test

Each canonical class is injected thirty times. Reader-appropriate nuisance transformations are applied before deterministic Gaussian noise of standard deviation 0.005. Recovery compares only nuisance-quotiented signatures using the same declared reader. All 1,380 trials recover their generating canonical class and the confusion register is empty.

This validates the fixed benchmark library, not arbitrary parameter families. The next gate is numerical Jacobian rank across parameter ranges plus adversarial ordinary nuisance generators. No class is promoted to real astronomical data by synthetic success alone.

## Dogfood against the motivating analyses

The constant-tilt plus projection plus aggregate-gain hypothesis falls into the flat class after quotienting unknown source normalization. This reproduces the M44 result that total brightness cannot identify a constant tilt. Bend and crease coupled to a two-channel directional reader are structurally distinguishable, but the eight-cluster empirical tournament preferred a flat field and the crease model generalized worst; v1 therefore holds bend and retires crease for those data. Displacement plus attenuation remains inadmissible because the current M44 reader has no absolute distance-sensitive gain calibration.

The framework thus preserves the earlier decisions while explaining them as reader-relative equivalence and admission results.
