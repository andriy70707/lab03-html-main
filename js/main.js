// =======================
// СТАРТ
// =======================
document.addEventListener("DOMContentLoaded", init);

function init() {
  initActiveNav();
  initThemeToggle();
  initBackToTop();
  initYear();
  initAccordion();
  initButton();
  initModal();          // 🔥 НОВЕ
  initContactForm();
}

// =======================
// АКТИВНЕ МЕНЮ
// =======================
function initActiveNav() {
  const links = document.querySelectorAll(".nav-list a");
  const path = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute("href");

    if (path.includes(href)) {
      link.classList.add("active");
    }
  });
}

// =======================
// ТЕМНА ТЕМА
// =======================
function initThemeToggle() {
  const btn = document.getElementById("themeBtn");
  if (!btn) return;

  const saved = localStorage.getItem("siteTheme");

  if (saved === "dark") {
    document.body.classList.add("dark");
  }

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const theme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("siteTheme", theme);
  });
}

// =======================
// КНОПКА ВГОРУ
// =======================
function initBackToTop() {
  const btn = document.getElementById("topBtn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =======================
// РІК У FOOTER
// =======================
function initYear() {
  const year = document.getElementById("year");
  if (!year) return;

  year.textContent = new Date().getFullYear();
}

// =======================
// АКОРДЕОН
// =======================
function initAccordion() {
  const buttons = document.querySelectorAll(".accordion-btn");
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      content.classList.toggle("open");
    });
  });
}

// =======================
// КНОПКА (тест)
// =======================
function initButton() {
  const btn = document.getElementById("testBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    alert("Працює 😎");
  });
}

// =======================
// 🔥 МОДАЛКА (НОВА)
// =======================
function initModal() {
  const modal = document.getElementById("modal");
  const open = document.getElementById("openModal");
  const close = document.getElementById("closeModal");

  if (!modal || !open || !close) return;

  open.addEventListener("click", () => {
    modal.hidden = false;
  });

  close.addEventListener("click", () => {
    modal.hidden = true;
  });

  // закриття по кліку поза блоком
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.hidden = true;
    }
  });
}

// =======================
// ФОРМА
// =======================
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const draftKey = "contactDraft";

  const textarea = document.getElementById("message");
  const counter = document.getElementById("charCount");

  // 🔥 ЛІЧИЛЬНИК
  if (textarea && counter) {
    textarea.addEventListener("input", () => {
      counter.textContent = textarea.value.length + " / 500";
    });
  }

  // Відновлення
  const saved = localStorage.getItem(draftKey);
  if (saved) {
    const data = JSON.parse(saved);

    Object.keys(data).forEach(key => {
      if (form.elements[key]) {
        form.elements[key].value = data[key];
      }
    });
  }

  // Збереження
  form.addEventListener("input", () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    localStorage.setItem(draftKey, JSON.stringify(data));
  });

  // Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.name || data.name.length < 2) {
      alert("Ім'я мінімум 2 символи");
      return;
    }

    if (!data.email || !data.email.includes("@")) {
      alert("Невірний email");
      return;
    }

    if (!data.message) {
      alert("Введи повідомлення");
      return;
    }

    // 🔥 ВИВІД НА СТОРІНКУ (замість alert)
    const result = document.getElementById("formResult");
    if (result) {
      result.innerHTML = `
        <p><strong>Ім’я:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Повідомлення:</strong> ${data.message}</p>
      `;
    }

    localStorage.removeItem(draftKey);
    form.reset();
  });
}