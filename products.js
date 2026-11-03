
const grid = document.querySelector("#grid");
const search = document.querySelector("#search");
const categorySel = document.querySelector("#category");
const countEl = document.querySelector("#count");
const clearBtn = document.querySelector("#clearSaved");
const tabLocal = document.querySelector("#tabLocal");
const tabApi = document.querySelector("#tabApi");
const sourceLabel = document.querySelector("#sourceLabel");

let products = [];

const localIcons = {
  "كتاب": "📚",
  "كورس": "💻",
  "أداة": "🛠️"
};

async function load() {
  try {
    const res = await fetch("products.json");
    products = await res.json();
    sourceLabel.textContent = "المصدر: products.json (محلي)";
    
    categorySel.innerHTML = `
      <option value="all">كل الأقسام</option>
      <option value="كتاب">كتاب</option>
      <option value="كورس">كورس</option>
      <option value="أداة">أداة</option>
    `;
    categorySel.value = "all";
    applyFilters();
  } catch (err) {
    countEl.textContent = "⚠️ فشل تحميل البيانات (تأكد إنك فاتح Live Server)";
    console.error(err);
  }
}
async function loadFromApi() {
  try {
    sourceLabel.textContent = "المصدر: FakeStoreAPI (أونلاين بونص ⭐)";
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    products = data.map(item => ({
      id: item.id,
      title: item.title,
      category: item.category,
      price: item.price,
      image: item.image, 
      isOnline: true
    }));

    const uniqueCats = ["all", ...new Set(data.map(item => item.category))];
    categorySel.innerHTML = uniqueCats
      .map(c => `<option value="${c}">${c === "all" ? "كل الأقسام" : c}</option>`)
      .join("");
    categorySel.value = "all";

    applyFilters();
  } catch (err) {
    countEl.textContent = "⚠️ فشل سحب البيانات من النت";
    console.error(err);
  }
}

function render(list) {
  grid.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card product-card";
    const imgWrap = document.createElement("div");
    imgWrap.className = "product-img-wrap";

    if (p.image) {
      const img = document.createElement("img");
      img.src = p.image;
      img.alt = p.title;
      img.loading = "lazy";
      imgWrap.appendChild(img);
    } else {
      const icon = document.createElement("span");
      icon.className = "product-emoji";
      icon.textContent = localIcons[p.category] || "📦";
      imgWrap.appendChild(icon);
    }

    const badge = document.createElement("span");
    badge.className = "product-category-badge";
    badge.textContent = p.category;

    const h = document.createElement("h3");
    h.textContent = p.title;
    h.className = "product-title";

    const p2 = document.createElement("p");
    p2.className = "product-price";
    p2.textContent = p.isOnline ? `$${p.price}` : `${p.price} ج.م`;

    card.append(imgWrap, badge, h, p2);
    grid.appendChild(card);
  });
  countEl.textContent = "النتائج: " + list.length;
}
function applyFilters() {
  const q = search.value.trim().toLowerCase();
  const c = categorySel.value;
  const list = products.filter(p =>
    p.title.toLowerCase().includes(q) &&
    (c === "all" || p.category === c)
  );
  render(list);
  localStorage.setItem("lastProductSearch", q); // احفظ آخر بحث
}

search.addEventListener("input", applyFilters);
categorySel.addEventListener("change", applyFilters);

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("lastProductSearch");
  search.value = "";
  applyFilters();
});

tabLocal.addEventListener("click", () => {
  tabLocal.classList.add("active");
  tabApi.classList.remove("active");
  load();
});

tabApi.addEventListener("click", () => {
  tabApi.classList.add("active");
  tabLocal.classList.remove("active");
  loadFromApi();
});

search.value = localStorage.getItem("lastProductSearch") || "";

load();
