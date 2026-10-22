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
g = load('.scratch_spin23_candidate48_u14_kkt.py', 'g')


if __name__ == '__main__':
    carriers = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)]
    carrier = carriers[13]
    _, _, response, _, _, _, _, _, _ = g.generic_preserving_basis(carrier)
    weights = [0.05521353245782003, 0.0, 0.0, 0.007286467542179783, 0.0, 0.0, 0.03125000000000003]
    amplitudes = {(2, 6): 0.5, (2, 9): 0.25, (4, 8): 0.125, (5, 10): 0.25, (6, 7): 0.125}
    builder = x.complex_field_builder(carrier)

    def vacuum(phase26=0.0, phase29=0.0, mixed_angle=None):
        seeds = {label: x.h.canonical(label).astype(complex) for label in amplitudes}
        seeds[(2, 6)] *= np.exp(1j * phase26)
        seeds[(2, 9)] *= np.exp(1j * phase29)
        if mixed_angle is not None:
            cosine, sine = np.cos(mixed_angle), np.sin(mixed_angle)
            seeds[(2, 6)] = np.array([[cosine, -1j * sine]])
            seeds[(2, 9)] = np.array([[cosine, 1j * sine], [1j * sine, cosine]])
        return sum(np.sqrt(amplitudes[label]) * builder(label, seeds[label]) for label in amplitudes)

    def potential(matrix):
        matrix2 = matrix @ matrix
        value = -np.trace(matrix2).real + np.trace(matrix2 @ matrix2).real
        for weight, generator in zip(weights, response):
            commutator = generator @ matrix - matrix @ generator
            value += weight * np.vdot(commutator, commutator).real
        return float(value)

    baseline = vacuum()
    baseline_energy = potential(baseline)
    baseline_spectrum = np.linalg.eigvalsh(baseline)
    rows = []
    phases = np.linspace(0, 2 * np.pi, 9)[:-1]
    for phase26 in phases:
        for phase29 in phases:
            matrix = vacuum(phase26, phase29)
            rows.append({
                'phase26': float(phase26),
                'phase29': float(phase29),
                'energyDeviation': potential(matrix) - baseline_energy,
                'spectrumDeviation': float(np.max(np.abs(np.linalg.eigvalsh(matrix) - baseline_spectrum))),
            })
    flat = [row for row in rows if abs(row['energyDeviation']) < 1e-10 and row['spectrumDeviation'] < 1e-10]
    result = {
        'gridShape': [len(phases), len(phases)],
        'baselinePotential': baseline_energy,
        'maximumAbsoluteEnergyDeviation': max(abs(row['energyDeviation']) for row in rows),
        'maximumSpectrumDeviation': max(row['spectrumDeviation'] for row in rows),
        'flatGridPoints': len(flat),
        'energyByPhaseDifference': {},
    }
    for row in rows:
        difference_index = int(round(((row['phase26'] - row['phase29']) % (2 * np.pi)) / (np.pi / 4))) % 8
        result['energyByPhaseDifference'].setdefault(str(difference_index), []).append(row['energyDeviation'])
    result['energyByPhaseDifference'] = {
        key: [float(min(values)), float(max(values))]
        for key, values in result['energyByPhaseDifference'].items()
    }
    mixed_rows = []
    for angle in np.linspace(0, 2 * np.pi, 33):
        matrix = vacuum(mixed_angle=angle)
        mixed_rows.append({
            'angle': float(angle),
            'energyDeviation': potential(matrix) - baseline_energy,
            'spectrumDeviation': float(np.max(np.abs(np.linalg.eigvalsh(matrix) - baseline_spectrum))),
        })
    result['mixedOrientationCircle'] = {
        'samples': len(mixed_rows),
        'maximumAbsoluteEnergyDeviation': max(abs(row['energyDeviation']) for row in mixed_rows),
        'maximumSpectrumDeviation': max(row['spectrumDeviation'] for row in mixed_rows),
    }
    print(json.dumps({'protocol': 'spin23-candidate48-phase-torus/1', 'row': result}, indent=2))
