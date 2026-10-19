import assert from "node:assert/strict";

const X = [[2,-1],[-1,2]];
assert.equal(X[0][0], 2);
assert.equal(X[0][0] * X[1][1] - X[0][1] * X[1][0], 3);
// Sylvester: 2>0 and det=3>0; eigenvalues are 1 and 3.
assert.deepEqual([
  X[0][0] + X[0][1],
  X[0][0] - X[0][1],
], [1,3]);

// Scalar interval parameters: m=sqrt(3), u=mL=arcosh(2).
// Then cosh(u)=2, sinh(u)=sqrt(3), and m/sinh(u)=1.
const m2 = 3, coshU = 2, sinhSquaredU = coshU ** 2 - 1;
assert.equal(sinhSquaredU, m2);

const I2 = [[1,0],[0,1]], Z2 = [[0,0],[0,0]];
const block = (a,b,c,d) => [
  [...a[0],...b[0]], [...a[1],...b[1]],
  [...c[0],...d[0]], [...c[1],...d[1]],
];
const S = block(I2,Z2,X,I2);
const J = block(Z2,I2,[[-1,0],[0,-1]],Z2);
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const mul = (a,b,modulus = null) => a.map((row) => b[0].map((_,j) => {
  const value = row.reduce((sum,x,k) => sum + x*b[k][j],0);
  return modulus === null ? value : ((value % modulus) + modulus) % modulus;
}));
const normalize = (a,p) => a.map((row) => row.map((x) => ((x%p)+p)%p));
const equal = (a,b) => a.every((row,i) => row.every((x,j) => x===b[i][j]));
assert(equal(mul(mul(transpose(S),J),S),J));

for (const p of [2,3,5,7,11]) {
  const Sp = normalize(S,p), Jp = normalize(J,p);
  assert(equal(mul(mul(transpose(Sp),Jp,p),Sp,p),Jp));
  assert.notEqual(Sp[2][1],0); // the mutual response coefficient -1 survives every prime.
}

const shear = (K,p) => normalize(block(I2,Z2,K,I2),p);
const X3 = normalize(X,3);
const local3 = [[1,0],[0,1]]; // equals -2 I mod 3 and is an allowed diagonal logical shear.
const pureCrossCoefficientTwo = mul(shear(X3,3),shear(local3,3),3);
const expectedTwo = shear([[0,2],[2,0]],3);
assert(equal(pureCrossCoefficientTwo,expectedTwo));
const pureCrossCoefficientOne = mul(pureCrossCoefficientTwo,pureCrossCoefficientTwo,3);
const expectedOne = shear([[0,1],[1,0]],3);
assert(equal(pureCrossCoefficientOne,expectedOne));

console.log("Integral positive scalar response to cross-port shear: PASS");
console.log("X=[[2,-1],[-1,2]] eigenvalues=1,3 determinant=3");
console.log("scalar_interval_parameters=m_sqrt3_and_mL_arcosh2");
console.log("integral_shear=S_X_in_Sp4_Z");
console.log("mutual_coefficient_survives_reduction_mod_every_prime");
console.log("at_p3_compose_allowed_diagonal_shear_then_square_to_obtain_exact_K_cross");
console.log("physical_identification_of_code_ports_with_scalar_boundaries=still_open");
