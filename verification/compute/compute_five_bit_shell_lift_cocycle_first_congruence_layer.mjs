import assert from 'node:assert/strict';

const mod=(n,m)=>((n%m)+m)%m;
const xor=(x,y)=>x.map((a,i)=>a^y[i]);
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,a,i)=>s+a*B[i][j],0)));
const mm2=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,a,i)=>s^(a&B[i][j]),0)));
const key2=A=>A.flat().join('');
const I=Array.from({length:5},(_,i)=>Array.from({length:5},(_,j)=>Number(i===j)));
const vectors=Array.from({length:32},(_,n)=>Array.from({length:5},(_,i)=>(n>>i)&1));
const qJ=x=>mod(2*x[0]*x[1]+3*x[2]+2*x[3]*x[4],4);
const polar=(x,y)=>mod(qJ(xor(x,y))-qJ(x)-qJ(y),4);
const inSpan=(v,basis)=>{
  const S=new Set(['00000']);
  for(const b of basis)for(const k of [...S])S.add(xor(k.split('').map(Number),b).join(''));
  return S.has(v.join(''));
};

// Finite quotient.
const finiteO=[],cols=[],nonzero=vectors.filter(v=>v.some(Boolean));
const rec=i=>{
  if(i===5){finiteO.push(tr(cols));return;}
  for(const y of nonzero){
    if(inSpan(y,cols)||qJ(y)!==qJ(I[i]))continue;
    if(cols.some((z,j)=>polar(y,z)!==polar(I[i],I[j])))continue;
    cols.push(y);rec(i+1);cols.pop();
  }
};
rec(0);assert.equal(finiteO.length,72);
const finiteIndex=new Map(finiteO.map((A,i)=>[key2(A),i]));
const identityIndex=finiteIndex.get(key2(I));
const mulIndex=(i,j)=>finiteIndex.get(key2(mm2(finiteO[i],finiteO[j])));

const inv2=A0=>{
  const A=A0.map((r,i)=>[...r,...I[i]]);
  for(let c=0;c<5;c++){
    let p=c;while(p<5&&!A[p][c])p++;assert(p<5);
    [A[c],A[p]]=[A[p],A[c]];
    for(let i=0;i<5;i++)if(i!==c&&A[i][c])A[i]=A[i].map((v,j)=>v^A[c][j]);
  }
  return A.map(r=>r.slice(5));
};

const HJ=[
  [0,1,0,0,0],
  [1,0,0,0,0],
  [0,0,-1,0,0],
  [0,0,0,0,-1],
  [0,0,0,-1,0],
];
const dot=(x,y)=>x.reduce((s,a,i)=>s+a*HJ[i].reduce((t,b,j)=>t+b*y[j],0),0);
const invQ=Q=>mm(mm(HJ,tr(Q)),HJ);
const candidatePool=(residue,targetNorm)=>{
  const out=[];
  const walk=(v=[])=>{
    if(v.length===5){if(dot(v,v)===targetNorm)out.push(v);return;}
    for(let n=-1;n<=1;n++)if(mod(n,2)===residue[v.length])walk([...v,n]);
  };
  walk();
  out.sort((x,y)=>x.reduce((s,a)=>s+a*a,0)-y.reduce((s,a)=>s+a*a,0)||x.join(',').localeCompare(y.join(',')));
  return out;
};
const canonicalLift=A=>{
  const residues=tr(A),pools=residues.map((r,i)=>candidatePool(r,HJ[i][i])),chosen=[];
  const search=i=>{
    if(i===5)return tr(chosen);
    for(const v of pools[i])if(chosen.every((u,j)=>dot(u,v)===HJ[j][i])){
      chosen.push(v);const ans=search(i+1);if(ans)return ans;chosen.pop();
    }
    return null;
  };
  return search(0);
};
const lifts=finiteO.map(canonicalLift);
lifts[identityIndex]=I;
assert(lifts.every(Boolean));

const flatten=A=>A.flat().map(x=>mod(x,2));
const unflatten=v=>Array.from({length:5},(_,i)=>v.slice(5*i,5*i+5));
const tangent=C=>C.map((r,i)=>r.map((x,j)=>mod((x-I[i][j])/2,2)));
const zero=Array(25).fill(0);

// GF(2) row-space utilities with canonical pivots.
const basisOf=rows=>{
  const piv=new Map();
  for(const row0 of rows){
    const row=[...row0];
    while(true){
      const p=row.findIndex(Boolean);
      if(p<0)break;
      if(piv.has(p)){for(let i=0;i<row.length;i++)row[i]^=piv.get(p)[i];}
      else{piv.set(p,row);break;}
    }
  }
  return [...piv.entries()].sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
};
const rank=rows=>basisOf(rows).length;
const reduceBy=(v,basis)=>{
  const out=[...v];
  const piv=basis.map(r=>r.findIndex(Boolean));
  for(let k=0;k<basis.length;k++)if(out[piv[k]])for(let i=0;i<out.length;i++)out[i]^=basis[k][i];
  return out;
};

const cocycle=[];
for(let a=0;a<72;a++)for(let b=0;b<72;b++){
  const ab=mulIndex(a,b);
  const C=mm(mm(lifts[a],lifts[b]),invQ(lifts[ab]));
  for(let i=0;i<5;i++)for(let j=0;j<5;j++)assert.equal(mod(C[i][j],2),I[i][j]);
  cocycle.push({a,b,v:flatten(tangent(C))});
}
const correctionBasis=basisOf(cocycle.map(x=>x.v));
const correctionRank=correctionBasis.length;

// Conjugation action on the first congruence layer: D -> A D A^{-1} mod 2.
const action=(A,v)=>flatten(mm2(mm2(A,unflatten(v)),inv2(A)));
for(const A of finiteO)for(const v of correctionBasis){
  assert.deepEqual(reduceBy(action(A,v),correctionBasis),zero);
}
const commutatorDifferences=[];
for(const A of finiteO)for(const v of correctionBasis)commutatorDifferences.push(xor(v,action(A,v)));
const commutatorBasis=basisOf(commutatorDifferences);
const coinvariantDimension=correctionRank-commutatorBasis.length;

// Build quotient complement and label each cocycle value modulo [G,W].
const quotientVectors=[];
let enlarged=[...commutatorBasis];
for(const v of correctionBasis){
  if(rank([...enlarged,v])>enlarged.length){quotientVectors.push(v);enlarged=basisOf([...enlarged,v]);}
}
assert.equal(quotientVectors.length,coinvariantDimension);
const quotientLabel=v=>{
  // Exhaust the small quotient-complement coefficient set.
  for(let mask=0;mask<(1<<quotientVectors.length);mask++){
    let w=[...v];
    for(let i=0;i<quotientVectors.length;i++)if((mask>>i)&1)w=xor(w,quotientVectors[i]);
    if(reduceBy(w,commutatorBasis).every(x=>x===0))
      return Array.from({length:quotientVectors.length},(_,i)=>(mask>>i)&1).join('');
  }
  throw new Error('quotient label not found');
};
const coordinatesIn=(v,basis)=>{
  const out=[...v],coords=Array(basis.length).fill(0);
  for(let k=0;k<basis.length;k++){
    const p=basis[k].findIndex(Boolean);
    if(out[p]){coords[k]=1;for(let i=0;i<out.length;i++)out[i]^=basis[k][i];}
  }
  assert(out.every(x=>x===0));
  return coords;
};
const labelCounts=new Map();
for(const x of cocycle){
  const label=quotientLabel(x.v);
  labelCounts.set(label,(labelCounts.get(label)||0)+1);
}

// Test the three nonzero scalar projections of the two-bit central cocycle for
// being coboundaries.  Unknowns are a normalized 1-cochain f:G->F2.
const isCoboundary=mask=>{
  const piv=new Map();
  for(const {a,b,v} of cocycle){
    const ab=mulIndex(a,b),row=Array(73).fill(0);
    row[a]^=1;row[b]^=1;row[ab]^=1;
    const label=quotientLabel(v).split('').map(Number);
    row[72]=label.reduce((s,x,i)=>s^(x&((mask>>i)&1)),0);
    while(true){
      const p=row.slice(0,72).findIndex(Boolean);
      if(p<0){if(row[72])return false;break;}
      if(piv.has(p)){const q=piv.get(p);for(let i=0;i<73;i++)row[i]^=q[i];}
      else{piv.set(p,row);break;}
    }
  }
  // Normalization f(e)=0.
  const norm=Array(73).fill(0);norm[identityIndex]=1;
  let row=norm;
  while(true){
    const p=row.slice(0,72).findIndex(Boolean);
    if(p<0){if(row[72])return false;break;}
    if(piv.has(p)){const q=piv.get(p);for(let i=0;i<73;i++)row[i]^=q[i];}
    else{piv.set(p,row);break;}
  }
  return true;
};
const projectionCoboundary={};
for(let mask=1;mask<(1<<coinvariantDimension);mask++)projectionCoboundary[mask.toString(2).padStart(coinvariantDimension,'0')]=isCoboundary(mask);

