
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Empreendedorismo from "./pages/Empreendedorismo";
import PlanoCarreira from "./pages/PlanoCarreira";
import Ludis from "./pages/Ludis";
import MapaInterativo from "./pages/MapaInterativo";
import CentralAjuda from "./pages/CentralAjuda";
import FaleConosco from "./pages/FaleConosco";
import EncontreApoio from "./pages/EncontreApoio";
import Sobre from "./pages/Sobre";
import NotFound from "./pages/NotFound";
import Map from "./pages/Mep"


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/empreendedorismo" element={<Empreendedorismo />} />
          <Route path="/plano-carreira" element={<PlanoCarreira />} />
          <Route path="/ludis" element={<Ludis />} />
          <Route path="/mapa-interativo" element={<MapaInterativo />} />
          <Route path="/central-ajuda" element={<CentralAjuda />} />
          <Route path="/fale-conosco" element={<FaleConosco />} />
          <Route path="/encontre-apoio" element={<EncontreApoio />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/mep" element={<Map/>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
