import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const moduleDirectory = dirname(fileURLToPath(import.meta.url));
const beaconPath = resolve(moduleDirectory, "contribution_beacon_v1.json");
const sha256 = value => createHash("sha256").update(value).digest("hex");

export function getContributionBeacon() {
  const bytes = readFileSync(beaconPath);
  const beacon = JSON.parse(bytes);
  return {
    ...beacon,
    beaconSha256: sha256(bytes),
    sourcePath: "tooling/search/contribution_beacon_v1.json",
    contributionEntryPoints: {
      mcp: "corpus_contribution_beacon",
      observatory: beacon.observatory.expectedUrl,
      documentation: "tooling/search/CONTRIBUTION_BEACON.md"
    }
  };
}
