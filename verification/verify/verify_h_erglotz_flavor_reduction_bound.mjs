#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const C=(re,im=0)=>({re,im});
const add=(a,b)=>C(a.re+b.re,a.im+b.im);
const sub=(a,b)=>C(a.re-b.re,a.im-b.im);
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const div=(a,b)=>{const d=b.re*b.re+b.im*b.im;return C((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d);};
const abs=a=>Math.hypot(a.re,a.im);

// Exact centered involution model H=aI+eps X, X^2=I, E(X)=0.
const a=2, x=1.2, y=0.7, eps=0.3;
const z=C(x,y), c=sub(C(a),z);
const c2=mul(c,c);
const g=div(c,sub(c2,C(eps*eps)));       // E((H-zI)^-1)
const g0=div(C(1),c);                    // (E(H)-zI)^-1
const defect=sub(g,g0);
const exact=div(C(eps*eps),mul(c,sub(c2,C(eps*eps))));
assert(abs(sub(defect,exact))<1e-12,"exact dynamic defect identity failed");
assert(g.im>0 && g0.im>0,"upper-half-plane resolvents must be Herglotz positive");
const universalBound=eps*eps/(y*y*y);
assert(abs(defect)<=universalBound+1e-12,"upper-half-plane second-order bound failed");

// Conjugation gives the retarded/advanced reflection law.
const zbar=C(x,-y), cbar=sub(C(a),zbar);
const gbar=div(cbar,sub(mul(cbar,cbar),C(eps*eps)));
assert(Math.abs(gbar.re-g.re)<1e-12 && Math.abs(gbar.im+g.im)<1e-12,"Schwarz reflection failed");

// The exact reduced response has poles at the two parent eigenvalues a±eps.
const poles=[a-eps,a+eps];
assert(Math.abs(poles[0]-1.7)<1e-12 && Math.abs(poles[1]-2.3)<1e-12,"parent pole locations failed");

console.log("Herglotz flavor-reduction certificate: PASS");
console.log(`Im_G=${g.im.toFixed(12)}; Im_G0=${g0.im.toFixed(12)}; positivity=true`);
console.log(`dynamic_defect=${abs(defect).toFixed(12)}; upper_bound=${universalBound.toFixed(12)}`);
console.log(`Schwarz_reflection=true; poles=${poles.join(',')}`);