// Full twisted H^2 test on the seven-dimensional correction module W.
// Solve z(a,b)=f(a)+a.f(b)+f(ab) for a normalized W-valued 1-cochain.
const d=correctionRank,nvars=72*d,rhsBit=1n<<BigInt(nvars),varMask=rhsBit-1n;
const actionMatrices=finiteO.map(A=>{
  const columns=correctionBasis.map(v=>coordinatesIn(action(A,v),correctionBasis));
  return Array.from({length:d},(_,r)=>Array.from({length:d},(_,c)=>columns[c][r]));
});
const cocycleCoordinates=cocycle.map(x=>coordinatesIn(x.v,correctionBasis));
const pivots=new Map();
const firstSetIndex=x=>{
  let i=0;while(((x>>BigInt(i))&1n)===0n)i++;return i;
};
let twistedConsistent=true,twistedRank=0;
const addEquation=row0=>{
  let row=row0;
  while(true){
    const coeff=row&varMask;
    if(coeff===0n){if(row&rhsBit)twistedConsistent=false;return;}
    const p=firstSetIndex(coeff);
    if(pivots.has(p))row^=pivots.get(p);
    else{pivots.set(p,row);twistedRank++;return;}
  }
};
for(let a=0;a<72&&twistedConsistent;a++)for(let b=0;b<72&&twistedConsistent;b++){
  const ab=mulIndex(a,b),z=cocycleCoordinates[a*72+b],R=actionMatrices[a];
  for(let r=0;r<d;r++){
    let row=(1n<<BigInt(a*d+r))^(1n<<BigInt(ab*d+r));
    for(let j=0;j<d;j++)if(R[r][j])row^=1n<<BigInt(b*d+j);
    if(z[r])row^=rhsBit;
    addEquation(row);
  }
}
for(let r=0;r<d&&twistedConsistent;r++)addEquation(1n<<BigInt(identityIndex*d+r));
assert(twistedConsistent);

// Extract one explicit normalized solution by setting free variables to zero
// and back-substituting the echelon rows.
const cochainSolution=Array(nvars).fill(0);
for(const [p,row] of [...pivots.entries()].sort((a,b)=>b[0]-a[0])){
  let value=Number((row>>BigInt(nvars))&1n);
  for(let j=p+1;j<nvars;j++)if(((row>>BigInt(j))&1n)&&cochainSolution[j])value^=1;
  cochainSolution[p]=value;
}
const cochainCoordinates=Array.from({length:72},(_,g)=>cochainSolution.slice(g*d,(g+1)*d));
assert(cochainCoordinates[identityIndex].every(x=>x===0));
const linearCombination=(coords,basis)=>{
  let out=Array(25).fill(0);
  for(let i=0;i<coords.length;i++)if(coords[i])out=xor(out,basis[i]);
  return out;
};
const modMatrix=(A,m)=>A.map(r=>r.map(x=>mod(x,m)));
const sameMod=(A,B,m)=>A.every((r,i)=>r.every((x,j)=>mod(x-B[i][j],m)===0));
const correctedLifts=lifts.map((Q,g)=>{
  const D=unflatten(linearCombination(cochainCoordinates[g],correctionBasis));
  const K=D.map((r,i)=>r.map((x,j)=>I[i][j]+2*x));
  return mm(K,Q);
});
for(let a=0;a<72;a++){
  assert(sameMod(mm(mm(tr(correctedLifts[a]),HJ),correctedLifts[a]),HJ,4));
  assert(sameMod(correctedLifts[a],finiteO[a],2));
  for(let b=0;b<72;b++)assert(sameMod(mm(correctedLifts[a],correctedLifts[b]),correctedLifts[mulIndex(a,b)],4));
}
assert.equal(new Set(correctedLifts.map(A=>key2(modMatrix(A,4)))).size,72);

const closureIndices=gens=>{
  const S=new Set([identityIndex]),queue=[identityIndex];
  while(queue.length){
    const x=queue.shift();
    for(const g of gens){const y=mulIndex(x,g);if(!S.has(y)){S.add(y);queue.push(y);}}
  }
  return S;
};
let generatorPair=null;
for(let a=0;a<72&&!generatorPair;a++)for(let b=a+1;b<72;b++)if(closureIndices([a,b]).size===72){generatorPair=[a,b];break;}
assert(generatorPair);
const cochainValueCounts=new Map();
for(const c of cochainCoordinates){const k=c.join('');cochainValueCounts.set(k,(cochainValueCounts.get(k)||0)+1);}

// Find standard wreath-product generators a,b,t with
// <a,b>=S3, t^2=1, and t conjugating to the commuting second S3 factor.
const finiteOrder=g=>{
  let x=identityIndex;
  for(let n=1;n<=12;n++){x=mulIndex(x,g);if(x===identityIndex)return n;}
  return null;
};
const evalFiniteWord=word=>word.reduce((x,g)=>mulIndex(x,g),identityIndex);
let wreathTriple=null;
for(let a=0;a<72&&!wreathTriple;a++)if(finiteOrder(a)===2)
for(let b=0;b<72&&!wreathTriple;b++)if(finiteOrder(b)===3&&finiteOrder(mulIndex(a,b))===2)
for(let t=0;t<72&&!wreathTriple;t++)if(finiteOrder(t)===2&&closureIndices([a,b,t]).size===72){
  const ap=evalFiniteWord([t,a,t]),bp=evalFiniteWord([t,b,t]);
  const commute=(x,y)=>mulIndex(mulIndex(mulIndex(x,y),finitePower(x,finiteOrder(x)-1)),finitePower(y,finiteOrder(y)-1))===identityIndex;
  function finitePower(x,n){let y=identityIndex;for(let i=0;i<n;i++)y=mulIndex(y,x);return y;}
  if(commute(a,ap)&&commute(a,bp)&&commute(b,ap)&&commute(b,bp))wreathTriple=[a,b,t];
}
assert(wreathTriple);

// Test lifting the corrected mod-4 wreath presentation to mod 8.
// Generator symbols: 0=a, 1=b, 2=t.
const apWord=[2,0,2],bpWord=[2,1,2],bpInvWord=[2,1,1,2];
const presentationWords=[
  [0,0],                         // a^2
  [1,1,1],                       // b^3
  [0,1,0,1],                     // (ab)^2
  [2,2],                         // t^2
  [0,...apWord,0,...apWord],     // [a,tat]
  [0,...bpWord,0,...bpInvWord],  // [a,tbt]
  [1,...apWord,1,1,...apWord],   // [b,tat]
  [1,...bpWord,1,1,...bpInvWord] // [b,tbt]
];
const tripleFinite=wreathTriple.map(i=>finiteO[i]);
for(const w of presentationWords)assert.equal(evalFiniteWord(w.map(s=>wreathTriple[s])),identityIndex);
const tripleR=wreathTriple.map(i=>correctedLifts[i]);
const wordProduct=(word,mats)=>word.reduce((X,g)=>mm(X,mats[g]),I);
const unitMatrix=(r,c)=>Array.from({length:5},(_,i)=>Array.from({length:5},(_,j)=>Number(i===r&&j===c)));
const mod8Vars=75,mod8Rhs=1n<<BigInt(mod8Vars),mod8Mask=mod8Rhs-1n,mod8Pivots=new Map();
const mod8CoefficientRows=[];
let mod8Consistent=true,mod8Rank=0;
const addMod8Equation=row0=>{
  let row=row0;
  while(true){
    const coeff=row&mod8Mask;
    if(coeff===0n){if(row&mod8Rhs)mod8Consistent=false;return;}
    const p=firstSetIndex(coeff);
    if(mod8Pivots.has(p))row^=mod8Pivots.get(p);
    else{mod8Pivots.set(p,row);mod8Rank++;return;}
  }
};
// Orthogonality equations for R_g+4X_g.
for(let g=0;g<3;g++){
  const R=tripleR[g],A=tripleFinite[g],def=mm(mm(tr(R),HJ),R);
  for(let r=0;r<5;r++)for(let c=0;c<5;c++){
    let row=0n;
    for(let u=0;u<5;u++)for(let v=0;v<5;v++){
      const X=unitMatrix(u,v);
      const delta=mm(mm(tr(X),HJ),A).map((z,i)=>z.map((q,j)=>q+mm(mm(tr(A),HJ),X)[i][j]));
      if(mod(delta[r][c],2))row^=1n<<BigInt(g*25+u*5+v);
    }
    if(mod((def[r][c]-HJ[r][c])/4,2))row^=mod8Rhs;
    mod8CoefficientRows.push(row&mod8Mask);
    addMod8Equation(row);
  }
}
// Presentation-relation equations.
for(const word of presentationWords){
  const base=wordProduct(word,tripleR);
  const prefix=[I],suffix=Array(word.length+1);suffix[word.length]=I;
  for(let k=0;k<word.length;k++)prefix.push(mm2(prefix[k],tripleFinite[word[k]]));
  for(let k=word.length-1;k>=0;k--)suffix[k]=mm2(tripleFinite[word[k]],suffix[k+1]);
  for(let r=0;r<5;r++)for(let c=0;c<5;c++){
    let row=0n;
    for(let k=0;k<word.length;k++)for(let u=0;u<5;u++)for(let v=0;v<5;v++){
      const effect=mm2(mm2(prefix[k],unitMatrix(u,v)),suffix[k+1]);
      if(effect[r][c])row^=1n<<BigInt(word[k]*25+u*5+v);
    }
    if(mod((base[r][c]-I[r][c])/4,2))row^=mod8Rhs;
    mod8CoefficientRows.push(row&mod8Mask);
    addMod8Equation(row);
  }
}
assert(mod8Consistent);
const mod8Solution=Array(mod8Vars).fill(0);
for(const [p,row] of [...mod8Pivots.entries()].sort((a,b)=>b[0]-a[0])){
  let value=Number((row>>BigInt(mod8Vars))&1n);
  for(let j=p+1;j<mod8Vars;j++)if(((row>>BigInt(j))&1n)&&mod8Solution[j])value^=1;
  mod8Solution[p]=value;
}
const mod8Generators=tripleR.map((R,g)=>R.map((row,i)=>row.map((x,j)=>mod(x+4*mod8Solution[g*25+i*5+j],8))));
for(let g=0;g<3;g++)assert(sameMod(mm(mm(tr(mod8Generators[g]),HJ),mod8Generators[g]),HJ,8));
for(const word of presentationWords)assert(sameMod(wordProduct(word,mod8Generators),I,8));
const keyMod=(A,m)=>modMatrix(A,m).flat().join(',');
const mod8Group=new Map([[keyMod(I,8),modMatrix(I,8)]]),mod8Queue=[modMatrix(I,8)];
while(mod8Queue.length){
  const X=mod8Queue.shift();
  for(const S of mod8Generators){
    const Y=modMatrix(mm(X,S),8),k=keyMod(Y,8);
    if(!mod8Group.has(k)){mod8Group.set(k,Y);mod8Queue.push(Y);assert(mod8Group.size<=72);}
  }
}
assert.equal(mod8Group.size,72);
assert.equal(new Set([...mod8Group.values()].map(A=>key2(modMatrix(A,2)))).size,72);

