// ============ DATA ============
const themes = [
    { id: 1, name: 'Romansa Ethereal', tags: 'elegan romantis mewah', badge: 'Premium', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80', preview: '#' },
    { id: 2, name: 'Minimalis Modern', tags: 'minimalis modern bersih', badge: 'Populer', img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80', preview: '#' },
    { id: 3, name: 'Taman Bunga', tags: 'bunga taman natural', badge: 'Baru', img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80', preview: '#' },
    { id: 4, name: 'Keanggunan Emas', tags: 'emas mewah elegan', badge: 'Premium', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80', preview: '#' },
    { id: 5, name: 'Biru Royal', tags: 'biru royal klasik', badge: 'Populer', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', preview: '#' },
    { id: 6, name: 'Pesona Rustic', tags: 'rustic vintage hangat', badge: 'Trending', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80', preview: '#' },
    { id: 7, name: 'Luxury Gold', tags: 'mewah emas premium', badge: 'Premium', img: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&q=80', preview: '#' },
    { id: 8, name: 'Tropical Paradise', tags: 'tropical beach pantai', badge: 'Trending', img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80', preview: '#' },
    { id: 9, name: 'Classic Elegance', tags: 'klasik elegan formal', badge: 'Populer', img: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=600&q=80', preview: '#' },
    { id: 10, name: 'Vintage Romance', tags: 'vintage romantis antik', badge: 'Baru', img: 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=600&q=80', preview: '#' },
    { id: 11, name: 'Modern Chic', tags: 'modern stylish trendy', badge: 'Trending', img: 'https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=600&q=80', preview: '#' },
    { id: 12, name: 'Garden Party', tags: 'taman outdoor garden', badge: 'Populer', img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80', preview: '#' }
];

let cart = [];
let selectedPaymentMethod = '';
let discount = 0;
let promoApplied = false;
let currentPromoCode = '';
let installmentTenor = 1;
let paymentFile = null;
let paymentTimer = null;
let bulkDiscountAmount = 0;
let bulkDiscountPercent = 0;
let orderHistory = [];

const promoCodes = {
    'WEDDING2025': 15,
    'LUNAVIA10': 10,
    'NEWCUSTOMER': 20,
    'SAVE15': 15,
    'DISCOUNT20': 20,
    'PROMO2025': 25
};

// ============ UTILITY FUNCTIONS ============
function formatRupiah(amount) {
    return `Rp ${amount.toLocaleString('id-ID')}`;
}

function generateOrderId() {
    return 'LUN' + Date.now().toString().slice(-8);
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============ WHATSAPP ============
function openWhatsApp() {
    const message = encodeURIComponent('Halo Lunavia! Saya ingin bertanya tentang undangan digital pernikahan.');
    window.open(`https://wa.me/62882020411497?text=${message}`, '_blank');
}

// ============ PRELOADER ============
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    }
});

// ============ PARTICLES BACKGROUND ============
const canvas = document.getElementById('particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = 'rgba(139, 92, 246, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
}

// ============ ORDER HISTORY FUNCTIONS ============
function saveOrderHistory(orderId, orderData) {
    const order = {
        orderId: orderId,
        timestamp: Date.now(),
        status: 'Diproses',
        customerName: orderData.name,
        customerEmail: orderData.email,
        customerPhone: orderData.phone,
        items: [...cart],
        paymentMethod: selectedPaymentMethod,
        installmentTenor: installmentTenor,
        totalAmount: orderData.totalAmount,
        discount: discount,
        bulkDiscount: bulkDiscountPercent,
        promoCode: currentPromoCode,
        promoApplied: promoApplied,
        hasPaymentProof: paymentFile !== null,
        invitationLink: null
    };
    
    orderHistory.push(order);
    localStorage.setItem('lunaviaOrderHistory', JSON.stringify(orderHistory));
}

function loadOrderHistory() {
    const saved = localStorage.getItem('lunaviaOrderHistory');
    if (saved) {
        try {
            orderHistory = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading order history:', e);
            orderHistory = [];
        }
    }
}

function updateOrderStatus(orderId, newStatus) {
    const order = orderHistory.find(o => o.orderId === orderId);
    if (order) {
        order.status = newStatus;
        localStorage.setItem('lunaviaOrderHistory', JSON.stringify(orderHistory));
        renderOrderHistory();
        showToast(`✅ Status pesanan ${orderId} diubah menjadi ${newStatus}`, 'success');
    }
}

function openOrderTracking() {
    const modal = document.getElementById('orderTrackingModal');
    if (modal) {
        modal.classList.add('active');
        renderOrderHistory();
    }
}

function closeOrderTracking() {
    const modal = document.getElementById('orderTrackingModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function filterOrders(status) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const clickedButton = Array.from(buttons).find(btn => 
        btn.textContent.includes(status) || (status === 'all' && btn.textContent === 'Semua')
    );
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
    
    renderOrderHistory(status);
}

function renderOrderHistory(filter = 'all') {
    const container = document.getElementById('orderHistoryList');
    if (!container) return;
    
    let filteredOrders = orderHistory;
    if (filter !== 'all') {
        filteredOrders = orderHistory.filter(order => order.status === filter);
    }
    
    if (filteredOrders.length === 0) {
        container.innerHTML = `
            <div class="empty-orders">
                <div class="empty-orders-icon">📦</div>
                <p>${filter === 'all' ? 'Belum ada riwayat pesanan' : `Tidak ada pesanan dengan status "${filter}"`}</p>
                <button class="btn btn-primary" onclick="closeOrderTracking(); scrollToSection('packages')">
                    🛍️ Mulai Belanja
                </button>
            </div>
        `;
        return;
    }
    
    const sortedOrders = [...filteredOrders].sort((a, b) => b.timestamp - a.timestamp);
    
    let html = '';
    sortedOrders.forEach(order => {
        const date = new Date(order.timestamp).toLocaleString('id-ID');
        const statusColor = 
            order.status === 'Selesai' ? 'var(--success)' :
            order.status === 'Gagal' ? 'var(--danger)' :
            'var(--warning)';
        
        const statusIcon = 
            order.status === 'Selesai' ? '✅' :
            order.status === 'Gagal' ? '❌' :
            '⏳';
        
        const invitationLink = order.invitationLink || null;
        
        html += `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <h4>Order #${order.orderId}</h4>
                        <p style="color: var(--text-muted); font-size: 0.85rem;">${date}</p>
                    </div>
                    <div class="order-status" style="background: ${statusColor}20; color: ${statusColor};">
                        ${statusIcon} ${order.status}
                    </div>
                </div>
                <div class="order-body">
                    <div class="order-info-row">
                        <span>👤 Nama:</span>
                        <span>${order.customerName}</span>
                    </div>
                    <div class="order-info-row">
                        <span>📧 Email:</span>
                        <span>${order.customerEmail}</span>
                    </div>
                    <div class="order-info-row">
                        <span>📱 Phone:</span>
                        <span>${order.customerPhone}</span>
                    </div>
                    <div class="order-info-row">
                        <span>💳 Pembayaran:</span>
                        <span>${order.paymentMethod.toUpperCase()}</span>
                    </div>
                    ${order.promoCode ? `
                    <div class="order-info-row">
                        <span>🎁 Kode Promo:</span>
                        <span>${order.promoCode} (-${order.discount}%)</span>
                    </div>
                    ` : ''}
                    ${invitationLink ? `
                    <div class="order-info-row" style="background: rgba(16, 185, 129, 0.1); padding: 0.8rem; border-radius: 10px; margin-top: 0.5rem;">
                        <span>🔗 Link Undangan:</span>
                        <span style="word-break: break-all; color: var(--success);">${invitationLink}</span>
                    </div>
                    ` : ''}
                    <div class="order-items">
                        <strong>📦 Item Pesanan:</strong>
                        ${order.items.map(item => `
                            <div style="padding: 0.5rem 0; border-bottom: 1px solid rgba(139, 92, 246, 0.1);">
                                ${item.theme} - ${item.package} (x${item.quantity})
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-total">
                        <span>💰 Total Pembayaran:</span>
                        <span style="color: var(--gold); font-weight: 700; font-size: 1.2rem;">${formatRupiah(order.totalAmount)}</span>
                    </div>
                </div>
                <div class="order-actions">
                    ${invitationLink ? `
                        <button class="btn btn-success" onclick="openInvitationLink('${invitationLink}')" style="background: linear-gradient(135deg, var(--success), #059669);">
                            🌐 Lihat Undangan
                        </button>
                        <button class="btn btn-primary" onclick="shareInvitation('${invitationLink}', '${order.customerName}')">
                            📤 Bagikan Link
                        </button>
                    ` : `
                        <button class="btn btn-secondary" onclick="requestInvitationLink('${order.orderId}')">
                            ⏳ Minta Link Undangan
                        </button>
                    `}
                    ${order.status === 'Diproses' ? `
                        <button class="btn btn-secondary" onclick="updateOrderStatus('${order.orderId}', 'Selesai')">
                            ✅ Tandai Selesai
                        </button>
                        <button class="btn btn-danger" onclick="updateOrderStatus('${order.orderId}', 'Gagal')">
                            ❌ Tandai Gagal
                        </button>
                    ` : ''}
                    <button class="btn btn-primary" onclick="reorderItems('${order.orderId}')">
                        🔄 Pesan Lagi
                    </button>
                    <button class="btn btn-secondary" onclick="contactAdminAboutOrder('${order.orderId}')">
                        💬 Hubungi Admin
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function reorderItems(orderId) {
    const order = orderHistory.find(o => o.orderId === orderId);
    if (order) {
        cart = order.items.map(item => ({
            ...item,
            id: Date.now() + Math.random()
        }));
        saveCart();
        closeOrderTracking();
        openCart();
        showToast('✅ Item berhasil ditambahkan ke keranjang!', 'success');
    }
}

function openInvitationLink(link) {
    window.open(link, '_blank');
}

function shareInvitation(link, name) {
    const message = `Undangan Pernikahan ${name}\n\nSilakan buka link berikut:\n${link}`;
    
    if (navigator.share) {
        navigator.share({
            title: `Undangan Pernikahan ${name}`,
            text: message,
            url: link
        }).catch(() => {
            copyToClipboardSimple(link);
            showToast('📋 Link berhasil disalin!', 'success');
        });
    } else {
        copyToClipboardSimple(link);
        showToast('📋 Link berhasil disalin!', 'success');
    }
}

function requestInvitationLink(orderId) {
    const message = encodeURIComponent(`Halo Admin, saya ingin meminta link undangan untuk Order #${orderId}`);
    window.open(`https://wa.me/62882020411497?text=${message}`, '_blank');
}

function contactAdminAboutOrder(orderId) {
    const message = encodeURIComponent(`Halo Admin, saya ingin bertanya tentang Order #${orderId}`);
    window.open(`https://wa.me/62882020411497?text=${message}`, '_blank');
}

function copyToClipboardSimple(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// ============ PROMO CODE ============
function applyPromo() {
    const promoInput = document.getElementById('promoCode');
    const code = promoInput.value.toUpperCase().trim();
    const discountMsg = document.getElementById('discountMessage');
    const applyBtn = document.getElementById('applyPromoBtn');
    const removeBtn = document.getElementById('removePromoBtn');
    
    if (!code) {
        showToast('❌ Masukkan kode promo!', 'error');
        return;
    }
    
    if (promoCodes[code]) {
        discount = promoCodes[code];
        promoApplied = true;
        currentPromoCode = code;
        
        discountMsg.innerHTML = `✅ Kode "${code}" diterapkan! Diskon ${discount}%`;
        discountMsg.classList.add('show');
        
        promoInput.disabled = true;
        promoInput.style.opacity = '0.6';
        applyBtn.style.display = 'none';
        removeBtn.style.display = 'inline-flex';
        
        updateOrderSummary();
        showToast(`🎉 Selamat! Anda mendapat diskon ${discount}%!`, 'success');
    } else {
        showToast('❌ Kode promo tidak valid', 'error');
        promoInput.value = '';
        promoInput.focus();
    }
}

function removePromo() {
    const promoInput = document.getElementById('promoCode');
    const discountMsg = document.getElementById('discountMessage');
    const applyBtn = document.getElementById('applyPromoBtn');
    const removeBtn = document.getElementById('removePromoBtn');
    
    discount = 0;
    promoApplied = false;
    currentPromoCode = '';
    
    promoInput.value = '';
    promoInput.disabled = false;
    promoInput.style.opacity = '1';
    discountMsg.classList.remove('show');
    applyBtn.style.display = 'inline-flex';
    removeBtn.style.display = 'none';
    
    updateOrderSummary();
    showToast('🗑️ Kode promo dihapus', 'success');
    promoInput.focus();
}

// ============ THEMES SECTION ============
function renderThemes(themesToRender = themes) {
    const grid = document.getElementById('themeGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (themesToRender.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">😔</div>
                <p style="color: var(--text-muted);">Tidak ada tema yang sesuai dengan pencarian Anda</p>
            </div>
        `;
        return;
    }
    
    themesToRender.forEach((theme, index) => {
        const tags = theme.tags.split(' ');
        const card = document.createElement('div');
        card.className = 'theme-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="theme-image">
                <img src="${theme.img}" alt="${theme.name}" loading="lazy">
                <div class="theme-badge">${theme.badge}</div>
            </div>
            <div class="theme-info">
                <h3 class="theme-name">${theme.name}</h3>
                <div class="theme-tags">
                    ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="theme-actions">
                    <div class="theme-actions-row">
                        <button class="theme-btn theme-btn-outline" onclick="selectTheme('${theme.name}')">
                            Pilih Tema
                        </button>
                        <a href="${theme.preview}" class="theme-btn theme-btn-outline" target="_blank">
                            Preview
                        </a>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function selectTheme(themeName) {
    localStorage.setItem('selectedTheme', themeName);
    scrollToSection('packages');
    showToast(`✅ Tema "${themeName}" dipilih!`, 'success');
}

// ============ CART FUNCTIONS ============
function saveCart() {
    localStorage.setItem('lunaviaCart', JSON.stringify(cart));
    updateCartUI();
}

function loadCart() {
    const savedCart = localStorage.getItem('lunaviaCart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartUI();
        } catch (e) {
            console.error('Error loading cart:', e);
            cart = [];
        }
    }
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const mobileCartCount = document.getElementById('mobileCartCount');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItems) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
    if (mobileCartCount) mobileCartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛍️</div>
                <p>Keranjang Anda kosong</p>
                <div class="cart-empty-actions">
                    <button class="btn btn-primary" onclick="closeCart(); scrollToSection('themes')">
                        🎨 Pilih Tema
                    </button>
                    <button class="btn btn-secondary" onclick="closeCart(); scrollToSection('packages')">
                        📦 Lihat Paket
                    </button>
                </div>
            </div>
        `;
        if (cartSummary) cartSummary.innerHTML = '';
        return;
    }
    
    let html = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        html += `
            <div style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 15px; padding: 1rem; margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <div>
                        <h4 style="margin: 0 0 0.3rem 0;">${item.theme}</h4>
                        <div style="color: var(--accent-light); font-size: 0.85rem;">Paket: ${item.package}</div>
                    </div>
                    <button onclick="removeFromCart(${item.id})" style="background: rgba(239, 68, 68, 0.1); border: none; color: var(--danger); border-radius: 50%; width: 35px; height: 35px; cursor: pointer; font-size: 1.2rem;">🗑️</button>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; gap: 0.8rem; align-items: center; background: rgba(139, 92, 246, 0.1); padding: 0.4rem 1rem; border-radius: 50px;">
                        <button onclick="updateQuantity(${item.id}, -1)" style="background: var(--accent); border: none; color: white; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-weight: bold;">-</button>
                        <span style="font-weight: 600; min-width: 25px; text-align: center;">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" style="background: var(--accent); border: none; color: white; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; font-weight: bold;">+</button>
                    </div>
                    <div style="color: var(--gold); font-weight: 700; font-size: 1.2rem;">${formatRupiah(itemTotal)}</div>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    
    if (cartSummary) {
        cartSummary.innerHTML = `
            <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(109, 40, 217, 0.1)); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 15px; padding: 1.5rem; margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; padding: 0.8rem 0; font-size: 1.2rem; font-weight: 700;">
                    <span>Total (${totalItems} item)</span>
                    <span style="color: var(--accent);">${formatRupiah(subtotal)}</span>
                </div>
            </div>
        `;
    }
}

function addPackageToCart(packageName, price) {
    const selectedTheme = localStorage.getItem('selectedTheme') || 'Tema Belum Dipilih';
    
    cart.push({
        id: Date.now(),
        theme: selectedTheme,
        package: packageName,
        price: price,
        quantity: 1
    });
    
    saveCart();
    openCart();
    showToast(`🎉 ${packageName} ditambahkan!`, 'success');
}

function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            saveCart();
        }
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    showToast('🗑️ Item dihapus', 'error');
}

function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) cartSidebar.classList.add('active');
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) cartSidebar.classList.remove('active');
}

function clearCart() {
    if (confirm('Kosongkan keranjang?')) {
        cart = [];
        saveCart();
        showToast('🗑️ Keranjang dikosongkan', 'success');
    }
}

// ============ CHECKOUT ============
function proceedToCheckout() {
    if (cart.length === 0) {
        showToast('❌ Keranjang kosong!', 'error');
        return;
    }
    closeCart();
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.add('active');
    
    // Reset to step 1
    nextStep(1);
}

function validateAndNext() {
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    
    if (!name || !email || !phone) {
        showToast('❌ Lengkapi semua data!', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('❌ Format email tidak valid!', 'error');
        return;
    }
    
    nextStep(2);
    updateOrderSummary();
    startPaymentTimer();
}

function nextStep(step) {
    document.querySelectorAll('.checkout-section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById('section' + step);
    if (section) section.classList.add('active');
    
    document.querySelectorAll('.checkout-step').forEach(s => {
        s.classList.remove('active');
        s.classList.remove('completed');
    });
    const stepEl = document.getElementById('step' + step);
    if (stepEl) stepEl.classList.add('active');
    
    for (let i = 1; i < step; i++) {
        const prevStep = document.getElementById('step' + i);
        if (prevStep) prevStep.classList.add('completed');
    }
    
    // Stop timer when going back
    if (step === 1 && paymentTimer) {
        clearInterval(paymentTimer);
        paymentTimer = null;
    }
}

function startPaymentTimer() {
    if (paymentTimer) {
        clearInterval(paymentTimer);
    }
    
    let timeLeft = 15 * 60; // 15 minutes in seconds
    const timerDisplay = document.getElementById('paymentTimer');
    
    if (!timerDisplay) return;
    
    paymentTimer = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(paymentTimer);
            showToast('⏰ Waktu pembayaran habis. Silakan checkout ulang.', 'error');
            closeCheckout();
        }
    }, 1000);
}

function selectPayment(method) {
    selectedPaymentMethod = method;
    document.querySelectorAll('.payment-method').forEach(pm => pm.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    
    // Show payment details
    document.querySelectorAll('.payment-details').forEach(pd => pd.style.display = 'none');
    const selectedDetails = event.currentTarget.querySelector('.payment-details');
    if (selectedDetails) {
        selectedDetails.style.display = 'block';
    }
}

function updateOrderSummary() {
    const summaryDiv = document.getElementById('orderSummaryItems');
    if (!summaryDiv) return;
    
    let html = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        html += `
            <div style="display: flex; justify-content: space-between; padding: 0.7rem 0; border-bottom: 1px solid rgba(139, 92, 246, 0.1);">
                <span>${item.theme} - ${item.package} (x${item.quantity})</span>
                <span>${formatRupiah(itemTotal)}</span>
            </div>
        `;
    });
    
    html += `
        <div style="display: flex; justify-content: space-between; padding: 0.7rem 0;">
            <span>Subtotal</span>
            <span>${formatRupiah(subtotal)}</span>
        </div>
    `;
    
    if (promoApplied && discount > 0) {
        const discountAmount = subtotal * (discount / 100);
        html += `
            <div style="display: flex; justify-content: space-between; padding: 0.7rem 0; color: var(--success); font-weight: 600;">
                <span>🎁 Kode Promo "${currentPromoCode}" (${discount}%)</span>
                <span>- ${formatRupiah(discountAmount)}</span>
            </div>
        `;
        subtotal -= discountAmount;
    }
    
    if (installmentTenor > 1) {
        const installmentAmount = subtotal / installmentTenor;
        const interestRate = installmentTenor === 3 ? 0.03 : 0.025;
        const monthlyPayment = installmentAmount * (1 + interestRate);
        
        html += `
            <div style="display: flex; justify-content: space-between; padding: 0.7rem 0; color: var(--accent-light);">
                <span>💰 Cicilan ${installmentTenor}x</span>
                <span>${formatRupiah(monthlyPayment)}/bulan</span>
            </div>
        `;
    }
    
    html += `
        <div style="display: flex; justify-content: space-between; padding: 1rem 0; margin-top: 0.5rem; border-top: 2px solid rgba(139, 92, 246, 0.3); font-size: 1.2rem; font-weight: 700;">
            <span>Total Pembayaran</span>
            <span style="color: var(--accent);">${formatRupiah(subtotal)}</span>
        </div>
    `;
    
    summaryDiv.innerHTML = html;
}

function processPayment() {
    if (!selectedPaymentMethod) {
        showToast('❌ Pilih metode pembayaran!', 'error');
        return;
    }
    
    if (!paymentFile) {
        if (confirm('⚠️ Anda belum mengunggah bukti pembayaran. Lanjutkan?')) {
            // Continue without proof
        } else {
            return;
        }
    }
    
    const orderId = generateOrderId();
    const orderIdEl = document.getElementById('orderId');
    if (orderIdEl) orderIdEl.textContent = orderId;
    
    // Calculate total
    let totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (promoApplied && discount > 0) {
        totalAmount -= totalAmount * (discount / 100);
    }
    
    // Save order
    const orderData = {
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        totalAmount: totalAmount
    };
    
    saveOrderHistory(orderId, orderData);
    
    // Clear payment timer
    if (paymentTimer) {
        clearInterval(paymentTimer);
        paymentTimer = null;
    }
    
    nextStep(3);
    showToast('✅ Pesanan berhasil dibuat!', 'success');
    
    // Send WhatsApp notification (optional)
    setTimeout(() => {
        const message = encodeURIComponent(
            `Pesanan Baru!\n\n` +
            `Order ID: ${orderId}\n` +
            `Nama: ${orderData.name}\n` +
            `Email: ${orderData.email}\n` +
            `Phone: ${orderData.phone}\n` +
            `Total: ${formatRupiah(totalAmount)}\n` +
            `Metode: ${selectedPaymentMethod.toUpperCase()}\n\n` +
            `Mohon segera diproses.`
        );
       
         window.open(`https://wa.me/62882020411497?text=${message}`, '_blank');
    }, 1000);
}

function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.remove('active');
    
    const step3 = document.getElementById('section3');
    if (step3 && step3.classList.contains('active')) {
        // Clear cart only after successful checkout
        cart = [];
        discount = 0;
        promoApplied = false;
        currentPromoCode = '';
        selectedPaymentMethod = '';
        paymentFile = null;
        installmentTenor = 1;
        saveCart();
        
        // Clear form fields
        const nameInput = document.getElementById('customerName');
        const emailInput = document.getElementById('customerEmail');
        const phoneInput = document.getElementById('customerPhone');
        const notesInput = document.getElementById('customerNotes');
        
        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (phoneInput) phoneInput.value = '';
        if (notesInput) notesInput.value = '';
        
        // Reset promo UI
        const promoInput = document.getElementById('promoCode');
        const discountMsg = document.getElementById('discountMessage');
        const applyBtn = document.getElementById('applyPromoBtn');
        const removeBtn = document.getElementById('removePromoBtn');
        
        if (promoInput) {
            promoInput.value = '';
            promoInput.disabled = false;
            promoInput.style.opacity = '1';
        }
        if (discountMsg) discountMsg.classList.remove('show');
        if (applyBtn) applyBtn.style.display = 'inline-flex';
        if (removeBtn) removeBtn.style.display = 'none';
        
        // Reset upload preview
        const uploadPreview = document.getElementById('uploadPreview');
        if (uploadPreview) uploadPreview.classList.remove('show');
    }
    
    // Clear timer
    if (paymentTimer) {
        clearInterval(paymentTimer);
        paymentTimer = null;
    }
}

// ============ SCROLL TO TOP ============
const scrollTop = document.getElementById('scrollTop');
if (scrollTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============ NAVBAR SCROLL ============
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============ HAMBURGER MENU ============
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ============ COUNTER ANIMATION ============
const counters = document.querySelectorAll('.stat-number[data-target]');
let counterAnimated = false;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 200;

    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(counter), 1);
    } else {
        counter.innerText = target + '+';
    }
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            counterAnimated = true;
            counters.forEach(counter => animateCounter(counter));
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ============ SEARCH THEMES ============
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

function searchThemes() {
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        renderThemes();
        if (clearBtn) clearBtn.style.display = 'none';
        return;
    }
    
    const filtered = themes.filter(theme => 
        theme.name.toLowerCase().includes(query) || 
        theme.tags.toLowerCase().includes(query)
    );
    
    renderThemes(filtered);
    if (clearBtn) clearBtn.style.display = 'flex';
}

if (searchBtn) {
    searchBtn.addEventListener('click', searchThemes);
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchThemes();
        }
    });
    
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            renderThemes();
            if (clearBtn) clearBtn.style.display = 'none';
        }
    });
}

if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        renderThemes();
        searchInput.focus();
    });
}

