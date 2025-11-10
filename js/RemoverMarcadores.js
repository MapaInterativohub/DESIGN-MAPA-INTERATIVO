function limparMarcadores() {
  todosMarcadores.forEach(m => map.removeLayer(m));
  todosMarcadores = [];
}
