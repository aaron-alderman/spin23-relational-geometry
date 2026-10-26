#!/usr/bin/env node
import assert from "node:assert/strict";

const K = [
  [2,-1,0,0,0,0,0,0],[-1,2,-1,0,0,0,0,0],
  [0,-1,2,-1,0,0,0,-1],[0,0,-1,2,-1,0,0,0],
  [0,0,0,-1,2,-1,0,0],[0,0,0,0,-1,2,-1,0],
  [0,0,0,0,0,-1,2,0],[0,0,-1,0,0,0,0,2],
];
const Kinv = [
  [4,7,10,8,6,4,2,5],[7,14,20,16,12,8,4,10],
  [10,20,30,24,18,12,6,15],[8,16,24,20,15,10,5,12],
  [6,12,18,15,12,8,4,9],[4,8,12,10,8,6,3,6],
  [2,4,6,5,4,3,2,3],[5,10,15,12,9,6,3,8],
];
const sigma3 = n => {
  let sum = 0;
  for (let d=1;d<=n;d+=1) if (n%d===0) sum += d**3;
  return sum;
};
const expectedCount = cutoff => 1+240*Array.from({length:cutoff},(_,i)=>sigma3(i+1))
  .reduce((a,b)=>a+b,0);
const quadratic = vector => vector.reduce((sum,x,i) => sum+x*K[i]
  .reduce((inner,y,j)=>inner+y*vector[j],0),0);

const choleskyUpper = matrix => {
  const n=matrix.length;
  const lower=Array.from({length:n},()=>Array(n).fill(0));
  for(let i=0;i<n;i+=1) for(let j=0;j<=i;j+=1){
    let sum=matrix[i][j];
    for(let k=0;k<j;k+=1) sum-=lower[i][k]*lower[j][k];
    lower[i][j]=i===j?Math.sqrt(sum):sum/lower[j][j];
  }
  return Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>lower[j][i]));
};

const enumerateShell = cutoff => {
  const maximumNorm=2*cutoff;
  const R=choleskyUpper(K);
  const current=Array(8).fill(0);
  const vectors=[];
  const recurse=(row,used)=>{
    if(row<0){
      const q=quadratic(current);
      if(q<=maximumNorm) vectors.push(Int16Array.from(current));
      return;
    }
    let offset=0;
    for(let j=row+1;j<8;j+=1) offset+=R[row][j]*current[j];
    const radius=Math.sqrt(Math.max(0,maximumNorm-used))/R[row][row];
    const center=-offset/R[row][row];
    const low=Math.ceil(center-radius-1e-10);
    const high=Math.floor(center+radius+1e-10);
    for(let value=low;value<=high;value+=1){
      const component=R[row][row]*value+offset;
      const next=used+component*component;
      if(next<=maximumNorm+1e-9){current[row]=value;recurse(row-1,next);}
    }
  };
  recurse(7,0);
  assert.equal(vectors.length,expectedCount(cutoff),`complete E8 shell at cutoff ${cutoff}`);
  return vectors;
};

const key = vector => Array.from(vector).join(",");
const stepsFor = branch => branch==="cartan-kernel"
  ? Array.from({length:8},(_,i)=>Int16Array.from(Array.from({length:8},(_,j)=>Number(i===j))))
  : Array.from({length:8},(_,column)=>Int16Array.from(Kinv.map(row=>row[column])));

const compile = (cutoff,branch,{kineticStrength=1,potentialStrength=1,channelPotentials=null}={}) => {
  const states=enumerateShell(cutoff);
  const indices=new Map(states.map((state,index)=>[key(state),index]));
  const amplitudes=channelPotentials??Array(8).fill(potentialStrength);
  assert.equal(amplitudes.length,8,"eight channel potentials");
  assert.ok(amplitudes.every(value=>Number.isFinite(value)&&value>=0),"nonnegative finite channel potentials");
  const potentialOffset=amplitudes.reduce((sum,value)=>sum+value,0);
  const kineticEnergies=Float64Array.from(states,state=>quadratic(state)/2);
  const diagonal=Float64Array.from(kineticEnergies,energy=>kineticStrength*energy+potentialOffset);
  const steps=stepsFor(branch);
  const neighbors=new Int32Array(states.length*16).fill(-1);
  for(let index=0;index<states.length;index+=1){
    const state=states[index];
    let slot=0;
    for(const step of steps) for(const sign of [-1,1]){
      const target=Array.from(state,(value,j)=>value+sign*step[j]);
      neighbors[index*16+slot]=(indices.get(target.join(","))??-1);
      slot+=1;
    }
  }
  const matvec=(input,output=new Float64Array(input.length))=>{
    for(let i=0;i<input.length;i+=1){
      let value=diagonal[i]*input[i];
      const offset=i*16;
      for(let slot=0;slot<16;slot+=1){
        const neighbor=neighbors[offset+slot];
        if(neighbor>=0) value-=0.5*amplitudes[Math.floor(slot/2)]*input[neighbor];
      }
      output[i]=value;
    }
    return output;
  };
  return {states,kineticEnergies,diagonal,neighbors,amplitudes,matvec};
};

