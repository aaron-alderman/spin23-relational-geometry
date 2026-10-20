#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-numerical-lattice-glueball-continuum-audit.json",
  import.meta.url,
), "utf8"));

assert.equal(evidence.schema, "spin23.numerical-lattice-glueball-continuum-audit/1");
assert.match(evidence.status, /no constructive R4 Yang-Mills theorem/);
const close = (a, b, tol=1e-10) => Math.abs(a-b) <= tol;

const transpose = (a) => a[0].map((_, j) => a.map((r) => r[j]));
const mm = (a, b) => a.map((r) => b[0].map((_, j) => r.reduce((s, x, k) => s+x*b[k][j], 0)));
const mv = (a, v) => a.map((r) => r.reduce((s, x, k) => s+x*v[k], 0));
const inverse = (a) => {
  const n=a.length;
  const z=a.map((r,i) => [...r, ...Array.from({length:n},(_,j)=>i===j?1:0)]);
  for (let j=0;j<n;j++) {
    let p=j;
    for (let i=j+1;i<n;i++) if (Math.abs(z[i][j])>Math.abs(z[p][j])) p=i;
    assert.ok(Math.abs(z[p][j])>1e-14, "matrix is nonsingular");
    [z[j],z[p]]=[z[p],z[j]];
    const q=z[j][j]; z[j]=z[j].map((x)=>x/q);
    for (let i=0;i<n;i++) if (i!==j) { const f=z[i][j]; z[i]=z[i].map((x,k)=>x-f*z[j][k]); }
  }
  return z.map((r)=>r.slice(n));
};
const quad = (v,a) => v.reduce((s,x,i)=>s+x*a[i].reduce((q,y,j)=>q+y*v[j],0),0);

// Exact positive spectral correlator and generalized eigenvalues.
const pc=evidence.positiveCorrelatorWitness;
const Z=pc.overlapMatrix, E=pc.energies;
const correlator=(t)=>Z.map((row,i)=>Z.map((_,j)=>row.reduce((s,z,k)=>s+z*Z[j][k]*Math.exp(-E[k]*t),0)));
for (const t of pc.times) {
  const c=correlator(t);
  assert.ok(c[0][0]>0 && c[1][1]>0 && c[0][0]*c[1][1]-c[0][1]**2>0);
}
const c0=correlator(pc.referenceTime);
for (const t of pc.times.slice(1)) {
  const A=mm(inverse(c0),correlator(t));
  const tr=A[0][0]+A[1][1], det=A[0][0]*A[1][1]-A[0][1]*A[1][0];
  const disc=Math.sqrt(Math.max(0,tr*tr-4*det));
  const lambdas=[(tr+disc)/2,(tr-disc)/2].sort((a,b)=>b-a);
  const extracted=lambdas.map((x)=>-Math.log(x)/(t-pc.referenceTime));
  assert.ok(close(extracted[0],E[0]) && close(extracted[1],E[1]));
}

// Published benchmark derivations and comparison.
const pb=evidence.publishedBenchmarks, sp=pb.Sp4, su=pb.SU3, cg=pb.crossGroupComparison;
const spMass=Math.sqrt(sp.eta*sp.casimirAdjoint/sp.casimirFundamental);
const spErr=0.5*spMass*sp.etaError/sp.eta;
assert.ok(close(spMass,sp.derivedMassOverSqrtSigma));
assert.ok(close(spErr,sp.derivedError));
const suEta=su.value**2*cg.SU3CasimirFundamental/cg.SU3CasimirAdjoint;
const suEtaErr=2*su.value*su.statisticalError*cg.SU3CasimirFundamental/cg.SU3CasimirAdjoint;
assert.ok(close(suEta,cg.SU3Eta));
assert.ok(close(suEtaErr,cg.SU3EtaError));
const rawPull=Math.abs(spMass-su.value)/Math.hypot(spErr,su.statisticalError);
const etaPull=Math.abs(sp.eta-suEta)/Math.hypot(sp.etaError,suEtaErr);
assert.ok(close(rawPull,cg.rawMassRatioPull));
assert.ok(close(etaPull,cg.etaPull));
assert.ok(rawPull>2 && etaPull<1);

// Covariance-positive generalized least squares continuum/volume fits.
const reg=evidence.syntheticContinuumVolumeRegression, rows=reg.rows, n=rows.length;
const covariance=rows.map((ri,i)=>rows.map((rj,j)=>
  (i===j?ri.statSigma**2:0)+
  reg.commonScaleFraction*ri.y*reg.commonScaleFraction*rj.y+
  reg.correlatedDiscretizationAmplitude*ri.x/rows[0].x*reg.correlatedDiscretizationAmplitude*rj.x/rows[0].x));
