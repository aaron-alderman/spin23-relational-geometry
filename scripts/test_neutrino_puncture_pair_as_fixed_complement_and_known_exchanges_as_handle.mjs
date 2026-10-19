import assert from 'node:assert/strict';

const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const I=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const inverse=A=>{const n=A.length,M=A.map((r,i)=>[...r,...I(n)[i]]);for(let c=0;c<n;c++){let p=c;while(p<n&&Math.abs(M[p][c])<1e-12)p++;assert(p<n);[M[c],M[p]]=[M[p],M[c]];const d=M[c][c];M[c]=M[c].map(x=>x/d);for(let i=0;i<n;i++)if(i!==c){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[c][j]);}}return M.map(r=>r.slice(n));};
const rank=A=>{const M=A.map(r=>r.slice());let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];M[row]=M[row].map(x=>x/d);for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[row][j]);}row++;}return row;};
const maxabs=A=>Math.max(...A.flat().map(Math.abs));
const gcd2=(a,b)=>b===0?Math.abs(a):gcd2(b,a%b);
const gcdAll=xs=>xs.reduce((g,x)=>gcd2(g,x),0);
const detInt=M=>{
  if(M.length===0)return 1;
  if(M.length===1)return M[0][0];
  let s=0;for(let j=0;j<M.length;j++){const minor=M.slice(1).map(r=>r.filter((_,k)=>k!==j));s+=(j%2?-1:1)*M[0][j]*detInt(minor);}return s;
};
const combinations=(n,k,start=0,prefix=[])=>{
  if(prefix.length===k)return [prefix];
  const out=[];for(let i=start;i<=n-(k-prefix.length);i++)out.push(...combinations(n,k,i+1,[...prefix,i]));return out;
};

const weights=[];
for(let mask=0;mask<32;mask++){
  const q=Array.from({length:5},(_,i)=>(mask>>i)&1?-1:1);
  if(q.filter(x=>x<0).length%2===0)weights.push({mask,q});
}
assert.equal(weights.length,16);
const index=new Map(weights.map(({mask},i)=>[mask,i]));
const physical=weights.filter(x=>x.mask!==0);

// Saturated active incidence basis from the preceding certificate, in the
// ascending-mask punctured order.
const Bactive15=[
  [0,-1],[1,2],[-1,-1],[1,1],[-1,-2],[0,1],[0,0],[1,1],
  [-1,-2],[0,1],[0,0],[0,0],[0,3],[-3,-6],[3,3]
];
assert.equal(Bactive15.length,15);
const Bactive=Array.from({length:16},()=>[0,0]);
for(let j=0;j<15;j++)Bactive[index.get(physical[j].mask)]=Bactive15[j];

const nuC=index.get(0),nu=index.get(23);
assert.notEqual(nuC,undefined);assert.notEqual(nu,undefined);
const F=Array.from({length:16},(_,i)=>[Number(i===nuC),Number(i===nu)]);
const B=Array.from({length:16},(_,i)=>[...F[i],...Bactive[i]]);
assert.equal(rank(B),4);

// Primitivity of the four-column lattice.
const minors=combinations(16,4).map(rows=>detInt(rows.map(i=>B[i])));
const saturationIndex=gcdAll(minors);
assert.equal(saturationIndex,1);

// Color cycle fixes the puncture pair and acts by C on the active lattice.
const cycleMask=mask=>{
  const q=weights[index.get(mask)].q,q2=[q[2],q[0],q[1],q[3],q[4]];
  return weights.find(x=>x.q.every((v,i)=>v===q2[i])).mask;
};
const P=Array.from({length:16},()=>Array(16).fill(0));
for(let j=0;j<16;j++)P[index.get(cycleMask(weights[j].mask))][j]=1;
const coordinates=T=>mm(mm(inverse(mm(tr(B),B)),tr(B)),T);
const colorCoordinates=coordinates(mm(P,B));
const expectedColor=[[1,0,0,0],[0,1,0,0],[0,0,1,3],[0,0,-1,-2]];
assert.ok(maxabs(sub(colorCoordinates,expectedColor))<1e-10);

// Dirac Weyl exchange toggles color 1,2,3 and weak coordinate 5.
const diracToggle=23;
const S=Array.from({length:16},()=>Array(16).fill(0));
for(let j=0;j<16;j++)S[index.get(weights[j].mask^diracToggle)][j]=1;
assert.equal(S[nu][nuC],1);assert.equal(S[nuC][nu],1);

const projector=mm(mm(B,inverse(mm(tr(B),B))),tr(B));
const leakage=maxabs(mm(sub(I(16),projector),mm(S,B)));
const diracPreservesCompletedLattice=leakage<1e-10;
assert.equal(diracPreservesCompletedLattice,false);
const activeIntersection=4-rank([...tr(Bactive),...tr(mm(S,Bactive))]);
assert.equal(activeIntersection,0);

// The completed-module neutral D<->E topology exchange fixes every named
// five-bit state, hence induces identity rather than the off-diagonal H.
const neutralExchange=I(16);
const neutralCoordinates=coordinates(mm(neutralExchange,B));
assert.ok(maxabs(sub(neutralCoordinates,I(4)))<1e-10);

// Gauge status of the complement: nu^c is a singlet, nu_L is not before
// electroweak breaking.  A Higgs insertion is required to make its response
// coordinate gauge neutral.
const hypercharge=q=>{
  const nc=[0,1,2].filter(i=>q[i]===-1).length;
  const nw=[3,4].filter(i=>q[i]===-1).length;
  return nw/2-nc/3;
};
const twoT3L=q=>(q[3]-q[4])/2;
const complementCharges=[
  {field:'nu^c',Y:hypercharge(weights[nuC].q),twoT3L:twoT3L(weights[nuC].q)},
  {field:'nu',Y:hypercharge(weights[nu].q),twoT3L:twoT3L(weights[nu].q)}
];
assert.deepEqual(complementCharges,[{field:'nu^c',Y:0,twoT3L:0},{field:'nu',Y:-0.5,twoT3L:1}]);

console.log(JSON.stringify({
  protocol:'neutrino-puncture-pair-fixed-complement-and-exchange-test/1',
  complement:['nu^c','nu'],
  primitiveRankFourCompletion:true,
  saturationIndex,
  colorAction:colorCoordinates.map(r=>r.map(x=>Math.round(x))),
  complementColorFixed:true,
  complementGaugeCharges:complementCharges,
  unbrokenGaugeVerdict:'nu is a weak-doublet component with Y=-1/2 and 2T3L=1 in the paper conventions; the raw pair is not a gauge-singlet response complement before Higgs dressing.',
  diracWeylExchange:{
    swapsPuncturePair:true,
    preservesCompletedRankFourLattice:diracPreservesCompletedLattice,
    leakageMaxEntry:leakage,
    activePlaneIntersectionWithItsImage:activeIntersection,
    handleVerdict:'fails: it moves the incidence-selected active plane to a transverse colored doublet rather than exchanging the fixed and active modes'
  },
  neutralTopologyExchange:{
    inducedAction:neutralCoordinates.map(r=>r.map(x=>Math.round(x))),
    handleVerdict:'fails on field labels: it is identity on all named five-bit states'
  },
  conclusion:'The nu^c/nu pair is a canonical primitive color-fixed lattice complement, but only conditionally a physical gauge-neutral response pair after Higgs dressing. Neither established exchange supplies the required handle involution on the completed four-lattice.',
  reopeningCondition:'A Higgs/Yukawa- or bilocal-response-dressed nonmonomial exchange must map the neutrino complement to the incidence-selected active plane and reduce to the transported integral H.',
  passed:true
},null,2));
