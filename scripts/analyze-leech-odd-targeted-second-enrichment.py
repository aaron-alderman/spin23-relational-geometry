#!/usr/bin/env python3
"""Target the six missing odd Ritz directions with a finite residual correction."""
import argparse
import heapq
import importlib.util
import json
import os

os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
os.environ.setdefault("OMP_NUM_THREADS", "1")

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_module(name, filename):
    spec = importlib.util.spec_from_file_location(name, os.path.join(ROOT, "scripts", filename))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


ENGINE = load_module("leech_z2_engine", "smoke-leech-z2-block-dmrg.py")
SEED = load_module("leech_odd_seed", "analyze-leech-odd-ritz-seed.py")


def add_row(rows, key, value):
    row = rows.get(key)
    if row is None:
        rows[key] = value.copy()
    else:
        row += value


def apply_h_to_rows(rows, metric, values, charge, charge2, ratio):
    width = len(next(iter(rows.values())))
    output = {}
    transitions = 0
    for configuration, coefficients in rows.items():
        add_row(output, configuration, sum(values[m] for m in configuration) * coefficients)
        charged = SEED.apply_charging(configuration, metric, charge, charge2, ratio)
        transitions += len(charged)
        for target, amplitude in charged.items():
            add_row(output, target, amplitude * coefficients)
    return {key: row for key, row in output.items()
            if np.max(np.abs(row)) > 1e-14}, transitions, width


def overlap(left, right, left_width, right_width):
    result = np.zeros((left_width, right_width))
    if len(left) > len(right):
        left, right = right, left
        transpose = True
    else:
        transpose = False
    for key, left_row in left.items():
        right_row = right.get(key)
        if right_row is not None:
            if transpose:
                result += np.outer(right_row, left_row)
            else:
                result += np.outer(left_row, right_row)
    return result


