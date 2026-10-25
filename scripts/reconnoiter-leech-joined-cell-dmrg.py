#!/usr/bin/env python3
"""Variational reconnaissance for the joined 24-channel Leech rotor cell.

Requires numpy, scipy and quimb. This deliberately emits variational data,
not a spectral certificate; see Wave 7.191 for the required lower enclosure.
"""
import argparse
import json
import os
import pickle
import subprocess
import sys

os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
os.environ.setdefault("OMP_NUM_THREADS", "1")
os.environ.setdefault("MKL_NUM_THREADS", "1")

import numpy as np
import quimb.tensor as qtn

qtn.set_contract_strategy("greedy")


ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_metric(order):
    raw = subprocess.check_output([
        "node", os.path.join(ROOT, "scripts", "analyze-leech-pareto-transformers.mjs"), "--full"
    ], text=True)
    result = json.loads(raw)
    gram = np.asarray(next(item for item in result["results"]
                           if item["id"] == "gram-first")["gram"], dtype=float)
    inverse = np.rint(np.linalg.inv(gram)).astype(float)
    if np.max(np.abs(gram @ inverse - np.eye(24))) > 1e-10:
        raise RuntimeError("failed to reconstruct integral inverse metric")
    if order == "optimized":
        record = json.load(open(os.path.join(ROOT, "evidence", "data",
            "leech-joined-cell-mps-order-v1.json"), encoding="utf8"))
        permutation = np.asarray(record["optimized"]["orderOneBased"], dtype=int) - 1
    else:
        permutation = np.arange(24)
    return inverse[np.ix_(permutation, permutation)], permutation


def rotor_operators(cutoff):
    charges = np.arange(-cutoff, cutoff + 1, dtype=float)
    dimension = len(charges)
    identity = np.eye(dimension)
    charge = np.diag(charges)
    charge2 = np.diag(charges ** 2)
    shift = np.diag(np.ones(dimension - 1), 1) + np.diag(np.ones(dimension - 1), -1)
    inversion = np.fliplr(identity)
    return identity, charge, charge2, shift, inversion


def build_hamiltonian_mpo(metric, cutoff, ratio, cosine_scale=1.0):
    sites = len(metric)
    identity, charge, charge2, shift, _ = rotor_operators(cutoff)
    bond = sites + 2
    end = bond - 1
    tensors = []
    for site in range(sites):
        tensor = np.zeros((bond, bond, identity.shape[0], identity.shape[1]))
        tensor[0, 0] += identity
        tensor[end, end] += identity
        tensor[0, end] += (ratio * metric[site, site] / 2) * charge2
        tensor[0, end] += cosine_scale * identity - (cosine_scale / 2) * shift
        tensor[0, site + 1] += charge
        for earlier in range(site):
            tensor[earlier + 1, earlier + 1] += identity
            tensor[earlier + 1, end] += ratio * metric[earlier, site] * charge
        if site == 0:
            tensor = tensor[0, :, :, :]
        if site == sites - 1:
            tensor = tensor[:, end, :, :]
        tensors.append(tensor)
    return qtn.MatrixProductOperator(tensors, shape="lrud")


def build_parity_mpo(sites, cutoff):
    inversion = rotor_operators(cutoff)[4]
    tensors = [inversion.reshape(1, 1, *inversion.shape) for _ in range(sites)]
    tensors[0] = tensors[0][0]
    tensors[-1] = tensors[-1][:, 0]
    return qtn.MatrixProductOperator(tensors, shape="lrud")


def expectation(state, *operators):
    return float(np.real(qtn.expec_TN_1D(state.H, *operators, state,
                                        compress=True, eps=1e-12)))


