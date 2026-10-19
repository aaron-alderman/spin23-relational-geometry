import assert from "node:assert/strict";

const mod=(x,n)=>((x%n)+n)%n;
const N=36; // common phase denominator: omega_9 has exponent 4, lambda_12 exponent 3
const omegaExponent=4;
const u=[omegaExponent,omegaExponent,omegaExponent,0];
const neg=v=>v.map(x=>mod(-x,N));
const sectors={L:u,R:u,Lc:neg(u),Rc:neg(u)};
const J={L:"Lc",Lc:"L",R:"Rc",Rc:"R"};

for(const [sector,target] of Object.entries(J)){
  for(let i=0;i<4;i++)assert.equal(sectors[target][i],mod(-sectors[sector][i],N));
}

// Any sector-diagonal grading commutes with this diagonal action.
const gamma={L:1,R:-1,Lc:-1,Rc:1};
for(const sector of Object.keys(sectors))assert([1,-1].includes(gamma[sector]));

// Minimal Standard-Model-preserving vacuum: diagonal Sigma transports and
// a single right-handed neutrino Majorana line.
for(let i=0;i<4;i++){
  assert.equal(mod(sectors.L[i]-sectors.R[i],N),0);
  assert.equal(mod(sectors.Lc[i]-sectors.Rc[i],N),0);
}
const neutrino=3;
assert.equal(mod(sectors.R[neutrino]-sectors.Rc[neutrino],N),0);

// The action normalizes every published edge representation.
const sigmaCharges=[];
const hCharges=[];
for(let i=0;i<4;i++)for(let j=0;j<4;j++){
  sigmaCharges.push(mod(u[i]-u[j],N));
  hCharges.push(mod(u[i]+u[j],N));
}
assert(sigmaCharges.every(x=>[0,4,32].includes(x)));
assert(hCharges.every(x=>[0,4,8].includes(x)));

// Full doubled determinant cancels for any family number.  On the particle
// half, L and R each repeat U over a weak doublet.
const sum=v=>v.reduce((a,b)=>a+b,0);
const fullDoubledExponent=Object.values(sectors).reduce((s,v)=>s+sum(v),0);
assert.equal(mod(fullDoubledExponent,N),0);
const particleExponentPerFamily=mod(2*sum(sectors.L)+2*sum(sectors.R),N);
assert.equal(particleExponentPerFamily,12); // exp(2 pi i/3)
const particleUnimodularFamilies=[];
for(let nf=1;nf<=9;nf++)if(mod(nf*particleExponentPerFamily,N)===0)particleUnimodularFamilies.push(nf);
assert.deepEqual(particleUnimodularFamilies,[3,6,9]);

// All mod-nine lifts of the common ternary stabilizer obtained by adding 3kL.
const base={Q:1,uc:-1,dc:-1,L:-3,ec:3,nuc:3};
const lepton={Q:0,uc:0,dc:0,L:1,ec:-1,nuc:-1};
const lifts=[];
for(let k=0;k<3;k++){
  const q=Object.fromEntries(Object.keys(base).map(s=>[s,mod(base[s]+3*k*lepton[s],9)]));
  const weak=mod(3*q.Q+q.L,9);
  const majorana=mod(2*q.nuc,9);
  const mixing=mod(-(3*q.Q+q.L),9);
  lifts.push({k,q,weakPerFamily:weak,threeFamilyWeak:mod(3*weak,9),majorana,mixing,protectsMixing:mixing!==0,preservesMajorana:majorana===0});
}
assert.deepEqual(lifts.map(x=>({k:x.k,protects:x.protectsMixing,preserves:x.preservesMajorana})),[
  {k:0,protects:false,preserves:false},
  {k:1,protects:true,preserves:true},
  {k:2,protects:true,preserves:false}
]);
assert.deepEqual(lifts[1].q,{Q:1,uc:8,dc:8,L:0,ec:0,nuc:0});

console.log(JSON.stringify({
  protocol:"four-sector-z9-3B-admissibility-and-selection/1",
  sectorAction:{L:"U",R:"U",Lc:"U*",Rc:"U*",U:"diag(omega9,omega9,omega9,1)"},
  realStructure:"R9 J = J R9, using antiunitarity and conjugate-sector inverse phases",
  grading:"R9 commutes with every grading diagonal on L,R,Lc,Rc",
  minimalVacuum:{diagonalSigmaInvariant:true,rankOneRightNeutrinoInvariant:true,leftSameChiralityVEV:0},
  edgeNormalization:{sigmaCharges:[0,4,32],sameChiralityCharges:[0,4,8]},
  determinant:{fullDoubledExponentMod36:mod(fullDoubledExponent,N),particleExponentPerFamilyMod36:particleExponentPerFamily,particleUnimodularFamilies},
  liftClassification:lifts,
  theorem:"Within the three 3L-shifted mod-9 lifts of the Prakash-Ramya ternary stabilizer, the rank-one Majorana vacuum plus nonzero companion-mixing charge uniquely selects k=1, namely 3B. Its four-sector operator commutes with the real structure and grading, preserves the minimal vacuum and is particle-unimodular for family number divisible by three.",
  boundary:"This is an exact theorem for the declared four-sector support and vacuum. Whether the relevant NCG unimodularity condition applies to this global normalizer, and whether every coefficient of the complete published finite Dirac operator obeys the assumed support, still require a source-level reconstruction.",
  passed:true
},null,2));
