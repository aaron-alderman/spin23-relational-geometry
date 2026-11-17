import fs from 'node:fs';

const algebra = JSON.parse(fs.readFileSync('corpus/programmes/programme-algebra/plasma_heart_algebra_v1.json', 'utf8'));
const conductances = [0.12, 0.2, 0.4, 0.8];
const coolingFractions = [0.5, 0.6, 0.7, 0.8];
const cases = conductances.flatMap(wallConductance => coolingFractions.map(innerCoolingFraction => {
  const innerPeak = 0.995 - 0.025 * innerCoolingFraction - 0.012 * Math.log2(1 + wallConductance);
  const maxGradient = Math.max(0.005, 0.075 - 0.055 * innerCoolingFraction / (1 + wallConductance));
  return { wallConductance, innerCoolingFraction, innerPeak, maxGradient, meshIdentity: 'synthetic-thermal-grid-v1', solverIdentity: 'algebraic-thermal-reference/1' };
}));
const objectives = ['wallConductance', 'innerCoolingFraction', 'innerPeak', 'maxGradient'];
const dominates = (a, b) => objectives.every(key => a[key] <= b[key]) && objectives.some(key => a[key] < b[key]);
const qualifiedCandidates = cases.filter(row => row.innerPeak <= 1 && row.maxGradient <= 0.1);
const paretoFront = qualifiedCandidates.filter(row => !qualifiedCandidates.some(other => other !== row && dominates(other, row)));
const result = {
  protocol: 'plasma-heart-geometry-pareto/2', algebraProtocol: algebra.protocol,
  objectives: ['minimize wall conductance/material burden', 'minimize inner cooling fraction', 'minimize inner peak', 'minimize radial gradient'],
  qualifiedCandidates, paretoFront,
  verification: { allSpatiallyQualified: paretoFront.every(row => row.innerPeak <= 1 && row.maxGradient <= 0.1), nonDominated: paretoFront.every(row => !paretoFront.some(other => other !== row && dominates(other, row))) },
  physicalAdmission: false,
  scope: 'Synthetic geometry/thermal Pareto evaluator; resolved thermal CFD and manufacturability constraints remain required.'
};
fs.mkdirSync('output/plasma-heart-algebra', { recursive: true });
fs.writeFileSync('output/plasma-heart-algebra/geometry-pareto-evaluation.json', `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ qualifiedCandidates: qualifiedCandidates.length, paretoFront: paretoFront.length, physicalAdmission: false }, null, 2));
