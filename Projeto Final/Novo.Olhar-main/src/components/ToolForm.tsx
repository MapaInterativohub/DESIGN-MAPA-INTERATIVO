import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ToolFormProps {
  tool: {
    titulo_modal: string;
    descricao_modal: string;
    benefits: string;
  };
  onClose: () => void;
}

const ToolForm: React.FC<ToolFormProps> = ({ tool, onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    objetivo: "",
    situacaoAtual: "",
    recursosPrecisados: "",
    proximosPassos: "",
    prazo: "",
    observacoes: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem(`tool_${tool.titulo_modal}`);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [tool.titulo_modal]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem(`tool_${tool.titulo_modal}`, JSON.stringify(formData));
    toast({
      title: "Dados salvos!",
      description: `Suas informações para ${tool.titulo_modal} foram salvas com sucesso.`,
      duration: 3000,
    });
  };

  const gerarPDF = async () => {
    const elemento = document.getElementById("formEmpreendedorismo");
  
    if (!elemento) {
      console.error("Elemento #pdf-content não encontrado!");
      return;
    }
  
    // Cria o canvas a partir do HTML
    const canvas = await html2canvas(elemento, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff"
    });
  
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
  
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
  
    // 🔲 Defina aqui o tamanho da margem (em milímetros)
    const margin = 10; // margem de 10mm em cada lado
  
    // 📐 Calcula largura e altura da imagem dentro da área útil
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
    // let position = margin;
  
    // Se a imagem for maior que a página, quebra automaticamente
    if (imgHeight > pageHeight - margin * 2) {
      let heightLeft = imgHeight;
      let y = margin;
  
      while (heightLeft > 0) {
        pdf.addImage(imgData, "PNG", margin, y, imgWidth, imgHeight);
        heightLeft -= (pageHeight - margin * 2);
        y -= (pageHeight - margin * 2);
        if (heightLeft > 0) pdf.addPage();
      }
    } else {
      // Adiciona a imagem com margem
      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
    }
  
    pdf.save("vocacao.pdf");
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div id="formEmpreendedorismo">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {tool.titulo_modal}
                </h2>
                <p className="text-gray-600">{tool.descricao_modal}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objetivo Principal
                </label>
                <textarea
                  value={formData.objetivo}
                  onChange={(e) =>
                    handleInputChange("objetivo", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Descreva o que você quer alcançar com esta ferramenta..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Situação Atual
                </label>
                <textarea
                  value={formData.situacaoAtual}
                  onChange={(e) =>
                    handleInputChange("situacaoAtual", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Descreva sua situação atual relacionada a este objetivo..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recursos Necessários
                </label>
                <textarea
                  value={formData.recursosPrecisados}
                  onChange={(e) =>
                    handleInputChange("recursosPrecisados", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Liste os recursos, pessoas ou ferramentas que você precisa..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Próximos Passos
                </label>
                <textarea
                  value={formData.proximosPassos}
                  onChange={(e) =>
                    handleInputChange("proximosPassos", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Defina as ações específicas que você vai tomar..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prazo
                </label>
                <input
                  type="date"
                  value={formData.prazo}
                  onChange={(e) => handleInputChange("prazo", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações Adicionais
                </label>
                <textarea
                  value={formData.observacoes}
                  onChange={(e) =>
                    handleInputChange("observacoes", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="Adicione qualquer observação importante..."
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-8">
            <button
              onClick={gerarPDF}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              Salvar Progresso
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolForm;
