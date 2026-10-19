#!/usr/bin/env node

const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(r=>r.map(x=>a*x));
const mul=(A,B)=>A.map((r,i)=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const sub=(A,B)=>add(A,scale(-1,B));
const jordan=(A,B)=>scale(0.5,add(mul(A,B),mul(B,A)));
const flatSym=A=>[A[0][0],A[1][1],Math.SQRT2*A[0][1]];
const det=A=>A[0][0]*A[1][1]-A[0][1]*A[1][0];
const trace=A=>A[0][0]+A[1][1];
const rank=matrix=>{
  const a=matrix.map(r=>r.slice());
  let row=0;
  for(let col=0;col<(a[0]?.length||0)&&row<a.length;col++){
    let p=row;
    while(p<a.length&&Math.abs(a[p][col])<1e-10)p++;
    if(p===a.length)continue;
    [a[row],a[p]]=[a[p],a[row]];
    const q=a[row][col];a[row]=a[row].map(x=>x/q);
    for(let i=0;i<a.length;i++)if(i!==row){
      const f=a[i][col];a[i]=a[i].map((x,j)=>x-f*a[row][j]);
    }
    row++;
  }
  return row;
};
const I=[[1,0],[0,1]],Z=[[1,0],[0,-1]],X=[[0,1],[1,0]];
const effects=[
  scale(0.25,add(I,Z)),
  scale(0.25,sub(I,Z)),
  scale(0.25,add(I,X)),
  scale(0.25,sub(I,X))
];
const sum=effects.reduce(add,[[0,0],[0,0]]);
const psd=effects.map(E=>trace(E)>=-1e-12&&det(E)>=-1e-12);
const spanRank=rank(effects.map(flatSym));
const kernel=[1,1,-1,-1];
const image=x=>effects.reduce((A,E,i)=>add(A,scale(x[i],E)),[[0,0],[0,0]]);
const kernelImage=image(kernel);
const crossJordan=jordan(effects[0],effects[2]);
const crossJordanNonzero=flatSym(crossJordan).some(x=>Math.abs(x)>1e-12);
const commutator=sub(mul(effects[0],effects[2]),mul(effects[2],effects[0]));
const noncommuting=commutator.flat().some(x=>Math.abs(x)>1e-12);
const omittedRankOneBloch={x:1/Math.sqrt(2),z:1/Math.sqrt(2)};
const omittedByDiamond=Math.abs(omittedRankOneBloch.x)+
  Math.abs(omittedRankOneBloch.z)>1+1e-12;
const report={
  protocol:"linking-center-h2-positive-compression/1",
  domain:"Z(L(M))_sa = R^4 for L(M)=M5(C)+M5(C)+M3(C)+M2(C)",
  codomain:"H2(R)=span{I,Z,X}",
  effects:effects.map((E,i)=>({centralFactor:i+1,matrix:E,trace:trace(E),determinant:det(E),positiveSemidefinite:psd[i]})),
  unitalCheck:sum,
  spanRank,
  surjectiveOntoH2R:spanRank===3,
  linearKernel:{generator:kernel,image:kernelImage},
  positiveConeFaithfulReason:"Every nonzero x in R_+^4 has tr(Phi(x))=(1/2) sum_i x_i>0, so no nonzero positive element lies in the kernel.",
  coneSurjectivityAudit:{
    positiveImageCrossSection:"convex hull of Bloch vectors (+Z,-Z,+X,-X), i.e. |x|+|z|<=1",
    omittedPositiveRankOneBloch:omittedRankOneBloch,
    omittedByDiamond,
    generalObstruction:"A linear image of the polyhedral cone R_+^4 is polyhedral, whereas H2(R)_+ is the nonpolyhedral Lorentz cone with continuously many extreme rays.",
    coneSurjective:false
  },
  multiplicativityAudit:{
    domainOrthogonalIdempotentsHaveZeroJordanProduct:true,
    imageCrossJordanProduct:crossJordan,
    imageCrossJordanProductNonzero:crossJordanNonzero,
    imageEffectsNoncommuting:noncommuting,
    conclusion:"Phi is positive and unital but is neither a Jordan homomorphism nor an associative homomorphism."
  },
  interpretation:"A positive map from the four-center linking algebra can span H2(R) linearly, but it cannot map the positive orthant onto the full Lorentz cone. Its nonmultiplicativity creates an off-diagonal response coordinate only on a proper polyhedral subcone.",
  nonuniqueness:"Rotating the X-Z Bloch disk, changing effect weights, or choosing other positive spanning effects gives continuous families. Positivity and surjectivity do not select a canonical compression."
};
report.passed=psd.every(Boolean)&&
  JSON.stringify(sum)===JSON.stringify(I)&&spanRank===3&&
  kernelImage.flat().every(x=>Math.abs(x)<1e-12)&&
  crossJordanNonzero&&noncommuting&&omittedByDiamond;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
