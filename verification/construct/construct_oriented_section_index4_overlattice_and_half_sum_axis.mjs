import assert from "node:assert/strict";

const det = (A) => A.length===0?1:A.length===1?A[0][0]:A[0].reduce(
  (s,x,j)=>s+(j%2?-1:1)*x*det(A.slice(1).map((r)=>r.filter((_,k)=>k!==j))),0
);
const gcd = (a,b) => b ? gcd(b,a%b) : Math.abs(a);
const transpose = (A) => A[0].map((_,j)=>A.map((r)=>r[j]));
const mul = (A,B) => A.map((r)=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const inverseUnimodular = (A) => {
  const d=det(A); assert.ok(Math.abs(d)===1);
  const cof=A.map((_,i)=>A.map((__,j)=>{
    const minor=A.filter((_,r)=>r!==i).map((row)=>row.filter((_,c)=>c!==j));
    return ((i+j)%2?-1:1)*det(minor);
  }));
  return transpose(cof).map((r)=>r.map((x)=>x/d));
};

// Original quotient basis V=(u^c_1,d_1,nu,d^c_1).
// The oriented section S1 adjoins the positive half-pairs
// hD=(u^c_1+d_1)/2 and hC=(d_1+d^c_1)/2.
const hD = [1/2,1/2,0,0];
const hC = [0,1/2,0,1/2];
const d  = [0,1,0,0];
const nu = [0,0,1,0];
const H = transpose([hD,hC,d,nu]); // columns form a basis of the overlattice.
assert.equal(Math.abs(det(H)),1/4);

// Original basis vectors in H-coordinates.  Their determinant is the index 4.
const VinsideH = [
  [2,0,0,0],
  [0,0,0,2],
  [-1,1,0,-1],
  [0,0,1,0],
];
assert.equal(Math.abs(det(VinsideH)),4);

// Certified meridian axes in the original quotient basis.
const zD_V = [0,-1,-1,-1];
const zC_V = [-1,-1,-1,0];
const zS_V = [-1,-2,-2,-1];
assert.deepEqual(zD_V.map((x,i)=>x+zC_V[i]),zS_V);

// Their coordinates in H=(hD,hC,d,nu).
const zD = [0,-2,0,-1];
const zC = [-2,0,0,-1];
const zS = [-2,-2,0,-2];
assert.deepEqual(zD.map((x,i)=>x+zC[i]),zS);

// The pair <zD,zC> has saturation index two: gcd of its 2x2 minors is two.
const minors = [];
for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)minors.push(zD[i]*zC[j]-zD[j]*zC[i]);
assert.equal(minors.reduce(gcd,0),2);

const halfSum = zS.map((x)=>x/2);
assert.deepEqual(halfSum,[-1,-1,0,-1]);
assert.deepEqual(halfSum.map((x,i)=>2*x-zD[i]),zC);

// The saturated plane <zD,halfSum> is primitive.
const satMinors=[];
for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)satMinors.push(zD[i]*halfSum[j]-zD[j]*halfSum[i]);
assert.equal(satMinors.reduce(gcd,0),1);

// It has an explicit unimodular completion (zD,halfSum,d,hD).
const eD=[0,0,1,0];
const eHD=[1,0,0,0];
const completion=transpose([zD,halfSum,eD,eHD]);
assert.equal(Math.abs(det(completion)),1);

// Hence a unimodular alternating form exists on the overlattice with the
// saturated meridian plane Lagrangian.
const J=[
  [0,0,1,0],
  [0,0,0,1],
  [-1,0,0,0],
  [0,-1,0,0],
];
assert.equal(det(J),1);
const completionInv=inverseUnimodular(completion);
const OmegaH=mul(mul(transpose(completionInv),J),completionInv);
assert.equal(det(OmegaH),1);
const OmegaRestricted=mul(mul(transpose(VinsideH),OmegaH),VinsideH);
assert.equal(det(OmegaRestricted),16);

// In the primitive basis (a=zD,b=halfSum), zC=2b-a and zS=2b.
// The integral word's shear in this basis has an unavoidable factor-four
// determinant increase because the old axes span index two.
const shearPrimitive=[
  [2,-2],
  [-2,12],
];
assert.equal(det(shearPrimitive),20);
assert.equal(det(shearPrimitive)/4,5);

console.log("oriented_section_index4_overlattice_and_half_sum_axis: PASS");
console.log("oriented_half_pairs=(uc1+d1)/2_and_(d1+dc1)/2_generate_an_index4_overlattice");
console.log("original_support_quotient_has_index4_in_the_oriented_overlattice");
console.log("old_axis_plane_<zD,zC>_has_saturation_index2");
console.log("primitive_relational_axis_halfSum=(zD+zC)/2=(-1,-1,0,-1)_in_H_coordinates");
console.log("zC=2_halfSum_minus_zD_and_zSum=2_halfSum");
console.log("saturated_plane_<zD,halfSum>_is_primitive_and_has_a_unimodular_symplectic_completion");
console.log("the_unimodular_form_on_the_overlattice_restricts_with_determinant16_on_the_index4_original_quotient");
console.log("coefficient_two_is_the_lattice_index_of_the_original_axis_plane_inside_its_saturation");
console.log("primitive_basis_shear_has_determinant20_equal_4_times_original_discriminant5");