// General compatible lifting step m -> 2m for the same presentation.
const mmMod=(A,B,m)=>A.map(r=>B[0].map((_,j)=>mod(r.reduce((s,a,i)=>s+a*B[i][j],0),m)));
const wordProductMod=(word,mats,m)=>word.reduce((X,g)=>mmMod(X,mats[g],m),modMatrix(I,m));
const liftPresentationOneLevel=(gens,m)=>{
  const nextMod=2*m,piv=new Map(),n=75,rhs=1n<<75n,mask=rhs-1n;
  let consistent=true,eqRank=0;
  const add=row0=>{
    let row=row0;
    while(true){
      const coeff=row&mask;
      if(coeff===0n){if(row&rhs)consistent=false;return;}
      const p=firstSetIndex(coeff);
      if(piv.has(p))row^=piv.get(p);
      else{piv.set(p,row);eqRank++;return;}
    }
  };
  for(let g=0;g<3;g++){
    const R=gens[g],A=tripleFinite[g],def=mm(mm(tr(R),HJ),R);
    for(let r=0;r<5;r++)for(let c=0;c<5;c++){
      let row=0n;
      for(let u=0;u<5;u++)for(let v=0;v<5;v++){
        const X=unitMatrix(u,v);
        const left=mm2(mm2(tr(X),modMatrix(HJ,2)),A);
        const right=mm2(mm2(tr(A),modMatrix(HJ,2)),X);
        if(left[r][c]^right[r][c])row^=1n<<BigInt(g*25+u*5+v);
      }
      assert.equal(mod(def[r][c]-HJ[r][c],m),0);
      if(mod((def[r][c]-HJ[r][c])/m,2))row^=rhs;
      add(row);
    }
  }
  for(const word of presentationWords){
    const base=wordProductMod(word,gens,nextMod);
    const prefix=[I],suffix=Array(word.length+1);suffix[word.length]=I;
    for(let k=0;k<word.length;k++)prefix.push(mm2(prefix[k],tripleFinite[word[k]]));
    for(let k=word.length-1;k>=0;k--)suffix[k]=mm2(tripleFinite[word[k]],suffix[k+1]);
    for(let r=0;r<5;r++)for(let c=0;c<5;c++){
      let row=0n;
      for(let k=0;k<word.length;k++)for(let u=0;u<5;u++)for(let v=0;v<5;v++){
        const effect=mm2(mm2(prefix[k],unitMatrix(u,v)),suffix[k+1]);
        if(effect[r][c])row^=1n<<BigInt(word[k]*25+u*5+v);
      }
      assert.equal(mod(base[r][c]-I[r][c],m),0);
      if(mod((base[r][c]-I[r][c])/m,2))row^=rhs;
      add(row);
    }
  }
  if(!consistent)return {consistent:false,rank:eqRank,pivots:piv};
  const sol=Array(n).fill(0);
  for(const [p,row] of [...piv.entries()].sort((a,b)=>b[0]-a[0])){
    let value=Number((row>>75n)&1n);
    for(let j=p+1;j<n;j++)if(((row>>BigInt(j))&1n)&&sol[j])value^=1;
    sol[p]=value;
  }
  const next=gens.map((R,g)=>R.map((row,i)=>row.map((x,j)=>mod(x+m*sol[g*25+i*5+j],nextMod))));
  for(let g=0;g<3;g++)assert(sameMod(mm(mm(tr(next[g]),HJ),next[g]),HJ,nextMod));
  for(const word of presentationWords)assert(sameMod(wordProductMod(word,next,nextMod),I,nextMod));
  const group=new Map([[keyMod(I,nextMod),modMatrix(I,nextMod)]]),queue=[modMatrix(I,nextMod)];
  while(queue.length){
    const X=queue.shift();
    for(const S of next){
      const Y=mmMod(X,S,nextMod),k=keyMod(Y,nextMod);
      if(!group.has(k)){group.set(k,Y);queue.push(Y);assert(group.size<=72);}
    }
  }
  assert.equal(group.size,72);
  assert.equal(new Set([...group.values()].map(A=>key2(modMatrix(A,2)))).size,72);
  return {consistent:true,rank:eqRank,free:n-eqRank,generators:next,order:group.size,pivots:piv};
};
const recursiveLiftResults=[];
let recursiveGenerators=mod8Generators,recursiveModulus=8;
let firstLift=liftPresentationOneLevel(recursiveGenerators,recursiveModulus);
recursiveLiftResults.push({from:8,to:16,consistent:firstLift.consistent,rank:firstLift.rank,free:firstLift.free,order:firstLift.order,source:'initial_section'});

