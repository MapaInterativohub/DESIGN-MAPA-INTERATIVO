// SistemaDeFiltros.js - VERSÃO COMPLETAMENTE CORRIGIDA
console.log('SistemaDeFiltros.js carregado');

class SistemaDeFiltros {
    constructor() {
        this.filtroAtual = "Todos";
        this.pesquisaAtual = "";
        this.todosMarcadores = [];
        this.init();
    }

    init() {
        console.log('Inicializando SistemaDeFiltros...');
        this.configurarEventosFiltros();
        
        // Aguarda o mapa estar pronto antes de criar marcadores
        this.aguardarMapaPronto().then(() => {
            this.criarTodosMarcadores();
        }).catch(error => {
            console.error('Erro ao aguardar mapa:', error);
        });
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
            
            // Timeout após 5 segundos
            setTimeout(() => {
                reject(new Error('Timeout: Mapa não ficou pronto'));
            }, 5000);
        });
    }

    criarTodosMarcadores() {
        console.log('Criando todos os marcadores...');
        
        // Remove marcadores antigos
        this.removerTodosMarcadores();
        
        const locais = this.obterTodosLocais();
        
        locais.forEach(local => {
            // Verifica se o mapa está disponível
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
                    if (window.favoritosManager) {
                        window.favoritosManager.adicionarHistorico(local);
                    }
                });
                
                this.todosMarcadores.push({
                    marcador: marcador,
                    local: local
                });
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
                // Remove classe ativo de todos
                botoesFiltro.forEach(b => b.classList.remove('ativo'));
                // Adiciona classe ativo no botão clicado
                botao.classList.add('ativo');
                
                // Aplica o filtro
                const categoria = botao.dataset.category;
                this.aplicarFiltro(categoria);
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
        let marcadoresVisiveis = 0;
        
        this.todosMarcadores.forEach(({ marcador, local }) => {
            let deveMostrar = true;
            
            // Aplica filtro de categoria
            if (this.filtroAtual !== "Todos" && local.categoria !== this.filtroAtual) {
                deveMostrar = false;
            }
            
            // Aplica pesquisa
            if (deveMostrar && this.pesquisaAtual) {
                const termo = this.pesquisaAtual;
                const correspondePesquisa = 
                    local.nome.toLowerCase().includes(termo) ||
                    local.categoria.toLowerCase().includes(termo) ||
                    local.endereco.toLowerCase().includes(termo) ||
                    local.telefone.includes(termo);
                
                if (!correspondePesquisa) {
                    deveMostrar = false;
                }
            }
            
            // Atualiza visibilidade
            if (deveMostrar) {
                if (!window.mapaGlobal.hasLayer(marcador)) {
                    marcador.addTo(window.mapaGlobal);
                }
                marcadoresVisiveis++;
            } else {
                if (window.mapaGlobal.hasLayer(marcador)) {
                    window.mapaGlobal.removeLayer(marcador);
                }
            }
        });
        
        console.log(`${marcadoresVisiveis} marcadores visíveis`);
        this.mostrarMensagemResultados(marcadoresVisiveis);
    }

    mostrarMensagemResultados(marcadoresVisiveis) {
        // Remove mensagem anterior
        this.removerMensagemResultados();
        
        if (marcadoresVisiveis === 0 && (this.filtroAtual !== "Todos" || this.pesquisaAtual)) {
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
                <button onclick="sistemaDeFiltros.limparFiltros()" 
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
        this.atualizarVisibilidadeMarcadores();
        
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

    removerTodosMarcadores() {
        this.todosMarcadores.forEach(({ marcador }) => {
            if (window.mapaGlobal && marcador) {
                window.mapaGlobal.removeLayer(marcador);
            }
        });
        this.todosMarcadores = [];
    }

    obterTodosLocais() {
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
                categoria: "Serviços Sociais",
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
            },
            {
                nome: "Centro Esportivo",
                categoria: "Serviços Sociais",
                coordenadas: [-20.3050, -40.3050],
                endereco: "Av. Marechal Campos, 1000 - Maruípe",
                telefone: "(27) 3333-5555"
            }
        ];
    }
}

// Instância global
window.sistemaDeFiltros = new SistemaDeFiltros();