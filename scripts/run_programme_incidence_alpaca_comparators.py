"""Compare the incidence ALP point with ordinary same-top-coupling benchmarks.

All models are defined at 10 TeV with vanishing independent gauge operators and
the same ultraviolet top axial difference, c_tt = c_uR(33)-c_qL(33) = -10.
The launch-time multiprocessing shim is needed only because flavio requests the
Unix-only ``fork`` context while importing on Windows.
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
HBARC_GEV_M = 1.973269804e-16


def eye(value: float) -> np.ndarray:
    return value * np.eye(3)


def third(value: float) -> np.ndarray:
    result = np.zeros((3, 3))
    result[2, 2] = value
    return result


MODELS = {
    # Programme incidence point, promoted generation-universally.
    "incidence_universal": {
        "cqL": eye(5), "cuR": eye(-5), "cdR": eye(-1),
        "clL": eye(1), "ceR": eye(-1),
    },
    # The second natural incidence normalization retains response-component
    # multiplicity in the charged-lepton sector.
    "incidence_multiplicity_universal": {
        "cqL": eye(5), "cuR": eye(-5), "cdR": eye(-1),
        "clL": eye(1), "ceR": eye(-3),
    },
    # ALPaca BC10 charge pattern, rescaled to the same UV c_tt=-10.
    "equal_axial_universal": {
        "cqL": eye(5), "cuR": eye(-5), "cdR": eye(-5),
        "clL": eye(5), "ceR": eye(-5),
    },
    # A minimal top-right source with the same UV c_tt and no tree-level down
    # left-handed charge. This is a conventional top-driven flavor comparator.
    "top_right_only": {
        "cqL": eye(0), "cuR": third(-10), "cdR": eye(0),
        "clL": eye(0), "ceR": eye(0),
    },
}


def evaluate(name: str, fermions: dict[str, np.ndarray]) -> dict:
    coefficients = dict(fermions)
    coefficients.update({"cG": 0, "cW": 0, "cB": 0})
    uv = ALPcouplings(
        coefficients,
        scale=UV_SCALE,
        basis="derivative_above",
        ew_scale=EW_SCALE,
    )
    ew = uv.match_run(EW_SCALE, "massbasis_ew", integrator="scipy", beta="full")
    cu_l, cu_r = np.asarray(ew.values["cuL"]), np.asarray(ew.values["cuR"])
    cd_l, cd_r = np.asarray(ew.values["cdL"]), np.asarray(ew.values["cdR"])
    ce_l, ce_r = np.asarray(ew.values["ceL"]), np.asarray(ew.values["ceR"])

    masses = []
    for mass in [0.1, 0.3]:
        width = float(decay_width("alp", mass, uv, FA))
        channels = {
            channel: float(value)
            for channel, value in alp_channels_branching_ratios(mass, uv, FA).items()
            if float(value) > 1e-5
        }
        masses.append({
            "mass_GeV": mass,
            "BR_Kplus_to_piplus_a": float(
                branching_ratio("K+ -> alp pion+", mass, uv, FA)
            ),
            "BR_Bplus_to_Kplus_a": float(
                branching_ratio("B+ -> K+ alp", mass, uv, FA)
            ),
            "total_width_GeV": width,
            "ctau_m": HBARC_GEV_M / width,
            "decay_branching_ratios": channels,
        })

    return {
        "model": name,
        "uv_physical_diagonal": {
            "ctt": float(fermions["cuR"][2, 2] - fermions["cqL"][2, 2]),
            "cbb": float(fermions["cdR"][2, 2] - fermions["cqL"][2, 2]),
            "ctautau": float(fermions["ceR"][2, 2] - fermions["clL"][2, 2]),
        },
        "ew_physical_diagonal": {
            "ctt": float(np.real(cu_r[2, 2] - cu_l[2, 2])),
            "cbb": float(np.real(cd_r[2, 2] - cd_l[2, 2])),
            "ctautau": float(np.real(ce_r[2, 2] - ce_l[2, 2])),
        },
        "ew_flavor_changing_magnitudes": {
            "sd": float(abs(cd_l[1, 0])),
            "bd": float(abs(cd_l[2, 0])),
            "bs": float(abs(cd_l[2, 1])),
        },
        "phenomenology": masses,
    }


runs = [evaluate(name, values) for name, values in MODELS.items()]
by_name = {run["model"]: run for run in runs}


def at(model: str, mass: float) -> dict:
    return next(
        point for point in by_name[model]["phenomenology"]
        if point["mass_GeV"] == mass
    )


ratios = {}
for mass in [0.1, 0.3]:
    inc = at("incidence_universal", mass)
    equal = at("equal_axial_universal", mass)
    top = at("top_right_only", mass)
    ratios[str(mass)] = {
        "incidence_over_equal_K_production": (
            inc["BR_Kplus_to_piplus_a"] / equal["BR_Kplus_to_piplus_a"]
        ),
        "incidence_over_top_K_production": (
            inc["BR_Kplus_to_piplus_a"] / top["BR_Kplus_to_piplus_a"]
        ),
        "incidence_over_equal_B_production": (
            inc["BR_Bplus_to_Kplus_a"] / equal["BR_Bplus_to_Kplus_a"]
        ),
        "incidence_over_top_B_production": (
            inc["BR_Bplus_to_Kplus_a"] / top["BR_Bplus_to_Kplus_a"]
        ),
        "incidence_over_equal_ctau": inc["ctau_m"] / equal["ctau_m"],
        "incidence_over_top_ctau": inc["ctau_m"] / top["ctau_m"],
    }


result = {
    "schema_version": 1,
    "tool": {"name": "alpaca-ALPs", "version": version("alpaca-ALPs")},
    "normalization": {
        "uv_scale_GeV": UV_SCALE,
        "fa_GeV": FA,
        "independent_gauge_coefficients": {"cG": 0, "cW": 0, "cB": 0},
        "common_uv_ctt": -10,
    },
    "caveats": [
        "The comparison uses ALPaca's Standard Model field content and therefore omits a right-handed neutrino.",
        "The top-right-only comparator is a declared minimal convention, not a unique definition of top-philic.",
        "Production branching ratios scale as 1/fa^2; the displayed same-fa ratios are scale independent at this order.",
    ],
    "runs": runs,
    "ratios": ratios,
}

print(json.dumps(result, indent=2))
