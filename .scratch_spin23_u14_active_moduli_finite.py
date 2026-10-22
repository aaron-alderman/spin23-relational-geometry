import importlib.util
import json
import sys

import numpy as np


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


c = load('.scratch_spin23_connectors.py', 'c')
s = load('.scratch_spin23_all_robust_supports_fast.py', 's')
x = load('.scratch_spin23_exception_factor_complex_hessian.py', 'x')
u = load('.scratch_spin23_u14_isotropic_kkt.py', 'u')


BASE_WEIGHTS = np.array([0.0, 13.512637655080349, 0.0, 42.15686185546493]) * 100


def random_unitary(n, rng):
    raw = rng.normal(size=(n, n)) + 1j * rng.normal(size=(n, n))
    q, r = np.linalg.qr(raw)
    phases = np.diag(r)
    return q @ np.diag(np.conj(phases) / np.abs(phases))


def random_fixed_singular_seed(label, rng):
    nr, nc = c.DIMS[label[1]], c.DIMS[label[0]]
    if nr == nc:
        return random_unitary(nr, rng)
    raw = rng.normal(size=(nr, nc)) + 1j * rng.normal(size=(nr, nc))
    return raw / np.linalg.norm(raw)


def analyze(carrier):
    q = x.q
    stationary, closure, preserving, labels, canonical, linear, quartic, _ = u.preserving_basis(carrier)
    casimirs = [q.factor_casimir(linear, canonical, [generator]) for generator in preserving]
    combined_casimir = sum(BASE_WEIGHTS[i] * casimirs[i] for i in range(4))
    desired = {tuple(label) for label in stationary['active']}
    active = [i for i, label in enumerate(labels) if tuple(label) in desired]
    amplitudes = np.linalg.solve(
        2 * quartic[np.ix_(active, active)],
        linear[active] * (1 - combined_casimir[active]),
    )
    field_matrix = x.complex_field_builder(carrier)
    canonical_seeds = {tuple(label): x.h.canonical(label).astype(complex) for label in labels}

    def vacuum(seeds):
        return sum(
            np.sqrt(amplitudes[local]) * field_matrix(labels[index], seeds[tuple(labels[index])])
            for local, index in enumerate(active)
        )

    def potential(matrix):
        matrix2 = matrix @ matrix
        value = -np.trace(matrix2).real + np.trace(matrix2 @ matrix2).real
        for weight, generator in zip(BASE_WEIGHTS, preserving):
            commutator = generator @ matrix - matrix @ generator
            value += weight * np.vdot(commutator, commutator).real
        return float(value)

    baseline_matrix = vacuum(canonical_seeds)
    baseline = potential(baseline_matrix)
    baseline_spectrum = np.linalg.eigvalsh(baseline_matrix)
    rng = np.random.default_rng(230565)
    rows = []
    for index in active:
        label = tuple(labels[index])
        deviations = []
        spectral_deviations = []
        for _ in range(8):
            seeds = dict(canonical_seeds)
            seeds[label] = random_fixed_singular_seed(label, rng)
            transformed = vacuum(seeds)
            deviations.append(potential(transformed) - baseline)
            spectral_deviations.append(float(np.max(np.abs(np.linalg.eigvalsh(transformed) - baseline_spectrum))))
        rows.append({
            'orbit':label,
            'seedShape':[c.DIMS[label[1]],c.DIMS[label[0]]],
            'samples':len(deviations),
            'minimumEnergyDeviation':float(min(deviations)),
            'maximumEnergyDeviation':float(max(deviations)),
            'maximumAbsoluteEnergyDeviation':float(max(abs(value) for value in deviations)),
            'maximumEigenvalueDeviation':float(max(spectral_deviations)),
        })
    simultaneous = []
    simultaneous_spectral = []
    for _ in range(16):
        seeds = dict(canonical_seeds)
        for index in active:
            label = tuple(labels[index])
            seeds[label] = random_fixed_singular_seed(label, rng)
        transformed = vacuum(seeds)
        simultaneous.append(potential(transformed) - baseline)
        simultaneous_spectral.append(float(np.max(np.abs(np.linalg.eigvalsh(transformed) - baseline_spectrum))))
    return {
        'activeOrbits':[tuple(labels[index]) for index in active],
        'amplitudeSquared':{str(labels[index]):float(amplitudes[local]) for local,index in enumerate(active)},
        'baselinePotential':baseline,
        'singleOrbitFiniteTransformations':rows,
        'simultaneousIndependentTransformations':{
            'samples':len(simultaneous),
            'minimumEnergyDeviation':float(min(simultaneous)),
            'maximumEnergyDeviation':float(max(simultaneous)),
            'maximumAbsoluteEnergyDeviation':float(max(abs(value) for value in simultaneous)),
            'maximumEigenvalueDeviation':float(max(simultaneous_spectral)),
        },
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'],5),s.tw(item['op'],10))==(8,4)
        and item['lpair']==((8,10),(10,1))
        and item['rpair']==((10,2),(7,5))
    )
    print(json.dumps({'protocol':'spin23-u14-active-moduli-finite/1','row':analyze(carrier)},indent=2,default=list))