def combine_rows(first, first_matrix, second=None, second_matrix=None):
    output = {}
    for key, row in first.items():
        add_row(output, key, row @ first_matrix)
    if second is not None:
        for key, row in second.items():
            add_row(output, key, row @ second_matrix)
    return {key: row for key, row in output.items()
            if np.max(np.abs(row)) > 1e-14}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--cutoff", type=int, default=2)
    parser.add_argument("--ratio", type=float, default=0.01)
    parser.add_argument("--order", choices=("natural", "optimized"), default="optimized")
    parser.add_argument("--keep", type=int, default=4000)
    parser.add_argument("--selection", choices=("aggregate", "balanced"), default="balanced")
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    sites = 24
    metric = ENGINE.load_metric(sites, args.order)
    values, parities, charge, charge2, _ = SEED.local_potential_basis(args.cutoff)
    even_mode = next(i for i, parity in enumerate(parities) if parity == 1)
    odd_mode = next(i for i, parity in enumerate(parities) if parity == -1)
    band_energy = (sites - 1) * values[even_mode] + values[odd_mode]

    configurations = []
    images = []
    for odd_site in range(sites):
        configuration = [even_mode] * sites
        configuration[odd_site] = odd_mode
        configuration = tuple(configuration)
        configurations.append(configuration)
        images.append(SEED.apply_charging(configuration, metric, charge, charge2, args.ratio))
    q0 = {configuration: np.eye(sites)[index]
          for index, configuration in enumerate(configurations)}
    q_index = {configuration: index for index, configuration in enumerate(configurations)}
    t0 = np.zeros((sites, sites))
    raw_r = {}
    for column, image in enumerate(images):
        for configuration, amplitude in image.items():
            if configuration in q_index:
                t0[q_index[configuration], column] += amplitude
            row = raw_r.setdefault(configuration, np.zeros(sites))
            row[column] += amplitude
    t0 = (t0 + t0.T) / 2
    for row_index, configuration in enumerate(configurations):
        raw_r[configuration] -= t0[row_index]
    raw_r = {key: row for key, row in raw_r.items()
             if np.max(np.abs(row)) > 1e-14}
    s1 = overlap(raw_r, raw_r, sites, sites)
    s1_values, s1_vectors = np.linalg.eigh(s1)
    s1_sqrt = (s1_vectors * np.sqrt(s1_values)) @ s1_vectors.T
    s1_inverse_sqrt = (s1_vectors * (1 / np.sqrt(s1_values))) @ s1_vectors.T
    q1 = combine_rows(raw_r, s1_inverse_sqrt)
    hq1, first_transitions, _ = apply_h_to_rows(
        q1, metric, values, charge, charge2, args.ratio
    )
    a0 = band_energy * np.eye(sites) + t0
    a1 = overlap(q1, hq1, sites, sites)
    first_projected = np.block([[a0, s1_sqrt], [s1_sqrt, a1]])
    first_projected = (first_projected + first_projected.T) / 2
    first_values, first_vectors = np.linalg.eigh(first_projected)
    separator = 21 * values[even_mode] + 3 * values[odd_mode]
    missing = np.arange(int(np.sum(first_values[:24] < separator)), 24)
    selected_vectors = first_vectors[:, missing]
    selected_rows = combine_rows(q0, selected_vectors[:sites], q1, selected_vectors[sites:])
    h_selected = combine_rows(hq1, selected_vectors[sites:])
    hq0_selected = {}
    for column, image in enumerate(images):
        coefficient = selected_vectors[column]
        for configuration, amplitude in image.items():
            add_row(hq0_selected, configuration, amplitude * coefficient)
        add_row(hq0_selected, configurations[column], band_energy * coefficient)
    for key, row in hq0_selected.items():
        add_row(h_selected, key, row)
    residual = dict(h_selected)
    for key, row in selected_rows.items():
        add_row(residual, key, -row * first_values[missing])
    residual = {key: row for key, row in residual.items()
                if np.max(np.abs(row)) > 1e-13}
    residual_norm_before = float(np.linalg.norm(overlap(residual, residual, len(missing), len(missing)), 2) ** 0.5)

    if args.selection == "aggregate":
        retained = heapq.nlargest(
            min(args.keep, len(residual)), residual.items(),
            key=lambda item: float(item[1] @ item[1])
        )
    else:
        per_direction = max(1, int(np.ceil(args.keep / len(missing))))
        retained_keys = set()
        for direction in range(len(missing)):
            retained_keys.update(key for key, _ in heapq.nlargest(
                min(per_direction, len(residual)), residual.items(),
                key=lambda item: float(item[1][direction] ** 2)
            ))
        retained = [(key, residual[key]) for key in retained_keys]
    candidate = {key: row.copy() for key, row in retained}
    q0_overlap = overlap(q0, candidate, sites, len(missing))
    q1_overlap = overlap(q1, candidate, sites, len(missing))
    correction = combine_rows(q0, -q0_overlap, q1, -q1_overlap)
    for key, row in correction.items():
        add_row(candidate, key, row)
    candidate = {key: row for key, row in candidate.items()
                 if np.max(np.abs(row)) > 1e-14}
    s2 = overlap(candidate, candidate, len(missing), len(missing))
    s2_values, s2_vectors = np.linalg.eigh(s2)
    if s2_values[0] <= 1e-14:
        raise RuntimeError("targeted correction lost rank")
    s2_inverse_sqrt = (s2_vectors * (1 / np.sqrt(s2_values))) @ s2_vectors.T
    q2 = combine_rows(candidate, s2_inverse_sqrt)
    hq2, second_transitions, _ = apply_h_to_rows(
        q2, metric, values, charge, charge2, args.ratio
    )
    b02 = overlap(q0, hq2, sites, len(missing))
    b12 = overlap(q1, hq2, sites, len(missing))
    a2 = overlap(q2, hq2, len(missing), len(missing))
    projected = np.block([
        [a0, s1_sqrt, b02],
        [s1_sqrt, a1, b12],
        [b02.T, b12.T, a2]
    ])
    projected = (projected + projected.T) / 2
    ritz_values = np.linalg.eigvalsh(projected)
    output = {
        "schemaVersion": "leech-odd-targeted-second-enrichment-v1",
        "date": "2026-10-25",
        "configuration": {
            "sites": sites, "cutoff": args.cutoff, "ratio": args.ratio,
            "order": args.order, "retainedResidualConfigurations": len(retained),
            "selection": args.selection,
            "requestedResidualBudget": args.keep,
            "projectedDimension": int(2 * sites + len(missing))
        },
        "firstEnrichment": {
            "valuesBelowSeparator": int(np.sum(first_values < separator)),
            "missingIndicesWithinLowest24": missing.tolist(),
            "selectedResidualSupport": len(residual),
            "selectedResidualBlockNorm": residual_norm_before,
            "chargingTransitions": first_transitions
        },
        "targetedCorrection": {
            "orthogonalityToQ0Maximum": float(np.max(np.abs(overlap(q0, q2, sites, len(missing))))),
            "orthogonalityToQ1Maximum": float(np.max(np.abs(overlap(q1, q2, sites, len(missing))))),
            "gramIdentityMaximumError": float(np.max(np.abs(overlap(q2, q2, len(missing), len(missing)) - np.eye(len(missing))))),
            "minimumPreNormalizationGramEigenvalue": float(s2_values[0]),
            "supportAfterReorthogonalization": len(q2),
            "chargingTransitions": second_transitions
        },
        "projectedSpectrum": {
            "ritzValues": ritz_values.tolist(),
            "lowest": float(ritz_values[0]),
            "twentyFourth": float(ritz_values[23]),
            "separator": float(separator),
            "numberBelowSeparator": int(np.sum(ritz_values < separator)),
            "lowest24BelowSeparator": bool(np.all(ritz_values[:24] < separator))
        },
        "admission": {
            "variationalProjectionValid": True,
            "exteriorResidualComputed": False,
            "lehmannBoundsComputed": False,
            "boundary": "The targeted finite correction is a valid enlarged Rayleigh-Ritz space. Even if all 24 values cross the separator, an exterior residual enclosure is still required for Lehmann admission."
        }
    }
    if args.write:
        target = os.path.join(ROOT, "evidence", "data", "leech-odd-targeted-second-enrichment-v1.json")
        with open(target, "w", encoding="utf8") as stream:
            json.dump(output, stream, indent=2)
            stream.write("\n")
    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
