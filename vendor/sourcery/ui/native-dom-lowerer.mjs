const safe = value => String(value || "").replaceAll(/[^A-Za-z0-9_.:-]+/gu, "-");

export function bindNativeComponent(writer, {
  instance,
  definition,
  node,
  part = "root",
  surface = "customer",
  variant = "default",
  state = [],
  path = "ui",
} = {}) {
  if (!writer?.fact) throw new Error("Native component lowering requires a fact writer.");
  if (!instance || !definition || !node) throw new Error("Native component lowering requires instance, definition and node.");
  const binding = `ui.binding.${safe(instance)}`;
  const receipt = `ui.lowering.${safe(instance)}`;
  const states = (Array.isArray(state) ? state : [state]).filter(Boolean);
  writer.fact(instance, "isa", "UiComponentInstance", path, "componentInstance");
  writer.fact(instance, "definition", `component.ui.${definition[0].toLowerCase()}${definition.slice(1)}`, path, "componentInstance");
  writer.fact(instance, "surface", surface, path, "componentInstance");
  if (variant && variant !== "default") writer.fact(instance, "variant", variant, path, "componentInstance");
  for (const value of states) writer.fact(instance, "state", value, path, "componentInstance");
  writer.fact(binding, "isa", "UiNativeBinding", path, "nativeBinding");
  writer.fact(binding, "instance", instance, path, "nativeBinding");
  writer.fact(binding, "provider", "provider.sourcery.nativeBrowser", path, "nativeBinding");
  writer.fact(binding, "nativeNode", node, path, "nativeBinding");
  writer.fact(binding, "part", part, path, "nativeBinding");
  writer.fact(receipt, "isa", "UiLoweringReceipt", path, "loweringReceipt");
  writer.fact(receipt, "instance", instance, path, "loweringReceipt");
  writer.fact(receipt, "provider", "provider.sourcery.nativeBrowser", path, "loweringReceipt");
  writer.fact(receipt, "status", "lowered", path, "loweringReceipt");
  writer.fact(`attr.${safe(node)}.suiComponent`, "isa", "DomAttr", path, "nativeBinding");
  writer.fact(`attr.${safe(node)}.suiComponent`, "node", node, path, "nativeBinding");
  writer.fact(`attr.${safe(node)}.suiComponent`, "name", "data-sui-component", path, "nativeBinding");
  writer.fact(`attr.${safe(node)}.suiComponent`, "value", definition, path, "nativeBinding");
  writer.fact(`attr.${safe(node)}.suiSurface`, "isa", "DomAttr", path, "nativeBinding");
  writer.fact(`attr.${safe(node)}.suiSurface`, "node", node, path, "nativeBinding");
  writer.fact(`attr.${safe(node)}.suiSurface`, "name", "data-sui-surface", path, "nativeBinding");
  writer.fact(`attr.${safe(node)}.suiSurface`, "value", surface, path, "nativeBinding");
  if (variant && variant !== "default") {
    writer.fact(`attr.${safe(node)}.suiVariant`, "isa", "DomAttr", path, "nativeBinding");
    writer.fact(`attr.${safe(node)}.suiVariant`, "node", node, path, "nativeBinding");
    writer.fact(`attr.${safe(node)}.suiVariant`, "name", "data-sui-variant", path, "nativeBinding");
    writer.fact(`attr.${safe(node)}.suiVariant`, "value", variant, path, "nativeBinding");
  }
  return Object.freeze({ instance, binding, receipt, provider: "provider.sourcery.nativeBrowser", node, definition });
}
