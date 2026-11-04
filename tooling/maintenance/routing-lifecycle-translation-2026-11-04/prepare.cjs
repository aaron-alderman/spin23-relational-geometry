const fs=require('fs'),p=require('path'),cp=require('child_process');
const audit=__dirname,prior=p.resolve('tooling/maintenance/semantic-contract-translation-2026-11-04'),root=p.resolve('.platform-reconstitution/sourcery-platform-reconciled');
fs.mkdirSync(p.join(audit,'prior-records'),{recursive:true});
for(const name of ['authority-map.json','platform-residual-ledger.json','domain-inventory.json','RECONSTITUTION-RECEIPT.md'])fs.copyFileSync(p.resolve('.platform-reconstitution',name),p.join(audit,'prior-records',name));
for(const name of ['semantic-contract-cases.json','semantic-contract-translations.json','retained-semantic-contracts.json'])fs.copyFileSync(p.join(root,'assurance',name),p.join(audit,'prior-records',name));
for(const name of ['assemble-reconciled.cjs','verify-reconciled-runtime.mjs','prepare-claimipedia-assembly.cjs','prepare-platform-proxy.cjs','verify-prior-contracts.cjs','verify-assembly-consumers.cjs','verify-assembled-runtime.cjs','refresh-bootstrap-source.cjs','run-bootstrap-pair.mjs','verify-audit-commit.cjs','refresh-source-declarations.mjs','observe-assurance.mjs','record-runtime-boundaries.mjs','verify-semantic-projection.cjs','record-translation-ledger.mjs','finalize-baseline.cjs','clarify-current-counts.cjs']){
 let s=fs.readFileSync(p.join(prior,name),'utf8').replaceAll('semantic-translation-validation-2026-11-04','routing-lifecycle-validation-2026-11-04').replaceAll('tooling/maintenance/semantic-contract-translation-2026-11-04','tooling/maintenance/routing-lifecycle-translation-2026-11-04');fs.writeFileSync(p.join(audit,name),s);
}
for(const name of ['bootstrap-inputs.json','contract-qualification.json'])fs.copyFileSync(p.join(prior,name),p.join(audit,name));
fs.writeFileSync(p.join(audit,'pins.json'),JSON.stringify({platform:cp.execFileSync('git',['-C',root,'rev-parse','HEAD']).toString().trim(),core:cp.execFileSync('git',['-C',p.resolve('.platform-reconstitution/claimipedia-core'),'rev-parse','HEAD']).toString().trim()},null,2)+'\n');
fs.writeFileSync(p.join(audit,'.gitattributes'),'* -text -whitespace\n');
console.log('Prepared fresh audit; prior receipts copied, original evidence untouched.');
