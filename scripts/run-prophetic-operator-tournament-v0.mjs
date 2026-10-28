import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const inputPath = resolve(root, "evidence/data/prophetic-interpreter-forecasts-v0.json");
const outputPath = resolve(root, "evidence/data/prophetic-operator-tournament-v0.json");
const registry = JSON.parse(await readFile(inputPath, "utf8"));

const outcomeValue = new Map([
  ["match", 1],
  ["partial", 0.5],
  ["miss", 0]
]);

const isTerminal = (record) => record.operatorFamily.includes("terminal") || record.operatorFamily === "visionary_exact_horizon";
const closed = registry.records.filter((record) => outcomeValue.has(record.outcome));
const training = closed.filter((record) => record.sourceYear < 1900);
const heldOut = closed.filter((record) => record.sourceYear >= 1900);

const laplaceMean = (records) => (records.reduce((sum, record) => sum + outcomeValue.get(record.outcome), 0) + 1) / (records.length + 2);
const globalProbability = laplaceMean(training);
const terminalTraining = training.filter(isTerminal);
const terminalProbability = laplaceMean(terminalTraining);

const models = [
  {
    id: "skeptical-terminal-null",
    description: "Exact terminal forecasts have 0.05 prior success probability in the declared window.",
    predict: () => 0.05,
    fittedFromTraining: false
  },
  {
    id: "operator-family-laplace",
    description: "Laplace-smoothed success rate for pre-1900 exact terminal forecasts.",
    predict: (record) => isTerminal(record) ? terminalProbability : globalProbability,
    fittedFromTraining: true
  },
  {
    id: "global-laplace",
    description: "One Laplace-smoothed success rate for all pre-1900 closed forecasts.",
    predict: () => globalProbability,
    fittedFromTraining: true
  }
];

const scored = models.map((model) => {
  const rows = heldOut.map((record) => {
    const observed = outcomeValue.get(record.outcome);
    const predicted = model.predict(record);
    return {
      id: record.id,
      observed,
      predicted,
      brier: (predicted - observed) ** 2
    };
  });
  return {
    id: model.id,
    description: model.description,
    fittedFromTraining: model.fittedFromTraining,
    meanBrier: rows.reduce((sum, row) => sum + row.brier, 0) / rows.length,
    rows
  };
}).sort((a, b) => a.meanBrier - b.meanBrier);

const result = {
  protocol: "prophetic-admissibility/operator-tournament/0",
  generatedAt: registry.date,
  design: {
    type: "retrospective calendar-held-out control",
    trainingRule: "closed source records with sourceYear < 1900",
    heldOutRule: "closed source records with sourceYear >= 1900",
    outcomeEncoding: { match: 1, partial: 0.5, miss: 0 },
    properScore: "mean Brier score; lower is better",
    limitation: "The registry is deliberately assembled for control and source-method diversity, not sampled from a defined forecast population. The split was authored after historical outcomes were known."
  },
  trainingIds: training.map((record) => record.id),
  heldOutIds: heldOut.map((record) => record.id),
  fittedParameters: {
    globalLaplaceProbability: globalProbability,
    exactTerminalLaplaceProbability: terminalProbability,
    terminalTrainingCount: terminalTraining.length
  },
  ranking: scored,
  winner: scored[0].id,
  positiveHermeneuticRankingIdentified: false,
  decision: scored[0].id === "skeptical-terminal-null"
    ? "The skeptical exact-date null wins the selected held-out control. Exact terminal arithmetic earns adverse evidence; no positive hermeneutic operator is validated."
    : "A fitted operator model beats the declared skeptical null in this selected control, but prospective replication is still required.",
  authorityBoundary: "This tournament ranks prediction calibration on a small selected modern control registry. It does not rank biblical truth, divine agency, or all prophetic discourse."
};

if (process.argv.includes("--write")) {
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
}

console.log(JSON.stringify(result, null, 2));

