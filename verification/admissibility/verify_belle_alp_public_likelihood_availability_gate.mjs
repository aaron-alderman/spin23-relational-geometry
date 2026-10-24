import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("evidence/data/belle-alp-public-likelihood-availability-gate-v1.json", "utf8"));
const fail = message => { throw new Error(message); };
if (data.protocol !== "belle-alp-public-likelihood-availability-gate/1" || data.parent !== "AZ-079") fail("identity mismatch");
if (data.inspectedPrimarySurfaces.length < 3) fail("source-surface audit incomplete");
if (data.paperExtraction.modes.length !== 4 || data.paperExtraction.totalSystematicFraction !== 0.223) fail("paper extraction mismatch");
if (data.recastGate.releaseRequirements.length !== 6) fail("release packet incomplete");
if (data.recastGate.requirementsPublishedMachineReadably.some(item => item.available)) fail("availability ledger contradicts inspected public surfaces");
if (data.recastGate.exactJointRecastPossibleFromInspectedPublicObjects) fail("unsupported public recast promotion");
if (!/orientation and rough sensitivity/.test(data.recastGate.plotDigitizationPermittedUse)) fail("digitization firewall missing");
if (!/availability statement/.test(data.boundary.scope)) fail("scope firewall missing");
console.log("Belle ALP public-likelihood gate verified: the detector and aggregate limit are public, but the six-item covariance/likelihood packet required for an exact two-coordinate recast is not present on the inspected official surfaces.");
