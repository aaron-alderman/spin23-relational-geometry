"""Render duration and held-out prediction results from saved evidence."""
import argparse
import json
from pathlib import Path
import sys

parser = argparse.ArgumentParser()
parser.add_argument('--dependency-path')
args = parser.parse_args()
if args.dependency_path:
    sys.path.insert(0, str(Path(args.dependency_path).resolve()))
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D

root = Path(__file__).resolve().parents[2]
data = json.loads((root / 'evidence/data/relational-orbital-duration-analysis-v1.json').read_text())
plt.rcParams.update({'font.family': 'DejaVu Sans', 'font.size': 11, 'axes.spines.top': False,
                     'axes.spines.right': False, 'svg.fonttype': 'none'})
fig, (left, right) = plt.subplots(1, 2, figsize=(14, 6.8), gridspec_kw={'width_ratios': [1.2, 1]})
fig.subplots_adjust(left=.07, right=.97, top=.73, bottom=.27, wspace=.42)
fig.suptitle('How long does the arrangement persist?', x=.07, y=.96, ha='left', fontsize=23, fontweight='bold')
fig.text(.07, .89, '96 new initial states  |  3,000-cycle monitoring window  |  two timestep resolutions', fontsize=12)
fig.text(.07, .84, 'Unobserved exits remain lower bounds. Numerical disagreements remain visible.', fontsize=11, color='#444444')
colors = ['#c45b3c', '#197b67']
for row, color in zip(data['byRatio'], colors):
    curve = row['curve']
    x = [c['cycles'] for c in curve]
    lower, upper = [c['survivalLower'] for c in curve], [c['survivalUpper'] for c in curve]
    left.step(x, lower, where='post', color=color, linewidth=1.8)
    left.step(x, upper, where='post', color=color, linewidth=1.2, linestyle='--')
    left.fill_between(x, lower, upper, step='post', color=color, alpha=.16)
left.set(xlabel='Initial inner orbital cycles', ylabel='Fraction of 48 initial states still within the criteria',
         xlim=(0, 3050), ylim=(0, 1.06), title='Persistence depends on orbital relationships')
left.axhline(.5, linewidth=.8, color='#999999', linestyle=':')
left.grid(alpha=.15)
left.legend(handles=[Line2D([0], [0], color=color, label=f"Initial size ratio {row['ratio']:.3f}")
                     for row, color in zip(data['byRatio'], colors)], frameon=False, loc='lower left')
left.text(0, -.28, 'Median: 852–2,291 cycles at ratio 1.400; beyond 3,000 at 1.425.\nBands describe numerical ambiguity, not confidence intervals.',
          transform=left.transAxes, fontsize=10, va='top')

names = ['Constant baseline', 'Initial geometry', '+ first-order response', '+ second-order response']
model_colors = ['#8c8c8c', '#197b67', '#335d9e', '#c45b3c']
for index, (model, color) in enumerate(zip(data['prediction'], model_colors)):
    score = next(h['test'] for h in model['horizons'] if h['cycles'] == data['primaryHorizon'])
    lo, hi = score['scoreLower'], score['scoreUpper']
    middle = (lo + hi) / 2
    right.errorbar(middle, index, xerr=[[middle-lo], [hi-middle]], fmt='o', color=color, capsize=6,
                   markersize=7, linewidth=3)
    right.text(hi + .012, index, f'{lo:.3f}–{hi:.3f}', va='center', fontsize=10)
right.set(yticks=range(4), yticklabels=names, xlabel='Held-out Brier loss at 3,000 cycles (lower is better)',
          title='Do early perturbations predict persistence?', xlim=(0, .42), ylim=(3.6, -.6))
right.grid(axis='x', alpha=.15)
right.text(0, -.28, '24 held-out states; one numerically unresolved label.\nBars retain its best/worst score assignments. No test-set tuning.',
           transform=right.transAxes, fontsize=10, va='top')
fig.text(.07, .07, 'Initial geometry outperformed the baseline in this pilot. Adding early perturbation responses did not improve prediction.', fontsize=11, fontweight='bold')
fig.text(.07, .025, 'Newtonian point-mass model; finite deterministic samples. No infinite-lifetime estimate, physical escape-rate estimate or analytical confinement bound.', fontsize=9, color='#444444')
for extension in ['png', 'svg']:
    fig.savefig(root / f'evidence/figures/relational-orbital-duration-v1.{extension}', dpi=160)
print(json.dumps({'figure': 'evidence/figures/relational-orbital-duration-v1.png', 'matplotlib': matplotlib.__version__}))