// The initial mod-8 section may fail while another point in the 17-dimensional
// affine solution family lifts.  Build all left-null compatibility relations
// of the fixed 275x75 next-level coefficient matrix and exhaust all 2^17
// mod-8 sections.
assert.equal(mod8CoefficientRows.length,275);
const coeffPivots=new Map(),dependencies=[];
for(let i=0;i<mod8CoefficientRows.length;i++){
  let coeff=mod8CoefficientRows[i],prov=1n<<BigInt(i);
  while(coeff){
    const p=firstSetIndex(coeff);
    if(coeffPivots.has(p)){const q=coeffPivots.get(p);coeff^=q.coeff;prov^=q.prov;}
    else{coeffPivots.set(p,{coeff,prov});break;}
  }
  if(coeff===0n)dependencies.push(prov);
}
assert.equal(coeffPivots.size,58);
assert.equal(dependencies.length,217);
const nextLevelRhsBits=(gens,m)=>{
  let bits=0n,index=0;
  for(let g=0;g<3;g++){
    const def=mm(mm(tr(gens[g]),HJ),gens[g]);
    for(let r=0;r<5;r++)for(let c=0;c<5;c++){
      assert.equal(mod(def[r][c]-HJ[r][c],m),0);
      if(mod((def[r][c]-HJ[r][c])/m,2))bits|=1n<<BigInt(index);
      index++;
    }
  }
  for(const word of presentationWords){
    const base=wordProductMod(word,gens,2*m);
    for(let r=0;r<5;r++)for(let c=0;c<5;c++){
      assert.equal(mod(base[r][c]-I[r][c],m),0);
      if(mod((base[r][c]-I[r][c])/m,2))bits|=1n<<BigInt(index);
      index++;
    }
  }
  assert.equal(index,275);return bits;
};
const parityBig=x=>{let p=0n;while(x){p^=1n;x&=x-1n;}return Number(p);};
const compatibleRhs=bits=>dependencies.every(dep=>parityBig(dep&bits)===0);
const freeVariables=Array.from({length:75},(_,i)=>i).filter(i=>!mod8Pivots.has(i));
assert.equal(freeVariables.length,17);
const solutionForFreeMask=mask=>{
  const sol=Array(75).fill(0);
  for(let i=0;i<freeVariables.length;i++)sol[freeVariables[i]]=(mask>>i)&1;
  for(const [p,row] of [...mod8Pivots.entries()].sort((a,b)=>b[0]-a[0])){
    let value=Number((row>>75n)&1n);
    for(let j=p+1;j<75;j++)if(((row>>BigInt(j))&1n)&&sol[j])value^=1;
    sol[p]=value;
  }
  return sol;
};
const gensForFreeMask=mask=>{
  const sol=solutionForFreeMask(mask);
  // Keep unreduced integer representatives.  Reducing entries modulo eight
  // introduces parameter-dependent multiples of eight and obscures the affine
  // next-level defect, though it represents the same mod-eight matrices.
  return tripleR.map((R,g)=>R.map((row,i)=>row.map((x,j)=>x+4*sol[g*25+i*5+j])));
};
// Pull the 217 compatibility conditions back to the 17 free parameters.
// Carry terms make the resulting Boolean functions quadratic rather than
// affine.  Recover their exact algebraic normal form from weights 0,1,2 and
// verify degree <=2 on every weight-3 input.
const rhsBase=nextLevelRhsBits(gensForFreeMask(0),8);
const rhsLinear=freeVariables.map((_,i)=>nextLevelRhsBits(gensForFreeMask(1<<i),8)^rhsBase);
const rhsQuadratic=Array.from({length:17},()=>Array(17).fill(0n));
for(let i=0;i<17;i++)for(let j=i+1;j<17;j++)
  rhsQuadratic[i][j]=nextLevelRhsBits(gensForFreeMask((1<<i)|(1<<j)),8)^rhsBase^rhsLinear[i]^rhsLinear[j];
for(let i=0;i<17;i++)for(let j=i+1;j<17;j++)for(let k=j+1;k<17;k++){
  const predicted=rhsBase^rhsLinear[i]^rhsLinear[j]^rhsLinear[k]^rhsQuadratic[i][j]^rhsQuadratic[i][k]^rhsQuadratic[j][k];
  assert.equal(nextLevelRhsBits(gensForFreeMask((1<<i)|(1<<j)|(1<<k)),8),predicted);
}
const syndrome=bits=>{
  let out=0n;
  for(let i=0;i<dependencies.length;i++)if(parityBig(dependencies[i]&bits))out|=1n<<BigInt(i);
  return out;
};
const syndromeBase=syndrome(rhsBase);
const syndromeLinear=rhsLinear.map(syndrome);
const syndromeQuadratic=rhsQuadratic.map((row,i)=>row.map((x,j)=>j>i?syndrome(x):0n));
let compatibleMask=null,compatibleMod8Sections=0;
for(let mask=0;mask<(1<<17);mask++){
  let s=syndromeBase;
  const set=[];for(let i=0;i<17;i++)if((mask>>i)&1){s^=syndromeLinear[i];set.push(i);}
  for(let a=0;a<set.length;a++)for(let b=a+1;b<set.length;b++)s^=syndromeQuadratic[set[a]][set[b]];
  if(s===0n){compatibleMod8Sections++;if(compatibleMask===null)compatibleMask=mask;}
}
assert.notEqual(compatibleMask,null);
const liftableMod8Generators=gensForFreeMask(compatibleMask);
assert(compatibleRhs(nextLevelRhsBits(liftableMod8Generators,8)));
const liftableMod16=liftPresentationOneLevel(liftableMod8Generators,8);
assert(liftableMod16.consistent);
if(liftableMod16){
  recursiveGenerators=liftableMod16.generators;recursiveModulus=16;
  recursiveLiftResults.push({from:8,to:16,consistent:true,rank:liftableMod16.rank,free:liftableMod16.free,order:liftableMod16.order,source:'exhaustive_quadratic_family'});
}
const compatibleNextFamily=(baseGens,m,liftResult)=>{
  assert(liftResult.consistent);
  const piv=liftResult.pivots,free=Array.from({length:75},(_,i)=>i).filter(i=>!piv.has(i));
  assert.equal(free.length,17);
  const sectionForMask=mask=>{
    const sol=Array(75).fill(0);
    for(let i=0;i<17;i++)sol[free[i]]=(mask>>i)&1;
    for(const [p,row] of [...piv.entries()].sort((a,b)=>b[0]-a[0])){
      let value=Number((row>>75n)&1n);
      for(let j=p+1;j<75;j++)if(((row>>BigInt(j))&1n)&&sol[j])value^=1;
      sol[p]=value;
    }
    return baseGens.map((R,g)=>R.map((row,i)=>row.map((x,j)=>x+m*sol[g*25+i*5+j])));
  };
  const b=nextLevelRhsBits(sectionForMask(0),2*m);
  const l=free.map((_,i)=>nextLevelRhsBits(sectionForMask(1<<i),2*m)^b);
  const q=Array.from({length:17},()=>Array(17).fill(0n));
  for(let i=0;i<17;i++)for(let j=i+1;j<17;j++)q[i][j]=nextLevelRhsBits(sectionForMask((1<<i)|(1<<j)),2*m)^b^l[i]^l[j];
  for(let i=0;i<17;i++)for(let j=i+1;j<17;j++)for(let k=j+1;k<17;k++){
    const predicted=b^l[i]^l[j]^l[k]^q[i][j]^q[i][k]^q[j][k];
    assert.equal(nextLevelRhsBits(sectionForMask((1<<i)|(1<<j)|(1<<k)),2*m),predicted);
  }
  const sb=syndrome(b),sl=l.map(syndrome),sq=q.map((row,i)=>row.map((x,j)=>j>i?syndrome(x):0n));
  let first=null,count=0;const compatibleMasks=[];
  for(let mask=0;mask<(1<<17);mask++){
    let s=sb;const set=[];
    for(let i=0;i<17;i++)if((mask>>i)&1){s^=sl[i];set.push(i);}
    for(let a=0;a<set.length;a++)for(let c=a+1;c<set.length;c++)s^=sq[set[a]][set[c]];
    if(s===0n){count++;compatibleMasks.push(mask);if(first===null)first=mask;}
  }
  const differenceMasks=compatibleMasks.map(x=>x^first);
  const intPivots=new Map();
  for(let x of differenceMasks)while(x){
    const p=Math.floor(Math.log2(x&-x));
    if(intPivots.has(p))x^=intPivots.get(p);
    else{intPivots.set(p,x);break;}
  }
  const affineDimension=intPivots.size;
  const isAffineSubspace=count===2**affineDimension;
  const directionFingerprint=differenceMasks.sort((a,b)=>a-b).join(',');
  const parityInt=x=>{let p=0;while(x){p^=1;x&=x-1;}return p;};
  const directionBasis=[...intPivots.values()];
  const annihilatorVectors=[];
  for(let y=0;y<(1<<17);y++)if(directionBasis.every(u=>parityInt(y&u)===0))annihilatorVectors.push(y);
  assert.equal(annihilatorVectors.length,128);
  const annPivots=new Map();
  for(let y of annihilatorVectors)while(y){
    const p=Math.floor(Math.log2(y&-y));
    if(annPivots.has(p))y^=annPivots.get(p);
    else{annPivots.set(p,y);break;}
  }
  const annihilatorBasis=[...annPivots.entries()].sort((a,b)=>a[0]-b[0]).map(x=>x[1]);
  assert.equal(annihilatorBasis.length,7);
  const quotientOffset=annihilatorBasis.reduce((s,y,i)=>s|(parityInt(y&first)<<i),0);
  const signature=[sb,...sl];
  for(let i=0;i<17;i++)for(let j=i+1;j<17;j++)signature.push(sq[i][j]);
  return {count,mask:first,signature,hessian:sq,affineDimension,isAffineSubspace,directionFingerprint,directionBasis,annihilatorBasis,quotientOffset,section:first===null?null:sectionForMask(first)};
};
let familyBase=liftableMod8Generators,familyBaseModulus=8,familyLift=liftableMod16;
let stationarySignature=null,stationarySignatureRepeats=true,stationaryMasks=[];
let stationaryDirection=null,stationaryDirectionRepeats=true;
let canonicalDirectionBasis=null,canonicalAnnihilatorBasis=null,quotientOffsetSequence=[];
const compatibilityHessians=[];
while(familyLift?.consistent&&2*familyBaseModulus<65536){
  const family=compatibleNextFamily(familyBase,familyBaseModulus,familyLift);
  stationaryMasks.push(family.mask);
  if(!stationarySignature)stationarySignature=family.signature;
  else if(family.signature.length!==stationarySignature.length||family.signature.some((x,i)=>x!==stationarySignature[i]))stationarySignatureRepeats=false;
  if(stationaryDirection===null)stationaryDirection=family.directionFingerprint;
  else if(family.directionFingerprint!==stationaryDirection)stationaryDirectionRepeats=false;
  if(!canonicalDirectionBasis){canonicalDirectionBasis=family.directionBasis;canonicalAnnihilatorBasis=family.annihilatorBasis;}
  quotientOffsetSequence.push(family.quotientOffset);
  compatibilityHessians.push(family.hessian);
  const currentSectionModulus=2*familyBaseModulus,nextModulus=4*familyBaseModulus;
  recursiveLiftResults.push({from:currentSectionModulus,to:nextModulus,compatible_sections:family.count,affine_dimension:family.affineDimension,is_affine:family.isAffineSubspace,first_compatible_mask:family.mask,signature_matches_first:stationarySignatureRepeats,direction_matches_first:stationaryDirectionRepeats,source:'quadratic_family_scan'});
  if(!family.section)break;
  const nextLift=liftPresentationOneLevel(family.section,currentSectionModulus);
  assert(nextLift.consistent);
  recursiveLiftResults.push({from:currentSectionModulus,to:nextModulus,consistent:true,rank:nextLift.rank,free:nextLift.free,order:nextLift.order,source:'selected_compatible_section'});
  familyBase=family.section;familyBaseModulus=currentSectionModulus;familyLift=nextLift;
  recursiveGenerators=nextLift.generators;recursiveModulus=nextModulus;
}

