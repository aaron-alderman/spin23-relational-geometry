import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";

const root = new URL("../", import.meta.url);
const sourceFiles = {
  BH1: "evidence/sources/earthscope-iu-anmo-20100227-bh1.csv",
  BH2: "evidence/sources/earthscope-iu-anmo-20100227-bh2.csv",
  BHZ: "evidence/sources/earthscope-iu-anmo-20100227-bhz.csv",
};
const stationPath = "evidence/sources/earthscope-iu-anmo-20100227-station.txt";
const outputPath = "evidence/data/earthscope-seismic-adaptive-reader-audit-v1.json";
const figurePath = "evidence/figures/earthscope-seismic-adaptive-reader-audit-v1.svg";
const sourceUrl = channel => `https://service.earthscope.org/fdsnws/dataselect/1/query?net=IU&sta=ANMO&loc=00&cha=${channel}&start=2010-02-27T06:40:00&end=2010-02-27T07:10:00&format=geocsv.inline&scale=AUTO&nodata=404`;
const sha256 = value => createHash("sha256").update(value).digest("hex");
const round = (x, n = 6) => Number(x.toFixed(n));
const mean = xs => xs.reduce((a, b) => a + b, 0) / xs.length;
const median = xs => { const s = [...xs].sort((a, b) => a - b), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const mad = xs => { const m = median(xs); return median(xs.map(x => Math.abs(x - m))); };
const rms = xs => Math.sqrt(mean(xs.map(x => x * x)));
const esc = s => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function parseGeoCsv(path) {
  const text = readFileSync(new URL(path, root), "utf8");
  const samples = new Map();
  let segmentCount = 0;
  for (const raw of text.split(/\r?\n/)) {
    if (raw.startsWith("# dataset:")) segmentCount++;
    if (!/^\d{4}-\d{2}-\d{2}T/.test(raw)) continue;
    const comma = raw.indexOf(",");
    const stamp = raw.slice(0, comma).trim();
    const value = Number(raw.slice(comma + 1).trim());
    if (Number.isFinite(value)) samples.set(stamp, value);
  }
  const rows = [...samples].map(([stamp, value]) => ({ stamp, timeMs: Date.parse(stamp), value })).sort((a, b) => a.timeMs - b.timeMs);
  assert.ok(rows.length > 10000, `${path} has too few samples`);
  return { text, rows, segmentCount, sha256: sha256(text) };
}

function jacobiEigenvalues3(matrix) {
  const a = matrix.map(row => [...row]);
  for (let sweep = 0; sweep < 30; sweep++) {
    let p = 0, q = 1, largest = Math.abs(a[0][1]);
    for (const [i, j] of [[0, 2], [1, 2]]) if (Math.abs(a[i][j]) > largest) { p = i; q = j; largest = Math.abs(a[i][j]); }
    if (largest < 1e-20) break;
    const phi = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]);
    const c = Math.cos(phi), s = Math.sin(phi);
    const app = c*c*a[p][p] - 2*s*c*a[p][q] + s*s*a[q][q];
    const aqq = s*s*a[p][p] + 2*s*c*a[p][q] + c*c*a[q][q];
    for (let k = 0; k < 3; k++) if (k !== p && k !== q) {
      const akp = a[k][p], akq = a[k][q];
      a[k][p] = a[p][k] = c*akp - s*akq;
      a[k][q] = a[q][k] = s*akp + c*akq;
    }
    a[p][p] = app; a[q][q] = aqq; a[p][q] = a[q][p] = 0;
  }
  return [a[0][0], a[1][1], a[2][2]].sort((a, b) => b - a);
}

