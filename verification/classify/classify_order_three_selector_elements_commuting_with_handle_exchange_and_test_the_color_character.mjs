import assert from 'node:assert/strict';

const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const P=[[1,0,0,0],[0,0,0,1],[0,1,0,0],[0,0,1,0]];
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const eq=(A,B)=>A.every((r,i)=>r.every((x,j)=>x===B[i][j]));
const pow=(A,n)=>{let X=I;for(let i=0;i<n;i++)X=mm(X,A);return X;};
const trace=A=>A.reduce((s,r,i)=>s+r[i],0);
const rank=A=>{const M=A.map(r=>r.map(Number));let row=0;for(let c=0;c<M[0].length&&row<M.length;c++){let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-12)p++;if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];const d=M[row][c];for(let j=c;j<M[0].length;j++)M[row][j]/=d;for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];for(let j=c;j<M[0].length;j++)M[i][j]-=f*M[row][j];}row++;}return row;};
const order=A=>{let X=I;for(let n=1;n<=36;n++){X=mm(X,A);if(eq(X,I))return n;}return Infinity;};

const group=[I],seen=new Set([JSON.stringify(I)]);
for(let i=0;i<group.length;i++)for(const g of [R,H]){const q=mm(g,group[i]),k=JSON.stringify(q);if(!seen.has(k)){seen.add(k);group.push(q);}}
assert.equal(group.length,18);
const Z=pow(mm(H,R),2);
assert.equal(order(Z),3);assert.ok(eq(mm(Z,H),mm(H,Z)));

const orderThree=group.map((g,index)=>({g,index,order:order(g)})).filter(x=>x.order===3);
const commutingOrderThree=orderThree.filter(x=>eq(mm(x.g,H),mm(H,x.g))).map(x=>({
  index:x.index,
  matrix:x.g,
  trace:trace(x.g),
  fixedDimension:4-rank(sub(x.g,I)),
  isZ:eq(x.g,Z),
  isZ2:eq(x.g,pow(Z,2))
}));
assert.equal(commutingOrderThree.length,2);
assert.ok(commutingOrderThree.every(x=>x.trace===-2&&x.fixedDimension===0&&(x.isZ||x.isZ2)));

const naturalColor={trace:trace(P),fixedDimension:4-rank(sub(P,I)),order:order(P)};
assert.deepEqual(naturalColor,{trace:1,fixedDimension:2,order:3});
const Rfacts={trace:trace(R),fixedDimension:4-rank(sub(R,I)),commutesWithH:eq(mm(R,H),mm(H,R)),commutatorRank:rank(sub(mm(R,H),mm(H,R)))};
assert.deepEqual(Rfacts,{trace:1,fixedDimension:2,commutesWithH:false,commutatorRank:4});

// If microscopic color C and handle W commute and q is a surjective intertwiner,
// their target actions must commute: (AB-BA)q=q(CW-WC)=0.  Full-rank target
// commutator therefore rules out the proposed target pair (R,H).
assert.equal(Rfacts.commutatorRank,4);

console.log(JSON.stringify({
  protocol:'commuting-color-handle-selector-classification/1',
  selectorGroupOrder:group.length,
  microscopicAssumption:'The color three-cycle and left-right channel/handle flip commute because they act on separate gauge factors.',
  naturalLeptonPlusColorQuartet:naturalColor,
  R:{...Rfacts,characterMatchWithNaturalColor:true},
  surjectiveIntertwinerNoGo:'No surjective intertwiner can send commuting microscopic color and handle operations to R and H because [R,H] has full rank four.',
  commutingOrderThreeCarrierElements:commutingOrderThree,
  centralRepairTest:{
    candidate:'Z=(HR)^2 or Z^2',
    commutesWithH:true,
    characterMatchWithNaturalColor:false,
    reason:'Each has trace -2 and no fixed vector, whereas the lepton-plus-three-colors permutation has trace 1 and a two-dimensional fixed space.'
  },
  quotientBoundary:'A larger matter module can quotient to Z only after killing all color-fixed directions in the selected rank-four image. In the quartet model this removes both the lepton line and the color-sum line.',
  fork:[
    'Use R for its exact color character, in which case H cannot be the commuting microscopic left-right flip and must be a dressed/spurion-dependent response operation.',
    'Use central Z for commutation with H, in which case the rank-four carrier is a color-difference quotient rather than the full lepton-plus-color quartet.'
  ],
  passed:true
},null,2));
