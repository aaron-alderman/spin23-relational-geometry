import assert from 'node:assert/strict';

const z=(re=0,im=0)=>({re,im}),add=(a,b)=>z(a.re+b.re,a.im+b.im),sub=(a,b)=>z(a.re-b.re,a.im-b.im);
const mul=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>z(a.re,-a.im);
const div=(a,b)=>{const d=b.re*b.re+b.im*b.im;return z((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
const scale=(s,a)=>z(s*a.re,s*a.im),abs=a=>Math.hypot(a.re,a.im);
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),z())));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),trans=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j]))),msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>abs(sub(x,B[i][j])))));
const eye=[[z(1),z()],[z(),z(1)]];
const inv2=A=>{const d=sub(mul(A[0][0],A[1][1]),mul(A[0][1],A[1][0]));return [[div(A[1][1],d),scale(-1,div(A[0][1],d))],[scale(-1,div(A[1][0],d)),div(A[0][0],d)]];};
const realMatrix=A=>A.map(r=>r.map(x=>z(x)));
const theta=.37,c=Math.cos(theta),s=Math.sin(theta),U=realMatrix([[c,-s],[s,c]]),Ut=trans(U),D=realMatrix([[1,0],[0,-1]]);
const gamma=[.7,1.9];
const b=(x,g)=>div(sub(x,z(0,g)),add(x,z(0,g)));
const f=(x,g)=>mul(b(x,g),b(x,g));
const diag=(a,b)=>[[a,z()],[z(),b]];
const S=x=>mm(mm(U,diag(f(x,gamma[0]),f(x,gamma[1]))),Ut);
const reverse=A=>mm(mm(D,A),D);

const xr=z(1.3),Sr=S(xr),Icheck=mm(dag(Sr),Sr);
assert.ok(maxerr(Sr,trans(Sr))<1e-12);assert.ok(maxerr(Icheck,eye)<1e-12);
const xi=z(.8,.6),Si=S(xi),defect=msub(eye,mm(dag(Si),Si));
const defectDet=defect[0][0].re*defect[1][1].re-(defect[0][1].re**2+defect[0][1].im**2);
assert.ok(defect[0][0].re>0&&defect[1][1].re>0&&defectDet>0);
const reality=S(z(-xi.re,xi.im)).map(r=>r.map(conj)); // overline S(-bar z), since -bar(x+iy)=-x+iy
assert.ok(maxerr(reality,Si)<1e-12);

const Hcayley=x=>mm(zmat(z(0,1)),mm(madd(eye,S(x)),inv2(msub(eye,S(x)))));
function zmat(k){return [[k,z()],[z(),k]];}
const h=(x,g)=>sub(scale(1/(2*g),x),div(z(g/2),x));
const Hclosed=x=>mm(mm(U,diag(h(x,gamma[0]),h(x,gamma[1]))),Ut);
assert.ok(maxerr(Hcayley(xi),Hclosed(xi))<1e-10);
const Hi=Hclosed(xi),ImH=Hi.map((r,i)=>r.map((x,j)=>scale(.5,div(sub(x,conj(Hi[j][i])),z(0,1)))));
const imDet=ImH[0][0].re*ImH[1][1].re-ImH[0][1].re*ImH[1][0].re;
assert.ok(ImH[0][0].re>0&&ImH[1][1].re>0&&imDet>0);

const R=mm(mm(U,realMatrix([[gamma[0]/2,0],[0,gamma[1]/2]])),Ut);
const residueDet=R[0][0].re*R[1][1].re-R[0][1].re*R[1][0].re;
assert.ok(R[0][0].re>0&&R[1][1].re>0&&residueDet>0);
const Rminus=reverse(R);assert.ok(Math.abs(Rminus[0][1].re+R[0][1].re)<1e-12);

const amp=[Sr[0][0],Sr[1][0]],ampMinus=[reverse(Sr)[0][0],reverse(Sr)[1][0]];
const witness=v=>2*mul(conj(v[0]),v[1]).re;
assert.ok(Math.abs(witness(amp)+witness(ampMinus))<1e-12);

console.log(JSON.stringify({
  protocol:'reciprocal-rational-inner-character-interferometer/1',
  construction:'S(z)=U diag(b_gamma1(z)^2,b_gamma2(z)^2) U^T, b_gamma=(z-i gamma)/(z+i gamma)',
  parameters:{theta,gamma},
  analyticGates:{symmetric:true,unitaryOnRealAxisError:maxerr(Icheck,eye),strictInteriorSchurDefectDeterminant:defectDet,sidebandRealityError:maxerr(reality,Si)},
  orientation:'S_minus=D S_plus D, D=diag(1,-1)',
  cayleyHerglotz:'H=i(I+S)(I-S)^-1=U diag(z/(2gamma_j)-gamma_j/(2z)) U^T',
  cayleyClosedFormError:maxerr(Hcayley(xi),Hclosed(xi)),
  interiorImaginaryPartDeterminant:imDet,
  positivePoleResidueAtZero:R.map(r=>r.map(x=>x.re)),
  reversedResidueAtZero:Rminus.map(r=>r.map(x=>x.re)),
  residueDeterminant:residueDet,
  balancedWitnessAtRealFrequency:{plus:witness(amp),minus:witness(ampMinus)},
  conclusion:'Reciprocity, passivity, rational inner analyticity and sideband reality permit a nonzero orientation-odd even/odd coherence. Its Cayley-Herglotz residue is positive; orientation changes its off-diagonal sign but not positivity or eigenvalues.',
  boundary:'This is a constructive two-character response family. Its rotation angle, pole scale and identification with Furey/checkpoint modes remain free rather than derived.',
  passed:true,
},null,2));
