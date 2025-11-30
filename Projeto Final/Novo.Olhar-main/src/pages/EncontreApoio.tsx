import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {
  MapPin,
  Phone,
  Clock,
  Users,
  Shield,
  Heart,
  Search,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EncontreApoio = () => {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [locais, setLocais] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Carrega locais da API ao montar o componente
  useEffect(() => {
    getLocais();
  }, []);

  const getLocais = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/locais");
      console.log("Locais recebidos:", res.data);
      setLocais(res.data);
    } catch (err) {
      console.error("Erro ao buscar locais:", err);
    } finally {
      setLoading(false);
    }
  };

  // Categorias (mapeando id_categoria com nomes e ícones)
  const categories = [
    { id: "todos", name: "Todos", icon: Heart },
    { id: 1, name: "Abrigo", icon: Shield },
    { id: 2, name: "Jurídico", icon: Users },
    { id: 3, name: "Orientação", icon: Users },
    { id: 4, name: "Saúde Mental", icon: Heart },
    { id: 5, name: "ONGs", icon: Users },
  ];

  const getCategoryIcon = (id_categoria: number) => {
    switch (id_categoria) {
      case 1:
        return Shield;
      case 2:
        return Users;
      case 3:
        return Users;
      case 4:
        return Heart;
      case 5:
        return Users;
      default:
        return Heart;
    }
  };

  const getCategoryColor = (id_categoria: number) => {
    switch (id_categoria) {
      case 1:
        return "from-red-400 to-rose-400";
      case 2:
        return "from-blue-400 to-indigo-400";
      case 3:
        return "from-green-400 to-emerald-400";
      case 4:
        return "from-purple-400 to-pink-400";
      case 5:
        return "from-orange-400 to-amber-400";
      default:
        return "from-rose-400 to-pink-400";
    }
  };

  // Filtragem dinâmica
  const filteredCenters = locais.filter((local) => {
    const matchesCategory =
      selectedCategory === "todos" ||
      local.id_categoria === Number(selectedCategory);
    const matchesSearch =
      local.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      local.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-6">
              Encontre Apoio
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Localize centros de apoio, abrigos, serviços jurídicos e
              organizações que oferecem suporte especializado na sua região.
            </p>
          </div>

          {/* Busca e filtros */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Buscar por nome ou serviço..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="lg:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Lista de centros */}
          {loading ? (
            <div className="text-center text-gray-500 py-12">
              Carregando locais...
            </div>
          ) : filteredCenters.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-gray-600">
                  Tente ajustar sua busca ou filtros para encontrar o apoio que
                  você precisa.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCenters.map((local) => {
                const Icon = getCategoryIcon(local.id_categoria);
                const colorClass = getCategoryColor(local.id_categoria);

                return (
                  <div
                    key={local.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div
                      className={`h-2 bg-gradient-to-r ${colorClass} rounded-t-xl`}
                    ></div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`bg-gradient-to-br ${colorClass} rounded-lg p-2`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {
                            categories.find(
                              (cat) => cat.id === local.id_categoria
                            )?.name
                          }
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {local.nome}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {local.descricao}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <span>
                            {local.rua}, {local.numero} - {local.bairro},{" "}
                            {local.cidade}/{local.estado}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{local.telefone}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate("/mapa-interativo", { state: { local } })}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200"
                      >
                        Ver no mapa
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Informações Emergenciais */}
          <div className="mt-12 bg-rose-100 border border-rose-200 rounded-xl p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-rose-800 mb-4">
                Em Caso de Emergência
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <Phone className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                  <p className="font-semibold text-rose-800">
                    Central da Mulher
                  </p>
                  <p className="text-2xl font-bold text-rose-600">180</p>
                  <p className="text-sm text-gray-600">Gratuito e sigiloso</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Phone className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                  <p className="font-semibold text-rose-800">
                    Polícia Militar
                  </p>
                  <p className="text-2xl font-bold text-rose-600">190</p>
                  <p className="text-sm text-gray-600">Emergências</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Phone className="h-8 w-8 text-rose-600 mx-auto mb-2" />
                  <p className="font-semibold text-rose-800">SAMU</p>
                  <p className="text-2xl font-bold text-rose-600">192</p>
                  <p className="text-sm text-gray-600">Urgências médicas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EncontreApoio;
