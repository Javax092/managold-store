// 1. Carrinho de Compras (Simulação)
let cartCount = 0;
// Seleciona o badge em qualquer página que ele apareça
const cartBadge = document.querySelector('.absolute.-top-2.-right-2');

function addToCart() {
    cartCount++;
    if (cartBadge) {
        cartBadge.innerText = cartCount;
        cartBadge.classList.add('animate-bounce');
        setTimeout(() => cartBadge.classList.remove('animate-bounce'), 1000);
    }
    // Opcional: Você pode substituir o alert por um console.log ou um toast customizado
    console.log("Produto adicionado à Managold Bag! 🔥");
}

// Adiciona o evento de clique em todos os botões que contêm "Adicionar"
document.querySelectorAll('button').forEach(button => {
    if (button.innerText.toUpperCase().includes('ADICIONAR')) {
        button.addEventListener('click', addToCart);
    }
});

// 2. Filtro de Categorias (Protegido com IF para não dar erro fora da Index)
const filterButtons = document.querySelectorAll('#shop .flex.gap-4 button');
const productCards = document.querySelectorAll('.group.relative');

if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.innerText.toLowerCase();
            
            // Estilo do botão ativo
            filterButtons.forEach(b => b.className = "text-gray-500 hover:text-gold-500 font-bold text-xs tracking-widest uppercase transition-colors");
            btn.className = "text-white hover:text-gold-500 font-bold text-xs tracking-widest uppercase border-b-2 border-gold-600 pb-1";

            // Lógica de esconder/mostrar
            productCards.forEach(card => {
                const badge = card.querySelector('span');
                if (badge) {
                    const label = badge.innerText.toLowerCase();
                    if (category === 'tudo' || label.includes(category)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// 3. Controle do Menu Mobile (Protegido para todas as páginas)
const mobileBtn = document.getElementById('mobile-menu-btn');
const closeBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileBtn && mobileMenu && closeBtn) {
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Fecha o menu ao clicar em qualquer link dentro dele
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    });
}