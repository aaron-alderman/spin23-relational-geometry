#!/usr/bin/env node
/** Select a feasible cooling architecture from the typed geometry Pareto set. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const geometry = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/geometry-pareto-evaluation.json'), 'utf8'));
const candidates = geometry.qualifiedCandidates;
const policies = [0.12, 0.2, 0.4, 0.8].map((availableConductance) => {
  const feasible = candidates.filter((row) => row.wallConductance <= availableConductance && row.innerPeak <= 1 && row.maxGradient <= 0.1);
  const selected = feasible.sort((a, b) => a.innerCoolingFraction - b.innerCoolingFraction || a.wallConductance - b.wallConductance)[0] ?? null;
  return { availableConductance, selected };
});
const result = { protocol: 'plasma-heart-adaptive-geometry/2', sourceProtocol: geometry.protocol, policies, selectedForCurrentEstimate: policies[0].selected, rule: 'choose minimum inner-cooling fraction among candidates passing inner peak and gradient constraints', physicalAdmission: false, scope: 'Typed supervisory geometry policy; geometry cannot be changed online without a reconfigurable thermal design.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/adaptive-geometry-policy-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ policyCount: policies.length, selectedForCurrentEstimate: result.selectedForCurrentEstimate, physicalAdmission: false }, null, 2));
