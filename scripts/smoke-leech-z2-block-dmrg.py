#!/usr/bin/env python3
"""Exact-control and checkpointable block-sparse DMRG for the joined Leech rotor."""
import argparse
import json
import os
import pickle
import subprocess
import time

os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
os.environ.setdefault("OMP_NUM_THREADS", "1")

import numpy as np
import scipy.linalg
import scipy.sparse.linalg
import quimb.tensor as qtn
import symmray as sr
from quimb.tensor.tn1d.dmrg import parse_2site_inds_dims

qtn.set_contract_strategy("greedy")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class InspectEffectiveDMRG2(qtn.DMRG2):
    def _eigs(self, operator, B=None, v0=None):
        print(json.dumps({
            "effectiveOperatorType": str(type(operator)),
            "effectiveOperatorShape": operator.shape,
            "effectiveOperatorDtype": str(getattr(operator, "dtype", None)),
            "effectiveOperatorCharge": getattr(operator, "charge", None),
            "effectiveOperatorBlocks": {str(key): value.shape
                for key, value in getattr(operator, "blocks", {}).items()},
            "localVectorType": str(type(v0)),
            "localVectorShape": getattr(v0, "shape", None),
            "localVectorCharge": getattr(v0, "charge", None),
            "localVectorBlocks": {str(key): value.shape
                for key, value in getattr(v0, "blocks", {}).items()},
        }, default=str))
        raise RuntimeError("effective operator inspected")


class Z2DMRG2(qtn.DMRG2):
    """Minimal open-boundary adapter preserving Symmray arrays locally."""

    def _eigs(self, operator, B=None, v0=None):
        if B is not None:
            raise NotImplementedError("cyclic generalized block eigensolve is not implemented")
        charge = v0.charge
        initial = np.asarray(v0.blocks[(charge,)]).reshape(-1)
        started = time.perf_counter()
        matvecs = 0
        if self.eigensolver_mode == "tn-matrix-free":
            dims, lix, uix = self.matrix_free_context

            def matvec(vector):
                nonlocal matvecs
                matvecs += 1
                charged = type(v0)(
                    indices=v0.indices, charge=charge,
                    blocks={(charge,): np.asarray(vector)},
                )
                ket = qtn.Tensor(charged.reshape(dims), inds=uix)
                network = qtn.TensorNetwork(self._eff_ham["_HAM"])
                applied = (network | ket).contract(all)
                applied.transpose_(*lix)
                flat = applied.data.reshape((int(np.prod(dims)),))
                return np.asarray(flat.blocks[(charge,)]).reshape(-1)

            block_dimension = len(initial)
            linear = scipy.sparse.linalg.LinearOperator(
                (block_dimension, block_dimension), matvec=matvec,
                rmatvec=matvec, dtype=initial.dtype,
            )
            values, vectors = scipy.sparse.linalg.eigsh(
                linear, k=1, which="SA", v0=initial,
                tol=self.eig_tolerance, maxiter=self.eig_max_iterations
            )
            index = int(np.argmin(values))
            residual = float(np.linalg.norm(
                matvec(vectors[:, index]) - values[index] * vectors[:, index]
            ))
        else:
            block = operator.blocks[(charge, charge)]
            block_dimension = block.shape[0]
        if self.eigensolver_mode == "iterative" and block_dimension > 4:
            def matvec(vector):
                nonlocal matvecs
                matvecs += 1
                return block @ vector
            linear = scipy.sparse.linalg.LinearOperator(
                block.shape, matvec=matvec, rmatvec=matvec, dtype=block.dtype
            )
            values, vectors = scipy.sparse.linalg.eigsh(
                linear, k=1, which="SA", v0=initial,
                tol=self.eig_tolerance, maxiter=self.eig_max_iterations
            )
            index = int(np.argmin(values))
        elif self.eigensolver_mode != "tn-matrix-free":
            values, vectors = scipy.linalg.eigh(
                block, subset_by_index=(0, 0), driver="evr", check_finite=False
            )
            index = 0
        if self.eigensolver_mode != "tn-matrix-free":
            residual = float(np.linalg.norm(
                block @ vectors[:, index] - values[index] * vectors[:, index]
            ))
        self.eig_diagnostics["solves"] += 1
        self.eig_diagnostics["matvecs"] += matvecs
        self.eig_diagnostics["maximumBlockDimension"] = max(
            self.eig_diagnostics["maximumBlockDimension"], block_dimension
        )
        self.eig_diagnostics["maximumResidual"] = max(
            self.eig_diagnostics["maximumResidual"], residual
        )
        self.eig_diagnostics["seconds"] += time.perf_counter() - started
        vector = type(v0)(indices=v0.indices, charge=charge,
                          blocks={(charge,): vectors[:, index]})
        return np.asarray([values[index]]), vector

    def _update_local_state_2site(self, i, direction, **compress_opts):
        (dims, lix_L, lix_R, lix, uix_L, uix_R, uix,
         l_bond_ind, u_bond_ind) = parse_2site_inds_dims(self._k, self._b, i)
        effective, norm = self.form_local_ops(i, dims, lix, uix)
        self.matrix_free_context = (dims, lix, uix)
        old = self._k[i].contract(self._k[i + 1]).to_dense(uix)
        local_energy, ground = self._eigs(effective, B=norm, v0=old)
        local_energy, ground = self.post_check(i, norm, ground, local_energy, old)
        two_site = qtn.Tensor(ground.reshape(dims), uix)
        left, right = two_site.split(left_inds=uix_L, get="arrays",
                                     absorb=direction, right_inds=uix_R,
                                     **compress_opts)
        self._k[i].modify(data=left, inds=(*uix_L, u_bond_ind))
        self._b[i].modify(data=left.conj(), inds=(*lix_L, l_bond_ind))
        self._k[i + 1].modify(data=right, inds=(u_bond_ind, *uix_R))
        self._b[i + 1].modify(data=right.conj(), inds=(l_bond_ind, *lix_R))
        total_energy = self._eff_ham ^ all
        return local_energy.item(), total_energy


