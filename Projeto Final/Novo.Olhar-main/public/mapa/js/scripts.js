// scripts.js - ARQUIVO PRINCIPAL CORRIGIDO
console.log('scripts.js carregado');

// VERIFICA SE JÁ EXISTE PARA EVITAR DUPLICAÇÃO
if (typeof window.mapaGlobal === 'undefined') {
    window.mapaGlobal = null;
    window.mapaInicializado = false;
}

function inicializarMapa() {
    if (window.mapaInicializado && window.mapaGlobal) {
        console.log('Mapa já inicializado, retornando instância existente');
        return window.mapaGlobal;
    }
    
    console.log('Inicializando mapa...');
    
    // Configuração inicial do mapa
    window.mapaGlobal = L.map('map', {
        zoomControl: false
    }).setView([-20.3155, -40.3128], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(window.mapaGlobal);

    // Adiciona controle de zoom manualmente
    L.control.zoom({
        position: 'topright'
    }).addTo(window.mapaGlobal);
    
    window.mapaInicializado = true;
    console.log('Mapa inicializado com sucesso');
    
    return window.mapaGlobal;
}

// Inicializa todos os sistemas quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Carregado - Inicializando sistemas...');
    
    // 1. Inicializa o mapa primeiro
    inicializarMapa();
    
    // 2. Pequeno delay para garantir que o mapa está pronto
    setTimeout(() => {
        // 3. Inicializa sistemas que dependem do mapa
        if (typeof window.sistemaDeFiltros !== 'undefined') {
            console.log('Sistema de filtros encontrado, reinicializando...');
            window.sistemaDeFiltros.criarTodosMarcadores();
        }
        
        // 4. Configura botão de alerta
        if (window.BotaoDeAlerta && window.BotaoDeAlerta.configurarBotaoAlerta) {
            window.BotaoDeAlerta.configurarBotaoAlerta();
        }
        
        console.log('Todos os sistemas inicializados');
    }, 500);
});