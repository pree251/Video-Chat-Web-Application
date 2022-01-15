const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (password === "dcn123") {
        document.getElementById("login-form-submit").onclick = function () {
            location.href = "room.ejs"; 
        };
    } else {
        alert('Invalid Password!');
    }
})