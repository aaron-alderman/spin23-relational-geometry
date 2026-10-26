#!/usr/bin/env node
import fs from "node:fs";

const args=Object.fromEntries(process.argv.slice(2).map(argument=>{const [name,value="true"]=argument.replace(/^--/u,"").split("=");return [name,value];}));
const dictionaryPath=args.dictionary??"evidence/data/translation-free-e8-local-operator-dictionary-r8-v1.json";
const J=Number(args.coupling??0.05),samples=Number(args.samples??4096);
const widths=(args.widths??"3,4,5,6").split(",").map(Number);
const dictionary=JSON.parse(fs.readFileSync(dictionaryPath,"utf8"));
if(dictionary.schemaVersion!=="translation-free-e8-local-operator-dictionary-v1")throw new Error("unsupported dictionary");
const roots=dictionary.settings.roots,excited=roots-1,C=dictionary.cosineMatrices,A=dictionary.sineProxyMatrices;
const pairDimension=roots*roots,bond=Array.from({length:pairDimension},()=>new Float64Array(pairDimension));
for(let a=0;a<roots;a++)for(let b=0;b<roots;b++)for(let c=0;c<roots;c++)for(let d=0;d<roots;d++)for(let channel=0;channel<8;channel++)bond[a*roots+b][c*roots+d]+=C[channel][a][c]*C[channel][b][d]-A[channel][a][c]*A[channel][b][d];
const vacuumBond=bond[0][0],base=Array.from({length:excited},()=>Array(excited).fill(0)),hop=Array.from({length:excited},()=>Array(excited).fill(0));
for(let a=1;a<roots;a++)for(let c=1;c<roots;c++){
  base[a-1][c-1]=(a===c?dictionary.levels[a].energy-dictionary.levels[0].energy:0)-J*(bond[a*roots][c*roots]+bond[a][c]-(a===c?2*vacuumBond:0));
  hop[a-1][c-1]=bond[c][a*roots];
}
const symmetricEigenvalues=matrix=>{const M=matrix.map(row=>[...row]),n=M.length;for(let step=0;step<200000;step++){let p=0,q=1,maximum=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(Math.abs(M[i][j])>maximum){maximum=Math.abs(M[i][j]);p=i;q=j;}if(maximum<1e-14)break;const angle=.5*Math.atan2(2*M[p][q],M[q][q]-M[p][p]),cos=Math.cos(angle),sin=Math.sin(angle),pp=M[p][p],qq=M[q][q],pq=M[p][q];for(let k=0;k<n;k++)if(k!==p&&k!==q){const kp=M[k][p],kq=M[k][q];M[k][p]=M[p][k]=cos*kp-sin*kq;M[k][q]=M[q][k]=sin*kp+cos*kq;}M[p][p]=cos*cos*pp-2*sin*cos*pq+sin*sin*qq;M[q][q]=sin*sin*pp+2*sin*cos*pq+cos*cos*qq;M[p][q]=M[q][p]=0;}return M.map((row,index)=>row[index]).sort((a,b)=>a-b);};
const bandsAt=k=>{const real=Array.from({length:excited},()=>Array(excited).fill(0)),imag=Array.from({length:excited},()=>Array(excited).fill(0)),cos=Math.cos(k),sin=Math.sin(k);for(let a=0;a<excited;a++)for(let c=0;c<excited;c++){real[a][c]=base[a][c]-J*cos*(hop[a][c]+hop[c][a]);imag[a][c]=-J*sin*(hop[a][c]-hop[c][a]);}const doubled=Array.from({length:2*excited},()=>Array(2*excited).fill(0));for(let a=0;a<excited;a++)for(let c=0;c<excited;c++){doubled[a][c]=real[a][c];doubled[a][c+excited]=-imag[a][c];doubled[a+excited][c]=imag[a][c];doubled[a+excited][c+excited]=real[a][c];}const duplicated=symmetricEigenvalues(doubled);return Array.from({length:excited},(_,i)=>.5*(duplicated[2*i]+duplicated[2*i+1]));};
let continuum={momentum:0,energy:Number.POSITIVE_INFINITY};for(let sample=0;sample<samples;sample++){const momentum=2*Math.PI*sample/samples,energy=bandsAt(momentum)[0];if(energy<continuum.energy)continuum={momentum,energy};}
const discreteWidths=widths.map(width=>{let minimum={momentumIndex:0,momentum:0,energy:Number.POSITIVE_INFINITY};const lowestBand=[];for(let index=0;index<width;index++){const momentum=2*Math.PI*index/width,energy=bandsAt(momentum)[0];lowestBand.push({momentumIndex:index,momentum,energy});if(energy<minimum.energy)minimum={momentumIndex:index,momentum,energy};}return {width,...minimum,lowestBand};});
let hopAsymmetry=0;for(let a=0;a<excited;a++)for(let c=0;c<excited;c++)hopAsymmetry=Math.max(hopAsymmetry,Math.abs(hop[a][c]-hop[c][a]));
const lowestOnly=dictionary.levels[1].energy-dictionary.levels[0].energy-J*(bond[roots][roots]+bond[1][1]-2*vacuumBond)-2*J*bond[1][roots];
console.log(JSON.stringify({schemaVersion:"translation-free-e8-one-particle-band-v1",settings:{dictionary:dictionaryPath,J,samples,widths,localExcitedStates:excited},vacuumBond,maximumHopAsymmetry:hopAsymmetry,lowestLocalStateOnlyAtZero:lowestOnly,continuumMinimum:continuum,bandsAtZero:bandsAt(0),bandsAtPi:bandsAt(Math.PI),discreteWidths,claimBoundary:"Variational one-local-excitation sector above the product vacuum. It diagnoses the carrier and dispersion but is not a lower bound on the interacting many-body gap because the vacuum and excitation dress into higher sectors."},null,2));
