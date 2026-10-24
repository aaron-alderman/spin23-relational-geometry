"""Exploratory blind continuity analysis for Lu--Steinhardt Figure 4F.

Only red/blue source vectors are rendered. Purple/yellow annotations and caption
data are not used as detector inputs. The two panels are registered by the frozen
translation and compared through connected components of the ribbon masks.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from pypdf import PdfReader


EXPECTED_SHA256 = "7D6BFA0A729C22E845699F0E6A8778ABA04D511BA8C1CF83C26186C2EEBD97CA"
COLOURS = {
    ("0.243", "0.302", "0.62"): "blue",
    ("0.816", "0.11", "0.086"): "red",
}
BEFORE = (130.0, 335.0, 242.0, 467.0)
AFTER = (266.3815, 335.0, 378.3815, 467.0)


def cubic(p0, p1, p2, p3, steps=16):
    points = []
    for i in range(1, steps + 1):
        t = i / steps
        u = 1.0 - t
        points.append(
            (
                u**3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t**3 * p3[0],
                u**3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t**3 * p3[1],
            )
        )
    return points


def extract_paths(pdf):
    operations = PdfReader(pdf).pages[5].get_contents().operations
    current_colour = None
    subpaths = []
    active = None
    current = None
    records = []
    paints = {b"f", b"F", b"f*", b"B", b"B*", b"b", b"b*"}
    clears = paints | {b"S", b"s", b"n"}

    for operands, operator in operations:
        if operator in {b"scn", b"rg"}:
            current_colour = tuple(str(value) for value in operands)
        elif operator == b"m":
            current = (float(operands[0]), float(operands[1]))
            active = [current]
            subpaths.append(active)
        elif operator == b"l" and active is not None:
            current = (float(operands[0]), float(operands[1]))
            active.append(current)
        elif operator == b"c" and active is not None:
            p1 = (float(operands[0]), float(operands[1]))
            p2 = (float(operands[2]), float(operands[3]))
            p3 = (float(operands[4]), float(operands[5]))
            active.extend(cubic(current, p1, p2, p3))
            current = p3
        elif operator == b"v" and active is not None:
            p2 = (float(operands[0]), float(operands[1]))
            p3 = (float(operands[2]), float(operands[3]))
            active.extend(cubic(current, current, p2, p3))
            current = p3
        elif operator == b"y" and active is not None:
            p1 = (float(operands[0]), float(operands[1]))
            p3 = (float(operands[2]), float(operands[3]))
            active.extend(cubic(current, p1, p3, p3))
            current = p3
        elif operator == b"h" and active:
            if active[-1] != active[0]:
                active.append(active[0])
            current = active[-1]

        if operator in paints and current_colour in COLOURS and subpaths:
            records.append({"colour": COLOURS[current_colour], "subpaths": subpaths})
        if operator in clears:
            subpaths = []
            active = None
            current = None
    return records


def render(records, box, scale):
    xmin, ymin, xmax, ymax = box
    width = math.ceil((xmax - xmin) * scale)
    height = math.ceil((ymax - ymin) * scale)
    masks = {colour: Image.new("1", (width, height), 0) for colour in ("red", "blue")}
    draws = {colour: ImageDraw.Draw(mask) for colour, mask in masks.items()}
    used = {"red": 0, "blue": 0}
    for record in records:
        all_points = [point for subpath in record["subpaths"] for point in subpath]
        if not all_points:
            continue
        bx = (min(x for x, _ in all_points), min(y for _, y in all_points), max(x for x, _ in all_points), max(y for _, y in all_points))
        if bx[2] < xmin or bx[0] > xmax or bx[3] < ymin or bx[1] > ymax:
            continue
        used[record["colour"]] += 1
        for subpath in record["subpaths"]:
            polygon = [((x - xmin) * scale, (ymax - y) * scale) for x, y in subpath]
            if len(polygon) >= 3:
                draws[record["colour"]].polygon(polygon, fill=1)
    return masks, used


def component_stats(mask, min_pixels):
    array = np.asarray(mask, dtype=bool)
    height, width = array.shape
    parent = []
    size = []
    boundary = []
    previous = []

    def make(run_size, touches):
        index = len(parent)
        parent.append(index)
        size.append(run_size)
        boundary.append(touches)
        return index

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(a, b):
        a, b = find(a), find(b)
        if a == b:
            return a
        if size[a] < size[b]:
            a, b = b, a
        parent[b] = a
        size[a] += size[b]
        boundary[a] = boundary[a] or boundary[b]
        return a

    for y in range(height):
        xs = np.flatnonzero(array[y])
        runs = []
        if len(xs):
            starts = np.r_[xs[0], xs[1:][np.diff(xs) > 1]]
            ends = np.r_[xs[:-1][np.diff(xs) > 1], xs[-1]]
            for start, end in zip(starts, ends):
                label = make(int(end - start + 1), y in {0, height - 1} or start == 0 or end == width - 1)
                for pstart, pend, plabel in previous:
                    if pend + 1 >= start and pstart - 1 <= end:
                        label = union(label, plabel)
                runs.append((int(start), int(end), label))
        previous = runs

    roots = {}
    for index in range(len(parent)):
        root = find(index)
        roots[root] = (size[root], boundary[root])
    kept = [(pixels, touches) for pixels, touches in roots.values() if pixels >= min_pixels]
    return {
        "components": len(kept),
        "interiorComponents": int(sum(not touches for _, touches in kept)),
        "boundaryComponents": int(sum(touches for _, touches in kept)),
        "pixelSizes": [int(pixels) for pixels, _ in sorted(kept, reverse=True)],
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--scale", type=int, default=12)
    parser.add_argument("--minimum-area-points", type=float, default=0.03)
    parser.add_argument("--stability-sweep", action="store_true")
    args = parser.parse_args()
    digest = hashlib.sha256(args.pdf.read_bytes()).hexdigest().upper()
    if digest != EXPECTED_SHA256:
        raise SystemExit(f"unexpected source checksum: {digest}")
    records = extract_paths(args.pdf)

    if args.stability_sweep:
        trials = []
        for scale in (8, 12, 16, 20, 24, 32, 40, 48):
            for minimum_area in (0.01, 0.03, 0.1):
                counts = {}
                for name, box in (("before", BEFORE), ("after", AFTER)):
                    masks, _ = render(records, box, scale)
                    counts[name] = {
                        colour: component_stats(mask, max(1, round(minimum_area * scale * scale)))["components"]
                        for colour, mask in masks.items()
                    }
                delta = {colour: counts["after"][colour] - counts["before"][colour] for colour in ("red", "blue")}
                trials.append({"scale": scale, "minimumAreaPoints": minimum_area, "counts": counts, "afterMinusBefore": delta})
        result = {
            "schema": "girih-figure4f-blind-ribbon-component-sweep/1",
            "trials": trials,
            "registeredDeltasStable": len({(trial["afterMinusBefore"]["red"], trial["afterMinusBefore"]["blue"]) for trial in trials}) == 1,
            "observedRegisteredDelta": trials[0]["afterMinusBefore"],
        }
        print(json.dumps(result, indent=2, sort_keys=True))
        return

    result = {"schema": "girih-figure4f-blind-ribbon-components/0", "scale": args.scale, "minimumAreaPoints": args.minimum_area_points, "panels": {}}
    for name, box in (("before", BEFORE), ("after", AFTER)):
        masks, used = render(records, box, args.scale)
        result["panels"][name] = {"sourcePathComponents": used, "maskComponents": {}}
        for colour, mask in masks.items():
            stats = component_stats(mask, max(1, round(args.minimum_area_points * args.scale * args.scale)))
            result["panels"][name]["maskComponents"][colour] = stats
    print(json.dumps(result, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
