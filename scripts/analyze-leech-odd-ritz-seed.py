#!/usr/bin/env python3
"""Build the 24-dimensional potential-band odd Ritz seed and residual block."""
import argparse
import importlib.util
import json
import os

os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
os.environ.setdefault("OMP_NUM_THREADS", "1")

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENGINE_PATH = os.path.join(ROOT, "scripts", "smoke-leech-z2-block-dmrg.py")
SPEC = importlib.util.spec_from_file_location("leech_z2_engine", ENGINE_PATH)
ENGINE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(ENGINE)


def local_potential_basis(cutoff):
    identity, physical_charge, physical_charge2, shift, parity_charges = (
        ENGINE.parity_operators(cutoff)
    )
    dimension = len(identity)
    potential = identity - shift / 2
    values, vectors = np.linalg.eigh(potential)
    inversion = np.diag([1 if charge_value == 0 else -1
                         for charge_value in parity_charges])
    parities = [
        int(round(float(vectors[:, index] @ inversion @ vectors[:, index])))
        for index in range(dimension)
    ]
    charge = vectors.T @ physical_charge @ vectors
    charge2 = vectors.T @ physical_charge2 @ vectors
    return values, parities, charge, charge2, vectors


def add_amplitude(target, configuration, amplitude):
    if abs(amplitude) < 1e-15:
        return
    target[configuration] = target.get(configuration, 0.0) + amplitude