// ============ MOBILE NAVIGATION ============
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
mobileNavItems.forEach(item => {
    item.addEventListener('click', function(e) {
        // Don't change active state for tracking button
        if (this.getAttribute('onclick')) return;
        
        mobileNavItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// Update active mobile nav on scroll
window.addEventListener('scroll', () => {
    const sections = ['home', 'themes', 'packages', 'contact'];
    let currentSection = '';
    
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = section;
            }
        }
    });
    
    if (currentSection) {
        mobileNavItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && href === `#${currentSection}`) {
                mobileNavItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            }
        });
    }
});

// ============ WHATSAPP POPUP ============
const waButton = document.getElementById('waButton');
const waPopup = document.getElementById('waPopup');
let popupVisible = false;

if (waButton && waPopup) {
    waButton.addEventListener('click', (e) => {
        e.stopPropagation();
        popupVisible = !popupVisible;
        waPopup.style.display = popupVisible ? 'block' : 'none';
    });

    document.addEventListener('click', (e) => {
        if (!waButton.contains(e.target) && !waPopup.contains(e.target)) {
            popupVisible = false;
            waPopup.style.display = 'none';
        }
    });
}

// ============ SMOOTH SCROLL FOR ALL LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============ CONTACT FORM ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = e.target.querySelector('input[type="text"]').value;
        const email = e.target.querySelector('input[type="email"]').value;
        const phone = e.target.querySelector('input[type="tel"]').value;
        const message = e.target.querySelector('textarea').value;
        
        let waMessage = `*PESAN BARU DARI WEBSITE*\n\n`;
        waMessage += `Nama: ${name}\n`;
        waMessage += `Email: ${email}\n`;
        waMessage += `Phone: ${phone}\n\n`;
        waMessage += `Pesan:\n${message}`;
        
        const waUrl = `https://wa.me/62882020411497?text=${encodeURIComponent(waMessage)}`;
        window.open(waUrl, '_blank');
        
        showToast('✅ Terima kasih! Pesan Anda akan segera kami balas.', 'success');
        e.target.reset();
    });
}

