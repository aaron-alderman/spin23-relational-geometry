import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const LABELS = ["shared", "forward_endpoint", "reverse_endpoint"];
const FORWARD = [0.5, 0.5, 0];
const REVERSE = [0.5, 0.25, 0.25];
const LAW_SIGNATURES = {
  C0: { g: 1 / Math.sqrt(2), k: 1 },
  C: { g: 0.5, k: 1 },
  E: { g: 0, k: 1 },
  T: { g: 0, k: 0 }
};

function partitions(items) {
  if (items.length === 0) return [[]];
  const [head, ...tail] = items;
  const result = [];
  for (const partition of partitions(tail)) {
    result.push([[head], ...partition.map((block) => [...block])]);
    for (let index = 0; index < partition.length; index += 1) {
      result.push(partition.map((block, blockIndex) => blockIndex === index ? [head, ...block] : [...block]));
    }
  }
  const canonical = new Map();
  for (const partition of result) {
    const normalized = partition
      .map((block) => [...block].sort((a, b) => a - b))
      .sort((a, b) => a[0] - b[0]);
    canonical.set(JSON.stringify(normalized), normalized);
  }
  return [...canonical.values()];
}

function pushforward(distribution, partition) {
  return partition.map((block) => block.reduce((sum, index) => sum + distribution[index], 0));
}

function totalVariation(left, right) {
  return 0.5 * left.reduce((sum, value, index) => sum + Math.abs(value - right[index]), 0);
}

function entropy(distribution) {
  return -distribution.reduce((sum, probability) => probability > 0 ? sum + probability * Math.log2(probability) : sum, 0);
}

function mutualInformation(forward, reverse) {
  const mixture = forward.map((value, index) => 0.5 * (value + reverse[index]));
  return entropy(mixture) - 0.5 * entropy(forward) - 0.5 * entropy(reverse);
}

function buildReceipt() {
  const census = partitions([0, 1, 2]).map((partition) => {
    const forward = pushforward(FORWARD, partition);
    const reverse = pushforward(REVERSE, partition);
    const erasesOrder = totalVariation(forward, reverse) < 1e-15;
    const mergedEndpointIdentity = partition.some((block) => block.includes(1) && block.includes(2));
    return {
      blocks: partition.map((block) => block.map((index) => LABELS[index])),
      forward,
      reverse,
      totalVariation: totalVariation(forward, reverse),
      scheduleInformationBits: mutualInformation(forward, reverse),
      erasesOrder,
      mergedEndpointIdentity
    };
  }).sort((left, right) => right.blocks.length - left.blocks.length || JSON.stringify(left.blocks).localeCompare(JSON.stringify(right.blocks)));
  const erasing = census.filter(({ erasesOrder }) => erasesOrder);
  const minimalNontrivial = erasing.find(({ blocks }) => blocks.length === 2);
  const signatures = Object.entries(LAW_SIGNATURES).map(([law, signature]) => ({ law, ...signature }));
  const signaturePairsDistinct = signatures.every((left, index) => signatures.slice(index + 1)
    .every((right) => left.g !== right.g || left.k !== right.k));

  return {
    schema: "oph-schedule-quotient-census-v1",
    generated: "2026-10-27",
    witness: { labels: LABELS, forward: FORWARD, reverse: REVERSE, totalVariation: totalVariation(FORWARD, REVERSE), scheduleInformationBits: mutualInformation(FORWARD, REVERSE) },
    partitionCount: census.length,
    census,
    theorem: {
      erasingQuotientCount: erasing.length,
      iffCondition: "a deterministic quotient erases this adjacent-order witness if and only if it identifies forward_endpoint with reverse_endpoint",
      verifiedAcrossAllPartitions: census.every(({ erasesOrder, mergedEndpointIdentity }) => erasesOrder === mergedEndpointIdentity),
      minimalNontrivial
    },
    lawDetector: {
      coordinates: ["g phase probe", "k empty-full probe"],
      signatures: LAW_SIGNATURES,
      allFourNamedLawsSeparated: signaturePairsDistinct,
      productQuotientPreservesLawCoordinates: true,
      interpretation: "quotienting only the schedule-record coordinate leaves the independently measured g and k coordinates unchanged"
    },
    decision: {
      canEraseOrderWithoutErasingNamedLawDistinction: signaturePairsDistinct && erasing.length > 0,
      cost: "the quotient discards which non-common endpoint carried the current and reduces schedule information to exactly zero",
      doesNotProveChannelConfluence: true,
      disposition: "declare this as detector coarsening, not as equality or commutation of the underlying adjacent repair channels"
    }
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const receipt = buildReceipt();
  const writeIndex = process.argv.indexOf("--write");
  if (writeIndex >= 0) {
    const target = resolve(process.argv[writeIndex + 1] ?? "evidence/data/oph-schedule-quotient-census-v1.json");
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
    console.log(target);
  } else console.log(JSON.stringify(receipt, null, 2));
}

export { buildReceipt };
