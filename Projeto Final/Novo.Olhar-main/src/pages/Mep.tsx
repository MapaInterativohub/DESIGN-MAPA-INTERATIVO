import Navigation from "@/components/Navigation";
function Mep() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-50 to-white z-0">
      {/* Menu no topo */}
      <Navigation />

      {/* Iframe ocupando TODO o espaço restante */}
      <div className="flex-1">
        <iframe
          src="/mapa/index.html"
          className="w-full h-full"
          style={{ border: "none" }}
        ></iframe>
      </div>
    </div>
  );
}

export default Mep;
