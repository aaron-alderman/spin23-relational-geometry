"""Two-state Gaussian observation model for the Delft I/Q projection."""

import math

import numpy as np


def emission_logs(values, model):
    fitted = model["standardDeviations"]
    sd = np.asarray(fitted)
    return -0.5 * ((values[:, None] - model["means"]) / sd) ** 2 - np.log(sd * math.sqrt(2 * math.pi))


def forward(logs, model):
    offsets = logs.max(axis=1)
    emissions = np.exp(logs - offsets[:, None])
    matrix = model["transition"]
    (p00, p01), (p10, p11) = matrix
    alpha = np.empty_like(emissions)
    scales = np.empty(len(logs))
    a0, a1 = model["initial"]
    for i, (e0, e1) in enumerate(emissions):
        if i:
            a0, a1 = a0 * p00 + a1 * p10, a0 * p01 + a1 * p11
        a0, a1 = a0 * e0, a1 * e1
        scale = a0 + a1
        if scale <= 0:
            raise ValueError("HMM prediction assigns zero density")
        a0, a1 = a0 / scale, a1 / scale
        alpha[i] = a0, a1
        scales[i] = scale
    return alpha, emissions, scales, float((np.log(scales) + offsets).sum())


def expected_counts(alpha, emissions, scales, transition):
    beta = np.ones_like(alpha)
    (p00, p01), (p10, p11) = transition
    b0 = b1 = 1.0
    scaled_emissions = emissions / scales[:, None]
    for i in range(len(alpha) - 2, -1, -1):
        e0, e1 = scaled_emissions[i + 1]
        e0, e1 = b0 * e0, b1 * e1
        b0, b1 = p00 * e0 + p01 * e1, p10 * e0 + p11 * e1
        beta[i] = b0, b1
    future = scaled_emissions[1:] * beta[1:]
    return alpha * beta, np.asarray(transition) * (alpha[:-1].T @ future)


def fit(values, initial_model, max_iterations, tolerance):
    model = initial_model
    likelihoods = []
    for iteration in range(max_iterations + 1):
        alpha, emissions, scales, likelihood = forward(emission_logs(values, model), model)
        likelihoods.append(likelihood)
        if iteration:
            change = likelihood - likelihoods[-2]
            if change < -1e-6:
                raise ValueError("Calibration likelihood declined during HMM fitting")
            if change <= tolerance:
                return model, likelihoods
        if iteration == max_iterations:
            break
        weights, counts = expected_counts(alpha, emissions, scales, model["transition"])
        means = (values @ weights) / weights.sum(axis=0)
        variances = ((values[:, None] - means) ** 2 * weights).sum(axis=0) / weights.sum(axis=0)
        matrix = counts / counts.sum(axis=1, keepdims=True)
        if not (means[0] < means[1] and (variances > 0).all() and (matrix > 0).all()):
            raise ValueError("HMM calibration lost a resolved state")
        model = {
            "initial": initial_model["initial"],
            "means": means.tolist(),
            "standardDeviations": np.sqrt(variances).tolist(),
            "transition": matrix.tolist(),
        }
    raise ValueError("HMM fit did not converge within the comparison plan")


def decode(logs, model):
    (p00, p01), (p10, p11) = np.log(model["transition"])
    s0, s1 = np.log(model["initial"]) + logs[0]
    parents = np.empty((len(logs), 2), dtype=np.int8)
    for i, (e0, e1) in enumerate(logs[1:], start=1):
        left_from_high = s1 + p10 > s0 + p00
        right_from_high = s1 + p11 > s0 + p01
        parents[i] = left_from_high, right_from_high
        s0, s1 = e0 + (s1 + p10 if left_from_high else s0 + p00), e1 + (s1 + p11 if right_from_high else s0 + p01)
    states = np.empty(len(logs), dtype=np.int8)
    states[-1] = s1 > s0
    for i in range(len(logs) - 1, 0, -1):
        states[i - 1] = parents[i, states[i]]
    return states