const dot=(a,b)=>{let sum=0;for(let i=0;i<a.length;i+=1)sum+=a[i]*b[i];return sum;};
const norm=a=>Math.sqrt(dot(a,a));
const scale=(a,factor)=>{for(let i=0;i<a.length;i+=1)a[i]*=factor;};
const axpy=(target,factor,source)=>{for(let i=0;i<target.length;i+=1)target[i]+=factor*source[i];};

const symmetricEigensystem = matrix => {
  const A=matrix.map(row=>[...row]);
  const V=Array.from({length:A.length},(_,i)=>Array.from({length:A.length},(_,j)=>Number(i===j)));
  for(let rotation=0;rotation<200000;rotation+=1){
    let p=0,q=1,maximum=0;
    for(let i=0;i<A.length;i+=1)for(let j=i+1;j<A.length;j+=1)if(Math.abs(A[i][j])>maximum){maximum=Math.abs(A[i][j]);p=i;q=j;}
    if(maximum<1e-13)break;
    const angle=.5*Math.atan2(2*A[p][q],A[q][q]-A[p][p]);
    const c=Math.cos(angle),s=Math.sin(angle),app=A[p][p],aqq=A[q][q],apq=A[p][q];
    for(let k=0;k<A.length;k+=1)if(k!==p&&k!==q){const kp=A[k][p],kq=A[k][q];A[k][p]=A[p][k]=c*kp-s*kq;A[k][q]=A[q][k]=s*kp+c*kq;}
    A[p][p]=c*c*app-2*s*c*apq+s*s*aqq;A[q][q]=s*s*app+2*s*c*apq+c*c*aqq;A[p][q]=A[q][p]=0;
    for(let k=0;k<V.length;k+=1){const kp=V[k][p],kq=V[k][q];V[k][p]=c*kp-s*kq;V[k][q]=s*kp+c*kq;}
  }
  return A.map((row,i)=>({value:row[i],vector:V.map(r=>r[i])})).sort((a,b)=>a.value-b.value);
};

const lanczos = (operator, iterations, seed=823239) => {
  const n=operator.states.length;
  let state=seed>>>0;
  const random=()=>{state=(1664525*state+1013904223)>>>0;return state/2**32-.5;};
  let vector=Float64Array.from({length:n},random);
  scale(vector,1/norm(vector));
  let previous=new Float64Array(n);
  let previousBeta=0;
  const basis=[];
  const alphas=[];
  const betas=[];
  let trailingBeta=0;
  for(let iteration=0;iteration<Math.min(iterations,n);iteration+=1){
    basis.push(vector);
    const work=operator.matvec(vector);
    if(iteration>0)axpy(work,-previousBeta,previous);
    const alpha=dot(vector,work);
    axpy(work,-alpha,vector);
    // Two-pass full reorthogonalization makes Ritz residuals auditable.
    for(let pass=0;pass<2;pass+=1)for(const q of basis){const overlap=dot(q,work);if(overlap!==0)axpy(work,-overlap,q);}
    const beta=norm(work);
    alphas.push(alpha);
    trailingBeta=beta;
    if(iteration<Math.min(iterations,n)-1)betas.push(beta);
    if(beta<1e-14)break;
    previous=vector;
    previousBeta=beta;
    vector=work;
    scale(vector,1/beta);
  }
  const T=Array.from({length:alphas.length},(_,i)=>Array.from({length:alphas.length},(_,j)=>
    i===j?alphas[i]:(Math.abs(i-j)===1?betas[Math.min(i,j)]:0)));
  const ritz=symmetricEigensystem(T).slice(0,4).map(item=>({
    energy:item.value,
    residual:Math.abs(trailingBeta*item.vector.at(-1)),
  }));
  return {iterations:alphas.length,ritz};
};

