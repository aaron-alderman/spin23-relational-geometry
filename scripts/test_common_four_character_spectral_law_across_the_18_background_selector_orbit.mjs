import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';

const here=dirname(fileURLToPath(import.meta.url));
const raw=execFileSync(process.execPath,[join(here,'audit_the_handle_side_projector_bias_square_across_all_18_selector_backgrounds.mjs')],{encoding:'utf8'});
const orbit=JSON.parse(raw);
assert.equal(orbit.passed,true);assert.equal(orbit.audits.length,18);

const atomicOrder=['u','nu','d','e'];
const upToLeft={u:'CL',nu:'DL',d:'DR',e:'CR'};
const cdist=(a,b)=>Math.hypot(a.re-b.re,a.im-b.im);
const phase=l=>{const a=Math.atan2(l.im,l.re);return a>0?a-2*Math.PI:a;};
const gamma=l=>Math.tan(-phase(l)/4);
const representation=l=>{
  const candidates=[1,-1].map(sigma=>{
    const target=sigma===1?l:{re:-l.re,im:-l.im};
    const g=gamma(target);
    return {sigma,gamma:g,score:Number.isFinite(g)&&g>0?Math.abs(Math.log(g)):Infinity};
  });
  return candidates.sort((a,b)=>a.score-b.score)[0];
};
const permutations=a=>a.length===0?[[]]:a.flatMap((x,i)=>permutations([...a.slice(0,i),...a.slice(i+1)]).map(p=>[x,...p]));
const perms=permutations([0,1,2,3]);

const typed=orbit.audits.map(a=>{
  const cellToRoot=Object.fromEntries(a.cells.map(c=>[c.handle+c.side,c.j]));
  const rootIndices=atomicOrder.map(f=>cellToRoot[upToLeft[f]]);
  assert.equal(new Set(rootIndices).size,4);
  const eigenvalues=rootIndices.map(i=>a.eigenvalues[i]);
  const representations=eigenvalues.map(representation);
  return {background:a.index,rootIndices,eigenvalues,phases:eigenvalues.map(phase),representations,gammas:representations.map(x=>x.gamma),signs:representations.map(x=>x.sigma)};
});

const base=orbit.audits[0].eigenvalues;
const spectralComparisons=orbit.audits.map(a=>{
  let best=Infinity,bestPermutation=null;
  for(const p of perms){const e=Math.max(...p.map((j,i)=>cdist(base[i],a.eigenvalues[j])));if(e<best){best=e;bestPermutation=p;}}
  return {background:a.index,bestUnorderedEigenvalueMatchErrorToBackground0:best,bestPermutation};
});
const exactlyIsospectral=spectralComparisons.filter(x=>x.bestUnorderedEigenvalueMatchErrorToBackground0<1e-8).map(x=>x.background);

const gammaRanges=atomicOrder.map((f,j)=>{
  const values=typed.map(x=>x.gammas[j]),minimum=Math.min(...values),maximum=Math.max(...values);
  return {channel:f,minimum,maximum,ratio:maximum/minimum,spread:maximum-minimum};
});
const signPatterns=[...new Set(typed.map(x=>x.signs.join(',')))];
assert.ok(gammaRanges.some(x=>x.spread>1e-4));
assert.ok(exactlyIsospectral.length<18);

// D_chi is fixed on the globally labelled abstract character bundle.  Its
// realization on physical port amplitudes is background-dependent because the
// four spectral projector lines themselves move over the orbit.
const orientationParity={trivial:1,handle:1,channel:-1,product:-1};

console.log(JSON.stringify({
  protocol:'selector-orbit-common-four-character-spectral-law-audit/1',
  backgrounds:typed.length,
  fixedBiasSquareAssignment:upToLeft,
  typedSpectralData:typed,
  unorderedSpectralComparisonToBackground0:spectralComparisons,
  backgroundsExactlyIsospectralToBackground0:exactlyIsospectral,
  numberExactlyIsospectralToBackground0:exactlyIsospectral.length,
  fittedGammaRangesByAtomicChannel:gammaRanges,
  finiteSignedSquaredBlaschkeSignPatterns:signPatterns,
  scalarFamily:'f_f(z)=sigma_f b_gamma_f(z)^2, sigma_f in {+1,-1}; the minus branch has positive Cayley poles at plus/minus gamma and regularizes exact +1 checkpoint eigenvalues.',
  oneBackgroundIndependentSignedSquaredBlaschkeFactorPerTypedChannel:false,
  reason:'At the checkpoint frequency a common scalar factor would give the same typed eigenvalue in every background, but the typed eigenphases and finite fitted (sigma,gamma) data vary across the orbit.',
  abstractOrientationParity:orientationParity,
  orientationTransport:'D_chi is constant on the globally labelled character bundle; its realization on port amplitudes must move with the background spectral frame.',
  viableReplacement:'Use background-dependent signed factors (sigma_f(g),gamma_f(g)), or derive a nontrivial fractional transport law acting on the response spectral parameter. Simple unitary conjugation with one common scalar functional calculus is excluded.',
  boundary:'This audit uses the same fixed polarization and port convention as the 18-background bias-square certificate. A separately derived transport of polarization or frequency could change the comparison and must be stated explicitly.',
  conclusion:'The bias labels form a global discrete eigenbundle, but the rational-inner pole scales do not form four background-constant scalars. The analytic construction exists fiberwise, not yet as one equivariant spectral law.',
  passed:true,
},null,2));
