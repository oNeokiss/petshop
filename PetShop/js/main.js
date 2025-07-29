document.addEventListener('DOMContentLoaded', () => {

    /**
     * =======================================================
     * FUNÇÕES REUTILIZÁVEIS
     * =======================================================
     */

    // Função para filtrar produtos por termo de busca (texto)
    function filterProductsBySearch(searchTerm) {
        const productCards = document.querySelectorAll('#product-list .product-card');
        const term = searchTerm.toLowerCase();

        productCards.forEach(card => {
            const titleElement = card.querySelector('.product-title');
            if (titleElement && titleElement.textContent.toLowerCase().includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Função para filtrar produtos por categoria (botões)
    function filterProductsByCategory(filter) {
        const productCards = document.querySelectorAll('#product-list .product-card');
        
        productCards.forEach(card => {
            if (filter === 'todos' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }


    /**
     * =======================================================
     * LÓGICA DA PÁGINA DE PRODUTOS
     * =======================================================
     */

    // Ativa os botões de filtro de categoria na página de produtos
    const filterButtons = document.querySelectorAll('.filtro-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');
                filterProductsByCategory(filter);
            });
        });
    }


    /**
     * =======================================================
     * LÓGICA DA BARRA DE BUSCA (GLOBAL)
     * =======================================================
     */

    // Ativa a funcionalidade da barra de busca em todas as páginas
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchInput = searchForm.querySelector('input[name="q"]');
            const searchTerm = searchInput.value.trim();
            const currentPage = window.location.pathname;

            if (currentPage.includes('produtos.html')) {
                filterProductsBySearch(searchTerm);
            } else {
                // Ajusta o caminho para redirecionar corretamente
                let productsPagePath = currentPage.includes('/html/') ? 'produtos.html' : 'html/produtos.html';
                window.location.href = `${productsPagePath}?q=${encodeURIComponent(searchTerm)}`;
            }
        });
    }


    /**
     * =======================================================
     * LÓGICA DE PÁGINAS ESPECÍFICAS (AO CARREGAR)
     * =======================================================
     */

    const currentPagePath = window.location.pathname;

    // --- Se estiver na página de PRODUTOS ---
    if (currentPagePath.includes('produtos.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Verifica se há um termo de busca na URL (?q=...)
        const searchQuery = urlParams.get('q');
        if (searchQuery) {
            const searchInput = document.querySelector('.search-bar input[name="q"]');
            if (searchInput) searchInput.value = searchQuery;
            filterProductsBySearch(searchQuery);
        }
        
        // Verifica se há uma categoria na URL (?category=...)
        const categoryQuery = urlParams.get('category');
        if (categoryQuery) {
            const targetButton = document.querySelector(`.filtro-btn[data-filter="${categoryQuery}"]`);
            if (targetButton) {
                targetButton.click(); // Simula o clique no botão
            }
        }
    }

    // --- Se estiver na página de CONTATO ---
    if (currentPagePath.includes('contato.html')) {
        const contatoForm = document.querySelector('#contato-page form');
        const mensagemSucesso = document.getElementById('mensagem-sucesso');

        if (contatoForm && mensagemSucesso) {
            contatoForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Impede o recarregamento

                // Mostra a mensagem de sucesso
                mensagemSucesso.classList.add('visivel');

                // Limpa o formulário
                contatoForm.reset();
                
                // Esconde a mensagem após 5 segundos
                setTimeout(() => {
                    mensagemSucesso.classList.remove('visivel');
                }, 5000);
            });
        }
    }

});