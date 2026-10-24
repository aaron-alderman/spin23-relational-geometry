#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const outputPath = path.join(root, "evidence/data/admissibility-coordinated-selector-closure-v1.json");

const pi = Math.PI;
const c = 3 / 4;
const s = Math.sqrt(7) / 4;
const gap = 1;
const loopRate = 0.02;
const cycleTime = 2 * pi / loopRate;
const selector = {a: 1, b: 2, y: [0, 0, 1], provenance: "externally_declared_reference_axis_not_fit_from_outputs"};
const initialAngles = [0.03, 0.1, 0.3, 0.8, 1.2];

const angleMap = (theta, a, b) => b === 0 ? theta : 0.5 * Math.atan2(a * Math.sin(2 * theta), b + a * Math.cos(2 * theta));
const yOnAngles = initialAngles.map((theta) => angleMap(theta, selector.a, selector.b));
const yOffAngles = initialAngles.map((theta) => angleMap(theta, 1, 0));

const holonomy = {
  latitudeCosine: c,
  latitudeSine: s,
  gap,
  loopRate,
  cycleTime,
  adiabaticRatio: loopRate * s / gap,
  projectorClosureError: 0,
  forwardGeometricAngle: pi / 2,
  reverseGeometricAngle: -pi / 2,
  dynamicDoubletPhase: gap * cycleTime,
  requiredCalibration: "common_doublet_phase_removed_by_reference_or_echo",
};

const mechanisms = {
  geometricHolonomy: {forwardAngle: pi / 2, reverseAngle: -pi / 2, logSingularRatio: 0, projectorClosureError: 0},
  staticSplitting: {forwardAngle: pi / 2, reverseAngle: pi / 2, logSingularRatio: 0, projectorClosureError: 0},
  differentialLoss: {forwardAngle: pi / 2, reverseAngle: pi / 2, logSingularRatio: 0.45, projectorClosureError: 0},
};

const channelDefinitions = {
  forwardNormalizedEndpoint: {fields: ["forwardAngle"], cost: 1, noise: {forwardAngle: 0.05}},
  addReverseComplexTomography: {fields: ["forwardAngle", "reverseAngle"], cost: 2, noise: {forwardAngle: 0.05, reverseAngle: 0.05}},
  addProcessSingularValues: {fields: ["forwardAngle", "reverseAngle", "logSingularRatio"], cost: 3, noise: {forwardAngle: 0.05, reverseAngle: 0.05, logSingularRatio: 0.05}},
};

function equivalenceClasses(fields, tolerance = 1e-12) {
  const classes = [];
  for (const [name, record] of Object.entries(mechanisms)) {
    let found = classes.find((group) => fields.every((field) => Math.abs(mechanisms[group[0]][field] - record[field]) <= tolerance));
    if (!found) {
      found = [];
      classes.push(found);
    }
    found.push(name);
  }
  return classes;
}

function informationSummary(definition) {
  const names = Object.keys(mechanisms);
  const pairs = [];
  for (let i = 0; i < names.length; i += 1) for (let j = i + 1; j < names.length; j += 1) {
    const a = mechanisms[names[i]];
    const b = mechanisms[names[j]];
    const information = definition.fields.reduce((sum, field) => sum + ((a[field] - b[field]) / definition.noise[field]) ** 2, 0);
    pairs.push({pair: [names[i], names[j]], efficientInformation: information});
  }
  return {
    fields: definition.fields,
    cost: definition.cost,
    equivalenceClasses: equivalenceClasses(definition.fields),
    pairwise: pairs,
    worstPairInformation: Math.min(...pairs.map((pair) => pair.efficientInformation)),
    worstPairInformationPerCost: Math.min(...pairs.map((pair) => pair.efficientInformation)) / definition.cost,
  };
}

const detectorBundles = Object.fromEntries(Object.entries(channelDefinitions).map(([name, definition]) => [name, informationSummary(definition)]));

const epsilon = 0.6;
const inputState = {p0: 0.3, p1: 0.7, coherence: 0.2};
const outcomes = [+1, -1].map((sign) => {
  const weight0 = (1 + sign * epsilon) / 2;
  const weight1 = (1 - sign * epsilon) / 2;
  const probability = weight0 * inputState.p0 + weight1 * inputState.p1;
  return {
    sign,
    probability,
    conditioned: {
      p0: weight0 * inputState.p0 / probability,
      p1: weight1 * inputState.p1 / probability,
      coherence: Math.sqrt(weight0 * weight1) * inputState.coherence / probability,
    },
  };
});
const unconditionalMeasurement = outcomes.reduce((state, outcome) => ({
  p0: state.p0 + outcome.probability * outcome.conditioned.p0,
  p1: state.p1 + outcome.probability * outcome.conditioned.p1,
  coherence: state.coherence + outcome.probability * outcome.conditioned.coherence,
}), {p0: 0, p1: 0, coherence: 0});

const selectedFixedPopulation = 0.8;
const contraction = selector.a / (selector.a + selector.b);
const coarsePopulationMap = (population) => selectedFixedPopulation + contraction * (population - selectedFixedPopulation);
const monitoredAfterSelector = coarsePopulationMap(unconditionalMeasurement.p1);

const totalForwardRate = 4;
const totalReverseRate = 1;
const relaxationRate = totalForwardRate + totalReverseRate;
const observationTime = -Math.log(contraction) / relaxationRate;
const equilibrium = {
  implementation: "single_detailed_balance_channel",
  forwardRates: [4],
  reverseRates: [1],
  fixedPopulation: selectedFixedPopulation,
  contraction,
  observationTime,
  stationaryEntropyProductionRate: 0,
};

