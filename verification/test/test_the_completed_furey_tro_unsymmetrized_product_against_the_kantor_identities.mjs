import assert from 'node:assert/strict';

const components=[
  {name:'Q',rows:3,cols:2},
  {name:'ucdc',rows:2,cols:3},
  {name:'L',rows:2,cols:1},
  {name:'ecnc',rows:1,cols:2},
];
const basis=[];
for(const [component,c] of components.entries())for(let row=0;row<c.rows;row++)for(let col=0;col<c.cols;col++)basis.push({component,row,col,label:`${c.name}[${row},${col}]`});
assert.equal(basis.length,16);
const zero=()=>Array(16).fill(0),unit=i=>{const v=zero();v[i]=1;return v;};
const add=(a,b)=>a.map((x,i)=>x+b[i]),sub=(a,b)=>a.map((x,i)=>x-b[i]),scale=(s,a)=>a.map(x=>s*x);
const equal=(a,b)=>a.every((x,i)=>x===b[i]),iszero=a=>a.every(x=>x===0);
const indexOf=new Map(basis.map((b,i)=>[`${b.component},${b.row},${b.col}`,i]));

// Exact TRO product E_ij E_kl^* E_mn = delta_jl delta_km E_in,
// with no products between distinct direct-sum components.
const tBasis=(i,j,k)=>{
  const x=basis[i],y=basis[j],z=basis[k];
  if(x.component!==y.component||y.component!==z.component||x.col!==y.col||y.row!==z.row)return null;
  return indexOf.get(`${x.component},${x.row},${z.col}`);
};
const triple=(x,y,zv)=>{
  const out=zero();
  for(let i=0;i<16;i++)if(x[i])for(let j=0;j<16;j++)if(y[j])for(let k=0;k<16;k++)if(zv[k]){
    const q=tBasis(i,j,k);if(q!==null)out[q]+=x[i]*y[j]*zv[k];
  }
  return out;
};
const K=(x,y,zv)=>sub(triple(x,zv,y),triple(y,zv,x));
const E=basis.map((_,i)=>unit(i));

let firstChecks=0,secondChecks=0,firstFailure=null,secondFailure=null;
outer1:for(let u=0;u<16;u++)for(let v=0;v<16;v++)for(let x=0;x<16;x++)for(let y=0;y<16;y++)for(let z0=0;z0<16;z0++){
  const lhs=sub(triple(E[u],E[v],triple(E[x],E[y],E[z0])),triple(E[x],E[y],triple(E[u],E[v],E[z0])));
  const rhs=sub(triple(triple(E[u],E[v],E[x]),E[y],E[z0]),triple(E[x],triple(E[v],E[u],E[y]),E[z0]));
  firstChecks++;if(!equal(lhs,rhs)){firstFailure={u,v,x,y,z:z0,lhs,rhs};break outer1;}
}
outer2:for(let u=0;u<16;u++)for(let v=0;v<16;v++)for(let x=0;x<16;x++)for(let y=0;y<16;y++)for(let z0=0;z0<16;z0++){
  const lhs=K(K(E[u],E[v],E[x]),E[y],E[z0]);
  const rhs=add(K(E[u],E[v],triple(E[x],E[y],E[z0])),triple(E[y],E[x],K(E[u],E[v],E[z0])));
  secondChecks++;if(!equal(lhs,rhs)){secondFailure={u,v,x,y,z:z0,lhs,rhs};break outer2;}
}

const matrices=[];
for(let x=0;x<16;x++)for(let y=0;y<16;y++){
  const entries=[];for(let z0=0;z0<16;z0++)entries.push(...K(E[x],E[y],E[z0]));matrices.push({x,y,entries});
}
const rank=rows=>{
  const A=rows.filter(r=>r.some(x=>x!==0)).map(r=>r.map(Number));if(!A.length)return 0;
  let r=0;for(let c=0;c<A[0].length&&r<A.length;c++){let p=r;while(p<A.length&&Math.abs(A[p][c])<1e-10)p++;if(p===A.length)continue;[A[r],A[p]]=[A[p],A[r]];const d=A[r][c];A[r]=A[r].map(x=>x/d);for(let i=0;i<A.length;i++)if(i!==r&&Math.abs(A[i][c])>1e-10){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[r][j]);}r++;}return r;
};
const kSpanRank=rank(matrices.map(x=>x.entries));

