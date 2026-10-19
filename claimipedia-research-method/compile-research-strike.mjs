import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const methodPath = resolve(process.argv[2] || resolve(here, "meta2-research-process.json"));
const instancePath = resolve(process.argv[3] || resolve(here, "d02-support-stratified-schur-strike.json"));
const outputDirectory = resolve(process.argv[4] || resolve(here, "generated"));
const parse = (path) => JSON.parse(readFileSync(path, "utf8"));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

export function validateResearchStrike(method, instance) {
  assert.equal(method.protocol, "claimipedia-option-preserving-research-process/1");
  assert.equal(instance.protocol, "claimipedia-option-preserving-research-instance/1");
  assert.equal(instance.methodId, method.processId);
  assert.equal(instance.authority.proposalOnly, true);
  assert.equal(instance.authority.entails, false);
  assert.equal(instance.authority.empiricalAuthority, false);
  assert.equal(instance.authority.automaticCorpusAdmission, false);
  assert.equal(instance.authority.applicationAdmission, false);

  for (const foundation of method.existingFoundations) {
    const foundationPath = resolve(here, foundation.path);
    const actualHash = sha256(readFileSync(foundationPath));
    assert.equal(actualHash, foundation.sha256, `method foundation drift: ${foundation.id}`);
    assert.ok(foundation.contributes.length > 0, `method foundation ${foundation.id} has no declared contribution`);
  }

  const requiredLayers = method.requiredLayers.map(({ id }) => id);
  const ledgerLayers = instance.layerLedgers.map(({ layer }) => layer);
  assert.equal(new Set(ledgerLayers).size, ledgerLayers.length, "layer ledgers must not be collapsed or duplicated");
  assert.deepEqual([...ledgerLayers].sort(), [...requiredLayers].sort(), "every required layer needs its own ledger");
  for (const ledger of instance.layerLedgers) {
    assert.ok(ledger.objects.length > 0, `layer ${ledger.layer} has no objects`);
    assert.ok(ledger.claim && ledger.frontier, `layer ${ledger.layer} must state a claim and frontier`);
  }

  assert.ok(instance.symmetryScope.closedWorld);
  assert.ok(instance.symmetryScope.searchedClasses.length >= 6);
  assert.ok(instance.symmetryScope.globalFrontier.length > 0);
  assert.ok(instance.symmetries.length > 0);
  for (const symmetry of instance.symmetries) {
    for (const field of method.symmetryRecordRequiredFields) {
      assert.ok(Object.hasOwn(symmetry, field), `symmetry ${symmetry.id || "<unknown>"} missing ${field}`);
      assert.notEqual(symmetry[field], "", `symmetry ${symmetry.id} has empty ${field}`);
    }
    assert.ok(requiredLayers.includes(symmetry.layer), `symmetry ${symmetry.id} uses an unknown layer`);
  }

  assert.ok(instance.optionPoints.length > 0);
  for (const point of instance.optionPoints) {
    assert.ok(point.options.length >= 2, `option point ${point.id} collapsed to one path`);
    assert.equal(new Set(point.options.map(({ id }) => id)).size, point.options.length, `duplicate option in ${point.id}`);
    assert.ok(point.options.some(({ id }) => id === point.selectedForStrike), `selected option missing in ${point.id}`);
    for (const option of point.options) {
      assert.ok(option.commitment && option.discomfort && option.reentry, `option ${option.id} lacks a branch contract`);
    }
  }

  for (const bridge of instance.crossLayerBridges) {
    assert.notEqual(bridge.fromLayer, bridge.toLayer, `bridge ${bridge.id} does not cross layers`);
    assert.ok(requiredLayers.includes(bridge.fromLayer) && requiredLayers.includes(bridge.toLayer), `bridge ${bridge.id} uses an unknown layer`);
    assert.ok(method.allowedCrossLayerRelations.includes(bridge.relation), `bridge ${bridge.id} uses forbidden relation ${bridge.relation}`);
    assert.ok(bridge.statement && bridge.test, `bridge ${bridge.id} lacks a statement or test`);
  }

  const links = instance.lightningStrike.links;
  assert.ok(instance.lightningStrike.conditional && instance.lightningStrike.completionRule);
  assert.ok(links.length >= 3);
  for (const [index, link] of links.entries()) {
    assert.ok(link.necessary && link.closes && link.falsifier, `strike link ${link.id} lacks necessity, closure or falsifier`);
    assert.ok(link.options.length >= 2, `strike link ${link.id} hides its alternatives`);
    assert.ok(link.layers.length >= 1 && link.layers.every((layer) => requiredLayers.includes(layer)), `strike link ${link.id} has invalid layers`);
    if (index > 0) assert.equal(links[index - 1].to, link.from, `strike chain breaks between ${links[index - 1].id} and ${link.id}`);
  }

  assert.ok(instance.portfolio.some(({ role }) => role === "baseline"));
  assert.ok(instance.portfolio.some(({ role }) => role === "uncomfortable"));
  assert.ok(instance.portfolio.some(({ role }) => role === "pressure-test"));
  assert.ok(instance.portfolio.some(({ role }) => role === "shared-discriminant"));
  assert.ok(instance.ledgers.landscape.length > 0 && instance.ledgers.closure.length > 0);
  assert.ok(instance.nextDiscriminant && instance.stopTrigger && instance.reentry);

  return {
    foundationCount: method.existingFoundations.length,
    requiredLayerCount: requiredLayers.length,
    symmetryCount: instance.symmetries.length,
    optionPointCount: instance.optionPoints.length,
    retainedOptionCount: instance.optionPoints.reduce((sum, point) => sum + point.options.length, 0),
    bridgeCount: instance.crossLayerBridges.length,
    strikeLinkCount: links.length,
    portfolioRoleCount: new Set(instance.portfolio.map(({ role }) => role)).size
  };
}

