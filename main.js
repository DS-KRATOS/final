// main.js — автономная версия, без jQuery
document.addEventListener("DOMContentLoaded", () => {
  console.log("main.js loaded");

  /* ===появление мейна=== */
  const main = document.querySelector("main");
  if (main) {
    main.style.opacity = 0;
    main.style.transition = "opacity 0.6s ease";
    requestAnimationFrame(() => (main.style.opacity = 1));
  }

  /* ==оформление кнопок== */
  document.querySelectorAll(".neon-btn, .btn-pixel, .hero-link").forEach(el => {
    el.addEventListener("mouseenter", () => el.classList.add("hover-glow"));
    el.addEventListener("mouseleave", () => el.classList.remove("hover-glow"));
  });

  /* ===карусель=== */
  (function initCarousel() {
    const carousel = document.querySelector("#gameCarousel");
    if (!carousel) return console.log("carousel: not found");

    const slides = Array.from(carousel.querySelectorAll(".carousel-item"));
    if (!slides.length) return console.warn("carousel: no slides found");

    let current = 0;

    //корректные базовые стили
    slides.forEach((s, i) => {
      s.style.position = "absolute";
      s.style.inset = "0";
      s.style.transition = "opacity 1s ease";
      s.style.opacity = i === 0 ? "1" : "0";
      s.style.zIndex = i === 0 ? "2" : "1";
    });

    carousel.querySelector(".carousel-inner").style.position = "relative";
    carousel.querySelector(".carousel-inner").style.height = carousel.clientHeight + "px";

    console.log(`carousel: ${slides.length} slides`);

    //смена изображений
    setInterval(() => {
      const prev = current;
      current = (current + 1) % slides.length;
      slides[prev].style.opacity = "0";
      slides[prev].style.zIndex = "1";
      slides[current].style.opacity = "1";
      slides[current].style.zIndex = "2";
    }, 3000);
  })();

  /* === переворот фоток=== */
  (function initHeroes() {
    const cards = document.querySelectorAll(".hero-card");
    if (!cards.length) return;

    cards.forEach(card => {
      const h = card.querySelector("h3");
      const p = card.querySelector("p");

      if (h && p) {
        if (!card.dataset.frontName) card.dataset.frontName = h.textContent.trim();
        if (!card.dataset.frontDesc) card.dataset.frontDesc = p.textContent.trim();
      }

      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
        card.classList.add("glow");
        setTimeout(() => card.classList.remove("glow"), 600);

        const isFlipped = card.classList.contains("flipped");
        const img = card.querySelector("img");

        // анимация поворота изображения
        if (img) {
          img.style.transition = "transform 0.6s ease";
          img.style.transform = isFlipped ? "rotateX(180deg) rotateY(180deg)" : "rotate(0deg)";
        }

        // смена текста
        const nameEl = card.querySelector("h3");
        const descEl = card.querySelector("p");
        if (nameEl && descEl) {
          nameEl.style.transition = descEl.style.transition = "opacity 0.25s";
          nameEl.style.opacity = descEl.style.opacity = "0";

          setTimeout(() => {
            if (isFlipped) {
              nameEl.textContent = card.dataset.backName || "Альтер-форма";
              descEl.textContent = card.dataset.backDesc || "Игнориует.";
            } else {
              nameEl.textContent = card.dataset.frontName;
              descEl.textContent = card.dataset.frontDesc;
            }
            nameEl.style.opacity = descEl.style.opacity = "1";
          }, 260);
        }
      });
    });
  })();


