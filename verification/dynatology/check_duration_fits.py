"""Independent SciPy optimization check of the primary-horizon JS fits."""
import argparse
import hashlib
import json
from pathlib import Path
import sys

parser = argparse.ArgumentParser()
parser.add_argument('--dependency-path')
args = parser.parse_args()
if args.dependency_path:
    sys.path.insert(0, str(Path(args.dependency_path).resolve()))
import numpy as np
from scipy.optimize import minimize
from scipy.special import expit

root = Path(__file__).resolve().parents[2]
source = root / 'evidence/data/relational-orbital-duration-runs-v1.json'
analysis_path = root / 'evidence/data/relational-orbital-duration-analysis-v1.json'
data, analysis = json.loads(source.read_text()), json.loads(analysis_path.read_text())
horizon = data['config']['primaryHorizon']


def label(row):
    if any(r['numericalStatus'] != 'accepted' for r in row['runs']):
        return None
    values = [int(r['event'] is not None and r['completedCycles'] <= horizon) for r in row['runs']]
    return values[0] if all(x == values[0] for x in values) else None


train = [r for r in data['rows'] if r['split'] == 'train' and r['earlyValid'] and label(r) is not None]
records = []
for model in analysis['prediction']:
    fitted = next(h['model'] for h in model['horizons'] if h['cycles'] == horizon)
    names = fitted['featureNames']
    raw = np.array([[r['features'][name] for name in names] for r in train])
    X = np.ones((len(train), len(names) + 1))
    if names:
        means = raw.mean(axis=0)
        scales = raw.std(axis=0)
        scales[scales == 0] = 1
        X[:, 1:] = (raw - means) / scales
    y = np.array([label(r) for r in train])
    penalty = data['config']['ridgePenalty']

    def objective(b):
        z = X @ b
        return float(np.sum(np.logaddexp(0, z) - y*z) + penalty/2*np.sum(b[1:]**2)
                     + .5*(np.logaddexp(0, b[0]) + np.logaddexp(0, -b[0])))

    def gradient(b):
        out = X.T @ (expit(X @ b) - y)
        out[1:] += penalty*b[1:]
        out[0] += expit(b[0]) - .5
        return out

    result = minimize(objective, np.zeros(X.shape[1]), jac=gradient, method='BFGS',
                      options={'gtol': 1e-9, 'maxiter': 1000})
    difference = float(np.max(np.abs(result.x - np.array(fitted['beta']))))
    if difference > 1e-5:
        raise AssertionError((model['name'], difference, result.message))
    records.append({'model': model['name'], 'maximumCoefficientDifference': difference,
                    'gradientNorm': float(np.linalg.norm(gradient(result.x))),
                    'optimizerSuccess': bool(result.success), 'optimizerMessage': str(result.message)})

record = {'schema': 'relational-orbital-duration-fit-check/v1', 'date': '2026-10-30', 'status': 'pass',
          'runsSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
          'analysisSha256': hashlib.sha256(analysis_path.read_bytes()).hexdigest(),
          'method': 'Independent design construction, standardization and scipy.optimize BFGS at the primary horizon',
          'models': records, 'boundary': 'Checks statistical optimization, not gravitational exit durations or population calibration.'}
(root / 'evidence/data/relational-orbital-duration-fit-check-v1.json').write_text(json.dumps(record, indent=2) + '\n')
print(json.dumps(record, indent=2))
