// ==========================================
// EXERCISE 3: To-Do List (todo.js)
// ==========================================

const input = document.querySelector("#taskInp");
const list = document.querySelector("#list");
const taskCount = document.querySelector("#taskCount");
const clearBtn = document.querySelector("#clearBtn");

// Bonus: Live task counter
function updateCounter() {
    if (taskCount) {
        const count = list.children.length;
        if (count === 0) {
            taskCount.textContent = "No tasks yet";
        } else if (count === 1) {
            taskCount.textContent = "You have 1 task";
        } else {
            taskCount.textContent = `You have ${count} tasks`;
        }
    }
}

// 1. Add task via button click
document.querySelector("#addBtn")
    .addEventListener("click", addTask);

// 2. Add task via Enter key (keydown event checking e.key)
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

// 3. Clear All Tasks (Bonus)
if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        list.innerHTML = "";
        updateCounter();
        input.focus();
    });
}

function addTask() {
    // Prevent adding empty tasks using trim()
    const text = input.value.trim();
    if (text === "") return;

    // Create list item (li)
    const li = document.createElement("li");

    // Task text container
    const span = document.createElement("span");
    span.textContent = text;
    li.appendChild(span);

    // Create delete button inside the li
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent toggling completion when clicking delete
        li.remove();
        updateCounter();
    });

    // Bonus: Click on task to toggle completed (strikethrough & faded color)
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    li.appendChild(del);
    list.appendChild(li);

    // Clear input field and return focus
    input.value = "";
    input.focus();

    // Update live counter
    updateCounter();
}

// Initial counter update
updateCounter();
