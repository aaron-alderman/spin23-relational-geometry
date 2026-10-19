import assert from 'node:assert/strict';

const rt3 = Math.sqrt(3), pi = Math.PI;
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const msub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const scaleM = (r, A) => A.map(row => row.map(x => r * x));
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
const I3 = [[1,0,0],[0,1,0],[0,0,1]];
const swap = (i,j) => { const S=I3.map(row=>[...row]); [S[i],S[j]]=[S[j],S[i]]; return S; };
const S01=swap(0,1), S12=swap(1,2), S02=swap(0,2);
const K = S => scaleM(pi/2, msub(I3,S));
const K01=K(S01), K12=K(S12);
assert.ok(maxDefect(mm(mm(S02,K01),S02),K12)<1e-12);
assert.ok(maxDefect(mm(mm(S02,K12),S02),K01)<1e-12);

const forward=mm(S01,S12), reverse=mm(S12,S01);
assert.ok(maxDefect(mm(mm(S02,forward),S02),reverse)<1e-12);
assert.ok(maxDefect(reverse,transpose(forward))<1e-12);
const Omega=scaleM(0.5,msub(forward,reverse));
assert.ok(maxDefect(mm(mm(S02,Omega),S02),scaleM(-1,Omega))<1e-12);

const roots=[[1,rt3],[-2,0],[1,-rt3]], Q=scaleM(1/Math.sqrt(6),roots);
const Dactive=mm(mm(transpose(Q),S02),Q), expectedD=[[1,0],[0,-1]];
assert.ok(maxDefect(Dactive,expectedD)<1e-12);
const Jactive=[[0,-1],[1,0]];
assert.ok(maxDefect(mm(mm(Dactive,Jactive),Dactive),scaleM(-1,Jactive))<1e-12);

console.log(JSON.stringify({
  protocol:'hchi-pulse-order-orientation-audit/1',
  hchiLabelAction:'S02',
  hchiActiveAction:Dactive,
  pulseConjugation:{K01ToK12:maxDefect(mm(mm(S02,K01),S02),K12),K12ToK01:maxDefect(mm(mm(S02,K12),S02),K01)},
  cycleConjugation:{forwardToReverse:maxDefect(mm(mm(S02,forward),S02),reverse),orientationObservableOdd:maxDefect(mm(mm(S02,Omega),S02),scaleM(-1,Omega))},
  verdict:'hchi fixes the reflection axis and exchanges the primitive faces, but it reverses rather than selects cycle orientation. A separate hchi-odd spurion or oriented boundary condition is needed to choose one word.',
  candidate:'the weak/Pfaffian orientation may supply the odd spurion, conditionally; this script does not derive its dynamics',
  passed:true,
},null,2));
