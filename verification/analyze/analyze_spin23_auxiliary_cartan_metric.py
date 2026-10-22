"""SO(1,1) subtoy for integrating over or minimizing a dynamical positive Cartan metric."""

import json

import numpy as np


def boost(rapidity):
    c, s = np.cosh(rapidity), np.sinh(rapidity)
    return np.array([[c, s], [s, c]])


def positive_metric(rapidity):
    inverse = boost(-rapidity)
    return inverse.T @ inverse


cutoffs = [1.0, 2.0, 3.0, 4.0]
averages = []
for cutoff in cutoffs:
    grid = np.linspace(-cutoff, cutoff, 20001)
    traces = np.array([np.trace(positive_metric(value)) for value in grid])
    averages.append({'cutoff': cutoff, 'meanTrace': float(np.trapezoid(traces, grid) / (2 * cutoff))})

timelike = np.array([1.0, 0.0])
null = np.array([1.0, 1.0])
rapidities = [0.0, 1.0, 2.0, 4.0, 8.0]
couplings = []
for rapidity in rapidities:
    metric = positive_metric(rapidity)
    couplings.append({
        'rapidity': rapidity,
        'metricEigenvalues': np.linalg.eigvalsh(metric).tolist(),
        'timelikePositiveNorm': float(timelike @ metric @ timelike),
        'nullPositiveNorm': float(null @ metric @ null),
    })

print(json.dumps({
    'protocol': 'spin23-auxiliary-cartan-metric-toy/1',
    'subgroup': 'SO(1,1) inside SO(2,3)',
    'metricOrbit': 'H(chi)=B(-chi)^T B(-chi), det H=1, eigenvalues exp(+/-2chi)',
    'cutoffAverages': averages,
    'fieldCouplings': couplings,
    'observations': {
        'invariantAverage': 'The Haar-rapidity average of H has exponentially divergent trace as the cutoff grows; there is no finite normalized invariant average over the noncompact Cartan-metric orbit.',
        'timelikeMinimization': 'A timelike vector minimizes V^T H(chi) V at a finite rapidity, thereby selecting a preferred frame.',
        'nullMinimization': 'A null vector drives V^T H(chi) V toward zero at infinite rapidity, so the auxiliary metric has a noncompact runaway unless separately stabilized.'
    },
    'spin23Implication': 'Promoting the positive Cartan metric to an auxiliary field preserves formal covariance only before choosing a vacuum. Integrating it out does not generically restore Lorentz symmetry: finite minima select a Cartan frame, while null directions can run to the boundary of SO(2,3)/(SO(2)xSO(3)).',
}, indent=2))
