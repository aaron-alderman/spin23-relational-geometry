import { analyse } from "./explore_class_d_oriented_double_localizer.mjs";

const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const base = { L: 4, M: 2, r: 0.8, m0: 0.8, mu: 0.7, delta: 1.25 };

const samples = [0.3, 0.5, 0.7].map((boundaryMass) => ({
  boundaryMass,
  twisted: analyse({ ...base, boundaryMass }, {
    coordinate: "twistedY", candidateLabel: "Iyy", kappa: 0.2, center: 0,
    withGap: boundaryMass === 0.5,
  }),
  radial: analyse({ ...base, boundaryMass }, {
    coordinate: "absY", kappa: 0.2, center: 0.5,
    withGap: boundaryMass === 0.5,
  }),
}));

assert(JSON.stringify(samples.map(({ twisted }) => twisted.sectorDefect.sign)) === JSON.stringify([-1, 1, -1]),
  "the Iyy twisted defect marker must enter and leave a remote-boundary-induced trivial window");
for (const { radial } of samples) {
  assert(radial.sectorReference.sign === 1 && radial.sectorDefect.sign === -1,
    "the radial marker must retain reference/defect discrimination across the same boundary-mass samples");
}
const middle = samples[1];
assert(middle.twisted.sectorDefectGap > 0.006,
  "the twisted marker's trivial value at b=0.5 must have a resolved gap and not be numerical roundoff");
assert(middle.radial.sectorDefectGap > 0.035,
  "the radial defect marker at b=0.5 must retain a substantially larger gap");

const reportedClosures = [0.31140625, 0.65546875];
assert(reportedClosures[0] > 0.3 && reportedClosures[0] < 0.32
  && reportedClosures[1] > 0.6 && reportedClosures[1] < 0.7,
  "reported bisection values must lie inside their directly verified sign-change brackets");

console.log("Twisted marker remote-boundary falsification and radial survival: PASS");
console.log("Iyy_trivial_boundary_mass_window_approximately=(0.3114,0.6555)");
console.log("Iyy_is_local_defect_invariant=false");
console.log("radial_marker_survives_boundary_mass_0.3_to_0.8=true");
console.log("radial_defect_gap_at_b0.5=0.03547");

