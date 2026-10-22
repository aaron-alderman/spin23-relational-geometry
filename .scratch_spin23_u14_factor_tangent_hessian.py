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


def hermitian_basis(n):
    out = []
    for a in range(n):
        value = np.zeros((n, n), dtype=complex)
        value[a, a] = 1
        out.append(value)
    for a in range(n):
        for b in range(a + 1, n):
            symmetric = np.zeros((n, n), dtype=complex)
            symmetric[a, b] = symmetric[b, a] = 1 / np.sqrt(2)
            out.append(symmetric)
            antisymmetric = np.zeros((n, n), dtype=complex)
            antisymmetric[a, b] = -1j / np.sqrt(2)
            antisymmetric[b, a] = 1j / np.sqrt(2)
            out.append(antisymmetric)
    return out


def factor_lie_generators(carrier):
    op = carrier['op']
    dimensions = [c.DIMS[i] * c.DIMS[j] for i, j in op]
    offsets = np.cumsum([0] + dimensions[:-1]).tolist()
    generators = []
    labels = []
    for node in sorted(c.DIMS):
        for basis_index, h in enumerate(hermitian_basis(c.DIMS[node])):
            generator = np.zeros((184, 184), dtype=complex)
            for vertex, (i, j) in enumerate(op):
                offset, dimension = offsets[vertex], dimensions[vertex]
                pblock = np.zeros((dimension, dimension), dtype=complex)
                jblock = np.zeros((dimension, dimension), dtype=complex)
                if i == node:
                    pblock += np.kron(h, np.eye(c.DIMS[j]))
                    jblock += np.kron(np.eye(c.DIMS[j]), h)
                if j == node:
                    pblock += np.kron(np.eye(c.DIMS[i]), h)
                    jblock += np.kron(h, np.eye(c.DIMS[i]))
                generator[offset:offset+dimension, offset:offset+dimension] = 1j * pblock
                generator[92+offset:92+offset+dimension, 92+offset:92+offset+dimension] = 1j * jblock
            generators.append(generator)
            labels.append((node, basis_index))
    return generators, labels


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    _, _, preserving, _, _, _, _, _ = u.preserving_basis(carrier)
    factor_generators, generator_labels = factor_lie_generators(carrier)
    weights = [100 * value for value in [0.0, 13.512637655080349, 0.0, 42.15686185546493]]
    row = x.analyze(
        carrier,
        factor_builder=lambda _: [[generator] for generator in preserving],
        weights=weights,
        tangent_generators=factor_generators,
        random_kernel_samples=0,
        include_kernel_decomposition=False,
    )
    keep = {
        'factorLieAlgebraDimension': len(factor_generators),
        'hessianZeroEigenvalues': row['zeroEigenvalues'],
        'factorOrbitTangentRank': row['gaugeOrbitTangentRank'],
        'vacuumStabilizerDimension': row['vacuumStabilizerDimensionInsideClosure'],
        'nonGaugeKernelDimension': row['nonGaugeKernelDimension'],
        'maximumTangentProjectionResidual': row['maximumGaugeTangentProjectionResidual'],
        'hessianTimesTangentFrobeniusNorm': row['hessianTimesGaugeTangentFrobeniusNorm'],
        'minimumTangentToKernelPrincipalCosine': row['minimumGaugeTangentToKernelPrincipalCosine'],
        'hessianMinimum': row['hessianMinimum'],
    }
    print(json.dumps({'protocol': 'spin23-u14-factor-tangent-hessian/1', 'row': keep}, indent=2))
