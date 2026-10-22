// ==========================================
// EXERCISE 2: Form Validation (register.js)
// ==========================================

const form = document.querySelector("#regForm");
const msg = document.querySelector("#msg");
const fullNameInput = document.querySelector("#fullName");
const passwordInput = document.querySelector("#password");

form.addEventListener("submit", (e) => {
    // 1. Prevent default form submission
    e.preventDefault();

    const name = fullNameInput.value.trim();
    const password = passwordInput.value;

    // 2. Validate Full Name (not empty using trim())
    if (name === "") {
        msg.textContent = "Please enter your name!";
        msg.className = "msg-error";
        fullNameInput.focus();
        return;
    }

    // 3. Validate Password (at least 6 characters)
    if (password.length < 6) {
        msg.textContent = "Password must be at least 6 characters long!";
        msg.className = "msg-error";
        passwordInput.focus();
        return;
    }

    // 4. Success: Green welcome message with the user's name
    msg.textContent = `Welcome, ${name}! Your registration was completed successfully. 🎉`;
    msg.className = "msg-success";

    // Optional: reset form fields
    form.reset();
});
