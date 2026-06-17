// home.js

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const username = document.getElementById("username");
const publishBtn = document.getElementById("publishBtn");
const postText = document.getElementById("postText");
const feed = document.getElementById("feed");
const logoutBtn = document.getElementById("logoutBtn");

let currentUser = null;

// =====================
// LOGIN
// =====================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "index.html";
        return;

    }

    currentUser = user;

    username.textContent = user.email;

    loadPosts();

});

// =====================
// LOGOUT
// =====================

logoutBtn.onclick = async () => {

    await signOut(auth);

};

// =====================
// PUBLICAR
// =====================

publishBtn.onclick = async () => {

    if (postText.value.trim() == "") return;

    await addDoc(collection(db, "posts"), {

        uid: currentUser.uid,

        author: currentUser.email,

        text: postText.value,

        image: "",

        youtube: "",

        likes: 0,

        createdAt: serverTimestamp()

    });

    postText.value = "";

};

// =====================
// CARREGAR POSTS
// =====================

function loadPosts() {

    const q = query(

        collection(db, "posts"),

        orderBy("createdAt", "desc")

    );

    onSnapshot(q, (snapshot) => {

        feed.innerHTML = "";

        snapshot.forEach((doc) => {

            const post = doc.data();

            feed.innerHTML += `

            <div class="post">

                <div class="post-header">

                    <img src="assets/default-avatar.png">

                    <div>

                        <h3>${post.author}</h3>

                    </div>

                </div>

                <div class="post-text">

                    ${post.text}

                </div>

                ${
                    post.image
                    ?
                    `<img class="post-image" src="${post.image}">`
                    :
                    ""
                }

                ${
                    post.youtube
                    ?
                    `<iframe
                        class="youtube-frame"
                        src="${post.youtube}"
                        allowfullscreen>
                    </iframe>`
                    :
                    ""
                }

                <div class="post-footer">

                    <button>❤️ Curtir</button>

                    <button>💬 Comentar</button>

                    <button>↗ Compartilhar</button>

                </div>

            </div>

            `;

        });

    });

}