// ============ MODAL CLOSE ON OUTSIDE CLICK ============
const checkoutModal = document.getElementById('checkoutModal');
if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
        if (e.target.id === 'checkoutModal') {
            const currentSection = document.querySelector('.checkout-section.active');
            if (currentSection && currentSection.id === 'section3') {
                closeCheckout();
            } else {
                if (confirm('⚠️ Batalkan checkout? Data yang sudah diisi akan hilang.')) {
                    closeCheckout();
                }
            }
        }
    });
}

const orderTrackingModal = document.getElementById('orderTrackingModal');
if (orderTrackingModal) {
    orderTrackingModal.addEventListener('click', (e) => {
        if (e.target.id === 'orderTrackingModal') {
            closeOrderTracking();
        }
    });
}

const cartSidebar = document.getElementById('cartSidebar');
if (cartSidebar) {
    cartSidebar.addEventListener('click', (e) => {
        if (e.target.id === 'cartSidebar') {
            closeCart();
        }
    });
}

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (checkoutModal && checkoutModal.classList.contains('active')) {
            const currentSection = document.querySelector('.checkout-section.active');
            if (currentSection && currentSection.id === 'section3') {
                closeCheckout();
            } else {
                if (confirm('⚠️ Batalkan checkout?')) {
                    closeCheckout();
                }
            }
        }
        
        if (cartSidebar && cartSidebar.classList.contains('active')) {
            closeCart();
        }
        
        if (orderTrackingModal && orderTrackingModal.classList.contains('active')) {
            closeOrderTracking();
        }
        
        if (popupVisible && waPopup) {
            popupVisible = false;
            waPopup.style.display = 'none';
        }
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
            scrollToSection('themes');
        }
    }
});

// ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .theme-card, .package-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// ============ FILE UPLOAD ============
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('paymentProof');
const uploadPreview = document.getElementById('uploadPreview');

if (uploadArea && fileInput) {
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });
}

function handleFile(file) {
    if (file.size > 5 * 1024 * 1024) {
        showToast('❌ File terlalu besar! Maksimal 5MB', 'error');
        return;
    }
    
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
        showToast('❌ Format file tidak valid! Gunakan PNG, JPG, atau PDF', 'error');
        return;
    }
    
    paymentFile = file;
    const fileName = document.getElementById('fileName');
    if (fileName) fileName.textContent = file.name;
    if (uploadPreview) uploadPreview.classList.add('show');
    
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.getElementById('previewImage');
            if (img) {
                img.src = e.target.result;
                img.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
    } else {
        const img = document.getElementById('previewImage');
        if (img) img.style.display = 'none';
    }
    
    showToast('✅ Bukti pembayaran berhasil diunggah!', 'success');
}

// ============ COPY TO CLIPBOARD ============
function copyToClipboard(text, event) {
    event.stopPropagation();
    
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            btn.innerHTML = '✅ Tersalin!';
            btn.classList.add('copied');
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('copied');
            }, 2000);
            
            showToast('📋 Nomor rekening berhasil disalin!', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showToast('📋 Nomor rekening berhasil disalin!', 'success');
    } catch (err) {
        showToast('❌ Gagal menyalin. Silakan salin manual.', 'error');
    }
    
    document.body.removeChild(textarea);
}