// Cohomological identification of the stable 10+7 split.
// The 17-dimensional homogeneous presentation-lift space is Z^1(G, o(H)).
// Infinitesimal conjugations Y -> (Y A_g + A_g Y)_g give B^1.
const nullspaceBig=(rows,n)=>{
  const piv=new Map();
  for(let row of rows){
    while(row){
      const p=firstSetIndex(row);
      if(piv.has(p))row^=piv.get(p);else{piv.set(p,row);break;}
    }
  }
  const free=Array.from({length:n},(_,i)=>i).filter(i=>!piv.has(i)),basis=[];
  for(const f of free){
    const sol=Array(n).fill(0);sol[f]=1;
    for(const [p,row] of [...piv.entries()].sort((a,b)=>b[0]-a[0])){
      let v=0;for(let j=p+1;j<n;j++)if(((row>>BigInt(j))&1n)&&sol[j])v^=1;sol[p]=v;
    }
    basis.push(sol);
  }
  return {rank:piv.size,basis};
};
const H2=modMatrix(HJ,2),lieRows=[];
for(let r=0;r<5;r++)for(let c=0;c<5;c++){
  let row=0n;
  for(let u=0;u<5;u++)for(let v=0;v<5;v++){
    const E=unitMatrix(u,v);
    const condition=mm2(tr(E),H2)[r][c]^mm2(H2,E)[r][c];
    if(condition)row^=1n<<BigInt(u*5+v);
  }
  lieRows.push(row);
}
const lieNull=nullspaceBig(lieRows,25);
assert.equal(lieNull.basis.length,15);
const coboundaryMasks=[];
for(const yv of lieNull.basis){
  const Y=unflatten(yv),triple=[];
  for(const A of tripleFinite){
    const D=mm2(Y,A).map((r,i)=>r.map((x,j)=>x^mm2(A,Y)[i][j]));
    triple.push(...D.flat());
  }
  let tripleMask=0n;for(let i=0;i<75;i++)if(triple[i])tripleMask|=1n<<BigInt(i);
  for(const row of mod8CoefficientRows)assert.equal(parityBig(row&tripleMask),0);
  let freeMask=0;for(let i=0;i<freeVariables.length;i++)if(triple[freeVariables[i]])freeMask|=1<<i;
  coboundaryMasks.push(freeMask);
}
const cobPivots=new Map();
for(let x of coboundaryMasks)while(x){
  const p=Math.floor(Math.log2(x&-x));
  if(cobPivots.has(p))x^=cobPivots.get(p);else{cobPivots.set(p,x);break;}
}
assert.equal(cobPivots.size,13);
const cobSpan=new Set([0]);
for(const b of cobPivots.values())for(const x of [...cobSpan])cobSpan.add(x^b);
const cobFingerprint=[...cobSpan].sort((a,b)=>a-b).join(',');
const tangentInvariantDimension=lieNull.basis.length-cobPivots.size;
assert.equal(tangentInvariantDimension,2);
const z1Dimension=17,b1Dimension=13,h1Dimension=z1Dimension-b1Dimension;
assert.equal(h1Dimension,4);
// A naive scalar extension of this F2-linear presentation complex to the
// dual-number ring D=F2[epsilon]/epsilon^2 is block diagonal on residue and
// nilpotent coefficients.  It duplicates every direction and cannot by
// itself select a unique Gaussian quadrature.
const naiveDualNumberExtension={
  coefficientRing:'F2[epsilon]/(epsilon^2)',
  presentationVariablesOverF2:2*mod8Vars,
  presentationRankOverF2:2*mod8Rank,
  Z1DimensionOverF2:2*z1Dimension,
  nilpotentZ1KernelDimension:z1Dimension,
  B1DimensionOverF2:2*b1Dimension,
  H1DimensionOverF2:2*h1Dimension,
  nilpotentH1KernelDimension:h1Dimension,
  UDimensionOverF2:20,
  nilpotentUKernelDimension:10,
  selectsUniqueQuadrature:false
};
assert.equal(naiveDualNumberExtension.Z1DimensionOverF2,34);
assert.equal(naiveDualNumberExtension.nilpotentZ1KernelDimension,17);
assert.equal(naiveDualNumberExtension.H1DimensionOverF2,8);
assert.equal(naiveDualNumberExtension.nilpotentH1KernelDimension,4);
const sumPivots=new Map();
for(let x of [...cobPivots.values(),...canonicalDirectionBasis])while(x){
  const p=Math.floor(Math.log2(x&-x));
  if(sumPivots.has(p))x^=sumPivots.get(p);else{sumPivots.set(p,x);break;}
}
const uDimension=10,sumDimension=sumPivots.size,intersectionDimension=uDimension+b1Dimension-sumDimension;
assert.equal(sumDimension,14);
assert.equal(intersectionDimension,9);
const coboundaryImageInQuotient=b1Dimension-intersectionDimension;
const quotientBeyondCoboundaries=z1Dimension-sumDimension;
const uImageInH1=uDimension-intersectionDimension;
assert.equal(coboundaryImageInQuotient,4);
assert.equal(quotientBeyondCoboundaries,3);
assert.equal(uImageInH1,1);

// Normalization and the cocycle equation hold in the abelian first layer.
for(let a=0;a<72;a++){
  assert.equal(quotientLabel(cocycle[a*72+identityIndex].v),'0'.repeat(coinvariantDimension));
  assert.equal(quotientLabel(cocycle[identityIndex*72+a].v),'0'.repeat(coinvariantDimension));
}
for(let a=0;a<72;a++)for(let b=0;b<72;b++)for(let c=0;c<72;c++){
  const ab=mulIndex(a,b),bc=mulIndex(b,c);
  const lhs=xor(cocycle[a*72+b].v,cocycle[ab*72+c].v);
  const rhs=xor(action(finiteO[a],cocycle[b*72+c].v),cocycle[a*72+bc].v);
  assert.deepEqual(reduceBy(xor(lhs,rhs),correctionBasis),zero);
}

