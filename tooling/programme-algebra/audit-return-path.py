"""Compare first observed exit and final occupation in a sampled two-state trace."""

import argparse
import csv
import hashlib
import io
import json
import math
from pathlib import Path
from statistics import mean, pstdev
from zipfile import ZipFile


def classify(values, fit_count, half_width_fraction):
    calibration = values[:fit_count]
    ordered = sorted(calibration)
    low, high = ordered[len(ordered) // 4], ordered[3 * len(ordered) // 4]
    for _ in range(100):
        midpoint = (low + high) / 2
        below = [value for value in calibration if value < midpoint]
        above = [value for value in calibration if value >= midpoint]
        if not below or not above:
            raise ValueError("Calibration does not resolve two readout clusters")
        updated = mean(below), mean(above)
        if updated == (low, high):
            break
        low, high = updated
    else:
        raise ValueError("Readout calibration did not converge")

    gap = high - low
    half_width = gap * half_width_fraction
    state = int(values[0] >= midpoint)
    labels = []
    for value in values:
        if value < midpoint - half_width:
            state = 0
        elif value > midpoint + half_width:
            state = 1
        labels.append(state)
    return labels, {
        "centroids": [low, high],
        "withinClusterStandardDeviations": [pstdev(below), pstdev(above)],
        "thresholds": [midpoint - half_width, midpoint + half_width],
    }


def generator_rates(p01, p10, elapsed):
    if p01 + p10 >= 1:
        raise ValueError("Sampled transition matrix is incompatible with two constant continuous-time rates")
    total = -math.log1p(-p01 - p10) / elapsed
    exit_rate = total * p01 / (p01 + p10)
    return {"exitRatePerSecond": exit_rate, "returnRatePerSecond": total - exit_rate}


def fit_rates(states, step, lag=1):
    pairs = list(zip(states, states[lag:]))
    zero_to_one = pairs.count((0, 1))
    one_to_zero = pairs.count((1, 0))
    started_low = states[:-lag].count(0)
    started_high = len(pairs) - started_low
    if not zero_to_one or not one_to_zero:
        raise ValueError("Both transition directions must appear in calibration")
    p01 = zero_to_one / started_low
    p10 = one_to_zero / started_high
    return {
        "lowToHighTransitions": zero_to_one, "highToLowTransitions": one_to_zero,
        "lowStarts": started_low, "highStarts": started_high,
        "sampledLowToHigh": p01, "sampledHighToLow": p10,
        **generator_rates(p01, p10, step * lag),
    }


def predict(rates, duration, steps):
    exit_rate = rates["exitRatePerSecond"]
    total = exit_rate + rates["returnRatePerSecond"]
    absorbing_exit = -math.expm1(-exit_rate * duration)
    first_seen = -math.expm1(steps * math.log1p(-rates["sampledLowToHigh"]))
    endpoint = (exit_rate / total) * -math.expm1(-total * duration)
    return {
        "absorbingContinuousExit": absorbing_exit,
        "reversibleContinuousFirstExit": absorbing_exit,
        "reversibleFirstObservedExit": first_seen,
        "reversibleHighEndpoint": endpoint,
        "reversibleObservedDepartureThenLow": first_seen - endpoint,
    }


def score(primary, secondary, start, steps, initial=0):
    starts = departures = changed_endpoints = returned = corroborated = witnessed_both = 0
    returned_windows = []
    for index in range(start, len(primary) - steps, steps + 1):
        if primary[index] != initial:
            continue
        starts += 1
        end = index + steps
        primary_departed = any(state != initial for state in primary[index + 1:end + 1])
        departures += primary_departed
        changed_endpoints += primary[end] != initial
        if primary_departed and primary[end] == initial:
            returned += 1
            if secondary is None:
                departure = next(k for k in range(index + 1, end) if primary[k] != initial)
                return_sample = next(k for k in range(departure + 1, end + 1) if primary[k] == initial)
                returned_windows.append({
                    "start": index, "firstDeparture": departure, "firstReturn": return_sample, "endpoint": end
                })
            elif secondary[index] == initial and secondary[end] == initial and any(
                state != initial for state in secondary[index + 1:end]
            ):
                corroborated += 1
                witnessed_both += any(a == b and a != initial for a, b in zip(
                    primary[index + 1:end], secondary[index + 1:end],
                ))
    if secondary is None:
        return {
            "startWindows": starts,
            "firstObservedExits": departures,
            "changedEndpoints": changed_endpoints,
            "observedDepartureThenInitialEndpoint": returned,
            "firstObservedExitFraction": departures / starts if starts else None,
            "changedEndpointFraction": changed_endpoints / starts if starts else None,
            "returnWitnesses": returned_windows,
        }
    if not starts:
        raise ValueError("No held-out window starts in the low state")
    return {
        "lowStartWindows": starts, "firstObservedExits": departures,
        "highEndpoints": changed_endpoints, "observedDepartureThenLow": returned,
        "returnedOnBothChannels": corroborated,
        "returnedWithSimultaneousHighOnBothChannels": witnessed_both,
        "firstObservedExitFraction": departures / starts, "highEndpointFraction": changed_endpoints / starts,
    }


def select_interval(rows, selection, bias):
    start = selection["startSample"]
    stop = start + selection["sampleCount"]
    if not 0 <= start < stop <= len(rows):
        raise ValueError("Selected interval is outside the trace")
    selected = rows[start:stop]
    columns = ("Bias (V)", "X (m)", "Y (m)", "Z (m)")
    settings = {tuple(float(row[column]) for column in columns) for row in selected}
    if len(settings) != 1:
        raise ValueError("Sampled bias or tip position changed within the selected interval")
    setting = dict(zip(columns, settings.pop()))
    if setting["Bias (V)"] != bias:
        raise ValueError("Sampled bias differs from the plan")
    return selected, {**selection, "fixedSampledSettings": setting}


def transition_counts(labels):
    return {
        "lowToHigh": sum(a == 0 and b == 1 for a, b in zip(labels, labels[1:])),
        "highToLow": sum(a == 1 and b == 0 for a, b in zip(labels, labels[1:])),
    }


def audit_decoded(plan, plan_hash, archive_path):
    trace = plan["trace"]
    with ZipFile(archive_path) as archive:
        member = archive.read(trace["member"])
    trace_hash = hashlib.sha256(member).hexdigest()
    if trace_hash != trace["sha256"]:
        raise ValueError("Trace differs from the analysis plan")
    rows = list(csv.DictReader(io.StringIO(member.decode("utf-8"))))
    times = [float(row[trace["timeColumn"]]) for row in rows]
    values = [float(row[trace["stateColumn"]]) for row in rows]
    step = trace["samplePeriodSeconds"]
    if len(times) < 2 or not all(math.isclose(b - a, step, abs_tol=1e-9) for a, b in zip(times, times[1:])):
        raise ValueError("Trace timestamps must follow the declared sampling grid")
    levels = sorted(set(values))
    if len(levels) != 2 or not all(map(math.isfinite, levels)):
        raise ValueError("Exactly two finite author-decoded levels are required")
    labels = [int(value == levels[1]) for value in values]
    windows = []
    for steps in plan["design"]["windowSteps"]:
        if not 0 < steps < len(labels):
            raise ValueError("Window must fit the released trace")
        windows.append({
            "steps": steps,
            "durationSeconds": steps * step,
            "byStartingLevel": [
                {"level": value, **score(labels, None, 0, steps, initial)}
                for initial, value in enumerate(levels)
            ],
        })
    primary_steps = plan["design"]["primaryWindowSteps"]
    primary = next((window for window in windows if window["steps"] == primary_steps), None)
    if primary is None:
        raise ValueError("Primary window must be among the scored horizons")
    witnesses = sum(level["observedDepartureThenInitialEndpoint"] for level in primary["byStartingLevel"])
    return {
        "evidenceFamily": plan["evidenceFamily"],
        "planSha256": plan_hash,
        "traceSha256": trace_hash,
        "samples": len(labels),
        "traceSeconds": times[-1] - times[0],
        "fullTraceTransitions": transition_counts(labels),
        "windows": windows,
        "eventIdentityChallenge": {
            "substitution": "Use first observed exit as a measurement of changed endpoint.",
            "primaryWindowSteps": primary_steps,
            "counterexamples": witnesses,
            "status": "rejected-on-decoded-trace" if witnesses else "unresolved",
            "reuseBoundary": "Require an absorbing exit before treating the two event types as identical.",
            "candidateOperation": {
                "inputType": "ordered-resolved-state-observations",
                "outputTypes": ["first-observed-exit-frequency", "changed-endpoint-frequency"],
                "conditions": ["known initial state per window", "time-aligned, contiguous state samples"],
                "calculation": "Count any sampled departure and a changed last sample separately, with the same denominator."
            }
        },
        "authority": plan["design"]["limits"],
    }


def load_native_iq(plan, directory, replicate):
    import numpy as np

    settings = plan["settingsEvidence"]
    timestamp = settings["rowTimestamps"][replicate]
    name = f"ID_{settings['runId']}_IQ_{timestamp}.npy"
    raw = (directory / name).read_bytes()
    times, signal = np.load(io.BytesIO(raw), allow_pickle=False)
    if not (times.ndim == signal.ndim == 1 and times.size == signal.size and
            np.isfinite(times).all() and np.isfinite(signal).all() and not times.imag.any()):
        raise ValueError("Expected aligned, finite I/Q values and real timestamps")
    differences = np.diff(times.real)
    step = float(differences[0])
    if step <= 0 or not np.allclose(differences, step, rtol=1e-6, atol=0):
        raise ValueError("I/Q time axis is not uniformly sampled")
    return signal, step, {
        "replicateIndex": replicate,
        "file": name,
        "sha256": hashlib.sha256(raw).hexdigest(),
        "rawSamples": int(times.size),
    }


def load_iq(plan, directory, replicate):
    import numpy as np

    signal, step, pin = load_native_iq(plan, directory, replicate)
    width = plan["design"]["rawSamplesPerBin"]
    bins = signal.size // width
    averaged = signal[:bins * width].reshape(bins, width).mean(axis=1)
    return np.column_stack((averaged.real, averaged.imag)), width * step, {**pin, "binnedSamples": bins}


def iq_calibration(plan, plan_hash, directory):
    import numpy as np

    design = plan["design"]
    values, step, acquisition = load_iq(plan, directory, design["calibrationReplicateIndex"])
    _, axes = np.linalg.eigh(np.cov(values, rowvar=False))
    axis = axes[:, -1].copy()
    if axis[np.argmax(np.abs(axis))] < 0:
        axis *= -1
    projected = values @ axis
    _, fit = classify(projected.tolist(), len(projected), 0)
    midpoint = fit["thresholds"][0]
    pooled_sd = math.sqrt(mean(sd**2 for sd in fit["withinClusterStandardDeviations"]))
    separation = (fit["centroids"][1] - fit["centroids"][0]) / pooled_sd
    if separation < design["calibrationMinimumSeparationInPooledStandardDeviations"]:
        raise ValueError(f"Calibration does not resolve two I/Q states: separation {separation:.3g}")
    states = (projected > midpoint).astype(int).tolist()
    return {
        "evidenceFamily": plan["evidenceFamily"],
        "planSha256": plan_hash,
        "acquisition": acquisition,
        "binnedSamplePeriodSeconds": step,
        "decoder": {"axis": axis.tolist(), "threshold": midpoint, "centroidSeparationInPooledSD": separation, **fit},
        "ratesByStartingLevel": [fit_rates(states, step), fit_rates([1 - state for state in states], step)],
    }


def iq_score_projected(plan, directory, calibration, replicates):
    step = calibration["binnedSamplePeriodSeconds"]
    decoder = calibration["decoder"]
    seen = {calibration["acquisition"]["sha256"]}
    for replicate in replicates:
        values, observed_step, source = load_iq(plan, directory, replicate)
        if source["sha256"] in seen or not math.isclose(step, observed_step, rel_tol=1e-9):
            raise ValueError("Expected a distinct trace on the frozen calibration time grid")
        seen.add(source["sha256"])
        yield source, values @ decoder["axis"]


def iq_score_labels(plan, directory, calibration, replicates):
    threshold = calibration["decoder"]["threshold"]
    for source, projected in iq_score_projected(plan, directory, calibration, replicates):
        yield source, (projected > threshold).astype(int).tolist()


def iq_transfer(plan, plan_hash, directory, calibration):
    if iq_calibration(plan, plan_hash, directory) != calibration:
        raise ValueError("Frozen calibration does not reproduce")
    step = calibration["binnedSamplePeriodSeconds"]
    traces = []
    replicates = plan["design"]["scoreReplicateIndices"]
    for source, states in iq_score_labels(plan, directory, calibration, replicates):
        windows = []
        for horizon in plan["design"]["windowSteps"]:
            by_initial = []
            for initial, rates in enumerate(calibration["ratesByStartingLevel"]):
                observed = score(states, None, 0, horizon, initial)
                if not observed["startWindows"]:
                    raise ValueError("Both starting levels must be resolved in the scored trace")
                observed["returnWitnesses"] = observed["returnWitnesses"][:3]
                predicted = predict(rates, horizon * step, horizon)
                first = observed["firstObservedExitFraction"]
                endpoint = observed["changedEndpointFraction"]
                by_initial.append({
                    "initialLevel": initial,
                    "predicted": predicted,
                    "observed": observed,
                    "absoluteErrors": {
                        "firstObservedExit": abs(predicted["reversibleFirstObservedExit"] - first),
                        "reversibleEndpoint": abs(predicted["reversibleHighEndpoint"] - endpoint),
                        "absorbingEndpointShortcut": abs(predicted["reversibleFirstObservedExit"] - endpoint),
                    },
                })
            windows.append({"steps": horizon, "durationSeconds": horizon * step, "byStartingLevel": by_initial})
        traces.append({"acquisition": source, "transitions": transition_counts(states), "windows": windows})
    return {
        "evidenceFamily": plan["evidenceFamily"],
        "planSha256": plan_hash,
        "calibration": calibration["acquisition"],
        "scoreTraces": traces,
        "authority": "Matched acquisitions on one device, with labels inferred from a calibration-only decoder.",
    }


def compare_sample_grids(states, horizon, strides, initial, window_starts=None):
    import numpy as np

    states = np.asarray(states)
    starts = np.arange(0, len(states) - horizon, horizon + 1) if window_starts is None else window_starts
    starts = starts[states[starts] == initial]
    if not starts.size:
        raise ValueError("Both starting levels must appear in the matched windows")
    away = states[starts[:, None] + np.arange(horizon + 1)] != initial
    fine_exits = away.any(axis=1)
    consecutive_away = (away[:, :-1] & away[:, 1:]).any(axis=1)
    changed_endpoint = float(away[:, -1].mean())
    results = []
    for stride in strides:
        exits = away[:, ::stride].any(axis=1)
        missed = np.flatnonzero(fine_exits & ~exits)
        exemplar = None
        if missed.size:
            i = missed[0]
            exemplar = {
                "windowStartSample": int(starts[i]),
                "windowEndSample": int(starts[i] + horizon),
                "awayOffsetsOnFinestGrid": np.flatnonzero(away[i]).tolist(),
            }
        results.append({
            "stride": stride,
            "firstObservedExit": float(exits.mean()),
            "observedLossFromFinestGrid": float(missed.size / starts.size),
            "lostDepartureWindows": int(missed.size),
            "lostWindowsWithOnlyIsolatedAwayLabels": int((~consecutive_away[missed]).sum()),
            "firstLostDepartureWitness": exemplar,
        })
    return {
        "initialLevel": initial,
        "windowCount": int(starts.size),
        "changedEndpoint": changed_endpoint,
        "grids": results,
    }


def predict_on_grid(rates, step, horizon, stride):
    exit_rate = rates["exitRatePerSecond"]
    total = exit_rate + rates["returnRatePerSecond"]
    away_share = exit_rate / total
    departure_per_step = away_share * -math.expm1(-total * step * stride)
    departure = -math.expm1((horizon // stride) * math.log1p(-departure_per_step))
    return departure, away_share * -math.expm1(-total * step * horizon)


def iq_thinning(plan, plan_hash, directory, calibration, thinning, thinning_hash):
    if (thinning["referencePlanSha256"] != plan_hash or
            thinning["evidenceFamily"] != plan["evidenceFamily"] or
            iq_calibration(plan, plan_hash, directory) != calibration):
        raise ValueError("Thinning design does not match a reproducible frozen calibration")
    horizon = thinning["windowSteps"]
    strides = thinning["stridesInDecodedSamples"]
    if horizon <= 0 or 1 not in strides or any(stride <= 0 or horizon % stride for stride in strides):
        raise ValueError("All thinning grids must include both boundaries and the finest grid")
    step = calibration["binnedSamplePeriodSeconds"]
    acquisition = calibration["acquisition"]
    values, _, _ = load_iq(plan, directory, acquisition["replicateIndex"])
    decoder = calibration["decoder"]
    states = ((values @ decoder["axis"]) > decoder["threshold"]).astype(int).tolist()
    lags = thinning["rateFitLagsInDecodedSamples"]
    if not lags or any(not 0 < lag < len(states) for lag in lags):
        raise ValueError("Rate fit lags must be positive and shorter than the calibration trace")
    fits = [{
        "lag": lag,
        "ratesByStartingLevel": [fit_rates(states, step, lag), fit_rates([1 - state for state in states], step, lag)],
    } for lag in lags]
    traces = []
    for source, labels in iq_score_labels(plan, directory, calibration, thinning["scoreReplicateIndices"]):
        arms = [compare_sample_grids(labels, horizon, strides, initial) for initial in (0, 1)]
        for arm in arms:
            for grid in arm["grids"]:
                predictions = []
                for fit in fits:
                    rates = fit["ratesByStartingLevel"][arm["initialLevel"]]
                    first, endpoint = predict_on_grid(rates, step, horizon, grid["stride"])
                    fine, _ = predict_on_grid(rates, step, horizon, 1)
                    predictions.append({
                        "fitLag": fit["lag"],
                        "firstObservedExit": first,
                        "changedEndpoint": endpoint,
                        "lossFromFinestGrid": fine - first,
                        "firstObservedExitSignedError": first - grid["firstObservedExit"],
                        "lossSignedError": fine - first - grid["observedLossFromFinestGrid"],
                    })
                grid["predictions"] = predictions
        traces.append({"acquisition": source, "byStartingLevel": arms})
    return {
        "evidenceFamily": plan["evidenceFamily"],
        "referencePlanSha256": plan_hash,
        "thinningPlanSha256": thinning_hash,
        "calibration": acquisition,
        "windowSeconds": horizon * step,
        "windowSteps": horizon,
        "newScoreReplicateIndices": thinning["newScoreReplicateIndices"],
        "calibrationFits": fits,
        "scoreTraces": traces,
        "authority": "Thinning one frozen decoded trace changes observed paths only. Physical transition and readout-error rates remain jointly unresolved."
    }


def noise_calibration(plan, plan_hash, directory, comparison, comparison_hash):
    import return_path_hmm as hmm

    if (comparison["referencePlanSha256"] != plan_hash or
            comparison["evidenceFamily"] != plan["evidenceFamily"]):
        raise ValueError("Decoder comparison does not reference the calibration plan")
    calibration = iq_calibration(plan, plan_hash, directory)
    acquisition = calibration["acquisition"]
    values, _, _ = load_iq(plan, directory, acquisition["replicateIndex"])
    decoder = calibration["decoder"]
    rates = calibration["ratesByStartingLevel"][0]
    p01, p10 = rates["sampledLowToHigh"], rates["sampledHighToLow"]
    baseline = {
        "initial": [p10 / (p01 + p10), p01 / (p01 + p10)],
        "means": decoder["centroids"],
        "standardDeviations": decoder["withinClusterStandardDeviations"],
        "transition": [[1 - p01, p01], [p10, 1 - p10]],
    }
    design = comparison["design"]
    fitted, history = hmm.fit(values @ decoder["axis"], baseline, design["maxIterations"],
                              design["absoluteLogLikelihoodTolerance"])
    return {
        "comparisonPlanSha256": comparison_hash,
        "thresholdCalibration": calibration,
        "initialModel": baseline,
        "fittedModel": fitted,
        "calibrationLogLikelihoodByIteration": history,
    }


def score_decoded_grids(labels, starts, horizon, strides, initial, rates, step):
    arm = compare_sample_grids(labels, horizon, strides, initial, starts)
    finest, endpoint = predict_on_grid(rates, step, horizon, 1)
    for grid in arm["grids"]:
        first, _ = predict_on_grid(rates, step, horizon, grid["stride"])
        grid["predictedFirstObservedExit"] = first
        grid["predictedLoss"] = finest - first
        grid["lossSignedError"] = finest - first - grid["observedLossFromFinestGrid"]
    arm["predictedEndpoint"] = endpoint
    return arm


def noise_transfer(plan, plan_hash, directory, comparison, comparison_hash, frozen):
    import numpy as np
    import return_path_hmm as hmm

    if noise_calibration(plan, plan_hash, directory, comparison, comparison_hash) != frozen:
        raise ValueError("Frozen noise calibration does not reproduce")
    reference = frozen["thresholdCalibration"]
    baseline, fitted = frozen["initialModel"], frozen["fittedModel"]
    p01, p10 = fitted["transition"][0][1], fitted["transition"][1][0]
    step = reference["binnedSamplePeriodSeconds"]
    fitted_rates = [generator_rates(p01, p10, step), generator_rates(p10, p01, step)]
    horizon = comparison["windowSteps"]
    strides = comparison["stridesInDecodedSamples"]
    if horizon <= 0 or 1 not in strides or any(stride <= 0 or horizon % stride for stride in strides):
        raise ValueError("All decoder comparison grids must include both boundaries and the finest grid")
    traces = []
    projected = iq_score_projected(plan, directory, reference, comparison["scoreReplicateIndices"])
    for source, values in projected:
        simple = (values > reference["decoder"]["threshold"]).astype(np.int8)
        fitted_logs = hmm.emission_logs(values, fitted)
        decoded = hmm.decode(fitted_logs, fitted)
        starts = np.arange(0, len(simple) - horizon, horizon + 1)
        common = starts[simple[starts] == decoded[starts]]
        initial_ll = hmm.forward(hmm.emission_logs(values, baseline), baseline)[-1]
        fitted_ll = hmm.forward(fitted_logs, fitted)[-1]
        arms = []
        for i in (0, 1):
            threshold_grids = score_decoded_grids(simple, common, horizon, strides, i,
                                                   reference["ratesByStartingLevel"][i], step)
            fitted_grids = score_decoded_grids(decoded, common, horizon, strides, i, fitted_rates[i], step)
            ends = common[simple[common] == i] + horizon
            arms.append({
                "initialLevel": i,
                "endLabelDisagreements": int(np.count_nonzero(simple[ends] != decoded[ends])),
                "threshold": threshold_grids,
                "gaussianHMM": fitted_grids,
            })
        traces.append({
            "acquisition": source,
            "initialPredictiveLogLikelihood": initial_ll,
            "fittedPredictiveLogLikelihood": fitted_ll,
            "logLikelihoodGainPerSample": (fitted_ll - initial_ll) / len(values),
            "startLabelDisagreements": int(len(starts) - len(common)),
            "byStartingLevel": arms,
        })
    return {
        "comparisonPlanSha256": comparison_hash,
        "calibration": reference["acquisition"],
        "windowSeconds": horizon * step,
        "windowSteps": horizon,
        "newScoreReplicateIndices": comparison["newScoreReplicateIndices"],
        "gaussianHMMRatesPerStartingLevel": fitted_rates,
        "scoreTraces": traces,
        "authority": "Forecasts are checked against each decoder's own labels. Predictive log likelihood separately scores held-out I/Q projections; neither measures latent state labels directly.",
    }


def split_readout_calibration(plan, plan_hash, directory, comparison, noise_bytes):
    import return_path_interleaved as split

    noise_hash = hashlib.sha256(noise_bytes).hexdigest()
    noise = json.loads(noise_bytes)
    reference = noise["thresholdCalibration"]
    if (comparison["referencePlanSha256"] != plan_hash or reference["planSha256"] != plan_hash or
            comparison["evidenceFamily"] != plan["evidenceFamily"] or
            comparison["noiseCalibrationSha256"] != noise_hash):
        raise ValueError("Split readout does not match the pinned source and decoder")
    decoder = reference["decoder"]
    offsets = comparison["nativeBinOffsets"]
    width = plan["design"]["rawSamplesPerBin"]
    if sum(map(len, offsets)) != width:
        raise ValueError("Split readout must cover exactly the frozen bin width")
    guards = comparison["stableNeighborBinsPerSide"]
    acquisition = reference["acquisition"]
    signal, step, pin = load_native_iq(plan, directory, acquisition["replicateIndex"])
    if pin != {key: value for key, value in acquisition.items() if key != "binnedSamples"}:
        raise ValueError("Split calibration differs from the frozen acquisition")
    full, streams = split.project_streams(signal, decoder["axis"], offsets)
    models = split.calibrate(full, streams, decoder["threshold"], guards)
    return {
        "decoder": decoder, "fitted": noise["fittedModel"], "offsets": offsets, "splitModels": models,
        "nativeStep": step, "acquisition": pin, "noiseHash": noise_hash,
    }


def split_scoring_inputs(plan, directory, comparison, calibration):
    seen = {calibration["acquisition"]["sha256"]}
    for replicate in comparison["scoreReplicateIndices"]:
        signal, observed_step, source = load_native_iq(plan, directory, replicate)
        if source["sha256"] in seen or not math.isclose(observed_step, calibration["nativeStep"], rel_tol=1e-9):
            raise ValueError("Expected a distinct split trace on the native calibration time grid")
        seen.add(source["sha256"])
        yield source, signal


def interleaved_transfer(plan, plan_hash, directory, comparison, comparison_hash, noise_bytes):
    import return_path_hmm as hmm
    import return_path_interleaved as split

    cal = split_readout_calibration(plan, plan_hash, directory, comparison, noise_bytes)
    guards = comparison["stableNeighborBinsPerSide"]
    fitted = cal["fitted"]
    traces = []
    for source, signal in split_scoring_inputs(plan, directory, comparison, cal):
        full, streams = split.project_streams(signal, cal["decoder"]["axis"], cal["offsets"])
        states = hmm.decode(hmm.emission_logs(full, fitted), fitted)
        traces.append({"acquisition": source, "results": split.compare(streams, cal["splitModels"], guards, states)})
    return {
        "evidenceFamily": plan["evidenceFamily"],
        "planSha256": plan_hash,
        "comparisonPlanSha256": comparison_hash,
        "noiseCalibrationSha256": cal["noiseHash"],
        "calibration": cal["acquisition"],
        "nativeSamplePeriodSeconds": cal["nativeStep"],
        "nativeBinOffsets": cal["offsets"],
        "stableReadoutModels": cal["splitModels"],
        "newScoreReplicateIndices": comparison["newScoreReplicateIndices"],
        "scoreTraces": traces,
        "authority": comparison["design"]["boundary"],
    }


def injection_transfer(plan, plan_hash, directory, comparison, comparison_hash, noise_bytes):
    import return_path_injection as injection

    cal = split_readout_calibration(plan, plan_hash, directory, comparison, noise_bytes)
    traces = [
        {"acquisition": source, "byInitialState": injection.compare(signal, cal, comparison)}
        for source, signal in split_scoring_inputs(plan, directory, comparison, cal)
    ]
    return {
        "evidenceFamily": plan["evidenceFamily"],
        "planSha256": plan_hash,
        "comparisonPlanSha256": comparison_hash,
        "noiseCalibrationSha256": cal["noiseHash"],
        "calibration": cal["acquisition"],
        "nativeSamplePeriodSeconds": cal["nativeStep"],
        "illustrativeOperatingPoint": comparison["illustrativeOperatingPoint"],
        "newScoreReplicateIndices": comparison["newScoreReplicateIndices"],
        "scoreTraces": traces,
        "authority": comparison["design"]["boundary"],
    }


def shape_transfer(plan, plan_hash, directory, comparison, comparison_hash, noise_bytes, injection_bytes):
    import return_path_injection as injection
    import return_path_shape as shape

    injection_hash = hashlib.sha256(injection_bytes).hexdigest()
    if (comparison["referencePlanSha256"] != plan_hash or comparison["evidenceFamily"] != plan["evidenceFamily"] or
            comparison["injectionPlanSha256"] != injection_hash):
        raise ValueError("Shape comparison does not match the pinned original injection")
    original = json.loads(injection_bytes)
    cal = split_readout_calibration(plan, plan_hash, directory, original, noise_bytes)
    acquisition = cal["acquisition"]
    signal, _, _ = load_native_iq(plan, directory, acquisition["replicateIndex"])
    edge_plan = comparison["edge"]
    edge_calibration = shape.measure(signal, cal, edge_plan)
    scores = edge_calibration["rmsErrorInStateGaps"]
    classes = shape.equivalent_widths(edge_plan)
    instant_class = next(widths for widths in classes if 1 in widths)
    minimum_error = min(scores.values())
    leaders = [int(k) for k, error in scores.items() if error == minimum_error]
    finite = int(min((k for k in scores if int(k) > 1), key=scores.get))
    alternatives = [k for k in scores if int(k) not in instant_class]
    if not alternatives:
        raise ValueError("The edge score cannot distinguish any finite response from the instantaneous model")
    distinguishable = int(min(alternatives, key=scores.get))
    widths = sorted({1, finite, distinguishable})
    traces = []
    for source, signal in split_scoring_inputs(plan, directory, comparison, cal):
        traces.append({
            "acquisition": source,
            "edgeScore": shape.measure(signal, cal, edge_plan),
            "injectionByKernel": {
                str(k): injection.compare(signal, cal, original, pulse_width=k)
                for k in widths
            },
        })
    return {
        "evidenceFamily": plan["evidenceFamily"],
        "planSha256": plan_hash,
        "comparisonPlanSha256": comparison_hash,
        "injectionPlanSha256": injection_hash,
        "noiseCalibrationSha256": cal["noiseHash"],
        "calibration": acquisition,
        "nativeSamplePeriodSeconds": cal["nativeStep"],
        "calibrationLeadingWidthsNativeSamples": leaders,
        "widthClassesOnScoringGrid": classes,
        "bestFiniteWidthNativeSamples": finite,
        "bestWidthDistinguishableFromInstantNativeSamples": distinguishable,
        "edgeCalibration": edge_calibration,
        "newScoreReplicateIndices": comparison["newScoreReplicateIndices"],
        "scoreTraces": traces,
        "authority": comparison["design"]["boundary"],
    }


def audit(plan_path, trace_path):
    plan_bytes = plan_path.read_bytes()
    plan = json.loads(plan_bytes)
    plan_hash = hashlib.sha256(plan_bytes).hexdigest()
    if "member" in plan["trace"]:
        return audit_decoded(plan, plan_hash, trace_path)
    trace_bytes = trace_path.read_bytes()
    trace_hash = hashlib.sha256(trace_bytes).hexdigest()
    if trace_hash != plan["trace"]["sha256"]:
        raise ValueError("Trace differs from the analysis plan")
    header, table = trace_bytes.decode("utf-8-sig").split("[DATA]", maxsplit=1)
    settings = {fields[0]: fields[1] for line in header.splitlines()
                if len(fields := line.split("\t")) >= 2}
    step = float(settings["Sample Period (ms)"]) / 1000
    if step != plan["trace"]["samplePeriodSeconds"] or float(settings["Bias>Bias (V)"]) != plan["trace"]["biasVolts"]:
        raise ValueError("Acquisition metadata differs from the plan")
    rows = list(csv.DictReader(io.StringIO(table.lstrip()), delimiter="\t"))
    selection = {}
    if "selection" in plan:
        rows, interval = select_interval(rows, plan["selection"], plan["trace"]["biasVolts"])
        selection = {"selectedInterval": interval}
    design = plan["design"]
    fit_count = int(len(rows) * design["calibrationFraction"])
    values = [[float(row[channel]) for row in rows] for channel in plan["trace"]["stateReadouts"]]
    width = design["hysteresisHalfWidthAsFractionOfCentroidGap"]
    (primary, former), (secondary, latter) = [classify(series, fit_count, width) for series in values]
    training_agreements = sum(a == b for a, b in zip(primary[:fit_count], secondary[:fit_count]))
    inverse = training_agreements < fit_count / 2
    if inverse:
        secondary = [1 - state for state in secondary]
    if selection:
        selection["readoutSwitchCounts"] = {
            channel: {
                "calibration": transition_counts(labels[:fit_count]),
                "heldOut": transition_counts(labels[fit_count:]),
            }
            for channel, labels in zip(plan["trace"]["stateReadouts"], [primary, secondary])
        }
    rates = fit_rates(primary[:fit_count], step)
    windows = []
    for duration in design["windowSeconds"]:
        steps = round(duration / step)
        if steps < 1 or not math.isclose(steps * step, duration):
            raise ValueError("Window must align with the sampling period")
        windows.append({
            "windowSeconds": duration,
            "predicted": predict(rates, duration, steps),
            "observed": score(primary, secondary, fit_count, steps),
        })
    return {
        "evidenceFamily": plan["evidenceFamily"],
        "planSha256": plan_hash,
        "traceSha256": trace_hash,
        **selection,
        "samples": len(rows),
        "calibrationSamples": fit_count,
        "heldOutSamples": len(rows) - fit_count,
        "readoutCalibrations": dict(zip(plan["trace"]["stateReadouts"], [former, latter])),
        "secondaryStateLabelsInverted": inverse,
        "heldOutChannelAgreement": sum(a == b for a, b in zip(
            primary[fit_count:], secondary[fit_count:],
        )) / (len(rows) - fit_count),
        "rates": rates,
        "windows": windows,
        "authority": "One released acquisition, with a temporal split. Sampled paths are inferred from readouts."
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("plan", type=Path)
    parser.add_argument("trace", type=Path)
    iq = parser.add_mutually_exclusive_group()
    iq.add_argument("--fit-iq", action="store_true")
    iq.add_argument("--score-iq", type=Path, metavar="CALIBRATION")
    iq.add_argument("--thin-iq", type=Path, metavar="CALIBRATION")
    iq.add_argument("--fit-noise", action="store_true")
    iq.add_argument("--score-noise", type=Path, metavar="CALIBRATION")
    iq.add_argument("--interleaved", type=Path, metavar="NOISE_CALIBRATION")
    iq.add_argument("--inject-readout", type=Path, metavar="NOISE_CALIBRATION")
    iq.add_argument("--shape-readout", type=Path, metavar="NOISE_CALIBRATION")
    parser.add_argument("--thinning-plan", type=Path)
    parser.add_argument("--comparison-plan", type=Path)
    args = parser.parse_args()
    if bool(args.thin_iq) != bool(args.thinning_plan):
        parser.error("--thin-iq and --thinning-plan must be used together")
    readout = args.fit_noise or args.score_noise or args.interleaved or args.inject_readout or args.shape_readout
    if bool(readout) != bool(args.comparison_plan):
        parser.error("--comparison-plan must accompany a readout comparison command")
    if args.fit_iq or args.score_iq or args.thin_iq or args.comparison_plan:
        plan_bytes = args.plan.read_bytes()
        plan = json.loads(plan_bytes)
        plan_hash = hashlib.sha256(plan_bytes).hexdigest()
        if args.fit_iq:
            result = iq_calibration(plan, plan_hash, args.trace)
        elif args.score_iq:
            result = iq_transfer(plan, plan_hash, args.trace, json.loads(args.score_iq.read_bytes()))
        elif args.thin_iq:
            thinning_bytes = args.thinning_plan.read_bytes()
            result = iq_thinning(plan, plan_hash, args.trace, json.loads(args.thin_iq.read_bytes()),
                                 json.loads(thinning_bytes), hashlib.sha256(thinning_bytes).hexdigest())
        else:
            comparison_bytes = args.comparison_plan.read_bytes()
            comparison_hash = hashlib.sha256(comparison_bytes).hexdigest()
            comparison = json.loads(comparison_bytes)
            inputs = (plan, plan_hash, args.trace, comparison, comparison_hash)
            if args.fit_noise:
                result = noise_calibration(*inputs)
            elif args.interleaved:
                result = interleaved_transfer(*inputs, args.interleaved.read_bytes())
            elif args.inject_readout:
                result = injection_transfer(*inputs, args.inject_readout.read_bytes())
            elif args.shape_readout:
                original = args.comparison_plan.with_name(comparison["injectionPlan"]).read_bytes()
                result = shape_transfer(*inputs, args.shape_readout.read_bytes(), original)
            else:
                result = noise_transfer(*inputs, json.loads(args.score_noise.read_bytes()))
    else:
        result = audit(args.plan, args.trace)
    print(json.dumps(result, indent=2))
