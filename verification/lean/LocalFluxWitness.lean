import LocalFlux
import LocalFluxWitnessData

namespace LocalFlux.Witness

open LocalFluxWitnessData

def pickup (row : Rat × Rat) : Functional Bool where
  read x := row.1 * x false + row.2 * x true
  add x y := by grind
  scale a x := by grind

def currents (values : Rat × Rat) : Currents Bool :=
  fun mode => if mode then values.2 else values.1

def single : List (Functional Bool) := [pickup singleRow]
def two : List (Functional Bool) := [pickup firstRow, pickup secondRow]
def flux : Functional Bool := pickup fluxRow

theorem single_pickup_blind :
    (∀ r ∈ single, r.read (currents reference) = r.read (currents target)) ∧
    flux.read (currents reference) ≠ flux.read (currents target) := by
  constructor
  · intro r hr
    have eq : r = pickup singleRow := by simpa [single] using hr
    rw [eq]
    decide +kernel
  · decide +kernel

theorem single_not_in_row_span : ¬ InRowSpan single flux := by
  intro h
  exact single_pickup_blind.2
    ((rowSpan_iff_identifiable single flux).mp h _ _ single_pickup_blind.1)

theorem two_pickup_reconstruction (x : Currents Bool) :
    flux.read x = (23 / 25 : Rat) * (pickup firstRow).read x
                + (2 / 5 : Rat) * (pickup secondRow).read x := by
  simp only [flux, pickup, fluxRow, firstRow, secondRow]
  grind

theorem two_in_row_span : InRowSpan two flux := by
  refine ⟨23 / 25, (pickup secondRow).combine (2 / 5) Functional.zero, ?_, ?_⟩
  · exact ⟨2 / 5, Functional.zero, fun _ => rfl, fun _ => rfl⟩
  · intro x
    rw [two_pickup_reconstruction x]
    change _ = _ + (_ + 0)
    grind

theorem two_pickups_identify : Identifiable two flux :=
  (rowSpan_iff_identifiable two flux).mp two_in_row_span

theorem witness_exact_readouts :
    (pickup singleRow).read (currents reference) = referenceReading ∧
    (pickup singleRow).read (currents target) = targetReading ∧
    flux.read (currents reference) = 1 ∧
    flux.read (currents target) = 11 / 10 ∧
    flux.read (currents target) / flux.read (currents reference) = fluxRatio := by
  decide +kernel

end LocalFlux.Witness
