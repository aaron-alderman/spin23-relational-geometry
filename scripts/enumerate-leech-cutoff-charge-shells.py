#!/usr/bin/env python3
"""Enumerate short dual-Leech charge vectors inside a finite coordinate box."""
import argparse
import importlib.util
import json
import os
from collections import deque
import subprocess
import sys

os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
os.environ.setdefault("OMP_NUM_THREADS", "1")

import numpy as np
from numba import njit

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_engine():
    path = os.path.join(ROOT, "scripts", "smoke-leech-z2-block-dmrg.py")
    spec = importlib.util.spec_from_file_location("leech_z2_engine", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def gram_schmidt_data(gram):
    dimension = len(gram)
    mu = np.zeros((dimension, dimension), dtype=float)
    norms = np.zeros(dimension, dtype=float)
    for row in range(dimension):
        for column in range(row):
            value = float(gram[row, column])
            for earlier in range(column):
                value -= mu[row, earlier] * mu[column, earlier] * norms[earlier]
            mu[row, column] = value / norms[column]
        value = float(gram[row, row])
        for earlier in range(row):
            value -= mu[row, earlier] ** 2 * norms[earlier]
        norms[row] = value
    return mu, norms


def lll_reduce_gram(metric, delta=0.99):
    dimension = len(metric)
    basis = np.eye(dimension, dtype=np.int64)
    swaps = 0
    reductions = 0
    index = 1
    while index < dimension:
        gram = basis.T @ metric @ basis
        mu, norms = gram_schmidt_data(gram)
        changed = False
        for earlier in range(index - 1, -1, -1):
            coefficient = int(np.rint(mu[index, earlier]))
            if coefficient:
                basis[:, index] -= coefficient * basis[:, earlier]
                reductions += 1
                changed = True
                gram = basis.T @ metric @ basis
                mu, norms = gram_schmidt_data(gram)
        if norms[index] >= (delta - mu[index, index - 1] ** 2) * norms[index - 1] - 1e-12:
            index += 1
        else:
            basis[:, [index - 1, index]] = basis[:, [index, index - 1]]
            swaps += 1
            index = max(1, index - 1)
    reduced = basis.T @ metric @ basis
    return basis, reduced, swaps, reductions


@njit(cache=True)
def enumerate_recursive(index, partial, maximum_norm, cutoff, upper, basis,
                        metric, vector, output, output_count, visited):
    visited[0] += 1
    if index < 0:
        physical = np.zeros(len(vector), dtype=np.int64)
        for row in range(len(vector)):
            for column in range(len(vector)):
                physical[row] += basis[row, column] * vector[column]
            if abs(physical[row]) > cutoff:
                return
        exact = 0
        for row in range(len(vector)):
            for column in range(len(vector)):
                exact += physical[row] * metric[row, column] * physical[column]
        if exact <= maximum_norm and exact % 2 == 0:
            position = output_count[0]
            if position >= len(output):
                raise RuntimeError("short-vector output capacity exceeded")
            output[position] = physical
            output_count[0] += 1
        return
    tail = 0.0
    for column in range(index + 1, len(vector)):
        tail += upper[index, column] * vector[column]
    remaining = maximum_norm - partial
    if remaining < -1e-10:
        return
    radius = np.sqrt(max(0.0, remaining)) / upper[index, index]
    center = -tail / upper[index, index]
    lower = int(np.ceil(center - radius - 1e-10))
    upper_bound = int(np.floor(center + radius + 1e-10))
    for value in range(lower, upper_bound + 1):
        vector[index] = value
        term = (upper[index, index] * value + tail) ** 2
        enumerate_recursive(index - 1, partial + term, maximum_norm, cutoff,
                            upper, basis, metric, vector, output,
                            output_count, visited)
    vector[index] = 0


@njit(cache=True)
def enumerate_compiled(maximum_norm, cutoff, upper, basis, metric):
    # The complete Leech norm-four shell has 196560 vectors; leave headroom.
    output = np.zeros((250000, len(metric)), dtype=np.int64)
    output_count = np.zeros(1, dtype=np.int64)
    visited = np.zeros(1, dtype=np.int64)
    vector = np.zeros(len(metric), dtype=np.int64)
    enumerate_recursive(len(metric) - 1, 0.0, maximum_norm, cutoff, upper,
                        basis, metric, vector, output, output_count, visited)
    return output[:output_count[0]], visited[0]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--cutoff", type=int, default=2)
    parser.add_argument("--maximum-norm", type=int, default=4)
    parser.add_argument("--order", choices=("natural", "optimized"), default="optimized")
    parser.add_argument("--method", choices=("orbit", "enumeration"), default="orbit")
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    engine = load_engine()
    metric = np.rint(engine.load_metric(24, args.order)).astype(np.int64)
    shells = {value: [] for value in range(0, args.maximum_norm + 1, 2)}
    swaps = reductions = 0
    reduced_maximum_diagonal = None
    basis_determinant = None
    declared_shell_size = None
    if args.method == "enumeration":
        basis, reduced_metric, swaps, reductions = lll_reduce_gram(metric)
        upper = np.linalg.cholesky(reduced_metric.astype(float)).T
        vectors, visited = enumerate_compiled(
            args.maximum_norm, args.cutoff, upper, basis, metric
        )
        reduced_maximum_diagonal = int(np.max(np.diag(reduced_metric)))
        basis_determinant = int(np.rint(np.linalg.det(basis.astype(float))))
        for vector in vectors:
            exact = int(vector @ metric @ vector)
            shells.setdefault(exact, []).append(tuple(int(x) for x in vector))
    else:
        explicit = json.load(open(os.path.join(
            ROOT, "evidence", "data", "leech-explicit-k-matrix-v1.json"
        ), encoding="utf8"))
        generator_record = json.load(open(os.path.join(
            ROOT, "evidence", "data", "leech-catalogue-automorphism-generators-v1.json"
        ), encoding="utf8"))
        catalogue_metric = np.asarray(explicit["K"], dtype=np.int64)
        declared_shell_size = int(explicit["source"]["catalogueClaims"]["kissingNumber"])
        generators = [np.asarray(item, dtype=np.int64)
                      for item in generator_record["generators"]]
        generators += [np.rint(np.linalg.inv(item)).astype(np.int64)
                       for item in generators]
        for generator in generators:
            if not np.array_equal(generator @ catalogue_metric @ generator.T,
                                  catalogue_metric):
                raise RuntimeError("catalogue generator failed exact Gram preservation")
        seed = tuple([1] + [0] * 23)
        orbit = {seed}
        frontier = [seed]
        visited = 0
        orbit_round = 0
        while frontier:
            orbit_round += 1
            block = np.asarray(frontier, dtype=np.int64)
            new_frontier = []
            for generator in generators:
                for target in block @ generator:
                    visited += 1
                    key = tuple(int(value) for value in target)
                    if key not in orbit:
                        orbit.add(key)
                        new_frontier.append(key)
            frontier = new_frontier
            print(f"orbit round {orbit_round}: total={len(orbit)} frontier={len(frontier)}",
                  file=sys.stderr, flush=True)
            if len(orbit) > declared_shell_size:
                raise RuntimeError("minimal-vector orbit exceeded catalogue kissing number")
        if len(orbit) != declared_shell_size:
            raise RuntimeError(f"minimal-vector orbit has {len(orbit)}, expected {declared_shell_size}")
        run = json.loads(subprocess.check_output([
            "node", os.path.join(ROOT, "scripts", "analyze-leech-pareto-transformers.mjs"), "--full"
        ], text=True))
        candidate = next(item for item in run["results"] if item["id"] == "gram-first")
        transform = np.asarray(candidate["transform"], dtype=np.int64)
        dual_transform = catalogue_metric @ transform
        indices = np.arange(24)
        if args.order == "optimized":
            indices = np.asarray([22, 20, 9, 21, 1, 12, 4, 7, 24, 18, 6, 10,
                                  11, 8, 5, 3, 2, 13, 19, 23, 16, 14, 17, 15]) - 1
        orbit_array = np.asarray(list(orbit), dtype=np.int64)
        transported = (orbit_array @ dual_transform)[:, indices]
        transported = transported[np.max(np.abs(transported), axis=1) <= args.cutoff]
        exact_norms = np.einsum("bi,ij,bj->b", transported, metric, transported)
        if not np.all(exact_norms == 4):
            raise RuntimeError("transported minimal vector changed norm")
        shells[4] = [tuple(int(value) for value in physical)
                     for physical in transported]
        shells[0].append(tuple([0] * 24))
    shell_counts = {str(norm): len(vectors) for norm, vectors in shells.items()}
    shell_sets = {norm: set(vectors) for norm, vectors in shells.items()}
    inversion_closed = all(
        tuple(-x for x in vector) in shell_sets[norm]
        for norm, vectors in shells.items() for vector in vectors
    )
    norm4 = set(shells.get(4, []))
    powers = [5 ** site for site in range(24)]
    encoded = {
        sum((coordinate + args.cutoff) * powers[site]
            for site, coordinate in enumerate(charge))
        for charge in norm4
    }
    directed_edges = 0
    degrees = []
    cutoff_blocked_hops = 0
    exterior_edges_by_norm = {}
    norm4_list = list(norm4)
    norm4_gradients = np.asarray(norm4_list, dtype=np.int64) @ metric
    for charge, gradient in zip(norm4_list, norm4_gradients):
        code = sum((coordinate + args.cutoff) * powers[site]
                   for site, coordinate in enumerate(charge))
        degree = 0
        for site in range(24):
            for delta in (-1, 1):
                if abs(charge[site] + delta) > args.cutoff:
                    cutoff_blocked_hops += 1
                    continue
                target_code = code + delta * powers[site]
                if target_code in encoded:
                    degree += 1
                else:
                    target_norm = int(4 + 2 * delta * gradient[site]
                                      + metric[site, site])
                    exterior_edges_by_norm[target_norm] = (
                        exterior_edges_by_norm.get(target_norm, 0) + 1
                    )
        directed_edges += degree
        degrees.append(degree)
    output = {
        "schemaVersion": "leech-cutoff-charge-shell-enumeration-v1",
        "date": "2026-10-25",
        "configuration": {
            "sites": 24,
            "cutoff": args.cutoff,
            "maximumNorm": args.maximum_norm,
            "order": args.order,
            "method": args.method
        },
        "enumeration": {
            "visitedOrbitImages": visited if args.method == "orbit" else None,
            "visitedRecursionNodes": visited if args.method == "enumeration" else None,
            "catalogueDeclaredNormFourShell": declared_shell_size,
            "generatedNormFourOrbit": declared_shell_size if args.method == "orbit" else None,
            "excludedNormFourVectorsByCutoff": (
                declared_shell_size - len(norm4) if declared_shell_size is not None else None
            ),
            "lllSwaps": swaps,
            "lllSizeReductions": reductions,
            "reducedGramMaximumDiagonal": reduced_maximum_diagonal,
            "basisDeterminantRounded": basis_determinant,
            "shellCounts": shell_counts,
            "nonzeroNormsFound": [int(norm) for norm, vectors in shells.items() if norm and vectors],
            "minimumNonzeroNorm": min((norm for norm, vectors in shells.items() if norm and vectors), default=None),
            "inversionClosed": inversion_closed
        },
        "normFourSingleChargeGraph": {
            "vertices": len(norm4),
            "undirectedEdges": directed_edges // 2,
            "minimumDegree": min(degrees, default=0),
            "maximumDegree": max(degrees, default=0),
            "meanDegree": float(np.mean(degrees)) if degrees else 0.0,
            "isolatedVertices": sum(degree == 0 for degree in degrees),
            "degreeHistogram": {
                str(degree): degrees.count(degree) for degree in sorted(set(degrees))
            },
            "restrictedPotentialGershgorinLower": 24 - max(degrees, default=0) / 2,
            "restrictedHamiltonianLowerAtRatioPoint01": (
                24 - max(degrees, default=0) / 2 + 0.02
            ),
            "coordinateCutoffBlockedHops": cutoff_blocked_hops,
            "exteriorHops": sum(exterior_edges_by_norm.values()),
            "exteriorHopsByTargetNorm": {
                str(norm): count for norm, count in sorted(exterior_edges_by_norm.items())
            }
        },
        "boundary": (
            "The group-orbit route exactly matches the source catalogue's declared 196560-vector kissing shell, transports it through an integral basis map, and checks every retained norm with integer arithmetic. Completeness is relative to the catalogue kissing-number datum. The restricted-shell Gershgorin bound does not bound the full Hamiltonian because inter-shell hopping remains active."
            if args.method == "orbit" else
            "The branch-and-bound route uses floating Cholesky intervals with an expanded tolerance and exact integer acceptance. Its counts are reconnaissance, not an outward-rounded completeness proof."
        )
    }
    if args.write:
        target = os.path.join(ROOT, "evidence", "data", "leech-cutoff-charge-shell-enumeration-v1.json")
        with open(target, "w", encoding="utf8") as stream:
            json.dump(output, stream, indent=2)
            stream.write("\n")
    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
