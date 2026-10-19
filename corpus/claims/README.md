# Numbered claim ledger

The numbered documents form an append-only historical ledger. They are sharded into ranges of one hundred to keep directory traversal practical while preserving every filename.

The generated [range index](INDEX.md) reports the live document count in each bucket.

| Range | Directory |
|---|---|
| 0000–0099 | [`0000-0099/`](0000-0099/) |
| 0100–0199 | [`0100-0199/`](0100-0199/) |
| 0200–0299 | [`0200-0299/`](0200-0299/) |
| 0300–0399 | [`0300-0399/`](0300-0399/) |
| 0400–0499 | [`0400-0499/`](0400-0499/) |
| 0500–0599 | [`0500-0599/`](0500-0599/) |
| 0600–0699 | [`0600-0699/`](0600-0699/) |
| 0700–0799 | [`0700-0799/`](0700-0799/) |
| 0800–0899 | [`0800-0899/`](0800-0899/) |
| 0900–0999 | [`0900-0999/`](0900-0999/) |
| 1000–1099 | [`1000-1099/`](1000-1099/) |
| 1100–1199 | [`1100-1199/`](1100-1199/) |
| 1200–1299 | [`1200-1299/`](1200-1299/) |

Document 963 has a preserved legacy ID collision. The manifest records both filenames; neither has been silently renumbered.
