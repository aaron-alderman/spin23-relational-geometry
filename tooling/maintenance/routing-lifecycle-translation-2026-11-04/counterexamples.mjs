import {writeFileSync} from 'node:fs';
import {validateRouteActionKeywordDeclarations as validate} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/admissibility/route-contracts.mjs';
import {mergeFrontendRuntimeRegistries} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/browser/frontend-runtime-registry.mjs';
const f=(s,p,o,pol='is')=>({s,p,o,pol}),rows=[f('keyword','isa','Keyword'),f('keyword','family','routeAction'),f('keyword','value','render'),f('route','isa','Route'),f('route','as','render')];
const observe=fn=>{try{return {value:fn()};}catch(e){return {error:{name:e.name,code:e.code,message:e.message}};}};
const result={predecessor:'1a7526d40dea6b5abeaf5f4cc540b7b447ecb6f3',retractedKeyword:observe(()=>validate([...rows,f('keyword','value','render','is-not')])),retractedRoute:observe(()=>validate([f('r','isa','Route'),f('r','as','invalid'),f('r','isa','Route','is-not')])),mutableSequence:observe(()=>{const before=validate(rows);rows.push(f('route','as','invalid'));return {before,after:validate(rows)};}),ownActionName:observe(()=>Object.keys(mergeFrontendRuntimeRegistries([{actions:{toString:()=>true}}]).actions))};
writeFileSync(new URL(process.argv[2]||'predecessor-counterexamples.json',import.meta.url),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
