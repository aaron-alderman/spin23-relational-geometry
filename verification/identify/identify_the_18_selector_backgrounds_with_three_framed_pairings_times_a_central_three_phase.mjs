import assert from 'node:assert/strict';

const mul=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const I=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const R=[[1,0,0,0],[0,0,0,-1],[0,0,1,0],[0,1,0,-1]];
const H=[[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
const N=[[1,0,-1,1],[0,0,0,1],[-1,0,2,-1],[0,-1,-1,4]];
const key=JSON.stringify;
const eq=(A,B)=>key(A)===key(B);
const pow=(A,n)=>{let X=I;while(n--)X=mul(A,X);return X;};
const inv=A=>{
  const aug=A.map((row,i)=>[...row,...I[i]]);
  for(let c=0;c<4;c++){
    let p=c;while(p<4&&aug[p][c]===0)p++;
    assert.ok(p<4);[aug[c],aug[p]]=[aug[p],aug[c]];
    const d=aug[c][c];aug[c]=aug[c].map(x=>x/d);
    for(let i=0;i<4;i++)if(i!==c){const f=aug[i][c];aug[i]=aug[i].map((x,j)=>x-f*aug[c][j]);}
  }
  return aug.map(row=>row.slice(4));
};

const Z=pow(mul(H,R),2);
const r=mul(Z,R);
assert.ok(eq(pow(Z,3),I));
assert.ok(eq(pow(r,3),I));
assert.ok(eq(pow(H,2),I));
assert.ok(eq(mul(mul(H,r),H),pow(r,2)));
assert.ok(eq(mul(Z,r),mul(r,Z))&&eq(mul(Z,H),mul(H,Z)));

const matchings=[
  [['u','e'],['d','nu']],
  [['u','d'],['e','nu']],
  [['u','nu'],['d','e']],
];

const states=[];
const matrixToState=new Map();
const orbitToState=new Map();
for(let a=0;a<3;a++)for(let i=0;i<3;i++)for(let e=0;e<2;e++){
  const g=mul(mul(pow(Z,a),pow(r,i)),pow(H,e));
  const X=mul(mul(g,N),inv(g));
  const orderedHandles=e===0?matchings[i]:[matchings[i][1],matchings[i][0]];
  const state={centralPhase:a,matchingIndex:i,handleOrder:e,orderedHandles};
  assert.ok(!matrixToState.has(key(g)));
  assert.ok(!orbitToState.has(key(X)));
  matrixToState.set(key(g),state);
  orbitToState.set(key(X),state);
  states.push(state);
}
assert.equal(matrixToState.size,18);
assert.equal(orbitToState.size,18);

// Left multiplication in the unique normal form Z^a r^i H^e.
const actZ=({centralPhase:a,matchingIndex:i,handleOrder:e})=>[(a+1)%3,i,e];
const actr=({centralPhase:a,matchingIndex:i,handleOrder:e})=>[a,(i+1)%3,e];
const actH=({centralPhase:a,matchingIndex:i,handleOrder:e})=>[a,(3-i)%3,1-e];
for(const s of states){
  const g=mul(mul(pow(Z,s.centralPhase),pow(r,s.matchingIndex)),pow(H,s.handleOrder));
  for(const [gen,expected] of [[Z,actZ(s)],[r,actr(s)],[H,actH(s)]]){
    const actual=matrixToState.get(key(mul(gen,g)));
    assert.deepEqual([actual.centralPhase,actual.matchingIndex,actual.handleOrder],expected);
  }
}

console.log(JSON.stringify({
  protocol:'selector-torsor-framed-pairing-factorization/1',
  exactNormalForm:'g=Z^a r^i H^e',
  ranges:{a:'Z3 central selector phase',i:'three perfect matchings of {u,d,e,nu}',e:'two handle orders'},
  stateCount:states.length,
  checkpointOrbitCount:orbitToState.size,
  actions:{Z:'(a,i,e)->(a+1,i,e)',r:'(a,i,e)->(a,i+1,e)',H:'(a,i,e)->(a,-i,1-e)'},
  actualSewnMatching:matchings[0],
  conclusion:'The regular 18-background torsor has an exact equivariant labelling by three central phases times three perfect matter pairings times two handle orders.',
  boundary:'This is an exact combinatorial model of the selector group, but no source map yet identifies the central phase with physical mutual framing or makes all three matter pairings dynamically admissible.',
  passed:true,
},null,2));
