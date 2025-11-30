import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface SkillFormProps {
  skill: {
    nome: string;
    titulo_modal: string;
    descricao_modal: string;
    importance: string;
  };
  onClose: () => void;
}

const SkillForm: React.FC<SkillFormProps> = ({ skill, onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nivelAtual: "",
    nivelDesejado: "",
    pontosFortes: "",
    areasDesenvolvimento: "",
    acoesPraticas: "",
    recursosAprendizado: "",
    prazoDesenvolvimento: "",
    metricas: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem(`skill_${skill.nome}`);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, [skill.nome]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem(`skill_${skill.nome}`, JSON.stringify(formData));
    toast({
      title: "Plano de desenvolvimento salvo!",
      description: `Seu plano para desenvolver ${skill.nome} foi salvo com sucesso.`,
      duration: 3000,
    });
  };

  const gerarPDF = async () => {
    const elemento = document.getElementById("planoDeCarreiraVisaoGeral");

    if (!elemento) {
      console.error("Elemento #pdf-content não encontrado!");
      return;
    }

    // Cria o canvas a partir do HTML
    const canvas = await html2canvas(elemento, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // 🔲 Margens (opcional)
    const margin = 10;

    // 📐 Calcula a proporção para caber tudo em UMA página
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    const ratio = Math.min(
      (pageWidth - margin * 2) / contentWidth,
      (pageHeight - margin * 2) / contentHeight
    );

    const imgWidth = contentWidth * ratio;
    const imgHeight = contentHeight * ratio;

    const xPos = (pageWidth - imgWidth) / 2;
    const yPos = (pageHeight - imgHeight) / 2;

    // 🖼️ Adiciona a imagem centralizada e redimensionada
    pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);

    pdf.save("Plano de Carreira.pdf");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div id="planoDeCarreiraVisaoGeral">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {skill.titulo_modal}
                </h2>
                <p className="text-gray-600 mb-2">{skill.descricao_modal}</p>
                <p className="text-sm text-green-600 font-medium">
                  {skill.importance}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nível Atual (1-10)
                  </label>
                  <select
                    value={formData.nivelAtual}
                    onChange={(e) =>
                      handleInputChange("nivelAtual", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nível Desejado (1-10)
                  </label>
                  <select
                    value={formData.nivelDesejado}
                    onChange={(e) =>
                      handleInputChange("nivelDesejado", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pontos Fortes Atuais
                </label>
                <textarea
                  value={formData.pontosFortes}
                  onChange={(e) =>
                    handleInputChange("pontosFortes", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Liste suas competências atuais nesta habilidade..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Áreas para Desenvolvimento
                </label>
                <textarea
                  value={formData.areasDesenvolvimento}
                  onChange={(e) =>
                    handleInputChange("areasDesenvolvimento", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Identifique onde você precisa melhorar..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ações Práticas
                </label>
                <textarea
                  value={formData.acoesPraticas}
                  onChange={(e) =>
                    handleInputChange("acoesPraticas", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Defina ações específicas para desenvolver esta habilidade..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recursos de Aprendizado
                </label>
                <textarea
                  value={formData.recursosAprendizado}
                  onChange={(e) =>
                    handleInputChange("recursosAprendizado", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={2}
                  placeholder="Cursos, livros, mentores, experiências práticas..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prazo para Desenvolvimento
                </label>
                <input
                  type="date"
                  value={formData.prazoDesenvolvimento}
                  onChange={(e) =>
                    handleInputChange("prazoDesenvolvimento", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Como Medir o Progresso
                </label>
                <textarea
                  value={formData.metricas}
                  onChange={(e) =>
                    handleInputChange("metricas", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={2}
                  placeholder="Defina indicadores para acompanhar seu desenvolvimento..."
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={gerarPDF}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              Salvar Plano
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

export default SkillForm;
