"""Read bounded pulse samples from two air-filter calibration runs."""

import argparse
from datetime import datetime
import hashlib
import io
import json
from http.client import IncompleteRead
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
from xml.etree import ElementTree

import numpy as np
import uproot


class RangeFile(io.RawIOBase):
    """Seekable HTTP file for Uproot, with a cache of aligned byte ranges."""

    def __init__(self, url, size, block_size=4 * 1024 * 1024):
        super().__init__()
        self.url = url
        self.size = size
        self.block_size = block_size
        self.blocks = {}
        self.pos = 0

    def readable(self):
        return True

    def seekable(self):
        return True

    def tell(self):
        return self.pos

    def seek(self, offset, whence=io.SEEK_SET):
        position = {io.SEEK_SET: 0, io.SEEK_CUR: self.pos, io.SEEK_END: self.size}[whence] + offset
        if position < 0:
            raise ValueError("Negative file position")
        self.pos = position
        return position

    def read(self, count=-1):
        stop = self.size if count < 0 else min(self.size, self.pos + count)
        pieces = []
        while self.pos < stop:
            block = self.pos // self.block_size
            first = block * self.block_size
            last = min(first + self.block_size, self.size) - 1
            if block not in self.blocks:
                self.blocks[block] = self.read_block(first, last)
            end = min(stop, last + 1)
            pieces.append(self.blocks[block][self.pos - first:end - first])
            self.pos = end
        return b"".join(pieces)

    def read_block(self, first, last):
        request = Request(self.url, headers={"Range": f"bytes={first}-{last}"})
        for attempt in range(3):
            try:
                with urlopen(request, timeout=25) as response:
                    if (response.status != 206
                            or response.headers.get("Content-Range") != f"bytes {first}-{last}/{self.size}"):
                        raise ValueError("Archive returned a different byte range than requested")
                    data = response.read()
                if len(data) != last - first + 1:
                    raise IncompleteRead(data, last - first + 1 - len(data))
                return data
            except HTTPError as error:
                if error.code not in (408, 429, 500, 502, 503, 504) or attempt == 2:
                    raise
            except (URLError, TimeoutError, ConnectionError, IncompleteRead):
                if attempt == 2:
                    raise


FIELDS = {"Board": "<u2", "Channel": "<u2", "Energy": "<u2", "Timestamp": "<u8", "Flags": "<u4"}


def pulse_digest(events):
    digest = hashlib.sha256()
    for name, dtype in FIELDS.items():
        digest.update(np.asarray(events[name], dtype=dtype).tobytes())
    return digest.hexdigest()


def pulse_path(run, plan, directory):
    if "entryStart" in plan:
        first = plan["entryStart"]
        return directory / f'{run["id"]}-{first}-{first + plan["entriesPerRun"]}.npz'
    return directory / f'{run["id"]}.npz'


def read_sample(run, plan):
    first = plan.get("entryStart", 0)
    stop = first + plan["entriesPerRun"]
    if first < 0 or stop <= first:
        raise ValueError("Invalid pulse sample bounds")
    relative = run.get("relativePath", f'{run["id"]}/RAW/SDataR_{run["id"]}.root')
    url = f'{plan["archivePrefix"]}/{relative}'
    with RangeFile(url, run["fileBytes"]) as window, uproot.open(window) as root:
        tree = root[run.get("tree", "Data_R")]
        if tree.num_entries < stop:
            raise ValueError("Archive tree has fewer entries than planned")
        if tree.num_entries != run["treeEntries"]:
            raise ValueError("Archive tree changed")
        return tree.arrays(list(FIELDS), entry_start=first, entry_stop=stop, library="np")


def fetch(run, plan, directory):
    events = read_sample(run, plan)
    if "retainedChannels" in plan:
        if pulse_digest(events) != run["originalPulseSha256"]:
            raise ValueError("Original pulse sample changed")
        events = retain_pulse_channels(events, plan["retainedChannels"])
    digest = pulse_digest(events)
    if digest != run["pulseSha256"]:
        raise ValueError("Archived pulse sample changed")
    np.savez_compressed(pulse_path(run, plan, directory), **events)
    return {"id": run["id"], "treeEntries": run["treeEntries"], "pulseSha256": digest}


