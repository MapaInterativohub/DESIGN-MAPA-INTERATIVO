// FavoritosManager.js - VERSÃO CORRIGIDA
console.log('FavoritosManager.js carregado');

class FavoritosManager {
    constructor() {
        this.favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        this.historico = JSON.parse(localStorage.getItem('historico')) || [];
        this.init();
    }

    init() {
        console.log('Inicializando FavoritosManager...');
        console.log('Favoritos carregados:', this.favoritos.length);
        this.renderizarFavoritos();
        this.renderizarHistorico();
    }

    adicionarFavorito(local) {
        console.log('=== ADICIONANDO FAVORITO ===');
        console.log('Local recebido:', local);
        
        // Verifica se já existe
        const jaExiste = this.favoritos.some(fav => fav.nome === local.nome);
        console.log('Já existe nos favoritos?', jaExiste);
        
        if (!jaExiste) {
            const novoFavorito = {
                nome: local.nome,
                categoria: local.categoria,
                endereco: local.endereco || 'Endereço não informado',
                telefone: local.telefone || 'Telefone não informado',
                dataAdicao: new Date().toLocaleDateString('pt-BR')
            };
            
            this.favoritos.push(novoFavorito);
            this.salvarNoLocalStorage();
            this.renderizarFavoritos();
            
            console.log('Favorito adicionado:', novoFavorito);
            this.mostrarNotificacao(`${local.nome} foi adicionado aos favoritos!`, 'success');
            return true;
        } else {
            console.log('Local já está nos favoritos');
            this.mostrarNotificacao('Este local já está nos favoritos!', 'warning');
            return false;
        }
    }

    removerFavorito(nomeLocal) {
        console.log('Removendo favorito:', nomeLocal);
        this.favoritos = this.favoritos.filter(fav => fav.nome !== nomeLocal);
        this.salvarNoLocalStorage();
        this.renderizarFavoritos();
        this.mostrarNotificacao('Local removido dos favoritos!', 'info');
    }

    adicionarHistorico(local) {
        const visita = {
            nome: local.nome,
            categoria: local.categoria,
            dataVisita: new Date().toLocaleString('pt-BR')
        };

        this.historico = this.historico.filter(h => h.nome !== local.nome);
        this.historico.unshift(visita);

        if (this.historico.length > 10) {
            this.historico = this.historico.slice(0, 10);
        }

        this.salvarNoLocalStorage();
        this.renderizarHistorico();
    }

    renderizarFavoritos() {
        const container = document.getElementById('favoritos-lista');
        if (!container) {
            console.log('Container de favoritos não encontrado');
            return;
        }
        
        console.log('Renderizando favoritos:', this.favoritos.length);
        
        if (this.favoritos.length === 0) {
            container.innerHTML = '<p class="sem-favoritos">Nenhum local favoritado ainda</p>';
            return;
        }

        container.innerHTML = this.favoritos.map(fav => `
            <div class="favorito-item">
                <h4>${this.escapeHtml(fav.nome)}</h4>
                <p><strong>Categoria:</strong> ${this.escapeHtml(fav.categoria)}</p>
                <p><strong>Endereço:</strong> ${this.escapeHtml(fav.endereco)}</p>
                <p><strong>Telefone:</strong> ${this.escapeHtml(fav.telefone)}</p>
                <p><small><strong>Adicionado em:</strong> ${fav.dataAdicao}</small></p>
                <button class="btn-remover-favorito" onclick="favoritosManager.removerFavorito('${this.escapeHtml(fav.nome)}')">
                    ❌ Remover
                </button>
            </div>
        `).join('');
    }

    renderizarHistorico() {
        const container = document.getElementById('historico-lista');
        if (!container) {
            console.log('Container de histórico não encontrado');
            return;
        }
        
        if (this.historico.length === 0) {
            container.innerHTML = '<p class="sem-historico">Nenhum local visitado ainda</p>';
            return;
        }

        container.innerHTML = this.historico.map(hist => `
            <div class="historico-item">
                <h4>${this.escapeHtml(hist.nome)}</h4>
                <p><strong>Categoria:</strong> ${this.escapeHtml(hist.categoria)}</p>
                <p><small><strong>Visitado em:</strong> ${hist.dataVisita}</small></p>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    salvarNoLocalStorage() {
        localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
        localStorage.setItem('historico', JSON.stringify(this.historico));
        console.log('Dados salvos no localStorage');
    }

    mostrarNotificacao(mensagem, tipo) {
        // Sistema simples de alerta
        alert(`[${tipo.toUpperCase()}] ${mensagem}`);
    }

    // No FavoritosManager.js, adicione estas funções:

obterFavoritosParaPDF() {
    return this.favoritos.map(fav => ({
        nome: fav.nome,
        categoria: fav.categoria,
        endereco: fav.endereco,
        telefone: fav.telefone,
        dataAdicao: fav.dataAdicao
    }));
}

// Função para forçar atualização da UI
forcarAtualizacaoUI() {
    this.renderizarFavoritos();
    this.renderizarHistorico();
    
    // Disparar evento personalizado para outros componentes
    window.dispatchEvent(new CustomEvent('favoritosAtualizados', {
        detail: { favoritos: this.favoritos }
    }));
}
}

// Instância global
window.favoritosManager = new FavoritosManager();

// === FAVORITAR LOCAIS ===
window.favoritarLocalSafe = function(nome, categoria, endereco, telefone) {
    console.log('=== BOTÃO FAVORITAR CLICADO (GLOBAL) ===');
    console.log('Dados recebidos:', { nome, categoria, endereco, telefone });
    
    if (!window.favoritosManager) {
        console.error('favoritosManager não disponível');
        alert('Erro: Sistema de favoritos não carregado.');
        return;
    }
    
    const local = {
        nome: nome,
        categoria: categoria,
        endereco: endereco,
        telefone: telefone
    };
    
    console.log('Tentando adicionar favorito:', local);
    const sucesso = window.favoritosManager.adicionarFavorito(local);
    
    if (sucesso) {
        console.log('Favorito adicionado com sucesso!');
        // Fecha o popup se o mapa estiver disponível
        if (window.mapaGlobal) {
            window.mapaGlobal.closePopup();
        }
    }
};