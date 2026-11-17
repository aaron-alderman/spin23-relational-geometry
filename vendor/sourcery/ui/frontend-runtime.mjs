import { installDefaultComponentLibrary } from "./component-library.mjs";
import { adoptNativeDocument, observeNativeDocument } from "./native-dom-adoption.mjs";

const observedDocuments = new WeakMap();

function documentFor(container) {
  return container?.ownerDocument || globalThis.document || null;
}

export const frontendRuntime = Object.freeze({
  name: "sourcery-default-component-library",
  mountPage({ container, memory } = {}) {
    const document = documentFor(container);
    const requested = memory?.runtime?.sourceryUi || {};
    installDefaultComponentLibrary(document, { theme: requested.theme || "light", locale: requested.locale || "en" });
    if (container && !container.hasAttribute?.("data-sui-component")) {
      container.setAttribute?.("data-sui-component", "ApplicationShell");
      container.setAttribute?.("data-sui-surface", "customer");
    }
    if (document && !observedDocuments.has(document)) observedDocuments.set(document, observeNativeDocument(document, { surface: "customer" }));
    else adoptNativeDocument(document, { root: container, surface: "customer" });
  },
  refreshPage({ container, memory } = {}) {
    const requested = memory?.runtime?.sourceryUi || {};
    installDefaultComponentLibrary(documentFor(container), { theme: requested.theme || "light", locale: requested.locale || "en" });
    adoptNativeDocument(documentFor(container), { root: container, surface: "customer" });
  },
});
