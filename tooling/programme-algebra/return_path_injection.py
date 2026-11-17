"""Recovery of known-duration I/Q excursions over paired recorded backgrounds."""

import numpy as np

import return_path_hmm as hmm
import return_path_interleaved as split


def decode_windows(logs, model):
    """Decode each snippet with a fresh prior and no transitions across snippets."""
    transition = np.log(model["transition"])
    likelihood = np.log(model["initial"]) + logs[:, 0, :]
    parents = np.empty(logs.shape, dtype=np.int8)
    for step in range(1, logs.shape[1]):
        paths = likelihood[:, :, None] + transition
        parents[:, step, :] = paths.argmax(axis=1)
        likelihood = paths.max(axis=1) + logs[:, step, :]
    states = np.empty(logs.shape[:2], dtype=np.int8)
    states[:, -1] = likelihood.argmax(axis=1)
    windows = np.arange(len(logs))
    for step in range(logs.shape[1] - 1, 0, -1):
        states[:, step - 1] = parents[windows, step, states[:, step]]
    return states


def call_bins(snippets, config, initial):
    width = sum(map(len, config["offsets"]))
    shape = (len(snippets), snippets.shape[1] // width)
    decoder, fitted, models = config["decoder"], config["fitted"], config["splitModels"]
    full, streams = split.project_streams(snippets.ravel(), decoder["axis"], config["offsets"])
    paths = decode_windows(hmm.emission_logs(full, fitted).reshape(*shape, 2), fitted)
    midpoint = np.mean([model["means"] for model in models], axis=0)
    results = {
        "threshold": ((full > decoder["threshold"]) != initial).reshape(shape),
        "gaussianHMM": paths != initial,
    }
    for use in (0, 1):
        nominated = (streams[:, use] > midpoint[use]) != initial
        supported = (split.conditional_log_density(streams, models[1 - initial], use) >
                     split.conditional_log_density(streams, models[initial], use))
        results[f"split{use}"] = (nominated & supported).reshape(shape)
    return results


def compare(signal, config, plan, pulse_width=1):
    width = sum(map(len, config["offsets"]))
    window = plan["windowBins"]
    guards = plan["outerGuardBinsPerSide"]
    onsets = plan["onsetOffsetsNativeSamples"]
    durations = plan["durationsNativeSamples"]
    injection_start = width * plan["injectionStartBin"]
    expansion = (pulse_width - 1) // 2
    if (not onsets or any(not 0 <= phase < width for phase in onsets) or
            not durations or min(durations) <= 0 or guards <= 0 or
            pulse_width <= 0 or pulse_width % 2 == 0 or
            injection_start - expansion < guards * width or
            injection_start + max(onsets) + max(durations) + expansion > (window - guards) * width):
        raise ValueError("Injection support must lie strictly between the outer guard bins")
    kernel = np.full(pulse_width, 1 / pulse_width)
    raw_count = window * width
    snippets = signal[:signal.size // raw_count * raw_count].reshape(-1, raw_count)
    decoder = config["decoder"]
    full, _ = split.project_streams(snippets.ravel(), decoder["axis"], config["offsets"])
    labels = (full > decoder["threshold"]).reshape(-1, window)
    axis = complex(*decoder["axis"])
    gap = config["fitted"]["means"][1] - config["fitted"]["means"][0]
    criteria = plan["illustrativeOperatingPoint"]
    results = []
    for initial in (0, 1):
        stable_flanks = (labels[:, :guards] == initial).all(axis=1) & (labels[:, -guards:] == initial).all(axis=1)
        backgrounds = snippets[stable_flanks]
        count = len(backgrounds)
        if not count:
            raise ValueError("No recorded backgrounds with matching outer labels")
        sham = call_bins(backgrounds, config, initial)
        amplitude = gap * axis * (1 if initial == 0 else -1)
        rows = []
        passing = {method: [] for method in sham}
        for duration in durations:
            profile = np.convolve(np.ones(duration), kernel)
            phase_scores = []
            for phase in onsets:
                start = injection_start + phase
                stop = start + duration
                region = slice(start // width, (stop + width - 1) // width)
                injected = backgrounds.copy()
                injected[:, start - expansion:stop + expansion] += amplitude * profile
                calls = call_bins(injected, config, initial)
                scores = {}
                for method, call in calls.items():
                    found = call[:, region].any(axis=1)
                    background = sham[method][:, region].any(axis=1)
                    scores[method] = {
                        "injectionCalls": int(found.sum()),
                        "shamCalls": int(background.sum()),
                        "createdCalls": int((found & ~background).sum()),
                        "removedCalls": int((~found & background).sum()),
                    }
                rows.append({"durationNativeSamples": duration, "onsetOffset": phase, "scores": scores})
                phase_scores.append(scores)
            for method in sham:
                if all(scores[method]["injectionCalls"] / count >= criteria["minimumRecovery"] and
                       scores[method]["shamCalls"] / count <= criteria["maximumShamCallFraction"]
                       for scores in phase_scores):
                    passing[method].append(duration)
        results.append({
            "initialState": initial,
            "pairedBackgrounds": count,
            "durationsPassingAllPhasesByMethod": passing,
            "runs": rows,
        })
    return results