const parsed = Object.fromEntries(Object.entries(sourceFiles).map(([channel, path]) => [channel, parseGeoCsv(path)]));
const channelLengths = Object.fromEntries(Object.entries(parsed).map(([channel, p]) => [channel, p.rows.length]));
assert.equal(new Set(Object.values(channelLengths)).size, 1, "three-component sample counts differ");
const commonStamps = parsed.BHZ.rows.map(r => r.stamp);
const timestampSkewMs = commonStamps.map((_, i) => Math.max(
  Math.abs(parsed.BH1.rows[i].timeMs - parsed.BHZ.rows[i].timeMs),
  Math.abs(parsed.BH2.rows[i].timeMs - parsed.BHZ.rows[i].timeMs),
));
assert.equal(Math.max(...timestampSkewMs), 0, "three-component sample clocks differ at millisecond resolution");
const timeMs = commonStamps.map(Date.parse);
const dtSeconds = median(timeMs.slice(1).map((t, i) => (t - timeMs[i]) / 1000));
const sampleRateHz = 1 / dtSeconds;
assert.ok(Math.abs(sampleRateHz - 20) < 1e-6);
const values = commonStamps.map((_, i) => [parsed.BH1.rows[i].value, parsed.BH2.rows[i].value, parsed.BHZ.rows[i].value]);
const startMs = timeMs[0];
const baselineSeconds = 300;
const baselineCount = Math.round(baselineSeconds * sampleRateHz);
const baselineMeans = [0, 1, 2].map(j => mean(values.slice(0, baselineCount).map(v => v[j])));
const centred = values.map(v => v.map((x, j) => x - baselineMeans[j]));

const detector = {
  baselineSeconds,
  windowSeconds: 10,
  onsetThresholdRobustSigma: 8,
  spectrumWindowSamples: 2048,
  spectrumMaximumHz: 8,
  spectrumPreprocess: "per-component least-squares linear detrend followed by a Hann window",
  polarizationWindowSeconds: 60,
  fieldJumpRule: "maximum vector first-difference divided by baseline robust first-difference scale; diagnostic proxy only",
};
const windowSamples = Math.round(detector.windowSeconds * sampleRateHz);
const rmsWindows = [];
for (let i = 0; i + windowSamples <= centred.length; i += windowSamples) {
  const vectorMagnitudes = centred.slice(i, i + windowSamples).map(v => Math.hypot(...v));
  rmsWindows.push({ startIndex: i, seconds: i / sampleRateHz, rmsMps: rms(vectorMagnitudes) });
}
const baselineWindowCount = baselineSeconds / detector.windowSeconds;
const baselineRms = rmsWindows.slice(0, baselineWindowCount).map(x => x.rmsMps);
const baselineRmsMedian = median(baselineRms);
const baselineRmsRobustSigma = 1.4826 * mad(baselineRms);
const onsetThresholdMps = baselineRmsMedian + detector.onsetThresholdRobustSigma * baselineRmsRobustSigma;
const onset = rmsWindows.find(x => x.startIndex >= baselineCount && x.rmsMps > onsetThresholdMps) ?? null;
const peak = rmsWindows.reduce((a, b) => b.rmsMps > a.rmsMps ? b : a);

const differenceMagnitudes = centred.slice(1).map((v, i) => Math.hypot(v[0]-centred[i][0], v[1]-centred[i][1], v[2]-centred[i][2]));
const baselineDifferences = differenceMagnitudes.slice(0, baselineCount - 1);
const differenceScale = median(baselineDifferences) + 1.4826 * mad(baselineDifferences);
const maximumDifference = Math.max(...differenceMagnitudes);
const transientGradientRatio = maximumDifference / differenceScale;

