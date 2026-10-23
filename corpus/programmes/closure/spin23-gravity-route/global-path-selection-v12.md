# Spin(2,3) Global Path Selection v12: Named Anomaly Closure

**Frozen:** 23 October 2026

The Nieh--Yan route is the strongest named anomaly candidate, but it does not
select the bulk axial Wilson coefficient.  The form is exact, its smooth
closed-manifold integral vanishes, its boundary integral is boundary data,
and its dimensionful anomaly coefficient is shiftable by a local current
counterterm.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| NY | Nieh--Yan index quantizes \(\eta\) | rejected | zero on the smooth closed index domain; boundary term otherwise |
| AC | Anomaly coefficient selects \(\eta\) | rejected | dimension mismatch and counterterm dependence |
| GA | Gauge-anomaly cancellation | rejected | axial torsion is not a gauged axial charge |
| BR | Boundary/thermal response | completed | legitimate observable, not bulk coefficient selection |
| UA | Non-shiftable UV anomaly theorem | externally blocked | compact charge, anomaly class and Ward identity absent |
| EA | Specific enlarged action | externally blocked | algebra, fields, action and thresholds absent |

All current-input selector classes are now exhausted.  Reopening requires a
new UV mathematical object, not another use of the existing torsional anomaly.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_nieh_yan_axial_selector_no_go.mjs
node verification/verify/verify_spin23_uv_torsion_flavor_path_selection_v12.mjs
~~~
