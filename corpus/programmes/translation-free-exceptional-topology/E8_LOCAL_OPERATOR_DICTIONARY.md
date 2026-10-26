# E8 local operator dictionary

**Date:** 26 October 2026

**Status:** reusable eight-root dictionary certified

**Dictionary:** [machine artifact](../../../evidence/data/translation-free-e8-local-operator-dictionary-r8-v1.json)
**Compiler:** [dictionary compiler](../../../scripts/compile-translation-free-e8-local-dictionary.mjs)
**Certificate:** [dictionary verifier](../../../verification/verify/verify_translation_free_e8_local_operator_dictionary_r8.mjs)

The expensive local calculation is now separated from spatial scaling. The
versioned dictionary contains the eight cutoff-eight local energies, parities,
boundary weights and all signed \(8\times8\) matrices for the eight cosine and
eight real sine-proxy channels. It was compiled from 340,321 charge states;
all local residuals are below \(10^{-10}\), cosine matrices are symmetric and
sine proxies antisymmetric to better than \(9\times10^{-15}\).

The chain solver can load this 23.8 KB artifact instead of reconstructing the
local eigensystem. A cached replay exactly reproduces the periodic width-three
gap 0.1826163504 and its odd, reflection-even first excitation. This makes the
projected model monitorable and tunable: changing width, boundary condition or
intercell coupling no longer silently changes the local carrier.

Serialization does not remove truncation. Every downstream result inherits
cutoff eight and eight retained roots, and must cite them. Higher-root
dictionaries are distinct artifacts rather than in-place upgrades. The next
computational gain is using this fixed dictionary for widths beyond five and
for coupling/boundary sweeps with exact provenance.
