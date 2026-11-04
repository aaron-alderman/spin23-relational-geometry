import {writeFileSync} from 'node:fs';
import {auditPlatform,checkPlatform} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/platform-assurance.mjs';
import {auditPlatformReconstitutionGoal} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/platform-reconstitution-goal-audit.mjs';
const report=auditPlatform(),drift=checkPlatform(report),goal=auditPlatformReconstitutionGoal({report}),result={observedAt:new Date().toISOString(),report,drift,goal,scope:'Current local source observation. Historical residual acceptance is not renewed; goal completion remains withheld. Same-run engineering evidence.'};
if(goal.complete||drift.pass)throw Error('Unexpected architectural acceptance requires review');
writeFileSync(new URL('./current-assurance.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({repositories:report.summary.repositories,internals:report.summary.internals,unownedActiveSemanticMjs:report.summary.unownedActiveSemanticMjs,findings:report.findings.length,newFindings:drift.newFindings.length,regressions:drift.regressions.length,goalComplete:goal.complete,requirements:goal.requirements.map(r=>({id:r.id,status:r.status}))}));