// ============ SELECT INSTALLMENT ============
function selectInstallment(tenor, element) {
    installmentTenor = tenor;
    document.querySelectorAll('.installment-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    updateOrderSummary();
}

// ============ INITIALIZE APP ============
function initApp() {
    console.log('🎉 Initializing Lunavia Digital...');
    
    loadCart();
    loadOrderHistory();
    renderThemes();
    
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        console.log('✅ Saved theme:', savedTheme);
    }
    
    console.log('✅ Lunavia Digital initialized successfully!');
    console.log('📦 Cart items:', cart.length);
    console.log('📋 Order history:', orderHistory.length);
    console.log('🎨 Available themes:', themes.length);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// ============ CONSOLE BRANDING ============
console.log('%c🌟 Lunavia Digital', 'font-size: 24px; font-weight: bold; color: #8b5cf6;');
console.log('%cPremium Wedding Invitations', 'font-size: 14px; color: #fbbf24;');
console.log('%cVersion: 4.1.0 - Fixed & Optimized', 'font-size: 12px; color: #a78bfa;');
console.log('%c© 2025 Auralis Group', 'font-size: 12px; color: #a1a1aa;');
console.log('%c\n✨ All bugs fixed! Ready to use!', 'font-size: 11px; color: #10b981; font-style: italic;');