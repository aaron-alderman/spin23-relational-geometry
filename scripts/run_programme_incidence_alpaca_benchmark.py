"""Run the programme incidence charges through ALPaca 1.2.0.

This script uses a launch-time Windows compatibility shim for flavio 2.7.1,
whose import path requests the Unix-only multiprocessing context ``fork``.
No installed package files are modified.
"""

from __future__ import annotations

import json
import multiprocessing as mp


_original_get_context = mp.get_context
mp.get_context = lambda method=None: _original_get_context(
    "spawn" if method == "fork" else method
)

import numpy as np
from alpaca.rge import ALPcouplings
from alpaca import alp_channels_branching_ratios, branching_ratio, decay_width
from importlib.metadata import version


UV_SCALE = 10_000.0
EW_SCALE = 100.0
LOW_SCALE = 5.0
FA_BENCHMARK = 1_000_000.0
HBARC_GEV_M = 1.973269804e-16


def matrix(value: float, embedding: str) -> np.ndarray:
    if embedding == "universal":
        return value * np.eye(3)
    if embedding == "third_family_only":
        answer = np.zeros((3, 3))
        answer[2, 2] = value
        return answer
    raise ValueError(embedding)


def clean(z: complex, tolerance: float = 1e-15):
    z = complex(z)
    if abs(z.imag) < tolerance:
        return z.real
    return {"re": z.real, "im": z.imag}


def matrix_clean(a: np.ndarray):
    return [[clean(z) for z in row] for row in np.asarray(a)]


def run(embedding: str):
    # All-left incidence (5,5,1,1,1,0) becomes
    # cQ=5, cuR=-5, cdR=-1, cL=1, ceR=-1.
    uv = ALPcouplings(
        {
            "cqL": matrix(5, embedding),
            "cuR": matrix(-5, embedding),
            "cdR": matrix(-1, embedding),
            "clL": matrix(1, embedding),
            "ceR": matrix(-1, embedding),
            "cG": 0,
            "cW": 0,
            "cB": 0,
        },
        scale=UV_SCALE,
        basis="derivative_above",
        ew_scale=EW_SCALE,
    )
    ew = uv.match_run(EW_SCALE, "massbasis_ew", integrator="scipy", beta="full")
    low = uv.match_run(LOW_SCALE, "VA_below", integrator="scipy", beta="full")

    cu_l, cu_r = np.asarray(ew.values["cuL"]), np.asarray(ew.values["cuR"])
    cd_l, cd_r = np.asarray(ew.values["cdL"]), np.asarray(ew.values["cdR"])
    ce_l, ce_r = np.asarray(ew.values["ceL"]), np.asarray(ew.values["ceR"])
    phenomenology = []
    for mass in [0.1, 0.3, 1.0, 3.0]:
        channels = alp_channels_branching_ratios(mass, uv, FA_BENCHMARK)
        visible = {
            name: float(value)
            for name, value in channels.items()
            if float(value) > 1e-6
        }
        width = float(decay_width("alp", mass, uv, FA_BENCHMARK))
        point = {
            "mass_GeV": mass,
            "fa_GeV": FA_BENCHMARK,
            "BR_Bplus_to_Kplus_a": float(
                branching_ratio("B+ -> K+ alp", mass, uv, FA_BENCHMARK)
            ),
            "ALP_total_width_GeV": width,
            "ALP_ctau_m": HBARC_GEV_M / width if width > 0 else None,
            "ALP_branching_ratios_above_1e-6": visible,
        }
        if mass < 0.354:
            point["BR_Kplus_to_piplus_a"] = float(
                branching_ratio("K+ -> alp pion+", mass, uv, FA_BENCHMARK)
            )
        phenomenology.append(point)

    return {
        "embedding": embedding,
        "uv": {
            "scale_GeV": UV_SCALE,
            "basis": "derivative_above",
            "charges_right_handed_basis": {
                "cqL": 5,
                "cuR": -5,
                "cdR": -1,
                "clL": 1,
                "ceR": -1,
            },
            "independent_gauge_coefficients": {"cG": 0, "cW": 0, "cB": 0},
        },
        "electroweak": {
            "scale_GeV": EW_SCALE,
            "physical_diagonal": {
                "ctt": clean(cu_r[2, 2] - cu_l[2, 2]),
                "cbb": clean(cd_r[2, 2] - cd_l[2, 2]),
                "ctautau": clean(ce_r[2, 2] - ce_l[2, 2]),
            },
            "down_left_matrix": matrix_clean(cd_l),
            "flavor_changing_magnitudes": {
                "sd": abs(cd_l[1, 0]),
                "bd": abs(cd_l[2, 0]),
                "bs": abs(cd_l[2, 1]),
            },
            "massbasis_gauge_coefficients": {
                key: clean(ew.values[key])
                for key in ["cG", "cgamma", "cgammaZ", "cW", "cZ"]
            },
        },
        "low_energy": {
            "scale_GeV": LOW_SCALE,
            "basis": "VA_below",
            "cuA": matrix_clean(low.values["cuA"]),
            "cdA": matrix_clean(low.values["cdA"]),
            "ceA": matrix_clean(low.values["ceA"]),
            "cG": clean(low.values["cG"]),
            "cgamma": clean(low.values["cgamma"]),
        },
        "phenomenology": phenomenology,
    }


result = {
    "schema_version": 1,
    "tool": {"name": "alpaca-ALPs", "version": version("alpaca-ALPs")},
    "limitations": [
        "ALPaca uses the Standard Model without a right-handed neutrino, so the programme's Dirac-neutrino entry is not evolved.",
        "Numbers use ALPaca defaults for Standard-Model inputs, CKM parameters, schemes and matching.",
        "The overall ALP scale 1/f is not included; all Wilson coefficients are dimensionless.",
    ],
    "runs": [run("third_family_only"), run("universal")],
}

print(json.dumps(result, indent=2))
