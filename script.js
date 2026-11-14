// Демонстраційні новини. Додавай нові записи на початок списку.
const news = [
  {
    date: "08.11.2026",
    tag: "IEM BEIJING 2026",
    title: "NAVI — бронзові призери IEM Beijing 2026",
    text: "Команда завершила виступ на турнірі з медалями. Відкрий офіційне джерело, щоб прочитати деталі.",
    url: "https://navi.gg/ua/publications"
  },
  {
    date: "04.11.2026",
    tag: "PLAYOFFS",
    title: "NAVI пройшли до плей-оф IEM Beijing",
    text: "NAVI здобули перемогу над Falcons у фіналі нижньої сітки та продовжили боротьбу на турнірі.",
    url: "https://navi.gg/ua/teams/cs2"
  },
  {
    date: "04.11.2026",
    tag: "MATCHDAY",
    title: "Матч NAVI проти B8 на IEM Beijing",
    text: "Офіційна сторінка NAVI публікувала анонси матчів команди на турнірі.",
    url: "https://navi.gg/ua/matches/cs2"
  }
];

const newsGrid = document.querySelector("#news-grid");
newsGrid.innerHTML = news.map(item => `
  <article class="news-card">
    <div class="news-top"><span>${item.tag}</span><time>${item.date}</time></div>
    <h3>${item.title}</h3>
    <p>${item.text}</p>
    <a href="${item.url}" target="_blank" rel="noopener">ЧИТАТИ НА ОФІЦІЙНОМУ NAVI.GG ↗</a>
  </article>
`).join("");

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
