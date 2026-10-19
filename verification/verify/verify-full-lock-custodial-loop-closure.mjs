#!/usr/bin/env node

// Exact quartic one-loop scalar mixing for V4=lambda1 S^2+lambda2 Q,
// S=tr(L^T L), Q=tr[(L^T L)^2], with L a real 3x3 matrix.
const n=9,zeroKey=Array(n).fill(0).join(",");
const constant=c=>new Map(c===0?[]:[[zeroKey,c]]);
const variable=i=>new Map([[Array.from({length:n},(_,j)=>i===j?1:0).join(","),1]]);
const add=(a,b,c=1)=>{const o=new Map(a);for(const[k,v]of b){const z=(o.get(k)||0)+c*v;if(z)o.set(k,z);else o.delete(k);}return o;};
const scale=(a,c)=>new Map([...a].map(([k,v])=>[k,c*v]).filter(([,v])=>v));
const mul=(a,b)=>{const o=new Map();for(const[ka,va]of a)for(const[kb,vb]of b){const ea=ka.split(",").map(Number),eb=kb.split(",").map(Number),k=ea.map((x,i)=>x+eb[i]).join(",");o.set(k,(o.get(k)||0)+va*vb);}return o;};
const deriv=(a,i)=>{const o=new Map();for(const[k,v]of a){const e=k.split(",").map(Number);if(!e[i])continue;const z=v*e[i];e[i]--;o.set(e.join(","),(o.get(e.join(","))||0)+z);}return o;};
const evaluate=(a,x)=>[...a].reduce((s,[k,v])=>s+v*k.split(",").map(Number).reduce((p,e,i)=>p*x[i]**e,1),0);
const sum=xs=>xs.reduce((a,b)=>add(a,b),constant(0)),sq=a=>mul(a,a);
const x=Array.from({length:n},(_,i)=>variable(i));
const L=Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>x[3*i+j]));
const S=sum(x.map(sq));
const gram=Array.from({length:3},(_,a)=>Array.from({length:3},(_,b)=>sum([0,1,2].map(i=>mul(L[i][a],L[i][b])))));
const Q=sum(Array.from({length:3},(_,a)=>Array.from({length:3},(_,b)=>mul(gram[a][b],gram[b][a]))).flat());
const S2=sq(S);
const hessian=p=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>deriv(deriv(p,i),j)));
const H1=hessian(S2),H2=hessian(Q);
const traceProduct=(A,B)=>sum(Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>mul(A[i][j],B[j][i]))).flat());
const pieces={lambda1Squared:traceProduct(H1,H1),lambda1Lambda2:scale(traceProduct(H1,H2),2),lambda2Squared:traceProduct(H2,H2)};
const rank=[1,0,0,0,0,0,0,0,0]; // S^2=1,Q=1
const identity=[1,0,0,0,1,0,0,0,1]; // S^2=9,Q=3
const decompose=F=>{const fr=evaluate(F,rank),fi=evaluate(F,identity),A=(fi-3*fr)/6,B=fr-A,res=add(add(F,scale(S2,-A)),scale(Q,-B));return{S2:A,Q:B,residualTerms:res.size};};
const decomposition=Object.fromEntries(Object.entries(pieces).map(([k,v])=>[k,decompose(v)]));
const scalarClosed=Object.values(decomposition).every(z=>z.residualTerms===0);

// Right T3 acts only on the first two external columns. Its norm is B=u^2+v^2.
const sample={u:[1,2,3],v:[4,5,6],a:[7,8,9]};
const norm2=q=>q.reduce((s,z)=>s+z*z,0);
const rightT3Norm=norm2(sample.u)+norm2(sample.v);
const fullNorm=rightT3Norm+norm2(sample.a);
const report={
  protocol:"full-lock-custodial-scalar-loop-closure/1",
  custodialQuartics:{S2:"[tr(L^T L)]^2",Q:"tr[(L^T L)^2]"},
  divergenceDecomposition:decomposition,
  scalarCustodialLocusClosed:scalarClosed,
  gaugedRightSO2Spurion:{rightT3OrbitNorm:rightT3Norm,fullFieldNorm:fullNorm,distinguishesTraceAxis:rightT3Norm!==fullNorm,generatedNativeStructure:"B=u.u+v.v rather than A+B"},
  conclusion:[
    "Custodial scalar self-interactions generate only custodial quartics S^2 and Q at one loop.",
    "Gauging only right T3 distinguishes the charged (u,v) columns from neutral a, so the full theory does not possess the protecting SO(3)_R without additional structure."
  ]
};
report.passed=scalarClosed&&report.gaugedRightSO2Spurion.distinguishesTraceAxis;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;
