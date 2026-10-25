#!/usr/bin/env python3
"""Search disjoint three-charge lower operators for the joined Leech rotor."""
import argparse
import json
import os
import random
import subprocess

os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
os.environ.setdefault("OMP_NUM_THREADS", "1")

import numpy as np
import scipy.linalg
import scipy.optimize

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_metric():
    raw = subprocess.check_output([
        "node", os.path.join(ROOT, "scripts", "analyze-leech-pareto-transformers.mjs"),
        "--full"
    ], text=True)
    gram = np.asarray(next(item for item in json.loads(raw)["results"]
                           if item["id"] == "gram-first")["gram"], dtype=float)
    return np.rint(np.linalg.inv(gram)).astype(float)


def operators(cutoff):
    local = 2 * cutoff + 1
    values = np.arange(-cutoff, cutoff + 1, dtype=float)
    identity = np.eye(local)
    shift = np.diag(np.ones(local - 1), 1)
    shift += shift.T
    potential = identity - shift / 2
    charges = []
    potentials = []
    for site in range(3):
        factors_q = [identity] * 3
        factors_v = [identity] * 3
        factors_q[site] = np.diag(values)
        factors_v[site] = potential
        charge = factors_q[0]
        local_potential = factors_v[0]
        for factor in factors_q[1:]:
            charge = np.kron(charge, factor)
        for factor in factors_v[1:]:
            local_potential = np.kron(local_potential, factor)
        charges.append(charge)
        potentials.append(local_potential)
    total_potential = sum(potentials)

    dimension = local ** 3
    inversion = np.zeros((dimension, dimension))
    for flat in range(dimension):
        digits = []
        value = flat
        for _ in range(3):
            digits.append(value % local)
            value //= local
        partner_digits = [local - 1 - digit for digit in digits]
        partner = sum(digit * local ** index
                      for index, digit in enumerate(partner_digits))
        inversion[partner, flat] = 1
    parity_values, parity_vectors = np.linalg.eigh(inversion)
    even = parity_vectors[:, parity_values > 0]
    odd = parity_vectors[:, parity_values < 0]
    charge_products = [[charges[i] @ charges[j] for j in range(3)]
                       for i in range(3)]
    return total_potential, charge_products, even, odd


def cluster_levels(block, scale, ratio, prepared):
    potential, charge_products, even_basis, odd_basis = prepared
    hamiltonian = potential.copy()
    for i in range(3):
        for j in range(3):
            hamiltonian += ratio * scale / 2 * block[i, j] * charge_products[i][j]
    even = scipy.linalg.eigh(even_basis.T @ hamiltonian @ even_basis,
                             subset_by_index=(0, 0), check_finite=False)[0][0]
    odd = scipy.linalg.eigh(odd_basis.T @ hamiltonian @ odd_basis,
                            subset_by_index=(0, 0), check_finite=False)[0][0]
    return float(even), float(odd)


def evaluate(metric, blocks, ratio, even_upper, prepared):
    block_matrix = np.zeros_like(metric)
    for block in blocks:
        indices = np.ix_(block, block)
        block_matrix[indices] = metric[indices]
    scale = float(scipy.linalg.eigvalsh(
        metric, block_matrix, subset_by_index=(0, 0), check_finite=False
    )[0])
    safe_scale = scale * (1 - 1e-10)
    levels = [
        cluster_levels(metric[np.ix_(block, block)], safe_scale, ratio, prepared)
        for block in blocks
    ]
    even = sum(pair[0] for pair in levels)
    odd = even + min(pair[1] - pair[0] for pair in levels)
    return {
        "blocksZeroBased": [list(block) for block in blocks],
        "scale": scale,
        "safeScale": safe_scale,
        "residualSmallestEigenvalue":
            float(np.linalg.eigvalsh(metric - safe_scale * block_matrix)[0]),
        "evenLower": even,
        "oddLower": odd,
        "gapLower": odd - even_upper,
        "clusterParityGaps": [pair[1] - pair[0] for pair in levels]
    }


