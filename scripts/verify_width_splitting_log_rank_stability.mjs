import assert from 'node:assert/strict';

const sigma=.85,d=1,A=[-1.3,-.2,.8,1.9],B=[-1.0,.35,1.25,2.15],ea=[-.7,.2,.8,-.3],eb=[.5,-.9,.35,.75];
const logO=(x,y,s,t)=>.5*d*Math.log(2*s*t/(s*s+t*t))-(x-y)**2/(2*(s*s+t*t));
const matrix=eps=>A.map((x,i)=>B.map((y,j)=>logO(x,y,sigma*(1+eps*ea[i]),sigma*(1+eps*eb[j]))));
const cross=L=>Array.from({length:L.length-1},(_,i)=>Array.from({length:L[0].length-1},(_,j)=>L[i+1][j+1]-L[i+1][0]-L[0][j+1]+L[0][0]));
const C0=cross(matrix(0)),eps=.03,Ce=cross(matrix(eps)),err=Math.max(...Ce.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-C0[i][j]))));
const R=Math.max(...A.flatMap(x=>B.map(y=>Math.abs(x-y)))),L=.5*d*(1/(1-eps)+(1+eps)/(1-eps)**2)+R*R*(1+eps)/(4*sigma*sigma*(1-eps)**4);
assert(err<=8*L*eps+1e-12);
const firstOrder=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>((A[i]-B[j])**2/(4*sigma*sigma))*eps*(ea[i]+eb[j])));
const predicted=cross(matrix(0).map((r,i)=>r.map((x,j)=>x+firstOrder[i][j]))),rem=Math.max(...Ce.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-predicted[i][j]))));
const eps2=eps/2,Ceh=cross(matrix(eps2)),foh=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>((A[i]-B[j])**2/(4*sigma*sigma))*eps2*(ea[i]+eb[j]))),predh=cross(matrix(0).map((r,i)=>r.map((x,j)=>x+foh[i][j]))),remh=Math.max(...Ceh.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-predh[i][j]))));
assert(remh<.3*rem);
const minor=(M,i,j,k,l)=>M[i][k]*M[j][l]-M[i][l]*M[j][k];
assert(Math.abs(minor(C0,0,1,0,1))<1e-12&&Math.abs(minor(Ce,0,1,0,1))>1e-7);

console.log('Width-splitting logarithmic-rank stability certificate: PASS');
console.log('exact_entry_bound=true; first_order_formula=true; remainder_quadratic=true; forbidden_minors_turn_on_continuously=true');
