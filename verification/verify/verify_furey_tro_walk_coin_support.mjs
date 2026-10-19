#!/usr/bin/env node

const arrows={Q:{source:"H",target:"O2"},uc:{source:"O2",target:"C"},dc:{source:"O2",target:"O1"},L:{source:"R",target:"H"},ec:{source:"C",target:"R"},hC:{source:"C",target:"H"},hD:{source:"H",target:"O1"}};
const dagger=a=>({source:a.target,target:a.source});
const closes=sequence=>sequence.every((a,i)=>a.target===sequence[(i+1)%sequence.length].source);
const cycles={up:[arrows.Q,arrows.uc,arrows.hC],down:[arrows.Q,arrows.dc,dagger(arrows.hD)],chargedLepton:[arrows.ec,arrows.L,dagger(arrows.hC)]};
const left=["uL_r","uL_g","uL_b","dL_r","dL_g","dL_b","nuL","eL"];
const right=["uR_r","uR_g","uR_b","dR_r","dR_g","dR_b","eR"];
const yu=.71,yd=.23,ye=.11;
const Phi=Array.from({length:left.length},()=>Array(right.length).fill(0));
for(let i=0;i<3;i++)Phi[i][i]=yu;
for(let i=0;i<3;i++)Phi[3+i][3+i]=yd;
Phi[7][6]=ye;
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const K=Array.from({length:left.length+right.length},()=>Array(left.length+right.length).fill(0));
for(let i=0;i<left.length;i++)for(let j=0;j<right.length;j++){K[i][left.length+j]=Phi[i][j];K[left.length+j][i]=Phi[i][j];}
const K2=mm(K,K);
const expectedDiagonal=[yu*yu,yu*yu,yu*yu,yd*yd,yd*yd,yd*yd,0,ye*ye,yu*yu,yu*yu,yu*yu,yd*yd,yd*yd,yd*yd,ye*ye];
let maximumK2Error=0;
for(let i=0;i<K2.length;i++)for(let j=0;j<K2.length;j++)maximumK2Error=Math.max(maximumK2Error,Math.abs(K2[i][j]-(i===j?expectedDiagonal[i]:0)));
const nonzeroRows=Phi.map((row,i)=>row.some(x=>x!==0)?i:null).filter(i=>i!==null);
const nonzeroColumns=transpose(Phi).map((row,i)=>row.some(x=>x!==0)?i:null).filter(i=>i!==null);
const report={
  protocol:"furey-tro-walk-coin-support/1",
  selectedTRO:{dc:"O1<-O2",L:"H<-R",ec:"R<-C",fixedQ:"O2<-H",fixedUc:"C<-O2",reason:"One of the two anomaly-free TROs surviving all three cyclic charged-Yukawa closures."},
  cycles:Object.fromEntries(Object.entries(cycles).map(([name,seq])=>[name,{arrows:seq.map(a=>`${a.source}->${a.target}`),closes:closes(seq)}])),
  particleConvention:{left,right,warning:"uR,dR,eR are conjugates of the left-handed uc,dc,ec sectors; this is additional structure, not TRO multiplication."},
  coinSupport:{rows:left,columns:right,matrix:Phi,rankByDistinctNonzeroPivots:nonzeroColumns.length,unpairedLeftStates:left.filter((_,i)=>!nonzeroRows.includes(i))},
  squaredHermitianCoin:{dimension:K.length,diagonal:expectedDiagonal,maximumError:maximumK2Error},
  spectrumByInspection:[
    {eigenvalues:[yu,-yu],multiplicityEach:3,channel:"up"},{eigenvalues:[yd,-yd],multiplicityEach:3,channel:"down"},
    {eigenvalues:[ye,-ye],multiplicityEach:1,channel:"charged lepton"},{eigenvalues:[0],multiplicityEach:1,channel:"unpaired left neutrino"}
  ],
  interpretation:[
    "The chosen Furey topology closes the up, down, and charged-lepton block cycles with hC and hD in the required orientations.",
    "After converting conjugate sectors to conventional right-handed particle modules, the allowed broken-phase coin support is Q-uR, Q-dR, and L-eR only.",
    "For nonzero Yukawa entries the 8-by-7 coin block has rank seven, leaving one unpaired left-handed neutrino.",
    "The topology fixes support but not Yukawa magnitudes, flavor matrices, particle-antiparticle convention, or Floquet-pi action."
  ]
};
report.passed=Object.values(report.cycles).every(x=>x.closes)&&nonzeroColumns.length===7&&report.coinSupport.unpairedLeftStates.length===1&&report.coinSupport.unpairedLeftStates[0]==="nuL"&&maximumK2Error<1e-12;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
