// ==========================================
// EXERCISE 1: Full Counter (counter.js)
// ==========================================

const countEl = document.querySelector("#count");
let count = 0;

// Reusable render function — updates the DOM and handles styling
function render() {
    countEl.textContent = count;

    // Bonus requirement: automatically turn red when negative
    if (count < 0) {
        countEl.classList.add("negative");
    } else {
        countEl.classList.remove("negative");
    }
}

// 3 Buttons event listeners
document.querySelector("#plus")
    .addEventListener("click", () => {
        count++;
        render();
    });

document.querySelector("#minus")
    .addEventListener("click", () => {
        count--;
        render();
    });

document.querySelector("#reset")
    .addEventListener("click", () => {
        count = 0;
        render();
    });
