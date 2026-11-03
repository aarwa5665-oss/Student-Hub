
const form = document.querySelector("#regForm");
const msg = document.querySelector("#msg");
const fullNameInput = document.querySelector("#fullName");
const passwordInput = document.querySelector("#password");

form.addEventListener("submit", (e) => {
    
    e.preventDefault();

    const name = fullNameInput.value.trim();
    const password = passwordInput.value;

    if (name === "") {
        msg.textContent = "Please enter your name!";
        msg.className = "msg-error";
        fullNameInput.focus();
        return;
    }

   
    if (password.length < 6) {
        msg.textContent = "Password must be at least 6 characters long!";
        msg.className = "msg-error";
        passwordInput.focus();
        return;
    }

    
    msg.textContent = `Welcome, ${name}! Your registration was completed successfully. `;
    msg.className = "msg-success";

    form.reset();
});
