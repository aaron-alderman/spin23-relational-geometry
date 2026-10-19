import assert from 'node:assert/strict';

const rank=M=>{const A=M.map(r=>[...r]);let row=0;for(let c=0;c<A[0].length&&row<A.length;c++){let p=row;for(let i=row+1;i<A.length;i++)if(Math.abs(A[i][c])>Math.abs(A[p][c]))p=i;if(Math.abs(A[p][c])<1e-10)continue;[A[row],A[p]]=[A[p],A[row]];const q=A[row][c];A[row]=A[row].map(x=>x/q);for(let i=0;i<A.length;i++)if(i!==row){const f=A[i][c];A[i]=A[i].map((x,j)=>x-f*A[row][j])}row++}return row};
const cross=Y=>Array.from({length:Y.length-1},(_,i)=>Array.from({length:Y[0].length-1},(_,j)=>Math.log(Y[i+1][j+1])-Math.log(Y[i+1][0])-Math.log(Y[0][j+1])+Math.log(Y[0][0])));
const dot=(x,y)=>x.reduce((s,v,i)=>s+v*y[i],0),dist2=(x,y)=>x.reduce((s,v,i)=>s+(v-y[i])**2,0);
const equal=(A,B,s)=>A.map(a=>B.map(b=>Math.exp(-dist2(a,b)/(4*s*s))));
const A1=[[-1.4],[-.2],[.9],[1.8]],B1=[[-1.1],[.4],[1.3],[2.2]],O1=equal(A1,B1,.8);
assert.equal(rank(cross(O1)),1);
const A2=[[-1.2,.2],[-.1,1.1],[1.0,-.5],[1.7,.9]],B2=[[-.9,-.7],[.3,.8],[1.2,.2],[2.0,-1.0]],O2=equal(A2,B2,.8);
assert.equal(rank(cross(O2)),2);
const r=[.3,1.1,2.4,.8],c=[1.7,.6,1.2,2.2],seeded=O2.map((row,i)=>row.map((x,j)=>r[i]*c[j]*x));
const C2=cross(O2),Cs=cross(seeded);assert(Math.max(...C2.flatMap((row,i)=>row.map((x,j)=>Math.abs(x-Cs[i][j]))))<1e-12);
const sw=[.55,.8,1.05,1.3],tw=[.62,.93,1.17,1.41];
const unequal=A1.map((a,i)=>B1.map((b,j)=>Math.sqrt(2*sw[i]*tw[j]/(sw[i]**2+tw[j]**2))*Math.exp(-dist2(a,b)/(2*(sw[i]**2+tw[j]**2)))));
assert.equal(rank(cross(unequal)),3);
for(let i=0;i<C2.length;i++)for(let j=0;j<C2.length;j++){const expected=dot(A2[i+1].map((x,k)=>x-A2[0][k]),B2[j+1].map((x,k)=>x-B2[0][k]))/(2*.8**2);assert(Math.abs(C2[i][j]-expected)<1e-11)}

console.log('Localization rank/dimension/width certificate: PASS');
console.log('rank_d1=1; rank_d2=2; row_column_seeds_cancel=true; unequal_generation_widths_can_give_full_rank=true');
