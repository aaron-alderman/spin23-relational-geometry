import assert from 'node:assert/strict';

const c = (re, im=0) => ({re,im});
const mul = (a,b) => c(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const scale = (s,a) => c(s*a.re,s*a.im);
const close = (a,b,t=1e-10) => Math.abs(a.re-b.re)<t && Math.abs(a.im-b.im)<t;
const coeff = (phi) => {
  const s=1/Math.sqrt(2);
  return [c(s*Math.cos(-phi/2),s*Math.sin(-phi/2)),c(s*Math.cos(phi/2),s*Math.sin(phi/2))];
};
const eqv = (u,v) => u.every((x,i)=>close(x,v[i]));
const act = (phases,v) => phases.map((z,i)=>mul(z,v[i]));

const samples=[];
for(let n=0;n<12;n++){
  const phi=n*Math.PI/3;
  samples.push({n,phiOverPi:n/3,placement:n%3,sheet:n%2,coherentSign:n<6?1:-1});
}

for(let n=0;n<6;n++){
  const next=(n+1)%6;
  assert.equal(samples[next].placement,(samples[n].placement+1)%3);
  assert.equal(samples[next].sheet,samples[n].sheet^1);
  const reflected=(6-n)%6;
  assert.equal(samples[reflected].placement,(3-samples[n].placement)%3);
  assert.equal(samples[reflected].sheet,samples[n].sheet);
}

// A phase half-turn is the coherent deck lift H=diag(-i,+i).
const H=[c(0,-1),c(0,1)];
const minusOne=[c(-1),c(-1)];
for(const phi of [0,.27,1.14]){
  assert.ok(eqv(coeff(phi+Math.PI),act(H,coeff(phi))));
  assert.ok(eqv(act(H,act(H,coeff(phi))),act(minusOne,coeff(phi))));
  assert.ok(eqv(coeff(phi+2*Math.PI),act(minusOne,coeff(phi))));
  assert.ok(eqv(coeff(phi+4*Math.PI),coeff(phi)));
}

// Complex conjugation reverses the marked cycle.
for(let n=0;n<6;n++){
  const v=coeff(n*Math.PI/3);
  const conjugate=v.map(z=>c(z.re,-z.im));
  assert.ok(eqv(conjugate,coeff(-n*Math.PI/3)));
}

console.log(JSON.stringify({
  protocol:'six-marked-hopf-phases-to-placement-cover-c12/1',
  markedPhases:'phi_n=n*pi/3',
  coverMap:'n -> (n mod 3, n mod 2)',
  step:'n -> n+1 gives placement advance plus sheet flip',
  reflection:'complex conjugation n -> -n gives placement inversion and preserves sheet parity',
  deck:'n -> n+3; coherent lift H=diag(-i,+i)',
  deckSquare:'H^2=-I',
  coherentClosure:'n+6 returns the projector and multiplies the root by -I; n+12 closes the root',
  samples,
  boundary:'This is an exact equivariant map on six marked phases. No nonconstant continuous map from the connected phase circle to a discrete six-vertex set exists; dynamics must choose marked interfaces or a continuous geometric realization of the cover.',
  passed:true
},null,2));
