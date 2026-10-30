"""Standalone scientific figures from the saved experiment, without rerunning it."""
import argparse
import json
from pathlib import Path
import sys

parser = argparse.ArgumentParser()
parser.add_argument('--dependency-path')
args = parser.parse_args()
if args.dependency_path:
    sys.path.insert(0, str(Path(args.dependency_path).resolve()))
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap, BoundaryNorm
from matplotlib.patches import Patch

root = Path(__file__).resolve().parents[2]
data = json.loads((root / 'evidence/data/relational-orbital-persistence-v1.json').read_text())
analysis = json.loads((root / 'evidence/data/relational-orbital-persistence-analysis-v1.json').read_text())
figures = root / 'evidence/figures'
figures.mkdir(exist_ok=True)
plt.rcParams.update({'font.family': 'DejaVu Sans', 'font.size': 10,
                     'axes.spines.top': False, 'axes.spines.right': False,
                     'axes.titleweight': 'bold', 'svg.fonttype': 'none'})
colors = ['#197b67', '#c45b3c', '#b3a9c4']
cmap = ListedColormap(colors)
norm = BoundaryNorm([-.5, .5, 1.5, 2.5], 3)
fig, axes = plt.subplot_mosaic([['a', 'b', 'c'], ['d', 'd', 'e']], figsize=(15, 10),
                              gridspec_kw={'height_ratios': [1.2, 1]})
fig.subplots_adjust(top=.79, bottom=.16, left=.065, right=.975, hspace=.70, wspace=.30)
fig.suptitle('Relational persistence in a planetary three-body model', x=.065, y=.965,
             ha='left', fontsize=21, fontweight='bold')
fig.text(.065, .917, 'One star + two planets  |  mass ratios 1 : 0.001 : 0.001  |  initial eccentricities 0.2', fontsize=11)
fig.text(.065, .884, '408 configurations; each checked at 160, 320 and 640 steps per initial inner period.', fontsize=11)
ratios = sorted(set(p['ratio'] for p in data['grid']))
phases = sorted(set(p['phase'] for p in data['grid']))
dx = ratios[1] - ratios[0]
xedges = np.r_[np.array(ratios) - dx/2, ratios[-1]+dx/2]
dy = 360/len(phases)
yedges = np.arange(len(phases)+1)*dy-dy/2
for label, cycles in zip(['a', 'b', 'c'], data['config']['monitorCycles']):
    ax = axes[label]
    values = np.zeros((len(phases), len(ratios)))
    for p in data['grid']:
        outcome = next(h['outcome'] for h in p['horizons'] if h['cycles'] == cycles)
        values[phases.index(p['phase']), ratios.index(p['ratio'])] = ['survived', 'exited', 'unresolved'].index(outcome)
    ax.pcolormesh(xedges, yedges, values, cmap=cmap, norm=norm, shading='flat', edgecolors='#ffffff30', linewidth=.25)
    ax.axvline(2**(2/3), color='white', linestyle='--', linewidth=1)
    ax.set(title=f'{cycles:,} inner cycles', xlabel='Initial outer / inner semimajor axis',
           yticks=[0, 90, 180, 270], xticks=[1.4, 1.5, 1.6, 1.7, 1.8])
    if label == 'a':
        ax.set_ylabel('Initial outer mean anomaly (degrees)')
    else:
        ax.set_yticklabels([])
    count = next(h for h in analysis['horizons'] if h['cycles'] == cycles)
    ax.text(.01, -.22, f"{count['survived']} survive  /  {count['exited']} cross threshold  /  {count['unresolved']} unresolved",
            transform=ax.transAxes, fontsize=9)
fig.legend(handles=[Patch(facecolor=colors[0], label='Survival agrees across resolutions'),
                    Patch(facecolor=colors[1], label='Threshold crossing agrees across resolutions'),
                    Patch(facecolor=colors[2], label='Unresolved')],
           loc='upper center', bbox_to_anchor=(.52, .855), ncol=3, frameon=False)

ax = axes['d']
styles = ['#197b67', '#335d9e', '#c45b3c']
for p, color in zip(analysis['perturbationWindows'], styles):
    windows = p['trials'][0]['windows']
    label = f"a ratio {p['ratio']:.3f}, phase {np.degrees(p['phase']):.0f}°"
    ax.loglog([w['cycles'] for w in windows], [w['secondOrderResidual'] for w in windows],
              'o-', color=color, label=label, markersize=4)
ax.set(title='Where the second-order prediction loses accuracy', xlabel='Initial inner cycles',
       ylabel='Error in three normalized distances')
ax.grid(which='major', alpha=.18)
ax.legend(frameon=False, fontsize=9, loc='upper left')
ax.text(0, -.32, 'Same 0.001-radian phase perturbation in each case. These are local predictions, not lifetime bounds.',
        transform=ax.transAxes, fontsize=9, va='top')

ax = axes['e']
for e, color in zip(data['ensembles'], styles):
    hs = e['horizons']
    label = f"{e['center']['ratio']:.3f}, {np.degrees(e['center']['phase']):.0f}°"
    ax.semilogx([h['cycles'] for h in hs], [h['survived']/h['denominator'] for h in hs],
                'o-', color=color, label=label)
    if any(h['unresolved'] for h in hs):
        ax.fill_between([h['cycles'] for h in hs], [h['survived']/h['denominator'] for h in hs],
                        [(h['survived']+h['unresolved'])/h['denominator'] for h in hs], color=color, alpha=.15)
ax.set(title='Neighbourhood survival', xlabel='Initial inner cycles', ylabel='Fraction of 25 sampled neighbours',
       ylim=(0, 1.08), yticks=[0, .25, .5, .75, 1])
ax.grid(alpha=.18)
ax.legend(frameon=False, fontsize=8)
ax.text(0, -.32, 'Neighbours checked at 640 and 1,280 steps/period.\nShading includes unresolved members; no probability inference.',
        transform=ax.transAxes, fontsize=8, va='top')
fig.text(.065, .025, 'Exploratory Newtonian model. Dashed line: initial 2:1 period ratio. Survival is monitoring-specific; it is not infinite stability.', fontsize=9, color='#444444')
fig.savefig(figures / 'relational-orbital-persistence-v1.png', dpi=160)
fig.savefig(figures / 'relational-orbital-persistence-v1.svg')
print(json.dumps({'png': str(figures / 'relational-orbital-persistence-v1.png'),
                  'svg': str(figures / 'relational-orbital-persistence-v1.svg'),
                  'matplotlibVersion': matplotlib.__version__}))
