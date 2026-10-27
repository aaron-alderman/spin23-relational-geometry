import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { compileInstrument } from "./run-oph-independent-reference-emulator.mjs";

const LAWS = ["C0", "C", "E", "T"];
const INPUT_COUNT = 6;
const BOLTZMANN = 1.380649e-23;
const TEMPERATURE_K = 300;

function entropy(probabilities) {
  return -probabilities.reduce((sum, probability) => probability > 0 ? sum + probability * Math.log2(probability) : sum, 0);
}

function ledger(name) {
  const instrument = compileInstrument(name);
  const conditional = Array.from({ length: INPUT_COUNT }, () => Array(instrument.recordCount).fill(0));
  instrument.branches.forEach((branch, recordIndex) => {
    for (const mapping of branch.mappings) conditional[mapping.inputIndex][recordIndex] += mapping.amplitude ** 2;
  });
  const recordDistribution = conditional[0].map((_, recordIndex) => conditional
    .reduce((sum, row) => sum + row[recordIndex] / INPUT_COUNT, 0));
  const recordEntropyBits = entropy(recordDistribution);
  const conditionalRecordEntropyBits = conditional.reduce((sum, row) => sum + entropy(row) / INPUT_COUNT, 0);
  const inputRecordMutualInformationBits = recordEntropyBits - conditionalRecordEntropyBits;
  const physicalRecordCapacityBits = Math.log2(instrument.recordCount);
  const encodedRecordCapacityBits = instrument.recordQubits;
  return {
    law: name,
    recordCount: instrument.recordCount,
    recordQubits: instrument.recordQubits,
    totalLogicalQubits: instrument.totalLogicalQubits,
    unusedComputationalRecordLabels: 2 ** instrument.recordQubits - instrument.recordCount,
    recordDistribution,
    recordEntropyBits,
    conditionalRecordEntropyBits,
    inputRecordMutualInformationBits,
    physicalRecordCapacityBits,
    encodedRecordCapacityBits,
    encodingOverheadBits: encodedRecordCapacityBits - physicalRecordCapacityBits,
    resetLowerBoundAt300KJoules: BOLTZMANN * TEMPERATURE_K * Math.log(2) * recordEntropyBits,
    resetLowerBoundWithInputSideInformationAt300KJoules: BOLTZMANN * TEMPERATURE_K * Math.log(2) * conditionalRecordEntropyBits
  };
}

function buildReceipt() {
  const instruments = LAWS.map(ledger);
  return {
    schema: "oph-record-information-ledger-v1",
    generated: "2026-10-27",
    assumptions: {
      inputPrior: "uniform over the six one-seam endpoint keys",
      recordBasis: "authored computational record basis of the named instrument",
      resetTemperatureKelvin: TEMPERATURE_K,
      landauerScope: "classical stored-record erasure lower bound; not total device dissipation and not an entropy theorem for the closed universe"
    },
    instruments,
    checks: {
      refinementRecordEntropyNondecreasing: instruments.every((row, index) => index === 0 || row.recordEntropyBits >= instruments[index - 1].recordEntropyBits - 1e-12),
      recordCounts: Object.fromEntries(instruments.map(({ law, recordCount }) => [law, recordCount])),
      recordQubits: Object.fromEntries(instruments.map(({ law, recordQubits }) => [law, recordQubits])),
      allConditionalDistributionsNormalized: LAWS.every((law) => {
        const instrument = compileInstrument(law);
        return Array.from({ length: INPUT_COUNT }, (_, inputIndex) => instrument.branches.reduce((sum, branch) => {
          const mapping = branch.mappings.find((candidate) => candidate.inputIndex === inputIndex);
          return sum + (mapping?.amplitude ?? 0) ** 2;
        }, 0)).every((value) => Math.abs(value - 1) < 1e-12);
      })
    },
    dilation: {
      exactConstruction: "one fresh computational record ancilla per repair attempt, followed by the compiled Stinespring isometry; tracing the record gives the unread channel",
      repeatedProcess: "a collision model using a fresh ancilla at each step",
      consequence: "the discrete process is exactly realizable without a finite-time bounded generator on the system alone",
      nonConsequence: "the dilation does not select a unique Hamiltonian, clock, bath, reset mechanism or thermodynamic completion"
    },
    decision: {
      informationLedgerClosedForNamedDigitalInstruments: true,
      globalEntropyMonotonicityDerived: false,
      physicalResourceCostMeasured: false,
      disposition: "use the ledger as an engineering lower bound and detector-accounting tool; measure complete control, reset and refrigeration costs on hardware"
    }
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const receipt = buildReceipt();
  const writeIndex = process.argv.indexOf("--write");
  if (writeIndex >= 0) {
    const target = resolve(process.argv[writeIndex + 1] ?? "evidence/data/oph-record-information-ledger-v1.json");
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
    console.log(target);
  } else console.log(JSON.stringify(receipt, null, 2));
}

export { buildReceipt };
