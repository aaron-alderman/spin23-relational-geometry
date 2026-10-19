const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const PASS = "pass";
const FAIL = "fail";
const OPEN = "open";
const CONDITIONAL = "conditional";

const candidates = [
  { id: "weak_centralizer", gauge: FAIL, nu16: OPEN, carCp: CONDITIONAL, causal: OPEN, canonical: PASS },
  { id: "neutral_endomorphism", gauge: PASS, nu16: PASS, carCp: CONDITIONAL, causal: OPEN, canonical: FAIL },
  { id: "charged_linking", gauge: FAIL, nu16: FAIL, carCp: OPEN, causal: CONDITIONAL, canonical: PASS },
  { id: "external_duplicate", gauge: PASS, nu16: PASS, carCp: PASS, causal: CONDITIONAL, canonical: FAIL },
];

assert(candidates.length === 4, "three internal candidates and one external control must be audited");
assert(candidates.filter((c) => c.gauge === PASS).map((c) => c.id).join(",")
  === "neutral_endomorphism,external_duplicate",
"only the neutral endomorphism and external control may pass direct gauge neutrality");
assert(candidates.find((c) => c.id === "charged_linking").nu16 === FAIL,
  "the unique charged M2 factor must fail survival of the sixteen-state linking completion");
assert(candidates.find((c) => c.id === "weak_centralizer").gauge === FAIL,
  "a fixed real slice of the weak block must fail full unbroken weak covariance");
assert(candidates.find((c) => c.id === "neutral_endomorphism").canonical === FAIL,
  "neutrality alone must not canonically select the endomorphism block as a physical field");
assert(candidates.find((c) => c.id === "external_duplicate").canonical === FAIL,
  "an external duplicate must not count as an internal derivation");

const allPass = candidates.filter((c) => [c.gauge, c.nu16, c.carCp, c.causal, c.canonical]
  .every((status) => status === PASS));
assert(allPass.length === 0, "no current M2 candidate may be reported as closing every physical gate");

const internallyPromising = candidates.filter((c) =>
  c.gauge === PASS && c.nu16 === PASS && c.id !== "external_duplicate");
assert(internallyPromising.length === 1 && internallyPromising[0].id === "neutral_endomorphism",
  "neutral endomorphism must be the sole internal candidate passing the first two gates");

console.log("M2 candidate physical-gate matrix: PASS");
for (const c of candidates) {
  console.log(`${c.id}:gauge=${c.gauge},nu16=${c.nu16},CAR_CP=${c.carCp},causal=${c.causal},canonical=${c.canonical}`);
}
console.log("all_required_gates_passed_by=none");
console.log("leading_internal_candidate=neutral_endomorphism");
console.log("leading_candidate_still_lacks=canonical_physical_selection_and_causal_source");
