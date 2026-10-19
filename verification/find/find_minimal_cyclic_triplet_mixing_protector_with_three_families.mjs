import assert from "node:assert/strict";

const solutions=[];
for(let N=2;N<=36;N++)for(let q=0;q<N;q++)for(let l=0;l<N;l++){
  const h=0,u=(N-q)%N,d=(N-q)%N,e=(N-l)%N,n=(N-l)%N;
  const t=(N-q-l)%N,D=(N-2*q%N)%N;
  const x=(3*q+l)%N;
  const mixing=(t+D)%N;
  const majorana=(2*n)%N;
  const A3=(3*(2*q+u+d))%N;
  const A2=(3*(3*q+l))%N;
  const Agrav=(3*(6*q+3*u+3*d+2*l+e+n))%N;
  const Acubic=(3*(6*q**3+3*u**3+3*d**3+2*l**3+e**3+n**3))%N;
  const AY2X=(3*(6*q+3*16*u+3*4*d+2*9*l+36*e))%N; // y=6Y
  const AYX2=(3*(6*q*q-12*u*u+6*d*d-6*l*l+6*e*e))%N;
  if(h===0&&majorana===0&&mixing!==0&&A3===0&&A2===0&&Agrav===0&&Acubic===0&&AY2X===0&&AYX2===0)solutions.push({N,q,l,u,d,e,n,t,D,mixing,x,anomalies:{A3,A2,Agrav,Acubic,AY2X,AYX2}});
}
assert(solutions.length>0);
const minimum=Math.min(...solutions.map(s=>s.N));
assert.equal(minimum,9);
const witness=solutions.find(s=>s.N===9&&s.q===1&&s.l===0);
assert(witness);
assert.equal(witness.t,8);
assert.equal(witness.D,7);
assert.equal(witness.mixing,6);

const belowNine=Array.from({length:7},(_,i)=>i+2).map(N=>({N,solutions:solutions.filter(s=>s.N===N).length}));
assert(belowNine.every(x=>x.solutions===0));

console.log(JSON.stringify({
  protocol:"minimal-cyclic-three-family-triplet-mixing-protector/1",
  assumptions:["three identical SM+nuR families","neutral electroweak Higgs VEV","neutral Majorana mass/breaking VEV","ordinary Dirac Yukawas","internal family-universal Z_N below Pati-Salam breaking"],
  identity:{oneFamilyWeakCoefficient:"x=3q_Q+q_L",holomorphicMixingCharge:"q(TD)=-x",threeFamilyInstantonCharge:"3x"},
  belowNine,
  minimum,
  witness,
  interpretation:"q_Q=1, q_L=0 mod 9 is discrete quark number; on color-singlet operators it is baryon triality. Three families make the weak-instanton charge 9=0 mod 9 while the triplet-companion bilinear has charge -3=6 mod 9.",
  theorem:"Under the stated neutral-VEV and Yukawa assumptions, Z_2 through Z_8 cannot protect holomorphic triplet-companion mixing while passing the listed discrete anomaly congruences. Z_9 is the first solution; its q_Q=1,q_L=0 representative is the three-family baryon-triality lift.",
  boundary:"The arithmetic establishes a low-energy discrete-anomaly candidate. Its realization as an exact symmetry of the full spectral Pati-Salam finite geometry, including global/Dai-Freed refinements and heavy thresholds, remains to be constructed.",
  passed:true
},null,2));
