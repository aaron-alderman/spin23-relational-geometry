"""Scan candidate-48's exact U(2) x S1 moduli for a Lorentz-compensator cross block."""

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


def random_unitary(rng):
    raw = rng.normal(size=(2, 2)) + 1j * rng.normal(size=(2, 2))
    q, r = np.linalg.qr(raw)
    diagonal = np.diag(r)
    return q @ np.diag(np.conj(diagonal) / np.abs(diagonal))


s = load_quiet('.scratch_spin23_so23_real_form.py', 'spin23_so23_moduli_compensator')
values, vectors = np.linalg.eigh((s.active_state_so4_casimir + s.active_state_so4_casimir.conj().T) / 2)
scalar_basis = vectors[:, np.abs(values) < 1e-8]
vector_basis = vectors[:, np.abs(values - 0.75) < 1e-8]
scalar_projector = scalar_basis @ scalar_basis.conj().T
vector_projector = vector_basis @ vector_basis.conj().T


def row(unitary, eta):
    vacuum = s.candidate_vacuum(unitary, eta)
    cross = s.singlet_vectors.conj().T @ vacuum @ s.adjoint_vectors
    scalar_energy = float(np.linalg.norm(cross @ scalar_projector) ** 2)
    vector_energy = float(np.linalg.norm(cross @ vector_projector) ** 2)
    total = scalar_energy + vector_energy
    singular = np.linalg.svd(cross, compute_uv=False)
    rank = int(np.sum(singular > 1e-9 * max(1.0, float(singular[0]))))
    responses = np.stack([s.real_pack(-cross @ generator) for generator in s.adjoint_generators], axis=1)
    response_singular = np.linalg.svd(responses, compute_uv=False)
    stabilizer = int(10 - np.sum(response_singular > 1e-9 * max(1.0, float(response_singular[0]))))
    return {
        'scalarFraction': scalar_energy / total,
        'vectorFraction': vector_energy / total,
        'totalEnergy': total,
        'rank': rank,
        'so5StabilizerDimension': stabilizer,
        'smallestNonzeroCrossSingular': float(singular[rank - 1]) if rank else None,
    }


rng = np.random.default_rng(230655)
samples = [row(np.eye(2), 0.0)]
for eta in np.linspace(0, 2 * np.pi, 33)[:-1]:
    samples.append(row(np.eye(2), float(eta)))
for _ in range(256):
    samples.append(row(random_unitary(rng), float(rng.uniform(0, 2 * np.pi))))


def value_range(key):
    values = [item[key] for item in samples]
    return [min(values), max(values)]


print(json.dumps({
    'protocol': 'spin23-candidate48-moduli-compensator-scan/1',
    'sampleCount': len(samples),
    'sampleDesign': {'canonical': 1, 'etaGrid': 32, 'haarU2AndUniformEta': 256},
    'scalarFractionRange': value_range('scalarFraction'),
    'vectorFractionRange': value_range('vectorFraction'),
    'totalCrossEnergyRange': value_range('totalEnergy'),
    'crossBlockRanks': sorted(set(item['rank'] for item in samples)),
    'compactSo5StabilizerDimensions': sorted(set(item['so5StabilizerDimension'] for item in samples)),
    'smallestNonzeroCrossSingularRange': value_range('smallestNonzeroCrossSingular'),
    'maximumScalarFractionSample': max(samples, key=lambda item: item['scalarFraction']),
    'compensatorFound': any(item['scalarFraction'] > 1 - 1e-8 and item['rank'] == 1 and item['so5StabilizerDimension'] == 6 for item in samples),
}, indent=2))
