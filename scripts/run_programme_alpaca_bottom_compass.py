"""Evaluate bottom-sensitive radiative quarkonium production for ALP rays."""

from __future__ import annotations

import json
import multiprocessing as mp


_original_get_context = mp.get_context
mp.get_context = lambda method=None: _original_get_context(
    "spawn" if method == "fork" else method
)

import numpy as np
from alpaca import branching_ratio
from alpaca.rge import ALPcouplings
from importlib.metadata import version


def eye(value: float) -> np.ndarray:
    return value * np.eye(3)


MODELS = {
    "incidence_deduplicated": (5, -5, -1, 1, -1),
    "incidence_multiplicity": (5, -5, -1, 1, -3),
    "equal_axial": (5, -5, -5, 5, -5),
    "top_right_only": (0, -10, 0, 0, 0),
}


def build(values):
    cq, cu, cd, cl, ce = values
    return ALPcouplings(
        {
            "cqL": eye(cq), "cuR": eye(cu), "cdR": eye(cd),
            "clL": eye(cl), "ceR": eye(ce),
            "cG": 0, "cW": 0, "cB": 0,
        },
        scale=10_000.0,
        basis="derivative_above",
        ew_scale=100.0,
    )


result = {
    "schema_version": 1,
    "tool": {"name": "alpaca-ALPs", "version": version("alpaca-ALPs")},
    "normalization": {"uv_scale_GeV": 10_000.0, "fa_GeV": 1_000_000.0},
    "runs": [],
}
for name, values in MODELS.items():
    model = build(values)
    points = []
    for mass in [0.1, 0.3, 1.0, 3.0, 7.0]:
        points.append({
            "mass_GeV": mass,
            "BR_Upsilon1S_to_gamma_a": float(
                branching_ratio("Upsilon(1S) -> photon alp", mass, model, 1_000_000.0)
            ),
            "BR_Upsilon3S_to_gamma_a": float(
                branching_ratio("Upsilon(3S) -> photon alp", mass, model, 1_000_000.0)
            ),
        })
    result["runs"].append({
        "model": name,
        "uv_physical_pattern": [values[1] - values[0], values[2] - values[0], values[4] - values[3]],
        "points": points,
    })

print(json.dumps(result, indent=2))