def optimize_weights(metric, candidate, ratio, even_upper, prepared, iterations):
    blocks = [tuple(block) for block in candidate["blocksZeroBased"]]
    block_matrices = []
    for block in blocks:
        embedded = np.zeros_like(metric)
        indices = np.ix_(block, block)
        embedded[indices] = metric[indices]
        block_matrices.append(embedded)

    initial_weights = np.full(8, candidate["safeScale"] * 0.9)
    initial_levels = [
        cluster_levels(metric[np.ix_(block, block)], initial_weights[index],
                       ratio, prepared)
        for index, block in enumerate(blocks)
    ]
    initial_gap = min(odd - even for even, odd in initial_levels) * 0.99
    initial = np.append(initial_weights, initial_gap)

    def levels(variables):
        return [
            cluster_levels(metric[np.ix_(block, block)], variables[index],
                           ratio, prepared)
            for index, block in enumerate(blocks)
        ]

    def objective(variables):
        cluster = levels(variables)
        return -(sum(pair[0] for pair in cluster) + variables[-1])

    def psd_constraint(variables):
        remainder = metric.copy()
        for weight, embedded in zip(variables[:-1], block_matrices):
            remainder -= weight * embedded
        return float(np.linalg.eigvalsh(remainder)[0])

    def parity_constraints(variables):
        return np.asarray([
            odd - even - variables[-1] for even, odd in levels(variables)
        ])

    result = scipy.optimize.minimize(
        objective, initial, method="SLSQP",
        bounds=[(0.0, 1.0)] * 8 + [(0.0, 2.0)],
        constraints=[
            {"type": "ineq", "fun": psd_constraint},
            {"type": "ineq", "fun": parity_constraints}
        ],
        options={"maxiter": iterations, "ftol": 1e-11, "disp": False}
    )
    cluster = levels(result.x)
    even = sum(pair[0] for pair in cluster)
    odd = even + min(pair[1] - pair[0] for pair in cluster)
    return {
        "blocksZeroBased": [list(block) for block in blocks],
        "optimizerSuccess": bool(result.success),
        "optimizerMessage": result.message,
        "optimizerIterations": int(result.nit),
        "weights": result.x[:-1].tolist(),
        "auxiliaryWorstParityGap": float(result.x[-1]),
        "residualSmallestEigenvalue": psd_constraint(result.x),
        "minimumParityConstraint": float(np.min(parity_constraints(result.x))),
        "evenLower": even,
        "oddLower": odd,
        "gapLower": odd - even_upper,
        "clusterParityGaps": [pair[1] - pair[0] for pair in cluster]
    }


def partition(rng):
    order = list(range(24))
    rng.shuffle(order)
    return [tuple(sorted(order[index:index + 3]))
            for index in range(0, 24, 3)]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--cutoff", type=int, default=2)
    parser.add_argument("--ratio", type=float, default=0.01)
    parser.add_argument("--samples", type=int, default=200)
    parser.add_argument("--seed", type=int, default=210)
    parser.add_argument("--optimization-iterations", type=int, default=1000)
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    if args.cutoff != 2:
        raise ValueError("reconnaissance is currently frozen to cutoff two")
    metric = load_metric()
    prepared = operators(args.cutoff)
    upper = 3.8731239099585157
    rng = random.Random(args.seed)
    candidates = []
    natural = [tuple(range(index, index + 3)) for index in range(0, 24, 3)]
    candidates.append(evaluate(metric, natural, args.ratio, upper, prepared))
    for _ in range(args.samples):
        candidates.append(evaluate(
            metric, partition(rng), args.ratio, upper, prepared
        ))
    candidates.sort(key=lambda row: row["gapLower"], reverse=True)
    optimized = optimize_weights(
        metric, candidates[0], args.ratio, upper, prepared,
        args.optimization_iterations
    )
    output = {
        "schemaVersion": "leech-triple-block-enclosure-reconnaissance-v1",
        "cutoff": args.cutoff,
        "ratio": args.ratio,
        "samples": args.samples,
        "best": candidates[:10],
        "independentlyWeightedBestPartition": optimized,
        "certified": False,
        "boundary": "Floating-point block-Jacobi reconnaissance only; a positive candidate requires exact PSD and outward-rounded cluster certificates."
    }
    if args.write:
        target = os.path.join(
            ROOT, "evidence", "data",
            "leech-triple-block-enclosure-reconnaissance-v1.json"
        )
        with open(target, "w", encoding="utf8") as stream:
            json.dump(output, stream, indent=2)
            stream.write("\n")
    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
