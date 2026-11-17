import Std

namespace LocalFlux

abbrev Currents (Mode : Type) := Mode → Rat

/-- The model's pickup readings and device flux are linear functionals. -/
structure Functional (Mode : Type) where
  read : Currents Mode → Rat
  add : ∀ x y, read (fun i => x i + y i) = read x + read y
  scale : ∀ (a : Rat) x, read (fun i => a * x i) = a * read x

variable {Mode : Type}

def Functional.zero : Functional Mode where
  read _ := 0
  add _ _ := by grind
  scale a _ := by simp

def Functional.combine (r : Functional Mode) (a : Rat) (f : Functional Mode) :
    Functional Mode where
  read x := a * r.read x + f.read x
  add x y := by rw [r.add, f.add]; grind
  scale b x := by rw [r.scale, f.scale]; grind

/-- Membership is witnessed by one scalar coefficient per row. -/
def InRowSpan : List (Functional Mode) → Functional Mode → Prop
  | [], f => ∀ x, f.read x = 0
  | r :: rs, f =>
    ∃ a g, InRowSpan rs g ∧ ∀ x, f.read x = a * r.read x + g.read x

def VanishesOnBlindCurrents (rows : List (Functional Mode)) (f : Functional Mode) : Prop :=
  ∀ x, (∀ r ∈ rows, r.read x = 0) → f.read x = 0

def Identifiable (rows : List (Functional Mode)) (f : Functional Mode) : Prop :=
  ∀ x y, (∀ r ∈ rows, r.read x = r.read y) → f.read x = f.read y

theorem rowSpan_iff_vanishes (rows : List (Functional Mode)) (f : Functional Mode) :
    InRowSpan rows f ↔ VanishesOnBlindCurrents rows f := by
  induction rows generalizing f with
  | nil => simp [InRowSpan, VanishesOnBlindCurrents]
  | cons r rs ih =>
    constructor
    · rintro ⟨a, g, hg, eq⟩ x hx
      rw [eq, hx r (by simp), (ih g).mp hg x (fun s hs => hx s (by simp [hs]))]
      grind
    · intro hf
      by_cases hr : VanishesOnBlindCurrents rs r
      · refine ⟨0, f, (ih f).mpr ?_, fun _ => by grind⟩
        intro x hx
        exact hf x (fun s hs => by
          rcases List.mem_cons.mp hs with rfl | hs
          · exact hr x hx
          · exact hx s hs)
      · classical
        have blind : ∃ v, (∀ s ∈ rs, s.read v = 0) ∧ r.read v ≠ 0 := by
          apply Classical.byContradiction
          intro missing
          apply hr
          intro x hx
          apply Classical.byContradiction
          intro nonzero
          exact missing ⟨x, hx, nonzero⟩
        obtain ⟨v, hv, hn⟩ := blind
        let a := f.read v / r.read v
        let g := r.combine (-a) f
        refine ⟨a, g, (ih g).mpr ?_, ?_⟩
        · intro x hx
          let b := -(r.read x / r.read v)
          have adjusted (s : Functional Mode) :
              s.read (fun i => x i + b * v i) = s.read x + b * s.read v := by
            rw [s.add, s.scale]
          have hz : f.read (fun i => x i + b * v i) = 0 := hf _ (fun s hs => by
            rw [adjusted]
            rcases List.mem_cons.mp hs with rfl | hs
            · dsimp [b]; grind
            · rw [hx s hs, hv s hs]; grind)
          rw [adjusted] at hz
          change -a * r.read x + f.read x = 0
          dsimp [a, b] at *
          grind
        · intro x
          change f.read x = a * r.read x + (-a * r.read x + f.read x)
          grind

theorem rowSpan_iff_identifiable (rows : List (Functional Mode)) (f : Functional Mode) :
    InRowSpan rows f ↔ Identifiable rows f := by
  rw [rowSpan_iff_vanishes]
  have difference (r : Functional Mode) (x y : Currents Mode) :
      r.read (fun i => x i + (-1) * y i) = r.read x + (-1) * r.read y := by
    rw [r.add, r.scale]
  have zero (r : Functional Mode) : r.read (fun _ => 0) = 0 := by
    have h := r.scale 0 (fun _ => 0)
    simpa using h
  constructor
  · intro h x y eq
    have hf := h (fun i => x i + (-1) * y i) (fun r hr => by
      rw [difference, eq r hr]
      grind)
    rw [difference] at hf
    grind
  · intro h x blind
    rw [h x (fun _ => 0) (fun r hr => (blind r hr).trans (zero r).symm), zero]

end LocalFlux
