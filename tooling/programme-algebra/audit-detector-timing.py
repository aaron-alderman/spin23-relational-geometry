"""Freeze a coincidence time gate on one source and score it on another."""

import argparse
import hashlib
import json
from pathlib import Path
from statistics import fmean, median

import numpy as np
import uproot


def acquisition(directory, plan, isotope):
    path = directory / f"{isotope}.root"
    if hashlib.sha256(path.read_bytes()).hexdigest() != plan["files"][isotope]["sha256"]:
        raise ValueError(f"Source file changed: {path}")
    with uproot.open(path) as root:
        events = root["Data"].arrays(["Board", "Channel", "Energy", "Timestamp"], library="np")
    if np.unique(events["Board"]).tolist() != [0] or events["Timestamp"].max() >= np.iinfo(np.int64).max:
        raise ValueError("Expected one board and timestamps representable as signed integers")
    return events


def calibrate_energy(plan, data):
    fits = []
    radius = plan["calibrationAdcRadius"]
    refs = plan["energyReferences"]
    energies = [r["keV"] for r in refs]
    for index, channel in enumerate(plan["measuredChannels"]):
        centers = []
        for ref in refs:
            events = data[ref["source"]]
            raw = events["Energy"][events["Channel"] == channel]
            expected = ref["approximateAdcByChannel"][index]
            selected = raw[(raw >= expected - radius) & (raw <= expected + radius)]
            if selected.size == 0:
                raise ValueError("No energy calibration events inside the declared gate")
            centers.append(float(selected.mean()))
        slope, intercept = np.polyfit(centers, energies, 1)
        fits.append({"channel": channel, "adcCentroids": centers, "slope": float(slope), "offset": float(intercept)})
    return fits


def times_for_line(events, calibration, energy, half_width):
    channel = events["Channel"] == calibration["channel"]
    if energy is None:
        return np.sort(events["Timestamp"][channel].astype(np.int64))
    adc = events["Energy"].astype(float)
    inferred = calibration["offset"] + adc * calibration["slope"]
    keep = channel & (abs(inferred - energy) <= half_width)
    return np.sort(events["Timestamp"][keep].astype(np.int64))


def pair_indices(left, right, center, radius):
    lo = np.searchsorted(right, left + center - radius, side="left")
    hi = np.searchsorted(right, left + center + radius, side="right")
    hits = np.flatnonzero(lo < hi)
    if not hits.size:
        return np.empty(0, dtype=np.int64), np.empty(0, dtype=np.int64)
    right_indices = np.concatenate([np.arange(lo[i], hi[i]) for i in hits])
    return np.repeat(hits, hi[hits] - lo[hits]), right_indices


def delays(left, right, center, radius):
    a, b = pair_indices(left, right, center, radius)
    return right[b] - left[a]


def assess(plan, events, energy, lines, frozen_centers=None):
    unit = plan["timestampPicosecondsPerNanosecond"]
    radius = plan["delaySearchNanoseconds"]
    step = plan["alignmentHistogramStepNanoseconds"]
    results = []
    pairs = ([None, None],) if plan.get("readoutEventType") == "inclusive-two-channel-pair" else (lines, lines[::-1])
    for i, ordered in enumerate(pairs):
        left, right = [times_for_line(events, row, line, plan["energyGateHalfWidthKeV"])
                       for row, line in zip(energy, ordered)]
        if frozen_centers is None:
            values = delays(left, right, 0, radius * unit)
            if not values.size:
                raise ValueError("No calibration coincidences in the delay search")
            edges = np.arange(-radius, radius + step, step)
            histogram, _ = np.histogram(values / unit, bins=edges)
            center = int(edges[histogram.argmax()] + step / 2)
        else:
            center = frozen_centers[i]
        prompt = delays(left, right, center * unit, radius * unit)
        shifts = plan["timeShiftControlsNanoseconds"]
        controls = [delays(left, right, (center + shift) * unit, radius * unit) for shift in shifts]

        def counts(gate):
            prompt_count = int((abs(prompt - center * unit) <= gate * unit).sum())
            shifted_counts = [int((abs(values - (center + shift) * unit) <= gate * unit).sum())
                              for values, shift in zip(controls, shifts)]
            return {"halfWidthNanoseconds": gate, "promptPairs": prompt_count, "shiftedPairs": shifted_counts,
                    "netPairs": prompt_count - sum(shifted_counts) / len(shifts)}

        wide = counts(radius)
        if wide["netPairs"] <= 0:
            raise ValueError("No positive background-subtracted pairs in the reference window")
        gates = [{**record, "retention": record["netPairs"] / wide["netPairs"]}
                 for gate in plan["gateHalfWidthsNanoseconds"] for record in [counts(gate)]]
        results.append({"lineEnergiesByChannelKeV": ordered, "singlesGateCountsByChannel": [len(left), len(right)],
                        "centerNanoseconds": center, "wideReference": wide, "gates": gates})
    return results


def fit(plan, pin, directory):
    data = {name: acquisition(directory, plan, name) for name in ("co60", "cs137")}
    fits = calibrate_energy(plan, data)
    timing = assess(plan, data["co60"], fits, plan["calibrationLinePairKeV"])
    return {"planSha256": pin, "energyCalibration": fits, "cobaltTiming": timing}


def screen_full_energy(plan, pin, directory):
    data = {name: acquisition(directory, plan, name) for name in ("co60", "cs137")}
    fits = calibrate_energy(plan, data)
    lines = plan["calibrationLinePairKeV"]
    radius = plan["delaySearchNanoseconds"] * plan["timestampPicosecondsPerNanosecond"]
    rows = []
    for ordered in (lines, lines[::-1]):
        left, right = [times_for_line(data["co60"], fit_row, line, plan["energyGateHalfWidthKeV"])
                       for fit_row, line in zip(fits, ordered)]
        rows.append({"lineEnergiesByChannelKeV": ordered, "singlesByChannel": [len(left), len(right)],
                     "pairsInDelaySearch": len(delays(left, right, 0, radius))})
    return {"planSha256": pin, "calibrationRows": rows,
            "supportsFurtherFullEnergyCalibration": all(row["pairsInDelaySearch"] > 0 for row in rows)}


def score(plan, pin, directory, frozen):
    if fit(plan, pin, directory) != frozen:
        raise ValueError("Frozen timing gate does not reproduce")
    centers = [row["centerNanoseconds"] for row in frozen["cobaltTiming"]]
    measured = assess(plan, acquisition(directory, plan, "na22"), frozen["energyCalibration"],
                      plan["scoreLinePairKeV"], centers)
    for target, reference in zip(measured, frozen["cobaltTiming"]):
        for row, prior in zip(target["gates"], reference["gates"]):
            row["frozenCobaltRetention"] = prior["retention"]
            row["absoluteTransferError"] = abs(row["retention"] - prior["retention"])
            row["withinEngineeringTolerance"] = row["absoluteTransferError"] <= plan["engineeringTransferToleranceInFraction"]
    return {"planSha256": pin, "sodiumTiming": measured, "authority": plan["boundary"]}


def energy_streams(events, energy, begin=None, end=None):
    time = events["Timestamp"].astype(np.int64)
    streams = []
    for detector in energy:
        channel = events["Channel"] == detector["channel"]
        if begin is not None:
            channel &= time >= begin
        if end is not None:
            channel &= time < end
        timestamps = time[channel]
        kev = detector["offset"] + detector["slope"] * events["Energy"][channel].astype(float)
        order = np.argsort(timestamps)
        streams.append((timestamps[order], kev[order]))
    return streams


def paired_bands(plan, bands, streams, center):
    unit = plan["timestampPicosecondsPerNanosecond"]
    wide = plan["delaySearchNanoseconds"] * unit
    (left, energy_left), (right, energy_right) = streams
    pairs = []
    for shift in [0, *plan["timeShiftControlsNanoseconds"]]:
        origin = (center + shift) * unit
        a, b = pair_indices(left, right, origin, wide)
        offsets = right[b] - left[a] - origin
        selector = np.minimum(energy_left[a], energy_right[b])
        band = np.searchsorted(bands, selector, side="right") - 1
        if (band < 0).any():
            raise ValueError("Energy bands do not cover the recorded pulses")
        pairs.append((offsets, band))
    return pairs


def count_paired_bands(pairs, band_count, gates, unit, centers=None):
    """Count all gates from fixed prompt and shifted reservoirs."""
    by_shift = []
    for offsets, band in pairs:
        adjusted = offsets if centers is None else offsets - centers[band] * unit
        magnitude = abs(adjusted)
        by_shift.append([np.bincount(band[magnitude <= gate * unit], minlength=band_count).tolist()
                         for gate in gates])
    net = np.asarray(by_shift[0], dtype=float) - np.mean(by_shift[1:], axis=0)
    return {"gateHalfWidthsNanoseconds": gates, "promptByGateAndBand": by_shift[0],
            "shiftedByOffsetGateAndBand": by_shift[1:], "netByGateAndBand": net.tolist()}


def subdivide(plan, bands, streams, center, gates):
    pairs = paired_bands(plan, bands, streams, center)
    return count_paired_bands(pairs, len(bands), gates, plan["timestampPicosecondsPerNanosecond"])


def stratified_fit(plan, directory, inclusive, design, pin):
    events = acquisition(directory, plan, "co60")
    center = inclusive["cobaltTiming"][0]["centerNanoseconds"]
    gates = [*plan["gateHalfWidthsNanoseconds"], plan["delaySearchNanoseconds"]]
    bands = design["lowerPulseEnergyBandStartsKeV"]
    if not bands or any(b >= c for b, c in zip(bands, bands[1:])):
        raise ValueError("Energy bands must have increasing lower edges")
    minimum = design["minimumCobaltNetWidePairs"]
    if minimum <= 0:
        raise ValueError("Cobalt support requires a positive net count floor")
    base = subdivide(plan, bands, energy_streams(events, inclusive["energyCalibration"]), center, gates)
    wide = base["netByGateAndBand"][-1]
    supported = [index for index, count in enumerate(wide) if count >= minimum]
    return {"comparisonPlanSha256": pin, "calibrationBands": base, "supportedBandIndices": supported}


def score_one_stratified(plan, inclusive, design, calibrated, events, isotope):
    bands = design["lowerPulseEnergyBandStartsKeV"]
    detector = inclusive["energyCalibration"]
    broad = inclusive["cobaltTiming"][0]
    center = broad["centerNanoseconds"]
    gates = calibrated["calibrationBands"]["gateHalfWidthsNanoseconds"]
    supported = calibrated["supportedBandIndices"]
    time = events["Timestamp"]
    early_fraction = design["mixtureTrainingTimeFraction"]
    if not 0 < early_fraction < 1:
        raise ValueError("Target timing split must be interior to the acquisition")
    split_at = int(time.min()) + int((int(time.max()) - int(time.min())) * early_fraction)
    early = subdivide(plan, bands, energy_streams(events, detector, end=split_at), center, gates[-1:])
    target_weights = np.asarray(early["netByGateAndBand"][0])[supported]
    if not len(target_weights) or (target_weights < 0).any() or target_weights.sum() <= 0:
        return {"source": isotope, "cutTimestampPicoseconds": split_at, "earlyWideCounts": early,
                "status": "unresolved: no valid mixture on cobalt support"}
    target_weights /= target_weights.sum()
    calibration = np.asarray(calibrated["calibrationBands"]["netByGateAndBand"])[:, supported]
    cobalt_retention = calibration[:-1].sum(axis=1) / calibration[-1].sum()
    mixture_forecast = (calibration[:-1] / calibration[-1]) @ target_weights
    late = subdivide(plan, bands, energy_streams(events, detector, begin=split_at), center, gates)
    counts = np.asarray(late["netByGateAndBand"])
    target = counts[:, supported].sum(axis=1)
    if target[-1] <= 0 or counts[-1].sum() <= 0:
        return {"source": isotope, "status": "unresolved: no late prompt excess on common support",
                "earlyWideCounts": early, "lateCounts": late}
    late_weights = counts[-1, supported] / target[-1]
    late_mix_diagnostic = (calibration[:-1] / calibration[-1]) @ late_weights
    comparison = []
    for i, gate in enumerate(gates[:-1]):
        observed = float(target[i] / target[-1])
        all_bands = float(counts[i].sum() / counts[-1].sum())
        comparison.append({
            "halfWidthNanoseconds": gate,
            "observedCommonSupport": observed,
            "predictedPooledOnCommonSupport": float(cobalt_retention[i]),
            "predictedWithEarlyTargetMixture": float(mixture_forecast[i]),
            "pooledAbsoluteError": abs(observed - float(cobalt_retention[i])),
            "mixtureAbsoluteError": abs(observed - float(mixture_forecast[i])),
            "postScoreMixtureDriftContribution": float(late_mix_diagnostic[i] - mixture_forecast[i]),
            "postScoreWithinBandContribution": observed - float(late_mix_diagnostic[i]),
            "observedAllBands": all_bands,
            "originalInclusiveForecast": broad["gates"][i]["retention"],
        })
    return {"source": isotope, "status": "scored", "cutTimestampPicoseconds": split_at,
            "earlyWideCounts": early, "earlyCommonSupportWeights": target_weights.tolist(),
            "lateNetWeightsForDiagnosticsOnly": late_weights.tolist(), "lateCounts": late,
            "commonSupportShareOfLateNetWidePairs": float(target[-1] / counts[-1].sum()), "gateComparison": comparison}


def stratified_comparison(plan, pin, directory, design_path, score_path):
    raw = design_path.read_bytes()
    design = json.loads(raw)
    if design["referencePlanSha256"] != pin:
        raise ValueError("Energy stratification changed the reference plan")
    if (refusal := design.get("originRefusal")) is not None:
        refusal_bytes = design_path.with_name(refusal["file"]).read_bytes()
        if hashlib.sha256(refusal_bytes).hexdigest() != refusal["sha256"]:
            raise ValueError("Pooled calibration changed its recorded refusal")
    ref = design["inclusiveCalibration"]
    inclusive_bytes = design_path.with_name(ref["file"]).read_bytes()
    if hashlib.sha256(inclusive_bytes).hexdigest() != ref["sha256"]:
        raise ValueError("Energy stratification changed the frozen calibration")
    inclusive = json.loads(inclusive_bytes)
    if inclusive["planSha256"] != pin:
        raise ValueError("Inclusive calibration used a different plan")
    base = stratified_fit(plan, directory, inclusive, design, hashlib.sha256(raw).hexdigest())
    if score_path is None:
        return base
    if json.loads(score_path.read_bytes()) != base:
        raise ValueError("Frozen energy stratification does not reproduce")
    sources = {**plan, "files": {**plan["files"], **design["additionalFiles"]}}
    results = [score_one_stratified(plan, inclusive, design, base, acquisition(directory, sources, isotope), isotope)
               for isotope in design["scoreSources"]]
    return {"comparisonPlanSha256": base["comparisonPlanSha256"], "supportedBandIndices": base["supportedBandIndices"],
            "previouslyUnscoredSources": design["previouslyUnscoredSources"], "results": results,
            "authority": design["boundary"]}


def split_timestamp(events, fraction):
    if not 0 < fraction < 1:
        raise ValueError("Timing split fraction must be interior to the acquisition")
    time = events["Timestamp"]
    return int(time.min()) + int((int(time.max()) - int(time.min())) * fraction)


def paired_policies(plan, bands, pairs, offsets):
    unit = plan["timestampPicosecondsPerNanosecond"]
    narrow = plan["gateHalfWidthsNanoseconds"]
    wide = plan["delaySearchNanoseconds"]
    if max(abs(offsets)) + max(narrow) > wide:
        raise ValueError("A shifted narrow gate would leave the common wide reservoir")
    base = count_paired_bands(pairs, len(bands), [*narrow, wide], unit)
    shifted = count_paired_bands(pairs, len(bands), narrow, unit, offsets)
    return {"common": base, "bandCentered": shifted}