def checked_bytes(path, expected):
    raw = path.read_bytes()
    if hashlib.sha256(raw).hexdigest() != expected:
        raise ValueError(f"Archived metadata changed: {path}")
    return raw


def read_pinned(path, reference):
    return json.loads(checked_bytes(path.with_name(reference["file"]), reference["sha256"]))


def extended_sampling(path, design):
    base = read_pinned(path, design["originalPlan"])
    if design["entryStart"] < base["entriesPerRun"]:
        raise ValueError("Extended sample overlaps the inspected prefix")
    runs = [{**run, "pulseSha256": design["extendedPulseSha256"][run["id"]]} for run in base["runs"]]
    return {**base, "runs": runs, "entryStart": design["entryStart"], "entriesPerRun": design["entriesPerRun"]}


def transfer_sampling(path, receipt):
    design = read_pinned(path, receipt["transferPlan"])
    prior = read_pinned(path, design["priorPlan"])
    sampling = extended_sampling(path, prior)
    run = {**design["target"], "pulseSha256": receipt["targetPulseSha256"]}
    return {**sampling, "archivePrefix": design.get("archivePrefix", sampling["archivePrefix"]), "runs": [run]}


def screen_sampling(path, receipt):
    design = read_pinned(path, receipt["screenPlan"])
    sampling = extended_sampling(path, read_pinned(path, design["priorPlan"]))
    digests = receipt["pulseSha256ByRun"]
    if set(digests) != {target["id"] for target in design["airTargets"]}:
        raise ValueError("Screen pulses must cover the declared air-filter targets")
    runs = [{**target, "pulseSha256": digests[target["id"]]} for target in design["airTargets"]]
    return {**sampling, "archivePrefix": design["archivePrefix"], "runs": runs}


def campaign_sampling(path, receipt):
    design = read_pinned(path, receipt["campaignPlan"])
    preparation = read_pinned(path, receipt["preparation"])
    sampling = extended_sampling(path, read_pinned(path, design["priorPlan"]))
    captured = receipt["campaignPulsesByRun"]
    expected = set(preparation["admittedTargets"])
    if set(captured) != expected:
        raise ValueError("Campaign pulse cache must cover exactly the admitted runs")
    fields = ("pulseSha256", "originalPulseSha256", "retainedPulseCount")
    targets = [{**target, **{k: captured[target["id"]][k] for k in fields}} for target in design["targets"]
               if target["id"] in expected]
    channels = [row["channel"] for row in preparation["energyCalibration"]]
    return {**sampling, "archivePrefix": design["archivePrefix"], "retainedChannels": channels, "runs": targets}


def blank_gain_sampling(path, receipt):
    design = read_pinned(path, receipt["gainPlan"])
    target, = [row for row in design["runs"] if row["id"] == receipt["source"]]
    fields = ("pulseSha256", "originalPulseSha256", "retainedPulseCount")
    return {"archivePrefix": design["archivePrefix"], "entryStart": design["entryStart"],
            "entriesPerRun": design["entriesPerRun"], "retainedChannels": design["channels"],
            "runs": [{**target, **{key: receipt["blankPulse"][key] for key in fields}}]}


def tolerance_design(path, design):
    if "calibrationPlan" not in design:
        return design
    original = read_pinned(path, design["calibrationPlan"])
    fields = ("archivePrefix", "target", "entryStarts", "entriesPerWindow", "design", "boundary")
    optional = ("runOrder", "targetInfo", "targetSettings", "comparison", "thinning", "earlierFitScreen",
                "segmentRouting", "segmentLesson")
    return {**original, **{key: design[key] for key in fields},
            **{key: design[key] for key in optional if key in design}}


