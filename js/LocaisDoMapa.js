// LocaisDoMapa.js - VERSÃO CORRIGIDA E TESTADA
console.log('LocaisDoMapa.js carregado');

// Dados de exemplo
const locais = [
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
    }
];

let todosMarcadores = [];

function criarMarcadores() {
    console.log('Criando marcadores...');
    
    removerTodosMarcadores();
    
    locais.forEach(local => {
        const marcador = L.marker(local.coordenadas).addTo(window.mapaGlobal);
        
        // CONTEÚDO DO POPUP CORRIGIDO - SEM ERROS DE SYNTAX
        const popupContent = `
            <div class="popup-content">
                <h3>${local.nome}</h3>
                <p><strong>Categoria:</strong> ${local.categoria}</p>
                <p><strong>Endereço:</strong> ${local.endereco}</p>
                <p><strong>Telefone:</strong> ${local.telefone}</p>
                <br>
                <button class="popup-btn favoritar-btn" onclick="favoritarLocalSafe('${local.nome}', '${local.categoria}', '${local.endereco}', '${local.telefone}')">
                    ⭐ Favoritar
                </button>
            </div>
        `;
        
        marcador.bindPopup(popupContent);
        
        marcador.on('click', function() {
            if (window.favoritosManager) {
                window.favoritosManager.adicionarHistorico(local);
            }
        });
        
        todosMarcadores.push(marcador);
    });
    
    console.log(`${todosMarcadores.length} marcadores criados`);
}

function removerTodosMarcadores() {
    if (todosMarcadores.length > 0) {
        todosMarcadores.forEach(marcador => {
            if (window.mapaGlobal && marcador) {
                window.mapaGlobal.removeLayer(marcador);
            }
        });
    }
    todosMarcadores = [];
}

// FUNÇÃO SEGURA PARA FAVORITAR - EVITA ERROS DE SYNTAX
window.favoritarLocalSafe = function(nome, categoria, endereco, telefone) {
    console.log('=== BOTÃO FAVORITAR CLICADO (SAFE) ===');
    console.log('Dados:', { nome, categoria, endereco, telefone });
    
    const local = {
        nome: nome,
        categoria: categoria,
        endereco: endereco,
        telefone: telefone
    };
    
    if (window.favoritosManager) {
        console.log('Chamando favoritosManager.adicionarFavorito...');
        const sucesso = window.favoritosManager.adicionarFavorito(local);
        
        if (sucesso) {
            console.log('Favorito adicionado com sucesso!');
            if (window.mapaGlobal) {
                window.mapaGlobal.closePopup();
            }
        }
    } else {
        console.error('ERRO: favoritosManager não está disponível');
        alert('Erro: Sistema de favoritos não carregado.');
    }
};

// Mantém a função original para compatibilidade
window.favoritarLocal = function(local) {
    console.log('=== BOTÃO FAVORITAR CLICADO (ORIGINAL) ===');
    
    if (window.favoritosManager) {
        const sucesso = window.favoritosManager.adicionarFavorito(local);
        
        if (sucesso && window.mapaGlobal) {
            window.mapaGlobal.closePopup();
        }
    } else {
        alert('Erro: Sistema de favoritos não carregado.');
    }
};

window.obterTodosLocais = function() {
    return locais;
};

window.obterTodosMarcadores = function() {
    return todosMarcadores;
};

window.removerTodosMarcadores = removerTodosMarcadores;

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.mapaGlobal) {
            criarMarcadores();
        } else {
            console.error('Mapa não inicializado para criar marcadores');
        }
    }, 1000);
});

// Função para obter locais filtrados por pesquisa
window.filtrarLocaisPorTermo = function(termo) {
    const todosLocais = window.obterTodosLocais();
    const termoLower = termo.toLowerCase();
    
    return todosLocais.filter(local => 
        local.nome.toLowerCase().includes(termoLower) ||
        local.categoria.toLowerCase().includes(termoLower) ||
        local.endereco.toLowerCase().includes(termoLower) ||
        local.telefone.includes(termo)
    );
};

// Variável global para controle do filtro atual
window.filtroAtual = "Todos";