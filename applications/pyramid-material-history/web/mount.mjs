import {collectionSurface} from '../vendor/sourcery/collection-ui.js';
import {frontendRuntime} from '../vendor/sourcery/ui/frontend-runtime.mjs';

for (const target of document.querySelectorAll('[data-collection-source]')) {
  const source = document.getElementById(target.dataset.collectionSource);
  if (!source) throw new Error('A declared collection source is missing.');
  const {items, definition} = JSON.parse(source.textContent);
  const surface = collectionSurface(items, definition, (operation, args) => {
    if (operation !== 'navigate' || typeof args.href !== 'string') throw new Error('Undeclared static publication operation.');
    const url = new URL(args.href, document.baseURI);
    if (url.origin !== location.origin || !['http:', 'https:'].includes(url.protocol)) throw new Error('Static navigation must remain in the publication.');
    location.assign(url.href);
  });
  target.replaceChildren(surface);
}
frontendRuntime.mountPage({container: document.querySelector('main'), memory: {runtime: {sourceryUi: {theme:'light', locale:'en'}}}});
document.documentElement.dataset.publicationReady = 'true';
