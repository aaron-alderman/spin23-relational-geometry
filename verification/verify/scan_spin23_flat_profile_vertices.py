#!/usr/bin/env python3
"""Census the packet H1/H2 vertices for the seven remaining flat probes."""

from __future__ import annotations

import concurrent.futures
import importlib.util
import json
from pathlib import Path

import numpy as np


ROOT = Path(__file__).resolve().parents[2]
ENGINE = ROOT / "verification" / "verify" / "verify_spin23_t132_pole_trace.py"
PROFILES = {
    "t001": {"001": 1.0},
    "t011": {"011": 1.0},
    "t021": {"021": 1.0},
    "t102": {"102": 1.0},
    "t112": {"112": 1.0},
    "t132": {"132": 1.0},
    "t001+t122": {"001": 1.0, "122": 1.0},
}


def load_engine():
    spec = importlib.util.spec_from_file_location("spin23_profile_trace", ENGINE)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


def evaluate(item):
    name, entries = item
    engine = load_engine()
    p = np.asarray((2.0, 3.0, 5.0, 7.0))
    q = np.asarray((1.0, 0.0, 0.0, 0.0))
    source = engine.torsion_to_contorsion(entries)
    linear = engine.hessian_sectors(p, -p-q, q, source_pair=False, include_torsion=False, p_source=source)
    reverse = engine.hessian_sectors(p+q, -p, -q, source_pair=False, include_torsion=False, p_source=source)
    quadratic = engine.hessian_sectors(p, -p, q, source_pair=True, p_source=source)
    g = 1.5
    h1 = linear["X1"] + g * linear["E1"]
    h1r = reverse["X1"] + g * reverse["E1"]
    h2 = quadratic["X2"] + g * quadratic["E2"]
    return name, {
        "contorsionNonzero": int(np.count_nonzero(source)),
        "H1Rank": int(np.linalg.matrix_rank(h1)),
        "H2Rank": int(np.linalg.matrix_rank(h2)),
        "H1Nonzero": int(np.count_nonzero(np.abs(h1) > 1e-12)),
        "H2Nonzero": int(np.count_nonzero(np.abs(h2) > 1e-12)),
        "reverseResidual": float(np.max(np.abs(h1r-h1.T.conj()))),
    }


def main():
    with concurrent.futures.ProcessPoolExecutor(max_workers=7) as pool:
        rows = list(pool.map(evaluate, PROFILES.items()))
    result = dict(rows)
    assert all(row["reverseResidual"] < 1e-10 for row in result.values())
    assert all(row["H1Rank"] > 0 and row["H2Rank"] > 0 for row in result.values())
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
