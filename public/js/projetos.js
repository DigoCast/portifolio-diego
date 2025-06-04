function deletarProjeto(id) {
    if (confirm("Deseja realmente excluir este projeto?")) {
      fetch(`/projects/${id}`, {
        method: 'DELETE',
      })
      .then(res => {
        if (res.ok) {
          location.reload();
        } else {
          alert("Erro ao deletar.");
        }
      });
    }
  }

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.project-card')

  input.addEventListener('input', () => {
    const search = input.value.toLowerCase()

    cards.forEach(card => {
      const title = card.dataset.title;
      const isMatch = title.includes(search);
      card.style.display = isMatch ? 'flex' : 'none';
    })
  })
})