import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";

const graph = window.SPIN23_CONCEPT_GRAPH;
if (!graph) throw new Error("Concept graph data did not load.");

const stage = document.getElementById("stage");
const detail = document.getElementById("detail");
const search = document.getElementById("search");
const groupFilter = document.getElementById("group-filter");
const statusFilter = document.getElementById("status-filter");
const nodeSelect = document.getElementById("node-select");
const flattenButton = document.getElementById("flatten");
const resetButton = document.getElementById("reset");
const counts = document.getElementById("counts");

const css = getComputedStyle(document.documentElement);
const color = name => new THREE.Color(css.getPropertyValue(name).trim());
const statusColors = {
  established: color("--teal"), conditional: color("--gold"), underdetermined: color("--blue"),
  obstructed: color("--red"), missing: color("--ink"), analogical: color("--purple")
};
const groups = {
  carrier: "Mathematical carrier", closure: "Spin closure", physics: "Physical realization",
  obstruction: "Obstruction", topology: "Projective topology", exceptional: "Exceptional horizon", frontier: "Decisive frontier"
};

const scene = new THREE.Scene();
scene.background = color("--paper");
scene.fog = new THREE.Fog(scene.background, 1800, 3000);
const camera = new THREE.PerspectiveCamera(42, 1, 1, 4000);
camera.position.set(100, 80, 1550);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
stage.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.inset = "0";
labelRenderer.domElement.style.pointerEvents = "none";
stage.appendChild(labelRenderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = !matchMedia("(prefers-reduced-motion: reduce)").matches;
controls.dampingFactor = .08;
controls.minDistance = 320;
controls.maxDistance = 2200;
controls.target.set(60, 0, 0);

scene.add(new THREE.HemisphereLight(color("--panel"), color("--muted"), 2.4));
const keyLight = new THREE.DirectionalLight(color("--paper"), 3.2);
keyLight.position.set(-300, 600, 800);
scene.add(keyLight);

const graphGroup = new THREE.Group();
scene.add(graphGroup);
const nodeById = new Map();
const nodeMeshes = [];
const edgeObjects = [];
let selectedId = null;
let flattened = false;

function geometryFor(group) {
  if (group === "closure") return new THREE.OctahedronGeometry(13, 0);
  if (group === "physics") return new THREE.BoxGeometry(19, 19, 19);
  if (group === "topology") return new THREE.TorusGeometry(11, 4, 10, 30);
  if (group === "exceptional") return new THREE.IcosahedronGeometry(13, 0);
  if (group === "obstruction") return new THREE.ConeGeometry(12, 24, 4);
  if (group === "frontier") return new THREE.DodecahedronGeometry(14, 0);
  return new THREE.SphereGeometry(12, 22, 14);
}

for (const node of graph.nodes) {
  const material = new THREE.MeshStandardMaterial({ color: statusColors[node.status], roughness: .52, metalness: .06, transparent: true, opacity: .96 });
  const mesh = new THREE.Mesh(geometryFor(node.group), material);
  mesh.position.set(node.x, node.y, node.z);
  mesh.userData.node = node;
  graphGroup.add(mesh);
  nodeMeshes.push(mesh);

  const anchor = document.createElement("div");
  anchor.className = "graph-label-anchor";
  const element = document.createElement("button");
  element.type = "button";
  element.className = "graph-label";
  element.textContent = node.label;
  element.setAttribute("aria-label", `Show details for ${node.label}`);
  element.setAttribute("aria-controls", "detail");
  element.setAttribute("aria-pressed", "false");
  element.style.setProperty("--node-color", `#${statusColors[node.status].getHexString()}`);
  element.addEventListener("pointerdown", event => event.stopPropagation());
  element.addEventListener("click", event => {
    event.stopPropagation();
    selectNode(node.id);
  });
  anchor.appendChild(element);
  const label = new CSS2DObject(anchor);
  label.position.set(0, 0, 0);
  mesh.add(label);
  nodeById.set(node.id, { node, mesh, label, anchor, element });
}

function edgeMaterial(edge) {
  const dashed = ["requires", "extends", "analogous", "separates"].includes(edge.type);
  const dotted = ["analogous", "separates"].includes(edge.type);
  const options = { color: statusColors[edge.status] || color("--muted"), transparent: true, opacity: edge.status === "established" ? .82 : edge.status === "conditional" ? .72 : .64 };
  return dashed ? new THREE.LineDashedMaterial({ ...options, dashSize: dotted ? 2.5 : 9, gapSize: dotted ? 5 : 6 }) : new THREE.LineBasicMaterial(options);
}

for (const edge of graph.edges) {
  const source = nodeById.get(edge.source).mesh.position;
  const target = nodeById.get(edge.target).mesh.position;
  const midpoint = source.clone().lerp(target, .5);
  midpoint.z += 16 + source.distanceTo(target) * .05;
  const curve = new THREE.QuadraticBezierCurve3(source.clone(), midpoint, target.clone());
  const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(24)), edgeMaterial(edge));
  line.computeLineDistances();
  line.userData.edge = edge;
  graphGroup.add(line);
  edgeObjects.push(line);
}