export function compileResearchStrike(method, instance, methodBytes, instanceBytes) {
  const counts = validateResearchStrike(method, instance);
  const docket = {
  protocol: "claimipedia-option-preserving-research-docket/1",
  method: { id: method.processId, sha256: sha256(methodBytes) },
  instance: { id: instance.instanceId, sha256: sha256(instanceBytes) },
  terminalProposition: instance.terminalProposition,
  scope: instance.scope,
  layers: instance.layerLedgers,
  symmetries: { scope: instance.symmetryScope, records: instance.symmetries },
  optionPoints: instance.optionPoints,
  crossLayerBridges: instance.crossLayerBridges,
  lightningStrike: instance.lightningStrike,
  portfolio: instance.portfolio,
  firstExecution: instance.firstExecution,
  ledgers: instance.ledgers,
  nextDiscriminant: instance.nextDiscriminant,
  stopTrigger: instance.stopTrigger,
  reentry: instance.reentry,
  authority: instance.authority
  };
  const receipt = {
  protocol: "claimipedia-option-preserving-research-process-receipt/1",
  instanceId: instance.instanceId,
  ...counts,
  layerCollapseDetected: false,
  hiddenSingleOptionDetected: false,
  incompleteSymmetryRecordDetected: false,
  brokenStrikeChainDetected: false,
  authorityBoundaryPreserved: true,
  docketSha256: sha256(JSON.stringify(docket)),
  passed: true
  };
  return { docket, receipt };
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const methodBytes = readFileSync(methodPath);
  const instanceBytes = readFileSync(instancePath);
  const { docket, receipt } = compileResearchStrike(JSON.parse(methodBytes), JSON.parse(instanceBytes), methodBytes, instanceBytes);
  mkdirSync(outputDirectory, { recursive: true });
  writeFileSync(resolve(outputDirectory, "d02-research-docket.json"), `${JSON.stringify(docket, null, 2)}\n`);
  writeFileSync(resolve(outputDirectory, "d02-process-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
  console.log(JSON.stringify(receipt, null, 2));
}

