/**
 * MANAGOLD OFFICIAL SCRIPT v2.0
 * Performance & Estética Futurista
 */

// ==========================================
// 1. ESTADO GLOBAL E SELEÇÃO (PRODUTO)
// ==========================================
let selectedProduct = {
    id: 101,
    name: "Camiseta Boxy Gold Edition",
    price: 149.90,
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
    size: null,
    color: "Dourado"
};

// Seleção de Tamanho na página de produto
function selectSize(element, size) {
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active-size'));
    element.classList.add('active-size');
    selectedProduct.size = size;
}

// Seleção de Cor na página de produto
function selectColor(element, color) {
    document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('active-color'));
    element.classList.add('active-color');
    selectedProduct.color = color;
}

// Validação e ação de adicionar à sacola
function handleAddToCart() {
    if (!selectedProduct.size) {
        showToast("Selecione um tamanho primeiro!");
        return;
    }

    addToCart({
        id: `${selectedProduct.id}-${selectedProduct.size}-${selectedProduct.color}`,
        name: selectedProduct.name,
        price: selectedProduct.price,
        size: selectedProduct.size,
        color: selectedProduct.color,
        img: selectedProduct.img
    });
}

// ==========================================
// 2. SISTEMA DE SACOLA COM PERSISTÊNCIA
// ==========================================
let cart = JSON.parse(localStorage.getItem('managold_cart')) || [];

function saveCart() {
    localStorage.setItem('managold_cart', JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(product) {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    saveCart();
    showToast(`${product.name} adicionado à sacola.`);
}

function updateCartBadge() {
    const cartBadge = document.querySelector('#cart-count-badge');
    if (cartBadge) {
        const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
        cartBadge.innerText = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        
        cartBadge.classList.add('animate-bounce');
        setTimeout(() => cartBadge.classList.remove('animate-bounce'), 1000);
    }
}

// ==========================================
// 3. TELA DE CARREGAMENTO (PRELOADER)
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progress-bar');
    const percentText = document.getElementById('percent');
    
    if (preloader) {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 1000);
                }, 500);
            } else {
                width += Math.floor(Math.random() * 15) + 5;
                if (width > 100) width = 100;
                if (progressBar) progressBar.style.width = width + '%';
                if (percentText) percentText.innerText = width + '%';
            }
        }, 80);
    }
});

// ==========================================
// 4. NOTIFICAÇÃO TOAST (ESTILO MANAGOLD)
// ==========================================
function showToast(message) {
    const oldToast = document.querySelector('.toast-container');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-container';
    toast.innerHTML = `
        <div class="flex items-center gap-3">
            <div class="w-2 h-2 bg-gold-500 animate-pulse"></div>
            <span class="text-[10px] font-black tracking-widest uppercase">${message}</span>
        </div>
        <div class="toast-progress"></div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// ==========================================
// 5. INICIALIZAÇÃO DE COMPONENTES E EVENTOS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();

    // Filtro de Categorias (Somente na Loja)
    const filterButtons = document.querySelectorAll('#shop button');
    const productCards = document.querySelectorAll('.product-card-container');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.innerText.toLowerCase();
                
                // Reset de estilos dos botões de filtro
                filterButtons.forEach(b => b.className = "text-gray-500 hover:text-gold-500 font-bold text-[10px] tracking-widest uppercase transition-colors");
                
                // Estilo do botão ativo
                btn.className = "text-white hover:text-gold-500 font-bold text-[10px] tracking-widest uppercase border-b-2 border-gold-600 pb-1";

                productCards.forEach(card => {
                    const badge = card.querySelector('span');
                    if (badge) {
                        const label = badge.innerText.toLowerCase();
                        card.style.display = (category === 'tudo' || label.includes(category)) ? 'block' : 'none';
                    }
                });
            });
        });
    }

    // Controle do Menu Mobile
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu && closeBtn) {
        mobileBtn.onclick = () => { 
            mobileMenu.classList.remove('hidden'); 
            document.body.style.overflow = 'hidden'; 
        };
        closeBtn.onclick = () => { 
            mobileMenu.classList.add('hidden'); 
            document.body.style.overflow = 'auto'; 
        };
        
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.onclick = () => {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = 'auto';
            };
        });
    }

    // Inicialização do AOS (Animações de Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }
});