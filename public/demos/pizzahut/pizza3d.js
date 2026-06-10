/* ==========================================================================
   Pizza Hut Bangladesh - Three.js 3D Pizza Render Pipeline
   ========================================================================== */

let scene, camera, renderer, controls;
let pizzaContainer;
let pizzaGroup; // Holds the entire pizza (base, cheese, crust, toppings)
let crustMesh, cheeseMesh;
let particlesSystem; // Spice particles

// Topping management
let activeToppings = {
    kalabhuna: false,
    chickentikka: false,
    capsicum: false,
    mushrooms: false,
    onions: false
};

// Topping mesh groups in scene
let toppingGroups = {
    kalabhuna: new THREE.Group(),
    chickentikka: new THREE.Group(),
    capsicum: new THREE.Group(),
    mushrooms: new THREE.Group(),
    onions: new THREE.Group()
};

// Animation arrays for falling toppings
let fallingItems = [];

// Sound synthesis callback holder
let playIngredientSoundCallback = null;

// Initialize 3D Scene
function init3DPizza(containerId) {
    pizzaContainer = document.getElementById(containerId);
    if (!pizzaContainer) return;

    // 1. Create Scene & Camera
    scene = new THREE.Scene();
    
    // Add soft ambient light-gray fog to match off-white background
    scene.fog = new THREE.FogExp2(0xF5F6F9, 0.02);

    camera = new THREE.PerspectiveCamera(40, pizzaContainer.clientWidth / pizzaContainer.clientHeight, 0.1, 100);
    camera.position.set(0, 7, 9); // Angled top view

    // 2. WebGL Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(pizzaContainer.clientWidth, pizzaContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Clear loading spinner
    const spinner = document.getElementById('canvas-spinner');
    if (spinner) spinner.style.opacity = '0';
    setTimeout(() => { if (spinner) spinner.remove(); }, 500);

    pizzaContainer.appendChild(renderer.domElement);

    // 3. Orbit Controls for User Rotation
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't allow camera under floor
    controls.minDistance = 4;
    controls.maxDistance = 14;
    controls.enablePan = false;

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff6e0, 0.4); // Soft warm ambient
    scene.add(ambientLight);

    // Main spot light (like an oven heating element / studio bulb casting shadows)
    const spotLight = new THREE.SpotLight(0xffd580, 4.0);
    spotLight.position.set(5, 12, 5);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.8;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.bias = -0.001;
    scene.add(spotLight);

    // Secondary colored fill light (Pizza Hut Red / Warm Flame glow from left)
    const redFillLight = new THREE.DirectionalLight(0xE51A22, 1.2);
    redFillLight.position.set(-8, 3, -2);
    scene.add(redFillLight);

    // Subtle blue rim light from back to make 3D edges pop
    const blueRimLight = new THREE.DirectionalLight(0x7c99ff, 0.5);
    blueRimLight.position.set(2, 4, -8);
    scene.add(blueRimLight);

    // 5. Create Pizza Base Group
    pizzaGroup = new THREE.Group();
    scene.add(pizzaGroup);

    // Generate procedurally
    buildPizzaBase();
    setupToppingGroups();
    // buildSpiceParticles(); // Particles removed per user request

    // 6. Window Resize Handler
    window.addEventListener('resize', onWindowResize);

    // 7. Start Animation Loop
    animate();
}

