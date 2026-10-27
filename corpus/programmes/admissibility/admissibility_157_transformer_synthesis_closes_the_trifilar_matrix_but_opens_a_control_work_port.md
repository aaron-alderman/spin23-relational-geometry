# Transformer synthesis closes the trifilar matrix but opens a control-work port

**Date:** 28 October 2026

**Status:** exact capacitor-only no-go and exact ideal-transformer factorization; finite-band hardware realization and moving-control energy closure remain experimental

**Parents:** [trifilar fixed-plane no-go and moving-projector repair](admissibility_156_trifilar_braid_fixed_plane_no_go_and_moving_projector_repair.md), [passive loss and the holonomy gap](admissibility_153_passive_loss_requires_a_bath_ledger_and_can_destroy_the_holonomy_gap.md), [matrix-residue identifiability](admissibility_152_scalar_impedance_cannot_identify_dark_holonomy_but_matrix_residues_can.md), [physical energy-current gate](admissibility_34_physical_energy_current_construction_gate.md)

**Evidence:** [transformer-synthesis ledger](../../../evidence/data/admissibility-trifilar-transformer-synthesis-v1.json); [independent verifier](../../../verification/admissibility/verify_trifilar_transformer_synthesis.mjs)

**Literature contacts:** [Dörfler and Bullo, Kron reduction of graphs and electrical networks](https://arxiv.org/abs/1102.2950); [Reibiger, capacitance and inductance matrices of lossless homogeneous multiconductor lines](https://doi.org/10.5194/ars-1-63-2003); [Williams, Hayden and Marks, general waveguide circuit theory](https://doi.org/10.6028/jres.097.024)

## Result

The passive-synthesis gate left by AZ-156 divides cleanly.

Adding hidden positive capacitors cannot repair the sign obstruction. An
ordinary capacitor network has a grounded graph-Laplacian, or symmetric
Stieltjes, nodal matrix. Eliminating internal nodes by Kron reduction takes a
Schur complement and preserves that class. If the requested terminal matrix
has a positive off-diagonal entry, no larger network made only from positive
pairwise and ground capacitors can produce it.

The same positive quadratic form nevertheless has an exact ideal passive
realization through a multiport transformer. For

\[
P(\phi)=I-n(\phi)n(\phi)^T,
\qquad
K(\phi)=k_dP(\phi)+k_b n(\phi)n(\phi)^T,
\]

define

\[
T(\phi)=\sqrt{k_d}\,P(\phi)+\sqrt{k_b}\,n(\phi)n(\phi)^T.
\]

Because the bright and dark projectors are orthogonal,

\[
T(\phi)^TT(\phi)=K(\phi).
\]

Three unit capacitors on transformed ports (y=T x) therefore store

\[
U=\frac12y^Ty=\frac12x^TKx.
\]

With ideal transformer port laws (v_y=T v_x) and
(i_x=T^Ti_y), instantaneous power is preserved. The static synthesis is
lossless and reciprocal at the ideal network level. It is not an ordinary
capacitor graph, and it is not yet a claim about a realizable broadband
three-winding component.

When (T), (K), or the admitted projector moves in time, the controller
becomes another physical port. For a coordinate (x),

\[
\frac{dU}{dt}
=x^TK\dot x+\frac12x^T\dot Kx.
\]

The second term is control work. A time-programmed quarter-turn experiment is
not autonomous passivity merely because every frozen matrix is positive and
has a lossless transformer realization.

## Why hidden capacitors cannot help

Let the full nodal capacitance matrix be partitioned into measured boundary
nodes (b) and hidden internal nodes (i):

\[
C=\begin{pmatrix}C_{bb}&C_{bi}\\C_{ib}&C_{ii}\end{pmatrix}.
\]

Positive pairwise capacitors contribute negative off-diagonal entries and
positive diagonal entries. Ground capacitors add nonnegative diagonal terms.
After internal charge balance is imposed, the terminal matrix is

\[
C_{\mathrm{eff}}
=C_{bb}-C_{bi}C_{ii}^{-1}C_{ib}.
\]

This is precisely Kron reduction. Under the usual connectedness and grounding
conditions it remains a symmetric Stieltjes matrix: its off-diagonal entries
remain nonpositive and its row sums remain nonnegative. Auxiliary capacitor
nodes can alter magnitudes and densify connections, but they cannot reverse
the sign class.

For the AZ-156 fixture (k_d=2), (k_b=1), the phase-zero target contains

\[
K(0)_{12}=\frac1{32}>0,
\qquad
K(0)_{23}\approx0.0150>0.
\]

That is a certificate against the entire positive-capacitor-only enlargement,
not just against one attempted circuit drawing. This closes repair option 1
as previously stated.

## What the transformer changes

The transformer does not make a forbidden capacitor negative. It changes the
relation between external coordinates and the coordinates seen by positive
storage elements. Winding orientation permits signed entries in (T), while
the paired transpose in the current law keeps power invariant:

\[
v_x^Ti_x
=v_x^TT^Ti_y
=(Tv_x)^Ti_y
=v_y^Ti_y.
\]

This is the circuit version of the corpus grammar:

- the capacitor voltages are the **carrier** or stored thing;
- (T) is the **selector** or dual face that declares which combinations the
  storage elements see;
- (T^TT=K) is the **detector relation** returned to the external ports.

The factorization is not unique. Orthogonal transformations on the internal
capacitor ports leave (T^TT) unchanged. Those hidden choices are physically
irrelevant only if loss, parasitics and detector coupling are also transformed
or shown not to distinguish them.

## Frozen passivity is not moving passivity

There are three distinct implementations.

### Static spatial sequence

A segmented line may contain fixed transformer matrices
(T(\phi_1),T(\phi_2),\ldots) at successive locations. No parameter changes
in time, but the propagating state encounters a spatial loop. Interface
reflections, dynamical phase, dispersion and loss must be predicted with the
same frozen model. This is the cleanest nominally passive route.

### Mechanically or electronically tuned sequence

One device changes (T(t)) while the state remains in it. The term
(\tfrac12x^T\dot Kx) must be measured or bounded. Even adiabatic control can
exchange energy; slow is not synonymous with free.

### Active synthetic coupling

Digitally controlled sources or parametric converters may implement the same
matrix family more directly. Their supply, pump, noise and latency are then
declared ports. This may be the best first emulator, but it cannot be reported
as a passive realization.

## Experimental consequences

The immediate experiment no longer needs to search blindly for a mysterious
three-wire braid effect.

1. Build a static three-port transformer/capacitor cell for several frozen
   values of (phi), beginning with (0,\pi/2,\pi,3\pi/2).
2. Measure the full complex terminal admittance, not three scalar magnitudes,
   and fit one parasitic model across all settings.
3. Verify the bright singlet, dark doublet, projector motion and gap before
   attempting a loop.
4. Cascade the frozen cells spatially or tune one cell temporally. Reverse the
   order while retaining a coherent reference.
5. Predict and measure matrix residues, returned dark-frame orientation,
   insertion loss, reflected power and—if tuned—controller work.

The target quarter-turn is admitted only if the returned two-dimensional
frame follows the reconstructed projector connection after ordinary transfer
phase, endpoint relabelling and loss anisotropy are removed. A scalar Smith
chart trace cannot establish that result, although matrix-valued reflection
data remain useful input to the reconstruction.

## What this changes in the frontier

The branch is now bounded on both sides:

\[
\boxed{
\begin{gathered}
\text{positive capacitor graph, even with hidden nodes}
\;\not\supset\;K(\phi),\\
\text{ideal lossless transformer plus positive capacitors}
\;\supset\;K(\phi),\\
\text{time-varying realization}
\;\Rightarrow\;\text{explicit control-work port}.
\end{gathered}}
\]

This is useful without new physics. It converts a vague passive-realization
question into a finite engineering programme and says exactly where energy
accounting enters. New physics is not the expected outcome. It becomes
discussable only after a calibrated multiport model, its transformer
parasitics, its bath channels and its control work all fail to predict a
repeatable relation-valued residual.

## Boundary

This note proves an ideal matrix factorization and a capacitor-only no-go. It
does not prove that a compact reciprocal transformer with the required signed
turns ratios, bandwidth, degeneracy and low loss is readily fabricable. It
does not show that an experimental loop is adiabatic, that its observed return
is geometric, or that a trifilar cable realizes (T(\phi)) by itself. Those
are the remaining hardware and detector gates.