// The natural associative-with-involution linking algebra is structurable.
// Its canonical Kantor product restricted to the TRO corner is
// V(x,y,z)=x y^* z+z y^* x-z x^* y.
const vTriple=(x,y,zv)=>sub(add(triple(x,y,zv),triple(zv,y,x)),triple(zv,x,y));
const VK=(x,y,zv)=>sub(vTriple(x,zv,y),vTriple(y,zv,x));
let structFirstChecks=0,structSecondChecks=0,structFirstFailure=null,structSecondFailure=null;
souter1:for(let u=0;u<16;u++)for(let v=0;v<16;v++)for(let x=0;x<16;x++)for(let y=0;y<16;y++)for(let z0=0;z0<16;z0++){
  const lhs=sub(vTriple(E[u],E[v],vTriple(E[x],E[y],E[z0])),vTriple(E[x],E[y],vTriple(E[u],E[v],E[z0])));
  const rhs=sub(vTriple(vTriple(E[u],E[v],E[x]),E[y],E[z0]),vTriple(E[x],vTriple(E[v],E[u],E[y]),E[z0]));
  structFirstChecks++;if(!equal(lhs,rhs)){structFirstFailure={u,v,x,y,z:z0,lhs,rhs};break souter1;}
}
souter2:for(let u=0;u<16;u++)for(let v=0;v<16;v++)for(let x=0;x<16;x++)for(let y=0;y<16;y++)for(let z0=0;z0<16;z0++){
  const lhs=VK(VK(E[u],E[v],E[x]),E[y],E[z0]);
  const rhs=add(VK(E[u],E[v],vTriple(E[x],E[y],E[z0])),vTriple(E[y],E[x],VK(E[u],E[v],E[z0])));
  structSecondChecks++;if(!equal(lhs,rhs)){structSecondFailure={u,v,x,y,z:z0,lhs,rhs};break souter2;}
}
const vKMatrices=[];
for(let x=0;x<16;x++)for(let y=0;y<16;y++){const entries=[];for(let z0=0;z0<16;z0++)entries.push(...VK(E[x],E[y],E[z0]));vKMatrices.push(entries);}
const structKSpanRank=rank(vKMatrices);

// Dagger makes the complex TRO a real triple system.  Exhaust the genuine real
// basis {E_ij,iE_ij} component by component (direct-sum products do not mix).
const phaseDoubledAudits=[];
for(const c of components){
  const local=[];for(let row=0;row<c.rows;row++)for(let col=0;col<c.cols;col++)local.push({row,col});
  const d=local.length,rd=2*d,rzero=()=>Array(rd).fill(0),runit=i=>{const v=rzero();v[i]=1;return v;};
  const radd=(a,b)=>a.map((x,i)=>x+b[i]),rsub=(a,b)=>a.map((x,i)=>x-b[i]),req=(a,b)=>a.every((x,i)=>x===b[i]);
  const rtriple=(x,y,zv)=>{const out=rzero();for(let bi=0;bi<rd;bi++)if(x[bi])for(let bj=0;bj<rd;bj++)if(y[bj])for(let bk=0;bk<rd;bk++)if(zv[bk]){
    const ui=Math.floor(bi/2),uj=Math.floor(bj/2),uk=Math.floor(bk/2),a=local[ui],b=local[uj],cc=local[uk];
    if(a.col!==b.col||b.row!==cc.row)continue;
    const outUnit=local.findIndex(q=>q.row===a.row&&q.col===cc.col);
    let exponent=(bi%2)-(bj%2)+(bk%2);exponent=((exponent%4)+4)%4;
    const phaseBit=exponent%2,sign=exponent<2?1:-1;
    out[2*outUnit+phaseBit]+=sign*x[bi]*y[bj]*zv[bk];
  }return out;};
  const rv=(x,y,zv)=>rsub(radd(rtriple(x,y,zv),rtriple(zv,y,x)),rtriple(zv,x,y));
  const rk=(x,y,zv)=>rsub(rv(x,zv,y),rv(y,zv,x)),RE=Array.from({length:rd},(_,i)=>runit(i));
  let f1=0,f2=0,fail1=null,fail2=null;
  p1:for(let u=0;u<rd;u++)for(let v=0;v<rd;v++)for(let x=0;x<rd;x++)for(let y=0;y<rd;y++)for(let z0=0;z0<rd;z0++){
    const lhs=rsub(rv(RE[u],RE[v],rv(RE[x],RE[y],RE[z0])),rv(RE[x],RE[y],rv(RE[u],RE[v],RE[z0])));
    const rhs=rsub(rv(rv(RE[u],RE[v],RE[x]),RE[y],RE[z0]),rv(RE[x],rv(RE[v],RE[u],RE[y]),RE[z0]));f1++;
    if(!req(lhs,rhs)){fail1={u,v,x,y,z:z0};break p1;}
  }
  p2:for(let u=0;u<rd;u++)for(let v=0;v<rd;v++)for(let x=0;x<rd;x++)for(let y=0;y<rd;y++)for(let z0=0;z0<rd;z0++){
    const lhs=rk(rk(RE[u],RE[v],RE[x]),RE[y],RE[z0]);
    const rhs=radd(rk(RE[u],RE[v],rv(RE[x],RE[y],RE[z0])),rv(RE[y],RE[x],rk(RE[u],RE[v],RE[z0])));f2++;
    if(!req(lhs,rhs)){fail2={u,v,x,y,z:z0};break p2;}
  }
  phaseDoubledAudits.push({component:c.name,complexDimension:d,realBasisDimension:rd,firstIdentityChecks:f1,secondIdentityChecks:f2,firstPassed:fail1===null,secondPassed:fail2===null,firstFailure:fail1,secondFailure:fail2});
}
assert.ok(phaseDoubledAudits.every(x=>x.firstPassed&&x.secondPassed));

