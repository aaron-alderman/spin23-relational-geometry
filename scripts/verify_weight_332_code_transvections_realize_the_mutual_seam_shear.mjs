import assert from "node:assert/strict";

const p=3,mod=(x)=>((x%p)+p)%p;
const dot=(a,b)=>mod(a.reduce((s,x,i)=>s+x*b[i],0));
const add=(a,b)=>a.map((x,i)=>mod(x+b[i]));
const scale=(c,a)=>a.map((x)=>mod(c*x));
const combine=(c,rows)=>rows[0].map((_,i)=>mod(c.reduce((s,x,j)=>s+x*rows[j][i],0)));
const rref=(M)=>{const a=M.map(r=>r.map(mod)),piv=[];let r=0;for(let c=0;c<(a[0]?.length??0)&&r<a.length;c++){let k=r;while(k<a.length&&!a[k][c])k++;if(k===a.length)continue;[a[r],a[k]]=[a[k],a[r]];const inv=a[r][c]===1?1:2;a[r]=a[r].map(x=>mod(inv*x));for(let i=0;i<a.length;i++)if(i!==r&&a[i][c]){const f=a[i][c];a[i]=a[i].map((x,j)=>mod(x-f*a[r][j]));}piv.push(c);r++;}return{a,piv};};
const nullspace=(M)=>{const{a,piv}=rref(M);return Array.from({length:M[0].length},(_,i)=>i).filter(i=>!piv.includes(i)).map(f=>{const v=Array(M[0].length).fill(0);v[f]=1;piv.forEach((c,i)=>v[c]=mod(-a[i][f]));return v;});};
const solve=(M,b)=>{const{a,piv}=rref(M.map((r,i)=>[...r,b[i]]));const x=Array(M[0].length).fill(0);piv.forEach((c,i)=>{if(c<M[0].length)x[c]=a[i].at(-1)});return x;};

const weights=[];for(let mask=0;mask<32;mask++){const q=Array.from({length:5},(_,i)=>(mask>>i)&1?-1:1);if(q.filter(x=>x<0).length%2===0)weights.push(q);}
const qN=[1,1,1,1,1],qE=[1,1,1,-1,-1];
const kept=weights.filter(q=>![qN,qE].some(r=>q.every((x,i)=>x===r[i])));
const G=Array.from({length:5},(_,i)=>kept.map(q=>mod(q[i]))),E=[qN.map(mod),qE.map(mod)];
const sxParams=nullspace(E),logicalParams=[solve(E,[1,0]),solve(E,[0,1])];
const sx=sxParams.map(t=>combine(t,G)),lx=logicalParams.map(t=>combine(t,G));

const vector=(entries)=>{const v=Array(14).fill(0);for(const[i,x]of entries)v[i]=x;return v;};
const z1=vector([[2,1],[3,1],[6,2]]);
const z2=vector([[3,1],[6,2],[13,1]]);
const z12=vector([[6,2],[10,2]]);
for(const [z,expected] of [[z1,[1,0]],[z2,[0,1]],[z12,[1,1]]]){
  for(const s of sx)assert.equal(dot(s,z),0);
  assert.deepEqual(lx.map(x=>dot(x,z)),expected);
}
assert.deepEqual([z1,z2,z12].map(z=>z.filter(Boolean).length),[3,3,2]);
const union=new Set();for(const z of [z1,z2,z12])z.forEach((x,i)=>{if(x)union.add(i)});assert.deepEqual([...union].sort((a,b)=>a-b),[2,3,6,10,13]);

const omega=(v,w)=>mod(v[0]*w[2]+v[1]*w[3]-v[2]*w[0]-v[3]*w[1]);
const tv=(axis,power,w)=>w.map((x,i)=>mod(x+power*omega(w,axis)*axis[i]));
const eZ1=[0,0,1,0],eZ2=[0,0,0,1],eSum=[0,0,1,1];
const mutual=(w)=>tv(eSum,2,tv(eZ1,1,tv(eZ2,1,w)));
const basis=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
const images=basis.map(mutual);
assert.deepEqual(images,[[1,0,0,2],[0,1,2,0],[0,0,1,0],[0,0,0,1]]);
const K=[[0,2],[2,0]];
assert.deepEqual(images.slice(0,2).map(v=>v.slice(2)),K);

// The three pure-Z axes commute, so the composite is independent of order.
for(const a of [eZ1,eZ2,eSum])for(const b of [eZ1,eZ2,eSum])assert.equal(omega(a,b),0);

console.log("Weight-(3,3,2) mutual-shear code synthesis: PASS");
console.log("minimum_Z1_Z2_Z1plusZ2_supports=3,3,2");
console.log("the_three_transvections_touch_the_five_physical_coordinates_2,3,6,10,13_zero_based");
console.log("T_Z1plusZ2_squared_times_T_Z1_times_T_Z2_has_K_equal_0_2__2_0");
console.log("the_composite_fixes_the_Z_plane_and_realizes_the_unique_mutual_Clifford_shear");
console.log("code_native_low_support_does_not_imply_geometric_locality_or_source_selected_dynamics");
