import {resolve,sep} from 'node:path';

const relative=value=>typeof value==='string'&&value.length>0&&!value.includes('\\')&&!value.includes(':')&&value.split('/').every(p=>p&&p!=='.'&&p!=='..');
export function qualificationProfile(document,root){
 if(document?.protocol!=='sourcery/managed-qualification-profile.v1'||!relative(document.engineDirectory)||!relative(document.inputDirectory)||!Array.isArray(document.additionalTests))throw Error('Invalid explicit qualification profile');
 const seen=new Set();for(const row of document.additionalTests){if(!/^test\/[a-zA-Z0-9._-]+\.test\.mjs$/u.test(row.path)||seen.has(row.path)||!Number.isSafeInteger(row.tests)||row.tests<1)throw Error('Invalid or duplicate additional test');if(row.nodeOptions!==undefined&&(!Array.isArray(row.nodeOptions)||row.nodeOptions.length>1||row.nodeOptions.some(flag=>flag!=='--experimental-vm-modules')))throw Error('Unsupported additional test option');seen.add(row.path);}
 if(!Number.isSafeInteger(document.runtimeModules)||document.runtimeModules<1)throw Error('Invalid runtime module expectation');
 const base=resolve(root),engine=resolve(base,document.engineDirectory),inputs=resolve(base,document.inputDirectory);if(!engine.startsWith(base+sep)||!inputs.startsWith(base+sep))throw Error('Qualification profile escaped workspace');
 return {...document,engine,inputs,artifactSuites:15+document.additionalTests.length,artifactChecks:2462+document.additionalTests.reduce((n,r)=>n+r.tests,0),bootstrapStages:18+document.additionalTests.length};
}
export function adaptQualificationRecipe(name,original,profile,root){
 let result=original.replaceAll('all-remaining-contract-validation-2026-11-05','managed-validation/work').replaceAll('assembly-refined-final','assembly').replaceAll('claimipedia-against-refined-assembly','consumers');
 const ledger="require('../semantic-contract-resolution-2026-11-04/test-qualification-ledger.json')";
 result=result.replace(ledger,'require('+JSON.stringify(resolve(root,'tooling/maintenance/semantic-contract-resolution-2026-11-04/test-qualification-ledger.json'))+')');
 if(name==='verify-assembled-runtime.cjs'){const anchor='record.modules!==889';if(result.split(anchor).length!==2)throw Error('Runtime recipe expectation changed; explicit engine review required');result=result.replace(anchor,'record.modules!=='+profile.runtimeModules);}
 if(name==='verify-assembly-consumers.cjs'&&profile.additionalTests.length){const anchor='const results=[];async function run';if(result.split(anchor).length!==2)throw Error('Consumer recipe structure changed; explicit engine review required');const rows=profile.additionalTests.map((r,i)=>'jobs.push(['+JSON.stringify('assembled-additional-'+(i+1)+'-tests.txt')+",path.join(fixture,'sourcery-platform-reconciled'),"+JSON.stringify([...(r.nodeOptions||[]),'--test',r.path])+','+r.tests+']);').join('\n');result=result.replace(anchor,rows+'\n'+anchor);}
 return result;
}
export function verifyAdditionalTestReport(text,expected){
 const plain=text.replace(/\u001b\[[0-9;]*m/gu,'');
 for(const [label,count]of [['tests',expected],['pass',expected],['fail',0],['cancelled',0],['skipped',0]])if(!new RegExp('(?:^|\\n)(?:ℹ|#) '+label+' '+count+'\\r?(?:\\n|$)','u').test(plain))throw Error('Additional test report count mismatch: '+label);
 return true;
}
