import assert from 'node:assert/strict';

const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));
const X=[[0,1],[1,0]];
const kron=(A,B)=>A.flatMap((ra,i)=>B.map(rb=>ra.flatMap(a=>rb.map(b=>a*b))));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const blockDiag=(A,B)=>[...A.map((r)=>[...r,...Array(B.length).fill(0)]),...B.map(r=>[...Array(A.length).fill(0),...r])];
const antiReal=A=>blockDiag(A,A.map(r=>r.map(x=>-x))); // A K on x+iy
const rank=A=>{const M=A.map(r=>[...r]);let rr=0;for(let c=0;c<M[0].length&&rr<M.length;c++){let p=rr;while(p<M.length&&Math.abs(M[p][c])<1e-10)p++;if(p===M.length)continue;[M[rr],M[p]]=[M[p],M[rr]];const d=M[rr][c];M[rr]=M[rr].map(x=>x/d);for(let i=0;i<M.length;i++)if(i!==rr){const f=M[i][c];M[i]=M[i].map((x,j)=>x-f*M[rr][j]);}rr++;}return rr;};
const fixedIntersectionDimension=(complexDim,As)=>{const I=eye(2*complexDim);const rows=As.flatMap(A=>sub(antiReal(A),I));return 2*complexDim-rank(rows);};

// Tensor order H,S,R for the response carrier.
const IH=eye(2),IS=eye(2),IR=eye(2);
const AS=kron(kron(IH,X),IR),AR=kron(kron(IH,IS),X);
assert.equal(fixedIntersectionDimension(8,[AS]),8);
assert.equal(fixedIntersectionDimension(8,[AR]),8);
assert.equal(fixedIntersectionDimension(8,[AS,AR]),4);
const Adiag=kron(kron(IH,X),X);
assert.equal(fixedIntersectionDimension(8,[Adiag]),8);

// Tensor order H,S,R,N. Three independent real structures still leave R^4.
const IN=eye(2);
const AS4=kron(kron(kron(IH,X),IR),IN);
const AR4=kron(kron(kron(IH,IS),X),IN);
const AN4=kron(kron(kron(IH,IS),IR),X);
assert.equal(fixedIntersectionDimension(16,[AS4,AR4,AN4]),4);

// Gauge test: neutral survivor response versus charged Nambu pair.
const phi=.37,q=2/3;
const cis=t=>({re:Math.cos(t),im:Math.sin(t)}),conj=z=>({re:z.re,im:-z.im});
const chargedNambu=[cis(q*phi),cis(-q*phi)];
const transformedNambu=[conj(chargedNambu[1]),conj(chargedNambu[0])];
assert.ok(transformedNambu.every((z,i)=>Math.hypot(z.re-chargedNambu[i].re,z.im-chargedNambu[i].im)<1e-12));
const sameCharge=[cis(q*phi),cis(q*phi)];
const transformedSame=[conj(sameCharge[1]),conj(sameCharge[0])];
assert.ok(transformedSame.some((z,i)=>Math.hypot(z.re-sameCharge[i].re,z.im-sameCharge[i].im)>1e-6));

console.log(JSON.stringify({
  protocol:'handle-survivor-propagation-nambu-index-ledger/1',
  indices:{H:'two sewn handles',S:'two survivor topologies',R:'two propagation/flux orientations',N:'particle/conjugate Nambu pair'},
  rawResponseSpace:'C^(H2 x S2 x R2), complex dimension 8, real dimension 16',
  survivorRealityFixedDimension:fixedIntersectionDimension(8,[AS]),
  propagationRealityFixedDimension:fixedIntersectionDimension(8,[AR]),
  bothIndependentRealitiesFixedDimension:fixedIntersectionDimension(8,[AS,AR]),
  singleDiagonalRealityFixedDimension:fixedIntersectionDimension(8,[Adiag]),
  fullHSRNRaw:'complex dimension 16, real dimension 32',
  allThreeRealitiesFixedDimension:fixedIntersectionDimension(16,[AS4,AR4,AN4]),
  dimensionConclusion:'Independent survivor, propagation and Nambu real structures need not create physical doubling; their joint fixed space can remain the four-real-dimensional carrier.',
  gaugeConclusion:'sigma_x K is gauge-equivariant on a (+q,-q) Nambu pair but not on a same-charge pair for q != 0. The survivor exchange can serve spatial reciprocity only on a gauge-neutral response index or after gauge-invariant compression.',
  forbiddenIdentifications:['handle exchange with propagation reversal (linear symplectic versus anti-linear anti-symplectic)','survivor topology with charged Nambu index','survivor pair with propagation direction without a diagonal locking kernel'],
  passed:true,
},null,2));
