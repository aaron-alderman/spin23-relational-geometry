import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((row,i)=>row.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(row=>row.map(x=>a*x));
const transpose=A=>A[0].map((_,j)=>A.map(row=>row[j]));
const bracket=(A,B)=>add(mm(A,B),scale(-1,mm(B,A)));
const zero=()=>Array.from({length:4},()=>Array(4).fill(0));
const mod=(x,p)=>((x%p)+p)%p;

const J=[[0,0,1,1],[0,0,1,0],[-1,-1,0,0],[-1,0,0,0]];
const placement0=[
  [[0,0,2,4],[0,0,-1,-2],[0,0,0,0],[0,0,0,0]],
  [[0,0,0,0],[0,0,1,0],[0,0,0,0],[0,0,0,0]],
  [[0,0,-1,0],[0,0,0,-1],[0,0,0,0],[0,0,0,0]],
  [[-1,0,-2,-4],[0,-1,0,2],[1,2,1,0],[0,-1,0,1]]
];
const A=[[1,1,0,-1],[0,0,0,1],[0,1,1,2],[0,-1,0,-1]];
const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const A2=mm(A,A);assert.deepEqual(mm(A2,A),I);assert.deepEqual(mm(mm(transpose(A),J),A),J);
const conjugate=(X,P,Pinv)=>mm(mm(P,X),Pinv);
const placements=[placement0,placement0.map(X=>conjugate(X,A,A2)),placement0.map(X=>conjugate(X,A2,A))];
for(const X of placements.flat()){assert.deepEqual(add(mm(transpose(X),J),mm(J,X)),zero());for(const x of X.flat())assert.equal(Number.isInteger(x),true);}

const R=[[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,-1]],Rinv=[[1,0,0,0],[0,1,0,0],[0,0,1,1],[0,0,1,0]];
const J0=[[0,0,1,0],[0,0,0,1],[-1,0,0,0],[0,-1,0,0]];assert.deepEqual(mm(mm(transpose(R),J),R),J0);
const toStandard=X=>mm(mm(Rinv,X),R);
const neg=x=>x===0?0:-x;
const coords=X=>{assert.deepEqual(add(mm(transpose(X),J0),mm(J0,X)),zero());return [X[0][0],X[0][1],X[1][0],X[1][1],X[0][2],X[0][3],X[1][3],X[2][0],X[2][1],X[3][1]];};
const fromCoords=v=>[[v[0],v[1],v[4],v[5]],[v[2],v[3],v[5],v[6]],[v[7],v[8],neg(v[0]),neg(v[2])],[v[8],v[9],neg(v[1]),neg(v[3])]];
const standardPlacements=placements.map(P=>P.map(toStandard));

const modInverse=(a,p)=>{for(let x=1;x<p;x++)if(mod(a*x,p)===1)return x;throw new Error('noninvertible');};
const modRank=(vectors,p)=>{if(!vectors.length)return 0;const width=vectors[0].length,M=vectors.map(v=>v.map(x=>mod(x,p)));let r=0;for(let c=0;c<width;c++){let q=r;while(q<M.length&&M[q][c]===0)q++;if(q===M.length)continue;[M[r],M[q]]=[M[q],M[r]];const u=modInverse(M[r][c],p);for(let j=c;j<width;j++)M[r][j]=mod(M[r][j]*u,p);for(let i=0;i<M.length;i++)if(i!==r&&M[i][c]){const f=M[i][c];for(let j=c;j<width;j++)M[i][j]=mod(M[i][j]-f*M[r][j],p);}r++;}return r;};
const modClosureDimension=(matrices,p)=>{const basis=[];for(const X of matrices){const v=coords(X).map(x=>mod(x,p));if(modRank([...basis,v],p)>basis.length)basis.push(v);}let changed=true;while(changed){changed=false;const snapshot=basis.slice();for(let i=0;i<snapshot.length;i++)for(let j=i+1;j<snapshot.length;j++){const v=coords(bracket(fromCoords(snapshot[i]),fromCoords(snapshot[j]))).map(x=>mod(x,p));if(modRank([...basis,v],p)>basis.length){basis.push(v);changed=true;}}}return basis.length;};

const floorDiv=(a,b)=>{assert.ok(b>0n);let q=a/b,r=a%b;if(r<0n)q--;return q;};
const rowHNF=rows=>{const M=rows.map(row=>row.map(BigInt));let r=0;for(let c=0;c<10&&r<M.length;c++){
  while(true){let p=-1;for(let i=r;i<M.length;i++)if(M[i][c]!==0n&&(p<0||(M[i][c]<0n?-M[i][c]:M[i][c])<(M[p][c]<0n?-M[p][c]:M[p][c])))p=i;if(p<0)break;[M[r],M[p]]=[M[p],M[r]];if(M[r][c]<0n)M[r]=M[r].map(x=>-x);let changed=false;for(let i=r+1;i<M.length;i++)if(M[i][c]!==0n){const q=M[i][c]/M[r][c];for(let j=0;j<10;j++)M[i][j]-=q*M[r][j];if(M[i][c]!==0n)changed=true;}if(!changed)break;}
  if(M[r][c]===0n)continue;for(let i=0;i<r;i++){const q=floorDiv(M[i][c],M[r][c]);for(let j=0;j<10;j++)M[i][j]-=q*M[r][j];}r++;
}return M.filter(row=>row.some(x=>x!==0n));};
const reduceByHNF=(v,H)=>{const x=v.map(BigInt);for(let i=0;i<10;i++){if(x[i]%H[i][i]!==0n)return false;const q=x[i]/H[i][i];for(let j=i;j<10;j++)x[j]-=q*H[i][j];}return x.every(a=>a===0n);};
const generatedOrder=matrices=>{let H=rowHNF(matrices.map(coords)),rounds=0,bracketsTested=0;while(rounds<20){rounds++;const HM=H.map(row=>fromCoords(row.map(Number))),extra=[];for(let i=0;i<HM.length;i++)for(let j=i+1;j<HM.length;j++){extra.push(coords(bracket(HM[i],HM[j])));bracketsTested++;}const next=rowHNF([...H,...extra]);if(JSON.stringify(next.map(r=>r.map(String)))===JSON.stringify(H.map(r=>r.map(String))))break;H=next;}assert.ok(rounds<20);assert.equal(H.length,10);const HM=H.map(row=>fromCoords(row.map(Number)));for(let i=0;i<10;i++)for(let j=i+1;j<10;j++)assert.ok(reduceByHNF(coords(bracket(HM[i],HM[j])),H));let index=1n;for(let i=0;i<10;i++)index*=H[i][i];return {index,diagonal:H.map((row,i)=>Number(row[i])),rounds,bracketsTested};};

const subsets=[standardPlacements[0],[...standardPlacements[0],...standardPlacements[1]],standardPlacements.flat()];
const results=subsets.map((S,i)=>{const order=generatedOrder(S);return {placements:i+1,mod2Dimension:modClosureDimension(S,2),mod3Dimension:modClosureDimension(S,3),index:Number(order.index),hermiteDiagonal:order.diagonal,hermiteClosureRounds:order.rounds,bracketsTested:order.bracketsTested};});
const seedNames=['normal','tangent','relationship','coherentHandle'];
const singleConjugateAdditions=seedNames.map((name,i)=>{const S=[...standardPlacements[0],standardPlacements[1][i]],order=generatedOrder(S);return {name,mod2Dimension:modClosureDimension(S,2),index:Number(order.index),hermiteDiagonal:order.diagonal};});
const additionSubsets=[];for(let mask=1;mask<16;mask++){const ids=[];for(let i=0;i<4;i++)if(mask&(1<<i))ids.push(i);const S=[...standardPlacements[0],...ids.map(i=>standardPlacements[1][i])],order=generatedOrder(S);additionSubsets.push({names:ids.map(i=>seedNames[i]),count:ids.length,mod2Dimension:modClosureDimension(S,2),index:Number(order.index)});}
const mixedSingleAdditions=[];for(let i=0;i<3;i++)for(const sign of [1,-1]){const mixed=add(standardPlacements[1][3],scale(sign,standardPlacements[1][i])),S=[...standardPlacements[0],mixed],order=generatedOrder(S);mixedSingleAdditions.push({name:`coherentHandle${sign>0?'+':'-'}${seedNames[i]}`,mod2Dimension:modClosureDimension(S,2),index:Number(order.index)});}
const singleCombinationCensus=[];for(let mask=1;mask<16;mask++){const ids=[];for(let i=0;i<4;i++)if(mask&(1<<i))ids.push(i);let mixed=zero();for(const i of ids)mixed=add(mixed,standardPlacements[1][i]);const S=[...standardPlacements[0],mixed],order=generatedOrder(S);singleCombinationCensus.push({names:ids.map(i=>seedNames[i]),mod2Dimension:modClosureDimension(S,2),index:Number(order.index)});}
assert.equal(results[0].index,512);assert.equal(results[0].mod2Dimension,5);
assert.deepEqual(results.map(r=>r.index),[512,1,1]);
assert.deepEqual(results.map(r=>r.mod2Dimension),[5,10,10]);
assert.deepEqual(results.map(r=>r.mod3Dimension),[10,10,10]);
assert.deepEqual(results[1].hermiteDiagonal,Array(10).fill(1));
assert.equal(Math.max(...singleCombinationCensus.map(r=>r.mod2Dimension)),9);
assert.equal(singleCombinationCensus.some(r=>r.index===1),false);
const minimalSuccessfulPairs=additionSubsets.filter(r=>r.count===2&&r.index===1);
assert.deepEqual(minimalSuccessfulPairs.map(r=>r.names),[['normal','coherentHandle'],['tangent','coherentHandle'],['relationship','coherentHandle']]);
assert.equal(mixedSingleAdditions.some(r=>r.index===1),false);

console.log(JSON.stringify({
  protocol:'three-placement-dyadic-order-completion/2',
  placementCycle:A,
  results,
  singleConjugateAdditions,
  additionSubsets,
  mixedSingleAdditions,
  singleCombinationCensus,
  minimalSuccessfulPairs,
  theorem:'One placement generates an index-512 dyadic order; adjoining any distinct C3-conjugate placement generates the full Chevalley lattice sp(4,Z).',
  minimalPlacementCount:2,
  minimalIndependentAddedGeneratorCount:2,
  minimalGeneratorPattern:'one conjugate coherent handle plus any one conjugate translation (normal, tangent, or relationship)',
  boundary:'The third placement is redundant for integral Lie generation but remains part of the canonical three-point S3 permutation object and its trace-zero A2 environment.',
  passed:true
},null,2));
