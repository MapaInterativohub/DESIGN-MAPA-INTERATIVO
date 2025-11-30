import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import * as LucideIcons from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const CareerCanvas = () => {
  const { toast } = useToast();
  const [canvasData, setCanvasData] = useState({
    valueProposition: "",
    keyActivities: "",
    keyResources: "",
    costStructure: "",
    revenueStreams: "",
    customerSegments: "",
    channels: "",
    customerRelationships: "",
    keyPartners: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setCanvasData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveCanvas = () => {
    localStorage.setItem("careerCanvas", JSON.stringify(canvasData));
    toast({
      title: "Canvas Salvo!",
      description: "Seu canvas de carreira foi salvo com sucesso.",
    });
  };

  const [canvasGet, setCanvasGet] = useState([]);
  const secCanvasGet = () => {
    axios.get('http://localhost:3001/api/plano-carreira/canvas').then((res) => {
      setCanvasGet(res.data);
      console.log(res.data);
    }).catch((err) => {
      console.error(err, "Erro ao obter sections")
    })
  }

  useEffect(()=>{
    secCanvasGet();
  },[])
  const canvasSections = [
    {
      title: "Proposta de Valor",
      field: "valueProposition",
      icon: LucideIcons.Star,
      description: "Que valor único você oferece?",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Atividades-Chave",
      field: "keyActivities",
      icon: LucideIcons.Target,
      description: "Principais atividades que você executa",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Recursos-Chave",
      field: "keyResources",
      icon: LucideIcons.Lightbulb,
      description: "Recursos essenciais para seu sucesso",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Segmentos de Clientes",
      field: "customerSegments",
      icon: LucideIcons.Users,
      description: "Para quem você cria valor?",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Canais",
      field: "channels",
      icon: LucideIcons.Palette,
      description: "Como você alcança seus clientes?",
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Relacionamento",
      field: "customerRelationships",
      icon: LucideIcons.Users,
      description: "Tipo de relacionamento com clientes",
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Parcerias-Chave",
      field: "keyPartners",
      icon: LucideIcons.Users,
      description: "Parceiros estratégicos",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Estrutura de Custos",
      field: "costStructure",
      icon: LucideIcons.Target,
      description: "Principais custos do seu modelo",
      color: "from-red-500 to-red-600",
    },
    {
      title: "Fontes de Receita",
      field: "revenueStreams",
      icon: LucideIcons.Star,
      description: "Como você gera renda?",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  const gerarPDF = async () => {
    const elemento = document.getElementById("PlanoDeCarreiraCanvas");

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
    const pdf = new jsPDF({
      orientation: "landscape", // <-- horizontal
      unit: "mm",
      format: "a4"
    });

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
        heightLeft -= pageHeight - margin * 2;
        y -= pageHeight - margin * 2;
        if (heightLeft > 0) pdf.addPage();
      }
    } else {
      // Adiciona a imagem com margem
      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
    }

    pdf.save("Plano De Carreira Canvas.pdf");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div id="PlanoDeCarreiraCanvas">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Canvas de Carreira
            </h3>
            <p className="text-gray-600">
              Visualize e planeje seu modelo de carreira pessoal
            </p>
          </div>
          <button
            onClick={gerarPDF}
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            <LucideIcons.Save className="h-4 w-4" />
            <span>Salvar</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {canvasGet.map((section) => {
            if (section.ativo) {
              const iconeFormatado = section.icone.charAt(0).toUpperCase() + section.icone.slice(1).toLowerCase()
              const Icon = LucideIcons[iconeFormatado];
              return (
                <Card
                  key={section.id_canvas}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-base">
                      <div
                        className={`w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center`}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span>{section.titulo}</span>
                    </CardTitle>
                    <p className="text-xs text-gray-600">{section.descricao}</p>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      value={canvasData[section.id_canvas as keyof typeof canvasData]}
                      onChange={(e) =>
                        handleInputChange(section.id_canvas, e.target.value)
                      }
                      placeholder={` ${section.placeholder.toLowerCase()}...`}
                      className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </CardContent>
                </Card>
              );
            }
          }
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerCanvas;