def load_metric(sites, order):
    raw = subprocess.check_output([
        "node", os.path.join(ROOT, "scripts", "analyze-leech-pareto-transformers.mjs"), "--full"
    ], text=True)
    gram = np.asarray(next(item for item in json.loads(raw)["results"]
        if item["id"] == "gram-first")["gram"], dtype=float)
    inverse = np.rint(np.linalg.inv(gram)).astype(float)
    if order == "optimized":
        optimized = [22, 20, 9, 21, 1, 12, 4, 7, 24, 18, 6, 10,
                     11, 8, 5, 3, 2, 13, 19, 23, 16, 14, 17, 15]
        indices = [value - 1 for value in optimized[:sites]]
    else:
        indices = list(range(sites))
    return inverse[np.ix_(indices, indices)]


def parity_operators(cutoff):
    dimension = 2 * cutoff + 1
    values = np.arange(-cutoff, cutoff + 1, dtype=float)
    charge = np.diag(values)
    charge2 = charge @ charge
    shift = np.diag(np.ones(dimension - 1), 1) + np.diag(np.ones(dimension - 1), -1)
    basis = np.zeros((dimension, dimension))
    basis[cutoff, 0] = 1
    for value in range(1, cutoff + 1):
        basis[cutoff + value, value] = 1 / np.sqrt(2)
        basis[cutoff - value, value] = 1 / np.sqrt(2)
        basis[cutoff + value, cutoff + value] = 1 / np.sqrt(2)
        basis[cutoff - value, cutoff + value] = -1 / np.sqrt(2)
    parity_charges = [0] * (cutoff + 1) + [1] * cutoff
    transform = lambda operator: basis.T @ operator @ basis
    return np.eye(dimension), transform(charge), transform(charge2), transform(shift), parity_charges


