# Frontier Wave 7.258: The E8 local dictionary makes width scaling reusable

**Date:** 26 October 2026

**Status:** compiled local interface certified

The cutoff-eight, eight-root cell is now a versioned 23.8 KB operator
dictionary containing energies, parities and signed channel matrices. Loading
it reproduces the known periodic width-three gap and symmetry labels exactly.

This separates two costs and two claims: the 340,321-state solve certifies one
local dictionary; matrix-free chain calculations consume it without changing
the carrier. The dictionary remains finite-shell and finite-root, but larger
widths can now be computed, compared and tuned with explicit provenance.
