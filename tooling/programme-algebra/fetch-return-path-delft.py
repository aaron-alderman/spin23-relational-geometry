"""Fetch only the raw I/Q members specified in the Delft analysis plan."""

import argparse
import hashlib
import io
import json
from pathlib import Path
from urllib.request import Request, urlopen
from zipfile import ZipFile
from zlib import crc32

URL = ("https://data.4tu.nl/file/2e22a266-8d89-4837-898a-7eb842624512/"
       "7a06437a-71ea-443b-aa07-ba144b0041e8")
SIZE = 74_088_084_123
MAX_RANGE = 20_000_000


class ArchiveRanges(io.RawIOBase):
    def __init__(self):
        self.offset = 0

    def seekable(self):
        return True

    def tell(self):
        return self.offset

    def seek(self, offset, whence=0):
        self.offset = (0, self.offset, SIZE)[whence] + offset
        if self.offset < 0:
            raise ValueError("Archive offset is negative")
        return self.offset

    def read(self, size=-1):
        start = self.offset
        count = max(0, min(size if size >= 0 else SIZE, SIZE - start))
        if not count:
            return b""
        if count > MAX_RANGE:
            raise ValueError("Archive read exceeds the range limit")
        end = start + count - 1
        request = Request(URL, headers={"Range": f"bytes={start}-{end}"})
        with urlopen(request, timeout=30) as response:
            if response.status != 206 or response.headers.get("Content-Range") != f"bytes {start}-{end}/{SIZE}":
                raise ValueError("Server did not return the requested archive range")
            data = response.read(count + 1)
        if len(data) != count:
            raise ValueError("Archive range has an unexpected length")
        self.offset = end + 1
        return data


def fetch(plan, output_dir, score_replicates):
    settings = plan["settingsEvidence"]
    design = plan["design"]
    replicates = [design["calibrationReplicateIndex"], *score_replicates]
    output_dir.mkdir(parents=True, exist_ok=True)
    with ZipFile(ArchiveRanges()) as archive:
        for replicate in replicates:
            stamp = settings["rowTimestamps"][replicate]
            name = f"ID_{settings['runId']}_IQ_{stamp}.npy"
            member = archive.getinfo(f"Raw timetraces/{name}")
            if member.file_size > 32_000_000 or member.compress_size > MAX_RANGE:
                raise ValueError("Selected I/Q member exceeds the download limit")
            path = output_dir / name
            if path.exists():
                current = path.read_bytes()
                if len(current) != member.file_size or crc32(current) != member.CRC:
                    raise ValueError(f"Existing file differs from the archive member: {path}")
            else:
                path.write_bytes(archive.read(member))
            print(f"{name}\t{member.file_size}\t{member.CRC:08x}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("plan", type=Path)
    parser.add_argument("directory", type=Path)
    parser.add_argument("--comparison-plan", "--thinning-plan", type=Path)
    args = parser.parse_args()
    source = args.plan.read_bytes()
    plan = json.loads(source)
    scoring = plan["design"]["scoreReplicateIndices"]
    if args.comparison_plan:
        comparison = json.loads(args.comparison_plan.read_bytes())
        if comparison["referencePlanSha256"] != hashlib.sha256(source).hexdigest():
            parser.error("Comparison plan does not reference the source plan")
        scoring = comparison["scoreReplicateIndices"]
    fetch(plan, args.directory, scoring)