const spectralStart = Math.max(0, Math.min(centred.length - detector.spectrumWindowSamples, peak.startIndex - detector.spectrumWindowSamples / 2));
const spectralBlock = centred.slice(spectralStart, spectralStart + detector.spectrumWindowSamples);
const spectralDetrended = spectralBlock.map(row => [...row]);
for (let channel = 0; channel < 3; channel++) {
  const xMean = (spectralBlock.length - 1) / 2;
  const yMean = mean(spectralBlock.map(v => v[channel]));
  let numerator = 0, denominator = 0;
  for (let i = 0; i < spectralBlock.length; i++) {
    numerator += (i - xMean) * (spectralBlock[i][channel] - yMean);
    denominator += (i - xMean) ** 2;
  }
  const slope = numerator / denominator;
  for (let i = 0; i < spectralBlock.length; i++) spectralDetrended[i][channel] -= yMean + slope * (i - xMean);
}
const spectral = [];
const n = spectralDetrended.length;
for (let k = 1; k <= Math.floor(detector.spectrumMaximumHz * n / sampleRateHz); k++) {
  let power = 0;
  for (let channel = 0; channel < 3; channel++) {
    let re = 0, im = 0;
    for (let i = 0; i < n; i++) {
      const w = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / (n - 1));
      const angle = 2 * Math.PI * k * i / n;
      re += spectralDetrended[i][channel] * w * Math.cos(angle);
      im -= spectralDetrended[i][channel] * w * Math.sin(angle);
    }
    power += re*re + im*im;
  }
  spectral.push({ frequencyHz: k * sampleRateHz / n, power });
}
const powerSum = spectral.reduce((s, x) => s + x.power, 0);
const peakFrequency = spectral.reduce((a, b) => b.power > a.power ? b : a).frequencyHz;
const centroidHz = spectral.reduce((s, x) => s + x.frequencyHz * x.power, 0) / powerSum;
const bandwidthHz = Math.sqrt(spectral.reduce((s, x) => s + (x.frequencyHz-centroidHz)**2 * x.power, 0) / powerSum);

const polarizationSamples = Math.round(detector.polarizationWindowSeconds * sampleRateHz);
const polarizationStart = Math.max(0, Math.min(centred.length - polarizationSamples, peak.startIndex - polarizationSamples / 2));
const polarizationBlock = centred.slice(polarizationStart, polarizationStart + polarizationSamples);
const polarizationMeans = [0,1,2].map(j => mean(polarizationBlock.map(v => v[j])));
const covariance = Array.from({length:3}, (_, i) => Array.from({length:3}, (_, j) => mean(polarizationBlock.map(v => (v[i]-polarizationMeans[i])*(v[j]-polarizationMeans[j])))));
const eigenvalues = jacobiEigenvalues3(covariance);
const polarizationConcentration = eigenvalues[0] / eigenvalues.reduce((a,b)=>a+b,0);

const cases = [
  { id: "classical_pressure_wave", R5: "1", R6: "00", R7: "0" },
  { id: "phonon_focusing", R5: "1", R6: "00", R7: "1" },
  { id: "riemann_shock_without_cusp", R5: "1", R6: "11", R7: "0" },
];
const trace = [
  { readerId: "R5", name: "constitutive-field typing", cost: 1, status: "admitted", outcome: "1", basis: "station metadata records ground velocity in m/s from a classical borehole seismometer; this admits a classical elastic carrier but does not identify a mechanism", candidatesBefore: 6, candidatesAfter: cases.map(x => x.id) },
  { readerId: "R6", name: "jump and entropy", cost: 2, status: "unavailable", outcome: "??", basis: `a transient-gradient proxy is ${round(transientGradientRatio,2)} baseline robust scales, but a sampled velocity gradient is not a field discontinuity and the entropy condition is not observed`, candidatesBefore: 3, candidatesAfter: cases.map(x => x.id) },
  { readerId: "R7", name: "directional transport", cost: 3, status: "unavailable", outcome: "?", basis: `three-component polarization concentration is ${round(polarizationConcentration,4)}, but one spatial station cannot estimate directional group velocity`, candidatesBefore: 3, candidatesAfter: cases.map(x => x.id) },
];

