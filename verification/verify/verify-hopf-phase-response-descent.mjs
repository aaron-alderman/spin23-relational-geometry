#!/usr/bin/env node

const C=(re=0,im=0)=>({re,im});
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj=z=>C(z.re,-z.im);
const expi=x=>C(Math.cos(x),Math.sin(x));
const scale=(a,z)=>C(a*z.re,a*z.im);
const sub=(a,b)=>C(a.re-b.re,a.im-b.im);
const abs=z=>Math.hypot(z.re,z.im);
const outer=v=>v.map(x=>v.map(y=>mul(x,conj(y))));
const maxError=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((z,j)=>abs(sub(z,B[i][j])))));
const kronVec=(a,b)=>a.flatMap(x=>b.map(y=>mul(x,y)));
const spinorN=(theta,phi)=>[
  C(Math.cos(theta/2)),
  scale(Math.sin(theta/2),expi(phi))
];
const spinorS=(theta,phi)=>[
  scale(Math.cos(theta/2),expi(-phi)),
  C(Math.sin(theta/2))
];
const partialTraceSpin=rho=>[
  [C(rho[0][0].re+rho[1][1].re,rho[0][0].im+rho[1][1].im),C(rho[0][2].re+rho[1][3].re,rho[0][2].im+rho[1][3].im)],
  [C(rho[2][0].re+rho[3][1].re,rho[2][0].im+rho[3][1].im),C(rho[2][2].re+rho[3][3].re,rho[2][2].im+rho[3][3].im)]
];

const theta=1.2,phi=2.1,m=1.7,p=2.3,omega=Math.hypot(m,p);
const a=Math.sqrt((omega+p)/(2*omega));
const b=Math.sqrt((omega-p)/(2*omega));
const v=[C(a),C(b)];
const uN=spinorN(theta,phi),uS=spinorS(theta,phi);
const psiN=kronVec(v,uN),psiS=kronVec(v,uS).map(z=>mul(expi(phi),z));
const rhoN=outer(psiN),rhoS=outer(psiS);
const reducedN=partialTraceSpin(rhoN),reducedS=partialTraceSpin(rhoS);
const expected=outer(v);
const report={
  protocol:"hopf-phase-response-descent/1",
  statement:"The helicity eigenline is Hopf-twisted, but a common Berry phase cancels in the density matrix and its chiral H2(R) partial trace.",
  parameters:{theta,phi,momentum:p,mass:m,omega},
  overlap:{formula:"Psi_N=exp(i phi) Psi_S",stateError:Math.max(...psiN.map((z,i)=>abs(sub(z,psiS[i]))))},
  density:{patchError:maxError(rhoN,rhoS),meaning:"The full rank-one projector descends globally even though no global eigenvector does."},
  chiralResponse:{
    north:reducedN,
    south:reducedS,
    expected,
    patchError:maxError(reducedN,reducedS),
    factorizationError:maxError(reducedN,expected),
    imaginaryPartMaximum:Math.max(...reducedN.flat().map(z=>Math.abs(z.im))),
    meaning:"The reduced two-face response is the globally real matrix vv^T in H2(R); the Hopf phase acts in the traced spin factor."
  },
  correction:"c1=1 obstructs a global helicity eigenvector, not a global helicity projector or the common-phase-neutral chiral response. Berry twisting reaches the Jordan carrier only if its two faces transform with different patch phases or retain phase-sensitive amplitudes."
};
report.passed=report.overlap.stateError<1e-12&&report.density.patchError<1e-12&&
  report.chiralResponse.patchError<1e-12&&report.chiralResponse.factorizationError<1e-12&&
  report.chiralResponse.imaginaryPartMaximum<1e-12;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