const orthonormalize = (vector,basis,tolerance=1e-11) => {
  for(let pass=0;pass<2;pass+=1)for(const q of basis){
    const overlap=dot(q,vector);
    if(overlap!==0)axpy(vector,-overlap,q);
  }
  const length=norm(vector);
  if(length<tolerance)return null;
  scale(vector,1/length);
  return vector;
};

const combine = (basis,coefficients) => {
  const output=new Float64Array(basis[0].length);
  for(let column=0;column<basis.length;column+=1)axpy(output,coefficients[column],basis[column]);
  return output;
};

const davidson = (operator,{roots=4,maxSubspace=16,cycles=40,tolerance=1e-10,seed=823240}={}) => {
  const n=operator.states.length;
  let state=seed>>>0;
  const random=()=>{state=(1664525*state+1013904223)>>>0;return state/2**32-.5;};
  let basis=[];
  // Seed the Perron-like ground vector explicitly, then span held-out directions.
  for(let root=0;root<roots;root+=1){
    const candidate=root===0?Float64Array.from({length:n},()=>1):Float64Array.from({length:n},random);
    const normalized=orthonormalize(candidate,basis);
    if(normalized)basis.push(normalized);
  }
  let images=basis.map(vector=>operator.matvec(vector));
  let last=[];
  for(let cycle=1;cycle<=cycles;cycle+=1){
    const projected=Array.from({length:basis.length},(_,i)=>Array.from({length:basis.length},(_,j)=>dot(basis[i],images[j])));
    // Remove insignificant asymmetry introduced by floating point accumulation.
    for(let i=0;i<projected.length;i+=1)for(let j=i+1;j<projected.length;j+=1){
      const mean=(projected[i][j]+projected[j][i])/2;
      projected[i][j]=projected[j][i]=mean;
    }
    const eigensystem=symmetricEigensystem(projected).slice(0,roots);
    const ritz=eigensystem.map(item=>{
      const vector=combine(basis,item.vector);
      const image=combine(images,item.vector);
      const residual=Float64Array.from(image,(value,i)=>value-item.value*vector[i]);
      return {energy:item.value,vector,image,residual,residualNorm:norm(residual)};
    });
    last=ritz;
    if(ritz.every(item=>item.residualNorm<tolerance))return {iterations:cycle,subspace:basis.length,ritz:ritz.map(({energy,residualNorm,vector})=>({energy,residual:residualNorm,vector}))};

    const corrections=[];
    for(const item of ritz){
      if(item.residualNorm<tolerance)continue;
      const correction=new Float64Array(n);
      for(let i=0;i<n;i+=1){
        let denominator=operator.diagonal[i]-item.energy;
        if(Math.abs(denominator)<0.2)denominator=denominator<0?-0.2:0.2;
        correction[i]=-item.residual[i]/denominator;
      }
      const normalized=orthonormalize(correction,[...basis,...corrections]);
      if(normalized)corrections.push(normalized);
    }
    if(!corrections.length)break;
    if(basis.length+corrections.length>maxSubspace){
      const restarted=[];
      for(const item of ritz){
        const normalized=orthonormalize(item.vector,restarted);
        if(normalized)restarted.push(normalized);
      }
      for(const correction of corrections){
        if(restarted.length>=maxSubspace)break;
        const normalized=orthonormalize(correction,restarted);
        if(normalized)restarted.push(normalized);
      }
      basis=restarted;
      images=basis.map(vector=>operator.matvec(vector));
    }else{
      basis.push(...corrections);
      images.push(...corrections.map(vector=>operator.matvec(vector)));
    }
  }
  return {iterations:cycles,subspace:basis.length,ritz:last.map(({energy,residualNorm,vector})=>({energy,residual:residualNorm,vector}))};
};

