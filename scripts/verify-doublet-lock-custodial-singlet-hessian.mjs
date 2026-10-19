#!/usr/bin/env node

const v=3,t=2,kappa=3,lambdaH=20;
const la=5,lab=4,lb=3.5,cw=0.5,ck=1,dw=0.1,dwk=0.2,dk=0.3;
const ma2=(kappa*t*t+4*(la+lab)*t**3+v*v*(cw+(2*dw+dwk)*t))/(2*t);
const mb2=(2*kappa*t*t+4*lab*t**3+16*lb*t**3+v*v*(ck+(2*dk+dwk)*t))/(4*t);
const F=cw*t+ck*t+dw*t*t+dk*t*t+dwk*t*t;
const mh2=lambdaH*v*v+2*F;
// Coordinate order (h, delta k, delta w).
const Hvv=-mh2+3*lambdaH*v*v+2*F;
const Hvk=2*v*(ck+2*dk*t+dwk*t);
const Hvw=2*v*(cw+2*dw*t+dwk*t);
const Hkk=-4*mb2+2*kappa*t+4*lab*t*t+48*lb*t*t+2*v*v*dk;
const Hkw=2*kappa*t+8*lab*t*t+v*v*dwk;
const Hww=-2*ma2+12*la*t*t+4*lab*t*t+2*v*v*dw;
const H=[[Hvv,Hvk,Hvw],[Hvk,Hkk,Hkw],[Hvw,Hkw,Hww]];
const rt=Math.sqrt;
// Columns: h, bitriplet singlet s, neutral fiveplet f.
const T=[[1,0,0],[0,1/rt(3),1/rt(6)],[0,1/rt(3),-2/rt(6)]];
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const R=mul(tr(T),mul(H,T));
const a=R[0][0],b=R[0][1],d=R[1][1],disc=Math.sqrt((a-d)**2+4*b*b);
const singletEigenvalues=[(a+d-disc)/2,(a+d+disc)/2];
const report={
  protocol:"doublet-full-lock-custodial-singlet-hessian/1",
  reducedParameters:{v,t,kappa,lambdaH,la,lab,lb,cw,ck,dw,dk,dwk,ma2,mb2,mh2},
  hessianIn_h_k_w:H,
  orthonormalCoordinates:{h:"doublet radial",s:"(2 delta k+delta w)/sqrt(3)",f:"sqrt(2/3)(delta k-delta w)"},
  rotatedHessian_h_s_f:R,
  custodialBlockChecks:{hFivepletMixing:R[0][2],singletFivepletMixing:R[1][2]},
  singletMassEigenvalues:singletEigenvalues,
  fivepletNeutralMassSquared:R[2][2],
  conclusion:"At the custodial coefficient relations, the neutral fiveplet direction decouples exactly. The two custodial singlets mix through a real 2x2 Hessian fixed by the doublet-lock portals."
};
report.passed=Math.abs(R[0][2])<1e-10&&Math.abs(R[1][2])<1e-10&&singletEigenvalues.every(x=>x>0)&&R[2][2]>0;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
