import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, AlertTriangle, Shield, Target, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const SwotAnalysis = () => {
  const { toast } = useToast();

  const [swotData, setSwotData] = useState({
    titulo: "",
    strengths: [""],
    weaknesses: [""],
    opportunities: [""],
    threats: [""],
  });

  const handleItemChange = (category, index, value) => {
    setSwotData((prev) => ({
      ...prev,
      [category]: prev[category].map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const addItem = (category) => {
    setSwotData((prev) => ({
      ...prev,
      [category]: [...prev[category], ""],
    }));
  };

  const removeItem = (category, index) => {
    if (swotData[category].length > 1) {
      setSwotData((prev) => ({
        ...prev,
        [category]: prev[category].filter((_, i) => i !== index),
      }));
    }
  };

  const saveSwot = () => {
    localStorage.setItem("careerSwot", JSON.stringify(swotData));
    toast({
      title: "Análise SWOT Salva!",
      description: "Sua análise SWOT foi salva com sucesso.",
    });
  };

  const [categorias, setCategorias] = useState([]);

  const categoriasGet = () => {
    axios
      .get("http://localhost:3001/api/plano-carreira/swot")
      .then((res) => {
        setCategorias(res.data);
        console.log("📦 Dados recebidos:", res.data);
      })
      .catch((err) => {
        console.error(err, "Erro ao obter SWOT");
      });
  };

  useEffect(() => {
    categoriasGet();
  }, []);

  useEffect(() => {
    if (categorias.length > 0) {
      const item = categorias[0];

      // 🧩 Parse dos campos JSON vindos como string
      const parseArray = (value) => {
        try {
          const parsed = JSON.parse(value);
          return Array.isArray(parsed) ? parsed : [String(parsed)];
        } catch {
          return [String(value)];
        }
      };

      setSwotData({
        titulo: item.titulo || "",
        strengths: item.strengths ? parseArray(item.strengths) : [""],
        weaknesses: item.weaknesses ? parseArray(item.weaknesses) : [""],
        opportunities: item.opportunities
          ? parseArray(item.opportunities)
          : [""],
        threats: item.threats ? parseArray(item.threats) : [""],
      });
    }
  }, [categorias]);

  const swotCategories = [
    {
      title: "Forças",
      field: "strengths",
      icon: Shield,
      description: swotData.strengths,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Fraquezas",
      field: "weaknesses",
      icon: AlertTriangle,
      description: swotData.weaknesses,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      title: "Oportunidades",
      field: "opportunities",
      icon: TrendingUp,
      description: swotData.opportunities,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Ameaças",
      field: "threats",
      icon: Target,
      description: swotData.threats,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ];

  const gerarPDF = async () => {
    const elemento = document.getElementById("PlanoDeCarreiraSwot");

    if (!elemento) {
      console.error("Elemento #PlanoDeCarreiraSwot não encontrado!");
      return;
    }

    const canvas = await html2canvas(elemento, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

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
      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
    }

    pdf.save("Plano De Carreira Swot.pdf");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div id="PlanoDeCarreiraSwot">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {swotData.titulo || "Análise SWOT"}
            </h3>
            <p className="text-gray-600">
              Análise estratégica da sua carreira e posicionamento profissional
            </p>
          </div>
          <button
            onClick={gerarPDF}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>Salvar</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {swotCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.field}
                className={`${category.bgColor} ${category.borderColor} border-2`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <span>{category.title}</span>
                      <p className="text-sm font-nomal text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {swotData[category.field].map((item, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          // value={item}
                          // onChange={(e) =>
                          //   handleItemChange(
                          //     category.field,
                          //     index,
                          //     e.target.value
                          //   )
                          // }
                          placeholder={`Adicione um item em ${category.title.toLowerCase()}...`}
                          className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() =>
                            removeItem(category.field, index)
                          }
                          className="text-red-500 hover:text-red-700 p-2"
                          disabled={swotData[category.field].length === 1}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addItem(category.field)}
                      className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
                    >
                      + Adicionar item
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">
            Dicas para uma boa análise SWOT:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • <strong>Forças:</strong> Habilidades, experiências, conquistas e
              recursos únicos
            </li>
            <li>
              • <strong>Fraquezas:</strong> Áreas que precisam de
              desenvolvimento e limitações atuais
            </li>
            <li>
              • <strong>Oportunidades:</strong> Tendências do mercado, demandas
              emergentes, conexões
            </li>
            <li>
              • <strong>Ameaças:</strong> Concorrência, mudanças no mercado,
              obsolescência de habilidades
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SwotAnalysis;
