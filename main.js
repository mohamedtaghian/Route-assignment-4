"use strict";

// Elements select

const userName = document.getElementById("user-name");
const userNameAlert = document.querySelector(".name-validation");
const emailSignUp = document.getElementById("email-sign-up");
const emailSignUpAlert = document.querySelector(".email-validation");
const passwordSignUp = document.getElementById("password-sign-up");
const passwordSignUpAlert = document.querySelector(".password-validation");
const btnSignUp = document.querySelector(".btn-sign-up");
const signUpForm = document.querySelector(".sign-up-form");
const userWelcome = document.querySelector(".user-welcome");
const requiredStatus = document.querySelector(".status-required");
const sucessStatus = document.querySelector(".status-success");
const existStatus = document.querySelector(".status-exist");
const incorrectStatus = document.querySelector(".status-incorrect");

const userNameReg = /^[a-z0-9_-]{3,15}$/i;
const emailSignUpReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const passwordSignUpReg =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/i;

// Array of all signed up accounts
let accounts = [];

// Get items from local storage
if (JSON.parse(localStorage.getItem("accounts")) != null) {
  accounts = JSON.parse(localStorage.getItem("accounts"));
}

// Functions
// Check inputs vaildation
const inputValidation = function (inputReg, input) {
  if (inputReg.test(input.value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
};

const successMsg = function () {
  // Show sucess message
  sucessStatus.classList.remove("d-none");

  // Hide other status
  existStatus.classList.add("d-none");
  requiredStatus.classList.add("d-none");
  incorrectStatus?.classList.add("d-none");
};
const existMsg = function () {
  // Show exist status
  existStatus.classList.remove("d-none");

  // Hide other status
  requiredStatus.classList.add("d-none");
  sucessStatus.classList.add("d-none");
  incorrectStatus?.classList.add("d-none");
};
const requiredMsg = function () {
  // Show exist status
  requiredStatus.classList.remove("d-none");

  // Hide other status
  sucessStatus.classList.add("d-none");
  existStatus.classList.add("d-none");
  incorrectStatus?.classList.add("d-none");
};
const incorrectMsg = function () {
  // Show exist status
  incorrectStatus.classList.remove("d-none");

  // Hide other status
  sucessStatus.classList.add("d-none");
  existStatus.classList.add("d-none");
  requiredStatus.classList.add("d-none");
};

// Event handelrs
userName?.addEventListener("input", function () {
  inputValidation(userNameReg, userName);
});
emailSignUp?.addEventListener("input", function () {
  inputValidation(emailSignUpReg, emailSignUp);
});
passwordSignUp?.addEventListener("input", function () {
  inputValidation(passwordSignUpReg, passwordSignUp);
});

userName?.addEventListener("blur", function () {
  if (userNameReg.test(userName.value)) {
    userNameAlert.classList.add("d-none");
  } else {
    userNameAlert.classList.remove("d-none");
  }
});
emailSignUp?.addEventListener("blur", function () {
  if (emailSignUpReg.test(emailSignUp.value)) {
    emailSignUpAlert.classList.add("d-none");
  } else {
    emailSignUpAlert.classList.remove("d-none");
  }
});
passwordSignUp?.addEventListener("blur", function () {
  if (passwordSignUpReg.test(passwordSignUp.value)) {
    passwordSignUpAlert.classList.add("d-none");
  } else {
    passwordSignUpAlert.classList.remove("d-none");
  }
});

btnSignUp?.addEventListener("click", function (e) {
  // Prevent form submit
  e.preventDefault();

  // Check if account exist  before
  const isExisted = accounts.some((acc) => acc.userEmail === emailSignUp.value);

  if (
    userNameReg.test(userName.value) &&
    emailSignUpReg.test(emailSignUp.value) &&
    passwordSignUpReg.test(passwordSignUp.value)
  ) {
    // If account  registered before
    if (isExisted) {
      existMsg();
    } else {
      // If account not registered before
      // creat account object
      const acc = {
        userName: userName.value,
        userEmail: emailSignUp.value,
        userPassword: passwordSignUp.value,
      };
      // Push to accounts array
      accounts.push(acc);

      // Set local storage
      localStorage.setItem("accounts", JSON.stringify(accounts));

      successMsg();

      // Clear form inputs
      signUpForm.reset();
      userName.classList.remove("is-valid");
      emailSignUp.classList.remove("is-valid");
      passwordSignUp.classList.remove("is-valid");
    }
    console.log(accounts);
  } else if (!userName.value || !emailSignUp.value || !passwordSignUp.value) {
    requiredMsg();
  }
});

// Sign in page
// Select elements
const signInEmail = document.getElementById("email-sign-in");
const signInPassword = document.getElementById("password-sign-in");
const btnLogIn = document.querySelector(".btn-login");

// let registeredAccount;

btnLogIn?.addEventListener("click", function (e) {
  // Prevent form submit
  e.preventDefault();

  // Guard clause
  if (!signInEmail.value || !signInPassword.value) {
    requiredMsg();
    return;
  }

  const isExisted = accounts.some(
    (acc) =>
      acc.userEmail === signInEmail.value &&
      acc.userPassword === signInPassword.value
  );
  // console.log(isExisted);
  if (isExisted) {
    const [currentUser] = accounts.filter(
      (acc) =>
        acc.userEmail === signInEmail.value &&
        acc.userPassword === signInPassword.value
    );
    // console.log(currentUser);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // Direct to home page
    window.location.href = "home.html";
  } else if (!isExisted) {
    incorrectMsg();
  }
});

if (window.location.pathname.endsWith("home.html")) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  userWelcome.textContent = `Welcom ${currentUser.userName}`;
  // console.log(currentUser);
}