// Sylvester criterion via elimination pivots.
const chol=(a)=>{const L=a.map((r)=>r.map(()=>0));for(let i=0;i<a.length;i++)for(let j=0;j<=i;j++){let s=a[i][j];for(let k=0;k<j;k++)s-=L[i][k]*L[j][k];if(i===j){assert.ok(s>0);L[i][j]=Math.sqrt(s);}else L[i][j]=s/L[j][j];}return L;};
chol(covariance);
const gls=(indices, columns) => {
  const y=indices.map((i)=>rows[i].y);
  const X=indices.map((i)=>columns.map((f)=>f(rows[i])));
  const C=indices.map((i)=>indices.map((j)=>covariance[i][j]));
  const Ci=inverse(C), Xt=transpose(X);
  const normal=mm(mm(Xt,Ci),X), parameterCovariance=inverse(normal);
  const beta=mv(mm(parameterCovariance,mm(Xt,Ci)),y);
  const residual=y.map((v,i)=>v-X[i].reduce((s,x,j)=>s+x*beta[j],0));
  return {beta,parameterCovariance,chi2:quad(residual,Ci),dof:y.length-beta.length};
};
const all=rows.map((_,i)=>i), fullColumns=[()=>1,(r)=>r.x,(r)=>Math.exp(-r.ell)];
const full=gls(all,fullColumns), drop=gls(all.slice(1),fullColumns);
const noFV=gls(all,[()=>1,(r)=>r.x]);
const quadratic=gls(all,[()=>1,(r)=>r.x,(r)=>r.x**2,(r)=>Math.exp(-r.ell)]);
const b=reg.expectedFullFitBounds;
assert.ok(full.beta[0]>=b.M0[0] && full.beta[0]<=b.M0[1]);
assert.ok(full.beta[1]>=b.cA[0] && full.beta[1]<=b.cA[1]);
assert.ok(full.beta[2]>=b.cL[0] && full.beta[2]<=b.cL[1]);
assert.ok(full.chi2/full.dof>=b.chi2PerDof[0] && full.chi2/full.dof<=b.chi2PerDof[1]);
const modelEnvelope={
  quadratic:Math.abs(full.beta[0]-quadratic.beta[0]),
  coarseCut:Math.abs(full.beta[0]-drop.beta[0]),
  finiteVolume:Math.abs(full.beta[0]-noFV.beta[0]),
  fitWindow:0.012,
};
const systematic=Math.hypot(...Object.values(modelEnvelope));
const statistical=Math.sqrt(full.parameterCovariance[0][0]);

const phys=evidence.systematicAudit.physicalScaleExample;
assert.ok(close(su.value*phys.sqrtSigmaGeV,phys.SU3MassGeV));
assert.ok(close(su.value*phys.sqrtSigmaErrorGeV,phys.scaleOnlyErrorGeV));
assert.ok(evidence.constructiveBoundary.itDoesNotProve.length>=6);
assert.match(evidence.constructiveBoundary.quantifierMismatch,/finite set of stochastic estimates/);
assert.match(evidence.spin23Boundary.groupLesson,/not the noncompact spacetime group Spin\(2,3\)/);

console.log("Numerical lattice glueball continuum audit: PASS");
console.log(`  exact GEVP energies: ${E.map(x=>x.toFixed(3)).join(", ")}; every C(t) positive definite`);
console.log(`  GLS M0=${full.beta[0].toFixed(6)} +/- ${statistical.toFixed(6)}, c_a=${full.beta[1].toFixed(4)}, c_L=${full.beta[2].toFixed(4)}`);
console.log(`  chi2/dof=${(full.chi2/full.dof).toFixed(4)}; model-envelope systematic=${systematic.toFixed(6)}`);
console.log(`  alternative M0: drop-coarse=${drop.beta[0].toFixed(6)}, no-FV=${noFV.beta[0].toFixed(6)}, quadratic=${quadratic.beta[0].toFixed(6)}`);
console.log(`  SU3 raw=${su.value.toFixed(3)}(${String(su.statisticalError).slice(2)}), Sp4/Spin5 raw=${spMass.toFixed(3)} +/- ${spErr.toFixed(3)}: ${rawPull.toFixed(2)} sigma`);
console.log(`  Casimir eta: SU3=${suEta.toFixed(3)} +/- ${suEtaErr.toFixed(3)}, Sp4=${sp.eta.toFixed(2)} +/- ${sp.etaError.toFixed(2)}: ${etaPull.toFixed(2)} sigma`);
console.log("  boundary: regression convergence is evidence, not continuum-measure existence or a uniform R4 spectral theorem");
