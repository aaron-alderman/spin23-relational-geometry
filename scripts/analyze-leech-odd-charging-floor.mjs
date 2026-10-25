#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const temple = JSON.parse(fs.readFileSync(path.join(
  root, 'evidence', 'data', 'leech-temple-separator-burden-v1.json'
), 'utf8'));
const targeted = JSON.parse(fs.readFileSync(path.join(
  root, 'evidence', 'data', 'leech-odd-targeted-second-enrichment-v1.json'
), 'utf8'));
const leech = JSON.parse(fs.readFileSync(path.join(
  root, 'evidence', 'data', 'leech-explicit-k-matrix-v1.json'
), 'utf8'));
const dualCompiler = JSON.parse(fs.readFileSync(path.join(
  root, 'evidence', 'data', 'leech-unimodular-dual-basis-compiler-v1.json'
), 'utf8'));

const ratio = targeted.configuration.ratio;
const minimumDualNorm = leech.source.catalogueClaims.minimalNorm;
const oddChargingFloor = ratio * minimumDualNorm / 2;
const potentialSeparator = temple.potentialOnlySpectrum.oddTwentyFifthSeparator;
const strengthenedSeparator = potentialSeparator + oddChargingFloor;
const ritzValues = targeted.projectedSpectrum.ritzValues;
const output = {
  schemaVersion: 'leech-odd-charging-floor-v1',
  date: '2026-10-25',
  premises: {
    chargingOperator: '(U/2) q^T G^{-1} q',
    chargeCoordinatesIntegral: true,
    leechUnimodular: true,
    minimumDualNorm,
    inversionMapsCharge: 'q -> -q',
    oddSectorExcludesZeroCharge: true,
    ratio,
    sourceRecords: [leech.schemaVersion, dualCompiler.schemaVersion]
  },
  operatorBound: {
    statement: 'T restricted to the inversion-odd sector is at least (U/2)*4 times the identity',
    oddChargingFloor,
    potentialTwentyFifthSeparator: potentialSeparator,
    strengthenedTwentyFifthSeparator: strengthenedSeparator
  },
  targetedProjection: {
    dimension: targeted.configuration.projectedDimension,
    numberBelowPotentialSeparator: ritzValues.filter(value => value < potentialSeparator).length,
    numberBelowStrengthenedSeparator: ritzValues.filter(value => value < strengthenedSeparator).length,
    twentieth: ritzValues[19],
    twentyFirst: ritzValues[20],
    twentyFourth: ritzValues[23],
    allLowest24BelowStrengthenedSeparator: ritzValues.slice(0, 24).every(value => value < strengthenedSeparator)
  },
  boundary: 'The uniform odd-sector charging floor is an exact operator inequality once the integral dual-Leech identification and minimum norm four are accepted. It strengthens but does not yet close the 24-vector separator condition.'
};

if (process.argv.includes('--write')) {
  fs.writeFileSync(path.join(root, 'evidence', 'data', 'leech-odd-charging-floor-v1.json'), `${JSON.stringify(output, null, 2)}\n`);
}
console.log(JSON.stringify(output, null, 2));
