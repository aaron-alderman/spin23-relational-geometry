#!/usr/bin/env python3
"""One exact-algebra block-Lanczos enrichment of the 24-vector odd seed."""
import argparse
import importlib.util
import json
import os

os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
os.environ.setdefault("OMP_NUM_THREADS", "1")

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_module(name, filename):
    spec = importlib.util.spec_from_file_location(
        name, os.path.join(ROOT, "scripts", filename)
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


ENGINE = load_module("leech_z2_engine", "smoke-leech-z2-block-dmrg.py")
SEED = load_module("leech_odd_seed", "analyze-leech-odd-ritz-seed.py")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--cutoff", type=int, default=2)
    parser.add_argument("--ratio", type=float, default=0.01)
    parser.add_argument("--order", choices=("natural", "optimized"), default="optimized")
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    sites = 24
    metric = ENGINE.load_metric(sites, args.order)
    values, parities, charge, charge2, _ = SEED.local_potential_basis(args.cutoff)
    even_mode = next(index for index, parity in enumerate(parities) if parity == 1)
    odd_mode = next(index for index, parity in enumerate(parities) if parity == -1)
    band_energy = (sites - 1) * values[even_mode] + values[odd_mode]

    configurations = []
    images = []
    for odd_site in range(sites):
        configuration = [even_mode] * sites
        configuration[odd_site] = odd_mode
        configuration = tuple(configuration)
        configurations.append(configuration)
        images.append(SEED.apply_charging(
            configuration, metric, charge, charge2, args.ratio
        ))
    q_index = {configuration: index
               for index, configuration in enumerate(configurations)}

    projected_t = np.zeros((sites, sites))
    residual_rows = {}
    for column, image in enumerate(images):
        for configuration, amplitude in image.items():
            if configuration in q_index:
                projected_t[q_index[configuration], column] += amplitude
            row = residual_rows.setdefault(configuration, {})
            row[column] = row.get(column, 0.0) + amplitude
    projected_t = (projected_t + projected_t.T) / 2
    for row_index, configuration in enumerate(configurations):
        row = residual_rows[configuration]
        for column in range(sites):
            value = row.get(column, 0.0) - projected_t[row_index, column]
            if abs(value) < 1e-14:
                row.pop(column, None)
            else:
                row[column] = value
    residual_rows = {configuration: row for configuration, row
                     in residual_rows.items() if row}

    residual_gram = np.zeros((sites, sites))
    potential_moment = np.zeros((sites, sites))
    for configuration, sparse_row in residual_rows.items():
        indices = list(sparse_row)
        amplitudes = np.asarray([sparse_row[index] for index in indices])
        outer = np.outer(amplitudes, amplitudes)
        residual_gram[np.ix_(indices, indices)] += outer
        potential_energy = sum(values[mode] for mode in configuration)
        potential_moment[np.ix_(indices, indices)] += potential_energy * outer

    charging_moment = np.zeros((sites, sites))
    matched_transitions = 0
    total_transitions = 0
    for configuration, left_row in residual_rows.items():
        charged = SEED.apply_charging(
            configuration, metric, charge, charge2, args.ratio
        )
        left_indices = list(left_row)
        left_values = np.asarray([left_row[index] for index in left_indices])
        total_transitions += len(charged)
        for target, operator_amplitude in charged.items():
            right_row = residual_rows.get(target)
            if right_row is None:
                continue
            matched_transitions += 1
            right_indices = list(right_row)
            right_values = np.asarray([
                right_row[index] for index in right_indices
            ])
            charging_moment[np.ix_(left_indices, right_indices)] += (
                operator_amplitude * np.outer(left_values, right_values)
            )
    residual_h_moment = potential_moment + charging_moment
    residual_h_moment = (residual_h_moment + residual_h_moment.T) / 2

    s_values, s_vectors = np.linalg.eigh(residual_gram)
    if s_values[0] <= 1e-12:
        raise RuntimeError("residual block lost rank")
    s_sqrt = (s_vectors * np.sqrt(s_values)) @ s_vectors.T
    s_inverse_sqrt = (s_vectors * (1 / np.sqrt(s_values))) @ s_vectors.T
    a0 = band_energy * np.eye(sites) + projected_t
    a1 = s_inverse_sqrt @ residual_h_moment @ s_inverse_sqrt
    projected = np.block([[a0, s_sqrt], [s_sqrt, a1]])
    projected = (projected + projected.T) / 2
    ritz_values = np.linalg.eigvalsh(projected)
    odd_separator = 21 * values[even_mode] + 3 * values[odd_mode]

    # Dense validation of the entire block-Lanczos construction on four sites.
    control_sites = 4
    control_metric = ENGINE.load_metric(control_sites, "natural")
    control_configurations = []
    control_images = []
    for odd_site in range(control_sites):
        configuration = [even_mode] * control_sites
        configuration[odd_site] = odd_mode
        configuration = tuple(configuration)
        control_configurations.append(configuration)
        control_images.append(SEED.apply_charging(
            configuration, control_metric, charge, charge2, args.ratio
        ))
    control_index = {configuration: index for index, configuration
                     in enumerate(control_configurations)}
    control_t = np.zeros((control_sites, control_sites))
    control_rows = {}
    for column, image in enumerate(control_images):
        for configuration, amplitude in image.items():
            if configuration in control_index:
                control_t[control_index[configuration], column] += amplitude
            control_rows.setdefault(configuration, {})[column] = (
                control_rows.setdefault(configuration, {}).get(column, 0.0)
                + amplitude
            )
    control_t = (control_t + control_t.T) / 2
    for row_index, configuration in enumerate(control_configurations):
        row = control_rows[configuration]
        for column in range(control_sites):
            value = row.get(column, 0.0) - control_t[row_index, column]
            if abs(value) < 1e-14:
                row.pop(column, None)
            else:
                row[column] = value
    control_rows = {configuration: row for configuration, row
                    in control_rows.items() if row}
    control_s = np.zeros((control_sites, control_sites))
    control_m = np.zeros((control_sites, control_sites))
    for configuration, row in control_rows.items():
        indices = list(row)
        amplitudes = np.asarray([row[index] for index in indices])
        outer = np.outer(amplitudes, amplitudes)
        control_s[np.ix_(indices, indices)] += outer
        control_m[np.ix_(indices, indices)] += (
            sum(values[mode] for mode in configuration) * outer
        )
    for configuration, left_row in control_rows.items():
        charged = SEED.apply_charging(
            configuration, control_metric, charge, charge2, args.ratio
        )
        left_indices = list(left_row)
        left_values = np.asarray([left_row[index] for index in left_indices])
        for target, operator_amplitude in charged.items():
            right_row = control_rows.get(target)
            if right_row is None:
                continue
            right_indices = list(right_row)
            right_values = np.asarray([right_row[index]
                                       for index in right_indices])
            control_m[np.ix_(left_indices, right_indices)] += (
                operator_amplitude * np.outer(left_values, right_values)
            )
    control_m = (control_m + control_m.T) / 2
    control_s_values, control_s_vectors = np.linalg.eigh(control_s)
    control_s_sqrt = (
        control_s_vectors * np.sqrt(control_s_values)
    ) @ control_s_vectors.T
    control_s_inverse_sqrt = (
        control_s_vectors * (1 / np.sqrt(control_s_values))
    ) @ control_s_vectors.T
    control_band = (
        (control_sites - 1) * values[even_mode] + values[odd_mode]
    )
    control_a0 = control_band * np.eye(control_sites) + control_t
    control_projected = np.block([
        [control_a0, control_s_sqrt],
        [control_s_sqrt, control_s_inverse_sqrt @ control_m
         @ control_s_inverse_sqrt]
    ])
    control_projected = (control_projected + control_projected.T) / 2

    local_vectors = SEED.local_potential_basis(args.cutoff)[4]
    control_q0 = np.zeros((
        (2 * args.cutoff + 1) ** control_sites, control_sites
    ))
    for column, configuration in enumerate(control_configurations):
        vector = local_vectors[:, configuration[0]]
        for mode in configuration[1:]:
            vector = np.kron(vector, local_vectors[:, mode])
        control_q0[:, column] = vector
    control_h = ENGINE.build_mpo(
        control_metric, args.cutoff, args.ratio, False
    ).to_dense()
    dense_a0 = control_q0.T @ control_h @ control_q0
    dense_r = control_h @ control_q0 - control_q0 @ dense_a0
    dense_s_values, dense_s_vectors = np.linalg.eigh(dense_r.T @ dense_r)
    dense_q1 = dense_r @ (
        (dense_s_vectors * (1 / np.sqrt(dense_s_values)))
        @ dense_s_vectors.T
    )
    dense_q = np.column_stack((control_q0, dense_q1))
    dense_projected = dense_q.T @ control_h @ dense_q
    dense_control = {
        "sites": control_sites,
        "projectedMatrixMaximumError": float(np.max(np.abs(
            control_projected - dense_projected
        ))),
        "projectedSpectrumMaximumError": float(np.max(np.abs(
            np.linalg.eigvalsh(control_projected)
            - np.linalg.eigvalsh(dense_projected)
        )))
    }

    output = {
        "schemaVersion": "leech-odd-block-lanczos-step-v1",
        "date": "2026-10-25",
        "configuration": {
            "sites": sites,
            "cutoff": args.cutoff,
            "ratio": args.ratio,
            "order": args.order,
            "initialDimension": sites,
            "enrichedDimension": 2 * sites
        },
        "residualSpace": {
            "productConfigurations": len(residual_rows),
            "minimumGramEigenvalue": float(s_values[0]),
            "maximumGramEigenvalue": float(s_values[-1]),
            "totalChargingTransitions": total_transitions,
            "matchedChargingTransitions": matched_transitions
        },
        "projectedSpectrum": {
            "ritzValues": ritz_values.tolist(),
            "lowest": float(ritz_values[0]),
            "twentyFourth": float(ritz_values[23]),
            "twentyFifth": float(ritz_values[24]),
            "highest": float(ritz_values[-1]),
            "oddSeparator": float(odd_separator),
            "lowest24BelowSeparator": bool(np.all(ritz_values[:24] < odd_separator)),
            "numberBelowSeparator": int(np.sum(ritz_values < odd_separator))
        },
        "denseControl": dense_control,
        "admission": {
            "blockLanczosAlgebraClosed": True,
            "residualOfEnrichedSubspaceComputed": False,
            "lehmannBoundsComputed": False,
            "boundary": "The 48-dimensional Rayleigh matrix is an exact first block-Lanczos projection in floating arithmetic. Its exterior residual block requires one further Hamiltonian moment before Lehmann admission."
        }
    }
    if args.write:
        target = os.path.join(
            ROOT, "evidence", "data",
            "leech-odd-block-lanczos-step-v1.json"
        )
        with open(target, "w", encoding="utf8") as stream:
            json.dump(output, stream, indent=2)
            stream.write("\n")
    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
