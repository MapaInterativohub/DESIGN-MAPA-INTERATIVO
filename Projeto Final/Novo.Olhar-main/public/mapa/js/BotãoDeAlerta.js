// BotãoDeAlerta.js - VERSÃO COMPLETAMENTE CORRIGIDA
console.log('BotãoDeAlerta.js carregado');

// VERIFICAÇÃO PARA EVITAR REDECLARAÇÃO
if (typeof window.BotaoDeAlerta === 'undefined') {
    
    // Base de dados de delegacias (APENAS UMA DECLARAÇÃO)
    const delegacias = [
        {
            nome: "Delegacia da Mulher - Vitória",
            categoria: "Segurança",
            coordenadas: [-20.2911246, -40.3009795],
            endereco: "Av. N.S. da Penha, 1230 - Santa Luíza",
            telefone: "2731985981",
            whatsapp: "552731985981",
            plantao24h: true
        },
        {
            nome: "Delegacia da Mulher - Cariacica", 
            categoria: "Segurança",
            coordenadas: [-20.3379916, -40.3806918],
            endereco: "R. São Francisco, 456 - Campo Grande",
            telefone: "2731363118",
            whatsapp: "552731363118",
            plantao24h: true
        },
        {
            nome: "Delegacia Civil - Vitória Centro",
            categoria: "Segurança",
            coordenadas: [-20.3155, -40.3089],
            endereco: "Av. Princess Isabel, 350 - Centro",
            telefone: "2732277000",
            whatsapp: "552732277000",
            plantao24h: true
        }
    ];

    // Objeto global para armazenar as funções
    window.BotaoDeAlerta = {
        // Função para calcular distância entre duas coordenadas
        calcularDistancia: function(lat1, lon1, lat2, lon2) {
            const R = 6371;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const distancia = R * c;
            return distancia;
        },

        // Função para formatar telefone
        formatarTelefone: function(telefone) {
            const num = telefone.replace(/\D/g, '');
            if (num.length === 10) {
                return `(${num.substring(0,2)}) ${num.substring(2,6)}-${num.substring(6)}`;
            } else if (num.length === 11) {
                return `(${num.substring(0,2)}) ${num.substring(2,7)}-${num.substring(7)}`;
            }
            return telefone;
        },

        // Função para fechar modal
        fecharModalAlerta: function() {
            const modals = document.querySelectorAll('[id^="alerta-modal"]');
            const overlays = document.querySelectorAll('[id^="alerta-overlay"]');
            const loading = document.getElementById('alerta-loading');
            
            modals.forEach(modal => modal.remove());
            overlays.forEach(overlay => overlay.remove());
            if (loading) loading.remove();
        },

        // Função para ligar
        ligarParaDelegacia: function(telefone) {
            console.log('Ligando para:', telefone);
            window.location.href = `tel:${telefone}`;
            this.fecharModalAlerta();
        },

        // Função para WhatsApp
        abrirWhatsApp: function(whatsapp) {
            console.log('Abrindo WhatsApp para:', whatsapp);
            const mensagem = encodeURIComponent('Preciso de ajuda! Encontrei através do aplicativo de mapa.');
            window.open(`https://wa.me/${whatsapp}?text=${mensagem}`, '_blank');
            this.fecharModalAlerta();
        },

        // Função para mostrar loading
        mostrarLoadingAlerta: function() {
            const overlay = document.createElement('div');
            overlay.id = 'alerta-loading';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                color: white;
                font-family: Arial, sans-serif;
            `;
            
            overlay.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 20px;">🚨</div>
                    <div style="font-size: 18px; margin-bottom: 10px;">Buscando delegacia mais próxima...</div>
                    <div style="font-size: 14px; opacity: 0.8;">Usando sua localização atual</div>
                </div>
            `;
            
            document.body.appendChild(overlay);
        },

        // Função para mostrar erro
        mostrarErroAlerta: function(mensagem) {
            this.fecharModalAlerta();
            
            const modal = document.createElement('div');
            modal.id = 'alerta-modal-erro';
            modal.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border-radius: 15px;
                padding: 25px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 2000;
                max-width: 400px;
                width: 90%;
                text-align: center;
                font-family: Arial, sans-serif;
            `;
            
            modal.innerHTML = `
                <div style="font-size: 48px; color: #e74c3c; margin-bottom: 15px;">⚠️</div>
                <h3 style="margin: 0 0 15px 0; color: #2c3e50;">Localização Não Encontrada</h3>
                <p style="margin: 0 0 20px 0; color: #666; line-height: 1.4;">${mensagem}</p>
                <button onclick="BotaoDeAlerta.fecharModalAlerta()" 
                        style="padding: 12px 24px; background: #e74c3c; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                    Entendi
                </button>
            `;
            
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 1999;
            `;
            
            overlay.onclick = () => this.fecharModalAlerta();
            
            document.body.appendChild(overlay);
            document.body.appendChild(modal);
        },

        // Função principal para encontrar delegacia
        encontrarDelegaciaMaisProxima: function() {
            console.log('Buscando delegacia mais próxima...');
            
            this.mostrarLoadingAlerta();
            
            if (!navigator.geolocation) {
                this.mostrarErroAlerta('Geolocalização não suportada pelo navegador');
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (posicao) => {
                    const userLat = posicao.coords.latitude;
                    const userLon = posicao.coords.longitude;
                    
                    console.log('Localização do usuário:', userLat, userLon);
                    
                    // Calcular distância para cada delegacia
                    const delegaciasComDistancia = delegacias.map(delegacia => {
                        const distancia = this.calcularDistancia(
                            userLat, userLon, 
                            delegacia.coordenadas[0], delegacia.coordenadas[1]
                        );
                        return {
                            ...delegacia,
                            distancia: distancia,
                            distanciaFormatada: distancia.toFixed(1) + ' km'
                        };
                    });
                    
                    // Ordenar por distância
                    delegaciasComDistancia.sort((a, b) => a.distancia - b.distancia);
                    
                    const delegaciaMaisProxima = delegaciasComDistancia[0];
                    
                    console.log('Delegacia mais próxima:', delegaciaMaisProxima);
                    this.mostrarModalAlerta(delegaciaMaisProxima);
                },
                (erro) => {
                    console.error('Erro na geolocalização:', erro);
                    
                    let mensagemErro = 'Não foi possível determinar sua localização. ';
                    
                    switch(erro.code) {
                        case erro.PERMISSION_DENIED:
                            mensagemErro += 'Permissão de localização negada.';
                            break;
                        case erro.POSITION_UNAVAILABLE:
                            mensagemErro += 'Localização indisponível.';
                            break;
                        case erro.TIMEOUT:
                            mensagemErro += 'Tempo de busca excedido.';
                            break;
                        default:
                            mensagemErro += 'Erro desconhecido.';
                    }
                    
                    this.mostrarErroAlerta(mensagemErro);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                }
            );
        },

        // Função para mostrar modal principal
        mostrarModalAlerta: function(delegaciaProxima) {
            this.fecharModalAlerta();
            
            const modal = document.createElement('div');
            modal.id = 'alerta-modal';
            modal.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border-radius: 15px;
                padding: 25px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 2000;
                max-width: 400px;
                width: 90%;
                font-family: Arial, sans-serif;
                text-align: center;
            `;
            
            modal.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <div style="font-size: 36px; color: #e74c3c; margin-bottom: 10px;">🚨</div>
                    <h3 style="margin: 0 0 10px 0; color: #2c3e50;">Delegacia Mais Próxima</h3>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                        <h4 style="margin: 0 0 8px 0; color: #2c3e50;">${delegaciaProxima.nome}</h4>
                        <p style="margin: 5px 0; font-size: 14px; color: #666;">📍 ${delegaciaProxima.endereco}</p>
                        <p style="margin: 5px 0; font-size: 14px; color: #666;">📞 ${this.formatarTelefone(delegaciaProxima.telefone)}</p>
                        <p style="margin: 5px 0; font-size: 14px; color: #27ae60;">📍 ${delegaciaProxima.distanciaFormatada} de distância</p>
                        ${delegaciaProxima.plantao24h ? '<p style="margin: 5px 0; font-size: 12px; color: #e74c3c;">🕒 Plantão 24h</p>' : ''}
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                    <button onclick="BotaoDeAlerta.ligarParaDelegacia('${delegaciaProxima.telefone}')" 
                            style="flex: 1; padding: 12px; background: #27ae60; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                        📞 Ligar Agora
                    </button>
                    <button onclick="BotaoDeAlerta.abrirWhatsApp('${delegaciaProxima.whatsapp}')" 
                            style="flex: 1; padding: 12px; background: #25D366; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                        💬 WhatsApp
                    </button>
                </div>
                
                <button onclick="BotaoDeAlerta.mostrarTodasDelegacias()" 
                        style="width: 100%; padding: 10px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; margin-bottom: 10px;">
                    📋 Ver Todas as Delegacias
                </button>
                
                <button onclick="BotaoDeAlerta.fecharModalAlerta()" 
                        style="width: 100%; padding: 10px; background: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    ✕ Fechar
                </button>
            `;
            
            const overlay = document.createElement('div');
            overlay.id = 'alerta-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 1999;
            `;
            
            overlay.onclick = () => this.fecharModalAlerta();
            
            document.body.appendChild(overlay);
            document.body.appendChild(modal);
        },

        // Função para mostrar todas delegacias
        mostrarTodasDelegacias: function() {
            this.fecharModalAlerta();
            
            if (!navigator.geolocation) {
                this.mostrarListaDelegaciasSemLocalizacao();
                return;
            }
            
            this.mostrarLoadingAlerta();
            
            navigator.geolocation.getCurrentPosition(
                (posicao) => {
                    const userLat = posicao.coords.latitude;
                    const userLon = posicao.coords.longitude;
                    
                    const delegaciasComDistancia = delegacias.map(delegacia => {
                        const distancia = this.calcularDistancia(
                            userLat, userLon, 
                            delegacia.coordenadas[0], delegacia.coordenadas[1]
                        );
                        return {
                            ...delegacia,
                            distancia: distancia,
                            distanciaFormatada: distancia.toFixed(1) + ' km'
                        };
                    });
                    
                    delegaciasComDistancia.sort((a, b) => a.distancia - b.distancia);
                    this.mostrarListaDelegaciasComLocalizacao(delegaciasComDistancia);
                },
                (erro) => {
                    console.error('Erro na geolocalização:', erro);
                    this.mostrarListaDelegaciasSemLocalizacao();
                }
            );
        },

        // Funções auxiliares para listas
        mostrarListaDelegaciasComLocalizacao: function(delegaciasOrdenadas) {
            this.fecharModalAlerta();
            
            const modal = document.createElement('div');
            modal.id = 'alerta-modal-todas';
            modal.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border-radius: 15px;
                padding: 25px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 2000;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                font-family: Arial, sans-serif;
            `;
            
            let listaHTML = delegaciasOrdenadas.map((delegacia, index) => `
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 10px; border-left: 4px solid ${index === 0 ? '#e74c3c' : '#3498db'};">
                    <h4 style="margin: 0 0 8px 0; color: #2c3e50;">
                        ${index === 0 ? '⭐ ' : ''}${delegacia.nome}
                    </h4>
                    <p style="margin: 4px 0; font-size: 13px; color: #666;">📍 ${delegacia.endereco}</p>
                    <p style="margin: 4px 0; font-size: 13px; color: #666;">📞 ${this.formatarTelefone(delegacia.telefone)}</p>
                    <p style="margin: 4px 0; font-size: 13px; color: ${index === 0 ? '#e74c3c' : '#27ae60'};">📍 ${delegacia.distanciaFormatada}</p>
                    ${delegacia.plantao24h ? '<p style="margin: 4px 0; font-size: 12px; color: #e74c3c;">🕒 Plantão 24h</p>' : ''}
                    <div style="display: flex; gap: 8px; margin-top: 8px;">
                        <button onclick="BotaoDeAlerta.ligarParaDelegacia('${delegacia.telefone}')" 
                                style="flex: 1; padding: 6px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                            📞 Ligar
                        </button>
                        <button onclick="BotaoDeAlerta.abrirWhatsApp('${delegacia.whatsapp}')" 
                                style="flex: 1; padding: 6px; background: #25D366; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                            💬 WhatsApp
                        </button>
                    </div>
                </div>
            `).join('');
            
            modal.innerHTML = `
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 36px; color: #e74c3c; margin-bottom: 10px;">🚓</div>
                    <h3 style="margin: 0 0 10px 0; color: #2c3e50;">Todas as Delegacias</h3>
                    <p style="margin: 0; color: #666; font-size: 14px;">Ordenadas por proximidade</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    ${listaHTML}
                </div>
                
                <button onclick="BotaoDeAlerta.fecharModalAlerta()" 
                        style="width: 100%; padding: 12px; background: #95a5a6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                    ✕ Fechar
                </button>
            `;
            
            const overlay = document.createElement('div');
            overlay.id = 'alerta-overlay-todas';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 1999;
            `;
            
            overlay.onclick = () => this.fecharModalAlerta();
            
            document.body.appendChild(overlay);
            document.body.appendChild(modal);
        },

        mostrarListaDelegaciasSemLocalizacao: function() {
            this.fecharModalAlerta();
            
            const modal = document.createElement('div');
            modal.id = 'alerta-modal-todas';
            modal.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border-radius: 15px;
                padding: 25px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 2000;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                font-family: Arial, sans-serif;
            `;
            
            let listaHTML = delegacias.map((delegacia, index) => `
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 10px; border-left: 4px solid #3498db;">
                    <h4 style="margin: 0 0 8px 0; color: #2c3e50;">${delegacia.nome}</h4>
                    <p style="margin: 4px 0; font-size: 13px; color: #666;">📍 ${delegacia.endereco}</p>
                    <p style="margin: 4px 0; font-size: 13px; color: #666;">📞 ${this.formatarTelefone(delegacia.telefone)}</p>
                    ${delegacia.plantao24h ? '<p style="margin: 4px 0; font-size: 12px; color: #e74c3c;">🕒 Plantão 24h</p>' : ''}
                    <div style="display: flex; gap: 8px; margin-top: 8px;">
                        <button onclick="BotaoDeAlerta.ligarParaDelegacia('${delegacia.telefone}')" 
                                style="flex: 1; padding: 6px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                            📞 Ligar
                        </button>
                        <button onclick="BotaoDeAlerta.abrirWhatsApp('${delegacia.whatsapp}')" 
                                style="flex: 1; padding: 6px; background: #25D366; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                            💬 WhatsApp
                        </button>
                    </div>
                </div>
            `).join('');
            
            modal.innerHTML = `
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 36px; color: #e74c3c; margin-bottom: 10px;">🚓</div>
                    <h3 style="margin: 0 0 10px 0; color: #2c3e50;">Todas as Delegacias</h3>
                    <p style="margin: 0; color: #666; font-size: 14px;">Sem informações de distância</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    ${listaHTML}
                </div>
                
                <button onclick="BotaoDeAlerta.fecharModalAlerta()" 
                        style="width: 100%; padding: 12px; background: #95a5a6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                    ✕ Fechar
                </button>
            `;
            
            const overlay = document.createElement('div');
            overlay.id = 'alerta-overlay-todas';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 1999;
            `;
            
            overlay.onclick = () => this.fecharModalAlerta();
            
            document.body.appendChild(overlay);
            document.body.appendChild(modal);
        },

        // Função de inicialização - CORRIGIDA para usar arrow function
        configurarBotaoAlerta: function() {
            console.log('Configurando botão de alerta...');
            
            const alertBtn = document.getElementById('alert-btn');
            if (!alertBtn) {
                console.log('Botão de alerta não encontrado');
                return;
            }

            // CORREÇÃO: Usar arrow function para manter o contexto do 'this'
            alertBtn.addEventListener('click', () => {
                console.log('Botão de alerta clicado');
                this.encontrarDelegaciaMaisProxima();
            });
        }
    };
}