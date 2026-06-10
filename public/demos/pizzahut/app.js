/* ==========================================================================
   Pizza Hut Bangladesh - Main App Controller & Sound Synthesizer
   ========================================================================== */

// 1. App State Management
let currentCustomPizza = {
    crust: 'pan', // pan, thin, stuffed
    toppings: {
        kalabhuna: false,
        chickentikka: false,
        capsicum: false,
        mushrooms: false,
        onions: false
    }
};

const BASE_PRICES = {
    pan: 799,
    thin: 849, // +50
    stuffed: 979 // +180
};

const TOPPING_PRICES = {
    kalabhuna: 150,
    chickentikka: 120,
    capsicum: 60,
    mushrooms: 70,
    onions: 40
};

let shoppingCart = [];
let soundMuted = true;
let audioCtx = null;

// 2. Web Audio API Sound Synthesizer (Zero-dependency offline sound design)
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// Synthesize a premium high-quality click sound
function playClickSound() {
    if (soundMuted) return;
    initAudio();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.12);
}

// Synthesize a mouth-watering hot pan sizzle sound
function playSizzleSound() {
    if (soundMuted) return;
    initAudio();

    // 1. Generate White Noise Buffer (represents bubbling cheese / baking heat)
    const bufferSize = audioCtx.sampleRate * 0.45; // 0.45 seconds
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = buffer;

    // 2. Bandpass filter to make it sound like sizzling/hissing
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(8000, audioCtx.currentTime);
    filter.Q.setValueAtTime(2.0, audioCtx.currentTime);

    // 3. Audio Envelope
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    noiseNode.start();
}

// Synthesize a success chime
function playChimeSound() {
    if (soundMuted) return;
    initAudio();

    const now = audioCtx.currentTime;
    
    // Play two notes (harmonic major chord sweep)
    [523.25, 659.25].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.4);
    });
}

// 3. Customizer Event Handlers & State Management
function setupCustomizer() {
    // 3A. Tab Switching (Crust vs Toppings)
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            tabButtons.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`tab-${targetTab}`).classList.add('active');
        });
    });

    // 3B. Crust Selection Card Toggles
    const crustCards = document.querySelectorAll('.crust-card');
    crustCards.forEach(card => {
        card.addEventListener('click', () => {
            crustCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            const crustType = card.getAttribute('data-crust');
            currentCustomPizza.crust = crustType;

            // Trigger 3D changes in pizza3d.js
            changeCrust3D(crustType);
            
            calculateCustomPizzaPrice();
        });
    });

    // 3C. Toppings Toggle
    const toppingItems = document.querySelectorAll('.topping-item');
    toppingItems.forEach(item => {
        const checkbox = item.querySelector('.topping-cb');
        
        // Make entire row card clickable
        item.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT') {
                checkbox.checked = !checkbox.checked;
                // Dispatch event so toggle handler runs
                checkbox.dispatchEvent(new Event('change'));
            }
        });

        checkbox.addEventListener('change', () => {
            const toppingType = item.getAttribute('data-topping');
            const isChecked = checkbox.checked;

            currentCustomPizza.toppings[toppingType] = isChecked;
            
            if (isChecked) {
                item.classList.add('selected');
                playSizzleSound();
            } else {
                item.classList.remove('selected');
                playClickSound();
            }

            // Sync with Three.js scene
            toggleTopping3D(toppingType, isChecked);
            
            calculateCustomPizzaPrice();
        });
    });
}

// Calculates dynamic estimated BDT price
function calculateCustomPizzaPrice() {
    let total = BASE_PRICES[currentCustomPizza.crust];
    
    Object.keys(currentCustomPizza.toppings).forEach(topping => {
        if (currentCustomPizza.toppings[topping]) {
            total += TOPPING_PRICES[topping];
        }
    });

    document.getElementById('custom-pizza-price').textContent = total;
    return total;
}

