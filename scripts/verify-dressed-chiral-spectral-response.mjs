#!/usr/bin/env node

const addM=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scaleM=(a,A)=>A.map(r=>r.map(x=>a*x));
const outer=v=>v.map(x=>v.map(y=>x*y));
const zero2=()=>[[0,0],[0,0]];
const trace=A=>A[0][0]+A[1][1];
const det=A=>A[0][0]*A[1][1]-A[0][1]*A[1][0];
const psd2=A=>A[0][0]>=-1e-12&&A[1][1]>=-1e-12&&det(A)>=-1e-12;
const poles=[
  {mass:1,residue:[1,0.4]},
  {mass:2,residue:[0.3,1.1]},
  {mass:3,residue:[0.8,-0.2]}
];
const euclidean=q2=>poles.reduce((A,p)=>
  addM(A,scaleM(1/(q2+p.mass**2),outer(p.residue))),zero2());
const spectralImag=(x,y)=>poles.reduce((A,p)=>{
  const s=p.mass**2;
  return addM(A,scaleM(y/((s-x)**2+y**2),outer(p.residue)));
},zero2());
const timeKernel=tau=>poles.reduce((A,p)=>
  addM(A,scaleM(Math.exp(-p.mass*Math.abs(tau))/(2*p.mass),outer(p.residue))),zero2());
const single=outer(poles[0].residue);
const multi=euclidean(1.7);
const upperImag=spectralImag(2.3,0.7);
const times=[0.2,0.9];
const osGram=[];
for(let i=0;i<times.length;i++)for(let a=0;a<2;a++){
  const row=[];
  for(let j=0;j<times.length;j++)for(let b=0;b<2;b++)
    row.push(timeKernel(times[i]+times[j])[a][b]);
  osGram.push(row);
}
const tests=[
  [1,0,0,0],[0,1,0,0],[1,-2,0.5,0.3],[-0.2,0.7,1.1,-1.4]
];
const quadratic=(K,v)=>v.reduce((sum,x,i)=>
  sum+x*v.reduce((s,y,j)=>s+K[i][j]*y,0),0);
const qValues=[0,0.5,2,10];
const report={
  protocol:"dressed-chiral-spectral-response/1",
  spectralRepresentation:"C_E(q^2)=sum_n r_n r_n^T/(q^2+m_n^2); R(z)=sum_n r_n r_n^T/(m_n^2-z)",
  poles,
  residueChecks:poles.map(p=>({
    mass:p.mass,
    matrix:outer(p.residue),
    trace:trace(outer(p.residue)),
    determinant:det(outer(p.residue)),
    positiveSemidefinite:psd2(outer(p.residue))
  })),
  singlePoleConeBoundary:{matrix:single,determinant:det(single)},
  multipoleEuclidean:{q2:1.7,matrix:multi,determinant:det(multi),positiveDefinite:psd2(multi)&&det(multi)>1e-12},
  euclideanPositivity:qValues.map(q2=>({q2,matrix:euclidean(q2),positiveSemidefinite:psd2(euclidean(q2))})),
  upperHalfPlaneHerglotz:{z:{real:2.3,imaginary:0.7},imaginaryPart:upperImag,positiveSemidefinite:psd2(upperImag)},
  reflectionPositivity:{
    positiveTimes:times,
    osKernel:"K_ij=C_E(t_i+t_j)",
    gramMatrix:osGram,
    testedQuadraticForms:tests.map(v=>quadratic(osGram,v)),
    factorization:"K is a sum over n of vectors [r_{n,a} exp(-m_n t_i)/sqrt(2m_n)] outer-product themselves."
  },
  jordanMeaning:[
    "Each positive rank-one residue is a boundary ray of H2(R)_+.",
    "Linearly independent pole residues generate interior positive responses.",
    "The matrix Stieltjes function is Euclidean-positive and its Lorentzian continuation has positive imaginary part in the upper half-plane."
  ],
  limitations:[
    "The certificate treats the CP-even two-face spectral sector after spinor projection.",
    "A full fermionic Osterwalder-Schrader proof must include the Euclidean reflection matrix and spinor test functions.",
    "Generic complex off-diagonal spectral phases belong to H2(C); selecting only their real part is an additional observable/antiunitary choice."
  ]
};
report.passed=report.residueChecks.every(x=>x.positiveSemidefinite&&Math.abs(x.determinant)<1e-12)&&
  report.multipoleEuclidean.positiveDefinite&&
  report.euclideanPositivity.every(x=>x.positiveSemidefinite)&&
  report.upperHalfPlaneHerglotz.positiveSemidefinite&&
  report.reflectionPositivity.testedQuadraticForms.every(x=>x>=-1e-10);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
