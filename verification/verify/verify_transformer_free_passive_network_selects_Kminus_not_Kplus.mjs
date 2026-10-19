import assert from "node:assert/strict";

const mod=(x,p=3)=>((x%p)+p)%p;
const response=(g1,g2,g12)=>[[g1+g12,-g12],[-g12,g2+g12]];
const det=(K)=>K[0][0]*K[1][1]-K[0][1]*K[1][0];
const Kminus=[[3,-1],[-1,3]],Kplus=[[3,2],[2,3]],Kmut=[[0,2],[2,0]];
assert.deepEqual(response(2,2,1),Kminus);
assert.deepEqual(Kminus.map(r=>r.map(x=>mod(x))),Kmut);
assert(det(Kminus)>0&&Kminus[0][0]>0);

// Ordinary grounded resistor/spring networks have nonpositive off diagonal.
for(let g1=0;g1<=6;g1++)for(let g2=0;g2<=6;g2++)for(let g12=0;g12<=6;g12++)assert(response(g1,g2,g12)[0][1]<=0);
assert(Kplus[0][1]>0);

// Exhaust all nonnegative integer three-edge networks reducing to Kmut.
const networks=[];
for(let g1=0;g1<=12;g1++)for(let g2=0;g2<=12;g2++)for(let g12=0;g12<=12;g12++){
  const K=response(g1,g2,g12);
  if(K.every((r,i)=>r.every((x,j)=>mod(x)===Kmut[i][j])))networks.push({g1,g2,g12,K,total:g1+g2+g12});
}
const minTotal=Math.min(...networks.map(n=>n.total));
const minimal=networks.filter(n=>n.total===minTotal);
assert.equal(minTotal,5);
assert.deepEqual(minimal,[{g1:2,g2:2,g12:1,K:Kminus,total:5}]);

// Reversing the second port orientation converts an ordinary network with
// conductances (1,1,2) into Kplus in the oriented port coordinates.
const D=[[1,0],[0,-1]];
const transpose=(A)=>A[0].map((_,j)=>A.map(r=>r[j]));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
assert.deepEqual(mul(mul(D,response(1,1,2)),transpose(D)),Kplus);

// The two positive lifts differ by a level-three mutual shear.
assert.deepEqual(Kplus.map((r,i)=>r.map((x,j)=>x-Kminus[i][j])),[[0,3],[3,0]]);

console.log("Transformer-free passive network lift audit: PASS");
console.log("Kminus_is_the_unique_minimum_integer_grounded_network_with_g1_g2_g12_equal_2_2_1");
console.log("Kplus_has_positive_off_diagonal_and_requires_a_signed_common_mode_coupler_or_port_reversal");
console.log("reversing_one_port_turns_the_1_1_2_passive_network_response_into_Kplus");
console.log("Kplus_minus_Kminus_is_a_level_3_mutual_shear_invisible_modulo_three");