def solve_sector(hamiltonian, parity, cutoff, sector, bond_dims, sweeps, seed, penalty,
                 verbosity, state_prefix_in, state_prefix_out, compute_variance):
    state_input_path = None if state_prefix_in is None else f"{state_prefix_in}-{sector}.pkl"
    if state_input_path is not None:
        with open(state_input_path, "rb") as handle:
            initial = pickle.load(handle)
        if initial.L != 24 or initial.phys_dim(0) != 2 * cutoff + 1:
            raise ValueError("saved MPS does not match the requested channel count and cutoff")
    else:
        np.random.seed(seed)
        initial = qtn.MPS_rand_state(24, bond_dim=min(4, bond_dims[0]),
                                     phys_dim=2 * cutoff + 1, dtype="float64")
    effective = hamiltonian if sector == "even" else hamiltonian + penalty * parity
    solver = qtn.DMRG2(effective, bond_dims=bond_dims, cutoffs=1e-10, p0=initial)
    converged = solver.solve(tol=1e-8, max_sweeps=sweeps, sweep_sequence="RL",
                             verbosity=verbosity)
    state = solver.state
    norm = expectation(state)
    energy = expectation(state, hamiltonian) / norm
    parity_value = expectation(state, parity) / norm
    if compute_variance:
        energy2 = expectation(state, hamiltonian, hamiltonian) / norm
        variance = max(0.0, energy2 - energy ** 2)
        residual = variance ** 0.5
    else:
        variance = None
        residual = None
    state_output_path = None if state_prefix_out is None else f"{state_prefix_out}-{sector}.pkl"
    if state_output_path is not None:
        os.makedirs(os.path.dirname(os.path.abspath(state_output_path)), exist_ok=True)
        with open(state_output_path, "wb") as handle:
            pickle.dump(state, handle, protocol=pickle.HIGHEST_PROTOCOL)
    return {
        "sectorTarget": sector,
        "convergedByEnergyTolerance": bool(converged),
        "energy": energy,
        "parityExpectation": parity_value,
        "energyVariance": variance,
        "residualNormProxy": residual,
        "reportedEffectiveEnergy": float(np.real(solver.energy)),
        "maximumBond": int(state.max_bond()),
        "loadedState": state_input_path,
        "savedState": state_output_path,
        "sweepEnergies": [float(np.real(value)) for value in solver.energies],
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--cutoff", type=int, default=1)
    parser.add_argument("--ratio", type=float, default=0.01)
    parser.add_argument("--order", choices=["natural", "optimized"], default="optimized")
    parser.add_argument("--bond-dims", default="8,16,32")
    parser.add_argument("--sweeps", type=int, default=8)
    parser.add_argument("--seed", type=int, default=712367)
    parser.add_argument("--penalty", type=float, default=1.0)
    parser.add_argument("--sector", choices=["both", "even", "odd"], default="both")
    parser.add_argument("--verbosity", type=int, default=0)
    parser.add_argument("--state-prefix-in")
    parser.add_argument("--state-prefix-out")
    parser.add_argument("--result-prefix")
    parser.add_argument("--skip-variance", action="store_true")
    args = parser.parse_args()
    bond_dims = [int(value) for value in args.bond_dims.split(",")]
    metric, permutation = load_metric(args.order)
    hamiltonian = build_hamiltonian_mpo(metric, args.cutoff, args.ratio)
    parity = build_parity_mpo(24, args.cutoff)
    even = None if args.sector == "odd" else solve_sector(
        hamiltonian, parity, args.cutoff, "even", bond_dims, args.sweeps,
        args.seed, args.penalty, args.verbosity, args.state_prefix_in,
        args.state_prefix_out, not args.skip_variance)
    if even is not None and args.result_prefix is not None:
        os.makedirs(os.path.dirname(os.path.abspath(args.result_prefix)), exist_ok=True)
        with open(f"{args.result_prefix}-even.json", "w", encoding="utf8") as handle:
            json.dump(even, handle, indent=2)
    odd = None if args.sector == "even" else solve_sector(
        hamiltonian, parity, args.cutoff, "odd", bond_dims, args.sweeps,
        args.seed + 1, args.penalty, args.verbosity, args.state_prefix_in,
        args.state_prefix_out, not args.skip_variance)
    if odd is not None and args.result_prefix is not None:
        os.makedirs(os.path.dirname(os.path.abspath(args.result_prefix)), exist_ok=True)
        with open(f"{args.result_prefix}-odd.json", "w", encoding="utf8") as handle:
            json.dump(odd, handle, indent=2)
    output = {
        "schemaVersion": "leech-joined-cell-dmrg-reconnaissance-run-v1",
        "channels": 24,
        "cutoff": args.cutoff,
        "localDimension": 2 * args.cutoff + 1,
        "HilbertDimension": str((2 * args.cutoff + 1) ** 24),
        "chargingToCosineRatio": args.ratio,
        "order": args.order,
        "orderOneBased": (permutation + 1).tolist(),
        "bondDimensions": bond_dims,
        "maximumSweeps": args.sweeps,
        "oddSectorPenalty": args.penalty,
        "even": even,
        "odd": odd,
        "variationalGap": None if even is None or odd is None else odd["energy"] - even["energy"],
        "boundary": "DMRG energies and variance proxies are variational reconnaissance, not lower spectral enclosures or a certified gap."
    }
    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