const spectralDiagnostics = (operator,ritz,cutoff) => {
  const boundaryMask=Uint8Array.from(operator.kineticEnergies,value=>Number(Math.abs(value-cutoff)<1e-12));
  const inversion=new Int32Array(operator.states.length);
  const indices=new Map(operator.states.map((state,index)=>[key(state),index]));
  for(let index=0;index<operator.states.length;index+=1){
    inversion[index]=indices.get(Array.from(operator.states[index],value=>-value).join(","));
  }
  const levels=ritz.map(item=>{
    let boundaryProbability=0;
    let parityExpectation=0;
    for(let i=0;i<item.vector.length;i+=1){
      boundaryProbability+=boundaryMask[i]*item.vector[i]**2;
      parityExpectation+=item.vector[i]*item.vector[inversion[i]];
    }
    return {boundaryProbability,parityExpectation};
  });
  const transitionWeights=[];
  const sineTransitionWeights=[];
  const ground=ritz[0].vector;
  for(let excited=1;excited<ritz.length;excited+=1){
    const weights=[];
    const sineWeights=[];
    for(let channel=0;channel<8;channel+=1){
      let amplitude=0;
      let sineAmplitude=0;
      for(let i=0;i<ground.length;i+=1){
        const minus=operator.neighbors[i*16+2*channel];
        const plus=operator.neighbors[i*16+2*channel+1];
        const driven=0.5*((minus>=0?ground[minus]:0)+(plus>=0?ground[plus]:0));
        const sineDriven=0.5*((plus>=0?ground[plus]:0)-(minus>=0?ground[minus]:0));
        amplitude+=ritz[excited].vector[i]*driven;
        sineAmplitude+=ritz[excited].vector[i]*sineDriven;
      }
      weights.push(amplitude**2);
      sineWeights.push(sineAmplitude**2);
    }
    transitionWeights.push(weights);
    sineTransitionWeights.push(sineWeights);
  }
  return {levels,cosineDriveTransitionWeightsFromGround:transitionWeights,
    sineDriveTransitionWeightsFromGround:sineTransitionWeights};
};

const args=Object.fromEntries(process.argv.slice(2).map(argument=>{
  const [name,value="true"]=argument.replace(/^--/u,"").split("=");return [name,value];
}));
const cutoffs=(args.cutoffs??"1,2,3,4").split(",").map(Number);
const branches=(args.branches??"cartan-kernel,inverse-kernel").split(",");
const iterations=Number(args.iterations??64);
const method=args.method??"lanczos";
const maxSubspace=Number(args.maxSubspace??16);
const cycles=Number(args.cycles??40);
const kineticStrength=Number(args.kinetic??1);
const potentialStrength=Number(args.potential??1);
const channelPotentials=args.channelPotentials?.split(",").map(Number)??null;
const records=[];
for(const cutoff of cutoffs)for(const branch of branches){
  const started=performance.now();
  const operator=compile(cutoff,branch,{kineticStrength,potentialStrength,channelPotentials});
  const result=method==="davidson"
    ? davidson(operator,{roots:4,maxSubspace,cycles,tolerance:1e-10,seed:823240+cutoff+(branch==="inverse-kernel"?100:0)})
    : lanczos(operator,iterations,823239+cutoff+(branch==="inverse-kernel"?100:0));
  const diagnostics=method==="davidson"?spectralDiagnostics(operator,result.ritz,cutoff):undefined;
  const levels=result.ritz.map(({energy,residual})=>({energy,residual}));
  records.push({
    cutoffKineticEnergy:cutoff,
    branch,
    basisStates:operator.states.length,
    method,
    iterations:result.iterations,
    retainedSubspace:result.subspace??result.iterations,
    levels,
    gapsFromGround:levels.map(item=>item.energy-levels[0].energy),
    ...(diagnostics?{diagnostics}:{}),
    elapsedSeconds:(performance.now()-started)/1000,
  });
}
console.log(JSON.stringify({
  schemaVersion:"translation-free-e8-joined-rotor-solver-output-v1",
  settings:{cutoffs,branches,method,iterations,maxSubspace,cycles,kineticStrength,potentialStrength,
    channelPotentials:channelPotentials??Array(8).fill(potentialStrength),
    meanPotential:(channelPotentials??Array(8).fill(potentialStrength)).reduce((sum,value)=>sum+value,0)/8,
    ratio:(channelPotentials?.reduce((sum,value)=>sum+value,0)/8??potentialStrength)/kineticStrength},
  records,
},null,2));
