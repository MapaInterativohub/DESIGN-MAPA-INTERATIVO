// Pesquisar.js - SISTEMA DE PESQUISA CORRIGIDO
console.log('Pesquisar.js carregado');

class SistemaPesquisa {
    constructor() {
        this.pesquisaAtiva = '';
        this.timeoutPesquisa = null;
        this.init();
    }

    init() {
        console.log('Inicializando SistemaPesquisa...');
        this.configurarPesquisa();
    }

    configurarPesquisa() {
        const input = document.getElementById('search-input');
        if (input) {
            input.addEventListener('input', (e) => {
                this.pesquisaAtiva = e.target.value;
                console.log('Pesquisando por:', this.pesquisaAtiva);
                
                // Debounce para não sobrecarregar
                clearTimeout(this.timeoutPesquisa);
                this.timeoutPesquisa = setTimeout(() => {
                    this.aplicarPesquisa();
                }, 300);
            });
            
            // Tecla Enter para pesquisa imediata
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.aplicarPesquisa();
                }
            });
            
            this.adicionarBotaoLimparPesquisa();
            console.log('Sistema de pesquisa configurado');
        }
    }

    aplicarPesquisa() {
        console.log('Aplicando pesquisa:', this.pesquisaAtiva);
        
        if (window.sistemaDeFiltros) {
            window.sistemaDeFiltros.aplicarPesquisa(this.pesquisaAtiva);
        }
    }

    adicionarBotaoLimparPesquisa() {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer && !document.getElementById('btn-limpar-pesquisa')) {
            const btnLimpar = document.createElement('button');
            btnLimpar.id = 'btn-limpar-pesquisa';
            btnLimpar.innerHTML = '✕';
            btnLimpar.style.cssText = `
                background: none;
                border: none;
                color: #757575;
                cursor: pointer;
                font-size: 16px;
                padding: 0;
                margin-left: 5px;
                display: none;
            `;
            
            btnLimpar.addEventListener('click', () => {
                const input = document.getElementById('search-input');
                if (input) {
                    input.value = '';
                    this.pesquisaAtiva = '';
                    this.aplicarPesquisa();
                    btnLimpar.style.display = 'none';
                }
            });
            
            searchContainer.appendChild(btnLimpar);
            
            // Mostrar/ocultar botão baseado no conteúdo
            const input = document.getElementById('search-input');
            input.addEventListener('input', function() {
                const btnLimpar = document.getElementById('btn-limpar-pesquisa');
                if (btnLimpar) {
                    btnLimpar.style.display = this.value ? 'block' : 'none';
                }
            });
        }
    }

    limparPesquisa() {
        const input = document.getElementById('search-input');
        if (input) {
            input.value = '';
            this.pesquisaAtiva = '';
            this.aplicarPesquisa();
        }
        
        const btnLimpar = document.getElementById('btn-limpar-pesquisa');
        if (btnLimpar) {
            btnLimpar.style.display = 'none';
        }
    }
}

// Instância global
window.sistemaPesquisa = new SistemaPesquisa();

// Função global para compatibilidade
window.limparPesquisa = function() {
    if (window.sistemaPesquisa) {
        window.sistemaPesquisa.limparPesquisa();
    }
};