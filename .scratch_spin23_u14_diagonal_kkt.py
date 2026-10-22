import importlib.util
import json
import sys


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


def analyze(carrier):
    q = x.q
    stationary, _, preserving, labels, canonical, linear, quartic, leakage_values = u.preserving_basis(carrier)
    factors = [[generator] for generator in preserving]
    casimirs = [q.factor_casimir(linear, canonical, factor) for factor in factors]
    desired = {tuple(label) for label in stationary['active']}
    constraints = q.kkt_constraints(labels, linear, quartic, casimirs, desired)
    vertices = q.feasible_vertices(constraints, len(factors))
    best = None
    if vertices:
        objective, weights, slacks, chosen = vertices[0]
        best = {
            'weights': weights.tolist(),
            'weightSum': objective,
            'minimumSlack': float(min(slacks)),
            'saturatedConstraints': [constraints[i][0] for i, value in enumerate(slacks) if abs(value) <= 1e-7],
            'vertexDefiningConstraints': [constraints[i][0] for i in chosen],
        }
    return {
        'basisCaveat': 'The four leakage-kernel eigenvectors are an arbitrary orthonormal basis of a degenerate u(1)^4 kernel; diagonal weights are exploratory and not basis invariant.',
        'preservingDimension': len(preserving),
        'leakageKernelEigenvalues': leakage_values[:4].tolist(),
        'casimirByBasisDirectionAndOrbit': [
            {str(labels[i]): float(casimir[i]) for i in range(len(labels))}
            for casimir in casimirs
        ],
        'intendedSupportKktFeasible': bool(vertices),
        'feasibleVertexCount': len(vertices),
        'minimumWeightSumVertex': best,
        'maximumUniformPhysicalMarginVertex': q.maximum_uniform_physical_margin(constraints, len(factors)),
        'constraintRows': [
            {'name': name, 'intercept': intercept, 'slopes': slope.tolist()}
            for name, intercept, slope in constraints
        ],
    }


if __name__ == '__main__':
    carrier = next(
        item for item in c.strong_carriers()
        if (s.tw(item['op'], 5), s.tw(item['op'], 10)) == (8, 4)
        and item['lpair'] == ((8, 10), (10, 1))
        and item['rpair'] == ((10, 2), (7, 5))
    )
    print(json.dumps({'protocol': 'spin23-u14-diagonal-kkt/1', 'row': analyze(carrier)}, indent=2, default=list))
