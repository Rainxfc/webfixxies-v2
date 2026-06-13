/* ============================================================
   NOVA BITES — Three.js Hero 3D Scene
   Floating burger with particles, lighting & mouse interaction
   ============================================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // ── Renderer ────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;

  // ── Scene & Camera ───────────────────────────────────────────
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 7);

  // ── Mouse tracking ───────────────────────────────────────────
  const mouse = { x: 0, y: 0 };
  const targetRot = { x: 0, y: 0 };
  document.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── Lights ──────────────────────────────────────────────────
  const ambientLight = new THREE.AmbientLight(0x1a1a2e, 3);
  scene.add(ambientLight);

  // Key light — warm orange (brand accent)
  const keyLight = new THREE.DirectionalLight(0xff6b35, 5);
  keyLight.position.set(4, 6, 5);
  keyLight.castShadow = true;
  scene.add(keyLight);

  // Fill light — violet (brand accent 2)
  const fillLight = new THREE.PointLight(0x8b5cf6, 8, 20);
  fillLight.position.set(-5, 2, 3);
  scene.add(fillLight);

  // Rim / back light — teal
  const rimLight = new THREE.PointLight(0x06d6a0, 6, 15);
  rimLight.position.set(2, -4, -4);
  scene.add(rimLight);

  // Top sparkle
  const topLight = new THREE.PointLight(0xfbbf24, 4, 10);
  topLight.position.set(0, 8, 2);
  scene.add(topLight);

  // ── Material helpers ─────────────────────────────────────────
  function createMat(color, roughness = 0.3, metalness = 0.1, emissive = 0x000000, emissiveIntensity = 0) {
    return new THREE.MeshStandardMaterial({ color, roughness, metalness, emissive, emissiveIntensity });
  }

  // ── Burger Group ─────────────────────────────────────────────
  const burgerGroup = new THREE.Group();
  scene.add(burgerGroup);

  // Shadow plane (invisible, just for shadow)
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.ShadowMaterial({ opacity: 0.3 })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -2.5;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  // ── Bun Top ──────────────────────────────────────────────────
  const bunTopGeo = new THREE.SphereGeometry(1.05, 64, 64);
  // Squash bottom half
  const bunTopPos = bunTopGeo.attributes.position;
  for (let i = 0; i < bunTopPos.count; i++) {
    const y = bunTopPos.getY(i);
    if (y < 0) bunTopPos.setY(i, y * 0.28);
  }
  bunTopGeo.computeVertexNormals();
  const bunTop = new THREE.Mesh(
    bunTopGeo,
    createMat(0xd97706, 0.55, 0.05, 0xd97706, 0.08)
  );
  bunTop.position.y = 1.3;
  bunTop.castShadow = true;
  burgerGroup.add(bunTop);

  // Sesame seeds on top bun (small spheres)
  const seedMat = createMat(0xfef3c7, 0.6, 0.0);
  const seedPositions = [
    [0.3, 0.25, 0.95], [-0.2, 0.4, 0.93], [0.55, 0.1, 0.82],
    [-0.5, 0.2, 0.82], [0.1, 0.5, 0.88], [-0.1, -0.05, 0.98],
  ];
  seedPositions.forEach(([x, y, z]) => {
    const seed = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), seedMat);
    // place on surface of bun by direction
    const dir = new THREE.Vector3(x, y + 1.3, z).normalize();
    seed.position.copy(dir.multiplyScalar(1.06)).add(new THREE.Vector3(0, 1.3, 0));
    burgerGroup.add(seed);
  });

  // ── Cheese Slice ─────────────────────────────────────────────
  const cheeseGeo = new THREE.BoxGeometry(1.9, 0.07, 1.9);
  const cheese = new THREE.Mesh(
    cheeseGeo,
    createMat(0xfbbf24, 0.7, 0.0, 0xfbbf24, 0.12)
  );
  cheese.position.y = 0.55;
  cheese.rotation.y = Math.PI / 6;
  cheese.castShadow = true;
  burgerGroup.add(cheese);

  // ── Lettuce ──────────────────────────────────────────────────
  function createLettuce(yPos, rotY) {
    const group = new THREE.Group();
    const petals = 14;
    for (let i = 0; i < petals; i++) {
      const angle = (i / petals) * Math.PI * 2;
      const r = 0.9 + Math.random() * 0.25;
      const geo = new THREE.TorusGeometry(0.18, 0.08, 6, 8, Math.PI * 0.7);
      const mat = createMat(0x16a34a, 0.8, 0.0, 0x16a34a, 0.05);
      const leaf = new THREE.Mesh(geo, mat);
      leaf.position.set(Math.cos(angle) * r, (Math.random() - 0.5) * 0.12, Math.sin(angle) * r);
      leaf.rotation.set(Math.random() * 0.4, angle, Math.random() * 0.3);
      leaf.castShadow = true;
      group.add(leaf);
    }
    group.position.y = yPos;
    group.rotation.y = rotY;
    return group;
  }
  burgerGroup.add(createLettuce(0.65, 0));
  burgerGroup.add(createLettuce(0.72, Math.PI / 4));

  // ── Tomato slices ─────────────────────────────────────────────
  function createTomato(yPos) {
    const group = new THREE.Group();
    const tomatoGeo = new THREE.CylinderGeometry(0.82, 0.82, 0.12, 32);
    const tomato = new THREE.Mesh(tomatoGeo, createMat(0xdc2626, 0.6, 0.05, 0xdc2626, 0.06));
    tomato.castShadow = true;
    group.add(tomato);
    // Tomato segments
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const segGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.125, 4);
      const seg = new THREE.Mesh(segGeo, createMat(0xfca5a5, 0.8, 0.0));
      seg.position.set(Math.cos(angle) * 0.3, 0, Math.sin(angle) * 0.3);
      group.add(seg);
    }
    group.position.y = yPos;
    return group;
  }
  burgerGroup.add(createTomato(0.4));

  // ── Patty ────────────────────────────────────────────────────
  const pattyGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.28, 32);
  const patty = new THREE.Mesh(
    pattyGeo,
    createMat(0x7c2d12, 0.85, 0.05)
  );
  patty.position.y = 0.14;
  patty.castShadow = true;
  burgerGroup.add(patty);

  // Patty grill marks
  for (let i = 0; i < 4; i++) {
    const markGeo = new THREE.BoxGeometry(1.6, 0.01, 0.08);
    const mark = new THREE.Mesh(markGeo, createMat(0x3b1a0a, 0.9, 0.0));
    mark.position.y = 0.285;
    mark.position.z = -0.28 + i * 0.18;
    burgerGroup.add(mark);
  }

  // ── Bun Bottom ───────────────────────────────────────────────
  const bunBotGeo = new THREE.CylinderGeometry(1.0, 0.95, 0.3, 32);
  const bunBot = new THREE.Mesh(
    bunBotGeo,
    createMat(0xb45309, 0.6, 0.03, 0xb45309, 0.05)
  );
  bunBot.position.y = -0.15;
  bunBot.castShadow = true;
  burgerGroup.add(bunBot);

  // ── Sauce drip ────────────────────────────────────────────────
  function createDrip(xOff, zOff) {
    const dripGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const drip = new THREE.Mesh(dripGeo, createMat(0xef4444, 0.5, 0.0, 0xef4444, 0.1));
    drip.position.set(xOff, 0.52, zOff);
    drip.scale.y = 1.8;
    burgerGroup.add(drip);
  }
  createDrip(0.72, 0.4);
  createDrip(-0.6, 0.5);
  createDrip(0.2, -0.75);

  // ── Orbiting Food Elements ────────────────────────────────────
  const orbitGroup = new THREE.Group();
  scene.add(orbitGroup);

  function createOrbitItem(geometry, material, distance, angleOffset, yOff) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { distance, angleOffset, yOff, speed: 0.4 + Math.random() * 0.3 };
    return mesh;
  }

  // Floating fries (elongated boxes)
  const frieMat = createMat(0xfbbf24, 0.7, 0.0, 0xfbbf24, 0.1);
  for (let i = 0; i < 5; i++) {
    const frie = createOrbitItem(
      new THREE.BoxGeometry(0.06, 0.6, 0.06),
      frieMat,
      2.5 + Math.random() * 0.5,
      (i / 5) * Math.PI * 2,
      (Math.random() - 0.5) * 1.5
    );
    frie.rotation.z = (Math.random() - 0.5) * 0.8;
    orbitGroup.add(frie);
  }

  // Floating cherry tomatoes
  for (let i = 0; i < 4; i++) {
    const cherry = createOrbitItem(
      new THREE.SphereGeometry(0.12, 12, 12),
      createMat(0xef4444, 0.4, 0.1, 0xef4444, 0.12),
      2.8 + Math.random() * 0.6,
      (i / 4) * Math.PI * 2 + 0.5,
      (Math.random() - 0.5) * 2
    );
    orbitGroup.add(cherry);
  }

  // Floating sparkling gems (abstract accent shapes)
  for (let i = 0; i < 6; i++) {
    const gem = createOrbitItem(
      new THREE.OctahedronGeometry(0.08 + Math.random() * 0.06),
      createMat(
        i % 2 === 0 ? 0x8b5cf6 : 0x06d6a0,
        0.1, 0.9,
        i % 2 === 0 ? 0x8b5cf6 : 0x06d6a0,
        0.5
      ),
      3.0 + Math.random() * 0.8,
      (i / 6) * Math.PI * 2 + 1.0,
      (Math.random() - 0.5) * 3
    );
    orbitGroup.add(gem);
  }

  // ── Particle System ──────────────────────────────────────────
  const particleCount = 180;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const particleSizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = 3.5 + Math.random() * 3;
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    particleSizes[i] = 0.02 + Math.random() * 0.04;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

  const particleMat = new THREE.PointsMaterial({
    color: 0xf97316,
    size: 0.045,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Second particle ring — violet
  const particleGeo2 = new THREE.BufferGeometry();
  const pos2 = new Float32Array(80 * 3);
  for (let i = 0; i < 80; i++) {
    const angle = (i / 80) * Math.PI * 2;
    const r = 4.5 + (Math.random() - 0.5) * 1;
    pos2[i * 3]     = Math.cos(angle) * r;
    pos2[i * 3 + 1] = (Math.random() - 0.5) * 2;
    pos2[i * 3 + 2] = Math.sin(angle) * r;
  }
  particleGeo2.setAttribute('position', new THREE.BufferAttribute(pos2, 3));
  const particleMat2 = new THREE.PointsMaterial({
    color: 0x8b5cf6,
    size: 0.055,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const particles2 = new THREE.Points(particleGeo2, particleMat2);
  scene.add(particles2);

  // ── Glowing Ring around burger ───────────────────────────────
  const ringGeo = new THREE.TorusGeometry(1.8, 0.015, 8, 120);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xf97316,
    transparent: true,
    opacity: 0.35,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = -0.3;
  burgerGroup.add(ring);

  const ring2Geo = new THREE.TorusGeometry(2.1, 0.008, 8, 120);
  const ring2 = new THREE.Mesh(ring2Geo, new THREE.MeshBasicMaterial({
    color: 0x8b5cf6, transparent: true, opacity: 0.2
  }));
  ring2.rotation.x = Math.PI / 2;
  ring2.position.y = -0.3;
  burgerGroup.add(ring2);

  // ── Clock ────────────────────────────────────────────────────
  const clock = new THREE.Clock();
  let time = 0;

  // ── Resize handler ───────────────────────────────────────────
  const onResize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize);

  // ── Animation Loop ────────────────────────────────────────────
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    time += delta;

    // Smooth mouse follow for burger rotation
    targetRot.x += (mouse.y * 0.25 - targetRot.x) * 0.06;
    targetRot.y += (mouse.x * 0.4  - targetRot.y) * 0.06;

    // Burger: float + mouse-look
    burgerGroup.rotation.x = targetRot.x + Math.sin(time * 0.5) * 0.04;
    burgerGroup.rotation.y = time * 0.25 + targetRot.y;
    burgerGroup.position.y = Math.sin(time * 0.7) * 0.18;

    // Orbit items
    orbitGroup.children.forEach((item) => {
      const { distance, angleOffset, yOff, speed } = item.userData;
      const angle = time * speed + angleOffset;
      item.position.x = Math.cos(angle) * distance;
      item.position.z = Math.sin(angle) * distance;
      item.position.y = yOff + Math.sin(time * 0.8 + angleOffset) * 0.3;
      item.rotation.x += delta * 1.5;
      item.rotation.z += delta * 0.8;
    });

    // Particles rotation
    particles.rotation.y  = time * 0.04;
    particles.rotation.x  = time * 0.015;
    particles2.rotation.y = -time * 0.06;

    // Animate point lights in a slow orbit
    fillLight.position.x = Math.cos(time * 0.3) * 5;
    fillLight.position.z = Math.sin(time * 0.3) * 3;
    rimLight.position.x  = Math.cos(time * 0.2 + Math.PI) * 4;
    rimLight.position.z  = Math.sin(time * 0.2 + Math.PI) * 4;

    // Ring pulse
    ring.material.opacity = 0.2 + Math.sin(time * 1.5) * 0.15;
    ring2.material.opacity = 0.1 + Math.cos(time * 1.2) * 0.08;

    renderer.render(scene, camera);
  }

  animate();
})();
