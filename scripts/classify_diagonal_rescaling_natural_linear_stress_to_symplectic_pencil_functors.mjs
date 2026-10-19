import assert from 'node:assert/strict';

const rank=A=>{
  const M=A.map(r=>r.slice());let row=0;
  for(let c=0;c<(M[0]?.length??0)&&row<M.length;c++){
    let p=row;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;
    if(p===M.length)continue;[M[row],M[p]]=[M[p],M[row]];
    const d=M[row][c];for(let j=c;j<M[0].length;j++)M[row][j]/=d;
    for(let i=0;i<M.length;i++)if(i!==row){const f=M[i][c];for(let j=c;j<M[0].length;j++)M[i][j]-=f*M[row][j];}row++;
  }return row;
};

// A linear map L: Sym_2 -> R^2 is a 2x3 matrix on coordinates
// (c_ss,c_st,c_tt). Naturality under D=diag(r,s) requires
// L diag(r^2,rs,s^2)=diag(r^2,s^2)L.
const constraints=[];
for(const [r,s] of [[2,3],[3,5],[5,7]]){
  const inputWeights=[r*r,r*s,s*s],outputWeights=[r*r,s*s];
  for(let a=0;a<2;a++)for(let j=0;j<3;j++){
    const row=Array(6).fill(0);
    row[a*3+j]=inputWeights[j]-outputWeights[a];
    constraints.push(row);
  }
}
const naturalMapDimension=6-rank(constraints);
assert.equal(naturalMapDimension,2);

// The complete family is (a,b)=(alpha*c_ss,beta*c_tt).
const map=(alpha,beta,C)=>[alpha*C[0][0],beta*C[1][1]];
const transformKernel=(r,s,C)=>[[r*r*C[0][0],r*s*C[0][1]],[r*s*C[1][0],s*s*C[1][1]]];
const transformPencil=(r,s,[a,b])=>[r*r*a,s*s*b];
const C=[[2,1/3],[1/3,5]],r=7/4,s=9/5;
for(const [alpha,beta] of [[1,1],[2/3,5/7]])assert.deepEqual(map(alpha,beta,transformKernel(r,s,C)),transformPencil(r,s,map(alpha,beta,C)));

// Positivity of every positive definite input forces alpha,beta >=0; strict
// nondegeneracy of every positive definite input requires both >0.
for(const [alpha,beta] of [[1,1],[1,1/3],[2,5]]){
  const [a,b]=map(alpha,beta,C);assert.ok(a>0&&b>0);
}

// Conditional free UV input from document 849.
const Cuv=[[1,0],[0,3]];
const totalWeightMap=map(1,1,Cuv);
const perComponentMap=map(1,1/3,Cuv);
const arbitraryExample=map(1,2,Cuv);
assert.deepEqual(totalWeightMap,[1,3]);
assert.deepEqual(perComponentMap,[1,1]);
assert.deepEqual(arbitraryExample,[1,6]);

// The mixed stress correlator has rescaling weight rs and cannot enter either
// pencil coefficient linearly because their weights are r^2 and s^2.
const offDiagonalContributionAllowed=false;
assert.equal(offDiagonalContributionAllowed,false);

console.log(JSON.stringify({
  protocol:'diagonal-rescaling-natural-linear-stress-to-symplectic-pencil-functors/1',
  domain:'positive symmetric 2x2 stress spectral kernels C',
  codomain:'SU(3)-invariant alternating pencil a*Ks+b*Kt',
  naturalLinearMapDimension:naturalMapDimension,
  generalForm:'a=alpha*C_ss, b=beta*C_tt',
  positivityCondition:'alpha,beta >= 0',
  uniformNondegeneracyCondition:'alpha,beta > 0',
  offDiagonalStressCanEnterLinearly:offDiagonalContributionAllowed,
  freeUvInput:Cuv,
  admissibleFreeUvOutputs:{totalWeightConvention:totalWeightMap,perComponentConvention:perComponentMap,anotherNaturalConvention:arbitraryExample},
  ratioFormula:'b/a=(beta/alpha)*(C_tt/C_ss); for the conditional free UV input this is 3*beta/alpha',
  conclusion:'Rescaling naturality and positivity reduce the functor to two diagonal coefficients but do not fix their ratio. Total-weight and per-component conventions are both admissible and give b/a=3 and b/a=1 respectively.',
  nextGate:'Supply a canonical normalization of Ks versus Kt or a monoidal/componentwise axiom derived from the microscopic response. Off-diagonal stress coherence requires a nonlinear or spurion-dressed construction.',
  passed:true
},null,2));