const sourceLedger = Object.fromEntries(Object.entries(sourceFiles).map(([channel, path]) => [channel, { path, url: sourceUrl(channel), sha256: parsed[channel].sha256, uniqueSamples: parsed[channel].rows.length, segments: parsed[channel].segmentCount }]));
const stationText = readFileSync(new URL(stationPath, root), "utf8");
const observations = {
  alignedSamples: commonStamps.length,
  sampleRateHz: round(sampleRateHz),
  startTime: commonStamps[0],
  endTime: commonStamps.at(-1),
  durationSeconds: round((timeMs.at(-1)-timeMs[0])/1000),
  gapsOverOneAndHalfSamples: timeMs.slice(1).filter((t,i) => t-timeMs[i] > 1.5*dtSeconds*1000).length,
  maximumComponentTimestampSkewMs: Math.max(...timestampSkewMs),
  baselineRmsMedianMps: round(baselineRmsMedian, 12),
  onsetThresholdMps: round(onsetThresholdMps, 12),
  detectedOnsetSeconds: onset ? onset.seconds : null,
  detectedOnsetTime: onset ? new Date(startMs + onset.seconds*1000).toISOString() : null,
  peakRmsMps: round(peak.rmsMps, 12),
  peakSeconds: peak.seconds,
  peakTime: new Date(startMs + peak.seconds*1000).toISOString(),
  peakToBaselineRms: round(peak.rmsMps / baselineRmsMedian, 4),
  transientGradientRatio: round(transientGradientRatio, 4),
  spectrum: { peakFrequencyHz: round(peakFrequency,4), centroidHz: round(centroidHz,4), bandwidthHz: round(bandwidthHz,4), windowStartTime: new Date(startMs + spectralStart/sampleRateHz*1000).toISOString() },
  polarization: { covarianceM2PerS2: covariance.map(row => row.map(x => round(x,16))), eigenvaluesM2PerS2: eigenvalues.map(x => round(x,16)), concentration: round(polarizationConcentration,6), windowStartTime: new Date(startMs + polarizationStart/sampleRateHz*1000).toISOString() },
};

