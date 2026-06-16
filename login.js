import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Preencha todos os campos");
    return;
  }

  try {

    await signInWithEmailAndPassword(auth, email, password);

    alert("Login realizado com sucesso!");

    window.location.href = "home.html";

  } catch (error) {
    alert(error.message);
  }

});