function stationaryEntropyProduction(forwardRates, reverseRates, pSelected = selectedFixedPopulation) {
  const pOther = 1 - pSelected;
  return forwardRates.reduce((sum, forwardRate, index) => {
    const forwardFlux = pOther * forwardRate;
    const reverseFlux = pSelected * reverseRates[index];
    const current = forwardFlux - reverseFlux;
    return sum + current * Math.log(forwardFlux / reverseFlux);
  }, 0);
}

const drivenForwardRates = [3.5, 0.5];
const drivenReverseRates = [0.2, 0.8];
const driven = {
  implementation: "two_hidden_channels_with_opposed_stationary_currents",
  forwardRates: drivenForwardRates,
  reverseRates: drivenReverseRates,
  totalForwardRate: drivenForwardRates.reduce((sum, value) => sum + value, 0),
  totalReverseRate: drivenReverseRates.reduce((sum, value) => sum + value, 0),
  fixedPopulation: selectedFixedPopulation,
  contraction,
  observationTime,
  channelCurrents: drivenForwardRates.map((rate, index) => (1 - selectedFixedPopulation) * rate - selectedFixedPopulation * drivenReverseRates[index]),
  stationaryEntropyProductionRate: stationaryEntropyProduction(drivenForwardRates, drivenReverseRates),
};

const stationaryOutcomeProbabilities = [+1, -1].map((sign) => {
  const p0 = 1 - selectedFixedPopulation;
  const p1 = selectedFixedPopulation;
  return ((1 + sign * epsilon) / 2) * p0 + ((1 - sign * epsilon) / 2) * p1;
});
const shannonNats = -stationaryOutcomeProbabilities.reduce((sum, probability) => sum + probability * Math.log(probability), 0);
const monitored = {
  implementation: "weak_measurement_record_plus_same_coarse_population_selector",
  weakMeasurementStrength: epsilon,
  fixedPopulation: selectedFixedPopulation,
  contraction,
  observationTime,
  systemStationaryEntropyProductionRate: 0,
  stationaryOutcomeProbabilities,
  minimumResetWorkPerRecordedCycleInKBT: shannonNats,
  caveat: "Landauer_bound_only_not_a_complete_detector_hardware_cost",
};

const output = {
  schema: "admissibility.coordinated-selector-closure/1",
  id: "AZ-057",
  generatedAt: new Date().toISOString(),
  scope: ["OT-001", "OT-002", "OT-003", "OT-004", "OT-005"],
  commonGenerativeGraph: ["control", "three_mode_hamiltonian", "projector_and_coherent_frame", "selector_or_measurement_instrument", "latent_state", "detector_folding", "raw_record"],
  holonomy,
  detectorEquivalence: {
    mechanisms,
    bundles: detectorBundles,
    minimumSeparatingBundle: "forward_plus_reverse_complex_tomography_plus_process_singular_values",
    heldOutControls: {
      echo: {geometricHolonomy: "unchanged", staticSplitting: "cancelled", differentialLoss: "not_cancelled"},
      lossBalance: {geometricHolonomy: "unchanged", staticSplitting: "unchanged", differentialLoss: "log_singular_ratio_to_zero"},
    },
  },
  independentSelector: {
    selector,
    initialAngles,
    yOffAngles,
    yOnAngles,
    fixedPoint: "Y",
    tangentMultiplierOff: 1,
    tangentMultiplierOn: contraction,
    yWasFitFromSelectedState: false,
  },
  instrument: {
    inputState,
    outcomes,
    unconditionalMeasurement,
    expectedCoherenceMultiplier: Math.sqrt(1 - epsilon ** 2),
    measurementOnlyFixedSet: "all_diagonal_states",
    monitoredAfterSelectorPopulation: monitoredAfterSelector,
    selectorFixedPopulation: selectedFixedPopulation,
    selectorContraction: contraction,
  },
  matchedThermodynamicImplementations: {
    sharedCoarseMap: {fixedPopulation: selectedFixedPopulation, contraction, observationTime},
    equilibrium,
    driven,
    monitored,
  },
  adjudication: {
    "OT-001": "closed_for_declared_three_mechanism_local_family_global_nonlinear_injectivity_remains_OT-034",
    "OT-002": "analytic_model_and_detector_bundle_closed_physical_carrier_calibration_open",
    "OT-003": "independence_enforced_in_model_physical_provenance_of_Y_open",
    "OT-004": "conditioned_and_unconditional_channels_jointly_identified_in_model_physical_record_efficiency_open",
    "OT-005": "same_coarse_contraction_different_costs_computed_complete_precision_speed_cost_measurement_open",
  },
  firewalls: {
    physicalCarrierChosen: false,
    materialScaleSet: false,
    completeDetectorHardwareCostComputed: false,
    spin23OrE8Derivation: false,
  },
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`wrote ${path.relative(root, outputPath)}`);
console.log(JSON.stringify({
  detectorClasses: Object.fromEntries(Object.entries(detectorBundles).map(([name, bundle]) => [name, bundle.equivalenceClasses])),
  selectorSlopes: {off: 1, on: contraction},
  unconditionalMeasurement,
  thermodynamics: {
    equilibriumStationaryEpr: equilibrium.stationaryEntropyProductionRate,
    drivenStationaryEpr: driven.stationaryEntropyProductionRate,
    monitoredResetKBT: monitored.minimumResetWorkPerRecordedCycleInKBT,
  },
}, null, 2));
