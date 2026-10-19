"""Extract NA62's red observed-limit polyline from the vector figure PDF.

Usage:
  python extract_na62_observed_limit_from_vector_pdf.py FIGURE.pdf [MASS_MEV]

The script is deliberately tied to the published Figure 2a source asset. It
uses the plot-frame coordinates and red stroke metadata present in the vector
PDF; it does not infer values from raster pixels.
"""

from __future__ import annotations

import json
import sys

import pdfplumber


figure = sys.argv[1]
target = float(sys.argv[2]) if len(sys.argv) > 2 else 100.0
page = pdfplumber.open(figure).pages[0]

# Coordinates read from the vector plot frame. Major x ticks verify the map:
# x=56.260639 -> 0 MeV and x=485.491409 -> 250 MeV.
X_LEFT, X_RIGHT, MASS_RIGHT = 56.260639, 502.660639, 260.0
Y_TOP, Y_BOTTOM, BR_TOP = 25.5735317157, 358.2135317157, 1.0e-10


def physical(point):
    x, y = point
    mass = (x - X_LEFT) * MASS_RIGHT / (X_RIGHT - X_LEFT)
    branching_ratio = (Y_BOTTOM - y) * BR_TOP / (Y_BOTTOM - Y_TOP)
    return mass, branching_ratio


red_curves = [
    curve for curve in page.curves
    if curve["stroking_color"] == (1.0, 0.0, 0.0)
    and curve["linewidth"] == 1.5
    and len(curve["pts"]) > 10
]
points = sorted(
    [physical(point) for curve in red_curves for point in curve["pts"]],
    key=lambda item: item[0],
)
lower = max(point for point in points if point[0] <= target)
upper = min(point for point in points if point[0] >= target)
if upper[0] == lower[0]:
    interpolated = lower[1]
else:
    fraction = (target - lower[0]) / (upper[0] - lower[0])
    interpolated = lower[1] + fraction * (upper[1] - lower[1])

print(json.dumps({
    "target_mass_MeV": target,
    "lower_grid_point": {"mass_MeV": lower[0], "observed_limit": lower[1]},
    "upper_grid_point": {"mass_MeV": upper[0], "observed_limit": upper[1]},
    "linear_interpolation": interpolated,
    "method": "vector-path extraction from the published Figure 2a PDF",
}, indent=2))
