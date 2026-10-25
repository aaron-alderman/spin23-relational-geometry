#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const record = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-odd-charging-floor-v1.json'), 'utf8'));
function assert(condition, message) { if (!condition) throw new Error(message); }

assert(record.schemaVersion === 'leech-odd-charging-floor-v1', 'wrong schema');
assert(record.premises.chargeCoordinatesIntegral, 'integral charges missing');
assert(record.premises.leechUnimodular, 'unimodularity missing');
assert(record.premises.minimumDualNorm === 4, 'wrong dual minimum');
assert(record.premises.sourceRecords.includes('leech-explicit-k-matrix-v1'), 'Leech source record missing');
assert(record.premises.sourceRecords.includes('leech-unimodular-dual-basis-compiler-v1'), 'dual compiler record missing');
assert(record.premises.oddSectorExcludesZeroCharge, 'parity exclusion missing');
assert(Math.abs(record.operatorBound.oddChargingFloor - 0.02) < 1e-15, 'wrong charging floor');
assert(Math.abs(record.operatorBound.strengthenedTwentyFifthSeparator - 4.333466520526786) < 5e-13, 'wrong strengthened separator');
assert(record.targetedProjection.numberBelowStrengthenedSeparator === 20, 'unexpected admitted count');
assert(record.targetedProjection.allLowest24BelowStrengthenedSeparator === false, 'must refuse closure');

console.log(JSON.stringify({
  status: 'PASS',
  oddChargingFloor: record.operatorBound.oddChargingFloor,
  oldSeparator: record.operatorBound.potentialTwentyFifthSeparator,
  strengthenedSeparator: record.operatorBound.strengthenedTwentyFifthSeparator,
  valuesBelow: record.targetedProjection.numberBelowStrengthenedSeparator,
  admitted: record.targetedProjection.allLowest24BelowStrengthenedSeparator
}));
