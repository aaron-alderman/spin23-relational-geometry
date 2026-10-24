import Lean

open Lean Elab Command Term Meta

namespace MonsterLeanTypedAtlas

def bounds : Array Nat := #[46, 20, 9, 6, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1]
def primes : Array Nat := #[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 41, 47, 59, 71]

def zeroProfile : Array Nat := #[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

def addProfile (left right : Array Nat) : Array Nat :=
  Array.ofFn fun i : Fin 15 =>
    if i.val < 12 then left[i.val]! + right[i.val]!
    else max left[i.val]! right[i.val]!

def bump (profile : Array Nat) (index : Nat) : Array Nat :=
  profile.set! index (profile[index]! + 1)

partial def exprProfile : Expr → Array Nat
  | .bvar _ => bump zeroProfile 3
  | .fvar _ => bump zeroProfile 10
  | .mvar _ => bump zeroProfile 11
  | .sort _ => bump zeroProfile 5
  | .const name _ =>
      let profile := bump zeroProfile 1
      let profile := if name == ``Eq then profile.set! 12 1 else profile
      let profile := if name == ``Iff then profile.set! 13 1 else profile
      if name == ``False || name == ``Not then profile.set! 14 1 else profile
  | .app fn arg => bump (addProfile (exprProfile fn) (exprProfile arg)) 0
  | .lam _ type body _ => bump (addProfile (exprProfile type) (exprProfile body)) 4
  | .forallE _ type body _ => bump (addProfile (exprProfile type) (exprProfile body)) 2
  | .letE _ type value body _ =>
      bump (addProfile (exprProfile type) (addProfile (exprProfile value) (exprProfile body))) 7
  | .lit _ => bump zeroProfile 6
  | .mdata _ body => bump (exprProfile body) 9
  | .proj _ _ body => bump (exprProfile body) 8

def cappedProfile (profile : Array Nat) : Array Nat :=
  Array.ofFn fun i : Fin 15 => min profile[i.val]! bounds[i.val]!

def address (profile : Array Nat) : Nat :=
  (Array.range 15).foldl (fun product i => product * primes[i]! ^ (cappedProfile profile)[i]!) 1

partial def canonicalize (expr : Expr) : MetaM Expr := do
  -- Subexpressions below a binder contain loose de Bruijn variables when
  -- visited without a local context. They are already stable leaves for this
  -- policy, so avoid asking `whnf` to interpret them out of scope.
  let reduced ← if expr.hasLooseBVars then pure expr else whnf expr
  match reduced with
  | .app fn arg => return .app (← canonicalize fn) (← canonicalize arg)
  | .lam name type body info => return .lam name (← canonicalize type) (← canonicalize body) info
  | .forallE name type body info => return .forallE name (← canonicalize type) (← canonicalize body) info
  | .letE .. => canonicalize (← whnf reduced)
  | .mdata _ body => canonicalize body
  | .proj typeName index body =>
      let rebuilt := .proj typeName index (← canonicalize body)
      whnf rebuilt
  | other => return other

def csv (values : Array Nat) : String :=
  String.intercalate "," (values.toList.map toString)

elab "#atlas " name:ident " : " term:term : command => do
  liftTermElabM do
    let raw ← elabTerm term none
    synthesizeSyntheticMVarsNoPostponing
    let raw ← instantiateMVars raw
    discard <| inferType raw
    let canonical ← canonicalize raw
    discard <| inferType canonical
    let rawProfile := exprProfile raw
    let canonicalProfile := exprProfile canonical
    logInfo m!"ATLAS|{name.getId}|{csv rawProfile}|{address rawProfile}|{csv canonicalProfile}|{address canonicalProfile}"

abbrev AtlasNat := Nat
abbrev AtlasBool := Bool
abbrev AtlasUnit := Unit
abbrev AtlasString := String

#atlas nat_base : Nat
#atlas nat_beta : (fun X : Type => X) Nat
#atlas nat_zeta : (let X : Type := Nat; X)
#atlas nat_abbrev : AtlasNat

#atlas bool_base : Bool
#atlas bool_beta : (fun X : Type => X) Bool
#atlas bool_zeta : (let X : Type := Bool; X)
#atlas bool_abbrev : AtlasBool

#atlas unit_base : Unit
#atlas unit_beta : (fun X : Type => X) Unit
#atlas unit_zeta : (let X : Type := Unit; X)
#atlas unit_abbrev : AtlasUnit

#atlas string_base : String
#atlas string_beta : (fun X : Type => X) String
#atlas string_zeta : (let X : Type := String; X)
#atlas string_abbrev : AtlasString

#atlas prop_base : Prop
#atlas prop_beta : (fun X : Type => X) Prop
#atlas prop_zeta : (let X : Type := Prop; X)

#atlas arrow_nat : Nat → Nat
#atlas arrow_bool : Bool → Bool
#atlas arrow_mixed : Nat → Bool

#atlas literal_compact : @Eq Nat (2 : Nat) (2 : Nat)
#atlas literal_expanded :
  @Eq Nat (Nat.succ (Nat.succ Nat.zero)) (Nat.succ (Nat.succ Nat.zero))

#atlas alpha_x : forall x : Nat, @Eq Nat x x
#atlas alpha_y : forall y : Nat, @Eq Nat y y

#atlas logical_iff : Iff True True
#atlas logical_not : Not False

#atlas iota_base : Nat
#atlas iota_expanded : (match true with | true => Nat | false => Bool)

#atlas projection_reduced : @Eq Nat (0 : Nat) (0 : Nat)
#atlas projection_expanded : @Eq Nat ((0, 1).1) ((0, 1).1)

end MonsterLeanTypedAtlas
