// menu toggler button
const btn = document.querySelector('button.menu-button');
const menu = document.querySelector(".mobile-menu");
btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
})


//show password
const password = document.getElementById("password");
const showPassword = document.getElementById("showPassword");

showPassword.addEventListener("click", function() {
  if (this.checked) {
    password.type = "text";
  } else {
    password.type = "password";
  }
});


//enter key

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submitButton");
usernameInput.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    passwordInput.focus();
  }
});

passwordInput.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    submitButton.click();
  }
});