console.log('five_bit_shell_lift_cocycle_first_congruence_layer: PASS');
console.log('normalized_lift_system_size=72');
console.log('kernel_corrections_tested=5184');
console.log('correction_span_dimension='+correctionRank);
console.log('conjugation_commutator_dimension='+commutatorBasis.length);
console.log('coinvariant_dimension='+coinvariantDimension);
console.log('coinvariant_cocycle_label_counts='+JSON.stringify(Object.fromEntries([...labelCounts].sort())));
console.log('scalar_projection_is_coboundary='+JSON.stringify(projectionCoboundary));
console.log('full_twisted_cocycle_is_coboundary=true');
console.log('twisted_coboundary_system_rank='+twistedRank+'_variables='+nvars);
console.log('explicit_normalized_cochain_distinct_values='+cochainValueCounts.size);
console.log('corrected_mod4_section_has_72_distinct_matrices_and_is_multiplicative=true');
console.log('finite_generator_pair_indices='+JSON.stringify(generatorPair));
console.log('corrected_mod4_generator_A='+JSON.stringify(modMatrix(correctedLifts[generatorPair[0]],4)));
console.log('corrected_mod4_generator_B='+JSON.stringify(modMatrix(correctedLifts[generatorPair[1]],4)));
console.log('wreath_presentation_generator_indices='+JSON.stringify(wreathTriple));
console.log('mod8_lift_system_consistent=true');
console.log('mod8_linear_system_rank='+mod8Rank+'_variables='+mod8Vars);
console.log('mod8_generator_A='+JSON.stringify(mod8Generators[0]));
console.log('mod8_generator_B='+JSON.stringify(mod8Generators[1]));
console.log('mod8_generator_swap='+JSON.stringify(mod8Generators[2]));
console.log('mod8_orthogonal_section_group_order='+mod8Group.size);
console.log('mod8_sections_tested='+2**17);
console.log('mod8_sections_compatible_with_mod16='+compatibleMod8Sections);
console.log('compatible_recursive_lifts='+JSON.stringify(recursiveLiftResults));
console.log('quadratic_compatibility_signature_repeats_exactly='+stationarySignatureRepeats);
console.log('compatible_sets_are_affine_10_planes='+recursiveLiftResults.filter(x=>x.source==='quadratic_family_scan').every(x=>x.is_affine&&x.affine_dimension===10));
console.log('affine_direction_subspace_repeats_exactly='+stationaryDirectionRepeats);
console.log('fixed_ten_plane_basis_masks='+JSON.stringify(canonicalDirectionBasis));
console.log('fixed_seven_quotient_functional_masks='+JSON.stringify(canonicalAnnihilatorBasis));
console.log('seven_bit_offset_sequence='+JSON.stringify(quotientOffsetSequence));
const offsetPivots=new Map();
for(let x of quotientOffsetSequence)while(x){
  const p=Math.floor(Math.log2(x&-x));
  if(offsetPivots.has(p))x^=offsetPivots.get(p);
  else{offsetPivots.set(p,x);break;}
}
const offsetSpanRank=offsetPivots.size;
const offsetFixedFunctionals=[];
for(let y=0;y<128;y++)if([...offsetPivots.values()].every(x=>{
  let z=x&y,p=0;while(z){p^=1;z&=z-1;}return p===0;
}))offsetFixedFunctionals.push(y);
const offsetAnnPivots=new Map();
for(let y of offsetFixedFunctionals)while(y){
  const p=Math.floor(Math.log2(y&-y));
  if(offsetAnnPivots.has(p))y^=offsetAnnPivots.get(p);
  else{offsetAnnPivots.set(p,y);break;}
}
const projectToSeven=x=>canonicalAnnihilatorBasis.reduce((s,y,i)=>{
  let z=x&y,p=0;while(z){p^=1;z&=z-1;}return s|(p<<i);
},0);
const bImagePivots=new Map();
for(const x of cobPivots.values()){
  let y=projectToSeven(x);
  while(y){const p=Math.floor(Math.log2(y&-y));if(bImagePivots.has(p))y^=bImagePivots.get(p);else{bImagePivots.set(p,y);break;}}
}
assert.equal(bImagePivots.size,4);
const filtrationSumPivots=new Map();
for(let x of [...offsetPivots.values(),...bImagePivots.values()])while(x){
  const p=Math.floor(Math.log2(x&-x));if(filtrationSumPivots.has(p))x^=filtrationSumPivots.get(p);else{filtrationSumPivots.set(p,x);break;}
}
const dynamicGaugeIntersection=offsetSpanRank+bImagePivots.size-filtrationSumPivots.size;
const reduceInt=(x,piv)=>{
  let y=x;
  for(const [p,b] of [...piv.entries()].sort((a,b)=>a[0]-b[0]))if((y>>p)&1)y^=b;
  return y;
};
let uniqueMovingRepresentative=null;
for(const x of offsetPivots.values())if(reduceInt(x,bImagePivots)!==0){uniqueMovingRepresentative=x;break;}
assert.notEqual(uniqueMovingRepresentative,null);
const stationaryComplement=[],rExtended=new Map(offsetPivots);
for(let i=0;i<7;i++){
  const e=1<<i;
  if(reduceInt(e,rExtended)!==0){
    stationaryComplement.push(e);
    let x=e;while(x){const p=Math.floor(Math.log2(x&-x));if(rExtended.has(p))x^=rExtended.get(p);else{rExtended.set(p,x);break;}}
  }
}
assert.equal(stationaryComplement.length,2);

// Test whether the quadratic compatibility Hessian descends to the stationary
// quotient Q/R.  Descent requires the full preimage of R to lie in the radical;
// a nonzero cross-value on the two quotient axes would then give a canonical
// vector-valued alternating pairing on the stationary plane.
const quotientPreimages=[];
for(let i=0;i<7;i++){
  let found=null;
  for(let x=0;x<(1<<17);x++)if(projectToSeven(x)===(1<<i)){found=x;break;}
  assert.notEqual(found,null);
  quotientPreimages.push(found);
}
const rQuotientAxes=[1,2,3,5,6];
const preimageRBasis=[...canonicalDirectionBasis,...rQuotientAxes.map(i=>quotientPreimages[i])];
const standardCorrectionBasis=Array.from({length:17},(_,i)=>1<<i);
const hessianEval=(H,x,y)=>{
  let value=0n;
  for(let i=0;i<17;i++)for(let j=i+1;j<17;j++)
    if((((x>>i)&1)&&((y>>j)&1))||(((x>>j)&1)&&((y>>i)&1)))value^=H[i][j];
  return value;
};
const hessianKillsR=compatibilityHessians.map(H=>
  preimageRBasis.every(r=>standardCorrectionBasis.every(x=>hessianEval(H,r,x)===0n))
);
const stationaryCrossValues=compatibilityHessians.map(H=>
  hessianEval(H,quotientPreimages[0],quotientPreimages[4])
);
const hessianKillsU=compatibilityHessians.map(H=>
  canonicalDirectionBasis.every(r=>standardCorrectionBasis.every(x=>hessianEval(H,r,x)===0n))
);
assert(hessianKillsU.every(Boolean));
assert(hessianKillsR.every(Boolean));
assert(stationaryCrossValues.every(x=>x===0n));

// Search for a canonical evaluation map from presentation one-cocycles to the
// seven-dimensional correction module.  A group element g would induce a map
// Q=Z^1/U -> W by evaluation only if every direction in U evaluates to zero
// and all normalized values lie in W.
const homogeneousGeneratorTriples=Array.from({length:17},(_,i)=>{
  const base=solutionForFreeMask(0),one=solutionForFreeMask(1<<i);
  const difference=one.map((x,j)=>x^base[j]);
  return Array.from({length:3},(_,g)=>unflatten(difference.slice(25*g,25*(g+1))));
});
const finiteWords=Array(72).fill(null);finiteWords[identityIndex]=[];
const wordQueue=[identityIndex];
while(wordQueue.length){
  const g=wordQueue.shift();
  for(let s=0;s<3;s++){
    const h=mulIndex(g,wreathTriple[s]);
    if(finiteWords[h]===null){finiteWords[h]=[...finiteWords[g],s];wordQueue.push(h);}
  }
}
assert(finiteWords.every(Boolean));
const evaluateHomogeneousTriple=(tripleX,word)=>{
  let A=modMatrix(I,2),D=Array.from({length:5},()=>Array(5).fill(0));
  for(const s of word){
    D=mm2(D,tripleFinite[s]).map((r,i)=>r.map((x,j)=>x^mm2(A,tripleX[s])[i][j]));
    A=mm2(A,tripleFinite[s]);
  }
  return flatten(mm2(D,inv2(A)));
};
const evaluationProfiles=[];
for(let g=0;g<72;g++){
  const columns=homogeneousGeneratorTriples.map(T=>evaluateHomogeneousTriple(T,finiteWords[g]));
  const evalMask=mask=>{
    let out=Array(25).fill(0);
    for(let i=0;i<17;i++)if((mask>>i)&1)out=xor(out,columns[i]);
    return out;
  };
  const imageRank=rank(columns);
  const uImages=canonicalDirectionBasis.map(evalMask);
  const uRank=rank(uImages);
  const quotientWellDefined=uImages.every(v=>v.every(x=>x===0));
  const imageInCorrectionModule=columns.every(v=>reduceBy(v,correctionBasis).every(x=>x===0));
  evaluationProfiles.push({g,order:finiteOrder(g),word_length:finiteWords[g].length,image_rank:imageRank,U_image_rank:uRank,descends_to_Q:quotientWellDefined,image_in_W:imageInCorrectionModule});
}
const evaluationProfileCounts=new Map();
for(const p of evaluationProfiles){
  const k=p.image_rank+','+p.U_image_rank+','+Number(p.image_in_W);
  evaluationProfileCounts.set(k,(evaluationProfileCounts.get(k)??0)+1);
}
const descendingEvaluationElements=evaluationProfiles.filter(p=>p.descends_to_Q);

