// Liste de projets
const projects = [
  {
    title: "Re Leveling",
    desc: "WebApp perso inspirée de Solo Leveling."
  },
  {
    title: "Webfolio Giremu",
    desc: "Landing page portfolio sombre."
  }
];

// Rendu des projets
const projectList = document.getElementById("projectList");
projects.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p>`;
  projectList.appendChild(card);
});

// Toggle thème clair/sombre
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});