def dense_mpo_arrays(metric, cutoff, ratio):
    sites = len(metric)
    identity, charge, charge2, shift, physical_charges = parity_operators(cutoff)
    bond = sites + 2
    end = bond - 1
    virtual_charges = [0] + [1] * sites + [0]
    arrays = []
    for site in range(sites):
        tensor = np.zeros((bond, bond, len(identity), len(identity)))
        tensor[0, 0] += identity
        tensor[end, end] += identity
        tensor[0, end] += ratio * metric[site, site] * charge2 / 2
        tensor[0, end] += identity - shift / 2
        tensor[0, site + 1] += charge
        for earlier in range(site):
            tensor[earlier + 1, earlier + 1] += identity
            tensor[earlier + 1, end] += ratio * metric[earlier, site] * charge
        if site == 0:
            tensor = tensor[0]
            maps = [virtual_charges, physical_charges, physical_charges]
        elif site == sites - 1:
            tensor = tensor[:, end]
            maps = [virtual_charges, physical_charges, physical_charges]
        else:
            maps = [virtual_charges, virtual_charges, physical_charges, physical_charges]
        arrays.append((tensor, maps))
    return arrays, physical_charges


def build_mpo(metric, cutoff, ratio, block_sparse):
    raw, _ = dense_mpo_arrays(metric, cutoff, ratio)
    arrays = []
    for tensor, maps in raw:
        if block_sparse:
            tensor = sr.Z2Array.from_dense(tensor, maps, duals=[False] * tensor.ndim,
                                           charge=0, invalid_sectors="raise")
        arrays.append(tensor)
    return qtn.MatrixProductOperator(arrays, shape="lrud")


def exact_levels(mpo, cutoff, sites):
    dense = np.asarray(mpo.to_dense()).reshape((2 * cutoff + 1) ** sites,
                                               (2 * cutoff + 1) ** sites)
    parity_charges = parity_operators(cutoff)[4]
    sectors = {0: [], 1: []}
    for index in range(len(dense)):
        value = index
        charge = 0
        for _ in range(sites):
            charge ^= parity_charges[value % (2 * cutoff + 1)]
            value //= 2 * cutoff + 1
        sectors[charge].append(index)
    return {name: float(np.linalg.eigvalsh(dense[np.ix_(indices, indices)])[0])
            for name, indices in (("even", sectors[0]), ("odd", sectors[1]))}


def checkpoint_path(prefix, sector):
    return f"{prefix}-{sector}.pkl"


def load_checkpoint(prefix, sector, sites, cutoff, model_signature):
    path = checkpoint_path(prefix, sector)
    with open(path, "rb") as stream:
        payload = pickle.load(stream)
    if payload["sites"] != sites or payload["cutoff"] != cutoff or payload["sector"] != sector:
        raise ValueError(f"checkpoint metadata mismatch: {path}")
    stored_signature = payload.get("modelSignature")
    if stored_signature is not None and stored_signature != model_signature:
        raise ValueError(f"checkpoint Hamiltonian signature mismatch: {path}")
    return payload["state"], path, stored_signature is not None


def save_checkpoint(prefix, sector, sites, cutoff, model_signature, state):
    path = checkpoint_path(prefix, sector)
    parent = os.path.dirname(os.path.abspath(path))
    os.makedirs(parent, exist_ok=True)
    with open(path, "wb") as stream:
        pickle.dump({
            "schemaVersion": "leech-z2-dmrg-checkpoint-v1",
            "sites": sites,
            "cutoff": cutoff,
            "sector": sector,
            "modelSignature": model_signature,
            "state": state,
        }, stream, protocol=pickle.HIGHEST_PROTOCOL)
    return path


