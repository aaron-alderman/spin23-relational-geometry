import assert from "node:assert/strict";

const evaluate=(gB,gX,v)=>{
  const f=v*v/4;
  const M=[[f*gB*gB,-f*gB*gX],[-f*gB*gX,f*gX*gX]];
  const det=M[0][0]*M[1][1]-M[0][1]*M[1][0],trace=M[0][0]+M[1][1];
  const massless=[gX,gB],heavy=[gB,-gX];
  const apply=u=>M.map(r=>r[0]*u[0]+r[1]*u[1]);
  const zero=apply(massless),massive=apply(heavy);
  assert(Math.abs(det)<1e-12);assert(zero.every(x=>Math.abs(x)<1e-12));
  assert(massive.every((x,i)=>Math.abs(x-trace*heavy[i])<1e-12));
  return {gB,gX,v,neutralMassMatrix:M,eigenvalues:[0,trace],chargedMassSquared:f*gB*gB,
    heavyToChargedMassSquaredRatio:trace/(f*gB*gB),hyperchargeCoupling:gB*gX/Math.sqrt(gB*gB+gX*gX)};
};

const evaluatePair=(gB,gX,vPlus,vMinus)=>{
  const total=Math.hypot(vPlus,vMinus);
  const spectrum=evaluate(gB,gX,total);
  const realScalarsBefore=8, brokenGenerators=3;
  return {...spectrum,vPlus,vMinus,vTotalSquared:vPlus*vPlus+vMinus*vMinus,
    realScalarsBefore,brokenGenerators,physicalRealScalars:realScalarsBefore-brokenGenerators,
    physicalPattern:"one charged complex scalar plus three neutral real scalars"};
};

console.log(JSON.stringify({
  protocol:"spin23-736d-charge3-gauge-mass/1",
  convention:"D=d-i gB T_B-i gX (X/6) B_X, <R>=(0,v/sqrt(2)), X=+3",
  formula:{
    neutral:"v^2/4 [[gB^2,-gB gX],[-gB gX,gX^2]]",
    massless:"B_Y proportional to gX W_B^3+gB B_X",
    massive:"Z_R proportional to gB W_B^3-gX B_X",
    mWR2:"gB^2 v^2/4",mZR2:"(gB^2+gX^2)v^2/4",gY:"gB gX/sqrt(gB^2+gX^2)"
  },
  checkpoint:evaluate(3,4,2),
  twoDoubletCheckpoint:evaluatePair(3,4,2,5),
  passed:true
},null,2));