const W=1200,H=780,bg="#f3f5f8",ink="#172033",muted="#52617a",teal="#167f79",blue="#3c6eb4",orange="#d7643f",grid="#d8dee8";
const panel=(x,y,w,h,title,body)=>`<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#fff" stroke="${grid}"/><text x="${x+18}" y="${y+28}" font-size="16" font-weight="700" fill="${ink}">${esc(title)}</text>${body}</g>`;
const plotX=58,plotY=70,plotW=510,plotH=220;
const decimation=Math.ceil(centred.length/720), maxAbs=Math.max(...centred.flatMap(v=>v.map(Math.abs)));
const colours=[blue,teal,orange];
const wavePaths=[0,1,2].map(j=>{let d="";for(let i=0;i<centred.length;i+=decimation){const x=plotX+(i/(centred.length-1))*plotW,y=plotY+plotH/2-centred[i][j]/maxAbs*(plotH*.44);d+=`${d?"L":"M"}${x.toFixed(1)},${y.toFixed(1)}`;}return `<path d="${d}" fill="none" stroke="${colours[j]}" stroke-width="1.2" opacity=".86"/>`;}).join("");
const onsetX=onset?plotX+onset.startIndex/(centred.length-1)*plotW:null, peakX=plotX+peak.startIndex/(centred.length-1)*plotW;
const waveBody=`<line x1="${plotX}" y1="${plotY+plotH/2}" x2="${plotX+plotW}" y2="${plotY+plotH/2}" stroke="${grid}"/>${wavePaths}${onset?`<line x1="${onsetX}" y1="${plotY}" x2="${onsetX}" y2="${plotY+plotH}" stroke="${teal}" stroke-dasharray="4 4"/>`:""}<line x1="${peakX}" y1="${plotY}" x2="${peakX}" y2="${plotY+plotH}" stroke="${orange}" stroke-dasharray="4 4"/><text x="${plotX}" y="315" font-size="11" fill="${muted}">06:40 UTC</text><text x="${plotX+plotW-58}" y="315" font-size="11" fill="${muted}">07:10 UTC</text><text x="${plotX}" y="337" font-size="11" fill="${blue}">BH1</text><text x="${plotX+42}" y="337" font-size="11" fill="${teal}">BH2</text><text x="${plotX+84}" y="337" font-size="11" fill="${orange}">BHZ</text><text x="${plotX+160}" y="337" font-size="11" fill="${muted}">onset ${onset?onset.seconds:"none"} s · peak ${peak.seconds} s</text>`;
const rmsX=650,rmsY=78,rmsW=490,rmsH=180,rmsMax=Math.max(...rmsWindows.map(x=>x.rmsMps));
let rmsPath="";for(const row of rmsWindows){const x=rmsX+row.seconds/(observations.durationSeconds)*rmsW,y=rmsY+rmsH-row.rmsMps/rmsMax*rmsH;rmsPath+=`${rmsPath?"L":"M"}${x.toFixed(1)},${y.toFixed(1)}`;}
const thresholdY=rmsY+rmsH-onsetThresholdMps/rmsMax*rmsH;
const rmsBody=`<path d="${rmsPath}" fill="none" stroke="${blue}" stroke-width="1.6"/><line x1="${rmsX}" y1="${thresholdY}" x2="${rmsX+rmsW}" y2="${thresholdY}" stroke="${orange}" stroke-dasharray="5 4"/><text x="${rmsX}" y="282" font-size="11" fill="${muted}">10 s vector RMS · fixed 8σ robust onset threshold</text><text x="${rmsX}" y="305" font-size="12" fill="${ink}">peak / baseline ${round(observations.peakToBaselineRms,2)}×</text><text x="${rmsX+180}" y="305" font-size="12" fill="${ink}">gradient proxy ${round(transientGradientRatio,2)}×</text><text x="${rmsX}" y="328" font-size="10" fill="${muted}">The proxy is not promoted to a shock or entropy observation.</text>`;
const specX=58,specY=430,specW=510,specH=205,specMax=Math.max(...spectral.map(x=>x.power)),specMinFrequency=spectral[0].frequencyHz,specLogSpan=Math.log(detector.spectrumMaximumHz/specMinFrequency);let specPath="";for(const row of spectral){const x=specX+Math.log(row.frequencyHz/specMinFrequency)/specLogSpan*specW,db=Math.max(-60,10*Math.log10(row.power/specMax)),y=specY+(-db/60)*specH;specPath+=`${specPath?"L":"M"}${x.toFixed(1)},${y.toFixed(1)}`;}
const specBody=`<path d="${specPath}" fill="none" stroke="${teal}" stroke-width="1.5"/><line x1="${specX}" y1="${specY+specH}" x2="${specX+specW}" y2="${specY+specH}" stroke="${grid}"/><text x="${specX}" y="655" font-size="11" fill="${muted}">0.01 Hz</text><text x="${specX+specW-28}" y="655" font-size="11" fill="${muted}">8 Hz</text><text x="${specX}" y="679" font-size="12" fill="${ink}">peak ${round(peakFrequency,2)} Hz · centroid ${round(centroidHz,2)} Hz · bandwidth ${round(bandwidthHz,2)} Hz</text><text x="${specX}" y="702" font-size="10" fill="${muted}">log-frequency · relative power clipped at −60 dB · detrended Hann spectrum</text>`;
const traceRows=trace.map((x,i)=>{const y=432+i*82,c=x.status==="admitted"?teal:orange;return `<circle cx="652" cy="${y}" r="12" fill="${c}"/><text x="648" y="${y+4}" font-size="10" fill="#fff">${i+1}</text><text x="676" y="${y-7}" font-size="13" font-weight="700" fill="${ink}">${x.readerId} ${esc(x.name)} · cost ${x.cost}</text><text x="676" y="${y+13}" font-size="11" fill="${c}">${x.status} · outcome ${x.outcome}</text><text x="676" y="${y+31}" font-size="10" fill="${muted}">${esc(x.basis.slice(0,83))}${x.basis.length>83?"…":""}</text>`;}).join("");
const traceBody=`${traceRows}<text x="638" y="686" font-size="13" font-weight="700" fill="${orange}">ABSTAIN · 3 candidates remain</text><text x="638" y="708" font-size="10" fill="${muted}">single-station polarization ≠ group velocity; transient gradient ≠ entropy shock</text>`;
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${bg}"/><g font-family="system-ui,sans-serif">${panel(20,20,570,340,"Real three-component ground velocity",waveBody)}${panel(610,20,570,340,"Frozen event detector",rmsBody)}${panel(20,380,570,350,"Measured response spectrum",specBody)}${panel(610,380,570,350,"Adaptive reader trace",traceBody)}<text x="20" y="762" font-size="12" fill="${muted}">EarthScope IU.ANMO.00 · 2010 Maule window · source-native values · unavailable readers remain visible</text></g></svg>\n`;
const figureHash=sha256(svg);

