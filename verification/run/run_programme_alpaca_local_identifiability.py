"""Local identifiability audit for the universal incidence ALP benchmark.

The script finite-differences ten low-mass observables with respect to the five
generation-universal derivative fermion coefficients and three independent
gauge coefficients at 10 TeV. It reports the logarithmic response Jacobian and
its singular-value decomposition. This asks which UV directions can actually
be distinguished locally by the proposed kaon/B-production and decay data.
"""

from __future__ import annotations

import json
import multiprocessing as mp


_original_get_context = mp.get_context
mp.get_context = lambda method=None: _original_get_context(
    "spawn" if method == "fork" else method
)

import numpy as np
from alpaca import alp_channels_branching_ratios, branching_ratio, decay_width
from alpaca.rge import ALPcouplings
from importlib.metadata import version


UV_SCALE = 10_000.0
EW_SCALE = 100.0
FA = 1_000_000.0
PARAMETERS = ["cqL", "cuR", "cdR", "clL", "ceR", "cG", "cW", "cB"]
BASELINE = {
    "cqL": 5.0,
    "cuR": -5.0,
    "cdR": -1.0,
    "clL": 1.0,
    "ceR": -1.0,
    "cG": 0.0,
    "cW": 0.0,
    "cB": 0.0,
}
STEP = 1.0e-3


def couplings(values: dict[str, float]) -> ALPcouplings:
    payload = {
        name: value * np.eye(3) if name in {"cqL", "cuR", "cdR", "clL", "ceR"} else value
        for name, value in values.items()
    }
    return ALPcouplings(
        payload,
        scale=UV_SCALE,
        basis="derivative_above",
        ew_scale=EW_SCALE,
    )


def evaluate(values: dict[str, float]) -> dict[str, float]:
    model = couplings(values)
    result: dict[str, float] = {}
    for mass, tag, leptonic_channel in [
        (0.1, "100", "a -> electron electron"),
        (0.3, "300", "a -> muon muon"),
    ]:
        channels = alp_channels_branching_ratios(mass, model, FA)
        result[f"K_{tag}"] = float(branching_ratio("K+ -> alp pion+", mass, model, FA))
        result[f"B_{tag}"] = float(branching_ratio("B+ -> K+ alp", mass, model, FA))
        result[f"width_{tag}"] = float(decay_width("alp", mass, model, FA))
        result[f"leptonic_BR_{tag}"] = float(channels[leptonic_channel])
        result[f"gamma_BR_{tag}"] = float(channels["a -> photon photon"])
    return result


baseline_observables = evaluate(BASELINE)
observable_names = list(baseline_observables)
jacobian = np.zeros((len(observable_names), len(PARAMETERS)))

for column, parameter in enumerate(PARAMETERS):
    shifted = dict(BASELINE)
    shifted[parameter] += STEP
    shifted_observables = evaluate(shifted)
    for row, observable in enumerate(observable_names):
        jacobian[row, column] = (
            np.log(shifted_observables[observable])
            - np.log(baseline_observables[observable])
        ) / STEP

u, singular_values, vh = np.linalg.svd(jacobian, full_matrices=True)
tolerance = singular_values[0] * max(jacobian.shape) * np.finfo(float).eps
rank = int(np.sum(singular_values > tolerance))
nullity = len(PARAMETERS) - rank


def subset_svd(names: list[str]) -> dict:
    rows = [observable_names.index(name) for name in names]
    matrix = jacobian[rows, :]
    _, values, vectors = np.linalg.svd(matrix, full_matrices=True)
    leading = values[0]
    return {
        "observables": names,
        "singular_values": values.tolist(),
        "effective_rank_relative_threshold": {
            str(threshold): int(np.sum(values > leading * threshold))
            for threshold in [1e-2, 1e-3, 1e-4, 1e-6]
        },
        "smallest_right_singular_vectors": vectors[-max(1, len(PARAMETERS) - len(values)):].tolist(),
    }


subsets = {
    "production_and_total_width": subset_svd([
        "K_100", "B_100", "width_100", "K_300", "B_300", "width_300"
    ]),
    "kaon_and_total_width": subset_svd([
        "K_100", "width_100", "K_300", "width_300"
    ]),
    "all_channels": subset_svd(observable_names),
}

result = {
    "schema_version": 1,
    "tool": {"name": "alpaca-ALPs", "version": version("alpaca-ALPs")},
    "point": {
        "scale_GeV": UV_SCALE,
        "fa_GeV": FA,
        "parameters": BASELINE,
        "finite_difference_step": STEP,
    },
    "observable_order": observable_names,
    "parameter_order": PARAMETERS,
    "baseline_observables": baseline_observables,
    "log_response_jacobian": jacobian.tolist(),
    "singular_values": singular_values.tolist(),
    "numerical_rank": rank,
    "parameter_nullity": nullity,
    "right_singular_vectors_rows": vh.tolist(),
    "smallest_right_singular_vectors": vh[-max(1, nullity):].tolist(),
    "observable_subsets": subsets,
    "caveats": [
        "This is a local first-order identifiability test at one UV point, not a global likelihood fit.",
        "Forward finite differences are used; near-null directions require a step-size stability check.",
        "The right-handed neutrino is absent from ALPaca's Standard Model field content.",
        "Experimental covariance and theory errors are not included, so numerical rank overstates practical identifiability.",
    ],
}

print(json.dumps(result, indent=2))
