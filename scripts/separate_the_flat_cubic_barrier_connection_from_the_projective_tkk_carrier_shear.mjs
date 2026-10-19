import assert from 'node:assert/strict';

const close=(a,b)=>Math.abs(a-b)<1e-10;
const points=[[1,1,1],[2,3,5],[.7,1.9,4.2]];
const gamma=(l,i,j,x)=>(l===i&&i===j)?-1/x[i]:0;
const dGamma=(k,l,i,j,x)=>(l===i&&i===j&&k===i)?1/(x[i]*x[i]):0;
const curvature=(l,k,i,j,x)=>{let value=dGamma(i,l,j,k,x)-dGamma(j,l,i,k,x);for(let m=0;m<3;m++)value+=gamma(m,j,k,x)*gamma(l,i,m,x)-gamma(m,i,k,x)*gamma(l,j,m,x);return value;};
for(const x of points){for(let l=0;l<3;l++)for(let k=0;k<3;k++)for(let i=0;i<3;i++)for(let j=0;j<3;j++)assert.ok(close(curvature(l,k,i,j,x),0));const g=x.map((xi,i)=>x.map((_,j)=>i===j?1/(xi*xi):0));const jac=x.map((xi,i)=>x.map((_,j)=>i===j?xi:0));const pull=jac.map((row,i)=>jac.map((_,j)=>row.reduce((s,a,k)=>s+a*g[k][k]*jac[j][k],0)));for(let i=0;i<3;i++)for(let j=0;j<3;j++)assert.ok(close(pull[i][j],i===j?1:0));}

// Lie derivative of dx^2/x^2 along v(x): 2(x v'(x)-v(x))/x^3.
const lieNumerator=(v,vp,x)=>2*(x*vp(x)-v(x));
const fields={translation:{v:x=>1,vp:x=>0},dilation:{v:x=>x,vp:x=>1},specialConformal:{v:x=>x*x,vp:x=>2*x},dressed:{v:x=>-(x-1)*(x-1),vp:x=>-2*(x-1)}};
for(const x of [0.4,1,2.3]){assert.ok(close(lieNumerator(fields.dilation.v,fields.dilation.vp,x),0));if(x!==1)assert.ok(!close(lieNumerator(fields.dressed.v,fields.dressed.vp,x),0));assert.ok(!close(lieNumerator(fields.translation.v,fields.translation.vp,x),0));assert.ok(!close(lieNumerator(fields.specialConformal.v,fields.specialConformal.vp,x),0));}

const mm=(A,B)=>A.map(row=>B[0].map((_,j)=>row.reduce((s,a,k)=>s+a*B[k][j],0)));
const N=[[1,-1],[1,-1]],I=[[1,0],[0,1]];assert.deepEqual(mm(N,N),[[0,0],[0,0]]);
const flow=s=>[[1+s,-s],[s,1-s]];
for(const s of [-.3,.2,2])assert.deepEqual(flow(s),I.map((row,i)=>row.map((x,j)=>x+s*N[i][j])));
const mobius=(s,x)=>((1+s)*x-s)/(s*x+1-s);
for(const x of [-2,0,.4,1,3]){const h=1e-6,derivative=(mobius(h,x)-mobius(-h,x))/(2*h);assert.ok(Math.abs(derivative+(x-1)*(x-1))<1e-5);}
assert.ok(close(mobius(.37,1),1));

console.log(JSON.stringify({
  protocol:'cubic-barrier-versus-projective-tkk-shear/1',
  barrier:{potential:'-log(x0 x1 x2)',metric:'diag(1/x0^2,1/x1^2,1/x2^2)',logCoordinates:'yi=log xi gives Euclidean identity metric',christoffel:'Gamma^i_ii=-1/xi only',curvature:'zero',holonomy:'trivial on the positive cone'},
  isometries:{translation:false,dilation:true,specialConformal:false,dressedShear:false,criterion:'x v_prime - v = 0'},
  projectiveShear:{matrix:N,squareZero:true,flow:'I+sN',mobius:'x -> ((1+s)x-s)/(s x+1-s)',vectorField:'-(x-1)^2 d/dx',fixedPoint:'double parabolic fixed point x=1'},
  theorem:'The diagonal cubic-barrier Levi-Civita geometry supplies flat logarithmic scale/dilation data but cannot generate the carrier shear. The shear belongs to the projective/TKK conformal prolongation.',
  boundary:'Document 987 subsequently identifies the lossless points through the typed fold Xi=-DK=I. This certificate does not derive or protect the dynamical condition K=-D.',
  passed:true
},null,2));