$(document).ready(function() {
  console.log("main.js loaded ✅");

  // === ПЛАВНОЕ ПОЯВЛЕНИЕ СТРАНИЦЫ ===
  $("main").css("opacity", 0).animate({ opacity: 1 }, 800);

// === ПОИСК ГЕРОЕВ ===
$("#heroSearch").on("input", function() {
  const value = $(this).val().toLowerCase();
  $(".hero-card").each(function() {
    const name = $(this).find(".hero-name").text().toLowerCase();
    $(this).toggle(name.includes(value));
  });
});

// === ФИЛЬТРАЦИЯ ГЕРОЕВ ===
$(".neon-filter-btn").on("click", function() {
  $(".neon-filter-btn").removeClass("active");
  $(this).addClass("active");
  const filter = $(this).data("filter");

  if (filter === "all") {
    $(".hero-card").fadeIn(300);
  } else {
    $(".hero-card").hide();
    $(`.hero-card[data-type='${filter}']`).fadeIn(300);
  }
});



  // === МОДАЛЬНОЕ ОКНО ГЕРОЯ ===
$(".hero-card").on("dblclick", function() {
        const imgSrc = $(this).find("img").attr("src");
        const name = $(this).find(".hero-name").text();
        const desc = $(this).find(".hero-desc").text();

        $("#modalImg").attr("src", imgSrc);
        $("#modalName").text(name);
        $("#modalDesc").text(desc);
        $("#heroModal").fadeIn(250).css("display", "flex");
      });

      $(".close").on("click", () => $("#heroModal").fadeOut(200));

      $(window).on("click", function(e) {
        if ($(e.target).is("#heroModal")) $("#heroModal").fadeOut(200);
      });
    });




  /* === слайдер правил === */
  (function initRules() {
    const slide = document.querySelector("#ruleSlide");
    if (!slide) return;

    const rules = [
      { title: "Материалы", text: "50 карт, жетоны урона, поражения и руководство. Каждая колода состоит из 25 героев/лидеров." },
      { title: "Цель игры", text: "Победи лидера противника! Если твой лидер погиб — ты проиграл." },
      { title: "Подготовка", text: "Возьмите 5 карт, выберите героя, который станет лидером. Остальные станут стартовой рукой. Определите первого игрока случайно." },
      { title: "Ход игры", text: "Раунд состоит из трёх волн: фронт, центр и тыл атакуют поочерёдно." },
      { title: "Действия в волне", text: "Герой может атаковать, активировать способность, отступить или вылечить союзника." },
      { title: "Атака", text: "Ближняя атака — против врага напротив. Дальняя — по любой цели в зоне видимости." },
      { title: "Поражения и урон", text: "Если жетонов урона столько же, сколько здоровья — герой погибает." },
      { title: "Конец раунда", text: "После всех волн начинается новый раунд. Эффекты сбрасываются." },
      { title: "Победа", text: "Если лидер противника побеждён, ты выигрываешь. Если оба погибли в конце волны — ничья." },
      { title: "Советы", text: "Планируй отряды: герои в тылу безопаснее, но атакуют слабее." }
    ];

    let idx = 0;
    const titleEl = document.querySelector("#ruleTitle");
    const textEl = document.querySelector("#ruleText");

    // анимация смены правил
    [titleEl, textEl].forEach(el => {
      el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    });

    function show(i) {
      titleEl.style.opacity = textEl.style.opacity = "0";
      titleEl.style.transform = textEl.style.transform = "scale(0.95)";
      setTimeout(() => {
        titleEl.textContent = rules[i].title;
        textEl.textContent = rules[i].text;
        titleEl.style.opacity = textEl.style.opacity = "1";
        titleEl.style.transform = textEl.style.transform = "scale(1)";
      }, 350);
    }

    document.querySelector("#nextRule")?.addEventListener("click", () => {
      idx = (idx + 1) % rules.length;
      show(idx);
    });

    document.querySelector("#prevRule")?.addEventListener("click", () => {
      idx = (idx - 1 + rules.length) % rules.length;
      show(idx);
    });

    show(0);
  })();

  $(document).ready(function() {
    const table = $("#customHeroTable tbody");
    let heroes = JSON.parse(localStorage.getItem("customHeroes") || "[]");

    function render() {
      table.empty();
      heroes.forEach((h, i) => {
        table.append(`
          <tr>
            <td>${h.name}</td>
            <td>${h.desc}</td>
            <td class="actions">
              <button class="pixel-btn edit" data-i="${i}" title="Редактировать">✏</button>
              <button class="pixel-btn delete" data-i="${i}" title="Удалить">🗑</button>
            </td>
          </tr>
        `);
      });
    }
    render();

    $("#heroForm").on("submit", function(e) {
      e.preventDefault();
      const name = $("#heroName").val().trim();
      const desc = $("#heroDesc").val().trim();
      if (!name || !desc) return;
      heroes.push({ name, desc });
      localStorage.setItem("customHeroes", JSON.stringify(heroes));
      render();
      this.reset();
    });

    table.on("click", ".delete", function() {
      const i = $(this).data("i");
      heroes.splice(i, 1);
      localStorage.setItem("customHeroes", JSON.stringify(heroes));
      render();
    });

    table.on("click", ".edit", function() {
      const i = $(this).data("i");
      const newName = prompt("Новое имя героя:", heroes[i].name);
      const newDesc = prompt("Новое описание:", heroes[i].desc);
      if (newName && newDesc) {
        heroes[i] = { name: newName, desc: newDesc };
        localStorage.setItem("customHeroes", JSON.stringify(heroes));
        render();
      }
    });
  });


});