for (const [value, label] of Object.entries(groups)) groupFilter.add(new Option(label, value));
for (const status of Object.keys(graph.statuses)) statusFilter.add(new Option(status.replaceAll("-", " "), status));
for (const node of [...graph.nodes].sort((a,b) => a.label.localeCompare(b.label))) nodeSelect.add(new Option(node.label, node.id));

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function evidenceHref(path) {
  const [file, hash] = path.split("#");
  return `https://github.com/aaron-alderman/spin23-relational-geometry/blob/main/${encodeURI(file)}${hash ? `#${encodeURIComponent(hash)}` : ""}`;
}

function localEvidenceHref(path) {
  const [file, hash] = path.split("#");
  return `../../${encodeURI(file)}${hash ? `#${encodeURIComponent(hash)}` : ""}`;
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function renderDetail(node) {
  const incoming = graph.edges.filter(edge => edge.target === node.id);
  const outgoing = graph.edges.filter(edge => edge.source === node.id);
  const connection = edge => {
    const other = edge.source === node.id ? nodeById.get(edge.target).node : nodeById.get(edge.source).node;
    const arrow = edge.source === node.id ? "→" : "←";
    return `<li><strong>${escapeHtml(edge.type)}</strong> ${arrow} <button type="button" class="connection-button" data-node-id="${escapeHtml(other.id)}">${escapeHtml(other.label)}</button>${edge.label ? ` · ${escapeHtml(edge.label)}` : ""} <em>(${escapeHtml(edge.status)})</em></li>`;
  };
  detail.style.setProperty("--detail-color", `#${statusColors[node.status].getHexString()}`);
  detail.innerHTML = `<p class="detail-status">${escapeHtml(node.status)} · ${escapeHtml(groups[node.group])}</p><h3>${escapeHtml(node.label)}</h3><p>${escapeHtml(node.description)}</p><h4>Typed connections</h4><ul class="connections">${[...incoming, ...outgoing].map(connection).join("")}</ul><h4>Evidence and source links</h4><ul class="sources evidence-list">${node.evidence.map(path => `<li><span>${escapeHtml(path.split("/").at(-1))}</span><span><a href="${localEvidenceHref(path)}">Open locally</a> · <a href="${evidenceHref(path)}" target="_blank" rel="noreferrer">GitHub ↗</a></span></li>`).join("")}</ul>`;
  detail.scrollTop = 0;
}

function selectNode(id, moveCamera = false) {
  selectedId = id || null;
  for (const { node, mesh, element } of nodeById.values()) {
    const selected = node.id === selectedId;
    mesh.scale.setScalar(selected ? 1.55 : 1);
    element.classList.toggle("selected", selected);
    element.setAttribute("aria-pressed", String(selected));
  }
  if (!id) return;
  const record = nodeById.get(id);
  renderDetail(record.node);
  nodeSelect.value = id;
  if (moveCamera) {
    const destination = record.mesh.position.clone();
    controls.target.copy(destination);
    camera.position.set(destination.x + 150, destination.y + 90, destination.z + 520);
    controls.update();
  }
}

function applyFilters() {
  const term = search.value.trim().toLowerCase();
  const group = groupFilter.value;
  const status = statusFilter.value;
  const visibleIds = new Set();
  for (const { node, mesh, element } of nodeById.values()) {
    const visible = (group === "all" || node.group === group) && (status === "all" || node.status === status) && (!term || `${node.label} ${node.description}`.toLowerCase().includes(term));
    mesh.visible = visible;
    element.classList.toggle("dim", !visible);
    if (visible) visibleIds.add(node.id);
  }
  for (const line of edgeObjects) line.visible = visibleIds.has(line.userData.edge.source) && visibleIds.has(line.userData.edge.target);
  counts.textContent = `${visibleIds.size} concepts · ${edgeObjects.filter(edge => edge.visible).length} typed connections`;
  if (selectedId && !visibleIds.has(selectedId)) selectNode(null);
}

function flattenDepth() {
  flattened = !flattened;
  flattenButton.setAttribute("aria-pressed", String(flattened));
  flattenButton.textContent = flattened ? "Restore depth" : "Flatten depth";
  for (const { node, mesh } of nodeById.values()) mesh.position.z = flattened ? 0 : node.z;
  for (const line of edgeObjects) {
    const edge = line.userData.edge;
    const source = nodeById.get(edge.source).mesh.position;
    const target = nodeById.get(edge.target).mesh.position;
    const midpoint = source.clone().lerp(target, .5);
    midpoint.z += flattened ? 0 : 16 + source.distanceTo(target) * .05;
    line.geometry.dispose();
    line.geometry = new THREE.BufferGeometry().setFromPoints(new THREE.QuadraticBezierCurve3(source.clone(), midpoint, target.clone()).getPoints(24));
    line.computeLineDistances();
  }
}

function resetView() {
  camera.position.set(100, 80, stage.clientWidth < 850 ? 1850 : 1550);
  controls.target.set(60, 0, 0);
  controls.update();
  search.value = "";
  groupFilter.value = "all";
  statusFilter.value = "all";
  nodeSelect.value = "";
  selectNode(null);
  applyFilters();
}

renderer.domElement.addEventListener("pointerup", event => {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(nodeMeshes.filter(mesh => mesh.visible), false)[0];
  if (hit) selectNode(hit.object.userData.node.id);
});

search.addEventListener("input", applyFilters);
groupFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);
nodeSelect.addEventListener("change", () => nodeSelect.value && selectNode(nodeSelect.value, true));
detail.addEventListener("click", event => {
  const button = event.target.closest("[data-node-id]");
  if (button) selectNode(button.dataset.nodeId, true);
});
flattenButton.addEventListener("click", flattenDepth);
resetButton.addEventListener("click", resetView);

