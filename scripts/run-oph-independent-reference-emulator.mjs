import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PI = Math.PI;
const SHOTS = 5000;
const SEED = 0x4f504831;

const laws = {
  C0: { k: [1, 0], g: [1 / Math.sqrt(2), 0] },
  C: { k: [1, 0], g: [0.5, 0] },
  E: { k: [1, 0], g: [0, 0] },
  T: { k: [0, 0], g: [0, 0] },
  C_signed: { k: [1, 0], g: [-0.5, 0] },
  C0_quarter: { k: [1, 0], g: [0, -1 / Math.sqrt(2)] }
};
const seamKeys = [[0, 0], [1, 1], [1, 0], [0, 1], [2, 0], [0, 2]];

function mulberry32(seed) {
  let value = seed >>> 0;
  return () => {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function phaseProbability([re, im], theta, depth = 1) {
  let zr = 1;
  let zi = 0;
  for (let i = 0; i < depth; i += 1) {
    [zr, zi] = [zr * re - zi * im, zr * im + zi * re];
  }
  return 3 / 8 + 0.5 * (zr * Math.cos(theta) + zi * Math.sin(theta));
}

function kProbability([re, im], theta = 0) {
  return 0.5 + 0.5 * (re * Math.cos(theta) + im * Math.sin(theta));
}

function bernoulliCount(probability, shots, random) {
  let plus = 0;
  for (let i = 0; i < shots; i += 1) plus += random() < probability ? 1 : 0;
  return plus;
}

function repair(config, seam, coin) {
  const [a, b] = seam;
  const next = [...config];
  const d = config[a] - config[b];
  const current = (d - (2 * coin - 1) * (Math.abs(d) % 2)) / 2;
  next[a] -= current;
  next[b] += current;
  return { config: next, current };
}

function key(config) {
  return config.join(",");
}

function exactSchedule(initial, seams) {
  let distribution = new Map([[key(initial), { config: initial, probability: 1 }]]);
  for (const seam of seams) {
    const next = new Map();
    for (const { config, probability } of distribution.values()) {
      for (const coin of [0, 1]) {
        const repaired = repair(config, seam, coin).config;
        const id = key(repaired);
        const prior = next.get(id)?.probability ?? 0;
        next.set(id, { config: repaired, probability: prior + probability / 2 });
      }
    }
    distribution = next;
  }
  return Object.fromEntries([...distribution.entries()].sort().map(([id, row]) => [id, row.probability]));
}

function empiricalSchedule(initial, seams, shots, random) {
  const counts = {};
  for (let shot = 0; shot < shots; shot += 1) {
    let config = [...initial];
    for (const seam of seams) config = repair(config, seam, random() < 0.5 ? 0 : 1).config;
    const id = key(config);
    counts[id] = (counts[id] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort().map(([id, count]) => [id, count / shots]));
}

function totalVariation(left, right) {
  const ids = new Set([...Object.keys(left), ...Object.keys(right)]);
  return 0.5 * [...ids].reduce((sum, id) => sum + Math.abs((left[id] ?? 0) - (right[id] ?? 0)), 0);
}

function phaseRows(random) {
  const calibration = [0, PI, PI / 2];
  const heldOut = [PI / 3, 3 * PI / 2];
  return Object.fromEntries(Object.entries(laws).map(([name, law]) => {
    const observed = Object.fromEntries([...calibration, ...heldOut].map((theta) => {
      const probability = phaseProbability(law.g, theta);
      const plus = bernoulliCount(probability, SHOTS, random);
      return [String(theta), { theta, exact: probability, plus, shots: SHOTS, frequency: plus / SHOTS }];
    }));
    const p0 = observed[String(0)].frequency;
    const pPi = observed[String(PI)].frequency;
    const pHalfPi = observed[String(PI / 2)].frequency;
    const fittedG = [p0 - pPi, 2 * (pHalfPi - 3 / 8)];
    const heldOutRows = heldOut.map((theta) => {
      const prediction = phaseProbability(fittedG, theta);
      const actual = observed[String(theta)].frequency;
      return { theta, prediction, actual, residual: actual - prediction };
    });
    return [name, { declaredG: law.g, fittedG, observations: Object.values(observed), heldOut: heldOutRows }];
  }));
}

function classicalTable() {
  return seamKeys.map(([a, b]) => {
    const config = [a, b];
    const outcomes = [0, 1].map((coin) => {
      const { config: output, current } = repair(config, [0, 1], coin);
      return { coin, current, output, probability: 0.5 };
    });
    const merged = new Map();
    for (const row of outcomes) {
      const id = `${row.current}:${row.output.join(",")}`;
      merged.set(id, { current: row.current, output: row.output, probability: (merged.get(id)?.probability ?? 0) + 0.5 });
    }
    return { input: [a, b], outcomes: [...merged.values()] };
  });
}

function compileInstrument(name) {
  const records = new Map();
  const add = (record, mapping) => {
    if (!records.has(record)) records.set(record, []);
    records.get(record).push(mapping);
  };
  for (const [inputIndex, input] of seamKeys.entries()) {
    const d = input[0] - input[1];
    if (name === "C0") {
      const merged = new Map();
      for (const coin of [0, 1]) {
        const row = repair(input, [0, 1], coin);
        const id = `${row.current}:${key(row.config)}`;
        merged.set(id, { ...row, probability: (merged.get(id)?.probability ?? 0) + 0.5 });
      }
      for (const { config, current, probability } of merged.values()) {
        add(`j:${current}`, { inputIndex, outputIndex: seamKeys.findIndex((item) => key(item) === key(config)), current, amplitude: Math.sqrt(probability) });
      }
      continue;
    }
    for (const coin of [0, 1]) {
      const { config, current } = repair(input, [0, 1], coin);
      const record = name === "C"
        ? `c:${coin}|j:${current}`
        : name === "E"
          ? `c:${coin}|d:${d}`
          : `c:${coin}|k:${input.join(",")}`;
      add(record, { inputIndex, outputIndex: seamKeys.findIndex((item) => key(item) === key(config)), current, amplitude: 1 / Math.sqrt(2) });
    }
  }
  const branches = [...records.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([record, mappings]) => ({ record, mappings }));
  const gram = seamKeys.map((_, left) => seamKeys.map((__, right) => branches.reduce((sum, branch) => {
    const a = branch.mappings.find(({ inputIndex }) => inputIndex === left);
    const b = branch.mappings.find(({ inputIndex }) => inputIndex === right);
    return sum + (a && b && a.outputIndex === b.outputIndex ? a.amplitude * b.amplitude : 0);
  }, 0)));
  const maxIsometryError = Math.max(...gram.flatMap((row, i) => row.map((value, j) => Math.abs(value - (i === j ? 1 : 0)))));
  const coefficient = (left, right, current) => branches.reduce((sum, branch) => {
    const a = branch.mappings.find(({ inputIndex, current: j }) => inputIndex === left && j === current);
    const b = branch.mappings.find(({ inputIndex, current: j }) => inputIndex === right && j === current);
    return sum + (a && b ? a.amplitude * b.amplitude : 0);
  }, 0);
  const multipliers = {
    k: coefficient(0, 1, 0),
    g: coefficient(0, 3, 0),
    h: coefficient(1, 3, 0),
    m: coefficient(2, 3, 0),
    n: coefficient(3, 5, -1)
  };
  return {
    recordCount: branches.length,
    recordQubits: Math.ceil(Math.log2(branches.length)),
    systemQubits: 3,
    totalLogicalQubits: 3 + Math.ceil(Math.log2(branches.length)),
    definiteCurrent: branches.every((branch) => new Set(branch.mappings.map(({ current }) => current)).size === 1),
    maxIsometryError,
    multipliers,
    branches
  };
}

function buildReceipt() {
  const random = mulberry32(SEED);
  const initialAdjacent = Array(12).fill(0);
  initialAdjacent[5] = 1;
  initialAdjacent[11] = 1;
  const adjacentForwardSeams = [[0, 1], [0, 5]];
  const adjacentReverseSeams = [...adjacentForwardSeams].reverse();
  const initialDisjoint = Array(12).fill(0);
  initialDisjoint[0] = 1;
  initialDisjoint[5] = 1;
  const disjointForwardSeams = [[0, 1], [5, 6]];
  const disjointReverseSeams = [...disjointForwardSeams].reverse();
  const adjacentForwardExact = exactSchedule(initialAdjacent, adjacentForwardSeams);
  const adjacentReverseExact = exactSchedule(initialAdjacent, adjacentReverseSeams);
  const disjointForwardExact = exactSchedule(initialDisjoint, disjointForwardSeams);
  const disjointReverseExact = exactSchedule(initialDisjoint, disjointReverseSeams);
  const adjacentForwardObserved = empiricalSchedule(initialAdjacent, adjacentForwardSeams, SHOTS, random);
  const adjacentReverseObserved = empiricalSchedule(initialAdjacent, adjacentReverseSeams, SHOTS, random);
  const disjointForwardObserved = empiricalSchedule(initialDisjoint, disjointForwardSeams, SHOTS, random);
  const disjointReverseObserved = empiricalSchedule(initialDisjoint, disjointReverseSeams, SHOTS, random);
  const phase = phaseRows(random);
  const alpha = 0.01;
  const heldOutTolerance = Math.sqrt(Math.log(4 / alpha) / (2 * SHOTS)) * 2;
  const disjointObservedTv = totalVariation(disjointForwardObserved, disjointReverseObserved);
  const disjointCellDifference = Math.max(...[...new Set([
    ...Object.keys(disjointForwardObserved),
    ...Object.keys(disjointReverseObserved)
  ])].map((id) => Math.abs((disjointForwardObserved[id] ?? 0) - (disjointReverseObserved[id] ?? 0))));
  const disjointCellNullEnvelope = Math.sqrt(2 * Math.log(8 / alpha) / SHOTS);
  const heldOutPhasePass = Object.values(phase).every((row) => row.heldOut.every(({ residual }) => Math.abs(residual) <= heldOutTolerance));
  const adjacentOrderPass = totalVariation(adjacentForwardObserved, adjacentReverseObserved) >= 0.15;
  const disjointSamplingCompatibilityPass = disjointCellDifference < disjointCellNullEnvelope;
  const exactDisjointCommutationPass = totalVariation(disjointForwardExact, disjointReverseExact) === 0;
  const instruments = Object.fromEntries(["C0", "C", "E", "T"].map((name) => [name, compileInstrument(name)]));
  const instrumentCompilerPass = Object.values(instruments).every(({ definiteCurrent, maxIsometryError }) => definiteCurrent && maxIsometryError < 1e-14);

  return {
    schema: "oph-independent-reference-emulator-v1",
    generated: "2026-10-27",
    independence: {
      implementation: "clean-room JavaScript from the published mathematical record-law specification",
      importsOriginalOphCode: false,
      comparesAgainstOriginalReceiptAtRuntime: false,
      encodedInputs: ["native fair-coin seam update", "g/k detector equations", "entrywise repetition law"],
      establishedForNamedLaws: ["definite-current Kraus reconstruction", "logical Stinespring isometry", "authored computational record basis"],
      notEstablished: ["unique dilation", "native hardware gate decomposition", "physical realization"]
    },
    seed: SEED,
    shotsPerSetting: SHOTS,
    commonClassicalTable: classicalTable(),
    instrumentCompiler: {
      carrierBasis: seamKeys,
      recordBasisPolicy: "one computational ancilla label per declared record value; unused bit strings are leakage states",
      instruments,
      pass: instrumentCompilerPass
    },
    phase,
    repetition: Object.fromEntries(["C0", "C", "E", "T"].map((name) => [name, [1, 2, 3, 4].map((depth) => ({
      depth,
      phase0Probability: phaseProbability(laws[name].g, 0, depth)
    }))])),
    kProbe: Object.fromEntries(Object.entries(laws).map(([name, law]) => [name, kProbability(law.k)])),
    schedule: {
      adjacent: {
        forwardSeams: adjacentForwardSeams,
        reverseSeams: adjacentReverseSeams,
        exactForward: adjacentForwardExact,
        exactReverse: adjacentReverseExact,
        exactTotalVariation: totalVariation(adjacentForwardExact, adjacentReverseExact),
        observedForward: adjacentForwardObserved,
        observedReverse: adjacentReverseObserved,
        observedTotalVariation: totalVariation(adjacentForwardObserved, adjacentReverseObserved)
      },
      disjoint: {
        forwardSeams: disjointForwardSeams,
        reverseSeams: disjointReverseSeams,
        exactForward: disjointForwardExact,
        exactReverse: disjointReverseExact,
        exactTotalVariation: totalVariation(disjointForwardExact, disjointReverseExact),
        observedForward: disjointForwardObserved,
        observedReverse: disjointReverseObserved,
        observedTotalVariation: disjointObservedTv,
        maximumObservedCellDifference: disjointCellDifference,
        conservativeCellNullEnvelope: disjointCellNullEnvelope
      }
    },
    decision: {
      alpha,
      heldOutAbsoluteResidualTolerance: heldOutTolerance,
      allHeldOutPhasePredictionsPass: heldOutPhasePass,
      adjacentOrderPass,
      disjointRawEngineeringThresholdPass: disjointObservedTv < 0.02,
      disjointSamplingCompatibilityPass,
      exactDisjointCommutationPass,
      logicalReferencePass: instrumentCompilerPass && heldOutPhasePass && adjacentOrderPass && disjointSamplingCompatibilityPass && exactDisjointCommutationPass,
      hardwareGate5Pass: false,
      disposition: "observable-level independent reference complete; circuit compiler and physical run remain open"
    }
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const receipt = buildReceipt();
  const args = process.argv.slice(2);
  const writeIndex = args.indexOf("--write");
  if (writeIndex >= 0) {
    const target = resolve(args[writeIndex + 1] ?? "evidence/data/oph-independent-reference-emulator-v1.json");
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
    console.log(target);
  } else {
    console.log(JSON.stringify(receipt, null, 2));
  }
}

export { buildReceipt, phaseProbability, repair, totalVariation };
