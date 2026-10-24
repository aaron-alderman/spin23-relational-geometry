# Monster–Lean fold provenance and reproduction gate

**Packet:** AZ-060  
**Date:** 25 October 2026  
**Status:** provenance sharpened; source-native census gated on the named bundle  
**Topics:** OT-033, OT-045  
**Evidence:** [machine-readable provenance gate](../../../evidence/data/admissibility-monster-lean-fold-provenance-gate-v1.json)  
**Verification:** `node verification/admissibility/verify_monster_lean_fold_provenance_gate.mjs`

## Result

The reported Monster-address census is no longer an entirely source-free number. The two source images name the implementation boundary precisely:

- `RequestProject/Ogg/DeclFold.lean` contains the fold and theorems;
- `RequestProject/Ogg/DeclFoldReflect.lean` contains reflection and the `fold_certify` command;
- `RequestProject/Ogg/DeclFoldCerts.lean` contains the kernel certificates; and
- `fold/decls.json` is the reported data product.

The images also name `Lean.getConstInfo` as the environment read, `HeckeFold.card_address` as the worked declaration and `Cert.HeckeFold.card_address` as its certificate. These details matter. They convert “find the author’s code” into a finite acquisition request.

They do **not** reproduce the advertised 1,979 declarations, 908 addresses, 789 unclamped folds or 13 certificates. Those remain reported counts.

## What was actually searched

The audit inspected all 49 public branch tips currently advertised by `meta-introspector/monster`, including `main`, `monster-fiber` and `moonshine-fold`, for the three named paths and `fold/decls.json`. None occurs. The author’s 134 public gists contain no matching filename. Public Sourcegraph filename search also returned no hit, with the explicit caveat that its search reported transient backend omissions. GitHub’s anonymous code search was unavailable and is not silently converted into an absence claim.

The public repository’s default head remains `b82b09439139155dd031b5b8e0f8fa777b917a52`, the same pre-post commit already audited in Wave 7.30. The strongest honest statement is therefore: the public post identifies the missing artifacts, but the audited public surfaces do not yet supply them.

## Why the images are not the dataset

The images show a pipeline and one worked profile. They do not determine:

- which root module was imported before `Lean.getConstInfo` was called;
- which declarations counted as “user declarations”;
- whether repeated expression nodes were counted by tree occurrence or shared DAG identity;
- which metadata, generated declarations, projections and private names were retained;
- which reduction, unfolding or transparency policy was applied; or
- the membership and semantic heterogeneity of the 908 collision fibres.

Any one of these choices can change occupancy, clamping and fibre purity without changing the headline idea. Reconstructing plausible code from the infographic would test a new implementation, not reproduce this one.

## Frozen admission contract

OT-033 advances again when a bundle provides the three named Lean files, `fold/decls.json`, the pinned Lean toolchain, the Lake entry point and dependency manifest, the imported root module, the declaration-selection predicate and the exact regeneration command. The run must hash every input and output, compile the 13 certificates with recorded axiom dependencies, emit raw and normalized profiles, and measure normalization mobility and adaptive stopping depth without using declaration names as detector inputs.

Until then:

1. the exhaustive 32,766-chain adaptive census remains a valid theorem about its declared synthetic corpus;
2. the four posted counts remain transcription evidence, not measurements reproduced by this repository; and
3. OT-045 cannot promote the prime-labelled coordinates to Hecke operators, because the operator domain is not yet available even before checking a Hecke relation.

## Implication

This is a useful closure of uncertainty, not a dead end. The reproduction frontier has contracted from an unknown codebase to seven concrete source/environment artifacts plus six policy declarations. That is exactly how the admissibility programme should treat a promising external construction: preserve what the public record establishes, say why a near-copy would be a little different, and name the smallest additional thing that could change the status.

No Monster action, Hecke algebra, semantic canonical form or physical dynamics follows from the post. If the source bundle arrives and the census reproduces, the next question is fibre quality: which distinctions the fold retains, which it erases, and how much adaptive scar data is required to recover them.
