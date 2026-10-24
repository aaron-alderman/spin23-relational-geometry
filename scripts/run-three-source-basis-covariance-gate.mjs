import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const outputPath = resolve(import.meta.dirname, "../evidence/data/three-source-basis-covariance-gate-v1.json");
const F = [[9,-3,6],[-3,4,-4],[6,-4,16]];
const M = [[1,0.5,0],[0,1,0],[0,0,1]];
const transpose = A => A[0].map((_,j)=>A.map(row=>row[j]));
const multiply = (A,B) => A.map(row=>B[0].map((_,j)=>row.reduce((s,x,k)=>s+x*B[k][j],0)));
const det = A => A[0][0]*A[1][1]*A[2][2]+2*A[0][1]*A[0][2]*A[1][2]-A[0][0]*A[1][2]**2-A[1][1]*A[0][2]**2-A[2][2]*A[0][1]**2;
const edgeCycleSign = A => Math.sign(A[0][1]*A[0][2]*A[1][2]);
const transformed = multiply(transpose(M),multiply(F,M));
const result = {
  protocol:"three-source-basis-covariance-gate/1", date:"2026-10-25", targets:["OT-047","OT-048"], parent:"AZ-074",
  convention:"c_old=M c_new, so F_new=M^T F_old M",
  certificate:{F,M,transformed,determinants:{old:det(F),new:det(transformed),detM:1,predictedNew:"det(M)^2 det(F)"},cycleSigns:{old:edgeCycleSign(F),new:edgeCycleSign(transformed)}},
  invariants:{underInvertibleCongruence:["positive-semidefinite inertia","rank","sign of determinant"],underDiagonalNodeRephasingOnly:["individual edge-zero pattern","three-edge sign product"]},
  sourceBasisBoundary:{
    fermionPaper:"The fermionic calculation defines c_t=-c_Q+c_u and c_b=-c_Q+c_d after axion-dependent chiral rotations; those rotations also shift anomalous gauge couplings.",
    consequence:"A fermion coefficient and an a W-dual-W coefficient taken from different papers are not joined until their field-redefinition, anomaly-normalization, scale and scheme conventions are mapped into one basis.",
    requiredLedger:["complete operator basis before field redefinition","signed chiral rotation","anomaly shifts including normalization","RG and electroweak threshold map","coefficient covariance","response congruence map"]
  },
  verdict:{closed:"A unit-determinant shear preserves PSD and determinant 288 while changing the edge-cycle sign from +1 to -1; the cycle sign is therefore not a general EFT-basis invariant.",open:"No complete signed dictionary yet joins the fermionic c_t,c_b convention to the weak-gauge coefficient and the corpus (v_u,v_d,a_2) coordinates.",nextCalculation:"Freeze one gauge-complete ALP EFT basis, derive the chiral/anomaly translation matrix, then run the 27-setting response in that basis and report congruence-invariant rank and positivity before edge signs."}
};
if(write) await writeFile(outputPath,`${JSON.stringify(result,null,2)}\n`);
console.log(JSON.stringify({outputPath,...result.certificate},null,2));
