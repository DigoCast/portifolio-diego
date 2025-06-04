const checkbox = document.getElementById("tema-btn");
const body = document.body;

window.addEventListener("DOMContentLoaded", () => {
  const temaSalvo = localStorage.getItem("tema");

  if (temaSalvo === "dark-mode") {
    body.classList.add("dark-mode");
    checkbox.checked = true;
  } else {
    body.classList.remove("dark-mode");
    checkbox.checked = false;
  }
});

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    body.classList.add("dark-mode");
    localStorage.setItem("tema", "dark-mode");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("tema", "light");
  }
});
