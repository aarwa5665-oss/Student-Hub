// app.js
const grid = document.querySelector("#grid");
const search = document.querySelector("#search");
const yearSel = document.querySelector("#year");
const countEl = document.querySelector("#count");
const clearBtn = document.querySelector("#clearSaved");

let users = [];

async function load() {
  try {
    const res = await fetch("users.json");
    users = await res.json();
    applyFilters();
  } catch (err) {
    countEl.textContent = "⚠️ فشل تحميل البيانات (تأكد إنك فاتح Live Server)";
    console.error(err);
  }
}

function render(list) {
  grid.innerHTML = "";
  list.forEach(u => {
    const card = document.createElement("div");
    card.className = "card";

    const h = document.createElement("h3"); h.textContent = u.name;
    const p1 = document.createElement("p"); p1.textContent = u.email;
    const p2 = document.createElement("p"); p2.textContent = "فرقة " + u.year + " • " + u.city;

    card.append(h, p1, p2);
    grid.appendChild(card);
  });
  countEl.textContent = "النتائج: " + list.length;
}

function applyFilters() {
  const q = search.value.trim();
  const y = yearSel.value;
  const list = users.filter(u =>
    u.name.includes(q) &&
    (y === "all" || String(u.year) === y)
  );
  render(list);
  localStorage.setItem("lastSearch", q); // احفظ آخر بحث
}

search.addEventListener("input", applyFilters);
yearSel.addEventListener("change", applyFilters);

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("lastSearch");
  search.value = "";
  applyFilters();
});

// عند الفتح: رجّع آخر بحث محفوظ
search.value = localStorage.getItem("lastSearch") || "";

load();
