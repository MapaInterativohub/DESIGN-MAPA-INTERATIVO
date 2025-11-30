// SistemaDeFiltros.js - VERSÃO COMPLETA COM BOTÕES DINÂMICOS
console.log('SistemaDeFiltros.js carregado');

class SistemaDeFiltros {
    constructor() {
        this.filtroAtual = "Todos";
        this.pesquisaAtual = "";
        this.todosMarcadores = [];
        this.locaisCache = [];
        this.init();
    }

    async init() {
        console.log('Inicializando SistemaDeFiltros...');

        this.configurarEventosFiltros();

        // 🔥 Carregar categorias dinâmicas logo no início
        await this.carregarCategoriasDinamicas();

        this.aguardarMapaPronto()
            .then(() => this.criarTodosMarcadores())
            .catch(error => console.error('Erro ao aguardar mapa:', error));
    }

    aguardarMapaPronto() {
        return new Promise((resolve, reject) => {
            const verificarMapa = () => {
                if (window.mapaGlobal && window.mapaInicializado) {
                    resolve();
                } else {
                    console.log('Aguardando mapa ficar pronto...');
                    setTimeout(verificarMapa, 100);
                }
            };
            verificarMapa();
            setTimeout(() => reject(new Error('Timeout: Mapa não ficou pronto')), 5000);
        });
    }

    async criarTodosMarcadores() {
        console.log('Criando todos os marcadores...');

        this.removerTodosMarcadores();

        const locais = await this.obterTodosLocais();
        this.locaisCache = locais;

        locais.forEach(local => {
            if (!window.mapaGlobal) {
                console.error('Mapa não disponível para criar marcador');
                return;
            }

            try {
                const marcador = L.marker(local.coordenadas).addTo(window.mapaGlobal);

                const popupContent = `
                    <div class="popup-content">
                        <h3>${local.nome}</h3>
                        <p><strong>Categoria:</strong> ${local.categoria}</p>
                        <p><strong>Endereço:</strong> ${local.endereco}</p>
                        <p><strong>Telefone:</strong> ${local.telefone}</p>
                        <br>
                        <button class="popup-btn favoritar-btn" 
                            onclick="favoritarLocalSafe('${this.escapeString(local.nome)}', '${this.escapeString(local.categoria)}', '${this.escapeString(local.endereco)}', '${this.escapeString(local.telefone)}')">
                            ⭐ Favoritar
                        </button>
                    </div>
                `;

                marcador.bindPopup(popupContent);

                marcador.on('click', () => {
                    if (window.favoritosManager)
                        window.favoritosManager.adicionarHistorico(local);
                });

                this.todosMarcadores.push({ marcador, local });
            } catch (error) {
                console.error('Erro ao criar marcador:', error, local);
            }
        });

        console.log(`${this.todosMarcadores.length} marcadores criados com sucesso`);
        this.aplicarFiltro("Todos");
    }

    escapeString(str) {
        return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
    }

    configurarEventosFiltros() {
        const botoesFiltro = document.querySelectorAll('.filter-btn');

        botoesFiltro.forEach(botao => {
            botao.addEventListener('click', () => {
                botoesFiltro.forEach(b => b.classList.remove('ativo'));
                botao.classList.add('ativo');
                this.aplicarFiltro(botao.dataset.category);
            });
        });

        console.log('Eventos de filtro configurados');
    }

    aplicarFiltro(categoria) {
        console.log('Aplicando filtro:', categoria);
        this.filtroAtual = categoria;
        this.atualizarVisibilidadeMarcadores();
    }

    aplicarPesquisa(termo) {
        console.log('Aplicando pesquisa:', termo);
        this.pesquisaAtual = termo.toLowerCase().trim();
        this.atualizarVisibilidadeMarcadores();
    }

    atualizarVisibilidadeMarcadores() {
        console.log('Atualizando visibilidade dos marcadores...');
        let visiveis = 0;

        this.todosMarcadores.forEach(({ marcador, local }) => {
            let mostrar = true;

            if (this.filtroAtual !== "Todos" && local.categoria !== this.filtroAtual)
                mostrar = false;

            if (mostrar && this.pesquisaAtual) {
                const termo = this.pesquisaAtual;
                const corresponde =
                    local.nome.toLowerCase().includes(termo) ||
                    local.categoria.toLowerCase().includes(termo) ||
                    local.endereco.toLowerCase().includes(termo) ||
                    local.telefone.includes(termo);

                if (!corresponde) mostrar = false;
            }

            if (mostrar) {
                if (!window.mapaGlobal.hasLayer(marcador)) marcador.addTo(window.mapaGlobal);
                visiveis++;
            } else {
                if (window.mapaGlobal.hasLayer(marcador)) window.mapaGlobal.removeLayer(marcador);
            }
        });

        console.log(`${visiveis} marcadores visíveis`);
        this.mostrarMensagemResultados(visiveis);
    }