// Generate Procedural Textures & Materials
function createCrustTexture() {
    // We create a canvas texture for toasted spots on the crust
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Baked dough base color
    ctx.fillStyle = '#E3AB69';
    ctx.fillRect(0, 0, 512, 512);

    // Toasting gradients
    for (let i = 0; i < 400; i++) {
        let x = Math.random() * 512;
        let y = Math.random() * 512;
        let r = 8 + Math.random() * 24;
        let grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        
        let darkColor = Math.random() > 0.8 ? '#A8612A' : '#C48143';
        if (Math.random() > 0.96) darkColor = '#4A2511'; // Charred spots

        grad.addColorStop(0, darkColor);
        grad.addColorStop(0.5, 'rgba(196, 129, 67, 0.4)');
        grad.addColorStop(1, 'rgba(227, 171, 105, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
}

function createCheeseTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Gooey melted cheese base color
    ctx.fillStyle = '#FAD56C';
    ctx.fillRect(0, 0, 512, 512);

    // Golden bubbles, baked mozzarella layers and slight red/orange oil
    for (let i = 0; i < 400; i++) {
        let x = Math.random() * 512;
        let y = Math.random() * 512;
        let r = 10 + Math.random() * 30;
        let grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        
        let cheeseColor = '#FFF5B8'; // Lighter cheese
        if (Math.random() > 0.6) cheeseColor = '#F5B042'; // Toasted yellow bubble
        if (Math.random() > 0.85) cheeseColor = '#E35D22'; // Tomato sauce / oil peek
        if (Math.random() > 0.92) cheeseColor = '#853915'; // Darker baked cheese spots

        grad.addColorStop(0, cheeseColor);
        grad.addColorStop(0.5, 'rgba(250, 213, 108, 0.5)');
        grad.addColorStop(1, 'rgba(250, 213, 108, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
}

// Build core Pizza Crust & Cheese elements
function buildPizzaBase() {
    // 1. Textures & Materials
    const crustTexture = createCrustTexture();
    const cheeseTexture = createCheeseTexture();
    
    // Bump map for dough/crust
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 256;
    bumpCanvas.height = 256;
    const bumpCtx = bumpCanvas.getContext('2d');
    bumpCtx.fillStyle = '#808080';
    bumpCtx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 2000; i++) {
        bumpCtx.fillStyle = Math.random() > 0.5 ? '#FFFFFF' : '#000000';
        bumpCtx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
    const crustBumpMap = new THREE.CanvasTexture(bumpCanvas);
    crustBumpMap.wrapS = THREE.RepeatWrapping;
    crustBumpMap.wrapT = THREE.RepeatWrapping;
    crustBumpMap.repeat.set(4, 20);

    const crustMat = new THREE.MeshStandardMaterial({
        map: crustTexture,
        bumpMap: crustBumpMap,
        bumpScale: 0.06,
        roughness: 0.9,
        metalness: 0.05
    });

    const cheeseMat = new THREE.MeshStandardMaterial({
        map: cheeseTexture,
        roughness: 0.3, // Shiny melted cheese look
        metalness: 0.1,
        bumpMap: crustBumpMap, // Re-use noise bump for melted lumps
        bumpScale: 0.015
    });

    const sauceMat = new THREE.MeshStandardMaterial({
        color: 0x991100, // Deep tomato sauce red
        roughness: 0.6,
        metalness: 0.1
    });

    // 2. Base Dough Cylinder
    const baseGeo = new THREE.CylinderGeometry(2.0, 1.95, 0.15, 64);
    const baseMesh = new THREE.Mesh(baseGeo, crustMat);
    baseMesh.position.y = 0;
    baseMesh.receiveShadow = true;
    baseMesh.castShadow = true;
    pizzaGroup.add(baseMesh);

    // 3. Puffy Outer Crust (Torus)
    const panGeometry = new THREE.TorusGeometry(1.9, 0.18, 16, 100);
    crustMesh = new THREE.Mesh(panGeometry, crustMat);
    crustMesh.rotation.x = Math.PI / 2; // Flat on table
    crustMesh.position.y = 0.08;
    crustMesh.castShadow = true;
    crustMesh.receiveShadow = true;
    pizzaGroup.add(crustMesh);

    // 4. Tomato Sauce Layer
    const sauceGeo = new THREE.CylinderGeometry(1.94, 1.94, 0.17, 64);
    const sauceMesh = new THREE.Mesh(sauceGeo, sauceMat);
    sauceMesh.position.y = 0;
    sauceMesh.receiveShadow = true;
    pizzaGroup.add(sauceMesh);

    // 5. Melted Cheese Base
    const cheeseGeo = new THREE.CylinderGeometry(1.9, 1.9, 0.19, 64);
    cheeseMesh = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheeseMesh.position.y = 0;
    cheeseMesh.receiveShadow = true;
    pizzaGroup.add(cheeseMesh);
    
    // 6. Ambient Shadow
    const shadowGeo = new THREE.RingGeometry(0, 2.2, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = Math.PI / 2;
    shadowMesh.position.y = -0.076;
    pizzaGroup.add(shadowMesh);
}

// Add group hooks for individual ingredients
function setupToppingGroups() {
    Object.keys(toppingGroups).forEach(key => {
        pizzaGroup.add(toppingGroups[key]);
    });
}

// Float floating spice particles (basil flakes, chili seeds) in 3D for extreme premium feel
function buildSpiceParticles() {
    const particleCount = 60;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        // Distribute in a cylinder above the pizza
        let radius = Math.random() * 2.2;
        let angle = Math.random() * Math.PI * 2;
        let x = Math.cos(angle) * radius;
        let z = Math.sin(angle) * radius;
        let y = 0.1 + Math.random() * 1.5; // Hovering close above pizza

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // 3D spice colors: Green (oregano), Dark Red (chili flakes)
        if (Math.random() > 0.4) {
            colors[i * 3] = 0.2;     // R (Dark Green)
            colors[i * 3 + 1] = 0.5; // G
            colors[i * 3 + 2] = 0.1; // B
        } else {
            colors[i * 3] = 0.75;    // R (Red Pepper Flakes)
            colors[i * 3 + 1] = 0.1; // G
            colors[i * 3 + 2] = 0.05;// B
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Round particle map
    const pMaterial = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        depthWrite: false
    });

    particlesSystem = new THREE.Points(geometry, pMaterial);
    pizzaGroup.add(particlesSystem);
}

// Generate procedurally high fidelity toppings meshes
function createToppingMesh(type) {
    let mesh;
    
    switch(type) {
        case 'kalabhuna':
            // Chittagong Beef Kala Bhuna: Irregular slow-cooked dark blackish-brown beef chunks
            const beefMat = new THREE.MeshStandardMaterial({
                color: 0x1E1410, // Rich dark caramelized brown-black
                roughness: 0.9,
                metalness: 0.05
            });
            // Procedural beef shape using perturbed dodecahedron
            const dodecaGeo = new THREE.DodecahedronGeometry(0.08, 1);
            
            // Perturb vertices to look organic and randomized
            const pos = dodecaGeo.attributes.position;
            for(let i = 0; i < pos.count; i++) {
                pos.setY(i, pos.getY(i) + (Math.random() - 0.5) * 0.03);
                pos.setX(i, pos.getX(i) + (Math.random() - 0.5) * 0.03);
            }
            dodecaGeo.computeVertexNormals();

            mesh = new THREE.Mesh(dodecaGeo, beefMat);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            break;

        case 'chickentikka':
            // Chicken Tikka: Bright orange-red roasted chicken cubes
            const tikkaMat = new THREE.MeshStandardMaterial({
                color: 0xD8461F, // Marinated tandoori orange-red
                roughness: 0.7,
                bumpScale: 0.01
            });
            const cubeGeo = new THREE.BoxGeometry(0.12, 0.09, 0.12);
            
            // Deform chicken box to look cut
            const boxPos = cubeGeo.attributes.position;
            for(let i = 0; i < boxPos.count; i++) {
                boxPos.setX(i, boxPos.getX(i) + (Math.random() - 0.5) * 0.02);
                boxPos.setZ(i, boxPos.getZ(i) + (Math.random() - 0.5) * 0.02);
            }
            cubeGeo.computeVertexNormals();

            mesh = new THREE.Mesh(cubeGeo, tikkaMat);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            break;

        case 'capsicum':
            // Green Capsicum: Sliced curved green bell pepper rings (using Torus segments)
            const capMat = new THREE.MeshStandardMaterial({
                color: 0x2A6F32, // Glossy vibrant green capsicum
                roughness: 0.25,
                metalness: 0.1
            });
            
            // Sweep an arc (a slice of capsicum)
            const capGeo = new THREE.TorusGeometry(0.13, 0.024, 8, 24, Math.PI * 0.7);
            mesh = new THREE.Mesh(capGeo, capMat);
            mesh.rotation.x = Math.PI / 2; // Flat on base
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            break;

        case 'mushrooms':
            // Button Mushrooms: Sliced white mushrooms (Merge stem and cap)
            const mushMat = new THREE.MeshStandardMaterial({
                color: 0xDDD6C8, // Earthy off-white
                roughness: 0.8
            });
            
            // Composite Geometry
            const mushroomGroup = new THREE.Group();
            
            // Cap
            const capGeo2 = new THREE.SphereGeometry(0.08, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2);
            const capMesh = new THREE.Mesh(capGeo2, mushMat);
            capMesh.scale.set(1, 0.6, 1);
            capMesh.position.y = 0.03;
            capMesh.castShadow = true;
            mushroomGroup.add(capMesh);

            // Stem
            const stemGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.08, 8);
            const stemMesh = new THREE.Mesh(stemGeo, mushMat);
            stemMesh.position.y = -0.02;
            stemMesh.castShadow = true;
            mushroomGroup.add(stemMesh);

            // Wrap in a singular object
            mesh = mushroomGroup;
            break;

        case 'onions':
            // Red Onions: Sliced curved purple onion rings
            const onionMat = new THREE.MeshStandardMaterial({
                color: 0x7A215E, // Deep purple onion skin
                roughness: 0.4
            });
            // We use Torus segment
            const onionGeo = new THREE.TorusGeometry(0.18, 0.015, 6, 20, Math.PI * 0.95);
            mesh = new THREE.Mesh(onionGeo, onionMat);
            mesh.rotation.x = Math.PI / 2;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            break;
    }

    return mesh;
}

// Trigger smooth gravity rain-down bounce of topping meshes onto the cheese base
function animateToppingRain(type, count = 22) {
    const group = toppingGroups[type];
    
    // Clear out old ones
    while(group.children.length > 0) {
        group.remove(group.children[0]);
    }

    // Sound effect trigger (Synthesizer click / slide in app.js)
    if (playIngredientSoundCallback) {
        playIngredientSoundCallback(type);
    }

    // Spawn new ones above the pizza
    for (let i = 0; i < count; i++) {
        const topping = createToppingMesh(type);
        if (!topping) continue;

        // Position on a random radial spot on cheese base (radius up to 1.7)
        let radius = Math.random() * 1.68;
        let angle = Math.random() * Math.PI * 2;
        let x = Math.cos(angle) * radius;
        let z = Math.sin(angle) * radius;
        
        // Final resting coordinates (resting Y is slightly varied depending on ingredient overlaps)
        let endY = 0.06 + Math.random() * 0.05;
        // Spawn high above
        let startY = 4.5 + Math.random() * 2.0;

        topping.position.set(x, startY, z);
        
        // Add random rotation for realistic organic clutter
        topping.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        // Add to scene group
        group.add(topping);

        // Queue in falling animations array
        fallingItems.push({
            mesh: topping,
            startY: startY,
            endY: endY,
            x: x,
            z: z,
            speed: 0.12 + Math.random() * 0.08,
            gravity: 0.28,
            velocity: 0,
            bounces: 2,
            elasticity: 0.45,
            spawnTime: Date.now() + i * 20 // Staggered spawn timings for rainfall look
        });
    }
}

// Fade out/shrink removal animation
function animateToppingRemoval(type) {
    const group = toppingGroups[type];
    
    // Remove from falling queue if any were falling
    fallingItems = fallingItems.filter(item => !group.children.includes(item.mesh));

    // Shrink and float up animation
    let count = group.children.length;
    if (count === 0) return;

    let itemsToAnimate = [...group.children];
    
    let shrinkInterval = setInterval(() => {
        let allDone = true;
        itemsToAnimate.forEach(child => {
            if (child.scale.x > 0.05) {
                child.scale.subScalar(0.08);
                child.position.y += 0.08; // Float upwards
                allDone = false;
            }
        });

        if (allDone) {
            clearInterval(shrinkInterval);
            // Fully remove from scene
            while(group.children.length > 0) {
                group.remove(group.children[0]);
            }
        }
    }, 20);
}

// Toggle ingredient states
function toggleTopping3D(type, active) {
    activeToppings[type] = active;
    if (active) {
        animateToppingRain(type);
    } else {
        animateToppingRemoval(type);
    }
}

// Change Outer Crust Geometry & Size (Pan, Thin, Stuffed)
function changeCrust3D(type) {
    // Standard scaling animations
    let targetRadius = 1.9;
    let targetTube = 0.18;
    let colorHex = '#E3AB69'; // Default warm pan

    if (type === 'thin') {
        targetRadius = 1.95;
        targetTube = 0.08; // Sleek thin cracker crust
        colorHex = '#C98239'; // Baked darker thin crust
    } else if (type === 'stuffed') {
        targetRadius = 1.84;
        targetTube = 0.26; // Plump cheesy stuffed rolls
        colorHex = '#DF9E53'; // Golden butter crust
    }

    // Animate geometry properties smoothly using standard interpolation
    let currentRadius = crustMesh.geometry.parameters.radius;
    let currentTube = crustMesh.geometry.parameters.tube;
    
    let step = 0;
    let anim = setInterval(() => {
        step += 0.1;
        let r = currentRadius + (targetRadius - currentRadius) * step;
        let t = currentTube + (targetTube - currentTube) * step;
        
        // Re-generate geometry with new parameters
        crustMesh.geometry.dispose();
        crustMesh.geometry = new THREE.TorusGeometry(r, t, 16, 100);

        if (step >= 1.0) {
            clearInterval(anim);
        }
    }, 25);

    // Swap color glow slightly
    crustMesh.material.color.set(colorHex);
}

// View Controllers
function setCameraView(type) {
    if (type === 'top') {
        // Direct bird eye view
        controls.reset();
        let targetPos = new THREE.Vector3(0, 7.8, 0.01);
        animateCamera(targetPos);
    } else if (type === 'ortho') {
        // Signature angled look
        let targetPos = new THREE.Vector3(0, 5.0, 6.5);
        animateCamera(targetPos);
    }
}

function animateCamera(targetPosition) {
    let startPos = camera.position.clone();
    let step = 0;
    
    let timer = setInterval(() => {
        step += 0.08;
        camera.position.lerpVectors(startPos, targetPosition, step);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        
        if (step >= 1.0) {
            clearInterval(timer);
        }
    }, 20);
}

// Window resize viewport adjusting
function onWindowResize() {
    if (!pizzaContainer) return;
    camera.aspect = pizzaContainer.clientWidth / pizzaContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(pizzaContainer.clientWidth, pizzaContainer.clientHeight);
}

// 3D Frame Rendering loop
function animate() {
    requestAnimationFrame(animate);

    // 1. Damping rotations controls
    controls.update();

    // 2. Slow natural ambient spin if the user is not actively dragging
    if (!controls.state === -1 || !controls.active) {
        pizzaGroup.rotation.y += 0.002;
    }

    // 3. Falling gravity toppings updating
    let now = Date.now();
    for (let i = fallingItems.length - 1; i >= 0; i--) {
        let item = fallingItems[i];
        if (now < item.spawnTime) continue; // Stagger delay

        // Apply simulated physics gravity acceleration
        item.velocity += item.gravity;
        item.mesh.position.y -= item.velocity;

        // Collision detection on pizza surface
        if (item.mesh.position.y <= item.endY) {
            item.mesh.position.y = item.endY; // Lock position
            
            if (item.bounces > 0) {
                // Bounce back up
                item.velocity = -item.velocity * item.elasticity;
                item.bounces--;
            } else {
                // Settle and stop animating this piece
                item.velocity = 0;
                fallingItems.splice(i, 1);
            }
        }
    }

    // 4. Floating spice drift rotation
    if (particlesSystem) {
        const positions = particlesSystem.geometry.attributes.position.array;
        const count = positions.length / 3;
        for (let i = 0; i < count; i++) {
            // Sway x and z slightly, make them rise and sink
            positions[i * 3 + 1] -= 0.001; // Fall slowly
            
            // Spiral rotation around y axis
            let x = positions[i * 3];
            let z = positions[i * 3 + 2];
            let angle = 0.005;
            positions[i * 3] = x * Math.cos(angle) - z * Math.sin(angle);
            positions[i * 3 + 2] = x * Math.sin(angle) + z * Math.cos(angle);

            // Re-spawn if particle falls below pizza base
            if (positions[i * 3 + 1] < 0.05) {
                positions[i * 3 + 1] = 1.6; // Teleport high
            }
        }
        particlesSystem.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
}

// Manual trigger standard spin
function triggerFunSpin() {
    let speed = 0.25;
    let timer = setInterval(() => {
        pizzaGroup.rotation.y += speed;
        speed *= 0.94; // Friction damping
        if (speed < 0.002) {
            clearInterval(timer);
        }
    }, 20);
}

// Bind Sound Hook
function setIngredientSoundCallback(callback) {
    playIngredientSoundCallback = callback;
}
