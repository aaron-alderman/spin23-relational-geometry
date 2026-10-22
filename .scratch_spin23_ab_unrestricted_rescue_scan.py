import importlib.util,json
spec=importlib.util.spec_from_file_location('k','.scratch_spin23_ab_commutator_leakage_kkt.py');k=importlib.util.module_from_spec(spec);spec.loader.exec_module(k)
ds=[.36,24/61,.4,.45,.5,.6,.8,1.0,1.5,2.0,2.1,2.18,24/11,2.2,2.5]
print(json.dumps({'protocol':'spin23-ab-unrestricted-rescue-scan/1','ray':'r=1/4','rows':[k.solve(.25,d) for d in ds]},indent=2))
