// Gerador de PDF para Favoritos
class PDFGenerator {
    constructor() {
        this.configurarBotaoPDF();
    }

    configurarBotaoPDF() {
        const btnPDF = document.getElementById('btn-download-pdf');
        btnPDF.addEventListener('click', () => this.gerarPDF());
    }

    async gerarPDF() {
        const favoritos = favoritosManager.obterFavoritosParaPDF();
        
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
            doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 105, 28, { align: 'center' });

            let yPos = 45;

            // LISTA DE FAVORITOS
            favoritos.forEach((favorito, index) => {
                // Quebra página se necessário
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
                doc.text(`Página ${i} de ${totalPaginas}`, 105, 290, { align: 'center' });
            }

            // SALVAR PDF
            doc.save('meus-favoritos.pdf');
            
            this.mostrarFeedbackSucesso();
            
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            alert('Erro ao gerar PDF. Tente novamente.');
        }
    }

    mostrarFeedbackSucesso() {
        const btnPDF = document.getElementById('btn-download-pdf');
        const textoOriginal = btnPDF.textContent;
        
        btnPDF.textContent = '✅ PDF Gerado!';
        btnPDF.style.background = '#27ae60';
        
        setTimeout(() => {
            btnPDF.textContent = textoOriginal;
            btnPDF.style.background = '';
        }, 2000);
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new PDFGenerator();
});