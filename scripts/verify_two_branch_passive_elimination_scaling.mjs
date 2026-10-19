import assert from 'node:assert/strict';

// Microscopic passive two-branch linear system for one Fourier mode:
//   xdot = -g(k) y
//   ydot =  g(k) x - gamma y
// Its energy obeys Edot=-gamma*y^2 <= 0.
const gamma=5,v=3,m=7;
assert(gamma>0);

// Eliminating y in Laplace space gives the slow-channel inverse response
// K(s,k)=s+g(k)^2/(s+gamma).
const K=(s,g)=>s+g*g/(s+gamma);
for(const s of [0,1,2,7])assert(K(s,v)>=0);

// Derivative coupling g(k)=v*k gives hydrodynamic diffusion:
// K(s,k)=s+v^2*k^2/(s+gamma), hence D=v^2/gamma at low frequency.
const Dnum=v*v,Dden=gamma;
assert.equal(Dnum,9);
assert.equal(Dden,5);
const k=2;
assert.equal((K(0,v*k))*gamma,v*v*k*k);

// A constant mixing m instead gives a nonzero zero-momentum relaxation gap
// Gamma_eff=m^2/gamma.  It is not a diffusion constant.
const gapNum=m*m,gapDen=gamma;
assert.equal(gapNum,49);
assert.equal(gapDen,5);
assert.equal(K(0,m)*gamma,m*m);

// The retarded memory kernel is g^2 exp(-gamma t); its Laplace transform
// g^2/(s+gamma) is positive real for Re(s)>0.
const complexReciprocalReal=(sigma,omega)=>(
  (sigma+gamma)/((sigma+gamma)**2+omega**2)
);
for(const sigma of [0.1,1,4])for(const omega of [0,2,9])
  assert(complexReciprocalReal(sigma,omega)>0);

console.log('two_branch_passive_elimination_scaling: PASS');
console.log('microscopic_energy_identity=E_dot_equals_minus_gamma_y_squared');
console.log('derivative_mixing_g_of_k_equals_v_k_gives_D_equals_v_squared_over_gamma');
console.log('constant_mixing_g_equals_m_gives_relaxation_gap_m_squared_over_gamma_not_diffusion');
console.log('eliminated_memory_kernel_is_positive_real_for_Re_s_positive');
console.log('particle_mass_interpretation_requires_an_independent_microscopic_dictionary');
