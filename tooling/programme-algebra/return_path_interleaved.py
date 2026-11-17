"""Corroborate one-stream nominations with a calibrated conditional readout."""

import numpy as np
from numpy.lib.stride_tricks import sliding_window_view


def project_streams(signal, axis, offsets):
    width = sum(map(len, offsets))
    if len(offsets) != 2 or not all(offsets) or sorted(i for group in offsets for i in group) != list(range(width)):
        raise ValueError("Expected two disjoint streams covering the native bin")
    bins = signal[:signal.size // width * width].reshape(-1, width)

    def projected(values):
        return np.column_stack((values.real, values.imag)) @ axis

    full = projected(bins.mean(axis=1))
    split = np.column_stack([projected(bins[:, group].mean(axis=1)) for group in offsets])
    return full, split


def calibrate(full, streams, threshold, guards):
    if guards < 1:
        raise ValueError("Stable calibration needs at least one neighbor on each side")
    windows = sliding_window_view(full > threshold, 2 * guards + 1)
    center = streams[guards:-guards]
    models = []
    for state in (0, 1):
        stable = (windows[:, :guards] == state).all(axis=1) & (windows[:, -guards:] == state).all(axis=1)
        samples = center[stable]
        if len(samples) < 3:
            raise ValueError("Too few stable calibration bins for the split readout")
        covariance = np.cov(samples, rowvar=False)
        if np.linalg.det(covariance) <= 0:
            raise ValueError("Corroborating readout has no resolved conditional variance")
        models.append({
            "state": state,
            "stableNeighborBins": len(samples),
            "means": samples.mean(axis=0).tolist(),
            "covariance": covariance.tolist(),
            "residualCorrelation": float(covariance[0, 1] / np.sqrt(covariance[0, 0] * covariance[1, 1])),
        })
    return models


def nominate(labels, initial, guards, away_bins):
    windows = sliding_window_view(labels, 2 * guards + away_bins)
    left = (windows[:, :guards] == initial).all(axis=1)
    away = (windows[:, guards:guards + away_bins] != initial).all(axis=1)
    right = (windows[:, -guards:] == initial).all(axis=1)
    return np.flatnonzero(left & away & right) + guards + away_bins // 2


def conditional_log_density(values, model, discovery):
    other = 1 - discovery
    means = model["means"]
    cov = model["covariance"]
    coefficient = cov[discovery][other] / cov[discovery][discovery]
    mean = means[other] + coefficient * (values[:, discovery] - means[discovery])
    variance = cov[other][other] - coefficient * cov[discovery][other]
    return -0.5 * (np.log(2 * np.pi * variance) + (values[:, other] - mean) ** 2 / variance)


def compare(streams, models, guards, hmm_states):
    midpoints = np.mean([model["means"] for model in models], axis=0)
    if not np.all(np.asarray(models[0]["means"]) < models[1]["means"]):
        raise ValueError("Split readouts must preserve both calibrated label orders")
    labels = streams > midpoints
    results = []
    for discovery in (0, 1):
        for initial in (0, 1):
            away = 1 - initial
            for duration in (1, 3):
                indices = nominate(labels[:, discovery], initial, guards, duration)
                values = streams[indices]
                evidence = (conditional_log_density(values, models[away], discovery) -
                            conditional_log_density(values, models[initial], discovery))
                confirming = evidence > 0
                hmm_retains = hmm_states[indices] == away
                results.append({
                    "nominationStream": discovery,
                    "confirmationStream": 1 - discovery,
                    "initialState": initial,
                    "consecutiveAwayBinsInNomination": duration,
                    "nominations": len(indices),
                    "confirmationMidpointFavorsAway": int((labels[indices, 1 - discovery] == away).sum()),
                    "conditionalEvidenceFavorsAway": int(confirming.sum()),
                    "medianConditionalLogDensityRatio": float(np.median(evidence)) if len(indices) else None,
                    "fullBinHMMRetainsAway": int(hmm_retains.sum()),
                    "conditionalEvidenceFavorsAwayAmongHMMRetained": int((confirming & hmm_retains).sum()),
                    "conditionalEvidenceFavorsAwayAmongHMMSuppressed": int((confirming & ~hmm_retains).sum()),
                })
    return results