// 4. Shopping Cart System (Slide-out drawer and checkout summaries)
function setupShoppingCart() {
    const toggleBtn = document.getElementById('cart-drawer-toggle');
    const closeBtn = document.getElementById('cart-close-btn');
    const drawer = document.getElementById('cart-drawer');
    const shadow = document.getElementById('cart-shadow');

    // Open/Close Cart
    toggleBtn.addEventListener('click', () => {
        drawer.classList.add('active');
        shadow.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        drawer.classList.remove('active');
        shadow.classList.remove('active');
    });

    shadow.addEventListener('click', () => {
        drawer.classList.remove('active');
        shadow.classList.remove('active');
    });

    // Add Customized Pizza to Cart
    document.getElementById('add-pizza-to-cart').addEventListener('click', () => {
        const price = calculateCustomPizzaPrice();
        
        // Make a deep copy of current custom pizza
        const pizzaOrder = {
            id: 'custom-' + Date.now(),
            type: 'custom',
            name: `Custom ${currentCustomPizza.crust.charAt(0).toUpperCase() + currentCustomPizza.crust.slice(1)} Pizza`,
            crust: currentCustomPizza.crust,
            toppings: [],
            price: price,
            qty: 1
        };

        // Populate toppings descriptive list
        Object.keys(currentCustomPizza.toppings).forEach(top => {
            if (currentCustomPizza.toppings[top]) {
                // Map ID to human friendly names
                let friendlyName = top === 'kalabhuna' ? 'Beef Kala Bhuna' 
                                 : top === 'chickentikka' ? 'Chicken Tikka'
                                 : top.charAt(0).toUpperCase() + top.slice(1);
                pizzaOrder.toppings.push(friendlyName);
            }
        });

        // Push to cart array
        shoppingCart.push(pizzaOrder);
        
        // Notify user
        showNotificationToast(`Customized ${pizzaOrder.name} added to cart!`);
        updateCartDisplay();
        

        // Slide open the cart drawer so user sees it instantly
        setTimeout(() => {
            drawer.classList.add('active');
            shadow.classList.add('active');
        }, 600);
    });

    // Setup Deals CTA Card buy button triggers
    const dealBuyButtons = document.querySelectorAll('.deal-buy-btn');
    dealBuyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const dealId = btn.getAttribute('data-deal-id');
            let dealItem = {};

            if (dealId === 'double-treat') {
                dealItem = {
                    id: 'deal-double-' + Date.now(),
                    type: 'deal',
                    name: 'Double Treat Medium',
                    details: ['2 Medium Pan Pizzas', 'Fizzy Sharing Coca-Cola'],
                    price: 1499,
                    qty: 1
                };
            } else if (dealId === 'my-box') {
                dealItem = {
                    id: 'deal-mybox-' + Date.now(),
                    type: 'deal',
                    name: 'My Box Solo',
                    details: ['1 Personal Pizza', 'Garlic Bread (2 pcs)', '1 Coca-Cola Can'],
                    price: 399,
                    qty: 1
                };
            } else if (dealId === 'triple-feast') {
                dealItem = {
                    id: 'deal-triple-' + Date.now(),
                    type: 'deal',
                    name: 'Triple Feast Large',
                    details: ['3 Large Pan Pizzas', 'Ultimate Family Saver Pack'],
                    price: 2499,
                    qty: 1
                };
            }

            shoppingCart.push(dealItem);
            showNotificationToast(`${dealItem.name} added to cart!`);
            updateCartDisplay();

            setTimeout(() => {
                drawer.classList.add('active');
                shadow.classList.add('active');
            }, 600);
        });
    });

    // Checkout button trigger
    document.getElementById('btn-checkout').addEventListener('click', () => {
        if (shoppingCart.length === 0) {
            showNotificationToast("Add some slices to your cart first!");
            return;
        }


        
        // Show checkout animation popup
        const checkoutBtn = document.getElementById('btn-checkout');
        checkoutBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing Order...';
        checkoutBtn.disabled = true;

        setTimeout(() => {
            // Display rich order complete modal (custom alert)
            alert(`🎉 Order Received! \n\nThank you for ordering from Pizza Hut Bangladesh. Your customized pizza is in the 3D oven!\n\nOrder Total: BDT ${(calculateCartTotals().grandTotal).toFixed(0)} (inc. VAT)\nDelivery Mode: ${document.querySelector('.switch-option.active').textContent}`);
            
            // Clear cart
            shoppingCart = [];
            updateCartDisplay();
            drawer.classList.remove('active');
            shadow.classList.remove('active');
            
            checkoutBtn.innerHTML = 'Proceed to Checkout <i class="fa-solid fa-arrow-right"></i>';
            checkoutBtn.disabled = false;
        }, 2200);
    });
}

// Show standard beautiful toast alerts
function showNotificationToast(msg) {
    const toast = document.getElementById('toast');
    toast.querySelector('.toast-msg').textContent = msg;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3200);
}

