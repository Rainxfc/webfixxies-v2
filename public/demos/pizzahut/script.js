document.addEventListener('DOMContentLoaded', () => {
    
    // --- 3D Card Tilt Effect ---
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max 15 degrees)
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            // Add a smooth transition back to original state
            card.style.transition = 'transform 0.5s ease';
            setTimeout(() => {
                card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
            }, 500);
        });
    });

    // --- Category Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            cards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    // Trigger reflow for animation if needed
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                }
            });
        });
    });

    // --- Spice Meter Logic ---
    const spiceSliders = document.querySelectorAll('.spice-slider');
    
    const spiceLevels = {
        1: 'Mild',
        2: 'Medium-Mild',
        3: 'Medium',
        4: 'Hot',
        5: 'Extra Hot'
    };
    
    spiceSliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const val = e.target.value;
            const card = e.target.closest('.menu-card');
            const spiceText = card.querySelector('.spice-value-text');
            if(spiceText) {
                spiceText.textContent = spiceLevels[val];
            }
        });
    });

    // --- Price Calculation Logic (Size & Crust) ---
    // A simple logic to update price based on size multiplier and crust addition
    cards.forEach(card => {
        const priceElement = card.querySelector('.price');
        if(!priceElement) return;

        const basePrice = parseFloat(priceElement.getAttribute('data-base-price'));
        
        const updatePrice = () => {
            let finalPrice = basePrice;
            
            // Check size multiplier
            const sizeChecked = card.querySelector('.size-toggle input:checked');
            if(sizeChecked) {
                const multiplier = parseFloat(sizeChecked.value);
                finalPrice *= multiplier;
            }
            
            // Check crust addition
            const crustSelect = card.querySelector('.crust-select');
            if(crustSelect) {
                const addon = parseFloat(crustSelect.value);
                finalPrice += addon;
            }
            
            priceElement.textContent = `৳ ${Math.round(finalPrice)}`;
            
            // Add a small bump animation to price
            priceElement.style.transform = 'scale(1.2)';
            priceElement.style.color = '#fff';
            setTimeout(() => {
                priceElement.style.transform = 'scale(1)';
                priceElement.style.color = 'var(--accent)';
            }, 200);
        };
        
        // Add listeners to size toggles
        const sizeInputs = card.querySelectorAll('.size-toggle input');
        sizeInputs.forEach(input => {
            input.addEventListener('change', updatePrice);
        });
        
        // Add listener to crust select
        const crustSelect = card.querySelector('.crust-select');
        if(crustSelect) {
            crustSelect.addEventListener('change', updatePrice);
        }
    });

    // --- Cart Animation ---
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Button animation
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.background = '#4CAF50';
            this.style.borderColor = '#4CAF50';
            this.style.color = 'white';
            
            // Cart icon bounce
            const cart = document.querySelector('.cart');
            cart.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cart.style.transform = 'scale(1)';
            }, 300);
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = 'rgba(227, 24, 55, 0.05)';
                this.style.borderColor = 'var(--ph-red)';
                this.style.color = 'var(--ph-red)';
            }, 1500);
        });
    });

});
