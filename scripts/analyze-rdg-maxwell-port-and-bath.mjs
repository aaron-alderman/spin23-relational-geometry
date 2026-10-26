import fs from "node:fs";
import path from "node:path";
import {
  apply,maxAbs,multiply,subtract,transpose,
} from "./analyze-rdg-maxwell-fixed-complex.mjs";

const ROOT=process.cwd();
const WRITE=process.argv.includes("--write");
const OUTPUT="evidence/data/rdg-maxwell-port-and-bath-v1.json";
const add=(a,b)=>a.map((row,i)=>row.map((value,j)=>value+b[i][j]));
const dot=(a,b)=>a.reduce((sum,value,i)=>sum+value*b[i],0);

const omega0=2,omegaP=1.5,gamma=0.3;
const L=[[omega0**2/omegaP**2,0],[0,1/omegaP**2]];
const K=[[0,1],[-(omega0**2),-gamma]];
const C=[[0,Math.sqrt(gamma)/omegaP]];
const dissipationForm=add(multiply(transpose(K),L),multiply(L,K));
const portForm=multiply(transpose(C),C).map(row=>row.map(value=>-2*value));
const portIdentityResidual=maxAbs(subtract(dissipationForm,portForm));
const sample=[0.7,-1.2];
const energyRate=dot(sample,apply(multiply(L,K),sample));
const output=apply(C,sample);
const portPower=-dot(output,output);

// Exact finite conservative dilation: identical oscillators with kappa=3/2.
// Normal frequencies are 1 and 2, giving complete transfer at pi and recurrence at 2pi.
const kappa=1.5;
const Kbath=[
  [0,1,0,0],
  [-(1+kappa),0,kappa,0],
  [0,0,0,1],
  [kappa,0,-(1+kappa),0],
];
const Lbath=[
  [1+kappa,0,-kappa,0],
  [0,1,0,0],
  [-kappa,0,1+kappa,0],
  [0,0,0,1],
];
const bathSkewResidual=maxAbs(add(multiply(transpose(Kbath),Lbath),multiply(Lbath,Kbath)));
const stateAt=t=>[
  (Math.cos(t)+Math.cos(2*t))/2,
  (-Math.sin(t)-2*Math.sin(2*t))/2,
  (Math.cos(t)-Math.cos(2*t))/2,
  (-Math.sin(t)+2*Math.sin(2*t))/2,
];
const energy=state=>0.5*dot(state,apply(Lbath,state));
const initial=stateAt(0),transfer=stateAt(Math.PI),recur=stateAt(2*Math.PI);
const recurrenceResidual=Math.max(...initial.map((value,i)=>Math.abs(value-recur[i])));

const record={
  schemaVersion:"rdg-maxwell-port-and-bath-v1",
  date:"2026-10-26",
  purpose:"Close homogeneous Lorentz damping as a typed power port and locate the boundary between finite conservative baths and irreversible Markovian loss.",
  dissipativePort:{
    oscillator:"dot(P)=V; dot(V)=-omega0^2 P-gamma V",
    parameters:{omega0,omegaP,gamma},
    energyMetric:L,
    output:"y=sqrt(gamma)/omegaP times V",
    identity:"K^T L+L K=-2 C^T C, hence dot(H)=-y^T y",
    identityResidual:portIdentityResidual,
    sampleState:sample,
    sampleEnergyRate:energyRate,
    samplePortPower:portPower,
    sampleBalanceResidual:Math.abs(energyRate-portPower),
    meaning:"The reduced model does not destroy unrecorded energy: it declares a nonnegative output power channel. The receiving bath state remains outside the model.",
  },
  finiteBathDilation:{
    model:"two identical unit-frequency oscillators coupled by kappa=3/2",
    generator:Kbath,
    energyMetric:Lbath,
    conservativeResidual:bathSkewResidual,
    initialState:initial,
    stateAtPi:transfer,
    stateAtTwoPi:recur,
    energyInitial:energy(initial),
    energyAtPi:energy(transfer),
    energyAtTwoPi:energy(recur),
    recurrenceResidual,
    interpretation:"At t=pi the observed oscillator q,p is exactly zero and energy sits in the bath oscillator; at t=2pi the full initial state returns.",
  },
  irreversibilityBoundary:{
    finitePositiveBath:"A finite autonomous positive-energy conservative dilation has oscillatory/quasiperiodic normal modes. It can mimic loss over a window but generically permits recurrence.",
    exactMarkovianLoss:"Permanent exponential damping requires an infinite/continuous bath, a thermodynamic limit, stochastic resetting, or an explicit coarse-graining/semigroup assumption.",
    detectorRule:"Record both port power and any return channel before treating attenuation as disappearance or fundamental irreversibility.",
  },
  verdict:"Damping can be typed exactly as an energy-output port, while a finite conservative carrier converts apparent loss into reversible transfer and recurrence. The bath/limit assumption is an independent admissibility coordinate, not hidden inside gamma.",
};

if(WRITE){
  fs.mkdirSync(path.dirname(path.join(ROOT,OUTPUT)),{recursive:true});
  fs.writeFileSync(path.join(ROOT,OUTPUT),`${JSON.stringify(record,null,2)}\n`);
}
console.log(JSON.stringify({output:OUTPUT,wrote:WRITE,...record},null,2));