// Helper calculations
function calculateCartTotals() {
    let subtotal = 0;
    let qty = 0;

    shoppingCart.forEach(item => {
        subtotal += item.price * item.qty;
        qty += item.qty;
    });

    // Govt. Restaurant VAT in Bangladesh (Standard 10% for restaurant services)
    let vat = subtotal * 0.10;
    let grandTotal = subtotal + vat;

    return {
        subtotal,
        qty,
        vat,
        grandTotal
    };
}

// Renders the cart drawer list dynamically
function updateCartDisplay() {
    const container = document.getElementById('cart-items-container');
    const badge = document.getElementById('cart-qty-badge');
    const { subtotal, qty, vat, grandTotal } = calculateCartTotals();

    // 1. Update quantities badges
    badge.textContent = qty;
    if (qty > 0) {
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }

    // 2. Render container HTML
    if (shoppingCart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty-state">
                <i class="fa-solid fa-pizza-slice"></i>
                <p>Your basket is currently empty.</p>
                <p class="sub-info">Head back to the 3D Customizer to build your pizza or select one of our deals!</p>
            </div>
        `;
    } else {
        container.innerHTML = '';
        shoppingCart.forEach(item => {
            const card = document.createElement('div');
            card.className = 'cart-item-card';

            let detailsListHTML = '';
            if (item.type === 'custom') {
                detailsListHTML = `
                    <ul class="item-details-list">
                        <li>Crust: ${item.crust.toUpperCase()}</li>
                        ${item.toppings.length > 0 ? `<li>Toppings: ${item.toppings.join(', ')}</li>` : '<li>No extra toppings</li>'}
                    </ul>
                `;
            } else {
                detailsListHTML = `
                    <ul class="item-details-list">
                        ${item.details.map(d => `<li>${d}</li>`).join('')}
                    </ul>
                `;
            }

            card.innerHTML = `
                <div class="item-info">
                    <h4>${item.name}</h4>
                    ${detailsListHTML}
                    <div class="item-price">BDT ${item.price}</div>
                </div>
                <div class="item-right-actions">
                    <button class="item-delete-btn" data-id="${item.id}"><i class="fa-solid fa-trash-can"></i></button>
                    <div class="item-qty-selector">
                        <button class="qty-btn dec-btn" data-id="${item.id}"><i class="fa-solid fa-minus"></i></button>
                        <span class="qty-val">${item.qty}</span>
                        <button class="qty-btn inc-btn" data-id="${item.id}"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        // Setup individual card listeners
        setupCartControls();
    }

    // 3. Update summary numbers in footer
    document.getElementById('cart-subtotal').textContent = subtotal;
    document.getElementById('cart-vat').textContent = vat.toFixed(0);
    document.getElementById('cart-total').textContent = grandTotal.toFixed(0);
}

function setupCartControls() {
    // Trash delete buttons
    document.querySelectorAll('.item-delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            shoppingCart = shoppingCart.filter(item => item.id !== id);
            updateCartDisplay();
        });
    });

    // Qty Increase
    document.querySelectorAll('.inc-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const item = shoppingCart.find(i => i.id === id);
            if (item) {
                item.qty++;
                updateCartDisplay();
            }
        });
    });

    // Qty Decrease
    document.querySelectorAll('.dec-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const item = shoppingCart.find(i => i.id === id);
            if (item && item.qty > 1) {
                item.qty--;
                updateCartDisplay();
            } else if (item && item.qty === 1) {
                // Delete
                shoppingCart = shoppingCart.filter(i => i.id !== id);
                updateCartDisplay();
            }
        });
    });
}

