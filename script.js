const fallbackNews = [
  {
    date: "08.11.2026",
    tag: "IEM BEIJING 2026",
    title: "NAVI — бронзові призери IEM Beijing 2026",
    text: "Команда завершила виступ на турнірі з медалями.",
    url: "https://navi.gg/ua/publications"
  }
];

const newsGrid = document.querySelector("#news-grid");

function escapeHTML(value = "") {
  return String(value).replace(/[&<>\"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  })[char]);
}

function renderNews(items) {
  const safeItems = Array.isArray(items) ? items.slice(0, 9) : [];
  if (!safeItems.length) throw new Error("Немає новин для показу");
  newsGrid.innerHTML = safeItems.map(item => `
    <article class="news-card">
      <div class="news-top"><span>${escapeHTML(item.tag || "CS2")}</span><time>${escapeHTML(item.date || "")}</time></div>
      <h3>${escapeHTML(item.title || "Новина NAVI")}</h3>
      <p>${escapeHTML(item.text || "Деталі — у першоджерелі.")}</p>
      <a href="${escapeHTML(item.url || "https://navi.gg/en/publications/game/cs2")}" target="_blank" rel="noopener">ЧИТАТИ ДАЛІ ↗</a>
    </article>
  `).join("");
}

renderNews(fallbackNews);
fetch("news.json?updated=" + Date.now(), { cache: "no-store" })
  .then(response => {
    if (!response.ok) throw new Error("Не вдалося завантажити news.json");
    return response.json();
  })
  .then(data => renderNews(data.news || data))
  .catch(error => console.info("Показуємо резервні новини:", error.message));

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}));