// Evaluation does not land in W directly.  Test the canonical weaker target:
// the coinvariants of the full orthogonal tangent module.  If evaluation kills
// R after coinvariant projection and has rank two, it gives Q/R -> o_G.
const tangentCommutatorBasis=basisOf(
  finiteO.flatMap(A=>lieNull.basis.map(v=>xor(v,action(A,v))))
);
const tangentCoinvariantVectors=[];
let tangentCoinvariantEnlarged=[...tangentCommutatorBasis];
for(const v of lieNull.basis)if(rank([...tangentCoinvariantEnlarged,v])>tangentCoinvariantEnlarged.length){
  tangentCoinvariantVectors.push(v);
  tangentCoinvariantEnlarged=basisOf([...tangentCoinvariantEnlarged,v]);
}
const tangentCoinvariantDimension=lieNull.basis.length-tangentCommutatorBasis.length;
assert.equal(tangentCoinvariantVectors.length,tangentCoinvariantDimension);
const tangentCoinvariantCoords=v=>{
  for(let mask=0;mask<(1<<tangentCoinvariantDimension);mask++){
    let w=[...v];
    for(let i=0;i<tangentCoinvariantDimension;i++)if((mask>>i)&1)w=xor(w,tangentCoinvariantVectors[i]);
    if(reduceBy(w,tangentCommutatorBasis).every(x=>x===0))
      return Array.from({length:tangentCoinvariantDimension},(_,i)=>(mask>>i)&1);
  }
  throw new Error('tangent coinvariant coordinates not found');
};
const correctionImageInTangentCoinvariants=correctionBasis.map(tangentCoinvariantCoords);
const correctionToTangentCoinvariantRank=rank(correctionImageInTangentCoinvariants);
const coinvariantEvaluationProfiles=[];
const coinvariantEvaluationMapVectors=[];
for(let g=0;g<72;g++){
  const columns=homogeneousGeneratorTriples.map(T=>tangentCoinvariantCoords(evaluateHomogeneousTriple(T,finiteWords[g])));
  coinvariantEvaluationMapVectors.push(columns.flat());
  const evalMask=mask=>{
    let out=Array(tangentCoinvariantDimension).fill(0);
    for(let i=0;i<17;i++)if((mask>>i)&1)out=xor(out,columns[i]);
    return out;
  };
  const uRank=rank(canonicalDirectionBasis.map(evalMask));
  const rRank=rank(preimageRBasis.map(evalMask));
  const stationaryColumns=[evalMask(quotientPreimages[0]),evalMask(quotientPreimages[4])];
  coinvariantEvaluationProfiles.push({
    g,order:finiteOrder(g),word_length:finiteWords[g].length,
    image_rank:rank(columns),U_image_rank:uRank,R_image_rank:rRank,
    descends_to_Q:uRank===0,descends_to_Q_over_R:rRank===0,
    stationary_map:stationaryColumns.map(x=>x.join('')).join('|')
  });
}
const tangentCoinvariantEvaluationCounts=new Map();
for(const p of coinvariantEvaluationProfiles){
  const k=p.image_rank+','+p.U_image_rank+','+p.R_image_rank;
  tangentCoinvariantEvaluationCounts.set(k,(tangentCoinvariantEvaluationCounts.get(k)??0)+1);
}
const stationaryCoinvariantEvaluations=coinvariantEvaluationProfiles.filter(p=>p.descends_to_Q_over_R&&p.image_rank===2);
const descendingStationaryMapCounts=new Map();
for(const p of coinvariantEvaluationProfiles.filter(p=>p.descends_to_Q_over_R))
  descendingStationaryMapCounts.set(p.stationary_map,(descendingStationaryMapCounts.get(p.stationary_map)??0)+1);
const wreathGeneratorCoinvariantEvaluations=wreathTriple.map(g=>coinvariantEvaluationProfiles[g]);
const coinvariantEvaluationMapBasis=basisOf(coinvariantEvaluationMapVectors);
const applyFlatEvaluationMap=(flat,mask)=>{
  let out=Array(tangentCoinvariantDimension).fill(0);
  for(let i=0;i<17;i++)if((mask>>i)&1)
    for(let j=0;j<tangentCoinvariantDimension;j++)out[j]^=flat[i*tangentCoinvariantDimension+j];
  return out;
};
const descendingMapSpan=[],descendingStationaryRestrictions=[];
for(let mask=0;mask<(1<<coinvariantEvaluationMapBasis.length);mask++){
  let flat=Array(17*tangentCoinvariantDimension).fill(0);
  for(let i=0;i<coinvariantEvaluationMapBasis.length;i++)if((mask>>i)&1)flat=xor(flat,coinvariantEvaluationMapBasis[i]);
  if(preimageRBasis.every(r=>applyFlatEvaluationMap(flat,r).every(x=>x===0))){
    descendingMapSpan.push(flat);
    descendingStationaryRestrictions.push([
      ...applyFlatEvaluationMap(flat,quotientPreimages[0]),
      ...applyFlatEvaluationMap(flat,quotientPreimages[4])
    ]);
  }
}
const descendingMapSpaceDimension=Math.log2(descendingMapSpan.length);
const descendingStationaryRestrictionRank=rank(descendingStationaryRestrictions);
assert.equal(coinvariantEvaluationMapBasis.length,2);
assert.equal(descendingMapSpaceDimension,1);
assert.equal(descendingStationaryRestrictionRank,1);
const uSpanMasks=[0];
for(const b of canonicalDirectionBasis)for(const x of [...uSpanMasks])uSpanMasks.push(x^b);
const uCapBCandidates=uSpanMasks.filter(x=>cobSpan.has(x));
const uCapBPivots=new Map();
for(let x of uCapBCandidates)while(x){
  const p=Math.floor(Math.log2(x&-x));
  if(uCapBPivots.has(p))x^=uCapBPivots.get(p);else{uCapBPivots.set(p,x);break;}
}
assert.equal(uCapBPivots.size,9);
const rQuotientPreimageBasis=rQuotientAxes.map(i=>quotientPreimages[i]);
const wreathEvaluationContamination=wreathTriple.map(g=>{
  const flat=coinvariantEvaluationMapVectors[g];
  return {
    g,
    U_cap_B1_image_rank:rank([...uCapBPivots.values()].map(x=>applyFlatEvaluationMap(flat,x))),
    U_image_rank:rank(canonicalDirectionBasis.map(x=>applyFlatEvaluationMap(flat,x))),
    chosen_R_over_U_axis_image_rank:rank(rQuotientPreimageBasis.map(x=>applyFlatEvaluationMap(flat,x))),
    chosen_stationary_axis_images:[quotientPreimages[0],quotientPreimages[4]].map(x=>applyFlatEvaluationMap(flat,x).join(''))
  };
});
const uNonCoboundaryRepresentative=uSpanMasks.find(x=>!cobSpan.has(x));
assert.notEqual(uNonCoboundaryRepresentative,undefined);
const localReflectionFlat=coinvariantEvaluationMapVectors[wreathTriple[0]];
const localReflectionCoupledImages={
  U_non_coboundary:applyFlatEvaluationMap(localReflectionFlat,uNonCoboundaryRepresentative).join(''),
  moving_e1:applyFlatEvaluationMap(localReflectionFlat,quotientPreimages[1]).join(''),
  stationary_e0:applyFlatEvaluationMap(localReflectionFlat,quotientPreimages[0]).join('')
};
const exchangeFlat=coinvariantEvaluationMapVectors[wreathTriple[2]];
const universalAbelianizedEvaluation=mask=>[
  ...applyFlatEvaluationMap(localReflectionFlat,mask),
  ...applyFlatEvaluationMap(exchangeFlat,mask)
];
const residualExtensionSources=[
  uNonCoboundaryRepresentative,
  quotientPreimages[1],
  quotientPreimages[0],
  quotientPreimages[4]
];
const residualUniversalImages=residualExtensionSources.map(universalAbelianizedEvaluation);
assert.equal(rank(residualUniversalImages),3);
const residualUniversalKernel=[];
for(let mask=0;mask<16;mask++){
  let image=Array(4).fill(0);
  for(let i=0;i<4;i++)if((mask>>i)&1)image=xor(image,residualUniversalImages[i]);
  if(image.every(x=>x===0))residualUniversalKernel.push(mask);
}
assert.deepEqual(residualUniversalKernel,[0,3]);
// The four named residual sources form a basis of H^1 modulo B^1.  Universal
// evaluation loses exactly the nonzero class u+e1.  Consequently the tensor
// arrow E12 has precisely two cohomology lifts, differing by that invisible
// class; this is the exact first-order Gaussian candidate pair.
const residualH1Representatives=[];
for(let mask=0;mask<16;mask++){
  let representative=0;
  for(let i=0;i<4;i++)if((mask>>i)&1)representative^=residualExtensionSources[i];
  residualH1Representatives.push(reduceInt(representative,cobPivots));
}
assert.equal(new Set(residualH1Representatives).size,16);
const tensorPreimages=target=>{
  const out=[];
  for(let mask=0;mask<16;mask++){
    let image=Array(4).fill(0);
    for(let i=0;i<4;i++)if((mask>>i)&1)image=xor(image,residualUniversalImages[i]);
    if(image.join('')===target)out.push(mask);
  }
  return out;
};
const residualH1TensorPreimages={
  zero:tensorPreimages('0000'),
  E11:tensorPreimages('1000'),
  E12:tensorPreimages('0100'),
  E22:tensorPreimages('0001')
};
assert.deepEqual(residualH1TensorPreimages.zero,[0,3]);
assert.deepEqual(residualH1TensorPreimages.E12,[4,7]);
const gaussianArrowCandidatePresentationMasks=[
  residualExtensionSources[2],
  residualExtensionSources[2]^residualExtensionSources[0]^residualExtensionSources[1]
];
const gaussianCandidatesInRealCompatibleDirectionPlane=
  gaussianArrowCandidatePresentationMasks.map(x=>uSpanMasks.includes(x));