def fit_band_centers(plan, directory, strata, inclusive, design, design_pin):
    events = acquisition(directory, plan, "co60")
    detectors = inclusive["energyCalibration"]
    common = inclusive["cobaltTiming"][0]["centerNanoseconds"]
    bands = strata["lowerPulseEnergyBandStartsKeV"]
    split_at = split_timestamp(events, design["cobaltCenterTrainingTimeFraction"])
    primary = strata["primaryGateHalfWidthNanoseconds"]
    wide = plan["delaySearchNanoseconds"]
    unit = plan["timestampPicosecondsPerNanosecond"]

    training = paired_bands(plan, bands, energy_streams(events, detectors, end=split_at), common)
    validation = paired_bands(plan, bands, energy_streams(events, detectors, begin=split_at), common)
    sample = count_paired_bands(training, len(bands), [wide], unit)
    held = count_paired_bands(validation, len(bands), [wide], unit)
    count_floor = design["minimumNetWidePairsInEachCobaltSplit"]
    if count_floor <= 0:
        raise ValueError("The cobalt count floor must be positive")
    keep = [i for i, (first, second) in enumerate(zip(sample["netByGateAndBand"][0], held["netByGateAndBand"][0]))
            if min(first, second) >= count_floor]
    if not keep:
        raise ValueError("Cobalt has no supported bands in both chronological splits")
    grid = design["offsetCandidatesNanoseconds"]
    if not grid or 0 not in grid or max(map(abs, grid)) + max(plan["gateHalfWidthsNanoseconds"]) > wide:
        raise ValueError("Offset candidate violates the wide reference")
    trials = [{
        "offsetNanoseconds": offset,
        **count_paired_bands(training, len(bands), [primary], unit, np.full(len(bands), offset)),
    } for offset in grid]
    offsets = np.zeros(len(bands), dtype=int)
    for i in keep:
        best = max(trials, key=lambda row: (row["netByGateAndBand"][0][i], -abs(row["offsetNanoseconds"]),
                                            -row["offsetNanoseconds"]))
        offsets[i] = best["offsetNanoseconds"]
    return {
        "comparisonPlanSha256": design_pin,
        "cobaltCutTimestampPicoseconds": split_at,
        "supportedBandIndices": keep,
        "cobaltCommonCenterNanoseconds": common,
        "frozenOffsetsNanoseconds": offsets.tolist(),
        "earlyWideCounts": sample,
        "earlyTrainingTrials": trials,
        "lateCalibration": paired_policies(plan, bands, validation, offsets),
    }


def score_band_centers(plan, directory, strata, inclusive, frozen, source):
    events = acquisition(directory, plan, source)
    cut = split_timestamp(events, strata["mixtureTrainingTimeFraction"])
    bands = strata["lowerPulseEnergyBandStartsKeV"]
    detectors = inclusive["energyCalibration"]
    common = frozen["cobaltCommonCenterNanoseconds"]
    offsets = np.asarray(frozen["frozenOffsetsNanoseconds"])
    support = frozen["supportedBandIndices"]
    wide = plan["delaySearchNanoseconds"]

    early = subdivide(plan, bands, energy_streams(events, detectors, end=cut), common, [wide])
    before = np.asarray(early["netByGateAndBand"][0])[support]
    valid_weights = (before >= 0).all() and before.sum() > 0
    weights = before / before.sum() if valid_weights else None
    pairs = paired_bands(plan, bands, energy_streams(events, detectors, begin=cut), common)
    target = paired_policies(plan, bands, pairs, offsets)
    target_wide = np.asarray(target["common"]["netByGateAndBand"][-1])
    reference = np.asarray(frozen["lateCalibration"]["common"]["netByGateAndBand"][-1])[support]
    denominator = target_wide[support].sum()
    if denominator <= 0:
        raise ValueError("No net late pairs on common calibration support")
    gates = []
    for i, width in enumerate(plan["gateHalfWidthsNanoseconds"]):
        policies = {}
        for label in ("common", "bandCentered"):
            observed = np.asarray(target[label]["netByGateAndBand"][i])[support].sum() / denominator
            training = np.asarray(frozen["lateCalibration"][label]["netByGateAndBand"][i])[support]
            predicted = float((training / reference) @ weights) if weights is not None else None
            policies[label] = {"observed": float(observed), "forecast": predicted,
                               "absoluteError": abs(float(observed) - predicted) if predicted is not None else None}
        gates.append({"halfWidthNanoseconds": width, "retention": policies,
                      "observedCenteredMinusCommon": policies["bandCentered"]["observed"] -
                                                    policies["common"]["observed"]})
    return {"source": source, "cutTimestampPicoseconds": cut, "earlyWideCounts": early,
            "earlyWeights": weights.tolist() if weights is not None else None,
            "lateSupportedNetWidePairs": float(denominator), "lateAllNetWidePairs": float(target_wide.sum()),
            "lateCounts": target, "comparison": gates}


def center_inputs(plan, pin, directory, design_path):
    data = design_path.read_bytes()
    design = json.loads(data)
    strata_pin = design["strataPlan"]
    strata_path = design_path.with_name(strata_pin["file"])
    strata_bytes = strata_path.read_bytes()
    if hashlib.sha256(strata_bytes).hexdigest() != strata_pin["sha256"]:
        raise ValueError("Center comparison changed its pinned strata")
    strata = json.loads(strata_bytes)
    ref = strata["inclusiveCalibration"]
    inclusive = design_path.with_name(ref["file"]).read_bytes()
    if strata["referencePlanSha256"] != pin or hashlib.sha256(inclusive).hexdigest() != ref["sha256"]:
        raise ValueError("Center comparison changed the inclusive calibration or plan")
    inclusive = json.loads(inclusive)
    frozen = fit_band_centers(plan, directory, strata, inclusive, design, hashlib.sha256(data).hexdigest())
    files = {**plan["files"], **strata["additionalFiles"], **design["additionalFiles"]}
    return {**plan, "files": files}, strata, inclusive, design, frozen


def center_comparison(plan, pin, directory, design_path, score_path):
    sources, strata, inclusive, design, frozen = center_inputs(plan, pin, directory, design_path)
    if score_path is None:
        return frozen
    if json.loads(score_path.read_bytes()) != frozen:
        raise ValueError("Frozen band centers do not reproduce")
    results = [score_band_centers(sources, directory, strata, inclusive, frozen, source)
               for source in design["scoreSources"]]
    return {"comparisonPlanSha256": frozen["comparisonPlanSha256"],
            "previouslyUnscoredSources": design["previouslyUnscoredSources"],
            "commonCenterNanoseconds": frozen["cobaltCommonCenterNanoseconds"],
            "offsetsNanoseconds": frozen["frozenOffsetsNanoseconds"], "results": results, "authority": design["boundary"]}


def score_local_profile(plan, directory, strata, inclusive, frozen, source, minimum):
    events = acquisition(directory, plan, source)
    cut = split_timestamp(events, strata["mixtureTrainingTimeFraction"])
    bands = strata["lowerPulseEnergyBandStartsKeV"]
    center = frozen["cobaltCommonCenterNanoseconds"]
    offsets = np.asarray(frozen["frozenOffsetsNanoseconds"])
    detectors = inclusive["energyCalibration"]
    segments = {}
    for label, bounds in (("early", {"end": cut}), ("late", {"begin": cut})):
        pairs = paired_bands(plan, bands, energy_streams(events, detectors, **bounds), center)
        segments[label] = paired_policies(plan, bands, pairs, offsets)
    cobalt = frozen["lateCalibration"]
    early, late = segments["early"], segments["late"]
    early_wide = np.asarray(early["common"]["netByGateAndBand"][-1])
    late_wide = np.asarray(late["common"]["netByGateAndBand"][-1])
    support = [i for i in frozen["supportedBandIndices"] if early_wide[i] >= minimum]
    result = {"source": source, "cutTimestampPicoseconds": cut, "supportedBandIndices": support,
              "targetCounts": segments}
    if not support or late_wide[support].sum() <= 0:
        return {**result, "outcome": "insufficient-common-support"}
    early_total = early_wide[support].sum()
    late_total = late_wide[support].sum()
    cobalt_wide = np.asarray(cobalt["common"]["netByGateAndBand"][-1])[support]
    curves = []
    for gate, width in enumerate(plan["gateHalfWidthsNanoseconds"]):
        c, e, l = [np.asarray(part["bandCentered"]["netByGateAndBand"][gate])[support]
                   for part in (cobalt, early, late)]
        cobalt_band_retention = c / cobalt_wide
        cobalt_forecast = float(cobalt_band_retention @ (early_wide[support] / early_total))
        local_forecast = float(e.sum() / early_total)
        observed = float(l.sum() / late_total)
        # Late weights are diagnostic only. They are unavailable to either forecast.
        same_shape = float(cobalt_band_retention @ (late_wide[support] / late_total))
        curves.append({"halfWidthNanoseconds": width, "observed": observed,
                       "forecastFromCobalt": cobalt_forecast, "forecastFromEarlyTarget": local_forecast,
                       "cobaltForecastWithLateWeights": same_shape,
                       "cobaltAbsoluteError": abs(cobalt_forecast - observed),
                       "earlyTargetAbsoluteError": abs(local_forecast - observed),
                       "lateWithinBandNetResiduals": (l - cobalt_band_retention * late_wide[support]).tolist()})
    return {**result, "outcome": "scored", "lateSupportedNetWidePairs": float(late_total),
            "lateAllNetWidePairs": float(late_wide.sum()), "curve": curves}


def local_profile_inputs(plan, pin, directory, design_path):
    raw = design_path.read_bytes()
    design = json.loads(raw)
    center_path = design_path.with_name(design["centerPlan"]["file"])
    sources, strata, inclusive, _, frozen = center_inputs(plan, pin, directory, center_path)
    if frozen["comparisonPlanSha256"] != design["centerPlan"]["sha256"]:
        raise ValueError("Local profile comparison changed the center plan")
    calibration = design_path.with_name(design["centerCalibration"]["file"]).read_bytes()
    if (hashlib.sha256(calibration).hexdigest() != design["centerCalibration"]["sha256"]
            or json.loads(calibration) != frozen):
        raise ValueError("Local profile comparison changed the frozen centers")
    sources["files"].update(design["additionalFiles"])
    minimum = design["minimumEarlyTargetNetWidePairs"]
    if minimum <= 0:
        raise ValueError("Local profile comparison requires a positive early count floor")
    return sources, strata, inclusive, design, frozen, raw


def local_profile_comparison(plan, pin, directory, design_path):
    sources, strata, inclusive, design, frozen, raw = local_profile_inputs(plan, pin, directory, design_path)
    return {"comparisonPlanSha256": hashlib.sha256(raw).hexdigest(),
            "previouslyUnscoredSources": design["previouslyUnscoredSources"],
            "results": [score_local_profile(sources, directory, strata, inclusive, frozen, source,
                                            design["minimumEarlyTargetNetWidePairs"])
                        for source in design["scoreSources"]],
            "authority": design["boundary"]}


def signed_counts(pairs, band_offsets, edges, unit):
    """Bin signed residual delays on the common wide reservoir, including the tails."""
    band_count = len(band_offsets)
    bin_count = len(edges) + 1
    counts = []
    for delays_ps, band in pairs:
        residual = delays_ps - band_offsets[band] * unit
        bucket = np.searchsorted(edges * unit, residual, side="right")
        counts.append(np.bincount(band * bin_count + bucket, minlength=band_count * bin_count)
                      .reshape(band_count, bin_count))
    net = counts[0] - np.mean(counts[1:], axis=0)
    return {"promptByBandAndBin": counts[0].tolist(), "shiftedByControlBandAndBin": [x.tolist() for x in counts[1:]],
            "netByBandAndBin": net.tolist(), "netWideByBand": net.sum(axis=1).tolist()}


def profile_error(observed, predicted):
    return float(abs(observed - predicted).sum() / 2)


def signed_fraction(record, i):
    return np.asarray(record["netByBandAndBin"][i]) / record["netWideByBand"][i]


def signed_losses(observed, template, band):
    actual = signed_fraction(observed, band)
    return {shift: profile_error(actual, signed_fraction(record, band)) for shift, record in template.items()}


def best_translation(losses):
    return min(losses, key=lambda shift: (losses[shift], abs(shift), shift))


def signed_profile_blocks(plan, directory, strata, inclusive, frozen, design, source, section=slice(None)):
    events = acquisition(directory, plan, source)
    cut_points = [split_timestamp(events, f) for f in design["cutFractions"]]
    bounds = [None, *cut_points, None]
    energies = inclusive["energyCalibration"]
    center = frozen["cobaltCommonCenterNanoseconds"]
    offsets = np.asarray(frozen["frozenOffsetsNanoseconds"])
    bands = strata["lowerPulseEnergyBandStartsKeV"]
    edges = np.asarray(design["signedBinEdgesNanoseconds"])
    unit = plan["timestampPicosecondsPerNanosecond"]

    def counts(begin, end):
        pairs = paired_bands(plan, bands, energy_streams(events, energies, begin=begin, end=end), center)
        return signed_counts(pairs, offsets, edges, unit)

    intervals = list(zip(bounds, bounds[1:]))[section]
    return cut_points, [counts(begin, end) for begin, end in intervals]


def signed_profile_records(plan, directory, strata, inclusive, frozen, design, source):
    cut_points, (early, *blocks) = signed_profile_blocks(plan, directory, strata, inclusive, frozen, design, source)
    return cut_points, early, blocks


def score_signed_profiles(plan, directory, strata, inclusive, frozen, design, template, source):
    cut_points, early, blocks = signed_profile_records(plan, directory, strata, inclusive, frozen, design, source)
    result = evaluate_signed_profiles(early, blocks, frozen, design, template)
    return {"source": source, "cutTimestampsPicoseconds": cut_points, "earlyCounts": early, **result}


def evaluate_signed_profiles(early, late, frozen, design, template):
    fitted = {
        i: best_translation(signed_losses(early, template, i))
        for i in frozen["supportedBandIndices"]
        if early["netWideByBand"][i] >= design["minimumEarlyTargetNetWidePairs"]
    }
    blocks = []
    for observed in late:
        scores = []
        for i, best in fitted.items():
            if observed["netWideByBand"][i] >= design["minimumLateBlockNetWidePairs"]:
                lags = signed_losses(observed, template, i)
                oracle = best_translation(lags)
                scores.append({"bandIndex": i, "frozenCentersError": lags[0], "translationError": lags[best],
                               "earlyProfileError": profile_error(signed_fraction(observed, i), signed_fraction(early, i)),
                               "bestLateTranslationNanoseconds": oracle, "bestLateTranslationError": lags[oracle]})
        blocks.append({"counts": observed, "scores": scores})
    return {"translationsFitOnEarlyData": [{"bandIndex": i, "nanoseconds": shift} for i, shift in fitted.items()],
            "lateBlocks": blocks}


def signed_profile_inputs(plan, pin, directory, path):
    raw = path.read_bytes()
    design = json.loads(raw)
    reference = design["localProfilePlan"]
    ref_path = path.with_name(reference["file"])
    sources, strata, inclusive, local, frozen, local_raw = local_profile_inputs(plan, pin, directory, ref_path)
    if hashlib.sha256(local_raw).hexdigest() != reference["sha256"]:
        raise ValueError("Signed profile comparison changed its pinned local profile plan")
    cuts = design["cutFractions"]
    edges = np.asarray(design["signedBinEdgesNanoseconds"])
    shifts = design["translationCandidatesNanoseconds"]
    if (not cuts or cuts[0] != strata["mixtureTrainingTimeFraction"]
            or any(a >= b for a, b in zip(cuts, cuts[1:])) or cuts[-1] >= 1
            or not edges.size or not (np.diff(edges) > 0).all() or 0 not in shifts
            or max(abs(edges)) + max(map(abs, shifts)) + max(map(abs, frozen["frozenOffsetsNanoseconds"]))
            > plan["delaySearchNanoseconds"]):
        raise ValueError("Signed cuts or translations violate the frozen reference")
    if min(design["minimumEarlyTargetNetWidePairs"], design["minimumLateBlockNetWidePairs"]) <= 0:
        raise ValueError("Signed profiles require positive support floors")
    return sources, strata, inclusive, local, frozen, design, raw


def cobalt_signed_templates(sources, directory, strata, inclusive, frozen, design, pool):
    bands = strata["lowerPulseEnergyBandStartsKeV"]
    offsets = np.asarray(frozen["frozenOffsetsNanoseconds"])
    edges = np.asarray(design["signedBinEdgesNanoseconds"])
    shifts = design["translationCandidatesNanoseconds"]
    cobalt = acquisition(directory, sources, "co60")
    energies = inclusive["energyCalibration"]
    cut = frozen["cobaltCutTimestampPicoseconds"]
    center = frozen["cobaltCommonCenterNanoseconds"]
    held = paired_bands(sources, bands, energy_streams(cobalt, energies, begin=cut), center)
    reservoirs = {"late": held}
    if pool:
        early = paired_bands(sources, bands, energy_streams(cobalt, energies, end=cut), center)
        pooled = [(np.concatenate((early_delays, late_delays)), np.concatenate((early_bands, late_bands)))
                  for (early_delays, early_bands), (late_delays, late_bands) in zip(early, held)]
        reservoirs = {"early": early, "late": held, "pooled": pooled}
    unit = sources["timestampPicosecondsPerNanosecond"]
    templates = {label: {shift: signed_counts(pairs, offsets - shift, edges, unit) for shift in shifts}
                 for label, pairs in reservoirs.items()}
    expected_wide = frozen["lateCalibration"]["common"]["netByGateAndBand"][-1]
    if templates["late"][0]["netWideByBand"] != expected_wide:
        raise ValueError("Late signed reference changed its wide counts")
    for template in templates.values():
        if any(row["netWideByBand"] != template[0]["netWideByBand"] for row in template.values()):
            raise ValueError("Translation changed the common wide reference")
    return templates