    mostrarMensagemResultados(visiveis) {
        this.removerMensagemResultados();
        if (visiveis === 0 && (this.filtroAtual !== "Todos" || this.pesquisaAtual)) {
            const msg = document.createElement('div');
            msg.id = 'mensagem-sem-resultados';
            msg.style.cssText = `
                position: absolute;
                top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255,255,255,0.95);
                padding: 25px;
                border-radius: 12px;
                text-align: center;
                box-shadow: 0 6px 20px rgba(0,0,0,0.15);
                z-index: 500;
                max-width: 320px;
                border: 2px solid #e74c3c;
            `;

            let texto = "";
            if (this.pesquisaAtual && this.filtroAtual !== "Todos")
                texto = `Nenhum resultado para "${this.pesquisaAtual}" na categoria ${this.filtroAtual}`;
            else if (this.pesquisaAtual)
                texto = `Nenhum resultado para "${this.pesquisaAtual}"`;
            else
                texto = `Nenhum local na categoria ${this.filtroAtual}`;

            msg.innerHTML = `
                <div style="font-size: 48px; margin-bottom: 15px; color: #e74c3c;">🔍</div>
                <h3 style="margin: 0 0 12px 0;">Nenhum resultado</h3>
                <p style="margin: 0 0 20px 0;">${texto}</p>
                <button onclick="sistemaDeFiltros.limparFiltros()" 
                    style="padding: 10px 20px; background: #3498db; color: white; border-radius: 6px;">
                    Mostrar Todos
                </button>
            `;
            document.getElementById('map').appendChild(msg);
        }
    }

    removerMensagemResultados() {
        const msg = document.getElementById('mensagem-sem-resultados');
        if (msg) msg.remove();
    }

    limparFiltros() {
        this.filtroAtual = "Todos";
        this.pesquisaAtual = "";

        const input = document.getElementById('search-input');
        if (input) input.value = "";

        const botoes = document.querySelectorAll('.filter-btn');
        botoes.forEach(b => b.classList.remove('ativo'));

        const btnTodos = document.querySelector('.filter-btn[data-category="Todos"]');
        if (btnTodos) btnTodos.classList.add('ativo');

        this.atualizarVisibilidadeMarcadores();
    }

    removerTodosMarcadores() {
        this.todosMarcadores.forEach(({ marcador }) => {
            if (window.mapaGlobal && marcador) {
                window.mapaGlobal.removeLayer(marcador);
            }
        });
        this.todosMarcadores = [];
    }

    // 🔥 MAPEAR API → OBJETO PADRÃO
    async obterTodosLocais() {
        try {
            const res = await fetch("http://localhost:3001/api/locais");
            const dados = await res.json();

            return dados.map(item => ({
                nome: item.nome,
                categoria: item.categoria.nome,
                coordenadas: [item.latitude, item.longitude],
                endereco: item.rua,
                telefone: item.telefone
            }));

        } catch (e) {
            console.error("Erro ao buscar API:", e);
            return [];
        }
    }

    // ---------------------------------------------------
    // 🔥 NOVO: CRIAR BOTÕES DE FILTRO DINAMICAMENTE
    // ---------------------------------------------------
    async carregarCategoriasDinamicas() {
        try {
            const res = await fetch("http://localhost:3001/api/locais");
            const dados = await res.json();

            const categorias = [...new Set(dados.map(i => i.categoria.nome))];

            this.criarBotoesCategoriasDinamicos(categorias);

        } catch (erro) {
            console.error("Erro ao carregar categorias:", erro);
        }
    }

    criarBotoesCategoriasDinamicos(categorias) {
        const container = document.querySelector(".filters");
        if (!container) return;

        categorias.forEach(cat => {
            const existe = container.querySelector(`button[data-category="${cat}"]`);
            if (existe) return;

            const btn = document.createElement("button");
            btn.classList.add("filter-btn");
            btn.dataset.category = cat;
            btn.textContent = cat;

            btn.addEventListener("click", () => {
                document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("ativo"));
                btn.classList.add("ativo");
                this.aplicarFiltro(cat);
            });

            container.appendChild(btn);
        });
    }
}

window.sistemaDeFiltros = new SistemaDeFiltros();
