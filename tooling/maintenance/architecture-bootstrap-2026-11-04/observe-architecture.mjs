import {writeFileSync} from 'node:fs';
import {auditPlatform,checkPlatform} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/platform-assurance.mjs';
import {auditPlatformReconstitutionGoal} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/platform-reconstitution-goal-audit.mjs';
const report=auditPlatform(),drift=checkPlatform(report),goal=auditPlatformReconstitutionGoal({report});
writeFileSync(new URL(process.argv[2]||'./current-assurance.json',import.meta.url),JSON.stringify({observedAt:new Date().toISOString(),report,drift,goal,scientificAcceptance:false},null,2)+'\n');
console.log(JSON.stringify({summary:report.summary,metricPolicy:drift.metricPolicy,goal:goal.requirements.map(r=>({id:r.id,status:r.status})),unowned:report.internals.filter(r=>r.semanticIsland).map(r=>r.path)}));