def signed_profile_comparison(plan, pin, directory, path):
    sources, strata, inclusive, local, frozen, design, raw = signed_profile_inputs(plan, pin, directory, path)
    template = cobalt_signed_templates(sources, directory, strata, inclusive, frozen, design, pool=False)["late"]
    results = [score_signed_profiles(sources, directory, strata, inclusive, frozen, design, template, source)
               for source in local["scoreSources"]]
    return {"comparisonPlanSha256": hashlib.sha256(raw).hexdigest(), "cobaltTemplates": template,
            "results": results, "authority": design["boundary"]}


def reference_sensitivity(plan, pin, directory, path):
    raw = path.read_bytes()
    design = json.loads(raw)
    ref_plan = design["signedPlan"]
    ref_result = design["signedResult"]
    signed_path = path.with_name(ref_plan["file"])
    sources, strata, inclusive, local, frozen, signed, signed_raw = signed_profile_inputs(plan, pin, directory, signed_path)
    signed_pin = hashlib.sha256(signed_raw).hexdigest()
    evidence = path.with_name(ref_result["file"]).read_bytes()
    if signed_pin != ref_plan["sha256"] or hashlib.sha256(evidence).hexdigest() != ref_result["sha256"]:
        raise ValueError("Reference sensitivity changed its signed plan or evidence")
    prior = json.loads(evidence)
    templates = cobalt_signed_templates(sources, directory, strata, inclusive, frozen, signed, pool=True)
    if (prior["comparisonPlanSha256"] != signed_pin
            or {int(k): v for k, v in prior["cobaltTemplates"].items()} != templates["late"]):
        raise ValueError("The saved signed reference does not reproduce")

    half_checks = []
    for i in frozen["supportedBandIndices"]:
        late_losses = signed_losses(templates["late"][0], templates["early"], i)
        best = best_translation(late_losses)
        half_checks.append({"bandIndex": i, "unshiftedError": late_losses[0],
                            "bestEarlyTemplateShiftNanoseconds": best, "bestShiftError": late_losses[best]})

    results = []
    for source in prior["results"]:
        early = source["earlyCounts"]
        late = [b["counts"] for b in source["lateBlocks"]]
        scores = {}
        for label, template in templates.items():
            run = evaluate_signed_profiles(early, late, frozen, signed, template)
            if label == "late" and any(run[k] != source[k] for k in run):
                raise ValueError("The saved signed scores do not reproduce")
            scores[label] = {**run, "lateBlocks": [b["scores"] for b in run["lateBlocks"]]}
        results.append({"source": source["source"], "byCobaltReference": scores})
    return {"comparisonPlanSha256": hashlib.sha256(raw).hexdigest(),
            "unshiftedCobaltCounts": {label: t[0] for label, t in templates.items()},
            "earlyVersusLateCobalt": half_checks, "results": results, "authority": design["boundary"]}


def air_filter_metadata(design, directory):
    from air_filter_timing import run_metadata

    metadata = [run_metadata(run, directory, design["channels"]) for run in design["runs"]]
    if len(metadata) != 2 or metadata[0][0][1] >= metadata[1][0][0] or metadata[0][1] != metadata[1][1]:
        raise ValueError("Expected two separately started runs with matching settings")
    return metadata


def within_adc_rails(events, bounds):
    low, high = bounds
    return (events["Energy"] > low) & (events["Energy"] < high)


def air_filter_screen(plan, pin, directory, path):
    from air_filter_timing import load_pulses, read_pinned

    raw = path.read_bytes()
    design = json.loads(raw)
    if "originalPlan" in design:
        original = design["originalPlan"]
        original_result = design["originalScreen"]
        original_design = read_pinned(path, original)
        saved = read_pinned(path, original_result)
        if saved["comparisonPlanSha256"] != original["sha256"] or saved["outcome"] != "insufficient-wide-support":
            raise ValueError("Alternate screen requires the original support refusal")
        design = {**original_design, "channels": design["channels"], "boundary": design["boundary"]}
    if design["wideReferencePlanSha256"] != pin:
        raise ValueError("Air-filter screen changed the wide reference")
    channels = design["channels"]
    metadata = air_filter_metadata(design, directory)
    energy = metadata[0][2]
    bands = design["lowerPulseEnergyBandStartsKeV"]
    floor = design["minimumNetWidePairsPerRun"]
    if floor <= 0:
        raise ValueError("Air-filter screen requires a positive count floor")
    wide = plan["delaySearchNanoseconds"]
    results = []
    for run, (dates, _, _) in zip(design["runs"], metadata):
        events = load_pulses(run, design, directory)
        eligible = within_adc_rails(events, design["energyAdcExclusiveBounds"])
        singles = []
        for channel in channels:
            match = events["Channel"] == channel
            singles.append({"channel": channel, "recorded": int(match.sum()),
                            "acceptedWithoutAdcRails": int((match & eligible).sum())})
        sample = {name: values[eligible] for name, values in events.items()}
        streams = energy_streams(sample, energy)
        counts = subdivide(plan, bands, streams, 0, [wide])
        results.append({"run": run["id"], "runTimes": [dt.isoformat() for dt in dates],
                        "prefixTimestampSpanPicoseconds": int(events["Timestamp"].max()) - int(events["Timestamp"].min()),
                        "singles": singles, "wideCounts": counts})
    enough = [i for i in range(len(bands))
              if all(run["wideCounts"]["netByGateAndBand"][0][i] >= floor for run in results)]
    return {"comparisonPlanSha256": hashlib.sha256(raw).hexdigest(), "energyCalibration": energy,
            "runs": results, "supportedBandIndices": enough,
            "outcome": "supports-further-screening" if enough else "insufficient-wide-support",
            "authority": design["boundary"]}


def air_filter_pairs(plan, directory, sampling, run, energy, cuts, prefix_end, section=slice(None), center=0,
                     duration_picoseconds=None):
    from air_filter_timing import load_pulses

    events = load_pulses(run, sampling, directory)
    after_screen = (np.ones(events["Timestamp"].shape, dtype=bool) if prefix_end is None
                    else events["Timestamp"] > prefix_end)
    time = events["Timestamp"][after_screen]
    if not time.size:
        raise ValueError("Extended pulse sample has no time coverage after the screen")
    if duration_picoseconds is None:
        timestamps = [split_timestamp({"Timestamp": time}, fraction) for fraction in cuts]
    else:
        start = int(time.min())
        end = start + duration_picoseconds
        if end > time.max():
            raise ValueError("Pulse slice is shorter than its declared time window")
        after_screen &= events["Timestamp"] < end
        timestamps = [start + round(duration_picoseconds * fraction) for fraction in cuts]
        time = events["Timestamp"][after_screen]
    eligible = after_screen & np.isin(events["Channel"], sampling["channels"])
    if "energyAdcExclusiveBounds" in sampling:
        eligible &= within_adc_rails(events, sampling["energyAdcExclusiveBounds"])
    sample = {key: events[key][eligible] for key in ("Channel", "Energy", "Timestamp")}
    bounds = [None, *timestamps, None]
    bands = sampling["lowerPulseEnergyBandStartsKeV"]
    groups = []
    below_domain = 0
    for begin, end in list(zip(bounds, bounds[1:]))[section]:
        streams = []
        for times, kev in energy_streams(sample, energy, begin=begin, end=end):
            covered = kev >= bands[0]
            below_domain += int((~covered).sum())
            streams.append((times[covered], kev[covered]))
        groups.append(paired_bands(plan, bands, streams, center))
    coverage = {"firstTimestampPicoseconds": int(time.min()), "lastTimestampPicoseconds": int(time.max()),
                "excludedAtOrBeforeScreenEnd": len(after_screen) - len(time),
                "eligibleChannelPulsesBelowBandDomain": below_domain}
    return groups, timestamps, coverage