def tolerance_sampling(path, receipt):
    design = tolerance_design(path, read_pinned(path, receipt["tolerancePlan"]))
    if "uppsalaReferencePlan" in design:
        base = read_pinned(path, design["uppsalaReferencePlan"])
        channels = base["measuredChannels"]
        sampling = {}
    else:
        prior = read_pinned(path, design["priorPlan"])
        sampling = extended_sampling(path, prior)
        channels = read_pinned(path, prior["alternatePlan"])["channels"]
    starts = design["entryStarts"]
    size = design["entriesPerWindow"]
    captures = receipt["pulseWindows"]
    if (not starts or size <= 0 or starts[0] < 0 or any(b < a + size for a, b in zip(starts, starts[1:]))
            or starts[-1] + size > design["target"]["treeEntries"] or set(captures) != {str(x) for x in starts}):
        raise ValueError("Tolerance pulse windows changed or overlap")
    keys = ("pulseSha256", "originalPulseSha256", "retainedPulseCount")
    return [{**sampling, "archivePrefix": design["archivePrefix"], "entryStart": start, "entriesPerRun": size,
             "retainedChannels": channels, "runs": [{**design["target"], **{key: captures[str(start)][key] for key in keys}}]}
            for start in starts]


def run_metadata(run, directory, channels):
    run_id = run["id"]
    info = checked_bytes(directory / f"{run_id}.info", run["infoSha256"])
    settings = checked_bytes(directory / f"{run_id}.xml", run["settingsSha256"])
    fields = dict(line.split("=", 1) for line in info.decode("utf-8-sig").splitlines() if "=" in line)
    if fields["id"] != run_id or settings.count(f"<runId>{run_id}</runId>".encode()) != 1:
        raise ValueError("Archive data and metadata use different run IDs")
    canonical = settings.replace(f"<runId>{run_id}</runId>".encode(), b"<runId/>")
    dates = [datetime.strptime(fields[key], "%Y/%m/%d %H:%M:%S.%f%z") for key in ("time.start", "time.stop")]
    if dates[0] >= dates[1]:
        raise ValueError("Archive run has no positive duration")
    root = ElementTree.fromstring(settings)
    calibration = []
    for channel in channels:
        entry = root.find(f".//channel[index='{channel}']/values")
        parameters = {item.findtext("key"): item.findtext("value") for item in entry.findall("entry")}
        coeff = [float(parameters[f"SW_PARAMETER_CH_ENERGY_CALIBRATION_P{i}"]) for i in range(3)]
        if parameters["SW_PARAMETER_CH_ENERGY_CALIBRATION_UDM"] != "keV" or coeff[1] <= 0 or coeff[2] != 0:
            raise ValueError("Expected an archived linear keV scale")
        calibration.append({"channel": channel, "offset": coeff[0], "slope": coeff[1]})
    return dates, canonical, calibration


def validate_pulse_board(events):
    if np.unique(events["Board"]).tolist() != [0] or events["Timestamp"].max() >= np.iinfo(np.int64).max:
        raise ValueError("Expected a single board and timestamps representable as signed integers")


def retain_pulse_channels(events, channels):
    validate_pulse_board(events)
    keep = np.isin(events["Channel"], channels)
    timestamps = events["Timestamp"]
    keep[[timestamps.argmin(), timestamps.argmax()]] = True
    return {name: values[keep] for name, values in events.items()}


def load_pulses(run, plan, directory):
    with np.load(pulse_path(run, plan, directory), allow_pickle=False) as source:
        events = {name: source[name] for name in FIELDS}
    size = run.get("retainedPulseCount", plan["entriesPerRun"])
    if (any(values.shape != (size,) or values.dtype != np.dtype(FIELDS[name])
            for name, values in events.items()) or pulse_digest(events) != run["pulseSha256"]):
        raise ValueError("Cached pulse sample differs from the archived sample")
    validate_pulse_board(events)
    return events


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("plan", type=Path)
    parser.add_argument("directory", type=Path)
    args = parser.parse_args()
    plan = json.loads(args.plan.read_bytes())
    if "pulseWindows" in plan:
        windows = tolerance_sampling(args.plan, plan)
    elif "campaignPulsesByRun" in plan:
        plan = campaign_sampling(args.plan, plan)
    elif "blankPulse" in plan:
        plan = blank_gain_sampling(args.plan, plan)
    elif "pulseSha256ByRun" in plan:
        plan = screen_sampling(args.plan, plan)
    elif "targetPulseSha256" in plan:
        plan = transfer_sampling(args.plan, plan)
    elif "extendedPulseSha256" in plan:
        plan = extended_sampling(args.plan, plan)
    if "pulseWindows" not in plan:
        windows = [plan]
    print(json.dumps([fetch(run, window, args.directory) for window in windows for run in window["runs"]], indent=2))
