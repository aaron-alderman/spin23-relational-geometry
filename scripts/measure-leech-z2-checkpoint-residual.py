#!/usr/bin/env python3
"""Measure full-state energy variance of a saved symmetry-native Leech MPS."""
import argparse
import hashlib
import importlib.util
import json
import os
import pickle

os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
os.environ.setdefault("OMP_NUM_THREADS", "1")

import numpy as np
import quimb.tensor as qtn

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENGINE_PATH = os.path.join(ROOT, "scripts", "smoke-leech-z2-block-dmrg.py")
SPEC = importlib.util.spec_from_file_location("leech_z2_engine", ENGINE_PATH)
ENGINE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(ENGINE)


def expectation(state, *operators, eps, compress):
    value = qtn.expec_TN_1D(
        state.H, *operators, state, compress=compress, eps=eps
    )
    return float(np.real(value))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--checkpoint", required=True)
    parser.add_argument("--sector", choices=("even", "odd"), required=True)
    parser.add_argument("--sites", type=int, default=24)
    parser.add_argument("--cutoff", type=int, default=2)
    parser.add_argument("--ratio", type=float, default=0.01)
    parser.add_argument("--order", choices=("natural", "optimized"), default="optimized")
    parser.add_argument("--eps", type=float, default=1e-11)
    parser.add_argument("--exact-control", action="store_true")
    parser.add_argument("--uncompressed", action="store_true")
    args = parser.parse_args()

    with open(args.checkpoint, "rb") as stream:
        checkpoint_bytes = stream.read()
    checkpoint_sha256 = hashlib.sha256(checkpoint_bytes).hexdigest()
    payload = pickle.loads(checkpoint_bytes)
    expected_signature = json.dumps({
        "sites": args.sites,
        "cutoff": args.cutoff,
        "ratio": args.ratio,
        "order": args.order,
        "metric": "gram-first-inverse-rounded-v1"
    }, sort_keys=True, separators=(",", ":"))
    if payload["sites"] != args.sites or payload["cutoff"] != args.cutoff:
        raise ValueError("checkpoint size/cutoff mismatch")
    if payload["sector"] != args.sector:
        raise ValueError("checkpoint sector mismatch")
    if payload.get("modelSignature") != expected_signature:
        raise ValueError("checkpoint Hamiltonian signature mismatch")

    metric = ENGINE.load_metric(args.sites, args.order)
    hamiltonian = ENGINE.build_mpo(metric, args.cutoff, args.ratio, True)
    state = payload["state"]
    compress = not args.uncompressed
    norm = expectation(state, eps=args.eps, compress=compress)
    energy = expectation(state, hamiltonian, eps=args.eps, compress=compress) / norm
    energy2 = expectation(
        state, hamiltonian, hamiltonian, eps=args.eps, compress=compress
    ) / norm
    variance = max(0.0, energy2 - energy ** 2)
    residual = variance ** 0.5
    exact_control = None
    if args.exact_control:
        if args.sites > 8:
            raise ValueError("exact control is limited to at most eight sites")
        dense_hamiltonian = ENGINE.build_mpo(
            metric, args.cutoff, args.ratio, False
        ).to_dense()
        raw_vector = state.to_dense()
        if hasattr(raw_vector, "is_fused") and raw_vector.is_fused(0):
            raw_vector = raw_vector.unfuse(0)
        if hasattr(raw_vector, "to_dense"):
            raw_vector = raw_vector.to_dense()
        vector = np.asarray(raw_vector).reshape(-1)
        dense_norm = float(np.vdot(vector, vector).real)
        applied = dense_hamiltonian @ vector
        dense_energy = float(np.vdot(vector, applied).real / dense_norm)
        dense_energy2 = float(np.vdot(applied, applied).real / dense_norm)
        dense_variance = max(0.0, dense_energy2 - dense_energy ** 2)
        exact_control = {
            "norm": dense_norm,
            "energy": dense_energy,
            "energySquaredExpectation": dense_energy2,
            "variance": dense_variance,
            "residualNorm": dense_variance ** 0.5,
            "contractionErrors": {
                "energy": abs(energy - dense_energy),
                "energySquaredExpectation": abs(energy2 - dense_energy2),
                "variance": abs(variance - dense_variance)
            }
        }
    print(json.dumps({
        "schemaVersion": "leech-z2-checkpoint-residual-run-v1",
        "checkpoint": args.checkpoint,
        "checkpointSha256": checkpoint_sha256,
        "sector": args.sector,
        "sites": args.sites,
        "cutoff": args.cutoff,
        "ratio": args.ratio,
        "order": args.order,
        "contractionEps": args.eps,
        "compressedContraction": compress,
        "norm": norm,
        "energy": energy,
        "energySquaredExpectation": energy2,
        "variance": variance,
        "residualNorm": residual,
        "maximumBond": int(state.max_bond()),
        "exactControl": exact_control,
        "certified": False,
        "boundary": ("Direct uncompressed floating-point contraction; rigorous outward rounding remains open."
                     if args.uncompressed else
                     "Compressed tensor-network contraction is a convergence diagnostic until repeated-epsilon stability and exact reduced controls are supplied.")
    }, indent=2))


if __name__ == "__main__":
    main()
