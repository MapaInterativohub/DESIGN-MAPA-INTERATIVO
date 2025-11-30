import React, { useState, useEffect, useRef } from "react";
import Navigation from "../components/Navigation";
import { MapPin, Search, Filter, Expand } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

// 🔧 Correção para ícones padrão do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapaInterativo = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedCity, setSelectedCity] = useState<string>("todas");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cities, setCities] = useState<string[]>([]);
  const [locais, setLocais] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);

  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Recebe local vindo da página "EncontreApoio"
  const location = useLocation();
  const localSelecionado = location.state?.local;

  // Busca locais e extrai cidades únicas
  const getLocais = () => {
    axios
      .get("http://localhost:3001/api/locais")
      .then((res) => {
        setLocais(res.data);

        const uniqueCities = Array.from(
          new Set(res.data.map((l) => l.cidade?.trim()).filter(Boolean))
        );
        setCities(uniqueCities as string[]);
      })
      .catch((err) => console.error("Erro ao buscar locais", err));
  };

  // Busca categorias
  const getCategorias = () => {
    axios
      .get("http://localhost:3001/api/categorias")
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Erro ao buscar categorias", err));
  };

  useEffect(() => {
    getCategorias();
    getLocais();
  }, []);

  // Mapa de cores (nome -> hex) usado para marcadores e badges
  const colorMap: Record<string, string> = {
    blue: "#3B82F6",
    green: "#10B981",
    purple: "#8B5CF6",
    red: "#EF4444",
    gray: "#6B7280",
  };

  // Filtragem principal (corrige comparação de tipos convertendo IDs para string)
  const filteredLocations = locais.filter((local) => {
    const localCatId =
      local.id_categoria !== undefined
        ? String(local.id_categoria)
        : local.categoria?.id_categoria !== undefined
          ? String(local.categoria.id_categoria)
          : undefined;

    const matchesCategory =
      selectedCategory === "todos" ||
      localCatId === selectedCategory;

    const matchesSearch =
      (local.nome || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (local.descricao || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCity =
      selectedCity === "todas" ||
      (local.cidade || "").toLowerCase() === selectedCity.toLowerCase();

    return matchesCategory && matchesSearch && matchesCity;
  });

  // Retorna a cor hex da categoria de um local (ou fallback)
  const getCategoryHex = (local) => {
    const categoria =
      local.categoria ||
      categorias.find((c) => String(c.id_categoria) === String(local.id_categoria));

    const colorKey = categoria?.color || "gray";
    return colorMap[colorKey] || colorMap.gray;
  };

  // Ícone personalizado (usa hex direto)
  const getMarkerIcon = (local) => {
    const hex = getCategoryHex(local);

    return L.divIcon({
      className: "custom-div-icon",
      html: `<div style="background-color: ${hex}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [25, 25],
      iconAnchor: [12, 12],
    });
  };

  // Inicializa o mapa
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = L.map(mapContainerRef.current).setView(
      [-20.2976, -40.2958],
      10
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Atualiza marcadores com base no filtro
  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) =>
      mapRef.current?.removeLayer(marker)
    );
    markersRef.current = [];

    filteredLocations.forEach((local) => {
      // evita marcadores com coordenadas inválidas
      if (!local.latitude || !local.longitude) return;

      const marker = L.marker([local.latitude, local.longitude], {
        icon: getMarkerIcon(local),
      }).addTo(mapRef.current!);

      const popupContent = `
  <div class="p-3 min-w-[250px] font-sans">
    <h3 class="font-bold text-lg text-gray-900 mb-1">
      ${local.nome}
    </h3>

    <p class="text-sm text-gray-700 mb-3 leading-snug">
      ${local.descricao?.replace(/\n/g, "<br>") || ""}
    </p>

    <div class="flex items-start text-sm text-gray-600 mb-1">
      <span class="mr-2">📍</span>
      <span>
        ${local.rua || ""}${local.numero ? `, ${local.numero}` : ""} - ${local.bairro || ""}
        ${local.cidade ? `, ${local.cidade}` : ""}${local.estado ? `/${local.estado}` : ""}
      </span>
    </div>

    ${local.telefone
          ? `
        <div class="flex items-start text-sm text-gray-600">
          <span class="mr-2">📞</span>
          <span>${local.telefone}</span>
        </div>
        `
          : ""
        }
  </div>
`;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });

    if (markersRef.current.length > 0) {
      const group = new L.FeatureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [filteredLocations, categorias]);

  // Centraliza o mapa se vier um local selecionado da página anterior
  useEffect(() => {
    if (!localSelecionado || !mapRef.current) return;

    const {
      latitude,
      longitude,
      nome,
      descricao,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      telefone,
    } = localSelecionado;

    if (mapRef.current._highlightMarker) {
      mapRef.current.removeLayer(mapRef.current._highlightMarker);
    }

    const highlightIcon = L.divIcon({
      className: "custom-div-icon",
      html: `
      <div style="
        background-color: #E11D48;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.4);
      "></div>
    `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    const marker = L.marker([latitude, longitude], { icon: highlightIcon }).addTo(mapRef.current);

    mapRef.current._highlightMarker = marker;

    const popupHtml = `
    <div class="p-3 min-w-[260px]">
      <h3 class="font-bold text-lg mb-2">${nome}</h3>
      <p class="text-sm text-gray-700 mb-2">
        ${descricao
        ?.replace(/\n/g, "<br>")
        ?.replace(/\/strong/g, "</strong>")
        ?.replace(/strong/g, "<strong>")
      || ""}
      </p>
      <div class="text-sm text-gray-600 mb-2 flex items-start">
        <span class="mr-1">📍</span>
        <span>${rua || ""}${numero ? `, ${numero}` : ""}${bairro ? ` - ${bairro}` : ""}${cidade ? `, ${cidade}` : ""
      }${estado ? `/${estado}` : ""}</span>
      </div>
      ${telefone
        ? `<div class="text-sm text-gray-600 flex items-center">
              <span class="mr-1">📞</span> ${telefone}
            </div>`
        : ""
      }
    </div>
  `;

    marker.bindPopup(popupHtml).openPopup();

    mapRef.current.setView([latitude, longitude], 15);

    return () => {
      if (mapRef.current && mapRef.current._highlightMarker) {
        mapRef.current.removeLayer(mapRef.current._highlightMarker);
        mapRef.current._highlightMarker = null;
      }
    };
  }, [localSelecionado]);

  // Centraliza o mapa na cidade selecionada
  useEffect(() => {
    if (!mapRef.current || selectedCity === "todas") return;

    const cityLocals = locais.filter(
      (l) => (l.cidade || "").toLowerCase() === selectedCity.toLowerCase()
    );
    if (cityLocals.length > 0) {
      const group = new L.FeatureGroup(
        cityLocals.map((l) => L.marker([l.latitude, l.longitude]))
      );
      mapRef.current.fitBounds(group.getBounds().pad(0.2));
    }
  }, [selectedCity, locais]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white ">
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Mapa Interativo - Espírito Santo
        </h1>
        <p className="text-gray-600 mt-2">
          Veja instituições, centros de apoio e locais de atendimento no ES
        </p>
      </section>

      {/* Filtros */}
      <section className="px-6 pb-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">

          {/* Busca */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar locais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Agrupamento de filtros */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Filtro por cidade */}
            <div className="flex items-center space-x-2 w-full sm:w-[200px]">
              <Filter className="text-gray-400 h-5 w-5" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
              >
                <option value="todas">Todas as cidades</option>
                {cities.map((cidade, index) => (
                  <option key={index} value={cidade}>
                    {cidade}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por categoria */}
            <div className="flex items-center space-x-2 w-full sm:w-[200px]">
              <Filter className="text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
              >
                <option value="todos">Todas as categorias</option>
                {categorias.map((cat) => (
                  <option key={cat.id_categoria} value={String(cat.id_categoria)}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </section>


      {/* Mapa e Lista */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Mapa */}
        <div
          ref={mapContainerRef}
          className="bg-white rounded-xl shadow-lg h-[500px] relative z-[10]">
          <div className="flex justify-end mb-3">
            <button
              onClick={() => (window.location.href = "/mep")}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition z-[1000] mt-3 mr-3">
              <Expand />
            </button>
          </div></div>

        {/* Lista de locais */}
        <div className="h-[500px] overflow-y-auto">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Locais Encontrados ({filteredLocations.length})
          </h3>

          {filteredLocations.map((local) => {
            const hex = getCategoryHex(local);
            const categoryName =
              local.categoria?.nome ||
              categorias.find(
                (c) => String(c.id_categoria) === String(local.id_categoria)
              )?.nome ||
              "Sem categoria";

            return (
              <div
                key={local.id_local}
                className="bg-white rounded-xl shadow p-4 mb-4 hover:shadow-lg cursor-pointer"
                onClick={() =>
                  mapRef.current?.setView([local.latitude, local.longitude], 15)
                }
              >
                <div className="flex justify-between mb-2">
                  <h4 className="font-bold text-gray-800">{local.nome}</h4>
                  <span
                    style={{
                      backgroundColor: `${hex}22`, // versão translúcida do hex
                      color: hex,
                      padding: "4px 10px",
                      borderRadius: 9999,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {categoryName}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{local.descricao}</p>
                <p className="text-xs text-gray-500">
                  📍 {local.rua}, {local.numero} - {local.bairro}{" "}
                  {local.cidade ? `(${local.cidade})` : ""}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MapaInterativo;