def block_dmrg(mpo, cutoff, sites, sector, bond, sweeps, seed,
               inspect_effective=False, eigensolver="dense", eig_tolerance=1e-10,
               eig_max_iterations=2000, state_prefix_in=None, state_prefix_out=None,
               model_signature=None):
    physical = {0: cutoff + 1, 1: cutoff}
    if state_prefix_in:
        state, state_source, checkpoint_metadata_validated = load_checkpoint(
            state_prefix_in, sector, sites, cutoff, model_signature
        )
    else:
        site_charge = (lambda site: 1 if sector == "odd" and site == 0 else 0)
        state = sr.MPS_abelian_rand("Z2", sites, bond, phys_dim=physical, seed=seed,
                                    site_charge=site_charge, dtype="float64")
        state_source = "random"
        checkpoint_metadata_validated = True
    solver_class = InspectEffectiveDMRG2 if inspect_effective else Z2DMRG2
    solver = solver_class(mpo, bond_dims=[bond], cutoffs=1e-12, p0=state)
    solver.opts["local_eig_ham_dense"] = eigensolver != "tn-matrix-free"
    solver.eigensolver_mode = eigensolver
    solver.eig_tolerance = eig_tolerance
    solver.eig_max_iterations = eig_max_iterations
    solver.eig_diagnostics = {
        "solves": 0, "matvecs": 0, "maximumBlockDimension": 0,
        "maximumResidual": 0.0, "seconds": 0.0,
    }
    started = time.perf_counter()
    converged = solver.solve(tol=1e-10, max_sweeps=sweeps,
                             sweep_sequence="RL", verbosity=0)
    elapsed = time.perf_counter() - started
    checkpoint = (save_checkpoint(state_prefix_out, sector, sites, cutoff,
                                  model_signature, solver.state)
                  if state_prefix_out else None)
    return {"energy": float(np.real(solver.energy)), "converged": bool(converged),
            "maximumBond": int(solver.state.max_bond()),
            "isBlockSparse": bool(solver.state.isblocksparse()),
            "stateSource": state_source, "checkpoint": checkpoint,
            "checkpointMetadataValidated": checkpoint_metadata_validated,
            "elapsedSeconds": elapsed, "eigensolver": eigensolver,
            "effectiveMatrixMaterialized": eigensolver != "tn-matrix-free",
            "eigensolverDiagnostics": solver.eig_diagnostics}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--sites", type=int, default=4)
    parser.add_argument("--cutoff", type=int, default=1)
    parser.add_argument("--ratio", type=float, default=0.01)
    parser.add_argument("--bond", type=int, default=8)
    parser.add_argument("--sweeps", type=int, default=8)
    parser.add_argument("--skip-exact", action="store_true")
    parser.add_argument("--order", choices=("natural", "optimized"), default="natural")
    parser.add_argument("--eigensolver", choices=("dense", "iterative", "tn-matrix-free"), default="dense")
    parser.add_argument("--eig-tolerance", type=float, default=1e-10)
    parser.add_argument("--eig-max-iterations", type=int, default=2000)
    parser.add_argument("--state-prefix-in")
    parser.add_argument("--state-prefix-out")
    parser.add_argument("--inspect-effective", action="store_true")
    args = parser.parse_args()
    if args.sites > 8 and not args.skip_exact:
        raise ValueError("smoke test exact diagonalization is limited to at most eight sites")
    metric = load_metric(args.sites, args.order)
    dense_mpo = None if args.skip_exact else build_mpo(metric, args.cutoff, args.ratio, False)
    block_mpo = build_mpo(metric, args.cutoff, args.ratio, True)
    exact = None if args.skip_exact else exact_levels(dense_mpo, args.cutoff, args.sites)
    model_signature = json.dumps({
        "sites": args.sites, "cutoff": args.cutoff, "ratio": args.ratio,
        "order": args.order, "metric": "gram-first-inverse-rounded-v1",
    }, sort_keys=True, separators=(",", ":"))
    dmrg = {sector: block_dmrg(block_mpo, args.cutoff, args.sites, sector,
                              args.bond, args.sweeps, 1960 + index,
                              args.inspect_effective, args.eigensolver,
                              args.eig_tolerance, args.eig_max_iterations,
                              args.state_prefix_in, args.state_prefix_out,
                              model_signature)
            for index, sector in enumerate(("even", "odd"))}
    print(json.dumps({
        "schemaVersion": "leech-z2-block-dmrg-smoke-run-v1",
        "sites": args.sites,
        "cutoff": args.cutoff,
        "ratio": args.ratio,
        "bond": args.bond,
        "sweeps": args.sweeps,
        "order": args.order,
        "eigensolver": args.eigensolver,
        "blockMpo": block_mpo.isblocksparse(),
        "exact": exact,
        "dmrg": dmrg,
        "absoluteErrors": None if exact is None else {
            sector: abs(dmrg[sector]["energy"] - exact[sector])
            for sector in ("even", "odd")
        }
    }, indent=2))


if __name__ == "__main__":
    main()
