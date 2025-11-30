// js/MenuLateralHover.js - Sistema Completo do Menu Lateral
console.log('MenuLateralHover.js carregado');

class MenuLateralHover {
    constructor() {
        this.abaAtiva = 'favoritos';
        this.init();
    }

    init() {
        console.log('Inicializando Menu Lateral Hover...');
        this.configurarEventos();
        this.configurarPDF();
    }

    configurarEventos() {
        // Eventos já configurados no HTML principal
        console.log('Eventos do menu lateral configurados');
    }

    configurarPDF() {
        const btnPDF = document.getElementById('btn-download-pdf');
        if (btnPDF) {
            btnPDF.addEventListener('click', () => this.gerarPDFFavoritos());
        }
    }

    alternarAba(novaAba) {
        console.log('Alternando para aba:', novaAba);
        this.abaAtiva = novaAba;
        
        // Atualizar UI
        document.querySelectorAll('.menu-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        document.querySelector(`.menu-tab[data-tab="${novaAba}"]`).classList.add('active');
        document.getElementById(`tab-${novaAba}`).classList.add('active');
        
        // Atualizar dados se necessário
        this.atualizarDadosAba(novaAba);
    }

    atualizarDadosAba(aba) {
        if (!window.favoritosManager) return;
        
        switch(aba) {
            case 'favoritos':
                window.favoritosManager.renderizarFavoritos();
                this.atualizarEstadoBotaoPDF();
                break;
            case 'historico':
                window.favoritosManager.renderizarHistorico();
                break;
        }
    }

    atualizarEstadoBotaoPDF() {
        const btnPDF = document.getElementById('btn-download-pdf');
        if (!btnPDF || !window.favoritosManager) return;
        
        const favoritos = window.favoritosManager.favoritos;
        if (favoritos.length > 0) {
            btnPDF.disabled = false;
            btnPDF.title = `Baixar PDF com ${favoritos.length} favoritos`;
            btnPDF.innerHTML = `<i class="fas fa-file-pdf"></i> Baixar PDF (${favoritos.length})`;
        } else {
            btnPDF.disabled = true;
            btnPDF.title = 'Adicione favoritos para gerar PDF';
            btnPDF.innerHTML = `<i class="fas fa-file-pdf"></i> Baixar PDF`;
        }
    }

    async gerarPDFFavoritos() {
        if (!window.favoritosManager) {
            alert('Sistema de favoritos não carregado!');
            return;
        }

        const favoritos = window.favoritosManager.obterFavoritosParaPDF();
        
        if (favoritos.length === 0) {
            alert('Nenhum favorito para gerar PDF!');
            return;
        }

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // CONFIGURAÇÃO DO DOCUMENTO
            doc.setFont('helvetica');
            doc.setFontSize(20);
            doc.setTextColor(44, 62, 80);
            doc.text('⭐ MEUS LOCAIS FAVORITOS', 105, 20, { align: 'center' });

            // DATA DE GERACAO
            doc.setFontSize(10);
            doc.setTextColor(128, 128, 128);
            doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 105, 28, { align: 'center' });

            let yPos = 45;

            // LISTA DE FAVORITOS
            favoritos.forEach((favorito, index) => {
                if (yPos > 250) {
                    doc.addPage();
                    yPos = 20;
                }

                // Número e nome
                doc.setFontSize(12);
                doc.setTextColor(41, 128, 185);
                doc.text(`${index + 1}. ${favorito.nome}`, 20, yPos);

                // Categoria
                doc.setFontSize(10);
                doc.setTextColor(128, 128, 128);
                doc.text(`Categoria: ${favorito.categoria}`, 20, yPos + 7);

                // Endereço
                doc.setTextColor(0, 0, 0);
                doc.text(`📍 ${favorito.endereco}`, 20, yPos + 14);

                // Telefone
                doc.text(`📞 ${favorito.telefone}`, 20, yPos + 21);

                // Data de adição
                doc.setTextColor(128, 128, 128);
                doc.text(`Adicionado em: ${favorito.dataAdicao}`, 20, yPos + 28);

                // Linha divisória
                doc.setDrawColor(200, 200, 200);
                doc.line(20, yPos + 33, 190, yPos + 33);

                yPos += 40;
            });

            // RODAPÉ
            const totalPaginas = doc.internal.getNumberOfPages();
            for (let i = 1; i <= totalPaginas; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(`Página ${i} de ${totalPaginas} - Gerado pelo Mapa Interativo`, 105, 290, { align: 'center' });
            }

            // SALVAR PDF
            doc.save(`meus-favoritos-${new Date().toISOString().split('T')[0]}.pdf`);
            
            this.mostrarFeedbackSucesso();
            
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            alert('Erro ao gerar PDF. Tente novamente.');
        }
    }

    mostrarFeedbackSucesso() {
        const btnPDF = document.getElementById('btn-download-pdf');
        if (btnPDF) {
            const textoOriginal = btnPDF.innerHTML;
            btnPDF.innerHTML = '<i class="fas fa-check"></i> PDF Gerado!';
            btnPDF.style.background = '#27ae60';
            
            setTimeout(() => {
                btnPDF.innerHTML = textoOriginal;
                btnPDF.style.background = '';
            }, 2000);
        }
    }

    abrirMenu() {
        document.getElementById('sidebar').classList.add('active');
        document.getElementById('sidebar-overlay').classList.add('active');
        this.atualizarDadosAba(this.abaAtiva);
    }

    fecharMenu() {
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('sidebar-overlay').classList.remove('active');
    }
}

// Instância global
window.menuLateral = new MenuLateralHover();