def apply_charging(configuration, metric, charge, charge2, ratio):
    sites = len(configuration)
    dimension = charge.shape[0]
    output = {}
    for site in range(sites):
        source = configuration[site]
        coefficient = ratio * metric[site, site] / 2
        for target_mode in range(dimension):
            modified = list(configuration)
            modified[site] = target_mode
            add_amplitude(
                output, tuple(modified),
                coefficient * charge2[target_mode, source]
            )
    for first in range(sites):
        first_source = configuration[first]
        for second in range(first + 1, sites):
            coefficient = ratio * metric[first, second]
            if coefficient == 0:
                continue
            second_source = configuration[second]
            for first_target in range(dimension):
                first_element = charge[first_target, first_source]
                if abs(first_element) < 1e-15:
                    continue
                for second_target in range(dimension):
                    amplitude = coefficient * first_element * charge[
                        second_target, second_source
                    ]
                    if abs(amplitude) < 1e-15:
                        continue
                    modified = list(configuration)
                    modified[first] = first_target
                    modified[second] = second_target
                    add_amplitude(output, tuple(modified), amplitude)
    return output


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--cutoff", type=int, default=2)
    parser.add_argument("--ratio", type=float, default=0.01)
    parser.add_argument("--order", choices=("natural", "optimized"), default="optimized")
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    sites = 24
    metric = ENGINE.load_metric(sites, args.order)
    values, parities, charge, charge2, local_vectors = local_potential_basis(args.cutoff)
    even_mode = next(index for index, parity in enumerate(parities) if parity == 1)
    odd_mode = next(index for index, parity in enumerate(parities) if parity == -1)
    band_energy = (sites - 1) * values[even_mode] + values[odd_mode]

    configurations = []
    images = []
    for odd_site in range(sites):
        configuration = [even_mode] * sites
        configuration[odd_site] = odd_mode
        configurations.append(tuple(configuration))
        images.append(apply_charging(
            tuple(configuration), metric, charge, charge2, args.ratio
        ))

    index = {configuration: position
             for position, configuration in enumerate(configurations)}
    projected_charging = np.zeros((sites, sites))
    for column, image in enumerate(images):
        for configuration, amplitude in image.items():
            if configuration in index:
                projected_charging[index[configuration], column] += amplitude
    projected_charging = (
        projected_charging + projected_charging.T
    ) / 2

    by_configuration = {}
    for column, image in enumerate(images):
        for configuration, amplitude in image.items():
            row = by_configuration.setdefault(
                configuration, np.zeros(sites)
            )
            row[column] += amplitude
    charging_squared = np.zeros((sites, sites))
    for amplitudes in by_configuration.values():
        charging_squared += np.outer(amplitudes, amplitudes)

    rayleigh_matrix = band_energy * np.eye(sites) + projected_charging
    ritz_values, ritz_vectors = np.linalg.eigh(rayleigh_matrix)
    residual_gram_seed = charging_squared - projected_charging @ projected_charging
    residual_gram_seed = (residual_gram_seed + residual_gram_seed.T) / 2
    residual_gram_ritz = ritz_vectors.T @ residual_gram_seed @ ritz_vectors
    residual_eigenvalues = np.linalg.eigvalsh(residual_gram_ritz)
    residual_norms = np.sqrt(np.maximum(0.0, np.diag(residual_gram_ritz)))
    block_residual_norm = float(np.sqrt(max(0.0, residual_eigenvalues[-1])))

    control_sites = 4
    control_metric = ENGINE.load_metric(control_sites, "natural")
    control_configurations = []
    control_images = []
    for odd_site in range(control_sites):
        configuration = [even_mode] * control_sites
        configuration[odd_site] = odd_mode
        control_configurations.append(tuple(configuration))
        control_images.append(apply_charging(
            tuple(configuration), control_metric, charge, charge2, args.ratio
        ))
    control_index = {configuration: position for position, configuration
                     in enumerate(control_configurations)}
    control_t = np.zeros((control_sites, control_sites))
    control_rows = {}
    for column, image in enumerate(control_images):
        for configuration, amplitude in image.items():
            if configuration in control_index:
                control_t[control_index[configuration], column] += amplitude
            control_rows.setdefault(configuration, np.zeros(control_sites))[column] += amplitude
    control_t = (control_t + control_t.T) / 2
    control_t2 = sum((np.outer(row, row) for row in control_rows.values()),
                     np.zeros((control_sites, control_sites)))
    control_band = (control_sites - 1) * values[even_mode] + values[odd_mode]
    control_a = control_band * np.eye(control_sites) + control_t
    control_residual_gram = control_t2 - control_t @ control_t

    control_q = np.zeros(((2 * args.cutoff + 1) ** control_sites, control_sites))
    for column, configuration in enumerate(control_configurations):
        vector = local_vectors[:, configuration[0]]
        for mode in configuration[1:]:
            vector = np.kron(vector, local_vectors[:, mode])
        control_q[:, column] = vector
    control_h = ENGINE.build_mpo(
        control_metric, args.cutoff, args.ratio, False
    ).to_dense()
    dense_a = control_q.T @ control_h @ control_q
    dense_residual = control_h @ control_q - control_q @ dense_a
    dense_residual_gram = dense_residual.T @ dense_residual
    dense_control = {
        "sites": control_sites,
        "rayleighMatrixMaximumError": float(np.max(np.abs(control_a - dense_a))),
        "residualGramMaximumError": float(np.max(np.abs(
            control_residual_gram - dense_residual_gram
        )))
    }

    odd_separator = 21 * values[even_mode] + 3 * values[odd_mode]
    output = {
        "schemaVersion": "leech-odd-ritz-seed-v1",
        "date": "2026-10-25",
        "configuration": {
            "sites": sites,
            "cutoff": args.cutoff,
            "ratio": args.ratio,
            "order": args.order,
            "subspace": "one lowest local inversion-odd potential mode on one site, lowest even mode elsewhere",
            "dimension": sites
        },
        "localPotential": {
            "eigenvalues": values.tolist(),
            "parities": parities,
            "evenModeIndex": even_mode,
            "oddModeIndex": odd_mode,
            "unperturbedBandEnergy": float(band_energy)
        },
        "projectedProblem": {
            "ritzValues": ritz_values.tolist(),
            "lowestRitz": float(ritz_values[0]),
            "highestRitz": float(ritz_values[-1]),
            "valuesBelowOddSeparator": int(np.sum(ritz_values < odd_separator)),
            "oddSeparator": float(odd_separator)
        },
        "residualBlock": {
            "individualNorms": residual_norms.tolist(),
            "minimumIndividualNorm": float(np.min(residual_norms)),
            "maximumIndividualNorm": float(np.max(residual_norms)),
            "spectralNorm": block_residual_norm,
            "minimumGramEigenvalue": float(residual_eigenvalues[0]),
            "maximumGramEigenvalue": float(residual_eigenvalues[-1])
        },
        "sparsity": {
            "distinctConfigurationsInChargingImages": len(by_configuration),
            "maximumConfigurationsPerImage": max(map(len, images))
        },
        "denseControl": dense_control,
        "admission": {
            "orthonormalRitzDimension": sites,
            "separatorDimensionRequirementMet": True,
            "allRitzValuesBelowSeparator": bool(np.all(ritz_values < odd_separator)),
            "lehmannLowerBoundsComputed": False,
            "reason": "This is an exact algebraic seed subspace in floating arithmetic; a validated block Lehmann solve and enriched residual convergence are still required."
        }
    }
    if args.write:
        target = os.path.join(
            ROOT, "evidence", "data", "leech-odd-ritz-seed-v1.json"
        )
        with open(target, "w", encoding="utf8") as stream:
            json.dump(output, stream, indent=2)
            stream.write("\n")
    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
