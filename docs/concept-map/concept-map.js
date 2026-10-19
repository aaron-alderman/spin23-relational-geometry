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

  const element = document.createElement("div");
  element.className = "graph-label";
  element.textContent = node.label;
  element.style.setProperty("--node-color", `#${statusColors[node.status].getHexString()}`);
  const label = new CSS2DObject(element);
  label.position.set(0, 18, 0);
  mesh.add(label);
  nodeById.set(node.id, { node, mesh, label, element });
}

function edgeMaterial(edge) {
  const obstructive = edge.type === "obstructs" || edge.type === "separates";
  const dashed = ["requires", "analogous", "extends"].includes(edge.type) || edge.status !== "established";
  const options = { color: obstructive ? statusColors.obstructed : edge.status === "analogical" ? statusColors.analogical : color("--muted"), transparent: true, opacity: edge.status === "established" ? .68 : .46 };
  return dashed ? new THREE.LineDashedMaterial({ ...options, dashSize: 8, gapSize: 6 }) : new THREE.LineBasicMaterial(options);
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

function renderDetail(node) {
  const incoming = graph.edges.filter(edge => edge.target === node.id);
  const outgoing = graph.edges.filter(edge => edge.source === node.id);
  const connection = edge => {
    const other = edge.source === node.id ? nodeById.get(edge.target).node : nodeById.get(edge.source).node;
    const arrow = edge.source === node.id ? "→" : "←";
    return `<li><strong>${edge.type}</strong> ${arrow} ${other.label}${edge.label ? ` · ${edge.label}` : ""} <em>(${edge.status})</em></li>`;
  };
  detail.style.setProperty("--detail-color", `#${statusColors[node.status].getHexString()}`);
  detail.innerHTML = `<p class="detail-status">${node.status} · ${groups[node.group]}</p><h3>${node.label}</h3><p>${node.description}</p><ul class="connections">${[...incoming, ...outgoing].map(connection).join("")}</ul><p class="sources"><strong>Evidence</strong><br>${node.evidence.map(path => `<a href="${evidenceHref(path)}">${path.split("/").at(-1)}</a>`).join("<br>")}</p>`;
}

function selectNode(id, moveCamera = false) {
  selectedId = id || null;
  for (const { node, mesh, element } of nodeById.values()) {
    const selected = node.id === selectedId;
    mesh.scale.setScalar(selected ? 1.55 : 1);
    element.classList.toggle("selected", selected);
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
  camera.position.set(100, 80, 1550);
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
flattenButton.addEventListener("click", flattenDepth);
resetButton.addEventListener("click", resetView);

function resize() {
  const width = stage.clientWidth;
  const height = stage.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  labelRenderer.setSize(width, height);
}
new ResizeObserver(resize).observe(stage);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

applyFilters();
resize();
animate();
