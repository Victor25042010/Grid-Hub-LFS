// ==========================
// FIREBASE CONFIG
// ==========================

const firebaseConfig = {

    apiKey: "SUA_API_KEY",

    authDomain: "SEU_AUTH_DOMAIN",

    projectId: "SEU_PROJECT_ID",

    storageBucket: "SEU_STORAGE_BUCKET",

    messagingSenderId: "SEU_SENDER_ID",

    appId: "SEU_APP_ID"

};

// ==========================
// INIT FIREBASE
// ==========================

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// ==========================
// ELEMENTOS
// ==========================

const email =
    document.getElementById("email");

const password =
    document.getElementById("password");

const mainBtn =
    document.getElementById("mainBtn");

const switchModeBtn =
    document.getElementById("switchModeBtn");

const statusText =
    document.getElementById("statusText");

// ==========================
// MODO
// ==========================

let isLogin = true;

// ==========================
// TROCAR MODO
// ==========================

switchModeBtn.addEventListener("click", () => {

    isLogin = !isLogin;

    if (isLogin) {

        mainBtn.innerText = "Entrar";

        switchModeBtn.innerText =
            "Criar Conta";

    } else {

        mainBtn.innerText =
            "Criar Conta";

        switchModeBtn.innerText =
            "Já tenho conta";

    }

});

// ==========================
// LOGIN / REGISTER
// ==========================

mainBtn.addEventListener("click", async () => {

    const emailValue = email.value;

    const passwordValue = password.value;

    if (!emailValue || !passwordValue) {

        statusText.innerText =
            "Preencha todos os campos";

        return;
    }

    try {

        if (isLogin) {

            // LOGIN

            await auth.signInWithEmailAndPassword(
                emailValue,
                passwordValue
            );

            statusText.innerText =
                "Login realizado!";

        } else {

            // REGISTER

            await auth.createUserWithEmailAndPassword(
                emailValue,
                passwordValue
            );

            statusText.innerText =
                "Conta criada!";

        }

        window.location.href =
            "home.html";

    } catch (error) {

        console.error(error);

        statusText.innerText =
            "Erro ao entrar/criar conta";

    }

});

// ==========================
// AUTO LOGIN
// ==========================

auth.onAuthStateChanged((user) => {

    if (user) {

        window.location.href =
            "home.html";

    }

});