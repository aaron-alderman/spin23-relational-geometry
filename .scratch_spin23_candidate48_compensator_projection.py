"""Project candidate 48's cross-block VEV onto the 2 x (SO4 scalar + vector) active carrier."""

import contextlib
import importlib.util
import io
import json
import sys

import numpy as np


def load_quiet(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    with contextlib.redirect_stdout(io.StringIO()):
        spec.loader.exec_module(module)
    return module


s = load_quiet('.scratch_spin23_so23_real_form.py', 'spin23_so23_compensator')
vacuum = s.canonical_vacuum
cross = s.singlet_vectors.conj().T @ vacuum @ s.adjoint_vectors

values, vectors = np.linalg.eigh((s.active_state_so4_casimir + s.active_state_so4_casimir.conj().T) / 2)
scalar_basis = vectors[:, np.abs(values) < 1e-8]
lorentz_vector_basis = vectors[:, np.abs(values - 0.75) < 1e-8]
scalar_part = cross @ scalar_basis @ scalar_basis.conj().T
vector_part = cross @ lorentz_vector_basis @ lorentz_vector_basis.conj().T
total_energy = float(np.linalg.norm(cross) ** 2)

# Stabilizers of the cross block alone under compact SO(5) and its SO(4) subgroup.
def stabilizer_dimension(generators):
    responses = np.stack([s.real_pack(-cross @ generator) for generator in generators], axis=1)
    singular = np.linalg.svd(responses, compute_uv=False)
    tolerance = 1e-9 * max(1.0, float(singular[0]))
    return int(len(generators) - np.sum(singular > tolerance)), singular


so5_stabilizer, so5_singular = stabilizer_dimension(s.adjoint_generators)
so4_stabilizer, so4_singular = stabilizer_dimension(s.even_adjoint_generators)
cross_singular = np.linalg.svd(cross, compute_uv=False)
cross_rank = int(np.sum(cross_singular > 1e-9 * max(1.0, float(cross_singular[0]))))

print(json.dumps({
    'protocol': 'spin23-candidate48-compensator-projection/1',
    'activeCarrierBranching': '2 x vector5 -> 2 x (Lorentz scalar1 + vector4)',
    'crossBlockShape': list(cross.shape),
    'crossBlockRank': cross_rank,
    'crossBlockSingularValues': cross_singular.tolist(),
    'crossBlockEnergy': total_energy,
    'lorentzScalarEnergy': float(np.linalg.norm(scalar_part) ** 2),
    'lorentzVectorEnergy': float(np.linalg.norm(vector_part) ** 2),
    'lorentzScalarFraction': float(np.linalg.norm(scalar_part) ** 2 / total_energy) if total_energy else None,
    'lorentzVectorFraction': float(np.linalg.norm(vector_part) ** 2 / total_energy) if total_energy else None,
    'projectionReconstructionResidual': float(np.linalg.norm(cross - scalar_part - vector_part)),
    'crossBlockStabilizers': {
        'compactSo5Dimension': so5_stabilizer,
        'compactSo5ResponseSingularValues': so5_singular.tolist(),
        'compactSo4Dimension': so4_stabilizer,
        'compactSo4ResponseSingularValues': so4_singular.tolist(),
    },
    'compensatorCriterion': {
        'required': 'nonzero cross-block VEV entirely in the two-dimensional SO(4)-scalar subspace, with rank-one alignment in vector space',
        'passesScalarDirection': bool(np.linalg.norm(vector_part) < 1e-8 * max(1.0, np.linalg.norm(cross))),
        'passesRankOne': bool(cross_rank == 1),
    },
}, indent=2))
