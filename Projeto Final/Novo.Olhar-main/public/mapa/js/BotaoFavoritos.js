// === FAVORITOS ===
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

function adicionarFavorito(local) {
  if (!favoritos.some(fav => fav.nome === local.nome)) {
    favoritos.push(local);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    alert(`${local.nome} foi adicionado aos favoritos!`);
    renderizarFavoritos();
  } else {
    alert("Este local já está nos favoritos!");
  }
}

function removerFavorito(nome) {
  favoritos = favoritos.filter(fav => fav.nome !== nome);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  renderizarFavoritos();
}

function renderizarFavoritos() {
  const container = document.getElementById('favoritos-container');
  container.innerHTML = '';

  if (favoritos.length === 0) {
    container.innerHTML = '<p>Nenhum favorito adicionado ainda.</p>';
    return;
  }

  favoritos.forEach(fav => {
    const item = document.createElement('div');
    item.classList.add('favorito-item');
    item.innerHTML = `
      <p><strong>${fav.nome}</strong></p>
      <button onclick="removerFavorito('${fav.nome}')">Remover</button>
    `;
    container.appendChild(item);
  });
}