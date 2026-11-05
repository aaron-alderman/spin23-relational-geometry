import {writeFileSync} from 'node:fs';import {resolve} from 'node:path';
import {auditPlatform,checkPlatform} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/platform-assurance.mjs';
import {auditPlatformReconstitutionGoal} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/platform-reconstitution-goal-audit.mjs';
const root=resolve('.platform-reconstitution/sourcery-platform-reconciled'),report=auditPlatform({root}),drift=checkPlatform(report,{root}),goal=auditPlatformReconstitutionGoal({root,report,drift});
writeFileSync(new URL('current-assurance.json',import.meta.url),JSON.stringify({report,drift,goal},null,2)+'\n');
const invalid=report.findings.filter(r=>['invalid-runtime-ownership','undeclared-effect','invalid-source-capability','runtime-module-catalogue-mismatch'].includes(r.kind));
if(invalid.length||!report.runtimeModules.valid||report.summary.unownedActiveSemanticMjs!==0||!report.semanticContracts.valid||goal.complete)throw Error('Scoped source qualification refused: '+JSON.stringify(invalid));
console.log(JSON.stringify({runtime:report.runtimeModules,semantic:report.semanticContracts,unowned:report.summary.unownedActiveSemanticMjs,globalComplete:goal.complete,driftPass:drift.pass}));
