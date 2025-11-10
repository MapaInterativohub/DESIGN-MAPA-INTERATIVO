function aplicarPesquisaEFiltro(termoPesquisa) {
  console.log('Aplicando pesquisa + filtro:', termoPesquisa, filtroAtual);

  // Remove todos os marcadores do grupo
  marcadoresGroup.clearLayers();

  // Obtém todos os locais
  const todosLocais = window.obterTodosLocais ? window.obterTodosLocais() : [];

  // Aplica filtro de categoria primeiro
  let locaisFiltrados = [];
  if (filtroAtual === "Todos") {
    locaisFiltrados = todosLocais;
  } else {
    locaisFiltrados = todosLocais.filter(local => local.categoria === filtroAtual);
  }

  // Aplica pesquisa se houver termo
  if (termoPesquisa && termoPesquisa.trim() !== '') {
    const termo = termoPesquisa.toLowerCase().trim();
    locaisFiltrados = locaisFiltrados.filter(local => 
      local.nome.toLowerCase().includes(termo) ||
      local.categoria.toLowerCase().includes(termo) ||
      local.endereco.toLowerCase().includes(termo)
    );
  }

  console.log(`Mostrando ${locaisFiltrados.length} locais após filtro + pesquisa`);

  // Cria os marcadores
  criarMarcadoresFiltrados(locaisFiltrados);
}