assert.deepEqual(gaussianCandidatesInRealCompatibleDirectionPlane,[false,false]);
const matrix2FromTensor=x=>[[x[0],x[1]],[x[2],x[3]]];
const matrix2Key=A=>A.flat().join('');
const matrix2Mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,a,i)=>s^(a&B[i][j]),0)));
const matrix2Transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const matrix2Triple=(A,B,C)=>matrix2Mul(matrix2Mul(A,matrix2Transpose(B)),C);
const upperTriangularTensorBasis=[
  residualUniversalImages[0],
  residualUniversalImages[2],
  residualUniversalImages[3]
];
assert.deepEqual(upperTriangularTensorBasis.map(x=>x.join('')),['1000','0100','0001']);
const upperTriangularAlgebra=[];
for(let mask=0;mask<8;mask++){
  let x=Array(4).fill(0);
  for(let i=0;i<3;i++)if((mask>>i)&1)x=xor(x,upperTriangularTensorBasis[i]);
  upperTriangularAlgebra.push(matrix2FromTensor(x));
}
const upperTriangularKeys=new Set(upperTriangularAlgebra.map(matrix2Key));
for(const A of upperTriangularAlgebra)for(const B of upperTriangularAlgebra)
  assert(upperTriangularKeys.has(matrix2Key(matrix2Mul(A,B))));
const E11=matrix2FromTensor([1,0,0,0]),E12=matrix2FromTensor([0,1,0,0]);
const E21=matrix2FromTensor([0,0,1,0]),E22=matrix2FromTensor([0,0,0,1]);
assert.deepEqual(matrix2Mul(E11,E12),E12);
assert.deepEqual(matrix2Mul(E12,E22),E12);
assert.deepEqual(matrix2Mul(E22,E12),[[0,0],[0,0]]);
assert.deepEqual(matrix2Mul(E12,E11),[[0,0],[0,0]]);
assert(!upperTriangularKeys.has(matrix2Key(E21)));
assert.deepEqual(matrix2Triple(E22,E12,E11),E21);
const fullMatrixAlgebraKeys=new Set();
for(const A of upperTriangularAlgebra)for(const bit of [0,1]){
  const B=A.map(r=>[...r]);if(bit)for(let i=0;i<2;i++)for(let j=0;j<2;j++)B[i][j]^=E21[i][j];
  fullMatrixAlgebraKeys.add(matrix2Key(B));
}
assert.equal(fullMatrixAlgebraKeys.size,16);
console.log('offset_span_rank='+offsetSpanRank);
console.log('offset_fixed_quotient_dimension='+(7-offsetSpanRank));
console.log('offset_fixed_functional_basis='+JSON.stringify([...offsetAnnPivots.values()]));
console.log('B1_image_rank_in_Q='+bImagePivots.size);
console.log('dynamic_rank5_intersection_B1_image_rank4='+dynamicGaugeIntersection);
console.log('dynamic_plus_B1_image_span_rank='+filtrationSumPivots.size);
console.log('B1_image_basis_in_Q='+JSON.stringify([...bImagePivots.values()]));
console.log('unique_moving_line_representative_in_Q='+uniqueMovingRepresentative);
console.log('stationary_two_plane_quotient_representatives='+JSON.stringify(stationaryComplement));
console.log('compatibility_hessian_kills_U_by_level='+JSON.stringify(hessianKillsU));
console.log('compatibility_hessian_kills_R_by_level='+JSON.stringify(hessianKillsR));
console.log('compatibility_hessian_stationary_cross_nonzero_by_level='+JSON.stringify(stationaryCrossValues.map(x=>x!==0n)));
console.log('compatibility_hessian_stationary_cross_distinct_values='+new Set(stationaryCrossValues.map(x=>x.toString(16))).size);
console.log('presentation_cocycle_evaluation_profile_counts_rank_Urank_inW='+JSON.stringify(Object.fromEntries([...evaluationProfileCounts].sort())));
console.log('nonidentity_evaluations_descending_to_Q='+JSON.stringify(descendingEvaluationElements.filter(p=>p.g!==identityIndex)));
console.log('orthogonal_tangent_coinvariant_dimension='+tangentCoinvariantDimension);
console.log('W_coinvariants_map_to_tangent_coinvariants_rank='+correctionToTangentCoinvariantRank);
console.log('coinvariant_evaluation_profile_counts_rank_Urank_Rrank='+JSON.stringify(Object.fromEntries([...tangentCoinvariantEvaluationCounts].sort())));
console.log('rank2_evaluations_descending_to_stationary_Q_over_R='+JSON.stringify(stationaryCoinvariantEvaluations));
console.log('descending_stationary_map_counts='+JSON.stringify(Object.fromEntries([...descendingStationaryMapCounts].sort())));
console.log('wreath_generator_coinvariant_evaluations='+JSON.stringify(wreathGeneratorCoinvariantEvaluations));
console.log('coinvariant_evaluation_map_span_dimension='+coinvariantEvaluationMapBasis.length);
console.log('evaluation_maps_killing_R_subspace_dimension='+descendingMapSpaceDimension);
console.log('stationary_restrictions_of_maps_killing_R_rank='+descendingStationaryRestrictionRank);
console.log('wreath_evaluation_contamination_profile='+JSON.stringify(wreathEvaluationContamination));
console.log('local_reflection_coupled_U_moving_stationary_images='+JSON.stringify(localReflectionCoupledImages));
console.log('universal_abelianized_evaluation_images_u_e1_e0_e4='+JSON.stringify(residualUniversalImages.map(x=>x.join(''))));
console.log('universal_abelianized_evaluation_rank='+rank(residualUniversalImages));
console.log('universal_abelianized_evaluation_kernel_masks='+JSON.stringify(residualUniversalKernel));
console.log('named_residual_sources_form_H1_basis=true');
console.log('residual_H1_tensor_preimages_masks_u_e1_e0_e4='+JSON.stringify(residualH1TensorPreimages));
console.log('Gaussian_nilpotent_arrow_candidate_pair_masks='+JSON.stringify(residualH1TensorPreimages.E12));
console.log('Gaussian_arrow_candidate_presentation_masks='+JSON.stringify(gaussianArrowCandidatePresentationMasks));
console.log('Gaussian_candidates_in_real_2adic_compatible_direction_plane='+JSON.stringify(gaussianCandidatesInRealCompatibleDirectionPlane));
console.log('residual_three_corner_image_is_upper_triangular_M2_F2_algebra=true');
console.log('upper_triangular_algebra_order='+upperTriangularAlgebra.length);
console.log('peirce_arrow_relations=E11_E12_E22_equals_E12_reverse_products_zero');
console.log('missing_fourth_corner_is_reverse_arrow_E21=true');
console.log('TRO_product_E22_E12transpose_E11_forces_E21=true');
console.log('adjoining_reverse_arrow_generates_full_M2_F2_of_order='+fullMatrixAlgebraKeys.size);
console.log('orthogonal_tangent_module_dimension='+lieNull.basis.length);
console.log('tangent_invariant_dimension='+tangentInvariantDimension);
console.log('coboundary_B1_dimension='+b1Dimension);
console.log('homogeneous_lift_Z1_dimension='+z1Dimension);
console.log('naive_dual_number_scalar_extension='+JSON.stringify(naiveDualNumberExtension));
console.log('lift_quotient_H1_dimension='+h1Dimension);
console.log('fixed_ten_plane_intersection_B1_dimension='+intersectionDimension);
console.log('fixed_ten_plane_plus_B1_dimension='+sumDimension);
console.log('B1_image_in_seven_dimensional_quotient='+coboundaryImageInQuotient);
console.log('quotient_beyond_B1_image_dimension='+quotientBeyondCoboundaries);
console.log('fixed_ten_plane_image_in_H1_dimension='+uImageInH1);
console.log('seven_dimensional_lift_quotient_cohomological_filtration=4_plus_3');
console.log('first_compatible_masks='+JSON.stringify(stationaryMasks));
console.log('highest_verified_modulus='+recursiveModulus);
console.log('the_integral_nonsplitting_obstruction_is_invisible_modulo4_and_may_be_deeper_2adic_or_archimedean');
console.log('cocycle_equation_verified_for_all_72_cubed_triples');
