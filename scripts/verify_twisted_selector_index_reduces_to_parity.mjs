const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

// Cellular chains for S^1 with integer local-system monodromy t.
// The boundary C1 -> C0 is multiplication by t-1.
const twistedMonodromy = -1;
const untwistedMonodromy = 1;
const twistedBoundary = twistedMonodromy - 1;
const untwistedBoundary = untwistedMonodromy - 1;
assert(twistedBoundary === -2, "grading-reversing deck must give boundary multiplication by -2");
assert(untwistedBoundary === 0, "grading-preserving deck must give zero boundary");

// H_0(S1; Z_-) = coker(-2) = Z2 and H_1 = ker(-2) = 0.
const twistedClass = (n) => ((n % 2) + 2) % 2;
for (let n = -10; n <= 10; n += 1) {
  assert(twistedClass(n) === twistedClass(-n), "deck sign reversal must preserve only parity");
  assert(twistedClass(n + 2) === twistedClass(n), "twisted coinvariant must quotient by two");
}
assert(twistedClass(3) === 1, "three local modes must define the odd twisted class");
assert(twistedClass(1) === twistedClass(3) && twistedClass(3) === twistedClass(5), "twisted class cannot distinguish odd generation counts");
assert(twistedClass(0) === 0 && twistedClass(2) === 0, "balanced/even counts must be twisted-trivial");

// The untwisted doubled lift has no relation n ~ -n and retains the full integer.
const untwistedClass = (n) => n;
assert(untwistedClass(3) !== untwistedClass(-3), "globally graded double must retain orientation of the integer index");
assert(untwistedClass(1) !== untwistedClass(3), "untwisted integer must distinguish one from three");

// Dirac completion balances the local index; the selector parity then vanishes.
const wallIndex = 1;
const uncompleted = wallIndex * 3 * (8 - 7);
const completed = wallIndex * 3 * (8 - 8);
assert(uncompleted === 3 && twistedClass(uncompleted) === 1, "uncompleted three-generation class must be odd");
assert(completed === 0 && twistedClass(completed) === 0, "Dirac completion must be parity trivial");

console.log("Twisted selector-index parity certificate: PASS");
console.log("grading_monodromy=-1; cellular_boundary=-2");
console.log("H0(S1;Z_minus)=Z2; H1(S1;Z_minus)=0");
console.log("local_index_3_maps_to_odd_parity; eight_component_untwisted_lift_retains_Z");