def air_filter_templates(plan, ref_pairs, band_count, eligible, minimum, signed):
    unit = plan["timestampPicosecondsPerNanosecond"]
    wide = plan["delaySearchNanoseconds"]
    step = plan["alignmentHistogramStepNanoseconds"]
    if minimum <= 0:
        raise ValueError("Air-filter reference requires a positive count floor")
    offsets = np.zeros(band_count, dtype=int)
    alignment_edges = np.arange(-wide + step, wide, step)
    alignment = signed_counts(ref_pairs, offsets, alignment_edges, unit)
    midpoints = np.arange(-wide + step // 2, wide, step)
    support = [i for i in eligible if alignment["netWideByBand"][i] >= minimum]
    edges = np.asarray(signed["signedBinEdgesNanoseconds"])
    shifts = signed["translationCandidatesNanoseconds"]
    for i in support:
        bins = alignment["netByBandAndBin"][i]
        best = max(range(len(midpoints)), key=lambda j: (bins[j], -abs(midpoints[j]), -midpoints[j]))
        offsets[i] = midpoints[best]
    if max(abs(offsets)) + max(abs(edges)) + max(map(abs, shifts)) > wide:
        raise ValueError("Signed bins would leave the zero-centered wide reference")
    template = {shift: signed_counts(ref_pairs, offsets - shift, edges, unit) for shift in shifts}
    if any(row["netWideByBand"] != alignment["netWideByBand"] for row in template.values()):
        raise ValueError("Translation changed the air-filter wide reference")
    return offsets, support, template


def air_filter_signed(plan, pin, directory, path):
    from air_filter_timing import extended_sampling, load_pulses, read_pinned

    raw = path.read_bytes()
    design = json.loads(raw)
    alternate = read_pinned(path, design["alternatePlan"])
    screened = read_pinned(path, design["alternateScreen"])
    signed = read_pinned(path, design["signedPlan"])
    scouting = read_pinned(path, design["originalPlan"])
    sampling = extended_sampling(path, design)
    sampling["channels"] = alternate["channels"]
    if (sampling["wideReferencePlanSha256"] != pin or alternate["originalPlan"] != design["originalPlan"]
            or screened["comparisonPlanSha256"] != design["alternatePlan"]["sha256"]
            or screened["outcome"] != "supports-further-screening"):
        raise ValueError("Air-filter signed analysis changed its screened inputs")
    metadata = air_filter_metadata(sampling, directory)
    energy = metadata[0][2]
    if energy != screened["energyCalibration"]:
        raise ValueError("Air-filter energy calibration changed")
    prefix_end = [int(load_pulses(run, scouting, directory)["Timestamp"].max()) for run in scouting["runs"]]

    reference, target = sampling["runs"]
    (ref_pairs,), _, ref_times = air_filter_pairs(plan, directory, sampling, reference, energy, [], prefix_end[0])
    band_count = len(sampling["lowerPulseEnergyBandStartsKeV"])
    offsets, support, template = air_filter_templates(plan, ref_pairs, band_count, screened["supportedBandIndices"],
                                                      design["minimumReferenceNetWidePairs"], signed)
    unit = plan["timestampPicosecondsPerNanosecond"]
    edges = np.asarray(signed["signedBinEdgesNanoseconds"])
    groups, cuts, target_times = air_filter_pairs(plan, directory, sampling, target, energy, signed["cutFractions"],
                                                  prefix_end[1])
    early, *late = [signed_counts(pairs, offsets, edges, unit) for pairs in groups]
    result = evaluate_signed_profiles(early, late, {"supportedBandIndices": support}, signed, template)
    return {"comparisonPlanSha256": hashlib.sha256(raw).hexdigest(),
            "referenceRun": reference["id"], "targetRun": target["id"],
            "referenceCoverage": ref_times, "targetCoverage": target_times, "screenEndTimestampsPicoseconds": prefix_end,
            "referenceCentersNanoseconds": offsets.tolist(),
            "supportedReferenceBandIndices": support, "referenceCounts": template[0],
            "targetCutTimestampsPicoseconds": cuts, "targetEarlyCounts": early, **result,
            "outcome": "scored" if any(b["scores"] for b in result["lateBlocks"]) else "insufficient-block-support",
            "authority": design["boundary"]}


def air_filter_transfer_context(pin, directory, path, design):
    from air_filter_timing import extended_sampling, read_pinned

    prior = read_pinned(path, design["priorPlan"])
    alternate = read_pinned(path, prior["alternatePlan"])
    signed = read_pinned(path, prior["signedPlan"])
    sampling = extended_sampling(path, prior)
    sampling["channels"] = alternate["channels"]
    if pin != sampling["wideReferencePlanSha256"]:
        raise ValueError("Held-out forecast changed the wide reference")
    return sampling, signed, air_filter_metadata(sampling, directory)


def freeze_air_filter_transfer(plan, directory, path, design, sampling, signed, metadata):
    from air_filter_timing import read_pinned

    result = read_pinned(path, design["priorResult"])
    if (result["comparisonPlanSha256"] != design["priorPlan"]["sha256"] or result["outcome"] != "scored"
            or [result["referenceRun"], result["targetRun"]] != [run["id"] for run in sampling["runs"]]
            or design["target"]["id"] in {result["referenceRun"], result["targetRun"]}):
        raise ValueError("Held-out forecast changed its prior evidence or run identities")
    energy = metadata[0][2]
    reference = sampling["runs"][0]
    (pairs,), _, _ = air_filter_pairs(plan, directory, sampling, reference, energy, [],
                                      result["screenEndTimestampsPicoseconds"][0])
    edges = np.asarray(signed["signedBinEdgesNanoseconds"])
    offsets = np.asarray(result["referenceCentersNanoseconds"])
    unit = plan["timestampPicosecondsPerNanosecond"]
    original = signed_counts(pairs, offsets, edges, unit)
    if original != result["referenceCounts"]:
        raise ValueError("Original reference counts changed")
    shifts = {row["bandIndex"]: row["nanoseconds"] for row in result["translationsFitOnEarlyData"]}
    bands = sorted({score["bandIndex"] for block in result["lateBlocks"] for score in block["scores"]})
    translated = offsets.copy()
    for band in bands:
        translated[band] -= shifts[band]
    shifted = signed_counts(pairs, translated, edges, unit)
    profiles = [{"bandIndex": i, "priorShiftNanoseconds": shifts[i], "netBinShares": {
        "unchangedReference": signed_fraction(original, i).tolist(),
        "translatedReference": signed_fraction(shifted, i).tolist(),
        "earlySecondRunProfile": signed_fraction(result["targetEarlyCounts"], i).tolist(),
    }} for i in bands]
    return {"priorResultSha256": design["priorResult"]["sha256"], "targetRun": design["target"]["id"],
            "favoredPolicy": design["favoredPolicy"], "referenceCentersNanoseconds": offsets.tolist(),
            "profiles": profiles}


def prepare_campaign_route(plan, pin, directory, path, design):
    from air_filter_timing import read_pinned, run_metadata

    prior = read_pinned(path, design["priorPlan"])
    replay = read_pinned(path, design["priorResult"])
    lesson = read_pinned(path, design["routingLesson"])
    if replay["comparisonPlanSha256"] != design["priorPlan"]["sha256"] or not lesson["heldBlocks"]:
        raise ValueError("Expected the local calibration and prior routing comparison")
    sampling, signed, metadata = air_filter_transfer_context(pin, directory, path, design)
    channels = sampling["channels"]
    energy = metadata[0][2]
    reference = sampling["runs"][0]
    if reference["id"] != replay["referenceRun"]:
        raise ValueError("Local reference run changed")
    (pairs,), _, coverage = air_filter_pairs(plan, directory, sampling, reference, energy, [],
                                             replay["screenEndTimestampsPicoseconds"][0])
    bands = sampling["lowerPulseEnergyBandStartsKeV"]
    offsets, support, templates = air_filter_templates(
        plan, pairs, len(bands), range(len(bands)), prior["minimumReferenceNetWidePairs"],
        {**signed, "translationCandidatesNanoseconds": [0]})
    reference_counts = templates[0]
    for band in replay["supportedReferenceBandIndices"]:
        if (offsets[band] != replay["referenceCentersNanoseconds"][band]
                or reference_counts["netByBandAndBin"][band] != replay["referenceCounts"]["netByBandAndBin"][band]):
            raise ValueError("Existing supported reference band changed")
    known = [row[0] for row in metadata]
    accepted = []
    checks = []
    for target in design["targets"]:
        dates, settings, target_energy = run_metadata(target, directory, channels)
        if settings != metadata[0][1] or target_energy != energy:
            status = "readout settings differ"
        elif any(dates[0] < end and start < dates[1] for start, end in known):
            status = "acquisition overlaps another run"
        else:
            status = "admitted"
            known.append(dates)
            accepted.append(target)
        checks.append({"source": target["id"], "runTimes": [t.isoformat() for t in dates], "status": status})
    result = {"referenceRun": reference["id"], "referenceCoverage": coverage, "energyCalibration": energy,
              "centersNanoseconds": offsets.tolist(), "supportedBands": support,
              "referenceCounts": reference_counts, "metadataChecks": checks, "admittedTargets": [r["id"] for r in accepted]}
    return result, sampling, signed


def campaign_pooled_comparison(plan, pin, directory, path, target_path, score_path):
    from air_filter_timing import campaign_sampling, read_pinned

    raw = path.read_bytes()
    design = json.loads(raw)
    sha = hashlib.sha256(raw).hexdigest()
    calibration, context, signed = prepare_campaign_route(plan, pin, directory, path, design)
    readiness = {"campaignPlanSha256": sha, **calibration}
    if target_path is None:
        return readiness
    target_bytes = target_path.read_bytes()
    receipt = json.loads(target_bytes)
    if (receipt["campaignPlan"]["sha256"] != sha
            or read_pinned(target_path, receipt["preparation"]) != readiness):
        raise ValueError("Frozen campaign calibration or settings decisions do not reproduce")
    sampling = campaign_sampling(target_path, receipt)
    sampling["channels"] = context["channels"]
    cuts = [0.1, 0.2, 0.3, *signed["cutFractions"]]
    offsets = np.asarray(calibration["centersNanoseconds"])
    edges = np.asarray(signed["signedBinEdgesNanoseconds"])
    unit = plan["timestampPicosecondsPerNanosecond"]
    floor = signed["minimumLateBlockNetWidePairs"]

    def observe(run, section):
        pairs, times, coverage = air_filter_pairs(plan, directory, sampling, run, calibration["energyCalibration"],
                                                 cuts, None, section)
        return times, coverage, [signed_counts(group, offsets, edges, unit) for group in pairs]

    frozen = []
    for run in sampling["runs"]:
        times, coverage, early = observe(run, slice(4))
        fit, validation = pooled_signed_counts(early[:2]), pooled_signed_counts(early[2:])
        choices = [choose_profile_route(fit, validation, signed_fraction(calibration["referenceCounts"], band), band, floor)
                   for band in calibration["supportedBands"]]
        frozen.append({"source": run["id"], "cutTimestampsPicoseconds": times, "coverage": coverage,
                       "earlyCounts": early, "routes": choices})
    locked = {"campaignPlanSha256": sha, "pulseReceiptSha256": hashlib.sha256(target_bytes).hexdigest(), "runs": frozen}
    if score_path is None:
        return locked
    if json.loads(score_path.read_bytes()) != locked:
        raise ValueError("Frozen pooled campaign choices do not reproduce")
    results = []
    for run, fixed in zip(sampling["runs"], frozen, strict=True):
        times, _, blocks = observe(run, slice(4, None))
        if times != fixed["cutTimestampsPicoseconds"]:
            raise ValueError("Target time cuts changed between freeze and score")
        held = [{"counts": block, "decisions": score_profile_routes(block, fixed["routes"], floor)} for block in blocks]
        scored = [row for block in held for row in block["decisions"] if "errors" in row]
        metrics = {"scoredBandBlocks": len(scored),
                   "supportsLocalFit": sum("local" in row["errors"] for row in scored),
                   "chosenLocal": sum(row["choice"] == "local" for row in scored)}
        if scored:
            error_samples = {
                "pooledRouting": [row["chosenError"] for row in scored],
                "alwaysReference": [row["errors"]["reference"] for row in scored],
                "localWhenSupported": [row["errors"].get("local", row["errors"]["reference"]) for row in scored],
            }
            metrics["medianErrors"] = {name: median(errors) for name, errors in error_samples.items()}
            metrics["meanErrors"] = {name: fmean(errors) for name, errors in error_samples.items()}
        results.append({"source": run["id"], "heldBlocks": held, "summary": metrics})
    return {"campaignPlanSha256": sha, "metadataChecks": readiness["metadataChecks"], "runs": results,
            "authority": design["boundary"]}


def shielded_run_metadata(directory, runs):
    from datetime import datetime
    from air_filter_timing import checked_bytes

    months = ("jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec")
    previous = None
    canonical = None
    report = []
    for run in runs:
        i = run["number"]
        info = checked_bytes(directory / f"shielded{i}.info", run["infoSha256"]).decode(errors="replace")
        values = dict(line.split(" = ", 1) for line in info.splitlines() if " = " in line)
        tag = f"<runId>background_{i}</runId>".encode()
        settings = checked_bytes(directory / f"shielded{i}.xml", run["settingsSha256"])
        if settings.count(tag) != 1 or values["Run ID"] != f"background_{i}":
            raise ValueError("Shielded metadata names a different acquisition")
        normalized = settings.replace(tag, b"<runId/>")
        if canonical is not None and normalized != canonical:
            raise ValueError("Shielded acquisitions do not have matching readout settings")
        canonical = normalized
        times = []
        for key in ("Start time", "Stop time"):
            _, month, day, clock, year = values[key].split()
            month_index = months.index(month) + 1
            times.append(datetime.strptime(f"{year}-{month_index}-{day} {clock}", "%Y-%m-%d %H:%M:%S"))
        if times[1] <= times[0] or (previous is not None and times[0] <= previous):
            raise ValueError("Shielded acquisitions overlap or have no duration")
        previous = times[1]
        report.append({"run": i, "role": run["role"], "times": [t.isoformat() for t in times]})
    return report


def fit_loss_choices(early, calibration, floor):
    routes = []
    for band in calibration["supportedBands"]:
        fixed = signed_fraction(calibration["referenceCounts"], band)
        raw = [part["netWideByBand"][band] for part in early]
        row = {"bandIndex": band, "earlyNetWidePairs": raw, "referenceBinShares": fixed.tolist(),
               "localBinShares": None, "meanChoice": "reference", "medianChoice": "reference"}
        if min(raw) < floor:
            routes.append({**row, "reason": "insufficient early block count"})
            continue
        fit = signed_fraction(early[0], band)
        actual = [signed_fraction(block, band) for block in early[1:]]
        errors = {"reference": [profile_error(x, fixed) for x in actual],
                  "local": [profile_error(x, fit) for x in actual]}
        local = signed_fraction(pooled_signed_counts(early), band)
        mean_choice = "local" if fmean(errors["local"]) < fmean(errors["reference"]) else "reference"
        median_choice = "local" if median(errors["local"]) < median(errors["reference"]) else "reference"
        routes.append({**row, "localBinShares": local.tolist(), "validationErrors": errors,
                       "meanChoice": mean_choice, "medianChoice": median_choice})
    return routes


def summarize_loss_choices(results):
    scores = {name: [] for name in ("meanRule", "medianRule", "alwaysReference", "localWhenSupported")}
    disagreements = 0
    for result in results:
        for block in result["heldBlocks"]:
            for mean_row, median_row in zip(block["mean"], block["median"], strict=True):
                if "errors" not in mean_row:
                    continue
                scores["meanRule"].append(mean_row["chosenError"])
                scores["medianRule"].append(median_row["chosenError"])
                reference = mean_row["errors"]["reference"]
                scores["alwaysReference"].append(reference)
                scores["localWhenSupported"].append(mean_row["errors"].get("local", reference))
                disagreements += int(mean_row["choice"] != median_row["choice"])
    return {"scoredBandBlocks": len(scores["meanRule"]), "heldDecisionDisagreements": disagreements,
            "errors": {name: {"mean": fmean(rows), "median": median(rows)} for name, rows in scores.items() if rows}}


def derive_fit_budget(path, design):
    from air_filter_timing import read_pinned

    previous = read_pinned(path, design["validationSource"])
    evidence = [{"source": run["source"], "bandIndex": row["bandIndex"],
                 "meanReferenceError": fmean(row["validationErrors"]["reference"])}
                for run in previous["runs"] for row in run["routes"] if "validationErrors" in row]
    if not evidence:
        raise ValueError("Fit budget requires recorded early validation reference losses")
    return {"minimumMeanGain": median(row["meanReferenceError"] for row in evidence), "evidence": evidence}


def gain_limited_routes(early, calibration, floor, threshold):
    routes = []
    for band in calibration["supportedBands"]:
        fixed = signed_fraction(calibration["referenceCounts"], band)
        support = [part["netWideByBand"][band] for part in early]
        route = {"bandIndex": band, "earlyNetWidePairs": support, "referenceBinShares": fixed.tolist(),
                 "localBinShares": None, "choice": "reference", "provisionalFit": False, "finalRefit": False}
        if min(support) < floor:
            routes.append({**route, "reason": "insufficient early block count"})
            continue
        actual = [signed_fraction(part, band) for part in early[1:]]
        reference_error = fmean(profile_error(row, fixed) for row in actual)
        if reference_error <= threshold:
            routes.append({**route, "meanReferenceError": reference_error,
                           "reason": "even zero local error would not clear the gain threshold"})
            continue
        fit = signed_fraction(early[0], band)
        local_error = fmean(profile_error(row, fit) for row in actual)
        switch = reference_error - local_error > threshold
        candidate = signed_fraction(pooled_signed_counts(early), band).tolist() if switch else None
        routes.append({**route, "meanReferenceError": reference_error, "meanLocalError": local_error,
                       "meanGain": reference_error - local_error, "provisionalFit": True, "finalRefit": switch,
                       "localBinShares": candidate, "choice": "local" if switch else "reference"})
    return routes


def blank_gain_comparison(plan, pin, directory, path, target_path, score_path):
    from air_filter_timing import blank_gain_sampling, read_pinned

    raw = path.read_bytes()
    design = json.loads(raw)
    sha = hashlib.sha256(raw).hexdigest()
    if design["wideReferencePlanSha256"] != pin:
        raise ValueError("Blank routing changed the wide reference")
    budget = {"gainPlanSha256": sha, **derive_fit_budget(path, design)}
    if target_path is None:
        return budget
    metadata = air_filter_metadata(design, directory)
    energy = metadata[0][2]
    signed = read_pinned(path, design["signedPlan"])
    edges = np.asarray(signed["signedBinEdgesNanoseconds"])
    unit = plan["timestampPicosecondsPerNanosecond"]
    target_bytes = target_path.read_bytes()
    receipt = json.loads(target_bytes)
    if receipt["gainPlan"]["sha256"] != sha or read_pinned(target_path, receipt["budget"]) != budget:
        raise ValueError("Frozen blank routing budget does not reproduce")
    ref_path = target_path.with_name(receipt["referencePulses"]["file"]) if "referencePulses" in receipt else target_path
    ref_receipt = read_pinned(target_path, receipt["referencePulses"]) if "referencePulses" in receipt else receipt
    if ref_receipt["source"] != design["runs"][0]["id"] or ref_receipt["gainPlan"]["sha256"] != sha:
        raise ValueError("Blank reference pulse source changed")
    bands = design["lowerPulseEnergyBandStartsKeV"]

    def observe(capture_path, capture, cuts, section):
        sampling = {**blank_gain_sampling(capture_path, capture), "channels": design["channels"],
                    "lowerPulseEnergyBandStartsKeV": bands,
                    "energyAdcExclusiveBounds": design["energyAdcExclusiveBounds"]}
        run, = sampling["runs"]
        return air_filter_pairs(plan, directory, sampling, run, energy, cuts, None, section)

    (pairs,), _, _ = observe(ref_path, ref_receipt, [], slice(None))
    offsets, support, templates = air_filter_templates(
        plan, pairs, len(bands), range(len(bands)), design["referenceNetWideFloor"],
        {**signed, "translationCandidatesNanoseconds": [0]})
    calibration = {"gainPlanSha256": sha, "referenceSource": ref_receipt["source"], "energyCalibration": energy,
                   "supportedBands": support, "centersNanoseconds": offsets.tolist(), "referenceCounts": templates[0]}
    if "referencePulses" not in receipt:
        return calibration
    if receipt["source"] != design["runs"][1]["id"] or read_pinned(target_path, receipt["calibration"]) != calibration:
        raise ValueError("Blank reference calibration or target source changed")
    cuts = design["cutFractions"]
    groups, timestamps, _ = observe(target_path, receipt, cuts, slice(4))
    early = [signed_counts(group, offsets, edges, unit) for group in groups]
    floor = signed["minimumLateBlockNetWidePairs"]
    routes = gain_limited_routes(early, calibration, floor, budget["minimumMeanGain"])
    locked = {"gainPlanSha256": sha, "pulseReceiptSha256": hashlib.sha256(target_bytes).hexdigest(),
              "target": receipt["source"], "cutTimestampsPicoseconds": timestamps, "earlyCounts": early,
              "minimumMeanGain": budget["minimumMeanGain"], "routes": routes}
    if score_path is None:
        return locked
    if json.loads(score_path.read_bytes()) != locked:
        raise ValueError("Frozen guarded routing does not reproduce")
    # Baseline diagnostics deliberately build fits the guarded policy skipped.
    unrestricted = fit_loss_choices(early, calibration, floor)
    choices = {"guarded": routes, **{policy: [{**row, "choice": row[f"{policy}Choice"]} for row in unrestricted]
                                    for policy in ("mean", "median")},
               "reference": [{**row, "choice": "reference"} for row in unrestricted]}
    groups, cuts_replayed, _ = observe(target_path, receipt, cuts, slice(4, None))
    if cuts_replayed != timestamps:
        raise ValueError("Blank target cut times changed")
    blocks = []
    for pairs in groups:
        counts = signed_counts(pairs, offsets, edges, unit)
        blocks.append({"counts": counts, **{key: score_profile_routes(counts, rows, floor)
                                             for key, rows in choices.items()}})
    work = {"guardedProvisionalFits": sum(row["provisionalFit"] for row in routes),
            "guardedFinalRefits": sum(row["finalRefit"] for row in routes),
            "unrestrictedProvisionalFits": sum("validationErrors" in row for row in unrestricted),
            "meanFinalRefits": sum(row["meanChoice"] == "local" for row in unrestricted),
            "medianFinalRefits": sum(row["medianChoice"] == "local" for row in unrestricted)}
    summary = {}
    for key in choices:
        errors = [row["chosenError"] for block in blocks for row in block[key] if "chosenError" in row]
        summary[key] = {"scored": len(errors), "mean": fmean(errors), "median": median(errors)} if errors else {"scored": 0}
    return {"gainPlanSha256": sha, "target": receipt["source"], "work": work, "summary": summary,
            "heldBlocks": blocks, "authority": design["boundary"]}


def replay_fit_budget(path):
    from air_filter_timing import read_pinned

    raw = path.read_bytes()
    design = json.loads(raw)
    budget = read_pinned(path, design["budget"])
    calibration = read_pinned(path, design["calibration"])
    early = read_pinned(path, design["early"])
    held = read_pinned(path, design["held"])
    signed = read_pinned(path, design["signedPlan"])
    if early["lossPlanSha256"] != calibration["lossPlanSha256"] or held["lossPlanSha256"] != early["lossPlanSha256"]:
        raise ValueError("Fit-budget replay inputs belong to different comparisons")
    floor = signed["minimumLateBlockNetWidePairs"]
    threshold = budget["minimumMeanGain"]
    results = []
    withheld = []
    for frozen, target in zip(early["runs"], held["results"], strict=True):
        if frozen["source"] != target["source"]:
            raise ValueError("Fit-budget replay aligned different target runs")
        routes = gain_limited_routes(frozen["earlyCounts"], calibration, floor, threshold)
        for row in routes:
            if not row["provisionalFit"] and "meanReferenceError" in row:
                withheld.append({"source": frozen["source"], "bandIndex": row["bandIndex"],
                                 "meanReferenceError": row["meanReferenceError"]})
        blocks = [score_profile_routes(block["counts"], routes, floor) for block in target["heldBlocks"]]
        results.append({"source": frozen["source"], "routes": routes, "held": blocks})
    rows = [row for run in results for block in run["held"] for row in block if "chosenError" in row]
    errors = [row["chosenError"] for row in rows]
    work = {"guardedProvisionalFits": sum(r["provisionalFit"] for run in results for r in run["routes"]),
            "unguardedProvisionalFits": sum("validationErrors" in r for run in early["runs"] for r in run["routes"]),
            "guardedFinalRefits": sum(r["finalRefit"] for run in results for r in run["routes"]),
            "meanFinalRefits": sum(r["meanChoice"] == "local" for run in early["runs"] for r in run["routes"]),
            "medianFinalRefits": sum(r["medianChoice"] == "local" for run in early["runs"] for r in run["routes"])}
    return {"replayPlanSha256": hashlib.sha256(raw).hexdigest(), "minimumMeanGain": threshold,
            "proofsOfSkippedFits": withheld, "work": work, "scoredBandBlocks": len(errors),
            "guardedErrors": {"mean": fmean(errors), "median": median(errors)} if errors else {},
            "unrestrictedErrors": held["summary"]["errors"], "authority": design["boundary"]}


def shielded_loss_comparison(plan, pin, directory, path, target_path, score_path):
    from air_filter_timing import read_pinned

    raw = path.read_bytes()
    design = json.loads(raw)
    sha = hashlib.sha256(raw).hexdigest()
    signed = read_pinned(path, design["signedPlan"])
    lesson = read_pinned(path, design["lossLesson"])
    if design["wideReferencePlanSha256"] != pin or not lesson["runs"]:
        raise ValueError("Expected the wide reference and prior loss comparison")
    metadata = shielded_run_metadata(directory, design["runs"])
    target_bytes = target_path.read_bytes()
    receipt = json.loads(target_bytes)
    if receipt["lossPlanSha256"] != sha:
        raise ValueError("Shielded pulse receipt belongs to another plan")
    reference_receipt = read_pinned(target_path, receipt["referencePulses"]) if "referencePulses" in receipt else receipt
    if reference_receipt["lossPlanSha256"] != sha:
        raise ValueError("Shielded reference receipt belongs to another plan")
    refs = [f"shielded{row['number']}" for row in design["runs"] if row["role"] == "reference"]
    targets = [f"shielded{row['number']}" for row in design["runs"] if row["role"] == "target"]
    files = reference_receipt["referenceFiles"]
    if set(files) != set(refs):
        raise ValueError("Reference receipt must cover the reference runs")
    sources = {**plan, "files": files}
    energy = [{"channel": chan, "offset": 0, "slope": 1} for chan in plan["measuredChannels"]]
    bands = design["bandStartsAdc"]
    by_run = []
    for source in refs:
        events = acquisition(directory, sources, source)
        by_run.append(paired_bands(plan, bands, energy_streams(events, energy), 0))
    pairs = [(np.concatenate([p[0] for p in group]), np.concatenate([p[1] for p in group])) for group in zip(*by_run)]
    offsets, support, templates = air_filter_templates(
        plan, pairs, len(bands), range(len(bands)), design["referenceNetWideFloor"],
        {**signed, "translationCandidatesNanoseconds": [0]})
    calibration = {"lossPlanSha256": sha, "metadataChecks": metadata, "referenceFiles": files,
                   "supportedBands": support, "centersNanoseconds": offsets.tolist(), "referenceCounts": templates[0]}
    if "referencePulses" not in receipt:
        return calibration
    if read_pinned(target_path, receipt["calibration"]) != calibration or set(receipt["targetFiles"]) != set(targets):
        raise ValueError("Frozen shielded reference or target roster changed")
    sources = {**plan, "files": receipt["targetFiles"]}
    strata = {"lowerPulseEnergyBandStartsKeV": bands}
    inclusive = {"energyCalibration": energy}
    frozen = {"cobaltCommonCenterNanoseconds": 0, "frozenOffsetsNanoseconds": offsets}
    block_plan = {**signed, "cutFractions": design["cutFractions"]}
    floor = signed["minimumLateBlockNetWidePairs"]
    runs = []
    for source in targets:
        cuts, early = signed_profile_blocks(sources, directory, strata, inclusive, frozen, block_plan, source, slice(4))
        runs.append({"source": source, "cutTimestampsPicoseconds": cuts, "earlyCounts": early,
                     "routes": fit_loss_choices(early, calibration, floor)})
    early_result = {"lossPlanSha256": sha, "pulseReceiptSha256": hashlib.sha256(target_bytes).hexdigest(), "runs": runs}
    if score_path is None:
        return early_result
    if json.loads(score_path.read_bytes()) != early_result:
        raise ValueError("Frozen shielded decisions do not reproduce")
    results = []
    for run in runs:
        cuts, late = signed_profile_blocks(sources, directory, strata, inclusive, frozen, block_plan, run["source"],
                                           slice(4, None))
        if cuts != run["cutTimestampsPicoseconds"]:
            raise ValueError("Shielded target cut times changed")
        blocks = []
        for counts in late:
            choices = {policy: score_profile_routes(
                counts, [{**route, "choice": route[f"{policy}Choice"]} for route in run["routes"]], floor)
                       for policy in ("mean", "median")}
            blocks.append({"counts": counts, **choices})
        results.append({"source": run["source"], "heldBlocks": blocks})
    return {"lossPlanSha256": sha, "results": results, "summary": summarize_loss_choices(results),
            "authority": design["boundary"]}


def carry_air_filter_forecast(directory, path, design, sampling, metadata):
    from air_filter_timing import read_pinned, run_metadata

    previous = read_pinned(path, design["carriedTransferPlan"])
    forecast = read_pinned(path, design["carriedForecast"])
    last_run = previous["target"]
    expected_ids = {run["id"] for run in sampling["runs"]} | {last_run["id"]}
    if (previous["priorPlan"] != design["priorPlan"] or previous["priorResult"] != design["priorResult"]
            or forecast["transferPlanSha256"] != design["carriedTransferPlan"]["sha256"]
            or forecast["priorResultSha256"] != previous["priorResult"]["sha256"]
            or forecast["targetRun"] != last_run["id"] or design["target"]["id"] in expected_ids
            or forecast["favoredPolicy"] != design["favoredPolicy"]):
        raise ValueError("Carried forecast does not match the previous transfer")
    previous_metadata = run_metadata(last_run, directory, sampling["channels"])
    if previous_metadata[0][0] <= metadata[-1][0][1] or previous_metadata[1:] != metadata[-1][1:]:
        raise ValueError("Previous holdout changed its run ordering or acquisition settings")
    carried = {k: forecast[k] for k in ("priorResultSha256", "favoredPolicy", "referenceCentersNanoseconds", "profiles")}
    return {**carried, "targetRun": design["target"]["id"],
            "carriedForecastSha256": design["carriedForecast"]["sha256"]}, previous_metadata


def air_filter_transfer(plan, pin, directory, path, score_path):
    from air_filter_timing import read_pinned, run_metadata

    raw = path.read_bytes()
    design = json.loads(raw)
    cuts = design["cutFractions"]
    limits = [0, *cuts, 1]
    if not cuts or any(left >= right for left, right in zip(limits, limits[1:])):
        raise ValueError("Expected increasing interior cuts for held-out blocks")
    sampling, signed, metadata = air_filter_transfer_context(pin, directory, path, design)
    last_run = metadata[-1]
    if "carriedForecast" in design:
        frozen, last_run = carry_air_filter_forecast(directory, path, design, sampling, metadata)
    else:
        frozen = freeze_air_filter_transfer(plan, directory, path, design, sampling, signed, metadata)
    forecast = {"transferPlanSha256": hashlib.sha256(raw).hexdigest(), **frozen}
    if score_path is None:
        return forecast
    evidence = score_path.read_bytes()
    receipt = json.loads(evidence)
    if (receipt["transferPlan"]["sha256"] != forecast["transferPlanSha256"]
            or read_pinned(score_path, receipt["frozenForecast"]) != forecast):
        raise ValueError("Frozen third-run forecasts do not reproduce")
    target = {**design["target"], "pulseSha256": receipt["targetPulseSha256"]}
    dates, settings, energy = run_metadata(target, directory, sampling["channels"])
    if dates[0] <= last_run[0][1] or settings != last_run[1] or energy != last_run[2]:
        raise ValueError("Held-out run overlaps prior runs or changes acquisition settings")
    groups, timestamps, coverage = air_filter_pairs(plan, directory, sampling, target, energy, cuts, None)
    offsets = np.asarray(forecast["referenceCentersNanoseconds"])
    edges = np.asarray(signed["signedBinEdgesNanoseconds"])
    unit = plan["timestampPicosecondsPerNanosecond"]
    blocks = []
    for pairs in groups:
        counts = signed_counts(pairs, offsets, edges, unit)
        scores = []
        for profile in forecast["profiles"]:
            i = profile["bandIndex"]
            if counts["netWideByBand"][i] >= signed["minimumLateBlockNetWidePairs"]:
                actual = signed_fraction(counts, i)
                errors = {label: profile_error(actual, np.asarray(expected))
                          for label, expected in profile["netBinShares"].items()}
                scores.append({"bandIndex": i, "errors": errors})
        blocks.append({"counts": counts, "scores": scores})
    summaries = []
    for profile in forecast["profiles"]:
        band = profile["bandIndex"]
        errors = [row["errors"] for block in blocks for row in block["scores"] if row["bandIndex"] == band]
        medians = {label: median(row[label] for row in errors) for label in profile["netBinShares"]} if errors else {}
        summaries.append({"bandIndex": band, "scoredBlocks": len(errors), "medianErrors": medians})
    return {**forecast, "targetPulseReceiptSha256": hashlib.sha256(evidence).hexdigest(),
            "targetCoverage": coverage, "targetCutTimestampsPicoseconds": timestamps, "targetBlocks": blocks,
            "summaries": summaries,
            "authority": design["boundary"]}


def derive_profile_reuse(path, design):
    from air_filter_timing import read_pinned

    prior = read_pinned(path, design["trainingTransferPlan"])
    scoped = read_pinned(path, design["trainingArrayPlan"])
    acquisition_plan = read_pinned(path, scoped["originalPlan"])
    if acquisition_plan["archive"] != design["trainingArchive"]:
        raise ValueError("Training archive changed")
    signed = read_pinned(path, design["signedPlan"])
    floor = signed["minimumLateBlockNetWidePairs"]
    cases = []
    common = None
    for item in design["trainingResults"]:
        result = read_pinned(path, item)
        if result["priorResultSha256"] != prior["priorResult"]["sha256"]:
            raise ValueError("Training runs used different reference provenance")
        medians = {}
        for profile in result["profiles"]:
            i = profile["bandIndex"]
            errors = []
            for block in result["targetBlocks"]:
                eligible = block["counts"]["netWideByBand"][i] >= floor
                rows = [row["errors"] for row in block["scores"] if row["bandIndex"] == i]
                if len(rows) != int(eligible):
                    raise ValueError("Training blocks changed the declared support rule")
                errors.extend(rows)
            if not errors:
                continue
            labels = profile["netBinShares"]
            medians[i] = {label: median(row[label] for row in errors) for label in labels}
        if not medians:
            raise ValueError("Training result has no supported evidence")
        best = {i: sorted(label for label, error in row.items() if error == min(row.values()))
                for i, row in medians.items()}
        for labels in best.values():
            common = set(labels) if common is None else common.intersection(labels)
        cases.append({"targetRun": result["targetRun"], "source": item, "medianErrorsByBand": [
            {"bandIndex": i, "errors": errors, "bestPolicies": best[i]} for i, errors in medians.items()]})
    if len({row["targetRun"] for row in cases}) != len(cases):
        raise ValueError("Duplicate target run in reuse training")
    return {"candidates": sorted(common or []), "trainingCases": cases,
            "origin": {"archive": design["trainingArchive"], "channels": scoped["channels"],
                       "referencePlan": design["trainingTransferPlan"], "favoredPolicy": prior["favoredPolicy"]},
            "applicability": {"minimumNetWidePairsPerBlock": floor, "numericProfileRequiresOriginalReadout": True},
            "authority": design["boundary"]}


def profile_reuse_comparison(plan, pin, directory, path, score_path):
    from air_filter_timing import read_pinned

    raw = path.read_bytes()
    design = json.loads(raw)
    proposal = {"proposalPlanSha256": hashlib.sha256(raw).hexdigest(), **derive_profile_reuse(path, design)}
    if score_path is None:
        return proposal
    if json.loads(score_path.read_bytes()) != proposal or proposal["candidates"] != ["unchangedReference"]:
        raise ValueError("Expected a reproducing unchanged-reference proposal")
    signed_pin = design["signedPlan"]
    read_pinned(path, signed_pin)
    sources, strata, inclusive, _, frozen, signed, _ = signed_profile_inputs(
        plan, pin, directory, path.with_name(signed_pin["file"]))
    if proposal["origin"]["archive"] == sources["dataset"]:
        raise ValueError("Expected a different acquisition archive")
    template = cobalt_signed_templates(sources, directory, strata, inclusive, frozen, signed, pool=False)["late"]
    floor = proposal["applicability"]["minimumNetWidePairsPerBlock"]
    results = []
    for source in design["holdoutSources"]:
        cuts, early, late = signed_profile_records(sources, directory, strata, inclusive, frozen, signed, source)
        adapted = evaluate_signed_profiles(early, late, frozen, signed, template)
        blocks = []
        for counts, saved in zip(late, adapted["lateBlocks"]):
            challengers = {row["bandIndex"]: row for row in saved["scores"]}
            decisions = []
            for i, wide in enumerate(counts["netWideByBand"]):
                eligible = i in frozen["supportedBandIndices"] and wide >= floor
                row = {"bandIndex": i, "netWidePairs": wide, "admitted": eligible}
                if eligible:
                    actual = signed_fraction(counts, i)
                    row["unchangedReferenceError"] = profile_error(actual, signed_fraction(template[0], i))
                    if i in challengers:
                        row["translationError"] = challengers[i]["translationError"]
                        row["earlyTargetProfileError"] = challengers[i]["earlyProfileError"]
                    else:
                        row["adaptationRefusal"] = "insufficient early target count"
                else:
                    row["refusal"] = ("band outside reference support" if i not in frozen["supportedBandIndices"]
                                      else "insufficient late block count")
                decisions.append(row)
            blocks.append({"counts": counts, "decisions": decisions})
        results.append({"source": source, "cutTimestampsPicoseconds": cuts,
                        "earlyCounts": early, "lateBlocks": blocks})
    return {"proposalPlanSha256": proposal["proposalPlanSha256"], "archive": sources["dataset"],
            "directNumericCarry": {"admitted": False, "reason": "different detector readout and reference archive",
                                   "originChannels": proposal["origin"]["channels"], "targetChannels": sources["measuredChannels"]},
            "unchangedLocalCalibration": template[0], "results": results, "authority": design["boundary"]}


def choose_profile_route(early, validation, fixed, band, floor):
    first = early["netWideByBand"][band]
    second = validation["netWideByBand"][band]
    route = {"bandIndex": band, "earlyNetWidePairs": [first, second], "referenceBinShares": fixed.tolist(),
             "localBinShares": None, "choice": "reference"}
    if min(first, second) < floor:
        return {**route, "reason": "insufficient support in an early block"}
    fit = signed_fraction(early, band)
    held = signed_fraction(validation, band)
    errors = {"reference": profile_error(held, fixed), "local": profile_error(held, fit)}
    pooled = (np.asarray(early["netByBandAndBin"][band]) + validation["netByBandAndBin"][band]) / (first + second)
    return {**route, "localBinShares": pooled.tolist(), "earlyValidationErrors": errors,
            "choice": "local" if errors["local"] < errors["reference"] else "reference"}


def score_profile_routes(block, routes, floor):
    decisions = []
    by_band = {route["bandIndex"]: route for route in routes}
    for band, wide in enumerate(block["netWideByBand"]):
        decision = {"bandIndex": band, "netWidePairs": wide}
        route = by_band.get(band)
        if route is None or wide < floor:
            decisions.append({**decision, "refusal": "no supported reference band" if route is None
                              else "insufficient held block count"})
            continue
        actual = signed_fraction(block, band)
        errors = {"reference": profile_error(actual, np.asarray(route["referenceBinShares"]))}
        if route["localBinShares"] is not None:
            errors["local"] = profile_error(actual, np.asarray(route["localBinShares"]))
        decisions.append({**decision, "choice": route["choice"], "errors": errors,
                          "chosenError": errors[route["choice"]]})
    return decisions


def profile_routing_comparison(plan, pin, directory, path, score_path):
    from air_filter_timing import read_pinned

    raw = path.read_bytes()
    design = json.loads(raw)
    prior = read_pinned(path, design["priorCandidate"])
    failure = read_pinned(path, design["priorChallenge"])
    if (prior["proposalPlanSha256"] != failure["proposalPlanSha256"]
            or prior["candidates"] != ["unchangedReference"]
            or failure["directNumericCarry"]["admitted"]):
        raise ValueError("Expected the previous unchanged-reference challenge")
    signed_ref = design["signedPlan"]
    read_pinned(path, signed_ref)
    sources, strata, inclusive, _, frozen, signed, _ = signed_profile_inputs(
        plan, pin, directory, path.with_name(signed_ref["file"]))
    if sources["dataset"] != failure["archive"]:
        raise ValueError("Routing demonstration changed its local reference archive")
    cut = design["earlyFitFraction"]
    if not 0 < cut < signed["cutFractions"][0]:
        raise ValueError("The early profile must be fit before its validation interval")
    blocks = {**signed, "cutFractions": [cut, *signed["cutFractions"]]}
    floor = signed["minimumLateBlockNetWidePairs"]
    reference = cobalt_signed_templates(sources, directory, strata, inclusive, frozen, signed, pool=False)["late"][0]
    candidates = []
    for source in design["sources"]:
        cuts, (early, validation) = signed_profile_blocks(sources, directory, strata, inclusive, frozen, blocks,
                                                         source, slice(2))
        routes = [choose_profile_route(early, validation, signed_fraction(reference, i), i, floor)
                  for i in frozen["supportedBandIndices"]]
        candidates.append({"source": source, "cutsPicoseconds": cuts, "fitCounts": early,
                           "validationCounts": validation, "routes": routes})
    draft = {"routingPlanSha256": hashlib.sha256(raw).hexdigest(), "sources": candidates,
             "newSignedProfileSources": design["newSignedProfileSources"]}
    if score_path is None:
        return draft
    if json.loads(score_path.read_bytes()) != draft:
        raise ValueError("Frozen early routing does not reproduce")
    results = []
    for run in candidates:
        cuts, late = signed_profile_blocks(sources, directory, strata, inclusive, frozen, blocks, run["source"],
                                           slice(2, None))
        if run["cutsPicoseconds"] != cuts:
            raise ValueError("Target time cuts changed after routing")
        results.append({"source": run["source"], "heldBlocks": [
            {"counts": block, "decisions": score_profile_routes(block, run["routes"], floor)} for block in late]})
    return {"routingPlanSha256": draft["routingPlanSha256"], "results": results, "authority": design["boundary"]}


def pooled_signed_counts(records):
    return {field: np.sum([record[field] for record in records], axis=0).tolist()
            for field in ("netWideByBand", "netByBandAndBin")}


def repeated_early_route(records, profile, floor):
    band = profile["bandIndex"]
    reference = np.asarray(profile["netBinShares"]["unchangedReference"])
    halves = [pooled_signed_counts(records[start:start + 2]) for start in (0, 2)]
    single = choose_profile_route(*halves, reference, band, floor)
    trials = [choose_profile_route(*records[start:start + 2], reference, band, floor) for start in (0, 2)]
    repeated = "local" if all(trial["choice"] == "local" for trial in trials) else "reference"
    return {**single, "repeatChoice": repeated,
            "disjointEarlyTrials": [
                {k: v for k, v in trial.items() if k in ("choice", "earlyNetWidePairs", "earlyValidationErrors", "reason")}
                for trial in trials]}


def air_filter_repeat_routing(plan, pin, directory, path, target_path, score_path):
    from air_filter_timing import read_pinned, run_metadata, transfer_sampling

    raw = path.read_bytes()
    design = json.loads(raw)
    source = read_pinned(path, design["carriedTransferPlan"])
    previous = read_pinned(path, design["carriedForecast"])
    lesson = read_pinned(path, design["routingLesson"])
    if (previous["transferPlanSha256"] != design["carriedTransferPlan"]["sha256"]
            or previous["targetRun"] != source["target"]["id"] or source["priorPlan"] != design["priorPlan"]
            or source["archivePrefix"] != design["archivePrefix"] or lesson["results"][-1]["source"] != "cs137"):
        raise ValueError("Repeat routing changed its reference or method provenance")
    target_bytes = target_path.read_bytes()
    receipt = json.loads(target_bytes)
    plan_sha = hashlib.sha256(raw).hexdigest()
    if receipt["transferPlan"]["sha256"] != plan_sha:
        raise ValueError("Target sample was captured for another routing plan")
    previous_sampling, signed, metadata = air_filter_transfer_context(pin, directory, path, source)
    channels = previous_sampling["channels"]
    previous_dates, previous_settings, _ = run_metadata(source["target"], directory, channels)
    sampling = transfer_sampling(target_path, receipt)
    sampling["channels"] = channels
    target, = sampling["runs"]
    dates, settings, energy = run_metadata(target, directory, channels)
    if dates[0] <= previous_dates[1] or settings != previous_settings or settings != metadata[-1][1]:
        raise ValueError("Repeat routing requires a later run on the same readout")
    cuts = [*design["firstFourCutFractions"], *signed["cutFractions"][1:]]
    if cuts[:4] != [0.1, 0.2, 0.3, signed["cutFractions"][0]]:
        raise ValueError("Repeat routing expects four equal early time blocks")
    offsets = np.asarray(previous["referenceCentersNanoseconds"])
    edges = np.asarray(signed["signedBinEdgesNanoseconds"])
    unit = plan["timestampPicosecondsPerNanosecond"]
    floor = signed["minimumLateBlockNetWidePairs"]
    groups, timestamps, coverage = air_filter_pairs(plan, directory, sampling, target, energy, cuts, None, slice(4))
    early = [signed_counts(pairs, offsets, edges, unit) for pairs in groups]
    choices = [repeated_early_route(early, profile, floor) for profile in previous["profiles"]]
    frozen = {"routingPlanSha256": plan_sha, "targetReceiptSha256": hashlib.sha256(target_bytes).hexdigest(),
              "targetRun": target["id"], "cutTimestampsPicoseconds": timestamps, "earlyCoverage": coverage,
              "earlyCounts": early, "routes": choices}
    if score_path is None:
        return frozen
    if json.loads(score_path.read_bytes()) != frozen:
        raise ValueError("Frozen repeat routing does not reproduce")
    if not choices:
        raise ValueError("Repeat routing has no frozen reference band")
    groups, cuts_replayed, late_coverage = air_filter_pairs(plan, directory, sampling, target, energy, cuts, None,
                                                           slice(4, None))
    if cuts_replayed != timestamps:
        raise ValueError("Target time cuts changed after repeat routing")
    late = []
    for pairs in groups:
        block = signed_counts(pairs, offsets, edges, unit)
        single = score_profile_routes(block, choices, floor)
        repeated = score_profile_routes(block, [{**row, "choice": row["repeatChoice"]} for row in choices], floor)
        late.append({"counts": block, "singleTrialDecisions": single, "repeatedTrialDecisions": repeated})
    return {"routingPlanSha256": plan_sha, "targetRun": target["id"],
            "heldCoverage": late_coverage, "heldBlocks": late, "authority": design["boundary"]}


def disagreement_screen_case(name, read_blocks, profiles, floor):
    cuts, early = read_blocks(slice(4))
    routes = []
    for profile in profiles:
        decision = repeated_early_route(early, profile, floor)
        if any("earlyValidationErrors" not in trial for trial in decision["disjointEarlyTrials"]):
            decision["screenOutcome"] = "insufficient early support"
        else:
            decision["screenOutcome"] = "disagreement" if decision["choice"] != decision["repeatChoice"] else "agreement"
        routes.append(decision)
    return {"source": name, "cutsPicoseconds": cuts, "earlyCounts": early, "routes": routes}


def score_disagreement(screen, readers, floor):
    picked = screen["selected"]
    if picked is None:
        return None
    test = next(case for case in screen["cases"] if case["source"] == picked["source"])
    route = next(row for row in test["routes"] if row["bandIndex"] == picked["bandIndex"])
    cuts, records = readers[picked["source"]](slice(4, None))
    if cuts != test["cutsPicoseconds"]:
        raise ValueError("Selected source changed its time partition")
    blocks = []
    for counts in records:
        band = route["bandIndex"]
        single = score_profile_routes(counts, [route], floor)[band]
        repeated = score_profile_routes(counts, [{**route, "choice": route["repeatChoice"]}], floor)[band]
        blocks.append({"counts": counts, "singleRule": single, "repeatRule": repeated})
    return {**picked, "heldBlocks": blocks}


def select_disagreement(cases):
    picked = next(({"source": case["source"], "bandIndex": row["bandIndex"]}
                   for case in cases for row in case["routes"] if row["screenOutcome"] == "disagreement"), None)
    return {"cases": cases, "selected": picked}


def profile_disagreement_comparison(plan, pin, directory, air_directory, path, target_path, score_path):
    from functools import partial
    from air_filter_timing import read_pinned, run_metadata, screen_sampling

    raw = path.read_bytes()
    design = json.loads(raw)
    evidence = target_path.read_bytes()
    pulse_receipt = json.loads(evidence)
    plan_sha = hashlib.sha256(raw).hexdigest()
    if pulse_receipt["screenPlan"]["sha256"] != plan_sha:
        raise ValueError("Air-filter pulses were captured for another screen")
    repeated_plan = read_pinned(path, design["repeatRoutePlan"])
    earlier = read_pinned(path, design["repeatRouteResult"])
    if earlier["routingPlanSha256"] != design["repeatRoutePlan"]["sha256"]:
        raise ValueError("Expected the earlier repeat-route result")
    field_plan = read_pinned(path, repeated_plan["carriedTransferPlan"])
    forecast = read_pinned(path, repeated_plan["carriedForecast"])
    if forecast["transferPlanSha256"] != repeated_plan["carriedTransferPlan"]["sha256"]:
        raise ValueError("The field-filter forecast does not match its transfer plan")
    prior, signed, metadata = air_filter_transfer_context(pin, air_directory, path, field_plan)
    floor = signed["minimumLateBlockNetWidePairs"]
    cuts = [*repeated_plan["firstFourCutFractions"], *signed["cutFractions"][1:]]
    offsets = np.asarray(forecast["referenceCentersNanoseconds"])
    edges = np.asarray(signed["signedBinEdgesNanoseconds"])
    unit = plan["timestampPicosecondsPerNanosecond"]
    sampling = screen_sampling(target_path, pulse_receipt)
    sampling["channels"] = prior["channels"]
    last_dates, settings, energy = run_metadata(repeated_plan["target"], air_directory, sampling["channels"])
    if (settings, energy) != metadata[-1][1:]:
        raise ValueError("The air-filter configuration changed from calibration")

    def air_reader(target, section):
        groups, timestamps, _ = air_filter_pairs(plan, air_directory, sampling, target, energy, cuts, None, section)
        return timestamps, [signed_counts(pairs, offsets, edges, unit) for pairs in groups]

    air_readers = {}
    for target in sampling["runs"]:
        dates, actual_settings, calibration = run_metadata(target, air_directory, sampling["channels"])
        if dates[0] <= last_dates[1] or actual_settings != settings or calibration != energy:
            raise ValueError("Air-filter samples changed settings or declared acquisition order")
        last_dates = dates
        air_readers[target["id"]] = partial(air_reader, target)
    air = select_disagreement([disagreement_screen_case(name, reader, forecast["profiles"], floor)
                               for name, reader in air_readers.items()])

    signed_ref = design["signedPlan"]
    read_pinned(path, signed_ref)
    sources, strata, inclusive, _, frozen, local_signed, _ = signed_profile_inputs(
        plan, pin, directory, path.with_name(signed_ref["file"]))
    template = cobalt_signed_templates(sources, directory, strata, inclusive, frozen, local_signed, pool=False)["late"][0]
    profiles = [{"bandIndex": i, "netBinShares": {"unchangedReference": signed_fraction(template, i).tolist()}}
                for i in frozen["supportedBandIndices"]]
    if local_signed["minimumLateBlockNetWidePairs"] != floor:
        raise ValueError("The two screens must use the same support floor")
    block_design = {**local_signed, "cutFractions": cuts}
    local_readers = {name: partial(signed_profile_blocks, sources, directory, strata, inclusive, frozen,
                                   block_design, name) for name in design["uppsalaSources"]}
    local = select_disagreement([disagreement_screen_case(name, reader, profiles, floor)
                                 for name, reader in local_readers.items()])
    frozen_screen = {"screenPlanSha256": plan_sha, "pulseReceiptSha256": hashlib.sha256(evidence).hexdigest(),
                     "freshAirFilter": air, "retrospectiveUppsala": local}
    if score_path is None:
        return frozen_screen
    if json.loads(score_path.read_bytes()) != frozen_screen:
        raise ValueError("Frozen disagreement screen does not reproduce")
    return {"screenPlanSha256": plan_sha, "freshAirFilter": score_disagreement(air, air_readers, floor),
            "retrospectiveUppsala": score_disagreement(local, local_readers, floor),
            "authority": design["boundary"]}


def early_margins(route):
    errors = [trial.get("earlyValidationErrors") for trial in route["disjointEarlyTrials"]]
    if all(row is not None for row in errors):
        return [row["reference"] - row["local"] for row in errors]
    return None


def fit_routing_tolerance(path, design):
    from air_filter_timing import read_pinned

    repeat = read_pinned(path, design["repeatFreeze"])
    screen = read_pinned(path, design["disagreementScreen"])
    if (repeat["routingPlanSha256"] != design["repeatRoutePlan"]["sha256"]
            or screen["screenPlanSha256"] != design["disagreementPlan"]["sha256"]):
        raise ValueError("Tolerance inputs changed their early-routing provenance")
    runs = [{"source": repeat["targetRun"], "routes": repeat["routes"]}, *screen["freshAirFilter"]["cases"]]
    prior_profile, = repeat["routes"]
    samples = []
    for run in runs:
        route, = run["routes"]
        margins = early_margins(route)
        if (margins is None or len(margins) != 2 or route["bandIndex"] != prior_profile["bandIndex"]
                or route["referenceBinShares"] != prior_profile["referenceBinShares"]):
            raise ValueError("Tolerance calibration requires matched, supported disjoint trials")
        samples.append({"source": run["source"], "margins": margins,
                        "absoluteMarginDifference": abs(margins[0] - margins[1])})
    if len({x["source"] for x in samples}) != len(samples) or any(x["source"] == design["target"]["id"] for x in samples):
        raise ValueError("Tolerance training and held target must use distinct runs")
    return {"training": samples, "medianAbsoluteMarginDifference": median(x["absoluteMarginDifference"] for x in samples)}


def allow_near_tie(route, tolerance):
    margins = early_margins(route)
    choice = route["repeatChoice"]
    if margins is not None and route["choice"] == "local" and max(margins) > 0 and min(margins) >= -tolerance:
        choice = "local"
    return {**route, "disjointMargins": margins, "tolerantChoice": choice}


def match_validation_fit(early, route, floor, tolerance):
    band = route["bandIndex"]
    shared = pooled_signed_counts(early[:2])
    profile = np.asarray(route["referenceBinShares"])
    trials = [choose_profile_route(shared, interval, profile, band, floor) for interval in early[2:]]
    choice = "local" if all(row["choice"] == "local" for row in trials) else "reference"
    evaluated = allow_near_tie(
        {"choice": route["choice"], "repeatChoice": choice, "disjointEarlyTrials": trials}, tolerance)
    return {"fitNetWidePairs": shared["netWideByBand"][band],
            "validationNetWidePairs": [row["earlyNetWidePairs"][1] for row in trials],
            "validationErrors": [row.get("earlyValidationErrors") for row in trials],
            "margins": evaluated["disjointMargins"], "choice": evaluated["tolerantChoice"]}


def proportional_totals(available, total):
    quotas = available * total / available.sum() if available.sum() else np.zeros(len(available))
    allocated = np.floor(quotas).astype(int)
    remainder = total - allocated.sum()
    order = np.argsort(-(quotas - allocated), kind="stable")
    allocated[order[:remainder]] += 1
    return allocated


def evaluate_thinned_fit(early, route, design, tolerance):
    band = route["bandIndex"]
    prompt = np.asarray([record["promptByBandAndBin"][band] for record in early[:2]])
    controls = np.asarray([[shift[band] for shift in record["shiftedByControlBandAndBin"]] for record in early[:2]])
    n_shifts = controls.shape[1]
    shared = route["matchedFit"]["fitNetWidePairs"]
    target = early[2]["netWideByBand"][band]
    if not 0 < target < shared:
        return {"refusal": "short fit does not have strictly smaller positive net support"}
    # Use one thinning fraction in expectation. Round the combined control count to the
    # nearest congruence class that retains the exact short-fit net count.
    target_units = round(target * n_shifts)
    residue = (-target_units) % n_shifts
    scaled_controls = controls.sum() * target / shared
    hi = min(controls.sum(), prompt.sum() * n_shifts - target_units)
    last = hi - (hi - residue) % n_shifts
    if residue > last:
        return {"refusal": "recorded pairs cannot reproduce the short fit net count"}
    retained_controls = int(np.clip(residue + n_shifts * round((scaled_controls - residue) / n_shifts), residue, last))
    retained_prompt = (target_units + retained_controls) // n_shifts
    prompt_sizes = proportional_totals(prompt.sum(axis=1), retained_prompt)
    control_rows = controls.reshape(-1, controls.shape[-1])
    control_sizes = proportional_totals(control_rows.sum(axis=1), retained_controls)
    rng = np.random.default_rng(design["seed"])
    draws = design["draws"]

    def sample(rows, sizes):
        return np.sum([rng.multivariate_hypergeometric(row, int(size), size=draws)
                       for row, size in zip(rows, sizes)], axis=0)

    fit = (sample(prompt, prompt_sizes) - sample(control_rows, control_sizes) / n_shifts) / target
    if not np.allclose(fit.sum(axis=1), 1):
        raise ValueError("Thinning changed the matched net support")
    reference = np.asarray(route["referenceBinShares"])
    legacy_loss = route["disjointEarlyTrials"][1]["earlyValidationErrors"]["local"]
    comparisons = []
    for block in early[2:]:
        observed = signed_fraction(block, band)
        fixed = profile_error(observed, reference)
        local = np.abs(fit - observed).sum(axis=1) / 2
        q05, midpoint, q95 = np.quantile(local, [0.05, 0.5, 0.95]).tolist()
        comparisons.append({"referenceError": fixed, "localErrorQuantiles": [q05, midpoint, q95],
                            "medianMargin": fixed - midpoint,
                            "drawsAtOrAboveLegacyFourthBlockError": int((local >= legacy_loss).sum())})
    margins = [row["medianMargin"] for row in comparisons]
    choice_input = {"choice": route["choice"], "repeatChoice": "local" if min(margins) > 0 else "reference",
                    "disjointEarlyTrials": [{"earlyValidationErrors":
                                              {"reference": row["referenceError"], "local": row["localErrorQuantiles"][1]}}
                                             for row in comparisons]}
    choice = allow_near_tie(choice_input, tolerance)["tolerantChoice"]
    return {"draws": draws, "seed": design["seed"], "fitNetWidePairs": float(target),
            "retainedPromptByTimeBlock": prompt_sizes.tolist(),
            "retainedControlsByTimeBlockAndShift": control_sizes.reshape(controls.shape[:2]).tolist(),
            "validation": comparisons, "legacyFourthBlockLocalError": legacy_loss, "choice": choice}


def segment_fit_resampling(groups, early, route, total_draws, seed, tolerance=None):
    from itertools import combinations

    band = route["bandIndex"]
    n = len(groups[0])
    target = early[2]["netWideByBand"][band]
    shared = route["matchedFit"]["fitNetWidePairs"]
    n_shifts = len(early[0]["shiftedByControlBandAndBin"])
    if len(groups) != 2 or any(len(group) != n for group in groups):
        raise ValueError("Expected two equal segment sets")
    if not 0 < target < shared:
        return {"refusal": "short fit lacks strictly smaller positive net support",
                "shortFitNetWidePairs": target, "sharedFitNetWidePairs": shared}
    keep = min(n - 1, max(1, round(n * target / shared)))
    subsets = np.asarray(list(combinations(range(n), keep)))
    group_bins = [np.asarray([part["netByBandAndBin"][band] for part in group]) for group in groups]
    choices = [counts[subsets].sum(axis=1) for counts in group_bins]
    nets = [np.rint(n_shifts * row.sum(axis=1)).astype(np.int64) for row in choices]
    second_order = np.argsort(nets[1], kind="stable")
    ordered = nets[1][second_order]
    wanted = round(target * n_shifts) - nets[0]
    lo = np.searchsorted(ordered, wanted, side="left")
    hi = np.searchsorted(ordered, wanted, side="right")
    cumulative = (hi - lo).cumsum()
    combinations_count = int(cumulative[-1])
    exclusions = []
    for group, full in zip(groups, early):
        prompt = sum(full["promptByBandAndBin"][band]) - sum(sum(p["promptByBandAndBin"][band]) for p in group)
        controls = [sum(full["shiftedByControlBandAndBin"][i][band]) -
                    sum(sum(p["shiftedByControlBandAndBin"][i][band]) for p in group)
                    for i in range(n_shifts)]
        if min([prompt, *controls]) < 0:
            raise ValueError("A segmented count exceeded its original fit block")
        exclusions.append({"promptPairs": prompt, "shiftedPairs": controls})
    result = {"segmentsPerFitBlock": n, "retainedPerFitBlock": keep, "matchedNetWidePairs": target,
              "boundaryExclusionsByFitBlock": exclusions,
              "segmentNetWidePairsByFitBlock": [bins.sum(axis=1).tolist() for bins in group_bins],
              "eligibleCombinations": combinations_count}
    if combinations_count == 0:
        return {**result, "refusal": "no segment combination has the exact short-fit count"}
    observed = signed_fraction(early[3], band)
    legacy = route["disjointEarlyTrials"][1]["earlyValidationErrors"]["local"]

    def fits_for(tickets):
        first = np.searchsorted(cumulative, tickets, side="right")
        offset = tickets - (cumulative[first] - (hi - lo)[first])
        second = second_order[lo[first] + offset]
        fit = (choices[0][first] + choices[1][second]) / target
        if not np.allclose(fit.sum(axis=1), 1):
            raise ValueError("Segment draws did not match the exact short-fit count")
        return fit, nets[0][first] / n_shifts

    tickets = np.random.default_rng(seed).integers(combinations_count, size=total_draws)
    fit, retained = fits_for(tickets)
    errors = np.abs(fit - observed).sum(axis=1) / 2
    result.update({"draws": total_draws, "legacyReaches": int((errors >= legacy).sum()),
                   "errorQuantiles": np.quantile(errors, [0.05, 0.5, 0.95]).tolist(),
                   "retainedFirstBlockNetQuantiles": np.quantile(retained, [0.05, 0.5, 0.95]).tolist()})
    if combinations_count <= total_draws:
        exact_fit, _ = fits_for(np.arange(combinations_count))
        exact = np.abs(exact_fit - observed).sum(axis=1) / 2
        result["enumeratedLegacyReaches"] = int((exact >= legacy).sum())
    if tolerance is not None:
        reference = np.asarray(route["referenceBinShares"])
        margins = []
        for block in early[2:4]:
            actual = signed_fraction(block, band)
            delta = profile_error(actual, reference) - np.median(np.abs(fit - actual).sum(axis=1) / 2)
            margins.append(float(delta))
        choose_local = min(margins) > 0 or (route["choice"] == "local" and max(margins) > 0
                                          and min(margins) >= -tolerance)
        result.update({"medianValidationMargins": margins, "choice": "local" if choose_local else "reference"})
    return result


def segment_fit_comparison(plan, pin, directory, path):
    from air_filter_timing import checked_bytes, read_pinned, tolerance_sampling

    raw = path.read_bytes()
    design = json.loads(raw)
    if design["draws"] <= 0:
        raise ValueError("Segment comparison requires positive draw count")
    signed_ref = design["signedPlan"]
    read_pinned(path, signed_ref)
    _, strata, inclusive, _, frozen, signed, _ = signed_profile_inputs(
        plan, pin, directory, path.with_name(signed_ref["file"]))
    histogram = read_pinned(path, design["histogramComparison"])
    edges = np.asarray(signed["signedBinEdgesNanoseconds"])
    offsets = np.asarray(frozen["frozenOffsetsNanoseconds"])
    center = frozen["cobaltCommonCenterNanoseconds"]
    unit = plan["timestampPicosecondsPerNanosecond"]
    early_cuts = [0.1, 0.2, 0.3, signed["cutFractions"][0]]
    result = []
    histograms = [histogram["retrospectiveThinning"], histogram["selectedThinning"]]
    for case, thin in zip(design["cases"], histograms, strict=True):
        prior = read_pinned(path, case["priorScreen"])
        target_path = path.with_name(case["pulses"]["file"])
        receipt = json.loads(checked_bytes(target_path, case["pulses"]["sha256"]))
        if prior["tolerancePlanSha256"] != receipt["tolerancePlan"]["sha256"]:
            raise ValueError("Segment input changed the selected case's pulse plan")
        pick = prior["selected"]
        original = next(w for w in prior["windows"] if w["entryStart"] == pick["entryStart"])
        route = next(row for row in original["routes"] if row["bandIndex"] == pick["bandIndex"])
        sample = next(w for w in tolerance_sampling(target_path, receipt) if w["entryStart"] == pick["entryStart"])
        run, = sample["runs"]
        sample["channels"] = sample["retainedChannels"]
        sample["lowerPulseEnergyBandStartsKeV"] = strata["lowerPulseEnergyBandStartsKeV"]

        def counts(cuts, section):
            parts, times, _ = air_filter_pairs(plan, directory, sample, run, inclusive["energyCalibration"],
                                              cuts, None, section, center)
            return times, [signed_counts(part, offsets, edges, unit) for part in parts]

        times, early = counts(early_cuts, slice(4))
        if times != original["cutTimestampsPicoseconds"][:4] or early != original["earlyCounts"]:
            raise ValueError("Selected early counts do not reproduce")
        band = route["bandIndex"]
        if thin["fitNetWidePairs"] != early[2]["netWideByBand"][band]:
            raise ValueError("Histogram comparison used another short-fit count")
        trials = []
        for n in design["segmentsPerEarlyFitBlock"]:
            if not 2 <= n <= 20:
                raise ValueError("Segment enumeration supports two to twenty segments per fit block")
            cuts = [(i / n) * 0.1 for i in range(1, 2 * n + 1)]
            ticks, groups = counts(cuts, slice(2 * n))
            if [ticks[n - 1], ticks[-1]] != times[:2]:
                raise ValueError("Pulse segments changed the two original fit boundaries")
            trials.append(segment_fit_resampling([groups[:n], groups[n:]], early, route,
                                                 design["draws"], design["seed"]))
        result.append({"run": run["id"], **pick, "shortFitError": thin["legacyFourthBlockLocalError"],
                       "sharedFitError": route["matchedFit"]["validationErrors"][1]["local"],
                       "histogramThinning": thin["validation"][1], "segmentResampling": trials})
    return {"planSha256": hashlib.sha256(raw).hexdigest(), "results": result, "authority": design["boundary"]}


def fit_background_tolerance(path, design):
    from air_filter_timing import read_pinned

    screen = read_pinned(path, design["disagreementScreen"])["retrospectiveUppsala"]
    sources = []
    for case in screen["cases"]:
        bands = []
        for route in case["routes"]:
            margins = early_margins(route)
            if margins is not None:
                first, second = margins
                bands.append({"bandIndex": route["bandIndex"], "trialMargins": margins,
                              "absoluteDifference": abs(first - second)})
        source_median = median(band["absoluteDifference"] for band in bands) if bands else None
        sources.append({"source": case["source"], "bands": bands, "medianAbsoluteDifference": source_median})
    established = [run["medianAbsoluteDifference"] for run in sources if run["medianAbsoluteDifference"] is not None]
    if not established or any(run["source"] == design["target"]["id"] for run in sources):
        raise ValueError("Expected supported prior margins from sources other than the background target")
    return {"trainingSources": sources, "tolerance": median(established)}


def background_tolerance_comparison(plan, pin, directory, path, target_path, score_path):
    from air_filter_timing import checked_bytes, read_pinned, tolerance_design, tolerance_sampling

    raw = path.read_bytes()
    declared = json.loads(raw)
    design = tolerance_design(path, declared)
    sha = hashlib.sha256(raw).hexdigest()
    if design["uppsalaReferencePlan"]["sha256"] != pin:
        raise ValueError("Background challenge changed its wide reference")
    if "calibrationPlan" in declared:
        original = read_pinned(path, declared["calibrationPlan"])
        calibration = read_pinned(path, declared["frozenCalibration"])
        reproduced = {"tolerancePlanSha256": declared["calibrationPlan"]["sha256"],
                      **fit_background_tolerance(path, original)}
        if (calibration != reproduced or design["target"]["id"] == original["target"]["id"]
                or any(row["source"] == design["target"]["id"] for row in calibration["trainingSources"])):
            raise ValueError("Carried background tolerance changed its provenance")
    else:
        calibration = {"tolerancePlanSha256": sha, **fit_background_tolerance(path, design)}
    if target_path is None:
        return calibration
    pulse_bytes = target_path.read_bytes()
    receipt = json.loads(pulse_bytes)
    if (receipt["tolerancePlan"]["sha256"] != sha
            or ("frozenCalibration" in declared and receipt["calibration"] != declared["frozenCalibration"])
            or read_pinned(target_path, receipt["calibration"]) != calibration):
        raise ValueError("Background tolerance does not reproduce")
    ref_settings, target_settings, info = (
        checked_bytes(directory / design[key]["file"], design[key]["sha256"])
        for key in ("referenceSettings", "targetSettings", "targetInfo"))
    run_id = design["target"]["id"].encode()
    run_tag = b"<runId>" + run_id + b"</runId>"
    if (b"Run ID = " + run_id not in info or target_settings.count(run_tag) != 1
            or target_settings.count(b"<timedRunEnabled>false</timedRunEnabled>") != 1):
        raise ValueError("Expected the declared untimed background acquisition")
    matched = target_settings.replace(run_tag, b"<runId>co60_600s</runId>", 1).replace(
        b"<timedRunEnabled>false</timedRunEnabled>", b"<timedRunEnabled>true</timedRunEnabled>", 1)
    if matched != ref_settings:
        raise ValueError("Background changes detector settings beyond its run ID and timed stop")
    signed_ref = design["signedPlan"]
    read_pinned(path, signed_ref)
    sources, strata, inclusive, _, frozen, signed, _ = signed_profile_inputs(
        plan, pin, directory, path.with_name(signed_ref["file"]))
    reference = cobalt_signed_templates(sources, directory, strata, inclusive, frozen, signed, pool=False)["late"][0]
    profiles = [{"bandIndex": i, "netBinShares": {"unchangedReference": signed_fraction(reference, i).tolist()}}
                for i in frozen["supportedBandIndices"]]
    cuts = [0.1, 0.2, 0.3, *signed["cutFractions"]]
    offsets = np.asarray(frozen["frozenOffsetsNanoseconds"])
    edges = np.asarray(signed["signedBinEdgesNanoseconds"])
    center = frozen["cobaltCommonCenterNanoseconds"]
    floor = signed["minimumLateBlockNetWidePairs"]
    unit = plan["timestampPicosecondsPerNanosecond"]
    windows = tolerance_sampling(target_path, receipt)
    thinned_fit = design.get("comparison") == "thinned-fit"
    segments = design.get("segmentRouting")
    matched_fit = thinned_fit or segments is not None or design.get("comparison") == "matched-fit"
    if segments is not None:
        lesson = read_pinned(path, design["segmentLesson"])
        n = segments["segmentsPerFitBlock"]
        duration = segments["segmentSeconds"] * n * 10 * 10**12
        if n != 16 or segments["draws"] <= 0 or segments["segmentSeconds"] <= 0 or not lesson["results"]:
            raise ValueError("Expected a fixed segment size and a prior segment diagnostic")
        segment_cuts = [(i / n) * 0.1 for i in range(1, 2 * n + 1)]

    def observe(window, section, boundaries=cuts):
        run, = window["runs"]
        selection = {**window, "channels": window["retainedChannels"],
                     "lowerPulseEnergyBandStartsKeV": strata["lowerPulseEnergyBandStartsKeV"]}
        fixed = {"duration_picoseconds": duration} if segments is not None else {}
        pairs, times, coverage = air_filter_pairs(plan, directory, selection, run, inclusive["energyCalibration"],
                                                 boundaries, None, section, center, **fixed)
        return times, coverage, [signed_counts(group, offsets, edges, unit) for group in pairs]

    screened = []
    for window in windows:
        times, coverage, early = observe(window, slice(4))
        routes = []
        for profile in profiles:
            route = allow_near_tie(repeated_early_route(early, profile, floor), calibration["tolerance"])
            if matched_fit:
                route["matchedFit"] = match_validation_fit(early, route, floor, calibration["tolerance"])
            routes.append(route)
        if segments is not None:
            ticks, _, groups = observe(window, slice(2 * n), segment_cuts)
            if [ticks[n - 1], ticks[-1]] != times[:2]:
                raise ValueError("Segment routing changed the original fit times")
            for route in routes:
                if route["disjointMargins"] is not None:
                    route["segmentFit"] = segment_fit_resampling(
                        [groups[:n], groups[n:]], early, route, segments["draws"], segments["seed"], calibration["tolerance"])
        screened.append({"entryStart": window["entryStart"], "cutTimestampsPicoseconds": times,
                         "coverage": coverage, "earlyCounts": early, "routes": routes})
    if any(a["coverage"]["lastTimestampPicoseconds"] >= b["coverage"]["firstTimestampPicoseconds"]
           for a, b in zip(screened, screened[1:])):
        raise ValueError("Background target windows overlap in time")
    compare_pooled = design.get("comparison") == "pooled-versus-veto"
    first_choice = "choice" if compare_pooled else "repeatChoice"
    first_label = "pooledRule" if compare_pooled else "strictRule"

    def qualifies(row):
        margins = row["disjointMargins"]
        if margins is None:
            return False
        if segments is not None:
            decision = row.get("segmentFit", {}).get("choice")
            return decision is not None and decision != row["choice"]
        if matched_fit or compare_pooled:
            return (row["choice"] == "local" and row["tolerantChoice"] == "reference"
                    and min(margins) < -calibration["tolerance"])
        return row["repeatChoice"] != row["tolerantChoice"]

    picked = next(((window, row) for window in screened for row in window["routes"] if qualifies(row)), None)
    selected = {"entryStart": picked[0]["entryStart"], "bandIndex": picked[1]["bandIndex"]} if picked else None
    screen = {"tolerancePlanSha256": sha, "pulseReceiptSha256": hashlib.sha256(pulse_bytes).hexdigest(),
              "tolerance": calibration["tolerance"], "windows": screened, "selected": selected}
    thinning = None
    if thinned_fit:
        earlier = read_pinned(path, design["earlierFitScreen"])
        if earlier["tolerance"] != calibration["tolerance"] or design["thinning"]["draws"] <= 0:
            raise ValueError("Thinning comparison changed the frozen method")
        previous = earlier["selected"]
        old_window = next(w for w in earlier["windows"] if w["entryStart"] == previous["entryStart"])
        old_route = next(r for r in old_window["routes"] if r["bandIndex"] == previous["bandIndex"])
        screen["retrospectiveThinning"] = evaluate_thinned_fit(
            old_window["earlyCounts"], old_route, design["thinning"], calibration["tolerance"])
        if picked:
            thinning = evaluate_thinned_fit(picked[0]["earlyCounts"], picked[1], design["thinning"],
                                            calibration["tolerance"])
        screen["selectedThinning"] = thinning
    if score_path is None:
        return screen
    if json.loads(score_path.read_bytes()) != screen:
        raise ValueError("Frozen background routing does not reproduce")
    result = {"tolerancePlanSha256": sha, "selected": selected, "heldBlocks": [], "authority": design["boundary"]}
    if picked is None:
        return result
    window, route = picked
    observed = next(w for w in windows if w["entryStart"] == window["entryStart"])
    times, _, late = observe(observed, slice(4, None))
    if times != window["cutTimestampsPicoseconds"]:
        raise ValueError("Selected background window changed time partition")
    band = route["bandIndex"]
    for block in late:
        if segments is not None:
            choices = {"pooledRule": route["choice"], "segmentRule": route["segmentFit"]["choice"]}
            scores = {label: score_profile_routes(block, [{**route, "choice": choice}], floor)[band]
                      for label, choice in choices.items()}
            result["heldBlocks"].append({"counts": block, **scores})
            continue
        if matched_fit:
            choices = {"pooledRule": route["choice"], "legacyVetoRule": route["tolerantChoice"],
                       "matchedFitRule": route["matchedFit"]["choice"]}
            if thinning and "choice" in thinning:
                choices["thinnedFitRule"] = thinning["choice"]
            scores = {label: score_profile_routes(block, [{**route, "choice": choice}], floor)[band]
                      for label, choice in choices.items()}
            result["heldBlocks"].append({"counts": block, **scores})
            continue
        baseline = score_profile_routes(block, [{**route, "choice": route[first_choice]}], floor)[band]
        tolerant = score_profile_routes(block, [{**route, "choice": route["tolerantChoice"]}], floor)[band]
        result["heldBlocks"].append({"counts": block, first_label: baseline, "tolerantRule": tolerant})
    return result


def tolerance_comparison(plan, pin, directory, path, target_path, score_path):
    from air_filter_timing import read_pinned, run_metadata, tolerance_design, tolerance_sampling

    raw = path.read_bytes()
    declared = json.loads(raw)
    design = tolerance_design(path, declared)
    sha = hashlib.sha256(raw).hexdigest()
    if "calibrationPlan" in declared:
        previous = declared["calibrationPlan"]
        source_plan = read_pinned(path, previous)
        calibration = read_pinned(path, declared["frozenCalibration"])
        reproduced = {"tolerancePlanSha256": previous["sha256"], **fit_routing_tolerance(path, source_plan)}
        if (calibration != reproduced or design["target"]["id"] == source_plan["target"]["id"]
                or any(row["source"] == design["target"]["id"] for row in calibration["training"])):
            raise ValueError("Carried tolerance changed its calibration or holdout provenance")
    else:
        calibration = {"tolerancePlanSha256": sha, **fit_routing_tolerance(path, design)}
    if target_path is None:
        return calibration
    pulse_bytes = target_path.read_bytes()
    receipt = json.loads(pulse_bytes)
    if (receipt["tolerancePlan"]["sha256"] != sha
            or ("frozenCalibration" in declared and receipt["calibration"] != declared["frozenCalibration"])
            or read_pinned(target_path, receipt["calibration"]) != calibration):
        raise ValueError("Frozen near-tie tolerance does not reproduce")
    repeated_plan = read_pinned(path, design["repeatRoutePlan"])
    prior_screen = read_pinned(path, design["disagreementPlan"])
    field_plan = read_pinned(path, repeated_plan["carriedTransferPlan"])
    reference = read_pinned(path, repeated_plan["carriedForecast"])
    prior, signed, metadata = air_filter_transfer_context(pin, directory, path, field_plan)
    channels = prior["channels"]
    previous_dates, settings, energy = run_metadata(prior_screen["airTargets"][-1], directory, channels)
    dates, current_settings, current_energy = run_metadata(design["target"], directory, channels)
    order = design.get("runOrder", "after-training")
    ordered = {"after-training": dates[0] > previous_dates[1],
               "historical-before-reference": dates[1] < metadata[0][0][0]}[order]
    if not ordered or (current_settings, current_energy) != (settings, energy) or (
            settings, energy) != metadata[-1][1:]:
        raise ValueError("Tolerance target changed acquisition order or settings")
    cuts = [*repeated_plan["firstFourCutFractions"], *signed["cutFractions"][1:]]
    offsets = np.asarray(reference["referenceCentersNanoseconds"])
    edges = np.asarray(signed["signedBinEdgesNanoseconds"])
    unit = plan["timestampPicosecondsPerNanosecond"]
    floor = signed["minimumLateBlockNetWidePairs"]
    windows = tolerance_sampling(target_path, receipt)

    def observe(window, section):
        run, = window["runs"]
        if window["retainedChannels"] != channels:
            raise ValueError("Pulse projection differs from the scoring channels")
        groups, times, coverage = air_filter_pairs(plan, directory, {**window, "channels": channels},
                                                  run, energy, cuts, None, section)
        return times, coverage, [signed_counts(pairs, offsets, edges, unit) for pairs in groups]

    windows_seen = []
    profile, = reference["profiles"]
    for window in windows:
        times, coverage, early = observe(window, slice(4))
        route = repeated_early_route(early, profile, floor)
        selected = allow_near_tie(route, calibration["medianAbsoluteMarginDifference"])
        windows_seen.append({"entryStart": window["entryStart"], "cutTimestampsPicoseconds": times,
                             "coverage": coverage, "earlyCounts": early, "route": selected})
    if any(left["coverage"]["lastTimestampPicoseconds"] >= right["coverage"]["firstTimestampPicoseconds"]
           for left, right in zip(windows_seen, windows_seen[1:])):
        raise ValueError("Held windows overlap in timestamp")
    supported = [window for window in windows_seen if window["route"]["disjointMargins"] is not None]
    changed = [window for window in supported if window["route"]["tolerantChoice"] != window["route"]["repeatChoice"]]
    candidates = changed
    selection = "changed choice" if changed else "no supported window"
    if supported and not changed:
        if "calibrationPlan" in declared:
            selection = "no changed choice"
        else:
            candidates = supported
            selection = "agreement control"
    chosen = candidates[0]["entryStart"] if candidates else None
    frozen = {"tolerancePlanSha256": sha, "pulseReceiptSha256": hashlib.sha256(pulse_bytes).hexdigest(),
              "targetRun": design["target"]["id"], "tolerance": calibration["medianAbsoluteMarginDifference"],
              "windows": windows_seen, "selectedEntryStart": chosen, "selection": selection}
    if score_path is None:
        return frozen
    if json.loads(score_path.read_bytes()) != frozen:
        raise ValueError("Frozen tolerance choices do not reproduce")
    result = {"tolerancePlanSha256": sha, "targetRun": frozen["targetRun"], "selectedEntryStart": chosen,
              "selection": frozen["selection"], "heldBlocks": [], "authority": design["boundary"]}
    if chosen is None:
        return result
    times, _, late = observe(next(window for window in windows if window["entryStart"] == chosen), slice(4, None))
    selected = candidates[0]
    if times != selected["cutTimestampsPicoseconds"]:
        raise ValueError("Selected tolerance window changed its time partition")
    route = selected["route"]
    band = route["bandIndex"]
    for block in late:
        strict = score_profile_routes(block, [{**route, "choice": route["repeatChoice"]}], floor)[band]
        tolerant = score_profile_routes(block, [{**route, "choice": route["tolerantChoice"]}], floor)[band]
        result["heldBlocks"].append({"counts": block, "strictRule": strict, "tolerantRule": tolerant})
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("plan", type=Path)
    parser.add_argument("directory", type=Path)
    action = parser.add_mutually_exclusive_group()
    action.add_argument("--score", type=Path, metavar="FROZEN_CALIBRATION")
    action.add_argument("--screen-full-energy", action="store_true")
    comparison = parser.add_mutually_exclusive_group()
    comparison.add_argument("--strata", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--band-centers", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--local-profile", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--signed-profile", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--reference-sensitivity", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--air-filter-screen", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--air-filter-signed", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--air-filter-transfer", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--profile-reuse", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--route-profile", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--repeat-air-filter-route", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--screen-route-disagreement", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--tie-aware-route", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--background-tie-aware-route", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--segment-fit", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--pooled-campaign", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--shielded-loss-routing", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--blank-gain-routing", type=Path, metavar="COMPARISON_PLAN")
    comparison.add_argument("--replay-fit-budget", type=Path, metavar="REPLAY_PLAN")
    parser.add_argument("--target-pulses", type=Path, metavar="PULSE_RECEIPT")
    parser.add_argument("--air-filter-directory", type=Path)
    args = parser.parse_args()
    data = args.plan.read_bytes()
    plan = json.loads(data)
    pin = hashlib.sha256(data).hexdigest()
    if args.replay_fit_budget:
        if args.target_pulses or args.score or args.screen_full_energy:
            parser.error("--replay-fit-budget reads its evidence from the replay plan")
        result = replay_fit_budget(args.replay_fit_budget)
    elif args.blank_gain_routing:
        if args.screen_full_energy or (args.score and args.target_pulses is None):
            parser.error("--blank-gain-routing needs a target pulse receipt to score")
        result = blank_gain_comparison(plan, pin, args.directory, args.blank_gain_routing, args.target_pulses, args.score)
    elif args.shielded_loss_routing:
        if args.screen_full_energy or args.target_pulses is None:
            parser.error("--shielded-loss-routing requires a reference or target pulse receipt")
        result = shielded_loss_comparison(plan, pin, args.directory, args.shielded_loss_routing,
                                          args.target_pulses, args.score)
    elif args.pooled_campaign:
        if args.screen_full_energy or (args.score and args.target_pulses is None):
            parser.error("--pooled-campaign uses signed bins and needs --target-pulses to score a freeze")
        result = campaign_pooled_comparison(plan, pin, args.directory, args.pooled_campaign, args.target_pulses, args.score)
    elif args.segment_fit:
        if args.target_pulses or args.score or args.screen_full_energy:
            parser.error("--segment-fit uses the pulse and early-score receipts pinned in the comparison plan")
        result = segment_fit_comparison(plan, pin, args.directory, args.segment_fit)
    elif args.background_tie_aware_route:
        if args.screen_full_energy or (args.score and args.target_pulses is None):
            parser.error("--background-tie-aware-route uses signed bins and needs --target-pulses to score a freeze")
        result = background_tolerance_comparison(plan, pin, args.directory, args.background_tie_aware_route,
                                                args.target_pulses, args.score)
    elif args.tie_aware_route:
        if args.screen_full_energy or (args.score and args.target_pulses is None):
            parser.error("--tie-aware-route uses signed bins and needs --target-pulses to score a freeze")
        result = tolerance_comparison(plan, pin, args.directory, args.tie_aware_route, args.target_pulses, args.score)
    elif args.screen_route_disagreement:
        if args.target_pulses is None or args.air_filter_directory is None or args.screen_full_energy:
            parser.error("--screen-route-disagreement needs --target-pulses and --air-filter-directory")
        result = profile_disagreement_comparison(plan, pin, args.directory, args.air_filter_directory,
                                                 args.screen_route_disagreement, args.target_pulses, args.score)
    elif args.repeat_air_filter_route:
        if args.target_pulses is None or args.screen_full_energy:
            parser.error("--repeat-air-filter-route requires --target-pulses and uses signed bins")
        result = air_filter_repeat_routing(plan, pin, args.directory, args.repeat_air_filter_route,
                                           args.target_pulses, args.score)
    elif args.target_pulses:
        parser.error("--target-pulses requires an air-filter routing comparison")
    elif args.route_profile:
        if args.screen_full_energy:
            parser.error("--route-profile cannot be combined with --screen-full-energy")
        result = profile_routing_comparison(plan, pin, args.directory, args.route_profile, args.score)
    elif args.profile_reuse:
        if args.screen_full_energy:
            parser.error("--profile-reuse cannot be combined with --screen-full-energy")
        result = profile_reuse_comparison(plan, pin, args.directory, args.profile_reuse, args.score)
    elif args.air_filter_transfer:
        if args.screen_full_energy:
            parser.error("--air-filter-transfer cannot be combined with --screen-full-energy")
        result = air_filter_transfer(plan, pin, args.directory, args.air_filter_transfer, args.score)
    elif args.air_filter_signed:
        if args.score or args.screen_full_energy:
            parser.error("--air-filter-signed reads its evidence from the comparison plan")
        result = air_filter_signed(plan, pin, args.directory, args.air_filter_signed)
    elif args.air_filter_screen:
        if args.score or args.screen_full_energy:
            parser.error("--air-filter-screen reads its evidence from the comparison plan")
        result = air_filter_screen(plan, pin, args.directory, args.air_filter_screen)
    elif args.reference_sensitivity:
        if args.score or args.screen_full_energy:
            parser.error("--reference-sensitivity reads its evidence from the comparison plan")
        result = reference_sensitivity(plan, pin, args.directory, args.reference_sensitivity)
    elif args.signed_profile:
        if args.score or args.screen_full_energy:
            parser.error("--signed-profile reads the frozen calibration from its comparison plan")
        result = signed_profile_comparison(plan, pin, args.directory, args.signed_profile)
    elif args.local_profile:
        if args.score or args.screen_full_energy:
            parser.error("--local-profile reads the frozen calibration from its comparison plan")
        result = local_profile_comparison(plan, pin, args.directory, args.local_profile)
    elif args.band_centers:
        if args.screen_full_energy:
            parser.error("--screen-full-energy cannot be combined with --band-centers")
        result = center_comparison(plan, pin, args.directory, args.band_centers, args.score)
    elif args.strata:
        if args.screen_full_energy:
            parser.error("--screen-full-energy cannot be combined with --strata")
        result = stratified_comparison(plan, pin, args.directory, args.strata, args.score)
    elif args.screen_full_energy:
        result = screen_full_energy(plan, pin, args.directory)
    elif args.score:
        result = score(plan, pin, args.directory, json.loads(args.score.read_bytes()))
    else:
        result = fit(plan, pin, args.directory)
    print(json.dumps(result, indent=2))
