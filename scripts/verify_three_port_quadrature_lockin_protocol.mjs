const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const sub = (x, y) => C(x.re - y.re, x.im - y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const scale = (a, x) => C(a * x.re, a * x.im);
const abs2 = (x) => x.re * x.re + x.im * x.im;
const phase = (phi) => C(Math.cos(phi), Math.sin(phi));

const u = C(2 * Math.sqrt(35));
const v = C(0, -Math.sqrt(77));
const w = C(Math.sqrt(55));
const c = 40;
const loop = mul(mul(u, v), w);
const q = scale(1 / c, mul(conj(w), conj(v)));
const X = mul(u, conj(q));
assert(Math.abs(loop.im + 770) < 1e-10, "checkpoint loop must be -770i");
assert(Math.abs(c * X.im - loop.im) < 1e-10, "Schur interference must equal loop orientation over pivot");

const intensity = (phi) => abs2(sub(u, mul(phase(phi), q)));
const Iplus = intensity(Math.PI / 2);
const Iminus = intensity(-Math.PI / 2);
const extractedX = (Iminus - Iplus) / 4;
const extractedLoop = c * extractedX;
assert(Math.abs(extractedX - X.im) < 1e-10, "quadrature intensity difference must isolate Im(u q*)");
assert(Math.abs(extractedLoop - loop.im) < 1e-10, "lock-in protocol must recover loop imaginary part");

// Port rephasings transform the direct and indirect paths identically.
const theta = [0.27, -0.38, 0.61];
const uGauge = mul(phase(theta[0] - theta[1]), u);
const vGauge = mul(phase(theta[1] - theta[2]), v);
const wGauge = mul(phase(theta[2] - theta[0]), w);
const qGauge = scale(1 / c, mul(conj(wGauge), conj(vGauge)));
const XGauge = mul(uGauge, conj(qGauge));
assert(Math.abs(XGauge.re - X.re) < 1e-10 && Math.abs(XGauge.im - X.im) < 1e-10, "lock-in quadrature must be port-gauge invariant");

// Conjugation reverses the oriented signal but preserves path magnitudes.
const uCP = conj(u);
const qCP = conj(q);
const XCP = mul(uCP, conj(qCP));
assert(Math.abs(XCP.im + X.im) < 1e-10, "CP conjugation must reverse the sine quadrature");
assert(Math.abs(abs2(uCP) - abs2(u)) < 1e-12 && Math.abs(abs2(qCP) - abs2(q)) < 1e-12, "path powers must be CP even");

// Zero-phase power only determines the cosine quadrature; phase reversal is essential.
const Izero = intensity(0);
const base = abs2(u) + abs2(q);
const extractedRe = (base - Izero) / 2;
assert(Math.abs(extractedRe - X.re) < 1e-10, "zero-phase measurement must isolate only Re(u q*)");
assert(Math.abs(X.re) < 1e-12 && Math.abs(X.im) > 1e-6, "checkpoint must hide orientation from the cosine channel");

console.log("Three-port quadrature lock-in certificate: PASS");
console.log("I(-pi/2)-I(+pi/2)=4*Im(u*q*)");
console.log("pivot_times_quadrature=Im(uvw)=-770; port_gauge_invariant=true");
console.log("path_powers_CP_even=true; sine_quadrature_CP_odd=true");
