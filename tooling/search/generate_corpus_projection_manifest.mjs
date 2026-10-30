#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CONTENT_IDENTITY_EXCLUDED_PATHS,
  indexedMarkdownPaths,
  searchCorpus,
} from "./search_corpus.mjs";

const moduleDirectory = dirname(fileURLToPath(import.meta.url));
const root = resolve(moduleDirectory, "../..");
const outputPath = resolve(moduleDirectory, "corpus_projection_manifest_v1.json");
const evidenceSpinePath = "corpus/registers/corpus_evidence_spine.json";
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");

export function buildCorpusProjectionManifest() {
  const identity = searchCorpus({ root, query: "admissibility", limit: 1 });
  const objects = indexedMarkdownPaths(root).map(path => {
    const bytes = readFileSync(resolve(root, path));
    return {
      path,
      bytes: bytes.length,
      sha256: sha256(bytes),
      contentIdentityIncluded: !CONTENT_IDENTITY_EXCLUDED_PATHS.has(path),
    };
  });
  const evidenceBytes = readFileSync(resolve(root, evidenceSpinePath));
  const payload = {
    protocol: "spin23-corpus-projection-manifest/1",
    status: "immutable-transport-inventory-not-materialized-payload",
    corpusContentSha256: identity.corpusContentSha256,
    evidenceProjectionSha256: identity.evidenceSpineSha256,
    documentCount: identity.documents,
    objects,
    evidenceSpine: {
      path: evidenceSpinePath,
      bytes: evidenceBytes.length,
      rawSha256: sha256(evidenceBytes),
    },
    materializationContract: {
      exactBytesRequired: true,
      rejectMissingObjects: true,
      rejectExtraIndexedObjects: true,
      rejectHashMismatch: true,
      rebuildAndMatchCorpusContentSha256: true,
      grantsAdmissionAuthority: false,
    },
    authority: {
      inventoryOnly: true,
      corpusPromotion: false,
      scientificTruthEstablished: false,
      protectedRuntimeAdmission: false,
    },
  };
  return { ...payload, manifestSha256: sha256(JSON.stringify(payload)) };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const manifest = buildCorpusProjectionManifest();
  if (process.argv.includes("--write")) {
    writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(`Wrote ${relative(root, outputPath)} ${manifest.manifestSha256}`);
  } else console.log(JSON.stringify(manifest, null, 2));
}
