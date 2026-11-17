"""Reconstruct the AZ-122 finite Hamiltonian and test its Heisenberg projection."""
import hashlib
import json
from pathlib import Path
import numpy as np

root = Path(__file__).resolve().parents[2]
raw = (root / "evidence/data/ssh-wavepacket-phonon-capture-gate-v1.json").read_bytes()
record = json.loads(raw)
p = record["parameters"]
reference = record["convergence"]["refined"]
n, sites = reference["matterBins"], reference["phononSites"]
bonds = np.array([p["t1"],p["t2"]] * (p["cells"]-1) + [p["t1"],p["localCoupling"]])
cluster = np.diag(bonds,1) + np.diag(bonds,-1)
cluster[-1,-1] = p["localEnergy"]
eye = np.eye(len(cluster))
eb, contact = p["boundEnergy"], p["contactCoupling"]
green = np.sign(eb)/np.sqrt(eb**2-4)
effective = eb*eye-cluster
effective[0,0] -= contact**2 * green
energies, vecs = np.linalg.eigh(effective)
bound = vecs[:,np.argmin(abs(energies))]
decay = (abs(eb)-np.sqrt(eb**2-4))/2
bound /= np.sqrt(1+(contact*green*bound[0])**2*(1+decay**2)/(1-decay**2))

de = (p["matterEnergyMax"]-p["matterEnergyMin"])/n
energy = p["matterEnergyMin"]+(np.arange(n)+0.5)*de
k = np.arccos(-energy/2)
v = 2*np.sin(k)
col = np.array([np.linalg.solve(e*eye-cluster,eye[0]) for e in energy])
potential = contact**2*col[:,0]
transmission = v/(v-1j*potential)
incoming = col*(contact*transmission/np.sqrt(2*np.pi*v))[:,None]
form = incoming[:,1:]*bound[:-1]+incoming[:,:-1]*bound[1:]
q = 2*np.pi*np.arange(1,sites)/sites
omega = 2*np.abs(np.sin(q/2))
strain = 2*np.sin(q/2)/np.sqrt(2*sites*omega)
g = p["bondDerivativeBenchmark"]*np.sqrt(de)*(form @ np.exp(1j*np.outer(np.arange(len(bonds))+0.5,q)))*strain
h = np.block([[np.diag(energy),g.conj()],[g.T,np.diag(eb+omega)]])
psi = np.zeros(len(h),complex)
psi[:n] = np.sqrt(de)*np.exp(-0.25*((energy-p["packetEnergy"])/p["packetSigma"])**2-1j*k*p["packetCentreSite"])
psi /= np.linalg.norm(psi)
values, basis = np.linalg.eigh(h)
coeff = basis.conj().T @ psi
# Capture-sector projector represented in the energy eigenbasis.
proj = basis[n:].conj().T @ basis[n:]
rho = np.outer(coeff,coeff.conj())
def result(scale):
    phase = np.exp(-1j*scale*p["totalTime"]*values)
    observable = phase.conj()[:,None]*proj*phase
    # Tr(rho o observable) = Tr(rho observable) for Hermitian arguments.
    jordan = np.sum(rho.T*observable).real
    evolved = basis @ (phase*coeff)
    projected = np.linalg.norm(evolved[n:])**2
    assert abs(jordan-projected)<1e-12
    return float(jordan)

captures = {str(s):result(s) for s in (0,0.5,1)}
expected = reference["final"]["captured"]
residual = abs(captures["1"]-expected)
assert np.max(abs(h-h.conj().T))<1e-14 and np.max(abs(proj@proj-proj))<1e-12
assert residual < 2e-10 and abs(captures["0"])<1e-12 and abs(captures["0.5"]-captures["1"])>1e-9
print(json.dumps(dict(sourceSha256=hashlib.sha256(raw).hexdigest(),dimension=len(h),
    observable="bound electron plus any retained one-phonon mode",time=p["totalTime"],
    probabilityByGeneratorScale=captures,archivedRK4=expected,absoluteDifference=residual,
    projectorMaxResidual=float(np.max(abs(proj@proj-proj)))),indent=2))

