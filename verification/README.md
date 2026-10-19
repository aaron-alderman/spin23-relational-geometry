# Verification certificates

These scripts reproduce finite calculations, classifications, constructions, no-go checks and numerical audits cited by the canonical corpus.

Scripts are grouped by the leading operation in their filename—for example `prove/`, `verify/`, `classify/`, `derive/` and `construct/`. The grouping is navigational rather than epistemic: a filename, its invoking claim and its output determine what the certificate actually establishes.

The generated [certificate-operation index](INDEX.md) reports the live count in each group.

Run certificates from the repository root so that repository-relative inputs resolve consistently:

```powershell
node verification/verify/verify_reflexive_closure_v1.mjs
```

Repository administration and publication programs live separately under [`tooling/`](../tooling/README.md).
