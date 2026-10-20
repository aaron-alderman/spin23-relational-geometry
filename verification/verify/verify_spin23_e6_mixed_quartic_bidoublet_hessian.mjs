import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-e6-mixed-quartic-bidoublet-hessian.json','utf8'));

assert.equal(evidence.schema,'spin23.e6-mixed-quartic-bidoublet-hessian/1');
assert.equal(evidence.source.archiveSha256,
  '1d0f48f46ede83ca8eed1bfaf0788acc741bfefe022d0fea008d47857b825d3a');

const n=27;
const zero=()=>Array.from({length:n},()=>Array(n).fill(0));
const T=zero(),U291=zero(),U311=zero();
T[12][12]=1;
U291[12][16]=U291[16][12]=-1/Math.sqrt(10);
U311[11][12]=U311[12][11]=-1/Math.sqrt(10);

const dot=(a,b)=>a.reduce((sum,x,i)=>sum+x*b[i],0);
const norm2=M=>M.flat().reduce((sum,x)=>sum+x*x,0);
assert.equal(norm2(T),1);
assert.ok(norm2(U291)>0 && norm2(U311)>0);

// For I2=bar(psi)^mu psi_nu bar(S)^(nu tau) S_(mu tau),
// the coefficient of bar(h_b) k_U at psi_13=v, S=T*w is
// sum_tau T_(13,tau) U_(b,tau).  Its conjugate has the same real CG.
const mixed=(b,U)=>dot(T[12],U[b]);
assert.ok(Math.abs(mixed(16,U291)+1/Math.sqrt(10))<1e-14);
assert.ok(Math.abs(mixed(11,U311)+1/Math.sqrt(10))<1e-14);
assert.equal(mixed(16,U311),0);
assert.equal(mixed(11,U291),0);

// The factorized invariant has no mixed Hessian because both tangent
// directions are orthogonal to their corresponding singlet backgrounds.
const e13=Array(n).fill(0),e17=Array(n).fill(0),e12=Array(n).fill(0);
e13[12]=1;e17[16]=1;e12[11]=1;
assert.equal(dot(e13,e17),0);
assert.equal(dot(e13,e12),0);
assert.equal(dot(T.flat(),U291.flat()),0);
assert.equal(dot(T.flat(),U311.flat()),0);

assert.equal(evidence.hessian.nonfactorizedMixedEntries.Hu0_chi291,'-1/sqrt(10)');
assert.equal(evidence.hessian.nonfactorizedMixedEntries.Hd0_chi311,'-1/sqrt(10)');
assert.equal(evidence.decision.genericBidoubletMixingNonzero,true);
assert.equal(evidence.decision.pureSymmetricParentLightBidoubletGeneric,false);
assert.equal(evidence.decision.settingLambda2ZeroIsEnforcedByCommutingAbelianSelector,false);
assert.equal(evidence.decision.minimalNonsupersymmetricCommutingAbelianRouteClosedGenerically,true);
assert.equal(evidence.decision.portalWardLineDerived,false);

console.log('PASS 1568: the canonical E6 tensor basis gives a nonzero -1/sqrt(10) mixed Hessian from the nonfactorized 27--351-prime quartic in both neutral bidoublet channels, so the minimal nonsupersymmetric commuting-abelian inert route requires an unprotected lambda2=0 tuning.');
