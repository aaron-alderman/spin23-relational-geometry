import importlib.util
import json
import sys
from itertools import combinations

import numpy as np


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


c = load('.scratch_spin23_connectors.py', 'c')
s = load('.scratch_spin23_all_robust_supports_fast.py', 's')
h = load('.scratch_spin23_all_robust_hessian_scan.py', 'h')


def orientations(carrier, label):
    out = []
    for edge in carrier['graph']['edges']:
        if tuple(edge['orbit']) != tuple(label):
            continue
        p, endpoint = carrier['op'][edge['u']], carrier['op'][edge['v']]
        horizontal = p[1] == endpoint[0] and p[0] != endpoint[1]
        a, b = (p[0], endpoint[1]) if horizontal else (p[1], endpoint[0])
        out.append('direct' if (a, b) == tuple(label) else 'transposed')
    return out


def quartic_matrix(carrier, labels):
    builder = h.field_builder(carrier)
    matrices = [builder(label, h.canonical(label)) for label in labels]
    q = np.diag([h.t4(matrix) for matrix in matrices])
    for i, j in combinations(range(len(labels)), 2):
        total = h.t4(matrices[i] + matrices[j])
        q[i, j] = q[j, i] = (total - q[i, i] - q[j, j]) / 2
    return q


def analyze(carrier):
    support = s.optimum(carrier)[1]
    weak = next(label for label in support if 9 in label and (label[0] in c.B or label[1] in c.B))
    baseline = [weak, (5, 10), (2, 6), (6, 7)]
    labels = sorted({tuple(edge['orbit']) for edge in carrier['graph']['edges']})
    rows = []
    for label in labels:
        signs = orientations(carrier, label)
        if len(set(signs)) <= 1 or label in baseline:
            continue
        active = baseline + [label]
        q = quartic_matrix(carrier, active)
        values = np.linalg.eigvalsh(2 * q)
        rows.append({
            'orbit': label,
            'orientations': signs,
            'activeOrbits': active,
            'minimumRadialQuarticEigenvalue': float(values[0]),
            'negativeInertia': int(np.sum(values < -1e-8)),
            'zeroInertia': int(np.sum(np.abs(values) <= 1e-8)),
            'eigenvalues': values.tolist(),
        })
    return rows


if __name__ == '__main__':
    carriers = [item for item in c.strong_carriers() if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)]
    hits = []
    for index, carrier in enumerate(carriers):
        for row in analyze(carrier):
            row.update({'carrierIndex': index, 'lpair': carrier['lpair'], 'rpair': carrier['rpair']})
            hits.append(row)
    summary = {
        'carriers': len(carriers),
        'frustratedExtensions': len(hits),
        'positiveDefiniteExtensions': sum(row['negativeInertia'] == 0 and row['zeroInertia'] == 0 for row in hits),
        'nonnegativeExtensions': sum(row['negativeInertia'] == 0 for row in hits),
        'minimumEigenvalueRange': [min(row['minimumRadialQuarticEigenvalue'] for row in hits), max(row['minimumRadialQuarticEigenvalue'] for row in hits)] if hits else None,
    }
    hits.sort(key=lambda row: (-row['minimumRadialQuarticEigenvalue'], row['carrierIndex'], row['orbit']))
    print(json.dumps({'protocol': 'spin23-frustrated-carrier-quartic-census/1', 'summary': summary, 'rows': hits}, indent=2, default=list))
