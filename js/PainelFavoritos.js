
document.addEventListener("DOMContentLoaded", () => {
const btnFavoritos = document.getElementById('btn-abrir-favoritos');
  if (btnFavoritos) {
    btnFavoritos.addEventListener('click', () => {
      const painel = document.getElementById('painel-favoritos');
      if (painel) painel.style.display = painel.style.display === 'block' ? 'none' : 'block';
    });
  }

  // Outros binds seguros...
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      aplicarPesquisa(e.target.value);
    });
}
});
