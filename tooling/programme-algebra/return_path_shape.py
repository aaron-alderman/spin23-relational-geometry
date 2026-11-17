"""Estimate an effective I/Q step response from held-out native samples."""

import numpy as np

import return_path_hmm as hmm
import return_path_interleaved as split


def step_response(relative, width):
    """Average onset uniformly over the gap between two alignment samples."""
    delays = np.arange(width) - (width - 1) / 2
    return np.clip((relative[..., None] + 1 - delays) / 2, 0, 1).mean(axis=-1)


def equivalent_widths(design):
    # Opposite-parity samples sit at even offsets from the midpoint
    # of the two consecutive alignment samples bracketing the cut.
    half = design["scoreHalfWidthFromAlignedCenterNativeSamples"]
    offsets = np.arange(-half, half + 1)
    offsets = offsets[offsets % 2 == 0]
    families = {}
    for width in design["candidateKernelWidthsNativeSamples"]:
        fingerprint = tuple(step_response(offsets, width))
        families.setdefault(fingerprint, []).append(width)
    return list(families.values())


def plateau_edges(states, streams, midpoint, width, design):
    guard_start, guards = design["guardStartBinOffset"], design["guardBins"]
    half = design["nativeCenterHalfWidth"]
    edges = np.flatnonzero(states[:-1] != states[1:]) + 1
    margin = max(guard_start + guards - 1, (half + width - 1) // width)
    edges = edges[(edges >= margin) & (edges + margin < len(states))]
    offsets = guard_start + np.arange(guards)
    before, after = edges[:, None] - offsets, edges[:, None] + offsets
    initial = states[edges - 1]
    labels = streams > midpoint
    eligible = ((states[before] == initial[:, None]).all(axis=1) &
                (states[after] != initial[:, None]).all(axis=1) &
                (labels[before] == initial[:, None, None]).all(axis=(1, 2)) &
                (labels[after] != initial[:, None, None]).all(axis=(1, 2)))
    return edges[eligible], initial[eligible]


def scored_edges(observed, positions, parity, kernels, design):
    alignment = positions % 2 == parity
    shift = design["maximumAlignmentShiftNativeSamples"]
    cuts = positions[alignment & (abs(positions) <= shift)]
    if len(cuts) < 2:
        raise ValueError("Edge search needs at least two cuts on each native parity")
    ideal = positions[alignment][None, :] >= cuts[:, None]
    errors = ((observed[:, None, alignment] - ideal[None, :, :]) ** 2).sum(axis=2)
    best = errors.argmin(axis=1)
    # A cut is the first new-state sample in the alignment stream. Its
    # previous native sample in that stream is two sample periods earlier.
    centers = cuts[best] - 1
    relative = positions[~alignment][None, :] - centers[:, None]
    support = abs(relative) <= design["scoreHalfWidthFromAlignedCenterNativeSamples"]
    target = observed[:, ~alignment][support]
    offsets = relative[support]
    return {
        "scoredSamples": int(target.size),
        "alignmentAtSearchBoundary": int(((best == 0) | (best == cuts.size - 1)).sum()),
        "sumSquaredError": {
            str(width): float(((target - step_response(offsets, width)) ** 2).sum())
            for width in kernels
        },
    }


def measure(signal, calibration, design):
    width = sum(map(len, calibration["offsets"]))
    half, maximum = design["nativeCenterHalfWidth"], design["maximumAlignmentShiftNativeSamples"]
    kernels = design["candidateKernelWidthsNativeSamples"]
    if (1 not in kernels or not any(k > 1 for k in kernels) or any(k <= 0 or k % 2 == 0 for k in kernels) or
            maximum < 2 or half < maximum + 2 or design["guardBins"] <= 0 or design["guardStartBinOffset"] <= 0 or
            design["scoreHalfWidthFromAlignedCenterNativeSamples"] <= 0):
        raise ValueError("The edge design needs instant and odd finite kernels with flanking score samples")
    axis = calibration["decoder"]["axis"]
    model = calibration["fitted"]
    full, streams = split.project_streams(signal, axis, calibration["offsets"])
    states = hmm.decode(hmm.emission_logs(full, model), model)
    midpoint = np.mean([item["means"] for item in calibration["splitModels"]], axis=0)
    edges, initial = plateau_edges(states, streams, midpoint, width, design)
    means = np.asarray(model["means"])
    positions = np.arange(-half, half + 1)
    native = signal.real * axis[0] + signal.imag * axis[1]
    measured = native[edges[:, None] * width + positions]
    oriented = (measured - means[initial, None]) / (means[1 - initial] - means[initial])[:, None]
    rows = []
    squared_error = {str(width): 0.0 for width in kernels}
    samples = 0
    for state in (0, 1):
        selected = oriented[initial == state]
        if not selected.size:
            raise ValueError("Both directional edges must have corroborated flanks")
        for parity in (0, 1):
            result = scored_edges(selected, positions, parity, kernels, design)
            rows.append({"initialState": state, "alignmentParity": parity, "eligibleEdges": len(selected), **result})
            samples += result["scoredSamples"]
            for key, error in result["sumSquaredError"].items():
                squared_error[key] += error
    return {
        "eligibleEdges": int(edges.size),
        "byDirectionAndAlignment": rows,
        "rmsErrorInStateGaps": {key: float(np.sqrt(error / samples)) for key, error in squared_error.items()},
    }