// 5. Localized Outlet Interactive Finder & Map Simulation
function setupOutletLocator() {
    const outlets = document.querySelectorAll('.outlet-item');
    const pin = document.getElementById('map-pin-target');
    const detailsCard = document.getElementById('map-details-card');

    outlets.forEach(outlet => {
        outlet.addEventListener('click', () => {
            // Update active state in list
            outlets.forEach(o => o.classList.remove('active'));
            outlet.classList.add('active');

            const name = outlet.querySelector('h4').textContent;
            
            // Map coordinates (simulated movement of the pin to represent panning the map)
            let topPercent = '45%';
            let leftPercent = '52%';
            let phone = '+880 9613-888777';
            let hours = '11:00 AM - 11:30 PM';

            if (name.includes('Dhanmondi')) {
                topPercent = '65%';
                leftPercent = '35%';
                phone = '+880 9613-888666';
                hours = '11:00 AM - 11:00 PM';
            } else if (name.includes('Uttara')) {
                topPercent = '20%';
                leftPercent = '48%';
                phone = '+880 9613-888555';
                hours = '11:00 AM - 11:00 PM';
            } else if (name.includes('Chittagong')) {
                topPercent = '80%';
                leftPercent = '82%';
                phone = '+880 9613-888999';
                hours = '11:00 AM - 11:30 PM';
            }

            // Animate map pin position
            pin.style.top = topPercent;
            pin.style.left = leftPercent;

            // Update details overlay card content
            detailsCard.querySelector('h4').textContent = name;
            detailsCard.querySelectorAll('p')[0].innerHTML = `<i class="fa-solid fa-phone"></i> ${phone}`;
            detailsCard.querySelectorAll('p')[1].innerHTML = `<i class="fa-solid fa-clock"></i> ${hours}`;
            

        });
    });
}

// 6. Navigation and Story Highlight Hook-ups
function setupMiscInteractions() {
    // 6A. Sound toggle button
    const soundBtn = document.getElementById('sound-btn');
    soundBtn.addEventListener('click', () => {
        soundMuted = !soundMuted;
        if (!soundMuted) {
            // Initialise context if needed
            initAudio();
            soundBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            soundBtn.style.color = 'var(--secondary)';
            playChimeSound();
            showNotificationToast("Sensory sound effects activated! Try adding ingredients.");
        } else {
            soundBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            soundBtn.style.color = 'var(--text-main)';
        }
    });

    // 6B. Order Mode Switcher (Delivery vs Takeaway)
    const switchOptions = document.querySelectorAll('.switch-option');
    switchOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            switchOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            showNotificationToast(`Ordering mode switched to: ${opt.textContent}`);
        });
    });

    // 6C. Viewport 3D Button controls hookups (Top, Angled, Spin)
    document.getElementById('btn-view-top').addEventListener('click', () => {
        setCameraView('top');
    });
    document.getElementById('btn-view-ortho').addEventListener('click', () => {
        setCameraView('ortho');
    });
    document.getElementById('btn-reset-pizza').addEventListener('click', () => {
        triggerFunSpin();
    });

    // 6D. Chittagong Beef Kala Bhuna Promo Story CTA
    // This button will automatically select the Kala Bhuna pizza customization preset!
    document.getElementById('btn-load-kala-bhuna').addEventListener('click', () => {
        // Reset selections
        currentCustomPizza.crust = 'pan';
        
        // Select Pan Crust active
        document.querySelectorAll('.crust-card').forEach(c => {
            if (c.getAttribute('data-crust') === 'pan') c.classList.add('active');
            else c.classList.remove('active');
        });
        changeCrust3D('pan');

        // Apply toppings: Beef Kala Bhuna + Red Onions + Green Capsicum
        const toppingsPreset = {
            kalabhuna: true,
            chickentikka: false,
            capsicum: true,
            mushrooms: false,
            onions: true
        };

        currentCustomPizza.toppings = toppingsPreset;

        // Update UI checkboxes and selected state styles
        document.querySelectorAll('.topping-item').forEach(item => {
            const type = item.getAttribute('data-topping');
            const isSelected = toppingsPreset[type];
            const checkbox = item.querySelector('.topping-cb');
            
            checkbox.checked = isSelected;
            if (isSelected) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }

            // Sync with 3D Canvas
            toggleTopping3D(type, isSelected);
        });

        calculateCustomPizzaPrice();

        // Scroll smoothly back to Customizer hero section
        document.getElementById('customizer-section').scrollIntoView({ behavior: 'smooth' });
        
        // Play hot sizzle sound for the preset load
        playSizzleSound();
        showNotificationToast("Chittagong Beef Kala Bhuna Preset Loaded!");
    });
}

// 7. Page Load Initializer
window.addEventListener('DOMContentLoaded', () => {
    // 1. Initialise 3D Canvas
    init3DPizza('pizza-3d-canvas-container');

    // 2. Setup audio callbacks (hook sound player to topping fall events)
    setIngredientSoundCallback((type) => {
        playSizzleSound();
    });

    // 3. Bind UI events
    setupCustomizer();
    setupShoppingCart();
    setupOutletLocator();
    setupMiscInteractions();

    // 4. Initial calculations
    calculateCustomPizzaPrice();
    updateCartDisplay();
});
