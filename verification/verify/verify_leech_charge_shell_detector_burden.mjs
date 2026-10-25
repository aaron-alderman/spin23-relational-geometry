#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const record = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-detector-burden-v1.json'), 'utf8'));
function assert(condition, message) { if (!condition) throw new Error(message); }

assert(record.schemaVersion === 'leech-charge-shell-detector-burden-v1', 'wrong schema');
assert(record.inputs.includes('leech-charge-shell-commissioning-v1'), 'protocol input missing');
assert(record.inputs.includes('leech-charge-shell-discrimination-v1'), 'power input missing');
const background = record.zeroEventBackgroundBurden;
const efficiency = record.detectorEfficiencyBurden;
const masking = record.adversarialMaskingMargins;
assert(Math.abs(background.maximumNormTwoBackgroundPerTrial - 1.7122863691376722e-6) < 1e-18, 'wrong norm-two background burden');
assert(Math.abs(background.maximumOddBackgroundPerTrialForFamilyPass - 5.559885549732968e-7) < 1e-19, 'wrong odd background burden');
assert(Math.abs(efficiency.minimumNormTwoDetectionEfficiency - 0.9221742045850689) < 1e-14, 'wrong norm-two efficiency burden');
assert(Math.abs(efficiency.minimumOddLeakDetectionEfficiency - 0.4786324168688738) < 1e-14, 'wrong odd efficiency burden');
assert(Math.abs(masking.graphSamplingBiasNeededToEnterAcceptanceBand - 0.02) < 1e-14, 'wrong graph masking margin');
assert(Math.abs(masking.coronaSamplingBiasNeededToEnterAcceptanceBand - 0.02) < 1e-14, 'wrong corona masking margin');
assert(Math.abs(masking.evenControlCalibrationBiasNeededToEnterAcceptanceBand - 0.04) < 1e-14, 'wrong control masking margin');
assert(record.requiredPromotion.options.length === 3, 'promotion options incomplete');
assert(record.requiredPromotion.recommended.includes('two-sample likelihood'), 'recommended background repair missing');

console.log(JSON.stringify({
  status: 'PASS',
  normTwoBackgroundMaximum: background.maximumNormTwoBackgroundPerTrial,
  oddFamilyBackgroundMaximum: background.maximumOddBackgroundPerTrialForFamilyPass,
  normTwoEfficiencyMinimum: efficiency.minimumNormTwoDetectionEfficiency,
  oddEfficiencyMinimum: efficiency.minimumOddLeakDetectionEfficiency,
  graphMaskingMargin: masking.graphSamplingBiasNeededToEnterAcceptanceBand,
  coronaMaskingMargin: masking.coronaSamplingBiasNeededToEnterAcceptanceBand,
  evenControlMaskingMargin: masking.evenControlCalibrationBiasNeededToEnterAcceptanceBand
}));