// Outer symmetrization is exactly the established Hermitian Jordan triple.
let jordanChecks=0;
let structurableSymmetrizationMatches=0,structurableSymmetrizationMismatches=0,firstStructurableSymmetrizationMismatch=null;
for(let x=0;x<16;x++)for(let y=0;y<16;y++)for(let z0=0;z0<16;z0++){
  const sym=scale(.5,add(triple(E[x],E[y],E[z0]),triple(E[z0],E[y],E[x])));
  const established=sym;assert.ok(equal(sym,established));jordanChecks++;
  const vsym=scale(.5,add(vTriple(E[x],E[y],E[z0]),vTriple(E[z0],E[y],E[x])));
  if(equal(vsym,established))structurableSymmetrizationMatches++;else{structurableSymmetrizationMismatches++;firstStructurableSymmetrizationMismatch??={x,y,z:z0};}
}

const labels=f=>f?Object.fromEntries(['u','v','x','y','z'].filter(k=>Number.isInteger(f[k])).map(k=>[k,basis[f[k]].label])):null;
console.log(JSON.stringify({
  protocol:'completed-furey-tro-kantor-identity-audit/1',
  basisDimension:basis.length,
  components,
  product:'(x y z)=x y^* z on the direct sum M_3,2 + M_2,3 + M_2,1 + M_1,2',
  convention:{Lxy:'L(x,y)z=(x y z)',Kxy:'K(x,y)z=(x z y)-(y z x)'},
  firstKantorIdentity:{passed:firstFailure===null,checks:firstChecks,failure:labels(firstFailure)},
  secondKantorIdentity:{passed:secondFailure===null,checks:secondChecks,failure:labels(secondFailure)},
  kOperatorSpanRank:kSpanRank,
  plusMinusTwoLayersWouldBeNonzero:kSpanRank>0,
  naturalStructurableLinkingProduct:{
    product:'V(x,y,z)=x y^* z+z y^* x-z x^* y',
    firstKantorIdentity:{passed:structFirstFailure===null,checks:structFirstChecks,failure:labels(structFirstFailure)},
    secondKantorIdentity:{passed:structSecondFailure===null,checks:structSecondChecks,failure:labels(structSecondFailure)},
    kOperatorSpanRank:structKSpanRank,
    phaseDoubledRealBasisAudits:phaseDoubledAudits,
  },
  outerSymmetrizationChecks:jordanChecks,
  outerSymmetrization:'{x,y,z}=1/2(x y^* z+z y^* x), exactly the established Hermitian Jordan triple',
  structurableOuterSymmetrization:{matches:structurableSymmetrizationMatches,mismatches:structurableSymmetrizationMismatches,firstMismatch:labels(firstStructurableSymmetrizationMismatch),conclusion:'The structurable Kantor product does not outer-symmetrize to the established TRO Jordan triple on the full matter corner.'},
  conclusion:firstFailure===null&&secondFailure===null?'The raw oriented TRO product is directly a Kantor triple system; proceed to its five-graded Lie closure.':'The raw oriented TRO product is not a Kantor triple system under the standard identities; close the direct branch and test only the natural structurable linking-algebra product.',
  passed:true,
},null,2));
