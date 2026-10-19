import assert from 'node:assert/strict';

class F{constructor(n,d=1n){const g=(a,b)=>b?g(b,a%b):a;const s=d<0n?-1n:1n,G=g(n<0n?-n:n,d<0n?-d:d);this.n=s*n/G;this.d=s*d/G}add(o){return new F(this.n*o.d+o.n*this.d,this.d*o.d)}mul(o){return new F(this.n*o.n,this.d*o.d)}pow(k){let r=new F(1n);for(let i=0;i<k;i++)r=r.mul(this);return r}eq(o){return this.n===o.n&&this.d===o.d}}
const f=(n,d=1)=>new F(BigInt(n),BigInt(d));
const sum=xs=>xs.reduce((a,b)=>a.add(b),f(0));

assert.equal(2-1-1,0); // SU(3)^3
assert(sum([f(2).mul(f(1,6)),f(-2,3),f(1,3)]).eq(f(0))); // SU3^2 U1
assert(sum([f(3).mul(f(1,6)),f(-1,2)]).eq(f(0))); // SU2^2 U1

const fields=[
  {mult:6,Y:f(1,6)},
  {mult:3,Y:f(-2,3)},
  {mult:3,Y:f(1,3)},
  {mult:2,Y:f(-1,2)},
  {mult:1,Y:f(1)},
  {mult:1,Y:f(0)},
];
const cubic=sum(fields.map(x=>f(x.mult).mul(x.Y.pow(3))));
const gravitational=sum(fields.map(x=>f(x.mult).mul(x.Y)));
assert(cubic.eq(f(0)));
assert(gravitational.eq(f(0)));
assert.equal((3+1)%2,0); // Witten SU(2) parity

console.log('Domain-wall Standard-Model anomaly certificate: PASS');
console.log('SU3_cubic=0; SU3sqU1=0; SU2sqU1=0; U1_cubic=0; gravU1=0; weak_doublets=4_even; anomaly_free_is_necessary_not_sufficient=true');
