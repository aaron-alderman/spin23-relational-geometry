# Provenance: EarthScope IU.ANMO.00, 2010-02-27

This source packet is a source-native, three-component ground-velocity record from the NSF National Geophysical Facility / EarthScope Data Services archive.

- Station: `IU.ANMO.00`, Albuquerque Seismological Laboratory borehole, New Mexico
- Instrument: Geotech KS-54000 borehole seismometer
- Channels: `BH1`, `BH2`, `BHZ`
- Window: `2010-02-27T06:40:00Z` to `2010-02-27T07:10:00Z`
- Sample rate: 20 Hz
- Returned units: m/s (`scale=AUTO`)
- Format: GeoCSV 2.0 time-sample pairs
- Service documentation: <https://service.earthscope.org/fdsnws/dataselect/1/>
- Event context only: [USGS M 8.8 2010 Maule, Chile earthquake](https://earthquake.usgs.gov/earthquakes/eventpage/official20100227063411530_30/executive), origin `2010-02-27T06:34:11Z`

The event identity is contextual metadata and is not supplied to the detector or used as mechanism truth.

## Immutable local receipts

| Artifact | SHA-256 |
|---|---|
| `earthscope-iu-anmo-20100227-bh1.csv` | `988821994f8f34a34eab858d33c94778337454fcd409a19f349d508cbfe3fda2` |
| `earthscope-iu-anmo-20100227-bh2.csv` | `5e070946fb91e2e9fe46136ee7fb13594eaccb22706c30e2e67897929345c484` |
| `earthscope-iu-anmo-20100227-bhz.csv` | `2ffbe838dc02c618ac7bf5bcf9979c1b6e08007f5233dce9a364d00d85dac009` |
| `earthscope-iu-anmo-20100227-station.txt` | `b3cb053267528bc24bd04a1d63e467971a2f732c85674523b561f65248fa3128` |

Each waveform URL is recorded in the derived evidence packet. The local files preserve the exact segmented GeoCSV response, including all per-segment headers.