const result = {
  schemaVersion: "0.1.0",
  status: "real elastic-wave adaptive reader audit",
  source: {
    provider: "NSF National Geophysical Facility / EarthScope Data Services",
    station: "IU.ANMO.00",
    eventContext: { name: "2010 Maule, Chile earthquake", usgsEvent: "official20100227063411530_30", magnitude: 8.8, originTimeUtc: "2010-02-27T06:34:11Z", role: "context only; event label is not used by the detector" },
    stationMetadata: { path: stationPath, sha256: sha256(stationText) },
    channels: sourceLedger,
  },
  preregisteredDetector: detector,
  observations,
  readerAudit: {
    inheritedPolicy: "evidence/data/wave-mechanism-adaptive-control-v1.json",
    attemptedCost: trace.reduce((s,x)=>s+x.cost,0),
    fixedCompleteCost: 8,
    trace,
    finalCandidates: cases.map(x=>x.id),
    termination: "abstain",
    reason: "the source supplies three-component time series at one point, not thermodynamic entropy or multi-station directional group velocity",
    nextMeasurements: ["a spatial station array with common timing for travel-time and directional group-velocity estimation", "a carrier-specific stress/strain or energy-flux account sufficient to test a jump plus entropy condition"],
  },
  evidenceKinds: {
    observation: ["timestamped ground-velocity samples", "station and instrument metadata"],
    derivation: ["robust RMS onset", "three-component spectrum", "polarization covariance", "transient-gradient proxy"],
    inference: ["classical elastic carrier typing"],
    prohibitedPromotion: ["polarization to anisotropic group velocity", "sample gradient to field discontinuity", "signal burst to entropy-producing shock", "event context to mechanism truth"],
  },
  figure: { path: figurePath, sha256: figureHash },
  glassBox: { rawSourceHashes: true, frozenDetectorConstants: true, exactReaderTrace: true, unavailableMeasurementsVisible: true, abstentionVisible: true, noLlmRequired: true },
  verdict: { realDataIngested: true, sourceNativeUnitsPreserved: true, adaptiveMechanismIdentificationEstablished: false, reason: "the first real-data pass correctly exposes a measurement-type gap rather than filling it with a surrogate" },
};

assert.equal(observations.gapsOverOneAndHalfSamples, 0);
assert.ok(observations.peakToBaselineRms > 2);
assert.equal(result.readerAudit.termination, "abstain");
assert.equal(result.readerAudit.finalCandidates.length, 3);
assert.equal(result.glassBox.noLlmRequired, true);

if (process.argv.includes("--write")) {
  writeFileSync(new URL(figurePath, root), svg);
  writeFileSync(new URL(outputPath, root), JSON.stringify(result, null, 2) + "\n");
  console.log("wrote EarthScope seismic adaptive-reader audit evidence and figure");
} else {
  console.log(JSON.stringify({ observations, readerAudit: result.readerAudit, figureSha256: figureHash }, null, 2));
}
