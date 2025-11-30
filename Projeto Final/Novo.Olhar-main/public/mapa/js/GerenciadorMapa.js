// js/GerenciadorMapa.js - SISTEMA CENTRAL DE CONTROLE
console.log('GerenciadorMapa.js carregado');
fetch("http://localhost:3001/api/locais")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error("Erro:", error));
class GerenciadorMapa {


    constructor() {
        this.marcadores = [];
        this.filtroAtual = "Todos";
        this.pesquisaAtual = "";
        this.locais = this.carregarLocais();
        this.init();
    }

    init() {
        console.log('Inicializando GerenciadorMapa...');
        this.criarTodosMarcadores();
    }

    carregarLocais() {
        return [
            {
                nome: "Biblioteca Central",
                categoria: "Estudos",
                coordenadas: [-20.3155, -40.3128],
                endereco: "Av. Fernando Ferrari, 514 - Goiabeiras",
                telefone: "(27) 3335-2500"
            },
            {
                nome: "CRAS Vitória",
                categoria: "Serviços Sociais",
                coordenadas: [-20.2825, -40.3089],
                endereco: "R. São João, 123 - Centro",
                telefone: "(27) 3382-6000"
            },
            {
                nome: "Delegacia da Mulher",
                categoria: "Segurança",
                coordenadas: [-20.2911, -40.3009],
                endereco: "Av. N.S. da Penha, 1230 - Santa Luíza",
                telefone: "(27) 3198-5981"
            },
            {
                nome: "Agência de Emprego",
                categoria: "Trabalho",
                coordenadas: [-20.3200, -40.3400],
                endereco: "R. Duarte Lopes, 87 - Jardim da Penha",
                telefone: "(27) 3333-4444"
            },
            {
                nome: "Hospital Universitário",
                categoria: "Saúde",
                coordenadas: [-20.3000, -40.3200],
                endereco: "R. Prof. Fernando Duarte Rabelo, 100 - Goiabeiras",
                telefone: "(27) 3335-7200"
            }
        ];
    }

    criarTodosMarcadores() {
        this.removerTodosMarcadores();
        this.locais.forEach(local => this.criarMarcador(local));
    }

    criarMarcador(local) {
        const marcador = L.marker(local.coordenadas).addTo(window.mapaGlobal);

        const popupContent = `
            <div class="popup-content">
                <h3>${local.nome}</h3>
                <p><strong>Categoria:</strong> ${local.categoria}</p>
                <p><strong>Endereço:</strong> ${local.endereco}</p>
                <p><strong>Telefone:</strong> ${local.telefone}</p>
                <br>
                <button class="popup-btn favoritar-btn" 
                        onclick="favoritarLocalSafe('${local.nome}', '${local.categoria}', '${local.endereco}', '${local.telefone}')">
                    ⭐ Favoritar
                </button>
            </div>
        `;

        marcador.bindPopup(popupContent);

        marcador.on('click', () => {
            if (window.favoritosManager) {
                window.favoritosManager.adicionarHistorico(local);
            }
        });

        this.marcadores.push(marcador);
        return marcador;
    }

    removerTodosMarcadores() {
        this.marcadores.forEach(marcador => {
            if (window.mapaGlobal && marcador) {
                window.mapaGlobal.removeLayer(marcador);
            }
        });
        this.marcadores = [];
    }

    aplicarFiltro(categoria) {
        console.log('Aplicando filtro:', categoria);
        this.filtroAtual = categoria;
        this.atualizarMapa();
    }

    aplicarPesquisa(termo) {
        console.log('Aplicando pesquisa:', termo);
        this.pesquisaAtual = termo.toLowerCase().trim();
        this.atualizarMapa();
    }

    atualizarMapa() {
        this.removerTodosMarcadores();

        let locaisFiltrados = this.locais;

        // Aplica filtro de categoria
        if (this.filtroAtual !== "Todos") {
            locaisFiltrados = locaisFiltrados.filter(local =>
                local.categoria === this.filtroAtual
            );
        }

        // Aplica pesquisa
        if (this.pesquisaAtual) {
            locaisFiltrados = locaisFiltrados.filter(local =>
                local.nome.toLowerCase().includes(this.pesquisaAtual) ||
                local.categoria.toLowerCase().includes(this.pesquisaAtual) ||
                local.endereco.toLowerCase().includes(this.pesquisaAtual) ||
                local.telefone.includes(this.pesquisaAtual)
            );
        }

        console.log(`Mostrando ${locaisFiltrados.length} locais`);

        // Cria marcadores filtrados
        locaisFiltrados.forEach(local => this.criarMarcador(local));

        // Mostra mensagem se não houver resultados
        this.mostrarMensagemResultados(locaisFiltrados.length);
    }

    mostrarMensagemResultados(totalResultados) {
        // Remove mensagem anterior
        this.removerMensagemResultados();

        if (totalResultados === 0 && (this.filtroAtual !== "Todos" || this.pesquisaAtual)) {
            const mensagem = document.createElement('div');
            mensagem.id = 'mensagem-sem-resultados';
            mensagem.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255,255,255,0.95);
                padding: 25px;
                border-radius: 12px;
                text-align: center;
                box-shadow: 0 6px 20px rgba(0,0,0,0.15);
                z-index: 500;
                font-family: Arial, sans-serif;
                max-width: 320px;
                border: 2px solid #e74c3c;
            `;

            let textoMensagem = '';
            if (this.pesquisaAtual && this.filtroAtual !== "Todos") {
                textoMensagem = `Nenhum resultado para "${this.pesquisaAtual}" na categoria ${this.filtroAtual}`;
            } else if (this.pesquisaAtual) {
                textoMensagem = `Nenhum resultado para "${this.pesquisaAtual}"`;
            } else {
                textoMensagem = `Nenhum local na categoria ${this.filtroAtual}`;
            }

            mensagem.innerHTML = `
                <div style="font-size: 48px; margin-bottom: 15px; color: #e74c3c;">🔍</div>
                <h3 style="margin: 0 0 12px 0; color: #2c3e50;">Nenhum resultado</h3>
                <p style="margin: 0 0 20px 0; color: #666; line-height: 1.4;">${textoMensagem}</p>
                <button onclick="gerenciadorMapa.limparFiltros()" 
                        style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    Mostrar Todos
                </button>
            `;

            document.getElementById('map').appendChild(mensagem);
        }
    }

    removerMensagemResultados() {
        const mensagem = document.getElementById('mensagem-sem-resultados');
        if (mensagem) {
            mensagem.remove();
        }
    }

    limparFiltros() {
        this.filtroAtual = "Todos";
        this.pesquisaAtual = "";
        this.atualizarMapa();

        // Limpa input de pesquisa
        const inputPesquisa = document.getElementById('search-input');
        if (inputPesquisa) {
            inputPesquisa.value = '';
        }

        // Reseta botões de filtro
        const botoesFiltro = document.querySelectorAll('.filter-btn');
        botoesFiltro.forEach(botao => botao.classList.remove('ativo'));
        const btnTodos = document.querySelector('.filter-btn[data-category="Todos"]');
        if (btnTodos) {
            btnTodos.classList.add('ativo');
        }
    }
}

// Instância global
window.gerenciadorMapa = new GerenciadorMapa();