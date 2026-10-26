# Publication compiler

Edition 3 is a compiled reading surface. Its canonical inputs are the Markdown under `book/edition-3/` and `corpus/`, the machine publication object at `book/edition-3/book.json`, and the authored assets and generator in this directory. Generated HTML is never an authority and is not tracked.

Build the deployable site from a clean checkout:

```powershell
New-Item -ItemType Directory -Force .build/pages
Copy-Item -Recurse docs/concept-map .build/pages/concept-map
node tooling/publication/generate_edition3_book_preview.mjs --site-only --site-root .build/pages/edition-3
$env:EDITION3_SITE_ROOT = ".build/pages/edition-3"
node --test tests/publication/edition3_book_preview.test.mjs
node --test tests/publication/edition3_compiled_site.test.mjs
```

The `--site-only` boundary is mandatory in deployment. It prevents publication from rewriting canonical Markdown or metadata. The compiler fails when a cited source is absent and compiles every `corpus/**/*.md` document into the disposable `library/` reading layer. That layer includes stable deep routes, navigable directory indexes and breadcrumbs, folder neighbours, explicit-link backlinks, shortest known routes from Edition 3 citations, a static search index, canonical paths, source SHA-256 values and the build revision. The former `sources/` URLs remain generated redirects for compatibility.

`library/manifest.json` inventories the complete compiled corpus and its directory hierarchy; `library/search-index.json` drives client-side title, directory and path search. Neither file is authoritative. Adding, moving, linking or editing canonical Markdown changes the next build automatically, so no generated HTML needs to be maintained by hand.

The GitHub Pages workflow assembles `.build/pages`, validates the complete local link graph and uploads that disposable directory. Nothing below `.build/` or `docs/edition-3/` should be committed.

To intentionally refresh the generated Markdown publication object during authoring, run the generator without `--site-only`, inspect the `book/edition-3/` diff, and commit only the canonical publication changes. The HTML produced by that compatibility mode remains ignored.