let initialFramePending = true;
function resize() {
  const width = stage.clientWidth;
  const height = stage.clientHeight;
  if (initialFramePending && width > 0) {
    camera.position.z = width < 850 ? 1850 : 1550;
    initialFramePending = false;
  }
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  labelRenderer.setSize(width, height);
}
new ResizeObserver(resize).observe(stage);

const labelWorldPosition = new THREE.Vector3();
function labelLayout() {
  const width = stage.clientWidth;
  const height = stage.clientHeight;
  if (!width || !height) return;
  const occupied = [];
  const records = [...nodeById.values()]
    .filter(record => record.mesh.visible)
    .map(record => {
      record.mesh.getWorldPosition(labelWorldPosition);
      const projected = labelWorldPosition.clone().project(camera);
      return { ...record, x: (projected.x * .5 + .5) * width, y: (-projected.y * .5 + .5) * height, depth: projected.z };
    })
    .filter(record => record.depth > -1 && record.depth < 1)
    .sort((a, b) => Number(b.node.id === selectedId) - Number(a.node.id === selectedId) || Number(b.node.status === "established") - Number(a.node.status === "established") || a.depth - b.depth);

  const intersectionArea = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  for (const record of records) {
    const labelWidth = record.element.offsetWidth || 120;
    const labelHeight = record.element.offsetHeight || 28;
    const gap = record.node.id === selectedId ? 24 : 18;
    const candidates = [
      [-labelWidth / 2, -labelHeight - gap],
      [-labelWidth / 2, gap],
      [gap, -labelHeight / 2],
      [-labelWidth - gap, -labelHeight / 2],
      [gap, -labelHeight - gap],
      [-labelWidth - gap, -labelHeight - gap],
      [gap, gap],
      [-labelWidth - gap, gap],
    ];
    let best = null;
    for (const [offsetX, offsetY] of candidates) {
      const placedX = Math.max(5, Math.min(width - labelWidth - 5, record.x + offsetX));
      const placedY = Math.max(5, Math.min(height - labelHeight - 5, record.y + offsetY));
      const actualOffsetX = placedX - record.x;
      const actualOffsetY = placedY - record.y;
      const rect = { left: placedX - 4, top: placedY - 3, right: placedX + labelWidth + 4, bottom: placedY + labelHeight + 3 };
      const overlap = occupied.reduce((sum, other) => sum + intersectionArea(rect, other), 0);
      const distance = Math.hypot(actualOffsetX + labelWidth / 2, actualOffsetY + labelHeight / 2);
      const score = overlap * 1000 + distance;
      if (!best || score < best.score) best = { score, offsetX: actualOffsetX, offsetY: actualOffsetY, rect };
    }
    record.element.style.transform = `translate(${best.offsetX}px,${best.offsetY}px)`;
    occupied.push(best.rect);
  }
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  labelLayout();
}

applyFilters();
resize();
animate();
